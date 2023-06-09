import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";
import crypto from "crypto";
import User from "../models/User";
import PasswordReset from "../models/PasswordReset";
import {
  IUserCreate,
  IUserLogIn,
  IUserTokenPayload,
  IUserCookies,
  IUserChangePassword,
} from "../types/user.type";
import { createError } from "../helpers/errors";
import { v4 as uuidv4 } from "uuid";
import { IFile } from "../types/file.type";

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_TIME,
  ENCRYPTION_KEY,
  AZURE_STORAGE_CONNECTION_STRING,
} = process.env;

export default class AuthService {
  static async authenticate(token: string) {
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET!) as IUserTokenPayload;

    if (!id) {
      throw createError(401, "Not authorized.");
    }
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw createError(401, "Invalid token.");
    }
    if (user.accessToken !== token) {
      throw createError(401, "Bad credential.");
    }
    return user;
  }

  static async refresh(cookies: IUserCookies | undefined, accessToken: string) {
    const token = cookies?.refreshToken;
    if (!cookies || !token) {
      const { id } = jwt.decode(accessToken) as JwtPayload;
      await User.findByIdAndUpdate(id, {
        accessToken: null,
        refreshToken: null,
      });
      throw createError(401, "Refresh token is missing.");
    }

    const payload = jwt.verify(
      token,
      REFRESH_TOKEN_SECRET!
    ) as IUserTokenPayload;

    const newAccessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const newRefreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return { payload, newAccessToken, newRefreshToken };
  }

  async verifyEmail(email: string, id: string) {
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email already in use.");
    }
    const emailChangeToken = uuidv4();
    await User.findByIdAndUpdate(id, { emailChangeToken, newEmail: email });
    return emailChangeToken;
  }

  async signUp(userData: IUserCreate, file: IFile | null) {
    const { email, password } = userData;
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      throw createError(409, "Email already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const newUser = {
      ...userData,
      password: hashedPassword,
      verificationToken,
    };

    if (file) {
      const containerName = "users";
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING!
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const upload = file;
      if (upload) {
        const filename = uuidv4() + "-" + upload.originalname;
        const blobClient = containerClient.getBlockBlobClient(filename);
        await blobClient.uploadData(upload.buffer, {
          blobHTTPHeaders: { blobContentType: upload.mimetype },
        });
        newUser.image = blobClient.url;
      }
    } else {
      newUser.image = null;
    }

    await User.create(newUser);
    return verificationToken;
  }

  async verify(verificationToken: string) {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404, "User not found.");
    }
    if (user.verify) {
      throw createError(409, "User already verified.");
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    return true;
  }

  async logIn(data: IUserLogIn) {
    const { phone, email, password } = data;
    if (!phone && !email) {
      throw createError(400, "Missing required field email or phone.");
    }
    let user;
    if (phone) {
      user = await User.findOne({ phone });
    } else {
      user = await User.findOne({ email });
    }
    if (!user) {
      throw createError(404, "User not found.");
    }
    if (!user.verify) {
      throw createError(401, "User not verified.");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Invalid credentials.");
    }
    const payload = { id: user._id };
    const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = await jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        accessToken,
        refreshToken,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw createError(500, "Tokens didnot create.");
    }
    return updatedUser;
  }

  async logOut(id: string) {
    await User.findByIdAndUpdate(id, {
      accessToken: null,
      refreshToken: null,
    });
    return true;
  }

  async createPasswordReset(id: string) {
    const token = crypto.randomBytes(32).toString("hex");
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY!, iv);
    let encryptedToken = cipher.update(token, "utf8", "base64");
    encryptedToken += cipher.final("base64");

    const createdPasswordReset = await PasswordReset.findOne({ user: id });
    let newPasswordReset;
    if (createdPasswordReset) {
      newPasswordReset = await PasswordReset.findByIdAndUpdate(
        createdPasswordReset._id,
        {
          token,
          iv,
        },
        { new: true }
      );
    } else {
      newPasswordReset = await PasswordReset.create({
        user: id,
        token,
        iv,
      });
    }
    if (!newPasswordReset) {
      throw createError(500, "Cannot change password now");
    }
    return { encryptedToken, id: newPasswordReset._id };
  }

  async resetPassword(
    encryptedToken: string,
    newPassword: string,
    passwordId: string
  ) {
    const passwordReset = await PasswordReset.findById(passwordId);
    if (!passwordReset) {
      throw createError(400, "Invalid or expired password reset token.");
    }

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      ENCRYPTION_KEY!,
      passwordReset.iv
    );
    let decryptedToken = decipher.update(encryptedToken, "base64", "utf8");
    decryptedToken += decipher.final("utf8");

    if (decryptedToken !== passwordReset.token) {
      await PasswordReset.findByIdAndRemove(passwordId);
      throw createError(400, "Invalid or expired token.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(passwordReset.user, {
      password: hashedPassword,
    });

    await PasswordReset.findByIdAndRemove(passwordId);

    return true;
  }

  async resetEmail(emailChangeToken: string) {
    const user = await User.findOne({ emailChangeToken });
    if (!user) {
      throw createError(404, "Token not found. Try again.");
    }
    const changedUser = await User.findByIdAndUpdate(
      user._id,
      { email: user.newEmail, emailChangeToken: null, newEmail: null },
      { new: true }
    );

    return changedUser;
  }

  async changePassword(id: string, data: IUserChangePassword) {
    const { newPassword, oldPassword } = data;

    const user = await User.findById(id);
    if (!user) {
      throw createError(404, "User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Invalid credentials.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return true;
  }
}

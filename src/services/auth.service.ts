import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { IUserCreate, IUserLogIn, IUserTokenPayload } from "../types/user.type";
import { createError } from "../helpers/errors";
import { v4 as uuidv4 } from "uuid";

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_TIME,
} = process.env;

export default class AuthService {
  static async authenticate(token: string) {
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET!) as IUserTokenPayload;

    if (!id) {
      throw createError(401, "Not authorized");
    }
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw createError(401, "Invalid token");
    }
    if (user.accessToken !== token) {
      throw createError(401, "Bad credential");
    }
    return user;
  }

  static async refresh(refreshToken: string | undefined, accessToken: string) {
    if (!refreshToken) {
      const { id } = jwt.decode(accessToken) as JwtPayload;
      await User.findByIdAndUpdate(id, {
        accessToken: null,
        refreshToken: null,
      });
      throw createError(401, "Refresh token is missing");
    }

    const payload = jwt.verify(
      refreshToken,
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

  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(409, "Wrong email.");
    }
    return user;
  }

  async signUp(userData: IUserCreate) {
    const { email, password } = userData;
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      throw createError(409, "Email already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    await User.create({
      ...userData,
      password: hashedPassword,
      verificationToken,
    });
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

  async logOut() {}

  async changePassword() {}
}

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IPasswords, IUserLogin } from "../types/user.type";
import { createError } from "../helpers/errors";

interface UserPayload {
  id: string;
}

const { JWT_SECRET } = process.env;

export default class UserService {
  static async authenticate(token: string) {
    try {
      const { id } = jwt.verify(token, JWT_SECRET) as UserPayload;

      if (!id) {
        throw createError(401, "Not authorized");
      }
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401, "Invalid token");
      }
      if (user.token !== token) {
        throw createError(401, "Bad credential");
      }

      return user;
    } catch (e) {
      return null;
    }
  }

  async signUp(data: IUserLogin) {
    const { email, password } = data;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      throw createError(409, "Email already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    );
    if (!updatedUser) {
      throw createError(500, "Unknown error in creating new user");
    }
    return updatedUser.token;
  }

  async logIn(data: IUserLogin) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong.");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw createError(401, "Email or password is wrong");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    return token;
  }

  async logOut(id: string) {
    await User.findByIdAndUpdate(id, { token: null });
    return true;
  }

  async changePassword(id: string | null, data: IPasswords) {
    const { oldPassword, newPassword, email } = data;
    const user = await User.findById(id);
    if (!user || user.email !== email) {
      throw createError(401, "Email or password is wrong.");
    }
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw createError(401, "Email or password is wrong");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return true;
  }
}

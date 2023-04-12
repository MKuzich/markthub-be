import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUserCreate } from "../types/user.type";
import { createError } from "../helpers/errors";
import { v4 as uuidv4 } from "uuid";

const {
  ACCESS_TOKEN_SECRET = "secret",
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_SECRET,
} = process.env;

export default class AuthService {
  async authentificate() {}

  async signUp(userData: IUserCreate) {
    const { email, password } = userData;
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      throw createError(409, "Email already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      verificationToken,
    });
    return verificationToken;
  }

  async logIn() {}

  async logOut() {}

  async changePassword() {}
}

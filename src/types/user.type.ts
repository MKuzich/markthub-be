import { Document } from "mongoose";

export interface IUser extends Document {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  image: string;
  rate: number;
  date: Date;
  reviews: string[];
  acessToken: string | null;
  _id: string;
  refreshToken: string | null;
  verify: boolean;
  verificationToken: string;
}

export interface IUserCreate {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  image: string;
}

export interface ITokenData {
  userId: string;
  firstName: string;
  secondName: string;
  email: string;
}

export interface IRefreshTokenData {
  userId: string;
  refreshToken: string;
}

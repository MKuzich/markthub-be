import { Document } from "mongoose";
import { IOrderedProducts } from "./order.type";

export interface IUserCart {
  products: IOrderedProducts[];
  totalPrice: number;
  priceWithoutPromo: number;
}

export interface IUser extends Document {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  image: string | null;
  rate: number;
  date: Date;
  reviews: string[];
  products: string[];
  cart: string[];
  orders: string[];
  accessToken: string | null;
  _id: string;
  refreshToken: string | null;
  verify: boolean;
  verificationToken: string | null;
  emailChangeToken: string | null;
  newEmail: string | null;
}

export interface IUserCreate {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  image?: string | null;
}

export interface IUserChangeData {
  phone: string;
  email: string;
  firstName: string;
  secondName: string;
  image: string | null;
}

export interface IUserChangePassword {
  newPassword: string;
  oldPassword: string;
}

export interface IUserLogIn {
  phone?: string;
  email?: string;
  password: string;
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

export interface IUserTokenPayload {
  id: string;
}

export interface User {
  id: string;
}

export interface IUserCookies {
  refreshToken: string;
}

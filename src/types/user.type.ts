import { Document } from "mongoose";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserReview {
  date: Date;
  owner: string;
  title: string;
  text: string;
  rate: number;
}

export interface IUser extends Document {
  phone: string;
  email: string;
  password: string;
  name: string;
  image: string;
  rate: number;
  date: Date;
  reviews: string[];
  token: string | null;
  _id: string;
}

export interface IPasswords {
  email: string;
  oldPassword: string;
  newPassword: string;
}

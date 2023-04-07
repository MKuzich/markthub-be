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
  token: string | null;
  _id: string;
}

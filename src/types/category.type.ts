import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  tag: string;
  desription: string;
  image: string;
  products: Types.ObjectId[];
}

export interface ICategoryCreate {
  name: string;
  tag: string;
  desription: string;
  image: string;
}

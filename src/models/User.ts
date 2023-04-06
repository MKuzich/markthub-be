/* eslint-disable no-useless-escape */
import { Model, model, Schema } from "mongoose";
import Joi from "joi";
import { IUser } from "../types/user.type";

export const schemaSignUpUser = Joi.object({
  phone: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email()
    .regex(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ),
  password: Joi.string()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
});

const userSchema = new Schema<IUser>({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rate: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  reviews: {
    type: [
      {
        date: {
          type: Date,
          default: new Date(),
        },
        owner: {
          type: String,
          ref: "User",
        },
        title: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  token: {
    type: String,
    default: null,
  },
});

const User: Model<IUser> = model("User", userSchema);

export default User;

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
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
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
        type: String,
        ref: "Review",
      },
    ],
    default: [],
  },
  acessToken: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User: Model<IUser> = model("User", userSchema);

export default User;

/* eslint-disable no-useless-escape */
import { Model, model, Schema } from "mongoose";
import Joi from "joi";
import { IUser } from "../types/user.type";

// export const schemaSignUpUser = Joi.object({
//   phone: Joi.string().required(),
//   name: Joi.string().required(),
//   email: Joi.string()
//     .required()
//     .email()
//     .regex(
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//     ),
//   password: Joi.string()
//     .required()
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
// });

export const createUserSchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  image: Joi.string().allow(null),
});

export const changeUserDataSchema = Joi.object({
  firstName: Joi.string(),
  secondName: Joi.string(),
  image: Joi.string().allow(null),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
});

export const setNewPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

export const changeUserPasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

export const userLogInSchema = Joi.object({
  phone: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).or("phone", "email");

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
  products: {
    type: [
      {
        type: String,
        ref: "Product",
      },
    ],
    default: [],
  },
  cart: {
    products: {
      type: [
        {
          product: {
            type: {
              type: String,
              ref: "Product",
            },
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    priceWithoutPromo: {
      type: Number,
      required: true,
    },
  },
  orders: {
    type: [
      {
        type: String,
        ref: "Order",
      },
    ],
    default: [],
  },
  accessToken: {
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
  emailChangeToken: {
    type: String,
    default: null,
  },
  newEmail: {
    type: String,
    default: null,
  },
});

const User: Model<IUser> = model("User", userSchema);

export default User;

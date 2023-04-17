import { Model, model, Schema, Types } from "mongoose";
import Joi from "joi";
import { IOrder } from "../types/order.type";

export const createOrderSchema = Joi.object({
  destination: Joi.object({
    firstName: Joi.string().required(),
    secondName: Joi.string().required(),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
  }),
  info: Joi.string(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .required(),
        amount: Joi.number().required(),
      })
    )
    .required(),
  totalPrice: Joi.number().required(),
  priceWithoutPromo: Joi.number().required(),
});

export const changeOrderSchema = Joi.object({
  owner: Joi.string(),
  destination: Joi.object({
    firstName: Joi.string(),
    secondName: Joi.string(),
    phone: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    address: Joi.string(),
  }),
  info: Joi.string().allow(null),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }),
      amount: Joi.number(),
    })
  ),
  totalPrice: Joi.number().required(),
  priceWithoutPromo: Joi.number().required(),
  status: Joi.string().valid(
    "Pending",
    "Paid",
    "Shipped",
    "Delivered",
    "Canceled"
  ),
  updatedAt: Joi.date().default(new Date()),
});

const orderSchema = new Schema<IOrder>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  destination: {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  info: {
    type: String,
    default: null,
  },
  products: {
    type: [
      {
        product: {
          type: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
        },
        amount: {
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
  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered", "Canceled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Order: Model<IOrder> = model("Order", orderSchema);

export default Order;

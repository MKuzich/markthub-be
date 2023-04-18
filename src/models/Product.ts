import { Model, model, Schema, Types } from "mongoose";
import Joi from "joi";
import { IProduct } from "../types/product.type";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  images: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  promoPrice: Joi.number().default(0),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const changeProductDataSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }),
  price: Joi.number(),
  promoPrice: Joi.number(),
  description: Joi.string(),
  active: Joi.boolean(),
  quantity: Joi.number(),
});

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  promoPrice: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  active: {
    type: Boolean,
    default: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  ordersPerDay: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  orders: {
    type: [
      {
        product: {
          type: {
            type: Schema.Types.ObjectId,
            ref: "Order",
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product: Model<IProduct> = model("Product", productSchema);

export default Product;

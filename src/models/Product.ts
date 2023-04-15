import { Model, model, Schema } from "mongoose";
import Joi from "joi";

import { IProduct } from "../types/product.type";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
    type: String,
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
      type: String,
      ref: "Review",
    },
  ],
  orders: {
    type: [
      {
        product: {
          type: {
            type: String,
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

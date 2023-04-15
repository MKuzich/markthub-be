import { Model, model, Schema } from "mongoose";

import { IOrder } from "../types/order.type";

const orderSchema = new Schema<IOrder>({
  owner: {
    type: String,
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
            type: String,
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

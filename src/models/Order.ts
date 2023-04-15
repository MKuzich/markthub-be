import { Model, model, Schema } from "mongoose";

import { IOrder } from "../types/order.type";

const orderSchema = new Schema<IOrder>({
  date: {
    type: Date,
    default: new Date(),
  },
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
});

const Order: Model<IOrder> = model("Order", orderSchema);

export default Order;

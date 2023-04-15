import { Model, model, Schema } from "mongoose";

import { ITransaction } from "../types/transaction.type";

const transactionSchema = new Schema<ITransaction>({
  owner: {
    type: String,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: String,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
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

const Transaction: Model<ITransaction> = model(
  "Transaction",
  transactionSchema
);

export default Transaction;

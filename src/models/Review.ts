import { Model, model, Schema } from "mongoose";

import { IReview } from "../types/review.type";

const reviewSchema = new Schema<IReview>({
  date: {
    type: Date,
    default: new Date(),
  },
  owner: {
    type: String,
    ref: "User",
  },
  product: {
    type: String,
    ref: "Product",
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
});

const Review: Model<IReview> = model("Review", reviewSchema);

export default Review;

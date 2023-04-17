import { Model, model, Schema, Types } from "mongoose";
import Joi from "joi";
import { IReview } from "../types/review.type";

export const createReviewSchema = Joi.object({
  date: Joi.date().default(new Date()),
  product: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  rate: Joi.number().integer().min(1).max(5).required(),
});

export const changeReviewSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
  rate: Joi.number().integer().min(1).max(5),
});

const reviewSchema = new Schema<IReview>({
  date: {
    type: Date,
    default: new Date(),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
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

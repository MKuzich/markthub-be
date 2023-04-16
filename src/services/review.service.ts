import { createError } from "../helpers/errors";
import Review from "../models/Review";
import {
  IReviewCreate,
  IReviewChange,
  IReviewQuery,
} from "../types/review.type";
import { checkOwner } from "../helpers/checkOwner";

export default class ReviewService {
  async findAll(query: IReviewQuery, skip: number, limit: number) {
    const reviews = await Review.find(query).skip(skip).limit(limit);
    const total = await Review.find(query).countDocuments();
    return { reviews, total };
  }

  async findById(id: string) {
    const review = await Review.findById(id);
    if (!review) {
      throw createError(404, "Review not found.");
    }
    return review;
  }

  async add(owner: string, data: IReviewCreate) {
    const review = await Review.create({ ...data, owner });
    return review;
  }

  async change(userId: string, reviewId: string, data: IReviewChange) {
    const review = await Review.findById(reviewId);

    checkOwner(review, userId, "review");

    await Review.findByIdAndUpdate(reviewId, data);
    return true;
  }

  async delete(userId: string, reviewId: string) {
    const review = await Review.findById(reviewId);

    checkOwner(review, userId, "review");

    await Review.findByIdAndRemove(reviewId);
    return true;
  }
}

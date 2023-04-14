import { createError } from "../helpers/errors";
import Review from "../models/Review";
import { IReviewCreate, IReviewChange } from "../types/review.type";

export default class ReviewService {
  async findAll(search: string, filter: string, skip: number, limit: number) {
    const reviews = await Review.find().skip(skip).limit(limit);
    const total = await Review.find().countDocuments();
    return { reviews, total };
  }

  async findById(id: string) {
    const review = await Review.findById(id);
    return review;
  }

  async add(owner: string, data: IReviewCreate) {
    const review = await Review.create({ ...data, owner });
    return review;
  }

  async change(userId: string, reviewId: string, data: IReviewChange) {
    const review = await Review.findById(reviewId);

    if (!review) {
      return createError(404, `Review not found.`);
    }
    if (review.owner !== userId) {
      throw createError(
        403,
        "Forbidden. You cann't change this review, because it's not your."
      );
    }
    await Review.findByIdAndUpdate(reviewId, data);
    return true;
  }
}

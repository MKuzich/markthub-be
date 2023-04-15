import { Request } from "express";
import ReviewService from "../services/review.service";
import { IRequest } from "../types/request.type";
import { IReviewQueryParams } from "../types/review.type";
import { IUserTokenPayload } from "../types/user.type";

class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async getReviews(req: IRequest<any, IReviewQueryParams, any, any>) {
    const { search = "", filter, page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    const data = await this.reviewService.findAll(search, filter, skip, limit);
    return data;
  }

  async getReviewById(req: Request) {
    const { reviewId } = req.params;
    const review = this.reviewService.findById(reviewId);
    return review;
  }

  async addReview(req: Request) {
    const { id } = req.user as IUserTokenPayload;
    const data = req.body;
    const review = await this.reviewService.add(id, data);
    return review;
  }

  async changeReview(req: Request) {
    const { id } = req.user as IUserTokenPayload;
    const { reviewId } = req.params;
    const data = req.body;
    const isChanged = await this.reviewService.change(id, reviewId, data);
    return isChanged;
  }

  async deleteReview(req: Request) {
    const { id } = req.user as IUserTokenPayload;
    const { reviewId } = req.params;
    const isDeleted = this.reviewService.delete(id, reviewId);
    return isDeleted;
  }
}

const reviewController = new ReviewController(new ReviewService());
export default reviewController;

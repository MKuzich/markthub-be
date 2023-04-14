import { Request } from "express";
import ReviewService from "../services/review.service";
import { IRequest } from "../types/request.type";
import { IReviewQueryParams } from "../types/review.type";

class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async getReviews(req: IRequest<any, IReviewQueryParams, any, any>) {
    const { search = "", filter, page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    const data = await this.reviewService.findAll(search, filter, skip, limit);
    return data;
  }
}

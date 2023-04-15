import { Request } from "express";
import ReviewService from "../services/review.service";
import { IRequest } from "../types/request.type";
import { IReviewQueryParams } from "../types/review.type";
import { IUserTokenPayload } from "../types/user.type";
import ProductService from "../services/product.service";

class ReviewController {
  constructor(
    private reviewService: ReviewService,
    private productService: ProductService
  ) {}

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
    const { _id, product } = review;
    await this.productService.addReview(product, _id.toString());
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
    const review = await this.reviewService.findById(reviewId);
    const isDeleted = await this.reviewService.delete(id, reviewId);
    const { _id, product } = review;
    await this.productService.deleteReview(product, _id.toString());
    return isDeleted;
  }
}

const reviewController = new ReviewController(
  new ReviewService(),
  new ProductService()
);
export default reviewController;

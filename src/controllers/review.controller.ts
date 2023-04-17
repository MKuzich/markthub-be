import { Request } from "express";
import ReviewService from "../services/review.service";
import { IRequest } from "../types/request.type";
import { IReviewsQuery } from "../types/review.type";
import { IUserTokenPayload } from "../types/user.type";
import ProductService from "../services/product.service";
import UserService from "../services/user.service";
import { buildReviewQuery } from "../helpers/buildReviewQuery";
import { parseSortParameter } from "../helpers/parseSortParameter";

class ReviewController {
  constructor(
    private reviewService: ReviewService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  async getReviews(req: IRequest<any, IReviewsQuery, any, any>) {
    const { page = 1, limit = 3, sort = undefined } = req.query;
    const skip = (page - 1) * limit;
    const filter = req.query;
    const query = buildReviewQuery(filter);
    const sortObj = parseSortParameter(sort);
    const data = await this.reviewService.findAll(query, skip, limit, sortObj);
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
    await this.userService.addReview(id, _id.toString());
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
    await this.userService.deleteReview(id, _id.toString());
    return isDeleted;
  }
}

const reviewController = new ReviewController(
  new ReviewService(),
  new ProductService(),
  new UserService()
);
export default reviewController;

import { Router } from "express";
import reviewController from "../../controllers/review.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";

const reviewsRouter: Router = Router();

reviewsRouter.get(
  "/",
  tryCatch(reviewController.getReviews.bind(reviewController))
);

reviewsRouter.get(
  "/:reviewId",
  tryCatch(reviewController.getReviewById.bind(reviewController))
);

reviewsRouter.post(
  "/",
  auth,
  tryCatch(reviewController.addReview.bind(reviewController))
);

reviewsRouter.patch(
  "/:reviewId",
  auth,
  tryCatch(reviewController.changeReview.bind(reviewController))
);

reviewsRouter.delete(
  "/:reviewId",
  auth,
  tryCatch(reviewController.deleteReview.bind(reviewController))
);

export default reviewsRouter;

import { Router } from "express";
import reviewController from "../../controllers/review.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";

const reviewRouter: Router = Router();

reviewRouter.get(
  "/",
  tryCatch(reviewController.getReviews.bind(reviewController))
);

reviewRouter.get(
  "/:reviewId",
  tryCatch(reviewController.getReviewById.bind(reviewController))
);

reviewRouter.post(
  "/",
  auth,
  tryCatch(reviewController.addReview.bind(reviewController))
);

reviewRouter.patch(
  "/:reviewId",
  auth,
  tryCatch(reviewController.changeReview.bind(reviewController))
);

reviewRouter.delete(
  "/:reviewId",
  auth,
  tryCatch(reviewController.deleteReview.bind(reviewController))
);

export default reviewRouter;

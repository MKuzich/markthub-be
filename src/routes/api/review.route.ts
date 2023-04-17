import { Router } from "express";
import reviewController from "../../controllers/review.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { createReviewSchema, changeReviewSchema } from "../../models/Review";

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
  validateRequest(createReviewSchema),
  tryCatch(reviewController.addReview.bind(reviewController))
);

reviewRouter.patch(
  "/:reviewId",
  auth,
  validateRequest(changeReviewSchema),
  tryCatch(reviewController.changeReview.bind(reviewController))
);

reviewRouter.delete(
  "/:reviewId",
  auth,
  tryCatch(reviewController.deleteReview.bind(reviewController))
);

export default reviewRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var review_controller_1 = __importDefault(require("../../controllers/review.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var Review_1 = require("../../models/Review");
var reviewRouter = (0, express_1.Router)();
reviewRouter.get("/", (0, tryCatch_middleware_1.tryCatch)(review_controller_1.default.getReviews.bind(review_controller_1.default)));
reviewRouter.get("/:reviewId", (0, tryCatch_middleware_1.tryCatch)(review_controller_1.default.getReviewById.bind(review_controller_1.default)));
reviewRouter.post("/", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Review_1.createReviewSchema), (0, tryCatch_middleware_1.tryCatch)(review_controller_1.default.addReview.bind(review_controller_1.default)));
reviewRouter.patch("/:reviewId", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Review_1.changeReviewSchema), (0, tryCatch_middleware_1.tryCatch)(review_controller_1.default.changeReview.bind(review_controller_1.default)));
reviewRouter.delete("/:reviewId", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(review_controller_1.default.deleteReview.bind(review_controller_1.default)));
exports.default = reviewRouter;
//# sourceMappingURL=review.route.js.map
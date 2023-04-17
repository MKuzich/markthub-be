"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeReviewSchema = exports.createReviewSchema = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.createReviewSchema = joi_1.default.object({
    date: joi_1.default.date().default(new Date()),
    product: joi_1.default.string()
        .custom(function (value, helpers) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .required(),
    title: joi_1.default.string().required(),
    text: joi_1.default.string().required(),
    rate: joi_1.default.number().integer().min(1).max(5).required(),
});
exports.changeReviewSchema = joi_1.default.object({
    title: joi_1.default.string(),
    text: joi_1.default.string(),
    rate: joi_1.default.number().integer().min(1).max(5),
});
var reviewSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
});
var Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=Review.js.map
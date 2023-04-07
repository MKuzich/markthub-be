"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    owner: {
        type: String,
        ref: "User",
    },
    product: {
        type: String,
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
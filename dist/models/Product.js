"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: "Category",
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    promoPrice: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        ref: "User",
    },
    active: {
        type: Boolean,
        default: true,
    },
    rate: {
        type: Number,
        default: 0,
    },
    ordersPerDay: {
        type: Number,
        default: 0,
    },
    totalOrders: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    reviews: [
        {
            type: String,
            ref: "Review",
        },
    ],
    quantity: {
        type: Number,
        required: true,
    },
});
var Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=Product.js.map
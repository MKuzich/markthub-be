"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var transactionSchema = new mongoose_1.Schema({
    owner: {
        type: String,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: String,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Delivered", "Canceled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});
var Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map
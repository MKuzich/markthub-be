"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    owner: {
        type: String,
        ref: "User",
    },
    destination: {
        firstName: {
            type: String,
            required: true,
        },
        secondName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    products: [
        {
            _id: { type: String, required: true },
            name: { type: String, required: true },
            category: { type: String, ref: "Category" },
            image: {
                type: String,
            },
            price: {
                type: Number,
                required: true,
            },
            promoPrice: {
                type: Number,
                default: 0,
            },
            owner: {
                type: String,
                ref: "User",
            },
            rate: {
                type: Number,
                default: 0,
            },
            date: {
                type: Date,
                default: new Date(),
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    priceWithoutPromo: {
        type: Number,
        required: true,
    },
});
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map
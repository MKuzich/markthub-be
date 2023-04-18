"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProductDataSchema = exports.createProductSchema = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    category: joi_1.default.string()
        .custom(function (value, helpers) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .required(),
    images: joi_1.default.array().items(joi_1.default.string()),
    price: joi_1.default.number().required(),
    promoPrice: joi_1.default.number().default(0),
    description: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
});
exports.changeProductDataSchema = joi_1.default.object({
    name: joi_1.default.string(),
    category: joi_1.default.string().custom(function (value, helpers) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }),
    price: joi_1.default.number(),
    promoPrice: joi_1.default.number(),
    description: joi_1.default.string(),
    active: joi_1.default.boolean(),
    quantity: joi_1.default.number(),
});
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    orders: {
        type: [
            {
                product: {
                    type: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "Order",
                    },
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        default: [],
    },
    quantity: {
        type: Number,
        required: true,
    },
});
var Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=Product.js.map
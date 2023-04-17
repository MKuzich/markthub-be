"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderSchema = exports.createOrderSchema = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object({
    destination: joi_1.default.object({
        firstName: joi_1.default.string().required(),
        secondName: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        address: joi_1.default.string().required(),
    }),
    info: joi_1.default.string(),
    products: joi_1.default.array()
        .items(joi_1.default.object({
        product: joi_1.default.string()
            .custom(function (value, helpers) {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
            .required(),
        amount: joi_1.default.number().required(),
    }))
        .required(),
    totalPrice: joi_1.default.number().required(),
    priceWithoutPromo: joi_1.default.number().required(),
});
exports.changeOrderSchema = joi_1.default.object({
    owner: joi_1.default.string(),
    destination: joi_1.default.object({
        firstName: joi_1.default.string(),
        secondName: joi_1.default.string(),
        phone: joi_1.default.string(),
        country: joi_1.default.string(),
        city: joi_1.default.string(),
        address: joi_1.default.string(),
    }),
    info: joi_1.default.string().allow(null),
    products: joi_1.default.array().items(joi_1.default.object({
        product: joi_1.default.string().custom(function (value, helpers) {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        }),
        amount: joi_1.default.number(),
    })),
    totalPrice: joi_1.default.number().required(),
    priceWithoutPromo: joi_1.default.number().required(),
    status: joi_1.default.string().valid("Pending", "Paid", "Shipped", "Delivered", "Canceled"),
    updatedAt: joi_1.default.date().default(new Date()),
});
var orderSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    info: {
        type: String,
        default: null,
    },
    products: {
        type: [
            {
                product: {
                    type: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "Product",
                    },
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    priceWithoutPromo: {
        type: Number,
        required: true,
    },
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
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map
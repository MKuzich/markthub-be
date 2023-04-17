"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogInSchema = exports.changeUserPasswordSchema = exports.setNewPasswordSchema = exports.verifyEmailSchema = exports.changeUserDataSchema = exports.createUserSchema = void 0;
/* eslint-disable no-useless-escape */
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
// export const schemaSignUpUser = Joi.object({
//   phone: Joi.string().required(),
//   name: Joi.string().required(),
//   email: Joi.string()
//     .required()
//     .email()
//     .regex(
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//     ),
//   password: Joi.string()
//     .required()
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
// });
exports.createUserSchema = joi_1.default.object({
    phone: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
    firstName: joi_1.default.string().required(),
    secondName: joi_1.default.string().required(),
    image: joi_1.default.string().allow(null),
});
exports.changeUserDataSchema = joi_1.default.object({
    firstName: joi_1.default.string(),
    secondName: joi_1.default.string(),
    image: joi_1.default.string().allow(null),
});
exports.verifyEmailSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
});
exports.setNewPasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
});
exports.changeUserPasswordSchema = joi_1.default.object({
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
});
exports.userLogInSchema = joi_1.default.object({
    phone: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required(),
}).or("phone", "email");
var userSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    rate: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    reviews: {
        type: [
            {
                type: String,
                ref: "Review",
            },
        ],
        default: [],
    },
    products: {
        type: [
            {
                type: String,
                ref: "Product",
            },
        ],
        default: [],
    },
    cart: {
        products: {
            type: [
                {
                    product: {
                        type: {
                            type: String,
                            ref: "Product",
                        },
                    },
                    quantity: {
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
    },
    orders: {
        type: [
            {
                type: String,
                ref: "Order",
            },
        ],
        default: [],
    },
    accessToken: {
        type: String,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
    },
    emailChangeToken: {
        type: String,
        default: null,
    },
    newEmail: {
        type: String,
        default: null,
    },
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map
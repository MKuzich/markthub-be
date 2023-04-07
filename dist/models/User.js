"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaSignUpUser = void 0;
/* eslint-disable no-useless-escape */
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.schemaSignUpUser = joi_1.default.object({
    phone: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string()
        .required()
        .email()
        .regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
    password: joi_1.default.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
});
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
                date: {
                    type: Date,
                    default: new Date(),
                },
                owner: {
                    type: String,
                    ref: "User",
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
            },
        ],
        default: [],
    },
    token: {
        type: String,
        default: null,
    },
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map
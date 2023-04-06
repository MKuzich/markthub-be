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
    email: joi_1.default.string()
        .required()
        .email()
        .regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
    password: joi_1.default.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
});
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
});
var User = mongoose_1.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.createCategorySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    tag: joi_1.default.string().regex(/^\S+$/).required(),
    image: joi_1.default.string().required(),
    products: joi_1.default.array()
        .items(joi_1.default.string().custom(function (value, helpers) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }))
        .default([]),
});
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    desription: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    products: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        default: [],
    },
});
var Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
//# sourceMappingURL=Category.js.map
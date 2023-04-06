"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUpdateTodo = exports.schemaCreateTodo = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = __importDefault(require("joi"));
exports.schemaCreateTodo = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).required(),
    data: joi_1.default.string().min(10).max(500).required(),
    public: joi_1.default.boolean().required(),
});
exports.schemaUpdateTodo = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30),
    data: joi_1.default.string().min(10).max(500),
    public: joi_1.default.boolean(),
    complited: joi_1.default.boolean(),
});
var todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
    },
    complited: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: String,
        ref: "User",
    },
});
var Todo = (0, mongoose_1.model)("Todo", todoSchema);
exports.default = Todo;
//# sourceMappingURL=Todo.js.map
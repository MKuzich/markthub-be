"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categories_controller_1 = __importDefault(require("../../controllers/categories.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var categoriesRouter = (0, express_1.Router)();
categoriesRouter.get("/", (0, tryCatch_middleware_1.tryCatch)(categories_controller_1.default.getCategories.bind(categories_controller_1.default)));
categoriesRouter.post("/", (0, tryCatch_middleware_1.tryCatch)(categories_controller_1.default.addCategory.bind(categories_controller_1.default)));
exports.default = categoriesRouter;
//# sourceMappingURL=categories.route.js.map
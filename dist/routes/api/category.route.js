"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var category_controller_1 = __importDefault(require("../../controllers/category.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var Category_1 = require("../../models/Category");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var categoryRouter = (0, express_1.Router)();
categoryRouter.get("/", (0, tryCatch_middleware_1.tryCatch)(category_controller_1.default.getCategories.bind(category_controller_1.default)));
categoryRouter.get("/:categoryId", (0, tryCatch_middleware_1.tryCatch)(category_controller_1.default.getGategoryById.bind(category_controller_1.default)));
categoryRouter.post("/", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Category_1.createCategorySchema), (0, tryCatch_middleware_1.tryCatch)(category_controller_1.default.addCategory.bind(category_controller_1.default)));
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map
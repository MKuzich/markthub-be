"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_controller_1 = __importDefault(require("../../controllers/products.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var productsRouter = (0, express_1.Router)();
productsRouter.get("/", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.getProducts.bind(products_controller_1.default)));
productsRouter.get("/:id");
productsRouter.post("/");
productsRouter.patch("/:id");
productsRouter.delete("/:id");
exports.default = productsRouter;
//# sourceMappingURL=products.route.js.map
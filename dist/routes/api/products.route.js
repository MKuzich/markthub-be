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
productsRouter.get("/:id", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.getProductById.bind(products_controller_1.default)));
productsRouter.post("/", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.addProduct.bind(products_controller_1.default)));
productsRouter.patch("/:id", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.changeProduct.bind(products_controller_1.default)));
productsRouter.delete("/:id", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.deleteProduct.bind(products_controller_1.default)));
exports.default = productsRouter;
//# sourceMappingURL=products.route.js.map
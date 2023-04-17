"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_controller_1 = __importDefault(require("../../controllers/products.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var parseFormData_1 = require("../../middlewares/parseFormData");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var Product_1 = require("../../models/Product");
var productRouter = (0, express_1.Router)();
productRouter.get("/", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.getProducts.bind(products_controller_1.default)));
productRouter.get("/:productId", (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.getProductById.bind(products_controller_1.default)));
productRouter.post("/", authValidate_middleware_1.default, (0, parseFormData_1.parseFormData)(), (0, validateRequest_middleware_1.validateRequest)(Product_1.createProductSchema), (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.addProduct.bind(products_controller_1.default)));
productRouter.patch("/:productId", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Product_1.changeProductDataSchema), (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.changeProduct.bind(products_controller_1.default)));
productRouter.delete("/:productId", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(products_controller_1.default.deleteProduct.bind(products_controller_1.default)));
exports.default = productRouter;
//# sourceMappingURL=product.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var order_controller_1 = __importDefault(require("../../controllers/order.controller"));
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var Order_1 = require("../../models/Order");
var orderRouter = (0, express_1.Router)();
orderRouter.get("/", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(order_controller_1.default.getOrders.bind(order_controller_1.default)));
orderRouter.get("/:orderId", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(order_controller_1.default.getOrderById.bind(order_controller_1.default)));
orderRouter.post("/", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Order_1.createOrderSchema), (0, tryCatch_middleware_1.tryCatch)(order_controller_1.default.addOrder.bind(order_controller_1.default)));
orderRouter.patch("/:orderId", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(Order_1.changeOrderSchema), (0, tryCatch_middleware_1.tryCatch)(order_controller_1.default.changeOrder.bind(order_controller_1.default)));
exports.default = orderRouter;
//# sourceMappingURL=order.route.js.map
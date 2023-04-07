"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersRouter = (0, express_1.Router)();
ordersRouter.get("/");
ordersRouter.get("/:id");
ordersRouter.post("/");
ordersRouter.patch("/:id");
ordersRouter.delete("/:id");
exports.default = ordersRouter;
//# sourceMappingURL=orders.route.js.map
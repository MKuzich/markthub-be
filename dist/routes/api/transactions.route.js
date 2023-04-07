"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var transactionsRouter = (0, express_1.Router)();
transactionsRouter.get("/");
transactionsRouter.get("/:id");
transactionsRouter.post("/");
transactionsRouter.patch("/:id");
transactionsRouter.delete("/:id");
exports.default = transactionsRouter;
//# sourceMappingURL=transactions.route.js.map
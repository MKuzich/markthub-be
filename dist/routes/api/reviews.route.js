"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reviewsRouter = (0, express_1.Router)();
reviewsRouter.get("/");
reviewsRouter.post("/");
reviewsRouter.patch("/:id");
reviewsRouter.delete("/:id");
exports.default = reviewsRouter;
//# sourceMappingURL=reviews.route.js.map
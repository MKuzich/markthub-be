"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoriesRouter = (0, express_1.Router)();
categoriesRouter.get("/");
categoriesRouter.get("/:id");
categoriesRouter.post("/");
categoriesRouter.patch("/:id");
categoriesRouter.delete("/:id");
exports.default = categoriesRouter;
//# sourceMappingURL=categories.route.js.map
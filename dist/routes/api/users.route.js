"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersRouter = (0, express_1.Router)();
usersRouter.get("/");
usersRouter.get("/:id");
usersRouter.post("/");
usersRouter.patch("/:id");
usersRouter.delete("/:id");
exports.default = usersRouter;
//# sourceMappingURL=users.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var authRouter = (0, express_1.Router)();
authRouter.get("/");
authRouter.post("/signup", (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.signUpUser.bind(auth_controller_1.default)));
authRouter.post("/login", (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.logInUser.bind(auth_controller_1.default)));
authRouter.post("/logout");
authRouter.get("/verify/:verificationToken", (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.verifyUser.bind(auth_controller_1.default)));
authRouter.patch("/verify/", (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.reVerifyUser.bind(auth_controller_1.default)));
authRouter.patch("/:id");
authRouter.delete("/:id");
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map
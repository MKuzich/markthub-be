"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var parseFormData_1 = require("../../middlewares/parseFormData");
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var User_1 = require("../../models/User");
var authRouter = (0, express_1.Router)();
authRouter.get("/current", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.getCurrentUser.bind(auth_controller_1.default)));
authRouter.post("/signup", (0, parseFormData_1.parseAvatar)(), (0, validateRequest_middleware_1.validateRequest)(User_1.createUserSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.signUpUser.bind(auth_controller_1.default)));
authRouter.post("/login", (0, validateRequest_middleware_1.validateRequest)(User_1.userLogInSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.logInUser.bind(auth_controller_1.default)));
authRouter.get("/logout", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.logOutUser.bind(auth_controller_1.default)));
authRouter.get("/verify/:verificationToken", (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.verifyUser.bind(auth_controller_1.default)));
authRouter.patch("/verify/", (0, validateRequest_middleware_1.validateRequest)(User_1.verifyEmailSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.reVerifyUser.bind(auth_controller_1.default)));
authRouter.patch("/forgot-password", (0, validateRequest_middleware_1.validateRequest)(User_1.verifyEmailSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.changeForgottenUserPassword.bind(auth_controller_1.default)));
authRouter.post("/reset-password/:resetToken/:passwordId", (0, validateRequest_middleware_1.validateRequest)(User_1.setNewPasswordSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.resetUserPassword.bind(auth_controller_1.default)));
authRouter.patch("/change-password", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(User_1.changeUserPasswordSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.changeUserPassword.bind(auth_controller_1.default)));
authRouter.patch("/change-email", authValidate_middleware_1.default, (0, validateRequest_middleware_1.validateRequest)(User_1.verifyEmailSchema), (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.changeUserEmail.bind(auth_controller_1.default)));
authRouter.get("/reset-email/:emailChangeToken", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(auth_controller_1.default.resetUserEmail.bind(auth_controller_1.default)));
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map
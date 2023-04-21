"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../../controllers/user.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var authValidate_middleware_1 = __importDefault(require("../../middlewares/authValidate.middleware"));
var parseFormData_1 = require("../../middlewares/parseFormData");
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var User_1 = require("../../models/User");
var userRouter = (0, express_1.Router)();
userRouter.patch("/", authValidate_middleware_1.default, (0, parseFormData_1.parseAvatar)(), (0, validateRequest_middleware_1.validateRequest)(User_1.changeUserDataSchema), (0, tryCatch_middleware_1.tryCatch)(user_controller_1.default.changeUserData.bind(user_controller_1.default)));
userRouter.get("/current", authValidate_middleware_1.default, (0, tryCatch_middleware_1.tryCatch)(user_controller_1.default.getCurrentUser.bind(user_controller_1.default)));
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map
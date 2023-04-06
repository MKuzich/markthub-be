"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../../models/User");
var user_controller_1 = __importDefault(require("../../controllers/user.controller"));
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var authValidate_1 = __importDefault(require("../../middlewares/authValidate"));
var userRouter = express_1.Router();
userRouter.post('/register', validateRequest_middleware_1.validateRequest(User_1.schemaSignUpUser), tryCatch_middleware_1.tryCatch(user_controller_1.default.register.bind(user_controller_1.default)));
userRouter.post('/login', validateRequest_middleware_1.validateRequest(User_1.schemaSignUpUser), tryCatch_middleware_1.tryCatch(user_controller_1.default.logIn.bind(user_controller_1.default)));
userRouter.post('/logout', authValidate_1.default, tryCatch_middleware_1.tryCatch(user_controller_1.default.logOut.bind(user_controller_1.default)));
userRouter.patch('/', authValidate_1.default, tryCatch_middleware_1.tryCatch(user_controller_1.default.changePassword.bind(user_controller_1.default)));
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map
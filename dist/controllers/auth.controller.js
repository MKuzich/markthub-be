"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var auth_service_1 = __importDefault(require("../services/auth.service"));
var email_service_1 = __importDefault(require("../services/email.service"));
var errors_1 = require("../helpers/errors");
var AuthController = /** @class */ (function () {
    function AuthController(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    AuthController.prototype.signUpUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var data, verificationToken, isSent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        return [4 /*yield*/, this.authService.signUp(data)];
                    case 1:
                        verificationToken = _a.sent();
                        return [4 /*yield*/, this.emailService.sendEmailVerify(data.email, verificationToken)];
                    case 2:
                        isSent = _a.sent();
                        if (!isSent) {
                            throw (0, errors_1.createError)(500, "Error sending email.");
                        }
                        return [2 /*return*/, isSent];
                }
            });
        });
    };
    AuthController.prototype.verifyUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var verificationToken, isVerify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verificationToken = req.params.verificationToken;
                        return [4 /*yield*/, this.authService.verify(verificationToken)];
                    case 1:
                        isVerify = _a.sent();
                        if (!isVerify) {
                            throw (0, errors_1.createError)(500, "Verifing error.");
                        }
                        return [2 /*return*/, isVerify];
                }
            });
        });
    };
    AuthController.prototype.reVerifyUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, isSent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body;
                        if (!email) {
                            throw (0, errors_1.createError)(400, "Missing required field email");
                        }
                        return [4 /*yield*/, this.authService.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.emailService.sendEmailVerify(email, user.verificationToken)];
                    case 2:
                        isSent = _a.sent();
                        if (!isSent) {
                            throw (0, errors_1.createError)(500, "Error sending email.");
                        }
                        return [2 /*return*/, isSent];
                }
            });
        });
    };
    AuthController.prototype.logInUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        return [4 /*yield*/, this.authService.logIn(body)];
                    case 1:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        res.cookie("refreshToken", refreshToken, { httpOnly: true });
                        res.setHeader("Authorization", "Bearer ".concat(accessToken));
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getCurrentUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user) {
                            throw (0, errors_1.createError)(401, "Not authorized.");
                        }
                        id = req.user.id;
                        return [4 /*yield*/, this.authService.getCurrent(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthController.prototype.logOutUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, isLogOuted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user) {
                            throw (0, errors_1.createError)(401, "Not authorized.");
                        }
                        id = req.user.id;
                        return [4 /*yield*/, this.authService.logOut(id)];
                    case 1:
                        isLogOuted = _a.sent();
                        return [2 /*return*/, isLogOuted];
                }
            });
        });
    };
    AuthController.prototype.changeUserPassword = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, token, isSent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        return [4 /*yield*/, this.authService.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.authService.createPasswordReset(user._id)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, this.emailService.sendChangePassword(email, token)];
                    case 3:
                        isSent = _a.sent();
                        return [2 /*return*/, isSent];
                }
            });
        });
    };
    AuthController.prototype.resetUserPassword = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var resetToken, newPassword, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resetToken = req.params.resetToken;
                        newPassword = req.body.newPassword;
                        return [4 /*yield*/, this.authService.resetPassword(resetToken, newPassword)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
var authController = new AuthController(new auth_service_1.default(), new email_service_1.default());
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var storage_blob_1 = require("@azure/storage-blob");
var crypto_1 = __importDefault(require("crypto"));
var User_1 = __importDefault(require("../models/User"));
var PasswordReset_1 = __importDefault(require("../models/PasswordReset"));
var errors_1 = require("../helpers/errors");
var uuid_1 = require("uuid");
var _a = process.env, ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME = _a.ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION_TIME = _a.REFRESH_TOKEN_EXPIRATION_TIME, ENCRYPTION_KEY = _a.ENCRYPTION_KEY, AZURE_STORAGE_CONNECTION_STRING = _a.AZURE_STORAGE_CONNECTION_STRING;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.authenticate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET).id;
                        if (!id) {
                            throw (0, errors_1.createError)(401, "Not authorized.");
                        }
                        return [4 /*yield*/, User_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.accessToken) {
                            throw (0, errors_1.createError)(401, "Invalid token.");
                        }
                        if (user.accessToken !== token) {
                            throw (0, errors_1.createError)(401, "Bad credential.");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.refresh = function (cookies, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, payload, newAccessToken, newRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken;
                        if (!(!cookies || !token)) return [3 /*break*/, 2];
                        id = jsonwebtoken_1.default.decode(accessToken).id;
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, {
                                accessToken: null,
                                refreshToken: null,
                            })];
                    case 1:
                        _a.sent();
                        throw (0, errors_1.createError)(401, "Refresh token is missing.");
                    case 2:
                        payload = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
                        newAccessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
                            expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
                        });
                        newRefreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
                            expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
                        });
                        return [2 /*return*/, { payload: payload, newAccessToken: newAccessToken, newRefreshToken: newRefreshToken }];
                }
            });
        });
    };
    AuthService.prototype.verifyEmail = function (email, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailChangeToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw (0, errors_1.createError)(409, "Email already in use.");
                        }
                        emailChangeToken = (0, uuid_1.v4)();
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, { emailChangeToken: emailChangeToken, newEmail: email })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, emailChangeToken];
                }
            });
        });
    };
    AuthService.prototype.signUp = function (userData, file) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, userByEmail, hashedPassword, verificationToken, newUser, containerName, blobServiceClient, containerClient, upload, filename, blobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = userData.email, password = userData.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        userByEmail = _a.sent();
                        if (userByEmail) {
                            throw (0, errors_1.createError)(409, "Email already in use.");
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        verificationToken = (0, uuid_1.v4)();
                        newUser = __assign(__assign({}, userData), { password: hashedPassword, verificationToken: verificationToken });
                        if (!file) return [3 /*break*/, 5];
                        containerName = "users";
                        blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
                        containerClient = blobServiceClient.getContainerClient(containerName);
                        upload = file;
                        if (!upload) return [3 /*break*/, 4];
                        filename = (0, uuid_1.v4)() + "-" + upload.originalname;
                        blobClient = containerClient.getBlockBlobClient(filename);
                        return [4 /*yield*/, blobClient.uploadData(upload.buffer, {
                                blobHTTPHeaders: { blobContentType: upload.mimetype },
                            })];
                    case 3:
                        _a.sent();
                        newUser.image = blobClient.url;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        newUser.image = null;
                        _a.label = 6;
                    case 6: return [4 /*yield*/, User_1.default.create(newUser)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, verificationToken];
                }
            });
        });
    };
    AuthService.prototype.verify = function (verificationToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ verificationToken: verificationToken })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        if (user.verify) {
                            throw (0, errors_1.createError)(409, "User already verified.");
                        }
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, {
                                verificationToken: null,
                                verify: true,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.prototype.logIn = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, email, password, user, isPasswordMatch, payload, accessToken, refreshToken, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phone = data.phone, email = data.email, password = data.password;
                        if (!phone && !email) {
                            throw (0, errors_1.createError)(400, "Missing required field email or phone.");
                        }
                        if (!phone) return [3 /*break*/, 2];
                        return [4 /*yield*/, User_1.default.findOne({ phone: phone })];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 3:
                        user = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        if (!user.verify) {
                            throw (0, errors_1.createError)(401, "User not verified.");
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 5:
                        isPasswordMatch = _a.sent();
                        if (!isPasswordMatch) {
                            throw (0, errors_1.createError)(401, "Invalid credentials.");
                        }
                        payload = { id: user._id };
                        return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
                                expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
                            })];
                    case 6:
                        accessToken = _a.sent();
                        return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
                                expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
                            })];
                    case 7:
                        refreshToken = _a.sent();
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, {
                                new: true,
                            })];
                    case 8:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            throw (0, errors_1.createError)(500, "Tokens didnot create.");
                        }
                        return [2 /*return*/, updatedUser];
                }
            });
        });
    };
    AuthService.prototype.logOut = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, {
                            accessToken: null,
                            refreshToken: null,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.prototype.createPasswordReset = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var token, iv, cipher, encryptedToken, createdPasswordReset, newPasswordReset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = crypto_1.default.randomBytes(32).toString("hex");
                        iv = crypto_1.default.randomBytes(16);
                        cipher = crypto_1.default.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
                        encryptedToken = cipher.update(token, "utf8", "base64");
                        encryptedToken += cipher.final("base64");
                        return [4 /*yield*/, PasswordReset_1.default.findOne({ user: id })];
                    case 1:
                        createdPasswordReset = _a.sent();
                        if (!createdPasswordReset) return [3 /*break*/, 3];
                        return [4 /*yield*/, PasswordReset_1.default.findByIdAndUpdate(createdPasswordReset._id, {
                                token: token,
                                iv: iv,
                            }, { new: true })];
                    case 2:
                        newPasswordReset = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, PasswordReset_1.default.create({
                            user: id,
                            token: token,
                            iv: iv,
                        })];
                    case 4:
                        newPasswordReset = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!newPasswordReset) {
                            throw (0, errors_1.createError)(500, "Cannot change password now");
                        }
                        return [2 /*return*/, { encryptedToken: encryptedToken, id: newPasswordReset._id }];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (encryptedToken, newPassword, passwordId) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordReset, decipher, decryptedToken, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PasswordReset_1.default.findById(passwordId)];
                    case 1:
                        passwordReset = _a.sent();
                        if (!passwordReset) {
                            throw (0, errors_1.createError)(400, "Invalid or expired password reset token.");
                        }
                        decipher = crypto_1.default.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, passwordReset.iv);
                        decryptedToken = decipher.update(encryptedToken, "base64", "utf8");
                        decryptedToken += decipher.final("utf8");
                        if (!(decryptedToken !== passwordReset.token)) return [3 /*break*/, 3];
                        return [4 /*yield*/, PasswordReset_1.default.findByIdAndRemove(passwordId)];
                    case 2:
                        _a.sent();
                        throw (0, errors_1.createError)(400, "Invalid or expired token.");
                    case 3: return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
                    case 4:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(passwordReset.user, {
                                password: hashedPassword,
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, PasswordReset_1.default.findByIdAndRemove(passwordId)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.prototype.resetEmail = function (emailChangeToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ emailChangeToken: emailChangeToken })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "Token not found. Try again.");
                        }
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, { email: user.newEmail, emailChangeToken: null, newEmail: null }, { new: true })];
                    case 2:
                        changedUser = _a.sent();
                        return [2 /*return*/, changedUser];
                }
            });
        });
    };
    AuthService.prototype.changePassword = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var newPassword, oldPassword, user, isPasswordMatch, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = data.newPassword, oldPassword = data.oldPassword;
                        return [4 /*yield*/, User_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(oldPassword, user.password)];
                    case 2:
                        isPasswordMatch = _a.sent();
                        if (!isPasswordMatch) {
                            throw (0, errors_1.createError)(401, "Invalid credentials.");
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, { password: hashedPassword })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map
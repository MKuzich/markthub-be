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
var errors_1 = require("../helpers/errors");
var storage_blob_1 = require("@azure/storage-blob");
var uuid_1 = require("uuid");
var User_1 = __importDefault(require("../models/User"));
var AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(409, "Wrong email.");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.changeData = function (id, data, file) {
        if (file === void 0) { file = null; }
        return __awaiter(this, void 0, void 0, function () {
            var newUsersData, containerName, blobServiceClient, containerClient, upload, filename, blobClient, user, oldImageParts, oldImage, oldBlobClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUsersData = __assign({}, data);
                        if (!file) return [3 /*break*/, 6];
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
                    case 1:
                        _a.sent();
                        newUsersData.image = blobClient.url;
                        return [4 /*yield*/, User_1.default.findById(id)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        if (!user.image) return [3 /*break*/, 4];
                        oldImageParts = user.image.split("/");
                        oldImage = oldImageParts[oldImageParts.length - 1];
                        oldBlobClient = containerClient.getBlockBlobClient(oldImage);
                        return [4 /*yield*/, oldBlobClient.delete()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, newUsersData)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getCurrent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, phone, email, firstName, secondName, image, rate, date, reviews, products, cart, orders, _id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(409, "Undefined user.");
                        }
                        phone = user.phone, email = user.email, firstName = user.firstName, secondName = user.secondName, image = user.image, rate = user.rate, date = user.date, reviews = user.reviews, products = user.products, cart = user.cart, orders = user.orders, _id = user._id;
                        return [2 /*return*/, {
                                phone: phone,
                                email: email,
                                firstName: firstName,
                                secondName: secondName,
                                image: image,
                                rate: rate,
                                date: date,
                                reviews: reviews,
                                products: products,
                                cart: cart,
                                orders: orders,
                                _id: _id,
                            }];
                }
            });
        });
    };
    UserService.prototype.addReview = function (userId, reviewId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $push: { reviews: { $each: [reviewId], $position: 0 } },
                        }, { new: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserService.prototype.deleteReview = function (userId, reviewId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $pull: { reviews: reviewId },
                        }, { new: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserService.prototype.addProduct = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $push: { products: { $each: [productId], $position: 0 } },
                        }, { new: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserService.prototype.deleteProduct = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $pull: { products: productId },
                        }, { new: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserService.prototype.addOrder = function (userId, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, {
                            $push: { orders: { $each: [orderId], $position: 0 } },
                        }, { new: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw (0, errors_1.createError)(404, "User not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.service.js.map
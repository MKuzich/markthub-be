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
var uuid_1 = require("uuid");
var storage_blob_1 = require("@azure/storage-blob");
var Product_1 = __importDefault(require("../models/Product"));
var errors_1 = require("../helpers/errors");
var checkOwner_1 = require("../helpers/checkOwner");
var AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.findAll = function (query, skip, limit, sort) {
        return __awaiter(this, void 0, void 0, function () {
            var productsQuery, products, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsQuery = Product_1.default.find(query).sort({ date: "desc" });
                        if (sort) {
                            productsQuery.sort(sort);
                        }
                        return [4 /*yield*/, productsQuery.skip(skip).limit(limit)];
                    case 1:
                        products = _a.sent();
                        return [4 /*yield*/, Product_1.default.find(query).countDocuments()];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, { products: products, total: total }];
                }
            });
        });
    };
    ProductService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.findById(id)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.add = function (owner, product, files) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct, images, containerName, blobServiceClient, containerClient, uploads, _i, uploads_1, upload, filename, blobClient, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProduct = __assign(__assign({}, product), { owner: owner });
                        images = [];
                        containerName = "product-photos";
                        blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
                        containerClient = blobServiceClient.getContainerClient(containerName);
                        uploads = files;
                        if (!(uploads && uploads.length > 0)) return [3 /*break*/, 5];
                        _i = 0, uploads_1 = uploads;
                        _a.label = 1;
                    case 1:
                        if (!(_i < uploads_1.length)) return [3 /*break*/, 4];
                        upload = uploads_1[_i];
                        filename = (0, uuid_1.v4)() + "-" + upload.originalname;
                        blobClient = containerClient.getBlockBlobClient(filename);
                        return [4 /*yield*/, blobClient.uploadData(upload.buffer, {
                                blobHTTPHeaders: { blobContentType: upload.mimetype },
                            })];
                    case 2:
                        _a.sent();
                        images.push(blobClient.url);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        newProduct.images = images;
                        _a.label = 5;
                    case 5: return [4 /*yield*/, Product_1.default.create(newProduct)];
                    case 6:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ProductService.prototype.addOrder = function (products, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedProducts, isNotEnoughQuantity, changeProductsPromises, orderedProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.find({
                            $or: products.map(function (_a) {
                                var product = _a.product;
                                return { product: product };
                            }),
                        })];
                    case 1:
                        selectedProducts = _a.sent();
                        if (products.length !== selectedProducts.length) {
                            return [2 /*return*/, (0, errors_1.createError)(404, "All products not found.")];
                        }
                        isNotEnoughQuantity = selectedProducts.some(function (_a) {
                            var _id = _a._id, quantity = _a.quantity;
                            return products.find(function (_a) {
                                var product = _a.product;
                                return product.toString() === _id.toString();
                            })
                                .amount > quantity;
                        });
                        if (isNotEnoughQuantity) {
                            return [2 /*return*/, (0, errors_1.createError)(400, "An insufficient amount of products at stock!")];
                        }
                        changeProductsPromises = products.map(function (_a) {
                            var product = _a.product, amount = _a.amount;
                            var selectedProduct = selectedProducts.find(function (selectedProduct) {
                                return selectedProduct._id.toString() === product.toString();
                            });
                            return Product_1.default.findByIdAndUpdate(product, {
                                $push: { orders: { $each: [{ orderId: orderId, amount: amount }], $position: 0 } },
                                quantity: selectedProduct.quantity - amount,
                                ordersPerDay: selectedProduct.ordersPerDay + amount,
                                totalOrders: selectedProduct.totalOrders + amount,
                            }, { new: true });
                        });
                        return [4 /*yield*/, Promise.all(changeProductsPromises)];
                    case 2:
                        orderedProducts = _a.sent();
                        return [2 /*return*/, orderedProducts];
                }
            });
        });
    };
    ProductService.prototype.addReview = function (productId, reviewId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.findByIdAndUpdate(productId, {
                            $push: { reviews: { $each: [reviewId], $position: 0 } },
                        }, { new: true })];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw (0, errors_1.createError)(404, "Product not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProductService.prototype.deleteReview = function (productId, reviewId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.findByIdAndUpdate(productId, {
                            $pull: { reviews: reviewId },
                        }, { new: true })];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw (0, errors_1.createError)(404, "Product not found.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProductService.prototype.change = function (userId, productId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.findById(productId)];
                    case 1:
                        product = _a.sent();
                        (0, checkOwner_1.checkOwner)(product, userId, "product");
                        return [4 /*yield*/, Product_1.default.findByIdAndUpdate(productId, data, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProductService.prototype.delete = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var product, deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.findById(productId)];
                    case 1:
                        product = _a.sent();
                        (0, checkOwner_1.checkOwner)(product, userId, "product");
                        return [4 /*yield*/, Product_1.default.findByIdAndRemove(productId)];
                    case 2:
                        deletedProduct = _a.sent();
                        if (!deletedProduct) {
                            throw (0, errors_1.createError)(404, "Product not found.");
                        }
                        return [2 /*return*/, deletedProduct];
                }
            });
        });
    };
    return ProductService;
}());
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map
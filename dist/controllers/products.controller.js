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
var product_service_1 = __importDefault(require("../services/product.service"));
var category_service_1 = __importDefault(require("../services/category.service"));
var user_service_1 = __importDefault(require("../services/user.service"));
var buildProductQuery_1 = require("../helpers/buildProductQuery");
var parseSortParameter_1 = require("../helpers/parseSortParameter");
var ProductController = /** @class */ (function () {
    function ProductController(productService, categoryService, userService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.userService = userService;
    }
    ProductController.prototype.getProducts = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, _d, sort, skip, filter, query, sortObj, data;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.sort, sort = _d === void 0 ? undefined : _d;
                        skip = (page - 1) * limit;
                        filter = req.query;
                        query = (0, buildProductQuery_1.buildProductQuery)(filter);
                        sortObj = (0, parseSortParameter_1.parseSortParameter)(sort);
                        return [4 /*yield*/, this.productService.findAll(query, skip, limit, sortObj)];
                    case 1:
                        data = _e.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ProductController.prototype.getProductById = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = req.params.productId;
                        return [4 /*yield*/, this.productService.findById(productId)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductController.prototype.addProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, images, fileArray, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.user.id;
                        data = req.body;
                        images = req.files;
                        fileArray = [];
                        if (Array.isArray(images)) {
                            fileArray = images;
                        }
                        else if (typeof images === "object" && images !== null) {
                            fileArray = Object.values(images).flat();
                        }
                        return [4 /*yield*/, this.productService.add(id, data, fileArray)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.userService.addProduct(id, product._id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.categoryService.addProduct(product.category, product._id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductController.prototype.changeProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, id, data, isUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = req.params.productId;
                        id = req.user.id;
                        data = req.body;
                        return [4 /*yield*/, this.productService.change(id, productId, data)];
                    case 1:
                        isUpdated = _a.sent();
                        return [2 /*return*/, isUpdated];
                }
            });
        });
    };
    ProductController.prototype.deleteProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, id, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = req.params.productId;
                        id = req.user.id;
                        return [4 /*yield*/, this.productService.delete(id, productId)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.userService.deleteProduct(id, product._id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.categoryService.deleteProduct(product.category, product._id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    return ProductController;
}());
var productController = new ProductController(new product_service_1.default(), new category_service_1.default(), new user_service_1.default());
exports.default = productController;
//# sourceMappingURL=products.controller.js.map
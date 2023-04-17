"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_route_1 = __importDefault(require("./api/product.route"));
var category_route_1 = __importDefault(require("./api/category.route"));
var order_route_1 = __importDefault(require("./api/order.route"));
var review_route_1 = __importDefault(require("./api/review.route"));
var auth_route_1 = __importDefault(require("./api/auth.route"));
var user_route_1 = __importDefault(require("./api/user.route"));
var AppRouter = /** @class */ (function () {
    function AppRouter(app) {
        this.app = app;
    }
    AppRouter.prototype.init = function () {
        this.app.get("/", function (_req, res) {
            res.send("API Running");
        });
        this.app.use("/api/products", product_route_1.default);
        this.app.use("/api/categories", category_route_1.default);
        this.app.use("/api/orders", order_route_1.default);
        this.app.use("/api/reviews", review_route_1.default);
        this.app.use("/api/auth", auth_route_1.default);
        this.app.use("/api/user", user_route_1.default);
    };
    return AppRouter;
}());
exports.default = AppRouter;
//# sourceMappingURL=index.js.map
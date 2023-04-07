"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_route_1 = __importDefault(require("./api/products.route"));
var categories_route_1 = __importDefault(require("./api/categories.route"));
var orders_route_1 = __importDefault(require("./api/orders.route"));
var reviews_route_1 = __importDefault(require("./api/reviews.route"));
var transactions_route_1 = __importDefault(require("./api/transactions.route"));
var users_route_1 = __importDefault(require("./api/users.route"));
var AppRouter = /** @class */ (function () {
    function AppRouter(app) {
        this.app = app;
    }
    AppRouter.prototype.init = function () {
        this.app.get("/", function (_req, res) {
            res.send("API Running");
        });
        this.app.use("/api/products", products_route_1.default);
        this.app.use("/api/categories", categories_route_1.default);
        this.app.use("/api/orders", orders_route_1.default);
        this.app.use("/api/reviews", reviews_route_1.default);
        this.app.use("/api/transactions", transactions_route_1.default);
        this.app.use("/api/users", users_route_1.default);
    };
    return AppRouter;
}());
exports.default = AppRouter;
//# sourceMappingURL=index.js.map
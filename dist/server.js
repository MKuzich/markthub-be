"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var database_1 = __importDefault(require("./config/database"));
var handleError_middleware_1 = require("./middlewares/handleError.middleware");
var app = (0, express_1.default)();
var formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
var router = new routes_1.default(app);
// Connect to MongoDB
(0, database_1.default)();
// Express configuration
app.set("port", process.env.PORT || 4200);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
router.init();
app.use(handleError_middleware_1.handleError);
var port = app.get("port");
// eslint-disable-next-line no-console
var server = app.listen(port, function () {
    return console.log("Server started on port ".concat(port));
});
exports.default = server;
//# sourceMappingURL=server.js.map
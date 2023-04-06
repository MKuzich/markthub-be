"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
var http_status_codes_1 = require("http-status-codes");
var handleError = function (err, req, res, next) {
    var _a = err.status, status = _a === void 0 ? http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR : _a, _b = err.code, code = _b === void 0 ? (0, http_status_codes_1.getStatusCode)(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR) : _b, _c = err.message, message = _c === void 0 ? http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR : _c;
    res.status(code).json({
        status: status,
        code: code,
        message: message
    });
    next();
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.middleware.js.map
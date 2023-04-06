"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var http_status_codes_1 = require("http-status-codes");
exports.validateRequest = function (schema) { return function (req, res, next) {
    var error = schema.validate(req.body).error;
    if (error) {
        res.json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            code: 400,
            message: error.message
        });
    }
    else {
        next();
    }
}; };
//# sourceMappingURL=validateRequest.middleware.js.map
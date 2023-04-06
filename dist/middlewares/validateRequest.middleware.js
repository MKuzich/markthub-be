"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var errors_1 = require("../helpers/errors");
var validateRequest = function (schema) { return function (req, _, next) {
    var error = schema.validate(req.body).error;
    if (error) {
        next((0, errors_1.createError)(400, 'Fields validate error!'));
    }
    else {
        next();
    }
}; };
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.middleware.js.map
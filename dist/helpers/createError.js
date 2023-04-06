"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
exports.createError = function (status, code, message) {
    var error = new Error(message);
    error.status = status;
    error.code = code;
    return error;
};
//# sourceMappingURL=createError.js.map
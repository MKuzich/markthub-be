"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwner = void 0;
var errors_1 = require("./errors");
var checkOwner = function (data, userId, dataName) {
    if (!data) {
        throw (0, errors_1.createError)(404, "".concat(dataName.charAt(0).toUpperCase() + dataName.slice(1), " not found."));
    }
    if (data.owner.toString() !== userId) {
        throw (0, errors_1.createError)(403, "Forbidden. You cann't change this ".concat(dataName, ", because it's not your."));
    }
};
exports.checkOwner = checkOwner;
//# sourceMappingURL=checkOwner.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSortParameter = void 0;
var parseSortParameter = function (sortParam) {
    if (!sortParam) {
        return undefined;
    }
    var sortFields = sortParam.split(",");
    var sortObject = {};
    for (var _i = 0, sortFields_1 = sortFields; _i < sortFields_1.length; _i++) {
        var field = sortFields_1[_i];
        var _a = field.split(":"), key = _a[0], value = _a[1];
        if (value === "asc" || value === "desc") {
            sortObject[key] = value;
        }
    }
    return sortObject;
};
exports.parseSortParameter = parseSortParameter;
//# sourceMappingURL=parseSortParameter.js.map
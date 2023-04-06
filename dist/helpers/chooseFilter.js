"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseFilter = void 0;
var chooseFilter = function (filter) {
    var filterObj = __assign(__assign(__assign({}, (filter === 'private' && { public: false })), (filter === 'public' && { public: true })), (filter === 'complete' && { complited: true }));
    return filterObj;
};
exports.chooseFilter = chooseFilter;
//# sourceMappingURL=chooseFilter.js.map
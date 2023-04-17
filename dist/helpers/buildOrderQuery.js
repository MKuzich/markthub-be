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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrderQuery = void 0;
var buildOrderQuery = function (_a, owner) {
    var status = _a.status, createdAt = _a.createdAt, totalPrice = _a.totalPrice, search = _a.search;
    var query = __assign(__assign(__assign(__assign({}, (owner && { owner: owner })), (status && { status: status })), (createdAt &&
        (createdAt.from && createdAt.to
            ? { createdAt: { $gte: createdAt.from, $lte: createdAt.to } }
            : createdAt.from
                ? { createdAt: { $gte: createdAt.from } }
                : { createdAt: { $lte: createdAt.to } }))), (totalPrice &&
        (totalPrice.min && totalPrice.max
            ? { totalPrice: { $gte: totalPrice.min, $lte: totalPrice.max } }
            : totalPrice.min
                ? { totalPrice: { $gte: totalPrice.min } }
                : { totalPrice: { $lte: totalPrice.max } })));
    if (search) {
        var searchTerms = search.split(" ");
        var searchQueries = searchTerms.map(function (term) { return ({
            $or: [
                { "destination.firstName": new RegExp(term, "i") },
                { "destination.secondName": new RegExp(term, "i") },
                { "destination.phone": new RegExp(term, "i") },
                { "destination.country": new RegExp(term, "i") },
                { "destination.city": new RegExp(term, "i") },
                { "destination.address": new RegExp(term, "i") },
                { info: new RegExp(term, "i") },
            ],
        }); });
        query.$and = __spreadArray(__spreadArray([], (query.$and || []), true), searchQueries, true);
    }
    return query;
};
exports.buildOrderQuery = buildOrderQuery;
//# sourceMappingURL=buildOrderQuery.js.map
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
exports.buildProductQuery = void 0;
var buildProductQuery = function (_a) {
    var category = _a.category, price = _a.price, withImage = _a.withImage, withPromoPrice = _a.withPromoPrice, owner = _a.owner, active = _a.active, rate = _a.rate, totalOrders = _a.totalOrders, withReviews = _a.withReviews, inStock = _a.inStock, search = _a.search;
    var query = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (category && { category: category })), (price &&
        (price.min && price.max
            ? { price: { $gte: price.min, $lte: price.max } }
            : price.min
                ? { price: { $gte: price.min } }
                : { price: { $lte: price.max } }))), (withImage && { images: { $exists: true, $ne: [] } })), (withPromoPrice && { promoPrice: { $gt: 0 } })), (owner && { owner: owner })), (active !== undefined && { active: active })), (rate &&
        (rate.min && rate.max
            ? { rate: { $gte: rate.min, $lte: rate.max } }
            : rate.min
                ? { rate: { $gte: rate.min } }
                : { rate: { $lte: rate.max } }))), (totalOrders !== undefined && {
        totalOrders: { $gte: totalOrders },
    })), (withReviews && { reviews: { $exists: true, $ne: [] } })), (inStock && { quantity: { $gte: inStock } }));
    if (search) {
        var searchTerms = search.split(" ");
        var searchQueries = searchTerms.map(function (term) { return ({
            $or: [
                { header: new RegExp(term, "i") },
                { description: new RegExp(term, "i") },
            ],
        }); });
        query.$and = __spreadArray(__spreadArray([], (query.$and || []), true), searchQueries, true);
    }
    return query;
};
exports.buildProductQuery = buildProductQuery;
//# sourceMappingURL=buildProductQuery.js.map
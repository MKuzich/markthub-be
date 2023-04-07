"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    desription: {
        type: String,
        required: true,
    },
});
var Category = (0, mongoose_1.model)("Categiry", categorySchema);
exports.default = Category;
//# sourceMappingURL=Category.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var passwordResetSchema = new mongoose_1.Schema({
    user: {
        type: String,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});
var PasswordReset = (0, mongoose_1.model)("PasswordReset", passwordResetSchema);
exports.default = PasswordReset;
//# sourceMappingURL=PasswordReset.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFormData = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
var parseFormData = function () { return upload.array("images"); };
exports.parseFormData = parseFormData;
//# sourceMappingURL=parseFormData.js.map
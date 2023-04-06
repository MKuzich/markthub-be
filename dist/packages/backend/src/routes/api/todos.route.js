"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Todo_1 = __importStar(require("../../models/Todo"));
var todo_controller_1 = __importDefault(require("../../controllers/todo.controller"));
var validateRequest_middleware_1 = require("../../middlewares/validateRequest.middleware");
var tryCatch_middleware_1 = require("../../middlewares/tryCatch.middleware");
var isExist_middleware_1 = require("../../middlewares/isExist.middleware");
var authValidate_1 = __importDefault(require("../../middlewares/authValidate"));
var todosRouter = express_1.Router();
todosRouter.get('/', authValidate_1.default, tryCatch_middleware_1.tryCatch(todo_controller_1.default.getAllTodo.bind(todo_controller_1.default)));
todosRouter.get('/:id', isExist_middleware_1.isExist(Todo_1.default), tryCatch_middleware_1.tryCatch(todo_controller_1.default.getById.bind(todo_controller_1.default)));
todosRouter.post('/', validateRequest_middleware_1.validateRequest(Todo_1.schemaCreateTodo), tryCatch_middleware_1.tryCatch(todo_controller_1.default.addTodo.bind(todo_controller_1.default)));
todosRouter.put('/:id', isExist_middleware_1.isExist(Todo_1.default), validateRequest_middleware_1.validateRequest(Todo_1.schemaUpdateTodo), tryCatch_middleware_1.tryCatch(todo_controller_1.default.changeTodo.bind(todo_controller_1.default)));
todosRouter.delete('/:id', isExist_middleware_1.isExist(Todo_1.default), tryCatch_middleware_1.tryCatch(todo_controller_1.default.deleteTodo.bind(todo_controller_1.default)));
exports.default = todosRouter;
//# sourceMappingURL=todos.route.js.map
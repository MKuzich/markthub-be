import { Router } from "express";
import Todo, { schemaCreateTodo, schemaUpdateTodo } from "../../models/Todo";
import todoController from "../../controllers/todo.controller";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { isExist } from "../../middlewares/isExist.middleware";
import auth from "../../middlewares/authValidate";

const todosRouter: Router = Router();

todosRouter.get(
  "/",
  auth,
  tryCatch(todoController.getAllTodo.bind(todoController))
);

todosRouter.get(
  "/:id",
  auth,
  isExist(Todo),
  tryCatch(todoController.getById.bind(todoController))
);

todosRouter.post(
  "/",
  auth,
  validateRequest(schemaCreateTodo),
  tryCatch(todoController.addTodo.bind(todoController))
);

todosRouter.put(
  "/:id",
  auth,
  isExist(Todo),
  validateRequest(schemaUpdateTodo),
  tryCatch(todoController.changeTodo.bind(todoController))
);

todosRouter.delete(
  "/:id",
  auth,
  isExist(Todo),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;

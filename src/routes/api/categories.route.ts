import { Router } from "express";
import categoriesController from "../../controllers/categories.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const categoriesRouter: Router = Router();

categoriesRouter.get(
  "/",
  tryCatch(categoriesController.getCategories.bind(categoriesController))
);

categoriesRouter.post(
  "/",
  tryCatch(categoriesController.addCategory.bind(categoriesController))
);

export default categoriesRouter;

import { Router } from "express";
import categoryController from "../../controllers/category.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const categoriesRouter: Router = Router();

categoriesRouter.get(
  "/",
  tryCatch(categoryController.getCategories.bind(categoryController))
);

categoriesRouter.get(
  "/:categoryId",
  tryCatch(categoryController.getCategories.bind(categoryController))
);

categoriesRouter.post(
  "/",
  tryCatch(categoryController.addCategory.bind(categoryController))
);

export default categoriesRouter;

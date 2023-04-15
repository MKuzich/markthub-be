import { Router } from "express";
import categoryController from "../../controllers/category.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const categoryRouter: Router = Router();

categoryRouter.get(
  "/",
  tryCatch(categoryController.getCategories.bind(categoryController))
);

categoryRouter.get(
  "/:categoryId",
  tryCatch(categoryController.getCategories.bind(categoryController))
);

categoryRouter.post(
  "/",
  tryCatch(categoryController.addCategory.bind(categoryController))
);

export default categoryRouter;

import { Router } from "express";
import categoryController from "../../controllers/category.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { createCategorySchema } from "../../models/Category";
import auth from "../../middlewares/authValidate.middleware";

const categoryRouter: Router = Router();

categoryRouter.get(
  "/",
  tryCatch(categoryController.getCategories.bind(categoryController))
);

categoryRouter.get(
  "/:categoryId",
  tryCatch(categoryController.getGategoryById.bind(categoryController))
);

categoryRouter.post(
  "/",
  auth,
  validateRequest(createCategorySchema),
  tryCatch(categoryController.addCategory.bind(categoryController))
);

export default categoryRouter;

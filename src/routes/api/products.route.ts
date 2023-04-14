import { Router } from "express";
import productsController from "../../controllers/products.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { parseFormData } from "../../middlewares/parseFormData";
import auth from "../../middlewares/authValidate.middleware";

const productsRouter: Router = Router();

productsRouter.get(
  "/",
  tryCatch(productsController.getProducts.bind(productsController))
);

productsRouter.get(
  "/:id",
  tryCatch(productsController.getProductById.bind(productsController))
);

productsRouter.post(
  "/",
  auth,
  parseFormData(),
  tryCatch(productsController.addProduct.bind(productsController))
);

productsRouter.patch(
  "/:id",
  auth,
  tryCatch(productsController.changeProduct.bind(productsController))
);

productsRouter.delete(
  "/:id",
  auth,
  tryCatch(productsController.deleteProduct.bind(productsController))
);

export default productsRouter;

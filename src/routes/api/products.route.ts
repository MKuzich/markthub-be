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
  "/:productId",
  tryCatch(productsController.getProductById.bind(productsController))
);

productsRouter.post(
  "/",
  auth,
  parseFormData(),
  tryCatch(productsController.addProduct.bind(productsController))
);

productsRouter.patch(
  "/:productId",
  auth,
  tryCatch(productsController.changeProduct.bind(productsController))
);

productsRouter.delete(
  "/:productId",
  auth,
  tryCatch(productsController.deleteProduct.bind(productsController))
);

export default productsRouter;

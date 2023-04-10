import { Router } from "express";
import productsController from "../../controllers/products.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { parseFormData } from "../../middlewares/parseFormData";

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
  parseFormData(),
  tryCatch(productsController.addProduct.bind(productsController))
);

productsRouter.patch(
  "/:id",
  tryCatch(productsController.changeProduct.bind(productsController))
);

productsRouter.delete(
  "/:id",
  tryCatch(productsController.deleteProduct.bind(productsController))
);

export default productsRouter;

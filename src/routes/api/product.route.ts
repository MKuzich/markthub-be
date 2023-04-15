import { Router } from "express";
import productsController from "../../controllers/products.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { parseFormData } from "../../middlewares/parseFormData";
import auth from "../../middlewares/authValidate.middleware";

const productRouter: Router = Router();

productRouter.get(
  "/",
  tryCatch(productsController.getProducts.bind(productsController))
);

productRouter.get(
  "/:productId",
  tryCatch(productsController.getProductById.bind(productsController))
);

productRouter.post(
  "/",
  auth,
  parseFormData(),
  tryCatch(productsController.addProduct.bind(productsController))
);

productRouter.patch(
  "/:productId",
  auth,
  tryCatch(productsController.changeProduct.bind(productsController))
);

productRouter.delete(
  "/:productId",
  auth,
  tryCatch(productsController.deleteProduct.bind(productsController))
);

export default productRouter;

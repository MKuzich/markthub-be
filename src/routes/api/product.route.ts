import { Router } from "express";
import productsController from "../../controllers/products.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import { parseFormData } from "../../middlewares/parseFormData";
import auth from "../../middlewares/authValidate.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import {
  createProductSchema,
  changeProductDataSchema,
} from "../../models/Product";

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
  validateRequest(createProductSchema),
  tryCatch(productsController.addProduct.bind(productsController))
);

productRouter.patch(
  "/:productId",
  auth,
  validateRequest(changeProductDataSchema),
  tryCatch(productsController.changeProduct.bind(productsController))
);

productRouter.delete(
  "/:productId",
  auth,
  tryCatch(productsController.deleteProduct.bind(productsController))
);

export default productRouter;

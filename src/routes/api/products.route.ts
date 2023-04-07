import { Router } from "express";
import productsController from "../../controllers/products.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const productsRouter: Router = Router();

productsRouter.get(
  "/",
  tryCatch(productsController.getProducts.bind(productsController))
);

productsRouter.get("/:id");

productsRouter.post("/");

productsRouter.patch("/:id");

productsRouter.delete("/:id");

export default productsRouter;

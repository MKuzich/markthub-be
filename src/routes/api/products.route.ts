import { Router } from "express";

const productsRouter: Router = Router();

productsRouter.get("/");

productsRouter.get("/:id");

productsRouter.post("/");

productsRouter.patch("/:id");

productsRouter.delete("/:id");

export default productsRouter;

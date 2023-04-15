import { Router } from "express";

const orderRouter: Router = Router();

orderRouter.get("/");

orderRouter.get("/:id");

orderRouter.post("/");

orderRouter.patch("/:id");

orderRouter.delete("/:id");

export default orderRouter;

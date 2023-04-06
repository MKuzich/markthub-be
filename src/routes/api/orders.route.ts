import { Router } from "express";

const ordersRouter: Router = Router();

ordersRouter.get("/");

ordersRouter.get("/:id");

ordersRouter.post("/");

ordersRouter.patch("/:id");

ordersRouter.delete("/:id");

export default ordersRouter;

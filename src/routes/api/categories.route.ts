import { Router } from "express";

const categoriesRouter: Router = Router();

categoriesRouter.get("/");

categoriesRouter.get("/:id");

categoriesRouter.post("/");

categoriesRouter.patch("/:id");

categoriesRouter.delete("/:id");

export default categoriesRouter;

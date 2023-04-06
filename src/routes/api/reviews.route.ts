import { Router } from "express";

const reviewsRouter: Router = Router();

reviewsRouter.get("/");

reviewsRouter.post("/");

reviewsRouter.patch("/:id");

reviewsRouter.delete("/:id");

export default reviewsRouter;

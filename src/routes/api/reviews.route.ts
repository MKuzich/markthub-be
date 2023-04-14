import { Router } from "express";

import { tryCatch } from "../../middlewares/tryCatch.middleware";

const reviewsRouter: Router = Router();

reviewsRouter.get("/");

reviewsRouter.post("/");

reviewsRouter.patch("/:id");

reviewsRouter.delete("/:id");

export default reviewsRouter;

import { Router } from "express";

const transactionsRouter: Router = Router();

transactionsRouter.get("/");

transactionsRouter.get("/:id");

transactionsRouter.post("/");

transactionsRouter.patch("/:id");

transactionsRouter.delete("/:id");

export default transactionsRouter;

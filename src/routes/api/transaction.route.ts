import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.get("/");

transactionRouter.get("/:id");

transactionRouter.post("/");

transactionRouter.patch("/:id");

transactionRouter.delete("/:id");

export default transactionRouter;

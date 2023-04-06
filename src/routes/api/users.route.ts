import { Router } from "express";

const usersRouter: Router = Router();

usersRouter.get("/");

usersRouter.get("/:id");

usersRouter.post("/");

usersRouter.patch("/:id");

usersRouter.delete("/:id");

export default usersRouter;

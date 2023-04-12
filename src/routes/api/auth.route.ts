import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const authRouter: Router = Router();

authRouter.get("/");

authRouter.post(
  "/signup",
  tryCatch(authController.signUpUser.bind(authController))
);

authRouter.post("/login");

authRouter.post("/logout");

authRouter.patch("/verify/:verificationToken");

authRouter.patch("/:id");

authRouter.delete("/:id");

export default authRouter;

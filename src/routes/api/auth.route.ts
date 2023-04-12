import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";

const authRouter: Router = Router();

authRouter.get("/");

authRouter.post(
  "/signup",
  tryCatch(authController.signUpUser.bind(authController))
);

authRouter.post(
  "/login",
  tryCatch(authController.logInUser.bind(authController))
);

authRouter.post("/logout");

authRouter.patch(
  "/verify/:verificationToken",
  tryCatch(authController.verifyUser.bind(authController))
);

authRouter.patch(
  "/verify/",
  tryCatch(authController.reVerifyUser.bind(authController))
);

authRouter.patch("/:id");

authRouter.delete("/:id");

export default authRouter;

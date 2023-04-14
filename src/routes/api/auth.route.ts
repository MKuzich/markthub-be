import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";

const authRouter: Router = Router();

authRouter.get(
  "/current",
  auth,
  tryCatch(authController.getCurrentUser.bind(authController))
);

authRouter.post(
  "/signup",
  tryCatch(authController.signUpUser.bind(authController))
);

authRouter.post(
  "/login",
  tryCatch(authController.logInUser.bind(authController))
);

authRouter.get(
  "/logout",
  auth,
  tryCatch(authController.logOutUser.bind(authController))
);

authRouter.get(
  "/verify/:verificationToken",
  tryCatch(authController.verifyUser.bind(authController))
);

authRouter.patch(
  "/verify/",
  tryCatch(authController.reVerifyUser.bind(authController))
);

authRouter.patch(
  "/changepassword",
  tryCatch(authController.changeUserPassword.bind(authController))
);

authRouter.post(
  "/reset-password/:resetToken/:passwordId",
  tryCatch(authController.resetUserPassword.bind(authController))
);

authRouter.patch("/:id", auth); // change user's data

authRouter.delete("/:id", auth); // delete user, we need this?

export default authRouter;

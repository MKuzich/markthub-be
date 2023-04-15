import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { parseAvatar } from "../../middlewares/parseFormData";

const authRouter: Router = Router();

authRouter.get(
  "/current",
  auth,
  tryCatch(authController.getCurrentUser.bind(authController))
);

authRouter.post(
  "/signup",
  parseAvatar(),
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
  "/forgot-password",
  tryCatch(authController.changeForgottenUserPassword.bind(authController))
);

authRouter.post(
  "/reset-password/:resetToken/:passwordId",
  tryCatch(authController.resetUserPassword.bind(authController))
);

authRouter.patch(
  "/change-password",
  auth,
  tryCatch(authController.changeUserPassword.bind(authController))
);

authRouter.patch(
  "/change-email",
  auth,
  tryCatch(authController.changeUserEmail.bind(authController))
);

authRouter.get(
  "/reset-email/:emailChangeToken",
  auth,
  tryCatch(authController.resetUserEmail.bind(authController))
);

export default authRouter;

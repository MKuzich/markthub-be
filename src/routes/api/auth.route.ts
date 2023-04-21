import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { parseAvatar } from "../../middlewares/parseFormData";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import {
  createUserSchema,
  userLogInSchema,
  verifyEmailSchema,
  setNewPasswordSchema,
  changeUserPasswordSchema,
} from "../../models/User";

const authRouter: Router = Router();

authRouter.post(
  "/signup",
  parseAvatar(),
  validateRequest(createUserSchema),
  tryCatch(authController.signUpUser.bind(authController))
);

authRouter.post(
  "/login",
  validateRequest(userLogInSchema),
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
  "/verify",
  validateRequest(verifyEmailSchema),
  tryCatch(authController.reVerifyUser.bind(authController))
);

authRouter.patch(
  "/forgot-password",
  validateRequest(verifyEmailSchema),
  tryCatch(authController.changeForgottenUserPassword.bind(authController))
);

authRouter.post(
  "/reset-password/:resetToken/:passwordId",
  validateRequest(setNewPasswordSchema),
  tryCatch(authController.resetUserPassword.bind(authController))
);

authRouter.patch(
  "/change-password",
  auth,
  validateRequest(changeUserPasswordSchema),
  tryCatch(authController.changeUserPassword.bind(authController))
);

authRouter.patch(
  "/change-email",
  auth,
  validateRequest(verifyEmailSchema),
  tryCatch(authController.changeUserEmail.bind(authController))
);

authRouter.get(
  "/reset-email/:emailChangeToken",
  auth,
  tryCatch(authController.resetUserEmail.bind(authController))
);

export default authRouter;

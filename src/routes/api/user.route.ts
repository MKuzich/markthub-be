import { Router } from "express";
import userController from "../../controllers/user.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { parseAvatar } from "../../middlewares/parseFormData";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { changeUserDataSchema } from "../../models/User";

const userRouter: Router = Router();

userRouter.patch(
  "/",
  auth,
  parseAvatar(),
  validateRequest(changeUserDataSchema),
  tryCatch(userController.changeUserData.bind(userController))
);

userRouter.get(
  "/current",
  auth,
  tryCatch(userController.getCurrentUser.bind(userController))
);

export default userRouter;

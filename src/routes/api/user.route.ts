import { Router } from "express";
import userController from "../../controllers/user.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { parseAvatar } from "../../middlewares/parseFormData";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { changeUserDataSchema } from "../../models/User";

const userRouter: Router = Router();

userRouter.patch(
  "/:id",
  auth,
  parseAvatar(),
  validateRequest(changeUserDataSchema),
  tryCatch(userController.changeUserData.bind(userController))
);

export default userRouter;

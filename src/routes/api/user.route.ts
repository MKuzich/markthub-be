import { Router } from "express";
import userController from "../../controllers/user.controller";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import auth from "../../middlewares/authValidate.middleware";
import { parseAvatar } from "../../middlewares/parseFormData";

const userRouter: Router = Router();

userRouter.patch(
  "/:id",
  auth,
  parseAvatar(),
  tryCatch(userController.changeUserData.bind(userController))
);

export default userRouter;

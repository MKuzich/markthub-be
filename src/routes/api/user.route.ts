import { Router } from 'express';
import { schemaSignUpUser } from '../../models/User';
import userController from '../../controllers/user.controller';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import auth from '../../middlewares/authValidate';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  validateRequest(schemaSignUpUser),
  tryCatch(userController.register.bind(userController))
);

userRouter.post(
  '/login',
  validateRequest(schemaSignUpUser),
  tryCatch(userController.logIn.bind(userController))
);

userRouter.post('/logout', auth, tryCatch(userController.logOut.bind(userController)));

userRouter.patch('/', auth, tryCatch(userController.changePassword.bind(userController)));

export default userRouter;

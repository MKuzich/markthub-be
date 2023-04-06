import { Request } from 'express';
import UserService from '../services/user.service';
import { IUser, IPasswords, IUserLogin } from '../types/user.type';
import { createError } from '../helpers/errors';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request<any, any, IUserLogin>) {
    const data: IUserLogin = req.body;
    const token = await this.userService.signUp(data);
    return token;
  }

  async logIn(req: Request<any, any, IUserLogin>) {
    const data: IUserLogin = req.body;
    const token = await this.userService.logIn(data);
    return token;
  }

  async logOut(req: Request<any, any, IUser>) {
    const id: string | null = req.user ? req.user._id : null;
    if (!id) {
      createError(401, 'Already unauthorized!');
    } else {
      const result = await this.userService.logOut(id);
      return result;
    }
  }

  async changePassword(req: Request<any, any, IPasswords>) {
    const data: IPasswords = req.body;
    const id: string | null = req.user ? req.user._id : null;
    const result = await this.userService.changePassword(id, data);
    return result;
  }
}

const userController = new UserController(new UserService());
export default userController;

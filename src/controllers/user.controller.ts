import UserService from "../services/user.service";
import { IUserTokenPayload } from "../types/user.type";
import { IFile } from "../types/file.type";
import { IRequest } from "../types/request.type";
import { IUserChangeData } from "../types/user.type";
import { createError } from "../helpers/errors";

export class UserController {
  constructor(private userService: UserService) {}

  async changeUserData(req: IRequest<IUserChangeData, any, any, IFile[]>) {
    const data = req.body;
    const image = req.file ?? null;
    const { id } = req.user as IUserTokenPayload;

    const isChanged = await this.userService.changeData(id, data, image);
    return isChanged;
  }

  async getCurrentUser(req: IRequest<any, any, any>) {
    if (!req.user) {
      throw createError(401, "Not authorized.");
    }
    const { id } = req.user as IUserTokenPayload;
    const user = await this.userService.getCurrent(id);

    return user;
  }
}

const userController = new UserController(new UserService());
export default userController;

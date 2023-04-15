import UserService from "../services/user.service";
import { IUserTokenPayload } from "../types/user.type";
import { IFile } from "../types/file.type";
import { IRequest } from "../types/request.type";
import { IUserChangeData } from "../types/user.type";

export class UserController {
  constructor(private userService: UserService) {}

  async changeUserData(req: IRequest<IUserChangeData, any, any, IFile>) {
    const data = req.body;
    const image = req.file ?? null;
    const { id } = req.user as IUserTokenPayload;

    const isChanged = await this.userService.changeData(id, data, image);
    return isChanged;
  }
}

const userController = new UserController(new UserService());
export default userController;

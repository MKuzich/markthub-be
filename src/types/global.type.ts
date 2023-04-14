import { IUserTokenPayload } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload;
    }
  }
}

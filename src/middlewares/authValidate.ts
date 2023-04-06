import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { createError } from "../helpers/errors";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  if (tokenType !== "Bearer" || !token) {
    next(createError(401, "Not authorized"));
  }
  const user = await UserService.authenticate(token);
  if (!user) {
    next(createError(401, "Not authorized"));
  }
  req.user = user!;
  next();
};

export default auth;

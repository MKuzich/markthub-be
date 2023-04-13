import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { createError } from "../helpers/errors";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");
  try {
    if (tokenType !== "Bearer" || !token) {
      next(createError(401, "Not authorized"));
    }
    const user = await AuthService.authenticate(token);
    if (!user) {
      next(createError(401, "Not authorized"));
    }
    req.user = user!;
    next();
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      try {
        const { refreshToken } = req.cookies;
        const { payload, newAccessToken, newRefreshToken } =
          await AuthService.refresh(refreshToken, token);
        req.user = payload;

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);

        next();
      } catch (err) {
        next(err);
      }
    } else {
      next(err);
    }
  }
};

export default auth;

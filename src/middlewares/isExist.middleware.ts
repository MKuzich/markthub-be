import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';

export const isExist =
  (model: Model<any>) =>
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const exist = await model.exists({ _id: id });
      if (exist) {
        next();
      } else {
        res.json({
          status: StatusCodes.BAD_REQUEST,
          code: 400,
          message: 'Todo did not found!'
        });
      }
    } catch (error) {
      next(error);
    }
  };

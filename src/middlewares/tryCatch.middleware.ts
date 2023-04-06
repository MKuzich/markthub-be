import { Request, Response, NextFunction } from 'express';

export const tryCatch = (ctrl: any) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ctrl(req, res, next);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

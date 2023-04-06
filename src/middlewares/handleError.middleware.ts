import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getStatusCode, ReasonPhrases } from 'http-status-codes';
import { IError } from '../types/error.type';

export const handleError = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const {
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    code = getStatusCode(ReasonPhrases.INTERNAL_SERVER_ERROR),
    message = ReasonPhrases.INTERNAL_SERVER_ERROR
  } = err;
  res.status(code).json({
    status,
    code,
    message
  });
  next();
};

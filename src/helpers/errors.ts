import { IError } from '../types/error.type';

export const createError = (code: number, message: string) => {
  const error: IError = { ...new Error(), code, status: code.toString(), message };
  return error;
};

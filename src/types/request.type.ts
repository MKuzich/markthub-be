import { Request } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

export interface IRequest<
  B,
  P extends ParamsDictionary,
  Q extends Query,
  F extends Express.Multer.File[] = Express.Multer.File[]
> extends Request {
  body: B;
  params: P;
  query: Q;
  files?: F | { [fieldname: string]: F };
}
// files?:
//   | { [fieldname: string]: Express.Multer.File[] }
//   | Express.Multer.File[];

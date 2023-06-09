import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { createError } from "../helpers/errors";

export const validateRequest =
  (schema: Schema) => (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    } else {
      next();
    }
  };

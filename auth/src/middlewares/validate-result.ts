import { Request, Response, NextFunction } from "express";
import { Result, validationResult } from "express-validator";
import { RequestValidatorError } from "../errors/request-validation-error";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidatorError(errors.array());
  }

  next();
};

import { NextFunction, Response } from "express";
import { Request } from "express-validator/src/base";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};

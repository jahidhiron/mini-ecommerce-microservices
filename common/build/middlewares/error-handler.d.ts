import { NextFunction, Response } from "express";
import { Request } from "express-validator/src/base";
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;

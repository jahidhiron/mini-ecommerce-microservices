import { FieldValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export declare class RequestValidatorError extends CustomError {
    errors: FieldValidationError[];
    statusCode: number;
    constructor(errors: FieldValidationError[]);
    serializeErrors(): {
        message: any;
        field: string;
    }[];
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidatorError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidatorError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidatorError.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.path };
        });
    }
}
exports.RequestValidatorError = RequestValidatorError;

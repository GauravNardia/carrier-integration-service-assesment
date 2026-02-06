import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
  code = "VALIDATION_ERROR";
  constructor(message: string) {
    super(message, false);
  }
}
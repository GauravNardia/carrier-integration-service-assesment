import { BaseError } from "./BaseError.js";

export class AuthError extends BaseError {
  code = "AUTH_ERROR";
  constructor(message: string) {
    super(message, true);
  }
}

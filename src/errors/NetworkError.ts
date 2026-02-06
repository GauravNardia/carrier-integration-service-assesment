import { BaseError } from "./BaseError.js";

export class NetworkError extends BaseError {
  code = "NETWORK_ERROR";
  constructor(message: string) {
    super(message, true);
  }
}

import { BaseError } from "./BaseError.js";

export class CarrierError extends BaseError {
  code = "CARRIER_ERROR";
  constructor(message: string) {
    super(message, false);
  }
}

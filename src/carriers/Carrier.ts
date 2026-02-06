import type { RateQuote } from "../domain/RateQuote.js";
import type { RateRequest } from "../domain/RateRequest.js";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
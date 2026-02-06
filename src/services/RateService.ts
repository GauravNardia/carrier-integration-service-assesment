import { CarrierRegistry } from "../carriers/CarrierRegistry.js";
import type { RateRequest } from "../domain/RateRequest.js";

export class RateService {
  private registry = new CarrierRegistry();

  getRates(carrier: string, request: RateRequest) {
    return this.registry.get(carrier).getRates(request);
  }
}
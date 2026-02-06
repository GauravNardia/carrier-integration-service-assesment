import { CarrierError } from "../errors/CarrierError.js";
import type { Carrier } from "./Carrier.js";
import { UPSCarrier } from "./ups/UPSCarrier.js";

export class CarrierRegistry {
  private carriers: Record<string, Carrier> = {
    UPS: new UPSCarrier(),
  };

  get(name: string): Carrier {
    const carrier = this.carriers[name];
    if (!carrier) throw new CarrierError("Unsupported carrier");
    return carrier;
  }
}
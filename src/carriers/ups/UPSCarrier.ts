import type { RateQuote } from "../../domain/RateQuote.js";
import type { RateRequest } from "../../domain/RateRequest.js";
import { RateRequestSchema } from "../../domain/Schema.js";
import { CarrierError } from "../../errors/CarrierError.js";
import { ValidationError } from "../../errors/ValidationError.js";
import type { Carrier } from "../Carrier.js";
import { UPSAuth } from "./UPSAuth.js";
import { UPSClient } from "./UPSClient.js";
import { fromUPSRateResponse, toUPSRateRequest } from "./UPSMapper.js";

export class UPSCarrier implements Carrier {
  private auth = new UPSAuth();
  private client = new UPSClient();

  async getRates(request: RateRequest): Promise<RateQuote[]> {
    const parsed = RateRequestSchema.safeParse(request);
    if (!parsed.success) {
      throw new ValidationError("Invalid rate request");
    }

    const token = await this.auth.getToken();

    try {
      const response = await this.client.rate(
        toUPSRateRequest(request),
        token
      );

      return fromUPSRateResponse(response);
    } catch {
      throw new CarrierError("UPS rate lookup failed");
    }
  }
}

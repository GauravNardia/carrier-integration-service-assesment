import { describe, it, expect, vi } from "vitest";
import { RateService } from "../../src/services/RateService.js";
import type { RateRequest } from "../../src/domain/RateRequest.js";

vi.mock("../../src/carriers/CarrierRegistry.js", () => {
  return {
    CarrierRegistry: class {
      get() {
        return {
          getRates: vi.fn().mockResolvedValue([
            {
              carrier: "UPS",
              serviceLevel: "GROUND",
              amount: 15,
              currency: "USD",
            },
          ]),
        };
      }
    },
  };
});

describe("RateService", () => {
  it("returns rates from the selected carrier", async () => {
    const service = new RateService();

    const request: RateRequest = {
      origin: { countryCode: "US", postalCode: "10001" },
      destination: { countryCode: "US", postalCode: "94105" },
      parcels: [
        {
          weightKg: 1,
          lengthCm: 10,
          widthCm: 10,
          heightCm: 10,
        },
      ],
    };

    const result = await service.getRates("UPS", request);

    expect(result).toEqual([
      {
        carrier: "UPS",
        serviceLevel: "GROUND",
        amount: 15,
        currency: "USD",
      },
    ]);
  });
});

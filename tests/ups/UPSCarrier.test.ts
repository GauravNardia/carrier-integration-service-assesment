import { describe, it, expect, vi, beforeEach } from "vitest";
import { UPSCarrier } from "../../src/carriers/ups/UPSCarrier.js";
import { UPSAuth } from "../../src/carriers/ups/UPSAuth.js";
import { UPSClient } from "../../src/carriers/ups/UPSClient.js";
import { ValidationError } from "../../src/errors/ValidationError.js";
import { CarrierError } from "../../src/errors/CarrierError.js";

describe("UPSCarrier", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns normalized rate quotes for valid request", async () => {
    // 🔹 Stub auth token
    vi.spyOn(UPSAuth.prototype, "getToken").mockResolvedValue("fake-token");

    // 🔹 Stub UPS API response
    vi.spyOn(UPSClient.prototype, "rate").mockResolvedValue({
      RateResponse: {
        RatedShipment: [
          {
            Service: { Code: "GROUND" },
            TotalCharges: {
              MonetaryValue: "12.50",
              CurrencyCode: "USD",
            },
          },
        ],
      },
    });

    const carrier = new UPSCarrier();

    const result = await carrier.getRates({
      origin: { countryCode: "US", postalCode: "10001" },
      destination: { countryCode: "US", postalCode: "94105" },
      parcels: [
        {
          weightKg: 2,
          lengthCm: 10,
          widthCm: 10,
          heightCm: 10,
        },
      ],
    });

    expect(result).toEqual([
      {
        carrier: "UPS",
        serviceLevel: "GROUND",
        amount: 12.5,
        currency: "USD",
      },
    ]);
  });

  it("throws ValidationError for invalid request", async () => {
    const carrier = new UPSCarrier();

    await expect(
      carrier.getRates({} as any)
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it("throws CarrierError when UPS API fails", async () => {
    vi.spyOn(UPSAuth.prototype, "getToken").mockResolvedValue("fake-token");

    vi.spyOn(UPSClient.prototype, "rate").mockRejectedValue(
      new Error("UPS down")
    );

    const carrier = new UPSCarrier();

    await expect(
      carrier.getRates({
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
      })
    ).rejects.toBeInstanceOf(CarrierError);
  });
});
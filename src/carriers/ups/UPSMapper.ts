import type { RateQuote } from "../../domain/RateQuote.js";
import type { RateRequest } from "../../domain/RateRequest.js";

export const toUPSRateRequest = (req: RateRequest): unknown => {
  return {
    Shipment: {
      Shipper: { Address: req.origin },
      ShipTo: { Address: req.destination },
      Package: req.parcels.map(p => ({
        PackageWeight: { Weight: p.weightKg },
      })),
    },
  };
}

export const fromUPSRateResponse = (res: any): RateQuote[] => {
  return res.RateResponse.RatedShipment.map((r: any) => ({
    carrier: "UPS",
    serviceLevel: r.Service.Code,
    amount: Number(r.TotalCharges.MonetaryValue),
    currency: r.TotalCharges.CurrencyCode,
  }));
}

import type { Address } from "./Address.js";
import type { Parcel } from "./Parcel.js";

export interface RateRequest {
  origin: Address;
  destination: Address;
  parcels: Parcel[];
  serviceLevel?: string;
}

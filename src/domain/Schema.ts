import z from "zod";

export const AddressSchema = z.object({
  countryCode: z.string().length(2),
  postalCode: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const ParcelSchema = z.object({
  weightKg: z.number().positive(),
  lengthCm: z.number().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
});

export const RateRequestSchema = z.object({
  origin: AddressSchema,
  destination: AddressSchema,
  parcels: z.array(ParcelSchema).min(1),
  serviceLevel: z.string().optional(),
});
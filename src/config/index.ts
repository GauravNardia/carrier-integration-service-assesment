import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  UPS_CLIENT_ID: z.string(),
  UPS_CLIENT_SECRET: z.string(),
  UPS_BASE_URL: z.string().url(),
  UPS_AUTH_URL: z.string().url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten())
  process.exit(1)
}

export const env = parsed.data;
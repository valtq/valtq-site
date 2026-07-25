import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CAL_WEBHOOK_SECRET: z.string().min(1, 'CAL_WEBHOOK_SECRET is required'),
  SLACK_WEBHOOK_URL: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();
export type Env = z.infer<typeof envSchema>;

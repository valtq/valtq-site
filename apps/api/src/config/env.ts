import { z } from 'zod';

/**
 * Treat blank env values as unset so local `.env` placeholders remain valid.
 */
function emptyToUndefined(value: unknown): unknown {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}

const optionalNonEmptyString = z.preprocess(
  emptyToUndefined,
  z.string().min(1).optional(),
);

const optionalEmail = z.preprocess(
  emptyToUndefined,
  z.string().email().optional(),
);

const optionalFromEmail = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .min(3)
    .refine(
      (value) => {
        const match = value.match(
          /^(?:.+?\s*)?<([^>]+)>$|^([^\s<>]+@[^\s<>]+)$/,
        );
        const email = match?.[1] ?? match?.[2];
        return !!email && z.string().email().safeParse(email).success;
      },
      { message: 'RESEND_FROM_EMAIL must be an email or "Name <email>"' },
    )
    .optional(),
);

/**
 * Runtime env schema.
 * Business integrations are optional at boot so local/CI can start without
 * secrets; feature services no-op or reject when required values are missing.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_TIME_WINDOW: z.string().default('1 minute'),

  RESEND_API_KEY: optionalNonEmptyString,
  RESEND_FROM_EMAIL: optionalFromEmail,
  CAL_API_KEY: optionalNonEmptyString,
  CAL_WEBHOOK_SECRET: optionalNonEmptyString,
  INTERNAL_NOTIFICATION_EMAIL: optionalEmail,
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables — refusing to start:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  return parsed.data;
}

/** Validated env; import fails the process if required vars are missing. */
export const env = loadEnv();

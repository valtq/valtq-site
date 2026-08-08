process.env.NODE_ENV = 'test';
const testDatabaseUrl =
  process.env.DATABASE_URL ||
  process.env.TEST_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/valtq_test?schema=public';
process.env.DATABASE_URL = testDatabaseUrl;
process.env.DIRECT_URL = testDatabaseUrl;
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
process.env.RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || '1000';
process.env.RATE_LIMIT_TIME_WINDOW =
  process.env.RATE_LIMIT_TIME_WINDOW || '1 minute';
process.env.CAL_WEBHOOK_SECRET =
  process.env.CAL_WEBHOOK_SECRET || 'test-cal-secret';
process.env.INTERNAL_NOTIFICATION_EMAIL =
  process.env.INTERNAL_NOTIFICATION_EMAIL || 'team@valtq.net';

// Clear blank placeholders so Zod optional secrets stay unset.
for (const key of [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'CAL_API_KEY',
  'CAL_WEBHOOK_SECRET',
  'INTERNAL_NOTIFICATION_EMAIL',
] as const) {
  if (process.env[key]?.trim() === '') {
    delete process.env[key];
  }
}

// Re-apply test defaults after clearing blanks.
process.env.CAL_WEBHOOK_SECRET =
  process.env.CAL_WEBHOOK_SECRET || 'test-cal-secret';
process.env.INTERNAL_NOTIFICATION_EMAIL =
  process.env.INTERNAL_NOTIFICATION_EMAIL || 'team@valtq.net';

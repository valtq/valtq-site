import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaPg } from '@prisma/adapter-pg';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { buildApp } from '../src/app.js';
import type { App } from '../src/app.js';
import { createCalWebhookSignature } from '../src/modules/booking/cal-signature.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(__dirname, '..');
const testDbUrl =
  process.env.TEST_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/valtq_test?schema=public';

describe('Discovery + Booking HTTP flow', () => {
  let app: App;
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: testDbUrl }),
  });
  const webhookSecret = 'test-cal-secret';

  beforeAll(async () => {
    process.env.DATABASE_URL = testDbUrl;

    execSync('pnpm exec prisma migrate deploy', {
      cwd: apiRoot,
      env: {
        ...process.env,
        DATABASE_URL: testDbUrl,
      },
      stdio: 'pipe',
    });

    app = await buildApp();
  });

  beforeEach(async () => {
    await prisma.notificationLog.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.lead.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('submits a discovery lead', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/discovery',
      payload: {
        name: 'Jane Doe',
        email: 'jane@acme.com',
        company: 'Acme',
        projectType: 'saas',
        budget: '30k-50k',
        timeline: '2-4-months',
        description: 'We need a SaaS platform with billing and SSO.',
        companySize: '51-200',
        isDecisionMaker: true,
        urgency: 'high',
        website: 'https://acme.com',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json() as {
      success: boolean;
      data: { leadId: string; score: number; status: string };
    };
    expect(body.success).toBe(true);
    expect(body.data.leadId).toBeTruthy();
    expect(body.data.score).toBeGreaterThan(0);
    expect(body.data.status).toBe('new');

    const lead = await prisma.lead.findUnique({
      where: { id: body.data.leadId },
    });
    expect(lead?.email).toBe('jane@acme.com');
  });

  it('rejects invalid discovery payloads', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/discovery',
      payload: {
        name: '',
        email: 'bad',
        projectType: 'saas',
        budget: '30k-50k',
        timeline: '2-4-months',
        description: 'short',
      },
    });

    expect(response.statusCode).toBe(400);
    const body = response.json() as { success: boolean };
    expect(body.success).toBe(false);
  });

  it('links a Cal.com booking webhook to an existing lead (idempotent)', async () => {
    const lead = await prisma.lead.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@acme.com',
        projectType: 'saas',
        budget: '30k-50k',
        timeline: '2-4-months',
        description: 'We need a SaaS platform with billing and SSO.',
        score: 80,
      },
    });

    const payload = {
      triggerEvent: 'BOOKING_CREATED',
      createdAt: new Date().toISOString(),
      payload: {
        uid: 'cal_uid_1',
        bookingId: 101,
        type: '30min',
        startTime: '2026-08-01T10:00:00.000Z',
        endTime: '2026-08-01T10:30:00.000Z',
        attendees: [{ email: 'jane@acme.com', name: 'Jane Doe' }],
        metadata: { leadId: lead.id },
      },
    };

    const rawBody = JSON.stringify(payload);
    const signature = createCalWebhookSignature(rawBody, webhookSecret);

    const first = await app.inject({
      method: 'POST',
      url: '/api/webhooks/cal',
      headers: {
        'content-type': 'application/json',
        'x-cal-signature-256': signature,
      },
      payload: rawBody,
    });

    expect(first.statusCode).toBe(200);
    const firstBody = first.json() as {
      success: boolean;
      data: { handled: boolean; bookingId?: string };
    };
    expect(firstBody.data.handled).toBe(true);

    const second = await app.inject({
      method: 'POST',
      url: '/api/webhooks/cal',
      headers: {
        'content-type': 'application/json',
        'x-cal-signature-256': signature,
      },
      payload: rawBody,
    });

    expect(second.statusCode).toBe(200);
    const secondBody = second.json() as {
      data: { handled: boolean; reason?: string; bookingId?: string };
    };
    expect(secondBody.data.handled).toBe(true);
    expect(secondBody.data.reason).toBe('Idempotent replay');
    expect(secondBody.data.bookingId).toBe(firstBody.data.bookingId);

    const updatedLead = await prisma.lead.findUnique({ where: { id: lead.id } });
    expect(updatedLead?.booked).toBe(true);
    expect(updatedLead?.bookingId).toBe(firstBody.data.bookingId);

    const bookings = await prisma.booking.findMany({ where: { leadId: lead.id } });
    expect(bookings).toHaveLength(1);
  });

  it('rejects webhooks with invalid signatures', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/webhooks/cal',
      headers: {
        'content-type': 'application/json',
        'x-cal-signature-256': 'invalid',
      },
      payload: JSON.stringify({
        triggerEvent: 'BOOKING_CREATED',
        payload: {
          uid: 'x',
          startTime: '2026-08-01T10:00:00.000Z',
          endTime: '2026-08-01T10:30:00.000Z',
        },
      }),
    });

    expect(response.statusCode).toBe(401);
  });
});

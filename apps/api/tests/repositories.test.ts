import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LeadRepository } from '../src/modules/discovery/discovery.repository.js';
import { BookingRepository } from '../src/modules/booking/booking.repository.js';
import { NotificationLogRepository } from '../src/modules/notifications/notification.repository.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(__dirname, '..');
const testDbUrl =
  process.env.TEST_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/valtq_test?schema=public';

describe('Repositories', () => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: testDbUrl }),
  });
  const leadRepository = new LeadRepository(prisma);
  const bookingRepository = new BookingRepository(prisma);
  const notificationRepository = new NotificationLogRepository(prisma);

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
  });

  beforeEach(async () => {
    await prisma.notificationLog.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.lead.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates and reads leads', async () => {
    const lead = await leadRepository.create({
      name: 'Jane Doe',
      email: 'Jane@Acme.com',
      projectType: 'saas',
      budget: '30k-50k',
      timeline: '2-4-months',
      description: 'Build a SaaS product',
      score: 70,
      features: ['auth', 'billing'],
      answers: { urgency: 'high' },
    });

    expect(lead.email).toBe('jane@acme.com');
    expect(lead.features).toContain('auth');

    const found = await leadRepository.findByEmail('jane@acme.com');
    expect(found?.id).toBe(lead.id);
  });

  it('creates bookings uniquely by calBookingId', async () => {
    const lead = await leadRepository.create({
      name: 'Jane Doe',
      email: 'jane@acme.com',
      projectType: 'saas',
      budget: '30k-50k',
      timeline: '2-4-months',
      description: 'Build a SaaS product',
      score: 70,
    });

    const booking = await bookingRepository.create({
      leadId: lead.id,
      calBookingId: 'cal_123',
      eventType: '30min',
      startsAt: new Date('2026-08-01T10:00:00.000Z'),
      endsAt: new Date('2026-08-01T10:30:00.000Z'),
    });

    const found = await bookingRepository.findByCalBookingId('cal_123');
    expect(found?.id).toBe(booking.id);

    await leadRepository.markBooked(lead.id, booking.id);
    const updated = await leadRepository.findById(lead.id);
    expect(updated?.booked).toBe(true);
    expect(updated?.bookingId).toBe(booking.id);
  });

  it('persists notification logs', async () => {
    const lead = await leadRepository.create({
      name: 'Jane Doe',
      email: 'jane@acme.com',
      projectType: 'saas',
      budget: '30k-50k',
      timeline: '2-4-months',
      description: 'Build a SaaS product',
      score: 70,
    });

    const log = await notificationRepository.create({
      leadId: lead.id,
      type: 'internal_lead',
      provider: 'resend',
      success: true,
      metadata: { messageId: 'msg_1' },
    });

    expect(log.success).toBe(true);
    expect(log.metadata).toContain('msg_1');
  });
});

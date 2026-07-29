import { describe, expect, it, vi } from 'vitest';
import { NotificationService } from './notification.service.js';
import { NotificationType } from './providers/notification-provider.js';
import type { NotificationProvider } from './providers/notification-provider.js';
import type { NotificationLogRepository } from './notification.repository.js';

describe('NotificationService', () => {
  const lead = {
    id: 'lead_1',
    name: 'Jane Doe',
    email: 'jane@acme.com',
    company: 'Acme',
    projectType: 'saas',
    budget: '30k-50k',
    timeline: '2-4-months',
    description: 'Need a SaaS MVP with billing and auth.',
    score: 82,
  };

  it('sends internal and visitor emails and logs both', async () => {
    const provider: NotificationProvider = {
      name: 'mock',
      send: vi.fn(async () => ({
        success: true,
        provider: 'mock',
        messageId: 'msg_1',
      })),
    };

    const repository = {
      create: vi.fn(async (input) => input),
    } as unknown as NotificationLogRepository;

    const logger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const service = new NotificationService({
      provider,
      repository,
      logger: logger as never,
      internalEmail: 'team@valtq.com',
    });

    await service.notifyDiscoverySubmitted(lead);

    expect(provider.send).toHaveBeenCalledTimes(2);
    expect(repository.create).toHaveBeenCalledTimes(2);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: NotificationType.INTERNAL_LEAD,
        success: true,
      }),
    );
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: NotificationType.VISITOR_CONFIRMATION,
        success: true,
      }),
    );
    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ leadId: lead.id }),
      'Email sent',
    );
  });

  it('skips internal email when recipient is not configured', async () => {
    const provider: NotificationProvider = {
      name: 'mock',
      send: vi.fn(async () => ({
        success: true,
        provider: 'mock',
        messageId: 'msg_1',
      })),
    };

    const repository = {
      create: vi.fn(async (input) => input),
    } as unknown as NotificationLogRepository;

    const logger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const service = new NotificationService({
      provider,
      repository,
      logger: logger as never,
    });

    await service.notifyDiscoverySubmitted(lead);

    expect(provider.send).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalled();
  });
});

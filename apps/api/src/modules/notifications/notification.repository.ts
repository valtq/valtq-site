import type { NotificationLog, PrismaClient } from '../../generated/prisma/client.js';

export type CreateNotificationLogInput = {
  leadId?: string;
  contactId?: string;
  type: string;
  provider: string;
  success: boolean;
  metadata?: Record<string, unknown>;
};

export class NotificationLogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateNotificationLogInput): Promise<NotificationLog> {
    return this.prisma.notificationLog.create({
      data: {
        leadId: input.leadId,
        contactId: input.contactId,
        type: input.type,
        provider: input.provider,
        success: input.success,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
      },
    });
  }
}

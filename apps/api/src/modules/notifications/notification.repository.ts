import type { PrismaClient, NotificationLog } from '@prisma/client';

export type CreateNotificationLogInput = {
  leadId: string;
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
        type: input.type,
        provider: input.provider,
        success: input.success,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
      },
    });
  }
}

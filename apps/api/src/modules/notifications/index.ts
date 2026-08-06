import type { FastifyPluginAsync } from 'fastify';
import { env } from '../../config/env.js';
import {
  NoopEmailProvider,
  ResendEmailProvider,
} from './providers/email.provider.js';
import type { NotificationProvider } from './providers/notification-provider.js';
import { NotificationLogRepository } from './notification.repository.js';
import { NotificationService } from './notification.service.js';

export function createEmailProvider(): NotificationProvider {
  if (env.RESEND_API_KEY && env.RESEND_FROM_EMAIL) {
    return new ResendEmailProvider({
      apiKey: env.RESEND_API_KEY,
      fromEmail: env.RESEND_FROM_EMAIL,
    });
  }

  return new NoopEmailProvider();
}

export function createNotificationService(
  app: Parameters<FastifyPluginAsync>[0],
): NotificationService {
  const repository = new NotificationLogRepository(app.prisma);
  const provider = createEmailProvider();

  return new NotificationService({
    provider,
    repository,
    logger: app.log,
    internalEmail: env.INTERNAL_NOTIFICATION_EMAIL,
  });
}

export { NotificationService } from './notification.service.js';
export { NotificationLogRepository } from './notification.repository.js';
export type {
  LeadNotificationContext,
  ContactNotificationContext,
} from './notification.service.js';
export type {
  NotificationProvider,
  NotificationMessage,
  NotificationSendResult,
} from './providers/notification-provider.js';
export { NotificationType } from './providers/notification-provider.js';
export {
  NoopEmailProvider,
  ResendEmailProvider,
} from './providers/email.provider.js';
export {
  buildInternalLeadEmail,
  buildVisitorConfirmationEmail,
  buildInternalContactEmail,
  buildContactConfirmationEmail,
} from './templates/email-templates.js';

/**
 * Notifications module entry — no HTTP routes; services are composed by
 * discovery/booking modules.
 */
const notificationsModule: FastifyPluginAsync = async () => {
  // Intentionally empty — provider/services are constructed via factory helpers.
};

export default notificationsModule;

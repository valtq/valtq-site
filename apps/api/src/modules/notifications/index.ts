import type { FastifyPluginAsync } from 'fastify';
import { env } from '../../config/env.js';
import {
  NoopEmailProvider,
  SmtpEmailProvider,
} from './providers/email.provider.js';
import type { NotificationProvider } from './providers/notification-provider.js';
import { NotificationLogRepository } from './notification.repository.js';
import { NotificationService } from './notification.service.js';

export function createEmailProvider(): NotificationProvider {
  if (
    env.SMTP_HOST &&
    env.SMTP_PORT &&
    env.SMTP_USER &&
    env.SMTP_PASS &&
    env.SMTP_FROM
  ) {
    return new SmtpEmailProvider({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE ?? false,
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
      fromEmail: env.SMTP_FROM,
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
  SmtpEmailProvider,
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

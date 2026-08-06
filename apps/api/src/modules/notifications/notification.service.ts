import type { FastifyBaseLogger } from 'fastify';
import type { NotificationProvider } from './providers/notification-provider.js';
import { NotificationType } from './providers/notification-provider.js';
import type { NotificationLogRepository } from './notification.repository.js';
import {
  buildContactConfirmationEmail,
  buildInternalContactEmail,
  buildInternalLeadEmail,
  buildVisitorConfirmationEmail,
} from './templates/email-templates.js';

export type LeadNotificationContext = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  website?: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features?: string[] | null;
  score: number;
  companySize?: string | null;
  isDecisionMaker?: boolean | null;
  urgency?: string | null;
};

export type ContactNotificationContext = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  preferredChannel?: string | null;
  serviceArea?: string | null;
  productStage?: string | null;
  productUrl?: string | null;
  timing?: string | null;
  budget?: string | null;
  summary: string;
  message: string;
};

type NotificationServiceDeps = {
  provider: NotificationProvider;
  repository: NotificationLogRepository;
  logger: FastifyBaseLogger;
  internalEmail?: string;
};

/**
 * Orchestrates internal + visitor notifications and persists delivery logs.
 */
export class NotificationService {
  private readonly provider: NotificationProvider;
  private readonly repository: NotificationLogRepository;
  private readonly logger: FastifyBaseLogger;
  private readonly internalEmail?: string;

  constructor(deps: NotificationServiceDeps) {
    this.provider = deps.provider;
    this.repository = deps.repository;
    this.logger = deps.logger;
    this.internalEmail = deps.internalEmail;
  }

  async notifyDiscoverySubmitted(lead: LeadNotificationContext): Promise<void> {
    await Promise.all([
      this.sendInternalLeadNotification(lead),
      this.sendVisitorConfirmation(lead),
    ]);
  }

  async notifyContactSubmitted(
    inquiry: ContactNotificationContext,
  ): Promise<void> {
    await Promise.all([
      this.sendInternalContactNotification(inquiry),
      this.sendContactConfirmation(inquiry),
    ]);
  }

  async sendInternalLeadNotification(
    lead: LeadNotificationContext,
  ): Promise<void> {
    if (!this.internalEmail) {
      this.logger.warn(
        { leadId: lead.id },
        'INTERNAL_NOTIFICATION_EMAIL missing — skipping internal notification',
      );
      return;
    }

    const template = buildInternalLeadEmail(lead);
    const result = await this.provider.send({
      to: this.internalEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    await this.repository.create({
      leadId: lead.id,
      type: NotificationType.INTERNAL_LEAD,
      provider: result.provider,
      success: result.success,
      metadata: {
        messageId: result.messageId,
        error: result.error,
        to: this.internalEmail,
      },
    });

    if (result.success) {
      this.logger.info(
        { leadId: lead.id, provider: result.provider },
        'Notification sent',
      );
      this.logger.info(
        { leadId: lead.id, provider: result.provider },
        'Email sent',
      );
    } else {
      this.logger.error(
        { leadId: lead.id, provider: result.provider, error: result.error },
        'Internal notification failed',
      );
    }
  }

  async sendVisitorConfirmation(lead: LeadNotificationContext): Promise<void> {
    const template = buildVisitorConfirmationEmail(lead);
    const result = await this.provider.send({
      to: lead.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    await this.repository.create({
      leadId: lead.id,
      type: NotificationType.VISITOR_CONFIRMATION,
      provider: result.provider,
      success: result.success,
      metadata: {
        messageId: result.messageId,
        error: result.error,
        to: lead.email,
      },
    });

    if (result.success) {
      this.logger.info(
        { leadId: lead.id, provider: result.provider },
        'Notification sent',
      );
      this.logger.info(
        { leadId: lead.id, provider: result.provider },
        'Email sent',
      );
    } else {
      this.logger.error(
        { leadId: lead.id, provider: result.provider, error: result.error },
        'Visitor confirmation failed',
      );
    }
  }

  async sendInternalContactNotification(
    inquiry: ContactNotificationContext,
  ): Promise<void> {
    if (!this.internalEmail) {
      this.logger.warn(
        { inquiryId: inquiry.id },
        'INTERNAL_NOTIFICATION_EMAIL missing — skipping internal notification',
      );
      return;
    }

    const template = buildInternalContactEmail(inquiry);
    const result = await this.provider.send({
      to: this.internalEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    await this.repository.create({
      contactId: inquiry.id,
      type: NotificationType.INTERNAL_CONTACT_INQUIRY,
      provider: result.provider,
      success: result.success,
      metadata: {
        messageId: result.messageId,
        error: result.error,
        to: this.internalEmail,
      },
    });

    if (result.success) {
      this.logger.info(
        { inquiryId: inquiry.id, provider: result.provider },
        'Notification sent',
      );
      this.logger.info(
        { inquiryId: inquiry.id, provider: result.provider },
        'Email sent',
      );
    } else {
      this.logger.error(
        {
          inquiryId: inquiry.id,
          provider: result.provider,
          error: result.error,
        },
        'Internal contact notification failed',
      );
    }
  }

  async sendContactConfirmation(
    inquiry: ContactNotificationContext,
  ): Promise<void> {
    const template = buildContactConfirmationEmail(inquiry);
    const result = await this.provider.send({
      to: inquiry.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    await this.repository.create({
      contactId: inquiry.id,
      type: NotificationType.CONTACT_VISITOR_CONFIRMATION,
      provider: result.provider,
      success: result.success,
      metadata: {
        messageId: result.messageId,
        error: result.error,
        to: inquiry.email,
      },
    });

    if (result.success) {
      this.logger.info(
        { inquiryId: inquiry.id, provider: result.provider },
        'Notification sent',
      );
      this.logger.info(
        { inquiryId: inquiry.id, provider: result.provider },
        'Email sent',
      );
    } else {
      this.logger.error(
        {
          inquiryId: inquiry.id,
          provider: result.provider,
          error: result.error,
        },
        'Contact confirmation failed',
      );
    }
  }
}

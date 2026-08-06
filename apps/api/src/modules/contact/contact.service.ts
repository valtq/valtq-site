import type { ContactSubmission } from '@valtq/types';
import type { FastifyBaseLogger } from 'fastify';
import { sanitizeOptionalString, sanitizeString } from '../../common/utils/index.js';
import type { NotificationService } from '../notifications/index.js';
import type { ContactInquiryRepository } from './contact.repository.js';

export type ContactSubmitResult = {
  inquiryId: string;
  status: string;
};

type SanitizedContactSubmission = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferredChannel?: string;
  serviceArea?: string;
  productStage?: string;
  productUrl?: string;
  timing?: string;
  budget?: string;
  summary: string;
  message: string;
};

type ContactServiceDeps = {
  contactInquiryRepository: ContactInquiryRepository;
  notificationService: NotificationService;
  logger: FastifyBaseLogger;
};

export class ContactService {
  private readonly contactInquiryRepository: ContactInquiryRepository;
  private readonly notificationService: NotificationService;
  private readonly logger: FastifyBaseLogger;

  constructor(deps: ContactServiceDeps) {
    this.contactInquiryRepository = deps.contactInquiryRepository;
    this.notificationService = deps.notificationService;
    this.logger = deps.logger;
  }

  async submit(payload: ContactSubmission): Promise<ContactSubmitResult> {
    const sanitized = this.sanitizePayload(payload);

    const inquiry = await this.contactInquiryRepository.create({
      name: sanitized.name,
      email: sanitized.email,
      company: sanitized.company,
      phone: sanitized.phone,
      preferredChannel: sanitized.preferredChannel,
      serviceArea: sanitized.serviceArea,
      productStage: sanitized.productStage,
      productUrl: sanitized.productUrl,
      timing: sanitized.timing,
      budget: sanitized.budget,
      summary: sanitized.summary,
      message: sanitized.message,
    });

    this.logger.info({ inquiryId: inquiry.id }, 'Contact inquiry submitted');

    // Notifications must not fail the HTTP response after the inquiry is persisted.
    try {
      await this.notificationService.notifyContactSubmitted({
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company,
        phone: inquiry.phone,
        preferredChannel: inquiry.preferredChannel,
        serviceArea: inquiry.serviceArea,
        productStage: inquiry.productStage,
        productUrl: inquiry.productUrl,
        timing: inquiry.timing,
        budget: inquiry.budget,
        summary: inquiry.summary,
        message: inquiry.message,
      });
    } catch (error) {
      this.logger.error(
        { err: error, inquiryId: inquiry.id },
        'Contact notification pipeline failed',
      );
    }

    return {
      inquiryId: inquiry.id,
      status: inquiry.status,
    };
  }

  private sanitizePayload(payload: ContactSubmission): SanitizedContactSubmission {
    return {
      name: sanitizeString(payload.name),
      email: sanitizeString(payload.email).toLowerCase(),
      company: sanitizeOptionalString(payload.company),
      phone: sanitizeOptionalString(payload.phone),
      preferredChannel: sanitizeOptionalString(payload.preferredChannel),
      serviceArea: sanitizeOptionalString(payload.serviceArea),
      productStage: sanitizeOptionalString(payload.productStage),
      productUrl: sanitizeOptionalString(payload.productUrl),
      timing: sanitizeOptionalString(payload.timing),
      budget: sanitizeOptionalString(payload.budget),
      summary: sanitizeString(payload.summary),
      message: sanitizeString(payload.message),
    };
  }
}

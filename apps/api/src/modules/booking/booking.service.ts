import type { FastifyBaseLogger } from 'fastify';
import { AppError } from '../../common/errors/index.js';
import type { LeadRepository } from '../discovery/discovery.repository.js';
import type { BookingRepository } from './booking.repository.js';
import {
  BOOKING_CREATED_EVENTS,
  calWebhookEnvelopeSchema,
  resolveAttendeeEmail,
  resolveCalBookingId,
  resolveLeadIdFromMetadata,
} from './cal-webhook.schema.js';
import { verifyCalWebhookSignature } from './cal-signature.js';

export type BookingWebhookResult = {
  handled: boolean;
  reason?: string;
  bookingId?: string;
  leadId?: string;
};

type BookingServiceDeps = {
  bookingRepository: BookingRepository;
  leadRepository: LeadRepository;
  logger: FastifyBaseLogger;
  webhookSecret?: string;
};

export class BookingService {
  private readonly bookingRepository: BookingRepository;
  private readonly leadRepository: LeadRepository;
  private readonly logger: FastifyBaseLogger;
  private readonly webhookSecret?: string;

  constructor(deps: BookingServiceDeps) {
    this.bookingRepository = deps.bookingRepository;
    this.leadRepository = deps.leadRepository;
    this.logger = deps.logger;
    this.webhookSecret = deps.webhookSecret;
  }

  async handleCalWebhook(options: {
    rawBody: string;
    signatureHeader: string | string[] | undefined;
    body: unknown;
  }): Promise<BookingWebhookResult> {
    const { rawBody, signatureHeader, body } = options;

    this.logger.info('Webhook received');

    const valid = verifyCalWebhookSignature({
      rawBody,
      signatureHeader,
      secret: this.webhookSecret,
    });

    if (!valid) {
      this.logger.warn('Webhook signature verification failed');
      throw AppError.unauthorized('Invalid Cal.com webhook signature');
    }

    const parsed = calWebhookEnvelopeSchema.safeParse(body);
    if (!parsed.success) {
      this.logger.warn(
        { issues: parsed.error.flatten() },
        'Validation failures',
      );
      throw AppError.validation(
        'Invalid Cal.com webhook payload',
        parsed.error.flatten(),
      );
    }

    const envelope = parsed.data;

    if (!BOOKING_CREATED_EVENTS.has(envelope.triggerEvent)) {
      this.logger.info(
        { triggerEvent: envelope.triggerEvent },
        'Webhook ignored',
      );
      return {
        handled: false,
        reason: `Ignored triggerEvent ${envelope.triggerEvent}`,
      };
    }

    const calBookingId = resolveCalBookingId(envelope.payload);
    if (!calBookingId) {
      throw AppError.validation('Webhook payload missing booking identifier');
    }

    const existing =
      await this.bookingRepository.findByCalBookingId(calBookingId);
    if (existing) {
      this.logger.info(
        { calBookingId, bookingId: existing.id },
        'Webhook ignored',
      );
      return {
        handled: true,
        reason: 'Idempotent replay',
        bookingId: existing.id,
        leadId: existing.leadId,
      };
    }

    const startsAt = new Date(envelope.payload.startTime);
    const endsAt = new Date(envelope.payload.endTime);

    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      throw AppError.validation('Webhook payload has invalid booking times');
    }

    const metadataLeadId = resolveLeadIdFromMetadata(envelope.payload);
    const attendeeEmail = resolveAttendeeEmail(envelope.payload);

    const lead =
      (metadataLeadId
        ? await this.leadRepository.findById(metadataLeadId)
        : null) ??
      (attendeeEmail
        ? await this.leadRepository.findByEmail(attendeeEmail)
        : null);

    if (!lead) {
      this.logger.warn(
        { calBookingId, metadataLeadId, attendeeEmail },
        'Webhook ignored',
      );
      return {
        handled: false,
        reason: 'No matching lead found for booking',
      };
    }

    const eventType =
      envelope.payload.type ??
      envelope.payload.eventTitle ??
      envelope.payload.title ??
      'unknown';

    const booking = await this.bookingRepository.create({
      leadId: lead.id,
      calBookingId,
      eventType,
      startsAt,
      endsAt,
    });

    await this.leadRepository.markBooked(lead.id, booking.id);

    this.logger.info(
      {
        leadId: lead.id,
        bookingId: booking.id,
        calBookingId,
      },
      'Booking completed',
    );

    return {
      handled: true,
      bookingId: booking.id,
      leadId: lead.id,
    };
  }
}

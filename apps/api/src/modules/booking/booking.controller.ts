import type { FastifyReply, FastifyRequest } from 'fastify';
import { sendSuccess } from '../../common/responses/index.js';
import type { BookingService } from './booking.service.js';

type BookingControllerDeps = {
  bookingService: BookingService;
};

/**
 * Booking HTTP adapter for Cal.com webhooks.
 */
export function createBookingController(deps: BookingControllerDeps) {
  const { bookingService } = deps;

  return {
    async handleCalWebhook(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> {
      const rawBody =
        typeof request.rawBody === 'string'
          ? request.rawBody
          : JSON.stringify(request.body ?? {});

      const result = await bookingService.handleCalWebhook({
        rawBody,
        signatureHeader: request.headers['x-cal-signature-256'],
        body: request.body,
      });

      sendSuccess(reply, result, 200);
    },
  };
}

export type BookingController = ReturnType<typeof createBookingController>;

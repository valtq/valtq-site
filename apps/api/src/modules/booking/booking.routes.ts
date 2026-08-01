import type { FastifyPluginAsync } from 'fastify';
import type { BookingController } from './booking.controller.js';

type BookingRoutesDeps = {
  controller: BookingController;
};

/**
 * Booking routes — Cal.com webhook under /api.
 */
export function createBookingRoutes(
  deps: BookingRoutesDeps,
): FastifyPluginAsync {
  const { controller } = deps;

  return async (app) => {
    app.post(
      '/webhooks/cal',
      {
        config: {
          rateLimit: {
            max: 120,
            timeWindow: '1 minute',
          },
        },
      },
      (request, reply) => controller.handleCalWebhook(request, reply),
    );
  };
}

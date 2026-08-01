import type { FastifyPluginAsync } from 'fastify';
import { env } from '../../config/env.js';
import { LeadRepository } from '../discovery/discovery.repository.js';
import { createBookingController } from './booking.controller.js';
import { BookingRepository } from './booking.repository.js';
import { createBookingRoutes } from './booking.routes.js';
import { BookingService } from './booking.service.js';

/**
 * Booking module entry — register from app.ts under /api.
 */
const bookingModule: FastifyPluginAsync = async (app) => {
  const bookingRepository = new BookingRepository(app.prisma);
  const leadRepository = new LeadRepository(app.prisma);

  const bookingService = new BookingService({
    bookingRepository,
    leadRepository,
    logger: app.log,
    webhookSecret: env.CAL_WEBHOOK_SECRET,
  });

  const controller = createBookingController({ bookingService });
  await app.register(createBookingRoutes({ controller }));
};

export default bookingModule;

export { BookingService } from './booking.service.js';
export { BookingRepository } from './booking.repository.js';
export {
  verifyCalWebhookSignature,
  createCalWebhookSignature,
} from './cal-signature.js';

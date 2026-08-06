import type { FastifyPluginAsync } from 'fastify';
import { createNotificationService } from '../notifications/index.js';
import { createContactController } from './contact.controller.js';
import { ContactInquiryRepository } from './contact.repository.js';
import { createContactRoutes } from './contact.routes.js';
import { ContactService } from './contact.service.js';

/**
 * Contact module entry — register from app.ts under /api.
 */
const contactModule: FastifyPluginAsync = async (app) => {
  const contactInquiryRepository = new ContactInquiryRepository(app.prisma);
  const notificationService = createNotificationService(app);

  const contactService = new ContactService({
    contactInquiryRepository,
    notificationService,
    logger: app.log,
  });

  const controller = createContactController({ contactService });
  await app.register(createContactRoutes({ controller }));
};

export default contactModule;

export { ContactService } from './contact.service.js';
export { ContactInquiryRepository } from './contact.repository.js';

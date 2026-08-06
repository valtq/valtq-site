import type { FastifyPluginAsync } from 'fastify';
import type { ContactController } from './contact.controller.js';
import { contactBodySchema, contactSuccessResponseSchema } from './contact.schema.js';

type ContactRoutesDeps = {
  controller: ContactController;
};

/**
 * Contact routes — mounted under /api.
 */
export function createContactRoutes(deps: ContactRoutesDeps): FastifyPluginAsync {
  const { controller } = deps;

  return async (app) => {
    app.post(
      '/contact',
      {
        schema: {
          body: contactBodySchema,
          response: {
            201: contactSuccessResponseSchema,
          },
        },
        config: {
          rateLimit: {
            max: 20,
            timeWindow: '1 minute',
          },
        },
      },
      (request, reply) => controller.submit(request, reply),
    );
  };
}

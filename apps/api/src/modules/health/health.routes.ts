import type { FastifyPluginAsync } from 'fastify';
import { getHealth } from './health.controller.js';
import { healthResponseSchema } from './health.schema.js';

/**
 * Health routes plugin.
 * Mounted at the root so GET /health stays a conventional probe path.
 */
export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    '/health',
    {
      schema: {
        response: {
          200: healthResponseSchema,
        },
      },
    },
    getHealth,
  );
};

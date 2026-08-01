import type { FastifyPluginAsync } from 'fastify';
import type { DiscoveryController } from './discovery.controller.js';
import {
  discoveryBodySchema,
  discoverySuccessResponseSchema,
} from './discovery.schema.js';

type DiscoveryRoutesDeps = {
  controller: DiscoveryController;
};

/**
 * Discovery routes — mounted under /api.
 */
export function createDiscoveryRoutes(
  deps: DiscoveryRoutesDeps,
): FastifyPluginAsync {
  const { controller } = deps;

  return async (app) => {
    app.post(
      '/discovery',
      {
        schema: {
          body: discoveryBodySchema,
          response: {
            201: discoverySuccessResponseSchema,
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

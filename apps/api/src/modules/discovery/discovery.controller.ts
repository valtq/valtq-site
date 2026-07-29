import type { FastifyReply, FastifyRequest } from 'fastify';
import { DiscoverySubmissionSchema } from '@valtq/types';
import { AppError } from '../../common/errors/index.js';
import { sendSuccess } from '../../common/responses/index.js';
import type { DiscoveryService } from './discovery.service.js';

type DiscoveryControllerDeps = {
  discoveryService: DiscoveryService;
};

/**
 * Discovery HTTP adapter — validation + response only.
 */
export function createDiscoveryController(deps: DiscoveryControllerDeps) {
  const { discoveryService } = deps;

  return {
    async submit(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> {
      const parsed = DiscoverySubmissionSchema.safeParse(request.body);

      if (!parsed.success) {
        request.log.warn(
          { issues: parsed.error.flatten() },
          'Validation failures',
        );
        throw AppError.validation(
          'Request validation failed',
          parsed.error.flatten(),
        );
      }

      const result = await discoveryService.submit(parsed.data);
      sendSuccess(reply, result, 201);
    },
  };
}

export type DiscoveryController = ReturnType<typeof createDiscoveryController>;

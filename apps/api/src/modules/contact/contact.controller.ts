import type { FastifyReply, FastifyRequest } from 'fastify';
import { ContactSubmissionSchema } from '@valtq/types';
import { AppError } from '../../common/errors/index.js';
import { sendSuccess } from '../../common/responses/index.js';
import type { ContactService } from './contact.service.js';

type ContactControllerDeps = {
  contactService: ContactService;
};

/**
 * Contact HTTP adapter — validation + response only.
 */
export function createContactController(deps: ContactControllerDeps) {
  const { contactService } = deps;

  return {
    async submit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
      const parsed = ContactSubmissionSchema.safeParse(request.body);

      if (!parsed.success) {
        request.log.warn({ issues: parsed.error.flatten() }, 'Validation failures');
        throw AppError.validation('Request validation failed', parsed.error.flatten());
      }

      const result = await contactService.submit(parsed.data);
      sendSuccess(reply, result, 201);
    },
  };
}

export type ContactController = ReturnType<typeof createContactController>;

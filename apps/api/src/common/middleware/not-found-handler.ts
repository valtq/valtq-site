import type { FastifyReply, FastifyRequest } from 'fastify';
import { ErrorCode } from '../errors/index.js';
import { sendError } from '../responses/index.js';

/**
 * Handles unmatched routes with the same error envelope as other failures.
 */
export function notFoundHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): FastifyReply {
  return sendError(
    reply,
    404,
    ErrorCode.NOT_FOUND,
    `Route ${request.method} ${request.url} not found`,
  );
}

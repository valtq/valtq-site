import type { FastifyReply } from 'fastify';
import type { ErrorCode } from '../errors/error-codes.js';

export type ErrorBody = {
  success: false;
  error: {
    code: ErrorCode | string;
    message: string;
    details?: unknown;
  };
};

/**
 * Send a uniform error envelope.
 * Used by the global error handler and by handlers that reply without throwing.
 */
export function sendError(
  reply: FastifyReply,
  statusCode: number,
  code: ErrorCode | string,
  message: string,
  details?: unknown,
): FastifyReply {
  const body: ErrorBody = {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };

  return reply.status(statusCode).send(body);
}

export function error(
  code: ErrorCode | string,
  message: string,
  details?: unknown,
): ErrorBody {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };
}

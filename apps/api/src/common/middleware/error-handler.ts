import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError, ErrorCode } from '../errors/index.js';
import { sendError } from '../responses/index.js';
import { env } from '../../config/env.js';

/**
 * Centralized Fastify error handler.
 * Maps known error types to stable HTTP + envelope responses.
 */
export function errorHandler(
  err: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): FastifyReply {
  request.log.error({ err }, err.message);

  if (err instanceof AppError) {
    return sendError(reply, err.statusCode, err.code, err.message, err.details);
  }

  if (err instanceof ZodError) {
    return sendError(
      reply,
      400,
      ErrorCode.VALIDATION_ERROR,
      'Request validation failed',
      err.flatten(),
    );
  }

  const fastifyErr = err as FastifyError;

  if (fastifyErr.validation) {
    return sendError(
      reply,
      400,
      ErrorCode.VALIDATION_ERROR,
      fastifyErr.message,
      fastifyErr.validation,
    );
  }

  if (fastifyErr.statusCode === 429) {
    return sendError(
      reply,
      429,
      ErrorCode.TOO_MANY_REQUESTS,
      'Too many requests',
    );
  }

  if (typeof fastifyErr.statusCode === 'number' && fastifyErr.statusCode >= 400 && fastifyErr.statusCode < 500) {
    return sendError(
      reply,
      fastifyErr.statusCode,
      ErrorCode.BAD_REQUEST,
      fastifyErr.message,
    );
  }

  return sendError(
    reply,
    500,
    ErrorCode.INTERNAL_ERROR,
    env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  );
}

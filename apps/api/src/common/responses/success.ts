import type { FastifyReply } from 'fastify';

export type SuccessBody<T> = {
  success: true;
  data: T;
};

/**
 * Send a uniform success envelope.
 * Prefer this for all business endpoints once they exist.
 */
export function sendSuccess<T>(
  reply: FastifyReply,
  data: T,
  statusCode = 200,
): FastifyReply {
  const body: SuccessBody<T> = { success: true, data };
  return reply.status(statusCode).send(body);
}

export function success<T>(data: T): SuccessBody<T> {
  return { success: true, data };
}

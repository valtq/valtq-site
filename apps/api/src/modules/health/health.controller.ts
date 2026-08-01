import type { FastifyReply, FastifyRequest } from 'fastify';
import type { HealthResponse } from './health.schema.js';

/**
 * Health controller — thin HTTP adapter, no business logic.
 */
export async function getHealth(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const body: HealthResponse = { status: 'ok' };
  await reply.status(200).send(body);
}

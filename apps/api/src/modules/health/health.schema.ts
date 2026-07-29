/**
 * JSON Schema for GET /health.
 * Kept minimal on purpose — foundation liveness only.
 */
export const healthResponseSchema = {
  type: 'object',
  required: ['status'],
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['ok'] },
  },
} as const;

export type HealthResponse = {
  status: 'ok';
};

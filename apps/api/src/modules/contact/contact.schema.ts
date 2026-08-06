/**
 * Fastify JSON Schemas for Contact routes (documentation / serialization).
 * Runtime validation uses Zod via @valtq/types.
 */
export const contactBodySchema = {
  type: 'object',
  required: ['name', 'email', 'summary', 'message'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 200 },
    email: { type: 'string', maxLength: 320 },
    company: { type: 'string', maxLength: 200 },
    phone: { type: 'string', maxLength: 50 },
    preferredChannel: { type: 'string', maxLength: 100 },
    serviceArea: { type: 'string', maxLength: 200 },
    productStage: { type: 'string', maxLength: 200 },
    productUrl: { type: 'string', maxLength: 500 },
    timing: { type: 'string', maxLength: 100 },
    budget: { type: 'string', maxLength: 100 },
    summary: { type: 'string', minLength: 1, maxLength: 200 },
    message: { type: 'string', minLength: 10, maxLength: 5000 },
  },
} as const;

export const contactSuccessResponseSchema = {
  type: 'object',
  required: ['success', 'data'],
  additionalProperties: false,
  properties: {
    success: { type: 'boolean', const: true },
    data: {
      type: 'object',
      required: ['inquiryId', 'status'],
      additionalProperties: false,
      properties: {
        inquiryId: { type: 'string' },
        status: { type: 'string' },
      },
    },
  },
} as const;

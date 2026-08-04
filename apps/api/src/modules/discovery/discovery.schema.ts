/**
 * Fastify JSON Schemas for Discovery routes (documentation / serialization).
 * Runtime validation uses Zod via @valtq/types.
 */
export const discoveryBodySchema = {
  type: 'object',
  required: ['name', 'email', 'projectType', 'budget', 'timeline', 'description'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 200 },
    email: { type: 'string', maxLength: 320 },
    company: { type: 'string', maxLength: 200 },
    phone: { type: 'string', maxLength: 50 },
    country: { type: 'string', maxLength: 100 },
    website: { type: 'string', maxLength: 500 },
    projectType: {
      type: 'string',
      enum: ['website', 'web-app', 'mobile-app', 'saas', 'ecommerce', 'other'],
    },
    budget: {
      type: 'string',
      enum: [
        'UNDER_1000_USD',
        'USD_1000_3000',
        'USD_3000_7500',
        'USD_7500_15000',
        'OVER_15000_USD',
        'NOT_SURE',
      ],
    },
    timeline: {
      type: 'string',
      enum: [
        'UNDER_1_MONTH',
        'MONTHS_1_2',
        'MONTHS_2_4',
        'MONTHS_4_6',
        'OVER_6_MONTHS',
        'NOT_SURE',
      ],
    },
    description: { type: 'string', minLength: 10, maxLength: 5000 },
    features: {
      type: 'array',
      maxItems: 50,
      items: { type: 'string', minLength: 1, maxLength: 100 },
    },
    companySize: {
      type: 'string',
      enum: ['1-10', '11-50', '51-200', '201-1000', '1000-plus'],
    },
    isDecisionMaker: { type: 'boolean' },
    urgency: { type: 'string', enum: ['low', 'medium', 'high'] },
  },
} as const;

export const discoverySuccessResponseSchema = {
  type: 'object',
  required: ['success', 'data'],
  additionalProperties: false,
  properties: {
    success: { type: 'boolean', const: true },
    data: {
      type: 'object',
      required: ['leadId', 'score', 'status'],
      additionalProperties: false,
      properties: {
        leadId: { type: 'string' },
        score: { type: 'integer', minimum: 0, maximum: 100 },
        status: { type: 'string' },
      },
    },
  },
} as const;

/**
 * Stable machine-readable error codes shared across the API.
 * Keep codes additive — never rename once clients depend on them.
 */
export const ErrorCode = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

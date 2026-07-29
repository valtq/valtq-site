import { ErrorCode } from './error-codes.js';

/**
 * Operational error thrown by application code.
 * The global error handler maps this to a consistent HTTP response.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;
  readonly details?: unknown;
  readonly isOperational: boolean;

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown): AppError {
    return new AppError(400, ErrorCode.BAD_REQUEST, message, details);
  }

  static notFound(message = 'Resource not found'): AppError {
    return new AppError(404, ErrorCode.NOT_FOUND, message);
  }

  static validation(message: string, details?: unknown): AppError {
    return new AppError(400, ErrorCode.VALIDATION_ERROR, message, details);
  }
}

import {
  DiscoveryResponseSchema,
  DiscoverySubmissionSchema,
  type DiscoveryResponse,
  type DiscoverySubmission,
} from '@valtq/types';

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) {
    throw new ApiError('API URL is not configured', 500);
  }

  return raw.replace(/\/+$/, '');
}

type ApiSuccessEnvelope<T> = {
  success: true;
  data: T;
};

type ApiErrorEnvelope = {
  success: false;
  error: {
    code?: string;
    message: string;
    details?: unknown;
  };
};

/**
 * Submit a discovery lead to the backend.
 * Validates locally with the shared Zod schema before calling the API.
 */
export async function submitDiscovery(
  payload: DiscoverySubmission,
): Promise<DiscoveryResponse> {
  const parsed = DiscoverySubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError(
      'Request validation failed',
      400,
      'VALIDATION_ERROR',
      parsed.error.flatten(),
    );
  }

  const response = await fetch(`${getApiBaseUrl()}/api/discovery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new ApiError('Invalid response from server', response.status);
  }

  if (!response.ok) {
    const errorBody = body as ApiErrorEnvelope;
    throw new ApiError(
      errorBody.error?.message ?? 'Failed to submit discovery',
      response.status,
      errorBody.error?.code,
      errorBody.error?.details,
    );
  }

  const successBody = body as ApiSuccessEnvelope<unknown>;
  const data = DiscoveryResponseSchema.safeParse(successBody.data);
  if (!data.success) {
    throw new ApiError('Unexpected discovery response shape', 500);
  }

  return data.data;
}

import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verify Cal.com webhook HMAC-SHA256 signature (X-Cal-Signature-256).
 * When no secret is configured, verification is skipped (local/dev).
 */
export function verifyCalWebhookSignature(options: {
  rawBody: string;
  signatureHeader: string | string[] | undefined;
  secret: string | undefined;
}): boolean {
  const { rawBody, signatureHeader, secret } = options;

  if (!secret) {
    return true;
  }

  const signature = Array.isArray(signatureHeader)
    ? signatureHeader[0]
    : signatureHeader;

  if (!signature) {
    return false;
  }

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');

  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function createCalWebhookSignature(
  rawBody: string,
  secret: string,
): string {
  return createHmac('sha256', secret).update(rawBody).digest('hex');
}

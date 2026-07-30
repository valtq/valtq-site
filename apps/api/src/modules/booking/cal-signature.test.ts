import { describe, expect, it } from 'vitest';
import {
  createCalWebhookSignature,
  verifyCalWebhookSignature,
} from './cal-signature.js';

describe('Cal.com webhook signature', () => {
  const secret = 'test-webhook-secret';
  const rawBody = JSON.stringify({
    triggerEvent: 'BOOKING_CREATED',
    payload: { uid: 'abc', startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T10:30:00Z' },
  });

  it('accepts a valid signature', () => {
    const signature = createCalWebhookSignature(rawBody, secret);
    expect(
      verifyCalWebhookSignature({
        rawBody,
        signatureHeader: signature,
        secret,
      }),
    ).toBe(true);
  });

  it('rejects an invalid signature', () => {
    expect(
      verifyCalWebhookSignature({
        rawBody,
        signatureHeader: 'deadbeef',
        secret,
      }),
    ).toBe(false);
  });

  it('skips verification when secret is not configured', () => {
    expect(
      verifyCalWebhookSignature({
        rawBody,
        signatureHeader: undefined,
        secret: undefined,
      }),
    ).toBe(true);
  });
});

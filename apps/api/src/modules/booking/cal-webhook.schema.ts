import { z } from 'zod';

const calAttendeeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

const calBookingPayloadSchema = z.object({
  bookingId: z.union([z.number(), z.string()]).optional(),
  uid: z.string().optional(),
  type: z.string().optional(),
  eventTitle: z.string().optional(),
  title: z.string().optional(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  attendees: z.array(calAttendeeSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
  responses: z
    .object({
      email: z
        .object({
          value: z.string().email().optional(),
        })
        .optional(),
    })
    .passthrough()
    .optional(),
});

export const calWebhookEnvelopeSchema = z.object({
  triggerEvent: z.string(),
  createdAt: z.string().optional(),
  payload: calBookingPayloadSchema,
});

export type CalWebhookEnvelope = z.infer<typeof calWebhookEnvelopeSchema>;
export type CalBookingPayload = z.infer<typeof calBookingPayloadSchema>;

export const BOOKING_CREATED_EVENTS = new Set([
  'BOOKING_CREATED',
  'BOOKING_RESCHEDULED',
]);

export function resolveCalBookingId(payload: CalBookingPayload): string | null {
  if (payload.uid) {
    return String(payload.uid);
  }

  if (payload.bookingId !== undefined) {
    return String(payload.bookingId);
  }

  return null;
}

export function resolveAttendeeEmail(
  payload: CalBookingPayload,
): string | null {
  const fromAttendee = payload.attendees?.[0]?.email;
  if (fromAttendee) {
    return fromAttendee.toLowerCase();
  }

  const fromResponses = payload.responses?.email?.value;
  if (fromResponses) {
    return fromResponses.toLowerCase();
  }

  return null;
}

export function resolveLeadIdFromMetadata(
  payload: CalBookingPayload,
): string | null {
  const leadId = payload.metadata?.leadId;
  return typeof leadId === 'string' && leadId.length > 0 ? leadId : null;
}

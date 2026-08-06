import { z } from 'zod';

/**
 * Shared Contact (project inquiry) submission payload.
 * Frontend and API must validate against this single source of truth.
 */
export const ContactSubmissionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Invalid email address').max(320),
  company: z.string().trim().max(200),
  phone: z.string().trim().max(50),
  preferredChannel: z.string().trim().max(100),
  serviceArea: z.string().trim().max(200),
  productStage: z.string().trim().max(200),
  productUrl: z
    .string()
    .trim()
    .max(500)
    .refine((value) => value.length === 0 || z.string().url().safeParse(value).success, {
      message: 'Invalid URL',
    }),
  timing: z.string().trim().max(100),
  budget: z.string().trim().max(100),
  summary: z.string().trim().min(1, 'Summary is required').max(200),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
});
export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;
export type ContactFormValues = ContactSubmission;

export const ContactResponseSchema = z.object({
  inquiryId: z.string(),
  status: z.string(),
});
export type ContactResponse = z.infer<typeof ContactResponseSchema>;

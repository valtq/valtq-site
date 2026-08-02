import { z } from 'zod';

/**
 * Project-inquiry contact form schema.
 * Mirrors the existing Discovery validation approach: a single Zod schema
 * is used both for live field validation and for the submission payload.
 */
export const ContactFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200),
  phone: z.string().trim().max(50),
  preferredChannel: z.string().trim().max(100),
  serviceArea: z.string().trim().max(200),
  productStage: z.string().trim().max(200),
  productUrl: z
    .string()
    .trim()
    .max(500)
    .refine(
      (value) => value.length === 0 || z.string().url().safeParse(value).success,
      { message: 'Invalid URL' },
    ),
  timing: z.string().trim().max(100),
  budget: z.string().trim().max(100),
  summary: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(5000),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

export type ContactFormField = keyof ContactFormValues;

export const CONTACT_FORM_DEFAULT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  preferredChannel: '',
  serviceArea: '',
  productStage: '',
  productUrl: '',
  timing: '',
  budget: '',
  summary: '',
  message: '',
};

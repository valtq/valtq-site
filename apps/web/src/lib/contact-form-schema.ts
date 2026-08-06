import { z } from 'zod';
import { ContactSubmissionSchema } from '@valtq/types';

/**
 * Project-inquiry contact form schema.
 * Single source of truth lives in @valtq/types so the frontend and the
 * backend validate the exact same payload shape.
 */
export const ContactFormSchema = ContactSubmissionSchema;

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

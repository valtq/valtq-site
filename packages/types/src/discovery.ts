import { z } from 'zod';

export const ProjectBudgetSchema = z.enum([
  'under-5k',
  '5k-15k',
  '15k-30k',
  '30k-50k',
  '50k-plus',
]);
export type ProjectBudget = z.infer<typeof ProjectBudgetSchema>;

export const ProjectTimelineSchema = z.enum([
  '1-2-months',
  '2-4-months',
  '4-6-months',
  '6-plus-months',
]);
export type ProjectTimeline = z.infer<typeof ProjectTimelineSchema>;

export const ProjectTypeSchema = z.enum([
  'website',
  'web-app',
  'mobile-app',
  'saas',
  'ecommerce',
  'other',
]);
export type ProjectType = z.infer<typeof ProjectTypeSchema>;

export const CompanySizeSchema = z.enum([
  '1-10',
  '11-50',
  '51-200',
  '201-1000',
  '1000-plus',
]);
export type CompanySize = z.infer<typeof CompanySizeSchema>;

export const UrgencySchema = z.enum(['low', 'medium', 'high']);
export type Urgency = z.infer<typeof UrgencySchema>;

/**
 * Shared Discovery submission payload.
 * Frontend and API must validate against this single source of truth.
 */
export const DiscoverySubmissionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Invalid email address').max(320),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(50).optional(),
  country: z.string().trim().max(100).optional(),
  website: z
    .string()
    .trim()
    .max(500)
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value.length === 0 ||
        z.string().url().safeParse(value).success,
      { message: 'Invalid website URL' },
    ),
  projectType: ProjectTypeSchema,
  budget: ProjectBudgetSchema,
  timeline: ProjectTimelineSchema,
  description: z
    .string()
    .trim()
    .min(10, 'Please provide more details')
    .max(5000),
  features: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  companySize: CompanySizeSchema.optional(),
  isDecisionMaker: z.boolean().optional(),
  urgency: UrgencySchema.optional(),
});
export type DiscoverySubmission = z.infer<typeof DiscoverySubmissionSchema>;

export const DiscoveryResponseSchema = z.object({
  leadId: z.string(),
  score: z.number().int().min(0).max(100),
  status: z.string(),
});
export type DiscoveryResponse = z.infer<typeof DiscoveryResponseSchema>;

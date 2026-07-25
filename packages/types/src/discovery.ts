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

export const DiscoverySubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  projectType: ProjectTypeSchema,
  budget: ProjectBudgetSchema,
  timeline: ProjectTimelineSchema,
  description: z.string().min(10, 'Please provide more details'),
  features: z.array(z.string()).optional(),
});
export type DiscoverySubmission = z.infer<typeof DiscoverySubmissionSchema>;

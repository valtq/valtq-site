import { z } from 'zod';

export const LocalizedTextSchema = z.object({
  en: z.string().trim().min(1, 'English is required'),
  ar: z.string().trim().min(1, 'Arabic is required'),
});

export const ProjectHighlightSchema = z.object({
  value: z.string().trim().min(1),
  label: LocalizedTextSchema,
});

const optionalUrlOrEmpty = z
  .string()
  .trim()
  .refine((value) => value === '' || /^https?:\/\//i.test(value), {
    message: 'Must be a valid URL or empty',
  });

export const ProjectLinksSchema = z.object({
  live: optionalUrlOrEmpty.optional().default(''),
  github: optionalUrlOrEmpty.optional().default(''),
  caseStudy: z.string().trim().optional().default(''),
});

export const ProjectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens'),
  title: LocalizedTextSchema,
  category: LocalizedTextSchema,
  description: LocalizedTextSchema,
  image: z.string().trim().min(1),
  imageAlt: LocalizedTextSchema,
  techStack: z.array(z.string().trim().min(1)).min(1),
  highlight: ProjectHighlightSchema,
  links: ProjectLinksSchema.default({}),
  featured: z.boolean().default(false),
  year: z.coerce.number().int().min(2000).max(2100),
  published: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const ProjectUpdateSchema = ProjectInputSchema.partial().extend({
  slug: ProjectInputSchema.shape.slug.optional(),
});

export type ProjectInput = z.infer<typeof ProjectInputSchema>;
export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;

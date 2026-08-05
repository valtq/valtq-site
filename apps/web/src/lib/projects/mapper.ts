import type { Project } from '@/content/projects';
import type { ProjectDocument } from '@/lib/db/models/project';
import type { ProjectInput } from '@/lib/projects/schema';

function cleanLink(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Maps a Mongo document to the UI `Project` shape used by the work page cards. */
export function toProjectCard(doc: ProjectDocument): Project {
  const highlight = doc.highlight ?? { value: '', label: { en: '', ar: '' } };

  return {
    id: doc.slug,
    title: { en: doc.title.en, ar: doc.title.ar },
    category: { en: doc.category.en, ar: doc.category.ar },
    description: { en: doc.description.en, ar: doc.description.ar },
    image: doc.image,
    imageAlt: { en: doc.imageAlt.en, ar: doc.imageAlt.ar },
    techStack: [...doc.techStack],
    highlight: {
      value: highlight.value,
      label: { en: highlight.label.en, ar: highlight.label.ar },
    },
    links: {
      live: cleanLink(doc.links?.live),
      github: cleanLink(doc.links?.github),
      caseStudy: cleanLink(doc.links?.caseStudy),
    },
    featured: Boolean(doc.featured),
    year: doc.year,
  };
}

export interface AdminProject extends Project {
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function toAdminProject(doc: ProjectDocument): AdminProject {
  return {
    ...toProjectCard(doc),
    published: Boolean(doc.published),
    sortOrder: doc.sortOrder ?? 0,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export function normalizeLinks(links: ProjectInput['links']) {
  return {
    live: cleanLink(links?.live) ?? '',
    github: cleanLink(links?.github) ?? '',
    caseStudy: cleanLink(links?.caseStudy) ?? '',
  };
}

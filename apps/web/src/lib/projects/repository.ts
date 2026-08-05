import { connectMongo } from '@/lib/db/mongodb';
import { PortfolioProject, type ProjectDocument } from '@/lib/db/models/project';
import { projects as seedProjects } from '@/content/projects';
import {
  normalizeLinks,
  toAdminProject,
  toProjectCard,
  type AdminProject,
} from '@/lib/projects/mapper';
import type { Project } from '@/content/projects';
import type { ProjectInput, ProjectUpdate } from '@/lib/projects/schema';

async function ensureSeeded(): Promise<void> {
  await connectMongo();
  const count = await PortfolioProject.countDocuments();
  if (count > 0) return;

  await PortfolioProject.insertMany(
    seedProjects.map((project, index) => ({
      slug: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      imageAlt: project.imageAlt,
      techStack: project.techStack,
      highlight: project.highlight,
      links: {
        live: project.links.live ?? '',
        github: project.links.github ?? '',
        caseStudy: project.links.caseStudy ?? '',
      },
      featured: project.featured,
      year: project.year,
      published: true,
      sortOrder: index,
    })),
  );
}

export async function listPublishedProjects(): Promise<Project[]> {
  await ensureSeeded();
  const docs = await PortfolioProject.find({ published: true })
    .sort({ featured: -1, sortOrder: 1, year: -1 })
    .lean<ProjectDocument[]>();
  return docs.map(toProjectCard);
}

export async function listAllProjects(): Promise<AdminProject[]> {
  await ensureSeeded();
  const docs = await PortfolioProject.find()
    .sort({ sortOrder: 1, year: -1 })
    .lean<ProjectDocument[]>();
  return docs.map(toAdminProject);
}

export async function getProjectBySlug(slug: string): Promise<AdminProject | null> {
  await connectMongo();
  const doc = await PortfolioProject.findOne({ slug }).lean<ProjectDocument | null>();
  return doc ? toAdminProject(doc) : null;
}

export async function createProject(input: ProjectInput): Promise<AdminProject> {
  await connectMongo();
  const doc = await PortfolioProject.create({
    ...input,
    links: normalizeLinks(input.links),
  });
  return toAdminProject(doc.toObject() as ProjectDocument);
}

export async function updateProject(
  slug: string,
  input: ProjectUpdate,
): Promise<AdminProject | null> {
  await connectMongo();
  const update: Record<string, unknown> = { ...input };
  if (input.links) {
    update.links = normalizeLinks(input.links);
  }

  const doc = await PortfolioProject.findOneAndUpdate({ slug }, { $set: update }, {
    new: true,
    runValidators: true,
  }).lean<ProjectDocument | null>();

  return doc ? toAdminProject(doc) : null;
}

export async function deleteProject(slug: string): Promise<boolean> {
  await connectMongo();
  const result = await PortfolioProject.deleteOne({ slug });
  return result.deletedCount === 1;
}

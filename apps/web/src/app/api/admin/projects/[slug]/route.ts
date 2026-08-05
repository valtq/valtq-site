import { requireAdmin, jsonError, jsonSuccess } from '@/lib/auth/guards';
import {
  deleteProject,
  getProjectBySlug,
  updateProject,
} from '@/lib/projects/repository';
import { ProjectUpdateSchema } from '@/lib/projects/schema';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { slug } = await context.params;
    const project = await getProjectBySlug(slug);
    if (!project) return jsonError('NOT_FOUND', 'Project not found', 404);
    return jsonSuccess(project);
  } catch (err) {
    console.error('[GET /api/admin/projects/[slug]]', err);
    return jsonError('INTERNAL_ERROR', 'Failed to load project', 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { slug } = await context.params;
    const body: unknown = await request.json();
    const parsed = ProjectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError('VALIDATION_ERROR', parsed.error.issues[0]?.message ?? 'Invalid data', 400);
    }

    const project = await updateProject(slug, parsed.data);
    if (!project) return jsonError('NOT_FOUND', 'Project not found', 404);
    return jsonSuccess(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update project';
    if (message.includes('E11000') || message.toLowerCase().includes('duplicate')) {
      return jsonError('CONFLICT', 'A project with this slug already exists', 409);
    }
    console.error('[PATCH /api/admin/projects/[slug]]', err);
    return jsonError('INTERNAL_ERROR', 'Failed to update project', 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { slug } = await context.params;
    const deleted = await deleteProject(slug);
    if (!deleted) return jsonError('NOT_FOUND', 'Project not found', 404);
    return jsonSuccess({ deleted: true });
  } catch (err) {
    console.error('[DELETE /api/admin/projects/[slug]]', err);
    return jsonError('INTERNAL_ERROR', 'Failed to delete project', 500);
  }
}

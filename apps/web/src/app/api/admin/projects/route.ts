import { requireAdmin, jsonError, jsonSuccess } from '@/lib/auth/guards';
import { createProject, listAllProjects } from '@/lib/projects/repository';
import { ProjectInputSchema } from '@/lib/projects/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const projects = await listAllProjects();
    return jsonSuccess(projects);
  } catch (err) {
    console.error('[GET /api/admin/projects]', err);
    return jsonError('INTERNAL_ERROR', 'Failed to load projects', 500);
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body: unknown = await request.json();
    const parsed = ProjectInputSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError('VALIDATION_ERROR', parsed.error.issues[0]?.message ?? 'Invalid data', 400);
    }

    const project = await createProject(parsed.data);
    return jsonSuccess(project, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create project';
    if (message.includes('E11000') || message.toLowerCase().includes('duplicate')) {
      return jsonError('CONFLICT', 'A project with this slug already exists', 409);
    }
    console.error('[POST /api/admin/projects]', err);
    return jsonError('INTERNAL_ERROR', 'Failed to create project', 500);
  }
}

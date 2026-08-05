import { listPublishedProjects } from '@/lib/projects/repository';
import { jsonError, jsonSuccess } from '@/lib/auth/guards';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await listPublishedProjects();
    return jsonSuccess(projects);
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return jsonError('INTERNAL_ERROR', 'Failed to load projects', 500);
  }
}

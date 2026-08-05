import Link from 'next/link';
import type { AdminProject } from '@/lib/projects/mapper';
import type { Locale } from '@/i18n/config';
import { Badge } from '@/components/ui/badge';

interface ProjectsAdminTableProps {
  locale: Locale;
  projects: AdminProject[];
}

export function ProjectsAdminTable({ locale, projects }: ProjectsAdminTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-container-lowest p-10 text-center text-on-surface-variant">
        {locale === 'ar' ? 'لا توجد مشاريع بعد.' : 'No projects yet.'}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-container-lowest">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-on-surface-variant">
            <tr>
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">Year</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-4">
                  <div className="font-semibold text-on-surface">{project.title[locale]}</div>
                  <div className="mt-0.5 text-xs text-on-surface-variant">{project.id}</div>
                </td>
                <td className="px-4 py-4 tabular-nums text-on-surface-variant">{project.year}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.published ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                    {project.featured && <Badge>Featured</Badge>}
                  </div>
                </td>
                <td className="px-4 py-4 tabular-nums text-on-surface-variant">{project.sortOrder}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/${locale}/admin/projects/${encodeURIComponent(project.id)}`}
                    className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {locale === 'ar' ? 'تعديل' : 'Edit'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

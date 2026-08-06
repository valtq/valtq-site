import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectForm } from '@/components/admin/project-form';
import { getProjectBySlug } from '@/lib/projects/repository';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <AdminShell
      locale={locale as Locale}
      title={locale === 'ar' ? `تعديل: ${project.title.ar}` : `Edit: ${project.title.en}`}
    >
      <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-8">
        <ProjectForm locale={locale as Locale} mode="edit" initial={project} />
      </div>
    </AdminShell>
  );
}

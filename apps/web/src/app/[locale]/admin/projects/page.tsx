import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectsAdminTable } from '@/components/admin/projects-admin-table';
import { listAllProjects } from '@/lib/projects/repository';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const projects = await listAllProjects();

  return (
    <AdminShell
      locale={locale as Locale}
      title={locale === 'ar' ? 'المشاريع' : 'Projects'}
      action={
        <Link
          href={`/${locale}/admin/projects/new`}
          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-container"
        >
          {locale === 'ar' ? 'مشروع جديد' : 'New project'}
        </Link>
      }
    >
      <ProjectsAdminTable locale={locale as Locale} projects={projects} />
    </AdminShell>
  );
}

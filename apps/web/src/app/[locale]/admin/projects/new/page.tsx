import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectForm } from '@/components/admin/project-form';

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <AdminShell
      locale={locale as Locale}
      title={locale === 'ar' ? 'مشروع جديد' : 'New project'}
    >
      <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-8">
        <ProjectForm locale={locale as Locale} mode="create" />
      </div>
    </AdminShell>
  );
}

import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { WorkHero } from '@/components/sections/work-hero';
import { ProjectsSection } from '@/components/sections/projects/projects-section';
import { projects as fallbackProjects } from '@/content/projects';
import { listPublishedProjects } from '@/lib/projects/repository';

export const dynamic = 'force-dynamic';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  let projects = fallbackProjects;
  try {
    projects = await listPublishedProjects();
  } catch (error) {
    console.error('[work] Falling back to static projects:', error);
  }

  return (
    <>
      <WorkHero dict={dict} locale={locale as Locale} />
      <ProjectsSection dict={dict} locale={locale as Locale} projects={projects} />
    </>
  );
}

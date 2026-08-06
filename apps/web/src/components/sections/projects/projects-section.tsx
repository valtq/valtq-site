import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowRightIcon } from '@/components/ui/icons';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { ProjectsGrid } from './projects-grid';

interface ProjectsSectionProps {
  dict: Dictionary;
  locale: Locale;
  projects: Project[];
}

export function ProjectsSection({ dict, locale, projects }: ProjectsSectionProps) {
  const copy = dict.projects;

  return (
    <Section
      variant="muted"
      id="case-studies"
      className="scroll-mt-20"
      aria-labelledby="projects-title"
    >
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                {copy.eyebrow}
              </p>
              <h2
                id="projects-title"
                className="mt-5 font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl lg:leading-[1.08]"
              >
                {copy.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">
                {copy.description}
              </p>
            </div>

            <Link
              href={`/${locale}/discovery`}
              className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 lg:self-auto lg:pb-2"
            >
              {dict.work.startProject}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>
        </ScrollReveal>

        {projects.length > 0 ? (
          <ProjectsGrid
            projects={projects}
            locale={locale}
            labels={copy}
            className="mt-12 sm:mt-14 lg:mt-16"
          />
        ) : (
          <p className="mt-12 text-center text-on-surface-variant">
            {locale === 'ar' ? 'لا توجد مشاريع منشورة بعد.' : 'No published projects yet.'}
          </p>
        )}
      </Container>
    </Section>
  );
}

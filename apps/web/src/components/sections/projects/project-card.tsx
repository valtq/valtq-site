import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import { ProjectButtons } from './project-buttons';
import { ProjectHighlight } from './project-highlight';
import { ProjectImage } from './project-image';
import { ProjectTags } from './project-tags';
import type { ProjectLabels } from './types';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  labels: ProjectLabels;
  priority?: boolean;
  className?: string;
}

/**
 * Hover and focus states are driven from this element via the `group` class, so the
 * image zoom, gradient wash, and highlight accent all animate together. `focus-within`
 * mirrors the hover treatment so keyboard users get the same affordance.
 */
export function ProjectCard({
  project,
  locale,
  labels,
  priority = false,
  className,
}: ProjectCardProps) {
  const title = project.title[locale];
  const titleHref = project.links.caseStudy
    ? `/${locale}/work/${project.links.caseStudy}`
    : project.links.live;
  const titleIsExternal = !project.links.caseStudy && Boolean(project.links.live);

  const titleClasses =
    'rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-container-lowest shadow-sm',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg',
        'focus-within:-translate-y-1 focus-within:border-primary/60 focus-within:shadow-lg',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-tertiary/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
      />

      <ProjectImage
        project={project}
        locale={locale}
        featured={project.featured}
        priority={priority}
        featuredLabel={labels.featuredLabel}
        className="z-10"
      />

      <div className="relative z-10 flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-on-surface sm:text-[1.375rem]">
            {titleHref ? (
              titleIsExternal ? (
                <a
                  href={titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={titleClasses}
                >
                  {title}
                  <span className="sr-only">{` (${labels.opensInNewTab})`}</span>
                </a>
              ) : (
                <Link href={titleHref} className={titleClasses}>
                  {title}
                </Link>
              )
            ) : (
              title
            )}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
            {project.description[locale]}
          </p>
        </div>

        <ProjectTags
          techStack={project.techStack}
          label={labels.techLabel}
          moreLabel={labels.moreTech}
        />

        <ProjectHighlight highlight={project.highlight} locale={locale} />

        <ProjectButtons
          projectTitle={title}
          links={project.links}
          locale={locale}
          labels={labels}
        />
      </div>
    </article>
  );
}

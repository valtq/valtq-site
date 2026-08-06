import { StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import { cn } from '@/lib/cn';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import { ProjectCard } from './project-card';
import type { ProjectLabels } from './types';

interface ProjectsGridProps {
  projects: Project[];
  locale: Locale;
  labels: ProjectLabels;
  /** How many leading images skip lazy loading. Keep at 0 for below-the-fold sections. */
  priorityCount?: number;
  className?: string;
}

/**
 * One column on mobile, two on tablet, three on desktop. Featured entries occupy
 * the full row so they stand alone as a hero piece above the regular grid.
 */
export function ProjectsGrid({
  projects,
  locale,
  labels,
  priorityCount = 0,
  className,
}: ProjectsGridProps) {
  return (
    <StaggerReveal
      className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8', className)}
    >
      {projects.map((project, index) => (
        <StaggerItem
          key={project.id}
          className={cn('min-w-0', project.featured && 'sm:col-span-2 lg:col-span-3')}
        >
          <ProjectCard
            project={project}
            locale={locale}
            labels={labels}
            priority={index < priorityCount}
          />
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

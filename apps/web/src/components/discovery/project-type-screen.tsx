'use client';

import { useCallback } from 'react';
import type { ProjectType } from '@valtq/types';
import { cn } from '@/lib/cn';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { useDiscoveryStore } from '@/stores/discovery-store';

const PROJECT_TYPES: ProjectType[] = [
  'website',
  'web-app',
  'mobile-app',
  'saas',
  'ecommerce',
  'other',
];

const PROJECT_TYPE_ICONS: Record<ProjectType, React.ReactNode> = {
  website: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  'web-app': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  'mobile-app': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  saas: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  ecommerce: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  other: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

interface ProjectTypeScreenProps {
  locale: Locale;
}

/**
 * Screen 2: Project Type selection with 6 schema-aligned options.
 * Selection is written immediately to Zustand.
 * Continue is disabled until a project type is selected.
 */
function ProjectTypeScreen({ locale }: ProjectTypeScreenProps) {
  const copy = discoveryCopy[locale];
  const projectType = useDiscoveryStore((s) => s.projectType);
  const setProjectType = useDiscoveryStore((s) => s.setProjectType);
  const previousStep = useDiscoveryStore((s) => s.previousStep);
  const nextStep = useDiscoveryStore((s) => s.nextStep);

  const handleSelect = useCallback(
    (type: ProjectType) => {
      setProjectType(type);
    },
    [setProjectType],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, type: ProjectType) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setProjectType(type);
      }
    },
    [setProjectType],
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {copy.projectType.badge}
          </span>
        </div>
        <h1 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl">
          {copy.projectType.headline}
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.projectType.description}
        </p>
      </div>

      {/* Project type grid */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="radiogroup"
        aria-label={copy.projectType.headline}
      >
        {PROJECT_TYPES.map((type) => {
          const isSelected = projectType === type;
          const option = copy.projectType.options[type];
          if (!option) return null;

          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-pressed={isSelected}
              tabIndex={0}
              onClick={() => handleSelect(type)}
              onKeyDown={(e) => handleKeyDown(e, type)}
              className={cn(
                'group relative flex min-h-[188px] flex-col items-start gap-4 rounded-2xl border p-6 text-start transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-surface-container-low',
              )}
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-container-high text-primary group-hover:bg-primary/10',
                )}
                aria-hidden="true"
              >
                {PROJECT_TYPE_ICONS[type]}
              </div>
              <div className="space-y-1.5">
                <p className="font-display text-lg font-semibold text-on-surface">
                  {option.label}
                </p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer navigation */}
      <div className="flex flex-col-reverse items-stretch gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          size="lg"
          className="min-h-12"
          onClick={previousStep}
        >
          {copy.actions.back}
        </Button>
        <Button
          size="lg"
          className="min-h-12"
          disabled={projectType === null}
          onClick={() => {
            if (projectType) {
              nextStep();
            }
          }}
        >
          {copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { ProjectTypeScreen };

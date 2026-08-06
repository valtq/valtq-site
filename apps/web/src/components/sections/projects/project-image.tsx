import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface ProjectImageProps {
  project: Project;
  locale: Locale;
  /** Featured cards are full-width, so they use a wider crop and larger `sizes`. */
  featured?: boolean;
  /** Opt a single above-the-fold image out of lazy loading. */
  priority?: boolean;
  featuredLabel: string;
  className?: string;
}

/**
 * Screenshot with the overlay stack: a scrim for badge legibility, a brand gradient
 * that fades in on hover, and a slow sheen sweep. All overlays are inert to pointers
 * so the card's own links stay clickable.
 */
export function ProjectImage({
  project,
  locale,
  featured = false,
  priority = false,
  featuredLabel,
  className,
}: ProjectImageProps) {
  return (
    <div
      className={cn(
        'relative w-full shrink-0 overflow-hidden bg-muted',
        featured ? 'aspect-[21/9]' : 'aspect-[16/9]',
        className,
      )}
    >
      <Image
        src={project.image}
        alt={project.imageAlt[locale]}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={
          featured
            ? '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px'
            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px'
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-tertiary/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full motion-reduce:hidden"
      />

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
            {project.category[locale]}
          </span>
          {featured && (
            <span className="rounded-full border border-white/30 bg-primary/85 px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm backdrop-blur-md">
              {featuredLabel}
            </span>
          )}
        </div>
        <span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.08em] text-white/90 backdrop-blur-md">
          {project.year}
        </span>
      </div>
    </div>
  );
}

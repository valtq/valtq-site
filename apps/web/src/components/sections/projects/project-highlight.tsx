import { cn } from '@/lib/cn';
import type { ProjectHighlight as Highlight } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface ProjectHighlightProps {
  highlight: Highlight;
  locale: Locale;
  className?: string;
}

/**
 * A single key outcome presented as a pull-quote strip — one figure, one phrase.
 * Intentionally quieter than a metrics grid so cards stay editorial, not dashboard-like.
 */
export function ProjectHighlight({ highlight, locale, className }: ProjectHighlightProps) {
  return (
    <p
      className={cn(
        'mt-auto flex items-baseline gap-2.5 border-s-2 border-primary/70 ps-3.5',
        'text-sm leading-snug text-on-surface-variant',
        className,
      )}
    >
      <span className="font-display text-xl font-semibold tabular-nums leading-none tracking-tight text-primary">
        {highlight.value}
      </span>
      <span className="min-w-0">{highlight.label[locale]}</span>
    </p>
  );
}

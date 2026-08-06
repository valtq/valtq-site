import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';

interface ProjectTagsProps {
  techStack: string[];
  label: string;
  /** Template containing `{count}`, used as the overflow chip's accessible name. */
  moreLabel: string;
  /** Chips rendered before collapsing the rest into a `+N` chip. */
  max?: number;
  className?: string;
}

/** Technology pills with a collapsed overflow chip so long stacks never wrap past two rows. */
export function ProjectTags({
  techStack,
  label,
  moreLabel,
  max = 5,
  className,
}: ProjectTagsProps) {
  if (techStack.length === 0) return null;

  const visible = techStack.slice(0, max);
  const hiddenCount = techStack.length - visible.length;

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <p
        aria-hidden="true"
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70"
      >
        {label}
      </p>
      <ul aria-label={label} className="flex flex-wrap gap-1.5">
        {visible.map((tech) => (
          <li key={tech}>
            <Badge
              variant="outline"
              className="border-border/80 bg-surface-container-lowest/60 px-2.5 py-1 font-medium text-on-surface-variant backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {tech}
            </Badge>
          </li>
        ))}
        {hiddenCount > 0 && (
          <li>
            <Badge variant="default" className="px-2.5 py-1 tabular-nums">
              <span aria-hidden="true">{`+${hiddenCount}`}</span>
              <span className="sr-only">{moreLabel.replace('{count}', String(hiddenCount))}</span>
            </Badge>
          </li>
        )}
      </ul>
    </div>
  );
}

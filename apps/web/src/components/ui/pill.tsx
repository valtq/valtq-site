import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Rounded chip for labels and counts. Matches DESIGN.md spec:
 * 4px radius or pill-shape. Light Slate bg with Slate text.
 *
 * ```tsx
 * <Pill>React</Pill>
 * <Pill variant="success">Completed</Pill>
 * ```
 */
const variants = {
  default: 'bg-secondary-container text-on-secondary-container',
  success: 'bg-success/10 text-tertiary',
  outline: 'border border-border text-on-surface',
  destructive: 'bg-destructive/10 text-destructive',
} as const;

export type PillVariant = keyof typeof variants;

export interface PillProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PillVariant;
}

const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-150',
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Pill.displayName = 'Pill';

export { Pill };

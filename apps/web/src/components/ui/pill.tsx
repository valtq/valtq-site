import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-border text-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
} as const;

export type PillVariant = keyof typeof variants;

export interface PillProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PillVariant;
}

/**
 * Rounded chip for labels and counts.
 *
 * ```tsx
 * <Pill>React</Pill>
 * <Pill variant="secondary">TypeScript</Pill>
 * ```
 */
const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Pill.displayName = 'Pill';

export { Pill };

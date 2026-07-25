import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Inline status indicator. Matches DESIGN.md Chips/Tags spec:
 * Small 4px radius or pill-shape. Light Slate bg with Slate text for neutral.
 * Cyan bg at 10% opacity for success/completion states.
 *
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="success">Complete</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */
const variants = {
  default: 'bg-secondary-container text-on-secondary-container',
  success: 'bg-success/10 text-tertiary',
  outline: 'border border-border text-on-surface',
  destructive: 'bg-destructive/10 text-destructive',
} as const;

export type BadgeVariant = keyof typeof variants;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { Badge };

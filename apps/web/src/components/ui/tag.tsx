'use client';

import { forwardRef, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';

/**
 * Removable tag with close button. Matches DESIGN.md spec:
 * 4px radius, Slate bg/text for neutral. Cyan for success states.
 *
 * ```tsx
 * <Tag>Filter: Active</Tag>
 * <Tag variant="outline" onRemove={() => clear()}>Status: Published</Tag>
 * ```
 */
const variants = {
  default: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80',
  outline: 'border border-border text-on-surface hover:bg-accent',
  success: 'bg-success/10 text-tertiary hover:bg-success/15',
  destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
} as const;

export type TagVariant = keyof typeof variants;

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TagVariant;
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant = 'default', onRemove, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-sm font-medium transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'inline-flex items-center justify-center rounded-sm p-0.5',
            'hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  ),
);
Tag.displayName = 'Tag';

export { Tag };

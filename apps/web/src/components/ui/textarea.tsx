import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Styled textarea. Matches Input conventions and DESIGN.md spec:
 * White background, 1px border (#E2E8F0), 8px radius.
 * Label in Slate, focus state border changes to Cobalt Blue.
 *
 * ```tsx
 * <Textarea placeholder="Describe your project…" />
 * <Textarea disabled />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[160px] w-full rounded-lg border border-input bg-surface-container-lowest px-4 py-3 text-base text-on-surface',
        'placeholder:text-on-surface-variant/60',
        'focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Styled text input. Matches DESIGN.md spec:
 * White background, 1px border (#E2E8F0), 8px radius.
 * Label in Slate, focus state border changes to Cobalt Blue.
 *
 * ```tsx
 * <Input placeholder="Email address" />
 * <Input type="password" disabled />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-surface-container-lowest px-3 py-2 text-sm text-on-surface',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-on-surface-variant/60',
      'focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };

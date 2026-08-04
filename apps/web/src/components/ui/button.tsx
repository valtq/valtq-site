import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Primary action button. Matches DESIGN.md spec:
 * - Primary: Solid Cobalt Blue (#2B4EFF), white text, 8px radius
 * - Secondary: White bg, 1px hairline border (#E2E8F0), Ink Navy text
 * - Tertiary: Ink Navy text, no border
 * - Hover: Primary darkens 10%, Secondary gains Cobalt Blue border
 *
 * ```tsx
 * <Button>Save changes</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button variant="tertiary">Learn more</Button>
 * ```
 */
const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-container dark:hover:text-on-primary-container active:scale-[0.97] border border-transparent',
  secondary:
    'bg-surface-container-lowest text-on-surface border border-border hover:border-primary hover:bg-surface-container-low active:scale-[0.97]',
  tertiary: 'bg-transparent text-on-surface hover:bg-accent active:scale-[0.97] border border-transparent',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.97] border border-transparent',
} as const;

const sizes = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  default: 'h-10 px-4 py-2 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-md',
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };

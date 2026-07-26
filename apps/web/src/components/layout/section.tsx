import { cn } from '@/lib/cn';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'card';
}

export function Section({ className, children, variant = 'default', ...props }: SectionProps) {
  const variants = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-surface-container-low border-y border-border',
  };

  return (
    <section
      className={cn('py-16 sm:py-20 lg:py-24', variants[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}

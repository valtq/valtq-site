import type { LegalSection } from '@/content/legal';
import { cn } from '@/lib/cn';

interface LegalTableOfContentsProps {
  sections: LegalSection[];
  label: string;
  className?: string;
}

export function LegalTableOfContents({ sections, label, className }: LegalTableOfContentsProps) {
  return (
    <nav aria-label={label} className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
        {label}
      </h2>
      <ol className="mt-4 space-y-2.5 border-s border-border ps-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                'block text-sm leading-snug text-on-surface-variant transition-colors duration-150 hover:text-primary',
              )}
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

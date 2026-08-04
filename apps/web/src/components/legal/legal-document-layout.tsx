import type { ReactNode } from 'react';
import type { LegalSection } from '@/content/legal';
import { LegalTableOfContents } from './legal-table-of-contents';

interface LegalDocumentLayoutProps {
  sections: LegalSection[];
  tocLabel: string;
  children: ReactNode;
}

/**
 * Two-column document layout: a sticky table of contents (desktop) or a static
 * table of contents (mobile), with the document itself constrained to a
 * comfortable reading measure. The TOC is hidden in print.
 */
export function LegalDocumentLayout({ sections, tocLabel, children }: LegalDocumentLayoutProps) {
  return (
    <div>
      <nav
        aria-label={tocLabel}
        data-hidden-on-print
        className="mb-10 rounded-xl border border-border bg-surface-container-lowest p-5 lg:hidden"
      >
        <LegalTableOfContents sections={sections} label={tocLabel} />
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div data-hidden-on-print className="hidden lg:col-span-3 lg:block">
          <LegalTableOfContents sections={sections} label={tocLabel} className="sticky top-24" />
        </div>

        <div className="min-w-0 lg:col-span-9">
          <div className="max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}

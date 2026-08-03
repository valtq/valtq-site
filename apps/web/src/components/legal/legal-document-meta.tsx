import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocument } from '@/content/legal';
import { formatLegalDate } from '@/content/legal';
import { LegalPrintButton } from './legal-print-button';

interface LegalDocumentMetaProps {
  doc: LegalDocument;
  dict: Dictionary;
  locale: Locale;
}

export function LegalDocumentMeta({ doc, dict, locale }: LegalDocumentMetaProps) {
  const t = dict.legal;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      <p className="text-sm font-medium text-inverse-on-surface/80">
        <span className="font-semibold text-inverse-on-surface">{t.effectiveLabel}: </span>
        <time dateTime={doc.effectiveDate}>{formatLegalDate(doc.effectiveDate, locale)}</time>
      </p>
      <span className="h-0.5 w-0.5 rounded-full bg-inverse-on-surface/40" aria-hidden="true" />
      <p className="text-sm font-medium text-inverse-on-surface/80">
        <span className="font-semibold text-inverse-on-surface">{t.updatedLabel}: </span>
        <time dateTime={doc.updatedDate}>{formatLegalDate(doc.updatedDate, locale)}</time>
      </p>
      <LegalPrintButton label={t.printLabel} />
    </div>
  );
}

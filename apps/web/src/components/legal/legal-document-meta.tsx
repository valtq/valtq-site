import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocument } from '@/content/legal';
import { formatLegalDate } from '@/content/legal';
import { LegalDownloadButton } from './legal-download-button';

interface LegalDocumentMetaProps {
  doc: LegalDocument;
  dict: Dictionary;
  locale: Locale;
}

export function LegalDocumentMeta({ doc, dict, locale }: LegalDocumentMetaProps) {
  const t = dict.legal;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      <p className="text-sm font-medium text-white/80">
        <span className="font-semibold text-white">{t.effectiveLabel}: </span>
        <time dateTime={doc.effectiveDate}>{formatLegalDate(doc.effectiveDate, locale)}</time>
      </p>
      <span className="h-0.5 w-0.5 rounded-full bg-white/40" aria-hidden="true" />
      <p className="text-sm font-medium text-white/80">
        <span className="font-semibold text-white">{t.updatedLabel}: </span>
        <time dateTime={doc.updatedDate}>{formatLegalDate(doc.updatedDate, locale)}</time>
      </p>
      <LegalDownloadButton slug={doc.slug} locale={locale} dict={dict} />
    </div>
  );
}

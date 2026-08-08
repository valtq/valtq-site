import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocumentSlug } from '@/content/legal';
import { legalPdfDocuments } from '@/config/legal-documents';

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  );
}

interface LegalDownloadButtonProps {
  slug: LegalDocumentSlug;
  locale: Locale;
  dict: Dictionary;
}

/**
 * Locale-aware PDF download action for the legal documents. Server-rendered as
 * a semantic anchor with the `download` attribute pointing at the fixed typed
 * PDF path, so no client JavaScript is required.
 */
export function LegalDownloadButton({ slug, locale, dict }: LegalDownloadButtonProps) {
  const t = dict.legal;
  const href = legalPdfDocuments[slug][locale];

  return (
    <a
      href={href}
      download
      aria-label={t.downloadAriaLabel}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/30 px-3.5 text-sm font-medium text-white transition-colors hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E36]"
    >
      <DownloadIcon />
      {t.downloadLabel}
    </a>
  );
}

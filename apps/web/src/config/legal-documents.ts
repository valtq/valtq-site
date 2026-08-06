/**
 * Public legal PDF configuration.
 *
 * The legal document PDFs (Terms of Service, Privacy Policy, Cookie Policy) are
 * generated offline by `pnpm --filter web generate:legal-pdfs` and committed to
 * the Next.js `public` directory on the same ValtQ domain. The paths are fixed
 * and typed so the download action can never point to arbitrary user input.
 *
 * Do not store signed or client-specific contracts under these paths.
 */

export const legalPdfDocuments = {
  terms: {
    en: '/documents/legal/valtq-terms-of-service-en.pdf',
    ar: '/documents/legal/valtq-terms-of-service-ar.pdf',
  },
  privacy: {
    en: '/documents/legal/valtq-privacy-policy-en.pdf',
    ar: '/documents/legal/valtq-privacy-policy-ar.pdf',
  },
  cookies: {
    en: '/documents/legal/valtq-cookie-policy-en.pdf',
    ar: '/documents/legal/valtq-cookie-policy-ar.pdf',
  },
} as const;

export type LegalPdfDocumentSlug = keyof typeof legalPdfDocuments;

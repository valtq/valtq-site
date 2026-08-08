/**
 * Public document configuration.
 *
 * The service agreement PDFs are approved, public, unsigned sample templates
 * served from the Next.js `public` directory on the same ValtQ domain. The
 * paths are versioned so future template revisions can be added without
 * browser/CDN cache conflicts.
 *
 * Do not store signed or client-specific contracts under these paths.
 */

export const agreementDocuments = {
  en: {
    path: '/documents/service-agreement/valtq-service-agreement-v1-en.pdf',
    language: 'English',
  },
  ar: {
    path: '/documents/service-agreement/valtq-service-agreement-v1-ar.pdf',
    language: 'العربية',
  },
} as const;

export type AgreementDocumentLocale = keyof typeof agreementDocuments;

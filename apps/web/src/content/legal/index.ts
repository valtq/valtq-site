import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { SITE_URL, SITE_NAME } from '@/config/site';
import type { LegalDocument, LegalDocumentSlug } from './types';
import { termsDocument } from './terms';
import { privacyDocument } from './privacy';
import { cookiesDocument } from './cookies';
import { formatIsoDate } from '@/lib/format-date';

const documents: Record<LegalDocumentSlug, LegalDocument> = {
  terms: termsDocument,
  privacy: privacyDocument,
  cookies: cookiesDocument,
};

export type {
  LegalDocument,
  LegalDocumentSlug,
  LegalBlock,
  LegalSection,
  BrowserStorageItem,
  LegalNoticeTone,
} from './types';

export function getLegalDocument(slug: LegalDocumentSlug): LegalDocument {
  return documents[slug];
}

export function getLegalDocuments(): LegalDocument[] {
  return [documents.terms, documents.privacy, documents.cookies];
}

export function getSiblingDocuments(slug: LegalDocumentSlug): LegalDocument[] {
  return getLegalDocuments().filter((document) => document.slug !== slug);
}

export function formatLegalDate(isoDate: string, locale: Locale): string {
  return formatIsoDate(isoDate, locale);
}

export function getLegalMetadata(slug: LegalDocumentSlug, locale: Locale): Metadata {
  const doc = documents[slug];
  const content = doc.content[locale];
  return {
    title: `${content.title} — ${SITE_NAME}`,
    description: content.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/${slug}`,
      languages: {
        en: `${SITE_URL}/en/${slug}`,
        ar: `${SITE_URL}/ar/${slug}`,
        'x-default': `${SITE_URL}/en/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
      url: `${SITE_URL}/${locale}/${slug}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: content.title,
      description: content.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

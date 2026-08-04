import type { Locale } from '@/i18n/config';

/**
 * Shared content model for the legal documents (Terms, Privacy, Cookie policy).
 *
 * The documents are authored as typed data rather than MDX so that section IDs,
 * anchors, and the localStorage inventory remain type-checked and easy to render
 * through the shared legal page layout.
 */

export type LegalNoticeTone = 'info' | 'caution';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; id: string; heading: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'notice'; tone: LegalNoticeTone; text: string }
  | { type: 'storageInventory'; items: BrowserStorageItem[] };

export interface BrowserStorageItem {
  /** The exact storage key, e.g. `valtq-theme`. */
  key: string;
  /** Storage mechanism: currently always `localStorage`. */
  mechanism: string;
  purpose: string;
  essential: boolean;
}

export interface LegalSection {
  /** Anchor id used for the table of contents and in-page links. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocumentContent {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}

export type LegalDocumentSlug = 'terms' | 'privacy' | 'cookies';

export interface LegalDocument {
  slug: LegalDocumentSlug;
  /** ISO date (YYYY-MM-DD) the policy became effective. */
  effectiveDate: string;
  /** ISO date (YYYY-MM-DD) of the latest revision. */
  updatedDate: string;
  content: Record<Locale, LegalDocumentContent>;
}

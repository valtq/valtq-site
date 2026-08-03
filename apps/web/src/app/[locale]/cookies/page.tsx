import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { getLegalDocument, getLegalMetadata } from '@/content/legal';
import { LegalDocument } from '@/components/legal/legal-document';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return getLegalMetadata('cookies', locale as Locale);
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);
  const doc = getLegalDocument('cookies');

  return <LegalDocument doc={doc} dict={dict} locale={locale as Locale} />;
}

import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { getCaseStudyBySlug, getAllSlugs } from '@/content/case-studies';
import { CaseStudyDetail } from '@/components/sections/case-study-detail';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  const lang = locale as keyof typeof cs.title;
  return {
    title: `${cs.title[lang]} — ValtQ`,
    description: cs.description[lang],
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const dict = await getTranslations(locale as Locale);

  return <CaseStudyDetail cs={cs} dict={dict} locale={locale as Locale} />;
}

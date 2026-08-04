import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { FaqHero } from '@/components/sections/faq-hero';
import { FAQ } from '@/components/sections/faq';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <FaqHero dict={dict} locale={locale as Locale} />
      <FAQ dict={dict} locale={locale as Locale} />
    </>
  );
}

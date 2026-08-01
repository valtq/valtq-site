import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/hero';
import { PricingCards } from '@/components/sections/pricing-cards';

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <Hero dict={dict} variant="pricing" locale={locale as Locale} />
      <PricingCards dict={dict} locale={locale as Locale} />
    </>
  );
}

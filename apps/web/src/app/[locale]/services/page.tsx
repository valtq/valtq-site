import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { ServicesHero } from '@/components/sections/services-hero';
import {
  ServicesOverview,
  ServicesDetails,
  ServicesWhy,
  ServicesEngagements,
  ServicesJourney,
  ServicesFinalCta,
} from '@/components/sections/services-sections';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <ServicesHero dict={dict} locale={locale as Locale} />
      <ServicesOverview dict={dict} />
      <ServicesDetails dict={dict} />
      <ServicesWhy dict={dict} />
      <ServicesEngagements dict={dict} />
      <ServicesJourney dict={dict} locale={locale as Locale} />
      <ServicesFinalCta dict={dict} locale={locale as Locale} />
    </>
  );
}

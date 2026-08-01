import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/hero';
import { HomeServices } from '@/components/sections/home-services';
import { ProcessSteps } from '@/components/sections/process-steps';
import { CTA } from '@/components/sections/cta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <Hero dict={dict} variant="home" locale={locale as Locale} />
      <HomeServices dict={dict} />
      <ProcessSteps dict={dict} />
      <CTA dict={dict} locale={locale as Locale} />
    </>
  );
}

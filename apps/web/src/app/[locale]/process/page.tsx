import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/hero';
import { ProcessSteps } from '@/components/sections/process-steps';
import { CTA } from '@/components/sections/cta';

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <Hero dict={dict} variant="process" locale={locale as Locale} />
      <ProcessSteps dict={dict} />
      <CTA dict={dict} locale={locale as Locale} />
    </>
  );
}

import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { ProcessHero } from '@/components/sections/process-hero';
import {
  ProcessPhilosophy,
  ProcessPhases,
  ProcessVisibility,
  ProcessCollaboration,
  ProcessDeliverables,
  ProcessAdaptation,
  ProcessBenefits,
  ProcessFinalCta,
} from '@/components/sections/process-sections';

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <ProcessHero dict={dict} locale={locale as Locale} />
      <ProcessPhilosophy dict={dict} />
      <ProcessPhases dict={dict} />
      <ProcessVisibility dict={dict} />
      <ProcessCollaboration dict={dict} />
      <ProcessDeliverables dict={dict} />
      <ProcessAdaptation dict={dict} />
      <ProcessBenefits dict={dict} />
      <ProcessFinalCta dict={dict} locale={locale as Locale} />
    </>
  );
}

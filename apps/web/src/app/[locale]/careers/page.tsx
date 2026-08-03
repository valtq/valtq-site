import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { CareersHero } from '@/components/sections/careers-hero';
import {
  CareersStatus,
  CareersWhy,
  CareersHowWeWork,
  CareersDisciplines,
  CareersLookFor,
  CareersCandidateExperience,
} from '@/components/sections/careers-sections';
import { CareersFaq } from '@/components/sections/careers-faq';

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <CareersHero dict={dict} locale={locale as Locale} />
      <CareersStatus dict={dict} />
      <CareersWhy dict={dict} />
      <CareersHowWeWork dict={dict} />
      <CareersDisciplines dict={dict} />
      <CareersLookFor dict={dict} />
      <CareersCandidateExperience dict={dict} />
      <CareersFaq dict={dict} />
    </>
  );
}

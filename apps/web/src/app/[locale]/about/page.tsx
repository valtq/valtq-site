import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { AboutMission, AboutValues, AboutTeam } from '@/components/sections/about-sections';
import { CTA } from '@/components/sections/cta';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <Hero dict={dict} variant="about" locale={locale as Locale} />
      <Stats dict={dict} />
      <AboutMission dict={dict} />
      <AboutValues dict={dict} />
      <AboutTeam dict={dict} />
      <CTA dict={dict} locale={locale as Locale} />
    </>
  );
}

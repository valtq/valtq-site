import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import {
  AboutHero,
  AboutWhoWeAre,
  AboutPrinciples,
  AboutCapabilities,
  AboutProcess,
} from '@/components/sections/about-sections';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <AboutHero dict={dict} />
      <AboutWhoWeAre dict={dict} />
      <AboutPrinciples dict={dict} />
      <AboutCapabilities dict={dict} />
      <AboutProcess dict={dict} locale={locale as Locale} />
    </>
  );
}

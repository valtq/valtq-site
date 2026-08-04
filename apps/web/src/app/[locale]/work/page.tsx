import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { WorkHero } from '@/components/sections/work-hero';
import { WorkGrid } from '@/components/sections/work-grid';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <WorkHero dict={dict} locale={locale as Locale} />
      <WorkGrid dict={dict} locale={locale as Locale} />
    </>
  );
}

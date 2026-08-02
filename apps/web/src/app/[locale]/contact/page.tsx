import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { ContactHero } from '@/components/sections/contact-hero';
import { ContactSections } from '@/components/sections/contact-sections';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return (
    <>
      <ContactHero dict={dict} locale={locale as Locale} />
      <ContactSections dict={dict} locale={locale as Locale} />
    </>
  );
}

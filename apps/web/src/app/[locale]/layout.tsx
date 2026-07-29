import { notFound } from 'next/navigation';
import { locales, type Locale, isRtl } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { DictionaryProvider } from '@/i18n/provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LocaleHtmlAttrs } from '@/components/layout/locale-html-attrs';
import { NavigationFeedback } from '@/components/layout/navigation-feedback';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getTranslations(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';
  const dict = await getTranslations(locale as Locale);

  return (
    <div dir={dir} className="flex min-h-screen flex-col">
      <LocaleHtmlAttrs locale={locale as Locale} />
      <DictionaryProvider dictionary={dict}>
        <Header locale={locale as Locale} />
        <NavigationFeedback>
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
        </NavigationFeedback>
      </DictionaryProvider>
    </div>
  );
}

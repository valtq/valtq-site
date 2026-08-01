import { notFound } from 'next/navigation';
import { locales, type Locale, isRtl } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { DictionaryProvider } from '@/i18n/provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LocaleHtmlAttrs } from '@/components/layout/locale-html-attrs';
import { NavigationFeedback } from '@/components/layout/navigation-feedback';
import { PageTransition } from '@/components/layout/page-transition';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { SITE_URL, SITE_NAME } from '@/config/site';

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
  const title = dict.meta.title;
  const description = dict.meta.description;
  return {
    title,
    description,
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
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
        <ThemeProvider>
          <Header locale={locale as Locale} />
          <NavigationFeedback>
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer locale={locale as Locale} />
          </NavigationFeedback>
          <WhatsAppButton label={dict.whatsapp.floatingLabel} />
        </ThemeProvider>
      </DictionaryProvider>
    </div>
  );
}

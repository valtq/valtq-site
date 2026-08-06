import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { ServiceAgreementPage } from '@/components/service-agreement/service-agreement-page';
import { SITE_URL, SITE_NAME } from '@/config/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getTranslations(locale as Locale);
  const t = dict.serviceAgreementPage.metadata;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/service-agreement`,
      languages: {
        en: `${SITE_URL}/en/service-agreement`,
        ar: `${SITE_URL}/ar/service-agreement`,
        'x-default': `${SITE_URL}/en/service-agreement`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      url: `${SITE_URL}/${locale}/service-agreement`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: SITE_NAME,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiceAgreementRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);

  return <ServiceAgreementPage dict={dict} locale={locale as Locale} />;
}

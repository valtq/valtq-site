import { notFound } from 'next/navigation';
import type { Locale } from '@/content/discovery-copy';
import { DiscoveryWizard } from '@/components/discovery/discovery-wizard';

const SUPPORTED_LOCALES: Locale[] = ['en', 'ar'];

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

interface DiscoveryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DiscoveryPage({ params }: DiscoveryPageProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return <DiscoveryWizard locale={locale as Locale} />;
}

const RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Note: in Next.js 15, params is a Promise in server components.
  // We use a sync wrapper for the dir attribute.
  return <LocaleDirWrapper params={params}>{children}</LocaleDirWrapper>;
}

async function LocaleDirWrapper({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <div dir={dir} lang={locale}>
      {children}
    </div>
  );
}

import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { AdminLoginForm } from '@/components/admin/admin-login-form';

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const { callbackUrl } = await searchParams;
  const safeCallback =
    callbackUrl && callbackUrl.startsWith(`/${locale}/admin`)
      ? callbackUrl
      : `/${locale}/admin/projects`;

  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-lg px-4">
        <div className="rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {locale === 'ar' ? 'لوحة التحكم' : 'Admin'}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-on-surface">
            {locale === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
          </h1>
          <p className="mt-3 text-sm text-on-surface-variant">
            {locale === 'ar'
              ? 'أدخل بيانات الأدمن لإدارة مشاريع صفحة الأعمال.'
              : 'Use your admin credentials to manage /work projects.'}
          </p>
          <div className="mt-8">
            <AdminLoginForm locale={locale as Locale} callbackUrl={safeCallback} />
          </div>
        </div>
      </div>
    </section>
  );
}

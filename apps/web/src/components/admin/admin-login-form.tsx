'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Locale } from '@/i18n/config';

interface AdminLoginFormProps {
  locale: Locale;
  callbackUrl: string;
}

export function AdminLoginForm({ locale, callbackUrl }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError(locale === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid email or password');
      return;
    }

    router.push(callbackUrl || `/${locale}/admin/projects`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-on-surface">
          {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
        </label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-on-surface">
          {locale === 'ar' ? 'كلمة المرور' : 'Password'}
        </label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending
          ? locale === 'ar'
            ? 'جارٍ الدخول...'
            : 'Signing in...'
          : locale === 'ar'
            ? 'تسجيل الدخول'
            : 'Sign in'}
      </Button>
    </form>
  );
}

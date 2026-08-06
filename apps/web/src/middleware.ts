import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './auth.config';
import { locales, defaultLocale } from './i18n/config';

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0]?.trim().toLowerCase().slice(0, 2) ?? '')
    .find((lang): lang is (typeof locales)[number] =>
      locales.includes(lang as (typeof locales)[number]),
    );

  return preferred ?? defaultLocale;
}

const { auth } = NextAuth(authConfig);

const middleware = auth((request) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/twitter-image') ||
    pathname === '/icon' ||
    pathname.startsWith('/icon-') ||
    pathname === '/apple-icon' ||
    pathname.startsWith('/apple-icon-') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getLocaleFromHeaders(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const adminMatch = pathname.match(/^\/(en|ar)\/admin(?:\/(.*))?$/);
  if (adminMatch) {
    const locale = adminMatch[1] ?? defaultLocale;
    const rest = adminMatch[2] ?? '';
    const isLogin = rest === 'login' || rest.startsWith('login/');
    const isAuthed = Boolean(request.auth?.user);

    if (!isLogin && !isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/login`;
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    if (isLogin && isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/projects`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}) as unknown as NextMiddleware;

export default middleware;

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)'],
};

import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/config/site';
import { blogPosts } from '@/content/blog/posts';

const IGNORED_ROUTES = new Set(['admin']);

function getPublicStaticRoutes(): string[] {
  const routes: string[] = [];
  const localeDir = path.join(process.cwd(), 'src', 'app', '[locale]');

  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(localeDir, { withFileTypes: true });
  } catch {
    return routes;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Skip route groups and dynamic segments — blog posts are emitted separately.
    if (name.startsWith('(') || name.startsWith('[')) continue;
    if (IGNORED_ROUTES.has(name)) continue;
    if (fs.existsSync(path.join(localeDir, name, 'page.tsx'))) {
      routes.push(name);
    }
  }

  return routes.sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const topLevelRoutes = getPublicStaticRoutes();

  for (const locale of locales) {
    const otherLocale = locale === 'en' ? 'ar' : 'en';
    const languages = {
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      'x-default': `${SITE_URL}/en`,
    };

    for (const route of ['', ...topLevelRoutes]) {
      const pathname = route ? `/${route}` : '';
      entries.push({
        url: `${SITE_URL}/${locale}${pathname}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            [otherLocale]: `${SITE_URL}/${otherLocale}${pathname}`,
          },
        },
      });
    }

    for (const post of blogPosts) {
      if (post.status !== 'published') continue;
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(`${post.publishedAt}T00:00:00.000Z`),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ...languages,
            [otherLocale]: `${SITE_URL}/${otherLocale}/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}

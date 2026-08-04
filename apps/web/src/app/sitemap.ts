import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/config/site';
import { blogPosts } from '@/content/blog/posts';

const topLevelRoutes = [
  '',
  'about',
  'blog',
  'careers',
  'contact',
  'cookies',
  'discovery',
  'faq',
  'privacy',
  'process',
  'services',
  'terms',
  'work',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const otherLocale = locale === 'en' ? 'ar' : 'en';
    const languages = {
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      'x-default': `${SITE_URL}/en`,
    };

    for (const route of topLevelRoutes) {
      const path = route ? `/${route}` : '';
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'monthly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            [otherLocale]: `${SITE_URL}/${otherLocale}${path}`,
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

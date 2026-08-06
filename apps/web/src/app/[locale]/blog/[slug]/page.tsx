import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/content/blog/posts';
import { ArticleDetail } from '@/components/sections/article-detail';
import { SITE_URL, SITE_NAME } from '@/config/site';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const lang = locale as 'en' | 'ar';
  return {
    title: post.seoTitle[lang],
    description: post.seoDescription[lang],
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        ar: `${SITE_URL}/ar/blog/${slug}`,
        'x-default': `${SITE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.seoTitle[lang],
      description: post.seoDescription[lang],
      type: 'article',
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: post.seoTitle[lang],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle[lang],
      description: post.seoDescription[lang],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const dict = await getTranslations(locale as Locale);
  const lang = locale as 'en' | 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.content[lang].title,
    description: post.content[lang].excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/blog/${post.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };

  return (
    <>
      <ArticleDetail post={post} dict={dict} locale={locale as Locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

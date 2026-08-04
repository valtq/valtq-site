import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-dictionary';
import { BlogHero } from '@/components/sections/blog-hero';
import { FeaturedArticle, TopicsSection } from '@/components/sections/blog-page-sections';
import { BlogExplorer } from '@/components/sections/blog-explorer';
import { blogCategories } from '@/content/blog/categories';
import { getPublishedPosts, getFeaturedPost } from '@/content/blog/posts';
import { getReadingTime } from '@/content/blog/reading-time';

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getTranslations(locale as Locale);
  const lang = locale as 'en' | 'ar';
  const categoryParam = (await searchParams).category;

  const validCategoryIds = blogCategories.map((category) => category.id);
  const activeCategory =
    categoryParam && (validCategoryIds as string[]).includes(categoryParam)
      ? categoryParam
      : undefined;

  const publishedPosts = getPublishedPosts();
  const featured = getFeaturedPost();

  const explorerPosts = publishedPosts.map((post) => ({
    slug: post.slug,
    title: post.content[lang].title,
    excerpt: post.content[lang].excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readingTime: getReadingTime(post.content[lang], lang),
  }));

  const explorerCategories = blogCategories.map((category) => ({
    id: category.id,
    label: category.label[lang],
  }));

  const strings = {
    searchLabel: dict.blog.searchLabel,
    searchPlaceholder: dict.blog.searchPlaceholder,
    clearSearch: dict.blog.clearSearch,
    categoryLabel: dict.blog.categoryLabel,
    allArticles: dict.blog.allArticles,
    resultsSummary: dict.blog.resultsSummary,
    noResultsTitle: dict.blog.noResultsTitle,
    noResultsDescription: dict.blog.noResultsDescription,
    clearFilters: dict.blog.clearFilters,
    readArticle: dict.blog.readArticle,
    minutesRead: dict.blog.minutesRead,
  };

  return (
    <>
      <BlogHero dict={dict} />
      {featured && <FeaturedArticle post={featured} dict={dict} locale={locale as Locale} />}
      <BlogExplorer
        key={activeCategory ?? 'all'}
        posts={explorerPosts}
        categories={explorerCategories}
        strings={strings}
        locale={locale as Locale}
        initialCategory={activeCategory}
      />
      <TopicsSection dict={dict} locale={locale as Locale} />
    </>
  );
}

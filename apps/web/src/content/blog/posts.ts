import type { BlogPost } from './types';
import { content as discoveryEn } from './en/why-discovery-before-development';
import { content as discoveryAr } from './ar/why-discovery-before-development';
import { content as architectureEn } from './en/architecture-for-the-product-stage';
import { content as architectureAr } from './ar/architecture-for-the-product-stage';
import { content as aiEn } from './en/where-ai-adds-real-product-value';
import { content as aiAr } from './ar/where-ai-adds-real-product-value';
import { content as productionEn } from './en/what-production-readiness-includes';
import { content as productionAr } from './ar/what-production-readiness-includes';
import { content as modernizeEn } from './en/modernize-without-rebuilding-everything';
import { content as modernizeAr } from './ar/modernize-without-rebuilding-everything';

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-discovery-before-development',
    category: 'product-strategy',
    featured: true,
    status: 'published',
    publishedAt: '2026-07-21',
    related: ['architecture-for-the-product-stage', 'what-production-readiness-includes'],
    seoTitle: {
      en: 'Why Discovery Before Development Matters',
      ar: 'لماذا نبدأ بمرحلة الاكتشاف قبل التطوير',
    },
    seoDescription: {
      en: 'Development before the problem is clear shifts cost to a later, more expensive phase. Learn what effective Discovery clarifies and when a team is ready to build.',
      ar: 'بدء التطوير قبل توضيح المشكلة ينقل التكلفة إلى مرحلة لاحقة أغلى ثمناً. تعرّف على ما يجب أن توضحه مرحلة الاكتشاف ومتى يصبح الفريق جاهزاً للبناء.',
    },
    content: { en: discoveryEn, ar: discoveryAr },
  },
  {
    slug: 'architecture-for-the-product-stage',
    category: 'software-engineering',
    featured: false,
    status: 'published',
    publishedAt: '2026-07-28',
    related: ['modernize-without-rebuilding-everything', 'why-discovery-before-development'],
    seoTitle: {
      en: 'Architecture Is a Product Decision',
      ar: 'بنية النظام قرارٌ منتجي لا قرارٌ تقني فقط',
    },
    seoDescription: {
      en: 'Early architectural choices are costly to change later. Understand how product stage, uncertainty, team capacity, and operational ownership should shape your system design.',
      ar: 'قرارات البنية المبكرة مكلفة في تغييرها لاحقاً. افهم كيف تشكل مرحلة المنتج وعدم اليقين وقدرة الفريق ومسؤولية التشغيل تصميم نظامك.',
    },
    content: { en: architectureEn, ar: architectureAr },
  },
  {
    slug: 'where-ai-adds-real-product-value',
    category: 'ai-automation',
    featured: false,
    status: 'published',
    publishedAt: '2026-07-30',
    related: ['modernize-without-rebuilding-everything', 'what-production-readiness-includes'],
    seoTitle: {
      en: 'Where AI Adds Real Product Value',
      ar: 'أين يضيف الذكاء الاصطناعي قيمةً حقيقية للمنتج',
    },
    seoDescription: {
      en: 'AI value comes from placement in a real workflow, not from the model alone. Explore practical AI product patterns, guardrails, and when AI is the wrong answer.',
      ar: 'قيمة الذكاء الاصطناعي تنبع من موضعه في سير عمل حقيقي لا من النموذج وحده. استكشف أنماطاً عملية وأنظمة حماية، ومتى يكون الذكاء الاصطناعي إجابة خاطئة.',
    },
    content: { en: aiEn, ar: aiAr },
  },
  {
    slug: 'what-production-readiness-includes',
    category: 'quality-delivery',
    featured: false,
    status: 'published',
    publishedAt: '2026-08-02',
    related: ['modernize-without-rebuilding-everything', 'where-ai-adds-real-product-value'],
    seoTitle: {
      en: 'What Production Readiness Actually Includes',
      ar: 'ماذا تشمل الجاهزية للإطلاق فعلاً',
    },
    seoDescription: {
      en: 'A successful build is not automatically production-ready. Review what release readiness includes: configuration, security, data, monitoring, recovery, and ownership.',
      ar: 'إنجاز البناء لا يعني تلقائياً الجاهزية للإطلاق. راجع ما تشمله الجاهزية: الإعداد والأمان والبيانات والمراقبة والتعافي والمسؤولية.',
    },
    content: { en: productionEn, ar: productionAr },
  },
  {
    slug: 'modernize-without-rebuilding-everything',
    category: 'cloud-infrastructure',
    featured: false,
    status: 'published',
    publishedAt: '2026-08-03',
    related: ['what-production-readiness-includes', 'architecture-for-the-product-stage'],
    seoTitle: {
      en: 'Modernizing Without Rebuilding Everything',
      ar: 'تحديث منتج قائم دون إعادة بناء كل شيء',
    },
    seoDescription: {
      en: 'Complete rewrites can discard working behavior and introduce unverifiable risk. Learn incremental modernization strategies that keep the product running.',
      ar: 'إعادة البناء الشاملة قد تتخلص من سلوك يعمل وتدخل مخاطرة يصعب التحقق منها. تعلّم استراتيجيات التحديث التدريجي التي تُبقي المنتج يعمل.',
    },
    content: { en: modernizeEn, ar: modernizeAr },
  },
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFeaturedPost(): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.featured);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.status === 'published');
}

export function getAllBlogSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}

export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const candidates = (post.related ?? [])
    .map((slug) => getBlogPostBySlug(slug))
    .filter((candidate): candidate is BlogPost => Boolean(candidate))
    .filter((candidate) => candidate.slug !== post.slug);

  if (candidates.length > 0) {
    return candidates.slice(0, limit);
  }

  return getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .concat(getPublishedPosts().filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, limit);
}

import type { Locale } from '@/i18n/config';
import { SITE_URL } from '@/config/site';

export type LocalizedText = Record<Locale, string>;

export interface ProjectHighlight {
  /** The memorable figure — e.g. "2M+", "-65%", "3x". */
  value: string;
  /** Short phrase that completes the figure into a readable outcome. */
  label: LocalizedText;
}

export interface ProjectLinks {
  /** Public production URL. */
  live?: string;
  /** Public source repository. */
  github?: string;
  /** Slug of an internal case study rendered at `/[locale]/work/[slug]`. */
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  techStack: string[];
  /** One key outcome — shown as a pull-quote strip on the card. */
  highlight: ProjectHighlight;
  links: ProjectLinks;
  /** Featured entries occupy a full row above the regular grid. */
  featured: boolean;
  year: number;
}

/**
 * Ordering is meaningful: featured entries claim a full row, so the remaining
 * entries are authored to fill complete rows in the regular grid.
 */
export const projects: Project[] = [
  {
    id: 'novapay',
    title: { en: 'NovaPay', ar: 'NovaPay' },
    category: { en: 'Fintech Platform', ar: 'منصة تقنية مالية' },
    description: {
      en: 'A real-time financial analytics platform that replaced a 45-minute batch pipeline with streaming ingestion, pushing live fraud signals to 15K analysts.',
      ar: 'منصة تحليلات مالية في الوقت الحقيقي استبدلت خط معالجة دفعية يستغرق 45 دقيقة باستيعاب تدفقي، وتدفع إشارات الاحتيال المباشرة إلى 15 ألف محلل.',
    },
    image: '/images/case-studies/novapay.webp',
    imageAlt: {
      en: 'NovaPay dashboard showing real-time transaction analytics and fraud alerts',
      ar: 'لوحة تحكم NovaPay تعرض تحليلات المعاملات المباشرة وتنبيهات الاحتيال',
    },
    techStack: ['Next.js', 'TypeScript', 'React', 'Apache Kafka', 'ClickHouse', 'TailwindCSS'],
    highlight: {
      value: '2M+',
      label: {
        en: 'transactions processed every day',
        ar: 'معاملة تُعالَج كل يوم',
      },
    },
    links: { caseStudy: 'fintech-dashboard' },
    featured: true,
    year: 2025,
  },
  {
    id: 'meditrack',
    title: { en: 'MediTrack', ar: 'MediTrack' },
    category: { en: 'Healthcare Mobile', ar: 'تطبيق رعاية صحية' },
    description: {
      en: 'An offline-first patient management app for 200+ clinics, with predictive reminders that cut no-shows by nearly half.',
      ar: 'تطبيق لإدارة المرضى يعمل دون اتصال أولًا لأكثر من 200 عيادة، مع تذكيرات تنبؤية خفّضت حالات عدم الحضور إلى النصف تقريبًا.',
    },
    image: '/images/case-studies/meditrack.webp',
    imageAlt: {
      en: 'MediTrack mobile screens for patient intake and appointment scheduling',
      ar: 'شاشات تطبيق MediTrack لاستقبال المرضى وجدولة المواعيد',
    },
    techStack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL'],
    highlight: {
      value: '65%',
      label: {
        en: 'faster patient registration',
        ar: 'أسرع في تسجيل المرضى',
      },
    },
    links: { caseStudy: 'healthcare-mobile' },
    featured: false,
    year: 2025,
  },
  {
    id: 'shopvelocity',
    title: { en: 'ShopVelocity', ar: 'ShopVelocity' },
    category: { en: 'E-Commerce Platform', ar: 'منصة تجارة إلكترونية' },
    description: {
      en: 'A monolith decomposed into domain services behind a Strangler Fig migration, absorbing 100K concurrent shoppers with zero downtime.',
      ar: 'منصة متجانسة فُككت إلى خدمات مجالية عبر انتقال تدريجي بنمط Strangler Fig، تستوعب 100 ألف مشترٍ متزامن دون أي توقف.',
    },
    image: '/images/case-studies/shopvelocity.webp',
    imageAlt: {
      en: 'ShopVelocity storefront and checkout flow during a flash sale',
      ar: 'واجهة متجر ShopVelocity ومسار الدفع خلال عرض سريع',
    },
    techStack: ['Next.js', 'Fastify', 'PostgreSQL', 'Redis', 'AWS', 'Terraform'],
    highlight: {
      value: '100K+',
      label: {
        en: 'shoppers online at the same time',
        ar: 'متسوق متصل في نفس اللحظة',
      },
    },
    links: { caseStudy: 'ecommerce-platform' },
    featured: false,
    year: 2024,
  },
  {
    id: 'contentai',
    title: { en: 'ContentAI', ar: 'ContentAI' },
    category: { en: 'AI & Machine Learning', ar: 'ذكاء اصطناعي وتعلم آلي' },
    description: {
      en: 'A hybrid recommendation engine blending collaborative filtering with a transformer sequence model, serving 50K ranked requests per second.',
      ar: 'محرك توصيات هجين يمزج التصفية التعاونية بنموذج تسلسل قائم على المحوّلات، يخدم 50 ألف طلب مُرتَّب في الثانية.',
    },
    image: '/images/case-studies/contentai.webp',
    imageAlt: {
      en: 'ContentAI recommendation feed with personalized content rankings',
      ar: 'واجهة توصيات ContentAI مع ترتيب محتوى مخصص',
    },
    techStack: ['Python', 'FastAPI', 'OpenAI', 'PyTorch', 'Kubernetes', 'MongoDB'],
    highlight: {
      value: '3×',
      label: {
        en: 'higher user engagement',
        ar: 'زيادة في تفاعل المستخدمين',
      },
    },
    links: { caseStudy: 'ai-recommendation-engine' },
    featured: false,
    year: 2024,
  },
  {
    id: 'valtq-platform',
    title: { en: 'ValtQ Platform', ar: 'منصة ValtQ' },
    category: { en: 'Design System & Web Platform', ar: 'نظام تصميم ومنصة ويب' },
    description: {
      en: 'Our own bilingual platform: a token-driven design system, an RTL-first component library, and a Fastify discovery backend in one typed monorepo.',
      ar: 'منصتنا ثنائية اللغة: نظام تصميم مبني على الرموز، ومكتبة مكونات تدعم العربية أولًا، وخدمة استكشاف على Fastify داخل مستودع واحد مُنمَّط بالكامل.',
    },
    image: '/images/home/valtq-hero.webp',
    imageAlt: {
      en: 'ValtQ platform interface showing the bilingual design system in use',
      ar: 'واجهة منصة ValtQ تعرض نظام التصميم ثنائي اللغة أثناء الاستخدام',
    },
    techStack: ['Next.js', 'TypeScript', 'Fastify', 'Prisma', 'TailwindCSS', 'Turborepo'],
    highlight: {
      value: 'EN · AR',
      label: {
        en: 'built fully bilingual from day one',
        ar: 'مبني ثنائي اللغة من اليوم الأول',
      },
    },
    links: {
      live: SITE_URL,
      github: 'https://github.com/valtq/valtq-site',
    },
    featured: false,
    year: 2026,
  },
];

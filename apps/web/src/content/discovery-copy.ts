import type { ProjectType, ProjectBudget, ProjectTimeline } from '@valtq/types';

export type Locale = 'en' | 'ar';

/** Format a number using Arabic-Indic digits for AR locale. */
function localizeDigits(n: number, locale: Locale): string {
  if (locale === 'en') return String(n);
  return new Intl.NumberFormat('ar-EG', { useGrouping: false }).format(n);
}

interface DiscoveryCopy {
  wizardName: string;
  progressLabel: string;
  progressAriaLabel: string;
  intro: {
    badge: string;
    subLabel: string;
    headline: string;
    description: string;
    benefits: { title: string; description: string }[];
    estimatedTime: string;
    cta: string;
  };
  projectType: {
    badge: string;
    subLabel: string;
    headline: string;
    description: string;
    options: Record<ProjectType, { label: string; description: string }>;
  };
  projectBrief: {
    phaseLabel: string;
    subLabel: string;
    heading: string;
    description: string;
    textareaLabel: string;
    textareaPlaceholder: string;
    validationMessage: string;
    characterGuidance: string;
  };
  budgetTimeline: {
    phaseLabel: string;
    heading: string;
    description: string;
    budgetLabel: string;
    timelineLabel: string;
    budgetOptions: Record<ProjectBudget, { label: string }>;
    timelineOptions: Record<ProjectTimeline, { label: string }>;
  };
  contactInformation: {
    phaseLabel: string;
    subLabel: string;
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    optionalFieldLabel: string;
    nameRequiredError: string;
    emailRequiredError: string;
    emailInvalidError: string;
    submittingLabel: string;
    submitError: string;
    submitIncompleteError: string;
  };
  booking: {
    phaseLabel: string;
    subLabel: string;
    heading: string;
    description: string;
    loadingMessage: string;
    widgetTitle: string;
    missingConfigTitle: string;
    missingConfigDescription: string;
    loadErrorTitle: string;
    loadErrorDescription: string;
    retryAction: string;
    successHeading: string;
    successDescription: string;
    responseExpectation: string;
    returnHomeAction: string;
  };
  actions: {
    back: string;
    continue: string;
    start: string;
    returnHome: string;
  };
  stepCounter: (current: number, total: number, locale: Locale) => string;
}

export const discoveryCopy: Record<Locale, DiscoveryCopy> = {
  en: {
    wizardName: 'Discovery Wizard',
    progressLabel: 'Discovery Phase',
    progressAriaLabel: 'Discovery progress',
    intro: {
      badge: 'Precision Engineering',
      subLabel: 'Discovery Wizard 1.0',
      headline: "Let's Build Your Project.",
      description:
        'Help us understand your vision so we can deliver a tailored technical solution. This brief discovery process ensures your consultation is focused and actionable.',
      benefits: [
        {
          title: 'Help us understand your project',
          description: 'Define scope, tech stack requirements, and timelines.',
        },
        {
          title: 'Receive a more focused consultation',
          description: 'Skip the basics and dive into technical architecture.',
        },
        {
          title: 'Book a meeting with our founders',
          description: 'Direct access to the core engineering team.',
        },
      ],
      estimatedTime: '4 minutes',
      cta: 'Start Discovery',
    },
    projectType: {
      badge: 'Discovery Phase',
      subLabel: 'Project Architecture',
      headline: 'What would you like to build?',
      description:
        'Select the platform that best describes your project. This helps us assign the right engineers to your consultation.',
      options: {
        website: {
          label: 'Website',
          description: 'Marketing sites, portfolios, or corporate landing pages.',
        },
        'web-app': {
          label: 'Web Application',
          description: 'Complex browser-based applications with dynamic functionality.',
        },
        'mobile-app': {
          label: 'Mobile Application',
          description: 'Native or cross-platform iOS and Android applications.',
        },
        saas: {
          label: 'SaaS Platform',
          description: 'Complex web applications with user dashboards and billing.',
        },
        ecommerce: {
          label: 'E-commerce',
          description: 'Online stores, marketplaces, and payment integrations.',
        },
        other: {
          label: 'Other / Not Sure Yet',
          description: 'Talk to our architects to define your project scope.',
        },
      },
    },
    projectBrief: {
      phaseLabel: 'Discovery Phase',
      subLabel: 'Project Details',
      heading: 'Tell us about your project.',
      description:
        'Describe your project goals, key features, and any technical requirements. The more detail you provide, the better we can prepare for your consultation.',
      textareaLabel: 'Project brief',
      textareaPlaceholder:
        'Tell us about your project goals, target audience, key features, and any technical requirements…',
      validationMessage: 'Please provide at least 10 characters so we can understand your project.',
      characterGuidance: 'Minimum 10 characters',
    },
    budgetTimeline: {
      phaseLabel: 'Discovery Phase',
      heading: 'Budget & Timeline',
      description:
        'Help us understand your budget range and desired timeline so we can tailor our consultation accordingly.',
      budgetLabel: 'Budget Range',
      timelineLabel: 'Project Timeline',
      budgetOptions: {
        UNDER_1000_USD: { label: 'Under $1,000' },
        USD_1000_3000: { label: '$1,000 – $3,000' },
        USD_3000_7500: { label: '$3,000 – $7,500' },
        USD_7500_15000: { label: '$7,500 – $15,000' },
        OVER_15000_USD: { label: '$15,000+' },
        NOT_SURE: { label: 'Not sure yet' },
      },
      timelineOptions: {
        UNDER_1_MONTH: { label: 'Under 1 month' },
        MONTHS_1_2: { label: '1 – 2 months' },
        MONTHS_2_4: { label: '2 – 4 months' },
        MONTHS_4_6: { label: '4 – 6 months' },
        OVER_6_MONTHS: { label: '6+ months' },
        NOT_SURE: { label: 'Not sure yet' },
      },
    },
    contactInformation: {
      phaseLabel: 'Discovery Phase',
      subLabel: 'Contact Information',
      heading: 'Contact Information',
      description:
        'Tell us how to reach you and where you work so we can prepare for your consultation.',
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Business Email',
      emailPlaceholder: 'john@company.com',
      companyLabel: 'Company',
      companyPlaceholder: 'Acme Inc.',
      optionalFieldLabel: 'Optional',
      nameRequiredError: 'Please enter your name so we know who to address.',
      emailRequiredError: 'Please enter your email address so we can contact you.',
      emailInvalidError: 'Please enter a valid email address.',
      submittingLabel: 'Submitting…',
      submitError:
        'We could not save your discovery brief. Please check your connection and try again.',
      submitIncompleteError: 'Please complete the previous discovery steps before continuing.',
    },
    booking: {
      phaseLabel: 'Discovery Phase',
      subLabel: 'Consultation Booking',
      heading: 'Book Your Consultation',
      description:
        'Choose a time that works for you. Your project details will help our engineering team prepare for the conversation.',
      loadingMessage: 'Loading booking calendar…',
      widgetTitle: 'Schedule a consultation',
      missingConfigTitle: 'Booking unavailable',
      missingConfigDescription:
        'The scheduling system is not configured yet. Please contact us directly to arrange a consultation.',
      loadErrorTitle: 'Unable to load calendar',
      loadErrorDescription:
        'The booking calendar could not be loaded. Please check your connection and try again.',
      retryAction: 'Try again',
      successHeading: 'Booking confirmed',
      successDescription: 'Your consultation has been successfully scheduled.',
      responseExpectation:
        'You will receive a confirmation email with the meeting details shortly.',
      returnHomeAction: 'Return home',
    },
    actions: {
      back: 'Back',
      continue: 'Continue',
      start: 'Start Discovery',
      returnHome: 'Return home',
    },
    stepCounter: (current: number, total: number) => `Step ${current} of ${total}`,
  },
  ar: {
    wizardName: 'مساعد الاستكشاف',
    progressLabel: 'مرحلة الاستكشاف',
    progressAriaLabel: 'تقدم مراحل الاستكشاف',
    intro: {
      badge: 'هندسة دقيقة',
      subLabel: 'مساعد الاستكشاف ١٫٠',
      headline: 'لنبدأ في بناء مشروعك.',
      description:
        'ساعدنا على فهم رؤيتك حتى نتمكن من تقديم حل تقني مخصص. تضمن لك عملية الاستكشاف هذه استشارتك بشكل مركز وعملي.',
      benefits: [
        {
          title: 'ساعدنا على فهم مشروعك',
          description: 'حدد النطاق والمتطلبات التقنية والجدول الزمني.',
        },
        {
          title: 'احصل على استشارة أكثر تركيزاً',
          description: 'تخطَّ الأساسيات وانطلق مباشرة إلى البنية التقنية.',
        },
        {
          title: 'احجز اجتماعاً مع المؤسسين',
          description: 'وصول مباشر إلى فريق الهندسة الأساسي.',
        },
      ],
      estimatedTime: '٤ دقائق',
      cta: 'ابدأ الاستكشاف',
    },
    projectType: {
      badge: 'مرحلة الاستكشاف',
      subLabel: 'بنية المشروع',
      headline: 'ماذا تريد أن تبني؟',
      description:
        'اختر المنصة التي تصف مشروعك بشكل أفضل. يساعدنا ذلك على تعيين المهندسين المناسبين لاستشارتك.',
      options: {
        website: {
          label: 'موقع ويب',
          description: 'مواقع تسويقية أو معرض أعمال أو صفحات هبوط للشركات.',
        },
        'web-app': {
          label: 'تطبيق ويب',
          description: 'تطبيقات معقدة تعمل في المتصفح بوظائف ديناميكية.',
        },
        'mobile-app': {
          label: 'تطبيق جوال',
          description: 'تطبيقات أصلية أو متعددة المنصات لنظامي iOS وAndroid.',
        },
        saas: {
          label: 'منصة SaaS',
          description: 'تطبيقات ويب معقدة مع لوحات تحكم للمستخدمين والفواتير.',
        },
        ecommerce: {
          label: 'التجارة الإلكترونية',
          description: 'متاجر إلكترونية وسوق ومدفوعات متكاملة.',
        },
        other: {
          label: 'أخرى / لست متأكداً بعد',
          description: 'تحدث مع مهندسينا لتحديد نطاق مشروعك.',
        },
      },
    },
    projectBrief: {
      phaseLabel: 'مرحلة الاستكشاف',
      subLabel: 'تفاصيل المشروع',
      heading: 'أخبرنا عن مشروعك.',
      description:
        'صف أهداف مشروعك والميزات الرئيسية وأي متطلبات تقنية. كلما قدمت من تفاصيل، استطعنا التحضير بشكل أفضل لاستشارتك.',
      textareaLabel: 'ملخص المشروع',
      textareaPlaceholder:
        'أخبرنا عن أهداف مشروعك والجمهور المستهدف والميزات الرئيسية وأي متطلبات تقنية…',
      validationMessage: 'يرجى تقديم ١٠ أحرف على الأقل حتى نتمكن من فهم مشروعك.',
      characterGuidance: '١٠ أحرف كحد أدنى',
    },
    budgetTimeline: {
      phaseLabel: 'مرحلة الاستكشاف',
      heading: 'الميزانية والجدول الزمني',
      description:
        'ساعدنا على فهم نطاق ميزانيتك والجدول الزمني المرغوب حتى نتمكن من تخصيص استشارتنا وفقاً لذلك.',
      budgetLabel: 'نطاق الميزانية',
      timelineLabel: 'الجدول الزمني للمشروع',
      budgetOptions: {
        UNDER_1000_USD: { label: 'أقل من ١٬٠٠٠$' },
        USD_1000_3000: { label: '١٬٠٠٠$ – ٣٬٠٠٠$' },
        USD_3000_7500: { label: '٣٬٠٠٠$ – ٧٬٥٠٠$' },
        USD_7500_15000: { label: '٧٬٥٠٠$ – ١٥٬٠٠٠$' },
        OVER_15000_USD: { label: '١٥٬٠٠٠$+' },
        NOT_SURE: { label: 'لست متأكداً بعد' },
      },
      timelineOptions: {
        UNDER_1_MONTH: { label: 'أقل من شهر' },
        MONTHS_1_2: { label: '١ – ٢ شهر' },
        MONTHS_2_4: { label: '٢ – ٤ أشهر' },
        MONTHS_4_6: { label: '٤ – ٦ أشهر' },
        OVER_6_MONTHS: { label: '٦+ أشهر' },
        NOT_SURE: { label: 'لست متأكداً بعد' },
      },
    },
    contactInformation: {
      phaseLabel: 'مرحلة الاستكشاف',
      subLabel: 'معلومات الاتصال',
      heading: 'معلومات الاتصال',
      description: 'أخبرنا كيف نتواصل معك وأين تعمل حتى نتمكن من التحضير لاستشارتك.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'محمد أحمد',
      emailLabel: 'البريد الإلكتروني للعمل',
      emailPlaceholder: 'mohamed@company.com',
      companyLabel: 'الشركة',
      companyPlaceholder: 'شركة أكما',
      optionalFieldLabel: 'اختياري',
      nameRequiredError: 'يرجى إدخال اسمك حتى نعرف مَن نخاطب.',
      emailRequiredError: 'يرجى إدخال بريدك الإلكتروني حتى نتمكن من التواصل معك.',
      emailInvalidError: 'يرجى إدخال بريد إلكتروني صالح.',
      submittingLabel: 'جارٍ الإرسال…',
      submitError: 'تعذر حفظ ملخص الاستكشاف. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
      submitIncompleteError: 'يرجى إكمال خطوات الاستكشاف السابقة قبل المتابعة.',
    },
    booking: {
      phaseLabel: 'مرحلة الاستكشاف',
      subLabel: 'حجز الاستشارة',
      heading: 'احجز استشارتك',
      description: 'اختر الوقت المناسب لك. ستساعد تفاصيل مشروعك فريق الهندسة في التحضير للمحادثة.',
      loadingMessage: 'جارٍ تحميل تقويم الحجز…',
      widgetTitle: 'تحديد موعد استشارة',
      missingConfigTitle: 'الحجز غير متاح',
      missingConfigDescription:
        'لم يتم تكوين نظام الجدولة بعد. يرجى التواصل معنا مباشرة لترتيب استشارة.',
      loadErrorTitle: 'تعذر تحميل التقويم',
      loadErrorDescription: 'تعذر تحميل تقويم الحجز. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
      retryAction: 'حاول مرة أخرى',
      successHeading: 'تم تأكيد الحجز',
      successDescription: 'تم جدولة استشارتك بنجاح.',
      responseExpectation: 'ستتلقى رسالة تأكيد بالبريد الإلكتروني مع تفاصيل الاجتماع قريباً.',
      returnHomeAction: 'العودة إلى الصفحة الرئيسية',
    },
    actions: {
      back: 'رجوع',
      continue: 'متابعة',
      start: 'ابدأ الاستكشاف',
      returnHome: 'العودة إلى الصفحة الرئيسية',
    },
    stepCounter: (current: number, total: number) =>
      `الخطوة ${localizeDigits(current, 'ar')} من ${localizeDigits(total, 'ar')}`,
  },
};

export interface CaseStudyMetric {
  label: { en: string; ar: string };
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  tags: { en: string; ar: string }[];
  image: string;
  metrics: CaseStudyMetric[];
  challenge: { en: string; ar: string };
  solution: { en: string; ar: string };
  results: { en: string; ar: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'fintech-dashboard',
    title: {
      en: 'NovaPay — Real-Time Fintech Dashboard',
      ar: 'NovaPay — لوحة تحكم مالية في الوقت الحقيقي',
    },
    description: {
      en: 'A real-time financial analytics platform processing 2M+ transactions daily with sub-second query performance.',
      ar: 'منصة تحليلات مالية في الوقت الحقيقي تتعامل مع أكثر من 2 مليون معاملة يوميًا بأداء استعلام أقل من ثانية.',
    },
    tags: [
      { en: 'Web Application', ar: 'تطبيق ويب' },
      { en: 'React & Next.js', ar: 'React وNext.js' },
      { en: 'Real-Time Data', ar: 'بيانات في الوقت الحقيقي' },
      { en: 'FinTech', ar: 'تقنية مالية' },
    ],
    image: '/images/case-studies/novapay.svg',
    metrics: [
      { label: { en: 'Daily Transactions', ar: 'المعاملات اليومية' }, value: '2M+' },
      { label: { en: 'Query Response', ar: 'استجابة الاستعلام' }, value: '<200ms' },
      { label: { en: 'Uptime', ar: 'وقت التشغيل' }, value: '99.99%' },
      { label: { en: 'Active Users', ar: 'المستخدمون النشطون' }, value: '15K+' },
    ],
    challenge: {
      en: 'NovaPay needed to replace their legacy batch-processing system with a real-time analytics platform. Their existing solution took 45 minutes to generate reports, causing critical delays in fraud detection and regulatory compliance. The new system had to handle peak loads during market hours without degradation.',
      ar: 'احتاجت NovaPay إلى استبدال نظام المعالجة الدفعية القديم بمنصة تحليلات في الوقت الحقيقي. كان الحل الحالي يستغرق 45 دقيقة لإنشاء التقارير، مما تسبب في تأخيرات حرجة في اكتشاف الاحتيال والامتثال التنظيمي. كان يجب على النظام الجديد التعامل مع الأحمال الذروة خلال ساعات السوق دون تدهور.',
    },
    solution: {
      en: 'We engineered a streaming architecture using Apache Kafka for event ingestion and ClickHouse for analytical queries. The frontend was built with Next.js and Recharts, featuring customizable dashboards with drag-and-drop widgets. A CQRS pattern separated read and write paths, ensuring query performance stayed under 200ms even at peak load. WebSocket connections push live updates to all connected clients instantly.',
      ar: 'هندسنا بنية تدفق باستخدام Apache Kafka لاستيعاب الأحداث وClickHouse للاستعلامات التحليلية. تم بناء الواجهة الأمامية باستخدام Next.js وRecharts، مع لوحات تحكم قابلة للتخصيص وعناصر واجهة يمكن سحبها وإفلاتها. فصل نمط CQRS مسارات القراءة والكتابة، مما ضمن بقاء أداء الاستعلامات تحت 200 مللي ثانية حتى في ذروة الحمل. تدفع اتصالات WebSocket التحديثات المباشرة لجميع العملاء المتصلين فورًا.',
    },
    results: {
      en: 'Report generation dropped from 45 minutes to real-time. Fraud detection alerts now trigger within 3 seconds of suspicious activity. The platform handles 10x the original transaction volume with zero degradation. NovaPay achieved full regulatory compliance and reduced operational costs by 40%.',
      ar: 'انخفض إنشاء التقارير من 45 دقيقة إلى الوقت الحقيقي. تنطلق تنبيهات اكتشاف الاحتيال الآن خلال 3 ثوانٍ من النشاط المشبوه. تتعامل المنصة مع 10 أضعاف حجم المعاملات الأصلي دون أي تدهور. حققت NovaPay الامتثال التنظيمي الكامل وخفضت التكاليف التشغيلية بنسبة 40%.',
    },
  },
  {
    slug: 'healthcare-mobile',
    title: {
      en: 'MediTrack — Patient Management Mobile App',
      ar: 'MediTrack — تطبيق إدارة المرضى للهواتف',
    },
    description: {
      en: 'A cross-platform mobile app streamlining patient intake, appointment scheduling, and clinical documentation for 200+ clinics.',
      ar: 'تطبيق هاتف متعدد المنصات يبسّط عملية استقبال المرضى وجدولة المواعيد والتوثيق السريري لأكثر من 200 عيادة.',
    },
    tags: [
      { en: 'Mobile Application', ar: 'تطبيق هاتف' },
      { en: 'React Native', ar: 'React Native' },
      { en: 'Healthcare', ar: 'رعاية صحية' },
      { en: 'HIPAA Compliant', ar: 'متوافق مع HIPAA' },
    ],
    image: '/images/case-studies/meditrack.svg',
    metrics: [
      { label: { en: 'Clinics Served', ar: 'العيادات المخدومة' }, value: '200+' },
      { label: { en: 'Patient Intake Time', ar: 'وقت استقبال المريض' }, value: '-65%' },
      { label: { en: 'App Store Rating', ar: 'تقييم متجر التطبيقات' }, value: '4.8★' },
      { label: { en: 'No-Show Reduction', ar: 'خفض عدم الحضور' }, value: '42%' },
    ],
    challenge: {
      en: 'Healthcare clinics were drowning in paper-based intake forms and fragmented scheduling systems. Patient no-show rates exceeded 30%, costing clinics thousands monthly. The existing solutions were either too complex for staff adoption or too basic for clinical needs. HIPAA compliance added another layer of complexity.',
      ar: 'كانت العيادات تغرق في نماذج الاستقبال الورقية وأنظمة الجدولة المجزأة. تجاوزت معدلات عدم حضور المرضى 30%، مما كلف العيادات الآلاف شهريًا. كانت الحلول الحالية إما معقدة أكثر من اللازم ليعتمدها الموظفون أو أساسية جدًا للاحتياجات السريرية. أضاف الامتثال لـ HIPAA طبقة أخرى من التعقيد.',
    },
    solution: {
      en: 'We built a React Native app with offline-first architecture, ensuring clinic staff could work without internet connectivity. The intake flow uses smart form validation with conditional logic, reducing average completion time from 12 minutes to 4. An AI-powered no-show prediction model flags high-risk appointments, enabling automated SMS reminders. All data is encrypted at rest and in transit with HIPAA-compliant audit logging.',
      ar: 'بنينا تطبيق React Native ببنية تعمل بدون اتصال بالإنترنت أولاً، مما يضمن عمل موظفي العيادة بدون اتصال. يستخدم تدفق الاستقبال نماذج ذكية مع منطق شرطي، مما يقلل متوسط وقت الإكمال من 12 دقيقة إلى 4. نموذج تنبؤ عدم الحضور المدعوم بالذكاء الاصطناعي يحدد المواعيد عالية المخاطر، مما يتيح تذكيرات SMS آلية. جميع البيانات مشفرة مع تسجيل تدقيق متوافق مع HIPAA.',
    },
    results: {
      en: 'Patient intake time dropped by 65%. No-show rates decreased by 42% through predictive reminders. Staff adoption reached 94% within the first month. The app handles 50,000+ monthly active users across 200 clinics with 99.8% uptime.',
      ar: 'انخفض وقت استقبال المرضى بنسبة 65%. انخفضت معدلات عدم الحضور بنسبة 42% من خلال التذكيرات التنبؤية. وصل تبني الموظفين إلى 94% خلال الشهر الأول. يتعامل التطبيق مع أكثر من 50,000 مستخدم نشط شهريًا عبر 200 عيادة بأوقات تشغيل 99.8%.',
    },
  },
  {
    slug: 'ecommerce-platform',
    title: {
      en: 'ShopVelocity — Scalable E-Commerce Platform',
      ar: 'ShopVelocity — منصة تجارة إلكترونية قابلة للتوسع',
    },
    description: {
      en: 'A headless e-commerce platform handling 100K+ concurrent users during flash sales with zero downtime.',
      ar: 'منصة تجارة إلكترونية بدون واجهة تتعامل مع أكثر من 100,000 مستخدم متزامن خلال المبيعات السريعة بدون وقت توقف.',
    },
    tags: [
      { en: 'Web Application', ar: 'تطبيق ويب' },
      { en: 'Cloud Architecture', ar: 'بنية سحابية' },
      { en: 'E-Commerce', ar: 'تجارة إلكترونية' },
      { en: 'Microservices', ar: 'الخدمات المصغرة' },
    ],
    image: '/images/case-studies/shopvelocity.svg',
    metrics: [
      { label: { en: 'Peak Concurrent Users', ar: 'ذروة المستخدمين المتزامنين' }, value: '100K+' },
      { label: { en: 'Page Load Time', ar: 'وقت تحميل الصفحة' }, value: '1.2s' },
      { label: { en: 'Revenue Increase', ar: 'زيادة الإيرادات' }, value: '+180%' },
      { label: { en: 'Infrastructure Cost', ar: 'تكلفة البنية التحتية' }, value: '-35%' },
    ],
    challenge: {
      en: 'An existing monolithic e-commerce platform buckled under flash sale traffic, causing cascading failures across checkout, inventory, and payment systems. The monolith could not scale individual services independently, leading to over-provisioning and 60% infrastructure waste. Migration needed to happen without any downtime during peak selling season.',
      ar: 'انهارت منصة تجارة إلكترونية متجانسة قائمة تحت حركة المبيعات السريعة، مما تسبب في إخفاقات متسلسلة عبر أنظمة الدفع والمخزون والمدفوعات. لم تكن المنصة قادرة على توسيع الخدمات بشكل مستقل، مما أدى إلى التوفر الزائد وضياع 60% من البنية التحتية. كان يجب أن يحدث الانتقال بدون أي توقف خلال موسم البيع الذروة.',
    },
    solution: {
      en: 'We decomposed the monolith into domain-driven microservices: Catalog, Cart, Order, Payment, and Inventory — each independently deployable. A Strangler Fig pattern enabled incremental migration with feature flags routing traffic between old and new services. AWS ECS with Fargate provided auto-scaling, while CloudFront and Redis caching reduced origin load by 80%. A custom inventory reservation system prevented overselling during flash sales using distributed locking.',
      ar: 'فككنا المنصة المتجانسة إلى خدمات مصغرة موجهة بالمجال: الكتالوج والسلة والطلب والدفع والمخزون — كل منها قابل للنشر بشكل مستقل. مكّن نمط Strangler Fig الانتقال التدريجي مع أعلام الميزات التي توجه الحركة بين الخدمات القديمة والجديدة. وفر AWS ECS مع Fargate التوسيع التلقائي، بينما خفض التخزين المؤقت CloudFront وRedis حمل المصدر بنسبة 80%. نظام حجز المخزون المخصص منع البيع الزائد خلال المبيعات السريعة باستخدام القفل الموزع.',
    },
    results: {
      en: 'The platform now handles 100K+ concurrent users with zero downtime during flash sales. Page load time dropped to 1.2 seconds globally. Infrastructure costs decreased by 35% while supporting 3x the traffic. Revenue increased 180% year-over-year as the platform scaled to new markets.',
      ar: 'تتعامل المنصة الآن مع أكثر من 100,000 مستخدم متزامن بدون وقت توقف خلال المبيعات السريعة. انخفض وقت تحميل الصفحة إلى 1.2 ثانية عالميًا. انخفضت تكاليف البنية التحتية بنسبة 35% مع دعم 3 أضعاف الحركة. زادت الإيرادات بنسبة 180% سنويًا مع توسع المنصة في أسواق جديدة.',
    },
  },
  {
    slug: 'ai-recommendation-engine',
    title: {
      en: 'ContentAI — Personalization Recommendation Engine',
      ar: 'ContentAI — محرك التوصيات التخصيصي',
    },
    description: {
      en: 'An ML-powered recommendation engine increasing user engagement by 3x for a digital media platform.',
      ar: 'محرك توصيات مدعوم بالتعلم الآلي زاد التفاعل مع المستخدمين 3 مرات لمنصة إعلام رقمي.',
    },
    tags: [
      { en: 'AI & Machine Learning', ar: 'ذكاء اصطناعي وتعلم آلي' },
      { en: 'Python & FastAPI', ar: 'Python وFastAPI' },
      { en: 'Content Platform', ar: 'منصة محتوى' },
      { en: 'Real-Time Inference', ar: 'استدلال في الوقت الحقيقي' },
    ],
    image: '/images/case-studies/contentai.svg',
    metrics: [
      { label: { en: 'Engagement Lift', ar: 'زيادة التفاعل' }, value: '3x' },
      { label: { en: 'Recommendation Accuracy', ar: 'دقة التوصيات' }, value: '94%' },
      { label: { en: 'Inference Latency', ar: 'زمن الاستدلال' }, value: '<50ms' },
      { label: { en: 'Content Items Indexed', ar: 'عناصر المحتوى المفهرسة' }, value: '5M+' },
    ],
    challenge: {
      en: 'A digital media platform with 2M+ daily users relied on editorial curation for content recommendations, resulting in filter bubbles and stagnant engagement. Their existing collaborative filtering approach cold-started poorly for new users and new content. The system needed to deliver personalized recommendations in under 50ms while handling 50K+ requests per second.',
      ar: 'اعتمدت منصة إعلام رقمية مع أكثر من 2 مليون مستخدم يومي على التنظيم التحريري للتوصية بالمحتوى، مما أدى إلى فقاعات فلترة وتفاعل متراجع. كان نهج التصفية التعاونية الحالي يبدأ بشكل سيء للمستخدمين الجدد والمحتوى الجديد. كان يجب على النظام تقديم توصيات مخصصة في أقل من 50 مللي ثانية مع التعامل مع أكثر من 50,000 طلب في الثانية.',
    },
    solution: {
      en: 'We built a hybrid recommendation engine combining collaborative filtering, content-based similarity, and a transformer-based sequence model for session-level personalization. The ML pipeline runs on Kubernetes with GPU-accelerated inference. A feature store precomputes user and item embeddings, enabling sub-50ms serving. A/B testing infrastructure runs continuous experiments to optimize ranking algorithms. Cold-start problem solved via content embeddings and demographic priors.',
      ar: 'بنينا محرك توصيات هجين يجمع بين التصفية التعاونية والتشابه المبني على المحتوى ونموذج التسلسل المبني على المحول للتخصيص على مستوى الجلسة. يسير خط أنابيب التعلم الآلي على Kubernetes مع استدلال مسرّع بـ GPU. يخزن مخزن الميزات تضمينات المستخدمين والعناصر مسبقاً، مما يتيح خدمة أقل من 50 مللي ثانية. تشغّل بنية اختبار A/B تجارب مستمرة لتحسين خوارزميات الترتيب. تم حل مشكلة البداية الباردة عبر تضمينات المحتوى والأولويات الديموغرافية.',
    },
    results: {
      en: 'User engagement increased 3x within 3 months of deployment. Content discovery rate improved by 156%, exposing users to more diverse content. Average session duration increased by 2.4 minutes. The engine processes 50K+ recommendations per second with 94% relevance accuracy.',
      ar: 'زاد تفاعل المستخدمين 3 مرات خلال 3 أشهر من النشر. تحسّن معدل اكتشاف المحتوى بنسبة 156%، مما عرّض المستخدمين لمحتوى أكثر تنوعًا. زاد متوسط مدة الجلسة بـ 2.4 دقيقة. يعالج المحرك أكثر من 50,000 توصية في الثانية بدقة صلة 94%.',
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}

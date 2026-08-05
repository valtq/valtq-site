import type { LegalDocument } from './types';

/**
 * Privacy Policy.
 *
 * Written conservatively from observable product behavior only: the contact
 * form fields, Discovery flow, Cal.com booking, WhatsApp link, localStorage
 * theme/discovery keys, and the confirmed absence of cookies and analytics.
 * Items that cannot be verified from the codebase (retention periods, exact
 * server logs, transfer jurisdictions, a legal contact office) are either
 * stated generically or flagged for legal review.
 */
export const privacyDocument: LegalDocument = {
  slug: 'privacy',
  effectiveDate: '2026-08-03',
  updatedDate: '2026-08-03',
  content: {
    en: {
      title: 'Privacy Policy',
      description:
        'How the ValtQ website collects, uses, and protects personal information.',
      intro:
        'This Privacy Policy explains how the ValtQ website collects, uses, and protects personal information when you visit our website or contact us. It applies to information collected through this website.',
      sections: [
        {
          id: 'introduction',
          heading: '1. Introduction',
          blocks: [
            {
              type: 'p',
              text: 'ValtQ is a software development company. This policy describes our practices for personal information in connection with this website, including the contact form and the Discovery wizard.',
            },
            {
              type: 'p',
              text: '"Personal information" means information that relates to an identified or identifiable individual.',
            },
          ],
        },
        {
          id: 'information-you-provide',
          heading: '2. Information You Provide',
          blocks: [
            {
              type: 'p',
              text: 'You may provide personal information when you interact with this website, for example when you submit the contact form or complete the Discovery wizard. The types of information we may ask you to provide include:',
            },
            {
              type: 'ul',
              items: [
                'Contact details, such as your name, email address, company, and phone number.',
                'Information about your project, such as its type, description, budget, timeline, and features.',
                'Information about your communication preferences, such as your preferred channel.',
              ],
            },
          ],
        },
        {
          id: 'automatically-collected',
          heading: '3. Information Collected Automatically',
          blocks: [
            {
              type: 'p',
              text: 'When you visit the website, the infrastructure that hosts it may automatically record standard technical details, such as your IP address, browser type, and the pages you visit.',
            },
            {
              type: 'p',
              text: 'This website stores a small amount of information in your browser to remember your preferences and your progress through the Discovery wizard. This is described in more detail in our Cookie Policy. We do not use analytics or advertising scripts on this website.',
            },
          ],
        },
        {
          id: 'contact-form',
          heading: '4. Contact Form Submissions',
          blocks: [
            {
              type: 'p',
              text: 'The contact form collects the information you enter so we can understand and respond to your inquiry: name, email address, company, phone number, preferred communication channel, service area, product stage, product URL, timing, budget, a short summary, and your message.',
            },
            {
              type: 'p',
              text: 'Submitting the form does not create a client engagement. Any professional services would be provided under a separate written agreement.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'At the time this policy was last updated, contact form submissions are processed in your browser and are not transmitted to a server. If a submission channel becomes available, your information will be used to respond to your inquiry and this policy will be updated.',
            },
          ],
        },
        {
          id: 'discovery-flow',
          heading: '5. Discovery Flow Submissions',
          blocks: [
            {
              type: 'p',
              text: 'The Discovery wizard asks for information about your project (type, description, budget, timeline, and features) and, at the final step, your contact details (name, email address, and company).',
            },
            {
              type: 'p',
              text: 'As you progress through the wizard, your answers are saved in your browser so you can resume where you left off. When you submit, the information is sent to our API, where it is used to evaluate and respond to your inquiry, and we may contact you using the details you provided.',
            },
            {
              type: 'p',
              text: 'Submitting the Discovery wizard does not create a client engagement.',
            },
          ],
        },
        {
          id: 'booking-cal',
          heading: '6. Booking Information and Cal.com',
          blocks: [
            {
              type: 'p',
              text: 'After completing the Discovery wizard, you may be invited to book a call. This booking is provided by Cal.com, a third-party scheduling service.',
            },
            {
              type: 'p',
              text: 'When you book through Cal.com, the information you provide on that service is processed by Cal.com under its own privacy policy. We may receive booking details, and a confirmation email may be sent to you as part of the booking process.',
            },
          ],
        },
        {
          id: 'whatsapp',
          heading: '7. WhatsApp and External Communication',
          blocks: [
            {
              type: 'p',
              text: 'The website links to WhatsApp for direct communication. When you contact us through WhatsApp, your messages are handled by WhatsApp under its terms and privacy policy.',
            },
            {
              type: 'p',
              text: 'Information you share through WhatsApp, such as your name and message content, is used to respond to your communication.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'We do not currently publish a direct email address or physical office address on this website. You can reach us through the contact form, WhatsApp, or our public social channels.',
            },
          ],
        },
        {
          id: 'how-we-use',
          heading: '8. How We Use Your Information',
          blocks: [
            {
              type: 'p',
              text: 'We use personal information only for the purposes described in this policy, including:',
            },
            {
              type: 'ul',
              items: [
                'To respond to your inquiries and evaluate potential projects.',
                'To operate and improve the website and its features.',
                'To schedule and manage calls booked through Cal.com.',
                'To comply with legal obligations and protect our rights.',
              ],
            },
          ],
        },
        {
          id: 'legal-operational',
          heading: '9. Legal and Operational Reasons',
          blocks: [
            {
              type: 'p',
              text: 'We may use or disclose personal information where reasonably necessary to:',
            },
            {
              type: 'ul',
              items: [
                'Comply with applicable laws and regulations.',
                'Respond to lawful requests from authorities.',
                'Protect the security and integrity of the website.',
                'Enforce our Terms of Service.',
              ],
            },
          ],
        },
        {
          id: 'service-providers',
          heading: '10. Service Providers and Third-Party Platforms',
          blocks: [
            {
              type: 'p',
              text: 'We may use service providers to operate the website, including hosting infrastructure and notification services. These providers may process personal information on our behalf and are expected to protect it appropriately.',
            },
            {
              type: 'p',
              text: 'Third-party platforms we integrate with, such as Cal.com and WhatsApp, process information under their own policies.',
            },
          ],
        },
        {
          id: 'cookies-browser-storage',
          heading: '11. Cookies and Browser Storage',
          blocks: [
            {
              type: 'p',
              text: 'This website does not use cookies for advertising or analytics. It stores a small amount of information in your browser using localStorage to remember your theme preference and to autosave your Discovery progress.',
            },
            {
              type: 'p',
              text: 'Because this storage is limited and functional, the website currently does not display a cookie-consent banner. Our Cookie Policy lists exactly what is stored.',
            },
          ],
        },
        {
          id: 'data-retention',
          heading: '12. Data Retention',
          blocks: [
            {
              type: 'p',
              text: 'We do not currently define fixed retention periods for the information collected through this website. We retain information only for as long as necessary to fulfil the purposes described in this policy and to comply with legal or operational requirements.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'This policy does not specify retention periods because none are currently defined. Retention periods should be reviewed and documented with legal counsel.',
            },
          ],
        },
        {
          id: 'data-security',
          heading: '13. Data Security',
          blocks: [
            {
              type: 'p',
              text: 'We apply reasonable technical and organizational measures designed to protect personal information against unauthorized access, loss, or alteration.',
            },
            {
              type: 'p',
              text: 'No method of transmission or storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.',
            },
          ],
        },
        {
          id: 'international-processing',
          heading: '14. International Data Processing',
          blocks: [
            {
              type: 'p',
              text: 'The website and its supporting services may process information in jurisdictions where we or our service providers operate.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'No specific jurisdictions are identified in this policy. The international processing section must be reviewed by legal counsel to describe your data-protection obligations accurately.',
            },
          ],
        },
        {
          id: 'your-rights',
          heading: '15. Your Choices and Rights',
          blocks: [
            {
              type: 'p',
              text: 'Depending on your jurisdiction, you may have rights regarding your personal information, including the right to access, correct, delete, restrict, or object to its processing, and to data portability.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'Your rights, and how to exercise them, depend on the laws of your jurisdiction. We will handle requests in accordance with applicable law.',
            },
            {
              type: 'p',
              text: 'To make a request, contact us using the channels described in the Contact section below.',
            },
          ],
        },
        {
          id: 'children',
          heading: "16. Children's Information",
          blocks: [
            {
              type: 'p',
              text: 'This website and our services are directed at businesses and professionals. They are not intended for children, and we do not knowingly collect personal information from children.',
            },
            {
              type: 'p',
              text: 'If we learn that we have collected personal information from a child, we will take reasonable steps to delete it.',
            },
          ],
        },
        {
          id: 'external-links',
          heading: '17. External Links',
          blocks: [
            {
              type: 'p',
              text: 'The website may contain links to external sites and services, including social media and third-party platforms. We are not responsible for the privacy practices of those sites, and we encourage you to review their policies.',
            },
          ],
        },
        {
          id: 'changes-to-policy',
          heading: '18. Changes to This Policy',
          blocks: [
            {
              type: 'p',
              text: 'We may update this Privacy Policy from time to time. The current version will always be available on this page, and the "Last updated" date will reflect the most recent revision.',
            },
            {
              type: 'p',
              text: 'We encourage you to review this page periodically.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '19. Contact',
          blocks: [
            {
              type: 'p',
              text: 'If you have questions about this Privacy Policy or how your information is handled, you can reach us through the contact form on this website, WhatsApp, or our public social channels.',
            },
            {
              type: 'p',
              text: 'We do not currently publish a direct email address or physical office address on this website.',
            },
          ],
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      description: 'كيف يجمع موقع ValtQ المعلومات الشخصية ويستخدمها ويحميها.',
      intro:
        'توضح سياسة الخصوصية هذه كيف يجمع موقع ValtQ المعلومات الشخصية ويستخدمها ويحميها عندما تزور موقعنا أو تتواصل معنا. تنطبق على المعلومات المجمعة من خلال هذا الموقع.',
      sections: [
        {
          id: 'introduction',
          heading: '1. مقدمة',
          blocks: [
            {
              type: 'p',
              text: 'ValtQ هي شركة تطوير برمجيات. تصف هذه السياسة ممارساتنا المتعلقة بالمعلومات الشخصية المرتبطة بهذا الموقع، بما في ذلك نموذج التواصل وأداة الاكتشاف.',
            },
            {
              type: 'p',
              text: 'يقصد بـ"المعلومات الشخصية" المعلومات المتعلقة بفرد معيّن أو قابل للتحديد.',
            },
          ],
        },
        {
          id: 'information-you-provide',
          heading: '2. المعلومات التي تقدمها',
          blocks: [
            {
              type: 'p',
              text: 'قد تقدم معلومات شخصية عند تفاعلك مع هذا الموقع، على سبيل المثال عند إرسال نموذج التواصل أو إكمال أداة الاكتشاف. تشمل أنواع المعلومات التي قد نطلبها منك ما يلي:',
            },
            {
              type: 'ul',
              items: [
                'بيانات الاتصال، مثل الاسم والبريد الإلكتروني والشركة ورقم الهاتف.',
                'معلومات عن مشروعك، مثل نوعه ووصفه وميزانيته والجدول الزمني والميزات.',
                'معلومات حول تفضيلات التواصل، مثل القناة المفضلة لديك.',
              ],
            },
          ],
        },
        {
          id: 'automatically-collected',
          heading: '3. المعلومات المجمعة تلقائيًا',
          blocks: [
            {
              type: 'p',
              text: 'عند زيارتك للموقع، قد تسجّل البنية التحتية التي تستضيفه تلقائيًا تفاصيل تقنية قياسية، مثل عنوان IP ونوع المتصفح والصفحات التي تزورها.',
            },
            {
              type: 'p',
              text: 'يخزن هذا الموقع كمية صغيرة من المعلومات في متصفحك لتذكر تفضيلاتك وتقدمك في أداة الاكتشاف. هذا موصوف بمزيد من التفصيل في سياسة ملفات تعريف الارتباط لدينا. لا نستخدم نصوصًا برمجية للتحليلات أو الإعلانات في هذا الموقع.',
            },
          ],
        },
        {
          id: 'contact-form',
          heading: '4. إرسال نموذج التواصل',
          blocks: [
            {
              type: 'p',
              text: 'يجمع نموذج التواصل المعلومات التي تدخلها لنتمكن من فهم استفسارك والرد عليه: الاسم والبريد الإلكتروني والشركة ورقم الهاتف وقناة التواصل المفضلة ومجال الخدمة ومرحلة المنتج ورابط المنتج والتوقيت والميزانية وملخص قصير ورسالتك.',
            },
            {
              type: 'p',
              text: 'لا يؤدي إرسال النموذج إلى إنشاء علاقة تعاقدية مع العميل. أي خدمات مهنية ستُقدم بموجب اتفاقية مكتوبة منفصلة.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'في وقت آخر تحديث لهذه السياسة، تتم معالجة إرسالات نموذج التواصل في متصفحك فقط ولا تُرسل إلى أي خادم. إذا أصبحت قناة إرسال متاحة، فستُستخدم معلوماتك للرد على استفسارك وستُحدث هذه السياسة.',
            },
          ],
        },
        {
          id: 'discovery-flow',
          heading: '5. إرسال أداة الاكتشاف',
          blocks: [
            {
              type: 'p',
              text: 'تطلب أداة الاكتشاف معلومات عن مشروعك (النوع والوصف والميزانية والجدول الزمني والميزات) وفي الخطوة الأخيرة بيانات التواصل الخاصة بك (الاسم والبريد الإلكتروني والشركة).',
            },
            {
              type: 'p',
              text: 'أثناء تقدمك في الأداة، تُحفظ إجاباتك في متصفحك لتتمكن من الاستكمال من حيث توقفت. عند الإرسال، تُرسل المعلومات إلى واجهة برمجية خاصة بنا (API) حيث تُستخدم لتقييم استفسارك والرد عليه، وقد نتواصل معك باستخدام البيانات التي قدمتها.',
            },
            {
              type: 'p',
              text: 'إرسال أداة الاكتشاف لا يُنشئ علاقة تعاقدية مع العميل.',
            },
          ],
        },
        {
          id: 'booking-cal',
          heading: '6. معلومات الحجز و Cal.com',
          blocks: [
            {
              type: 'p',
              text: 'بعد إكمال أداة الاكتشاف، قد تتم دعوتك لحجز مكالمة. هذا الحجز تقدمه خدمة Cal.com، وهي خدمة جدولة من طرف ثالث.',
            },
            {
              type: 'p',
              text: 'عند الحجز عبر Cal.com، تتم معالجة المعلومات التي تقدمها في تلك الخدمة بواسطة Cal.com وفق سياسة الخصوصية الخاصة بها. قد نستلم تفاصيل الحجز، وقد يُرسل إليك بريد إلكتروني للتأكيد كجزء من عملية الحجز.',
            },
          ],
        },
        {
          id: 'whatsapp',
          heading: '7. واتساب والتواصل الخارجي',
          blocks: [
            {
              type: 'p',
              text: 'يربط الموقع بخدمة واتساب للتواصل المباشر. عند تواصلك معنا عبر واتساب، تتعامل واتساب مع رسائلك وفق شروطها وسياسة الخصوصية الخاصة بها.',
            },
            {
              type: 'p',
              text: 'تُستخدم المعلومات التي تشاركها عبر واتساب، مثل اسمك ومحتوى الرسالة، للرد على تواصلك.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'لا ننشر حاليًا بريدًا إلكترونيًا مباشرًا أو عنوان مكتب فعلي في هذا الموقع. يمكنك الوصول إلينا عبر نموذج التواصل أو واتساب أو قنوات التواصل الاجتماعي العامة.',
            },
          ],
        },
        {
          id: 'how-we-use',
          heading: '8. كيف نستخدم معلوماتك',
          blocks: [
            {
              type: 'p',
              text: 'نستخدم المعلومات الشخصية للأغراض الموضحة في هذه السياسة فقط، بما في ذلك:',
            },
            {
              type: 'ul',
              items: [
                'الرد على استفساراتك وتقييم المشاريع المحتملة.',
                'تشغيل الموقع وتحسينه وميزاته.',
                'جدولة وإدارة المكالمات المحجوزة عبر Cal.com.',
                'الامتثال للالتزامات القانونية وحماية حقوقنا.',
              ],
            },
          ],
        },
        {
          id: 'legal-operational',
          heading: '9. الأسباب القانونية والتشغيلية',
          blocks: [
            {
              type: 'p',
              text: 'قد نستخدم المعلومات الشخصية أو نكشف عنها عند الحاجة المعقولة إلى:',
            },
            {
              type: 'ul',
              items: [
                'الامتثال للقوانين واللوائح السارية.',
                'الاستجابة للطلبات القانونية من السلطات.',
                'حماية أمن الموقع وسلامته.',
                'إنفاذ شروط الخدمة لدينا.',
              ],
            },
          ],
        },
        {
          id: 'service-providers',
          heading: '10. مقدمو الخدمات والمنصات الخارجية',
          blocks: [
            {
              type: 'p',
              text: 'قد نستخدم مقدمي خدمات لتشغيل الموقع، بما في ذلك البنية التحتية للاستضافة وخدمات الإشعارات. قد يعالج هؤلاء المزودون المعلومات الشخصية نيابة عنا ويُتوقع منهم حمايتها بشكل مناسب.',
            },
            {
              type: 'p',
              text: 'تعالج المنصات الخارجية التي نتكامل معها، مثل Cal.com وواتساب، المعلومات وفق سياساتها الخاصة.',
            },
          ],
        },
        {
          id: 'cookies-browser-storage',
          heading: '11. ملفات تعريف الارتباط والتخزين في المتصفح',
          blocks: [
            {
              type: 'p',
              text: 'لا يستخدم هذا الموقع ملفات تعريف الارتباط لأغراض الإعلان أو التحليلات. يخزن كمية صغيرة من المعلومات في متصفحك باستخدام التخزين المحلي (localStorage) لتذكر تفضيل المظهر وحفظ تقدمك في أداة الاكتشاف.',
            },
            {
              type: 'p',
              text: 'ونظرًا لأن هذا التخزين محدود ووظيفي، لا يعرض الموقع حاليًا لافتة موافقة على ملفات تعريف الارتباط. تسرد سياسة ملفات تعريف الارتباط لدينا بالضبط ما يتم تخزينه.',
            },
          ],
        },
        {
          id: 'data-retention',
          heading: '12. الاحتفاظ بالبيانات',
          blocks: [
            {
              type: 'p',
              text: 'لا نحدد حاليًا فترات احتفاظ ثابتة للمعلومات المجمعة من خلال هذا الموقع. نحتفظ بالمعلومات فقط للمدة اللازمة لتحقيق الأغراض الموضحة في هذه السياسة والامتثال للمتطلبات القانونية أو التشغيلية.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'لا تحدد هذه السياسة فترات احتفاظ لأنها غير محددة حاليًا. يجب مراجعة فترات الاحتفاظ وتوثيقها مع مستشار قانوني.',
            },
          ],
        },
        {
          id: 'data-security',
          heading: '13. أمن البيانات',
          blocks: [
            {
              type: 'p',
              text: 'نطبق تدابير تقنية وتنظيمية معقولة مصممة لحماية المعلومات الشخصية من الوصول غير المصرح به أو الفقدان أو التعديل.',
            },
            {
              type: 'p',
              text: 'لا توجد طريقة نقل أو تخزين آمنة تمامًا. بينما نعمل على حماية معلوماتك، لا يمكننا ضمان أمن مطلق.',
            },
          ],
        },
        {
          id: 'international-processing',
          heading: '14. المعالجة الدولية للبيانات',
          blocks: [
            {
              type: 'p',
              text: 'قد يعالج الموقع والخدمات الداعمة له المعلومات في نطاقات اختصاص نعمل فيها نحن أو مقدمو خدماتنا.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'لم تُحدد نطاقات اختصاص محددة في هذه السياسة. يجب مراجعة هذا البند من قبل مستشار قانوني لوصف التزاماتك المتعلقة بحماية البيانات بدقة.',
            },
          ],
        },
        {
          id: 'your-rights',
          heading: '15. خياراتك وحقوقك',
          blocks: [
            {
              type: 'p',
              text: 'تبعًا لنطاق اختصاصك، قد يكون لديك حقوق تتعلق بمعلوماتك الشخصية، بما في ذلك حق الوصول إليها أو تصحيحها أو حذفها أو تقييد معالجتها أو الاعتراض عليها، وحق نقل البيانات.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'تعتمد حقوقك وطريقة ممارستها على قوانين نطاق اختصاصك. سنتعامل مع الطلبات وفقًا للقانون المعمول به.',
            },
            {
              type: 'p',
              text: 'لتقديم طلب، تواصل معنا عبر القنوات الموضحة في قسم التواصل أدناه.',
            },
          ],
        },
        {
          id: 'children',
          heading: '16. معلومات الأطفال',
          blocks: [
            {
              type: 'p',
              text: 'هذا الموقع وخدماتنا موجهة للشركات والمهنيين. ليست مخصصة للأطفال، ولا نجمع المعلومات الشخصية من الأطفال عن قصد.',
            },
            {
              type: 'p',
              text: 'إذا علمنا أننا جمعنا معلومات شخصية من طفل، فسنتخذ خطوات معقولة لحذفها.',
            },
          ],
        },
        {
          id: 'external-links',
          heading: '17. الروابط الخارجية',
          blocks: [
            {
              type: 'p',
              text: 'قد يحتوي الموقع على روابط لمواقع وخدمات خارجية، بما في ذلك وسائل التواصل الاجتماعي ومنصات الأطراف الثالثة. لسنا مسؤولين عن ممارسات الخصوصية في تلك المواقع، ونشجعك على مراجعة سياساتها.',
            },
          ],
        },
        {
          id: 'changes-to-policy',
          heading: '18. التغييرات على هذه السياسة',
          blocks: [
            {
              type: 'p',
              text: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. ستتوفر النسخة الحالية دائمًا في هذه الصفحة، وسيعكس تاريخ "آخر تحديث" أحدث مراجعة.',
            },
            {
              type: 'p',
              text: 'نشجعك على مراجعة هذه الصفحة بشكل دوري.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '19. التواصل',
          blocks: [
            {
              type: 'p',
              text: 'إذا كانت لديك أسئلة حول سياسة الخصوصية هذه أو طريقة التعامل مع معلوماتك، يمكنك الوصول إلينا عبر نموذج التواصل في هذا الموقع أو واتساب أو قنوات التواصل الاجتماعي العامة.',
            },
            {
              type: 'p',
              text: 'لا ننشر حاليًا بريدًا إلكترونيًا مباشرًا أو عنوان مكتب فعلي في هذا الموقع.',
            },
          ],
        },
      ],
    },
  },
};

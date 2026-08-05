import type { LegalDocument } from './types';

/**
 * Cookie Policy.
 *
 * Reflects the confirmed storage inventory: exactly two localStorage keys
 * (`valtq-theme`, `valtq-discovery-v1`), no cookies, no analytics, no
 * advertising, no consent banner. Cal.com is a third-party embed and is
 * intentionally described generically (no specific cookie names are assumed).
 */
export const cookiesDocument: LegalDocument = {
  slug: 'cookies',
  effectiveDate: '2026-08-03',
  updatedDate: '2026-08-03',
  content: {
    en: {
      title: 'Cookie Policy',
      description:
        'How the ValtQ website uses cookies and similar browser technologies.',
      intro:
        'This Cookie Policy explains how the ValtQ website uses cookies and similar browser technologies, what is stored on your device when you visit, and how you can manage it.',
      sections: [
        {
          id: 'what-are-cookies',
          heading: '1. What Are Cookies and Similar Technologies',
          blocks: [
            {
              type: 'p',
              text: 'Cookies are small text files that a website stores on your device through your browser. Similar technologies include browser storage mechanisms such as localStorage, which perform comparable functions.',
            },
            {
              type: 'p',
              text: 'This policy describes the technologies this website uses, and how you can manage them.',
            },
          ],
        },
        {
          id: 'technologies-we-use',
          heading: '2. Technologies We Use',
          blocks: [
            {
              type: 'p',
              text: 'This website does not use cookies and does not load any third-party tracking scripts. It uses the browser storage mechanism called localStorage for a small number of functional purposes.',
            },
            {
              type: 'p',
              text: 'localStorage works similarly to cookies in that it stores small text data in your browser, but it is managed differently: it is not sent to a server with every request, and it persists until the website or your browser removes it.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'The localStorage entries described below are not cookies. They stay in your browser and are cleared when the website removes them or when you clear your browser\u2019s site data for this website.',
            },
          ],
        },
        {
          id: 'necessary-storage',
          heading: '3. Strictly Necessary Browser Storage',
          blocks: [
            {
              type: 'p',
              text: 'The website does not use any strictly necessary cookies. Its pages render and function without any browser storage being present.',
            },
            {
              type: 'p',
              text: 'The localStorage entries described below support features you choose to use; none of them is used to track you.',
            },
          ],
        },
        {
          id: 'preference-storage',
          heading: '4. Preference Storage',
          blocks: [
            {
              type: 'p',
              text: 'We store your theme preference (light or dark) under the key valtq-theme so the website can display the look you selected and avoid a flash of the wrong theme when you return.',
            },
            {
              type: 'p',
              text: 'This entry is a preference. You can clear it at any time, and the website will fall back to your system or default appearance.',
            },
          ],
        },
        {
          id: 'discovery-autosave',
          heading: '5. Discovery Autosave Storage',
          blocks: [
            {
              type: 'p',
              text: 'The Discovery wizard saves your progress and answers in your browser under the key valtq-discovery-v1 so you can leave and resume where you left off.',
            },
            {
              type: 'p',
              text: 'This data stays in your browser until you complete or reset the wizard, or until you clear your browser\u2019s site data for this website.',
            },
            {
              type: 'storageInventory',
              items: [
                {
                  key: 'valtq-theme',
                  mechanism: 'localStorage',
                  purpose:
                    'Remembers your light or dark theme preference so the website renders as you chose.',
                  essential: false,
                },
                {
                  key: 'valtq-discovery-v1',
                  mechanism: 'localStorage',
                  purpose:
                    'Autosaves your Discovery wizard progress and answers so you can resume later.',
                  essential: true,
                },
              ],
            },
          ],
        },
        {
          id: 'third-party-embeds',
          heading: '6. Third-Party Embeds — Cal.com',
          blocks: [
            {
              type: 'p',
              text: 'The Discovery flow may embed a scheduling service provided by Cal.com so you can book a call. Cal.com is a third-party service and may set its own cookies or similar technologies when its embed is used.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'We do not control which technologies Cal.com sets. Refer to Cal.com\u2019s own cookie and privacy policies for details. This section should be reviewed when the Cal.com booking link is configured.',
            },
          ],
        },
        {
          id: 'analytics-advertising',
          heading: '7. Analytics and Advertising',
          blocks: [
            {
              type: 'p',
              text: 'We have not identified any analytics, advertising, or profiling technologies on this website. We do not currently use any analytics or advertising scripts.',
            },
            {
              type: 'p',
              text: 'If we introduce such technologies in the future, we will update this policy and, where required, ask for your consent before they are activated.',
            },
          ],
        },
        {
          id: 'managing-storage',
          heading: '8. Managing Browser Storage',
          blocks: [
            {
              type: 'p',
              text: 'Most browsers let you view, manage, and delete the data a website stores in your browser, including localStorage and cookies.',
            },
            {
              type: 'p',
              text: 'You can clear this website\u2019s data using your browser\u2019s site-data or storage settings. Removing valtq-theme will reset your theme preference; removing valtq-discovery-v1 will discard any unsaved Discovery progress.',
            },
          ],
        },
        {
          id: 'consent',
          heading: '9. Consent Behavior',
          blocks: [
            {
              type: 'p',
              text: 'Because the website currently stores only functional or preference data in your browser and does not set non-essential cookies, we do not currently display a cookie-consent banner.',
            },
            {
              type: 'p',
              text: 'If we add non-essential cookies or similar technologies, this policy and the website\u2019s consent behavior will be updated before those technologies are activated.',
            },
          ],
        },
        {
          id: 'changes',
          heading: '10. Changes to This Policy',
          blocks: [
            {
              type: 'p',
              text: 'We may update this Cookie Policy from time to time. The current version will always be available on this page, and the "Last updated" date will reflect the most recent revision.',
            },
            {
              type: 'p',
              text: 'We encourage you to review this page periodically.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '11. Contact',
          blocks: [
            {
              type: 'p',
              text: 'If you have questions about this Cookie Policy, you can reach us through the contact form on this website, WhatsApp, or our public social channels.',
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
      title: 'سياسة ملفات تعريف الارتباط',
      description: 'كيف يستخدم موقع ValtQ ملفات تعريف الارتباط وتقنيات المتصفح المماثلة.',
      intro:
        'توضح سياسة ملفات تعريف الارتباط هذه كيف يستخدم موقع ValtQ ملفات تعريف الارتباط وتقنيات المتصفح المماثلة، وما الذي يُخزَّن على جهازك عند الزيارة، وكيف يمكنك إدارته.',
      sections: [
        {
          id: 'what-are-cookies',
          heading: '1. ما هي ملفات تعريف الارتباط والتقنيات المماثلة',
          blocks: [
            {
              type: 'p',
              text: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يخزنها الموقع على جهازك عبر متصفحك. تشمل التقنيات المماثلة آليات التخزين في المتصفح مثل التخزين المحلي (localStorage) التي تؤدي وظائف مماثلة.',
            },
            {
              type: 'p',
              text: 'تصف هذه السياسة التقنيات التي يستخدمها هذا الموقع وكيف يمكنك إدارتها.',
            },
          ],
        },
        {
          id: 'technologies-we-use',
          heading: '2. التقنيات التي نستخدمها',
          blocks: [
            {
              type: 'p',
              text: 'لا يستخدم هذا الموقع ملفات تعريف الارتباط ولا يحمّل أي نصوص برمجية خارجية للتتبع. يستخدم آلية تخزين المتصفح المسماة التخزين المحلي (localStorage) لعدد محدود من الأغراض الوظيفية.',
            },
            {
              type: 'p',
              text: 'يعمل التخزين المحلي بشكل مشابه لملفات تعريف الارتباط من حيث تخزين بيانات نصية صغيرة في متصفحك، لكنه يُدار بشكل مختلف: لا يُرسل إلى الخادم مع كل طلب، ويستمر حتى يزيله الموقع أو متصفحك.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'المدخلات المخزنة محليًا الموضحة أدناه ليست ملفات تعريف ارتباط. تبقى في متصفحك وتُمسح عندما يزيلها الموقع أو عندما تمسح بيانات الموقع لهذا الموقع من متصفحك.',
            },
          ],
        },
        {
          id: 'necessary-storage',
          heading: '3. التخزين الضروري في المتصفح',
          blocks: [
            {
              type: 'p',
              text: 'لا يستخدم الموقع أي ملفات تعريف ارتباط ضرورية على الإطلاق. تعمل صفحاته وتؤدي وظائفها دون وجود أي تخزين في المتصفح.',
            },
            {
              type: 'p',
              text: 'تدعم مدخلات التخزين المحلي الموضحة أدناه ميزات تختار استخدامها؛ ولا يُستخدم أي منها لتتبعك.',
            },
          ],
        },
        {
          id: 'preference-storage',
          heading: '4. تخزين التفضيلات',
          blocks: [
            {
              type: 'p',
              text: 'نخزن تفضيل المظهر لديك (فاتح أو داكن) تحت المفتاح valtq-theme حتى يعرض الموقع المظهر الذي اخترته ويتجنب وميض المظهر الخاطئ عند عودتك.',
            },
            {
              type: 'p',
              text: 'هذا المدخل تفضيل. يمكنك مسحه في أي وقت، وسيعود الموقع إلى مظهر النظام أو المظهر الافتراضي.',
            },
          ],
        },
        {
          id: 'discovery-autosave',
          heading: '5. تخزين الحفظ التلقائي لأداة الاكتشاف',
          blocks: [
            {
              type: 'p',
              text: 'يحفظ معالج الاكتشاف تقدمك وإجاباتك في متصفحك تحت المفتاح valtq-discovery-v1 لتتمكن من المغادرة والاستكمال من حيث توقفت.',
            },
            {
              type: 'p',
              text: 'تبقى هذه البيانات في متصفحك حتى تكمل المعالج أو تعيد تعيينه، أو حتى تمسح بيانات هذا الموقع من متصفحك.',
            },
            {
              type: 'storageInventory',
              items: [
                {
                  key: 'valtq-theme',
                  mechanism: 'localStorage',
                  purpose: 'يتذكر تفضيل المظهر الفاتح أو الداكن لديك حتى يعرض الموقع ما اخترته.',
                  essential: false,
                },
                {
                  key: 'valtq-discovery-v1',
                  mechanism: 'localStorage',
                  purpose: 'يحفظ تقدمك وإجاباتك في معالج الاكتشاف تلقائيًا لتتمكن من الاستكمال لاحقًا.',
                  essential: true,
                },
              ],
            },
          ],
        },
        {
          id: 'third-party-embeds',
          heading: '6. عمليات الدمج الخارجية — Cal.com',
          blocks: [
            {
              type: 'p',
              text: 'قد يضم معالج الاكتشاف خدمة جدولة تقدمها Cal.com لحجز مكالمة. Cal.com خدمة من طرف ثالث وقد تعيّن ملفات تعريف الارتباط الخاصة بها أو تقنيات مماثلة عند استخدام أداة الحجز.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'لا نتحكم في التقنيات التي تعيّنها Cal.com. راجع سياسات ملفات تعريف الارتباط والخصوصية الخاصة بـ Cal.com للحصول على التفاصيل. يجب مراجعة هذا البند عند إعداد رابط حجز Cal.com.',
            },
          ],
        },
        {
          id: 'analytics-advertising',
          heading: '7. التحليلات والإعلانات',
          blocks: [
            {
              type: 'p',
              text: 'لم نحدد أي تقنيات تحليلات أو إعلانات أو تنميط في هذا الموقع. لا نستخدم حاليًا أي نصوص برمجية للتحليلات أو الإعلانات.',
            },
            {
              type: 'p',
              text: 'إذا أضفنا مثل هذه التقنيات في المستقبل، فسنحدث هذه السياسة ونطلب موافقتك عند الحاجة قبل تفعيلها.',
            },
          ],
        },
        {
          id: 'managing-storage',
          heading: '8. إدارة تخزين المتصفح',
          blocks: [
            {
              type: 'p',
              text: 'تتيح معظم المتصفحات عرض وإدارة وحذف البيانات التي يخزنها الموقع في متصفحك، بما في ذلك التخزين المحلي وملفات تعريف الارتباط.',
            },
            {
              type: 'p',
              text: 'يمكنك مسح بيانات هذا الموقع من خلال إعدادات بيانات الموقع أو التخزين في متصفحك. يؤدي إزالة valtq-theme إلى إعادة تعيين تفضيل المظهر؛ وإزالة valtq-discovery-v1 إلى التخلي عن أي تقدم غير محفوظ في معالج الاكتشاف.',
            },
          ],
        },
        {
          id: 'consent',
          heading: '9. سلوك الموافقة',
          blocks: [
            {
              type: 'p',
              text: 'نظرًا لأن الموقع يخزن حاليًا بيانات وظيفية أو تفضيلات فقط في متصفحك ولا يعيّن ملفات تعريف ارتباط غير ضرورية، فإننا لا نعرض حاليًا لافتة موافقة على ملفات تعريف الارتباط.',
            },
            {
              type: 'p',
              text: 'إذا أضفنا ملفات تعريف ارتباط غير ضرورية أو تقنيات مماثلة، فسيتم تحديث هذه السياسة وسلوك الموافقة في الموقع قبل تفعيل تلك التقنيات.',
            },
          ],
        },
        {
          id: 'changes',
          heading: '10. التغييرات على هذه السياسة',
          blocks: [
            {
              type: 'p',
              text: 'قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر. ستتوفر النسخة الحالية دائمًا في هذه الصفحة، وسيعكس تاريخ "آخر تحديث" أحدث مراجعة.',
            },
            {
              type: 'p',
              text: 'نشجعك على مراجعة هذه الصفحة بشكل دوري.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '11. التواصل',
          blocks: [
            {
              type: 'p',
              text: 'إذا كانت لديك أسئلة حول سياسة ملفات تعريف الارتباط هذه، يمكنك الوصول إلينا عبر نموذج التواصل في هذا الموقع أو واتساب أو قنوات التواصل الاجتماعي العامة.',
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

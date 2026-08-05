import type { LegalDocument } from './types';

/**
 * Terms of Service.
 *
 * Written conservatively from observable product behavior only. Legal/business
 * details that do not exist in the codebase (entity, address, email, governing
 * law, jurisdiction, limitation amounts) are deliberately not invented and are
 * flagged for legal review in the Disclaimers / Limitation sections.
 */
export const termsDocument: LegalDocument = {
  slug: 'terms',
  effectiveDate: '2026-08-03',
  updatedDate: '2026-08-03',
  content: {
    en: {
      title: 'Terms of Service',
      description:
        'The rules for using the ValtQ website, its content, and its inquiry tools.',
      intro:
        'These Terms of Service ("Terms") govern your access to and use of the ValtQ website and the information, tools, and services it makes available. By using this website, you agree to these Terms.',
      sections: [
        {
          id: 'acceptance',
          heading: '1. Acceptance of These Terms',
          blocks: [
            {
              type: 'p',
              text: 'By accessing or using the ValtQ website, you confirm that you have read and understood these Terms and agree to be bound by them. If you do not agree with any part of these Terms, please do not use the website.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'Submitting an inquiry does not create a client engagement. Any professional services will be governed by a separate written agreement.',
            },
          ],
        },
        {
          id: 'about-this-website',
          heading: '2. About This Website',
          blocks: [
            {
              type: 'p',
              text: 'ValtQ is a software development company that provides web, mobile, AI-integrated, and backend/cloud development services. This website presents our company, services, selected work, and related content, and provides ways to get in touch with us.',
            },
            {
              type: 'p',
              text: 'References to "we," "us," or "our" mean ValtQ and the team that operates this website.',
            },
          ],
        },
        {
          id: 'permitted-use',
          heading: '3. Permitted Use',
          blocks: [
            {
              type: 'p',
              text: 'You may use the website for lawful purposes, including:',
            },
            {
              type: 'ul',
              items: [
                'Accessing and viewing its content for personal or business-information purposes.',
                'Using the contact form and Discovery tools to communicate with us about potential projects.',
                'Sharing links to our pages, provided you do not misrepresent the source.',
              ],
            },
          ],
        },
        {
          id: 'prohibited-use',
          heading: '4. Prohibited Use',
          blocks: [
            {
              type: 'p',
              text: 'You agree not to use the website in ways that could harm it or others, including:',
            },
            {
              type: 'ul',
              items: [
                'Attempting to disrupt, overload, or gain unauthorized access to the website, its servers, or connected systems.',
                'Scraping, mining, or systematically harvesting content without our prior written consent.',
                'Using the website to distribute malware, spam, or unlawful material.',
                'Impersonating ValtQ or misrepresenting your relationship with us.',
                'Using the website in violation of any applicable law or regulation.',
              ],
            },
          ],
        },
        {
          id: 'public-information',
          heading: '5. Public Information and Inquiries',
          blocks: [
            {
              type: 'p',
              text: 'Information on this website is provided for general informational purposes. It does not constitute an offer, a quotation, or a commitment to provide services. You should not rely on it as professional advice.',
            },
            {
              type: 'p',
              text: 'Descriptions of our capabilities and case studies reflect work we have done and do not guarantee a specific outcome for your project.',
            },
          ],
        },
        {
          id: 'submissions',
          heading: '6. Discovery and Contact Submissions',
          blocks: [
            {
              type: 'p',
              text: 'When you use our contact form or Discovery wizard, you provide information that we use to understand and respond to your inquiry. By submitting information, you confirm that the details you provide are accurate and current.',
            },
            {
              type: 'p',
              text: 'Submitting a form does not create a binding agreement with us. Any professional engagement will require a separate written agreement signed by both parties.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'Your submissions are handled as described in our Privacy Policy and Cookie Policy.',
            },
          ],
        },
        {
          id: 'third-party-services',
          heading: '7. Third-Party Services and Links',
          blocks: [
            {
              type: 'p',
              text: 'The website may link to, or integrate with, services operated by third parties, including communication channels such as WhatsApp and scheduling functionality provided by Cal.com.',
            },
            {
              type: 'p',
              text: 'We do not control these third-party services. Their availability and terms are governed by their own policies, and we are not responsible for their operation or content.',
            },
          ],
        },
        {
          id: 'intellectual-property',
          heading: '8. Intellectual Property',
          blocks: [
            {
              type: 'p',
              text: 'The design, text, graphics, logos, and other content on this website are the property of ValtQ or its licensors and are protected by applicable intellectual property laws.',
            },
            {
              type: 'p',
              text: 'You may not copy, modify, distribute, or create derivative works from the content of this website without our prior written permission, except as expressly permitted by law.',
            },
          ],
        },
        {
          id: 'informational-content',
          heading: '9. Informational Content',
          blocks: [
            {
              type: 'p',
              text: 'Blog posts, case studies, and other material on this website describe our work and general topics. They are provided for informational purposes only and do not constitute professional advice or a recommendation for your specific situation.',
            },
            {
              type: 'p',
              text: 'You should evaluate any information on this website independently and, where appropriate, consult qualified professionals before making decisions.',
            },
          ],
        },
        {
          id: 'no-engagement',
          heading: '10. No Automatic Engagement',
          blocks: [
            {
              type: 'p',
              text: 'Your use of this website, including submitting a contact form or Discovery questionnaire, does not create a client relationship, an obligation to respond, or an obligation to provide services.',
            },
            {
              type: 'p',
              text: 'We are free to accept or decline any request for services in our sole discretion. Professional services will only be provided under a separate written agreement.',
            },
          ],
        },
        {
          id: 'availability',
          heading: '11. Availability and Changes to the Website',
          blocks: [
            {
              type: 'p',
              text: 'We aim to keep the website available and accurate, but we may suspend, modify, or discontinue any part of it at any time, with or without notice.',
            },
            {
              type: 'p',
              text: 'We are not liable for any unavailability, interruption, or loss of data resulting from maintenance, technical issues, or events outside our reasonable control.',
            },
          ],
        },
        {
          id: 'disclaimers',
          heading: '12. Disclaimers',
          blocks: [
            {
              type: 'p',
              text: 'The website and its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we make no warranties of any kind, whether express or implied, regarding the website, including its accuracy, completeness, or fitness for a particular purpose.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'This disclaimer is intentionally general and must be reviewed by legal counsel before publication to reflect the law applicable to your jurisdiction.',
            },
          ],
        },
        {
          id: 'limitation-of-liability',
          heading: '13. Limitation of Liability',
          blocks: [
            {
              type: 'p',
              text: 'To the fullest extent permitted by applicable law, ValtQ shall not be liable for indirect, incidental, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising out of or related to your use of the website.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'This limitation is placeholder-level language and must be reviewed and tailored by legal counsel before the website is published.',
            },
          ],
        },
        {
          id: 'changes-to-terms',
          heading: '14. Changes to These Terms',
          blocks: [
            {
              type: 'p',
              text: 'We may update these Terms from time to time. The current version will always be available on this page, and the "Last updated" date will reflect the most recent revision.',
            },
            {
              type: 'p',
              text: 'Your continued use of the website after changes take effect means that you accept the revised Terms. We encourage you to review this page periodically.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '15. Contact',
          blocks: [
            {
              type: 'p',
              text: 'If you have questions about these Terms, you can reach us through the contact form on this website or through the public channels listed on our pages, including WhatsApp.',
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
      title: 'شروط الخدمة',
      description: 'القواعد المنظمة لاستخدام موقع ValtQ ومحتواه وأدوات التواصل الخاصة به.',
      intro:
        'تحكم شروط الخدمة هذه ("الشروط") وصولك إلى موقع ValtQ واستخدامك له، وكذلك المعلومات والأدوات والخدمات التي يتيحها. باستخدامك هذا الموقع فإنك توافق على هذه الشروط.',
      sections: [
        {
          id: 'acceptance',
          heading: '1. الموافقة على هذه الشروط',
          blocks: [
            {
              type: 'p',
              text: 'بوصولك إلى موقع ValtQ أو استخدامه، فإنك تؤكد أنك قرأت هذه الشروط وفهمتها وتوافق على الالتزام بها. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام الموقع.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'لا يؤدي إرسال طلب تواصل إلى إنشاء علاقة تعاقدية مع العميل. تخضع أي خدمات مهنية لاتفاقية مكتوبة منفصلة.',
            },
          ],
        },
        {
          id: 'about-this-website',
          heading: '2. نبذة عن هذا الموقع',
          blocks: [
            {
              type: 'p',
              text: 'ValtQ هي شركة تطوير برمجيات تقدم خدمات تطوير مواقع الويب والتطبيقات والذكاء الاصطناعي والحلول السحابية والخلفية (Backend). يعرض هذا الموقع شركتنا وخدماتنا وأعمالنا المختارة والمحتوى ذا الصلة، ويتيح طرقًا للتواصل معنا.',
            },
            {
              type: 'p',
              text: 'تشير عبارات "نحن" أو "إياكم" أو "لنا" إلى ValtQ والفريق الذي يدير هذا الموقع.',
            },
          ],
        },
        {
          id: 'permitted-use',
          heading: '3. الاستخدام المسموح',
          blocks: [
            {
              type: 'p',
              text: 'يمكنك استخدام الموقع لأغراض مشروعة، بما في ذلك:',
            },
            {
              type: 'ul',
              items: [
                'الاطلاع على محتواه لأغراض شخصية أو معلومات تجارية.',
                'استخدام نموذج التواصل وأداة الاكتشاف للتواصل معنا بشأن مشاريع محتملة.',
                'مشاركة روابط لصفحاتنا، شريطة ألا تحرّف المصدر.',
              ],
            },
          ],
        },
        {
          id: 'prohibited-use',
          heading: '4. الاستخدام المحظور',
          blocks: [
            {
              type: 'p',
              text: 'أنت توافق على عدم استخدام الموقع بطرق قد تضر به أو بالآخرين، بما في ذلك:',
            },
            {
              type: 'ul',
              items: [
                'محاولة تعطيل الموقع أو إرباكه أو الوصول غير المصرح به إلى الموقع أو خوادمه أو الأنظمة المتصلة به.',
                'جمع أو استخراج أو حصاد المحتوى بشكل منهجي دون موافقتنا الكتابية المسبقة.',
                'استخدام الموقع لتوزيع برامج ضارة أو رسائل مزعجة أو مواد غير قانونية.',
                'انتحال شخصية ValtQ أو تحريف علاقتك بنا.',
                'استخدام الموقع بما يخالف أي قانون أو لائحة سارية.',
              ],
            },
          ],
        },
        {
          id: 'public-information',
          heading: '5. المعلومات العامة والاستفسارات',
          blocks: [
            {
              type: 'p',
              text: 'المعلومات الواردة في هذا الموقع مقدمة لأغراض إعلامية عامة. لا تشكل عرضًا أو تسعيرًا أو التزامًا بتقديم خدمات. لا ينبغي الاعتماد عليها كنصيحة مهنية.',
            },
            {
              type: 'p',
              text: 'أوصاف قدراتنا ودراسات الحالة تعكس أعمالًا أنجزناها ولا تضمن نتيجة محددة لمشروعك.',
            },
          ],
        },
        {
          id: 'submissions',
          heading: '6. إرسال نماذج الاكتشاف والتواصل',
          blocks: [
            {
              type: 'p',
              text: 'عند استخدامك نموذج التواصل أو أداة الاكتشاف، فإنك تقدم معلومات نستخدمها لفهم استفسارك والرد عليه. بإرسالك المعلومات فإنك تؤكد أن التفاصيل المقدمة دقيقة وحديثة.',
            },
            {
              type: 'p',
              text: 'لا يؤدي إرسال نموذج إلى إنشاء اتفاق ملزم معنا. أي تعاقد مهني يتطلب اتفاقية مكتوبة منفصلة يوقّعها الطرفان.',
            },
            {
              type: 'notice',
              tone: 'info',
              text: 'تتم معالجة إرسالاتك وفقًا لما هو موصوف في سياسة الخصوصية وسياسة ملفات تعريف الارتباط لدينا.',
            },
          ],
        },
        {
          id: 'third-party-services',
          heading: '7. خدمات وروابط الأطراف الثالثة',
          blocks: [
            {
              type: 'p',
              text: 'قد يربط الموقع بخدمات يديرها أطراف ثالثة أو يتكامل معها، بما في ذلك قنوات التواصل مثل واتساب ووظيفة جدولة المواعيد التي تقدمها Cal.com.',
            },
            {
              type: 'p',
              text: 'نحن لا نتحكم في هذه الخدمات الخارجية. خضوعها لشروطها وسياساتها الخاصة، ولا نتحمل مسؤولية تشغيلها أو محتواها.',
            },
          ],
        },
        {
          id: 'intellectual-property',
          heading: '8. الملكية الفكرية',
          blocks: [
            {
              type: 'p',
              text: 'التصميم والنصوص والرسومات والشعارات والمحتوى الآخر في هذا الموقع ملك لValtQ أو لمرخّصيها وتحميه قوانين الملكية الفكرية المعمول بها.',
            },
            {
              type: 'p',
              text: 'لا يجوز لك نسخ محتوى هذا الموقع أو تعديله أو توزيعه أو إنشاء أعمال مشتقة منه دون إذن كتابي مسبق منا، باستثناء ما يسمح به القانون صراحةً.',
            },
          ],
        },
        {
          id: 'informational-content',
          heading: '9. المحتوى الإعلامي',
          blocks: [
            {
              type: 'p',
              text: 'تشرح منشورات المدونة ودراسات الحالة والمواد الأخرى في هذا الموقع أعمالنا وموضوعات عامة. وهي مقدمة لأغراض إعلامية فقط ولا تشكل نصيحة مهنية أو توصية تناسب حالتك الخاصة.',
            },
            {
              type: 'p',
              text: 'ينبغي تقييم أي معلومات في هذا الموقع بشكل مستقل، وعند الاقتضاء، استشارة مؤهلين مهنيًا قبل اتخاذ القرارات.',
            },
          ],
        },
        {
          id: 'no-engagement',
          heading: '10. عدم قيام علاقة تعاقدية تلقائيًا',
          blocks: [
            {
              type: 'p',
              text: 'استخدامك لهذا الموقع، بما في ذلك إرسال نموذج تواصل أو استبيان اكتشاف، لا يُنشئ علاقة تعاقدية مع عميل، أو التزامًا بالرد، أو التزامًا بتقديم خدمات.',
            },
            {
              type: 'p',
              text: 'نحن أحرار في قبول أي طلب خدمات أو رفضه وفق تقديرنا المطلق. لن تُقدم الخدمات المهنية إلا بموجب اتفاقية مكتوبة منفصلة.',
            },
          ],
        },
        {
          id: 'availability',
          heading: '11. توفر الموقع وتغييراته',
          blocks: [
            {
              type: 'p',
              text: 'نسعى إلى إبقاء الموقع متاحًا ودقيقًا، ولكن يجوز لنا تعليق أو تعديل أو إيقاف أي جزء منه في أي وقت، مع أو دون إشعار.',
            },
            {
              type: 'p',
              text: 'لسنا مسؤولين عن أي تعذر وصول أو انقطاع أو فقدان بيانات ناتج عن الصيانة أو مشكلات تقنية أو أحداث خارجة عن سيطرتنا المعقولة.',
            },
          ],
        },
        {
          id: 'disclaimers',
          heading: '12. إخلاء المسؤولية',
          blocks: [
            {
              type: 'p',
              text: 'الموقع ومحتواه مقدمان "كما هما" و"كما يتوفران". إلى أقصى حد يسمح به القانون، لا نقدم أي ضمانات من أي نوع، صريحة أو ضمنية، بشأن الموقع، بما في ذلك دقته أو اكتماله أو ملاءمته لغرض معين.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'إخلاء المسؤولية هذا عام عمدًا ويجب أن يراجعه مستشار قانوني قبل النشر ليعكس القانون المعمول به في نطاق اختصاصك.',
            },
          ],
        },
        {
          id: 'limitation-of-liability',
          heading: '13. الحد من المسؤولية',
          blocks: [
            {
              type: 'p',
              text: 'إلى أقصى حد يسمح به القانون المعمول به، لا تكون ValtQ مسؤولة عن الأضرار غير المباشرة أو العرضية أو التبعية أو التعويضية، أو عن فقدان الأرباح أو البيانات أو السمعة، الناشئة عن استخدامك للموقع أو المتعلقة به.',
            },
            {
              type: 'notice',
              tone: 'caution',
              text: 'هذا البند مكتوب كمستوى مبدئي ويجب أن يراجعه ويخصّصه مستشار قانوني قبل نشر الموقع.',
            },
          ],
        },
        {
          id: 'changes-to-terms',
          heading: '14. التغييرات على هذه الشروط',
          blocks: [
            {
              type: 'p',
              text: 'قد نقوم بتحديث هذه الشروط من وقت لآخر. ستتوفر النسخة الحالية دائمًا في هذه الصفحة، وسيعكس تاريخ "آخر تحديث" أحدث مراجعة.',
            },
            {
              type: 'p',
              text: 'استمرارك في استخدام الموقع بعد سريان التغييرات يعني قبولك للشروط المعدلة. نشجعك على مراجعة هذه الصفحة بشكل دوري.',
            },
          ],
        },
        {
          id: 'contact',
          heading: '15. التواصل',
          blocks: [
            {
              type: 'p',
              text: 'إذا كانت لديك أسئلة حول هذه الشروط، يمكنك الوصول إلينا عبر نموذج التواصل في هذا الموقع أو عبر القنوات العامة المدرجة في صفحاتنا، بما في ذلك واتساب.',
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

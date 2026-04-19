/* ================================================================
   SEO Metadata Helper
   Generates consistent metadata across all pages.
   ================================================================ */

import type { Metadata } from 'next';

interface PageSEO {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  path: string;
  /** Optional per-page OG image (absolute path under /public, or full URL). */
  ogImage?: string;
  ogImageAr?: string;
}

const BASE_URL = 'https://mamahala.ca';
const SITE_NAME = 'Mama Hala Consulting';
const SITE_NAME_AR = 'ماما هالة للاستشارات';
const DEFAULT_OG_IMAGE = '/images/og-image.png';

export function generatePageMetadata(locale: string, page: PageSEO): Metadata {
  const isAr = locale === 'ar';
  const title = isAr ? page.titleAr : page.title;
  const description = isAr ? page.descriptionAr : page.description;
  const url = `${BASE_URL}/${locale}${page.path}`;
  const ogImage = (isAr ? page.ogImageAr : page.ogImage) || page.ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${page.path}`,
        ar: `${BASE_URL}/ar${page.path}`,
        'x-default': `${BASE_URL}/en${page.path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: isAr ? SITE_NAME_AR : SITE_NAME,
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Page-specific SEO data
export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Professional Family & Individual Counseling',
    titleAr: 'استشاراتٌ مهنيّة للأسرة والأفراد',
    description: 'Professional counseling and guidance for individuals, couples, and families. Certified family counselor serving Dubai and Canada. Book your free consultation.',
    descriptionAr: 'استشاراتٌ وتوجيهٌ مهنيّ للأفراد والأزواج والعائلات. مستشارة أسريّة معتمدة تخدم دبي وكندا. احجز استشارتك المجّانيّة.',
    path: '',
  },
  about: {
    title: 'About Dr. Hala Ali',
    titleAr: 'عن د. هالة علي',
    description: 'Meet Dr. Hala Ali — a Yale-trained, certified family counselor with years of experience helping families, couples, and individuals heal and grow.',
    descriptionAr: 'تعرّف على د. هالة علي — مستشارة أسريّة معتمدة ومُدرَّبة في جامعة ييل، ذات خبرة واسعة في مساعدة العائلات والأزواج والأفراد.',
    path: '/about',
  },
  services: {
    title: 'Our Counseling Services',
    titleAr: 'خدماتُنا الاستشاريّة',
    description: 'Explore our full range of counseling services for youth, families, adults, couples, and experiential therapy. Online and in-person sessions available.',
    descriptionAr: 'استكشف مجموعتنا الكاملة من خدمات الاستشارة للشباب والعائلات والبالغين والأزواج والعلاج التجريبي.',
    path: '/services',
  },
  booking: {
    title: 'Book a Session',
    titleAr: 'احجِزْ جلسة',
    description: 'Book your free initial consultation or choose from 23 specialized counseling services. Online sessions via video call.',
    descriptionAr: 'احجز استشارتك الأوّليّة المجّانيّة أو اختر من بين 23 خدمة استشاريّة متخصّصة. جلسات عبر الإنترنت.',
    path: '/book',
  },
  contact: {
    title: 'Contact Us',
    titleAr: 'تواصَلْ معنا',
    description: 'Get in touch with Mama Hala Consulting. Reach us via WhatsApp, email, or our contact form. We serve Ottawa, Canada and Dubai, UAE.',
    descriptionAr: 'تواصل مع ماما هالة للاستشارات عبر واتساب أو البريد الإلكتروني أو نموذج التواصل. نخدم أوتاوا، كندا ودبي، الإمارات.',
    path: '/contact',
  },
  quiz: {
    title: 'Find the Right Service for You',
    titleAr: 'اعثُرْ على الخدمة المناسبة لك',
    description: 'Take our quick 2-minute quiz to discover which Mama Hala counseling service is the best fit for your needs.',
    descriptionAr: 'خُذ اختبارنا السريع لاكتشاف أيّ خدمة استشاريّة من ماما هالة هي الأنسب لاحتياجاتك.',
    path: '/quiz',
  },
  gift: {
    title: 'Gift of Care',
    titleAr: 'هديّةُ رعاية',
    description: 'Give someone you love the gift of care. Send a beautiful invitation to book a session with Dr. Hala through Mama Hala Consulting.',
    descriptionAr: 'أهدِ مَنْ تحبّ هديّةَ الرّعاية — دعوةٌ جميلةٌ لحجزِ جلسةٍ مع د. هالة عبر ماما هالة للاستشارات.',
    path: '/gift',
  },
  resources: {
    title: 'Resources & Insights',
    titleAr: 'الموارد والرؤى',
    description: 'Explore our blog, programs, events, downloads, and FAQs. Free resources for parents, families, and individuals.',
    descriptionAr: 'استكشف مدوّنتنا وبرامجنا وفعاليّاتنا وتنزيلاتنا والأسئلة الشائعة. موارد مجّانيّة للآباء والعائلات والأفراد.',
    path: '/resources',
  },
  events: {
    title: 'Events & Workshops',
    titleAr: 'الفعاليات وورش العمل',
    description: 'Join our upcoming workshops, webinars, and community events on parenting, relationships, and personal growth. In-person and online.',
    descriptionAr: 'انضم إلى ورش العمل والندوات والفعاليّات المجتمعيّة القادمة حول التربية والعلاقات والنموّ الشخصي. حضوريّاً وعبر الإنترنت.',
    path: '/resources/events',
  },
  programs: {
    title: 'Programs — Coming Soon',
    titleAr: 'البرامج — قريباً',
    description: 'Structured counseling programs for lasting change. Multi-session courses on parenting, couples communication, and youth development — launching soon.',
    descriptionAr: 'برامج استشاريّة منظّمة للتغيير الدائم. دورات متعدّدة الجلسات حول التربية والتواصل بين الأزواج وتنمية الشباب — قريباً.',
    path: '/resources/programs',
  },
  blog: {
    title: 'Blog',
    titleAr: 'المدونة',
    description: 'Expert insights on family dynamics, relationship health, parenting strategies, and emotional well-being from Dr. Hala Ali.',
    descriptionAr: 'رؤى متخصّصة حول ديناميكيّات الأسرة وصحّة العلاقات واستراتيجيّات التربية والصحّة النفسيّة من د. هالة علي.',
    path: '/resources/blog',
  },
  downloads: {
    title: 'Free Toolkit',
    titleAr: 'أدوات مجانية',
    description: 'Download free worksheets, guides, and self-help tools for better communication, emotional regulation, and family harmony.',
    descriptionAr: 'حمّل أوراق عمل وأدلّة وأدوات مساعدة ذاتيّة مجّانيّة لتحسين التواصل والتنظيم العاطفي والانسجام الأسري.',
    path: '/resources/downloads',
  },
  faqs: {
    title: 'FAQs',
    titleAr: 'الأسئلة الشائعة',
    description: 'Answers to common questions about our counseling services, session formats, pricing, confidentiality, and how to get started.',
    descriptionAr: 'إجابات على الأسئلة الشائعة حول خدماتنا الاستشاريّة وأشكال الجلسات والأسعار والسرّيّة وكيفيّة البدء.',
    path: '/resources/faqs',
  },
  parentingStyleQuiz: {
    title: "Mama Hala's Parenting Compass",
    titleAr: 'بوصلةُ ماما هالة للتربية',
    description: 'Discover your dominant parenting style through 16 real-life scenarios. A free self-reflection tool for parents by Dr. Hala Ali.',
    descriptionAr: 'اكتشفْ نمطَ تربيتِك السائد من خلال 16 موقفًا حقيقيًّا. أداةُ تأمُّلٍ ذاتيٍّ مجّانيّة للوالدَين من د. هالة علي.',
    path: '/quiz/parenting-style',
  },
  adultingCheckQuiz: {
    title: 'The Adulting Reality Check',
    titleAr: 'فحصُ واقعِ الاستقلاليّة',
    description: 'Discover where you are in your journey to independence and thriving. 15 questions — about 7 minutes.',
    descriptionAr: 'اكتشفْ أينَ أنتَ في رحلةِ الاستقلاليّةِ والنضج. 15 سؤالاً فقط — حوالي 7 دقائق.',
    path: '/quiz/adulting-check',
  },
  communicationStyleQuiz: {
    title: 'Are We Speaking the Same Language?',
    titleAr: 'هل نتحدّثُ نفسَ اللغة؟',
    description: 'Discover your communication strengths and areas for growth in your relationship. 12 questions — about 5 minutes.',
    descriptionAr: 'اكتشفْ نقاطَ قوّةِ التواصلِ في علاقتِك والمجالاتِ التي يمكنُ تحسينُها. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/communication-style',
  },
  conflictStyleQuiz: {
    title: 'How Do We Fight?',
    titleAr: 'كيفَ نتعاملُ مع الخلاف؟',
    description: 'Discover your dominant conflict style through 16 real-life scenarios. A free self-reflection tool by Dr. Hala Ali.',
    descriptionAr: 'اكتشفْ نمطَ تعاملِك السائدَ في الخلافات من خلالِ 16 موقفًا حقيقيًّا — حوالي 8 دقائق.',
    path: '/quiz/conflict-style',
  },
  digitalAwarenessQuiz: {
    title: 'The Digital Self-Awareness Profile',
    titleAr: 'مِلَفُّ الوعيِ الرَّقمِيِّ الذَّاتِيّ',
    description: 'Discover what your screen time reveals about your inner world. 18 questions across six psychological dimensions.',
    descriptionAr: 'اكتشفْ ما يكشِفُه وقتُ شاشتِك عن عالمِك الداخليّ. ١٨ سؤالاً عبرَ ستّةِ أبعادٍ نفسيّة — حوالي ٦ دقائق.',
    path: '/quiz/digital-awareness',
  },
  digitalLifeQuiz: {
    title: 'My Digital Life Check-in',
    titleAr: 'فحصُ حياتي الرقميّة',
    description: 'Discover how your digital life affects your mental well-being. 12 questions — about 5 minutes.',
    descriptionAr: 'اكتشفْ كيفَ تؤثّرُ حياتُك الرقميّةُ على صحّتِك النفسيّة. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/digital-life',
  },
  emotionalIntelligenceQuiz: {
    title: 'Child Emotional Intelligence Assessment',
    titleAr: 'تقييمُ الذكاءِ العاطفيِّ للطفل',
    description: "Discover your child's emotional strengths and the areas that can be nurtured. 12 questions — about 5 minutes.",
    descriptionAr: 'اكتشفْ نقاطَ القوّةِ العاطفيّةَ لطفلِك والمجالاتِ التي يمكنُ رعايتُها. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/emotional-intelligence',
  },
  executiveFunctionQuiz: {
    title: 'Executive Function Micro-Screener',
    titleAr: 'فاحصُ الوظائفِ التنفيذيّةِ المُصغَّر',
    description: "A 5-minute screening tool to understand your child's executive function strengths and challenges.",
    descriptionAr: 'أداةُ فحصٍ لمدّةِ 5 دقائق لفهمِ نقاطِ قوّةِ طفلِك وتحدّياتِه في الوظائفِ التنفيذيّة.',
    path: '/quiz/executive-function',
  },
  familyHarmonyQuiz: {
    title: 'Family Harmony Assessment',
    titleAr: 'تقييم الانسجام الأسري',
    description: "Discover your family's strengths and the areas where you can thrive. 12 questions — about 5 minutes.",
    descriptionAr: 'اكتشف نقاط القوة في عائلتك والمجالات التي يمكن أن تزدهر فيها. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/family-harmony',
  },
  identityCompassQuiz: {
    title: 'Who Am I Becoming?',
    titleAr: 'مَن أنا أصبح؟',
    description: 'Discover where you are in your identity journey. 12 questions — about 5 minutes.',
    descriptionAr: 'اكتشفْ أينَ أنتَ في رحلةِ تشكيلِ هويّتِك. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/identity-compass',
  },
  lifeBalanceQuiz: {
    title: 'Life Balance & Fulfillment',
    titleAr: 'تقييمُ التوازنِ والرضا في الحياة',
    description: 'Discover where you are thriving and where you need more attention. 12 questions — about 5 minutes.',
    descriptionAr: 'اكتشف أين تزدهرُ وأين تحتاجُ المزيدَ من الاهتمام. 12 سؤالاً فقط — حوالي 5 دقائق.',
    path: '/quiz/life-balance',
  },
  preMarriageQuiz: {
    title: 'Pre-Marriage Readiness Check',
    titleAr: 'فحصُ الجاهزيّةِ لِلزّواج',
    description: 'Discover how ready you are to build a life together. 15 questions — about 7 minutes.',
    descriptionAr: 'اكتشفا مدى استعدادِكما لبناءِ حياةٍ معًا. 15 سؤالًا فقط — حوالي 7 دقائق.',
    path: '/quiz/pre-marriage',
  },
  relationshipHealthQuiz: {
    title: "Mama Hala's Relationship Compass",
    titleAr: 'بوصلةُ ماما هالة للعلاقات',
    description: "Discover your relationship's strengths and the areas where you can thrive together. 16 questions — about 7 minutes.",
    descriptionAr: 'اكتشفا نقاطَ القوّةِ في علاقتِكما والمجالاتِ التي يمكنُ أن تزدهرَ فيها. 16 سؤالاً — حوالي 7 دقائق.',
    path: '/quiz/relationship-health',
  },
  wellbeingQuiz: {
    title: 'How Are You Really Doing?',
    titleAr: 'كيفَ حالُك حقًّا؟',
    description: 'A quick 2-minute check-in — because caring for yourself starts with awareness.',
    descriptionAr: 'فحصٌ سريعٌ لمدّةِ دقيقتين — لأنّ الاهتمامَ بنفسِك يبدأُ بالوعي.',
    path: '/quiz/wellbeing',
  },
  quizResults: {
    title: 'Your Assessment Results',
    titleAr: 'نتائجُ تقييمِك',
    description: 'View and share your self-assessment results from Mama Hala Consulting.',
    descriptionAr: 'اعرِض وشارِك نتائجَ تقييمِك الذاتيّ من ماما هالة للاستشارات.',
    path: '/quiz/results',
  },
  assessments: {
    title: 'Check-ins',
    titleAr: 'تقييماتٌ ذاتيّة',
    description: 'Quick self-assessment tools to reflect on your well-being, relationships, and personal growth. Start your journey with clarity.',
    descriptionAr: 'أدوات تقييم ذاتي سريعة للتأمّل في صحّتك النفسيّة وعلاقاتك ونموّك الشخصي. ابدأ رحلتك بوضوح.',
    path: '/resources/assessments',
  },
  privacy: {
    title: 'Privacy Policy',
    titleAr: 'سياسة الخصوصية',
    description: 'How Mama Hala Consulting collects, uses, and protects your personal information. Your privacy and confidentiality matter to us.',
    descriptionAr: 'كيف تجمع ماما هالة للاستشارات معلوماتك الشخصيّة وتستخدمها وتحميها. خصوصيّتك وسرّيّتك تهمّنا.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms of Service',
    titleAr: 'شروط الخدمة',
    description: 'Terms and conditions for using Mama Hala Consulting services, including session policies, responsibilities, and limitations.',
    descriptionAr: 'الشروط والأحكام لاستخدام خدمات ماما هالة للاستشارات، بما في ذلك سياسات الجلسات والمسؤوليّات والقيود.',
    path: '/terms-of-service',
  },
  bookingPolicy: {
    title: 'Booking Policy',
    titleAr: 'سياسة الحجز',
    description: 'Our booking, cancellation, and rescheduling policies. Everything you need to know before reserving your counseling session.',
    descriptionAr: 'سياسات الحجز والإلغاء وإعادة الجدولة. كلّ ما تحتاج معرفته قبل حجز جلستك الاستشاريّة.',
    path: '/booking-policy',
  },
};

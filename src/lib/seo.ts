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

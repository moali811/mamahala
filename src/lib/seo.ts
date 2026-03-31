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
}

const BASE_URL = 'https://mamahala.ca';
const SITE_NAME = 'Mama Hala Consulting';
const SITE_NAME_AR = 'ماما هالة للاستشارات';

export function generatePageMetadata(locale: string, page: PageSEO): Metadata {
  const isAr = locale === 'ar';
  const title = isAr ? page.titleAr : page.title;
  const description = isAr ? page.descriptionAr : page.description;
  const url = `${BASE_URL}/${locale}${page.path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${page.path}`,
        ar: `${BASE_URL}/ar${page.path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: isAr ? 'ar_AE' : 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    path: '/book-a-session',
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
    title: 'Gift a Session',
    titleAr: 'أهدِ جلسة',
    description: 'Give the gift of being heard. Gift a professional counseling session to someone you care about through Mama Hala Consulting.',
    descriptionAr: 'أهدِ هديّة الاحتواء. أهدِ جلسة استشاريّة مهنيّة لمن تحبّ عبر ماما هالة للاستشارات.',
    path: '/gift',
  },
  resources: {
    title: 'Resources & Insights',
    titleAr: 'الموارد والرؤى',
    description: 'Explore our blog, programs, events, downloads, and FAQs. Free resources for parents, families, and individuals.',
    descriptionAr: 'استكشف مدوّنتنا وبرامجنا وفعاليّاتنا وتنزيلاتنا والأسئلة الشائعة. موارد مجّانيّة للآباء والعائلات والأفراد.',
    path: '/resources',
  },
};

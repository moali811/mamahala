import { notFound } from 'next/navigation';
import { isValidLocale, getDirection, getMessages } from '@/lib/i18n';
import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';
import { getOrganizationSchema } from '@/lib/schema';
import { BUSINESS } from '@/config/business';
import type { Locale } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ---- Metadata (template for child pages) ----
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: {
      default: isAr ? 'د. هالة علي | ماما هالة للاستشارات' : 'Dr. Hala Ali | Mama Hala Consulting',
      template: isAr ? '%s | ماما هالة للاستشارات' : '%s | Mama Hala Consulting',
    },
    description: isAr
      ? 'استشاراتٌ وتوجيهٌ مهنيّ للأفراد والأزواج والعائلات. مستشارة أسريّة معتمدة.'
      : 'Professional counseling and guidance for individuals, couples, and families.',
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ar: '/ar' },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale as Locale);
  const messages = getMessages(locale as Locale);

  return (
    <div dir={dir} className="flex flex-col min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#C4878A] focus:px-4 focus:py-2 focus:text-white focus:text-sm"
      >
        Skip to content
      </a>

      <Header locale={locale as Locale} messages={messages} />

      <main id="main-content" className="flex-1 pt-20">
        {children}
      </main>

      <Footer locale={locale as Locale} messages={messages} />

    </div>
  );
}

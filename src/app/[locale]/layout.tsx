import { notFound } from 'next/navigation';
import { isValidLocale, getDirection, getMessages } from '@/lib/i18n';
import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';
import { getOrganizationSchema } from '@/lib/schema';
import { BUSINESS } from '@/config/business';
import type { Locale } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RegionProvider } from '@/components/region/RegionProvider';
import { getGeoFromHeaders } from '@/lib/region';
import TalkNowFab from '@/components/marketing/TalkNowFab';

// ---- Metadata (template for child pages) ----
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const description = isAr
    ? 'استشاراتٌ وتوجيهٌ مهنيّ للأفراد والأزواج والعائلات. مستشارة أسريّة معتمدة.'
    : 'Professional counseling and guidance for individuals, couples, and families.';
  const title = isAr ? 'د. هالة علي | ماما هالة للاستشارات' : 'Dr. Hala Ali | Mama Hala Consulting';
  return {
    title: {
      default: title,
      template: isAr ? '%s | ماما هالة للاستشارات' : '%s | Mama Hala Consulting',
    },
    description,
    alternates: {
      canonical: `https://mamahala.ca/${locale}`,
      languages: { en: '/en', ar: '/ar', 'x-default': '/en' },
    },
    openGraph: {
      title,
      description,
      url: `https://mamahala.ca/${locale}`,
      siteName: isAr ? 'ماما هالة' : 'Mama Hala',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      type: 'website',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
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
  const { region: initialRegion, country: initialCountry } = await getGeoFromHeaders();

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

      <RegionProvider initialRegion={initialRegion} initialCountry={initialCountry}>
        <Header locale={locale as Locale} messages={messages} />

        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>

        <Footer locale={locale as Locale} messages={messages} />
        <TalkNowFab locale={locale as 'en' | 'ar'} />
      </RegionProvider>

    </div>
  );
}

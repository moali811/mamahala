import type { Metadata } from 'next';
import { serviceCategories } from '@/data/services';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const isAr = locale === 'ar';
  const catInfo = serviceCategories.find((c) => c.key === category);

  if (!catInfo) {
    return { title: isAr ? 'الخدمات' : 'Services' };
  }

  const title = isAr
    ? `خدمات ${catInfo.nameAr}`
    : `${catInfo.name} Services`;
  const description = isAr ? catInfo.descriptionAr : catInfo.description;
  const url = `${BASE_URL}/${locale}/services/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/services/${category}`,
        ar: `${BASE_URL}/ar/services/${category}`,
        'x-default': `${BASE_URL}/en/services/${category}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: isAr ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      images: [{ url: `${BASE_URL}/images/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/og-image.png`],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

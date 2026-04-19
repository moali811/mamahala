import type { Metadata } from 'next';
import type { AcademyProgram } from '@/types';

const BASE_URL = 'https://mamahala.ca';

async function loadProgram(slug: string): Promise<AcademyProgram | null> {
  try {
    switch (slug) {
      case 'intentional-parent': return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens': return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together': return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass': return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      default: return null;
    }
  } catch { return null; }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const program = await loadProgram(slug);

  if (!program) {
    return { title: isAr ? 'البرنامج غير موجود' : 'Program not found' };
  }

  const title = isAr ? program.titleAr : program.titleEn;
  const description = isAr ? program.descriptionAr : program.descriptionEn;
  const url = `${BASE_URL}/${locale}/programs/${slug}`;
  const image = program.image?.startsWith('http') ? program.image : `${BASE_URL}${program.image || '/images/og-image.png'}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/programs/${slug}`,
        ar: `${BASE_URL}/ar/programs/${slug}`,
        'x-default': `${BASE_URL}/en/programs/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: isAr ? 'ماما هالة' : 'Mama Hala',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

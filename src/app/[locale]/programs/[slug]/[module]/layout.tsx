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
  params: Promise<{ locale: string; slug: string; module: string }>;
}): Promise<Metadata> {
  const { locale, slug, module: moduleSlug } = await params;
  const isAr = locale === 'ar';
  const program = await loadProgram(slug);

  if (!program) {
    return { title: isAr ? 'الوحدة غير موجودة' : 'Module not found' };
  }

  // Find the module across all levels
  let moduleMeta: { titleEn: string; titleAr: string } | null = null;
  for (const level of program.levels) {
    const found = level.modules.find((m) => m.slug === moduleSlug);
    if (found) { moduleMeta = found; break; }
  }

  const programTitle = isAr ? program.titleAr : program.titleEn;
  const moduleTitle = moduleMeta
    ? (isAr ? moduleMeta.titleAr : moduleMeta.titleEn)
    : moduleSlug;
  const title = `${moduleTitle} — ${programTitle}`;
  const description = isAr
    ? `${moduleTitle} — وحدةٌ ضمنَ برنامج ${programTitle} من ماما هالة للاستشارات.`
    : `${moduleTitle} — a module in the ${programTitle} program by Mama Hala Consulting.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: isAr ? 'ماما هالة' : 'Mama Hala',
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

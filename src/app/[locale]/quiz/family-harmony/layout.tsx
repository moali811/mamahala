import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, PAGE_SEO.familyHarmonyQuiz);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

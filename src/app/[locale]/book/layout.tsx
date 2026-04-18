import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, PAGE_SEO.booking);
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}

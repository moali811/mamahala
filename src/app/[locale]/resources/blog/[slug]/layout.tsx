import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { BUSINESS } from '@/config/business';
import { getBlogPostSchema, getBreadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: isAr ? 'المقال غير موجود' : 'Post not found' };
  }

  const title = isAr ? post.titleAr : post.titleEn;
  const description = isAr ? post.excerptAr : post.excerptEn;
  const url = `${BASE_URL}/${locale}/resources/blog/${slug}`;
  const image = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : `${BASE_URL}${post.coverImage}`
    : `${BASE_URL}/images/logo-512.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/resources/blog/${slug}`,
        ar: `${BASE_URL}/ar/resources/blog/${slug}`,
        'x-default': `${BASE_URL}/en/resources/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: isAr ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      publishedTime: post.publishDate,
      authors: [BUSINESS.founder],
      tags: post.tags,
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

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <>{children}</>;

  const title = isAr ? post.titleAr : post.titleEn;
  const description = isAr ? post.excerptAr : post.excerptEn;
  const url = `${BASE_URL}/${locale}/resources/blog/${slug}`;
  const author = isAr ? BUSINESS.founderAr : BUSINESS.founder;

  const blogSchema = getBlogPostSchema({
    title,
    description,
    datePublished: post.publishDate,
    author,
    url,
    image: post.coverImage,
    inLanguage: isAr ? 'ar' : 'en',
    keywords: post.tags,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: isAr ? 'الموارد' : 'Resources', url: `${BASE_URL}/${locale}/resources` },
    { name: isAr ? 'المدونة' : 'Blog', url: `${BASE_URL}/${locale}/resources/blog` },
    { name: title, url },
  ]);

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}

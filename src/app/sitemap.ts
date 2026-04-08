import type { MetadataRoute } from 'next';
import { services, serviceCategories } from '@/data/services';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = 'https://mamahala.ca';
const LOCALES = ['en', 'ar'] as const;

const QUIZ_SLUGS = [
  'pre-marriage',
  'life-balance',
  'family-harmony',
  'parenting-style',
  'emotional-intelligence',
  'executive-function',
  'relationship-health',
  'wellbeing',
];

function localeAlternates(path: string) {
  return {
    languages: {
      en: `${BASE_URL}/en${path}`,
      ar: `${BASE_URL}/ar${path}`,
      'x-default': `${BASE_URL}/en${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    '',
    '/about',
    '/services',
    '/book-a-session',
    '/quiz',
    '/contact',
    '/gift',
    '/resources',
    '/resources/blog',
    '/resources/programs',
    '/resources/events',
    '/resources/downloads',
    '/resources/faqs',
    '/resources/assessments',
    '/privacy-policy',
    '/terms-of-service',
    '/booking-policy',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for both locales
  for (const page of staticPages) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/services' ? 0.9 : 0.7,
        alternates: localeAlternates(page),
      });
    }
  }

  // Quiz type pages
  for (const quiz of QUIZ_SLUGS) {
    const path = `/quiz/${quiz}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: localeAlternates(path),
      });
    }
  }

  // Service category pages
  for (const cat of serviceCategories) {
    const path = `/services/${cat.key}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: localeAlternates(path),
      });
    }
  }

  // Individual service pages
  for (const service of services) {
    const path = `/services/${service.category}/${service.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: localeAlternates(path),
      });
    }
  }

  // Blog posts (only those already published)
  const today = now.toISOString().slice(0, 10);
  for (const post of blogPosts) {
    if (post.publishDate > today) continue;
    const path = `/resources/blog/${post.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(post.publishDate),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: localeAlternates(path),
      });
    }
  }

  return entries;
}

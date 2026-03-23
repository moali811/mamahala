import type { MetadataRoute } from 'next';
import { services, serviceCategories } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mamahala.ca';
  const locales = ['en', 'ar'];
  const now = new Date();

  const staticPages = [
    '',
    '/about',
    '/services',
    '/book-a-session',
    '/quiz',
    '/contact',
    '/resources',
    '/resources/blog',
    '/resources/programs',
    '/resources/events',
    '/resources/downloads',
    '/resources/faqs',
    '/privacy-policy',
    '/terms-of-service',
    '/booking-policy',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for both locales
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/services' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            ar: `${baseUrl}/ar${page}`,
          },
        },
      });
    }
  }

  // Service category pages
  for (const cat of serviceCategories) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${cat.key}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Individual service pages
  for (const service of services) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.category}/${service.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}

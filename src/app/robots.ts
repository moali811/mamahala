import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/dashboard',
          '/dashboard/',
          '/en/dashboard',
          '/ar/dashboard',
          '/en/quiz/results/',
          '/ar/quiz/results/',
          '/en/programs/certificate/',
          '/ar/programs/certificate/',
        ],
      },
    ],
    sitemap: 'https://mamahala.ca/sitemap.xml',
    host: 'https://mamahala.ca',
  };
}

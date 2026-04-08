/* ================================================================
   Schema.org Structured Data
   Generates JSON-LD for rich snippets in Google.
   ================================================================ */

import { BUSINESS } from '@/config/business';

const BASE_URL = 'https://mamahala.ca';
const ORG_ID = `${BASE_URL}/#organization`;
const PERSON_ID = `${BASE_URL}/#founder`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.nameAr,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo-512.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/images/logo-512.png`,
    description:
      'Professional counseling and guidance for individuals, couples, and families. Certified family counselor serving Dubai and Canada.',
    founder: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: BUSINESS.founder,
      alternateName: BUSINESS.founderAr,
      jobTitle: 'Certified Family Counselor',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yale University' },
      knowsLanguage: ['en', 'ar'],
      worksFor: { '@id': ORG_ID },
    },
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Ottawa',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
    ],
    serviceType: [
      'Family Counseling',
      'Couples Therapy',
      'Youth Counseling',
      'Life Coaching',
      'Anxiety Counseling',
      'Parenting Coaching',
    ],
    priceRange: '$$',
    openingHours: 'Mo-Sa 09:00-20:00',
    sameAs: Object.values(BUSINESS.social),
    availableLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
    ],
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  price?: number;
  currency?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: event.isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: event.isOnline
      ? { '@type': 'VirtualLocation', url: event.url }
      : { '@type': 'Place', name: event.location, address: event.location },
    organizer: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: BUSINESS.name,
      url: BASE_URL,
    },
    performer: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: BUSINESS.founder,
    },
    ...(event.price != null && {
      offers: {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: event.currency || 'CAD',
        availability: 'https://schema.org/InStock',
        url: event.url,
      },
    }),
  };
}

export function getBlogPostSchema(post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  image?: string;
  inLanguage?: string;
  keywords?: string[];
}) {
  const imageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${BASE_URL}${post.image}`
    : `${BASE_URL}/images/logo-512.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: BUSINESS.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo-512.png`,
      },
    },
    url: post.url,
    image: imageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    ...(post.inLanguage && { inLanguage: post.inLanguage }),
    ...(post.keywords?.length && { keywords: post.keywords.join(', ') }),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  category: string;
  priceFrom: number;
  currency: string;
  image?: string;
  inLanguage?: string;
}) {
  const imageUrl = service.image
    ? service.image.startsWith('http')
      ? service.image
      : `${BASE_URL}${service.image}`
    : `${BASE_URL}/images/logo-512.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    image: imageUrl,
    serviceType: service.category,
    category: service.category,
    provider: {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: BUSINESS.name,
      url: BASE_URL,
    },
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    availableLanguage: ['en', 'ar'],
    offers: {
      '@type': 'Offer',
      price: service.priceFrom,
      priceCurrency: service.currency,
      availability: 'https://schema.org/InStock',
      url: service.url,
    },
    ...(service.inLanguage && { inLanguage: service.inLanguage }),
  };
}

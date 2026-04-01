/* ================================================================
   Schema.org Structured Data
   Generates JSON-LD for rich snippets in Google.
   ================================================================ */

import { BUSINESS } from '@/config/business';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: BUSINESS.name,
    alternateName: BUSINESS.nameAr,
    url: 'https://mamahala.ca',
    logo: 'https://mamahala.ca/images/logo.png',
    description: 'Professional counseling and guidance for individuals, couples, and families. Certified family counselor serving Dubai and Canada.',
    founder: {
      '@type': 'Person',
      name: BUSINESS.founder,
      jobTitle: 'Certified Family Counselor',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yale University' },
    },
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Ottawa',
        addressCountry: 'CA',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
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
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'Arabic' },
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
      name: BUSINESS.name,
      url: 'https://mamahala.ca',
    },
    performer: {
      '@type': 'Person',
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
  author: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: 'https://mamahala.ca/images/logo.png' },
    },
    url: post.url,
    ...(post.image && { image: post.image }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
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

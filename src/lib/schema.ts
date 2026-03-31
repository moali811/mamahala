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

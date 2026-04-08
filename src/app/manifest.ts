import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mama Hala Consulting',
    short_name: 'Mama Hala',
    description:
      'Professional counseling and guidance for individuals, couples, and families. Bilingual English & Arabic support from Dr. Hala Ali.',
    start_url: '/en',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF7F2',
    theme_color: '#C4878A',
    icons: [
      {
        src: '/images/logo-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/images/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}

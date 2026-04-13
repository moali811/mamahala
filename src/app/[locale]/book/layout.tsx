import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book a Session — Mama Hala Consulting',
  description: 'Book a counseling session with Dr. Hala Ali. AI-powered service matching, real-time availability, and instant confirmation.',
  openGraph: {
    title: 'Book a Session — Mama Hala Consulting',
    description: 'Book a counseling session with Dr. Hala Ali.',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}

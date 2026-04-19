import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account — Mama Hala',
  description: 'View your upcoming sessions, past bookings, and receipts.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}

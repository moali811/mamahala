import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'MCMS',
  // Admin-specific manifest — overrides the site-wide manifest (which
  // launches /en) so the iOS "Add to Home Screen" icon opens /admin.
  manifest: '/admin/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'MCMS',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  themeColor: '#7A3B5E',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

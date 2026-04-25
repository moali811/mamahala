import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'MCMS',
  // Admin-specific manifest — overrides the site-wide manifest (which
  // launches /en) so the iOS "Add to Home Screen" icon opens /admin.
  manifest: '/admin/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'MCMS',
    statusBarStyle: 'black-translucent',
    startupImage: [
      { url: '/admin-pwa-icons/splash/apple-splash-1170x2532.png', media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/admin-pwa-icons/splash/apple-splash-1284x2778.png', media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/admin-pwa-icons/splash/apple-splash-1179x2556.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/admin-pwa-icons/splash/apple-splash-1290x2796.png', media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/admin-pwa-icons/splash/apple-splash-828x1792.png',  media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' },
    ],
  },
  icons: {
    // Apple-touch-icon must be opaque + 180x180 + no rounded corners (iOS rounds them).
    apple: '/admin-pwa-icons/apple-touch-icon-180.png',
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#7A3B5E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

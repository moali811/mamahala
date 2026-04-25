import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // X-Frame-Options is deprecated in favor of CSP frame-ancestors but still
          // honored by older clients. SAMEORIGIN allows our own /pay → Stripe iframe
          // pattern; switch to DENY only if no internal iframing is ever needed.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Lock down sensors + cross-origin features. payment is left enabled (=*)
          // so Stripe Payment Request API works. autoplay/picture-in-picture/usb/xr
          // blocked — none used.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), autoplay=(), accelerometer=(), gyroscope=(), magnetometer=(), usb=(), xr-spatial-tracking=()' },
          // Block legacy Flash/Adobe Reader cross-domain policies.
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          // Same-origin isolation for window.open + popups (defense vs Spectre,
          // tab-napping). same-origin-allow-popups would be needed if any
          // window.open() calls cross origins; we don't appear to.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // Restrict who can embed our resources cross-origin. cross-origin lets
          // CDNs and embedded assets (Stripe, GTM, GA) load resources we serve.
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://images.unsplash.com https://plus.unsplash.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://api.stripe.com https://*.vercel-insights.com; frame-src 'self' blob: https://js.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/toolkits/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Admin PWA Service Worker. Hosted at root but scoped to /admin via
        // Service-Worker-Allowed. Cache must be no-cache so updates propagate.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, max-age=0' },
          { key: 'Service-Worker-Allowed', value: '/admin' },
        ],
      },
      {
        source: '/admin-pwa-icons/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // PDF QR codes and legacy links point to /book-a-session → redirect to native /book
      {
        source: '/:locale(en|ar)/book-a-session',
        destination: '/:locale/book',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

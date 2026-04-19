/* ================================================================
   GET /admin/manifest.webmanifest
   ================================================================
   Admin-specific Web App Manifest. Overrides the root manifest
   (which points to /en) so that when Dr. Hala or Mo adds the
   Admin page to their iOS home screen, tapping the icon launches
   straight into /admin instead of the public site.

   Scoped to /admin so nothing else is affected.
   ================================================================ */

export const dynamic = 'force-static';

export function GET() {
  const manifest = {
    name: 'MCMS — Mama Hala Admin',
    short_name: 'MCMS',
    description: 'MamaHala Content Management System',
    start_url: '/admin',
    scope: '/admin',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF7F2',
    theme_color: '#7A3B5E',
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

  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

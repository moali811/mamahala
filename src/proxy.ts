/* ================================================================
   Proxy — Coming-Soon Gate
   ================================================================
   While COMING_SOON=true, all public routes are rewritten to
   /coming-soon. Admins (Mo + Dr. Hala) set the bypass cookie via
   /preview?key=<ADMIN_PASSWORD> and see the real site for 30 days.

   File lives at src/proxy.ts (Next.js 16 renamed middleware.ts).
   Runtime is Node.js (Edge is not supported in proxy files).
   ================================================================ */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BYPASS_COOKIE = 'mh_preview';

export function proxy(request: NextRequest) {
  // Gate only active when explicitly enabled.
  if (process.env.COMING_SOON !== 'true') {
    return NextResponse.next();
  }

  // Admin bypass: the /preview route sets this cookie after a
  // correct ADMIN_PASSWORD check. Presence = full site access.
  if (request.cookies.get(BYPASS_COOKIE)?.value === '1') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // ── Transactional routes always bypass the gate ──────────────
  // Real clients get these links in invoice/booking emails and MUST
  // reach them even while the site is gated. These paths are not
  // discoverable from the homepage, so leaving them open doesn't leak
  // any pre-launch content.
  //
  // Covered:
  //   /en/pay/[token], /ar/pay/[token]  — payment concierge page
  //   /en/book/manage, /ar/book/manage  — reschedule / cancel existing booking
  //
  // NOTE: /api/* and /admin* are already excluded by the matcher below.
  if (/^\/(?:en|ar)\/pay\//.test(pathname)) {
    return NextResponse.next();
  }
  if (/^\/(?:en|ar)\/book\/manage(?:\/|$|\?)/.test(pathname)) {
    return NextResponse.next();
  }

  // Detect locale from the existing path so the rewrite target
  // keeps the visitor in their preferred language.
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  // Rewrite to the standalone coming-soon page (outside [locale],
  // so it skips Header/Footer). URL stays the same for the visitor.
  const rewriteUrl = new URL('/coming-soon', request.url);
  rewriteUrl.searchParams.set('lang', lang);

  const response = NextResponse.rewrite(rewriteUrl);
  // Belt-and-suspenders: discourage any crawler that somehow
  // reaches this page from indexing the placeholder as canonical.
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  // Match all routes EXCEPT:
  // - api/*              (contact form, newsletter, health checks)
  // - _next/static, _next/image (Next.js build output)
  // - preview, preview/off (bypass entry/exit routes)
  // - coming-soon*       (target of the rewrite)
  // - admin*             (admin dashboard has its own password auth via mh_admin_key)
  // - favicon.ico, robots.txt, sitemap.xml, manifest, icon, apple-icon (metadata)
  matcher: [
    '/((?!api|_next/static|_next/image|preview|coming-soon|admin|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|icon\\.png|apple-icon\\.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf|css|js)$).*)',
  ],
};

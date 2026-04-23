/* ================================================================
   Proxy — Coming-Soon Gate + Academy Module Gate
   ================================================================
   File lives at src/proxy.ts (Next.js 16 renamed middleware.ts).
   Runtime is Node.js (Edge is not supported in proxy files).

   Two gates run on matched routes:

   1. COMING_SOON / MAINTENANCE gate
      While COMING_SOON=true or MAINTENANCE=true, all public routes
      are rewritten to /coming-soon. Admins (Mo + Dr. Hala) set the
      `mh_preview` cookie via /preview?key=<ADMIN_PASSWORD> and see
      the real site for 30 days.

   2. Academy module gate (flag: ACADEMY_GATE_ENABLED=true)
      Server-side gate for /:locale/programs/:slug/:module routes.
      Reads the `academy_session` cookie → KV session → student
      unlocked-levels and redirects unauthorized visitors back to
      /:locale/programs/:slug?signin=1. Level-1 (free) modules pass
      through for everyone. Admins and VIPs pass through always.
      Flag defaults off; flip to `true` in Vercel after smoke tests.
   ================================================================ */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';

const BYPASS_COOKIE = 'mh_preview';

// Pre-compute module → level lookup at module load time.
// { [programSlug]: { [moduleSlug]: { level: number, isFree: boolean } } }
type ModuleIndex = Record<string, Record<string, { level: number; isFree: boolean }>>;

function buildModuleIndex(): ModuleIndex {
  const programs = [
    intentionalParentProgram,
    resilientTeensProgram,
    strongerTogetherProgram,
    innerCompassProgram,
  ];
  const index: ModuleIndex = {};
  for (const p of programs) {
    const programFree = !!p.isFree;
    const modMap: Record<string, { level: number; isFree: boolean }> = {};
    for (const lvl of p.levels) {
      const levelFree = programFree || !!lvl.isFree;
      for (const m of lvl.modules) {
        modMap[m.slug] = { level: lvl.level, isFree: levelFree };
      }
    }
    index[p.slug] = modMap;
  }
  return index;
}

const MODULE_INDEX: ModuleIndex = buildModuleIndex();
const MODULE_ROUTE_RE = /^\/(en|ar)\/programs\/([^/]+)\/([^/]+)\/?$/;

async function checkAcademyAccess(
  request: NextRequest,
  programSlug: string,
  moduleLevel: number,
): Promise<{ allowed: true } | { allowed: false; reason: 'signin' | 'unavailable' }> {
  const sessionId = request.cookies.get('academy_session')?.value;
  if (!sessionId) return { allowed: false, reason: 'signin' };

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // Fail-closed with a user-visible error rather than a silent redirect
    return { allowed: false, reason: 'unavailable' };
  }

  try {
    const { kv } = await import('@vercel/kv');
    const session = (await kv.get(`academy:session:${sessionId}`)) as { email: string } | null;
    if (!session?.email) return { allowed: false, reason: 'signin' };

    const email = session.email;
    if (isAdminEmail(email) || isVipEmail(email)) return { allowed: true };

    const student = (await kv.get(`academy:student:${email}`)) as
      | { unlockedLevels?: Record<string, number[]> }
      | null;
    const unlockedLevels = student?.unlockedLevels?.[programSlug] ?? [];
    if (unlockedLevels.includes(moduleLevel)) return { allowed: true };

    return { allowed: false, reason: 'signin' };
  } catch (err) {
    console.error('[proxy] Academy gate KV error:', err);
    return { allowed: false, reason: 'unavailable' };
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. COMING_SOON / MAINTENANCE gate ─────────────────────────
  const isComingSoon = process.env.COMING_SOON === 'true';
  const isMaintenance = process.env.MAINTENANCE === 'true';
  const hasBypass = request.cookies.get(BYPASS_COOKIE)?.value === '1';

  if ((isComingSoon || isMaintenance) && !hasBypass) {
    // Transactional routes always bypass the gate (clients get these
    // links in invoice/booking emails and MUST reach them even while
    // the site is gated). Paths are not discoverable from the homepage.
    if (!/^\/(?:en|ar)\/pay\//.test(pathname) && !/^\/(?:en|ar)\/book\/manage(?:\/|$|\?)/.test(pathname)) {
      const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
      const rewriteUrl = new URL('/coming-soon', request.url);
      rewriteUrl.searchParams.set('lang', lang);
      if (isMaintenance) rewriteUrl.searchParams.set('mode', 'maintenance');
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
  }

  // ── 2. Academy module gate (flag-controlled) ──────────────────
  if (process.env.ACADEMY_GATE_ENABLED === 'true') {
    const match = MODULE_ROUTE_RE.exec(pathname);
    if (match) {
      const [, locale, programSlug, moduleSlug] = match;
      const mod = MODULE_INDEX[programSlug]?.[moduleSlug];
      // Unknown program or module → let the route handler 404; don't block
      if (mod && !mod.isFree) {
        const access = await checkAcademyAccess(request, programSlug, mod.level);
        if (!access.allowed) {
          const redirectUrl = new URL(`/${locale}/programs/${programSlug}`, request.url);
          redirectUrl.searchParams.set(access.reason === 'unavailable' ? 'error' : 'signin', '1');
          return NextResponse.redirect(redirectUrl);
        }
      }
    }
  }

  return NextResponse.next();
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

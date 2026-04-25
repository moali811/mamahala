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
import { timingSafeEqual } from 'node:crypto';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';

const BYPASS_COOKIE = 'mh_preview';
const ADMIN_AUTH_FAIL_LIMIT = 10;
const ADMIN_AUTH_WINDOW_SECONDS = 900;

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

function getClientIp(request: NextRequest): string {
  const h = request.headers;
  return (
    h.get('x-forwarded-for')?.split(',')[0].trim()
    || h.get('x-real-ip')
    || 'anonymous'
  );
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    const maxLen = Math.max(aBuf.length, bBuf.length);
    const aPad = Buffer.alloc(maxLen);
    const bPad = Buffer.alloc(maxLen);
    aBuf.copy(aPad);
    bBuf.copy(bPad);
    timingSafeEqual(aPad, bPad);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

/**
 * Pre-handler check for /api/admin/* requests. Enforces brute-force
 * protection on ADMIN_PASSWORD by tracking per-IP auth failures in KV
 * and returning 429 after 10 failures within 15 minutes. Returns null
 * if the request should proceed, or a NextResponse to short-circuit.
 *
 * Defense-in-depth: each admin route still calls `authorize()` for its
 * own check, but this gate prevents an attacker from iterating across
 * all 50+ admin routes to brute-force the password.
 */
async function gateAdminAuth(request: NextRequest): Promise<NextResponse | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null; // KV unavailable — can't enforce. Route will still authorize().
  }

  const ip = getClientIp(request);
  const failKey = `rl:admin-auth-fail:${ip}`;

  try {
    const { kv } = await import('@vercel/kv');

    // SECURITY: check the password FIRST (constant-time) so a legitimate holder
    // can always recover from a brute-force lockout. If we checked the lockout
    // first, an attacker who burned through 10 wrong attempts from a shared IP
    // (office WiFi, mobile carrier NAT, residential CG-NAT) would lock the
    // real admin out for 15 minutes — DoS by association.
    const header = request.headers.get('authorization') || '';
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return null;

    const valid = safeEqual(header, `Bearer ${adminPassword}`);
    if (valid) {
      // Reset counter on successful auth.
      try { await kv.del(failKey); } catch { /* ignore */ }
      return null;
    }

    // Wrong password — now check the lockout counter and (if not locked out)
    // increment it. timingSafeEqual above runs on every path so the wrong-then-
    // lockout path costs the same as the right-then-pass path; timing leakage
    // about which branch you took is ~zero.
    const fails = (await kv.get<number>(failKey)) || 0;
    if (fails >= ADMIN_AUTH_FAIL_LIMIT) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 },
      );
    }

    try {
      const n = await kv.incr(failKey);
      if (n === 1) await kv.expire(failKey, ADMIN_AUTH_WINDOW_SECONDS);
    } catch { /* ignore */ }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch {
    return null; // Fail open on KV errors — the route's authorize() still runs
  }
}

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

  // ── -1. Canonicalize bare Vercel URL → branded domain ─────────
  // Only the exact production host is redirected; preview deploys
  // (mama-hala-website-<hash>-<scope>.vercel.app) and any /api/* path
  // pass through untouched so webhooks (Stripe/Cal/Resend) and admin
  // API calls keep working even if something out there still points at
  // the .vercel.app URL.
  const host = request.headers.get('host')?.toLowerCase();
  if (host === 'mama-hala-website.vercel.app' && !pathname.startsWith('/api/')) {
    const target = new URL(request.url);
    target.host = 'mamahala.ca';
    target.protocol = 'https:';
    return NextResponse.redirect(target, 301);
  }

  // ── 0. Admin API brute-force gate ─────────────────────────────
  // /api/admin/* routes all check a Bearer token locally; this gate
  // adds centralized per-IP lockout so the password cannot be brute-
  // forced across 50+ admin endpoints. GET admin/booking/approve and
  // decline pass through (they're browser-navigated from emails and
  // now use a per-booking action token for auth — see route file).
  if (pathname.startsWith('/api/admin/')) {
    const isGetApprovalFlow = request.method === 'GET'
      && (pathname === '/api/admin/booking/approve' || pathname === '/api/admin/booking/decline');
    if (!isGetApprovalFlow) {
      const adminBlock = await gateAdminAuth(request);
      if (adminBlock) return adminBlock;
    }
  }

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
  // Page-route matcher: all routes EXCEPT api/*, _next/*, preview,
  // coming-soon, admin dashboard page, static assets. The admin dashboard
  // PAGE (/admin/*) is client-gated; admin API (/api/admin/*) is matched
  // separately below for centralized brute-force protection.
  matcher: [
    '/((?!api|_next/static|_next/image|preview|coming-soon|admin|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|icon\\.png|apple-icon\\.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf|css|js)$).*)',
    '/api/admin/:path*',
  ],
};

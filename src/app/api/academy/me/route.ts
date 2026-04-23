import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let kvMod: typeof import('@vercel/kv').kv | null = null;
async function getKV() {
  if (!kvMod && KV_AVAILABLE) {
    kvMod = (await import('@vercel/kv')).kv;
  }
  return kvMod;
}

interface StudentRecord {
  email: string;
  name?: string;
  enrolledPrograms?: string[];
  enrolledAt?: string;
  lastActive?: string;
  unlockedLevels?: Record<string, number[]>;
  unlockedModules?: Record<string, string[]>;
}

interface SessionRecord {
  email: string;
  createdAt?: string;
}

interface ProgressRecord {
  completedModules?: string[];
  currentModule?: string | null;
  startedAt?: string;
  lastActivity?: string;
}

/**
 * GET /api/academy/me
 *
 * Session-authoritative endpoint. Returns a consolidated view of the
 * current student: enrolled programs, unlocked levels/modules (keyed by
 * program slug), completed modules, and admin/VIP flags.
 *
 * Auth: reads `academy_session` httpOnly cookie (set by magic-link GET).
 * No session → 401 { needsLogin: true }.
 *
 * Sliding TTL: if the session is older than 24h, refresh its 7-day TTL
 * so active users aren't logged out mid-use.
 */
export async function GET() {
  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'Service unavailable', needsLogin: true }, { status: 503 });
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('academy_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ needsLogin: true }, { status: 401 });
  }

  const kv = await getKV();
  if (!kv) {
    return NextResponse.json({ error: 'Service unavailable', needsLogin: true }, { status: 503 });
  }

  const sessionKey = `academy:session:${sessionId}`;
  const session = (await kv.get(sessionKey)) as SessionRecord | null;
  if (!session?.email) {
    return NextResponse.json({ needsLogin: true }, { status: 401 });
  }

  const email = session.email;
  const admin = isAdminEmail(email);
  const vip = isVipEmail(email);

  // Sliding TTL: refresh session on activity so users don't get kicked out
  // at a hard 7-day expiry if they've been active.
  if (session.createdAt) {
    const ageMs = Date.now() - new Date(session.createdAt).getTime();
    if (ageMs > 24 * 60 * 60 * 1000) {
      await kv.set(sessionKey, { ...session, createdAt: new Date().toISOString() }, { ex: 604800 });
    }
  }

  const student = (await kv.get(`academy:student:${email}`)) as StudentRecord | null;

  // For admin/VIP with no student record, return a synthesized view. They can
  // visit any program and the server-side checks (access route, middleware)
  // will also grant access.
  if (!student) {
    if (admin || vip) {
      return NextResponse.json({
        email,
        name: '',
        enrolledPrograms: [],
        unlockedLevels: {},
        unlockedModules: {},
        completedModules: {},
        isAdmin: admin,
        isVip: vip,
        allAccess: true,
      });
    }
    return NextResponse.json({
      email,
      name: '',
      enrolledPrograms: [],
      unlockedLevels: {},
      unlockedModules: {},
      completedModules: {},
      isAdmin: false,
      isVip: false,
      allAccess: false,
    });
  }

  const enrolledPrograms = student.enrolledPrograms ?? [];

  // Pull progress for each enrolled program in parallel
  const progressEntries = await Promise.all(
    enrolledPrograms.map(async (slug) => {
      const progress = (await kv.get(`academy:progress:${email}:${slug}`)) as ProgressRecord | null;
      return [slug, progress?.completedModules ?? []] as const;
    }),
  );
  const completedModules: Record<string, string[]> = Object.fromEntries(progressEntries);

  return NextResponse.json({
    email,
    name: student.name ?? '',
    enrolledPrograms,
    unlockedLevels: student.unlockedLevels ?? {},
    unlockedModules: student.unlockedModules ?? {},
    completedModules,
    isAdmin: admin,
    isVip: vip,
    allAccess: admin || vip,
  });
}

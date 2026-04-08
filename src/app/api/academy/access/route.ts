import { NextRequest, NextResponse } from 'next/server';
import { isAdminEmail } from '@/lib/admin';

let kv: typeof import('@vercel/kv').kv | null = null;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV() {
  if (!kv && KV_AVAILABLE) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  const programSlug = req.nextUrl.searchParams.get('programSlug');
  const moduleSlug = req.nextUrl.searchParams.get('moduleSlug');
  const levelNumberParam = req.nextUrl.searchParams.get('levelNumber');
  const levelNumber = levelNumberParam ? Number(levelNumberParam) : null;

  if (!email || !programSlug) {
    return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
  }

  // Admin emails get full access to all content
  if (isAdminEmail(email)) {
    return NextResponse.json({ hasPaidAccess: true, unlockedModules: [], unlockedLevels: [1, 2, 3] });
  }

  try {
    const kvInstance = await getKV();
    if (!kvInstance) {
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentKey = `academy:student:${normalizedEmail}`;
    const student = await kvInstance.get(studentKey) as Record<string, unknown> | null;

    if (!student) {
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
    }

    const unlockedModules = ((student.unlockedModules as Record<string, string[]>) || {})[programSlug] || [];
    const unlockedLevels = ((student.unlockedLevels as Record<string, number[]>) || {})[programSlug] || [];

    // Level check
    if (levelNumber != null) {
      const isUnlocked = unlockedLevels.includes(levelNumber);
      return NextResponse.json({ hasPaidAccess: isUnlocked, unlockedModules, unlockedLevels });
    }

    // Module check
    if (moduleSlug) {
      const isUnlocked = unlockedModules.includes(moduleSlug);
      return NextResponse.json({ hasPaidAccess: isUnlocked, unlockedModules, unlockedLevels });
    }

    return NextResponse.json({
      hasPaidAccess: unlockedModules.length > 0 || unlockedLevels.length > 0,
      unlockedModules,
      unlockedLevels,
    });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
  }
}

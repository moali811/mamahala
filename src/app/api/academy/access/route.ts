import { NextRequest, NextResponse } from 'next/server';

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

  if (!email || !programSlug) {
    return NextResponse.json({ hasPaidAccess: false, unlockedModules: [] });
  }

  try {
    const kvInstance = await getKV();
    if (!kvInstance) {
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [] });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentKey = `academy:student:${normalizedEmail}`;
    const student = await kvInstance.get(studentKey) as Record<string, unknown> | null;

    if (!student) {
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [] });
    }

    // Check per-module unlocks
    const unlockedModules = ((student.unlockedModules as Record<string, string[]>) || {})[programSlug] || [];

    // If checking a specific module
    if (moduleSlug) {
      const isUnlocked = unlockedModules.includes(moduleSlug);
      return NextResponse.json({ hasPaidAccess: isUnlocked, unlockedModules });
    }

    // Return all unlocked modules for this program
    return NextResponse.json({ hasPaidAccess: unlockedModules.length > 0, unlockedModules });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ hasPaidAccess: false, unlockedModules: [] });
  }
}

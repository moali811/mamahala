import { NextRequest, NextResponse } from 'next/server';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';

let kv: typeof import('@vercel/kv').kv | null = null;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV() {
  if (!kv && KV_AVAILABLE) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

// Define the expected shape of your student data
interface StudentData {
  unlockedModules?: Record<string, string[]>;
  unlockedLevels?: Record<string, number[]>;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const rawEmail = searchParams.get('email');
  const programSlug = searchParams.get('programSlug');
  const moduleSlug = searchParams.get('moduleSlug');
  const levelNumber = searchParams.has('levelNumber') ? Number(searchParams.get('levelNumber')) : null;

  if (!rawEmail || !programSlug) {
    return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
  }

  const email = rawEmail.toLowerCase().trim();

  // Admin bypass
  if (isAdminEmail(email)) {
    return NextResponse.json({
      hasPaidAccess: true,
      unlockedModules: ['*'],
      unlockedLevels: [1, 2, 3, 4, 5],
      isAdmin: true,
    });
  }

  // VIP bypass — authoritative server-side check (replaces the removed
  // client-side localStorage bypass)
  if (isVipEmail(email)) {
    return NextResponse.json({
      hasPaidAccess: true,
      unlockedModules: ['*'],
      unlockedLevels: [1, 2, 3, 4, 5],
      isVip: true,
    });
  }

  try {
    const kvInstance = await getKV();
    if (!kvInstance) {
      console.error("KV environment variables are missing.");
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
    }

    const studentKey = `academy:student:${email}`;
    const student = await kvInstance.get<StudentData>(studentKey);

    if (!student) {
      return NextResponse.json({ hasPaidAccess: false, unlockedModules: [], unlockedLevels: [] });
    }

    // Safely extract data for the specific program
    const unlockedModules = student.unlockedModules?.[programSlug] ?? [];
    const unlockedLevels = student.unlockedLevels?.[programSlug] ?? [];

    let hasPaidAccess = false;

    if (levelNumber !== null) {
      hasPaidAccess = unlockedLevels.includes(levelNumber);
    } else if (moduleSlug) {
      hasPaidAccess = unlockedModules.includes(moduleSlug);
    } else {
      // General check: does the user have anything in this program?
      hasPaidAccess = unlockedModules.length > 0 || unlockedLevels.length > 0;
    }

    return NextResponse.json({
      hasPaidAccess,
      unlockedModules,
      unlockedLevels,
    });

  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ 
      hasPaidAccess: false, 
      unlockedModules: [], 
      unlockedLevels: [],
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}

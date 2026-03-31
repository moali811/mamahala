import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Fetch student progress for a program
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  const programSlug = request.nextUrl.searchParams.get('program');

  if (!email || !programSlug) {
    return NextResponse.json({ error: 'Email and program required' }, { status: 400 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ completedModules: [], currentModule: null });
  }

  try {
    const progressKey = `academy:progress:${email.toLowerCase()}:${programSlug}`;
    const progress = await kv.get(progressKey) as any;

    return NextResponse.json(progress || { completedModules: [], currentModule: null });
  } catch {
    return NextResponse.json({ completedModules: [], currentModule: null });
  }
}

// POST: Update progress (complete a module)
export async function POST(request: NextRequest) {
  try {
    const { email, programSlug, moduleSlug, action } = await request.json();

    if (!email || !programSlug || !moduleSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!KV_AVAILABLE) {
      return NextResponse.json({ success: true, progress: { completedModules: [moduleSlug] } });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const progressKey = `academy:progress:${normalizedEmail}:${programSlug}`;

    let progress = await kv.get(progressKey) as any;
    if (!progress) {
      progress = {
        programSlug,
        completedModules: [],
        currentModule: moduleSlug,
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      };
    }

    if (action === 'complete' && !progress.completedModules.includes(moduleSlug)) {
      progress.completedModules.push(moduleSlug);
    }
    progress.currentModule = moduleSlug;
    progress.lastActivity = new Date().toISOString();

    await kv.set(progressKey, progress);

    // Update student last active
    const studentKey = `academy:student:${normalizedEmail}`;
    const student = await kv.get(studentKey) as any;
    if (student) {
      student.lastActive = new Date().toISOString();
      await kv.set(studentKey, student);
    }

    return NextResponse.json({ success: true, progress });
  } catch (err) {
    console.error('Progress update error:', err);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

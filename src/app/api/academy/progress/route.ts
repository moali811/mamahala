import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')?.toLowerCase().trim();
  const programSlug = request.nextUrl.searchParams.get('program');

  if (!email || !programSlug) {
    return NextResponse.json({ error: 'Email and program required' }, { status: 400 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ completedModules: [], currentModule: null });
  }

  try {
    const progressKey = `academy:progress:${email}:${programSlug}`;
    const progress = await kv.get<{
      completedModules: string[];
      currentModule: string | null;
    }>(progressKey);

    return NextResponse.json(progress || { completedModules: [], currentModule: null });
  } catch (error) {
    console.error('Progress fetch error:', error);
    return NextResponse.json({ completedModules: [], currentModule: null });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, programSlug, moduleSlug, action } = await request.json();

    if (!email || !programSlug || !moduleSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    if (!KV_AVAILABLE) {
      return NextResponse.json({ success: true, mock: true });
    }

    const progressKey = `academy:progress:${normalizedEmail}:${programSlug}`;
    const now = new Date().toISOString();

    // 1. Fetch current progress
    let progress = await kv.get<any>(progressKey) || {
      programSlug,
      completedModules: [],
      startedAt: now,
    };

    // 2. Handle Action
    if (action === 'complete') {
      if (!progress.completedModules.includes(moduleSlug)) {
        progress.completedModules.push(moduleSlug);
      }
    }
    
    // Always update the last position
    progress.currentModule = moduleSlug;
    progress.lastActivity = now;

    // 3. Save Progress
    await kv.set(progressKey, progress);

    // 4. Update student heartbeat (Last Active)
    // We use "fire and forget" or a separate key to avoid blocking the response
    const studentKey = `academy:student:${normalizedEmail}`;
    const student = await kv.get<any>(studentKey);
    if (student) {
      student.lastActive = now;
      await kv.set(studentKey, student);
    }

    return NextResponse.json({ 
      success: true, 
      completedModules: progress.completedModules,
      currentModule: progress.currentModule 
    });

  } catch (err) {
    console.error('Progress update error:', err);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

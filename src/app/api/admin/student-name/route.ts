import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/** Constant-time compare that pads to a fixed length so timing isn't a function
 *  of the input length. Returns false on any mismatch (length or bytes). */
function safePasswordEqual(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  const max = Math.max(a.length, b.length);
  const aPad = Buffer.alloc(max);
  const bPad = Buffer.alloc(max);
  a.copy(aPad);
  b.copy(bPad);
  // Always run the compare to keep timing constant.
  const equal = timingSafeEqual(aPad, bPad);
  return equal && a.length === b.length;
}

/**
 * POST /api/admin/student-name
 * Updates a student's display name in KV and regenerates any existing certificates.
 *
 * Body: { email, name, password }
 * Optional: { programSlug } — if provided, only updates that program's certificate
 */
export async function POST(req: NextRequest) {
  try {
    const { email, name, password, programSlug } = await req.json();

    if (!ADMIN_PASSWORD || typeof password !== 'string' || !safePasswordEqual(password, ADMIN_PASSWORD)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    if (!KV_AVAILABLE) {
      return NextResponse.json({ error: 'KV not available' }, { status: 500 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const studentKey = `academy:student:${normalizedEmail}`;

    // Update student record name
    const student = (await kv.get(studentKey)) as Record<string, unknown> | null;
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    student.name = name.trim();
    await kv.set(studentKey, student);

    // Update any existing certificates for this student
    const updatedCerts: string[] = [];
    const programs = programSlug
      ? [programSlug]
      : (student.enrolledPrograms as string[]) || [];

    for (const prog of programs) {
      const certKey = `academy:certificate:${normalizedEmail}:${prog}`;
      const cert = (await kv.get(certKey)) as Record<string, unknown> | null;
      if (cert) {
        cert.studentName = name.trim();
        await kv.set(certKey, cert);

        // Also update the certId-based lookup
        if (cert.certId) {
          const certByIdKey = `academy:certificate:${cert.certId}`;
          const certById = (await kv.get(certByIdKey)) as Record<string, unknown> | null;
          if (certById) {
            certById.studentName = name.trim();
            await kv.set(certByIdKey, certById);
          }
        }

        updatedCerts.push(prog);
      }
    }

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      name: name.trim(),
      updatedCerts,
      message: `Name updated to "${name.trim()}". ${updatedCerts.length} certificate(s) refreshed.`,
    });
  } catch (error) {
    console.error('Admin student-name error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

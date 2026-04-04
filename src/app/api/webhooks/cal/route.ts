import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

let kv: typeof import('@vercel/kv').kv | null = null;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV() {
  if (!kv && KV_AVAILABLE) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

function verifySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}

// Map Cal.com event slugs back to program slugs
const CAL_SLUG_TO_PROGRAM: Record<string, string> = {
  'academy-intentional-parent': 'intentional-parent',
  'academy-resilient-teens': 'resilient-teens',
  'academy-stronger-together': 'stronger-together',
  'academy-inner-compass': 'inner-compass',
};

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Verify webhook signature if secret is configured
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers.get('x-cal-signature-256');
    if (!verifySignature(body, signature, secret)) {
      console.error('Cal.com webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let event: { triggerEvent: string; payload: Record<string, unknown> };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Only process paid bookings
  if (event.triggerEvent !== 'BOOKING_PAID' && event.triggerEvent !== 'BOOKING_CREATED') {
    return NextResponse.json({ received: true, skipped: true });
  }

  const payload = event.payload;
  const paid = payload.paid === true || event.triggerEvent === 'BOOKING_PAID';

  if (!paid) {
    return NextResponse.json({ received: true, skipped: true, reason: 'not paid' });
  }

  // Extract student email from attendees
  const attendees = (payload.attendees || []) as { email: string; name?: string }[];
  const studentEmail = attendees[0]?.email?.toLowerCase()?.trim();

  if (!studentEmail) {
    console.error('Cal.com webhook: no attendee email found');
    return NextResponse.json({ error: 'No attendee email' }, { status: 400 });
  }

  // Determine program from event type slug or title
  const eventTypeSlug = (payload.eventType as string) || '';
  const eventTitle = (payload.title as string) || '';
  const bookingNotes = (payload.responses as Record<string, unknown>)?.notes as string || '';

  let programSlug: string | null = null;

  // Try matching from event type slug
  for (const [calSlug, progSlug] of Object.entries(CAL_SLUG_TO_PROGRAM)) {
    if (eventTypeSlug.includes(calSlug) || eventTitle.toLowerCase().includes(calSlug)) {
      programSlug = progSlug;
      break;
    }
  }

  // Fallback: try extracting from booking notes (we prefill notes with program info)
  if (!programSlug && bookingNotes) {
    for (const [calSlug, progSlug] of Object.entries(CAL_SLUG_TO_PROGRAM)) {
      if (bookingNotes.includes(progSlug)) {
        programSlug = progSlug;
        break;
      }
    }
  }

  if (!programSlug) {
    console.error('Cal.com webhook: could not determine program from payload', { eventTypeSlug, eventTitle });
    return NextResponse.json({ error: 'Could not determine program' }, { status: 400 });
  }

  // Extract module slug from notes (we prefill: "Program: X | Module: Y")
  let moduleSlug: string | null = null;
  const moduleMatch = bookingNotes.match(/Module:\s*([a-z0-9-]+)/i);
  if (moduleMatch) {
    moduleSlug = moduleMatch[1];
  }

  // Store the unlock in Vercel KV
  try {
    const kvInstance = await getKV();
    if (kvInstance) {
      // Store per-module unlock
      if (moduleSlug) {
        const unlockKey = `academy:paid:${programSlug}:${moduleSlug}:${studentEmail}`;
        await kvInstance.set(unlockKey, {
          paid: true,
          paidAt: new Date().toISOString(),
          amount: payload.price || payload.paymentAmount,
          currency: payload.currency || 'cad',
        });
      }

      // Also store in student record
      const studentKey = `academy:student:${studentEmail}`;
      const student = await kvInstance.get(studentKey) as Record<string, unknown> | null;
      if (student) {
        const unlockedModules = (student.unlockedModules as Record<string, string[]>) || {};
        if (!unlockedModules[programSlug]) {
          unlockedModules[programSlug] = [];
        }
        if (moduleSlug && !unlockedModules[programSlug].includes(moduleSlug)) {
          unlockedModules[programSlug].push(moduleSlug);
        }
        student.unlockedModules = unlockedModules;
        student.lastPayment = {
          programSlug,
          moduleSlug,
          date: new Date().toISOString(),
        };
        await kvInstance.set(studentKey, student);
      }
    }
  } catch (error) {
    console.error('Cal.com webhook: KV storage error', error);
  }

  // Send confirmation email
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Mama Hala Academy <academy@mamahala.ca>',
        to: studentEmail,
        subject: 'Module Unlocked — Payment Confirmed!',
        html: `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
            <h1 style="color: #7A3B5E; font-size: 24px;">Module Unlocked!</h1>
            <p style="color: #4A4A5C; line-height: 1.6;">Your payment of $9 CAD has been confirmed. Your next module is now unlocked and ready for you.</p>
            <p style="color: #4A4A5C; line-height: 1.6;">Log in with your email to continue learning.</p>
            <a href="https://mama-hala-website.vercel.app/en/programs/${programSlug}" style="display: inline-block; background: #7A3B5E; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Continue Learning</a>
            <p style="color: #8E8E9F; font-size: 12px; margin-top: 30px;">— Dr. Hala & the Mama Hala Team</p>
          </div>
        `,
      });
    } catch { /* email send failed, not critical */ }
  }

  console.log(`Cal.com webhook: unlocked ${programSlug}/${moduleSlug} for ${studentEmail}`);
  return NextResponse.json({ received: true, unlocked: true, programSlug, moduleSlug });
}

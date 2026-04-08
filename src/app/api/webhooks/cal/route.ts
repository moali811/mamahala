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
// New: tier-based slugs (academy-growth, academy-mastery) — program extracted from notes
// Legacy: per-program slugs kept for backward compatibility with existing bookings
const CAL_SLUG_TO_PROGRAM: Record<string, string> = {
  'academy-intentional-parent': 'intentional-parent',
  'academy-resilient-teens': 'resilient-teens',
  'academy-stronger-together': 'stronger-together',
  'academy-inner-compass': 'inner-compass',
};

// All known program slugs for notes-based extraction
const KNOWN_PROGRAMS = [
  'intentional-parent', 'resilient-teens', 'stronger-together', 'inner-compass',
];

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

  // Try matching from event type slug (legacy per-program slugs)
  for (const [calSlug, progSlug] of Object.entries(CAL_SLUG_TO_PROGRAM)) {
    if (eventTypeSlug.includes(calSlug) || eventTitle.toLowerCase().includes(calSlug)) {
      programSlug = progSlug;
      break;
    }
  }

  // For tier-based slugs (academy-growth, academy-mastery) or as fallback,
  // extract program from booking notes: "Program: The Intentional Parent | Level: 2 (growth)"
  if (!programSlug && bookingNotes) {
    // Try "Program: <title>" pattern — match against known program title keywords
    const programMatch = bookingNotes.match(/Program:\s*(.+?)\s*\|/i);
    if (programMatch) {
      const titleSnippet = programMatch[1].toLowerCase();
      for (const slug of KNOWN_PROGRAMS) {
        // Match e.g. "intentional parent" in "The Intentional Parent"
        const words = slug.replace(/-/g, ' ');
        if (titleSnippet.includes(words)) {
          programSlug = slug;
          break;
        }
      }
    }
    // Fallback: try direct slug match in notes
    if (!programSlug) {
      for (const slug of KNOWN_PROGRAMS) {
        if (bookingNotes.includes(slug)) {
          programSlug = slug;
          break;
        }
      }
    }
  }

  if (!programSlug) {
    console.error('Cal.com webhook: could not determine program from payload', { eventTypeSlug, eventTitle });
    return NextResponse.json({ error: 'Could not determine program' }, { status: 400 });
  }

  // Extract level number or module slug from notes
  // New format: "Program: X | Level: N"
  // Legacy format: "Program: X | Module: Y"
  let moduleSlug: string | null = null;
  let levelNumber: number | null = null;
  const levelMatch = bookingNotes.match(/Level:\s*(\d+)/i);
  if (levelMatch) {
    levelNumber = Number(levelMatch[1]);
  }
  const moduleMatch = bookingNotes.match(/Module:\s*([a-z0-9-]+)/i);
  if (moduleMatch) {
    moduleSlug = moduleMatch[1];
  }

  // Store the unlock in Vercel KV
  try {
    const kvInstance = await getKV();
    if (kvInstance) {
      if (levelNumber != null) {
        const unlockKey = `academy:paid:${programSlug}:level-${levelNumber}:${studentEmail}`;
        await kvInstance.set(unlockKey, {
          paid: true,
          paidAt: new Date().toISOString(),
          amount: payload.price || payload.paymentAmount,
          currency: payload.currency || 'cad',
        });
      }
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
        if (levelNumber != null) {
          const unlockedLevels = (student.unlockedLevels as Record<string, number[]>) || {};
          if (!unlockedLevels[programSlug]) unlockedLevels[programSlug] = [];
          if (!unlockedLevels[programSlug].includes(levelNumber)) {
            unlockedLevels[programSlug].push(levelNumber);
          }
          student.unlockedLevels = unlockedLevels;
        }
        if (moduleSlug) {
          const unlockedModules = (student.unlockedModules as Record<string, string[]>) || {};
          if (!unlockedModules[programSlug]) unlockedModules[programSlug] = [];
          if (!unlockedModules[programSlug].includes(moduleSlug)) {
            unlockedModules[programSlug].push(moduleSlug);
          }
          student.unlockedModules = unlockedModules;
        }
        student.lastPayment = {
          programSlug,
          levelNumber,
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
        subject: levelNumber != null ? `Level ${levelNumber} Unlocked — Payment Confirmed!` : 'Module Unlocked — Payment Confirmed!',
        html: `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
            <h1 style="color: #7A3B5E; font-size: 24px;">${levelNumber != null ? `Level ${levelNumber} Unlocked!` : 'Module Unlocked!'}</h1>
            <p style="color: #4A4A5C; line-height: 1.6;">Your payment has been confirmed. ${levelNumber != null ? `All modules in Level ${levelNumber}` : 'Your next module'} are now unlocked and ready for you.</p>
            <p style="color: #4A4A5C; line-height: 1.6;">Log in with your email to continue learning.</p>
            <a href="https://mamahala.ca/en/programs/${programSlug}" style="display: inline-block; background: #7A3B5E; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Continue Learning</a>
            <p style="color: #8E8E9F; font-size: 12px; margin-top: 30px;">— Dr. Hala & the Mama Hala Team</p>
          </div>
        `,
      });
    } catch { /* email send failed, not critical */ }
  }

  console.log(`Cal.com webhook: unlocked ${programSlug}/${levelNumber != null ? 'level-' + levelNumber : moduleSlug} for ${studentEmail}`);
  return NextResponse.json({ received: true, unlocked: true, programSlug, levelNumber, moduleSlug });
}

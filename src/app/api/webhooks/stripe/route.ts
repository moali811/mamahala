import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';
import type { AcademyProgram } from '@/types';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';
import { buildAccessGrantedEmail, sendAcademyEmail } from '@/lib/academy/emails';

export const dynamic = 'force-dynamic';

const PROGRAMS_BY_SLUG: Record<string, AcademyProgram> = {
  [intentionalParentProgram.slug]: intentionalParentProgram,
  [resilientTeensProgram.slug]: resilientTeensProgram,
  [strongerTogetherProgram.slug]: strongerTogetherProgram,
  [innerCompassProgram.slug]: innerCompassProgram,
};

function getPaidLevels(slug: string): number[] {
  const p = PROGRAMS_BY_SLUG[slug];
  if (!p || p.isFree) return [];
  return p.levels.filter(l => !l.isFree).map(l => l.level);
}

let kv: typeof import('@vercel/kv').kv | null = null;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV() {
  if (!kv && KV_AVAILABLE) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('PLACEHOLDER')) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const stripe = getStripe();

  // Verify webhook signature. Fail-closed: if the signing secret is missing we
  // refuse to process the event rather than trusting the body, otherwise an
  // attacker could forge checkout.session.completed events to unlock paid
  // content and mark invoices paid. The dev-mode "parse and trust" path that
  // lived here previously was a security hole.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured — refusing unsigned event');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 401 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Only process completed checkout sessions
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, skipped: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true, skipped: true, reason: 'not paid' });
  }

  // Idempotency: Stripe retries on 5xx and may deliver the same event twice.
  // Dedup by event.id with a 24h window so retries land as no-ops.
  const kvForDedup = await getKV();
  if (kvForDedup) {
    const dedupeKey = `stripe:event:${event.id}`;
    const firstSeen = await kvForDedup.set(dedupeKey, 1, { ex: 86400, nx: true });
    if (!firstSeen) {
      return NextResponse.json({ received: true, duplicate: true });
    }
  }

  const meta = session.metadata || {};

  // ─── Invoice payment handling ──────────────────────────────
  if (meta.type === 'invoice' && meta.invoiceId) {
    try {
      const { getInvoiceRecord, saveInvoiceRecord } = await import('@/lib/invoicing/kv-store');
      const { getSettings } = await import('@/lib/invoicing/kv-store');
      const { sendReceiptEmail } = await import('@/lib/invoicing/email-sender');
      const { generateReceiptPdf } = await import('@/lib/invoicing/receipt-pdf');

      const invoice = await getInvoiceRecord(meta.invoiceId);
      if (invoice && invoice.status !== 'paid') {
        const now = new Date().toISOString();
        invoice.status = 'paid';
        invoice.paidAt = now;
        invoice.paymentMethod = 'stripe';
        invoice.updatedAt = now;
        await saveInvoiceRecord(invoice);

        // Persist Stripe payment refs onto the originating Booking so the
        // cancel/reschedule routes can issue partial refunds. Falls through
        // silently for legacy bookings or non-booking invoices — no
        // bookingId in metadata means nothing to wire up.
        const bookingId = meta.bookingId || invoice.draft?.sourceBookingId;
        if (bookingId) {
          try {
            const { updateBooking } = await import('@/lib/booking/booking-store');
            const paymentIntentId = typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id;
            const amountTotal = session.amount_total ?? null;
            await updateBooking(bookingId, {
              stripeCheckoutSessionId: session.id,
              ...(paymentIntentId ? { stripePaymentIntentId: paymentIntentId } : {}),
              paidAt: now,
              ...(amountTotal != null ? { paidAmountCents: amountTotal } : {}),
              paidCurrency: (session.currency || 'cad').toUpperCase(),
              paymentMethod: 'stripe',
            });
          } catch (bookingLinkErr) {
            console.error('[Stripe Webhook] Failed to persist payment refs on booking:', bookingLinkErr);
          }
        }

        // Send receipt email
        try {
          const settings = await getSettings();
          const receiptPdf = await generateReceiptPdf({ invoice, paymentMethod: 'Stripe', paidAt: now }, settings);
          await sendReceiptEmail(invoice, receiptPdf, 'stripe', now, settings);
        } catch (emailErr) {
          console.error('Stripe webhook: receipt email failed:', emailErr);
        }

        // Push to admin devices — closes the revenue loop on Mo's iPhone.
        // Fire-and-forget; never block the webhook on push delivery.
        try {
          const { dispatchToAllAdmins } = await import('@/lib/push/dispatch');
          const totalLocal = invoice.breakdown?.totalLocal ?? 0;
          const ccy = invoice.breakdown?.displayCurrency ?? 'CAD';
          const amount = new Intl.NumberFormat('en-CA', { style: 'currency', currency: ccy }).format(totalLocal);
          dispatchToAllAdmins({
            title: 'Payment received 💸',
            body: `${invoice.draft?.client?.name ?? 'A client'} paid ${amount} (${invoice.invoiceNumber})`,
            url: `/admin?tab=invoices&invoice=${invoice.invoiceId}`,
            tag: `invoice-paid-${invoice.invoiceId}`,
            data: { kind: 'invoice-paid', invoiceId: invoice.invoiceId },
          }).catch((err) => console.error('[Stripe Webhook] push dispatch failed:', err));
        } catch (pushErr) {
          console.error('[Stripe Webhook] push dispatch import failed:', pushErr);
        }

        console.log(`[Stripe Webhook] Invoice ${meta.invoiceNumber} marked as paid`);
      }
    } catch (invoiceErr) {
      console.error('Stripe webhook: invoice payment processing failed:', invoiceErr);
    }
    return NextResponse.json({ received: true, success: true, type: 'invoice' });
  }

  // ─── Toolkit payment handling ───────────────────────────────
  if (meta.type === 'toolkit' && meta.toolkitSlug) {
    const toolkitEmail = (meta.email || session.customer_email || '').toLowerCase().trim();
    try {
      const kvInstance = await getKV();
      if (kvInstance) {
        await kvInstance.set(`toolkit:paid:${meta.toolkitSlug}:${toolkitEmail}`, {
          paid: true,
          paidAt: new Date().toISOString(),
          amount: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency || 'cad',
          stripeSessionId: session.id,
        });
      }
    } catch (err) {
      console.error('[Stripe Webhook] Toolkit KV error:', err);
    }

    // Send confirmation email
    if (process.env.RESEND_API_KEY && toolkitEmail) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Mama Hala <toolkits@mamahala.ca>',
          to: toolkitEmail,
          subject: 'Toolkit Unlocked — Payment Confirmed!',
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <h1 style="${emailStyles.heading}">Your Toolkit Is Unlocked!</h1>
              <p style="${emailStyles.text}">Your payment has been confirmed. Your premium toolkit is now fully unlocked — every section, every exercise, forever yours.</p>
              <div style="text-align:center;margin:24px 0 8px;">
                <a href="https://mamahala.ca/en/resources/toolkits/${meta.toolkitSlug}" style="${emailStyles.button}">Open Your Toolkit</a>
              </div>
              <p style="${emailStyles.muted};margin-top:16px;">— The Mama Hala Team</p>
            </div>
          `),
        });
      } catch { /* email send failure is non-critical */ }
    }

    console.log(`[Stripe Webhook] Toolkit ${meta.toolkitSlug} unlocked for ${toolkitEmail}`);
    return NextResponse.json({ received: true, success: true, type: 'toolkit' });
  }

  // ─── Academy payment handling ─────────────────────────────
  const programSlug = meta.programSlug;
  const levelNumber = meta.levelNumber ? Number(meta.levelNumber) : null;
  const studentEmail = (meta.email || session.customer_email || '').toLowerCase().trim();
  const tier = typeof meta.tier === 'string' ? meta.tier : null;

  if (!programSlug || !studentEmail) {
    console.error('Stripe webhook: missing programSlug or email in metadata', meta);
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  // Full-access tier unlocks every paid (non-free) level of the program.
  // Legacy single-level payments fall back to just `levelNumber`.
  const levelsToUnlock = tier === 'fullAccess'
    ? getPaidLevels(programSlug)
    : (levelNumber != null ? [levelNumber] : []);

  if (levelsToUnlock.length === 0) {
    console.warn('[Stripe Webhook] Academy payment with no unlockable levels', { programSlug, tier, levelNumber });
  }

  // Store the unlock in Vercel KV (same format as Cal.com webhook for compatibility)
  try {
    const kvInstance = await getKV();
    if (kvInstance) {
      // Attribute the full amount to exactly ONE level record (the primary,
      // lowest-numbered paid level). The rest get amount:null so the admin
      // Resources dashboard doesn't double-count a single fullAccess payment
      // as $41 × number-of-levels.
      const primaryLevel = levelsToUnlock[0];
      const paidAt = new Date().toISOString();
      const amount = session.amount_total ? session.amount_total / 100 : null;
      const currency = session.currency || 'cad';
      for (const n of levelsToUnlock) {
        const unlockKey = `academy:paid:${programSlug}:level-${n}:${studentEmail}`;
        await kvInstance.set(unlockKey, {
          paid: true,
          paidAt,
          amount: n === primaryLevel ? amount : null,
          currency,
          stripeSessionId: session.id,
          tier,
        });
      }

      // Update student record
      const studentKey = `academy:student:${studentEmail}`;
      const student = (await kvInstance.get(studentKey) as Record<string, unknown>) || {};

      if (levelsToUnlock.length > 0) {
        const unlockedLevels = (student.unlockedLevels as Record<string, number[]>) || {};
        unlockedLevels[programSlug] = Array.from(new Set([
          ...(unlockedLevels[programSlug] || []),
          ...levelsToUnlock,
        ])).sort((a, b) => a - b);
        student.unlockedLevels = unlockedLevels;
      }

      student.lastPayment = {
        programSlug,
        levelNumber,
        tier,
        unlockedLevels: levelsToUnlock,
        date: new Date().toISOString(),
        stripeSessionId: session.id,
      };

      await kvInstance.set(studentKey, student);
    }
  } catch (error) {
    console.error('Stripe webhook: KV storage error', error);
  }

  // Send confirmation email via the shared academy email system —
  // respects opt-out, dedupes per idempotency key, matches the voice
  // used by the follow-up cron.
  const program = PROGRAMS_BY_SLUG[programSlug];
  if (program && levelsToUnlock.length > 0) {
    try {
      const nextModuleSlug = program.levels[0]?.modules[0]?.slug ?? null;
      const built = buildAccessGrantedEmail({
        email: studentEmail,
        program,
        unlockedLevels: levelsToUnlock,
        nextModuleSlug,
      });
      await sendAcademyEmail(built, studentEmail, { force: true });
    } catch {
      /* email send failure is non-critical */
    }
  }

  return NextResponse.json({ received: true, success: true });
}

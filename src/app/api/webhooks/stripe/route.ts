import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

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

  // Verify webhook signature if secret is configured
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  if (webhookSecret) {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 401 });
    }
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Stripe webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } else {
    // No webhook secret configured — parse event directly (dev mode)
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
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

        // Send receipt email
        try {
          const settings = await getSettings();
          const receiptPdf = await generateReceiptPdf({ invoice, paymentMethod: 'Stripe', paidAt: now }, settings);
          await sendReceiptEmail(invoice, receiptPdf, 'stripe', now, settings);
        } catch (emailErr) {
          console.error('Stripe webhook: receipt email failed:', emailErr);
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

  if (!programSlug || !studentEmail) {
    console.error('Stripe webhook: missing programSlug or email in metadata', meta);
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  // Store the unlock in Vercel KV (same format as Cal.com webhook for compatibility)
  try {
    const kvInstance = await getKV();
    if (kvInstance) {
      if (levelNumber != null) {
        const unlockKey = `academy:paid:${programSlug}:level-${levelNumber}:${studentEmail}`;
        await kvInstance.set(unlockKey, {
          paid: true,
          paidAt: new Date().toISOString(),
          amount: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency || 'cad',
          stripeSessionId: session.id,
        });
      }

      // Update student record
      const studentKey = `academy:student:${studentEmail}`;
      const student = (await kvInstance.get(studentKey) as Record<string, unknown>) || {};

      if (levelNumber != null) {
        const unlockedLevels = (student.unlockedLevels as Record<string, number[]>) || {};
        if (!unlockedLevels[programSlug]) unlockedLevels[programSlug] = [];
        if (!unlockedLevels[programSlug].includes(levelNumber)) {
          unlockedLevels[programSlug].push(levelNumber);
        }
        student.unlockedLevels = unlockedLevels;
      }

      student.lastPayment = {
        programSlug,
        levelNumber,
        date: new Date().toISOString(),
        stripeSessionId: session.id,
      };

      await kvInstance.set(studentKey, student);
    }
  } catch (error) {
    console.error('Stripe webhook: KV storage error', error);
  }

  // Send confirmation email
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const programTitle = meta.programTitle || programSlug;
      await resend.emails.send({
        from: 'Mama Hala Academy <academy@mamahala.ca>',
        to: studentEmail,
        subject: levelNumber != null
          ? `Level ${levelNumber} Unlocked — Payment Confirmed!`
          : 'Payment Confirmed!',
        html: emailWrapper(`
          <div style="${emailStyles.card}">
            <h1 style="${emailStyles.heading}">${levelNumber != null ? `Level ${levelNumber} Unlocked!` : 'Payment Confirmed!'}</h1>
            <p style="${emailStyles.text}">Your payment for <strong>${programTitle}</strong> has been confirmed. ${levelNumber != null ? `All modules in Level ${levelNumber}` : 'Your content'} are now unlocked and ready for you.</p>
            <p style="${emailStyles.text}">Log in with your email to continue learning.</p>
            <div style="text-align:center;margin:24px 0 8px;">
              <a href="https://mamahala.ca/en/programs/${programSlug}" style="${emailStyles.button}">Continue Learning</a>
            </div>
            <p style="${emailStyles.muted};margin-top:16px;">— The Mama Hala Team</p>
          </div>
        `),
      });
    } catch { /* email send failure is non-critical */ }
  }

  return NextResponse.json({ received: true, success: true });
}

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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

  // ─── Academy/Toolkit payment handling ──────────────────────
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
        html: `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
            <h1 style="color: #7A3B5E; font-size: 24px;">${levelNumber != null ? `Level ${levelNumber} Unlocked!` : 'Payment Confirmed!'}</h1>
            <p style="color: #4A4A5C; line-height: 1.6;">Your payment for <strong>${programTitle}</strong> has been confirmed. ${levelNumber != null ? `All modules in Level ${levelNumber}` : 'Your content'} are now unlocked and ready for you.</p>
            <p style="color: #4A4A5C; line-height: 1.6;">Log in with your email to continue learning.</p>
            <a href="https://mamahala.ca/en/programs/${programSlug}" style="display: inline-block; background: #7A3B5E; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Continue Learning</a>
            <p style="color: #8E8E9F; font-size: 12px; margin-top: 30px;">— Dr. Hala & the Mama Hala Team</p>
          </div>
        `,
      });
    } catch { /* email send failure is non-critical */ }
  }

  return NextResponse.json({ received: true, success: true });
}

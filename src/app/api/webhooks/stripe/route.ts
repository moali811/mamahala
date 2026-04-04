import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getStripe() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require('stripe').default;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
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

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  const stripe = getStripe();
  let event: { type: string; data: { object: Record<string, unknown> } };

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Record<string, unknown>;
    const metadata = (session.metadata || {}) as Record<string, string>;
    const { programSlug, email } = metadata;

    if (programSlug && email) {
      try {
        const kvInstance = await getKV();
        if (kvInstance) {
          const normalizedEmail = email.toLowerCase().trim();
          const studentKey = `academy:student:${normalizedEmail}`;
          const student = await kvInstance.get(studentKey) as Record<string, unknown> | null;

          if (student) {
            const paidPrograms = (student.paidPrograms as string[]) || [];
            if (!paidPrograms.includes(programSlug)) {
              paidPrograms.push(programSlug);
              student.paidPrograms = paidPrograms;
              student.lastPayment = {
                programSlug,
                amount: session.amount_total as number,
                currency: session.currency as string,
                date: new Date().toISOString(),
                stripeSessionId: session.id as string,
              };
              await kvInstance.set(studentKey, student);
            }
          }

          // Send confirmation email via Resend
          if (process.env.RESEND_API_KEY) {
            try {
              const { Resend } = await import('resend');
              const resend = new Resend(process.env.RESEND_API_KEY);
              await resend.emails.send({
                from: 'Mama Hala Academy <academy@mamahala.ca>',
                to: normalizedEmail,
                subject: 'Payment Confirmed — Full Access Unlocked!',
                html: `
                  <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px;">
                    <h1 style="color: #7A3B5E; font-size: 24px;">Welcome to Full Access!</h1>
                    <p style="color: #4A4A5C; line-height: 1.6;">Your payment has been confirmed. You now have full access to all levels of the program.</p>
                    <p style="color: #4A4A5C; line-height: 1.6;">Log in with your email to start exploring the advanced modules.</p>
                    <p style="color: #8E8E9F; font-size: 12px; margin-top: 30px;">— Dr. Hala & the Mama Hala Team</p>
                  </div>
                `,
              });
            } catch { /* email send failed, not critical */ }
          }
        }
      } catch (error) {
        console.error('Webhook processing error:', error);
      }
    }
  }

  return NextResponse.json({ received: true });
}

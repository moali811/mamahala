import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductPricing } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('PLACEHOLDER')) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

/**
 * POST — Create a Stripe Checkout Session for toolkit purchase
 * Body: { toolkitSlug, toolkitTitle, email, locale }
 */
export async function POST(req: NextRequest) {
  try {
    const { toolkitSlug, toolkitTitle, email, locale } = await req.json();

    if (!toolkitSlug) {
      return NextResponse.json({ error: 'Missing toolkitSlug' }, { status: 400 });
    }

    const stripe = getStripe();
    const { toolkitFullAccessPrice } = await getProductPricing();

    const origin = req.headers.get('origin') || 'https://mamahala.ca';
    const loc = locale || 'en';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            unit_amount: Math.round(toolkitFullAccessPrice * 100), // Stripe uses cents
            product_data: {
              name: toolkitTitle || 'Mama Hala Toolkit — Full Premium Access',
              description: 'One-time payment · lifetime access · no subscription',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'toolkit',
        toolkitSlug,
        email: (email || '').toLowerCase().trim(),
      },
      success_url: `${origin}/${loc}/resources/toolkits/unlock-success?slug=${toolkitSlug}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${loc}/resources/toolkits/${toolkitSlug}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[Toolkit Checkout] Stripe error:', error);
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET — Verify a completed Stripe Checkout Session
 * Query: ?session_id=cs_xxx
 */
export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return NextResponse.json({
        paid: true,
        toolkitSlug: session.metadata?.toolkitSlug,
        email: session.metadata?.email,
      });
    }

    return NextResponse.json({ paid: false });
  } catch (error) {
    console.error('[Toolkit Checkout] Session verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

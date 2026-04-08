import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { BUSINESS } from '@/config/business';

export const dynamic = 'force-dynamic';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('PLACEHOLDER')) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

/**
 * POST — Create a Stripe Checkout Session for academy level unlock
 * Body: { programSlug, programTitle, levelNumber, email, locale }
 */
export async function POST(req: NextRequest) {
  try {
    const { programSlug, programTitle, levelNumber, email, locale } = await req.json();

    if (!programSlug || !levelNumber || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stripe = getStripe();

    // Determine price based on level tier
    const tier = levelNumber === 2 ? 'growth' : 'mastery';
    const priceCAD = levelNumber === 2
      ? BUSINESS.academyLevelPrices.growth
      : BUSINESS.academyLevelPrices.mastery;

    const origin = req.headers.get('origin') || 'https://mamahala.ca';
    const loc = locale || 'en';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            unit_amount: priceCAD * 100, // Stripe uses cents
            product_data: {
              name: `${programTitle} — Level ${levelNumber} (${tier === 'growth' ? 'Growth' : 'Mastery'})`,
              description: `Lifetime access to all Level ${levelNumber} modules`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        programSlug,
        programTitle,
        levelNumber: String(levelNumber),
        tier,
        email: email.toLowerCase().trim(),
      },
      success_url: `${origin}/${loc}/programs/${programSlug}?payment=success&session_id={CHECKOUT_SESSION_ID}&level=${levelNumber}`,
      cancel_url: `${origin}/${loc}/programs/${programSlug}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
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
        programSlug: session.metadata?.programSlug,
        levelNumber: session.metadata?.levelNumber ? Number(session.metadata.levelNumber) : null,
        email: session.metadata?.email,
      });
    }

    return NextResponse.json({ paid: false });
  } catch (error) {
    console.error('Stripe session verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

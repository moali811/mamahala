import { NextRequest, NextResponse } from 'next/server';
import { programCatalog } from '@/data/programs/index';

export const dynamic = 'force-dynamic';

function getStripe() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require('stripe').default;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const { email, programSlug, locale = 'en' } = await req.json();

    if (!email || !programSlug) {
      return NextResponse.json({ error: 'Missing email or programSlug' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured. Contact admin.' }, { status: 500 });
    }

    // Find program in catalog
    const program = programCatalog.find(p => p.slug === programSlug);
    if (!program || !program.priceCAD) {
      return NextResponse.json({ error: 'Program not found or no price' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: locale === 'ar' ? program.titleAr : program.titleEn,
              description: locale === 'ar'
                ? `${program.totalModules} وحدة تعليمية · شهادة إتمام`
                : `${program.totalModules} modules · Completion certificate`,
            },
            unit_amount: program.priceCAD * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        programSlug,
        email,
      },
      success_url: `${baseUrl}/${locale}/programs/${programSlug}?payment=success`,
      cancel_url: `${baseUrl}/${locale}/programs/${programSlug}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

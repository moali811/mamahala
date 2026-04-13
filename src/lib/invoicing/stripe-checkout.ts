/* ================================================================
   Stripe Checkout — Dynamic session per invoice
   ================================================================
   Creates a Stripe Checkout Session with the exact invoice amount
   so clients pay the localized price, not a fixed CAD amount.
   ================================================================ */

import Stripe from 'stripe';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('PLACEHOLDER')) return null;
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

/**
 * Create a Stripe Checkout Session for a specific invoice.
 * Returns the checkout URL, or null if Stripe is not configured.
 *
 * Amount is always charged in CAD (Stripe settles in account currency).
 * The invoice's local currency display is informational only.
 */
export async function createInvoiceCheckoutSession(opts: {
  invoiceId: string;
  invoiceNumber: string;
  clientEmail: string;
  clientName: string;
  serviceName: string;
  totalCAD: number;
  displayTotal: string;
  displayCurrency: string;
}): Promise<string | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const amountCents = Math.round(opts.totalCAD * 100);
  if (amountCents <= 0) return null; // free sessions don't need Stripe

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: opts.clientEmail,
    line_items: [
      {
        price_data: {
          currency: 'cad',
          unit_amount: amountCents,
          product_data: {
            name: `${opts.serviceName} — Invoice ${opts.invoiceNumber}`,
            description: opts.displayCurrency !== 'CAD'
              ? `${opts.displayTotal} (≈ CA$${opts.totalCAD.toFixed(2)})`
              : undefined,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: 'invoice',
      invoiceId: opts.invoiceId,
      invoiceNumber: opts.invoiceNumber,
      clientEmail: opts.clientEmail,
      clientName: opts.clientName,
    },
    payment_intent_data: {
      description: `Invoice ${opts.invoiceNumber} — ${opts.serviceName}`,
    },
    success_url: `${SITE_URL}/en/book/manage?payment=success&invoice=${opts.invoiceNumber}`,
    cancel_url: `${SITE_URL}/en/book/manage?payment=cancelled`,
  });

  return session.url;
}

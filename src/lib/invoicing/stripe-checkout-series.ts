/* ================================================================
   Stripe Checkout — Self-Serve Series Prepay (mode='payment')
   ================================================================
   Wraps the standard Checkout Session for the bundled-series prepay
   flow. We mark metadata.kind='series-prepay' so the webhook handler
   can route the success event into activateSeriesFromAnchor() instead
   of the per-invoice payment flow.

   We do NOT use Stripe Subscriptions — this is a one-shot full-amount
   capture (matches the existing 3-tier payment approach).
   ================================================================ */

import { getStripeClient } from './stripe-checkout';
import { SITE_URL } from '@/lib/site-url';

export interface CreateSeriesPrepayOpts {
  /** The recurring series ID. */
  seriesId: string;
  /** The anchor booking ID — used by the webhook to activate siblings. */
  anchorBookingId: string;
  /** Total amount in CAD (Stripe charges in account currency). */
  totalCAD: number;
  /** Display amount the client sees in their region. */
  displayTotal: string;
  /** Display currency (CAD / AED / USD). */
  displayCurrency: string;
  /** Number of sessions in the series — surfaced in the line item description. */
  totalSessions: number;
  /** Service name for the line item label. */
  serviceName: string;
  clientEmail: string;
  clientName: string;
  /** Locale for the success/cancel return URLs. */
  locale?: 'en' | 'ar';
}

export async function createSeriesPrepayCheckoutSession(
  opts: CreateSeriesPrepayOpts,
): Promise<string | null> {
  const stripe = getStripeClient();
  if (!stripe) return null;

  const amountCents = Math.round(opts.totalCAD * 100);
  if (amountCents <= 0) return null;

  const locale = opts.locale ?? 'en';

  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      customer_email: opts.clientEmail,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            unit_amount: amountCents,
            product_data: {
              name: `${opts.serviceName} — ${opts.totalSessions}-session series`,
              description:
                opts.displayCurrency !== 'CAD'
                  ? `${opts.displayTotal} (≈ CA$${opts.totalCAD.toFixed(2)}) — paid in full upfront`
                  : 'Paid in full upfront',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        kind: 'series-prepay',
        seriesId: opts.seriesId,
        anchorBookingId: opts.anchorBookingId,
        clientEmail: opts.clientEmail,
        clientName: opts.clientName,
        totalSessions: String(opts.totalSessions),
      },
      payment_intent_data: {
        description: `${opts.totalSessions}-session series prepay (${opts.seriesId})`,
        metadata: {
          kind: 'series-prepay',
          seriesId: opts.seriesId,
          anchorBookingId: opts.anchorBookingId,
        },
      },
      success_url: `${SITE_URL}/${locale}/account?series_prepay=success&series=${opts.seriesId}`,
      cancel_url: `${SITE_URL}/${locale}/book?series_prepay=cancelled`,
    },
    {
      // Idempotency key on seriesId means a duplicated POST from a
      // double-clicked confirm button reuses the same Stripe session
      // instead of creating two — clients see one billable charge.
      idempotencyKey: `series-prepay:${opts.seriesId}`,
    },
  );

  return session.url;
}

/* ================================================================
   Stripe Checkout — 3-tier payment URL resolution
   ================================================================
   Tier 1: Dynamic Stripe Checkout Session (requires STRIPE_SECRET_KEY).
           Creates a session with the exact invoice amount so the client
           pays the localized price, not a fixed CAD amount.
   Tier 2: Per-invoice Stripe Payment Link pasted by the admin. Works
           without a secret key — the admin creates a one-time Payment
           Link in the Stripe dashboard and stores it on the draft.
   Tier 3: Null → the payment concierge page at /pay/{token} shows
           non-Stripe methods only (e-Transfer, wire, PayPal).

   The email/PDF always link to /pay/{token} (the concierge page), which
   then routes to the best available Tier at click time.
   ================================================================ */

import Stripe from 'stripe';
import type { StoredInvoice, InvoiceSettings } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

/**
 * Return a configured Stripe client, or null if the secret key is
 * missing or still a placeholder.
 *
 * Exported so callers can detect the "no secret key" situation without
 * guessing based on undefined URLs.
 */
export function getStripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (key.includes('PLACEHOLDER') || key.includes('REPLACE_ME')) return null;
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

/**
 * True when the dynamic-session path is available (Tier 1).
 * Exported so the admin UI can show a warning chip when Tier 1 is down.
 */
export function isStripeSessionAvailable(): boolean {
  return getStripeClient() !== null;
}

/**
 * Create a Stripe Checkout Session for a specific invoice (Tier 1).
 * Returns the checkout URL, or null if the Stripe client is not configured.
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
  const stripe = getStripeClient();
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

/**
 * Resolve the best available card-payment URL for a stored invoice.
 *
 * Tier 1 → `stripeCheckoutUrl` (dynamic session, exact amount pre-filled)
 * Tier 2 → `draft.stripePaymentLink` (per-invoice admin override)
 * Tier 3 → `settings.defaultStripePaymentLink` (global fallback)
 * Tier 4 → null (no card payment available — concierge shows e-Transfer/wire/PayPal only)
 *
 * Used by the payment concierge page to decide which button to show for
 * "Pay with Card". The email/PDF always link to /pay/{token}, which calls
 * this at click time — so switching between tiers requires no resend.
 */
export function resolveCardPayUrl(
  invoice: StoredInvoice,
  settings?: InvoiceSettings,
): string | null {
  if (invoice.stripeCheckoutUrl) return invoice.stripeCheckoutUrl;
  if (invoice.draft.stripePaymentLink) return invoice.draft.stripePaymentLink;
  if (settings?.defaultStripePaymentLink?.trim()) {
    return settings.defaultStripePaymentLink.trim();
  }
  return null;
}

/**
 * Build the public payment concierge URL for an invoice.
 * Always returns a URL — the concierge page handles the empty-card-url case
 * gracefully by only showing e-Transfer / wire / PayPal buttons.
 */
export function buildPaymentConciergeUrl(
  invoice: StoredInvoice,
  locale: 'en' | 'ar' = 'en',
): string {
  const token = invoice.paymentToken || invoice.invoiceId;
  return `${SITE_URL}/${locale}/pay/${token}`;
}

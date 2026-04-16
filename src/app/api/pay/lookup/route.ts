/* ================================================================
   GET /api/pay/lookup?token=XXX
   ================================================================
   Public endpoint (no auth) used by the payment concierge page
   (/[locale]/pay/[token]) to fetch invoice display data from a
   public payment token.

   Returns a MINIMAL projection of the invoice — never the full
   StoredInvoice with admin notes, breakdown math, or internal IDs.
   The token is a UUID indexed in KV by `saveInvoiceRecord`.

   Security note: Tokens are UUIDs, 122-bit entropy. Anyone with
   the link can see the amount, service name, and invoice number —
   the same info that's already in the emailed invoice. No PII
   beyond the client's own name.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { getInvoiceByPaymentToken } from '@/lib/invoicing/kv-store';
import { getSettings } from '@/lib/invoicing/kv-store';
import { services } from '@/data/services';
import { resolveCardPayUrl } from '@/lib/invoicing/stripe-checkout';
import { BUSINESS } from '@/config/business';

export interface PayConciergeData {
  invoiceNumber: string;
  clientName: string;
  serviceName: string;
  amount: {
    formatted: string;       // "€89" or "AED 500"
    formattedCAD: string;    // "CA$150" (always shown for reference)
    currency: string;        // ISO-4217 code
    amount: number;          // raw amount in displayCurrency
  };
  dueDate: string;           // ISO timestamp
  status: string;            // 'sent' | 'paid' | 'void' | ...
  countryISO2: string;       // e.g. 'CA', 'AE'

  /** URL for the "Pay with Card" button — null when no Stripe tier works. */
  cardPayUrl: string | null;

  /** True when cardPayUrl is a dynamic Checkout Session (Tier 1) — amount pre-filled, no manual entry. */
  cardPayIsCheckoutSession: boolean;

  /** e-Transfer details — only set for Canadian invoices with allowETransfer. */
  eTransfer: {
    email: string;
    instructions: string;
  } | null;

  /** Wire transfer instructions — from admin settings. */
  wire: {
    instructions: string;
  } | null;

  /** PayPal link — from admin settings. */
  paypalLink: string | null;

  /** Business contact for "need help?" */
  contact: {
    email: string;
    phone: string;
    whatsappUrl: string;
  };
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const invoice = await getInvoiceByPaymentToken(token);
  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  // Void/cancelled invoices should not display a payment page
  if (invoice.status === 'void') {
    return NextResponse.json(
      { error: 'This invoice has been voided' },
      { status: 410 },
    );
  }

  const settings = await getSettings();
  const service = services.find((s) => s.slug === invoice.draft.serviceSlug);
  const bd = invoice.breakdown;
  const country = invoice.draft.client.country.toUpperCase();
  const isCA = country === 'CA';

  const data: PayConciergeData = {
    invoiceNumber: invoice.invoiceNumber,
    clientName: invoice.draft.client.name,
    serviceName: service?.name ?? invoice.draft.serviceSlug,
    amount: {
      formatted: bd.formattedTotal,
      formattedCAD: bd.formattedTotalCAD,
      currency: bd.displayCurrency,
      amount: bd.totalLocal,
    },
    dueDate: invoice.dueDate,
    status: invoice.status,
    countryISO2: country,
    cardPayUrl: resolveCardPayUrl(invoice, settings),
    cardPayIsCheckoutSession: !!invoice.stripeCheckoutUrl,
    eTransfer:
      isCA && invoice.draft.allowETransfer
        ? {
            email: settings.eTransferEmail || 'admin@mamahala.ca',
            instructions: `Auto-deposit is enabled — no security question needed. Please reference ${invoice.invoiceNumber} in the memo.`,
          }
        : null,
    wire:
      !isCA && settings.wireInstructions && settings.wireInstructions.trim()
        ? { instructions: settings.wireInstructions }
        : null,
    paypalLink:
      !isCA && settings.paypalLink && settings.paypalLink.trim()
        ? settings.paypalLink.trim()
        : null,
    contact: {
      email: settings.issuerBlock.email || BUSINESS.email,
      phone: settings.issuerBlock.phone || BUSINESS.phone,
      whatsappUrl: BUSINESS.whatsappUrl,
    },
  };

  return NextResponse.json(data, {
    headers: {
      // Short cache — admin might edit the draft.stripePaymentLink or
      // mark the invoice paid. 30s is enough to dedup the rare case
      // where a client hits refresh a few times.
      'Cache-Control': 'public, max-age=30, s-maxage=30',
    },
  });
}

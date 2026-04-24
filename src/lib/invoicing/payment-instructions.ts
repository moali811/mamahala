/* ================================================================
   Payment Instructions Builder — Region-aware primary/secondary
   ================================================================
   Returns one PRIMARY payment method (the clear headline) and an
   optional array of SECONDARY methods, so the PDF and email
   templates can render a single dominant call-to-action without
   drowning the client in choices.

   Selection logic:
     - Canadian clients (country === 'CA'):
         primary = Interac e-Transfer (locked on at the intake stage)
         secondary = []                // nothing else to show
     - International clients:
         primary = Stripe link > wire > PayPal > contact fallback
         secondary = []                // we pick one and commit

   This replaces the old 4-option "Dr. Hala can arrange any of these
   payment methods…" fallback that Mo flagged as redundant. When an
   international client has no configured Stripe/wire/PayPal, we
   now show a single contact-block instead of a wall of options.

   The primary/secondary shape is kept so callers can re-introduce
   multi-method scenarios later (e.g., "primary: Stripe; secondary:
   wire") without a schema change. Today's code pins secondary = [].
   ================================================================ */

import type { StoredInvoice, InvoiceSettings } from './types';

export type PaymentMethodKind =
  | 'etransfer'
  | 'stripe'
  | 'wire'
  | 'paypal'
  | 'contact';

export interface PaymentMethodBlock {
  kind: PaymentMethodKind;
  heading: string;
  /** Plain-text body lines (for both PDF and email rendering). */
  bodyLines: string[];
  /** Optional CTA link (e.g. Stripe Payment Link, PayPal.me URL). */
  linkUrl?: string;
  /** Label for the CTA button when `linkUrl` is present. */
  linkLabel?: string;
}

export interface PaymentInstructionsResult {
  primary: PaymentMethodBlock;
  /**
   * Additional methods to display below the primary block.
   * Typically empty under the new region-aware logic. Retained as
   * an array so future callers can bolt on multi-method scenarios
   * without a type change.
   */
  secondary: PaymentMethodBlock[];
  region: 'CA' | 'INTL';
}

/**
 * Legacy export — older callers import `PaymentMethodBlock` directly
 * without knowing about the new wrapper. Kept as a type alias so the
 * old imports don't break during the rollout.
 */
export type { PaymentMethodBlock as PaymentBlock };

/**
 * Build the region-aware payment instructions for an invoice.
 *
 * This replaces the old multi-block builder. Calls that expect an
 * array should use `[result.primary, ...result.secondary]` to get a
 * flat list.
 */
export function buildPaymentInstructions(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): PaymentInstructionsResult {
  const country = invoice.draft.client.country.toUpperCase();
  const region: 'CA' | 'INTL' = country === 'CA' ? 'CA' : 'INTL';

  if (region === 'CA') {
    return {
      region,
      primary: buildETransferBlock(invoice, settings),
      secondary: [],
    };
  }

  // International cascade: Stripe > wire > PayPal > contact fallback
  if (hasStripeLink(invoice)) {
    return {
      region,
      primary: buildStripeBlock(invoice),
      secondary: [],
    };
  }

  if (hasWireDetails(settings)) {
    return {
      region,
      primary: buildWireBlock(settings),
      secondary: [],
    };
  }

  if (hasPaypalLink(settings)) {
    return {
      region,
      primary: buildPaypalBlock(settings),
      secondary: [],
    };
  }

  return {
    region,
    primary: buildContactBlock(invoice, settings),
    secondary: [],
  };
}

// ─── Block Builders ─────────────────────────────────────────────

function buildETransferBlock(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): PaymentMethodBlock {
  // NOTE: PDF uses jspdf with Windows-1252 encoding — em-dash (U+2014)
  // is not supported. Use ASCII hyphen-minus (-) for PDF lines so the
  // email HTML can use em-dashes freely but the PDF stays clean.
  return {
    kind: 'etransfer',
    heading: 'Interac e-Transfer (within Canada)',
    bodyLines: [
      `Send to: ${settings.eTransferEmail}`,
      'Auto-deposit is enabled - no security question needed.',
      `Please reference: ${invoice.invoiceNumber}`,
    ],
  };
}

function buildStripeBlock(invoice: StoredInvoice): PaymentMethodBlock {
  const link = invoice.draft.stripePaymentLink!;
  return {
    kind: 'stripe',
    heading: 'Pay by credit card',
    bodyLines: [
      'Secure checkout via Stripe.',
      `Reference: ${invoice.invoiceNumber}`,
    ],
    linkUrl: link,
    linkLabel: 'Pay now',
  };
}

function buildWireBlock(settings: InvoiceSettings): PaymentMethodBlock {
  // Caller (`hasWireDetails`) already verified this is non-empty —
  // fallback to empty string is unreachable but keeps TS happy.
  const wireText = settings.wireInstructions ?? '';
  return {
    kind: 'wire',
    heading: 'International wire transfer',
    bodyLines: wireText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean),
  };
}

function buildPaypalBlock(settings: InvoiceSettings): PaymentMethodBlock {
  return {
    kind: 'paypal',
    heading: 'Pay by PayPal',
    bodyLines: ['Use the link below to complete payment.'],
    linkUrl: settings.paypalLink ?? undefined,
    linkLabel: 'Open PayPal',
  };
}

function buildContactBlock(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): PaymentMethodBlock {
  return {
    kind: 'contact',
    heading: 'Arrange Payment',
    bodyLines: [
      `Please reply to this invoice email to arrange payment.`,
      `Email: ${settings.issuerBlock.email}`,
      settings.issuerBlock.phone ? `Phone: ${settings.issuerBlock.phone}` : '',
      `Reference: ${invoice.invoiceNumber}`,
    ].filter(Boolean),
  };
}

// ─── Availability Predicates ────────────────────────────────────

function hasStripeLink(invoice: StoredInvoice): boolean {
  return !!invoice.draft.stripePaymentLink && invoice.draft.stripePaymentLink.trim().length > 0;
}

function hasWireDetails(settings: InvoiceSettings): boolean {
  return !!settings.wireInstructions && settings.wireInstructions.trim().length > 0;
}

function hasPaypalLink(settings: InvoiceSettings): boolean {
  return !!settings.paypalLink && settings.paypalLink.trim().length > 0;
}

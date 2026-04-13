/* ================================================================
   Payment Instructions Builder
   ================================================================
   Builds the payment-methods block that appears in the PDF footer
   and the email body. Returns structured data so both renderers
   can style it consistently.
   ================================================================ */

import type { StoredInvoice, InvoiceSettings } from './types';

export interface PaymentMethodBlock {
  kind: 'e-transfer' | 'wire' | 'paypal';
  heading: string;
  lines: string[];
}

/**
 * Build a list of payment method blocks appropriate for the client's
 * country + the composer's settings + the draft's e-Transfer toggle.
 */
export function buildPaymentInstructions(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): PaymentMethodBlock[] {
  const blocks: PaymentMethodBlock[] = [];
  const country = invoice.draft.client.country.toUpperCase();
  const isCA = country === 'CA';

  // Canadian e-Transfer block
  // NOTE: PDF uses jspdf with Windows-1252 encoding — em-dash (U+2014) is
  // not supported. Use ASCII hyphen-minus (-) instead so the PDF renders
  // cleanly. The email HTML version can use em-dashes freely.
  if (isCA && invoice.draft.allowETransfer) {
    blocks.push({
      kind: 'e-transfer',
      heading: 'Canadian clients - Interac e-Transfer',
      lines: [
        `Send to: ${settings.eTransferEmail}`,
        'Auto-deposit is enabled - no security question needed.',
        `Please reference: ${invoice.invoiceNumber}`,
      ],
    });
  }

  // International wire block (always shown for non-CA, optional for CA if configured)
  if (!isCA && settings.wireInstructions && settings.wireInstructions.trim()) {
    blocks.push({
      kind: 'wire',
      heading: 'International wire transfer',
      lines: settings.wireInstructions
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    });
  }

  // PayPal block (always shown for non-CA if configured)
  if (!isCA && settings.paypalLink && settings.paypalLink.trim()) {
    blocks.push({
      kind: 'paypal',
      heading: 'PayPal',
      lines: [settings.paypalLink.trim()],
    });
  }

  // Fallback: when neither wire nor PayPal is configured for an international
  // client (and they're not Canadian), show a richer multi-option block so
  // the invoice doesn't look thin or confusing.
  if (blocks.length === 0) {
    blocks.push({
      kind: 'wire',
      heading: 'Payment Options',
      lines: [
        'Dr. Hala can arrange any of these payment methods for this invoice:',
        '• Interac e-Transfer (Canadian clients)',
        '• International wire transfer',
        '• PayPal',
        '• Credit card via secure link',
        '',
        'Please reply to this invoice email or contact us directly to confirm',
        'your preferred method.',
        '',
        `Contact: ${settings.issuerBlock.email} | ${settings.issuerBlock.phone}`,
        `Reference: ${invoice.invoiceNumber}`,
      ],
    });
  }

  return blocks;
}

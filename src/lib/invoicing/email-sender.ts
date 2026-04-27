/* ================================================================
   Email Sender — Resend with PDF attachment
   ================================================================
   Uses shared branded wrapper with logo header + footer.
   Attaches the generated PDF as base64.
   ================================================================ */

import type { StoredInvoice, InvoiceSettings } from './types';
import { formatPrice } from '@/lib/smart-round';
import { services } from '@/data/services';
import { buildPaymentInstructions } from './payment-instructions';
import { BUSINESS } from '@/config/business';
import { emailWrapper } from '@/lib/email/shared-email-components';
import { buildPaymentConciergeUrl } from './stripe-checkout';
import { emailCopy, type EmailLocale } from '@/lib/booking/email-copy';

/** All admin emails that should receive BCC copies of invoices/receipts. */
const ADMIN_BCC = BUSINESS.adminEmails;

function formatDate(iso: string, locale: EmailLocale = 'en'): string {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildInvoiceEmailHtml(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): string {
  const locale: EmailLocale = invoice.draft.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale).invoiceEmail;
  const client = invoice.draft.client;
  const bd = invoice.breakdown;
  const service = services.find((s) => s.slug === invoice.draft.serviceSlug);
  const serviceName = service?.name ?? invoice.draft.serviceSlug;

  const paymentResult = buildPaymentInstructions(invoice, settings);
  const allBlocks = [paymentResult.primary, ...paymentResult.secondary];
  const renderBlock = (b: typeof paymentResult.primary, isPrimary: boolean) => {
    const lines = b.bodyLines
      .map(
        (l) =>
          `<p style="margin:0 0 4px;color:#4A4A5C;font-size:13px;line-height:1.6;">${escapeHtml(l)}</p>`,
      )
      .join('');
    const cta = b.linkUrl && b.linkLabel
      ? `<p style="margin:10px 0 0;"><a href="${escapeHtml(b.linkUrl)}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">${escapeHtml(b.linkLabel)}</a></p>`
      : '';
    const accent = isPrimary ? '#3B8A6E' : '#C8A97D';
    const bg = isPrimary ? '#F0FAF5' : 'white';
    return `
        <div style="margin-bottom:12px;padding:16px;background:${bg};border-radius:10px;border-left:3px solid ${accent};">
          <p style="margin:0 0 8px;color:#7A3B5E;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(b.heading)}</p>
          ${lines}
          ${cta}
        </div>`;
  };
  const blocksHtml = allBlocks.map((b, i) => renderBlock(b, i === 0)).join('');

  const valueAlign = locale === 'ar' ? 'left' : 'right';

  const innerContent = `
      <!-- Greeting -->
      <div style="padding:4px 0 16px;">
        <p style="margin:0 0 12px;color:#2D2A33;font-size:15px;">${t.greeting(escapeHtml(client.name))}</p>
        <p style="margin:0 0 12px;color:#4A4A5C;font-size:14px;line-height:1.7;">${t.thanks(escapeHtml(serviceName))}</p>
      </div>

      ${
        invoice.draft.subject && invoice.draft.subject.trim()
          ? `
      <!-- Subject / session note -->
      <div style="margin:0 0 16px;padding:14px 16px;background:white;border-left:3px solid #C8A97D;border-radius:8px;">
        <p style="margin:0 0 4px;color:#C8A97D;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${t.subjectLabel}</p>
        <p style="margin:0;color:#2D2A33;font-size:14px;font-style:italic;line-height:1.6;">${escapeHtml(invoice.draft.subject.trim())}</p>
      </div>
      `
          : ''
      }

      <!-- Invoice summary card -->
      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #EDE8DF;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.invoiceNumberLabel}</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;font-weight:600;text-align:${valueAlign};">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.issueDateLabel}</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;text-align:${valueAlign};">${formatDate(invoice.issuedAt, locale)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.dueDateLabel}</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;text-align:${valueAlign};">${formatDate(invoice.dueDate, locale)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0 8px;border-top:1px solid #F3EFE8;color:#7A3B5E;font-size:13px;font-weight:600;">${t.amountDueLabel}</td>
            <td style="padding:12px 0 8px;border-top:1px solid #F3EFE8;color:#7A3B5E;font-size:18px;font-weight:700;text-align:${valueAlign};">${formatPrice(bd.totalLocal, bd.displayCurrency)}</td>
          </tr>
          ${
            bd.displayCurrency !== 'CAD'
              ? `<tr><td></td><td style="padding:0;color:#8E8E9F;font-size:11px;font-style:italic;text-align:${valueAlign};">${t.equivalentSuffix(formatPrice(bd.totalCAD, 'CAD'))}</td></tr>`
              : ''
          }
        </table>
      </div>

      ${(() => {
        if (paymentResult.region === 'CA') {
          return `
      <!-- Pay by Interac e-Transfer (CA hero — fee-free, primary) -->
      <div style="background:#F0FAF5;border-radius:16px;padding:24px;margin-bottom:20px;">
        <p style="margin:0 0 4px;color:#3B8A6E;font-size:14px;font-weight:700;text-align:center;">${t.payCAHeading}</p>
        <p style="margin:0 0 16px;color:#4A4A5C;font-size:13px;text-align:center;line-height:1.6;">${t.payCAPrompt(escapeHtml(bd.formattedTotal))}</p>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:10px;margin-bottom:14px;">
          <tr>
            <td style="padding:10px 14px;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:38%;">${t.payCASendToLabel}</td>
            <td style="padding:10px 14px;color:#2D2A33;font-size:14px;font-weight:600;font-family:monospace;">${escapeHtml(settings.eTransferEmail || settings.issuerBlock.email || 'admin@mamahala.ca')}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.payCAReferenceLabel}</td>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#2D2A33;font-size:14px;font-weight:600;font-family:monospace;">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
        </table>
        <p style="margin:0;text-align:center;">
          <a href="${buildPaymentConciergeUrl(invoice)}" style="display:inline-block;padding:10px 28px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">${t.payCta(escapeHtml(bd.formattedTotal))}</a>
        </p>
        ${invoice.stripeCheckoutUrl ? `
        <p style="margin:14px 0 0;font-size:11px;color:#8E8E9F;text-align:center;">
          <a href="${buildPaymentConciergeUrl(invoice)}" style="color:#7A3B5E;text-decoration:underline;">${t.payCACardOptionLink}</a>
        </p>` : ''}
      </div>`;
        }
        if (paymentResult.region === 'GULF' && settings.gulfBank?.iban) {
          const gb = settings.gulfBank;
          const ccy = gb.currency || 'AED';
          // Optional details rendered inline since email clients don't support <details>
          const extraRows = [
            gb.accountNumber ? `<tr><td style="padding:8px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:10px;text-transform:uppercase;letter-spacing:1px;">Account #</td><td style="padding:8px 14px;border-top:1px solid #F3EFE8;color:#4A4A5C;font-size:12px;font-family:monospace;" dir="ltr">${escapeHtml(gb.accountNumber)}</td></tr>` : '',
            gb.swift ? `<tr><td style="padding:8px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:10px;text-transform:uppercase;letter-spacing:1px;">SWIFT</td><td style="padding:8px 14px;border-top:1px solid #F3EFE8;color:#4A4A5C;font-size:12px;font-family:monospace;" dir="ltr">${escapeHtml(gb.swift)}</td></tr>` : '',
          ].join('');
          return `
      <!-- Pay by local bank transfer (Gulf hero — fee-free, primary) -->
      <div style="background:#F0FAF5;border-radius:16px;padding:24px;margin-bottom:20px;">
        <p style="margin:0 0 4px;color:#3B8A6E;font-size:14px;font-weight:700;text-align:center;">${t.payGulfHeading}</p>
        <p style="margin:0 0 16px;color:#4A4A5C;font-size:13px;text-align:center;line-height:1.6;">${t.payGulfPrompt(escapeHtml(bd.formattedTotal), escapeHtml(ccy))}</p>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:10px;margin-bottom:14px;">
          <tr>
            <td style="padding:10px 14px;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:38%;">${t.payGulfBankLabel}</td>
            <td style="padding:10px 14px;color:#2D2A33;font-size:14px;font-weight:600;">${escapeHtml(gb.bankName)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.payGulfAccountNameLabel}</td>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#2D2A33;font-size:14px;font-weight:600;">${escapeHtml(gb.accountName)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.payGulfIbanLabel}</td>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#2D2A33;font-size:14px;font-weight:600;font-family:monospace;" dir="ltr">${escapeHtml(gb.iban)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.payGulfReferenceLabel}</td>
            <td style="padding:10px 14px;border-top:1px solid #F3EFE8;color:#2D2A33;font-size:14px;font-weight:600;font-family:monospace;">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
          ${extraRows}
        </table>
        <p style="margin:0;text-align:center;">
          <a href="${buildPaymentConciergeUrl(invoice)}" style="display:inline-block;padding:10px 28px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">${t.payCta(escapeHtml(bd.formattedTotal))}</a>
        </p>
        ${invoice.stripeCheckoutUrl ? `
        <p style="margin:14px 0 0;font-size:11px;color:#8E8E9F;text-align:center;">
          <a href="${buildPaymentConciergeUrl(invoice)}" style="color:#7A3B5E;text-decoration:underline;">${t.payCACardOptionLink}</a>
        </p>` : ''}
      </div>`;
        }
        return `
      <!-- Pay Online (international — Stripe primary) -->
      <div style="background:#F0FAF5;border-radius:16px;padding:24px;margin-bottom:20px;text-align:center;">
        <p style="margin:0 0 4px;color:#3B8A6E;font-size:14px;font-weight:700;">${t.payOnlineHeading}</p>
        <p style="margin:0 0 16px;color:#4A4A5C;font-size:13px;">${t.payOnlinePrompt(escapeHtml(bd.formattedTotal), !!invoice.stripeCheckoutUrl)}</p>
        <a href="${invoice.stripeCheckoutUrl || buildPaymentConciergeUrl(invoice)}" style="display:inline-block;padding:16px 48px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:0.3px;">${t.payCta(escapeHtml(bd.formattedTotal))}</a>
        ${invoice.stripeCheckoutUrl ? `
        <p style="margin:14px 0 0;font-size:11px;color:#8E8E9F;">${t.otherPaymentPrompt} <a href="${buildPaymentConciergeUrl(invoice)}" style="color:#7A3B5E;text-decoration:underline;">${t.otherPaymentLink}</a></p>` : ''}
      </div>

      <!-- Other payment methods (international) -->
      <div style="margin-bottom:20px;">
        <p style="margin:0 0 12px;color:#8E8E9F;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">${t.otherPaymentMethodsHeading}</p>
        ${blocksHtml}
      </div>`;
      })()}

      <!-- PDF reminder -->
      <div style="padding:14px;background:#F3EFE8;border-radius:8px;margin-bottom:20px;">
        <p style="margin:0;color:#4A4A5C;font-size:13px;line-height:1.6;">${t.pdfReminder}</p>
      </div>

      <!-- Closing -->
      <p style="margin:20px 0 8px;color:#4A4A5C;font-size:14px;line-height:1.7;">${t.closing(escapeHtml(settings.issuerBlock.email))}</p>

      <p style="margin:16px 0 0;color:#2D2A33;font-size:14px;">${t.signoff}<br><strong>${t.team}</strong></p>`;

  return emailWrapper(innerContent, { locale });
}

/**
 * Detect the synthetic "no-email" placeholder we generate for Zoho-imported
 * customers that had no email in their original record. These must never
 * receive real emails — the admin must add a real email first.
 */
function isSyntheticEmail(email: string): boolean {
  return email.toLowerCase().endsWith('@no-email.mamahala.local');
}

/**
 * Send an invoice email via Resend with the PDF attached.
 * Returns the Resend message ID on success.
 * Throws on failure — caller should catch and surface to the admin UI.
 */
export async function sendInvoiceEmail(
  invoice: StoredInvoice,
  pdfBuffer: Buffer,
  settings: InvoiceSettings,
  options?: { customSubject?: string; customHtml?: string },
): Promise<{ messageId: string }> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const client = invoice.draft.client;

  // Block synthetic emails (from Zoho import of customers without an email)
  if (isSyntheticEmail(client.email)) {
    throw new Error(
      'This client has no email on file. Add a real email address to their customer profile before sending.',
    );
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const businessName = settings.businessName || 'Mama Hala Consulting Group';
  // Use verified Resend domain. Once mamahala.ca DNS is verified, switch to admin@mamahala.ca
  const fromAddress = process.env.RESEND_FROM_EMAIL || `${businessName} <onboarding@resend.dev>`;
  // BCC all admin emails so everyone receives a copy (fixes missing invoice emails)
  const bccList = [...new Set([...ADMIN_BCC, settings.issuerBlock.email])];
  const locale: EmailLocale = invoice.draft.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale).invoiceEmail;

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: client.email,
    bcc: bccList,
    replyTo: settings.issuerBlock.email,
    subject:
      options?.customSubject ??
      t.subject(invoice.invoiceNumber, businessName),
    html: options?.customHtml ?? buildInvoiceEmailHtml(invoice, settings),
    attachments: [
      {
        filename: `${invoice.invoiceNumber}.pdf`,
        content: pdfBuffer.toString('base64'),
      },
    ],
  });

  if (error) {
    const errDetail = (error as any).message || (error as any).name || JSON.stringify(error);
    throw new Error(`Resend error: ${errDetail}`);
  }

  return { messageId: data?.id ?? '' };
}

/**
 * Send a receipt email — celebratory copy + receipt PDF attachment.
 * Auto-fired by the mark-paid route.
 */
export async function sendReceiptEmail(
  invoice: StoredInvoice,
  receiptPdfBuffer: Buffer,
  paymentMethod: string,
  paidAt: string,
  settings: InvoiceSettings,
): Promise<{ messageId: string }> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const client = invoice.draft.client;

  // Block synthetic emails (from Zoho import of customers without an email)
  if (isSyntheticEmail(client.email)) {
    throw new Error(
      'This client has no email on file. Add a real email address to their customer profile before sending.',
    );
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const businessName = settings.businessName || 'Mama Hala Consulting Group';
  // Use verified Resend domain. Once mamahala.ca DNS is verified, switch to admin@mamahala.ca
  const fromAddress = process.env.RESEND_FROM_EMAIL || `${businessName} <onboarding@resend.dev>`;
  // BCC all admin emails so everyone receives a copy
  const bccList = [...new Set([...ADMIN_BCC, settings.issuerBlock.email])];
  const locale: EmailLocale = invoice.draft.preferredLanguage === 'ar' ? 'ar' : 'en';
  const rt = emailCopy(locale).receipt;

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: client.email,
    bcc: bccList,
    replyTo: settings.issuerBlock.email,
    subject: rt.subject(invoice.invoiceNumber, businessName),
    html: buildReceiptEmailHtml(invoice, paymentMethod, paidAt, settings),
    attachments: [
      {
        filename: `Receipt-${invoice.invoiceNumber}.pdf`,
        content: receiptPdfBuffer.toString('base64'),
      },
    ],
  });

  if (error) {
    const errDetail = (error as any).message || (error as any).name || JSON.stringify(error);
    throw new Error(`Resend error: ${errDetail}`);
  }

  return { messageId: data?.id ?? '' };
}

function buildReceiptEmailHtml(
  invoice: StoredInvoice,
  paymentMethod: string,
  paidAt: string,
  _settings: InvoiceSettings,
): string {
  const locale: EmailLocale = invoice.draft.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale).receipt;
  const client = invoice.draft.client;
  const bd = invoice.breakdown;
  const methodLabel = paymentMethod
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const paidDate = new Date(paidAt).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const valueAlign = locale === 'ar' ? 'left' : 'right';

  const receiptContent = `
      <div style="padding:4px 0 16px;">
        <div style="background:#DCF0E6;border:1px solid #3B8A6E;border-radius:12px;padding:18px;text-align:center;">
          <div style="color:#3B8A6E;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">${t.paidBannerLabel}</div>
          <div style="color:#3B8A6E;font-size:32px;font-weight:700;line-height:1;">${t.paidBannerAmount}</div>
          <div style="color:#2D2A33;font-size:18px;font-weight:600;margin-top:8px;">${escapeHtml(invoice.breakdown.formattedTotal)}</div>
        </div>
      </div>

      <p style="margin:0 0 12px;color:#2D2A33;font-size:15px;">${t.greeting(escapeHtml(client.name))}</p>
      <p style="margin:0 0 12px;color:#4A4A5C;font-size:14px;line-height:1.7;">${t.thanks(escapeHtml(invoice.invoiceNumber))}</p>
      <p style="margin:0 0 20px;color:#4A4A5C;font-size:14px;line-height:1.7;">${t.grateful}</p>

      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #EDE8DF;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.invoiceLabel}</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;font-weight:600;text-align:${valueAlign};">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.paymentDateLabel}</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;text-align:${valueAlign};">${escapeHtml(paidDate)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${t.methodLabel}</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;text-align:${valueAlign};">${escapeHtml(methodLabel)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 6px;border-top:1px solid #F3EFE8;color:#3B8A6E;font-size:13px;font-weight:600;">${t.amountPaidLabel}</td>
            <td style="padding:8px 0 6px;border-top:1px solid #F3EFE8;color:#3B8A6E;font-size:18px;font-weight:700;text-align:${valueAlign};">${escapeHtml(bd.formattedTotal)}</td>
          </tr>
          ${
            bd.displayCurrency !== 'CAD'
              ? `<tr><td></td><td style="padding:0;color:#8E8E9F;font-size:11px;font-style:italic;text-align:${valueAlign};">${t.equivalentSuffix(escapeHtml(bd.formattedTotalCAD))}</td></tr>`
              : ''
          }
        </table>
      </div>

      <p style="margin:16px 0 4px;color:#2D2A33;font-size:14px;">${t.signoff}</p>
      <p style="margin:0;color:#2D2A33;font-size:14px;font-weight:600;">${t.team}</p>`;

  return emailWrapper(receiptContent, { locale });
}

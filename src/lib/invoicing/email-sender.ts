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

/** All admin emails that should receive BCC copies of invoices/receipts. */
const ADMIN_BCC = BUSINESS.adminEmails;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
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
  const client = invoice.draft.client;
  const bd = invoice.breakdown;
  const service = services.find((s) => s.slug === invoice.draft.serviceSlug);
  const serviceName = service?.name ?? invoice.draft.serviceSlug;

  const blocks = buildPaymentInstructions(invoice, settings);
  const blocksHtml = blocks
    .map((b) => {
      const lines = b.lines
        .map(
          (l) =>
            `<p style="margin:0 0 4px;color:#4A4A5C;font-size:13px;line-height:1.6;">${escapeHtml(l)}</p>`,
        )
        .join('');
      return `
        <div style="margin-bottom:16px;padding:14px;background:white;border-radius:8px;border-left:3px solid #C8A97D;">
          <p style="margin:0 0 8px;color:#7A3B5E;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(b.heading)}</p>
          ${lines}
        </div>`;
    })
    .join('');

  const innerContent = `
      <!-- Greeting -->
      <div style="padding:4px 0 16px;">
        <p style="margin:0 0 12px;color:#2D2A33;font-size:15px;">Dear ${escapeHtml(client.name)},</p>
        <p style="margin:0 0 12px;color:#4A4A5C;font-size:14px;line-height:1.7;">Thank you for choosing Mama Hala Consulting. Please find attached your invoice for <strong>${escapeHtml(serviceName)}</strong>.</p>
      </div>

      ${
        invoice.draft.subject && invoice.draft.subject.trim()
          ? `
      <!-- Subject / session note -->
      <div style="margin:0 0 16px;padding:14px 16px;background:white;border-left:3px solid #C8A97D;border-radius:8px;">
        <p style="margin:0 0 4px;color:#C8A97D;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Subject</p>
        <p style="margin:0;color:#2D2A33;font-size:14px;font-style:italic;line-height:1.6;">${escapeHtml(invoice.draft.subject.trim())}</p>
      </div>
      `
          : ''
      }

      <!-- Invoice summary card -->
      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #EDE8DF;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Invoice Number</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Issue Date</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;text-align:right;">${formatDate(invoice.issuedAt)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Due Date</td>
            <td style="padding:8px 0;color:#2D2A33;font-size:14px;text-align:right;">${formatDate(invoice.dueDate)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0 8px;border-top:1px solid #F3EFE8;color:#7A3B5E;font-size:13px;font-weight:600;">Amount Due</td>
            <td style="padding:12px 0 8px;border-top:1px solid #F3EFE8;color:#7A3B5E;font-size:18px;font-weight:700;text-align:right;">${formatPrice(bd.totalLocal, bd.displayCurrency)}</td>
          </tr>
          ${
            bd.displayCurrency !== 'CAD'
              ? `<tr><td></td><td style="padding:0;color:#8E8E9F;font-size:11px;font-style:italic;text-align:right;">(${formatPrice(bd.totalCAD, 'CAD')} equivalent)</td></tr>`
              : ''
          }
        </table>
      </div>

      ${(() => {
        // Prefer dynamic checkout URL (exact invoice amount), fallback to static link
        const payUrl = invoice.stripeCheckoutUrl || BUSINESS.stripePaymentLink;
        if (!payUrl) return '';
        const isDynamic = !!invoice.stripeCheckoutUrl;
        return `
      <!-- Pay Online — prominent, above payment instructions -->
      <div style="background:#F0FAF5;border-radius:16px;padding:24px;margin-bottom:20px;text-align:center;">
        <p style="margin:0 0 4px;color:#3B8A6E;font-size:14px;font-weight:700;">Pay Securely Online</p>
        <p style="margin:0 0 16px;color:#4A4A5C;font-size:13px;">${isDynamic
          ? `Pay <strong>${escapeHtml(bd.formattedTotal)}</strong> securely with card`
          : 'The fastest way to confirm your session'}</p>
        <a href="${payUrl}" style="display:inline-block;padding:16px 48px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:0.3px;">Pay ${isDynamic ? escapeHtml(bd.formattedTotal) : 'Online Now'}</a>
        ${!isDynamic ? `<p style="margin:12px 0 0;color:#8E8E9F;font-size:11px;">Include invoice <strong>${escapeHtml(invoice.invoiceNumber)}</strong> in payment notes</p>` : ''}
      </div>`;
      })()}

      <!-- Other payment methods -->
      <div style="margin-bottom:20px;">
        <p style="margin:0 0 12px;color:#8E8E9F;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">Other Payment Methods</p>
        ${blocksHtml}
      </div>

      <!-- PDF reminder -->
      <div style="padding:14px;background:#F3EFE8;border-radius:8px;margin-bottom:20px;">
        <p style="margin:0;color:#4A4A5C;font-size:13px;line-height:1.6;">A detailed PDF invoice is attached to this email. Please keep it for your records.</p>
      </div>

      <!-- Closing -->
      <p style="margin:20px 0 8px;color:#4A4A5C;font-size:14px;line-height:1.7;">If you have any questions about this invoice, please reply to this email, <a href="${BUSINESS.whatsappUrl}" style="color:#7A3B5E;">WhatsApp us</a>, or email <a href="mailto:${escapeHtml(settings.issuerBlock.email)}" style="color:#7A3B5E;">${escapeHtml(settings.issuerBlock.email)}</a>.</p>

      <p style="margin:16px 0 0;color:#2D2A33;font-size:14px;">With care,<br><strong>Dr. Hala Ali</strong></p>`;

  return emailWrapper(innerContent, { showAddress: true });
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

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: client.email,
    bcc: bccList,
    replyTo: settings.issuerBlock.email,
    subject:
      options?.customSubject ??
      `Invoice ${invoice.invoiceNumber} from ${businessName}`,
    html: options?.customHtml ?? buildInvoiceEmailHtml(invoice, settings),
    attachments: [
      {
        filename: `${invoice.invoiceNumber}.pdf`,
        content: pdfBuffer.toString('base64'),
      },
    ],
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? 'unknown'}`);
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

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: client.email,
    bcc: bccList,
    replyTo: settings.issuerBlock.email,
    subject: `Receipt for ${invoice.invoiceNumber} - Thank you from ${businessName}`,
    html: buildReceiptEmailHtml(invoice, paymentMethod, paidAt, settings),
    attachments: [
      {
        filename: `Receipt-${invoice.invoiceNumber}.pdf`,
        content: receiptPdfBuffer.toString('base64'),
      },
    ],
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? 'unknown'}`);
  }

  return { messageId: data?.id ?? '' };
}

function buildReceiptEmailHtml(
  invoice: StoredInvoice,
  paymentMethod: string,
  paidAt: string,
  settings: InvoiceSettings,
): string {
  const client = invoice.draft.client;
  const bd = invoice.breakdown;
  const businessName = settings.businessName || 'Mama Hala Consulting Group';
  const methodLabel = paymentMethod
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const paidDate = new Date(paidAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const receiptContent = `
      <div style="padding:4px 0 16px;">
        <div style="background:#DCF0E6;border:1px solid #3B8A6E;border-radius:12px;padding:18px;text-align:center;">
          <div style="color:#3B8A6E;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Payment Received</div>
          <div style="color:#3B8A6E;font-size:32px;font-weight:700;line-height:1;">PAID</div>
          <div style="color:#2D2A33;font-size:18px;font-weight:600;margin-top:8px;">${escapeHtml(invoice.breakdown.formattedTotal)}</div>
        </div>
      </div>

      <p style="margin:0 0 12px;color:#2D2A33;font-size:15px;">Dear ${escapeHtml(client.name)},</p>
      <p style="margin:0 0 12px;color:#4A4A5C;font-size:14px;line-height:1.7;">Thank you so much for your payment. Your invoice <strong>${escapeHtml(invoice.invoiceNumber)}</strong> has been marked as paid, and your official receipt is attached to this email for your records.</p>
      <p style="margin:0 0 20px;color:#4A4A5C;font-size:14px;line-height:1.7;">We're grateful for your trust and look forward to supporting you on your journey.</p>

      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #EDE8DF;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Invoice</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;font-weight:600;text-align:right;">${escapeHtml(invoice.invoiceNumber)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Payment Date</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;text-align:right;">${escapeHtml(paidDate)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Method</td>
            <td style="padding:6px 0;color:#2D2A33;font-size:14px;text-align:right;">${escapeHtml(methodLabel)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 6px;border-top:1px solid #F3EFE8;color:#3B8A6E;font-size:13px;font-weight:600;">Amount Paid</td>
            <td style="padding:8px 0 6px;border-top:1px solid #F3EFE8;color:#3B8A6E;font-size:18px;font-weight:700;text-align:right;">${escapeHtml(bd.formattedTotal)}</td>
          </tr>
          ${
            bd.displayCurrency !== 'CAD'
              ? `<tr><td></td><td style="padding:0;color:#8E8E9F;font-size:11px;font-style:italic;text-align:right;">(${escapeHtml(bd.formattedTotalCAD)} equivalent)</td></tr>`
              : ''
          }
        </table>
      </div>

      <p style="margin:16px 0 4px;color:#2D2A33;font-size:14px;">With care,</p>
      <p style="margin:0;color:#2D2A33;font-size:14px;font-weight:600;">Dr. Hala Ali</p>`;

  return emailWrapper(receiptContent, { showAddress: true });
}

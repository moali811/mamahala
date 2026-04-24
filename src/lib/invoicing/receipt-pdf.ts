/* ================================================================
   Receipt PDF Generator
   ================================================================
   Mirrors invoice-pdf.ts layout tick-for-tick so a client opening a
   paid receipt feels the same document they already know — same
   header proportions, same Billed-To/dates two-column, same line-
   items table, same totals block. Receipt-specific swaps:
     - INVOICE label → RECEIPT
     - Balance Due box → PAID box (green accent tint)
     - Due Date column → Payment Date column
     - Pay Online CTA + payment instructions → thank-you note
   ================================================================ */

import { jsPDF, GState } from 'jspdf';
import type { StoredInvoice, InvoiceSettings } from './types';
import { services } from '@/data/services';
import { formatPrice } from '@/lib/smart-round';
import {
  getMainLogoDataUrl,
  getWatermarkLogoDataUrl,
} from './pdf-assets';
import {
  PLUM, GOLD, DARK, TEXT, MUTED,
  WHITE, GREEN, PALE_GREEN,
  PAGE_WIDTH, PAGE_HEIGHT, MARGIN, CONTENT_WIDTH,
  formatDate, hr, wrap, drawText,
} from './pdf-shared';
import { registerArabicFont } from './pdf-fonts';
import { BUSINESS } from '@/config/business';

export interface ReceiptInput {
  invoice: StoredInvoice;
  paymentMethod: string;
  paidAt: string;
  thankYouMessage?: string;
}

export async function generateReceiptPdf(
  input: ReceiptInput,
  settings: InvoiceSettings,
): Promise<Buffer> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  registerArabicFont(doc);
  const invoice = input.invoice;
  const service = services.find((s) => s.slug === invoice.draft.serviceSlug);
  const serviceName = service?.name ?? invoice.draft.serviceSlug;
  const bd = invoice.breakdown;
  const rightEdge = PAGE_WIDTH - MARGIN;

  const watermarkDataUrl = getWatermarkLogoDataUrl();

  // ─── Thin top accent line (1.5mm plum) — matches invoice ───
  doc.setFillColor(...PLUM);
  doc.rect(0, 0, PAGE_WIDTH, 1.5, 'F');

  // ─── HEADER — same proportions as invoice ──────────────────
  let y = MARGIN + 5;

  const logoSize = 14;
  const logoDataUrl = getMainLogoDataUrl();
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', MARGIN, y - 0.5, logoSize, logoSize, undefined, 'FAST');
    } catch { /* skip */ }
  }

  const brandX = MARGIN + logoSize + 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...DARK);
  doc.text(settings.businessName || 'Mama Hala Consulting Group', brandX, y + 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text('Dr. Hala Ali, Certified Family Counselor', brandX, y + 7.5);

  const issuer = settings.issuerBlock;
  doc.text(`${issuer.email}  |  ${issuer.phone}`, brandX, y + 11);

  // RECEIPT label — right-aligned, same size as INVOICE
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text('RECEIPT', rightEdge, y + 1, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text(invoice.invoiceNumber, rightEdge, y + 6, { align: 'right' });

  y += 18;

  // ─── PAID BOX — mirrors the Balance Due box, green accent ──
  const paidBoxY = y;
  const paidBoxH = 20;

  // Pale green background (green tint, equivalent to PLUM@8% on invoice)
  doc.setFillColor(...GREEN);
  doc.setGState(new GState({ opacity: 0.09 }));
  doc.roundedRect(MARGIN, paidBoxY, CONTENT_WIDTH, paidBoxH, 2, 2, 'F');
  doc.setGState(new GState({ opacity: 1 }));

  // Label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text('PAID', MARGIN + 6, paidBoxY + 8);

  // Amount — large, bold, dark (identical to invoice)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text(bd.formattedTotal, rightEdge - 6, paidBoxY + 13, { align: 'right' });

  // "Paid {date}" inline under label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(`Paid ${formatDate(input.paidAt)}`, MARGIN + 6, paidBoxY + 14);

  // Green P checkmark (same pattern as invoice's paid-state tick)
  doc.setFillColor(...GREEN);
  doc.circle(MARGIN + 30, paidBoxY + 10, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...WHITE);
  doc.text('P', MARGIN + 29.2, paidBoxY + 11.5);

  y = paidBoxY + paidBoxH + 8;

  hr(doc, y);
  y += 7;

  // ─── BILLED TO + DATES (two-column) — identical to invoice ─
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('BILLED TO', MARGIN, y);
  y += 4;

  const drawBilled = (value: string, opts?: { weight?: 'normal' | 'bold' }) => {
    drawText(doc, value, MARGIN, y, { weight: opts?.weight });
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  drawBilled(invoice.draft.client.name, { weight: 'bold' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT);
  drawBilled(invoice.draft.client.email);
  y += 3.5;
  drawBilled(invoice.draft.client.country || '');
  y += 3.5;

  // Right column: ISSUE DATE + PAYMENT DATE (paid variant of invoice dates)
  let dy = y - 15.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('ISSUE DATE', rightEdge, dy, { align: 'right' });
  dy += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(formatDate(invoice.issuedAt), rightEdge, dy, { align: 'right' });
  dy += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('PAYMENT DATE', rightEdge, dy, { align: 'right' });
  dy += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(formatDate(input.paidAt), rightEdge, dy, { align: 'right' });

  y += 4;
  hr(doc, y);
  y += 7;

  // ─── SUBJECT (optional) — identical to invoice ─────────────
  if (invoice.draft.subject?.trim()) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    const subLines = wrap(doc, invoice.draft.subject.trim(), CONTENT_WIDTH);
    for (const line of subLines.slice(0, 2)) {
      drawText(doc, line, MARGIN, y);
      y += 4;
    }
    y += 3;
  }

  // ─── LINE ITEMS TABLE — identical to invoice ───────────────
  const colDesc = MARGIN;
  const colQty = MARGIN + 100;
  const colRate = MARGIN + 125;
  const colAmt = rightEdge;

  doc.setFillColor(245, 243, 240);
  doc.rect(MARGIN, y - 3.5, CONTENT_WIDTH, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('DESCRIPTION', colDesc + 2, y);
  doc.text('QTY', colQty, y, { align: 'center' });
  doc.text('RATE', colRate, y, { align: 'right' });
  doc.text('AMOUNT', colAmt - 2, y, { align: 'right' });
  y += 7;

  if (invoice.draft.lineItems && invoice.draft.lineItems.length > 0) {
    for (const item of invoice.draft.lineItems) {
      const amount = item.quantity * item.unitPriceLocal;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK);
      drawText(doc, (item.description || '(untitled)').slice(0, 60), colDesc + 2, y);
      doc.text(String(item.quantity), colQty, y, { align: 'center' });
      doc.text(formatPrice(item.unitPriceLocal, bd.displayCurrency), colRate, y, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text(formatPrice(amount, bd.displayCurrency), colAmt - 2, y, { align: 'right' });
      y += 5.5;
    }
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...DARK);
    doc.text(serviceName, colDesc + 2, y);
    doc.text(String(bd.sessions), colQty, y, { align: 'center' });
    doc.text(formatPrice(bd.perSessionLocal, bd.displayCurrency), colRate, y, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(formatPrice(bd.subtotalLocal, bd.displayCurrency), colAmt - 2, y, { align: 'right' });
    y += 4;

    if (service) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...MUTED);
      doc.text(`${service.duration} session`, colDesc + 2, y);
      y += 3.5;
    }
  }

  y += 4;
  hr(doc, y);
  y += 5;

  // ─── TOTALS — mirrors invoice, green tint on the final ─────
  const totX = rightEdge - 65;

  if (bd.taxAmountLocal > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.text('Subtotal', totX, y);
    doc.text(formatPrice(bd.subtotalLocal, bd.displayCurrency), rightEdge - 2, y, { align: 'right' });
    y += 5;
    doc.text('HST 13%', totX, y);
    doc.text(formatPrice(bd.taxAmountLocal, bd.displayCurrency), rightEdge - 2, y, { align: 'right' });
    y += 5;
  }

  // PAID total — green tint bg (mirrors invoice's burgundy TOTAL)
  doc.setFillColor(...GREEN);
  doc.setGState(new GState({ opacity: 0.12 }));
  doc.roundedRect(totX - 4, y - 4, rightEdge - totX + 6, 10, 1.5, 1.5, 'F');
  doc.setGState(new GState({ opacity: 1 }));

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...GREEN);
  doc.text('PAID', totX, y + 2);
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(formatPrice(bd.totalLocal, bd.displayCurrency), rightEdge - 2, y + 2, { align: 'right' });
  y += 12;

  if (bd.displayCurrency !== 'CAD') {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(`(${formatPrice(bd.totalCAD, 'CAD')} equivalent)`, rightEdge - 2, y, { align: 'right' });
    y += 5;
  }

  // Payment method inline, small & muted
  const methodLabel = input.paymentMethod
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(`Paid via ${methodLabel}`, rightEdge - 2, y, { align: 'right' });
  y += 6;

  y += 4;

  // ─── THANK YOU NOTE (replaces invoice's Pay Online CTA) ────
  // A small cream band with italic thank-you, styled like the
  // invoice's Pay Online strip but softer — this is the emotional
  // close of the paid document.
  const thankYou =
    input.thankYouMessage ||
    'Thank you for your trust and your investment in your wellbeing. We look forward to supporting you on your journey.';

  const bandY = y;
  doc.setFillColor(...GREEN);
  doc.setGState(new GState({ opacity: 0.08 }));
  doc.roundedRect(MARGIN, bandY, CONTENT_WIDTH, 18, 2, 2, 'F');
  doc.setGState(new GState({ opacity: 1 }));

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GREEN);
  doc.text('A NOTE FROM OUR TEAM', MARGIN + 6, bandY + 6);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT);
  const thankLines = wrap(doc, thankYou, CONTENT_WIDTH - 12);
  let ty = bandY + 10.5;
  for (const l of thankLines.slice(0, 2)) {
    doc.text(l, MARGIN + 6, ty);
    ty += 3.5;
  }
  y = bandY + 18 + 6;

  // ─── Subtle watermark ──────────────────────────────────────
  if (watermarkDataUrl) {
    try {
      const wmSize = 75;
      const wmX = (PAGE_WIDTH - wmSize) / 2;
      const footTop = PAGE_HEIGHT - 22;
      const wmY = y + (footTop - y - wmSize) / 2;
      doc.setGState(new GState({ opacity: 0.025 }));
      doc.addImage(watermarkDataUrl, 'PNG', wmX, wmY, wmSize, wmSize, undefined, 'FAST');
      doc.setGState(new GState({ opacity: 1 }));
    } catch { /* skip */ }
  }

  // ─── Footer — minimal, matches invoice tone ────────────────
  const footerY = PAGE_HEIGHT - 12;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...PLUM);
  doc.text(BUSINESS.tagline, PAGE_WIDTH / 2, footerY, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...MUTED);
  doc.text(
    'This document confirms payment of the above invoice and serves as your official receipt.',
    PAGE_WIDTH / 2,
    footerY + 4,
    { align: 'center' },
  );

  return Buffer.from(doc.output('arraybuffer'));
}

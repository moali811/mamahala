/* ================================================================
   Invoice PDF Generator — Minimalist Edition
   ================================================================
   Clean, breathable layout. Two visual anchors:
   1. Balance Due amount (large, bold, light burgundy bg)
   2. "Pay Online" Stripe CTA (plum button)
   No colored bullets. No heavy dark boxes. Trust through whitespace.
   ================================================================ */

import { jsPDF, GState } from 'jspdf';
import type { StoredInvoice, InvoiceSettings } from './types';
import { services } from '@/data/services';
import { buildPaymentInstructions } from './payment-instructions';
import { formatPrice } from '@/lib/smart-round';
import {
  getMainLogoDataUrl,
  getWatermarkLogoDataUrl,
} from './pdf-assets';
import {
  PLUM, PLUM_DEEP, GOLD, CREAM, DARK, TEXT, MUTED,
  LIGHT, WHITE, GREEN,
  PAGE_WIDTH, PAGE_HEIGHT, MARGIN, CONTENT_WIDTH,
  formatDate, hr, wrap,
} from './pdf-shared';
import { BUSINESS } from '@/config/business';

export async function generateInvoicePdf(
  invoice: StoredInvoice,
  settings: InvoiceSettings,
): Promise<Buffer> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const service = services.find((s) => s.slug === invoice.draft.serviceSlug);
  const serviceName = service?.name ?? invoice.draft.serviceSlug;
  const bd = invoice.breakdown;
  const isPaid = invoice.status === 'paid';
  const rightEdge = PAGE_WIDTH - MARGIN;

  // ─── Subtle watermark (bottom-right, ultra-faded) ──────────
  const watermarkDataUrl = getWatermarkLogoDataUrl();
  if (watermarkDataUrl) {
    try {
      doc.setGState(new GState({ opacity: 0.025 }));
      doc.addImage(watermarkDataUrl, 'PNG', PAGE_WIDTH - 80, PAGE_HEIGHT - 100, 75, 75, undefined, 'FAST');
      doc.setGState(new GState({ opacity: 1 }));
    } catch { /* skip */ }
  }

  // ─── Thin top accent line (just 1.5mm plum) ────────────────
  doc.setFillColor(...PLUM);
  doc.rect(0, 0, PAGE_WIDTH, 1.5, 'F');

  // ─── HEADER ────────────────────────────────────────────────
  let y = MARGIN + 5;

  // Logo
  const logoDataUrl = getMainLogoDataUrl();
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', MARGIN, y, 18, 18, undefined, 'FAST');
    } catch { /* skip */ }
  }

  // Company name + details
  const brandX = MARGIN + 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...DARK);
  doc.text(settings.businessName || 'Mama Hala Consulting Group', brandX, y + 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('Dr. Hala Ali, Certified Family Counselor', brandX, y + 8);

  const issuer = settings.issuerBlock;
  doc.text(`${issuer.email}  |  ${issuer.phone}`, brandX, y + 12);

  // Invoice number — right-aligned, understated
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('INVOICE', rightEdge, y, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(invoice.invoiceNumber, rightEdge, y + 6, { align: 'right' });

  y += 22;

  // ─── BALANCE DUE — the hero visual anchor ──────────────────
  // Light burgundy background at 8% opacity, big bold amount
  const dueBoxY = y;
  const dueBoxH = 20;

  // Burgundy tint background (PLUM at 8% opacity)
  doc.setFillColor(122, 59, 94); // PLUM
  doc.setGState(new GState({ opacity: 0.07 }));
  doc.roundedRect(MARGIN, dueBoxY, CONTENT_WIDTH, dueBoxH, 2, 2, 'F');
  doc.setGState(new GState({ opacity: 1 }));

  // Label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(isPaid ? 'PAID' : 'BALANCE DUE', MARGIN + 6, dueBoxY + 8);

  // Amount — large, bold, dark
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text(bd.formattedTotal, rightEdge - 6, dueBoxY + 13, { align: 'right' });

  // Due date inline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    isPaid ? `Paid ${invoice.paidAt ? formatDate(invoice.paidAt) : ''}` : `Due ${formatDate(invoice.dueDate)}`,
    MARGIN + 6,
    dueBoxY + 14,
  );

  // Paid checkmark
  if (isPaid) {
    doc.setFillColor(...GREEN);
    doc.circle(MARGIN + 44, dueBoxY + 10, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...WHITE);
    doc.text('P', MARGIN + 43.2, dueBoxY + 11.5);
  }

  y = dueBoxY + dueBoxH + 8;

  // Thin divider
  hr(doc, y);
  y += 7;

  // ─── BILLED TO + DATES (two-column) ───────────────────────
  // Left: client
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('BILLED TO', MARGIN, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(invoice.draft.client.name, MARGIN, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT);
  doc.text(invoice.draft.client.email, MARGIN, y);
  y += 3.5;
  doc.text(invoice.draft.client.country || '', MARGIN, y);
  y += 3.5;

  // Right: dates
  const dateX = PAGE_WIDTH / 2 + 10;
  let dy = y - 15.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('ISSUE DATE', dateX, dy);
  dy += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(formatDate(invoice.issuedAt), dateX, dy);
  dy += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('DUE DATE', dateX, dy);
  dy += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(formatDate(invoice.dueDate), dateX, dy);

  y += 4;
  hr(doc, y);
  y += 7;

  // ─── SUBJECT (optional) ────────────────────────────────────
  if (invoice.draft.subject?.trim()) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    const subLines = wrap(doc, invoice.draft.subject.trim(), CONTENT_WIDTH);
    for (const line of subLines.slice(0, 2)) {
      doc.text(line, MARGIN, y);
      y += 4;
    }
    y += 3;
  }

  // ─── LINE ITEMS TABLE ──────────────────────────────────────
  const colDesc = MARGIN;
  const colQty = MARGIN + 100;
  const colRate = MARGIN + 125;
  const colAmt = rightEdge;

  // Header row — light gray bg, no colored text
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

  // Items
  if (invoice.draft.lineItems && invoice.draft.lineItems.length > 0) {
    for (const item of invoice.draft.lineItems) {
      const amount = item.quantity * item.unitPriceLocal;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...DARK);
      doc.text((item.description || '(untitled)').slice(0, 60), colDesc + 2, y);
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

    // Sub-detail
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

  // ─── TOTALS (right-aligned, clean) ─────────────────────────
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

  // Total — burgundy tint bg, bold
  doc.setFillColor(122, 59, 94);
  doc.setGState(new GState({ opacity: 0.07 }));
  doc.roundedRect(totX - 4, y - 4, rightEdge - totX + 6, 10, 1.5, 1.5, 'F');
  doc.setGState(new GState({ opacity: 1 }));

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text('TOTAL', totX, y + 2);
  doc.setFontSize(12);
  doc.text(formatPrice(bd.totalLocal, bd.displayCurrency), rightEdge - 2, y + 2, { align: 'right' });
  y += 12;

  if (bd.displayCurrency !== 'CAD') {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(`(${formatPrice(bd.totalCAD, 'CAD')} equivalent)`, rightEdge - 2, y, { align: 'right' });
    y += 5;
  }

  y += 4;

  // ─── PAY ONLINE — Stripe CTA inside the PDF ───────────────
  // Prefer dynamic checkout URL (exact invoice amount), fallback to static link
  const payUrl = invoice.stripeCheckoutUrl || BUSINESS.stripePaymentLink;
  if (payUrl && !isPaid) {
    const ctaY = y;
    const ctaH = 14;
    const isDynamic = !!invoice.stripeCheckoutUrl;

    // Plum rounded rect
    doc.setFillColor(...PLUM);
    doc.roundedRect(MARGIN, ctaY, CONTENT_WIDTH, ctaH, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...WHITE);
    doc.text(
      isDynamic ? `Pay ${bd.formattedTotal} Online` : 'Pay Securely Online',
      PAGE_WIDTH / 2, ctaY + 6, { align: 'center' },
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(
      isDynamic
        ? 'Click here to pay the exact invoice amount securely via Stripe'
        : 'Click here to pay via Stripe — the fastest way to confirm your session',
      PAGE_WIDTH / 2, ctaY + 10.5, { align: 'center' },
    );

    // Make the entire area a clickable link
    try {
      doc.link(MARGIN, ctaY, CONTENT_WIDTH, ctaH, { url: payUrl });
    } catch { /* link API may vary */ }

    y = ctaY + ctaH + 6;
  }

  // ─── PAYMENT INSTRUCTIONS (text only, no colored boxes) ────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('OTHER PAYMENT METHODS', MARGIN, y);
  y += 5;

  const blocks = buildPaymentInstructions(invoice, settings);
  for (const block of blocks) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text(block.heading, MARGIN, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT);
    for (const line of block.lines) {
      for (const wl of wrap(doc, line, CONTENT_WIDTH)) {
        doc.text(wl, MARGIN, y);
        y += 3.5;
      }
    }
    y += 2;
  }

  // ─── NOTES ─────────────────────────────────────────────────
  const effectiveNotes = invoice.draft.customerNotesOverride ?? settings.customerNotes;
  if (effectiveNotes?.trim()) {
    y += 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text('NOTES', MARGIN, y);
    y += 4;
    doc.setTextColor(...TEXT);
    for (const line of wrap(doc, effectiveNotes, CONTENT_WIDTH)) {
      doc.text(line, MARGIN, y);
      y += 3.5;
    }
    y += 3;
  }

  // ─── TERMS (compact, no colored bullets, no raw URL) ───────
  const effectiveTerms = invoice.draft.termsOverride ?? settings.termsAndConditions;
  if (effectiveTerms?.length) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text('TERMS', MARGIN, y);
    y += 3.5;
    for (let i = 0; i < effectiveTerms.length; i++) {
      const lines = wrap(doc, `${i + 1}. ${effectiveTerms[i]}`, CONTENT_WIDTH);
      for (const line of lines) {
        doc.text(line, MARGIN, y);
        y += 3;
      }
    }
    // Booking policy as a clean link, not a raw URL
    if (settings.bookingPolicyUrl) {
      y += 1;
      doc.setTextColor(...PLUM);
      try {
        doc.textWithLink('View Booking Policy', MARGIN, y, { url: settings.bookingPolicyUrl });
      } catch {
        doc.text('View Booking Policy', MARGIN, y);
      }
    }
  }

  // ─── FOOTER ────────────────────────────────────────────────
  const footY = PAGE_HEIGHT - MARGIN - 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('Thank you for choosing Mama Hala Consulting', PAGE_WIDTH / 2, footY, { align: 'center' });
  doc.setFontSize(7);
  doc.text(`${issuer.email}  |  ${issuer.phone}  |  mamahala.ca`, PAGE_WIDTH / 2, footY + 4, { align: 'center' });

  // Thin bottom line
  doc.setFillColor(...PLUM);
  doc.rect(0, PAGE_HEIGHT - 1.5, PAGE_WIDTH, 1.5, 'F');

  return Buffer.from(doc.output('arraybuffer'));
}

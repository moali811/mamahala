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
import { buildPaymentConciergeUrl } from './stripe-checkout';

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

  // Watermark is drawn later, after the Pay Online banner, so it sits
  // in the lower half of the page between the CTA and footer.
  const watermarkDataUrl = getWatermarkLogoDataUrl();

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

  // Right: dates — right-aligned to match invoice number and amounts
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
  doc.text('DUE DATE', rightEdge, dy, { align: 'right' });
  dy += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(formatDate(invoice.dueDate), rightEdge, dy, { align: 'right' });

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

  // ─── PAY ONLINE — Payment Concierge CTA inside the PDF ────
  // Always rendered when unpaid. Links to the payment concierge page
  // at /pay/{token}, which routes to the best available tier at click
  // time: dynamic Stripe session → admin-pasted Payment Link →
  // e-Transfer/wire/PayPal fallback. Never references the legacy
  // static BUSINESS.stripePaymentLink (fixed $150 CAD).
  if (!isPaid) {
    const ctaY = y;
    const ctaH = 14;
    const conciergeUrl = buildPaymentConciergeUrl(invoice);

    // Plum rounded rect
    doc.setFillColor(...PLUM);
    doc.roundedRect(MARGIN, ctaY, CONTENT_WIDTH, ctaH, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...WHITE);
    doc.text(`Pay ${bd.formattedTotal} Online`, PAGE_WIDTH / 2, ctaY + 6, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Tap to pay by card, Interac, wire, or PayPal - exact invoice amount', PAGE_WIDTH / 2, ctaY + 10.5, { align: 'center' });

    // Make the entire area a clickable link
    try {
      doc.link(MARGIN, ctaY, CONTENT_WIDTH, ctaH, { url: conciergeUrl });
    } catch { /* link API may vary */ }

    y = ctaY + ctaH + 6;
  }

  // ─── Subtle watermark (below Pay Online, in the lower half) ───
  if (watermarkDataUrl) {
    try {
      const wmSize = 75;
      const wmX = (PAGE_WIDTH - wmSize) / 2;
      // Place between current y and footer top, centered vertically
      const footTop = PAGE_HEIGHT - 22;
      const wmY = y + (footTop - y - wmSize) / 2;
      doc.setGState(new GState({ opacity: 0.025 }));
      doc.addImage(watermarkDataUrl, 'PNG', wmX, wmY, wmSize, wmSize, undefined, 'FAST');
      doc.setGState(new GState({ opacity: 1 }));
    } catch { /* skip */ }
  }

  // ─── PAYMENT INSTRUCTIONS (region-aware, single-block primary) ─
  // Canadian clients see one locked e-Transfer block. International
  // clients see one block from the cascade (Stripe > wire > PayPal
  // > contact fallback). The old "Dr. Hala can arrange any of these"
  // four-option fallback is gone.
  const paymentResult = buildPaymentInstructions(invoice, settings);
  const allBlocks = [paymentResult.primary, ...paymentResult.secondary];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('HOW TO PAY', MARGIN, y);
  y += 5;

  for (const block of allBlocks) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text(block.heading, MARGIN, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT);
    for (const line of block.bodyLines) {
      for (const wl of wrap(doc, line, CONTENT_WIDTH)) {
        doc.text(wl, MARGIN, y);
        y += 3.5;
      }
    }
    // If the block has a CTA link, render it as a clickable line.
    // jsPDF/Windows-1252 can't render em-dashes, so keep this ASCII.
    if (block.linkUrl && block.linkLabel) {
      doc.setTextColor(...PLUM);
      doc.setFont('helvetica', 'bold');
      try {
        doc.textWithLink(`${block.linkLabel}: ${block.linkUrl}`, MARGIN, y, { url: block.linkUrl });
      } catch {
        doc.text(`${block.linkLabel}: ${block.linkUrl}`, MARGIN, y);
      }
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT);
      y += 3.5;
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
    // Booking policy — embedded as a natural sentence, not a separate line
    if (settings.bookingPolicyUrl) {
      y += 2;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(...PLUM);
      const policyText = 'Our full booking & cancellation policy is available at mamahala.ca/booking-policy';
      try {
        doc.textWithLink(policyText, MARGIN, y, { url: settings.bookingPolicyUrl });
      } catch {
        doc.text(policyText, MARGIN, y);
      }
    }
  }

  // ─── FOOTER ────────────────────────────────────────────────
  // Reserve ~22mm at the page bottom for 4 lines + divider + tagline.
  const footTop = PAGE_HEIGHT - 22;

  // Thin horizontal divider above the footer block
  doc.setDrawColor(...LIGHT);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, footTop, PAGE_WIDTH - MARGIN, footTop);

  // Tagline (italic plum)
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...PLUM);
  doc.text(BUSINESS.tagline, PAGE_WIDTH / 2, footTop + 5, { align: 'center' });

  // Address + Company ID + contact line (muted gray, 7pt)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(BUSINESS.address, PAGE_WIDTH / 2, footTop + 10, { align: 'center' });
  doc.text(`Company ID: ${settings.companyId}`, PAGE_WIDTH / 2, footTop + 14, { align: 'center' });
  doc.text(
    `${issuer.email}  |  ${issuer.phone}  |  mamahala.ca`,
    PAGE_WIDTH / 2,
    footTop + 18,
    { align: 'center' },
  );

  // Thin bottom line (plum accent)
  doc.setFillColor(...PLUM);
  doc.rect(0, PAGE_HEIGHT - 1.5, PAGE_WIDTH, 1.5, 'F');

  return Buffer.from(doc.output('arraybuffer'));
}

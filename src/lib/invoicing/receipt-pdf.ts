/* ================================================================
   Receipt PDF Generator
   ================================================================
   Mirrors the invoice PDF layout but:
   - Header label says "RECEIPT" instead of "INVOICE"
   - A prominent green "PAID" box at the top with payment details
   - No payment instructions section (already paid)
   - "Thank you" message featured prominently
   - Otherwise reuses the same brand styling, billing block, and line
     items from the source invoice.
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
  PLUM, PLUM_DEEP, GOLD, GOLD_LIGHT, CREAM, DARK, TEXT, MUTED,
  LIGHT, WHITE, GREEN, PALE_GREEN, ROW_TINT,
  PAGE_WIDTH, PAGE_HEIGHT, MARGIN, CONTENT_WIDTH,
  formatDate, hr, sectionLabel, wrap, drawText,
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

  // ─── WATERMARK ─────────────────────────────────────────────
  // Subtle corner-anchored brand mark (same pattern as invoice).
  const watermarkDataUrl = getWatermarkLogoDataUrl();
  if (watermarkDataUrl) {
    try {
      doc.setGState(new GState({ opacity: 0.035 }));
      const wmSize = 75;
      const wmX = PAGE_WIDTH - wmSize - 5;
      const wmY = PAGE_HEIGHT - wmSize - 25;
      doc.addImage(
        watermarkDataUrl,
        'PNG',
        wmX,
        wmY,
        wmSize,
        wmSize,
        undefined,
        'FAST',
      );
      doc.setGState(new GState({ opacity: 1 }));
    } catch (err) {
      console.warn('[receipt-pdf] Watermark render failed:', err);
    }
  }

  // ─── DECORATIVE TOP STRIP ──────────────────────────────────
  doc.setFillColor(...PLUM);
  doc.rect(0, 0, PAGE_WIDTH, 3, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(0, 3, PAGE_WIDTH, 1, 'F');

  // ─── HEADER ──────────────────────────────────────────────
  let y = MARGIN + 8;
  const companyName = settings.businessName || 'Mama Hala Consulting Group';

  // Logo
  const logoDataUrl = getMainLogoDataUrl();
  const logoSize = 22;
  const logoX = MARGIN;
  const logoY = y;
  if (logoDataUrl) {
    try {
      doc.addImage(
        logoDataUrl,
        'PNG',
        logoX,
        logoY,
        logoSize,
        logoSize,
        undefined,
        'FAST',
      );
    } catch (err) {
      console.warn('[receipt-pdf] Logo render failed:', err);
    }
  }

  const brandX = logoX + logoSize + 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...PLUM_DEEP);
  doc.text(companyName, brandX, y + 2);

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  const underlineWidth = doc.getTextWidth(companyName) * 0.35;
  doc.line(brandX, y + 4, brandX + underlineWidth, y + 4);

  // "RECEIPT" label on the right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...GREEN);
  doc.text('RECEIPT', PAGE_WIDTH - MARGIN, y + 5, { align: 'right' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text('Dr. Hala Ali, Certified Family Counselor', brandX, y + 9);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text(
    'For a life full of love, tranquility & peace',
    brandX,
    y + 13,
  );

  // Receipt references the source invoice number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('FOR INVOICE', PAGE_WIDTH - MARGIN, y + 10, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PLUM_DEEP);
  doc.text(invoice.invoiceNumber, PAGE_WIDTH - MARGIN, y + 14, {
    align: 'right',
  });

  y = Math.max(logoY + logoSize, y + 15) + 2;

  // Issuer block
  const issuer = settings.issuerBlock;
  const websiteUrl = (settings.websiteUrl || 'https://www.mamahala.ca').replace(/^https?:\/\//, '');
  const addrLines = [
    issuer.line1,
    `${issuer.city}${issuer.postalCode ? ' ' + issuer.postalCode : ''}, ${issuer.country}`,
    `${issuer.email} | ${issuer.phone}`,
    websiteUrl,
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  for (const line of addrLines) {
    doc.text(line, MARGIN, y);
    y += 4;
  }
  if (settings.companyId) {
    doc.text(`Company ID: ${settings.companyId}`, MARGIN, y);
    y += 4;
  }

  y += 3;
  hr(doc, y);
  y += 6;

  // ─── PAID BOX (THE STAR) ──────────────────────────────────
  doc.setFillColor(...PALE_GREEN);
  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.6);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...GREEN);
  doc.text('PAID', MARGIN + 6, y + 11);

  // Payment details right side
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text('Payment received', PAGE_WIDTH - MARGIN - 6, y + 7, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(formatDate(input.paidAt), PAGE_WIDTH - MARGIN - 6, y + 13, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  const methodLabel = input.paymentMethod
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  doc.text(`via ${methodLabel}`, PAGE_WIDTH - MARGIN - 6, y + 18, { align: 'right' });

  // Center: amount paid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...DARK);
  doc.text(bd.formattedTotal, MARGIN + 70, y + 13);

  y += 28;

  // ─── BILLED TO ──────────────────────────────────────────
  y = sectionLabel(doc, 'Billed To', y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  drawText(doc, invoice.draft.client.name, MARGIN, y, { weight: 'bold' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  drawText(doc, invoice.draft.client.email, MARGIN, y);
  y += 4;
  drawText(doc, invoice.draft.client.country, MARGIN, y);
  y += 6;

  hr(doc, y);
  y += 6;

  // ─── SUBJECT / SESSION NOTES (optional) ──────────────────
  if (invoice.draft.subject && invoice.draft.subject.trim()) {
    y = sectionLabel(doc, 'Subject', y, GOLD);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    const subjectLines = wrap(doc, invoice.draft.subject.trim(), CONTENT_WIDTH);
    const toDraw = subjectLines.slice(0, 3);
    for (const line of toDraw) {
      drawText(doc, line, MARGIN, y);
      y += 4.5;
    }
    y += 3;
    hr(doc, y);
    y += 6;
  }

  // ─── ITEMS TABLE ─────────────────────────────────────────
  y = sectionLabel(doc, 'Items', y);

  const colDesc = MARGIN;
  const colQty = MARGIN + 100;
  const colRate = MARGIN + 125;
  const colAmt = PAGE_WIDTH - MARGIN;

  doc.setFillColor(...CREAM);
  doc.rect(MARGIN, y - 4, CONTENT_WIDTH, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...PLUM);
  doc.text('DESCRIPTION', colDesc + 2, y + 1);
  doc.text('QTY', colQty, y + 1, { align: 'center' });
  doc.text('RATE', colRate, y + 1, { align: 'right' });
  doc.text('AMOUNT', colAmt - 2, y + 1, { align: 'right' });

  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(serviceName, colDesc + 2, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(bd.sessions), colQty, y, { align: 'center' });
  doc.text(formatPrice(bd.perSessionLocal, bd.displayCurrency), colRate, y, {
    align: 'right',
  });
  doc.setFont('helvetica', 'bold');
  doc.text(formatPrice(bd.subtotalLocal, bd.displayCurrency), colAmt - 2, y, {
    align: 'right',
  });
  y += 5;

  // Sub-line description
  const subParts: string[] = [];
  if (service) subParts.push(`${service.duration} session`);
  if (bd.complexityPercent > 0)
    subParts.push(`+${Math.round(bd.complexityPercent * 100)}% complexity`);
  if (bd.packageDiscountPercent > 0)
    subParts.push(`${bd.sessions}-pack (-${Math.round(bd.packageDiscountPercent * 100)}%)`);
  if (bd.slidingScalePercent > 0)
    subParts.push(`Sliding scale -${Math.round(bd.slidingScalePercent * 100)}%`);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  if (subParts.length > 0) {
    const sub = subParts.join(' · ');
    const wrapped = wrap(doc, sub, CONTENT_WIDTH - 5);
    for (const w of wrapped) {
      doc.text(w, colDesc + 2, y);
      y += 3.5;
    }
  }
  y += 3;

  if (bd.taxAmountLocal > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text('HST 13% (Ontario)', colDesc + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.text(formatPrice(bd.taxAmountLocal, bd.displayCurrency), colAmt - 2, y, {
      align: 'right',
    });
    y += 5;
  }

  y += 3;
  hr(doc, y);
  y += 6;

  // ─── TOTALS ──────────────────────────────────────────────
  const labelX = PAGE_WIDTH - MARGIN - 70;
  const valueX = PAGE_WIDTH - MARGIN - 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text('Subtotal', labelX, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(formatPrice(bd.subtotalLocal, bd.displayCurrency), valueX, y, { align: 'right' });
  y += 5;

  if (bd.taxAmountLocal > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT);
    doc.text('HST 13%', labelX, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK);
    doc.text(formatPrice(bd.taxAmountLocal, bd.displayCurrency), valueX, y, { align: 'right' });
    y += 5;
  }

  // PAID total — green box + gold accent strip
  doc.setFillColor(...GOLD);
  doc.rect(labelX - 5, y - 4, 1, 9, 'F');
  doc.setFillColor(...GREEN);
  doc.rect(labelX - 4, y - 4, 74, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...WHITE);
  doc.text('PAID', labelX, y + 1);
  doc.text(formatPrice(bd.totalLocal, bd.displayCurrency), valueX, y + 1, { align: 'right' });
  y += 9;

  if (bd.displayCurrency !== 'CAD') {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(`(${formatPrice(bd.totalCAD, 'CAD')} equivalent)`, valueX, y, { align: 'right' });
    y += 5;
  }

  y += 6;
  hr(doc, y);
  y += 8;

  // ─── THANK YOU MESSAGE ───────────────────────────────────
  const thankYou =
    input.thankYouMessage ||
    'Thank you for your trust and your investment in your wellbeing. We look forward to supporting you on your journey.';
  y = sectionLabel(doc, 'A note from our team', y, GOLD);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  const thankLines = wrap(doc, `"${thankYou}"`, CONTENT_WIDTH);
  for (const l of thankLines) {
    doc.text(l, MARGIN, y);
    y += 4.5;
  }
  // Decorative gold line under the note
  y += 2;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, MARGIN + 40, y);
  y += 4;

  // ─── FOOTER ──────────────────────────────────────────────
  const footerBandY = PAGE_HEIGHT - MARGIN - 14;
  const footerBandH = 10;

  doc.setFillColor(...CREAM);
  doc.rect(MARGIN, footerBandY, CONTENT_WIDTH, footerBandH, 'F');

  doc.setFillColor(...GOLD_LIGHT);
  doc.rect(MARGIN, footerBandY, CONTENT_WIDTH, 0.6, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...PLUM);
  doc.text(
    BUSINESS.tagline,
    PAGE_WIDTH / 2,
    footerBandY + 4.5,
    { align: 'center' },
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(
    'This document confirms payment of the above invoice and serves as your official receipt.',
    PAGE_WIDTH / 2,
    footerBandY + 8,
    { align: 'center' },
  );

  // Mirrored bottom strip
  doc.setFillColor(...GOLD);
  doc.rect(0, PAGE_HEIGHT - 4, PAGE_WIDTH, 1, 'F');
  doc.setFillColor(...PLUM);
  doc.rect(0, PAGE_HEIGHT - 3, PAGE_WIDTH, 3, 'F');

  return Buffer.from(doc.output('arraybuffer'));
}

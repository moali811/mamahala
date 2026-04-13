/* ================================================================
   POST /api/admin/invoices/mark-paid
   ================================================================
   Marks an invoice as paid + auto-generates a Receipt PDF + sends
   the receipt email via Resend (unless dry-run mode).
   Also recomputes the customer's aggregate stats.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  updateInvoiceStatus,
  getSettings,
} from '@/lib/invoicing/kv-store';
import { generateReceiptPdf } from '@/lib/invoicing/receipt-pdf';
import { sendReceiptEmail } from '@/lib/invoicing/email-sender';
import { recomputeCustomerStats } from '@/lib/invoicing/customer-store';
import type { PaymentMethodRecord } from '@/lib/invoicing/types';

export const maxDuration = 30;

const ALLOWED_METHODS: PaymentMethodRecord[] = [
  'e-transfer',
  'wire',
  'paypal',
  'other',
  'unknown',
];

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      invoiceId?: string;
      paymentMethod?: PaymentMethodRecord;
    };

    if (!body.invoiceId) {
      return NextResponse.json(
        { error: 'Missing invoiceId' },
        { status: 400 },
      );
    }

    const method: PaymentMethodRecord = ALLOWED_METHODS.includes(
      body.paymentMethod as PaymentMethodRecord,
    )
      ? (body.paymentMethod as PaymentMethodRecord)
      : 'other';

    // Step 1: update invoice status to paid
    const updated = await updateInvoiceStatus(
      body.invoiceId,
      'paid',
      method,
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    // Step 2: load settings, generate receipt PDF, send receipt email
    const settings = await getSettings();
    const paidAt = updated.paidAt ?? new Date().toISOString();

    let receiptEmailSent = false;
    let receiptError: string | null = null;

    try {
      const receiptPdf = await generateReceiptPdf(
        {
          invoice: updated,
          paymentMethod: method,
          paidAt,
        },
        settings,
      );

      // Send email unless dry-run mode
      if (!settings.dryRun) {
        try {
          await sendReceiptEmail(
            updated,
            receiptPdf,
            method,
            paidAt,
            settings,
          );
          receiptEmailSent = true;
        } catch (emailErr) {
          receiptError =
            emailErr instanceof Error
              ? emailErr.message
              : 'Email send failed';
          console.error('Receipt email failed:', emailErr);
        }
      }
    } catch (pdfErr) {
      receiptError =
        pdfErr instanceof Error
          ? pdfErr.message
          : 'Receipt PDF generation failed';
      console.error('Receipt PDF error:', pdfErr);
    }

    // Step 3: recompute customer stats
    try {
      await recomputeCustomerStats(updated.draft.client.email);
    } catch (custErr) {
      console.error('Customer stats recompute failed:', custErr);
    }

    return NextResponse.json({
      ok: true,
      invoice: updated,
      receiptEmailSent,
      receiptError,
    });
  } catch (err) {
    console.error('Mark paid error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

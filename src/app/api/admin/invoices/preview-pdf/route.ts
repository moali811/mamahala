/* ================================================================
   POST /api/admin/invoices/preview-pdf
   ================================================================
   Generates an in-memory PDF from a draft and streams it back as
   application/pdf. No KV writes, no email. Used by the Compose tab
   Preview modal to show Dr. Hala exactly what the client will see.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { getSettings } from '@/lib/invoicing/kv-store';
import type { InvoiceDraft, StoredInvoice } from '@/lib/invoicing/types';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { draft?: InvoiceDraft };
    const draft = body?.draft;
    if (!draft) {
      return NextResponse.json(
        { error: 'Missing draft' },
        { status: 400 },
      );
    }

    const settings = await getSettings();
    const breakdown = computeRateBreakdown(draft, settings);
    if (!breakdown) {
      return NextResponse.json(
        { error: 'Could not compute breakdown' },
        { status: 400 },
      );
    }

    // Respect the admin's issue-date override. Parse YYYY-MM-DD as UTC
    // midnight so the displayed date doesn't drift across timezones.
    const parseIssueDate = (raw: string | undefined): Date => {
      if (!raw) return new Date();
      const m = raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
      const d = new Date(raw);
      return isNaN(d.getTime()) ? new Date() : d;
    };
    const issueDateObj = parseIssueDate(draft.issueDate);
    const issuedAt = issueDateObj.toISOString();
    const due = new Date(issueDateObj);
    due.setUTCDate(due.getUTCDate() + (draft.daysUntilDue || 7));
    const dueDate = due.toISOString();
    const nowIso = new Date().toISOString();

    // Synthetic StoredInvoice for the preview — not persisted
    const previewInvoice: StoredInvoice = {
      invoiceId: 'inv_preview',
      invoiceNumber: 'INV-PREVIEW',
      draft,
      breakdown,
      status: 'draft',
      issuedAt,
      dueDate,
      paymentMethod: 'unknown',
      createdAt: nowIso,
      updatedAt: nowIso,
      dryRun: true,
    };

    const pdf = await generateInvoicePdf(previewInvoice, settings);

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="invoice-preview.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Invoice preview PDF error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/* ================================================================
   POST /api/admin/invoices/ai/insights
   ================================================================
   Generates an AI client insights summary for a customer.
   Caches result in the customer record.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { generateClientInsights } from '@/lib/invoicing/ai-insights';
import {
  getCustomer,
  setCustomerInsight,
} from '@/lib/invoicing/customer-store';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const email = body.customerEmail?.toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: 'Missing customerEmail' },
        { status: 400 },
      );
    }

    const customer = await getCustomer(email);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 },
      );
    }

    // Load this customer's invoice history
    const all = await listInvoiceRecords(200);
    const invoices = all.filter(
      (i) => i.draft.client.email.toLowerCase() === email,
    );

    if (invoices.length === 0) {
      return NextResponse.json(
        { error: 'No invoices for this customer yet — nothing to summarize' },
        { status: 400 },
      );
    }

    const result = await generateClientInsights({ customer, invoices });

    // Cache in the customer record
    await setCustomerInsight(email, result.summary, result.tags);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('AI insights error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

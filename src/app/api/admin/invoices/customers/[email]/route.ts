/* ================================================================
   GET /api/admin/invoices/customers/[email]
   ================================================================
   Get a single customer + their invoice history.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { getCustomer, recomputeCustomerStats } from '@/lib/invoicing/customer-store';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ email: string }> },
) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { email: rawEmail } = await ctx.params;
    const email = decodeURIComponent(rawEmail).toLowerCase();

    // Always recompute stats on view (cheap, ensures freshness)
    await recomputeCustomerStats(email);
    const customer = await getCustomer(email);

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 },
      );
    }

    // Load this customer's invoices from the global recent list
    const all = await listInvoiceRecords(200);
    const invoices = all.filter(
      (i) => i.draft.client.email.toLowerCase() === email,
    );

    return NextResponse.json({ customer, invoices });
  } catch (err) {
    console.error('Customer detail error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/* ================================================================
   GET /api/admin/invoices/search
   ================================================================
   Server-side search + filter on invoices.
   Query params:
   - q: text search (matches name, email, invoice number)
   - status: draft | sent | paid | overdue | void | unpaid | all
     (unpaid = sent + overdue)
   - country: ISO-2
   - limit: max results
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import type { StoredInvoice } from '@/lib/invoicing/types';

export async function GET(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const url = new URL(req.url);
    // Cap each filter at a sane length so an oversized query string can't be
    // used to slow the per-record substring matching loop below.
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 200);
    const status = (url.searchParams.get('status') ?? 'all').slice(0, 32);
    const country = (url.searchParams.get('country') ?? '').toUpperCase().slice(0, 8);
    const limit = Math.min(
      200,
      parseInt(url.searchParams.get('limit') ?? '100', 10) || 100,
    );

    const all = await listInvoiceRecords(200);
    const now = Date.now();

    let filtered: StoredInvoice[] = all.map((r) => {
      // Compute overdue dynamically
      if (r.status === 'sent' && Date.parse(r.dueDate) < now) {
        return { ...r, status: 'overdue' };
      }
      return r;
    });

    // Status filter
    if (status === 'unpaid') {
      filtered = filtered.filter(
        (i) => i.status === 'sent' || i.status === 'overdue',
      );
    } else if (status !== 'all') {
      filtered = filtered.filter((i) => i.status === status);
    }

    // Country filter
    if (country) {
      filtered = filtered.filter(
        (i) => i.draft.client.country.toUpperCase() === country,
      );
    }

    // Text search
    if (q) {
      filtered = filtered.filter((i) => {
        const name = i.draft.client.name.toLowerCase();
        const email = i.draft.client.email.toLowerCase();
        const num = i.invoiceNumber.toLowerCase();
        return name.includes(q) || email.includes(q) || num.includes(q);
      });
    }

    return NextResponse.json({ invoices: filtered.slice(0, limit), total: filtered.length });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

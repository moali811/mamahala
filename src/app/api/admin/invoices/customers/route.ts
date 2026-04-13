/* ================================================================
   GET/POST/DELETE /api/admin/invoices/customers
   ================================================================
   List, create/update, and delete customers.
   GET also auto-runs the one-time sync from existing invoices on
   first load (idempotent).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  listCustomers,
  upsertCustomer,
  deleteCustomer,
  syncFromInvoices,
} from '@/lib/invoicing/customer-store';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const sync = url.searchParams.get('sync') === '1';
    const limit = Math.min(
      500,
      parseInt(url.searchParams.get('limit') ?? '200', 10) || 200,
    );

    let syncResult: { created: number; updated: number } | null = null;
    if (sync) {
      syncResult = await syncFromInvoices();
    }

    const customers = await listCustomers(limit);
    return NextResponse.json({ customers, syncResult });
  } catch (err) {
    console.error('Customer list error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 },
      );
    }

    const customer = await upsertCustomer(
      {
        email: body.email,
        name: body.name,
        country: body.country,
        phone: body.phone,
        address: body.address,
        notes: body.notes,
        tags: body.tags,
      },
      'manual',
    );

    if (!customer) {
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, customer });
  } catch (err) {
    console.error('Customer save error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    const ok = await deleteCustomer(email);
    return NextResponse.json({ ok });
  } catch (err) {
    console.error('Customer delete error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

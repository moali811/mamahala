/* GET /api/account/receipts — Client's invoices/receipts */

import { NextResponse } from 'next/server';
import { getBookingSession } from '@/lib/booking/booking-store';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    if (!KV_AVAILABLE) {
      return NextResponse.json({ invoices: [] });
    }

    // Get invoice IDs for this customer
    const invoiceIds = await kv.get<string[]>(`invoices:by-customer:${session.email}`) ?? [];

    if (invoiceIds.length === 0) {
      return NextResponse.json({ invoices: [] });
    }

    // Fetch invoice summaries
    const invoices = await Promise.all(
      invoiceIds.slice(0, 20).map(async (id) => {
        const invoice = await kv.get<any>(`invoice:${id}`);
        if (!invoice) return null;
        return {
          invoiceId: id,
          invoiceNumber: invoice.invoiceNumber ?? id,
          status: invoice.status ?? 'unknown',
          totalCAD: invoice.breakdown?.totalCAD ?? null,
          totalLocal: invoice.breakdown?.totalLocal ?? null,
          currency: invoice.breakdown?.displayCurrency ?? 'CAD',
          issuedAt: invoice.issuedAt ?? invoice.createdAt,
          serviceName: invoice.draft?.serviceSlug?.replace(/-/g, ' ') ?? '',
        };
      }),
    );

    return NextResponse.json({
      invoices: invoices
        .filter(Boolean)
        .sort((a: any, b: any) => (b.issuedAt ?? '').localeCompare(a.issuedAt ?? '')),
    });
  } catch (err) {
    console.error('[Account Receipts] Error:', err);
    return NextResponse.json({ error: 'Failed to load receipts' }, { status: 500 });
  }
}

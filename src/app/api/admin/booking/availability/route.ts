/* GET/POST /api/admin/booking/availability — Manage availability rules */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailabilityRules, saveAvailabilityRules } from '@/lib/booking/booking-store';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  const rules = await getAvailabilityRules();
  return NextResponse.json(rules);
}

export async function POST(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  try {
    const updates = await request.json();
    const current = await getAvailabilityRules();
    const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };
    await saveAvailabilityRules(merged);
    return NextResponse.json({ ok: true, rules: merged });
  } catch (err) {
    console.error('[Admin Availability] Error:', err);
    return NextResponse.json({ error: 'Failed to update rules' }, { status: 500 });
  }
}

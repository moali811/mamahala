/* GET/POST /api/admin/booking/availability — Manage availability rules */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailabilityRules, saveAvailabilityRules } from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rules = await getAvailabilityRules();
  return NextResponse.json(rules);
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

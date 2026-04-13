/* ================================================================
   GET/POST/DELETE /api/admin/invoices/recurring
   ================================================================
   List, create, update, delete recurring schedules.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  listSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '@/lib/invoicing/recurring';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const schedules = await listSchedules();
    return NextResponse.json({ schedules });
  } catch (err) {
    console.error('Recurring list error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();

    // If scheduleId is supplied, update; else create
    if (body.scheduleId) {
      const updated = await updateSchedule(body.scheduleId, body.patch ?? {});
      if (!updated) {
        return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
      }
      return NextResponse.json({ ok: true, schedule: updated });
    }

    if (
      !body.customerEmail ||
      !body.templateDraft ||
      !body.cadence ||
      typeof body.anchor !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Missing customerEmail, templateDraft, cadence, or anchor' },
        { status: 400 },
      );
    }

    const schedule = await createSchedule({
      customerEmail: body.customerEmail,
      templateDraft: body.templateDraft,
      cadence: body.cadence,
      anchor: body.anchor,
      startDate: body.startDate,
      endDate: body.endDate,
      autoSend: body.autoSend,
    });

    if (!schedule) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, schedule });
  } catch (err) {
    console.error('Recurring save error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    const ok = await deleteSchedule(id);
    return NextResponse.json({ ok });
  } catch (err) {
    console.error('Recurring delete error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

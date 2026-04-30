/* ================================================================
   WhatsApp Webhook — verification + inbound message handling
   ================================================================
   GET  → Meta verification handshake. Echo `hub.challenge` back
          when `hub.mode=subscribe` and `hub.verify_token` matches
          our env var.
   POST → Inbound events from Meta. We only care about user-sent
          text messages and the STOP keyword. Everything else is
          acknowledged with 200 so Meta doesn't retry.

   Security:
     - Signature: X-Hub-Signature-256 must match HMAC-SHA256(body)
       with WA_APP_SECRET. Reject otherwise.
     - We use the RAW request body for HMAC; do NOT parse before
       verifying.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { findCustomerByPhone, recordWhatsappOptOut, isStopKeyword } from '@/lib/whatsapp/consent';
import { sendFreeFormText } from '@/lib/whatsapp/client';
import { appendAudit } from '@/lib/audit/log';

export const dynamic = 'force-dynamic';

/* ─── GET: verification handshake ─────────────────────────────── */

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const mode = params.get('hub.mode');
  const token = params.get('hub.verify_token');
  const challenge = params.get('hub.challenge');

  const expected = process.env.WA_WEBHOOK_VERIFY_TOKEN || '';
  if (mode === 'subscribe' && expected && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200, headers: { 'content-type': 'text/plain' } });
  }
  return NextResponse.json({ error: 'verify failed' }, { status: 403 });
}

/* ─── POST: inbound messages ──────────────────────────────────── */

interface InboundMessageContent {
  from?: string;
  id?: string;
  type?: string;
  text?: { body?: string };
}

interface InboundChange {
  value?: {
    messaging_product?: string;
    metadata?: { display_phone_number?: string; phone_number_id?: string };
    messages?: InboundMessageContent[];
  };
  field?: string;
}

interface InboundEntry {
  id?: string;
  changes?: InboundChange[];
}

interface InboundPayload {
  object?: string;
  entry?: InboundEntry[];
}

function verifySignature(rawBody: string, headerSig: string | null, secret: string): boolean {
  if (!headerSig || !secret) return false;
  // Header format: "sha256=<hex>"
  const [scheme, signature] = headerSig.split('=');
  if (scheme !== 'sha256' || !signature) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const sig = request.headers.get('x-hub-signature-256');
  const secret = process.env.WA_APP_SECRET || '';

  // Allow unsigned requests only when no secret is configured (local
  // dev). In every production deployment WA_APP_SECRET is required.
  if (secret && !verifySignature(rawBody, sig, secret)) {
    return NextResponse.json({ error: 'bad signature' }, { status: 401 });
  }

  let payload: InboundPayload;
  try {
    payload = JSON.parse(rawBody) as InboundPayload;
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (payload.object !== 'whatsapp_business_account') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const messages: Array<{ from: string; text: string }> = [];
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const msg of change.value?.messages ?? []) {
        if (msg.type !== 'text') continue;
        const text = msg.text?.body ?? '';
        const from = msg.from ?? '';
        if (!from) continue;
        messages.push({ from, text });
      }
    }
  }

  for (const m of messages) {
    if (!isStopKeyword(m.text)) continue;
    try {
      const customer = await findCustomerByPhone(m.from);
      if (customer) {
        await recordWhatsappOptOut(customer.email);
        await appendAudit({
          actor: 'webhook',
          actorId: customer.email,
          action: 'customer.whatsapp-opt-out',
          entityId: customer.email,
          details: { source: 'inbound-stop', from: m.from },
        });
        // Acknowledge in-channel — STOP responses are inside the 24h
        // service window so a free-form text is allowed.
        await sendFreeFormText(
          m.from,
          'You\'re unsubscribed from Mama Hala WhatsApp messages. Email updates continue as before. Reply START to opt back in (we won\'t auto-resume).',
        );
      } else {
        // No matching customer — still log so admin can review.
        console.warn('[wa webhook] STOP from unknown number', { from: m.from });
      }
    } catch (err) {
      console.error('[wa webhook] STOP processing failed:', err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

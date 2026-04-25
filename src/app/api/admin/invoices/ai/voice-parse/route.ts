/* ================================================================
   POST /api/admin/invoices/ai/voice-parse
   ================================================================
   Parses a voice transcript into a structured partial InvoiceDraft
   using Claude. The client pre-transcribed the audio via the browser's
   Web Speech API and sent the text along with the selected language.

   Body: { transcript: string, language: 'en' | 'ar' }
   Returns: { ok: true, parsed: VoiceParseResult }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { parseVoiceInvoice } from '@/lib/invoicing/voice-parser';
import { listCustomers } from '@/lib/invoicing/customer-store';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = await req.json();
    const transcript = (body?.transcript as string) || '';
    const language = (body?.language as 'en' | 'ar') || 'en';

    if (!transcript.trim()) {
      return NextResponse.json(
        { error: 'Empty transcript' },
        { status: 400 },
      );
    }

    if (language !== 'en' && language !== 'ar') {
      return NextResponse.json(
        { error: 'Invalid language (must be "en" or "ar")' },
        { status: 400 },
      );
    }

    // Pull the current customer roster so Claude can match by name
    const customers = await listCustomers(500);

    const parsed = await parseVoiceInvoice({
      transcript,
      language,
      customers,
    });

    return NextResponse.json({ ok: true, parsed });
  } catch (err) {
    console.error('Voice parse route error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

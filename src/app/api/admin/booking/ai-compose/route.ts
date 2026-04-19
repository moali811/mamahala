/* ================================================================
   POST /api/admin/booking/ai-compose — AI-driven booking compose
   ================================================================
   Takes a natural-language booking request from Dr. Hala, runs the
   tool_use orchestrator, and streams NDJSON events back so the UI
   can show tool-call progress in real time.

   Terminal event is one of:
     {type: 'draft_ready', bookingId, draftId, ...}
     {type: 'clarification', message}
     {type: 'error', message}
   followed by {type: 'done'}.

   Admin-only (authorize via Bearer token, same as other admin routes).
   Input capped at 2000 chars.
   ================================================================ */

import { NextRequest } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { getEffectiveLocation } from '@/lib/booking/provider-location';
import {
  runComposeOrchestrator,
  type ComposeEvent,
} from '@/lib/booking/ai-compose/orchestrator';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_INPUT_CHARS = 2000;

interface ComposeRequest {
  nlInput: string;
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return errJson('Unauthorized', 401);
  }

  let body: ComposeRequest;
  try {
    body = await req.json();
  } catch {
    return errJson('Invalid JSON', 400);
  }

  const nlInput = (body.nlInput ?? '').toString().trim();
  if (!nlInput) return errJson('nlInput is required', 400);
  if (nlInput.length > MAX_INPUT_CHARS) {
    return errJson(`nlInput exceeds ${MAX_INPUT_CHARS} characters`, 400);
  }

  // Resolve provider location / timezone for the prompt context
  const now = new Date();
  const loc = await getEffectiveLocation(now);
  const weekday = now.toLocaleDateString('en-US', {
    timeZone: loc.timezone,
    weekday: 'long',
  });
  const todayIso = new Intl.DateTimeFormat('en-CA', {
    timeZone: loc.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now); // en-CA gives YYYY-MM-DD

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (event: ComposeEvent) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
        } catch {
          // Stream may already be closed — ignore
        }
      };

      try {
        await runComposeOrchestrator({
          nlInput,
          context: {
            todayIso,
            todayWeekday: weekday,
            providerTimezone: loc.timezone,
            providerLocationLabel: loc.locationLabel,
          },
          emit,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Orchestrator failed';
        emit({ type: 'error', message });
      } finally {
        emit({ type: 'done' });
        try {
          controller.close();
        } catch {
          // Already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

function errJson(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

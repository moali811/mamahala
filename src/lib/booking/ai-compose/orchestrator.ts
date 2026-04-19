/* ================================================================
   AI Compose — Orchestrator (tool_use loop)
   ================================================================
   Runs a Claude Sonnet 4.6 tool_use loop against the four AI
   Compose tools. Emits streaming NDJSON events (one JSON per line)
   so the admin UI can show tool progress in real time:

     {type: 'tool_use',  name: 'search_client',   input: {...}}
     {type: 'tool_result', name: 'search_client', ok: true, preview: '...'}
     {type: 'draft_ready', bookingId, draftId, filled: {...}}
     {type: 'clarification', message: '...'}
     {type: 'error', message: '...'}

   Max 6 tool turns (circuit breaker). System prompt + tool defs
   are cached via cache_control on the last system block — tools
   render before system in the prefix so both are cached together.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import type { Booking } from '@/lib/booking/types';
import {
  COMPOSE_SYSTEM_PROMPT,
  COMPOSE_FEW_SHOTS,
  buildComposeContextBlock,
  type ComposePromptContext,
} from './prompt';
import { COMPOSE_TOOLS, executeTool } from './tools';
import { updateBooking } from '@/lib/booking/booking-store';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 2048;
const MAX_TURNS = 6;

export interface ComposeOrchestratorInput {
  nlInput: string;
  context: ComposePromptContext;
  /** Called with each event as NDJSON-serializable object. */
  emit: (event: ComposeEvent) => void;
}

export type ComposeEvent =
  | { type: 'tool_use'; name: string; input: unknown }
  | { type: 'tool_result'; name: string; ok: boolean; summary: string }
  | { type: 'draft_ready'; bookingId: string; draftId: string | null; filled: unknown; kind: 'single' | 'series'; seriesId?: string }
  | { type: 'clarification'; message: string }
  | { type: 'error'; message: string }
  | { type: 'done' };

export interface ComposeOrchestratorResult {
  finished: 'draft' | 'clarification' | 'error';
  bookingId?: string;
  draftId?: string | null;
  filled?: unknown;
  clarification?: string;
  errorMessage?: string;
  turns: number;
  toolCalls: Array<{ name: string; ok: boolean }>;
  tokensUsed: { input: number; output: number; cacheRead: number };
}

export async function runComposeOrchestrator(
  args: ComposeOrchestratorInput,
): Promise<ComposeOrchestratorResult> {
  const { nlInput, context, emit } = args;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    emit({ type: 'error', message: 'AI is not configured (missing ANTHROPIC_API_KEY).' });
    return finalResult('error', { errorMessage: 'AI not configured', turns: 0, toolCalls: [], tokensUsed: zeroUsage() });
  }

  const client = new Anthropic({ apiKey });

  // Seed with few-shots, then the real request
  const contextBlock = buildComposeContextBlock(context, nlInput);
  const messages: Anthropic.MessageParam[] = [
    ...COMPOSE_FEW_SHOTS,
    { role: 'user', content: contextBlock },
  ];

  const toolCalls: Array<{ name: string; ok: boolean }> = [];
  const usage = zeroUsage();
  let turns = 0;
  let draftInfo: {
    bookingId: string;
    draftId: string | null;
    filled: unknown;
    kind: 'single' | 'series';
    seriesId?: string;
  } | null = null;

  while (turns < MAX_TURNS) {
    turns += 1;
    let response: Anthropic.Message;
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        tools: COMPOSE_TOOLS,
        system: [
          {
            type: 'text',
            text: COMPOSE_SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages,
      });
    } catch (e) {
      const message = formatApiError(e);
      emit({ type: 'error', message });
      return finalResult('error', { errorMessage: message, turns, toolCalls, tokensUsed: usage });
    }

    usage.input += response.usage.input_tokens ?? 0;
    usage.output += response.usage.output_tokens ?? 0;
    usage.cacheRead += response.usage.cache_read_input_tokens ?? 0;

    // Append the assistant turn to history (must include all content blocks)
    messages.push({ role: 'assistant', content: response.content });

    // Extract tool_use and text blocks
    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
    );
    const textBlocks = response.content.filter(
      (b): b is Anthropic.TextBlock => b.type === 'text',
    );

    // No tool use → terminal clarification (or empty/odd response)
    if (toolUseBlocks.length === 0) {
      const message = textBlocks.map(b => b.text).join('\n\n').trim();
      if (!message) {
        emit({ type: 'error', message: 'AI produced an empty response.' });
        return finalResult('error', { errorMessage: 'Empty response', turns, toolCalls, tokensUsed: usage });
      }
      emit({ type: 'clarification', message });
      return finalResult('clarification', { clarification: message, turns, toolCalls, tokensUsed: usage });
    }

    // Execute every tool_use in this turn (usually one, but handle parallel calls)
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const tu of toolUseBlocks) {
      emit({ type: 'tool_use', name: tu.name, input: tu.input });
      const exec = await executeTool(tu.name, tu.input);
      toolCalls.push({ name: tu.name, ok: !exec.isError });
      emit({
        type: 'tool_result',
        name: tu.name,
        ok: !exec.isError,
        summary: summarizeResult(tu.name, exec.content, exec.isError),
      });

      toolResults.push({
        type: 'tool_result',
        tool_use_id: tu.id,
        content: exec.content,
        is_error: exec.isError,
      });

      // draft_booking is terminal — remember the hold info
      if (tu.name === 'draft_booking' && !exec.isError) {
        try {
          const parsed = JSON.parse(exec.content);
          if (parsed?.ok) {
            draftInfo = {
              bookingId: parsed.primaryBookingId ?? parsed.bookingId,
              draftId: parsed.primaryDraftId ?? parsed.draftId ?? null,
              filled: parsed.filled,
              kind: parsed.kind,
              seriesId: parsed.seriesId,
            };
          }
        } catch {
          // Swallow JSON parse errors — the tool result is still appended for the model
        }
      }
    }

    // Append tool results as the next user turn
    messages.push({ role: 'user', content: toolResults });

    // If we successfully created a draft, persist the AI trace and stop.
    // We don't wait for the model's post-draft text — it would just echo
    // confirmation and burn tokens. The UI already has what it needs.
    if (draftInfo) {
      // Fire-and-forget the audit write; don't block the response on it
      void persistComposeTrace(draftInfo.bookingId, {
        nlInput,
        turns,
        toolCalls,
        tokensUsed: usage,
      });

      emit({
        type: 'draft_ready',
        bookingId: draftInfo.bookingId,
        draftId: draftInfo.draftId,
        filled: draftInfo.filled,
        kind: draftInfo.kind,
        seriesId: draftInfo.seriesId,
      });
      return finalResult('draft', {
        bookingId: draftInfo.bookingId,
        draftId: draftInfo.draftId,
        filled: draftInfo.filled,
        turns,
        toolCalls,
        tokensUsed: usage,
      });
    }

    // Loop — Claude gets the tool results and decides the next step
  }

  const message = `AI Compose hit the maximum of ${MAX_TURNS} tool turns without resolving. Please try a more specific request.`;
  emit({ type: 'error', message });
  return finalResult('error', { errorMessage: message, turns, toolCalls, tokensUsed: usage });
}

// ─── Helpers ─────────────────────────────────────────────────────

function zeroUsage() {
  return { input: 0, output: 0, cacheRead: 0 };
}

function finalResult(
  finished: 'draft' | 'clarification' | 'error',
  extras: Omit<ComposeOrchestratorResult, 'finished'>,
): ComposeOrchestratorResult {
  return { finished, ...extras };
}

function formatApiError(e: unknown): string {
  if (e instanceof Anthropic.RateLimitError) {
    return 'AI is rate-limited right now — try again in a moment.';
  }
  if (e instanceof Anthropic.AuthenticationError) {
    return 'AI is not authenticated (check ANTHROPIC_API_KEY).';
  }
  if (e instanceof Anthropic.APIError) {
    return `AI error (${e.status}): ${e.message}`;
  }
  if (e instanceof Error) return e.message;
  return 'AI call failed.';
}

/** Produce a short human-readable summary of a tool result for the UI event feed. */
function summarizeResult(toolName: string, raw: string, isError: boolean): string {
  if (isError) {
    try {
      const parsed = JSON.parse(raw);
      return parsed.error ?? 'Tool error';
    } catch {
      return 'Tool error';
    }
  }
  try {
    const parsed = JSON.parse(raw);
    switch (toolName) {
      case 'search_client': {
        const n = parsed.matches?.length ?? 0;
        if (n === 0) return 'No matching clients — treating as new.';
        if (n === 1) return `Found 1 match: ${parsed.matches[0].name}`;
        return `Found ${n} matches`;
      }
      case 'match_service': {
        const top = parsed.matches?.[0];
        if (!top) return 'No service match';
        return `Top match: ${top.name} (${Math.round(top.confidence * 100)}%)`;
      }
      case 'find_availability': {
        const n = parsed.slots?.length ?? 0;
        return n > 0 ? `${n} slot${n === 1 ? '' : 's'} on ${parsed.date}` : `No slots on ${parsed.date}`;
      }
      case 'draft_booking': {
        if (parsed.ok) return `Hold created (${parsed.kind})`;
        return parsed.error ?? 'Draft failed';
      }
      default:
        return 'Done';
    }
  } catch {
    return 'Done';
  }
}

/**
 * Persist the compose trace onto the booking record for audit. Best-effort —
 * failures don't block the response.
 */
async function persistComposeTrace(
  bookingId: string,
  trace: Booking['aiComposeTrace'],
): Promise<void> {
  try {
    await updateBooking(bookingId, { aiComposeTrace: trace });
  } catch {
    // Swallow — audit failure shouldn't break the flow
  }
}

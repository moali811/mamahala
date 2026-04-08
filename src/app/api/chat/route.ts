/* ================================================================
   AI Learning Companion — streaming chat endpoint.
   POST body: { programSlug, moduleSlug, locale, messages, studentContext, email? }
   Returns: streaming plain text response (chunks)
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import type { AcademyProgram, AcademyModule, Locale } from '@/types';
import { buildSystemPrompt, type StudentContext } from '@/lib/ai-companion/context';
import { limitByIp, limitByEmail, getClientIp } from '@/lib/ai-companion/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL = process.env.AI_COMPANION_MODEL || 'claude-sonnet-4-5';
const MAX_TOKENS = 600;
const MAX_HISTORY_TURNS = 10;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  programSlug: string;
  moduleSlug: string;
  locale: Locale;
  messages: ChatMessage[];
  studentContext?: StudentContext;
  email?: string;
}

async function loadProgram(slug: string): Promise<AcademyProgram | null> {
  try {
    switch (slug) {
      case 'intentional-parent':
        return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens':
        return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together':
        return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass':
        return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      default:
        return null;
    }
  } catch {
    return null;
  }
}

function findModule(program: AcademyProgram, moduleSlug: string): AcademyModule | null {
  for (const level of program.levels) {
    const mod = level.modules.find(m => m.slug === moduleSlug);
    if (mod) return mod;
  }
  return null;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('AI companion not configured', { status: 503 });
  }

  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { programSlug, moduleSlug, locale, messages, studentContext, email } = body;

  if (!programSlug || !moduleSlug || !Array.isArray(messages) || messages.length === 0) {
    return new Response('Missing required fields', { status: 400 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  const ipLimit = await limitByIp(ip);
  if (!ipLimit.allowed) {
    return new Response(
      JSON.stringify({ error: 'rate_limit', resetInSeconds: ipLimit.resetInSeconds }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (email) {
    const emailLimit = await limitByEmail(email);
    if (!emailLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'daily_limit', resetInSeconds: emailLimit.resetInSeconds }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Load module
  const program = await loadProgram(programSlug);
  if (!program) return new Response('Program not found', { status: 404 });
  const mod = findModule(program, moduleSlug);
  if (!mod) return new Response('Module not found', { status: 404 });

  // Build system prompt + truncate history
  const systemPrompt = buildSystemPrompt(mod, studentContext || {}, locale || 'en');
  const history = messages
    .slice(-MAX_HISTORY_TURNS * 2)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: (m.content || '').slice(0, 2000) }));

  if (history[0]?.role !== 'user') {
    return new Response('Conversation must start with user message', { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          temperature: 0.7,
          system: systemPrompt,
          messages: history,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error('[chat] stream error:', err);
        controller.enqueue(encoder.encode('\n\n[Connection error — please try again.]'));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

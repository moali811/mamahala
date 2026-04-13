/* ================================================================
   Voice-to-Invoice Parser — Claude wrapper
   ================================================================
   Takes a free-form voice transcript (English or Arabic) and parses
   it into a structured partial InvoiceDraft. Used by the Compose tab
   to let Dr. Hala dictate invoices instead of typing them.

   The parser receives the current customer roster + service catalog
   as context so it can match "Hala Ali" or "ماما هالة" to the exact
   customer record.

   Returns a confidence score and a list of missing fields so the UI
   can prompt Dr. Hala to clarify before sending.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import { services } from '@/data/services';
import type { Customer } from './types';

export type ParseLanguage = 'en' | 'ar';
export type ParseConfidence = 'high' | 'medium' | 'low';

export interface VoiceParseResult {
  clientEmail: string | null;
  clientName: string | null;
  serviceSlug: string | null;
  amountLocal: number | null;
  currency: string | null;
  subject: string | null;
  daysUntilDue: number | null;
  complexityPreset: 'standard' | 'plus25' | 'plus33' | 'plus50' | null;
  adminNote: string | null;
  confidence: ParseConfidence;
  missingFields: string[];
  suggestions: string[];
  /** Raw transcript echoed back for display. */
  transcript: string;
}

export async function parseVoiceInvoice(args: {
  transcript: string;
  language: ParseLanguage;
  customers: Customer[];
}): Promise<VoiceParseResult> {
  const { transcript, language, customers } = args;

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('AI not configured — ANTHROPIC_API_KEY is missing.');
  }

  if (!transcript || !transcript.trim()) {
    throw new Error('Transcript is empty.');
  }

  // Build the candidate lists that Claude will reference
  const customerList = customers
    .slice(0, 200) // cap for token budget
    .map((c) => {
      const label = c.salutation ? `${c.salutation} ${c.name}` : c.name;
      return `- "${label}" <${c.email}> [${c.country}]`;
    })
    .join('\n');

  const serviceList = services
    .map((s) => `- ${s.slug}: ${s.name}`)
    .join('\n');

  const systemPrompt = `You are an invoice parser for Mama Hala Consulting Group, a family counseling practice owned by Dr. Hala Ali. Dr. Hala dictates invoices by voice in English or Arabic. Your job is to parse her transcript into structured invoice fields.

Rules:
1. Match the client to an exact customer in the provided list whenever possible — return BOTH their full name AND their email address. If the dictation is ambiguous, return the single best match.
2. Match the service to an exact slug from the provided list. Prefer specific services over generic ones (e.g. "parenting session" → "parenting-coaching").
3. Extract amounts, currencies, and dates verbatim from the dictation. Do not hallucinate numbers.
4. If a field is not mentioned in the transcript, return null for that field and add it to missingFields.
5. Confidence levels:
   - "high" = client, service, and amount are all unambiguous
   - "medium" = one or two fields are inferred or slightly unclear
   - "low" = significant ambiguity — admin must clarify
6. Suggestions should be short clarifying questions (max 2).
7. daysUntilDue default is 7 if not specified.
8. complexityPreset values: "standard" | "plus25" | "plus33" | "plus50". Only set if explicitly mentioned.
9. Currency codes are ISO-4217: CAD, USD, AED, SAR, EUR, GBP, etc. Detect from phrases like "dollars" (context-sensitive), "dirhams" (AED), "riyals" (SAR).
10. adminNote captures any context Dr. Hala mentions that doesn't fit other fields.

Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start with { and end with }.

Output shape:
{
  "clientEmail": string | null,
  "clientName": string | null,
  "serviceSlug": string | null,
  "amountLocal": number | null,
  "currency": string | null,
  "subject": string | null,
  "daysUntilDue": number | null,
  "complexityPreset": "standard" | "plus25" | "plus33" | "plus50" | null,
  "adminNote": string | null,
  "confidence": "high" | "medium" | "low",
  "missingFields": string[],
  "suggestions": string[]
}`;

  const userPrompt = `Parse this voice dictation into an invoice draft.

TRANSCRIPT (${language}):
"""
${transcript.trim()}
"""

CUSTOMER ROSTER (pick one exact match when possible):
${customerList}

SERVICE CATALOG (pick one exact slug):
${serviceList}

Return the structured JSON now.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = 'claude-sonnet-4-20250514';

  const message = await client.messages.create({
    model,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
      { role: 'assistant', content: '{' },
    ],
  });

  const responseText =
    '{' +
    message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((b) => b.text)
      .join('');

  let parsed: Partial<VoiceParseResult>;
  try {
    let cleaned = responseText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Try to close dangling braces/quotes
      const open = (cleaned.match(/\{/g) || []).length;
      const close = (cleaned.match(/\}/g) || []).length;
      if (open > close) cleaned += '"}'.repeat(open - close);
      parsed = JSON.parse(cleaned);
    }
  } catch (err) {
    console.error('Voice parse error:', err, 'raw:', responseText);
    throw new Error('AI response was malformed.');
  }

  // Normalize + coerce
  const result: VoiceParseResult = {
    clientEmail: normalizeString(parsed.clientEmail),
    clientName: normalizeString(parsed.clientName),
    serviceSlug: normalizeString(parsed.serviceSlug),
    amountLocal: normalizeNumber(parsed.amountLocal),
    currency: normalizeString(parsed.currency)?.toUpperCase() || null,
    subject: normalizeString(parsed.subject),
    daysUntilDue: normalizeNumber(parsed.daysUntilDue),
    complexityPreset:
      (['standard', 'plus25', 'plus33', 'plus50'] as const).includes(
        parsed.complexityPreset as typeof parsed.complexityPreset & string,
      )
        ? (parsed.complexityPreset as VoiceParseResult['complexityPreset'])
        : null,
    adminNote: normalizeString(parsed.adminNote),
    confidence: (['high', 'medium', 'low'] as const).includes(
      (parsed.confidence || '') as ParseConfidence,
    )
      ? (parsed.confidence as ParseConfidence)
      : 'low',
    missingFields: Array.isArray(parsed.missingFields)
      ? parsed.missingFields.filter((f): f is string => typeof f === 'string')
      : [],
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((f): f is string => typeof f === 'string')
      : [],
    transcript: transcript.trim(),
  };

  return result;
}

function normalizeString(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  return trimmed === '' ? null : trimmed;
}

function normalizeNumber(v: unknown): number | null {
  if (v == null) return null;
  const n = typeof v === 'string' ? parseFloat(v) : (v as number);
  if (!Number.isFinite(n)) return null;
  return n;
}

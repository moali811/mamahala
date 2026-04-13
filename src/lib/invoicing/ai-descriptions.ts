/* ================================================================
   AI Invoice Description Writer — Claude wrapper
   ================================================================
   Generates a one-line, contextually-rich line-item description
   for the invoice based on the service + client + complexity.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import { services } from '@/data/services';

export interface DescriptionResult {
  description: string;
}

export async function generateInvoiceDescription(args: {
  serviceSlug: string;
  clientName?: string;
  clientCountry?: string;
  complexityPercent?: number;
  sessions?: number;
}): Promise<DescriptionResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'AI not configured — ANTHROPIC_API_KEY is missing.',
    );
  }

  const service = services.find((s) => s.slug === args.serviceSlug);
  if (!service) {
    throw new Error(`Service not found: ${args.serviceSlug}`);
  }

  const isComplex = (args.complexityPercent ?? 0) > 0;
  const sessions = args.sessions ?? 1;

  const systemPrompt = `You write short, professional invoice line-item descriptions for Mama Hala Consulting Group, a family counseling practice. Your descriptions are:
- ONE LINE only (max 12 words)
- Factual and clinically appropriate
- Never overly clinical or jargon-heavy
- Never reveal personal client details
- Suitable for a professional invoice / receipt PDF

Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

  const userPrompt = `Generate a one-line invoice description for this counseling session.

Service: ${service.name}
Service description: ${service.shortDesc}
Duration: ${service.duration}
Sessions: ${sessions}
Complexity: ${isComplex ? `Complex case (+${Math.round((args.complexityPercent ?? 0) * 100)}%)` : 'Standard'}
${args.clientName ? `Client first name (for context, do NOT include in output): ${args.clientName.split(' ')[0]}` : ''}

Write a single line that:
- Names the service type
- Mentions the duration / session count where relevant
- (Optional) Hints at the therapeutic approach if appropriate (CBT, attachment-based, family systems, etc.)
- Is factual, professional, and respects client privacy

Respond with this exact JSON structure (no markdown, no code blocks):
{"description":"One-line description here"}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = 'claude-sonnet-4-20250514';

  const message = await client.messages.create({
    model,
    max_tokens: 256,
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

  let parsed: DescriptionResult;
  try {
    let cleaned = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const open = (cleaned.match(/\{/g) || []).length;
      const close = (cleaned.match(/\}/g) || []).length;
      if (open > close) cleaned += '"}'.repeat(open - close);
      parsed = JSON.parse(cleaned);
    }
  } catch {
    throw new Error('AI response was malformed.');
  }

  if (!parsed.description) {
    throw new Error('AI response missing description');
  }

  return parsed;
}

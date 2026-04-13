/* ================================================================
   AI Client Insights — Claude wrapper
   ================================================================
   Generates a 3-4 sentence professional summary of a client based
   on their invoice history. Helps Dr. Hala remember context before
   the next session.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import type { Customer, StoredInvoice } from './types';
import { services } from '@/data/services';

export interface InsightResult {
  summary: string;
  tags: string[];
}

export async function generateClientInsights(args: {
  customer: Customer;
  invoices: StoredInvoice[];
}): Promise<InsightResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'AI not configured — ANTHROPIC_API_KEY is missing.',
    );
  }

  const { customer, invoices } = args;

  // Build contextual summary of their invoice history
  const serviceCounts: Record<string, number> = {};
  for (const inv of invoices) {
    const slug = inv.breakdown.serviceSlug;
    serviceCounts[slug] = (serviceCounts[slug] || 0) + 1;
  }
  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug, count]) => {
      const service = services.find((s) => s.slug === slug);
      return `${service?.name ?? slug} (${count}×)`;
    })
    .join(', ');

  const cadenceMonths = computeAverageCadence(invoices);
  const monthsActive =
    customer.firstInvoiceAt && customer.lastInvoiceAt
      ? Math.max(
          1,
          Math.round(
            (Date.parse(customer.lastInvoiceAt) -
              Date.parse(customer.firstInvoiceAt)) /
              (1000 * 60 * 60 * 24 * 30),
          ),
        )
      : 1;

  const context = {
    name: customer.name,
    country: customer.country,
    totalInvoices: customer.totalInvoices,
    totalPaidCAD: customer.totalPaidCAD,
    outstandingCAD: customer.outstandingCAD,
    firstSeen: customer.firstInvoiceAt
      ? new Date(customer.firstInvoiceAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })
      : 'N/A',
    lastSeen: customer.lastInvoiceAt
      ? new Date(customer.lastInvoiceAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })
      : 'N/A',
    monthsActive,
    averageCadenceMonths: cadenceMonths,
    topServices,
    preferredCurrency: customer.preferredCurrency || 'unknown',
    preferredPaymentMethod: customer.preferredPaymentMethod || 'unknown',
  };

  const systemPrompt = `You are a professional assistant helping Dr. Hala Ali, a family counselor, quickly recall context about her clients before sessions. Be concise, factual, and respectful. Do NOT invent details that aren't provided. Do NOT diagnose or speculate about the client's emotional state. Focus on factual context about their relationship as a client of the practice.

Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

  const userPrompt = `Generate a brief client summary for Dr. Hala's quick reference.

Client context:
- Name: ${context.name}
- Country: ${context.country}
- Total invoices: ${context.totalInvoices}
- Total paid (CAD equivalent): $${context.totalPaidCAD}
- Currently outstanding (CAD): $${context.outstandingCAD}
- First invoice: ${context.firstSeen}
- Most recent invoice: ${context.lastSeen}
- Active for: ${context.monthsActive} month(s)
- Average gap between invoices: ${context.averageCadenceMonths} month(s)
- Most-booked services: ${context.topServices || 'N/A'}
- Preferred currency: ${context.preferredCurrency}
- Preferred payment method: ${context.preferredPaymentMethod}

Write a 3-4 sentence summary that helps Dr. Hala quickly remember:
1. How long this person has been a client
2. What services they've been getting
3. Any factual pattern (frequency, payment behavior, multiple sessions)
4. (Optional) A small note like "returning client" or "one-time" or "high-volume"

Also generate 2-4 short tag pills (1-2 words each) for filtering.

Respond with this exact JSON structure (no markdown, no code blocks):
{"summary":"3-4 sentence factual summary","tags":["tag1","tag2","tag3"]}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = 'claude-sonnet-4-20250514';

  const message = await client.messages.create({
    model,
    max_tokens: 768,
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

  let parsed: InsightResult;
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
    throw new Error('AI response was malformed. Try again.');
  }

  if (!parsed.summary) throw new Error('AI response missing summary');
  if (!Array.isArray(parsed.tags)) parsed.tags = [];

  return parsed;
}

function computeAverageCadence(invoices: StoredInvoice[]): number {
  if (invoices.length < 2) return 0;
  const sorted = [...invoices].sort(
    (a, b) => Date.parse(a.issuedAt) - Date.parse(b.issuedAt),
  );
  const gaps: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const days =
      (Date.parse(sorted[i].issuedAt) - Date.parse(sorted[i - 1].issuedAt)) /
      (1000 * 60 * 60 * 24);
    gaps.push(days);
  }
  const avgDays = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  return Math.round((avgDays / 30) * 10) / 10;
}

/* ================================================================
   AI Payment Reminder — Claude wrapper
   ================================================================
   Generates a personalized, polite, professional payment reminder
   email body for an overdue invoice. Uses Dr. Hala's brand voice.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import type { StoredInvoice, Customer } from './types';

export interface ReminderResult {
  subject: string;
  body: string;
}

/**
 * Generate an AI-drafted payment reminder for an overdue invoice.
 * Returns a subject + plain-text body that the admin can edit before sending.
 */
export async function generatePaymentReminder(args: {
  invoice: StoredInvoice;
  customer: Customer | null;
  daysOverdue: number;
  tone?: 'warm' | 'firm' | 'gentle';
}): Promise<ReminderResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'AI not configured — ANTHROPIC_API_KEY is missing. Write the reminder manually.',
    );
  }

  const tone = args.tone ?? 'warm';
  const inv = args.invoice;
  const cust = args.customer;
  const bd = inv.breakdown;
  const isFirstReminder =
    !cust || cust.totalInvoices <= 1 || args.daysOverdue < 14;

  // Context for Claude
  const context = {
    clientName: inv.draft.client.name,
    clientCountry: inv.draft.client.country,
    invoiceNumber: inv.invoiceNumber,
    totalAmount: bd.formattedTotal,
    cadEquivalent: bd.formattedTotalCAD,
    issuedDate: new Date(inv.issuedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    dueDate: new Date(inv.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    daysOverdue: args.daysOverdue,
    serviceCategory: bd.serviceSlug,
    isFirstReminder,
    previousInvoicesCount: cust?.totalInvoices ?? 1,
    isReturningClient: (cust?.totalInvoices ?? 1) > 1,
    paymentMethodsAvailable: inv.draft.allowETransfer
      ? 'Interac e-Transfer (Canadian) and other methods listed in the original invoice'
      : 'methods listed in the original invoice',
    tone,
  };

  const systemPrompt = `You are writing on behalf of Dr. Hala Ali, founder of Mama Hala Consulting Group, a warm and professional family counseling practice. Your tone is ALWAYS:
- Compassionate, never demanding or guilt-inducing
- Professional and clear
- Brief — 4 to 6 sentences max in the body
- Respectful of the client's relationship with Dr. Hala
- Solution-oriented, gently inviting payment without pressuring

CRITICAL: Write the body in plain text suitable for email. Do not use markdown. No lists. Use paragraph breaks (double newlines) sparingly. Sign off with "With care, Dr. Hala Ali" on its own line.

Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

  const userPrompt = `Write a payment reminder email for the following overdue invoice. Match the requested tone exactly.

Tone: ${tone === 'warm' ? 'Warm and understanding (default)' : tone === 'gentle' ? 'Extra gentle, especially soft' : 'Firm but still respectful (only for severely overdue)'}

Context:
- Client: ${context.clientName} (from ${context.clientCountry})
- ${context.isReturningClient ? `Returning client with ${context.previousInvoicesCount} previous invoices` : 'First-time client'}
- Invoice: ${context.invoiceNumber}
- Amount due: ${context.totalAmount}${context.cadEquivalent !== context.totalAmount ? ` (${context.cadEquivalent} equivalent)` : ''}
- Issued: ${context.issuedDate}
- Was due: ${context.dueDate}
- Days overdue: ${context.daysOverdue}
- This ${context.isFirstReminder ? 'is the first reminder being sent' : 'is a follow-up reminder'}
- Payment options available: ${context.paymentMethodsAvailable}

Write a subject line and email body that:
1. Greets the client warmly by first name
2. Gently mentions the outstanding invoice with the number and amount
3. Acknowledges that payment may have been overlooked or that life gets busy
4. Offers to discuss any concerns or arrangement if needed
5. Closes warmly with "With care, Dr. Hala Ali"

Respond with this exact JSON structure (no markdown, no code blocks):
{"subject":"Email subject line","body":"Email body in plain text with paragraph breaks"}`;

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
      .map((block) => block.text)
      .join('');

  let parsed: ReminderResult;
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

  if (!parsed.subject || !parsed.body) {
    throw new Error('AI response missing subject or body');
  }

  return parsed;
}

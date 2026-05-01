/* ================================================================
   AI Payment Reminder — Claude wrapper
   ================================================================
   Generates a personalized, polite, professional payment reminder
   email body for an overdue invoice. Uses the Mama Hala Consulting
   team voice.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import type { StoredInvoice, Customer } from './types';

export interface ReminderResult {
  subject: string;
  body: string;
}

export type ReminderGenerationKind = 'pre-due' | 'overdue';

/**
 * Generate an AI-drafted payment reminder for an invoice. Handles both
 * pre-due nudges (3 days before due) and overdue chases (any positive
 * daysOverdue). The tone parameter is preserved from the original
 * admin-only contract; the cron passes one of gentle/warm/firm based
 * on the cadence window.
 *
 * Bilingual: when locale='ar', the AI generates the entire subject + body
 * in Modern Standard Arabic with the same warm, team-voice rules.
 */
export async function generatePaymentReminder(args: {
  invoice: StoredInvoice;
  customer: Customer | null;
  /** For pre-due, this is a *negative* number (e.g. -3 = due in 3 days). */
  daysOverdue: number;
  tone?: 'warm' | 'firm' | 'gentle';
  kind?: ReminderGenerationKind;
  locale?: 'en' | 'ar';
}): Promise<ReminderResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'AI not configured — ANTHROPIC_API_KEY is missing. Write the reminder manually.',
    );
  }

  const tone = args.tone ?? 'warm';
  const kind: ReminderGenerationKind = args.kind ?? (args.daysOverdue >= 0 ? 'overdue' : 'pre-due');
  const locale = args.locale ?? 'en';
  const isArabic = locale === 'ar';
  const inv = args.invoice;
  const cust = args.customer;
  const bd = inv.breakdown;
  const isFirstReminder =
    !cust || cust.totalInvoices <= 1 || args.daysOverdue < 14;
  const dateLocale = isArabic ? 'ar-EG' : 'en-US';

  // Context for Claude
  const context = {
    clientName: inv.draft.client.name,
    clientCountry: inv.draft.client.country,
    invoiceNumber: inv.invoiceNumber,
    totalAmount: bd.formattedTotal,
    cadEquivalent: bd.formattedTotalCAD,
    issuedDate: new Date(inv.issuedAt).toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    dueDate: new Date(inv.dueDate).toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    daysOverdue: args.daysOverdue,
    daysUntilDue: kind === 'pre-due' ? Math.abs(args.daysOverdue) : 0,
    serviceCategory: bd.serviceSlug,
    isFirstReminder,
    previousInvoicesCount: cust?.totalInvoices ?? 1,
    isReturningClient: (cust?.totalInvoices ?? 1) > 1,
    paymentMethodsAvailable: inv.draft.allowETransfer
      ? 'Interac e-Transfer (Canadian) and other methods listed in the original invoice'
      : 'methods listed in the original invoice',
    tone,
  };

  const signoffEn = '"Warmly, The Mama Hala Team"';
  const signoffAr = '"بكل ود، فريق ماما هالة"';

  const systemPrompt = `You are writing on behalf of the Mama Hala Consulting team, a warm and professional family counseling practice. Your tone is ALWAYS:
- Compassionate, never demanding or guilt-inducing
- Professional and clear
- Brief — 4 to 6 sentences max in the body
- Respectful of the client's relationship with Mama Hala Consulting
- Solution-oriented, gently inviting payment without pressuring
- Written as a team voice ("we", "our team") — never name the clinician personally as the actor
${isArabic ? `\nLANGUAGE: Write the entire subject and body in Modern Standard Arabic. Use natural, warm Arabic that an Arabic-speaking client would feel addressed by — not a literal translation. The signoff line MUST be exactly ${signoffAr} on its own line.` : `\nLANGUAGE: Write in clear, friendly English. Sign off with ${signoffEn} on its own line.`}

CRITICAL: Write the body in plain text suitable for email. Do not use markdown. No lists. Use paragraph breaks (double newlines) sparingly.

Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

  const userPrompt = kind === 'pre-due'
    ? `Write a friendly heads-up email for an invoice that is coming due in ${context.daysUntilDue} days. This is NOT a chase — it's a courteous reminder before the due date so the client can plan ahead.

Tone: Gentle and warm. Reassuring, not anxious.

Context:
- Client: ${context.clientName} (from ${context.clientCountry})
- ${context.isReturningClient ? `Returning client with ${context.previousInvoicesCount} previous invoices` : 'First-time client'}
- Invoice: ${context.invoiceNumber}
- Amount: ${context.totalAmount}${context.cadEquivalent !== context.totalAmount ? ` (${context.cadEquivalent} equivalent)` : ''}
- Issued: ${context.issuedDate}
- Due in: ${context.daysUntilDue} days (${context.dueDate})
- Payment options available: ${context.paymentMethodsAvailable}

Write a subject line and email body that:
1. Greets the client warmly by first name
2. Notes that the invoice is coming up in ${context.daysUntilDue} days, with the invoice number and amount
3. Confirms the payment methods are listed in the original invoice email
4. Invites them to reach out with any questions
5. Closes warmly with the standard signoff

Respond with this exact JSON structure (no markdown, no code blocks):
{"subject":"Email subject line","body":"Email body in plain text with paragraph breaks"}`
    : `Write a payment reminder email for the following overdue invoice. Match the requested tone exactly.

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
5. Closes warmly with the standard signoff

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

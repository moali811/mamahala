/* ================================================================
   AI Session Preparation — Claude-generated prep tips
   ================================================================
   Generates personalized session preparation tips based on
   the service type and client's intake notes. Cached on the
   Booking record to avoid repeated API calls.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import { services } from '@/data/services';

const anthropic = new Anthropic();

interface PrepResult {
  tips: string[];
  tipsAr: string[];
  personalizedMessage: string;
  personalizedMessageAr: string;
}

/**
 * Generate session preparation tips for a booking.
 */
export async function generateSessionPrepTips(
  serviceSlug: string,
  clientNotes?: string,
  clientName?: string,
  isNewClient = false,
  locale: 'en' | 'ar' = 'en',
): Promise<PrepResult> {
  const service = services.find(s => s.slug === serviceSlug);
  const serviceName = service?.name ?? serviceSlug.replace(/-/g, ' ');
  const serviceDesc = service?.shortDesc ?? '';

  const systemPrompt = `You are a warm, supportive counseling assistant for Mama Hala Consulting, led by Dr. Hala Ali (a certified family counselor).

Generate personalized session preparation tips for a client who has an upcoming ${serviceName} session.

Service description: ${serviceDesc}
${clientNotes ? `Client's notes about their needs: "${clientNotes}"` : ''}
${isNewClient ? 'This is their FIRST session with Dr. Hala.' : 'This is a returning client.'}

Respond with JSON only:
{
  "tips": ["tip1", "tip2", "tip3", "tip4"],
  "tipsAr": ["Arabic tip1", "Arabic tip2", "Arabic tip3", "Arabic tip4"],
  "personalizedMessage": "A warm 2-sentence message addressing the client by name or generally, encouraging them before their session",
  "personalizedMessageAr": "Same message in Arabic"
}

RULES:
- Generate 3-5 actionable, specific tips
- Tips should be warm, supportive, non-clinical
- Include at least one grounding/mindfulness tip
- For first-time clients, include a "what to expect" tip
- Keep tips concise (1 sentence each)
- The personalized message should feel like a warm note from Dr. Hala`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Generate preparation tips for ${clientName || 'the client'}'s upcoming ${serviceName} session.`,
        },
      ],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const jsonStr = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as PrepResult;
  } catch (err) {
    console.error('[AI Prep] Error:', err);

    // Fallback tips
    return {
      tips: [
        'Find a quiet, comfortable space for your session.',
        'Take a few deep breaths before we begin — your well-being matters.',
        'Think about one thing you would like to focus on today.',
        isNewClient
          ? 'This is a safe space — there are no wrong answers. Just be yourself.'
          : 'Reflect on any changes or insights since your last session.',
      ],
      tipsAr: [
        'اختر مكانًا هادئًا ومريحًا لجلستك.',
        'خذ بضعة أنفاس عميقة قبل أن نبدأ — صحتك النفسية مهمة.',
        'فكّر في شيء واحد تودّ التركيز عليه اليوم.',
        isNewClient
          ? 'هذا مكان آمن — لا توجد إجابات خاطئة. كن على طبيعتك.'
          : 'تأمّل في أي تغييرات أو رؤى منذ جلستك الأخيرة.',
      ],
      personalizedMessage: `We're looking forward to your session${clientName ? `, ${clientName}` : ''}. Remember, taking this step is a sign of strength.`,
      personalizedMessageAr: `نتطلع إلى جلستك${clientName ? `، ${clientName}` : ''}. تذكر أن اتخاذ هذه الخطوة هو علامة على القوة.`,
    };
  }
}

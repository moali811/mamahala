import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { DR_HALA_VOICE } from '@/lib/ai-companion/dr-hala-voice';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

// Allow up to 60 seconds for AI generation (blog posts need time)
export const maxDuration = 60;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/** Recursively strip CRLF and other control chars from every string in an
 *  object/array. Defends against header injection if AI-generated content is
 *  ever inserted into an email subject or other header downstream. Body uses
 *  are unaffected (this only removes characters that have no legitimate place
 *  in titles, names, or single-line fields). */
function sanitizeAiStrings<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(/[\r\n\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim() as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => sanitizeAiStrings(v)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      // Long-form body fields (content/description/scenario/longDescription) keep
      // their newlines — markdown formatting matters there. Header/title fields
      // get aggressively sanitized.
      if (/^(content|description|longDescription|scenario|answer|approach|translation)/i.test(k)) {
        out[k] = typeof v === 'string'
          ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, '').trim()
          : sanitizeAiStrings(v);
      } else {
        out[k] = sanitizeAiStrings(v);
      }
    }
    return out as T;
  }
  return value;
}

const ALLOWED_OPTION_KEYS = new Set([
  'tone', 'audience', 'category', 'contentType', 'fields',
]);

/** Reject any unexpected fields in the options object so a caller can't smuggle
 *  arbitrary keys into the AI prompt template. */
function sanitizeOptions(opts: unknown): Record<string, unknown> | undefined {
  if (!opts || typeof opts !== 'object') return undefined;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(opts as Record<string, unknown>)) {
    if (!ALLOWED_OPTION_KEYS.has(k)) continue;
    if (k === 'fields') {
      if (Array.isArray(v)) out[k] = v.filter((f) => typeof f === 'string' && /^[a-zA-Z0-9_]{1,40}$/.test(f));
    } else if (typeof v === 'string' && v.length <= 200) {
      out[k] = v.replace(/[\r\n\u0000-\u001F\u007F]+/g, ' ').trim();
    }
  }
  return out;
}

// ─── SYSTEM PROMPT: Mama Hala Brand Voice + Arabic Tashkeel ───
const SYSTEM_PROMPT = `${DR_HALA_VOICE}

## OUTPUT FORMAT
Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

// ─── CONTENT TYPE PROMPTS ───
const CONTENT_PROMPTS: Record<string, (prompt: string, options?: any) => string> = {
  blog: (prompt, options) => `Write a professional, deeply engaging blog article for Mama Hala Consulting's website.

Topic: "${prompt}"
${options?.tone ? `Tone: ${options.tone}` : ''}
${options?.audience ? `Target audience: ${options.audience}` : ''}
${options?.category ? `Category: ${options.category}` : ''}

## WRITING PHILOSOPHY — READ CAREFULLY
The goal is NOT to sell or promote. The goal is to make the reader feel so deeply understood that they naturally want to reach out. Write like a trusted expert friend, not a marketer.

Techniques to use:
- Occasionally write in Dr. Hala's first-person practitioner voice: "In my work with families...", "What I often notice is...", "Something I've seen repeatedly..." — this creates authentic authority
- Open with a scene or moment the reader will recognize themselves in — make them feel seen before you say anything else
- Use 1-2 brief, anonymized composite examples (e.g., "A parent once described it to me like this...") to ground abstract ideas in real life
- Name the emotions parents or young people carry that they may not have words for yet — this is the deepest form of connection
- End with a closing that is reflective and open — a gentle question, a reframe, or a single warm sentence that leaves the reader sitting with something meaningful. NOT a sales pitch.

## STRICT RULES
- NEVER write explicit calls-to-action like "book a session", "contact us", "schedule a consultation", "reach out to Mama Hala Consulting", or "we offer services"
- NEVER write a paragraph that promotes the practice directly
- NEVER end with a bio or credentials block ("Dr. Hala Ali is a registered psychotherapist...")
- The article's depth and empathy IS the invitation — a reader who feels truly understood will find their own way to the booking page

## FORMAT
- Title: compelling, SEO-friendly, under 70 characters — speaks to a felt need, not a solution
- Excerpt: 1-2 sentences that create emotional recognition in the reader (under 160 characters)
- Content: 700-900 words with ## headings and - bullet points (markdown)
- Generate BOTH English and Arabic (full Tashkeel)

Respond with this exact JSON structure (no markdown, no code blocks):
{"title":"English title","titleAr":"Arabic title with tashkeel","excerpt":"English excerpt","excerptAr":"Arabic excerpt with tashkeel","content":"Full English article in markdown","contentAr":"Full Arabic article in markdown with tashkeel","category":"${options?.category || 'families'}","image":""}`,

  event: (prompt) => `Generate event details for Mama Hala Consulting based on this description:

"${prompt}"

Requirements:
- Professional, inviting title and description
- Determine the best event type: workshop, webinar, community-gathering, retreat, or support-group
- Suggest appropriate capacity and whether it should be free or paid
- Generate BOTH English and Arabic (with full Tashkeel)

Also generate:
- A scenario hook (2-3 emotional sentences that describe what someone going through this would feel)
- 3-4 learning outcomes (what attendees will walk away with)
- Target audience description
- Expected fee display text
- Format description (duration and delivery method)

Respond with this exact JSON structure (no markdown, no code blocks):
{"titleEn":"English event title","titleAr":"Arabic event title with tashkeel","descriptionEn":"English description (2-3 paragraphs)","descriptionAr":"Arabic description with tashkeel","scenarioEn":"Emotional scenario hook in English","scenarioAr":"Arabic scenario with tashkeel","type":"workshop","capacity":25,"isFree":true,"outcomesEn":["Outcome 1","Outcome 2","Outcome 3"],"outcomesAr":["النّتيجة 1","النّتيجة 2","النّتيجة 3"],"audienceDescEn":"Target audience","audienceDescAr":"الجمهور المستهدف","feeDisplayEn":"Free","feeDisplayAr":"مجّانيّ","formatDescEn":"90-minute webinar","formatDescAr":"ندوة 90 دقيقة"}`,

  'event-full': (prompt) => `Generate COMPLETE event details for Mama Hala Consulting based on this description:

"${prompt}"

Generate ALL of the following fields in BOTH English and Arabic (with full Tashkeel):
- Title
- Short description (2-3 sentences)
- Long description (1-2 paragraphs with more detail)
- Scenario hook (2-3 emotional sentences describing what someone going through this would feel — written in second person "you")
- 4 learning outcomes
- 3 "what to bring" items
- 3-4 FAQ pairs (question + answer)
- Target audience description
- Fee display text
- Format description (duration and method)
- Event type: workshop, webinar, community-gathering, retreat, or support-group
- Suggested capacity and price

Respond with this exact JSON structure (no markdown, no code blocks):
{"titleEn":"","titleAr":"","descriptionEn":"","descriptionAr":"","longDescriptionEn":"","longDescriptionAr":"","scenarioEn":"","scenarioAr":"","type":"workshop","capacity":25,"isFree":false,"priceCAD":45,"outcomesEn":["","","",""],"outcomesAr":["","","",""],"whatToBringEn":["","",""],"whatToBringAr":["","",""],"faqs":[{"questionEn":"","questionAr":"","answerEn":"","answerAr":""}],"audienceDescEn":"","audienceDescAr":"","feeDisplayEn":"","feeDisplayAr":"","formatDescEn":"","formatDescAr":""}`,

  'event-suggestions': (prompt) => `Suggest 3-5 new event concepts for Mama Hala Consulting.

Context about current events and season: "${prompt}"

For each suggestion, provide:
- A compelling title
- One-line description
- Why it would resonate with the community
- Recommended type (workshop, webinar, community-gathering, retreat, support-group)

Make suggestions diverse — mix free community events with paid workshops, online and in-person, different audience groups.

Respond with this exact JSON structure:
{"suggestions":[{"titleEn":"","titleAr":"","descriptionEn":"","descriptionAr":"","type":"workshop","rationale":"Why this would work"}]}`,

  faq: (prompt) => `Write a comprehensive, empathetic answer for this FAQ on Mama Hala Consulting's website:

Question: "${prompt}"

Requirements:
- Answer in 2-4 sentences — clear, warm, and reassuring
- Address the emotional concern behind the question, not just the facts
- Include specific details relevant to Mama Hala (free first session, online sessions, bilingual, etc.)
- Generate BOTH English and Arabic (with full Tashkeel) answers

Respond with this exact JSON structure (no markdown, no code blocks):
{"answer":"English answer","answerAr":"Arabic answer with full tashkeel"}`,

  testimonial: (prompt) => `Polish this raw client feedback into a professional testimonial for Mama Hala Consulting:

Raw feedback: "${prompt}"

Requirements:
- Keep the authentic voice but make it more polished and impactful
- 2-3 sentences maximum
- Should feel genuine, not corporate
- Generate BOTH English and Arabic (with full Tashkeel) versions
- Suggest appropriate client initials and role

Respond with this exact JSON structure (no markdown, no code blocks):
{"text":"Polished English testimonial","textAr":"Polished Arabic testimonial with full tashkeel","name":"A.B.","role":"Parent","roleAr":"وَالِد","rating":5,"category":"families"}`,

  service: (prompt) => `Generate service details for Mama Hala Consulting based on this description:

"${prompt}"

Requirements:
- Professional, empathetic service description
- Include who the service is for, what to expect, and the therapeutic approach
- Generate BOTH English and Arabic (with full Tashkeel)

Respond with this exact JSON structure (no markdown, no code blocks):
{"name":"English service name","nameAr":"Arabic service name with tashkeel","shortDesc":"Short English description (1 sentence)","shortDescAr":"Short Arabic description with tashkeel","description":"Full English description","descriptionAr":"Full Arabic description with tashkeel","whoIsThisFor":["Person type 1","Person type 2","Person type 3"],"whoIsThisForAr":["Arabic with tashkeel 1","Arabic with tashkeel 2","Arabic with tashkeel 3"],"whatToExpect":["Step 1","Step 2","Step 3","Step 4"],"whatToExpectAr":["Arabic with tashkeel 1","Arabic with tashkeel 2","Arabic with tashkeel 3","Arabic with tashkeel 4"],"approach":"English approach description","approachAr":"Arabic approach with tashkeel","category":"families"}`,

  translate: (prompt, options) => `Translate the following English text to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not a literal word-for-word translation
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Adapt cultural references appropriately

Content type: ${options?.contentType || 'general'}

Text to translate:
"""
${prompt}
"""

Respond with this exact JSON structure (no markdown, no code blocks):
${options?.fields ? `{${options.fields.map((f: string) => `"${f}":"Arabic translation with tashkeel"`).join(',')}}` : '{"translation":"Arabic translation with full tashkeel"}'}`,
};

// ─── API HANDLER ───
export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI service not configured. Add ANTHROPIC_API_KEY to environment variables.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { type, prompt } = body;
    const options = sanitizeOptions(body.options);

    if (!type || !prompt) {
      return NextResponse.json({ error: 'Missing type or prompt' }, { status: 400 });
    }

    const promptBuilder = CONTENT_PROMPTS[type];
    if (!promptBuilder) {
      return NextResponse.json({ error: `Invalid type: ${type}. Use: blog, event, faq, testimonial, service, translate` }, { status: 400 });
    }

    const userPrompt = promptBuilder(prompt, options);

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const model = 'claude-sonnet-4-20250514';

    // For blog posts: generate English first, then translate to Arabic in a second call
    if (type === 'blog') {
      // Step 1: Generate English content
      const enMsg = await client.messages.create({
        model,
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `${userPrompt}\n\nIMPORTANT: Generate ENGLISH content ONLY. Set all Arabic fields to empty strings "". Keep the response concise.` },
          { role: 'assistant', content: '{' },
        ],
      });

      const enText = '{' + enMsg.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map(block => block.text).join('');

      let enData;
      try {
        let cleaned = enText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        try { enData = JSON.parse(cleaned); } catch {
          const open = (cleaned.match(/\{/g) || []).length;
          const close = (cleaned.match(/\}/g) || []).length;
          if (open > close) { cleaned += '"}'.repeat(open - close); }
          enData = JSON.parse(cleaned);
        }
      } catch {
        return NextResponse.json({ error: 'Failed to generate English content. Try again.' }, { status: 500 });
      }

      // Step 2: Translate all fields to Arabic in one call (raw text, no JSON)
      const translatePrompt = `Translate the following blog article parts to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not literal word-for-word
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Keep all markdown formatting (## headings, - bullet points, **bold**, etc.)
- Use Arabic punctuation (، instead of ,)

IMPORTANT: Return the translation in EXACTLY this format with the markers. No extra text.

===TITLE===
${enData.title || ''}
===EXCERPT===
${enData.excerpt || ''}
===CONTENT===
${enData.content || ''}`;

      try {
        const arMsg = await client.messages.create({
          model,
          max_tokens: 4096,
          system: SYSTEM_PROMPT.replace('Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.', 'Return the translation as plain text using the exact markers provided. No JSON.'),
          messages: [{ role: 'user', content: translatePrompt }],
        });

        const arText = arMsg.content
          .filter((block): block is Anthropic.TextBlock => block.type === 'text')
          .map(block => block.text).join('');

        // Parse the marker-delimited response
        const titleMatch = arText.match(/===TITLE===\s*([\s\S]*?)===EXCERPT===/);
        const excerptMatch = arText.match(/===EXCERPT===\s*([\s\S]*?)===CONTENT===/);
        const contentMatch = arText.match(/===CONTENT===\s*([\s\S]*?)$/);

        return NextResponse.json({
          success: true,
          generated: sanitizeAiStrings({
            ...enData,
            titleAr: titleMatch?.[1]?.trim() || '',
            excerptAr: excerptMatch?.[1]?.trim() || '',
            contentAr: contentMatch?.[1]?.trim() || '',
          }),
        });
      } catch (arErr: any) {
        // If Arabic translation fails, still return the English content
        console.error('[AI-GENERATE] Arabic translation failed, returning English only:', arErr?.message);
        return NextResponse.json({
          success: true,
          generated: sanitizeAiStrings({
            ...enData,
            titleAr: '',
            excerptAr: '',
            contentAr: '',
          }),
        });
      }
    }

    // Blog article translations: use raw text mode to avoid JSON parsing issues with markdown
    if (type === 'translate' && options?.contentType === 'blog article') {
      console.log('[AI-GENERATE] Blog article translation requested, content length:', prompt.length);
      const rawPrompt = `Translate the following English blog article to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not a literal word-for-word translation
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Adapt cultural references appropriately
- Keep all markdown formatting (## headings, - bullet points, **bold**, etc.)
- Use Arabic punctuation (، instead of ,)

IMPORTANT: Return ONLY the Arabic translation. No JSON, no code blocks, no explanation. Just the translated text.

Text to translate:
"""
${prompt}
"""`;

      try {
        const message = await client.messages.create({
          model,
          max_tokens: 4096,
          system: SYSTEM_PROMPT.replace('Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.', 'Return the translation as plain text. No JSON wrapping.'),
          messages: [{ role: 'user', content: rawPrompt }],
        });

        console.log('[AI-GENERATE] Blog translation response received, stop_reason:', message.stop_reason, 'blocks:', message.content.length);

        const translation = message.content
          .filter((block): block is Anthropic.TextBlock => block.type === 'text')
          .map(block => block.text)
          .join('');

        console.log('[AI-GENERATE] Translation length:', translation.length, 'preview:', translation.substring(0, 100));

        if (!translation.trim()) {
          return NextResponse.json({ error: 'Translation returned empty. Try again.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, generated: sanitizeAiStrings({ translation }) });
      } catch (translateErr: any) {
        console.error('[AI-GENERATE] Blog translation API error:', translateErr?.message || translateErr);
        return NextResponse.json({ error: translateErr?.message || 'Translation API call failed' }, { status: 500 });
      }
    }

    // For non-blog types (FAQ, event, testimonial, service, short translate) — single call with JSON
    const maxTokens = 2048;
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: '{' },
      ],
    });

    const responseText = '{' + message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Parse JSON from response
    let generated;
    try {
      // Strip markdown code blocks if present
      let cleaned = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

      // Try direct parse first
      try {
        generated = JSON.parse(cleaned);
      } catch {
        // If response was truncated (max_tokens hit), try to fix it
        // Add closing braces/quotes if needed
        let fixed = cleaned;

        // Count open vs close braces
        const openBraces = (fixed.match(/\{/g) || []).length;
        const closeBraces = (fixed.match(/\}/g) || []).length;

        // If truncated mid-string, close the string and object
        if (openBraces > closeBraces) {
          // Check if we're inside a string value
          const lastQuote = fixed.lastIndexOf('"');
          const afterLastQuote = fixed.substring(lastQuote + 1).trim();

          if (!afterLastQuote || afterLastQuote === '' || afterLastQuote.endsWith('\\')) {
            // We're mid-string — close it
            fixed += '"';
          }

          // Add missing closing braces
          for (let i = 0; i < openBraces - closeBraces; i++) {
            fixed += '}';
          }
        }

        generated = JSON.parse(fixed);
      }
    } catch (parseErr: any) {
      console.error('JSON parse failed:', parseErr.message);
      console.error('Response preview:', responseText.substring(0, 300));
      console.error('Response end:', responseText.substring(responseText.length - 200));
      return NextResponse.json({ error: 'AI response was incomplete. Try a shorter topic or try again.', raw: responseText.substring(0, 300) }, { status: 500 });
    }

    return NextResponse.json({ success: true, generated: sanitizeAiStrings(generated) });
  } catch (err: any) {
    console.error('AI generation error:', err?.message || err);
    return NextResponse.json({ error: err?.message || 'AI generation failed' }, { status: 500 });
  }
}

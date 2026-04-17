/* ================================================================
   AI Service Recommendation — Claude-powered intake matching
   ================================================================
   Analyzes a client's natural-language description of their needs
   and recommends the top 3 most suitable counseling services from
   Dr. Hala's 23-service catalog.

   Uses Claude Haiku for speed + cost efficiency.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import { services, serviceCategories } from '@/data/services';
import type { ServiceRecommendation, AIRecommendationResult } from './types';

const anthropic = new Anthropic();

/**
 * Build the service catalog context for Claude.
 */
function buildCatalogContext(): string {
  const lines: string[] = ['Available services:'];

  for (const cat of serviceCategories) {
    lines.push(`\n## ${cat.name} (${cat.nameAr})`);
    lines.push(`${cat.subtitle}`);

    const catServices = services.filter(s => s.category === cat.key);
    for (const s of catServices) {
      lines.push(`- slug: "${s.slug}" | name: "${s.name}" (${s.nameAr}) | ${s.shortDesc}`);
    }
  }

  return lines.join('\n');
}

const SERVICE_CATALOG = buildCatalogContext();

/**
 * Recommend services based on a client's intake description.
 */
export async function recommendServices(
  intakeText: string,
  locale: 'en' | 'ar' = 'en',
): Promise<AIRecommendationResult> {
  const intakeId = `intake_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const isArabic = locale === 'ar';

  const systemPrompt = `You are a compassionate, professional intake assistant for Mama Hala Consulting, a family and individual counseling practice led by Dr. Hala Ali. Your role is to understand what the client needs and recommend the most suitable services.

${SERVICE_CATALOG}

RULES:
- Recommend exactly 3 services, ranked by relevance
- Consider age group mentions, relationship dynamics, emotional themes, specific challenges
- If the client mentions a child/teen: prioritize Youth category
- If the client mentions family/parent: prioritize Families category
- If the client mentions partner/marriage: prioritize Couples category
- If vague or general: default to individual-counseling or initial-consultation
- Be warm and empathetic in your reasoning — this is a counseling practice
- Respond in ${isArabic ? 'Arabic' : 'English'}
- For each recommendation, explain briefly WHY it fits (1 sentence)
- Assign a confidence score (0.0 to 1.0)

Respond with JSON only, no markdown:
{
  "recommendations": [
    {
      "serviceSlug": "...",
      "serviceName": "...",
      "serviceNameAr": "...",
      "reason": "English reason",
      "reasonAr": "Arabic reason",
      "confidence": 0.9,
      "category": "youth|families|adults|couples|experiential"
    }
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Client's description of their needs:\n\n"${intakeText}"`,
        },
      ],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';

    // Parse JSON from response (handle potential markdown wrapping)
    const jsonStr = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(jsonStr) as {
      recommendations: ServiceRecommendation[];
    };

    // Validate and enrich recommendations
    const recommendations = parsed.recommendations
      .slice(0, 3)
      .map(rec => {
        // Verify the slug exists in our catalog
        const service = services.find(s => s.slug === rec.serviceSlug);
        if (!service) {
          // Try fuzzy match
          const fuzzy = services.find(
            s => s.slug.includes(rec.serviceSlug) || rec.serviceSlug.includes(s.slug),
          );
          if (fuzzy) {
            return {
              ...rec,
              serviceSlug: fuzzy.slug,
              serviceName: fuzzy.name,
              serviceNameAr: fuzzy.nameAr,
              category: fuzzy.category,
            };
          }
          return null;
        }
        return {
          ...rec,
          serviceName: service.name,
          serviceNameAr: service.nameAr,
          category: service.category,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null) as ServiceRecommendation[];

    return {
      recommendations,
      intakeId,
      rawIntake: intakeText,
    };
  } catch (err) {
    console.error('[AI Recommend] Error:', err);

    // Fallback: return initial-consultation
    const fallback = services.find(s => s.slug === 'initial-consultation');
    return {
      recommendations: [
        {
          serviceSlug: 'initial-consultation',
          serviceName: fallback?.name ?? 'Initial Consultation',
          serviceNameAr: fallback?.nameAr ?? 'الاستشارة الأولية',
          reason: 'A discovery call is a great starting point to understand your needs better.',
          reasonAr: 'المكالمة الاستكشافية هي نقطة انطلاق رائعة لفهم احتياجاتك بشكل أفضل.',
          confidence: 0.5,
          category: 'adults',
        },
      ],
      intakeId,
      rawIntake: intakeText,
    };
  }
}

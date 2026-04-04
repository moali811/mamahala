'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Heart } from 'lucide-react';
import type { SmartEvent, EventLifecycle, EventAudience } from '@/types';
import type { VisitorEventProfile } from '@/hooks/useVisitorProfile';
import Badge from '@/components/ui/Badge';
import { getEventTypeLabel } from '@/data/events';

interface Props {
  events: Array<SmartEvent & { lifecycle: EventLifecycle }>;
  pulseCounts: Record<string, number>;
  profile: VisitorEventProfile;
  locale: string;
}

interface ScoredEvent {
  event: SmartEvent & { lifecycle: EventLifecycle };
  score: number;
  reason: string;
  reasonAr: string;
}

/**
 * Personalized "For You" section — appears only when we have profile data.
 * Uses deterministic scoring (no AI cost) to recommend events.
 */
export default function ForYouSection({ events, pulseCounts, profile, locale }: Props) {
  const isRTL = locale === 'ar';

  const recommendations = useMemo(() => {
    if (!profile.hasProfile) return [];

    const scored: ScoredEvent[] = events
      .filter((e) => e.lifecycle.section !== 'past') // exclude past events
      .map((event) => {
        let score = 0;
        let reason = '';
        let reasonAr = '';

        // +5: visitor voted on this event (show status update)
        if (profile.votedEvents.includes(event.slug)) {
          score += 5;
          reason = 'You expressed interest';
          reasonAr = 'أبديتَ اهتمامَك';
        }

        // +3: audience match with inferred interests
        if (profile.inferredAudiences.length > 0 && event.audiences) {
          const match = event.audiences.some((a: EventAudience) =>
            profile.inferredAudiences.includes(a),
          );
          if (match) {
            score += 3;
            if (!reason) {
              reason = 'Matches your interests';
              reasonAr = 'يتوافقُ مع اهتماماتِك';
            }
          }
        }

        // +2: related service match
        if (event.relatedServiceSlug && profile.viewedCategories.length > 0) {
          score += 2;
          if (!reason) {
            reason = 'Related to services you explored';
            reasonAr = 'مرتبطٌ بخدماتٍ استكشفتَها';
          }
        }

        // +1: lifecycle priority (scheduled > concept)
        if (event.lifecycle.section === 'upcoming') {
          score += 1;
        }

        return { event, score, reason, reasonAr };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return scored;
  }, [events, profile, pulseCounts]);

  // Don't render if no recommendations
  if (recommendations.length === 0) return null;

  return (
    <section className="py-10 lg:py-14 bg-[#FAF7F2]">
      <div className="container-main">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#7A3B5E]" />
          </div>
          <div>
            <h3
              className="text-lg font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'مقترحٌ لك' : 'Picked for You'}
            </h3>
            <p className="text-xs text-[#8E8E9F]">
              {isRTL ? 'بناءً على اهتماماتِك' : 'Based on your interests'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(({ event, reason, reasonAr }, idx) => {
            const title = isRTL ? event.titleAr : event.titleEn;
            const typeLabel = getEventTypeLabel(event.type, isRTL);
            const isVoted = profile.votedEvents.includes(event.slug);
            const lifecycleLabel = event.lifecycle.section === 'upcoming'
              ? (isRTL ? 'قادمة' : 'Coming Up')
              : (isRTL ? 'فكرة' : 'Concept');

            return (
              <motion.a
                key={event.slug}
                href={`#${event.slug}`}
                className="group block bg-white rounded-xl border border-[#F3EFE8] p-5 hover:shadow-md hover:border-[#C8A97D]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                {/* Reason tag */}
                <div className="flex items-center gap-1.5 mb-3">
                  {isVoted ? (
                    <Heart className="w-3 h-3 text-[#7A3B5E] fill-[#7A3B5E]" />
                  ) : (
                    <Eye className="w-3 h-3 text-[#C8A97D]" />
                  )}
                  <span className="text-[11px] font-medium text-[#8E8E9F]">
                    {isRTL ? reasonAr : reason}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className="text-base font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors line-clamp-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h4>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="neutral" size="sm">{typeLabel}</Badge>
                  {event.isFree && <Badge variant="success" size="sm">{isRTL ? 'مجّانيّ' : 'Free'}</Badge>}
                  <Badge
                    variant={event.lifecycle.section === 'upcoming' ? 'sage' : 'sand'}
                    size="sm"
                  >
                    {lifecycleLabel}
                  </Badge>
                </div>

                {/* Pulse count for voted events */}
                {isVoted && pulseCounts[event.slug] > 0 && (
                  <p className="mt-3 text-[11px] text-[#7A3B5E]/60">
                    {isRTL
                      ? `${pulseCounts[event.slug]} ${pulseCounts[event.slug] === 1 ? 'صوتٌ' : 'صوتًا'} حتّى الآن`
                      : `${pulseCounts[event.slug]} ${pulseCounts[event.slug] === 1 ? 'vote' : 'votes'} so far`}
                  </p>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

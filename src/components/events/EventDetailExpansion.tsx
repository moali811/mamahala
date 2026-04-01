'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, CalendarDays, HelpCircle } from 'lucide-react';
import type { SmartEvent } from '@/types';
import Accordion from '@/components/ui/Accordion';

interface Props {
  event: SmartEvent;
  locale: string;
  isOpen: boolean;
}

export default function EventDetailExpansion({ event, locale, isOpen }: Props) {
  const isRTL = locale === 'ar';

  const longDesc = isRTL ? event.longDescriptionAr : event.longDescriptionEn;
  const whatToBring = isRTL ? event.whatToBringAr : event.whatToBringEn;
  const facilitator = event.facilitator;
  const sessions = event.sessions;
  const faqs = event.faqs;

  const hasContent = longDesc || whatToBring?.length || facilitator || sessions?.length || faqs?.length;
  if (!hasContent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 sm:px-8 lg:px-10 pb-8 pt-2 space-y-8 border-t border-[#F3EFE8]">
            {/* Long Description */}
            {longDesc && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-3">
                  {isRTL ? 'عن الحدث' : 'About This Event'}
                </h4>
                <p className="text-[#4A4A5C] leading-relaxed whitespace-pre-line">
                  {longDesc}
                </p>
              </div>
            )}

            {/* Facilitator */}
            {facilitator && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-3 inline-flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {isRTL ? 'المُيسِّر' : 'Facilitator'}
                </h4>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF7F2]">
                  <div className="w-12 h-12 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-[#7A3B5E]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2A33]">
                      {isRTL ? facilitator.nameAr : facilitator.nameEn}
                    </p>
                    <p className="text-sm text-[#8E8E9F]">
                      {isRTL ? facilitator.titleAr : facilitator.titleEn}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Multi-session schedule */}
            {sessions && sessions.length > 1 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-3 inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {isRTL ? 'جدول الجلسات' : 'Session Schedule'}
                </h4>
                <div className="space-y-2">
                  {sessions.map((session, i) => {
                    const d = new Date(session.date + 'T12:00:00');
                    const dateStr = new Intl.DateTimeFormat(isRTL ? 'ar-EG-u-ca-gregory' : 'en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                    }).format(d);
                    const startFmt = new Intl.DateTimeFormat(isRTL ? 'ar-EG-u-ca-gregory' : 'en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }).format(new Date(`${session.date}T${session.startTime}:00`));
                    const endFmt = new Intl.DateTimeFormat(isRTL ? 'ar-EG-u-ca-gregory' : 'en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }).format(new Date(`${session.date}T${session.endTime}:00`));

                    return (
                      <div
                        key={session.date}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#FAF7F2]"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center text-sm font-bold text-[#7A3B5E] flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-[#2D2A33]">{dateStr}</span>
                          <span className="text-sm text-[#8E8E9F] ml-2">
                            {startFmt} – {endFmt}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* What to bring */}
            {whatToBring && whatToBring.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-3 inline-flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  {isRTL ? 'ماذا تحضر' : 'What to Bring'}
                </h4>
                <ul className="space-y-2">
                  {whatToBring.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4A4A5C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4878A] mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-3 inline-flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {isRTL ? 'أسئلة شائعة' : 'FAQ'}
                </h4>
                <Accordion
                  items={faqs.map((faq, i) => ({
                    id: `faq-${event.slug}-${i}`,
                    title: isRTL ? faq.questionAr : faq.questionEn,
                    content: isRTL ? faq.answerAr : faq.answerEn,
                  }))}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

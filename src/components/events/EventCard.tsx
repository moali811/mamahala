'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  Users,
  Heart,
  TreePine,
  Palette,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserPlus,
  ExternalLink,
} from 'lucide-react';
import type { SmartEvent, EventType } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AddToCalendar from './AddToCalendar';
import ShareEvent from './ShareEvent';
import EventRegistrationModal from './EventRegistrationModal';
import CalEmbedModal from './CalEmbedModal';
import { getWhatsAppLink, getCalUrl } from '@/config/business';
import {
  getFormattedDate,
  getFormattedTime,
  getFormattedPrice,
  getCapacityInfo,
  getEventTypeLabel,
  getDateParts,
} from '@/data/events';

interface Props {
  event: SmartEvent;
  locale: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const typeGradients: Record<EventType, string> = {
  workshop: 'from-[#E8E0D0]/60 via-[#F0E8DC]/40 to-[#FAF5ED]',
  webinar: 'from-[#E8D5E0]/60 via-[#F0DFE8]/40 to-[#F8EEF3]',
  'community-gathering': 'from-[#C4878A]/15 via-[#F0D5CA]/25 to-[#FAF0EC]',
  retreat: 'from-[#D4836A]/15 via-[#FAE8E0]/25 to-[#FDF5F0]',
  'support-group': 'from-[#E8E4DE]/60 via-[#F0ECE6]/40 to-[#F8F5F0]',
};

const typeIcons: Record<EventType, React.ReactNode> = {
  workshop: <Palette className="w-5 h-5 text-[#C8A97D]" />,
  webinar: <Video className="w-5 h-5 text-[#7A3B5E]" />,
  'community-gathering': <Users className="w-5 h-5 text-[#C4878A]" />,
  retreat: <TreePine className="w-5 h-5 text-[#3B8A6E]" />,
  'support-group': <Heart className="w-5 h-5 text-[#D4836A]" />,
};

const locationTypeLabels = {
  online: { en: 'Online', ar: 'عبر الإنترنت' },
  'in-person': { en: 'In Person', ar: 'حضوري' },
  hybrid: { en: 'Hybrid', ar: 'حضوري + عبر الإنترنت' },
};

export default function EventCard({ event, locale, isExpanded, onToggleExpand }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const location = isRTL ? event.locationNameAr : event.locationNameEn;
  const price = getFormattedPrice(event, isRTL);
  const capacity = getCapacityInfo(event);
  const typeLabel = getEventTypeLabel(event.type, isRTL);
  const dateParts = getDateParts(event, locale);
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);
  const locLabel = isRTL ? locationTypeLabels[event.locationType].ar : locationTypeLabels[event.locationType].en;

  // Early bird check
  const now = new Date().toISOString().split('T')[0];
  const hasEarlyBird = event.earlyBirdPriceCAD != null && event.earlyBirdDeadline != null && now <= event.earlyBirdDeadline;

  // Multi-session badge
  const sessionCount = event.sessions?.length;

  return (
    <motion.div
      id={event.slug}
      className="group relative bg-white transition-all duration-300"
      whileHover={{ y: -4, boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left: Visual area */}
        <div className={`relative flex-shrink-0 w-full lg:w-[340px] overflow-hidden bg-gradient-to-br ${typeGradients[event.type]}`}>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
              backgroundSize: '24px 24px',
              color: '#7A3B5E',
            }}
          />
          <div className="relative flex flex-col items-center justify-center p-8 lg:p-10 h-full min-h-[200px]">
            <span
              className="text-7xl lg:text-8xl font-bold text-[#2D2A33]/10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {dateParts.day}
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8A97D] mb-1">
                {dateParts.month}
              </span>
              <span
                className="text-4xl lg:text-5xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {dateParts.day}
              </span>
              <span className="text-sm text-[#8E8E9F] mt-1">{dateParts.year}</span>
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/95 flex items-center justify-center shadow-sm">
              {typeIcons[event.type]}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col">
          {/* Badges */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Badge variant={event.isFree ? 'success' : 'sand'} size="md">
              {price}
            </Badge>
            {hasEarlyBird && (
              <Badge variant="terracotta" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                {isRTL ? 'سعر مبكر' : 'Early Bird'}
              </Badge>
            )}
            <Badge variant="neutral" size="sm">
              {locLabel}
            </Badge>
            <Badge variant="plum" size="sm">
              {typeLabel}
            </Badge>
            {sessionCount && sessionCount > 1 && (
              <Badge variant="neutral" size="sm">
                {isRTL ? `${sessionCount} جلسات` : `${sessionCount} sessions`}
              </Badge>
            )}
            {capacity && (
              <Badge variant={capacity.badgeVariant} size="sm">
                {isRTL ? capacity.labelAr : capacity.labelEn}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-3 group-hover:text-[#7A3B5E] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#4A4A5C] leading-relaxed mb-6 flex-1">
            {description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8E8E9F] mb-6">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" /> {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {formattedTime}
            </span>
            {event.locationAddress ? (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.locationAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#7A3B5E] hover:underline"
              >
                <MapPin className="w-4 h-4" /> {location}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {location}
              </span>
            )}
          </div>

          {/* Smart CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {event.registrationStatus !== 'closed' && event.registrationType !== 'none' && (
              <>
                {event.registrationType === 'rsvp' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon={<UserPlus className="w-4 h-4" />}
                    onClick={() => setShowModal(true)}
                  >
                    {event.isFree
                      ? (isRTL ? 'سجّل مجاناً' : 'Register — Free')
                      : (isRTL ? 'سجّل الآن' : 'Register Now')}
                  </Button>
                )}
                {event.registrationType === 'cal' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon={<CalendarDays className="w-4 h-4" />}
                    onClick={() => setShowCalModal(true)}
                  >
                    {isRTL ? 'احجز مكانك' : 'Book Your Spot'}
                  </Button>
                )}
                {event.registrationType === 'external' && event.externalRegistrationUrl && (
                  <Button
                    as="a"
                    href={event.externalRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    {isRTL ? 'سجّل الآن' : 'Register'}
                  </Button>
                )}
              </>
            )}

            {event.registrationType !== 'none' && (
              <Button
                as="a"
                href={getWhatsAppLink(
                  isRTL
                    ? `مرحباً! أنا مهتم/ة بفعالية "${event.titleAr}" في ${formattedDate}. هل يمكنك مشاركة المزيد من التفاصيل؟`
                    : `Hi! I'm interested in "${event.titleEn}" on ${formattedDate}. Could you share more details?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                {isRTL ? 'استفسار' : 'Inquire'}
              </Button>
            )}

            <div className="flex items-center gap-1 ml-auto">
              <AddToCalendar event={event} locale={locale} />
              <ShareEvent event={event} locale={locale} />
            </div>
          </div>

          {/* Registration Modal */}
          {event.registrationType === 'rsvp' && (
            <EventRegistrationModal
              event={event}
              locale={locale}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          )}

          {/* Cal.com Embed Modal */}
          {event.registrationType === 'cal' && event.calEventSlug && (
            <CalEmbedModal
              calSlug={event.calEventSlug}
              isOpen={showCalModal}
              onClose={() => setShowCalModal(false)}
              eventTitle={isRTL ? event.titleAr : event.titleEn}
            />
          )}

          {/* Expand toggle */}
          {(event.longDescriptionEn || event.faqs?.length || event.whatToBringEn?.length) && onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#7A3B5E] hover:text-[#5E2D48] font-medium transition-colors self-start"
            >
              {isExpanded
                ? (isRTL ? 'إخفاء التفاصيل' : 'Hide details')
                : (isRTL ? 'عرض المزيد' : 'Learn more')}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

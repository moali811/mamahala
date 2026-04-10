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
import { getServiceBySlug } from '@/data/services';

interface Props {
  event: SmartEvent;
  locale: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  /**
   * When true, forces the card into a vertical layout at all breakpoints
   * (instead of side-by-side visual/content). Used for the featured summer
   * programs section where 2 cards sit side-by-side in a 2-col grid and
   * can't afford the 340px visual column stealing horizontal space.
   */
  compact?: boolean;
}

const typeGradients: Record<EventType, string> = {
  workshop: 'from-[#C8A97D]/25 via-[#E8D5B0]/35 to-[#F5EDD8]',           // Gold/amber
  webinar: 'from-[#7A3B5E]/20 via-[#C4878A]/25 to-[#F0DFE8]',            // Plum/rose
  'community-gathering': 'from-[#3B8A6E]/18 via-[#A8D4C0]/25 to-[#E8F5EE]', // Sage/teal
  retreat: 'from-[#5B8FA8]/20 via-[#A8C8DC]/25 to-[#E0EEF5]',            // Blue/slate
  'support-group': 'from-[#C4878A]/22 via-[#E8C0C8]/28 to-[#F5E8EC]',    // Warm rose
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

export default function EventCard({ event, locale, isExpanded, onToggleExpand, compact = false }: Props) {
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

  // Related service cross-link
  const relatedService = event.relatedServiceSlug ? getServiceBySlug(event.relatedServiceSlug) : undefined;

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
      <div className={compact ? 'flex flex-col' : 'flex flex-col lg:flex-row'}>
        {/* Left: Visual area (top banner in compact mode) */}
        <div
          className={`relative flex-shrink-0 w-full overflow-hidden bg-gradient-to-br ${typeGradients[event.type]} ${
            compact ? '' : 'lg:w-[340px]'
          }`}
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
              backgroundSize: '24px 24px',
              color: '#7A3B5E',
            }}
          />
          <div
            className={`relative flex flex-col items-center justify-center ${
              compact ? 'p-6 min-h-[140px]' : 'p-8 lg:p-10 h-full min-h-[200px]'
            }`}
          >
            <span
              className={`font-bold text-[#2D2A33]/10 ${
                compact ? 'text-6xl' : 'text-7xl lg:text-8xl'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {dateParts.day}
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-bold uppercase tracking-[0.3em] text-[#C8A97D] mb-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                {dateParts.month}
              </span>
              <span
                className={`font-bold text-[#2D2A33] ${compact ? 'text-3xl' : 'text-4xl lg:text-5xl'}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {dateParts.day}
              </span>
              <span className={`text-[#8E8E9F] mt-1 ${compact ? 'text-xs' : 'text-sm'}`}>{dateParts.year}</span>
            </div>
            <div className={`absolute bottom-4 right-4 rounded-xl bg-white/95 flex items-center justify-center shadow-sm ${compact ? 'w-9 h-9' : 'w-10 h-10'}`}>
              {typeIcons[event.type]}
            </div>
          </div>
        </div>

        {/* Right: Content (below banner in compact mode) */}
        <div className={`flex-1 flex flex-col ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8 lg:p-10'}`}>
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
          <p className="text-[#4A4A5C] leading-relaxed mb-4 flex-1">
            {description}
          </p>

          {/* Related service cross-link */}
          {relatedService && (
            <a
              href={`/${locale}/services/${relatedService.category}/${relatedService.slug}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#C8A97D] hover:text-[#7A3B5E] font-medium mb-5 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              {isRTL ? `ذو صلة: ${relatedService.nameAr}` : `Related: ${relatedService.name}`}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

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
                    {event.dateTBD
                      ? (isRTL ? 'أنا مهتمّ' : "I'm Interested")
                      : event.isFree
                        ? (isRTL ? 'سجّل مجاناً' : 'Register — Free')
                        : (isRTL ? 'سجّل وادفع' : 'Register & Pay')}
                  </Button>
                )}
                {event.registrationType === 'cal' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon={<CalendarDays className="w-4 h-4" />}
                    onClick={() => setShowCalModal(true)}
                  >
                    {isRTL ? 'سجّل وادفع' : 'Register & Pay'}
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

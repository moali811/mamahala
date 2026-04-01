'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, MessageCircle, Sparkles, UserPlus, ExternalLink } from 'lucide-react';
import type { SmartEvent } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EventCountdown from './EventCountdown';
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
} from '@/data/events';

interface Props {
  event: SmartEvent;
  locale: string;
}

export default function FeaturedEvent({ event, locale }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const location = isRTL ? event.locationNameAr : event.locationNameEn;
  const price = getFormattedPrice(event, isRTL);
  const capacity = getCapacityInfo(event);
  const typeLabel = getEventTypeLabel(event.type, isRTL);
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-[#F3EFE8]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A3B5E]/[0.04] via-[#C4878A]/[0.06] to-[#C8A97D]/[0.04]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #7A3B5E 0.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative p-8 sm:p-10 lg:p-14">
        {/* Featured badge */}
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="plum" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {isRTL ? 'الحدث القادم' : 'Next Event'}
          </Badge>
          <Badge variant="neutral" size="sm">{typeLabel}</Badge>
          {capacity && (
            <Badge variant={capacity.badgeVariant} size="sm">
              {isRTL ? capacity.labelAr : capacity.labelEn}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] mb-4 max-w-3xl leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg text-[#4A4A5C] leading-relaxed mb-8 max-w-2xl">
          {description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[#4A4A5C] mb-8">
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="w-4.5 h-4.5 text-[#C8A97D]" /> {formattedDate}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <Clock className="w-4.5 h-4.5 text-[#C8A97D]" /> {formattedTime}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4.5 h-4.5 text-[#C8A97D]" /> {location}
          </span>
          <Badge variant={event.isFree ? 'success' : 'sand'} size="md">
            {price}
          </Badge>
        </div>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8E8E9F] mb-3">
            {isRTL ? 'يبدأ خلال' : 'Starts in'}
          </p>
          <EventCountdown
            targetDate={event.date}
            targetTime={event.startTime}
            timezone={event.timezone}
            locale={locale}
            variant="standalone"
          />
        </div>

        {/* Smart CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          {event.registrationStatus !== 'closed' && event.registrationType !== 'none' && (
            <>
              {event.registrationType === 'rsvp' && (
                <Button
                  variant="primary"
                  size="lg"
                  icon={<UserPlus className="w-5 h-5" />}
                  onClick={() => setShowModal(true)}
                >
                  {isRTL ? (event.isFree ? 'سجّل مجاناً' : 'سجّل وادفع') : (event.isFree ? 'Register Now — Free' : 'Register & Pay')}
                </Button>
              )}
              {event.registrationType === 'cal' && (
                <Button
                  variant="primary"
                  size="lg"
                  icon={<CalendarDays className="w-5 h-5" />}
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
                  size="lg"
                  icon={<ExternalLink className="w-5 h-5" />}
                >
                  {isRTL ? 'سجّل الآن' : 'Register Now'}
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
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              {isRTL ? 'استفسار' : 'Inquire'}
            </Button>
          )}

          <div className="flex items-center gap-1 sm:ml-auto">
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
      </div>
    </motion.div>
  );
}

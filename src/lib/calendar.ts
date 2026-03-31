/* ================================================================
   Calendar Export Utilities
   Generates Google Calendar URLs and .ics files for events.
   ================================================================ */

import type { SmartEvent } from '@/types';

function toUTCString(date: string, time: string): string {
  // Convert "2026-04-15" + "19:00" → "20260415T190000"
  const d = date.replace(/-/g, '');
  const t = time.replace(/:/g, '') + '00';
  return `${d}T${t}`;
}

export function generateGoogleCalendarUrl(
  event: SmartEvent,
  locale: string,
): string {
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const location = isRTL ? event.locationNameAr : event.locationNameEn;

  const startStr = toUTCString(event.date, event.startTime);
  const endStr = toUTCString(event.date, event.endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startStr}/${endStr}`,
    details: description,
    location: event.locationAddress ?? location,
    ctz: event.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(
  event: SmartEvent,
  locale: string,
): string {
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const location = event.locationAddress ?? (isRTL ? event.locationNameAr : event.locationNameEn);

  const startStr = toUTCString(event.date, event.startTime);
  const endStr = toUTCString(event.date, event.endTime);
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d+/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mama Hala Consulting//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=${event.timezone}:${startStr}`,
    `DTEND;TZID=${event.timezone}:${endStr}`,
    `DTSTAMP:${now}`,
    `UID:${event.slug}@mamahala.ca`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(event: SmartEvent, locale: string): void {
  const content = generateICSContent(event, locale);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

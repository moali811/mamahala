/* ================================================================
   ICS Generator — Booking-specific calendar file generation
   ================================================================
   Generates iCalendar (.ics) files for booking confirmations,
   reschedules, and reminders. Clients can add sessions to any
   calendar app (Google, Apple, Outlook).
   ================================================================ */

import type { Booking } from './types';
import { BUSINESS } from '@/config/business';

/**
 * Generate an ICS file content string for a booking.
 */
export function generateBookingICS(booking: Booking): string {
  const uid = `${booking.bookingId}@mamahala.ca`;
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const modeLabel = booking.sessionMode === 'online' ? 'Online Session' : 'In-Person Session';

  const summary = `${serviceName} — ${modeLabel} with Dr. Hala Ali`;
  const location = booking.sessionMode === 'online'
    ? 'Online / Video Call'
    : '430 Hazeldean Rd, K2L 1E8, Ontario, Canada';

  const description = [
    `Session: ${serviceName}`,
    `Duration: ${booking.durationMinutes} minutes`,
    `Mode: ${modeLabel}`,
    '',
    'Mama Hala Consulting',
    `Phone: ${BUSINESS.phone}`,
    `Email: ${BUSINESS.email}`,
    '',
    booking.clientNotes ? `Your notes: ${booking.clientNotes}` : '',
    '',
    `Booking ID: ${booking.bookingId}`,
  ]
    .filter(line => line !== undefined)
    .join('\\n');

  const dtStart = formatICSDate(booking.startTime);
  const dtEnd = formatICSDate(booking.endTime);
  const dtStamp = formatICSDate(new Date().toISOString());

  // VALARM: 1 hour before
  const alarm1h = [
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Your session with Dr. Hala starts in 1 hour`,
    'END:VALARM',
  ].join('\r\n');

  // VALARM: 24 hours before
  const alarm24h = [
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Your session with Dr. Hala is tomorrow`,
    'END:VALARM',
  ].join('\r\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mama Hala Consulting//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    `ORGANIZER;CN=Dr. Hala Ali:mailto:${BUSINESS.email}`,
    booking.clientEmail
      ? `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${escapeICS(booking.clientName)}:mailto:${booking.clientEmail}`
      : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    alarm1h,
    alarm24h,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');

  return lines;
}

/**
 * Generate an ICS for a cancelled booking (METHOD:CANCEL).
 */
export function generateCancelICS(booking: Booking): string {
  const uid = `${booking.bookingId}@mamahala.ca`;
  const dtStart = formatICSDate(booking.startTime);
  const dtEnd = formatICSDate(booking.endTime);
  const dtStamp = formatICSDate(new Date().toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mama Hala Consulting//Booking System//EN',
    'METHOD:CANCEL',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:CANCELLED: Session with Dr. Hala Ali`,
    'STATUS:CANCELLED',
    'SEQUENCE:1',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Format an ISO date to ICS format: 20260412T143000Z
 */
function formatICSDate(isoDate: string): string {
  return new Date(isoDate)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/**
 * Escape special characters for ICS text values.
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

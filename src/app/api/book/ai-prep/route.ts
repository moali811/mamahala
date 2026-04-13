/* POST /api/book/ai-prep — Generate AI session preparation tips */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking, getBookingSession } from '@/lib/booking/booking-store';
import { generateSessionPrepTips } from '@/lib/booking/ai-session-prep';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, locale } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    // Verify client session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;
    if (sessionId) {
      const session = await getBookingSession(sessionId);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Return cached tips if available
    if (booking.aiPrepTips) {
      return NextResponse.json({
        tips: booking.aiPrepTips.split('\n---\n'),
        cached: true,
      });
    }

    // Generate new tips
    const isNewClient = !booking.rescheduledFrom;
    const result = await generateSessionPrepTips(
      booking.serviceSlug,
      booking.clientNotes,
      booking.clientName,
      isNewClient,
      locale === 'ar' ? 'ar' : 'en',
    );

    // Cache on booking
    await updateBooking(bookingId, {
      aiPrepTips: result.tips.join('\n---\n'),
    });

    return NextResponse.json({
      tips: locale === 'ar' ? result.tipsAr : result.tips,
      personalizedMessage: locale === 'ar' ? result.personalizedMessageAr : result.personalizedMessage,
      cached: false,
    });
  } catch (err) {
    console.error('[AI Prep] Error:', err);
    return NextResponse.json({ error: 'Failed to generate tips' }, { status: 500 });
  }
}

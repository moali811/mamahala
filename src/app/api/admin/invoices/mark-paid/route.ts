/* ================================================================
   POST /api/admin/invoices/mark-paid
   ================================================================
   Marks an invoice as paid + auto-generates a Receipt PDF + sends
   the receipt email via Resend (unless dry-run mode).
   Also recomputes the customer's aggregate stats.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import {
  updateInvoiceStatus,
  getSettings,
} from '@/lib/invoicing/kv-store';
import { generateReceiptPdf } from '@/lib/invoicing/receipt-pdf';
import { sendReceiptEmail } from '@/lib/invoicing/email-sender';
import { recomputeCustomerStats } from '@/lib/invoicing/customer-store';
import type { PaymentMethodRecord } from '@/lib/invoicing/types';
import {
  findBookingByDraftId,
  updateBooking,
  createManageToken,
} from '@/lib/booking/booking-store';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import {
  buildSessionLockedInEmail,
  sendBookingEmail,
} from '@/lib/booking/emails';

export const maxDuration = 30;

const ALLOWED_METHODS: PaymentMethodRecord[] = [
  'e-transfer',
  'wire',
  'paypal',
  'other',
  'unknown',
];

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await req.json()) as {
      invoiceId?: string;
      paymentMethod?: PaymentMethodRecord;
    };

    if (!body.invoiceId) {
      return NextResponse.json(
        { error: 'Missing invoiceId' },
        { status: 400 },
      );
    }

    const method: PaymentMethodRecord = ALLOWED_METHODS.includes(
      body.paymentMethod as PaymentMethodRecord,
    )
      ? (body.paymentMethod as PaymentMethodRecord)
      : 'other';

    // Step 1: update invoice status to paid
    const updated = await updateInvoiceStatus(
      body.invoiceId,
      'paid',
      method,
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    // Step 2: load settings, generate receipt PDF, send receipt email
    const settings = await getSettings();
    const paidAt = updated.paidAt ?? new Date().toISOString();

    let receiptEmailSent = false;
    let receiptError: string | null = null;

    try {
      const receiptPdf = await generateReceiptPdf(
        {
          invoice: updated,
          paymentMethod: method,
          paidAt,
        },
        settings,
      );

      // Send email unless dry-run mode
      if (!settings.dryRun) {
        try {
          await sendReceiptEmail(
            updated,
            receiptPdf,
            method,
            paidAt,
            settings,
          );
          receiptEmailSent = true;
        } catch (emailErr) {
          receiptError =
            emailErr instanceof Error
              ? emailErr.message
              : 'Email send failed';
          console.error('Receipt email failed:', emailErr);
        }
      }
    } catch (pdfErr) {
      receiptError =
        pdfErr instanceof Error
          ? pdfErr.message
          : 'Receipt PDF generation failed';
      console.error('Receipt PDF error:', pdfErr);
    }

    // Step 3: recompute customer stats
    try {
      await recomputeCustomerStats(updated.draft.client.email);
    } catch (custErr) {
      console.error('Customer stats recompute failed:', custErr);
    }

    // ─── Step 4: transition linked booking to 'confirmed' and send
    //           the "Session Locked In" email with the Meet link ──────
    // Completes the post-payment flow: the client paid the invoice,
    // so the booking should move from 'approved' → 'confirmed', and
    // the client should get a celebratory email with the Google Meet
    // link + ICS attachment + prep tips. Wrapped in its own try so a
    // Meet/email failure never breaks the mark-paid operation.
    let bookingLockedIn = false;
    let bookingLockInError: string | null = null;
    try {
      // Look up the booking via the draft id stored on the invoice. This
      // is the same path the booking approval flow uses, so it works for
      // both native bookings and Cal.com imports.
      const draftId = updated.draft.draftId;
      const booking = draftId ? await findBookingByDraftId(draftId) : null;

      if (booking && booking.status === 'approved') {
        // Retry Meet link creation if the approval flow missed it.
        let meetLink = booking.meetLink;
        let calendarEventId = booking.calendarEventId;
        if (!meetLink && !calendarEventId) {
          try {
            const calResult = await createCalendarEvent({
              ...booking,
              status: 'confirmed',
            });
            if (calResult) {
              meetLink = calResult.meetLink;
              calendarEventId = calResult.eventId;
            }
          } catch (gcalErr) {
            console.error('[mark-paid] GCal retry failed:', gcalErr);
          }
        }

        // Transition to confirmed + stash payment details.
        const confirmedAt = new Date().toISOString();
        const updatedBooking = await updateBooking(booking.bookingId, {
          status: 'confirmed',
          confirmedAt,
          paidAt,
          // Record the paid amount + currency in the invoice's own currency
          // (AED, EUR, CAD, …), not CAD. Falls back to CAD total only when
          // the displayCurrency is unknown.
          paidAmountCents: Math.round(
            (updated.breakdown.totalLocal ?? updated.breakdown.totalCAD) * 100,
          ),
          paidCurrency: updated.breakdown.displayCurrency || 'CAD',
          paymentMethod: method,
          ...(meetLink ? { meetLink } : {}),
          ...(calendarEventId ? { calendarEventId } : {}),
        });

        if (updatedBooking) {
          // Send the Session Locked In email. Re-create the manage token
          // so the client gets a fresh 72h window.
          const manageToken = await createManageToken(updatedBooking.bookingId);
          const prepTips = updatedBooking.aiPrepTips
            ? updatedBooking.aiPrepTips.split('\n---\n')
            : undefined;

          const { subject, html, icsContent } = await buildSessionLockedInEmail({
            booking: updatedBooking,
            manageToken,
            prepTips,
            aiMessage: updatedBooking.aiConfirmationMessage,
          });

          if (!settings.dryRun) {
            await sendBookingEmail({
              to: updatedBooking.clientEmail,
              subject,
              html,
              icsContent,
            });

            // ─── WhatsApp parity (opt-in only) ──────────────────────────
            // Fires after the email so a WhatsApp failure can never block
            // the booking lock-in. sendWhatsapp returns a result, never
            // throws — log the result for visibility but never bubble.
            try {
              const { sendWhatsapp } = await import('@/lib/whatsapp/send');
              const tz = updatedBooking.clientTimezone || 'America/Toronto';
              const start = new Date(updatedBooking.startTime);
              const sessionDate = start.toLocaleString('en-US', {
                timeZone: tz,
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              });
              const sessionTimeLocal = start.toLocaleString('en-US', {
                timeZone: tz,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              const { SITE_URL } = await import('@/lib/site-url');
              const localePath = updatedBooking.preferredLanguage === 'ar' ? 'ar' : 'en';
              const manageUrl = `${SITE_URL}/${localePath}/book/manage?token=${manageToken}`;
              const firstName = (updatedBooking.clientName || '').split(' ')[0] || 'there';
              const waResult = await sendWhatsapp({
                email: updatedBooking.clientEmail,
                template: 'booking_confirmation',
                locale: updatedBooking.preferredLanguage === 'ar' ? 'ar' : 'en',
                vars: {
                  first_name: firstName,
                  session_date: sessionDate,
                  session_time_local: sessionTimeLocal,
                  meet_link: updatedBooking.meetLink || manageUrl,
                  manage_url: manageUrl,
                },
              });
              if (!waResult.sent) {
                console.log('[mark-paid] WhatsApp confirmation skipped:', waResult.reason);
              }
            } catch (waErr) {
              console.error('[mark-paid] WhatsApp confirmation threw (ignored):', waErr);
            }
          }
          bookingLockedIn = true;
        }
      }
    } catch (lockErr) {
      bookingLockInError =
        lockErr instanceof Error ? lockErr.message : 'Session lock-in failed';
      console.error('[mark-paid] Session lock-in failed:', lockErr);
    }

    return NextResponse.json({
      ok: true,
      invoice: updated,
      receiptEmailSent,
      receiptError,
      bookingLockedIn,
      bookingLockInError,
    });
  } catch (err) {
    console.error('Mark paid error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

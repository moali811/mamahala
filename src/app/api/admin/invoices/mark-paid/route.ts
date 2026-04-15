/* ================================================================
   POST /api/admin/invoices/mark-paid
   ================================================================
   Marks an invoice as paid + auto-generates a Receipt PDF + sends
   the receipt email via Resend (unless dry-run mode).
   Also recomputes the customer's aggregate stats.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
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
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
          paidAmountCents: Math.round(updated.breakdown.totalCAD * 100),
          paidCurrency: 'CAD',
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

          const { subject, html, icsContent } = buildSessionLockedInEmail({
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

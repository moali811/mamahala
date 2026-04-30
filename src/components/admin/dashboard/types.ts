/* Internal types for the operational dashboard widgets.
 * Keeps the widget components decoupled from the upstream Booking /
 * StoredInvoice records — we only project the fields the widgets need. */

import type { BookingStatus } from '@/lib/booking/types';
import type { InvoiceStatus, PaymentMethodRecord } from '@/lib/invoicing/types';

export interface DashboardBooking {
  bookingId: string;
  clientEmail: string;
  clientName: string;
  serviceSlug: string;
  serviceName?: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  aiIntakeNotes?: string;
  approvedAt?: string;
  paidAt?: string;
  /** When the booking record was created — used as the funnel entry timestamp. */
  createdAt?: string;
}

export interface DashboardInvoice {
  invoiceId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
  paymentMethod: PaymentMethodRecord;
  totalLocal: number;
  displayCurrency: string;
  client: { name: string; email: string; country: string };
  dryRun: boolean;
  subject?: string;
}

export type DashboardModule =
  | 'bookings'
  | 'invoices'
  | 'clients'
  | 'leads'
  | 'events'
  | 'blog'
  | 'services'
  | 'testimonials'
  | 'faqs'
  | 'resources'
  | 'quiz-results'
  | 'settings'
  | 'dashboard'
  | 'analytics';

/** Callback wired by the parent admin page to switch the active tab. */
export type ModuleSwitcher = (target: DashboardModule) => void;

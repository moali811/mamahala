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

/** Optional intent attached to a tab switch — e.g. "land on Bookings with
 *  the pending filter applied" or "go to Invoices History → unpaid". The
 *  parent page reads these and forwards them as initial* props to the
 *  destination module so the click delivers on what the CTA promised. */
export interface ModuleIntent {
  /** BookingsModule: pre-apply this filter on mount. */
  bookingsFilter?:
    | 'all'
    | 'pending_approval'
    | 'pending-review'
    | 'approved'
    | 'confirmed'
    | 'completed'
    | 'cancelled'
    | 'declined'
    | 'series';
  /** BookingsModule: open NewBookingModal on mount. */
  bookingsOpenNew?: boolean;
  /** InvoicesModule: mount on this tab. */
  invoicesTab?: 'dashboard' | 'compose' | 'scheduled' | 'history' | 'customers' | 'recurring' | 'reports';
  /** InvoicesModule: pre-apply this status filter on mount (only meaningful with invoicesTab='history'). */
  invoicesFilter?: 'all' | 'draft' | 'sent' | 'paid' | 'overdue' | 'void' | 'unpaid';
  /** ResourcesModule: open the Grant Access modal on mount. */
  resourcesOpenGrant?: boolean;
}

/** Callback wired by the parent admin page to switch the active tab,
 *  optionally with intent that the destination module honours on mount. */
export type ModuleSwitcher = (target: DashboardModule, intent?: ModuleIntent) => void;

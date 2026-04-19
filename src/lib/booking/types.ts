/* ================================================================
   Booking System — Shared TypeScript Types
   ================================================================
   Used by availability engine, booking store, API routes, email
   templates, and booking UI components. Single source of truth.
   ================================================================ */

// ─── Status & Mode Enums ────────────────────────────────────────

export type BookingStatus =
  | 'pending-review'    // Admin created but holding for inline Step 2 invoice review — no emails, no GCal yet
  | 'pending_approval'  // Client submitted — waiting for Dr. Hala to review
  | 'approved'          // Dr. Hala approved — invoice sent, waiting for payment
  | 'confirmed'         // Payment received — session is locked in
  | 'completed'         // Session happened
  | 'declined'          // Dr. Hala declined the request
  | 'cancelled'         // Client cancelled
  | 'rescheduled'       // Replaced by a new booking
  | 'no-show';

export type BookingSource = 'native' | 'cal-com' | 'manual';
export type SessionMode = 'online' | 'inPerson';
export type ReminderType = '24h' | '1h';

// ─── Recurrence (series of bookings) ────────────────────────────

export type RecurrenceFrequency = 'weekly' | 'biweekly';

export interface RecurrenceSeriesMeta {
  /** Unique series id (`ser_{uuid}`), shared across all siblings. */
  seriesId: string;
  /** 1-based index (e.g. 1 of 8). */
  seriesIndex: number;
  /**
   * Total sessions in the series, kept immutable even after cancellations so
   * UI can show "2 of 8 (1 cancelled)".
   */
  seriesTotal: number;
  frequency: RecurrenceFrequency;
  /** How the series is billed — admin picks per booking in the new-booking modal. */
  invoiceMode: 'per-session' | 'bundled';
  /** Only set on the anchor (seriesIndex === 1) when invoiceMode === 'bundled'. */
  bundleInvoiceDraftId?: string;
  /** Siblings of a bundled series point back to the anchor for draft lookup. */
  bundleAnchorBookingId?: string;
  /** Indices that have been cancelled. Maintained on every sibling for UI display. */
  seriesCancelledIndices?: number[];
}

// ─── Core Booking Record ────────────────────────────────────────

export interface Booking {
  /** Unique ID: `bk_{uuid}` */
  bookingId: string;

  // Client info
  clientEmail: string;
  clientName: string;
  clientPhone?: string;
  clientTimezone: string;
  clientCountry: string;
  clientNotes?: string;
  preferredLanguage?: 'en' | 'ar';

  // Session details
  serviceSlug: string;
  serviceName?: string;
  sessionMode: SessionMode;
  durationMinutes: number;
  startTime: string;  // ISO 8601 UTC
  endTime: string;    // ISO 8601 UTC

  status: BookingStatus;
  source: BookingSource;

  // AI-generated content
  aiIntakeNotes?: string;
  aiServiceRecommendation?: string;
  aiPrepTips?: string;
  aiConfirmationMessage?: string;
  aiReminderContent?: string;

  // Linked records
  draftId?: string;           // InvoiceDraft from processBookingIntake()
  invoiceId?: string;         // StoredInvoice if sent
  calendarEventId?: string;   // Google Calendar event ID

  // Approval + Payment
  approvedAt?: string;
  approvedBy?: string;        // 'admin' (Dr. Hala)
  declinedAt?: string;
  declineReason?: string;
  paidAt?: string;
  paidAmountCents?: number;
  paidCurrency?: string;
  paymentMethod?: string;     // 'e-transfer' | 'paypal' | 'wire' | 'manual'

  // Google Meet
  meetLink?: string;          // Auto-generated Google Meet URL

  // Lifecycle timestamps
  confirmedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  completedAt?: string;

  // Rescheduling chain
  rescheduledFrom?: string;   // bookingId of original
  rescheduledTo?: string;     // bookingId of replacement

  // Reminder tracking
  reminder24hSentAt?: string;
  reminder1hSentAt?: string;
  followUpSentAt?: string;

  // Recurring series metadata — undefined for one-off bookings
  series?: RecurrenceSeriesMeta;

  /**
   * Snapshot of Dr. Hala's effective location label at booking creation
   * time (e.g. "Toronto, Canada" or "Dubai, UAE"). Stored so later
   * travel-schedule edits don't mutate issued bookings.
   */
  effectiveLocationLabel?: string;

  /**
   * For status === 'pending-review' only. ISO timestamp after which
   * availability treats this booking as free (admin hasn't returned
   * to Step 2 to confirm-and-send). Default hold is 24h from create.
   */
  pendingReviewExpiresAt?: string;

  /**
   * Smart Hold: ISO timestamp after which a `pending_approval` booking
   * is auto-approved by the cron engine. The slot stays blocked regardless
   * — this timer only controls when auto-approve kicks in, not when the
   * slot frees. Slots only free on explicit decline.
   */
  holdExpiresAt?: string;

  createdAt: string;
  updatedAt: string;
}

// ─── Time Slots ─────────────────────────────────────────────────

export interface TimeSlot {
  start: string;  // ISO 8601
  end: string;    // ISO 8601
  available: boolean;
  reason?: 'busy' | 'outside-hours' | 'buffer' | 'max-reached' | 'blocked' | 'past';
}

export interface DayAvailability {
  date: string;         // YYYY-MM-DD
  hasSlots: boolean;
  slotCount: number;
  isBlocked: boolean;
  blockReason?: string;
}

// ─── Availability Rules ─────────────────────────────────────────

export interface DaySchedule {
  /** Time blocks when Dr. Hala is available (HH:mm format, provider tz). */
  blocks: { start: string; end: string }[];
}

export interface AvailabilityRules {
  /** Provider's IANA timezone (e.g. "America/Toronto"). */
  timezone: string;
  /**
   * Weekly schedule. Keys are day-of-week (0=Sun..6=Sat).
   * `null` means the day is off / unavailable.
   */
  weeklySchedule: Record<number, DaySchedule | null>;
  /** Minutes of buffer between sessions (default 10). */
  bufferMinutes: number;
  /** Max sessions per day (default 8). */
  maxSessionsPerDay: number;
  /** Slot granularity in minutes (default 15). */
  slotGranularityMinutes: number;
  /** How far in advance clients can book, in days (default 60). */
  advanceBookingDays: number;
  /** Minimum hours before a slot can be booked (default 2). */
  minimumNoticeHours: number;
  /** Free cancellation window in hours before session (default 24). */
  cancellationPolicyHours: number;

  // ─── Session Mode Settings ─────────────────────────────────────
  /** When false, in-person option is hidden from the booking form. Default true. */
  inPersonEnabled?: boolean;

  // ─── Smart Hold Settings ────────────────────────────────────────
  /** Hours to hold a slot for pending_approval before auto-action (default 4). */
  holdDurationHours?: number;
  /** When true (default), expired holds are auto-approved. When false, they stay pending. */
  autoApproveOnExpiry?: boolean;

  updatedAt: string;
}

export interface BlockedDate {
  date: string;         // YYYY-MM-DD
  reason: string;
  allDay: boolean;
  /** Partial block: specific time ranges blocked. Only used if allDay is false. */
  blockedSlots?: { start: string; end: string }[];
  /**
   * Google Calendar event IDs for partial-block busy events, aligned by
   * index with `blockedSlots`. Populated when the block is created with
   * `allDay: false`, so the GCal event can be deleted on unblock.
   * Left undefined for all-day blocks (which don't create GCal events).
   */
  gcalEventIds?: string[];
}

export interface DayOverride {
  date: string;         // YYYY-MM-DD
  schedule: DaySchedule;
  note?: string;
}

// ─── Google Calendar Cache ──────────────────────────────────────

export interface CachedBusySlot {
  start: string;  // ISO 8601
  end: string;    // ISO 8601
  summary?: string;
}

// ─── Reminder ───────────────────────────────────────────────────

export interface ReminderRecord {
  bookingId: string;
  type: ReminderType;
  scheduledFor: string;
  sentAt?: string;
  emailMessageId?: string;
}

// ─── Manage Tokens ──────────────────────────────────────────────

export interface ManageTokenPayload {
  bookingId: string;
}

export interface MagicLinkPayload {
  email: string;
}

export interface BookingSessionPayload {
  email: string;
  createdAt: string;
}

// ─── AI Recommendation ──────────────────────────────────────────

export interface ServiceRecommendation {
  serviceSlug: string;
  serviceName: string;
  serviceNameAr?: string;
  reason: string;
  reasonAr?: string;
  confidence: number;  // 0-1
  category: string;
}

export interface AIRecommendationResult {
  recommendations: ServiceRecommendation[];
  intakeId: string;
  rawIntake: string;
}

// ─── Booking Policy ─────────────────────────────────────────────

export interface BookingPolicy {
  canCancel: boolean;
  canReschedule: boolean;
  message: string;
  messageAr?: string;
  feePercent: number;  // 0 = free, 0.5 = 50% fee, 1 = full charge
}

// ─── API Response Shapes ────────────────────────────────────────

export interface BookingConfirmationResult {
  bookingId: string;
  draftId: string;
  manageToken: string;
  manageUrl: string;
  status: BookingStatus;      // 'pending_approval' for paid, 'confirmed' for free
  meetLink?: string;
  aiPrepTips?: string[];
  aiConfirmationMessage?: string;
}

export interface AvailabilityResponse {
  date: string;
  timezone: string;
  clientTimezone: string;
  slots: TimeSlot[];
  inPersonEnabled?: boolean;
}

export interface MonthAvailabilityResponse {
  month: string;      // YYYY-MM
  timezone: string;
  dates: DayAvailability[];
}

// ─── Default Availability Rules ─────────────────────────────────

const STANDARD_BLOCK: DaySchedule = {
  blocks: [{ start: '09:00', end: '20:00' }],
};

export const DEFAULT_AVAILABILITY_RULES: AvailabilityRules = {
  timezone: 'America/Toronto',
  weeklySchedule: {
    0: null,                  // Sunday off
    1: { ...STANDARD_BLOCK }, // Monday
    2: { ...STANDARD_BLOCK }, // Tuesday
    3: { ...STANDARD_BLOCK }, // Wednesday
    4: { ...STANDARD_BLOCK }, // Thursday
    5: { ...STANDARD_BLOCK }, // Friday
    6: { ...STANDARD_BLOCK }, // Saturday
  },
  bufferMinutes: 10,
  maxSessionsPerDay: 8,
  slotGranularityMinutes: 15,
  advanceBookingDays: 60,
  minimumNoticeHours: 2,
  cancellationPolicyHours: 24,
  inPersonEnabled: true,
  updatedAt: new Date().toISOString(),
};

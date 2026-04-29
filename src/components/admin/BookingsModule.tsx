'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, User, Mail, Phone, Check, X, Loader2,
  AlertCircle, RefreshCw, ChevronDown, Video, Building2,
  FileText, ExternalLink, MessageSquare, Trash2, ArrowUpDown,
  Plus, CalendarClock,
} from 'lucide-react';
import type { Booking, BookingStatus } from '@/lib/booking/types';
import type { InvoiceDraft } from '@/lib/invoicing/types';
import InvoiceReviewSheet from './InvoiceReviewSheet';
import AvailabilityEditor from './AvailabilityEditor';
import NewBookingModal from './NewBookingModal';
import CalendarView from './CalendarView';
import RescheduleBookingModal from './RescheduleBookingModal';
import CancelBookingModal from './CancelBookingModal';
import ApproveAndConvertDialog from './ApproveAndConvertDialog';
import { toISO2 } from '@/config/countries';

interface Props {
  password: string;
}

type FilterStatus = 'all' | 'pending_approval' | 'pending-review' | 'approved' | 'confirmed' | 'completed' | 'cancelled' | 'declined' | 'series';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string; border: string }> = {
  'pending-review': { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Draft', border: 'border-l-orange-300' },
  pending_approval: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending', border: 'border-l-amber-400' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Approved', border: 'border-l-blue-400' },
  confirmed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Confirmed', border: 'border-l-green-500' },
  completed: { bg: 'bg-slate-50', text: 'text-slate-600', label: 'Completed', border: 'border-l-slate-400' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600', label: 'Cancelled', border: 'border-l-red-400' },
  declined: { bg: 'bg-red-50', text: 'text-red-600', label: 'Declined', border: 'border-l-red-400' },
  rescheduled: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Rescheduled', border: 'border-l-orange-400' },
  'no-show': { bg: 'bg-gray-50', text: 'text-gray-500', label: 'No-Show', border: 'border-l-gray-400' },
};

type TopTab = 'bookings' | 'calendar' | 'recurring' | 'availability';

export default function BookingsModule({ password }: Props) {
  const [topTab, setTopTab] = useState<TopTab>('bookings');

  // Listen for an external request to switch sub-tab — fired by the
  // Apple-style mobile bottom nav when the user taps Calendar (which is a
  // pseudo-tab that maps to Bookings module + Calendar sub-tab) or Bookings
  // (resets to inbox view). Cleaner than prop-drilling controlled state.
  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent<TopTab>).detail;
      if (detail === 'bookings' || detail === 'calendar' || detail === 'recurring' || detail === 'availability') {
        setTopTab(detail);
      }
    }
    window.addEventListener('mh-admin-bookings-subtab', handler);
    return () => window.removeEventListener('mh-admin-bookings-subtab', handler);
  }, []);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('pending_approval');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Selection state for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Invoice review sheet state
  const [invoiceSheet, setInvoiceSheet] = useState<{ booking: Booking; draft: InvoiceDraft } | null>(null);

  // "New Booking" modal — admin manually books a client
  const [newBookingOpen, setNewBookingOpen] = useState(false);

  // Reschedule modal — admin moves a booking to a new slot, with fee + override.
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  // Cancel modal — admin cancels with fee preview + waiver + audit log.
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  // Approve & convert dialog — promotes a one-off pending booking into a recurring series.
  const [convertTarget, setConvertTarget] = useState<Booking | null>(null);

  const headers = { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' };

  // Auto-dismiss success after 5s
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 5000);
    return () => clearTimeout(t);
  }, [success]);

  // `silent` mode skips the loading spinner — used by the background
  // poller so the list doesn't flash on every refresh. Manual refresh
  // button calls with silent: false to show feedback.
  const fetchBookings = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    try {
      const res = await fetch('/api/admin/booking/list', { headers });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch {
      setError('Failed to load bookings');
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, [password]);

  // Load on mount + auto-refresh every 20 seconds so changes made in
  // other tabs/sessions (or by the booking system itself) show up
  // without a manual reload. The admin page top-level also polls every
  // 30s for the notification badge; this polls faster to keep the list
  // itself fresh while the user is actively viewing it.
  // Pauses polling while the tab is hidden (document.hidden) to avoid
  // unnecessary KV hits when the admin isn't actively looking.
  useEffect(() => {
    fetchBookings();
    const tick = () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      fetchBookings({ silent: true });
    };
    const interval = setInterval(tick, 20000);
    const onVisible = () => { if (!document.hidden) fetchBookings({ silent: true }); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [fetchBookings]);

  const handleApprove = async (bookingId: string) => {
    setActionLoading(bookingId);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/approve', {
        method: 'POST',
        headers,
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Approved! Client notified. Go to Invoices tab to review and send the invoice.');
      fetchBookings({ silent: true });
    } catch (err: any) {
      setError(err.message || 'Failed to approve');
    } finally {
      setActionLoading(null);
    }
  };

  const handleApproveAndInvoice = async (booking: Booking) => {
    setActionLoading(booking.bookingId);
    setError(null);
    try {
      // Step 1: Approve (skip for pending-review drafts — they go
      // straight to invoice review without needing approval first)
      if (booking.status !== 'pending-review') {
        const approveRes = await fetch('/api/admin/booking/approve', {
          method: 'POST', headers,
          body: JSON.stringify({ bookingId: booking.bookingId }),
        });
        if (!approveRes.ok) {
          const d = await approveRes.json();
          throw new Error(d.error || 'Approval failed');
        }
      }

      // Step 2: Try to fetch the draft created during booking intake
      let draft: any = null;
      if (booking.draftId) {
        const draftRes = await fetch(`/api/admin/invoices/drafts?id=${booking.draftId}`, { headers });
        const draftData = await draftRes.json();
        draft = draftData.draft;
      }

      // Step 3: If no draft exists, create one from the booking data.
      // Normalize country through toISO2 so legacy bookings that stored the
      // full country name (e.g. "United States", "الإمارات") still land on
      // the correct pricing band when sent to /api/admin/invoices/create.
      if (!draft) {
        const now = new Date().toISOString();
        const country = toISO2(booking.clientCountry);
        const adminNoteParts = [`Auto-generated from booking ${booking.bookingId}`];
        if (booking.clientCountry && toISO2(booking.clientCountry) === 'CA' && booking.clientCountry.toUpperCase() !== 'CA') {
          adminNoteParts.push(
            `⚠ Country could not be resolved from "${booking.clientCountry}" — defaulted to CA. Please verify in the Client details section above before sending.`,
          );
        }
        draft = {
          draftId: `draft_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
          client: {
            name: booking.clientName,
            email: booking.clientEmail,
            country,
            phone: booking.clientPhone || '',
          },
          serviceSlug: booking.serviceSlug,
          complexity: { preset: 'standard', percent: 0 },
          package: 'single',
          slidingScalePercent: 0,
          taxMode: country === 'CA' ? 'manual-hst' : 'none',
          allowETransfer: country === 'CA',
          daysUntilDue: 7,
          sessionStartTime: booking.startTime,
          subject: `Session: ${booking.serviceName || booking.serviceSlug} on ${new Date(booking.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
          adminNote: adminNoteParts.join('\n'),
          createdAt: now,
          updatedAt: now,
        } as InvoiceDraft;
      }

      // Step 4: Open the invoice review sheet for admin to review before sending
      setInvoiceSheet({ booking, draft });
      setSuccess(booking.status === 'pending-review'
        ? 'Review the invoice below, then confirm to activate.'
        : 'Booking approved! Review the invoice below.');
      fetchBookings({ silent: true });
    } catch (err: any) {
      setError(err.message || 'Failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (bookingId: string) => {
    setActionLoading(bookingId);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/decline', {
        method: 'POST',
        headers,
        body: JSON.stringify({ bookingId, reason: 'Schedule conflict' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Declined. Client has been notified.');
      fetchBookings({ silent: true });
    } catch (err: any) {
      setError(err.message || 'Failed to decline');
    } finally {
      setActionLoading(null);
    }
  };

  type SortKey = 'date' | 'name' | 'status';
  const [sortBy, setSortBy] = useState<SortKey>('date');

  // ─── Notification toggle (default ON) ──────────────────────
  const [notifyClient, setNotifyClient] = useState(true);

  // ─── Confirmation dialog state ─────────────────────────────
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    confirmColor: 'red' | 'plum' | 'green';
    showNotifyToggle: boolean;
    onConfirm: () => void;
  } | null>(null);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus, shouldNotify?: boolean) => {
    setActionLoading(bookingId);
    setError(null);
    const notify = shouldNotify ?? notifyClient;
    try {
      const res = await fetch('/api/admin/booking/update-status', {
        method: 'POST', headers,
        body: JSON.stringify({ bookingId, status: newStatus, notifyClient: notify }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const notifyNote = data.emailSent ? ' — client notified' : '';
      setSuccess(`Status updated to ${newStatus}${notifyNote}`);
      fetchBookings({ silent: true });
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally { setActionLoading(null); }
  };

  const executeDelete = async (bookingId: string) => {
    setActionLoading(bookingId);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/delete', {
        method: 'POST', headers,
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Booking deleted');
      fetchBookings({ silent: true });
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally { setActionLoading(null); }
  };

  const handleDelete = (bookingId: string, clientName: string) => {
    setConfirmDialog({
      title: 'Delete Booking',
      message: `Permanently delete the booking for ${clientName}? This action cannot be undone.`,
      confirmLabel: 'Delete',
      confirmColor: 'red',
      showNotifyToggle: false,
      onConfirm: () => { setConfirmDialog(null); executeDelete(bookingId); },
    });
  };

  const handleStatusChangeWithDialog = (bookingId: string, clientName: string, newStatus: BookingStatus) => {
    const configs: Record<string, { title: string; message: string; label: string; color: 'red' | 'plum' | 'green' }> = {
      confirmed: { title: 'Confirm Session', message: `Mark ${clientName}'s session as confirmed?`, label: 'Confirm', color: 'green' },
      completed: { title: 'Complete Session', message: `Mark ${clientName}'s session as completed?`, label: 'Mark Complete', color: 'plum' },
      cancelled: { title: 'Cancel Booking', message: `Cancel the session for ${clientName}? The client will need to rebook.`, label: 'Yes, Cancel', color: 'red' },
      declined: { title: 'Decline Request', message: `Decline the booking request from ${clientName}?`, label: 'Yes, Decline', color: 'red' },
      'no-show': { title: 'Mark No-Show', message: `Mark ${clientName} as a no-show for this session?`, label: 'Mark No-Show', color: 'red' },
    };
    const info = configs[newStatus];
    if (info) {
      setNotifyClient(true); // reset to default ON each time
      setConfirmDialog({
        title: info.title,
        message: info.message,
        confirmLabel: info.label,
        confirmColor: info.color,
        showNotifyToggle: true,
        onConfirm: () => { setConfirmDialog(null); handleStatusChange(bookingId, newStatus); },
      });
    } else {
      handleStatusChange(bookingId, newStatus);
    }
  };

  const filtered = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'cancelled') return b.status === 'cancelled' || b.status === 'declined';
    if (filter === 'series') return !!b.series?.seriesId;
    return b.status === filter;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.clientName.localeCompare(b.clientName);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return b.createdAt.localeCompare(a.createdAt); // date desc
  });
  const pendingCount = bookings.filter(b => b.status === 'pending_approval').length;

  return (
    <div className="space-y-6">
      {/* ─── Top-level tab switch: Bookings list vs Availability editor ─── */}
      <div className="flex gap-1.5 p-1 bg-[#F5F0EB] rounded-xl max-w-lg overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {([
          { key: 'bookings' as const, label: 'Booking Requests' },
          { key: 'calendar' as const, label: 'Calendar' },
          { key: 'recurring' as const, label: 'Recurring' },
          { key: 'availability' as const, label: 'Availability' },
        ]).map(tab => {
          const isActive = topTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setTopTab(tab.key);
                // Echo to the parent so the bottom-nav highlight stays in sync
                // when the user uses the in-module tab strip.
                window.dispatchEvent(new CustomEvent('mh-admin-bookings-subtab-changed', { detail: tab.key }));
              }}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[#7A3B5E] shadow-sm'
                  : 'text-[#8E8E9F] hover:text-[#4A4A5C]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Availability editor */}
      {topTab === 'availability' && <AvailabilityEditor password={password} />}

      {/* Live calendar view — month grid with bookings + GCal overlay */}
      {topTab === 'calendar' && (
        <CalendarView
          password={password}
          bookings={bookings}
          onRefresh={() => fetchBookings({ silent: true })}
        />
      )}

      {/* Recurring series view */}
      {topTab === 'recurring' && (() => {
        const recurringBookings = bookings.filter(b => b.series);
        const seriesGroups = new Map<string, Booking[]>();
        for (const b of recurringBookings) {
          const sid = b.series!.seriesId;
          const list = seriesGroups.get(sid) ?? [];
          list.push(b);
          seriesGroups.set(sid, list);
        }
        // Sort groups by the first session's start time (most recent first)
        const sortedGroups = [...seriesGroups.entries()].sort((a, b) => {
          const aFirst = a[1].sort((x, y) => (x.series?.seriesIndex ?? 0) - (y.series?.seriesIndex ?? 0))[0];
          const bFirst = b[1].sort((x, y) => (x.series?.seriesIndex ?? 0) - (y.series?.seriesIndex ?? 0))[0];
          return (bFirst?.startTime ?? '').localeCompare(aFirst?.startTime ?? '');
        });
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#2D2A33]">Recurring Sessions</h2>
                <p className="text-sm text-[#8E8E9F] mt-0.5">{sortedGroups.length} series · {recurringBookings.length} total sessions</p>
              </div>
              <button onClick={() => fetchBookings()} disabled={loading} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F0EB] text-sm text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            {loading && (
              <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" /></div>
            )}

            {!loading && sortedGroups.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-[#F0ECE8]">
                <RefreshCw className="w-10 h-10 text-[#E8E0D8] mx-auto mb-3" />
                <p className="text-sm text-[#8E8E9F]">No recurring series yet</p>
              </div>
            )}

            {!loading && sortedGroups.map(([seriesId, sessions]) => {
              const sorted = [...sessions].sort((a, b) => (a.series?.seriesIndex ?? 0) - (b.series?.seriesIndex ?? 0));
              const anchor = sorted[0];
              const freq = anchor?.series?.frequency ?? 'weekly';
              const total = anchor?.series?.seriesTotal ?? sessions.length;
              const mode = anchor?.series?.invoiceMode ?? 'per-session';
              const confirmedCount = sorted.filter(s => s.status === 'confirmed' || s.status === 'completed').length;
              const cancelledCount = sorted.filter(s => s.status === 'cancelled' || s.status === 'declined').length;
              return (
                <div key={seriesId} className="bg-white rounded-xl border border-[#F0ECE8] overflow-hidden">
                  {/* Series header */}
                  <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#F0ECE8]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center text-sm font-bold text-[#7A3B5E]">
                          {anchor?.clientName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#2D2A33]">{anchor?.clientName}</h3>
                          <p className="text-xs text-[#8E8E9F]">
                            {anchor?.serviceName || anchor?.serviceSlug} · {freq} · {mode === 'bundled' ? 'Bundled invoice' : 'Per-session'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#2D2A33]">{sorted.length}/{total}</p>
                        <p className="text-[10px] text-[#8E8E9F]">sessions</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: total }, (_, i) => {
                        const session = sorted.find(s => (s.series?.seriesIndex ?? 0) === i + 1);
                        const st = session?.status;
                        const color = st === 'completed' ? 'bg-[#3B8A6E]'
                          : st === 'confirmed' ? 'bg-[#3B8A6E]/60'
                          : st === 'cancelled' || st === 'declined' ? 'bg-[#C45B5B]'
                          : st === 'approved' ? 'bg-blue-400'
                          : st === 'pending_approval' ? 'bg-amber-400'
                          : 'bg-[#E8E4DE]';
                        return <div key={i} className={`flex-1 h-1.5 rounded-full ${color}`} />;
                      })}
                    </div>
                    <div className="flex gap-3 mt-1.5 text-[10px] text-[#8E8E9F]">
                      {confirmedCount > 0 && <span>{confirmedCount} confirmed</span>}
                      {cancelledCount > 0 && <span className="text-[#C45B5B]">{cancelledCount} cancelled</span>}
                    </div>
                  </div>
                  {/* Individual sessions */}
                  <div className="divide-y divide-[#F0ECE8]">
                    {sorted.map(session => {
                      const status = STATUS_COLORS[session.status] ?? STATUS_COLORS.confirmed;
                      return (
                        <div key={session.bookingId} className="px-4 py-2.5 flex items-center gap-3">
                          <span className="text-xs font-bold text-[#8E8E9F] w-8 shrink-0">#{session.series?.seriesIndex}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#2D2A33]">
                              {new Date(session.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                              {' · '}
                              {new Date(session.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </p>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Bookings list (default view) */}
      {topTab === 'bookings' && (
      <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2D2A33]">Bookings</h2>
          <p className="text-sm text-[#8E8E9F] mt-0.5">Manage session requests and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNewBookingOpen(true)}
            className="group flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all active:scale-95 hover:shadow-md"
            style={{
              background: 'linear-gradient(135deg, #7A3B5E 0%, #9B4E79 100%)',
              boxShadow: '0 4px 12px rgba(122, 59, 94, 0.25), 0 1px 2px rgba(122, 59, 94, 0.18)',
            }}
            aria-label="Create new booking"
          >
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full bg-white/22 group-hover:bg-white/30 transition-colors"
              aria-hidden
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.75} />
            </span>
            New Booking
          </button>
          <button
            onClick={() => fetchBookings()}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F0EB] text-sm text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <NewBookingModal
        open={newBookingOpen}
        password={password}
        onClose={() => setNewBookingOpen(false)}
        onCreated={() => {
          setSuccess('Booking created — client notified and invoice drafted if paid');
          fetchBookings({ silent: true });
        }}
      />

      {rescheduleTarget && (
        <RescheduleBookingModal
          booking={rescheduleTarget}
          bearerHeaders={headers}
          onClose={() => setRescheduleTarget(null)}
          onSuccess={(msg) => {
            setSuccess(msg);
            fetchBookings({ silent: true });
          }}
          onError={(msg) => setError(msg)}
        />
      )}

      {cancelTarget && (
        <CancelBookingModal
          booking={cancelTarget}
          bearerHeaders={headers}
          onClose={() => setCancelTarget(null)}
          onSuccess={(msg) => {
            setSuccess(msg);
            fetchBookings({ silent: true });
          }}
          onError={(msg) => setError(msg)}
        />
      )}

      {convertTarget && (
        <ApproveAndConvertDialog
          booking={convertTarget}
          password={password}
          onClose={() => setConvertTarget(null)}
          onSuccess={({ siblingCount }) => {
            setConvertTarget(null);
            setSuccess(`Approved and added ${siblingCount} more session${siblingCount === 1 ? '' : 's'} to the series. Review the bundled invoice in the Invoices tab.`);
            fetchBookings({ silent: true });
          }}
        />
      )}

      {/* Alerts */}
      {pendingCount > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-amber-700">{pendingCount}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">
              {pendingCount === 1 ? '1 booking request' : `${pendingCount} booking requests`} waiting for your approval
            </p>
            <p className="text-xs text-amber-600 mt-0.5">Review and approve to send the invoice to the client</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="p-3 rounded-lg bg-red-50 text-sm text-red-700 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" /> {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="p-3 rounded-lg bg-green-50 text-sm text-green-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {success}
            <button onClick={() => setSuccess(null)} className="ml-auto text-green-400 hover:text-green-600"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none">
        {([
          { key: 'pending_approval' as FilterStatus, label: 'Pending', count: bookings.filter(b => b.status === 'pending_approval').length },
          { key: 'pending-review' as FilterStatus, label: 'Draft', count: bookings.filter(b => b.status === 'pending-review').length },
          { key: 'approved' as FilterStatus, label: 'Approved', count: bookings.filter(b => b.status === 'approved').length },
          { key: 'confirmed' as FilterStatus, label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
          { key: 'completed' as FilterStatus, label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
          { key: 'cancelled' as FilterStatus, label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled' || b.status === 'declined').length },
          { key: 'series' as FilterStatus, label: 'Series', count: bookings.filter(b => !!b.series?.seriesId).length },
          { key: 'all' as FilterStatus, label: 'All', count: bookings.length },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all snap-start active:scale-95 ${
              filter === tab.key
                ? 'bg-[#7A3B5E] text-white shadow-sm'
                : 'bg-white text-[#8E8E9F] hover:bg-[#F5F0EB] border border-[#F0ECE8]'
            }`}
          >
            {tab.label} {tab.count > 0 && <span className="ml-1 opacity-70">({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* Sort + Select Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8E8E9F]" />
          <span className="text-xs text-[#8E8E9F]">Sort:</span>
          {(['date', 'name', 'status'] as SortKey[]).map(sk => (
            <button
              key={sk}
              onClick={() => setSortBy(sk)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                sortBy === sk ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'text-[#8E8E9F] hover:bg-[#F5F0EB]'
              }`}
            >
              {sk === 'date' ? 'Date' : sk === 'name' ? 'Name' : 'Status'}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (selectedIds.size === sorted.length && sorted.length > 0) {
              setSelectedIds(new Set());
            } else {
              setSelectedIds(new Set(sorted.map(b => b.bookingId)));
            }
          }}
          className="text-xs font-medium text-[#7A3B5E] hover:text-[#6A2E4E] transition-colors px-2 py-1"
        >
          {selectedIds.size > 0 && selectedIds.size === sorted.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {/* Booking Cards */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#F0ECE8]">
          <Calendar className="w-10 h-10 text-[#E8E0D8] mx-auto mb-3" />
          <p className="text-sm text-[#8E8E9F]">No {filter === 'all' ? '' : filter.replace('_', ' ')} bookings</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
          {sorted.map((booking, idx) => {
              const status = STATUS_COLORS[booking.status] ?? STATUS_COLORS.confirmed;
              const dateStr = new Date(booking.startTime).toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
              });
              const timeStr = new Date(booking.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric', minute: '2-digit',
              });
              const isActionable = booking.status === 'pending_approval';
              const isLoading = actionLoading === booking.bookingId;

              return (
                <motion.div
                  key={booking.bookingId}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.03, duration: 0.25 }}
                  className={`bg-white rounded-xl border border-l-[3px] p-4 transition-all ${
                    isActionable ? 'border-amber-200 shadow-sm' : 'border-[#F0ECE8]'
                  } ${status.border}`}
                >
                  {/* Top row: checkbox + avatar + name + status */}
                  <div className="flex items-start gap-2.5 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        const next = new Set(selectedIds);
                        if (next.has(booking.bookingId)) next.delete(booking.bookingId);
                        else next.add(booking.bookingId);
                        setSelectedIds(next);
                      }}
                      className={`mt-1.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selectedIds.has(booking.bookingId)
                          ? 'bg-[#7A3B5E] border-[#7A3B5E]'
                          : 'border-[#D8D2C8] hover:border-[#7A3B5E]'
                      }`}
                    >
                      {selectedIds.has(booking.bookingId) && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <div className="w-9 h-9 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0 text-sm font-bold text-[#7A3B5E]">
                      {booking.clientName?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#2D2A33] text-sm truncate">{booking.clientName}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <p className="text-xs text-[#8E8E9F] truncate">{booking.serviceName || booking.serviceSlug}</p>
                        {booking.series && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#C8A97D] bg-[#C8A97D]/10 px-1.5 py-0.5 rounded-full shrink-0">
                            <RefreshCw className="w-2.5 h-2.5" />
                            {booking.series.seriesIndex}/{booking.series.seriesTotal}
                          </span>
                        )}
                        {booking.status === 'confirmed' && (() => {
                          const daysUntil = Math.ceil((new Date(booking.startTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                          if (daysUntil >= 0 && daysUntil <= 7) {
                            return <span className="text-[10px] font-medium text-[#7A3B5E] bg-[#7A3B5E]/5 px-1.5 py-0.5 rounded">
                              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil}d`}
                            </span>;
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                    <p className="text-xs text-[#C0B8B0] shrink-0">{booking.source}</p>
                  </div>

                  {/* Received timestamp */}
                  {booking.createdAt && (
                    <p className="text-[11px] text-[#B0A99F] mb-2.5 -mt-1.5 ml-12">
                      Received {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                      })} at {new Date(booking.createdAt).toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: '2-digit',
                      })}
                      {(() => {
                        const ms = Date.now() - new Date(booking.createdAt).getTime();
                        const mins = Math.floor(ms / 60000);
                        if (mins < 1) return ' · just now';
                        if (mins < 60) return ` · ${mins}m ago`;
                        const hrs = Math.floor(mins / 60);
                        if (hrs < 24) return ` · ${hrs}h ago`;
                        const days = Math.floor(hrs / 24);
                        return ` · ${days}d ago`;
                      })()}
                    </p>
                  )}

                  {/* Details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs mb-3">
                    <div className="flex items-center gap-1.5 text-[#6B6580]">
                      <Calendar className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                      {dateStr}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6B6580]">
                      <Clock className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                      {timeStr} ({booking.durationMinutes}m)
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6B6580]">
                      {booking.sessionMode === 'online' ? <Video className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" /> : <Building2 className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />}
                      {booking.sessionMode === 'online' ? 'Online' : 'In-Person'}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6B6580]">
                      <Mail className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                      <span className="truncate">{booking.clientEmail}</span>
                    </div>
                    {booking.clientPhone && (
                      <div className="flex items-center gap-1.5 text-[#6B6580]">
                        <Phone className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                        <a href={`tel:${booking.clientPhone}`} className="hover:text-[#7A3B5E] transition-colors">{booking.clientPhone}</a>
                      </div>
                    )}
                    {(booking.preferredLanguage || booking.clientCountry) && (
                      <div className="flex items-center gap-1.5 text-[#6B6580]">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                        <span>
                          {booking.preferredLanguage === 'ar' ? 'Arabic' : booking.preferredLanguage === 'en' ? 'English' : ''}
                          {booking.preferredLanguage && booking.clientCountry ? ' · ' : ''}
                          {booking.clientCountry || ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Client notes */}
                  {booking.clientNotes && (
                    <div className="bg-[#FFFAF5] border-l-2 border-[#C8A97D] rounded-r-lg px-3 py-2 mb-3">
                      <p className="text-[10px] font-semibold text-[#C8A97D] mb-0.5">Client notes</p>
                      <p className="text-xs text-[#4A4A5C] line-clamp-2">{booking.clientNotes}</p>
                    </div>
                  )}

                  {/* AI Intake */}
                  {booking.aiIntakeNotes && (
                    <div className="bg-[#F5F0FF] border-l-2 border-[#7A3B5E]/30 rounded-r-lg px-3 py-2 mb-3">
                      <p className="text-[10px] font-semibold text-[#7A3B5E]/60 mb-0.5">AI intake summary</p>
                      <p className="text-xs text-[#4A4A5C] line-clamp-2">{booking.aiIntakeNotes}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  {isActionable && (
                    <div className="pt-2 border-t border-[#F0ECE8] space-y-2">
                      <button
                        onClick={() => handleApproveAndInvoice(booking)}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#3B8A6E] text-white text-xs font-semibold hover:bg-[#2F7A5E] disabled:opacity-50 transition-all active:scale-[0.97]"
                      >
                        {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        Approve & Review Invoice
                      </button>
                      {/* Convert-to-series only makes sense for client-submitted bookings,
                          not admin-created drafts (those use the +New Booking flow). */}
                      {booking.status === 'pending_approval' && !booking.series && (
                        <button
                          onClick={() => setConvertTarget(booking)}
                          disabled={isLoading}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#7A3B5E]/30 text-[#7A3B5E] text-xs font-semibold hover:bg-[#7A3B5E]/5 disabled:opacity-50 transition-all"
                        >
                          <CalendarClock className="w-3.5 h-3.5" />
                          Approve & Make Recurring
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(booking.bookingId)}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#E8E0D8] text-[#4A4A5C] text-xs font-semibold hover:bg-[#F5F0EB] disabled:opacity-50 transition-all"
                        >
                          Approve Only
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDialog({
                              title: 'Decline Request',
                              message: `Decline the booking request from ${booking.clientName}? The client will be notified.`,
                              confirmLabel: 'Decline',
                              confirmColor: 'red',
                              showNotifyToggle: false,
                              onConfirm: () => { setConfirmDialog(null); handleDecline(booking.bookingId); },
                            });
                          }}
                          disabled={isLoading}
                          className="px-4 py-2 rounded-lg bg-white border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 disabled:opacity-50 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Meet link for confirmed */}
                  {booking.meetLink && (
                    <div className="pt-2 border-t border-[#F0ECE8]">
                      <a href={booking.meetLink} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-[#3B8A6E] font-semibold flex items-center gap-1 hover:underline">
                        <Video className="w-3 h-3" /> Google Meet link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  )}

                  {/* ─── Inline Actions Bar ─── */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-[#F0ECE8] flex-wrap">
                    {/* Quick status pills — show contextual next-step actions */}
                    {booking.status === 'pending-review' && (
                      <button
                        onClick={() => handleApproveAndInvoice(booking)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#3B8A6E]/10 text-[#3B8A6E] hover:bg-[#3B8A6E] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Review & Send Invoice
                      </button>
                    )}
                    {booking.status === 'approved' && (
                      <button
                        onClick={() => handleStatusChangeWithDialog(booking.bookingId, booking.clientName, 'confirmed' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#3B8A6E]/10 text-[#3B8A6E] hover:bg-[#3B8A6E] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Mark Confirmed
                      </button>
                    )}
                    {(booking.status === 'confirmed' || booking.status === 'approved') && (
                      <button
                        onClick={() => handleStatusChangeWithDialog(booking.bookingId, booking.clientName, 'completed' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#5B8AC4]/10 text-[#5B8AC4] hover:bg-[#5B8AC4] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Mark Completed
                      </button>
                    )}
                    {(booking.status === 'confirmed' || booking.status === 'approved' || booking.status === 'pending_approval') && (
                      <button
                        onClick={() => setRescheduleTarget(booking)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#7A3B5E]/8 text-[#7A3B5E] hover:bg-[#7A3B5E] hover:text-white disabled:opacity-50 transition-all inline-flex items-center gap-1"
                      >
                        <CalendarClock className="w-3 h-3" />
                        Reschedule
                      </button>
                    )}
                    {booking.status !== 'cancelled' && booking.status !== 'declined' && booking.status !== 'completed' && (
                      <button
                        onClick={() => {
                          // Active client bookings (with possible payment) → fee-preview modal.
                          // Admin-internal pending-review drafts → simple confirm dialog.
                          if (['confirmed', 'approved', 'pending_approval'].includes(booking.status)) {
                            setCancelTarget(booking);
                          } else {
                            handleStatusChangeWithDialog(booking.bookingId, booking.clientName, 'cancelled' as BookingStatus);
                          }
                        }}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#C45B5B]/8 text-[#C45B5B] hover:bg-[#C45B5B] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusChangeWithDialog(booking.bookingId, booking.clientName, 'no-show' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#8E8E9F]/10 text-[#8E8E9F] hover:bg-[#8E8E9F] hover:text-white disabled:opacity-50 transition-all"
                      >
                        No-Show
                      </button>
                    )}

                    {/* Spacer + Delete */}
                    <div className="flex-1" />
                    <button
                      onClick={() => handleDelete(booking.bookingId, booking.clientName)}
                      disabled={isLoading}
                      className="p-1.5 rounded-full text-[#C0B8B0] hover:text-[#C45B5B] hover:bg-red-50 disabled:opacity-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      {/* Selection action bar — clears the floating glass nav on mobile. */}
      {selectedIds.size > 0 && (
        <div className="sticky sm:bottom-0 z-30 bottom-[calc(80px+env(safe-area-inset-bottom))] mx--4 sm:mx-0">
          <div className="bg-[#2D2A33] text-white rounded-xl mx-4 sm:mx-0 px-4 py-3 flex items-center justify-between shadow-lg">
            <span className="text-sm font-semibold">{selectedIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setConfirmDialog({
                    title: 'Delete Selected',
                    message: `Permanently delete ${selectedIds.size} booking${selectedIds.size === 1 ? '' : 's'}? This cannot be undone.`,
                    confirmLabel: 'Delete',
                    confirmColor: 'red',
                    showNotifyToggle: false,
                    onConfirm: async () => {
                      setConfirmDialog(null);
                      const total = selectedIds.size;
                      let deleted = 0;
                      const failedIds: string[] = [];
                      for (const id of selectedIds) {
                        try {
                          const res = await fetch('/api/admin/booking/delete', {
                            method: 'POST',
                            headers,
                            body: JSON.stringify({ bookingId: id }),
                          });
                          if (res.ok) deleted += 1;
                          else failedIds.push(id);
                        } catch {
                          failedIds.push(id);
                        }
                      }
                      setSelectedIds(new Set());
                      if (failedIds.length > 0) {
                        console.error('Failed to delete bookings:', failedIds);
                        setError(
                          `Deleted ${deleted} of ${total} booking${total === 1 ? '' : 's'} — ${failedIds.length} failed. Check console for details.`,
                        );
                      } else {
                        setSuccess(`Deleted ${deleted} booking${deleted === 1 ? '' : 's'}`);
                      }
                      fetchBookings({ silent: true });
                    },
                  });
                }}
                className="px-3 py-1.5 rounded-lg bg-[#C45B5B] text-xs font-semibold hover:bg-[#B04A4A] transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
      {/* ─── Invoice Review Sheet ─── */}
      {invoiceSheet && (
        <InvoiceReviewSheet
          open={!!invoiceSheet}
          booking={invoiceSheet.booking}
          draft={invoiceSheet.draft}
          password={password}
          onClose={() => setInvoiceSheet(null)}
          onSent={async (invoiceNumber) => {
            // For pending-review drafts, also activate the booking (GCal + confirmation)
            if (invoiceSheet.booking.status === 'pending-review') {
              try {
                await fetch(`/api/admin/booking/${invoiceSheet.booking.bookingId}/confirm-and-send`, {
                  method: 'POST', headers,
                  body: JSON.stringify({ sendClientEmail: true }),
                });
              } catch { /* best effort — invoice already sent */ }
            }
            setInvoiceSheet(null);
            setSuccess(`Invoice ${invoiceNumber} sent to ${invoiceSheet.booking.clientEmail}! Booking activated.`);
            fetchBookings({ silent: true });
          }}
        />
      )}

      {/* ─── Confirmation Dialog ─── */}
      <AnimatePresence>
      {confirmDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/30" onClick={() => setConfirmDialog(null)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                confirmDialog.confirmColor === 'red' ? 'bg-[#C45B5B]/10' : 'bg-[#7A3B5E]/10'
              }`}>
                <AlertCircle className={`w-5 h-5 ${
                  confirmDialog.confirmColor === 'red' ? 'text-[#C45B5B]' : 'text-[#7A3B5E]'
                }`} />
              </div>
              <h3 className="text-base font-bold text-[#2D2A33]">{confirmDialog.title}</h3>
            </div>
            <p className="text-sm text-[#4A4A5C] leading-relaxed">{confirmDialog.message}</p>
            {confirmDialog.showNotifyToggle && (
              <label className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F5F0EB] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifyClient}
                  onChange={e => setNotifyClient(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#7A3B5E]"
                />
                <div>
                  <p className="text-sm font-medium text-[#2D2A33]">Notify client via email</p>
                  <p className="text-[10px] text-[#8E8E9F]">Send a status update email to the client</p>
                </div>
              </label>
            )}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                  confirmDialog.confirmColor === 'red'
                    ? 'bg-[#C45B5B] hover:bg-[#B04A4A]'
                    : confirmDialog.confirmColor === 'green'
                    ? 'bg-[#3B8A6E] hover:bg-[#2F7A5E]'
                    : 'bg-[#7A3B5E] hover:bg-[#6A2E4E]'
                }`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

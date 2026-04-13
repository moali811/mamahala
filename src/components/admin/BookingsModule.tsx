'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Clock, User, Mail, Phone, Check, X, Loader2,
  AlertCircle, RefreshCw, ChevronDown, Video, Building2,
  FileText, ExternalLink, MessageSquare, Trash2, ArrowUpDown,
} from 'lucide-react';
import type { Booking, BookingStatus } from '@/lib/booking/types';

interface Props {
  password: string;
}

type FilterStatus = 'all' | 'pending_approval' | 'approved' | 'confirmed' | 'completed' | 'cancelled' | 'declined';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending_approval: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Approved' },
  confirmed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Confirmed' },
  completed: { bg: 'bg-slate-50', text: 'text-slate-600', label: 'Completed' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600', label: 'Cancelled' },
  declined: { bg: 'bg-red-50', text: 'text-red-600', label: 'Declined' },
  rescheduled: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Rescheduled' },
  'no-show': { bg: 'bg-gray-50', text: 'text-gray-500', label: 'No-Show' },
};

export default function BookingsModule({ password }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('pending_approval');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' };

  // Auto-dismiss success after 5s
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 5000);
    return () => clearTimeout(t);
  }, [success]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/booking/list', { headers });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

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
      fetchBookings();
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
      // Step 1: Approve
      const approveRes = await fetch('/api/admin/booking/approve', {
        method: 'POST', headers,
        body: JSON.stringify({ bookingId: booking.bookingId }),
      });
      if (!approveRes.ok) {
        const d = await approveRes.json();
        throw new Error(d.error || 'Approval failed');
      }

      // Step 2: Try to fetch the draft created during booking intake
      let draft = null;
      if (booking.draftId) {
        const draftRes = await fetch(`/api/admin/invoices/drafts?id=${booking.draftId}`, { headers });
        const draftData = await draftRes.json();
        draft = draftData.draft;
      }

      // Step 3: If no draft exists, create one from the booking data
      if (!draft) {
        // Save a fresh draft from booking info
        const freshDraft = {
          client: {
            name: booking.clientName,
            email: booking.clientEmail,
            country: booking.clientCountry || 'CA',
            phone: booking.clientPhone || '',
          },
          serviceSlug: booking.serviceSlug,
          complexity: 'standard',
          package: 1,
          slidingScalePercent: 0,
          taxMode: 'auto',
          allowETransfer: true,
          daysUntilDue: 7,
          subject: `Session: ${booking.serviceName || booking.serviceSlug} on ${new Date(booking.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
          adminNote: `Auto-generated from booking ${booking.bookingId}`,
        };
        const saveDraftRes = await fetch('/api/admin/invoices/drafts', {
          method: 'POST', headers,
          body: JSON.stringify({ draft: freshDraft }),
        });
        const savedData = await saveDraftRes.json();
        draft = savedData.draft || freshDraft;
        if (savedData.id) draft.id = savedData.id;
      }

      // Step 4: Send the invoice
      const createRes = await fetch('/api/admin/invoices/create', {
        method: 'POST', headers,
        body: JSON.stringify({ draft }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        // Show the specific error but note approval succeeded
        throw new Error(`Approved, but invoice failed: ${createData.error || 'Unknown error'}. Go to Invoices tab to send manually.`);
      }

      const emailNote = createData.emailError
        ? ` (email issue: ${createData.emailError} — PDF was created, resend from Invoices tab)`
        : '';
      setSuccess(`Approved + Invoice ${createData.invoiceNumber || ''} sent to ${booking.clientEmail}!${emailNote}`);
      fetchBookings();
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
      fetchBookings();
    } catch (err: any) {
      setError(err.message || 'Failed to decline');
    } finally {
      setActionLoading(null);
    }
  };

  type SortKey = 'date' | 'name' | 'status';
  const [sortBy, setSortBy] = useState<SortKey>('date');

  // ─── Confirmation dialog state ─────────────────────────────
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    confirmColor: 'red' | 'plum';
    onConfirm: () => void;
  } | null>(null);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    setActionLoading(bookingId);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/update-status', {
        method: 'POST', headers,
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(`Status updated to ${newStatus}`);
      fetchBookings();
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
      fetchBookings();
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
      onConfirm: () => { setConfirmDialog(null); executeDelete(bookingId); },
    });
  };

  const handleDestructiveStatusChange = (bookingId: string, clientName: string, newStatus: BookingStatus) => {
    const labels: Record<string, { title: string; message: string; label: string }> = {
      cancelled: { title: 'Cancel Booking', message: `Cancel the session for ${clientName}? The client will need to rebook.`, label: 'Yes, Cancel' },
      declined: { title: 'Decline Request', message: `Decline the booking request from ${clientName}?`, label: 'Yes, Decline' },
      'no-show': { title: 'Mark No-Show', message: `Mark ${clientName} as a no-show for this session?`, label: 'Mark No-Show' },
    };
    const info = labels[newStatus];
    if (info) {
      setConfirmDialog({
        title: info.title,
        message: info.message,
        confirmLabel: info.label,
        confirmColor: 'red',
        onConfirm: () => { setConfirmDialog(null); handleStatusChange(bookingId, newStatus); },
      });
    } else {
      handleStatusChange(bookingId, newStatus);
    }
  };

  const filtered = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'cancelled') return b.status === 'cancelled' || b.status === 'declined';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2D2A33]">Bookings</h2>
          <p className="text-sm text-[#8E8E9F] mt-0.5">Manage session requests and approvals</p>
        </div>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F0EB] text-sm text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

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

      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-green-50 text-sm text-green-700 flex items-center gap-2">
          <Check className="w-4 h-4" /> {success}
          <button onClick={() => setSuccess(null)} className="ml-auto text-green-400 hover:text-green-600"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {([
          { key: 'pending_approval' as FilterStatus, label: 'Pending', count: bookings.filter(b => b.status === 'pending_approval').length },
          { key: 'approved' as FilterStatus, label: 'Approved', count: bookings.filter(b => b.status === 'approved').length },
          { key: 'confirmed' as FilterStatus, label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
          { key: 'completed' as FilterStatus, label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
          { key: 'cancelled' as FilterStatus, label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled' || b.status === 'declined').length },
          { key: 'all' as FilterStatus, label: 'All', count: bookings.length },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === tab.key
                ? 'bg-[#7A3B5E] text-white'
                : 'bg-white text-[#8E8E9F] hover:bg-[#F5F0EB] border border-[#F0ECE8]'
            }`}
          >
            {tab.label} {tab.count > 0 && <span className="ml-1 opacity-70">({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* Sort Controls */}
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
          {sorted.map(booking => {
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
                <div
                  key={booking.bookingId}
                  className={`bg-white rounded-xl border p-4 transition-all ${
                    isActionable ? 'border-amber-200 shadow-sm' : 'border-[#F0ECE8]'
                  }`}
                >
                  {/* Top row: avatar + name + status */}
                  <div className="flex items-start gap-3 mb-3">
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
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-[#8E8E9F] truncate">{booking.serviceName || booking.serviceSlug}</p>
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
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#3B8A6E] text-white text-xs font-semibold hover:bg-[#2F7A5E] disabled:opacity-50 transition-all"
                      >
                        {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        Approve & Send Invoice
                      </button>
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
                    {booking.status === 'approved' && (
                      <button
                        onClick={() => handleStatusChange(booking.bookingId, 'confirmed' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#3B8A6E]/10 text-[#3B8A6E] hover:bg-[#3B8A6E] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Mark Confirmed
                      </button>
                    )}
                    {(booking.status === 'confirmed' || booking.status === 'approved') && (
                      <button
                        onClick={() => handleStatusChange(booking.bookingId, 'completed' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#5B8AC4]/10 text-[#5B8AC4] hover:bg-[#5B8AC4] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Mark Completed
                      </button>
                    )}
                    {booking.status !== 'cancelled' && booking.status !== 'declined' && booking.status !== 'completed' && (
                      <button
                        onClick={() => handleDestructiveStatusChange(booking.bookingId, booking.clientName, 'cancelled' as BookingStatus)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#C45B5B]/8 text-[#C45B5B] hover:bg-[#C45B5B] hover:text-white disabled:opacity-50 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleDestructiveStatusChange(booking.bookingId, booking.clientName, 'no-show' as BookingStatus)}
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
                </div>
              );
            })}
        </div>
      )}
      {/* ─── Confirmation Dialog ─── */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setConfirmDialog(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
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
                    : 'bg-[#7A3B5E] hover:bg-[#6A2E4E]'
                }`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

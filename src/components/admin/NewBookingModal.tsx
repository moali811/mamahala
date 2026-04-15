'use client';

/* ================================================================
   NewBookingModal — Admin manual booking form
   ================================================================
   Opens from the "New Booking" button in BookingsModule. Lets Dr.
   Hala (or any admin) create a booking on behalf of a client who
   called/walked in, without having to pretend to be the client on
   the public /en/book wizard.

   Posts to /api/admin/booking/create which:
   - Skips slot availability checks (admin can override)
   - Auto-approves paid sessions (skips pending_approval)
   - Creates the GCal event + Meet link immediately
   - Creates a draft invoice for paid sessions
   - Sends the client confirmation email + admin notification
   ================================================================ */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check, Calendar, Clock } from 'lucide-react';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';

interface Props {
  open: boolean;
  password: string;
  onClose: () => void;
  onCreated: () => void;  // parent refreshes the booking list
}

// Common IANA timezones offered in the dropdown. Provider default
// (Asia/Dubai) is first; client might be elsewhere.
const TIMEZONES = [
  'Asia/Dubai',
  'America/Toronto',
  'America/New_York',
  'America/Vancouver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Riyadh',
  'Asia/Beirut',
  'UTC',
];

export default function NewBookingModal({ open, password, onClose, onCreated }: Props) {
  const [serviceSlug, setServiceSlug] = useState('initial-consultation');
  const [date, setDate] = useState('');          // YYYY-MM-DD
  const [time, setTime] = useState('');          // HH:MM
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientTimezone, setClientTimezone] = useState('Asia/Dubai');
  const [sessionMode, setSessionMode] = useState<'online' | 'inPerson'>('online');
  const [notes, setNotes] = useState('');
  const [sendClientEmail, setSendClientEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lookup service + its duration from the pricing tier
  const { selectedService, durationMinutes, isFreeSession } = useMemo(() => {
    const svc = services.find(s => s.slug === serviceSlug);
    const tier = svc ? PRICING_TIERS[svc.pricingTierKey as PricingTierKey] : null;
    return {
      selectedService: svc,
      // Most tiers default to 50 min; discovery call is 30 min
      durationMinutes: tier?.durationMinutes ?? 50,
      isFreeSession: tier?.anchors?.CAD?.online === 0,
    };
  }, [serviceSlug]);

  const reset = () => {
    setServiceSlug('initial-consultation');
    setDate('');
    setTime('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientTimezone('Asia/Dubai');
    setSessionMode('online');
    setNotes('');
    setSendClientEmail(true);
    setError(null);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!clientName.trim()) return setError('Client name is required');
    if (!clientEmail.includes('@')) return setError('Valid client email is required');
    if (!date || !time) return setError('Date and time are required');

    // Build startTime/endTime in the selected client timezone, then
    // convert to ISO UTC. We use the same naive-date + offset trick
    // that src/lib/booking/availability.ts:createSlotTime uses.
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const naive = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    const utcStr = naive.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = naive.toLocaleString('en-US', { timeZone: clientTimezone });
    const offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();
    const startIso = new Date(naive.getTime() + offsetMs).toISOString();
    const endIso = new Date(naive.getTime() + offsetMs + durationMinutes * 60_000).toISOString();

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/booking/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceSlug,
          startTime: startIso,
          endTime: endIso,
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          clientPhone: clientPhone.trim() || undefined,
          clientTimezone,
          sessionMode,
          notes: notes.trim() || undefined,
          sendClientEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create booking');

      reset();
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  // Today's date for the date input min
  const today = new Date().toISOString().slice(0, 10);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#F0ECE8] rounded-t-2xl">
                <div>
                  <h2 className="text-lg font-bold text-[#2D2A33]">New Booking</h2>
                  <p className="text-xs text-[#8E8E9F] mt-0.5">Manually book a client</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  aria-label="Close"
                  className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {/* Service */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Service</label>
                  <select
                    value={serviceSlug}
                    onChange={e => setServiceSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white"
                    disabled={submitting}
                  >
                    {services.map(s => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} {s.category ? `(${s.category})` : ''}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[#8E8E9F] mt-1">
                    {durationMinutes} min · {isFreeSession ? 'Free consultation' : 'Paid session (draft invoice will be created)'}
                  </p>
                </div>

                {/* Date + Time row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
                      <Calendar className="inline w-3 h-3 mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={today}
                      disabled={submitting}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
                      <Clock className="inline w-3 h-3 mr-1" />
                      Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      disabled={submitting}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                    />
                  </div>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client timezone</label>
                  <select
                    value={clientTimezone}
                    onChange={e => setClientTimezone(e.target.value)}
                    disabled={submitting}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white"
                  >
                    {TIMEZONES.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                {/* Client name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      disabled={submitting}
                      placeholder="Full name"
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      disabled={submitting}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
                    Client phone <span className="text-[#C4C0BC] font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    disabled={submitting}
                    placeholder="+1 613 555 0000"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                  />
                </div>

                {/* Session mode */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Session mode</label>
                  <div className="flex gap-2">
                    {(['online', 'inPerson'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSessionMode(mode)}
                        disabled={submitting}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          sessionMode === mode
                            ? 'bg-[#7A3B5E] text-white'
                            : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                        }`}
                      >
                        {mode === 'online' ? 'Online (Google Meet)' : 'In-Person — Ottawa'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
                    Notes <span className="text-[#C4C0BC] font-normal">(optional, for Dr. Hala)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    disabled={submitting}
                    rows={2}
                    placeholder="Anything Dr. Hala should know before the session…"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 resize-none"
                  />
                </div>

                {/* Send client email toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendClientEmail}
                    onChange={e => setSendClientEmail(e.target.checked)}
                    disabled={submitting}
                    className="w-4 h-4 accent-[#7A3B5E]"
                  />
                  <span className="text-xs text-[#4A4A5C]">
                    Send confirmation email to client
                  </span>
                </label>

                {/* Error */}
                {error && (
                  <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Create Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

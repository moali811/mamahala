'use client';

/* ================================================================
   LocationPill — Admin header "Dr. Hala is in X" indicator
   ================================================================
   Reads from /api/admin/provider-location and shows Dr. Hala's
   current effective location as a pill in the admin top bar.
   Clicking opens a small popover with:
     • Source badge (override / schedule / default)
     • Current local time in that tz
     • Quick override toggle (tz picker + label + optional expiry)
     • Clear override button
     • Link to the travel schedule editor

   The override popover POSTs to /api/admin/provider-location-override
   and then refreshes the pill. Travel schedule is edited from the
   Availability module — this component just links there.
   ================================================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { MapPin, Loader2, X, RefreshCw, Check, Plane } from 'lucide-react';

interface EffectiveLocation {
  timezone: string;
  locationLabel: string;
  source: 'override' | 'schedule' | 'default';
}

interface LocationPillProps {
  password: string;
  /** Optional class to tweak wrapper styling. */
  className?: string;
  /** Callback when the admin clicks the "Manage travel schedule" link. */
  onOpenTravelSchedule?: () => void;
}

// Common IANA timezones for the override picker — a curated list is
// friendlier than the full Intl.supportedValuesOf('timeZone') dump.
const COMMON_TIMEZONES = [
  { value: 'America/Toronto', label: 'Toronto, Canada' },
  { value: 'Asia/Dubai', label: 'Dubai, UAE' },
  { value: 'America/New_York', label: 'New York, USA' },
  { value: 'America/Vancouver', label: 'Vancouver, Canada' },
  { value: 'Europe/London', label: 'London, UK' },
  { value: 'Asia/Riyadh', label: 'Riyadh, Saudi Arabia' },
  { value: 'Asia/Beirut', label: 'Beirut, Lebanon' },
  { value: 'Europe/Paris', label: 'Paris, France' },
];

function formatLocalTime(timezone: string): string {
  try {
    return new Date().toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

export default function LocationPill({
  password,
  className = '',
  onOpenTravelSchedule,
}: LocationPillProps) {
  const [location, setLocation] = useState<EffectiveLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [overrideTz, setOverrideTz] = useState('Asia/Dubai');
  const [overrideLabel, setOverrideLabel] = useState('');
  const [overrideHours, setOverrideHours] = useState<number | ''>('');
  const [overrideSubmitting, setOverrideSubmitting] = useState(false);
  const [overrideError, setOverrideError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  // Initial fetch + periodic refresh so the local-time display stays
  // fresh and the pill reflects travel-schedule changes without a
  // manual reload.
  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/provider-location', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.location) {
          setLocation({
            timezone: data.location.timezone,
            locationLabel: data.location.locationLabel,
            source: data.location.source,
          });
        }
      }
    } catch {
      /* ignore — pill is non-critical */
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60_000); // refresh every minute
    return () => clearInterval(id);
  }, [refresh]);

  // Pre-fill override picker with a sensible default label the first
  // time the popover opens after the location is known.
  useEffect(() => {
    if (popoverOpen && location) {
      // Default to the NON-current timezone so the admin's first tap
      // already points somewhere useful.
      const next = COMMON_TIMEZONES.find(tz => tz.value !== location.timezone);
      if (next) {
        setOverrideTz(next.value);
        setOverrideLabel(next.label);
      }
    }
  }, [popoverOpen, location]);

  const handleApplyOverride = async () => {
    setOverrideSubmitting(true);
    setOverrideError(null);
    try {
      const body: Record<string, unknown> = {
        timezone: overrideTz,
        locationLabel: overrideLabel.trim() || overrideTz,
      };
      if (typeof overrideHours === 'number' && overrideHours > 0) {
        body.expiresAt = new Date(Date.now() + overrideHours * 3600_000).toISOString();
      }
      const res = await fetch('/api/admin/provider-location-override', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to apply override');
      await refresh();
      setPopoverOpen(false);
    } catch (err: any) {
      setOverrideError(err.message || 'Failed to apply override');
    } finally {
      setOverrideSubmitting(false);
    }
  };

  const handleClearOverride = async () => {
    setClearing(true);
    setOverrideError(null);
    try {
      const res = await fetch('/api/admin/provider-location-override', {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to clear override');
      }
      await refresh();
      setPopoverOpen(false);
    } catch (err: any) {
      setOverrideError(err.message || 'Failed to clear override');
    } finally {
      setClearing(false);
    }
  };

  if (loading || !location) {
    return (
      <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#F5F0EB] text-[#8E8E9F] text-xs ${className}`}>
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Loading…</span>
      </div>
    );
  }

  const sourceColor =
    location.source === 'override'
      ? 'bg-[#C8A97D]/15 text-[#8A6B3E]'
      : location.source === 'schedule'
      ? 'bg-[#3B8A6E]/10 text-[#3B8A6E]'
      : 'bg-[#7A3B5E]/8 text-[#7A3B5E]';

  return (
    <div className={`relative ${className}`}>
      {/* Pill button */}
      <button
        type="button"
        onClick={() => setPopoverOpen(o => !o)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${sourceColor} hover:brightness-95`}
        title={`Dr. Hala is currently in ${location.locationLabel} (${location.timezone})`}
      >
        <MapPin className="w-3 h-3" />
        <span className="hidden sm:inline">{location.locationLabel}</span>
        <span className="sm:hidden">{location.timezone.split('/').pop()}</span>
        <span className="text-[10px] opacity-70 font-mono">{formatLocalTime(location.timezone)}</span>
      </button>

      {/* Popover */}
      {popoverOpen && (
        <>
          {/* Click-outside backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setPopoverOpen(false)}
          />
          {/* Popover panel */}
          <div className="absolute right-0 mt-2 w-80 z-40 bg-white rounded-xl shadow-xl border border-[#F0ECE8] overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#F3EFE8] bg-gradient-to-r from-[#FFFAF5] to-[#F5F0EB]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#8E8E9F] font-semibold uppercase tracking-wide">
                    Dr. Hala is currently in
                  </p>
                  <p className="text-sm font-bold text-[#2D2A33]">
                    {location.locationLabel}
                  </p>
                  <p className="text-[10px] text-[#8E8E9F] font-mono">
                    {location.timezone} · {formatLocalTime(location.timezone)} local
                  </p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${sourceColor}`}>
                  {location.source}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-3 space-y-3">
              <p className="text-[11px] text-[#6B6580] leading-relaxed">
                {location.source === 'override' && (
                  <>A manual override is active. Clear it to fall back to the travel schedule.</>
                )}
                {location.source === 'schedule' && (
                  <>This is coming from your travel schedule. To temporarily override, set one below.</>
                )}
                {location.source === 'default' && (
                  <>No travel schedule or override is active — this is your home-base timezone.</>
                )}
              </p>

              {/* Override form */}
              <div className="space-y-2 rounded-lg border border-[#F0ECE8] bg-[#FAF7F2] p-2.5">
                <p className="text-[10px] font-semibold text-[#4A4A5C] uppercase tracking-wide flex items-center gap-1">
                  <Plane className="w-3 h-3 text-[#C8A97D]" />
                  Quick override
                </p>
                <select
                  value={overrideTz}
                  onChange={e => {
                    const match = COMMON_TIMEZONES.find(tz => tz.value === e.target.value);
                    setOverrideTz(e.target.value);
                    if (match) setOverrideLabel(match.label);
                  }}
                  className="w-full px-2 py-1.5 rounded-md border border-[#E8E4DE] text-[11px] bg-white"
                >
                  {COMMON_TIMEZONES.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label} ({tz.value})</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={overrideLabel}
                  onChange={e => setOverrideLabel(e.target.value)}
                  placeholder="Location label (shown in emails + PDFs)"
                  className="w-full px-2 py-1.5 rounded-md border border-[#E8E4DE] text-[11px] bg-white"
                />
                <input
                  type="number"
                  min={0}
                  max={168}
                  value={overrideHours}
                  onChange={e => setOverrideHours(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10) || 0))}
                  placeholder="Expires in hours (optional)"
                  className="w-full px-2 py-1.5 rounded-md border border-[#E8E4DE] text-[11px] bg-white"
                />
                {overrideError && (
                  <p className="text-[10px] text-red-600">{overrideError}</p>
                )}
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={handleApplyOverride}
                    disabled={overrideSubmitting || !overrideTz || !overrideLabel.trim()}
                    className="flex-1 px-2 py-1.5 rounded-md bg-[#7A3B5E] text-white text-[11px] font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 inline-flex items-center justify-center gap-1"
                  >
                    {overrideSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                    Apply
                  </button>
                  {location.source === 'override' && (
                    <button
                      type="button"
                      onClick={handleClearOverride}
                      disabled={clearing}
                      className="flex-1 px-2 py-1.5 rounded-md bg-[#F5F0EB] text-[#4A4A5C] text-[11px] font-semibold hover:bg-[#EDE6DF] disabled:opacity-50 inline-flex items-center justify-center gap-1"
                    >
                      {clearing ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Travel schedule link */}
              {onOpenTravelSchedule && (
                <button
                  type="button"
                  onClick={() => { setPopoverOpen(false); onOpenTravelSchedule(); }}
                  className="w-full px-2 py-1.5 rounded-md bg-white border border-[#F0ECE8] text-[11px] text-[#4A4A5C] font-semibold hover:bg-[#FAF7F2] inline-flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Manage travel schedule
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

/* /admin/devices — diagnostic for Web Push subscriptions.
   Shows what's currently registered in KV, recent dispatch outcomes,
   and lets the current device send itself a test push so the full
   chain (subscription → server → APNs/FCM → SW → notification) can
   be verified without making a real booking. */

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, RefreshCw, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

import { getCurrentPushSubscription, testOnServer } from '@/lib/admin-pwa/push-subscribe';

interface Device {
  endpoint: string;
  deviceLabel?: string;
  userAgent?: string;
  createdAt?: string;
  lastSeenAt?: string;
  lastSuccessAt?: string;
  lastError?: string;
  lastErrorAt?: string;
}

interface LogEntry {
  ts: string;
  title: string;
  sent: number;
  pruned: number;
  perEndpoint: Array<{ endpointTail: string; status: string; statusCode?: number }>;
}

const STALE_DAYS = 7;

function fmtRelative(iso?: string): string {
  if (!iso) return '—';
  const ts = new Date(iso).getTime();
  if (!Number.isFinite(ts)) return '—';
  const diff = Date.now() - ts;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  return `${day}d ago`;
}

function endpointTail(endpoint: string): string {
  return endpoint.length <= 24 ? endpoint : `…${endpoint.slice(-24)}`;
}

export default function AdminDevicesPage() {
  const [password, setPassword] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [localEndpoint, setLocalEndpoint] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Load saved bearer (mirrors app/admin/page.tsx auth pattern).
  useEffect(() => {
    const saved = localStorage.getItem('mh_admin_key') || sessionStorage.getItem('mh_admin_key');
    if (saved) setPassword(saved);
    setAuthChecked(true);
  }, []);

  // Look up the local subscription so the test button knows which endpoint to target.
  useEffect(() => {
    let mounted = true;
    getCurrentPushSubscription()
      .then(sub => {
        if (mounted) setLocalEndpoint(sub?.endpoint ?? null);
      })
      .catch(() => {
        if (mounted) setLocalEndpoint(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const fetchDevices = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/devices', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Invalid admin password' : `HTTP ${res.status}`);
        setDevices([]);
        setLog([]);
        return;
      }
      const data = (await res.json()) as { devices: Device[]; log: LogEntry[] };
      setDevices(data.devices ?? []);
      setLog(data.log ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (authChecked && password) fetchDevices();
  }, [authChecked, password, fetchDevices]);

  const onTest = useCallback(async () => {
    if (!localEndpoint || !password) return;
    setTesting(true);
    setTestResult(null);
    const result = await testOnServer(localEndpoint, password);
    setTesting(false);
    setTestResult({
      ok: result.ok,
      message: result.ok
        ? 'Sent — check your device for the notification.'
        : `${result.error ?? 'Failed'}${result.statusCode ? ` (HTTP ${result.statusCode})` : ''}`,
    });
    fetchDevices();
  }, [localEndpoint, password, fetchDevices]);

  if (!authChecked) {
    return <div className="p-6 text-sm text-stone-500">Loading…</div>;
  }

  if (!password) {
    return (
      <div className="p-6 text-sm">
        <p className="mb-3">No admin session — sign in at <Link href="/admin" className="underline">/admin</Link> first.</p>
      </div>
    );
  }

  const staleCutoff = Date.now() - STALE_DAYS * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
            <ChevronLeft className="h-4 w-4" />
            Back to admin
          </Link>
          <button
            onClick={fetchDevices}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-stone-700 shadow-sm ring-1 ring-stone-200 hover:bg-stone-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <h1 className="mb-1 text-xl font-medium text-stone-900">Push devices</h1>
        <p className="mb-5 text-sm text-stone-500">
          Diagnostic for the admin push notification chain. Shows registered subscriptions and recent dispatch outcomes.
        </p>

        {/* Self-test card */}
        <div className="mb-6 rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="mb-0.5 text-sm font-medium text-stone-900">Send test notification to this device</div>
              {localEndpoint ? (
                <div className="text-xs text-stone-500">
                  Local subscription: <code className="font-mono">{endpointTail(localEndpoint)}</code>
                </div>
              ) : (
                <div className="text-xs text-amber-700">
                  No subscription registered for this device. Go to{' '}
                  <Link href="/admin?tab=settings" className="underline">
                    Settings → iPhone &amp; PWA → Notifications
                  </Link>{' '}
                  to enable.
                </div>
              )}
            </div>
            <button
              onClick={onTest}
              disabled={!localEndpoint || testing}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-stone-800 disabled:bg-stone-300"
            >
              <Send className="h-3.5 w-3.5" />
              {testing ? 'Sending…' : 'Send test'}
            </button>
          </div>
          {testResult && (
            <div
              className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                testResult.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}
            >
              {testResult.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {testResult.message}
            </div>
          )}
        </div>

        {/* Devices table */}
        <div className="mb-6 rounded-xl border border-stone-200 bg-white">
          <div className="border-b border-stone-200 px-4 py-3">
            <div className="text-sm font-medium text-stone-900">Registered devices ({devices.length})</div>
          </div>
          {error && (
            <div className="border-b border-rose-100 bg-rose-50 px-4 py-2 text-xs text-rose-700">{error}</div>
          )}
          {devices.length === 0 ? (
            <div className="px-4 py-6 text-sm text-stone-500">No devices registered yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500">
                  <tr>
                    <th className="px-4 py-2 font-medium">Device</th>
                    <th className="px-4 py-2 font-medium">Endpoint</th>
                    <th className="px-4 py-2 font-medium">Created</th>
                    <th className="px-4 py-2 font-medium">Last success</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map(d => {
                    const stale = d.lastSeenAt && new Date(d.lastSeenAt).getTime() < staleCutoff;
                    const hasError = !!d.lastError;
                    const isLocal = d.endpoint === localEndpoint;
                    return (
                      <tr
                        key={d.endpoint}
                        className={`border-t border-stone-100 ${hasError ? 'bg-rose-50/40' : stale ? 'bg-amber-50/40' : ''}`}
                      >
                        <td className="px-4 py-2 align-top">
                          <div className="font-medium text-stone-900">
                            {d.deviceLabel || 'Device'}
                            {isLocal && <span className="ml-2 rounded-full bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-white">this device</span>}
                          </div>
                          {d.userAgent && <div className="mt-0.5 max-w-xs truncate text-[11px] text-stone-500">{d.userAgent}</div>}
                        </td>
                        <td className="px-4 py-2 align-top font-mono text-[11px] text-stone-700">{endpointTail(d.endpoint)}</td>
                        <td className="px-4 py-2 align-top text-stone-600">{fmtRelative(d.createdAt)}</td>
                        <td className="px-4 py-2 align-top text-stone-600">{fmtRelative(d.lastSuccessAt)}</td>
                        <td className="px-4 py-2 align-top">
                          {hasError ? (
                            <div className="text-rose-700">
                              <div className="font-medium">Error</div>
                              <div className="text-[11px]">{d.lastError}</div>
                              <div className="text-[10px] text-rose-500">{fmtRelative(d.lastErrorAt)}</div>
                            </div>
                          ) : stale ? (
                            <div className="text-amber-700">Stale (&gt;{STALE_DAYS}d)</div>
                          ) : (
                            <div className="text-emerald-700">OK</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent dispatches */}
        <div className="rounded-xl border border-stone-200 bg-white">
          <div className="border-b border-stone-200 px-4 py-3">
            <div className="text-sm font-medium text-stone-900">Recent dispatches</div>
            <div className="text-xs text-stone-500">Last 50 push attempts (newest first).</div>
          </div>
          {log.length === 0 ? (
            <div className="px-4 py-6 text-sm text-stone-500">No dispatches recorded yet.</div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {log.map((entry, i) => (
                <li key={`${entry.ts}-${i}`} className="px-4 py-2 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="truncate font-medium text-stone-900">{entry.title}</div>
                    <div className="shrink-0 text-stone-500">{fmtRelative(entry.ts)}</div>
                  </div>
                  <div className="mt-0.5 text-stone-500">
                    sent <span className="font-medium text-emerald-700">{entry.sent}</span>
                    {entry.pruned > 0 && (
                      <>
                        , pruned <span className="font-medium text-amber-700">{entry.pruned}</span>
                      </>
                    )}
                    {entry.perEndpoint?.length > 0 && (
                      <span className="ml-2 font-mono text-[10px] text-stone-400">
                        {entry.perEndpoint.map(p => `${p.endpointTail}:${p.status}${p.statusCode ? `(${p.statusCode})` : ''}`).join('  ')}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

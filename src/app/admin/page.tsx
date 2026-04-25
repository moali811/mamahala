'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { registerServiceWorker } from '@/lib/admin-pwa/sw-register';
import {
  BarChart3, Calendar, Users, FileText, Briefcase, MessageSquare,
  HelpCircle, BookOpen, ClipboardCheck, Settings, RefreshCw,
  Lock, Eye, EyeOff, Menu, X, ChevronRight, Sparkles, Star, Receipt, Plus, LayoutGrid,
  Inbox, MoreHorizontal,
} from 'lucide-react';

// Module imports
import DashboardModule from '@/components/admin/DashboardModule';
import EventsModule from '@/components/admin/EventsModule';
import LeadsModule from '@/components/admin/LeadsModule';
import ClientsModule from '@/components/admin/ClientsModule';
import BlogModule from '@/components/admin/BlogModule';
import ServicesModule from '@/components/admin/ServicesModule';
import TestimonialsModule from '@/components/admin/TestimonialsModule';
import FAQsModule from '@/components/admin/FAQsModule';
import ResourcesModule from '@/components/admin/ResourcesModule';
import QuizResultsModule from '@/components/admin/QuizResultsModule';
import SettingsModule from '@/components/admin/SettingsModule';
import InvoicesModule from '@/components/admin/InvoicesModule';
import BookingsModule from '@/components/admin/BookingsModule';
import LocationPill from '@/components/admin/LocationPill';

interface DashboardStats {
  totals: Record<string, number>;
  toolkits: Record<string, number>;
  daily: { date: string; stats: Record<string, number> }[];
  totalLeads: number;
  recentEvents: {
    type: string;
    email?: string;
    toolkitId?: string;
    source?: string;
    locale?: string;
    timestamp: string;
  }[];
}

interface Lead {
  email: string;
  firstSeen: string;
  lastSeen: string;
  events: { type: string; toolkitId?: string; timestamp: string }[];
  locale?: string;
  source?: string;
}

type Module =
  | 'dashboard'
  | 'events'
  | 'clients'
  | 'leads'
  | 'blog'
  | 'services'
  | 'testimonials'
  | 'faqs'
  | 'resources'
  | 'quiz-results'
  | 'bookings'
  | 'invoices'
  | 'settings';

const NAV_ITEMS: { key: Module; label: string; icon: React.ReactNode; group: string }[] = [
  // Primary — revenue actions
  { key: 'bookings', label: 'Bookings', icon: <Calendar className="w-4.5 h-4.5" />, group: 'primary' },
  { key: 'invoices', label: 'Invoices', icon: <Receipt className="w-4.5 h-4.5" />, group: 'primary' },
  { key: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4.5 h-4.5" />, group: 'primary' },
  { key: 'clients', label: 'Clients', icon: <Users className="w-4.5 h-4.5" />, group: 'primary' },
  // Manage
  { key: 'events', label: 'Events', icon: <Calendar className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'blog', label: 'Blog', icon: <FileText className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'services', label: 'Services', icon: <Briefcase className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'testimonials', label: 'Testimonials', icon: <Star className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'resources', label: 'Resources', icon: <BookOpen className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'leads', label: 'Leads', icon: <Sparkles className="w-4.5 h-4.5" />, group: 'Manage' },
  { key: 'quiz-results', label: 'Quizzes', icon: <ClipboardCheck className="w-4.5 h-4.5" />, group: 'Manage' },
  // System
  { key: 'settings', label: 'Settings', icon: <Settings className="w-4.5 h-4.5" />, group: 'System' },
];

// Mobile bottom bar — 5 destinations chosen for daily ops on iPhone.
// Booking sits in the CENTER (3rd of 5) — most-frequent action gets the
// thumb-comfortable middle slot. Calendar is reachable via Booking → in-
// module Calendar tab (one extra tap, but Calendar isn't a per-glance
// destination — Bookings + Today's pending count carries that signal).
// Icon strokeWidth flips between 2.6 (active) and 1.9 (inactive) below to
// give a filled-vs-outline feel without needing a separate icon set.
const MOBILE_TABS: { key: Module; label: string; icon: typeof Inbox }[] = [
  { key: 'dashboard', label: 'Home',     icon: BarChart3 },
  { key: 'clients',   label: 'Clients',  icon: Users },
  { key: 'bookings',  label: 'Booking',  icon: Inbox },
  { key: 'invoices',  label: 'Invoices', icon: Receipt },
  { key: 'settings',  label: 'More',     icon: MoreHorizontal },
];

export default function AdminCommandCenter() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Default OFF for security — opt-in to persist across browser sessions.
  // When checked: password lives in localStorage (survives browser restart).
  // When unchecked: password lives in sessionStorage (clears on tab close).
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLogging, setAutoLogging] = useState(true);

  // Auto-login from saved session. Prefer the persistent slot if the user
  // previously checked "Trust this device"; otherwise fall back to the
  // tab-scoped slot.
  useEffect(() => {
    const saved = localStorage.getItem('mh_admin_key') || sessionStorage.getItem('mh_admin_key');
    // If the persistent slot has a value, honour the user's prior choice.
    if (localStorage.getItem('mh_admin_key')) setRememberMe(true);
    if (saved) {
      setPassword(saved);
      // Trigger fetch with saved password
      setTimeout(() => {
        setAutoLogging(false);
      }, 100);
    } else {
      setAutoLogging(false);
    }
  }, []);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Default to 'bookings' so the app always opens to the Pending booking
  // requests view — that's what Mo wants to see first whenever the PWA
  // launches (most actionable surface). The deep-link block below honours
  // ?tab= overrides for explicit links.
  const [activeModule, setActiveModule] = useState<Module>('bookings');
  const [error, setError] = useState('');

  // Deep-link: ?tab=bookings (from admin email links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as Module | null;
    if (tab && NAV_ITEMS.some(n => n.key === tab)) setActiveModule(tab);
  }, []);

  // Register the admin PWA Service Worker once on mount. Scoped to /admin so
  // marketing pages aren't intercepted. Also listens for push-driven nav
  // (notification tap → switch active module without a full reload).
  useEffect(() => {
    registerServiceWorker();
    function onSwMessage(event: MessageEvent) {
      const data = event.data as { kind?: string; url?: string } | undefined;
      if (data?.kind === 'navigate' && data.url) {
        try {
          const u = new URL(data.url, window.location.origin);
          const tab = u.searchParams.get('tab') as Module | null;
          if (tab && NAV_ITEMS.some(n => n.key === tab)) {
            setActiveModule(tab);
            return;
          }
          window.location.href = data.url;
        } catch {
          window.location.href = data.url;
        }
      }
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', onSwMessage);
      return () => navigator.serviceWorker.removeEventListener('message', onSwMessage);
    }
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fabOpen, setFabOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState(0);

  // Fetch pending booking count for notification badges
  const fetchNotifications = useCallback(async () => {
    if (!authenticated) return;
    try {
      const res = await fetch('/api/admin/booking/list', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        const pending = (data.bookings ?? []).filter((b: any) => b.status === 'pending_approval').length;
        setPendingBookings(pending);
      }
    } catch { /* silent */ }
  }, [authenticated, password]);

  // Poll notifications every 30s
  useEffect(() => {
    if (!authenticated) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [authenticated, fetchNotifications]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, leadsRes, quizRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${password}` } }),
        fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${password}` } }),
        fetch('/api/quiz-share?limit=50', { headers: { Authorization: `Bearer ${password}` } }).catch(() => null),
      ]);

      if (!statsRes.ok || !leadsRes.ok) {
        setError('Invalid password or connection error');
        setAuthenticated(false);
        // Clear both slots — bad creds shouldn't survive in either.
        localStorage.removeItem('mh_admin_key');
        sessionStorage.removeItem('mh_admin_key');
        return;
      }

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const quizData = quizRes?.ok ? await quizRes.json() : { results: [] };
      setStats(statsData);
      setLeads(leadsData.leads || []);
      setQuizResults(quizData.results || []);
      setAuthenticated(true);
      // Persistence policy:
      //   - "Trust this device" ON → localStorage (survives browser restart)
      //   - "Trust this device" OFF → sessionStorage (clears on tab close)
      // Always clear the other slot so we never have stale creds in two places.
      if (rememberMe) {
        localStorage.setItem('mh_admin_key', password);
        sessionStorage.removeItem('mh_admin_key');
      } else {
        sessionStorage.setItem('mh_admin_key', password);
        localStorage.removeItem('mh_admin_key');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  }, [password]);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    fetchData();
  };

  // Auto-login when password is loaded from storage
  useEffect(() => {
    if (!autoLogging && password && !authenticated) {
      const saved = localStorage.getItem('mh_admin_key') || sessionStorage.getItem('mh_admin_key');
      if (saved && saved === password) {
        fetchData().then(() => {
          // If auth failed, clear saved key
        });
      }
    }
  }, [autoLogging]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh every 60s
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [authenticated, fetchData]);

  // Close sidebar on module change (mobile)
  const handleModuleChange = (mod: Module) => {
    setActiveModule(mod);
    setSidebarOpen(false);
  };

  // ─── LOGIN SCREEN ───
  if (!authenticated) {
    // Show loading while auto-login is in progress
    if (autoLogging || (password && loading && (localStorage.getItem('mh_admin_key') || sessionStorage.getItem('mh_admin_key')))) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-6 h-6 text-[#C8A97D] animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#8E8E9F]">Signing in...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-8 text-center shadow-sm">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image src="/images/logo-256.png" alt="Mama Hala" width={64} height={64} className="rounded-2xl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-[#F3EFE8] flex items-center justify-center shadow-sm">
                <Settings className="w-3.5 h-3.5 text-[#7A3B5E]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              MCMS
            </h1>
            <p className="text-sm text-[#8E8E9F] mb-6">MamaHala Content Management System</p>

            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20"
                autoFocus
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E9F]">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

            <label className="flex items-center gap-2 mb-1.5 cursor-pointer justify-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E8E0D8] text-[#7A3B5E] focus:ring-[#7A3B5E]/20"
              />
              <span className="text-xs text-[#8E8E9F]">Trust this device — stay signed in</span>
            </label>
            <p className="text-[10px] text-[#C0B8B0] text-center mb-4 leading-relaxed">
              {rememberMe
                ? 'Password saved in this browser until you sign out. Only check on private devices.'
                : 'Password clears when you close this tab.'}
            </p>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-60">
              {loading ? 'Connecting...' : 'Open MCMS'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ─── MAIN LAYOUT ───
  const currentNav = NAV_ITEMS.find(n => n.key === activeModule);
  const groups = [...new Set(NAV_ITEMS.map(n => n.group))];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* ─── SIDEBAR (Desktop) ─── */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-white border-r border-[#F3EFE8] flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-5 border-b border-[#F3EFE8]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/logo-256.png" alt="Mama Hala" width={36} height={36} className="rounded-xl" />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border border-[#F3EFE8] flex items-center justify-center shadow-sm">
                <Settings className="w-2.5 h-2.5 text-[#7A3B5E]" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#2D2A33]">Mama Hala</p>
              <p className="text-[10px] text-[#8E8E9F]">MCMS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {/* Primary actions — no group label, prominent */}
          <div className="space-y-0.5 pb-3 mb-3 border-b border-[#F3EFE8]">
            {NAV_ITEMS.filter(n => n.group === 'primary').map(item => (
              <button
                key={item.key}
                onClick={() => handleModuleChange(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  activeModule === item.key
                    ? 'bg-[#7A3B5E]/8 text-[#7A3B5E] font-semibold'
                    : 'text-[#2D2A33] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className={`relative ${activeModule === item.key ? 'text-[#7A3B5E]' : 'text-[#6B6580]'}`}>
                  {item.icon}
                  {item.key === 'bookings' && pendingBookings > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#C45B5B] text-[8px] font-bold text-white flex items-center justify-center">
                      {pendingBookings > 9 ? '9+' : pendingBookings}
                    </span>
                  )}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.key === 'bookings' && pendingBookings > 0 && (
                  <span className="text-[10px] font-bold text-[#C45B5B] bg-[#C45B5B]/10 px-1.5 py-0.5 rounded-full">{pendingBookings}</span>
                )}
              </button>
            ))}
          </div>

          {/* Secondary groups */}
          {['Manage', 'System'].map(group => {
            const items = NAV_ITEMS.filter(n => n.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="space-y-0.5">
                <p className="text-[10px] font-semibold text-[#B0B0C0] uppercase tracking-[0.15em] px-3 mb-1 mt-2">{group}</p>
                {items.map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleModuleChange(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeModule === item.key
                        ? 'bg-[#7A3B5E]/8 text-[#7A3B5E] font-semibold'
                        : 'text-[#4A4A5C] hover:bg-[#FAF7F2] hover:text-[#2D2A33]'
                    }`}
                  >
                    <span className={activeModule === item.key ? 'text-[#7A3B5E]' : 'text-[#8E8E9F]'}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#F3EFE8] space-y-2">
          <a href="/" className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] flex items-center gap-1.5 transition-colors">
            <ChevronRight className="w-3 h-3" />
            Back to website
          </a>
          <button
            onClick={() => {
              localStorage.removeItem('mh_admin_key');
              sessionStorage.removeItem('mh_admin_key');
              setAuthenticated(false);
              setPassword('');
            }}
            className="text-xs text-[#C0B8B0] hover:text-[#C45B5B] flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3 h-3" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ─── MOBILE SIDEBAR OVERLAY (animated) ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#2D2A33]/40 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 w-[260px] bg-white shadow-xl overflow-y-auto animate-[slideInLeft_0.25s_ease-out]"
            style={{ animationFillMode: 'both', paddingTop: 'env(safe-area-inset-top)' }}
          >
            <div className="p-4 border-b border-[#F3EFE8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/images/logo-256.png" alt="Mama Hala" width={32} height={32} className="rounded-lg" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white border border-[#F3EFE8] flex items-center justify-center shadow-sm">
                    <Settings className="w-2 h-2 text-[#7A3B5E]" />
                  </div>
                </div>
                <span className="text-sm font-bold text-[#2D2A33]">Mama Hala</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-[#8E8E9F]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {/* Primary */}
              <div className="space-y-0.5 pb-3 mb-3 border-b border-[#F3EFE8]">
                {NAV_ITEMS.filter(n => n.group === 'primary').map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleModuleChange(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                      activeModule === item.key
                        ? 'bg-[#7A3B5E]/8 text-[#7A3B5E] font-semibold'
                        : 'text-[#2D2A33] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className={activeModule === item.key ? 'text-[#7A3B5E]' : 'text-[#6B6580]'}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
              {/* Secondary */}
              {['Manage', 'System'].map(group => {
                const items = NAV_ITEMS.filter(n => n.group === group);
                if (items.length === 0) return null;
                return (
                <div key={group}>
                  <p className="text-[10px] font-semibold text-[#B0B0C0] uppercase tracking-[0.15em] px-3 mb-1 mt-2">{group}</p>
                  {items.map(item => (
                    <button
                      key={item.key}
                      onClick={() => handleModuleChange(item.key)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        activeModule === item.key
                          ? 'bg-[#7A3B5E]/8 text-[#7A3B5E] font-semibold'
                          : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className={activeModule === item.key ? 'text-[#7A3B5E]' : 'text-[#8E8E9F]'}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 min-w-0">
        {/* Top bar — pads for iPhone status bar (PWA standalone uses
            viewportFit:cover + black-translucent, which overlays the bar
            on top of content). env(safe-area-inset-top) is 0 in browsers,
            ~47px on iPhone PWA. */}
        <header
          className="bg-white border-b border-[#F3EFE8] sticky top-0 z-20"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#4A4A5C]">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
                  {currentNav?.label}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Dr. Hala's effective location pill — reflects travel
                  schedule + manual override from /api/admin/provider-location */}
              <LocationPill
                password={password}
                onOpenTravelSchedule={() => setActiveModule('bookings')}
              />
              {/* Quick stats badges */}
              {stats && (
                <div className="hidden sm:flex items-center gap-2 mr-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-[#7A3B5E]/8 text-[#7A3B5E] font-medium">
                    {stats.totalLeads} leads
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#3B8A6E]/8 text-[#3B8A6E] font-medium">
                    {stats.totals?.newsletter_signup || 0} subscribers
                  </span>
                </div>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors"
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Module Content */}
        <main className="p-4 sm:p-6">
          {activeModule === 'dashboard' && <DashboardModule stats={stats} leads={leads} />}
          {activeModule === 'events' && <EventsModule password={password} />}
          {activeModule === 'clients' && <ClientsModule password={password} />}
          {activeModule === 'leads' && <LeadsModule leads={leads} password={password} searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
          {activeModule === 'blog' && <BlogModule password={password} />}
          {activeModule === 'services' && <ServicesModule password={password} />}
          {activeModule === 'testimonials' && <TestimonialsModule password={password} />}
          {activeModule === 'faqs' && <FAQsModule password={password} />}
          {activeModule === 'resources' && <ResourcesModule password={password} />}
          {activeModule === 'bookings' && <BookingsModule password={password} />}
          {activeModule === 'invoices' && <InvoicesModule password={password} />}
          {activeModule === 'quiz-results' && <QuizResultsModule quizResults={quizResults} />}
          {activeModule === 'settings' && <SettingsModule password={password} />}
        </main>

        {/* Reserve space for the floating bottom nav so content doesn't
            disappear behind it. ~72px = pill height (~56) + outer margin
            (~6) + breathing room. safe-area-pb adds env(safe-area-inset-bottom). */}
        <div className="h-[72px] lg:hidden safe-area-pb" />
      </div>

      {/* ─── MOBILE BOTTOM NAV — Apple-style glass, floating pill, pinned ─── */}
      {/* Outer wrapper is fixed + pointer-events-none so the safe area below
          the pill stays interactive (e.g., system gestures). Inner pill is
          pointer-events-auto and gets the blur + shadow + border treatment. */}
      <nav
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden pointer-events-none safe-area-pb"
        aria-label="Primary"
      >
        {/* px-3 + pb-2 lifts the pill clearly off the screen edges so the
            glass effect reads as a floating dock rather than a flat bar.
            rounded-full + lower opacity background makes it feel lighter. */}
        <div className="px-3 pb-2 pt-1 pointer-events-auto">
          <ul
            className="flex items-stretch rounded-full overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              border: '0.5px solid rgba(122, 59, 94, 0.12)',
              boxShadow:
                '0 10px 32px rgba(45, 42, 51, 0.16), 0 2px 6px rgba(45, 42, 51, 0.06), inset 0 0.5px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            {MOBILE_TABS.map((item) => {
              const Icon = item.icon;
              const isMore = item.key === 'settings';
              const isActive = isMore
                ? !['dashboard', 'bookings', 'invoices', 'clients'].includes(activeModule)
                : activeModule === item.key;
              const showBadge = item.key === 'bookings' && pendingBookings > 0;
              return (
                <li key={item.key} className="flex-1">
                  <button
                    onClick={() => {
                      if (isMore) { setSidebarOpen(true); return; }
                      handleModuleChange(item.key);
                    }}
                    className="w-full h-full flex flex-col items-center justify-center py-1.5 px-0.5 active:scale-90 transition-transform relative"
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                  >
                    <span
                      className="relative inline-flex"
                      style={{ color: isActive ? '#7A3B5E' : '#9A8E84' }}
                    >
                      <Icon
                        className="w-[20px] h-[20px]"
                        strokeWidth={isActive ? 2.6 : 1.9}
                      />
                      {showBadge && (
                        <span
                          className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                          style={{
                            background: '#C45B5B',
                            boxShadow: '0 2px 4px rgba(196, 91, 91, 0.35), 0 0 0 2px rgba(255,255,255,0.9)',
                          }}
                        >
                          {pendingBookings > 9 ? '9+' : pendingBookings}
                        </span>
                      )}
                    </span>
                    <span
                      className="text-[10px] mt-0.5 font-semibold tracking-tight leading-none"
                      style={{ color: isActive ? '#7A3B5E' : '#9A8E84' }}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 w-1 h-1 rounded-full"
                        style={{ background: '#7A3B5E' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

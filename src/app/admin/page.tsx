'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Download, Users, Mail, Calendar, TrendingUp, TrendingDown,
  FileText, RefreshCw, Lock, Eye, EyeOff,
  BarChart3, Activity, Sparkles, Search, Globe, Flame,
  ThermometerSun, Snowflake, ArrowUpRight, ArrowDownRight,
  Zap, Target, BookOpen, MessageSquare, ExternalLink, ClipboardCheck,
} from 'lucide-react';

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

const TOOLKIT_NAMES: Record<string, string> = {
  'family-communication-toolkit': 'Family Communication Toolkit',
  'anger-management-worksheet': 'Anger Management Worksheet',
  'calm-parent-checklist': 'Calm Parent Checklist',
  'understanding-your-teen': "Understanding Your Teen",
  'self-care-assessment': 'Self-Care Assessment',
  'complete-parenting-guide': 'The Intentional Parent',
  'couples-communication-workbook': 'Couples Communication Workbook',
  'anxiety-recovery-journal': 'Anxiety Recovery Journal',
};

const EVENT_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  toolkit_download: { label: 'Toolkit Download', color: '#7A3B5E', icon: <Download className="w-4 h-4" /> },
  newsletter_signup: { label: 'Newsletter Signup', color: '#C8A97D', icon: <Mail className="w-4 h-4" /> },
  booking_visit: { label: 'Booking Page Visit', color: '#5A8B6E', icon: <Calendar className="w-4 h-4" /> },
  contact_form: { label: 'Contact Form', color: '#D4836A', icon: <MessageSquare className="w-4 h-4" /> },
  page_view: { label: 'Page View', color: '#6B7280', icon: <Eye className="w-4 h-4" /> },
  service_detail_view: { label: 'Service View', color: '#8B5CF6', icon: <BookOpen className="w-4 h-4" /> },
};

type Tab = 'overview' | 'leads' | 'toolkits' | 'insights' | 'quiz-results';

function getLeadTemperature(lead: Lead): { label: string; color: string; icon: React.ReactNode } {
  const daysSinceLastSeen = (Date.now() - new Date(lead.lastSeen).getTime()) / (1000 * 60 * 60 * 24);
  const eventCount = lead.events.length;
  const hasBooking = lead.events.some(e => e.type === 'booking_visit');
  const hasContact = lead.events.some(e => e.type === 'contact_form');

  if (hasBooking || hasContact || (eventCount >= 3 && daysSinceLastSeen < 3)) {
    return { label: 'Hot', color: '#EF4444', icon: <Flame className="w-3.5 h-3.5" /> };
  }
  if (eventCount >= 2 || daysSinceLastSeen < 7) {
    return { label: 'Warm', color: '#F59E0B', icon: <ThermometerSun className="w-3.5 h-3.5" /> };
  }
  return { label: 'Cold', color: '#6B7280', icon: <Snowflake className="w-3.5 h-3.5" /> };
}

function StatCard({ label, value, prevValue, icon, color, subtitle }: {
  label: string; value: number; prevValue?: number; icon: React.ReactNode; color: string; subtitle?: string;
}) {
  const change = prevValue !== undefined && prevValue > 0
    ? Math.round(((value - prevValue) / prevValue) * 100)
    : undefined;

  return (
    <div className="bg-white rounded-xl border border-[#F3EFE8] p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-[#2D2A33]">{value.toLocaleString()}</p>
      <p className="text-xs text-[#8E8E9F] mt-1">{label}</p>
      {subtitle && <p className="text-[10px] text-[#B0B0C0] mt-0.5">{subtitle}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilter, setLeadFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

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
        return;
      }

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const quizData = quizRes?.ok ? await quizRes.json() : { results: [] };
      setStats(statsData);
      setLeads(leadsData.leads || []);
      setQuizResults(quizData.results || []);
      setAuthenticated(true);
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  }, [password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const exportCSV = async () => {
    const res = await fetch('/api/admin/leads?format=csv', {
      headers: { Authorization: `Bearer ${password}` },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mama-hala-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [authenticated, fetchData]);

  // Computed metrics
  const metrics = useMemo(() => {
    if (!stats) return null;

    const totals = stats.totals || {};
    const daily = stats.daily || [];
    const totalEvents = Object.values(totals).reduce((a, b) => a + (b || 0), 0);

    // This week vs last week
    const thisWeek = daily.slice(-7);
    const lastWeek = daily.slice(-14, -7);
    const thisWeekTotal = thisWeek.reduce((sum, d) => sum + Object.values(d.stats).reduce((a, b) => a + b, 0), 0);
    const lastWeekTotal = lastWeek.reduce((sum, d) => sum + Object.values(d.stats).reduce((a, b) => a + b, 0), 0);

    // This week downloads vs last week
    const thisWeekDownloads = thisWeek.reduce((sum, d) => sum + (d.stats.toolkit_download || 0), 0);
    const lastWeekDownloads = lastWeek.reduce((sum, d) => sum + (d.stats.toolkit_download || 0), 0);

    // This week subscribers vs last week
    const thisWeekSubs = thisWeek.reduce((sum, d) => sum + (d.stats.newsletter_signup || 0), 0);
    const lastWeekSubs = lastWeek.reduce((sum, d) => sum + (d.stats.newsletter_signup || 0), 0);

    // This week bookings vs last week
    const thisWeekBookings = thisWeek.reduce((sum, d) => sum + (d.stats.booking_visit || 0), 0);
    const lastWeekBookings = lastWeek.reduce((sum, d) => sum + (d.stats.booking_visit || 0), 0);

    // Language split
    const arEvents = (stats.recentEvents || []).filter(e => e.locale === 'ar').length;
    const enEvents = (stats.recentEvents || []).filter(e => e.locale === 'en').length;
    const totalLangEvents = arEvents + enEvents;

    // Top toolkit
    const toolkitEntries = Object.entries(stats.toolkits || {}).sort(([, a], [, b]) => (b as number) - (a as number));
    const topToolkit = toolkitEntries[0];

    // Conversion funnel
    const bookingVisits = totals.booking_visit || 0;
    const downloads = totals.toolkit_download || 0;
    const subscribers = totals.newsletter_signup || 0;
    const contacts = totals.contact_form || 0;

    // Peak day
    const peakDay = [...daily].sort((a, b) => {
      const aTotal = Object.values(a.stats).reduce((s, v) => s + v, 0);
      const bTotal = Object.values(b.stats).reduce((s, v) => s + v, 0);
      return bTotal - aTotal;
    })[0];

    // Lead temperatures
    const hotLeads = leads.filter(l => getLeadTemperature(l).label === 'Hot').length;
    const warmLeads = leads.filter(l => getLeadTemperature(l).label === 'Warm').length;
    const coldLeads = leads.filter(l => getLeadTemperature(l).label === 'Cold').length;

    // Source breakdown
    const sources: Record<string, number> = {};
    (stats.recentEvents || []).forEach(e => {
      const src = e.source || 'direct';
      sources[src] = (sources[src] || 0) + 1;
    });

    return {
      totalEvents,
      thisWeekTotal,
      lastWeekTotal,
      thisWeekDownloads,
      lastWeekDownloads,
      thisWeekSubs,
      lastWeekSubs,
      thisWeekBookings,
      lastWeekBookings,
      arPercent: totalLangEvents > 0 ? Math.round((arEvents / totalLangEvents) * 100) : 0,
      enPercent: totalLangEvents > 0 ? Math.round((enEvents / totalLangEvents) * 100) : 0,
      topToolkit: topToolkit ? { name: TOOLKIT_NAMES[topToolkit[0]] || topToolkit[0], count: topToolkit[1] as number } : null,
      bookingVisits,
      downloads,
      subscribers,
      contacts,
      peakDay,
      hotLeads,
      warmLeads,
      coldLeads,
      sources,
      toolkitEntries,
    };
  }, [stats, leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    let result = leads;
    if (searchQuery) {
      result = result.filter(l => l.email.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (leadFilter !== 'all') {
      result = result.filter(l => getLeadTemperature(l).label.toLowerCase() === leadFilter);
    }
    return result;
  }, [leads, searchQuery, leadFilter]);

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#7A3B5E]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
              Mama Hala Analytics
            </h1>
            <p className="text-sm text-[#8E8E9F] mt-1">Business Intelligence Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-[#F3EFE8] p-6 shadow-sm">
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E9F]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-[#7A3B5E] text-white rounded-xl font-semibold text-sm hover:bg-[#5E2D48] transition-colors disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totals = stats?.totals || {};

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#F3EFE8] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7A3B5E] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2D2A33]">Mama Hala Analytics</h1>
              <p className="text-[10px] text-[#8E8E9F]">Live Dashboard · Auto-refreshes every 60s</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#4A4A5C] bg-[#FAF7F2] rounded-lg hover:bg-[#F3EFE8] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#7A3B5E] rounded-lg hover:bg-[#5E2D48] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            label="Total Leads"
            value={stats?.totalLeads || 0}
            icon={<Users className="w-5 h-5" />}
            color="#7A3B5E"
            subtitle={metrics ? `${metrics.hotLeads} hot · ${metrics.warmLeads} warm` : undefined}
          />
          <StatCard
            label="Downloads"
            value={totals.toolkit_download || 0}
            prevValue={metrics?.lastWeekDownloads}
            icon={<Download className="w-5 h-5" />}
            color="#C4878A"
            subtitle="vs last week"
          />
          <StatCard
            label="Subscribers"
            value={totals.newsletter_signup || 0}
            prevValue={metrics?.lastWeekSubs}
            icon={<Mail className="w-5 h-5" />}
            color="#C8A97D"
            subtitle="vs last week"
          />
          <StatCard
            label="Booking Visits"
            value={totals.booking_visit || 0}
            prevValue={metrics?.lastWeekBookings}
            icon={<Calendar className="w-5 h-5" />}
            color="#5A8B6E"
            subtitle="vs last week"
          />
          <StatCard
            label="Contact Forms"
            value={totals.contact_form || 0}
            icon={<MessageSquare className="w-5 h-5" />}
            color="#D4836A"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-[#F3EFE8] p-1 mb-8 w-fit">
          {([
            { key: 'overview', label: 'Overview', icon: <Activity className="w-3.5 h-3.5" /> },
            { key: 'leads', label: 'Leads', icon: <Users className="w-3.5 h-3.5" /> },
            { key: 'toolkits', label: 'Toolkits', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { key: 'insights', label: 'Insights', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { key: 'quiz-results', label: 'Quiz Results', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
          ] as { key: Tab; label: string; icon: React.ReactNode }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-[#7A3B5E] text-white'
                  : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* 30-Day Activity Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#F3EFE8] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#2D2A33]">30-Day Activity</h3>
                  <div className="flex items-center gap-3 text-[10px]">
                    {Object.entries(EVENT_META).slice(0, 4).map(([key, meta]) => (
                      <div key={key} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                        <span className="text-[#8E8E9F]">{meta.label.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-[3px] h-44">
                  {(stats?.daily || []).map((day, i) => {
                    const downloads = day.stats.toolkit_download || 0;
                    const subs = day.stats.newsletter_signup || 0;
                    const bookings = day.stats.booking_visit || 0;
                    const contacts = day.stats.contact_form || 0;
                    const total = downloads + subs + bookings + contacts;
                    const maxTotal = Math.max(...(stats?.daily || []).map(d =>
                      (d.stats.toolkit_download || 0) + (d.stats.newsletter_signup || 0) + (d.stats.booking_visit || 0) + (d.stats.contact_form || 0)
                    ), 1);
                    const height = total > 0 ? Math.max((total / maxTotal) * 100, 8) : 2;

                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col justify-end cursor-pointer group relative"
                        title={`${day.date}\n${total} events`}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2D2A33] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {day.date.slice(5)}: {total}
                        </div>
                        <div
                          className="w-full rounded-t transition-all group-hover:opacity-80"
                          style={{
                            height: `${height}%`,
                            background: total > 0
                              ? `linear-gradient(to top, #7A3B5E ${downloads ? (downloads/total)*100 : 0}%, #C8A97D ${(downloads/total)*100}% ${((downloads+subs)/total)*100}%, #5A8B6E ${((downloads+subs)/total)*100}% ${((downloads+subs+bookings)/total)*100}%, #D4836A ${((downloads+subs+bookings)/total)*100}%)`
                              : '#F3EFE8',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-[#8E8E9F]">30 days ago</span>
                  <span className="text-[10px] text-[#8E8E9F]">Today</span>
                </div>
              </div>

              {/* Conversion Funnel */}
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
                <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">
                  <Target className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
                  Conversion Funnel
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Booking Page Visits', value: metrics?.bookingVisits || 0, color: '#5A8B6E', width: 100 },
                    { label: 'Toolkit Downloads', value: metrics?.downloads || 0, color: '#7A3B5E', width: metrics?.bookingVisits ? Math.max(((metrics.downloads || 0) / metrics.bookingVisits) * 100, 15) : 80 },
                    { label: 'Newsletter Signups', value: metrics?.subscribers || 0, color: '#C8A97D', width: metrics?.bookingVisits ? Math.max(((metrics.subscribers || 0) / metrics.bookingVisits) * 100, 10) : 60 },
                    { label: 'Contact Forms', value: metrics?.contacts || 0, color: '#D4836A', width: metrics?.bookingVisits ? Math.max(((metrics.contacts || 0) / metrics.bookingVisits) * 100, 5) : 40 },
                  ].map((step) => (
                    <div key={step.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#4A4A5C]">{step.label}</span>
                        <span className="text-xs font-bold" style={{ color: step.color }}>{step.value}</span>
                      </div>
                      <div className="h-3 bg-[#F3EFE8] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${step.width}%`, backgroundColor: step.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                {metrics?.bookingVisits && metrics.contacts ? (
                  <div className="mt-4 p-3 bg-[#FAF7F2] rounded-lg">
                    <p className="text-[10px] text-[#8E8E9F]">Visitor → Contact Rate</p>
                    <p className="text-lg font-bold text-[#7A3B5E]">
                      {Math.round((metrics.contacts / metrics.bookingVisits) * 100)}%
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Second Row: Quick Stats + Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Stats Cards */}
              <div className="space-y-4">
                {/* Language Split */}
                <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                  <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
                    <Globe className="w-3.5 h-3.5 inline-block mr-1" />
                    Language Split
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-3 bg-[#F3EFE8] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#7A3B5E] rounded-l-full transition-all" style={{ width: `${metrics?.enPercent || 50}%` }} />
                      <div className="h-full bg-[#C8A97D] rounded-r-full transition-all" style={{ width: `${metrics?.arPercent || 50}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7A3B5E] font-medium">English {metrics?.enPercent || 0}%</span>
                    <span className="text-[#C8A97D] font-medium">Arabic {metrics?.arPercent || 0}%</span>
                  </div>
                </div>

                {/* Top Toolkit */}
                {metrics?.topToolkit && (
                  <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                    <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
                      <Zap className="w-3.5 h-3.5 inline-block mr-1" />
                      Top Performing Toolkit
                    </h4>
                    <p className="text-sm font-bold text-[#2D2A33]">{metrics.topToolkit.name}</p>
                    <p className="text-xs text-[#8E8E9F] mt-1">{metrics.topToolkit.count} downloads</p>
                  </div>
                )}

                {/* Lead Temperature Summary */}
                <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                  <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
                    <Flame className="w-3.5 h-3.5 inline-block mr-1" />
                    Lead Temperature
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Hot', count: metrics?.hotLeads || 0, color: '#EF4444' },
                      { label: 'Warm', count: metrics?.warmLeads || 0, color: '#F59E0B' },
                      { label: 'Cold', count: metrics?.coldLeads || 0, color: '#6B7280' },
                    ].map(t => (
                      <div key={t.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                          <span className="text-xs text-[#4A4A5C]">{t.label}</span>
                        </div>
                        <span className="text-xs font-bold text-[#2D2A33]">{t.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Events */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#F3EFE8] p-6">
                <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">Recent Activity</h3>
                <div className="space-y-2 max-h-[380px] overflow-y-auto">
                  {(stats?.recentEvents || []).length === 0 ? (
                    <p className="text-sm text-[#8E8E9F] text-center py-12">No events yet. Data appears as users interact with the site.</p>
                  ) : (
                    stats?.recentEvents.slice(0, 30).map((event, i) => {
                      const meta = EVENT_META[event.type] || { label: event.type, color: '#8E8E9F', icon: <Sparkles className="w-4 h-4" /> };
                      const timeAgo = getTimeAgo(event.timestamp);
                      return (
                        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#F3EFE8] last:border-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${meta.color}12` }}>
                            <div style={{ color: meta.color }}>{meta.icon}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#2D2A33] truncate">
                              {meta.label}
                              {event.toolkitId && <span className="text-[#8E8E9F] font-normal"> — {TOOLKIT_NAMES[event.toolkitId] || event.toolkitId}</span>}
                            </p>
                            <p className="text-xs text-[#8E8E9F] truncate">{event.email || 'Anonymous'} {event.locale ? `· ${event.locale.toUpperCase()}` : ''}</p>
                          </div>
                          <span className="text-[10px] text-[#B0B0C0] flex-shrink-0">{timeAgo}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== LEADS TAB ==================== */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F3EFE8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                />
              </div>
              <div className="flex gap-1 bg-white rounded-lg border border-[#F3EFE8] p-1">
                {(['all', 'hot', 'warm', 'cold'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setLeadFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      leadFilter === f ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {f === 'all' ? `All (${leads.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${
                      f === 'hot' ? metrics?.hotLeads : f === 'warm' ? metrics?.warmLeads : metrics?.coldLeads
                    })`}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#FAF7F2]">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">First Seen</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Activity</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Toolkits</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-[#8E8E9F]">
                          {searchQuery || leadFilter !== 'all' ? 'No leads match your filters.' : 'No leads yet.'}
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const temp = getLeadTemperature(lead);
                        return (
                          <tr key={lead.email} className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5" style={{ color: temp.color }}>
                                {temp.icon}
                                <span className="text-xs font-semibold">{temp.label}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-[#2D2A33]">{lead.email}</td>
                            <td className="px-6 py-4 text-[#8E8E9F] text-xs">
                              {new Date(lead.firstSeen).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1 flex-wrap">
                                {lead.events.map((e, i) => {
                                  const meta = EVENT_META[e.type];
                                  return (
                                    <div
                                      key={i}
                                      className="w-6 h-6 rounded flex items-center justify-center"
                                      style={{ backgroundColor: `${meta?.color || '#8E8E9F'}15` }}
                                      title={`${meta?.label || e.type} — ${new Date(e.timestamp).toLocaleString()}`}
                                    >
                                      <div style={{ color: meta?.color || '#8E8E9F' }} className="scale-75">{meta?.icon}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-[#8E8E9F] text-xs max-w-[200px] truncate">
                              {lead.events
                                .filter(e => e.type === 'toolkit_download' && e.toolkitId)
                                .map(e => TOOLKIT_NAMES[e.toolkitId!]?.split(' ').slice(0, 2).join(' ') || e.toolkitId)
                                .join(', ') || '—'}
                            </td>
                            <td className="px-6 py-4 text-[#8E8E9F] text-xs uppercase">{lead.locale || '—'}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TOOLKITS TAB ==================== */}
        {activeTab === 'toolkits' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
              <h3 className="text-sm font-semibold text-[#2D2A33] mb-6">Download Rankings</h3>
              <div className="space-y-4">
                {(metrics?.toolkitEntries || []).length === 0 ? (
                  <p className="text-sm text-[#8E8E9F] text-center py-8">No downloads yet.</p>
                ) : (
                  metrics?.toolkitEntries.map(([id, count], i) => {
                    const maxCount = Math.max(...(metrics?.toolkitEntries || []).map(([, c]) => c as number), 1);
                    const pct = ((count as number) / maxCount) * 100;
                    return (
                      <div key={id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#7A3B5E] w-5">#{i + 1}</span>
                            <span className="text-sm text-[#2D2A33] font-medium">{TOOLKIT_NAMES[id] || id}</span>
                          </div>
                          <span className="text-sm font-bold text-[#7A3B5E]">{count as number}</span>
                        </div>
                        <div className="h-2.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: i === 0 ? '#7A3B5E' : i === 1 ? '#C4878A' : '#C8A97D',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
              <h3 className="text-sm font-semibold text-[#2D2A33] mb-6">Toolkit Performance</h3>
              <div className="space-y-3">
                {Object.entries(TOOLKIT_NAMES).map(([id, name]) => {
                  const count = (stats?.toolkits?.[id] || 0) as number;
                  return (
                    <div key={id} className="flex items-center justify-between py-2 border-b border-[#F3EFE8] last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/8 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#7A3B5E]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2D2A33]">{name.length > 25 ? name.slice(0, 25) + '...' : name}</p>
                          <p className="text-[10px] text-[#8E8E9F]">{count} downloads</p>
                        </div>
                      </div>
                      <a href={`/toolkits/pdf/${id}.pdf`} target="_blank" className="text-[#7A3B5E] hover:underline">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== INSIGHTS TAB ==================== */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Strategic Insights */}
            <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
              <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">
                <Sparkles className="w-4 h-4 inline-block mr-1.5 text-[#C8A97D]" />
                Strategic Insights
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generateInsights(metrics, leads, stats).map((insight, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${insight.type === 'success' ? 'bg-emerald-50 border-emerald-100' : insight.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'}`}>
                    <p className="text-xs font-semibold mb-1" style={{ color: insight.type === 'success' ? '#059669' : insight.type === 'warning' ? '#D97706' : '#2563EB' }}>
                      {insight.title}
                    </p>
                    <p className="text-xs text-[#4A4A5C] leading-relaxed">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Growth + Source Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Trend */}
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
                <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">
                  <TrendingUp className="w-4 h-4 inline-block mr-1.5 text-[#5A8B6E]" />
                  Weekly Comparison
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Total Activity', thisWeek: metrics?.thisWeekTotal || 0, lastWeek: metrics?.lastWeekTotal || 0 },
                    { label: 'Downloads', thisWeek: metrics?.thisWeekDownloads || 0, lastWeek: metrics?.lastWeekDownloads || 0 },
                    { label: 'Subscribers', thisWeek: metrics?.thisWeekSubs || 0, lastWeek: metrics?.lastWeekSubs || 0 },
                    { label: 'Booking Visits', thisWeek: metrics?.thisWeekBookings || 0, lastWeek: metrics?.lastWeekBookings || 0 },
                  ].map((row) => {
                    const change = row.lastWeek > 0 ? Math.round(((row.thisWeek - row.lastWeek) / row.lastWeek) * 100) : row.thisWeek > 0 ? 100 : 0;
                    return (
                      <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F3EFE8] last:border-0">
                        <span className="text-sm text-[#4A4A5C]">{row.label}</span>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xs text-[#8E8E9F]">Last week </span>
                            <span className="text-sm font-medium text-[#8E8E9F]">{row.lastWeek}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-[#4A4A5C]">This week </span>
                            <span className="text-sm font-bold text-[#2D2A33]">{row.thisWeek}</span>
                          </div>
                          <div className={`flex items-center gap-0.5 text-xs font-semibold min-w-[50px] justify-end ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {change >= 0 ? '+' : ''}{change}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Source Analysis */}
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
                <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">
                  <Globe className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
                  Event Sources
                </h3>
                <div className="space-y-3">
                  {Object.entries(metrics?.sources || {}).sort(([, a], [, b]) => b - a).slice(0, 8).map(([source, count]) => {
                    const totalSourceEvents = Object.values(metrics?.sources || {}).reduce((a, b) => a + b, 0);
                    const pct = totalSourceEvents > 0 ? Math.round((count / totalSourceEvents) * 100) : 0;
                    return (
                      <div key={source} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs text-[#4A4A5C] font-medium truncate">{source}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
                            <div className="h-full bg-[#7A3B5E] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-[#8E8E9F] w-12 text-right">{count} ({pct}%)</span>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(metrics?.sources || {}).length === 0 && (
                    <p className="text-sm text-[#8E8E9F] text-center py-8">No source data yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== QUIZ RESULTS TAB ==================== */}
        {activeTab === 'quiz-results' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                <p className="text-2xl font-bold text-[#2D2A33]">{quizResults.length}</p>
                <p className="text-xs text-[#8E8E9F] mt-1">Total Shared Results</p>
              </div>
              {(() => {
                const quizCounts: Record<string, number> = {};
                quizResults.forEach((r: any) => {
                  quizCounts[r.quizSlug] = (quizCounts[r.quizSlug] || 0) + 1;
                });
                const topQuiz = Object.entries(quizCounts).sort(([,a],[,b]) => b - a)[0];
                return (
                  <>
                    <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                      <p className="text-2xl font-bold text-[#7A3B5E]">{Object.keys(quizCounts).length}</p>
                      <p className="text-xs text-[#8E8E9F] mt-1">Quiz Types Used</p>
                    </div>
                    <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                      <p className="text-sm font-bold text-[#2D2A33] truncate">{topQuiz ? (TOOLKIT_NAMES[topQuiz[0]] || topQuiz[0]) : '—'}</p>
                      <p className="text-xs text-[#8E8E9F] mt-1">Most Popular Quiz</p>
                    </div>
                    <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                      <p className="text-2xl font-bold text-[#C8A97D]">
                        {quizResults.filter((r: any) => {
                          const d = new Date(r.sharedAt);
                          const now = new Date();
                          return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
                        }).length}
                      </p>
                      <p className="text-xs text-[#8E8E9F] mt-1">This Week</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F3EFE8] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#2D2A33]">Shared Quiz Results</h3>
                <span className="text-xs text-[#8E8E9F]">{quizResults.length} results</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#FAF7F2]">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Client</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Assessment</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Result</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Score</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizResults.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-[#8E8E9F]">
                          No shared quiz results yet. Clients will appear here when they share their results with you.
                        </td>
                      </tr>
                    ) : (
                      quizResults.map((result: any, i: number) => {
                        const pct = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;
                        const tierColor = result.tierKey?.includes('thriving') || result.tierKey?.includes('strong') || result.tierKey?.includes('well-prepared') || result.tierKey?.includes('living')
                          ? '#25D366'
                          : result.tierKey?.includes('needs') || result.tierKey?.includes('developing') || result.tierKey?.includes('time-for')
                          ? '#C4878A'
                          : '#C8A97D';

                        return (
                          <tr key={i} className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-medium text-[#2D2A33]">{result.name}</p>
                              <p className="text-xs text-[#8E8E9F]">{result.email}</p>
                            </td>
                            <td className="px-6 py-4 text-[#4A4A5C] text-xs max-w-[160px] truncate">
                              {result.quizName || result.quizSlug}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: tierColor, backgroundColor: `${tierColor}15` }}>
                                {result.tierTitle || result.tierKey || '—'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: tierColor }} />
                                </div>
                                <span className="text-xs text-[#4A4A5C] font-medium">{pct}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-[#8E8E9F]">
                              {result.sharedAt ? getTimeAgo(result.sharedAt) : '—'}
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`/en/quiz/results/${result.sessionId}`}
                                target="_blank"
                                className="text-[#7A3B5E] hover:underline"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dimension Insights (if a result is expanded) */}
            {quizResults.length > 0 && quizResults[0]?.dimensions && (
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
                <h3 className="text-sm font-semibold text-[#2D2A33] mb-4">
                  Latest Result Breakdown — {quizResults[0].name}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(quizResults[0].dimensions).map(([key, val]: [string, any]) => {
                    const label = quizResults[0].dimensionLabels?.[key] || key;
                    const maxDim = quizResults[0].maxScore / Object.keys(quizResults[0].dimensions).length;
                    const dimPct = maxDim > 0 ? Math.round((val / maxDim) * 100) : 0;
                    return (
                      <div key={key} className="p-4 bg-[#FAF7F2] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-[#4A4A5C]">{label}</span>
                          <span className="text-xs font-bold text-[#7A3B5E]">{val}</span>
                        </div>
                        <div className="h-2 bg-[#E8E0D4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7A3B5E] rounded-full" style={{ width: `${dimPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Helper: time ago
function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

// Helper: generate strategic insights based on data
function generateInsights(
  metrics: ReturnType<typeof Object> | null,
  leads: Lead[],
  stats: DashboardStats | null,
): { title: string; message: string; type: 'success' | 'warning' | 'info' }[] {
  const insights: { title: string; message: string; type: 'success' | 'warning' | 'info' }[] = [];
  if (!metrics || !stats) return insights;

  const m = metrics as Record<string, unknown>;

  // Growth insight
  const thisWeek = (m.thisWeekTotal as number) || 0;
  const lastWeek = (m.lastWeekTotal as number) || 0;
  if (thisWeek > lastWeek && lastWeek > 0) {
    insights.push({
      title: 'Growth Trending Up',
      message: `Activity increased ${Math.round(((thisWeek - lastWeek) / lastWeek) * 100)}% this week. Keep the momentum going with social media promotion.`,
      type: 'success',
    });
  } else if (thisWeek < lastWeek && lastWeek > 0) {
    insights.push({
      title: 'Activity Dip Detected',
      message: `Activity dropped ${Math.round(((lastWeek - thisWeek) / lastWeek) * 100)}% from last week. Consider promoting toolkits on social media or sending a newsletter.`,
      type: 'warning',
    });
  }

  // Hot leads insight
  const hotLeads = (m.hotLeads as number) || 0;
  if (hotLeads > 0) {
    insights.push({
      title: `${hotLeads} Hot Lead${hotLeads > 1 ? 's' : ''} Ready`,
      message: `These leads have shown strong engagement (multiple interactions or booking interest). Follow up personally within 24 hours.`,
      type: 'success',
    });
  }

  // Language insight
  const arPercent = (m.arPercent as number) || 0;
  if (arPercent > 30) {
    insights.push({
      title: 'Strong Arabic Audience',
      message: `${arPercent}% of recent visitors use Arabic. Consider creating Arabic-specific social media content and toolkit versions.`,
      type: 'info',
    });
  }

  // Top toolkit insight
  const topToolkit = m.topToolkit as { name: string; count: number } | null;
  if (topToolkit && topToolkit.count > 2) {
    insights.push({
      title: `"${topToolkit.name}" is Popular`,
      message: `This toolkit has ${topToolkit.count} downloads. Create a blog post or social media series around this topic to drive more leads.`,
      type: 'info',
    });
  }

  // Conversion insight
  const bookingVisits = (m.bookingVisits as number) || 0;
  const contacts = (m.contacts as number) || 0;
  if (bookingVisits > 5 && contacts === 0) {
    insights.push({
      title: 'Booking Page Drop-Off',
      message: `${bookingVisits} people visited the booking page but none submitted a contact form. Review the booking flow for friction points.`,
      type: 'warning',
    });
  }

  // No toolkit downloads
  const downloads = (m.downloads as number) || 0;
  if (downloads === 0 && (stats?.totalLeads || 0) === 0) {
    insights.push({
      title: 'Start Promoting Toolkits',
      message: `No toolkit downloads yet. Share the Free Toolkit page on social media, Instagram stories, and WhatsApp groups to start collecting leads.`,
      type: 'info',
    });
  }

  // Subscriber insight
  const subs = (m.subscribers as number) || 0;
  if (subs > 0 && downloads > subs * 3) {
    insights.push({
      title: 'Newsletter Conversion Opportunity',
      message: `You have ${downloads} downloads but only ${subs} newsletter signups. Add a newsletter prompt after toolkit download confirmation.`,
      type: 'warning',
    });
  }

  // Default if no insights
  if (insights.length === 0) {
    insights.push({
      title: 'Getting Started',
      message: 'Share your website and toolkit links on social media to start collecting data. Insights will appear as engagement grows.',
      type: 'info',
    });
  }

  return insights;
}

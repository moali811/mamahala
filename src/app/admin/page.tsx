'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart3, Calendar, Users, FileText, Briefcase, MessageSquare,
  HelpCircle, BookOpen, ClipboardCheck, Settings, RefreshCw,
  Lock, Eye, EyeOff, Menu, X, ChevronRight, Sparkles, Star,
} from 'lucide-react';

// Module imports
import DashboardModule from '@/components/admin/DashboardModule';
import EventsModule from '@/components/admin/EventsModule';
import LeadsModule from '@/components/admin/LeadsModule';
import BlogModule from '@/components/admin/BlogModule';
import ServicesModule from '@/components/admin/ServicesModule';
import TestimonialsModule from '@/components/admin/TestimonialsModule';
import FAQsModule from '@/components/admin/FAQsModule';
import ResourcesModule from '@/components/admin/ResourcesModule';
import QuizResultsModule from '@/components/admin/QuizResultsModule';
import SettingsModule from '@/components/admin/SettingsModule';

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
  | 'leads'
  | 'blog'
  | 'services'
  | 'testimonials'
  | 'faqs'
  | 'resources'
  | 'quiz-results'
  | 'settings';

const NAV_ITEMS: { key: Module; label: string; icon: React.ReactNode; group: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4.5 h-4.5" />, group: 'Analytics' },
  { key: 'leads', label: 'Leads', icon: <Users className="w-4.5 h-4.5" />, group: 'Analytics' },
  { key: 'events', label: 'Events', icon: <Calendar className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'blog', label: 'Blog', icon: <FileText className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'services', label: 'Services', icon: <Briefcase className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'testimonials', label: 'Testimonials', icon: <Star className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'resources', label: 'Resources', icon: <BookOpen className="w-4.5 h-4.5" />, group: 'Content' },
  { key: 'quiz-results', label: 'Quizzes', icon: <ClipboardCheck className="w-4.5 h-4.5" />, group: 'Data' },
  { key: 'settings', label: 'Settings', icon: <Settings className="w-4.5 h-4.5" />, group: 'System' },
];

export default function AdminCommandCenter() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7A3B5E] to-[#C4878A] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Command Center
            </h1>
            <p className="text-sm text-[#8E8E9F] mb-6">Mama Hala Consulting</p>

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

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-60">
              {loading ? 'Connecting...' : 'Open Command Center'}
            </button>

            <p className="text-[10px] text-[#B0B0C0] mt-4">Events · Blog · Services · Analytics · Leads</p>
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A3B5E] to-[#C4878A] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2D2A33]">Mama Hala</p>
              <p className="text-[10px] text-[#8E8E9F]">Command Center</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-5">
          {groups.map(group => (
            <div key={group}>
              <p className="text-[10px] font-semibold text-[#B0B0C0] uppercase tracking-[0.15em] px-3 mb-1.5">{group}</p>
              <div className="space-y-0.5">
                {NAV_ITEMS.filter(n => n.group === group).map(item => (
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
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#F3EFE8]">
          <a href="/" className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] flex items-center gap-1.5 transition-colors">
            <ChevronRight className="w-3 h-3" />
            Back to website
          </a>
        </div>
      </aside>

      {/* ─── MOBILE SIDEBAR OVERLAY ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#2D2A33]/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-[#F3EFE8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A3B5E] to-[#C4878A] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-[#2D2A33]">Mama Hala</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-[#8E8E9F]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-4">
              {groups.map(group => (
                <div key={group}>
                  <p className="text-[10px] font-semibold text-[#B0B0C0] uppercase tracking-[0.15em] px-3 mb-1">{group}</p>
                  {NAV_ITEMS.filter(n => n.group === group).map(item => (
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
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#F3EFE8] sticky top-0 z-20">
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
          {activeModule === 'leads' && <LeadsModule leads={leads} password={password} searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
          {activeModule === 'blog' && <BlogModule password={password} />}
          {activeModule === 'services' && <ServicesModule />}
          {activeModule === 'testimonials' && <TestimonialsModule password={password} />}
          {activeModule === 'faqs' && <FAQsModule password={password} />}
          {activeModule === 'resources' && <ResourcesModule stats={stats} />}
          {activeModule === 'quiz-results' && <QuizResultsModule quizResults={quizResults} />}
          {activeModule === 'settings' && <SettingsModule />}
        </main>
      </div>
    </div>
  );
}

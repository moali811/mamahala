'use client';

import { useMemo } from 'react';
import {
  Users, Download, Mail, Calendar, MessageSquare,
  Target, Globe, Flame, ThermometerSun, Snowflake,
  ArrowUpRight, ArrowDownRight, Sparkles, Zap, Eye, BookOpen,
} from 'lucide-react';

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

function getLeadTemperature(lead: any): { label: string; color: string } {
  const daysSinceLastSeen = (Date.now() - new Date(lead.lastSeen).getTime()) / (1000 * 60 * 60 * 24);
  const eventCount = lead.events.length;
  const hasBooking = lead.events.some((e: any) => e.type === 'booking_visit');
  const hasContact = lead.events.some((e: any) => e.type === 'contact_form');
  if (hasBooking || hasContact || (eventCount >= 3 && daysSinceLastSeen < 3)) return { label: 'Hot', color: '#EF4444' };
  if (eventCount >= 2 || daysSinceLastSeen < 7) return { label: 'Warm', color: '#F59E0B' };
  return { label: 'Cold', color: '#6B7280' };
}

function StatCard({ label, value, prevValue, icon, color, subtitle }: {
  label: string; value: number; prevValue?: number; icon: React.ReactNode; color: string; subtitle?: string;
}) {
  const change = prevValue !== undefined && prevValue > 0
    ? Math.round(((value - prevValue) / prevValue) * 100) : undefined;
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

interface DashboardModuleProps {
  stats: any;
  leads: any[];
}

export default function DashboardModule({ stats, leads }: DashboardModuleProps) {
  const metrics = useMemo(() => {
    if (!stats) return null;
    const totals = stats.totals || {};
    const daily = stats.daily || [];

    const thisWeek = daily.slice(-7);
    const lastWeek = daily.slice(-14, -7);
    const thisWeekDownloads = thisWeek.reduce((sum: number, d: any) => sum + (d.stats.toolkit_download || 0), 0);
    const lastWeekDownloads = lastWeek.reduce((sum: number, d: any) => sum + (d.stats.toolkit_download || 0), 0);
    const thisWeekSubs = thisWeek.reduce((sum: number, d: any) => sum + (d.stats.newsletter_signup || 0), 0);
    const lastWeekSubs = lastWeek.reduce((sum: number, d: any) => sum + (d.stats.newsletter_signup || 0), 0);
    const thisWeekBookings = thisWeek.reduce((sum: number, d: any) => sum + (d.stats.booking_visit || 0), 0);
    const lastWeekBookings = lastWeek.reduce((sum: number, d: any) => sum + (d.stats.booking_visit || 0), 0);

    const arEvents = (stats.recentEvents || []).filter((e: any) => e.locale === 'ar').length;
    const enEvents = (stats.recentEvents || []).filter((e: any) => e.locale === 'en').length;
    const totalLangEvents = arEvents + enEvents;

    const hotLeads = leads.filter(l => getLeadTemperature(l).label === 'Hot').length;
    const warmLeads = leads.filter(l => getLeadTemperature(l).label === 'Warm').length;
    const coldLeads = leads.filter(l => getLeadTemperature(l).label === 'Cold').length;

    return {
      thisWeekDownloads, lastWeekDownloads, thisWeekSubs, lastWeekSubs,
      thisWeekBookings, lastWeekBookings,
      enPercent: totalLangEvents > 0 ? Math.round((enEvents / totalLangEvents) * 100) : 0,
      arPercent: totalLangEvents > 0 ? Math.round((arEvents / totalLangEvents) * 100) : 0,
      bookingVisits: totals.booking_visit || 0,
      downloads: totals.toolkit_download || 0,
      subscribers: totals.newsletter_signup || 0,
      contacts: totals.contact_form || 0,
      hotLeads, warmLeads, coldLeads,
    };
  }, [stats, leads]);

  const totals = stats?.totals || {};

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Leads" value={stats?.totalLeads || 0} icon={<Users className="w-5 h-5" />} color="#7A3B5E"
          subtitle={metrics ? `${metrics.hotLeads} hot · ${metrics.warmLeads} warm` : undefined} />
        <StatCard label="Downloads" value={totals.toolkit_download || 0} prevValue={metrics?.lastWeekDownloads}
          icon={<Download className="w-5 h-5" />} color="#C4878A" subtitle="vs last week" />
        <StatCard label="Subscribers" value={totals.newsletter_signup || 0} prevValue={metrics?.lastWeekSubs}
          icon={<Mail className="w-5 h-5" />} color="#C8A97D" subtitle="vs last week" />
        <StatCard label="Booking Visits" value={totals.booking_visit || 0} prevValue={metrics?.lastWeekBookings}
          icon={<Calendar className="w-5 h-5" />} color="#5A8B6E" subtitle="vs last week" />
        <StatCard label="Contact Forms" value={totals.contact_form || 0}
          icon={<MessageSquare className="w-5 h-5" />} color="#D4836A" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <Target className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
            Conversion Funnel
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Booking Page Visits', value: metrics?.bookingVisits || 0, color: '#5A8B6E', width: 100 },
              { label: 'Toolkit Downloads', value: metrics?.downloads || 0, color: '#7A3B5E',
                width: metrics?.bookingVisits ? Math.max(((metrics.downloads) / metrics.bookingVisits) * 100, 15) : 80 },
              { label: 'Newsletter Signups', value: metrics?.subscribers || 0, color: '#C8A97D',
                width: metrics?.bookingVisits ? Math.max(((metrics.subscribers) / metrics.bookingVisits) * 100, 10) : 60 },
              { label: 'Contact Forms', value: metrics?.contacts || 0, color: '#D4836A',
                width: metrics?.bookingVisits ? Math.max(((metrics.contacts) / metrics.bookingVisits) * 100, 5) : 40 },
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
              <p className="text-[10px] text-[#8E8E9F]">Visitor to Contact Rate</p>
              <p className="text-lg font-bold text-[#7A3B5E]">{Math.round((metrics.contacts / metrics.bookingVisits) * 100)}%</p>
            </div>
          ) : null}
        </div>

        {/* Language Split + Lead Temperature */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
            <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5 inline-block mr-1" /> Language Split
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-3 bg-[#F3EFE8] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#7A3B5E] rounded-l-full" style={{ width: `${metrics?.enPercent || 50}%` }} />
                <div className="h-full bg-[#C8A97D] rounded-r-full" style={{ width: `${metrics?.arPercent || 50}%` }} />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#7A3B5E] font-medium">English {metrics?.enPercent || 0}%</span>
              <span className="text-[#C8A97D] font-medium">Arabic {metrics?.arPercent || 0}%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
            <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 inline-block mr-1" /> Lead Temperature
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Hot', count: metrics?.hotLeads || 0, color: '#EF4444', Icon: Flame },
                { label: 'Warm', count: metrics?.warmLeads || 0, color: '#F59E0B', Icon: ThermometerSun },
                { label: 'Cold', count: metrics?.coldLeads || 0, color: '#6B7280', Icon: Snowflake },
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

          {/* Top Toolkit */}
          {stats?.toolkits && Object.keys(stats.toolkits).length > 0 && (() => {
            const top = Object.entries(stats.toolkits).sort(([, a]: any, [, b]: any) => b - a)[0];
            return (
              <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
                <h4 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5 inline-block mr-1" /> Top Toolkit
                </h4>
                <p className="text-sm font-bold text-[#2D2A33]">{TOOLKIT_NAMES[top[0]] || top[0]}</p>
                <p className="text-xs text-[#8E8E9F] mt-1">{top[1] as number} downloads</p>
              </div>
            );
          })()}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Recent Activity
          </h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {(stats?.recentEvents || []).length === 0 ? (
              <p className="text-sm text-[#8E8E9F] text-center py-12">No events yet.</p>
            ) : (
              stats.recentEvents.slice(0, 10).map((event: any, i: number) => {
                const meta = EVENT_META[event.type] || { label: event.type, color: '#8E8E9F', icon: <Sparkles className="w-4 h-4" /> };
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
                      <p className="text-xs text-[#8E8E9F] truncate">
                        {event.email || 'Anonymous'} {event.locale ? `· ${event.locale.toUpperCase()}` : ''}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#B0B0C0] flex-shrink-0">{getTimeAgo(event.timestamp)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

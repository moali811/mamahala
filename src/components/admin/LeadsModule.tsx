'use client';

import { useMemo, useState } from 'react';
import {
  Search, Download, Users, Flame, ThermometerSun, Snowflake,
  Mail, Calendar, MessageSquare, Eye, BookOpen, Sparkles,
} from 'lucide-react';

const TOOLKIT_NAMES: Record<string, string> = {
  'family-communication-toolkit': 'Family Communication',
  'anger-management-worksheet': 'Anger Management',
  'calm-parent-checklist': 'Calm Parent',
  'understanding-your-teen': 'Understanding Teen',
  'self-care-assessment': 'Self-Care Assessment',
  'complete-parenting-guide': 'Intentional Parent',
  'couples-communication-workbook': 'Couples Communication',
  'anxiety-recovery-journal': 'Anxiety Journal',
};

const EVENT_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  toolkit_download: { label: 'Download', color: '#7A3B5E', icon: <Download className="w-3.5 h-3.5" /> },
  newsletter_signup: { label: 'Newsletter', color: '#C8A97D', icon: <Mail className="w-3.5 h-3.5" /> },
  booking_visit: { label: 'Booking', color: '#5A8B6E', icon: <Calendar className="w-3.5 h-3.5" /> },
  contact_form: { label: 'Contact', color: '#D4836A', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  page_view: { label: 'Page View', color: '#6B7280', icon: <Eye className="w-3.5 h-3.5" /> },
  service_detail_view: { label: 'Service', color: '#8B5CF6', icon: <BookOpen className="w-3.5 h-3.5" /> },
};

function getLeadTemperature(lead: any): { label: string; color: string; icon: React.ReactNode } {
  const daysSinceLastSeen = (Date.now() - new Date(lead.lastSeen).getTime()) / (1000 * 60 * 60 * 24);
  const eventCount = lead.events.length;
  const hasBooking = lead.events.some((e: any) => e.type === 'booking_visit');
  const hasContact = lead.events.some((e: any) => e.type === 'contact_form');
  if (hasBooking || hasContact || (eventCount >= 3 && daysSinceLastSeen < 3))
    return { label: 'Hot', color: '#EF4444', icon: <Flame className="w-3.5 h-3.5" /> };
  if (eventCount >= 2 || daysSinceLastSeen < 7)
    return { label: 'Warm', color: '#F59E0B', icon: <ThermometerSun className="w-3.5 h-3.5" /> };
  return { label: 'Cold', color: '#6B7280', icon: <Snowflake className="w-3.5 h-3.5" /> };
}

interface LeadsModuleProps {
  leads: any[];
  password: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function LeadsModule({ leads, password, searchQuery, onSearchChange }: LeadsModuleProps) {
  const [leadFilter, setLeadFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

  const counts = useMemo(() => ({
    hot: leads.filter(l => getLeadTemperature(l).label === 'Hot').length,
    warm: leads.filter(l => getLeadTemperature(l).label === 'Warm').length,
    cold: leads.filter(l => getLeadTemperature(l).label === 'Cold').length,
  }), [leads]);

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (searchQuery) result = result.filter(l => l.email.toLowerCase().includes(searchQuery.toLowerCase()));
    if (leadFilter !== 'all') result = result.filter(l => getLeadTemperature(l).label.toLowerCase() === leadFilter);
    return result;
  }, [leads, searchQuery, leadFilter]);

  const exportCSV = async () => {
    const res = await fetch('/api/admin/leads?format=csv', { headers: { Authorization: `Bearer ${password}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `mama-hala-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
          <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F3EFE8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20" />
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-[#F3EFE8] p-1">
          {(['all', 'hot', 'warm', 'cold'] as const).map((f) => (
            <button key={f} onClick={() => setLeadFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${leadFilter === f ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
              {f === 'all' ? `All (${leads.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
            </button>
          ))}
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#7A3B5E] rounded-lg hover:bg-[#5E2D48] transition-colors">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Lang</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-[#8E8E9F]">
                  {searchQuery || leadFilter !== 'all' ? 'No leads match your filters.' : 'No leads yet.'}
                </td></tr>
              ) : (
                filteredLeads.map((lead) => {
                  const temp = getLeadTemperature(lead);
                  return (
                    <tr key={lead.email} className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5" style={{ color: temp.color }}>
                          {temp.icon}<span className="text-xs font-semibold">{temp.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#2D2A33]">{lead.email}</td>
                      <td className="px-6 py-4 text-[#8E8E9F] text-xs">
                        {new Date(lead.firstSeen).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {lead.events.map((e: any, i: number) => {
                            const meta = EVENT_META[e.type];
                            return (
                              <div key={i} className="w-6 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: `${meta?.color || '#8E8E9F'}15` }}
                                title={`${meta?.label || e.type} — ${new Date(e.timestamp).toLocaleString()}`}>
                                <div style={{ color: meta?.color || '#8E8E9F' }} className="scale-75">{meta?.icon}</div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#8E8E9F] text-xs max-w-[200px] truncate">
                        {lead.events.filter((e: any) => e.type === 'toolkit_download' && e.toolkitId)
                          .map((e: any) => TOOLKIT_NAMES[e.toolkitId] || e.toolkitId).join(', ') || '—'}
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
  );
}

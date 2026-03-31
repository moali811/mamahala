'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Users, Plus, Download, RefreshCw, Sparkles, Search,
  ChevronDown, ChevronUp, Clock, Trash2, ExternalLink, BarChart3,
  ClipboardList, AlertTriangle, CheckCircle, Loader2,
} from 'lucide-react';

interface EventStat {
  slug: string; titleEn: string; titleAr: string; date: string; type: string;
  registrationType: string; capacity: number | null; registeredCount: number;
  waitlistedCount: number; spotsRemaining: number | null; registrationStatus: string;
  source: 'static' | 'kv';
}

interface Registration {
  id: string; firstName: string; lastName: string; email: string;
  phone?: string; registeredAt: string; waitlisted?: boolean;
}

const typeColors: Record<string, string> = {
  workshop: '#C8A97D', webinar: '#7A3B5E', 'community-gathering': '#C4878A',
  retreat: '#3B8A6E', 'support-group': '#D4836A',
};

interface EventsModuleProps { password: string; }

export default function EventsModule({ password }: EventsModuleProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState<EventStat[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Record<string, Registration[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [newEvent, setNewEvent] = useState({
    slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
    date: '', startTime: '', endTime: '', type: 'workshop', locationType: 'online',
    locationNameEn: '', isFree: true, priceCAD: 0, capacity: 30, registrationType: 'rsvp',
  });

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/events/manage', { headers: { Authorization: `Bearer ${password}` } });
      if (!res.ok) { setError('Failed to load events'); return; }
      const data = await res.json();
      setEvents(data.events || []);
    } catch { setError('Connection error'); }
    finally { setLoading(false); }
  }, [password]);

  const fetchRegistrations = useCallback(async (slug: string) => {
    try {
      const res = await fetch(`/api/events/registrations?slug=${slug}`, { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(prev => ({ ...prev, [slug]: [...(data.registrations || []), ...(data.waitlist || []).map((w: Registration) => ({ ...w, waitlisted: true }))] }));
      }
    } catch { /* ignore */ }
  }, [password]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { const interval = setInterval(fetchData, 60000); return () => clearInterval(interval); }, [fetchData]);

  const toggleEvent = (slug: string) => {
    if (expandedEvent === slug) { setExpandedEvent(null); }
    else { setExpandedEvent(slug); if (!registrations[slug]) fetchRegistrations(slug); }
  };

  const exportCSV = (slug: string) => {
    const regs = registrations[slug] || [];
    if (!regs.length) return;
    const headers = ['Name', 'Email', 'Phone', 'Registered At', 'Status'];
    const rows = regs.map(r => [`${r.firstName} ${r.lastName}`, r.email, r.phone || '', new Date(r.registeredAt).toLocaleString(), r.waitlisted ? 'Waitlisted' : 'Registered']);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${slug}-attendees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = newEvent.slug || newEvent.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const res = await fetch('/api/events/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ ...newEvent, slug, spotsRemaining: newEvent.capacity, registrationStatus: 'open', timezone: 'America/Toronto', locationNameAr: newEvent.locationNameEn, audiences: ['community'], featured: false, registrationFields: { phone: true, notes: false } }),
      });
      if (res.ok) {
        setShowCreateForm(false);
        setNewEvent({ slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', date: '', startTime: '', endTime: '', type: 'workshop', locationType: 'online', locationNameEn: '', isFree: true, priceCAD: 0, capacity: 30, registrationType: 'rsvp' });
        fetchData();
      }
    } catch { setError('Failed to create event'); }
  };

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true); setAiSuggestion('');
    const prompt = aiPrompt.toLowerCase();
    let suggestion = '';
    if (prompt.includes('workshop') || prompt.includes('ورشة')) {
      const topics = ['parenting', 'communication', 'mindfulness', 'resilience', 'emotional growth'];
      const topic = topics.find(t => prompt.includes(t)) || 'wellness';
      suggestion = JSON.stringify({ titleEn: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Workshop: Building Stronger Foundations`, descriptionEn: `An interactive workshop designed to equip participants with practical ${topic} strategies. Led by Dr. Hala Ali, this session combines evidence-based approaches with culturally sensitive guidance.`, type: 'workshop', capacity: 25 }, null, 2);
    } else if (prompt.includes('webinar') || prompt.includes('ندوة')) {
      suggestion = JSON.stringify({ titleEn: `Free Webinar: ${aiPrompt.replace(/webinar|free|about/gi, '').trim() || 'Expert Insights for Families'}`, descriptionEn: `Join Dr. Hala Ali for an informative online session exploring practical strategies and evidence-based insights. This free webinar includes Q&A time and a downloadable resource guide.`, type: 'webinar', capacity: 100, isFree: true }, null, 2);
    } else {
      suggestion = JSON.stringify({ titleEn: `${aiPrompt.trim()}`, descriptionEn: `A thoughtfully designed event by Mama Hala Consulting, bringing together community members for shared growth and connection.`, type: 'community-gathering', capacity: 40 }, null, 2);
    }
    await new Promise(r => setTimeout(r, 800));
    setAiSuggestion(suggestion); setAiLoading(false);
    try {
      const parsed = JSON.parse(suggestion);
      setNewEvent(prev => ({ ...prev, titleEn: parsed.titleEn || prev.titleEn, descriptionEn: parsed.descriptionEn || prev.descriptionEn, type: parsed.type || prev.type, capacity: parsed.capacity || prev.capacity, isFree: parsed.isFree ?? prev.isFree }));
    } catch { /* ignore */ }
  };

  const totalRegistered = events.reduce((sum, e) => sum + e.registeredCount, 0);
  const totalWaitlisted = events.reduce((sum, e) => sum + e.waitlistedCount, 0);
  const openEvents = events.filter(e => e.registrationStatus === 'open').length;
  const filteredEvents = searchQuery
    ? events.filter(e => e.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || e.slug.includes(searchQuery.toLowerCase()))
    : events;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Registered', value: totalRegistered, icon: <BarChart3 className="w-4 h-4 text-[#7A3B5E]" />, bg: '#7A3B5E' },
          { label: 'Waitlisted', value: totalWaitlisted, icon: <Clock className="w-4 h-4 text-[#C8A97D]" />, bg: '#C8A97D' },
          { label: 'Open Events', value: openEvents, icon: <CheckCircle className="w-4 h-4 text-[#3B8A6E]" />, bg: '#3B8A6E' },
          { label: 'Total Events', value: events.length, icon: <Calendar className="w-4 h-4 text-[#C4878A]" />, bg: '#C4878A' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#F3EFE8] p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${s.bg}10` }}>{s.icon}</div>
            <p className="text-2xl font-bold text-[#2D2A33]">{s.value}</p>
            <p className="text-xs text-[#8E8E9F]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={fetchData} disabled={loading} className="p-2 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
          <div className="bg-gradient-to-r from-[#7A3B5E]/5 to-[#C8A97D]/5 px-6 py-4 border-b border-[#F3EFE8]">
            <h2 className="text-lg font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <Sparkles className="w-5 h-5 text-[#C8A97D]" /> Create New Event
            </h2>
          </div>
          <div className="p-6">
            {/* AI Assistant */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6 border border-[#F3EFE8]">
              <label className="block text-sm font-semibold text-[#7A3B5E] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Event Assistant
              </label>
              <div className="flex gap-2">
                <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder='e.g., "Free webinar about managing screen time"'
                  className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#C4878A] bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), generateAIContent())} />
                <button onClick={generateAIContent} disabled={aiLoading || !aiPrompt.trim()}
                  className="px-4 py-2.5 rounded-lg bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0">
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generate
                </button>
              </div>
              {aiSuggestion && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-[#3B8A6E]/20 text-xs">
                  <p className="text-[#3B8A6E] font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Auto-filled</p>
                </div>
              )}
            </div>
            {/* Form */}
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Title (English) *</label>
                  <input type="text" value={newEvent.titleEn} onChange={(e) => setNewEvent(p => ({ ...p, titleEn: e.target.value }))} required className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Title (Arabic)</label>
                  <input type="text" value={newEvent.titleAr} onChange={(e) => setNewEvent(p => ({ ...p, titleAr: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" dir="rtl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Description (English) *</label>
                <textarea value={newEvent.descriptionEn} onChange={(e) => setNewEvent(p => ({ ...p, descriptionEn: e.target.value }))} rows={3} required className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Date *</label>
                  <input type="date" value={newEvent.date} onChange={(e) => setNewEvent(p => ({ ...p, date: e.target.value }))} required className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Start</label>
                  <input type="time" value={newEvent.startTime} onChange={(e) => setNewEvent(p => ({ ...p, startTime: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">End</label>
                  <input type="time" value={newEvent.endTime} onChange={(e) => setNewEvent(p => ({ ...p, endTime: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Capacity</label>
                  <input type="number" value={newEvent.capacity} onChange={(e) => setNewEvent(p => ({ ...p, capacity: parseInt(e.target.value) || 30 }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Type</label>
                  <select value={newEvent.type} onChange={(e) => setNewEvent(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">
                    <option value="workshop">Workshop</option><option value="webinar">Webinar</option>
                    <option value="community-gathering">Community</option><option value="retreat">Retreat</option>
                    <option value="support-group">Support Group</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Location</label>
                  <select value={newEvent.locationType} onChange={(e) => setNewEvent(p => ({ ...p, locationType: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">
                    <option value="online">Online</option><option value="in-person">In Person</option><option value="hybrid">Hybrid</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Registration</label>
                  <select value={newEvent.registrationType} onChange={(e) => setNewEvent(p => ({ ...p, registrationType: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">
                    <option value="rsvp">RSVP</option><option value="cal">Cal.com</option><option value="external">External</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Price (CAD)</label>
                  <input type="number" value={newEvent.priceCAD} onChange={(e) => setNewEvent(p => ({ ...p, priceCAD: parseInt(e.target.value) || 0, isFree: parseInt(e.target.value) === 0 }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" /></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] flex items-center gap-2"><Plus className="w-4 h-4" /> Create Event</button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="px-6 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] hover:bg-[#FAF7F2]">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search events..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20" />
      </div>

      {/* Event List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#F3EFE8]">
            <Calendar className="w-10 h-10 text-[#8E8E9F] mx-auto mb-3" />
            <p className="text-[#8E8E9F] font-medium">No events found</p>
          </div>
        )}
        {filteredEvents.sort((a, b) => b.date.localeCompare(a.date)).map((event) => {
          const isExpanded = expandedEvent === event.slug;
          const regs = registrations[event.slug] || [];
          const isPast = event.date < new Date().toISOString().split('T')[0];
          const fillPercent = event.capacity ? Math.min(100, (event.registeredCount / event.capacity) * 100) : 0;

          return (
            <div key={event.slug} className={`bg-white rounded-xl border border-[#F3EFE8] overflow-hidden ${isPast ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleEvent(event.slug)} className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-[#FAF7F2]/50 transition-colors">
                <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: typeColors[event.type] || '#8E8E9F' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2D2A33] text-sm truncate">{event.titleEn}</h3>
                    {event.source === 'kv' && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold uppercase">Custom</span>}
                    {isPast && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#8E8E9F]/10 text-[#8E8E9F] font-semibold uppercase">Past</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                    <span className="capitalize">{event.type.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#7A3B5E]" />
                      <span className="text-sm font-bold text-[#2D2A33]">{event.registeredCount}</span>
                      {event.capacity && <span className="text-xs text-[#8E8E9F]">/ {event.capacity}</span>}
                    </div>
                    {event.waitlistedCount > 0 && <p className="text-[10px] text-[#D49A4E]">{event.waitlistedCount} waitlisted</p>}
                  </div>
                  {event.capacity && (
                    <div className="w-20 h-2 rounded-full bg-[#F3EFE8] overflow-hidden flex-shrink-0">
                      <div className="h-full rounded-full transition-all" style={{ width: `${fillPercent}%`, backgroundColor: fillPercent > 90 ? '#C45B5B' : fillPercent > 60 ? '#D49A4E' : '#3B8A6E' }} />
                    </div>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[#F3EFE8] px-5 py-4 bg-[#FAF7F2]/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-[#4A4A5C] flex items-center gap-1.5">
                      <ClipboardList className="w-4 h-4" /> Attendees ({regs.filter(r => !r.waitlisted).length})
                      {regs.some(r => r.waitlisted) && <span className="text-[#D49A4E] font-normal"> + {regs.filter(r => r.waitlisted).length} waitlisted</span>}
                    </h4>
                    <div className="flex gap-2">
                      {regs.length > 0 && (
                        <button onClick={() => exportCSV(event.slug)} className="flex items-center gap-1 text-xs text-[#7A3B5E] hover:text-[#5E2D48] font-medium">
                          <Download className="w-3.5 h-3.5" /> Export CSV
                        </button>
                      )}
                      <a href={`/en/resources/events#${event.slug}`} target="_blank" className="flex items-center gap-1 text-xs text-[#8E8E9F] hover:text-[#7A3B5E]">
                        <ExternalLink className="w-3.5 h-3.5" /> View
                      </a>
                    </div>
                  </div>
                  {regs.length === 0 ? (
                    <p className="text-sm text-[#8E8E9F] py-4 text-center">No registrations yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                          <th className="text-left py-2 pr-4">Name</th><th className="text-left py-2 pr-4">Email</th>
                          <th className="text-left py-2 pr-4">Phone</th><th className="text-left py-2 pr-4">Date</th><th className="text-left py-2">Status</th>
                        </tr></thead>
                        <tbody>
                          {regs.map((r) => (
                            <tr key={r.id} className="border-t border-[#F3EFE8]">
                              <td className="py-2.5 pr-4 font-medium text-[#2D2A33]">{r.firstName} {r.lastName}</td>
                              <td className="py-2.5 pr-4 text-[#4A4A5C]">{r.email}</td>
                              <td className="py-2.5 pr-4 text-[#8E8E9F]">{r.phone || '—'}</td>
                              <td className="py-2.5 pr-4 text-[#8E8E9F]">{new Date(r.registeredAt).toLocaleDateString()}</td>
                              <td className="py-2.5">
                                {r.waitlisted
                                  ? <span className="inline-flex items-center gap-1 text-xs text-[#D49A4E] bg-[#D49A4E]/10 px-2 py-0.5 rounded-full"><AlertTriangle className="w-3 h-3" /> Waitlist</span>
                                  : <span className="inline-flex items-center gap-1 text-xs text-[#3B8A6E] bg-[#3B8A6E]/10 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> Registered</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Users, Plus, Download, RefreshCw, Sparkles, Search,
  ChevronDown, ChevronUp, Clock, Trash2, Edit3, ExternalLink, BarChart3,
  ClipboardList, AlertTriangle, CheckCircle, Loader2, Bell, Eye, EyeOff,
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import TranslateButton from './TranslateButton';
import UndoToast, { useUndo } from './UndoToast';

interface EventStat {
  slug: string; titleEn: string; titleAr: string;
  descriptionEn: string; descriptionAr: string;
  date: string; dateTBD?: boolean; startTime: string; endTime: string;
  type: string; locationType: string; locationNameEn: string;
  registrationType: string; capacity: number | null;
  isFree: boolean; priceCAD: number; image: string;
  registeredCount: number; waitlistedCount: number;
  spotsRemaining: number | null; registrationStatus: string;
  pulseCount: number; pulseEmails: number;
  source: 'static' | 'kv'; hasOverrides?: boolean;
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
  const { undoAction, pushUndo, clearUndo } = useUndo();
  const [newEvent, setNewEvent] = useState({
    slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
    scenarioEn: '', scenarioAr: '',
    date: '', startTime: '', endTime: '', type: 'workshop' as string, locationType: 'online',
    locationNameEn: '', isFree: true, priceCAD: 0, capacity: 30, registrationType: 'rsvp',
    image: '',
    outcomesEn: '' as string, outcomesAr: '' as string,
    audienceDescEn: '', audienceDescAr: '',
    feeDisplayEn: '', feeDisplayAr: '',
    formatDescEn: '', formatDescAr: '',
  });

  // ─── LIFECYCLE CONTROLS ───
  const [datePickerSlug, setDatePickerSlug] = useState<string | null>(null);
  const [pendingDate, setPendingDate] = useState('');
  const [pendingStartTime, setPendingStartTime] = useState('');
  const [pendingEndTime, setPendingEndTime] = useState('');
  const [overrideLoading, setOverrideLoading] = useState<string | null>(null);
  const [notifyStatus, setNotifyStatus] = useState<Record<string, string>>({});

  const applyOverride = async (slug: string, overrides: Record<string, unknown>) => {
    setOverrideLoading(slug);
    try {
      const res = await fetch('/api/events/manage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ slug, overrides }),
      });
      if (res.ok) await fetchData();
    } catch { /* ignore */ }
    setOverrideLoading(null);
  };

  const handleSetDate = async (slug: string) => {
    if (!pendingDate) return;
    await applyOverride(slug, { date: pendingDate, startTime: pendingStartTime || '10:00', endTime: pendingEndTime || '12:00', dateTBD: false });
    setDatePickerSlug(null); setPendingDate(''); setPendingStartTime(''); setPendingEndTime('');
  };

  const handleToggleRegistration = async (slug: string, currentStatus: string) => {
    await applyOverride(slug, { registrationStatus: currentStatus === 'open' ? 'closed' : 'open' });
  };

  const handleResetToTBD = async (slug: string) => {
    await applyOverride(slug, { dateTBD: true });
  };

  const [editingCount, setEditingCount] = useState<{ slug: string; field: 'pulse' | 'spots'; value: string } | null>(null);

  const handleUpdateCount = async (slug: string, field: 'pulse' | 'spots', value: number) => {
    setOverrideLoading(slug);
    try {
      const res = await fetch('/api/events/manage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({
          slug,
          overrides: field === 'spots' ? { spotsRemaining: value } : {},
          ...(field === 'pulse' ? { pulseOverride: value } : {}),
        }),
      });
      if (res.ok) await fetchData();
    } catch { /* ignore */ }
    setOverrideLoading(null);
    setEditingCount(null);
  };

  const handleSendDateAnnouncement = async (slug: string) => {
    setNotifyStatus(prev => ({ ...prev, [slug]: 'sending' }));
    try {
      const res = await fetch('/api/events/notify-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (res.ok) setNotifyStatus(prev => ({ ...prev, [slug]: `sent:${data.sent}/${data.total}` }));
      else setNotifyStatus(prev => ({ ...prev, [slug]: data.alreadySent ? 'already-sent' : `error` }));
    } catch { setNotifyStatus(prev => ({ ...prev, [slug]: 'error' })); }
  };

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
        body: JSON.stringify({
          ...newEvent,
          slug,
          outcomesEn: newEvent.outcomesEn ? newEvent.outcomesEn.split('\n').filter(Boolean) : [],
          outcomesAr: newEvent.outcomesAr ? newEvent.outcomesAr.split('\n').filter(Boolean) : [],
          spotsRemaining: newEvent.capacity,
          registrationStatus: 'open',
          timezone: 'America/Toronto',
          locationNameAr: newEvent.locationNameEn,
          audiences: ['community'],
          featured: false,
          dateTBD: true,
          registrationFields: { phone: true, notes: false },
        }),
      });
      if (res.ok) {
        setShowCreateForm(false);
        setNewEvent({ slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', scenarioEn: '', scenarioAr: '', date: '', startTime: '', endTime: '', type: 'workshop', locationType: 'online', locationNameEn: '', isFree: true, priceCAD: 0, capacity: 30, registrationType: 'rsvp', image: '', outcomesEn: '', outcomesAr: '', audienceDescEn: '', audienceDescAr: '', feeDisplayEn: '', feeDisplayAr: '', formatDescEn: '', formatDescAr: '' });
        setEditingEvent(null);
        fetchData();
      }
    } catch { setError('Failed to create event'); }
  };

  const [editingEvent, setEditingEvent] = useState<EventStat | null>(null);

  const handleEditEvent = (event: EventStat) => {
    setEditingEvent(event);
    setNewEvent({
      slug: event.slug,
      titleEn: event.titleEn,
      titleAr: event.titleAr || '',
      descriptionEn: event.descriptionEn || '',
      descriptionAr: event.descriptionAr || '',
      date: event.date,
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      type: event.type,
      locationType: event.locationType || 'online',
      locationNameEn: event.locationNameEn || '',
      isFree: event.isFree ?? true,
      priceCAD: event.priceCAD || 0,
      capacity: event.capacity || 30,
      registrationType: event.registrationType || 'rsvp',
      image: event.image || '',
      scenarioEn: '', scenarioAr: '',
      outcomesEn: '', outcomesAr: '',
      audienceDescEn: '', audienceDescAr: '',
      feeDisplayEn: '', feeDisplayAr: '',
      formatDescEn: '', formatDescAr: '',
    });
    setShowCreateForm(true);
  };

  const handleDeleteEvent = async (slug: string) => {
    const event = events.find(e => e.slug === slug);
    if (!confirm(`Delete "${event?.titleEn || 'this event'}"?`)) return;
    try {
      const res = await fetch(`/api/events/manage?slug=${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        fetchData();
        if (event) {
          pushUndo(`Deleted "${event.titleEn}"`, async () => {
            await fetch('/api/events/manage', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
              body: JSON.stringify({ slug: event.slug, titleEn: event.titleEn, titleAr: event.titleAr, date: event.date, type: event.type, capacity: event.capacity, registrationType: event.registrationType, registrationStatus: 'open', spotsRemaining: event.capacity }),
            });
            fetchData();
          });
        }
      }
    } catch { setError('Failed to delete event'); }
  };

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true); setAiSuggestion('');
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'event', prompt: aiPrompt }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.generated) {
          const g = data.generated;
          setNewEvent(prev => ({
            ...prev,
            titleEn: g.titleEn || prev.titleEn,
            titleAr: g.titleAr || prev.titleAr,
            descriptionEn: g.descriptionEn || prev.descriptionEn,
            descriptionAr: g.descriptionAr || prev.descriptionAr,
            scenarioEn: g.scenarioEn || prev.scenarioEn,
            scenarioAr: g.scenarioAr || prev.scenarioAr,
            type: g.type || prev.type,
            capacity: g.capacity || prev.capacity,
            isFree: g.isFree ?? prev.isFree,
            outcomesEn: g.outcomesEn ? (Array.isArray(g.outcomesEn) ? g.outcomesEn.join('\n') : g.outcomesEn) : prev.outcomesEn,
            outcomesAr: g.outcomesAr ? (Array.isArray(g.outcomesAr) ? g.outcomesAr.join('\n') : g.outcomesAr) : prev.outcomesAr,
            audienceDescEn: g.audienceDescEn || prev.audienceDescEn,
            audienceDescAr: g.audienceDescAr || prev.audienceDescAr,
            feeDisplayEn: g.feeDisplayEn || prev.feeDisplayEn,
            feeDisplayAr: g.feeDisplayAr || prev.feeDisplayAr,
            formatDescEn: g.formatDescEn || prev.formatDescEn,
            formatDescAr: g.formatDescAr || prev.formatDescAr,
          }));
          setAiSuggestion('Generated');
        }
      } else {
        const err = await res.json();
        setAiSuggestion(`Error: ${err.error || 'Failed'}`);
      }
    } catch { setAiSuggestion('Connection error'); }
    setAiLoading(false);
  };

  const totalRegistered = events.reduce((sum, e) => sum + e.registeredCount, 0);
  const totalWaitlisted = events.reduce((sum, e) => sum + e.waitlistedCount, 0);
  const openEvents = events.filter(e => e.registrationStatus === 'open').length;
  const filteredEvents = searchQuery
    ? events.filter(e => e.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || e.slug.includes(searchQuery.toLowerCase()))
    : events;

  return (
    <div className="space-y-6">
      <UndoToast action={undoAction} onClear={clearUndo} />
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
        <button onClick={() => { setEditingEvent(null); setNewEvent({ slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', scenarioEn: '', scenarioAr: '', date: '', startTime: '', endTime: '', type: 'workshop', locationType: 'online', locationNameEn: '', isFree: true, priceCAD: 0, capacity: 30, registrationType: 'rsvp', image: '', outcomesEn: '', outcomesAr: '', audienceDescEn: '', audienceDescAr: '', feeDisplayEn: '', feeDisplayAr: '', formatDescEn: '', formatDescAr: '' }); setShowCreateForm(!showCreateForm); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
          <div className="bg-gradient-to-r from-[#7A3B5E]/5 to-[#C8A97D]/5 px-6 py-4 border-b border-[#F3EFE8]">
            <h2 className="text-lg font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <Sparkles className="w-5 h-5 text-[#C8A97D]" /> {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">Title (Arabic) <TranslateButton text={newEvent.titleEn} onTranslated={(t) => setNewEvent(p => ({ ...p, titleAr: t }))} password={password} contentType="event title" compact /></label>
                  <input type="text" value={newEvent.titleAr} onChange={(e) => setNewEvent(p => ({ ...p, titleAr: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" dir="rtl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Description (English) *</label>
                <textarea value={newEvent.descriptionEn} onChange={(e) => setNewEvent(p => ({ ...p, descriptionEn: e.target.value }))} rows={3} required className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">Description (Arabic) <TranslateButton text={newEvent.descriptionEn} onTranslated={(t) => setNewEvent(p => ({ ...p, descriptionAr: t }))} password={password} contentType="event description" compact /></label>
                <textarea value={newEvent.descriptionAr} onChange={(e) => setNewEvent(p => ({ ...p, descriptionAr: e.target.value }))} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
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
              {/* ── Community Pulse Fields ── */}
              <div className="border-t border-[#F3EFE8] pt-4 mt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C8A97D] mb-3">Community Pulse Details</p>

                {/* Scenario Hook */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Scenario Hook (EN)</label>
                    <textarea value={newEvent.scenarioEn} onChange={(e) => setNewEvent(p => ({ ...p, scenarioEn: e.target.value }))} rows={2} placeholder="Your teen has stopped talking to you..." className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none focus:outline-none focus:border-[#C4878A]" /></div>
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Scenario Hook (AR)</label>
                    <textarea value={newEvent.scenarioAr} onChange={(e) => setNewEvent(p => ({ ...p, scenarioAr: e.target.value }))} rows={2} dir="rtl" placeholder="ابنُك المراهق توقّف عن الحديث معك..." className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none focus:outline-none focus:border-[#C4878A]" /></div>
                </div>

                {/* Outcomes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Outcomes (EN) — one per line</label>
                    <textarea value={newEvent.outcomesEn} onChange={(e) => setNewEvent(p => ({ ...p, outcomesEn: e.target.value }))} rows={4} placeholder={"Identify your triggers\nBuild a family plan\nLearn 3 techniques"} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none focus:outline-none focus:border-[#C4878A]" /></div>
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Outcomes (AR) — one per line</label>
                    <textarea value={newEvent.outcomesAr} onChange={(e) => setNewEvent(p => ({ ...p, outcomesAr: e.target.value }))} rows={4} dir="rtl" placeholder={"حدّد محفّزاتك\nابنِ خطّة عائليّة\nتعلّم 3 تقنيّات"} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none focus:outline-none focus:border-[#C4878A]" /></div>
                </div>

                {/* Audience + Format + Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Audience (EN)</label>
                    <input value={newEvent.audienceDescEn} onChange={(e) => setNewEvent(p => ({ ...p, audienceDescEn: e.target.value }))} placeholder="Parents of children aged 5-17" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Audience (AR)</label>
                    <input value={newEvent.audienceDescAr} onChange={(e) => setNewEvent(p => ({ ...p, audienceDescAr: e.target.value }))} dir="rtl" placeholder="أولياء أمور الأطفال من 5 إلى 17" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Fee Display (EN)</label>
                    <input value={newEvent.feeDisplayEn} onChange={(e) => setNewEvent(p => ({ ...p, feeDisplayEn: e.target.value }))} placeholder="Free, $75 CAD, Pay what you can" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Fee Display (AR)</label>
                    <input value={newEvent.feeDisplayAr} onChange={(e) => setNewEvent(p => ({ ...p, feeDisplayAr: e.target.value }))} dir="rtl" placeholder="مجّانيّ، 75 دولار كنديّ" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Format (EN)</label>
                    <input value={newEvent.formatDescEn} onChange={(e) => setNewEvent(p => ({ ...p, formatDescEn: e.target.value }))} placeholder="90-minute live webinar with Q&A" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                  <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Format (AR)</label>
                    <input value={newEvent.formatDescAr} onChange={(e) => setNewEvent(p => ({ ...p, formatDescAr: e.target.value }))} dir="rtl" placeholder="ندوة حيّة مدّتها 90 دقيقة" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" /></div>
                </div>
              </div>

              {/* Image Upload */}
              <ImageUpload
                value={newEvent.image}
                onChange={(url) => setNewEvent(p => ({ ...p, image: url }))}
                password={password}
                type="event"
              />

              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] flex items-center gap-2"><Plus className="w-4 h-4" /> {editingEvent ? 'Update Event' : 'Create Event'}</button>
                <button type="button" onClick={() => { setShowCreateForm(false); setEditingEvent(null); }} className="px-6 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] hover:bg-[#FAF7F2]">Cancel</button>
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
                  <div className="flex items-center gap-0.5">
                    <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors" title="Edit">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.slug); }} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[#F3EFE8] px-5 py-4 bg-[#FAF7F2]/30">
                  {/* ── Lifecycle Controls ── */}
                  <div className="mb-4 p-4 bg-white rounded-xl border border-[#F3EFE8]">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E9F] mb-3">Event Lifecycle</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {event.dateTBD !== false && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#C8A97D]/10 text-[#C8A97D] font-semibold">Date TBD</span>
                      )}
                      {event.dateTBD === false && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-semibold">Date Confirmed</span>
                      )}
                      {event.pulseCount > 0 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#7A3B5E]/10 text-[#7A3B5E]">{event.pulseCount} votes · {event.pulseEmails} notify emails</span>
                      )}
                      <span className={`text-xs px-2.5 py-1 rounded-full ${event.registrationStatus === 'open' ? 'bg-[#3B8A6E]/10 text-[#3B8A6E]' : 'bg-[#8E8E9F]/10 text-[#8E8E9F]'}`}>
                        Reg: {event.registrationStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {event.dateTBD !== false ? (
                        <button onClick={() => setDatePickerSlug(datePickerSlug === event.slug ? null : event.slug)} disabled={overrideLoading === event.slug}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B8A6E] text-white text-xs font-medium hover:bg-[#2D7A5E] disabled:opacity-50">
                          <Calendar className="w-3.5 h-3.5" /> Set Date
                        </button>
                      ) : (
                        <button onClick={() => handleResetToTBD(event.slug)} disabled={overrideLoading === event.slug}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F3EFE8] text-xs text-[#8E8E9F] hover:bg-[#FAF7F2] disabled:opacity-50">
                          <Clock className="w-3.5 h-3.5" /> Reset to TBD
                        </button>
                      )}
                      <button onClick={() => handleToggleRegistration(event.slug, event.registrationStatus)} disabled={overrideLoading === event.slug}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50 ${
                          event.registrationStatus === 'open' ? 'border border-[#C4878A]/30 text-[#C4878A] hover:bg-[#C4878A]/5' : 'bg-[#3B8A6E] text-white hover:bg-[#2D7A5E]'}`}>
                        {event.registrationStatus === 'open' ? <><EyeOff className="w-3.5 h-3.5" /> Close Reg</> : <><Eye className="w-3.5 h-3.5" /> Open Reg</>}
                      </button>
                      {event.dateTBD === false && event.pulseEmails > 0 && (
                        <button onClick={() => handleSendDateAnnouncement(event.slug)}
                          disabled={notifyStatus[event.slug]?.startsWith('sent') || notifyStatus[event.slug] === 'already-sent' || notifyStatus[event.slug] === 'sending'}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C8A97D] text-white text-xs font-medium hover:bg-[#B08D5E] disabled:opacity-50">
                          {notifyStatus[event.slug] === 'sending' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
                          {notifyStatus[event.slug]?.startsWith('sent') ? `Sent (${notifyStatus[event.slug].split(':')[1]})` : notifyStatus[event.slug] === 'already-sent' ? 'Already Sent' : `Notify ${event.pulseEmails}`}
                        </button>
                      )}
                        {overrideLoading === event.slug && <Loader2 className="w-4 h-4 animate-spin text-[#7A3B5E]" />}
                    </div>

                    {/* Editable counts */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#F3EFE8]">
                      {/* Pulse votes */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase text-[#8E8E9F]">Votes:</span>
                        {editingCount?.slug === event.slug && editingCount.field === 'pulse' ? (
                          <div className="flex items-center gap-1">
                            <input type="number" value={editingCount.value} onChange={e => setEditingCount({ ...editingCount, value: e.target.value })}
                              className="w-16 px-2 py-1 rounded border border-[#E8E4DE] text-xs text-center focus:outline-none focus:border-[#7A3B5E]" autoFocus />
                            <button onClick={() => handleUpdateCount(event.slug, 'pulse', parseInt(editingCount.value) || 0)}
                              className="px-2 py-1 rounded bg-[#3B8A6E] text-white text-[10px] font-medium">Save</button>
                            <button onClick={() => setEditingCount(null)} className="px-2 py-1 rounded border border-[#F3EFE8] text-[10px] text-[#8E8E9F]">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setEditingCount({ slug: event.slug, field: 'pulse', value: String(event.pulseCount || 0) })}
                            className="text-sm font-bold text-[#7A3B5E] hover:underline cursor-pointer">{event.pulseCount || 0}</button>
                        )}
                      </div>

                      {/* Spots remaining */}
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase text-[#8E8E9F]">Spots Left:</span>
                          {editingCount?.slug === event.slug && editingCount.field === 'spots' ? (
                            <div className="flex items-center gap-1">
                              <input type="number" value={editingCount.value} onChange={e => setEditingCount({ ...editingCount, value: e.target.value })}
                                className="w-16 px-2 py-1 rounded border border-[#E8E4DE] text-xs text-center focus:outline-none focus:border-[#7A3B5E]" autoFocus />
                              <button onClick={() => handleUpdateCount(event.slug, 'spots', parseInt(editingCount.value) || 0)}
                                className="px-2 py-1 rounded bg-[#3B8A6E] text-white text-[10px] font-medium">Save</button>
                              <button onClick={() => setEditingCount(null)} className="px-2 py-1 rounded border border-[#F3EFE8] text-[10px] text-[#8E8E9F]">Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setEditingCount({ slug: event.slug, field: 'spots', value: String(event.spotsRemaining ?? event.capacity) })}
                              className="text-sm font-bold text-[#4A4A5C] hover:underline cursor-pointer">{event.spotsRemaining ?? event.capacity} / {event.capacity}</button>
                          )}
                        </div>
                      )}

                      {/* Registered count (read-only) */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase text-[#8E8E9F]">Registered:</span>
                        <span className="text-sm font-bold text-[#4A4A5C]">{event.registeredCount}</span>
                      </div>
                    </div>

                    {datePickerSlug === event.slug && (
                      <div className="mt-3 p-3 bg-[#FAF7F2] rounded-lg border border-[#F3EFE8]">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div><label className="block text-[10px] font-semibold uppercase text-[#8E8E9F] mb-1">Date</label>
                            <input type="date" value={pendingDate} onChange={e => setPendingDate(e.target.value)} className="w-full px-2.5 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#3B8A6E] bg-white" /></div>
                          <div><label className="block text-[10px] font-semibold uppercase text-[#8E8E9F] mb-1">Start</label>
                            <input type="time" value={pendingStartTime} onChange={e => setPendingStartTime(e.target.value)} className="w-full px-2.5 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#3B8A6E] bg-white" /></div>
                          <div><label className="block text-[10px] font-semibold uppercase text-[#8E8E9F] mb-1">End</label>
                            <input type="time" value={pendingEndTime} onChange={e => setPendingEndTime(e.target.value)} className="w-full px-2.5 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#3B8A6E] bg-white" /></div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSetDate(event.slug)} disabled={!pendingDate} className="px-4 py-1.5 rounded-lg bg-[#3B8A6E] text-white text-xs font-medium hover:bg-[#2D7A5E] disabled:opacity-40">Confirm Date</button>
                          <button onClick={() => setDatePickerSlug(null)} className="px-4 py-1.5 rounded-lg border border-[#F3EFE8] text-xs text-[#8E8E9F] hover:bg-white">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Attendees ── */}
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

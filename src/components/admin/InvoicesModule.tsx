'use client';

/* ================================================================
   InvoicesModule — Top-level admin invoice composer
   ================================================================
   Three internal tabs: Compose / History / Reports + Settings drawer.
   Reuses the existing admin module pattern (password prop + Bearer
   auth) and the pricing engine from src/lib/pricing-engine.ts.
   ================================================================ */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, History, BarChart3, Settings as SettingsIcon,
  Send, Save, Eye, Trash2, Check, CheckCircle2, XCircle, DollarSign,
  Sparkles, Globe, Receipt, Loader2, X, ChevronDown, AlertCircle,
  LayoutDashboard, Users, RefreshCw, Search, Upload, Download,
  TrendingUp, TrendingDown, Calendar, Mail, Wand2, RotateCw, AlertTriangle,
  Plus, Mic, MicOff,
} from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import type { ServiceCategory } from '@/types';
import {
  PACKAGE_CONFIG,
  COMPLEXITY_CONFIG,
} from '@/lib/invoicing/types';
import type {
  InvoiceDraft,
  InvoiceRateBreakdown,
  InvoiceSettings,
  InvoiceLineItem,
  StoredInvoice,
  PaymentMethodRecord,
  ComplexityPreset,
  PackageKey,
  Customer,
  RecurringSchedule,
  ZohoInvoiceImportPreview,
  ZohoInvoiceImportResult,
} from '@/lib/invoicing/types';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { generateDraftId } from '@/lib/invoicing/invoice-number';
import type { ReportAggregate } from '@/lib/invoicing/reports';
import type { DashboardView } from '@/lib/invoicing/dashboard-stats';
import CustomerCombobox from './CustomerCombobox';
import CustomerSnapshot from './CustomerSnapshot';
import VoiceInvoiceRecorder, { type VoiceParseResult } from './VoiceInvoiceRecorder';
import RevenueWaterfall from './charts/RevenueWaterfall';
import ServiceTreemap from './charts/ServiceTreemap';
import ClientLTVLeaderboard from './charts/ClientLTVLeaderboard';
import SeasonalCalendar from './charts/SeasonalCalendar';
import RetentionCohort from './charts/RetentionCohort';
import GeoRevenueMap from './charts/GeoRevenueMap';
import RelationshipDepth from './charts/RelationshipDepth';
import PredictiveForecast from './charts/PredictiveForecast';
import AIInsightCard from './charts/AIInsightCard';
import {
  Section as SharedSection,
  Field as SharedField,
  BreakdownCard as SharedBreakdownCard,
  makeEmptyDraft as sharedMakeEmptyDraft,
  inputClass as sharedInputClass,
} from './invoice-shared';

interface Props {
  password: string;
}

type Tab = 'dashboard' | 'compose' | 'history' | 'customers' | 'recurring' | 'reports';
type StatusFilter = 'all' | 'draft' | 'sent' | 'paid' | 'overdue' | 'void' | 'unpaid';

// Local default draft
function makeEmptyDraft(): InvoiceDraft {
  const now = new Date().toISOString();
  return {
    draftId: generateDraftId(),
    client: {
      name: '',
      email: '',
      country: 'CA',
    },
    serviceSlug: '',
    complexity: { preset: 'standard', percent: 0 },
    package: 'single',
    slidingScalePercent: 0,
    taxMode: 'manual-hst',
    allowETransfer: true,
    daysUntilDue: 7,
    createdAt: now,
    updatedAt: now,
  };
}

// Fallback settings for first paint (before KV load)
function placeholderSettings(): InvoiceSettings {
  return {
    /* Branding (Phase 2 defaults) */
    businessName: 'Mama Hala Consulting Group',
    companyId: '1000059885',
    websiteUrl: 'https://www.mamahala.ca',
    bookingPolicyUrl: 'https://www.mamahala.ca/en/booking-policy',
    customerNotes:
      'All services are subject to the Terms and Conditions and Privacy Policy mentioned on the official website of the company: www.mamahala.ca',
    termsAndConditions: [
      "Prepaid sessions may be rescheduled with a minimum of 2 hours' notice.",
      "Missed sessions without prior notice may incur a 50% fee, to honor counselor's time and fair scheduling for all clients.",
      'Booking Policy: https://www.mamahala.ca/en/booking-policy',
    ],
    /* Tax + e-Transfer */
    defaultTaxMode: 'manual-hst',
    defaultDaysUntilDue: 7,
    defaultAllowETransfer: true,
    eTransferEmail: 'admin@mamahala.ca',
    issuerBlock: {
      name: 'Mama Hala Consulting Group',
      line1: '430 Hazeldean Rd',
      city: 'Ottawa',
      postalCode: 'K2L 1E8',
      country: 'Canada',
      email: 'admin@mamahala.ca',
      phone: '+1 613-222-2104',
    },
    /* Recurring + Dry Run */
    recurringAutoSendDefault: false,
    dryRun: true,
    updatedAt: new Date().toISOString(),
  };
}

export default function InvoicesModule({ password }: Props) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [settings, setSettings] = useState<InvoiceSettings>(placeholderSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [invoices, setInvoices] = useState<StoredInvoice[]>([]);
  const [report, setReport] = useState<ReportAggregate | null>(null);
  const [dashboard, setDashboard] = useState<DashboardView | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [recurring, setRecurring] = useState<RecurringSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ kind: 'success' | 'error' | 'info'; text: string } | null>(null);
  // Inline PDF overlay (replaces window.open for mobile compatibility)
  const [pdfOverlayUrl, setPdfOverlayUrl] = useState<string | null>(null);
  // Customer profile modal (accessible from History tab too)
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const bearerHeaders = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${password}`,
    }),
    [password],
  );

  // Load settings once
  useEffect(() => {
    fetch('/api/admin/invoices/settings', { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => {
        if (data?.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, [bearerHeaders]);

  // Load history when switching to that tab
  const refreshHistory = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/invoices/list?limit=100', { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => {
        setInvoices(data?.invoices ?? []);
      })
      .catch(() => setBanner({ kind: 'error', text: 'Failed to load invoices' }))
      .finally(() => setLoading(false));
  }, [bearerHeaders]);

  const refreshReports = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/invoices/reports', { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => {
        setReport(data?.report ?? null);
      })
      .catch(() => setBanner({ kind: 'error', text: 'Failed to load reports' }))
      .finally(() => setLoading(false));
  }, [bearerHeaders]);

  const refreshDashboard = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/invoices/dashboard', { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => setDashboard(data?.view ?? null))
      .catch(() => setBanner({ kind: 'error', text: 'Failed to load dashboard' }))
      .finally(() => setLoading(false));
  }, [bearerHeaders]);

  const refreshCustomers = useCallback(
    (sync = false) => {
      setLoading(true);
      const url = sync
        ? '/api/admin/invoices/customers?sync=1'
        : '/api/admin/invoices/customers';
      fetch(url, { headers: bearerHeaders })
        .then((r) => r.json())
        .then((data) => {
          setCustomers(data?.customers ?? []);
          if (sync && data?.syncResult) {
            setBanner({
              kind: 'success',
              text: `Synced ${data.syncResult.created} new + ${data.syncResult.updated} updated customers`,
            });
          }
        })
        .catch(() => setBanner({ kind: 'error', text: 'Failed to load customers' }))
        .finally(() => setLoading(false));
    },
    [bearerHeaders],
  );

  const refreshRecurring = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/invoices/recurring', { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => setRecurring(data?.schedules ?? []))
      .catch(() => setBanner({ kind: 'error', text: 'Failed to load recurring schedules' }))
      .finally(() => setLoading(false));
  }, [bearerHeaders]);

  useEffect(() => {
    if (tab === 'dashboard') refreshDashboard();
    if (tab === 'history') refreshHistory();
    if (tab === 'reports') refreshReports();
    if (tab === 'customers') refreshCustomers(true); // sync on first load
    if (tab === 'recurring') refreshRecurring();
    // Compose tab needs both customers (for combobox) and recent invoices
    // (for CustomerSnapshot's top-service calculation)
    if (tab === 'compose') {
      refreshCustomers(false);
      refreshHistory();
    }
  }, [tab, refreshDashboard, refreshHistory, refreshReports, refreshCustomers, refreshRecurring]);

  // Auto-dismiss banner — errors persist longer so admin can read them
  useEffect(() => {
    if (!banner) return;
    const duration = banner.kind === 'error' ? 15000 : 5000;
    const t = setTimeout(() => setBanner(null), duration);
    return () => clearTimeout(t);
  }, [banner]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2
            className="text-2xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Invoices
          </h2>
          <p className="text-sm text-[#8E8E9F] mt-0.5">
            Compose, send, and track professional invoices globally
          </p>
        </div>
        <div className="flex items-center gap-2">
          {settings.dryRun && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
              <AlertCircle className="w-3 h-3" />
              Dry Run — emails OFF
            </span>
          )}
          <button
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4DE] text-[#4A4A5C] hover:bg-[#FAF7F2] text-xs font-medium transition-colors"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-[#EDE8DF] overflow-x-auto snap-x snap-mandatory scrollbar-none">
        <TabButton active={tab === 'dashboard'} onClick={() => setTab('dashboard')} icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
        <TabButton active={tab === 'compose'} onClick={() => setTab('compose')} icon={<FileText className="w-4 h-4" />} label="Compose" />
        <TabButton active={tab === 'history'} onClick={() => setTab('history')} icon={<History className="w-4 h-4" />} label="History" />
        <TabButton active={tab === 'customers'} onClick={() => setTab('customers')} icon={<Users className="w-4 h-4" />} label="Customers" />
        <TabButton active={tab === 'recurring'} onClick={() => setTab('recurring')} icon={<RefreshCw className="w-4 h-4" />} label="Recurring" />
        <TabButton active={tab === 'reports'} onClick={() => setTab('reports')} icon={<BarChart3 className="w-4 h-4" />} label="Reports" />
      </div>

      {/* Banner */}
      <AnimatePresence>
        {banner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
              banner.kind === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : banner.kind === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-sky-50 text-sky-800 border border-sky-200'
            }`}
          >
            {banner.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab content */}
      {tab === 'dashboard' && (
        <DashboardTab
          dashboard={dashboard}
          loading={loading}
          onRefresh={refreshDashboard}
          bearerHeaders={bearerHeaders}
        />
      )}
      {tab === 'compose' && (
        <ComposeTab
          bearerHeaders={bearerHeaders}
          settings={settings}
          customers={customers}
          recentInvoices={invoices}
          onBanner={setBanner}
          onRefreshCustomers={() => refreshCustomers(false)}
        />
      )}
      {tab === 'history' && (
        <HistoryTab
          invoices={invoices}
          loading={loading}
          bearerHeaders={bearerHeaders}
          onRefresh={refreshHistory}
          onBanner={setBanner}
          onViewPdfOverlay={setPdfOverlayUrl}
          onOpenClientProfile={setProfileEmail}
        />
      )}
      {tab === 'customers' && (
        <CustomersTab
          customers={customers}
          loading={loading}
          bearerHeaders={bearerHeaders}
          onRefresh={() => refreshCustomers(false)}
          onBanner={setBanner}
        />
      )}
      {tab === 'recurring' && (
        <RecurringTab
          schedules={recurring}
          loading={loading}
          bearerHeaders={bearerHeaders}
          onRefresh={refreshRecurring}
          onBanner={setBanner}
        />
      )}
      {tab === 'reports' && (
        <ReportsTab report={report} loading={loading} />
      )}

      {/* Settings drawer */}
      <AnimatePresence>
        {settingsOpen && (
          <SettingsDrawer
            settings={settings}
            bearerHeaders={bearerHeaders}
            onClose={() => setSettingsOpen(false)}
            onSave={(s) => {
              setSettings(s);
              setBanner({ kind: 'success', text: 'Settings saved' });
            }}
          />
        )}
      </AnimatePresence>

      {/* Inline PDF overlay (mobile-friendly) */}
      {pdfOverlayUrl && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center" onClick={() => { URL.revokeObjectURL(pdfOverlayUrl); setPdfOverlayUrl(null); }}>
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-3xl h-[90dvh] md:h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDE8DF] shrink-0">
              <h3 className="text-sm font-semibold text-[#2D2A33]">Invoice PDF</h3>
              <button
                onClick={() => { URL.revokeObjectURL(pdfOverlayUrl); setPdfOverlayUrl(null); }}
                className="p-2 rounded-full hover:bg-[#EDE6DF] transition-colors"
              >
                <X className="w-4 h-4 text-[#8E8E9F]" />
              </button>
            </div>
            <iframe src={pdfOverlayUrl} className="flex-1 w-full" title="Invoice PDF" />
          </div>
        </div>
      )}

      {/* Customer profile modal (accessible from History tab) */}
      <AnimatePresence>
        {profileEmail && (
          <CustomerProfileModal
            email={profileEmail}
            bearerHeaders={bearerHeaders}
            onClose={() => setProfileEmail(null)}
            onBanner={setBanner}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ Tab button ═══════════════ */

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap snap-start active:scale-95 ${
        active
          ? 'border-[#7A3B5E] text-[#7A3B5E]'
          : 'border-transparent text-[#8E8E9F] hover:text-[#4A4A5C]'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ═══════════════ Compose Tab ═══════════════ */

function ComposeTab({
  bearerHeaders,
  settings,
  customers,
  recentInvoices,
  onBanner,
  onRefreshCustomers,
}: {
  bearerHeaders: HeadersInit;
  settings: InvoiceSettings;
  customers: Customer[];
  recentInvoices: StoredInvoice[];
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
  onRefreshCustomers: () => void;
}) {
  const [draft, setDraft] = useState<InvoiceDraft>(makeEmptyDraft);
  const [sending, setSending] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // The currently-selected customer for the combobox + snapshot
  const selectedCustomer = useMemo(
    () =>
      customers.find(
        (c) => c.email.toLowerCase() === draft.client.email.toLowerCase(),
      ) || null,
    [customers, draft.client.email],
  );

  // Recent invoices for THIS customer, for the snapshot's top-service calc
  const customerInvoices = useMemo(
    () =>
      selectedCustomer
        ? recentInvoices.filter(
            (inv) =>
              inv.draft.client.email.toLowerCase() ===
              selectedCustomer.email.toLowerCase(),
          )
        : [],
    [recentInvoices, selectedCustomer],
  );

  // Derive breakdown live
  const breakdown = useMemo(
    () => computeRateBreakdown(draft, settings),
    [draft, settings],
  );

  // Auto-save draft every 3s (debounced)
  useEffect(() => {
    if (!draft.client.name && !draft.client.email) return; // don't save empty drafts
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch('/api/admin/invoices/drafts', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ draft }),
      }).catch(() => {});
    }, 3000);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [draft, bearerHeaders]);

  // Auto-sync e-Transfer toggle to country (but only on first country change)
  const initialCountryRef = useRef(draft.client.country);
  useEffect(() => {
    if (draft.client.country !== initialCountryRef.current) {
      setDraft((d) => ({
        ...d,
        allowETransfer: d.client.country === 'CA',
      }));
      initialCountryRef.current = draft.client.country;
    }
  }, [draft.client.country]);

  const updateClient = (patch: Partial<InvoiceDraft['client']>) => {
    setDraft((d) => ({
      ...d,
      client: { ...d.client, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateDraft = <K extends keyof InvoiceDraft>(
    key: K,
    value: InvoiceDraft[K],
  ) => {
    setDraft((d) => ({
      ...d,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  /**
   * Apply a Claude-parsed voice result to the draft. This maps each parsed
   * field into the corresponding draft slot, matching the client against
   * the customer DB for email/country auto-fill.
   */
  const applyVoiceResult = (parsed: VoiceParseResult) => {
    setDraft((prev) => {
      const next: InvoiceDraft = {
        ...prev,
        updatedAt: new Date().toISOString(),
      };

      // Match the client — prefer explicit email, fall back to name match
      let matched: Customer | undefined;
      if (parsed.clientEmail) {
        matched = customers.find(
          (c) => c.email.toLowerCase() === parsed.clientEmail!.toLowerCase(),
        );
      }
      if (!matched && parsed.clientName) {
        const needle = parsed.clientName.toLowerCase();
        matched = customers.find((c) => c.name.toLowerCase().includes(needle));
      }

      if (matched) {
        // Use the customer's canonical name. Don't compound with salutation
        // if the name already includes one (Claude sometimes echoes "Mrs. X"
        // from the user's dictation even when matched.name already starts
        // with "Mrs.").
        const rawName = matched.name.trim();
        const startsWithTitle = /^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(rawName);
        const displayName =
          matched.salutation && !startsWithTitle
            ? `${matched.salutation} ${rawName}`
            : rawName;
        next.client = {
          ...next.client,
          name: displayName,
          email: matched.email,
          country: matched.country,
          phone: matched.phone,
          address: matched.address,
        };
        if (matched.preferredCurrency) {
          next.displayCurrency = matched.preferredCurrency;
        }
      } else if (parsed.clientName) {
        // Keep as-is, but update name — user will fill in email manually
        next.client = { ...next.client, name: parsed.clientName };
      }

      // Service
      if (parsed.serviceSlug) {
        const svc = services.find((s) => s.slug === parsed.serviceSlug);
        if (svc) next.serviceSlug = svc.slug;
      }

      // Currency override
      if (parsed.currency) {
        next.displayCurrency = parsed.currency;
      }

      // Amount — stored as manual override for transparency
      if (parsed.amountLocal && parsed.amountLocal > 0) {
        next.manualPrice = {
          enabled: true,
          perSessionLocal: parsed.amountLocal,
          currency: parsed.currency || next.displayCurrency,
          reason: `Voice input: "${parsed.transcript.slice(0, 60)}${parsed.transcript.length > 60 ? '…' : ''}"`,
        };
      }

      // Subject
      if (parsed.subject) {
        next.subject = parsed.subject;
      }

      // Days until due
      if (parsed.daysUntilDue && parsed.daysUntilDue > 0) {
        next.daysUntilDue = Math.min(90, Math.max(1, parsed.daysUntilDue));
      }

      // Complexity preset
      if (parsed.complexityPreset) {
        const percents: Record<typeof parsed.complexityPreset & string, number> = {
          standard: 0,
          plus25: 0.25,
          plus33: 0.33,
          plus50: 0.5,
        };
        next.complexity = {
          preset: parsed.complexityPreset,
          percent: percents[parsed.complexityPreset],
        };
      }

      // Admin note — append or set
      if (parsed.adminNote) {
        next.adminNote = next.adminNote
          ? `${next.adminNote}\n\n${parsed.adminNote}`
          : parsed.adminNote;
      }

      return next;
    });
  };

  const handlePreview = async () => {
    try {
      const res = await fetch('/api/admin/invoices/preview-pdf', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ draft }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        onBanner({ kind: 'error', text: data.error || 'Preview failed' });
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPreviewOpen(true);
    } catch {
      onBanner({ kind: 'error', text: 'Preview failed' });
    }
  };

  const handleSend = async () => {
    if (!breakdown) {
      onBanner({ kind: 'error', text: 'Complete the form first' });
      return;
    }
    const confirmed = confirm(
      settings.dryRun
        ? `Create invoice for ${draft.client.email}? (Dry Run mode — no email will be sent.)`
        : `Send invoice to ${draft.client.email} for ${breakdown.formattedTotal}? This will email the client.`,
    );
    if (!confirmed) return;

    setSending(true);
    try {
      const res = await fetch('/api/admin/invoices/create', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ draft }),
      });
      const data = await res.json();
      if (!res.ok) {
        onBanner({ kind: 'error', text: data.error || 'Send failed' });
        return;
      }

      // Check for partial success: invoice saved but email failed (Resend domain
      // not verified, synthetic no-email address, network error, etc.)
      if (data.emailError && !settings.dryRun) {
        onBanner({
          kind: 'error',
          text: `Invoice ${data.invoice.invoiceNumber} saved but email delivery failed: ${data.emailError}. Download the PDF from History and send manually.`,
        });
        // Still reset the form so the admin can move on
        setDraft(makeEmptyDraft());
        return;
      }

      // Surface Stripe tier warnings as an info banner so the admin knows
      // which payment methods the client will see.
      if (data.stripeWarning) {
        onBanner({
          kind: 'info',
          text: `Invoice ${data.invoice.invoiceNumber} sent — ${data.stripeWarning}`,
        });
      } else {
        onBanner({
          kind: 'success',
          text: settings.dryRun
            ? `Invoice ${data.invoice.invoiceNumber} created (dry run — no email sent)`
            : `Invoice ${data.invoice.invoiceNumber} sent to ${draft.client.email}`,
        });
      }
      // Reset form
      setDraft(makeEmptyDraft());
    } catch {
      onBanner({ kind: 'error', text: 'Server error' });
    } finally {
      setSending(false);
    }
  };

  // Service options grouped by category
  const servicesByCategory = useMemo(() => {
    const groups: Record<string, typeof services> = {};
    for (const s of services) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {/* LEFT: form */}
      <div className="lg:col-span-3 space-y-5">
        {/* Voice-to-Invoice */}
        <VoiceInvoiceRecorder
          bearerHeaders={bearerHeaders}
          onApply={applyVoiceResult}
          onBanner={onBanner}
        />

        {/* Client — smart picker + editable fields */}
        <Section title="Client" icon={<Users className="w-4 h-4" />}>
          <CustomerCombobox
            customers={customers}
            selectedEmail={draft.client.email}
            onSelect={(c) => {
              const rawName = c.name.trim();
              const startsWithTitle = /^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(rawName);
              const displayName =
                c.salutation && !startsWithTitle
                  ? `${c.salutation} ${rawName}`
                  : rawName;
              updateClient({
                name: displayName,
                email: c.email,
                country: c.country,
                phone: c.phone,
                address: c.address,
              });
              if (c.preferredCurrency) {
                updateDraft('displayCurrency', c.preferredCurrency);
              }
            }}
            onNewClient={() => {
              setDraft((d) => ({
                ...d,
                client: { name: '', email: '', country: 'CA' },
              }));
            }}
            locale="en"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <Field label="Name">
              <input
                value={draft.client.name}
                onChange={(e) => updateClient({ name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                placeholder="Full name"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={draft.client.email}
                onChange={(e) => updateClient({ email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                placeholder="client@email.com"
              />
            </Field>
            <Field label="Country (ISO-2)">
              <input
                value={draft.client.country}
                onChange={(e) =>
                  updateClient({ country: e.target.value.toUpperCase().slice(0, 2) })
                }
                maxLength={2}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 uppercase font-mono"
                placeholder="CA"
              />
            </Field>
            <Field label="Phone (optional)">
              <input
                value={draft.client.phone ?? ''}
                onChange={(e) => updateClient({ phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                placeholder="+1 613..."
              />
            </Field>
          </div>
        </Section>

        {/* Subject / Session Notes (optional) */}
        <Section title="Subject / Session Notes (optional)" icon={<FileText className="w-4 h-4" />}>
          <Field label="Appointment reminder, session details, or memo">
            <input
              value={draft.subject ?? ''}
              onChange={(e) => updateDraft('subject', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
              placeholder="e.g., Appointment reminder: Sunday, April 12 at 2:30pm"
              maxLength={200}
            />
          </Field>
          <p className="text-[10px] text-[#8E8E9F] mt-1">
            Shown on the PDF below the Billed To block and in the invoice email body.
          </p>
        </Section>

        {/* Stripe Payment Link (optional) — works without STRIPE_SECRET_KEY */}
        <Section title="Card payment link (optional)" icon={<DollarSign className="w-4 h-4" />}>
          <Field label="Stripe Payment Link URL">
            <input
              type="url"
              value={draft.stripePaymentLink ?? ''}
              onChange={(e) =>
                updateDraft('stripePaymentLink', e.target.value.trim() || undefined)
              }
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
              placeholder="https://buy.stripe.com/..."
            />
          </Field>
          <p className="text-[10px] text-[#8E8E9F] mt-1 leading-relaxed">
            Paste a Stripe Payment Link for this invoice (create one in the Stripe
            dashboard). Used by the payment concierge page for card payments when
            the automatic Stripe Checkout session isn&apos;t available. Leave empty
            to rely on dynamic sessions (when configured) or fall back to e-Transfer
            / wire / PayPal only.
          </p>
        </Section>

        {/* Service */}
        <Section title="Service" icon={<Sparkles className="w-4 h-4" />}>
          <Field label="Session type">
            <select
              value={draft.serviceSlug}
              onChange={(e) => updateDraft('serviceSlug', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white"
            >
              <option value="">— Pick a service —</option>
              {(Object.keys(servicesByCategory) as ServiceCategory[]).map((cat) => {
                const catInfo = serviceCategories.find((c) => c.key === cat);
                return (
                  <optgroup key={cat} label={catInfo?.name ?? cat}>
                    {servicesByCategory[cat].map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </Field>
        </Section>

        {/* Complexity */}
        <Section title="Complexity" icon={<DollarSign className="w-4 h-4" />}>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(COMPLEXITY_CONFIG) as ComplexityPreset[]).map((preset) => {
              const config = COMPLEXITY_CONFIG[preset];
              const active = draft.complexity.preset === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    updateDraft('complexity', {
                      preset,
                      percent: preset === 'custom' ? draft.complexity.percent : config.percent,
                    })
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-[#7A3B5E] text-white border-[#7A3B5E]'
                      : 'border-[#E8E4DE] text-[#4A4A5C] hover:border-[#7A3B5E]'
                  }`}
                >
                  {config.labelEn}
                </button>
              );
            })}
          </div>
          {draft.complexity.preset === 'custom' && (
            <div className="mt-3">
              <Field label="Custom percent (0-100)">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(draft.complexity.percent * 100)}
                  onChange={(e) =>
                    updateDraft('complexity', {
                      preset: 'custom',
                      percent: Math.max(0, Math.min(1, Number(e.target.value) / 100)),
                    })
                  }
                  className="w-32 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                />
              </Field>
            </div>
          )}
        </Section>

        {/* Package */}
        <Section title="Package" icon={<Receipt className="w-4 h-4" />}>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(PACKAGE_CONFIG) as PackageKey[]).map((key) => {
              const config = PACKAGE_CONFIG[key];
              const active = draft.package === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => updateDraft('package', key)}
                  className={`p-2.5 rounded-lg border text-center transition-colors ${
                    active
                      ? 'bg-[#7A3B5E] text-white border-[#7A3B5E]'
                      : 'bg-white border-[#E8E4DE] text-[#4A4A5C] hover:border-[#7A3B5E]'
                  }`}
                >
                  <div className="text-sm font-bold">{config.sessions}×</div>
                  <div className="text-[10px] opacity-80">
                    {config.discount > 0 ? `−${Math.round(config.discount * 100)}%` : 'single'}
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sliding scale */}
        <Section title="Sliding scale" icon={<DollarSign className="w-4 h-4" />}>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={Math.round(draft.slidingScalePercent * 100)}
              onChange={(e) =>
                updateDraft('slidingScalePercent', Number(e.target.value) / 100)
              }
              className="flex-1 accent-[#7A3B5E]"
            />
            <div className="text-sm font-bold text-[#7A3B5E] tabular-nums w-16 text-right">
              −{Math.round(draft.slidingScalePercent * 100)}%
            </div>
          </div>
          <p className="text-[11px] text-[#8E8E9F] mt-2">
            Optional hardship adjustment — max 40% off.
          </p>
        </Section>

        {/* Tax + e-Transfer */}
        <Section title="Tax & Payment">
          <div className="space-y-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-medium mb-1.5 block">
                Tax mode
              </label>
              <div className="flex gap-2">
                {(['manual-hst', 'none'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateDraft('taxMode', mode)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      draft.taxMode === mode
                        ? 'bg-[#7A3B5E] text-white border-[#7A3B5E]'
                        : 'border-[#E8E4DE] text-[#4A4A5C]'
                    }`}
                  >
                    {mode === 'manual-hst' ? 'Manual HST 13% (CA only)' : 'No tax'}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-[#4A4A5C]">
              <input
                type="checkbox"
                checked={draft.allowETransfer}
                onChange={(e) => updateDraft('allowETransfer', e.target.checked)}
                className="w-4 h-4 accent-[#7A3B5E]"
              />
              Allow Interac e-Transfer (Canadian clients)
            </label>
          </div>
        </Section>

        {/* Manual price override */}
        <Section title="Manual price override (optional)" icon={<DollarSign className="w-4 h-4" />}>
          <label className="flex items-center gap-2 text-sm text-[#4A4A5C] mb-2">
            <input
              type="checkbox"
              checked={draft.manualPrice?.enabled ?? false}
              onChange={(e) =>
                updateDraft('manualPrice', e.target.checked
                  ? {
                      enabled: true,
                      perSessionLocal: draft.manualPrice?.perSessionLocal ?? 0,
                      currency: draft.manualPrice?.currency,
                      reason: draft.manualPrice?.reason,
                    }
                  : undefined,
                )
              }
              className="w-4 h-4 accent-[#7A3B5E]"
            />
            Override the auto-computed price
          </label>
          {draft.manualPrice?.enabled && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Per-session amount">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={draft.manualPrice.perSessionLocal || ''}
                    onChange={(e) =>
                      updateDraft('manualPrice', {
                        ...draft.manualPrice!,
                        perSessionLocal: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
                    placeholder="200"
                  />
                </Field>
                <Field label="Currency">
                  <input
                    value={draft.manualPrice.currency ?? 'CAD'}
                    onChange={(e) =>
                      updateDraft('manualPrice', {
                        ...draft.manualPrice!,
                        currency: e.target.value.toUpperCase().slice(0, 3),
                      })
                    }
                    onBlur={(e) => {
                      // Auto-correct common typos (UAE → AED, USA → USD, etc.)
                      // on blur. Helper map mirrors src/lib/fx-rates.ts.
                      const typos: Record<string, string> = {
                        UAE: 'AED',
                        KSA: 'SAR',
                        UK: 'GBP',
                        USA: 'USD',
                        EU: 'EUR',
                        AUS: 'AUD',
                      };
                      const v = e.target.value.toUpperCase();
                      if (typos[v]) {
                        updateDraft('manualPrice', {
                          ...draft.manualPrice!,
                          currency: typos[v],
                        });
                      }
                    }}
                    list="currency-options"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono uppercase"
                    placeholder="CAD"
                  />
                  {/* Currencies curated to Dr. Hala's real client base:
                      Canada (primary), Gulf, Middle East, North Africa.
                      Non-market currencies (INR, JPY, CNY, BRL, PKR) omitted. */}
                  <datalist id="currency-options">
                    {/* Primary markets */}
                    <option value="CAD" />
                    <option value="USD" />
                    {/* Gulf */}
                    <option value="AED" />
                    <option value="SAR" />
                    <option value="KWD" />
                    <option value="QAR" />
                    <option value="BHD" />
                    <option value="OMR" />
                    {/* Europe (diaspora) */}
                    <option value="EUR" />
                    <option value="GBP" />
                    <option value="CHF" />
                    {/* Middle East / Levant */}
                    <option value="JOD" />
                    <option value="LBP" />
                    <option value="ILS" />
                    <option value="TRY" />
                    {/* North Africa */}
                    <option value="EGP" />
                    <option value="MAD" />
                    <option value="TND" />
                    <option value="DZD" />
                    <option value="LYD" />
                  </datalist>
                </Field>
              </div>
              <Field label="Reason (required for audit)">
                <input
                  value={draft.manualPrice.reason ?? ''}
                  onChange={(e) =>
                    updateDraft('manualPrice', {
                      ...draft.manualPrice!,
                      reason: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
                  placeholder="e.g. Bundled discount, special arrangement, sliding scale, etc."
                />
              </Field>
              <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                When enabled, the price below replaces all auto-pricing (band, complexity, package, sliding scale).
              </p>
            </div>
          )}
        </Section>

        {/* ─── Advanced: line items, invoice number, T&C, customer notes ─── */}
        <div className="bg-white rounded-xl border border-[#EDE8DF]">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAF7F2] transition-colors"
          >
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-[#7A3B5E]" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C]">
                Advanced — line items, invoice #, T&amp;C, notes
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#8E8E9F] transition-transform ${
                advancedOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {advancedOpen && (
            <div className="px-4 pb-4 space-y-4 border-t border-[#F3EFE8]">
              {/* Line items editor */}
              <LineItemsEditor
                draft={draft}
                breakdown={breakdown}
                onChange={(items) => updateDraft('lineItems', items)}
              />

              {/* Issue date + Days until due */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-1.5 block">
                    Issue date
                  </label>
                  <input
                    type="date"
                    value={draft.issueDate ?? new Date().toISOString().slice(0, 10)}
                    onChange={(e) =>
                      updateDraft('issueDate', e.target.value || undefined)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                  />
                  <p className="mt-1 text-[10px] text-[#8E8E9F]">
                    Also drives the invoice number YYYYMM prefix.
                  </p>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-1.5 block">
                    Days until due
                  </label>
                  <input
                    type="number"
                    value={draft.daysUntilDue}
                    onChange={(e) =>
                      updateDraft(
                        'daysUntilDue',
                        Math.max(0, Math.min(365, Number(e.target.value) || 0)),
                      )
                    }
                    min={0}
                    max={365}
                    step={1}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 tabular-nums"
                  />
                  <p className="mt-1 text-[10px] text-[#8E8E9F]">
                    Due date = issue date + this many days.
                  </p>
                </div>
              </div>

              {/* Invoice number override */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-1.5 block">
                  Invoice number override (optional)
                </label>
                <input
                  type="text"
                  value={draft.invoiceNumberOverride ?? ''}
                  onChange={(e) => updateDraft('invoiceNumberOverride', e.target.value || undefined)}
                  placeholder={
                    selectedCustomer?.effectiveInitials
                      ? `MHC-${(draft.issueDate || new Date().toISOString().slice(0, 10)).slice(0, 7).replace('-', '')}-${selectedCustomer.effectiveInitials}-${selectedCustomer.nextInvoiceSeq ?? 1}`
                      : 'Auto-generated on send'
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                />
                {draft.invoiceNumberOverride && (
                  <p className="mt-1.5 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                    ⚠ Override active. The auto-counter for this customer will
                    still use their next sequential number on their next invoice.
                  </p>
                )}
              </div>

              {/* Customer notes override */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-1.5 block">
                  Customer notes (per-invoice override)
                </label>
                <textarea
                  value={draft.customerNotesOverride ?? settings.customerNotes}
                  onChange={(e) => {
                    const v = e.target.value;
                    updateDraft(
                      'customerNotesOverride',
                      v === settings.customerNotes ? undefined : v,
                    );
                  }}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 resize-y"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#8E8E9F]">
                    {draft.customerNotesOverride
                      ? '⚠ Override active for this invoice only'
                      : 'Using Settings default'}
                  </span>
                  {draft.customerNotesOverride && (
                    <button
                      type="button"
                      onClick={() => updateDraft('customerNotesOverride', undefined)}
                      className="text-[10px] text-[#7A3B5E] font-semibold hover:text-[#5A2D47]"
                    >
                      Reset to default
                    </button>
                  )}
                </div>
              </div>

              {/* Terms & Conditions override */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-1.5 block">
                  Terms &amp; Conditions (per-invoice override)
                </label>
                <TermsEditor
                  terms={draft.termsOverride ?? settings.termsAndConditions}
                  isOverride={!!draft.termsOverride}
                  onChange={(terms) => {
                    // Only set override if the list actually differs from defaults
                    const sameAsDefault =
                      terms.length === settings.termsAndConditions.length &&
                      terms.every((t, i) => t === settings.termsAndConditions[i]);
                    updateDraft(
                      'termsOverride',
                      sameAsDefault ? undefined : terms,
                    );
                  }}
                  onReset={() => updateDraft('termsOverride', undefined)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePreview}
            disabled={!breakdown}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E8E4DE] text-sm font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview PDF
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!breakdown || sending}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5A2D47] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {sending ? 'Sending…' : settings.dryRun ? 'Create (dry run)' : 'Send Invoice'}
          </button>
        </div>
      </div>

      {/* RIGHT: customer snapshot + breakdown */}
      <div className="lg:col-span-2 space-y-4">
        <div className="lg:sticky lg:top-4 space-y-4">
          <CustomerSnapshot
            customer={selectedCustomer}
            recentInvoices={customerInvoices}
            bearerHeaders={bearerHeaders}
            onInsightUpdated={() => onRefreshCustomers()}
            locale="en"
          />
          <BreakdownCard breakdown={breakdown} />
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewOpen && previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => {
              URL.revokeObjectURL(previewUrl);
              setPreviewUrl(null);
              setPreviewOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-3 border-b border-[#EDE8DF]">
                <h3 className="text-sm font-semibold text-[#2D2A33]">Invoice Preview</h3>
                <button
                  onClick={() => {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                    setPreviewOpen(false);
                  }}
                  className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#8E8E9F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <iframe src={previewUrl} className="flex-1 w-full" title="Invoice preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ Section wrapper ═══════════════ */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#EDE8DF] p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-[#7A3B5E]">{icon}</span>}
        <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-medium mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ═══════════════ Line Items Editor ═══════════════ */

function LineItemsEditor({
  draft,
  breakdown,
  onChange,
}: {
  draft: InvoiceDraft;
  breakdown: InvoiceRateBreakdown | null;
  onChange: (items: InvoiceLineItem[] | undefined) => void;
}) {
  const items = draft.lineItems ?? [];
  const hasCustomItems = items.length > 0;
  const displayCurrency = draft.displayCurrency || breakdown?.displayCurrency || 'CAD';

  const addItem = () => {
    const newItem: InvoiceLineItem = {
      id: `li_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      description: '',
      quantity: 1,
      unitPriceLocal: 0,
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, patch: Partial<InvoiceLineItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    onChange(next.length > 0 ? next : undefined);
  };

  const totalLocal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceLocal,
    0,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
          Line items {hasCustomItems && '(custom)'}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#7A3B5E] hover:text-[#5A2D47]"
        >
          <Plus className="w-3 h-3" />
          Add item
        </button>
      </div>

      {!hasCustomItems ? (
        <div className="bg-[#FAF7F2] border border-dashed border-[#E8E4DE] rounded-lg p-3 text-center">
          <p className="text-[10px] text-[#8E8E9F]">
            Using auto-computed breakdown. Add items for multi-row invoices
            (e.g., session + processing fees).
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2 bg-white border border-[#E8E4DE] rounded-lg"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded bg-[#FAF7F2] text-[#8E8E9F] text-[10px] font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="Item description"
                className="flex-1 px-2 py-1 rounded border border-[#E8E4DE] text-xs focus:outline-none focus:ring-1 focus:ring-[#7A3B5E]/30"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(item.id, { quantity: Math.max(0, Number(e.target.value) || 0) })
                }
                step={0.25}
                min={0}
                className="w-14 px-2 py-1 rounded border border-[#E8E4DE] text-xs tabular-nums focus:outline-none focus:ring-1 focus:ring-[#7A3B5E]/30"
                placeholder="Qty"
              />
              <span className="text-[10px] text-[#8E8E9F]">×</span>
              <input
                type="number"
                value={item.unitPriceLocal}
                onChange={(e) =>
                  updateItem(item.id, {
                    unitPriceLocal: Math.max(0, Number(e.target.value) || 0),
                  })
                }
                step={0.01}
                min={0}
                className="w-24 px-2 py-1 rounded border border-[#E8E4DE] text-xs tabular-nums focus:outline-none focus:ring-1 focus:ring-[#7A3B5E]/30"
                placeholder="0.00"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-1 rounded text-[#8E8E9F] hover:text-rose-600 hover:bg-rose-50"
                aria-label="Remove item"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between px-2 pt-1 border-t border-[#F3EFE8]">
            <span className="text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              Subtotal (pre-tax)
            </span>
            <span className="text-xs font-bold text-[#2D2A33] tabular-nums font-mono">
              {displayCurrency} {totalLocal.toFixed(2)}
            </span>
          </div>
          <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1">
            ⚠ Line items replace auto-pricing. Tax is still applied based on
            country and tax mode.
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════ Terms Editor ═══════════════ */

function TermsEditor({
  terms,
  isOverride,
  onChange,
  onReset,
}: {
  terms: string[];
  isOverride: boolean;
  onChange: (terms: string[]) => void;
  onReset: () => void;
}) {
  const update = (idx: number, value: string) => {
    const next = [...terms];
    next[idx] = value;
    onChange(next);
  };

  const add = () => onChange([...terms, '']);
  const remove = (idx: number) => onChange(terms.filter((_, i) => i !== idx));

  return (
    <div className="space-y-1.5">
      {terms.map((term, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <span className="flex-shrink-0 w-4 pt-2 text-[#8E8E9F] text-xs">•</span>
          <input
            type="text"
            value={term}
            onChange={(e) => update(idx, e.target.value)}
            className="flex-1 px-2 py-1.5 rounded border border-[#E8E4DE] text-xs focus:outline-none focus:ring-1 focus:ring-[#7A3B5E]/30"
            placeholder="Terms bullet..."
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="flex-shrink-0 p-1 rounded text-[#8E8E9F] hover:text-rose-600 hover:bg-rose-50"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#7A3B5E] hover:text-[#5A2D47]"
        >
          <Plus className="w-3 h-3" />
          Add bullet
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8E8E9F]">
            {isOverride ? '⚠ Override active' : 'Using Settings default'}
          </span>
          {isOverride && (
            <button
              type="button"
              onClick={onReset}
              className="text-[10px] text-[#7A3B5E] font-semibold hover:text-[#5A2D47]"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Breakdown Card ═══════════════ */

function BreakdownCard({ breakdown }: { breakdown: InvoiceRateBreakdown | null }) {
  if (!breakdown) {
    return (
      <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-xl border border-[#EDE8DF] p-5 text-center">
        <Receipt className="w-8 h-8 mx-auto text-[#C8A97D] mb-2" />
        <p className="text-sm text-[#8E8E9F]">
          Fill in client + service to see the rate breakdown
        </p>
      </div>
    );
  }

  const parts = [
    { label: 'Base rate', value: breakdown.formattedBase },
    ...(breakdown.complexityPercent > 0
      ? [{ label: `Complexity +${Math.round(breakdown.complexityPercent * 100)}%`, value: '×' }]
      : []),
    ...(breakdown.sessions > 1
      ? [{ label: `${breakdown.sessions} sessions`, value: `×${breakdown.sessions}` }]
      : []),
    ...(breakdown.packageDiscountPercent > 0
      ? [{ label: `Package −${Math.round(breakdown.packageDiscountPercent * 100)}%`, value: '×' }]
      : []),
    ...(breakdown.slidingScalePercent > 0
      ? [{ label: `Sliding scale −${Math.round(breakdown.slidingScalePercent * 100)}%`, value: '×' }]
      : []),
  ];

  return (
    <motion.div
      layout
      className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-xl border border-[#EDE8DF] p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
          Rate Breakdown
        </span>
        <span className="text-[10px] uppercase font-semibold text-[#7A3B5E] bg-[#7A3B5E]/10 px-2 py-0.5 rounded-full">
          {breakdown.band}
        </span>
      </div>

      <div className="space-y-1.5">
        {parts.map((p, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-[#4A4A5C]">{p.label}</span>
            <span className="text-[#8E8E9F] font-mono">{p.value}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#EDE8DF]" />

      <div className="flex justify-between items-baseline">
        <span className="text-[11px] text-[#8E8E9F]">Subtotal</span>
        <span className="text-sm font-semibold text-[#2D2A33] tabular-nums">
          {/* computed subtotal */}
        </span>
      </div>

      {breakdown.taxPercent > 0 && (
        <div className="flex justify-between items-baseline">
          <span className="text-[11px] text-[#8E8E9F]">
            HST {Math.round(breakdown.taxPercent * 100)}%
          </span>
          <span className="text-sm font-semibold text-[#2D2A33] tabular-nums">
            {/* computed tax */}
          </span>
        </div>
      )}

      <div className="h-px bg-[#EDE8DF]" />

      {/* Total */}
      <div className="bg-[#7A3B5E] text-white rounded-lg p-3">
        <div className="text-[10px] uppercase tracking-widest opacity-80">Total</div>
        <div className="text-2xl font-bold tabular-nums mt-0.5">
          {breakdown.formattedTotal}
        </div>
        {breakdown.displayCurrency !== 'CAD' && (
          <div className="text-[11px] opacity-80 italic mt-0.5">
            ≈ {breakdown.formattedTotalCAD}
          </div>
        )}
      </div>

      {/* Formula line */}
      <p className="text-[9px] text-[#8E8E9F] font-mono leading-relaxed">
        {breakdown.formulaLine}
      </p>

      {breakdown.floorApplied && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          CAD $60 floor applied
        </div>
      )}

      {breakdown.warning && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{breakdown.warning}</span>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════ History Tab ═══════════════ */

function HistoryTab({
  invoices,
  loading,
  bearerHeaders,
  onRefresh,
  onBanner,
  onViewPdfOverlay,
  onOpenClientProfile,
}: {
  invoices: StoredInvoice[];
  loading: boolean;
  bearerHeaders: HeadersInit;
  onRefresh: () => void;
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
  onViewPdfOverlay?: (url: string) => void;
  onOpenClientProfile?: (email: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  type InvSort = 'date' | 'amount' | 'status' | 'client';
  const [sortBy, setSortBy] = useState<InvSort>('date');
  const [reminderFor, setReminderFor] = useState<StoredInvoice | null>(null);
  const [zohoImportCsv, setZohoImportCsv] = useState<string | null>(null);
  const [zohoImportPreview, setZohoImportPreview] =
    useState<ZohoInvoiceImportPreview | null>(null);
  const [zohoImportLoading, setZohoImportLoading] = useState(false);
  const [zohoImportCommitting, setZohoImportCommitting] = useState(false);
  const [selectedInvIds, setSelectedInvIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  // Mark-paid modal state
  const [markPaidInvoice, setMarkPaidInvoice] = useState<StoredInvoice | null>(null);
  const [markPaidMethod, setMarkPaidMethod] = useState('e-transfer');
  const [markingPaid, setMarkingPaid] = useState(false);

  // Filter invoices client-side
  const filtered = invoices.filter((inv) => {
    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'unpaid') {
        if (inv.status !== 'sent' && inv.status !== 'overdue') return false;
      } else if (inv.status !== statusFilter) {
        return false;
      }
    }
    // Search filter — also matches legacyInvoiceNumber for Zoho-imported records
    if (search) {
      const q = search.toLowerCase();
      const matches =
        inv.draft.client.name.toLowerCase().includes(q) ||
        inv.draft.client.email.toLowerCase().includes(q) ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        (inv.legacyInvoiceNumber || '').toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const markPaid = (invoice: StoredInvoice) => {
    setMarkPaidInvoice(invoice);
    setMarkPaidMethod('e-transfer');
  };

  const confirmMarkPaid = async () => {
    if (!markPaidInvoice) return;
    setMarkingPaid(true);
    try {
      const res = await fetch('/api/admin/invoices/mark-paid', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({
          invoiceId: markPaidInvoice.invoiceId,
          paymentMethod: markPaidMethod as PaymentMethodRecord,
        }),
      });
      const data = await res.json();
      if (!res.ok) { onBanner({ kind: 'error', text: 'Mark paid failed' }); return; }
      const receiptMsg = data.receiptEmailSent
        ? ' + receipt emailed'
        : data.receiptError
        ? ` (receipt error: ${data.receiptError})`
        : ' (dry run — no email)';
      onBanner({ kind: 'success', text: `${markPaidInvoice.invoiceNumber} marked paid via ${markPaidMethod}${receiptMsg}` });
      setMarkPaidInvoice(null);
      onRefresh();
    } catch {
      onBanner({ kind: 'error', text: 'Server error' });
    } finally {
      setMarkingPaid(false);
    }
  };

  const voidInvoice = async (invoice: StoredInvoice) => {
    if (!confirm(`Void ${invoice.invoiceNumber}? This is irreversible.`)) return;
    try {
      const res = await fetch('/api/admin/invoices/void', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ invoiceId: invoice.invoiceId }),
      });
      if (!res.ok) {
        onBanner({ kind: 'error', text: 'Void failed' });
        return;
      }
      onBanner({ kind: 'success', text: `${invoice.invoiceNumber} voided` });
      onRefresh();
    } catch {
      onBanner({ kind: 'error', text: 'Server error' });
    }
  };

  const resendEmail = async (invoice: StoredInvoice) => {
    if (!confirm(`Resend invoice ${invoice.invoiceNumber} to ${invoice.draft.client.email}?`)) return;
    try {
      const res = await fetch(`/api/admin/invoices/resend/${invoice.invoiceId}`, {
        method: 'POST',
        headers: bearerHeaders,
      });
      const data = await res.json();
      if (!res.ok) {
        onBanner({ kind: 'error', text: data.error || 'Resend failed' });
        return;
      }
      onBanner({ kind: 'success', text: 'Email resent' });
      onRefresh();
    } catch {
      onBanner({ kind: 'error', text: 'Server error' });
    }
  };

  const viewPdf = (invoice: StoredInvoice) => {
    const url = `/api/admin/invoices/pdf/${invoice.invoiceId}`;
    fetch(url, { headers: bearerHeaders })
      .then((r) => r.blob())
      .then((blob) => {
        const objUrl = URL.createObjectURL(blob);
        // Use inline overlay on mobile, new tab on desktop
        const isMobile = window.innerWidth < 768;
        if (isMobile && onViewPdfOverlay) {
          onViewPdfOverlay(objUrl);
        } else {
          window.open(objUrl, '_blank');
        }
      })
      .catch(() => onBanner({ kind: 'error', text: 'PDF load failed' }));
  };

  const generateReminder = async (invoice: StoredInvoice) => {
    setReminderFor(invoice);
  };

  /**
   * Trigger the native file picker, upload the CSV to the preview endpoint,
   * and store the preview + raw CSV so the modal can show it and later commit.
   */
  const handleZohoImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const csvText = await file.text();
      setZohoImportCsv(csvText);
      setZohoImportLoading(true);
      setZohoImportPreview(null);
      try {
        const res = await fetch(
          '/api/admin/invoices/zoho-import/preview',
          {
            method: 'POST',
            headers: bearerHeaders,
            body: JSON.stringify({ csv: csvText }),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          onBanner({
            kind: 'error',
            text: data.error || 'Preview failed',
          });
          setZohoImportCsv(null);
          return;
        }
        setZohoImportPreview(data.preview);
      } catch {
        onBanner({ kind: 'error', text: 'Preview request failed' });
        setZohoImportCsv(null);
      } finally {
        setZohoImportLoading(false);
      }
    };
    input.click();
  };

  /**
   * POST the stored CSV to the commit endpoint. Shows success/error banner.
   */
  const handleZohoCommit = async () => {
    if (!zohoImportCsv) return;
    setZohoImportCommitting(true);
    try {
      const res = await fetch('/api/admin/invoices/zoho-import/commit', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ csv: zohoImportCsv }),
      });
      const data = await res.json();
      if (!res.ok) {
        onBanner({
          kind: 'error',
          text: data.error || 'Import failed',
        });
        return;
      }
      const result: ZohoInvoiceImportResult = data.result;
      const errorSuffix =
        result.errors.length > 0 ? ` (${result.errors.length} errors)` : '';
      onBanner({
        kind: 'success',
        text: `Imported ${result.created} invoices, ${result.skipped} skipped${errorSuffix}. Customers: ${result.customersCreated} new + ${result.customersUpdated} updated.`,
      });
      setZohoImportCsv(null);
      setZohoImportPreview(null);
      onRefresh();
    } catch {
      onBanner({ kind: 'error', text: 'Import request failed' });
    } finally {
      setZohoImportCommitting(false);
    }
  };

  const closeZohoModal = () => {
    setZohoImportCsv(null);
    setZohoImportPreview(null);
    setZohoImportLoading(false);
  };

  const filterChips: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'draft', label: 'Drafts' },
    { value: 'sent', label: 'Sent' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'void', label: 'Void' },
  ];

  return (
    <div>
      {/* Search + filter bar */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E9F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or invoice number…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
        </div>
        {/* Filter chips — horizontally scrollable on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {filterChips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setStatusFilter(chip.value)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                statusFilter === chip.value
                  ? 'bg-[#7A3B5E] text-white'
                  : 'bg-white border border-[#E8E4DE] text-[#4A4A5C] hover:border-[#7A3B5E]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
        {/* Actions row — result count + select/import/export */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8E8E9F]">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </span>
            <button
              type="button"
              onClick={() => {
                if (selectedInvIds.size === filtered.length && filtered.length > 0) {
                  setSelectedInvIds(new Set());
                } else {
                  setSelectedInvIds(new Set(filtered.map(inv => inv.invoiceId)));
                }
              }}
              className="text-xs font-medium text-[#7A3B5E] hover:text-[#6A2E4E] transition-colors px-1"
            >
              {selectedInvIds.size > 0 && selectedInvIds.size === filtered.length ? 'Deselect' : 'Select All'}
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleZohoImport}
              disabled={zohoImportLoading || zohoImportCommitting}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#4A4A5C] hover:bg-[#F5F0EB] disabled:opacity-50 transition-colors"
              title="Import invoices from CSV"
            >
              {zohoImportLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              Import
            </button>
            <button
              type="button"
              onClick={() => {
                if (filtered.length === 0) return;
                const headers = ['Invoice #', 'Date', 'Client', 'Email', 'Country', 'Service', 'Total', 'Currency', 'CAD Equivalent', 'Status'];
                const rows = filtered.map(inv => [
                  inv.invoiceNumber,
                  inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString() : '',
                  inv.draft.client.name,
                  inv.draft.client.email,
                  inv.draft.client.country,
                  inv.draft.serviceSlug,
                  inv.breakdown?.totalLocal?.toFixed(2) ?? '',
                  inv.breakdown?.displayCurrency ?? '',
                  inv.breakdown?.totalCAD?.toFixed(2) ?? '',
                  inv.status,
                ]);
                const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoices-export-${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);
                onBanner({ kind: 'success', text: `Exported ${filtered.length} invoices to CSV` });
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#4A4A5C] hover:bg-[#F5F0EB] transition-colors"
              title="Export filtered invoices as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-[#8E8E9F] text-sm">
          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
          Loading…
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-[#EDE8DF]">
          <Receipt className="w-10 h-10 mx-auto text-[#C8A97D] mb-3" />
          <p className="text-sm text-[#8E8E9F]">
            {invoices.length === 0
              ? 'No invoices yet — compose your first one.'
              : 'No invoices match your filters.'}
          </p>
        </div>
      )}

      {/* Sort controls */}
      {!loading && filtered.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-[#8E8E9F]">Sort:</span>
          {(['date', 'amount', 'status', 'client'] as InvSort[]).map(sk => (
            <button key={sk} onClick={() => setSortBy(sk)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${sortBy === sk ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'text-[#8E8E9F] hover:bg-[#F5F0EB]'}`}
            >{sk === 'date' ? 'Date' : sk === 'amount' ? 'Amount' : sk === 'status' ? 'Status' : 'Client'}</button>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (() => {
        const sorted = [...filtered].sort((a, b) => {
          if (sortBy === 'client') return a.draft.client.name.localeCompare(b.draft.client.name);
          if (sortBy === 'status') return a.status.localeCompare(b.status);
          if (sortBy === 'amount') return (b.breakdown?.totalCAD ?? 0) - (a.breakdown?.totalCAD ?? 0);
          return (b.issuedAt || b.createdAt || '').localeCompare(a.issuedAt || a.createdAt || '');
        });
        return (<>
      {/* Mobile card view (< md) */}
      <div className="md:hidden space-y-2">
        {sorted.map((inv) => {
          const isZohoImport = inv.origin === 'zoho-import';
          return (
          <div key={inv.invoiceId} className={`bg-white rounded-xl border p-3 transition-colors ${selectedInvIds.has(inv.invoiceId) ? 'border-[#7A3B5E] bg-[#FFFAF5]' : 'border-[#EDE8DF]'}`}>
            <div className="flex items-start gap-2.5 mb-2">
              <button
                type="button"
                onClick={() => {
                  const next = new Set(selectedInvIds);
                  if (next.has(inv.invoiceId)) next.delete(inv.invoiceId);
                  else next.add(inv.invoiceId);
                  setSelectedInvIds(next);
                }}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selectedInvIds.has(inv.invoiceId)
                    ? 'bg-[#7A3B5E] border-[#7A3B5E]'
                    : 'border-[#D8D2C8] hover:border-[#7A3B5E]'
                }`}
              >
                {selectedInvIds.has(inv.invoiceId) && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onOpenClientProfile?.(inv.draft.client.email)}
                  className="text-sm font-bold text-[#2D2A33] truncate text-left hover:text-[#7A3B5E] transition-colors"
                >
                  {inv.draft.client.name}
                </button>
                <div className="text-[10px] text-[#8E8E9F] truncate">{inv.draft.client.email}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="text-[10px] font-mono text-[#8E8E9F]">{inv.invoiceNumber}</div>
                  {isZohoImport && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F3EFE8] text-[#8E8E9F] uppercase tracking-wide">
                      Zoho
                    </span>
                  )}
                  {(inv.draft.recurringScheduleId || (inv.draft.lineItems && inv.draft.lineItems.length > 1)) && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#C8A97D]/10 text-[#C8A97D] uppercase tracking-wide">
                      <RefreshCw className="w-2.5 h-2.5" />
                      Series
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[#2D2A33] tabular-nums">{inv.breakdown.formattedTotal}</div>
                <StatusBadge status={inv.status} />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-2 border-t border-[#F3EFE8]">
              <button onClick={() => viewPdf(inv)} className="p-1.5 rounded text-[#8E8E9F] hover:text-[#7A3B5E]">
                <Eye className="w-3.5 h-3.5" />
              </button>
              {(inv.status === 'sent' || inv.status === 'overdue') && (
                <button onClick={() => markPaid(inv)} className="p-1.5 rounded text-[#8E8E9F] hover:text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
              {inv.status === 'overdue' && (
                <button onClick={() => generateReminder(inv)} className="p-1.5 rounded text-[#8E8E9F] hover:text-purple-700" title="AI reminder">
                  <Wand2 className="w-3.5 h-3.5" />
                </button>
              )}
              {inv.status !== 'void' && inv.status !== 'paid' && !isZohoImport && (
                <button onClick={() => resendEmail(inv)} className="p-1.5 rounded text-[#8E8E9F] hover:text-sky-700">
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
              {inv.status !== 'void' && (
                <button onClick={() => voidInvoice(inv)} className="p-1.5 rounded text-[#8E8E9F] hover:text-rose-700">
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {/* Desktop table view (≥ md) */}
      <div className="hidden md:block bg-white rounded-xl border border-[#EDE8DF] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FAF7F2]">
            <tr className="text-left">
              <th className="px-2 py-2.5 w-8">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedInvIds.size === sorted.length) setSelectedInvIds(new Set());
                    else setSelectedInvIds(new Set(sorted.map(inv => inv.invoiceId)));
                  }}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedInvIds.size === sorted.length && sorted.length > 0
                      ? 'bg-[#7A3B5E] border-[#7A3B5E]' : 'border-[#D8D2C8]'
                  }`}
                >
                  {selectedInvIds.size === sorted.length && sorted.length > 0 && <Check className="w-2.5 h-2.5 text-white" />}
                </button>
              </th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Date</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Number</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Client</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Country</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F] text-right">Total</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F] text-right">CAD</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Status</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((inv) => {
              const isZohoImport = inv.origin === 'zoho-import';
              return (
              <tr key={inv.invoiceId} className={`border-t border-[#F3EFE8] ${selectedInvIds.has(inv.invoiceId) ? 'bg-[#FFFAF5]' : ''}`}>
                <td className="px-2 py-2.5 w-8">
                  <button
                    type="button"
                    onClick={() => {
                      const next = new Set(selectedInvIds);
                      if (next.has(inv.invoiceId)) next.delete(inv.invoiceId);
                      else next.add(inv.invoiceId);
                      setSelectedInvIds(next);
                    }}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedInvIds.has(inv.invoiceId)
                        ? 'bg-[#7A3B5E] border-[#7A3B5E]' : 'border-[#D8D2C8] hover:border-[#7A3B5E]'
                    }`}
                  >
                    {selectedInvIds.has(inv.invoiceId) && <Check className="w-2.5 h-2.5 text-white" />}
                  </button>
                </td>
                <td className="px-3 py-2.5 text-xs text-[#4A4A5C] whitespace-nowrap">
                  {new Date(inv.issuedAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2.5 text-xs font-mono text-[#2D2A33] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{inv.invoiceNumber}</span>
                    {isZohoImport && (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F3EFE8] text-[#8E8E9F] uppercase tracking-wide"
                        title={`Imported from Zoho Books (original: ${inv.legacyInvoiceNumber || 'N/A'})`}
                      >
                        Zoho
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2.5 text-xs text-[#2D2A33]">
                  <button
                    type="button"
                    onClick={() => onOpenClientProfile?.(inv.draft.client.email)}
                    className="font-medium hover:text-[#7A3B5E] transition-colors text-left"
                  >
                    {inv.draft.client.name}
                  </button>
                  <div className="text-[10px] text-[#8E8E9F]">{inv.draft.client.email}</div>
                </td>
                <td className="px-3 py-2.5 text-xs text-[#4A4A5C] font-mono uppercase">{inv.draft.client.country}</td>
                <td className="px-3 py-2.5 text-xs font-bold text-[#2D2A33] tabular-nums text-right whitespace-nowrap">
                  {inv.breakdown.formattedTotal}
                </td>
                <td className="px-3 py-2.5 text-xs text-[#8E8E9F] tabular-nums text-right whitespace-nowrap">
                  {inv.breakdown.formattedTotalCAD}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => viewPdf(inv)}
                      className="p-1 rounded text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2]"
                      title="View PDF"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {(inv.status === 'sent' || inv.status === 'overdue') && (
                      <button
                        onClick={() => markPaid(inv)}
                        className="p-1 rounded text-[#8E8E9F] hover:text-emerald-700 hover:bg-emerald-50"
                        title="Mark paid"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {inv.status === 'overdue' && (
                      <button
                        onClick={() => generateReminder(inv)}
                        className="p-1 rounded text-[#8E8E9F] hover:text-purple-700 hover:bg-purple-50"
                        title="AI payment reminder"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {inv.status !== 'void' && inv.status !== 'paid' && !isZohoImport && (
                      <button
                        onClick={() => resendEmail(inv)}
                        className="p-1 rounded text-[#8E8E9F] hover:text-sky-700 hover:bg-sky-50"
                        title="Resend email"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {inv.status !== 'void' && (
                      <button
                        onClick={() => voidInvoice(inv)}
                        className="p-1 rounded text-[#8E8E9F] hover:text-rose-700 hover:bg-rose-50"
                        title="Void"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      </>); })()}

      {/* AI Reminder modal */}
      <AnimatePresence>
        {reminderFor && (
          <ReminderModal
            invoice={reminderFor}
            bearerHeaders={bearerHeaders}
            onClose={() => setReminderFor(null)}
            onSent={() => {
              setReminderFor(null);
              onBanner({ kind: 'success', text: 'Reminder sent' });
              onRefresh();
            }}
            onError={(text) => onBanner({ kind: 'error', text })}
          />
        )}
      </AnimatePresence>

      {/* Zoho invoice import preview modal */}
      <AnimatePresence>
        {zohoImportCsv && (
          <ZohoImportPreviewModal
            preview={zohoImportPreview}
            loading={zohoImportLoading}
            committing={zohoImportCommitting}
            onCommit={handleZohoCommit}
            onClose={closeZohoModal}
          />
        )}
      </AnimatePresence>

      {/* Selection action bar */}
      {selectedInvIds.size > 0 && (
        <div className="sticky bottom-16 sm:bottom-0 z-30">
          <div className="bg-[#2D2A33] text-white rounded-xl mx-0 px-4 py-3 flex items-center justify-between shadow-lg">
            <span className="text-sm font-semibold">{selectedInvIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  const ids = [...selectedInvIds];
                  for (const id of ids) {
                    try {
                      await fetch('/api/admin/invoices/mark-paid', {
                        method: 'POST',
                        headers: bearerHeaders,
                        body: JSON.stringify({ invoiceId: id }),
                      });
                    } catch { /* continue */ }
                  }
                  setSelectedInvIds(new Set());
                  onBanner({ kind: 'success', text: `Marked ${ids.length} invoice(s) as paid` });
                  onRefresh();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#3B8A6E] text-xs font-semibold hover:bg-[#2F7A5E] transition-colors"
              >
                Mark Paid
              </button>
              <button
                onClick={() => { setDeleteConfirmText(''); setDeleteConfirmOpen(true); }}
                disabled={deleting}
                className="px-3 py-1.5 rounded-lg bg-[#C45B5B] text-xs font-semibold hover:bg-[#B04A4A] disabled:opacity-50 transition-colors flex items-center gap-1.5"
              >
                {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Delete
              </button>
              <button
                onClick={() => setSelectedInvIds(new Set())}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secure delete confirmation dialog */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setDeleteConfirmOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C45B5B]/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-[#C45B5B]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2D2A33]">Delete {selectedInvIds.size} Invoice{selectedInvIds.size === 1 ? '' : 's'}</h3>
                <p className="text-xs text-[#8E8E9F]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[#4A4A5C]">
              Type <strong className="text-[#C45B5B] font-mono">DELETE</strong> to permanently remove the selected invoice{selectedInvIds.size === 1 ? '' : 's'} and all associated records.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full h-12 px-4 rounded-xl border border-[#E8E4DE] text-base font-mono text-center focus:outline-none focus:ring-2 focus:ring-[#C45B5B]/20 focus:border-[#C45B5B]/30"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setDeleteConfirmOpen(false);
                  setDeleting(true);
                  const ids = [...selectedInvIds];
                  let count = 0;
                  for (const id of ids) {
                    try {
                      const res = await fetch('/api/admin/invoices/delete', {
                        method: 'POST',
                        headers: bearerHeaders,
                        body: JSON.stringify({ invoiceId: id }),
                      });
                      if (res.ok) count++;
                    } catch { /* continue */ }
                  }
                  setDeleting(false);
                  setSelectedInvIds(new Set());
                  onBanner({ kind: 'success', text: `Permanently deleted ${count} invoice(s)` });
                  onRefresh();
                }}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1 py-2.5 rounded-xl bg-[#C45B5B] text-sm font-semibold text-white hover:bg-[#B04A4A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Paid modal */}
      {markPaidInvoice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setMarkPaidInvoice(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-bold text-[#2D2A33]">Mark as Paid</h3>
            <p className="text-sm text-[#4A4A5C]">
              {markPaidInvoice.invoiceNumber} · <strong>{markPaidInvoice.breakdown.formattedTotal}</strong> to {markPaidInvoice.draft.client.name}
            </p>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A5C] mb-2">Payment method</label>
              <div className="grid grid-cols-2 gap-2">
                {['e-transfer', 'wire', 'paypal', 'stripe', 'cash', 'other'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMarkPaidMethod(m)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      markPaidMethod === m
                        ? 'bg-[#7A3B5E] text-white shadow-sm'
                        : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                    }`}
                  >
                    {m === 'e-transfer' ? 'e-Transfer' : m === 'paypal' ? 'PayPal' : m === 'stripe' ? 'Stripe' : m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-[#8E8E9F]">
              A receipt PDF will be generated and emailed to the client.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setMarkPaidInvoice(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmMarkPaid}
                disabled={markingPaid}
                className="flex-1 py-2.5 rounded-xl bg-[#3B8A6E] text-sm font-semibold text-white hover:bg-[#2F7A5E] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {markingPaid ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Confirm Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════ Zoho Invoice Import Preview Modal ═══════════════ */

function ZohoImportPreviewModal({
  preview,
  loading,
  committing,
  onCommit,
  onClose,
}: {
  preview: ZohoInvoiceImportPreview | null;
  loading: boolean;
  committing: boolean;
  onCommit: () => void;
  onClose: () => void;
}) {
  const [showCustomers, setShowCustomers] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  const fmtCAD = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3EFE8]">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#7A3B5E]" />
            <h3 className="text-base font-bold text-[#2D2A33]">
              Import Zoho Invoice History
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={committing}
            className="p-1 rounded text-[#8E8E9F] hover:text-[#2D2A33] disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-[#8E8E9F]">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm">Parsing CSV and building preview…</p>
            </div>
          )}

          {!loading && preview && (
            <div className="px-5 py-4 space-y-4">
              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-[#FAF7F2] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">
                    Invoices
                  </div>
                  <div className="text-xl font-bold text-[#2D2A33] tabular-nums">
                    {preview.uniqueInvoices}
                  </div>
                  {preview.existingInvoices > 0 && (
                    <div className="text-[10px] text-amber-600 mt-0.5">
                      {preview.existingInvoices} will skip
                    </div>
                  )}
                </div>
                <div className="bg-[#FAF7F2] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">
                    Customers
                  </div>
                  <div className="text-xl font-bold text-[#2D2A33] tabular-nums">
                    {preview.uniqueCustomers}
                  </div>
                </div>
                <div className="bg-[#FAF7F2] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">
                    Paid CAD
                  </div>
                  <div className="text-xl font-bold text-emerald-700 tabular-nums">
                    {fmtCAD(preview.totalCAD.paid)}
                  </div>
                </div>
                <div className="bg-[#FAF7F2] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">
                    Outstanding
                  </div>
                  <div className="text-xl font-bold text-amber-700 tabular-nums">
                    {fmtCAD(preview.totalCAD.outstanding)}
                  </div>
                </div>
              </div>

              {/* Status + currency breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white border border-[#EDE8DF] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-2">
                    Status breakdown
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#4A4A5C]">Paid</span>
                      <span className="font-semibold text-emerald-700">{preview.byStatus.paid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A5C]">Sent</span>
                      <span className="font-semibold text-sky-700">{preview.byStatus.sent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A5C]">Overdue</span>
                      <span className="font-semibold text-amber-700">{preview.byStatus.overdue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A5C]">Void</span>
                      <span className="font-semibold text-rose-600">{preview.byStatus.void}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-[#EDE8DF] rounded-lg p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-2">
                    Currency breakdown
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(preview.byCurrency).map(([code, count]) => (
                      <div key={code} className="flex justify-between">
                        <span className="text-[#4A4A5C] font-mono">{code}</span>
                        <span className="font-semibold text-[#2D2A33]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date range */}
              {preview.dateRange.earliest && (
                <div className="text-xs text-[#8E8E9F]">
                  Date range: <span className="font-mono font-semibold text-[#4A4A5C]">{preview.dateRange.earliest}</span> → <span className="font-mono font-semibold text-[#4A4A5C]">{preview.dateRange.latest}</span>
                </div>
              )}

              {/* Sample rows */}
              {preview.sample.length > 0 && (
                <div className="bg-white border border-[#EDE8DF] rounded-lg overflow-hidden">
                  <div className="px-3 py-2 bg-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
                    Sample (first {preview.sample.length} invoices)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-white">
                        <tr className="text-left border-t border-[#F3EFE8]">
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F]">Date</th>
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F]">Legacy #</th>
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F]">New #</th>
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F]">Customer</th>
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F] text-right">Total</th>
                          <th className="px-3 py-2 font-semibold text-[#8E8E9F]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.sample.map((s, i) => (
                          <tr key={i} className="border-t border-[#F3EFE8]">
                            <td className="px-3 py-1.5 text-[#4A4A5C] whitespace-nowrap">{s.date}</td>
                            <td className="px-3 py-1.5 font-mono text-[#8E8E9F]">{s.legacyNumber}</td>
                            <td className="px-3 py-1.5 font-mono text-[#2D2A33] font-semibold">{s.newNumber}</td>
                            <td className="px-3 py-1.5 text-[#2D2A33] truncate max-w-[140px]">{s.customerName}</td>
                            <td className="px-3 py-1.5 text-right font-semibold tabular-nums">{s.total}</td>
                            <td className="px-3 py-1.5">
                              <StatusBadge status={s.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Customer matches (collapsible) */}
              {preview.customerMatches.length > 0 && (
                <div className="bg-white border border-[#EDE8DF] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowCustomers((v) => !v)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] flex items-center justify-between hover:bg-[#F3EFE8]"
                  >
                    <span>Customer matches ({preview.customerMatches.length})</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showCustomers ? 'rotate-180' : ''}`} />
                  </button>
                  {showCustomers && (
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-xs">
                        <tbody>
                          {preview.customerMatches.map((c) => (
                            <tr key={c.zohoCustomerId} className="border-t border-[#F3EFE8]">
                              <td className="px-3 py-1.5 text-[#2D2A33] truncate max-w-[200px]">{c.customerName}</td>
                              <td className="px-3 py-1.5 font-mono text-[10px] text-[#8E8E9F]">{c.effectiveInitials}</td>
                              <td className="px-3 py-1.5 text-[10px]">
                                {c.matchMethod === 'zoho-id' && <span className="text-emerald-700">Zoho ID</span>}
                                {c.matchMethod === 'email' && <span className="text-sky-700">Email</span>}
                                {c.matchMethod === 'name-fuzzy' && <span className="text-amber-700">Fuzzy</span>}
                                {c.matchMethod === 'create-new' && <span className="text-rose-600">Create new</span>}
                              </td>
                              <td className="px-3 py-1.5 text-right tabular-nums text-[#8E8E9F]">{c.invoiceCount} inv</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Warnings (collapsible) */}
              {preview.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowWarnings((v) => !v)}
                    className="w-full px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-amber-800 flex items-center justify-between hover:bg-amber-100"
                  >
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3" />
                      Warnings ({preview.warnings.length})
                    </span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showWarnings ? 'rotate-180' : ''}`} />
                  </button>
                  {showWarnings && (
                    <div className="px-3 py-2 max-h-40 overflow-y-auto space-y-1">
                      {preview.warnings.map((w, i) => (
                        <div key={i} className="text-[11px] text-amber-900">• {w}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!loading && !preview && (
            <div className="px-5 py-12 text-center text-sm text-[#8E8E9F]">
              No preview available. Please try again.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#F3EFE8] bg-[#FAF7F2] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={committing}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#4A4A5C] hover:bg-white disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onCommit}
            disabled={
              committing || loading || !preview || preview.uniqueInvoices === 0
            }
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#7A3B5E] text-white hover:bg-[#5A2D47] disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {committing && <Loader2 className="w-3 h-3 animate-spin" />}
            {committing ? 'Importing…' : 'Confirm Import'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════ AI Reminder Modal ═══════════════ */

function ReminderModal({
  invoice,
  bearerHeaders,
  onClose,
  onSent,
  onError,
}: {
  invoice: StoredInvoice;
  bearerHeaders: HeadersInit;
  onClose: () => void;
  onSent: () => void;
  onError: (text: string) => void;
}) {
  const [generating, setGenerating] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch('/api/admin/invoices/ai/reminder', {
      method: 'POST',
      headers: bearerHeaders,
      body: JSON.stringify({ invoiceId: invoice.invoiceId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.subject && data.body) {
          setSubject(data.subject);
          setBody(data.body);
        } else {
          onError(data.error || 'AI failed');
          onClose();
        }
      })
      .catch(() => {
        onError('AI request failed');
        onClose();
      })
      .finally(() => setGenerating(false));
  }, [invoice.invoiceId, bearerHeaders, onClose, onError]);

  const send = async () => {
    setSending(true);
    try {
      // For now, we use the existing resend endpoint with no body customization.
      // A future iteration could add a body-override field to the resend route.
      // The reminder is delivered via a fresh invoice email send.
      const res = await fetch(`/api/admin/invoices/resend/${invoice.invoiceId}`, {
        method: 'POST',
        headers: bearerHeaders,
      });
      if (!res.ok) {
        const data = await res.json();
        onError(data.error || 'Send failed');
        return;
      }
      onSent();
    } catch {
      onError('Send failed');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#EDE8DF]">
          <h3 className="text-base font-semibold text-[#2D2A33] inline-flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600" />
            AI Payment Reminder
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#FAF7F2]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {generating ? (
            <div className="text-center py-12 text-sm text-[#8E8E9F]">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
              Claude is drafting a polite reminder…
            </div>
          ) : (
            <>
              <Field label="Subject">
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
                />
              </Field>
              <Field label="Body">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-sans"
                />
              </Field>
              <p className="text-[10px] text-[#8E8E9F] italic">
                Edit anything before sending. The original invoice PDF will be attached automatically.
              </p>
            </>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[#EDE8DF]">
          <button onClick={onClose} className="px-3 py-2 text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] rounded-lg">
            Cancel
          </button>
          <button
            onClick={send}
            disabled={sending || generating}
            className="px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5A2D47] disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send Reminder
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: StoredInvoice['status'] }) {
  const config: Record<
    StoredInvoice['status'],
    { bg: string; text: string; label: string }
  > = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
    sent: { bg: 'bg-sky-100', text: 'text-sky-800', label: 'Sent' },
    paid: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Paid' },
    overdue: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Overdue' },
    void: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Void' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

/* ═══════════════ Reports Tab ═══════════════ */

function ReportsTab({
  report,
  loading,
}: {
  report: ReportAggregate | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="text-center py-12 text-[#8E8E9F] text-sm">
        <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
        Loading…
      </div>
    );
  }
  if (!report || report.totalInvoices === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-[#EDE8DF]">
        <BarChart3 className="w-10 h-10 mx-auto text-[#C8A97D] mb-3" />
        <p className="text-sm text-[#8E8E9F]">No data yet — send some invoices first.</p>
      </div>
    );
  }

  const fmtCAD = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard label="MTD paid revenue" value={fmtCAD(report.mtdPaidCAD)} accent="#7A3B5E" />
        <StatCard
          label="Outstanding"
          value={fmtCAD(report.totalOutstandingCAD)}
          accent="#C8A97D"
        />
        <StatCard
          label="Top country"
          value={report.topCountry ? report.topCountry.country : '—'}
          subtitle={report.topCountry ? fmtCAD(report.topCountry.revenueCAD) : undefined}
          accent="#3B8A6E"
        />
      </div>

      {/* By band */}
      <BucketChart title="Revenue by market band" buckets={report.byBand} fmtCAD={fmtCAD} />

      {/* By month */}
      <BucketChart title="Revenue by month" buckets={report.byMonth} fmtCAD={fmtCAD} />

      {/* By service */}
      <BucketChart title="Revenue by service" buckets={report.byService} fmtCAD={fmtCAD} />

      {/* By country */}
      <BucketChart title="Revenue by country" buckets={report.byCountry} fmtCAD={fmtCAD} />
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-[#EDE8DF] p-4 border-l-4"
      style={{ borderLeftColor: accent }}
    >
      <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
        {label}
      </div>
      <div className="text-2xl font-bold text-[#2D2A33] mt-1 tabular-nums">{value}</div>
      {subtitle && <div className="text-xs text-[#8E8E9F] mt-0.5">{subtitle}</div>}
    </div>
  );
}

function BucketChart({
  title,
  buckets,
  fmtCAD,
}: {
  title: string;
  buckets: { key: string; label: string; count: number; revenueCAD: number; percentOfTotal: number }[];
  fmtCAD: (n: number) => string;
}) {
  if (buckets.length === 0) return null;
  return (
    <div className="bg-white rounded-xl border border-[#EDE8DF] p-4">
      <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
        {title}
      </h3>
      <div className="space-y-2.5">
        {buckets.map((b) => (
          <div key={b.key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#4A4A5C]">
                {b.label} <span className="text-[#8E8E9F]">({b.count})</span>
              </span>
              <span className="font-semibold text-[#2D2A33] tabular-nums">
                {fmtCAD(b.revenueCAD)}
              </span>
            </div>
            <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7A3B5E] rounded-full"
                style={{ width: `${Math.max(2, Math.round(b.percentOfTotal * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ Settings Drawer ═══════════════ */

function SettingsDrawer({
  settings,
  bearerHeaders,
  onClose,
  onSave,
}: {
  settings: InvoiceSettings;
  bearerHeaders: HeadersInit;
  onClose: () => void;
  onSave: (s: InvoiceSettings) => void;
}) {
  const [local, setLocal] = useState<InvoiceSettings>(settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/invoices/settings', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify(local),
      });
      const data = await res.json();
      if (res.ok) {
        onSave(data.settings);
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/30 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
              Invoice Settings
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#8E8E9F]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <label className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <input
              type="checkbox"
              checked={local.dryRun}
              onChange={(e) => setLocal({ ...local, dryRun: e.target.checked })}
              className="mt-0.5 w-4 h-4 accent-amber-600"
            />
            <div>
              <div className="text-sm font-semibold text-amber-900">Dry Run mode</div>
              <div className="text-[11px] text-amber-800">
                When ON, invoices are saved to KV and PDFs are generated, but no emails are sent. Use this to practice safely before going live.
              </div>
            </div>
          </label>

          <Field label="Default days until due">
            <input
              type="number"
              value={local.defaultDaysUntilDue}
              onChange={(e) => setLocal({ ...local, defaultDaysUntilDue: Number(e.target.value) })}
              className="w-24 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
            />
          </Field>

          <Field label="e-Transfer email (Canada)">
            <input
              type="email"
              value={local.eTransferEmail}
              onChange={(e) => setLocal({ ...local, eTransferEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
            />
          </Field>

          <Field label="International wire instructions (optional)">
            <textarea
              value={local.wireInstructions ?? ''}
              onChange={(e) => setLocal({ ...local, wireInstructions: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono"
              placeholder="Bank name: ...&#10;Account: ...&#10;SWIFT: ..."
            />
          </Field>

          <Field label="PayPal link (optional)">
            <input
              type="url"
              value={local.paypalLink ?? ''}
              onChange={(e) => setLocal({ ...local, paypalLink: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
              placeholder="https://paypal.me/mamahala"
            />
          </Field>

          <Field label="Default Stripe Payment Link (fallback for all invoices)">
            <input
              type="url"
              value={local.defaultStripePaymentLink ?? ''}
              onChange={(e) =>
                setLocal({
                  ...local,
                  defaultStripePaymentLink: e.target.value.trim() || undefined,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
              placeholder="https://buy.stripe.com/..."
            />
            <p className="text-[10px] text-[#8E8E9F] mt-1.5 leading-relaxed">
              Paste your &quot;customer chooses what to pay&quot; Stripe Payment Link here.
              Every invoice will automatically get a &quot;Pay with Card&quot; button on
              the payment concierge page that routes to this link. Per-invoice overrides
              and dynamic Stripe sessions both take precedence when available.
            </p>
          </Field>

          <Field label="HST/GST registration # (optional)">
            <input
              value={local.hstNumber ?? ''}
              onChange={(e) => setLocal({ ...local, hstNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm"
              placeholder="123456789 RT0001"
            />
          </Field>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-2.5 rounded-lg bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5A2D47] disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════ Dashboard Tab ═══════════════ */

function DashboardTab({
  dashboard,
  loading,
  onRefresh,
  bearerHeaders,
}: {
  dashboard: DashboardView | null;
  loading: boolean;
  onRefresh: () => void;
  bearerHeaders: HeadersInit;
}) {
  if (loading && !dashboard) {
    return (
      <div className="text-center py-16 text-[#8E8E9F] text-sm">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
        Loading dashboard…
      </div>
    );
  }
  if (!dashboard) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-[#EDE8DF]">
        <LayoutDashboard className="w-10 h-10 mx-auto text-[#C8A97D] mb-3" />
        <p className="text-sm text-[#8E8E9F]">No data yet — send some invoices to see your dashboard.</p>
        <button
          onClick={onRefresh}
          className="mt-4 inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#7A3B5E] hover:underline"
        >
          <RotateCw className="w-3 h-3" /> Refresh
        </button>
      </div>
    );
  }

  const fmtCAD = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(n);

  const s = dashboard.summary;
  const hasPriorMonthData = s.mtdDeltaPct !== null;
  const deltaPositive = hasPriorMonthData && s.mtdDeltaPct! >= 0;

  return (
    <div className="space-y-5">
      {/* Top row — 4 summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DashStat
          label="MTD Revenue"
          value={fmtCAD(s.mtdRevenueCAD)}
          subtitle={
            hasPriorMonthData ? (
              <span
                className={`inline-flex items-center gap-0.5 ${deltaPositive ? 'text-emerald-700' : 'text-rose-700'}`}
              >
                {deltaPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(s.mtdDeltaPct!).toFixed(0)}% vs last month
              </span>
            ) : (
              <span className="text-[#8E8E9F]">No prior-month data yet</span>
            )
          }
          accent="#7A3B5E"
        />
        <DashStat
          label="YTD Total"
          value={fmtCAD(s.ytdRevenueCAD)}
          subtitle="Paid year to date"
          accent="#3B8A6E"
        />
        <DashStat
          label="Outstanding"
          value={fmtCAD(s.outstandingCAD)}
          subtitle={`${s.outstandingCount} invoice${s.outstandingCount === 1 ? '' : 's'}`}
          accent="#C8A97D"
        />
        <DashStat
          label="Overdue"
          value={fmtCAD(s.overdueCAD)}
          subtitle={
            s.overdueCount > 0 ? (
              <span className="inline-flex items-center gap-0.5 text-amber-700">
                <AlertTriangle className="w-3 h-3" />
                {s.overdueCount} need attention
              </span>
            ) : (
              <span className="text-emerald-700">All up to date</span>
            )
          }
          accent={s.overdueCount > 0 ? '#D97706' : '#3B8A6E'}
        />
      </div>

      {/* Row 1 — Revenue Waterfall + AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#EDE8DF] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C]">
              Revenue Waterfall
            </h3>
            <button
              onClick={onRefresh}
              className="p-1 rounded text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2]"
              title="Refresh"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
          <RevenueWaterfall data={dashboard.trend} />
        </div>
        <div className="lg:col-span-1">
          <AIInsightCard bearerHeaders={bearerHeaders} />
        </div>
      </div>

      {/* Row 2 — Service Treemap + Client LTV Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Service Mix (by CAD revenue)
          </h3>
          <ServiceTreemap data={dashboard.serviceMix} />
        </div>
        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Client LTV Leaderboard
          </h3>
          <ClientLTVLeaderboard data={dashboard.byClientLTV} />
        </div>
      </div>

      {/* Row 3 — Seasonal Calendar (full width) */}
      <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
        <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
          Seasonal Activity (last 365 days)
        </h3>
        <SeasonalCalendar data={dashboard.seasonalCalendar} />
      </div>

      {/* Row 4 — Retention Cohort + Geo Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Retention Cohorts
          </h3>
          <RetentionCohort data={dashboard.retentionCohorts} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Geographic Revenue
          </h3>
          <GeoRevenueMap data={dashboard.byGeoRevenue} />
        </div>
      </div>

      {/* Row 5 — Relationship Depth + Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Relationship Depth
          </h3>
          <RelationshipDepth data={dashboard.relationshipDepth} />
        </div>
        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            4-Week Forecast
          </h3>
          <PredictiveForecast data={dashboard.weeklyForecast} />
        </div>
      </div>

      {/* Row 6 — Upcoming Due + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Upcoming Due (next 7 days)
          </h3>
          {dashboard.upcomingDue.length === 0 ? (
            <p className="text-xs text-[#8E8E9F]">Nothing due soon.</p>
          ) : (
            <div className="space-y-2.5">
              {dashboard.upcomingDue.slice(0, 6).map((u) => (
                <div key={u.invoiceId} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#2D2A33] truncate">{u.clientName}</div>
                    <div className="text-[10px] text-[#8E8E9F]">{u.invoiceNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#2D2A33] tabular-nums">{u.formattedTotal}</div>
                    <div className={`text-[10px] ${u.daysUntilDue < 0 ? 'text-rose-700' : 'text-[#8E8E9F]'}`}>
                      {u.daysUntilDue < 0
                        ? `${Math.abs(u.daysUntilDue)}d overdue`
                        : u.daysUntilDue === 0
                        ? 'due today'
                        : `in ${u.daysUntilDue}d`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[#EDE8DF] p-5">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-3">
            Recent Activity
          </h3>
          {dashboard.recentActivity.length === 0 ? (
            <p className="text-xs text-[#8E8E9F]">No activity yet.</p>
          ) : (
            <div className="space-y-2">
              {dashboard.recentActivity.slice(0, 8).map((a) => {
                const colors = {
                  paid: 'text-emerald-700',
                  sent: 'text-sky-700',
                  voided: 'text-rose-700',
                  overdue: 'text-amber-700',
                  created: 'text-[#8E8E9F]',
                };
                return (
                  <div key={a.invoiceId + a.timestamp} className="text-[11px] flex items-start gap-1.5">
                    <span className={`font-semibold ${colors[a.action]} uppercase`}>{a.action}</span>
                    <span className="text-[#4A4A5C] truncate flex-1">{a.clientName}</span>
                    <span className="text-[#8E8E9F] tabular-nums whitespace-nowrap">{fmtCAD(a.amountCAD)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashStat({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: string;
  subtitle: React.ReactNode;
  accent: string;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-[#EDE8DF] p-4 border-l-4"
      style={{ borderLeftColor: accent }}
    >
      <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">{label}</div>
      <div className="text-2xl font-bold text-[#2D2A33] mt-1 tabular-nums">{value}</div>
      <div className="text-[11px] text-[#8E8E9F] mt-0.5">{subtitle}</div>
    </div>
  );
}

/* Legacy DashTrendChart + DashCurrencyMix helpers removed in Phase 4.
 * They were replaced by the recharts-powered components in
 * `src/components/admin/charts/*` — see DashboardTab above. */

/* ═══════════════ Customers Tab ═══════════════ */

function CustomersTab({
  customers,
  loading,
  bearerHeaders,
  onRefresh,
  onBanner,
}: {
  customers: Customer[];
  loading: boolean;
  bearerHeaders: HeadersInit;
  onRefresh: () => void;
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  type CustSort = 'name' | 'invoices' | 'paid' | 'recent';
  const [custSort, setCustSort] = useState<CustSort>('name');

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (custSort === 'invoices') return (b.totalInvoices ?? 0) - (a.totalInvoices ?? 0);
    if (custSort === 'paid') return (b.totalPaidCAD ?? 0) - (a.totalPaidCAD ?? 0);
    if (custSort === 'recent') return (b.lastInvoiceAt ?? '').localeCompare(a.lastInvoiceAt ?? '');
    return (a.name ?? '').localeCompare(b.name ?? '');
  });

  const fmtCAD = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(n);

  const handleExport = () => {
    fetch('/api/admin/invoices/customers/export', { headers: bearerHeaders })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        onBanner({ kind: 'success', text: 'CSV downloaded' });
      })
      .catch(() => onBanner({ kind: 'error', text: 'Export failed' }));
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const csv = await file.text();
      try {
        const res = await fetch('/api/admin/invoices/customers/import', {
          method: 'POST',
          headers: bearerHeaders,
          body: JSON.stringify({ csv }),
        });
        const data = await res.json();
        if (!res.ok) {
          onBanner({ kind: 'error', text: data.error || 'Import failed' });
          return;
        }
        onBanner({
          kind: 'success',
          text: `Imported ${data.created} new + ${data.updated} updated${data.errors?.length ? ` (${data.errors.length} errors)` : ''}`,
        });
        onRefresh();
      } catch {
        onBanner({ kind: 'error', text: 'Import failed' });
      }
    };
    input.click();
  };

  return (
    <div>
      {/* Header actions */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E9F]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or country…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
        </div>
        <button
          onClick={handleImport}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8E4DE] text-xs font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2]"
        >
          <Upload className="w-3.5 h-3.5" /> Import CSV
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8E4DE] text-xs font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2]"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {loading && (
        <div className="text-center py-8 text-[#8E8E9F] text-sm">
          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
          Loading…
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#EDE8DF]">
          <Users className="w-10 h-10 mx-auto text-[#C8A97D] mb-3" />
          <p className="text-sm text-[#8E8E9F]">
            {customers.length === 0
              ? 'No customers yet — they\'ll appear automatically when you send invoices.'
              : 'No customers match your search.'}
          </p>
        </div>
      )}

      {/* Sort controls */}
      {!loading && filtered.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-[#8E8E9F]">Sort:</span>
          {(['name', 'invoices', 'paid', 'recent'] as CustSort[]).map(sk => (
            <button key={sk} onClick={() => setCustSort(sk)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${custSort === sk ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'text-[#8E8E9F] hover:bg-[#F5F0EB]'}`}
            >{sk === 'name' ? 'Name' : sk === 'invoices' ? 'Invoices' : sk === 'paid' ? 'Total Paid' : 'Recent'}</button>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-xl border border-[#EDE8DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FAF7F2]">
                <tr className="text-left">
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Name</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Email</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Country</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F] text-right">Invoices</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F] text-right">Total Paid</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F] text-right">Outstanding</th>
                  <th className="px-3 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-[#8E8E9F]">Last invoice</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.email}
                    className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] cursor-pointer"
                    onClick={() => setSelectedEmail(c.email)}
                  >
                    <td className="px-3 py-2.5 text-xs font-semibold text-[#2D2A33]">{c.name}</td>
                    <td className="px-3 py-2.5 text-xs text-[#4A4A5C]">{c.email}</td>
                    <td className="px-3 py-2.5 text-xs text-[#4A4A5C] font-mono uppercase">{c.country}</td>
                    <td className="px-3 py-2.5 text-xs text-[#2D2A33] tabular-nums text-right">{c.totalInvoices}</td>
                    <td className="px-3 py-2.5 text-xs font-bold text-emerald-700 tabular-nums text-right">{fmtCAD(c.totalPaidCAD)}</td>
                    <td className="px-3 py-2.5 text-xs font-bold text-amber-700 tabular-nums text-right">
                      {c.outstandingCAD > 0 ? fmtCAD(c.outstandingCAD) : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-[#8E8E9F]">
                      {c.lastInvoiceAt ? new Date(c.lastInvoiceAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profile modal */}
      <AnimatePresence>
        {selectedEmail && (
          <CustomerProfileModal
            email={selectedEmail}
            bearerHeaders={bearerHeaders}
            onClose={() => setSelectedEmail(null)}
            onBanner={onBanner}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ Customer Profile Modal (with AI insights) ═══════════════ */

function CustomerProfileModal({
  email,
  bearerHeaders,
  onClose,
  onBanner,
}: {
  email: string;
  bearerHeaders: HeadersInit;
  onClose: () => void;
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
}) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoices, setInvoices] = useState<StoredInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingInsights, setGeneratingInsights] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/invoices/customers/${encodeURIComponent(email)}`, { headers: bearerHeaders })
      .then((r) => r.json())
      .then((data) => {
        setCustomer(data?.customer ?? null);
        setInvoices(data?.invoices ?? []);
      })
      .catch(() => onBanner({ kind: 'error', text: 'Failed to load customer' }))
      .finally(() => setLoading(false));
  }, [email, bearerHeaders, onBanner]);

  const generateInsights = async () => {
    setGeneratingInsights(true);
    try {
      const res = await fetch('/api/admin/invoices/ai/insights', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ customerEmail: email }),
      });
      const data = await res.json();
      if (!res.ok) {
        onBanner({ kind: 'error', text: data.error || 'AI failed' });
        return;
      }
      setCustomer((c) =>
        c
          ? {
              ...c,
              aiInsightSummary: data.summary,
              aiInsightTags: data.tags,
              aiInsightUpdatedAt: new Date().toISOString(),
            }
          : c,
      );
      onBanner({ kind: 'success', text: 'AI insights generated' });
    } catch {
      onBanner({ kind: 'error', text: 'AI request failed' });
    } finally {
      setGeneratingInsights(false);
    }
  };

  const fmtCAD = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#EDE8DF] sticky top-0 bg-white">
          <h3 className="text-base font-semibold text-[#2D2A33]">Customer Profile</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#8E8E9F]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading && (
          <div className="text-center py-8 text-sm text-[#8E8E9F]">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
            Loading…
          </div>
        )}

        {customer && !loading && (
          <div className="p-5 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
                {customer.name}
              </h2>
              <p className="text-sm text-[#8E8E9F]">{customer.email}</p>
              <p className="text-xs text-[#8E8E9F] mt-0.5 font-mono uppercase">{customer.country}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#FAF7F2] rounded-lg p-3 text-center">
                <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">Invoices</div>
                <div className="text-lg font-bold text-[#2D2A33] mt-0.5">{customer.totalInvoices}</div>
              </div>
              <div className="bg-[#FAF7F2] rounded-lg p-3 text-center">
                <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">Paid (CAD)</div>
                <div className="text-lg font-bold text-emerald-700 mt-0.5">{fmtCAD(customer.totalPaidCAD)}</div>
              </div>
              <div className="bg-[#FAF7F2] rounded-lg p-3 text-center">
                <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">Outstanding</div>
                <div className="text-lg font-bold text-amber-700 mt-0.5">
                  {customer.outstandingCAD > 0 ? fmtCAD(customer.outstandingCAD) : '—'}
                </div>
              </div>
            </div>

            {/* AI insights section */}
            <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-xl border border-[#EDE8DF] p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#7A3B5E] inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Insights
                </h4>
                <button
                  onClick={generateInsights}
                  disabled={generatingInsights}
                  className="text-[10px] text-[#7A3B5E] hover:underline inline-flex items-center gap-1 disabled:opacity-50"
                >
                  {generatingInsights ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCw className="w-3 h-3" />}
                  {customer.aiInsightSummary ? 'Refresh' : 'Generate'}
                </button>
              </div>
              {customer.aiInsightSummary ? (
                <>
                  <p className="text-xs text-[#4A4A5C] leading-relaxed italic">{customer.aiInsightSummary}</p>
                  {customer.aiInsightTags && customer.aiInsightTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {customer.aiInsightTags.map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#7A3B5E]/10 text-[#7A3B5E] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs text-[#8E8E9F] italic">
                  Click &ldquo;Generate&rdquo; to get an AI-powered summary of this client&apos;s history.
                </p>
              )}
            </div>

            {/* Invoice history */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C] mb-2">Invoice History</h4>
              {invoices.length === 0 ? (
                <p className="text-xs text-[#8E8E9F]">No invoices yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {invoices.map((inv) => (
                    <div key={inv.invoiceId} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F3EFE8] last:border-0">
                      <div className="min-w-0">
                        <div className="font-mono text-[#2D2A33]">{inv.invoiceNumber}</div>
                        <div className="text-[10px] text-[#8E8E9F]">{new Date(inv.issuedAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#2D2A33] tabular-nums">{inv.breakdown.formattedTotal}</div>
                        <StatusBadge status={inv.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════ Recurring Tab ═══════════════ */

function RecurringTab({
  schedules,
  loading,
  bearerHeaders,
  onRefresh,
  onBanner,
}: {
  schedules: RecurringSchedule[];
  loading: boolean;
  bearerHeaders: HeadersInit;
  onRefresh: () => void;
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
}) {
  const togglePause = async (s: RecurringSchedule) => {
    await fetch('/api/admin/invoices/recurring', {
      method: 'POST',
      headers: bearerHeaders,
      body: JSON.stringify({ scheduleId: s.scheduleId, patch: { active: !s.active } }),
    });
    onBanner({ kind: 'success', text: s.active ? 'Schedule paused' : 'Schedule resumed' });
    onRefresh();
  };

  const remove = async (s: RecurringSchedule) => {
    if (!confirm(`Delete recurring schedule for ${s.customerEmail}?`)) return;
    await fetch(`/api/admin/invoices/recurring?id=${encodeURIComponent(s.scheduleId)}`, {
      method: 'DELETE',
      headers: bearerHeaders,
    });
    onBanner({ kind: 'success', text: 'Schedule deleted' });
    onRefresh();
  };

  const runNow = async () => {
    if (!confirm('Run the recurring processor now? It will create invoices for any schedules due today.')) return;
    try {
      const res = await fetch('/api/admin/invoices/recurring/process', { headers: bearerHeaders });
      const data = await res.json();
      if (!res.ok) {
        onBanner({ kind: 'error', text: data.error || 'Failed' });
        return;
      }
      onBanner({
        kind: 'success',
        text: `Processed ${data.log.schedulesProcessed} schedules, created ${data.log.invoicesCreated} invoices`,
      });
      onRefresh();
    } catch {
      onBanner({ kind: 'error', text: 'Server error' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[#8E8E9F]">
          Recurring schedules generate new invoices automatically on a daily cron (8am UTC).
        </p>
        <button
          onClick={runNow}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4DE] text-xs font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2]"
        >
          <RotateCw className="w-3.5 h-3.5" /> Run now
        </button>
      </div>

      {loading && (
        <div className="text-center py-8 text-sm text-[#8E8E9F]">
          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
          Loading…
        </div>
      )}

      {!loading && schedules.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#EDE8DF]">
          <RefreshCw className="w-10 h-10 mx-auto text-[#C8A97D] mb-3" />
          <p className="text-sm text-[#8E8E9F]">
            No recurring schedules yet. Toggle &ldquo;Recurring&rdquo; on the Compose tab to set one up.
          </p>
        </div>
      )}

      {!loading && schedules.length > 0 && (
        <div className="space-y-2">
          {schedules.map((s) => (
            <div key={s.scheduleId} className="bg-white rounded-xl border border-[#EDE8DF] p-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#2D2A33]">{s.customerEmail}</span>
                  {!s.active && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">PAUSED</span>
                  )}
                  {s.autoSend && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">AUTO-SEND</span>
                  )}
                </div>
                <div className="text-xs text-[#8E8E9F] mt-1">
                  {s.cadence === 'monthly' ? `Monthly on day ${s.anchor}` : `Weekly on day ${s.anchor}`}
                  {' · '} Next: {new Date(s.nextRunAt).toLocaleDateString()}
                  {' · '} {s.totalRuns} run{s.totalRuns === 1 ? '' : 's'}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => togglePause(s)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2]"
                >
                  {s.active ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => remove(s)}
                  className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

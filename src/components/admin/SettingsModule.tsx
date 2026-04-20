'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Building2, Phone, Mail, Clock, MapPin, Globe, Calendar,
  Instagram, Facebook, Youtube, Send, CheckCircle, ExternalLink,
  Edit3, Save, X, Loader2, DollarSign,
} from 'lucide-react';
import { BUSINESS } from '@/config/business';

interface Props { password: string }

interface Settings {
  name: string;
  nameAr: string;
  founder: string;
  phone: string;
  phoneRaw: string;
  email: string;
  hours: string;
  hoursAr: string;
  location: string;
  locationAr: string;
  calUsername: string;
  // Stats
  stat1Value: string; stat1LabelEn: string; stat1LabelAr: string; stat1DescEn: string; stat1DescAr: string;
  stat2Value: string; stat2LabelEn: string; stat2LabelAr: string; stat2DescEn: string; stat2DescAr: string;
  stat3Value: string; stat3LabelEn: string; stat3LabelAr: string; stat3DescEn: string; stat3DescAr: string;
  stat4Value: string; stat4LabelEn: string; stat4LabelAr: string; stat4DescEn: string; stat4DescAr: string;
  // Pricing
  toolkitFullAccessPrice: number;
  academyFullAccessPrice: number;
  // Social
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  snapchat: string;
  telegram: string;
}

const DEFAULT_SETTINGS: Settings = {
  name: BUSINESS.name,
  nameAr: BUSINESS.nameAr,
  founder: BUSINESS.founder,
  phone: BUSINESS.phone,
  phoneRaw: BUSINESS.phoneRaw,
  email: BUSINESS.email,
  hours: BUSINESS.hours,
  hoursAr: BUSINESS.hoursAr,
  location: BUSINESS.location,
  locationAr: BUSINESS.locationAr,
  calUsername: BUSINESS.calUsername,
  stat1Value: '10000+', stat1LabelEn: 'Families Supported', stat1LabelAr: 'عائلة تم دعمها', stat1DescEn: 'since 2018', stat1DescAr: 'منذ ٢٠١٨',
  stat2Value: '98%', stat2LabelEn: 'Would Recommend', stat2LabelAr: 'يوصون بنا', stat2DescEn: 'client satisfaction', stat2DescAr: 'رضا العملاء',
  stat3Value: '8+', stat3LabelEn: 'Years of Practice', stat3LabelAr: 'سنوات من الممارسة', stat3DescEn: 'clinical experience', stat3DescAr: 'خبرة سريرية',
  stat4Value: '15+', stat4LabelEn: 'Specializations', stat4LabelAr: 'تخصصاً', stat4DescEn: 'across all ages', stat4DescAr: 'لجميع الأعمار',
  toolkitFullAccessPrice: BUSINESS.toolkitFullAccessPrice,
  academyFullAccessPrice: BUSINESS.academyFullAccessPrice,
  instagram: BUSINESS.social.instagram,
  facebook: BUSINESS.social.facebook,
  youtube: BUSINESS.social.youtube,
  tiktok: BUSINESS.social.tiktok,
  snapchat: BUSINESS.social.snapchat,
  telegram: BUSINESS.social.telegram,
};

function EditableRow({ icon, label, value, onChange, dir }: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; dir?: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#F3EFE8] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0 text-[#7A3B5E]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <label className="text-xs text-[#8E8E9F]">{label}</label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          className="w-full text-sm font-medium text-[#2D2A33] bg-transparent border-b border-[#E8E4DE] focus:border-[#7A3B5E] focus:outline-none py-0.5"
        />
      </div>
    </div>
  );
}

function DisplayRow({ icon, label, value, link }: {
  icon: React.ReactNode; label: string; value: string; link?: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#F3EFE8] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0 text-[#7A3B5E]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#8E8E9F]">{label}</p>
        <p className="text-sm font-medium text-[#2D2A33] truncate">{value}</p>
      </div>
      {link && (
        <a href={link} target="_blank" className="text-[#7A3B5E] hover:text-[#5E2D48] flex-shrink-0">
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

export default function SettingsModule({ password }: Props) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRes, pricingRes] = await Promise.all([
        fetch('/api/admin/settings', {
          headers: { Authorization: `Bearer ${password}` },
        }),
        fetch('/api/admin/pricing', {
          headers: { Authorization: `Bearer ${password}` },
        }).catch(() => null),
      ]);
      let merged = { ...DEFAULT_SETTINGS };
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data.settings) merged = { ...merged, ...data.settings };
      }
      if (pricingRes?.ok) {
        const pricingData = await pricingRes.json();
        if (pricingData.toolkitFullAccessPrice != null) merged.toolkitFullAccessPrice = pricingData.toolkitFullAccessPrice;
        if (pricingData.academyFullAccessPrice != null) merged.academyFullAccessPrice = pricingData.academyFullAccessPrice;
      }
      setSettings(merged);
    } catch { /* use defaults */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const [res] = await Promise.all([
        fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
          body: JSON.stringify({ settings }),
        }),
        fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
          body: JSON.stringify({
            toolkitFullAccessPrice: settings.toolkitFullAccessPrice,
            academyFullAccessPrice: settings.academyFullAccessPrice,
          }),
        }).catch(() => null),
      ]);
      if (res.ok) {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch { /* ignore */ }
    setSaving(false);
  };

  const update = (key: keyof Settings) => (value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8E8E9F]" /></div>;
  }

  const socialPlatforms = [
    { key: 'instagram' as const, label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { key: 'facebook' as const, label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
    { key: 'youtube' as const, label: 'Youtube', icon: <Youtube className="w-4 h-4" /> },
    { key: 'tiktok' as const, label: 'Tiktok', icon: <Globe className="w-4 h-4" /> },
    { key: 'snapchat' as const, label: 'Snapchat', icon: <Globe className="w-4 h-4" /> },
    { key: 'telegram' as const, label: 'Telegram', icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Edit / Save Controls */}
      <div className="flex items-center gap-3">
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors">
            <Edit3 className="w-4 h-4" /> Edit Settings
          </button>
        ) : (
          <>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
            </button>
            <button onClick={() => { setEditing(false); fetchSettings(); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
          </>
        )}
        {saved && <span className="text-sm text-[#3B8A6E] flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Settings saved</span>}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <Building2 className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
            Business Info
          </h3>
          {editing ? (
            <>
              <EditableRow icon={<Building2 className="w-4 h-4" />} label="Business Name" value={settings.name} onChange={update('name')} />
              <EditableRow icon={<Building2 className="w-4 h-4" />} label="Name (Arabic)" value={settings.nameAr} onChange={update('nameAr')} dir="rtl" />
              <EditableRow icon={<Building2 className="w-4 h-4" />} label="Founder" value={settings.founder} onChange={update('founder')} />
              <EditableRow icon={<Phone className="w-4 h-4" />} label="Phone" value={settings.phone} onChange={update('phone')} />
              <EditableRow icon={<Mail className="w-4 h-4" />} label="Email" value={settings.email} onChange={update('email')} />
              <EditableRow icon={<Clock className="w-4 h-4" />} label="Business Hours" value={settings.hours} onChange={update('hours')} />
              <EditableRow icon={<Clock className="w-4 h-4" />} label="Business Hours (Arabic)" value={settings.hoursAr} onChange={update('hoursAr')} dir="rtl" />
              <EditableRow icon={<MapPin className="w-4 h-4" />} label="Location" value={settings.location} onChange={update('location')} />
              <EditableRow icon={<MapPin className="w-4 h-4" />} label="Location (Arabic)" value={settings.locationAr} onChange={update('locationAr')} dir="rtl" />
            </>
          ) : (
            <>
              <DisplayRow icon={<Building2 className="w-4 h-4" />} label="Business Name" value={settings.name} />
              <DisplayRow icon={<Building2 className="w-4 h-4" />} label="Name (Arabic)" value={settings.nameAr} />
              <DisplayRow icon={<Building2 className="w-4 h-4" />} label="Founder" value={settings.founder} />
              <DisplayRow icon={<Phone className="w-4 h-4" />} label="Phone" value={settings.phone} link={`tel:${settings.phoneRaw}`} />
              <DisplayRow icon={<Mail className="w-4 h-4" />} label="Email" value={settings.email} link={`mailto:${settings.email}`} />
              <DisplayRow icon={<Clock className="w-4 h-4" />} label="Business Hours" value={settings.hours} />
              <DisplayRow icon={<MapPin className="w-4 h-4" />} label="Location" value={settings.location} />
            </>
          )}
        </div>

        {/* Product Pricing */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <DollarSign className="w-4 h-4 inline-block mr-1.5 text-[#3B8A6E]" />
            Product Pricing
          </h3>
          {editing ? (
            <>
              <div className="flex items-center gap-4 py-3 border-b border-[#F3EFE8]">
                <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0 text-[#7A3B5E]">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-[#8E8E9F]">Toolkit Access (CAD)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={settings.toolkitFullAccessPrice}
                    onChange={(e) => setSettings(prev => ({ ...prev, toolkitFullAccessPrice: Number(e.target.value) }))}
                    className="w-full text-sm font-medium text-[#2D2A33] bg-transparent border-b border-[#E8E4DE] focus:border-[#7A3B5E] focus:outline-none py-0.5"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0 text-[#7A3B5E]">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-[#8E8E9F]">Academy Access (CAD)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={settings.academyFullAccessPrice}
                    onChange={(e) => setSettings(prev => ({ ...prev, academyFullAccessPrice: Number(e.target.value) }))}
                    className="w-full text-sm font-medium text-[#2D2A33] bg-transparent border-b border-[#E8E4DE] focus:border-[#7A3B5E] focus:outline-none py-0.5"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <DisplayRow icon={<DollarSign className="w-4 h-4" />} label="Toolkit Access (CAD)" value={`$${settings.toolkitFullAccessPrice}`} />
              <DisplayRow icon={<DollarSign className="w-4 h-4" />} label="Academy Access (CAD)" value={`$${settings.academyFullAccessPrice}`} />
            </>
          )}
        </div>

        {/* Stats + Right Column */}
        <div className="space-y-6">
          {/* About Page Stats */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Building2 className="w-4 h-4 inline-block mr-1.5 text-[#C8A97D]" />
              About Page Stats
            </h3>
            {editing ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(n => {
                  const vKey = `stat${n}Value` as keyof Settings;
                  const lKey = `stat${n}LabelEn` as keyof Settings;
                  const laKey = `stat${n}LabelAr` as keyof Settings;
                  const dKey = `stat${n}DescEn` as keyof Settings;
                  const daKey = `stat${n}DescAr` as keyof Settings;
                  return (
                    <div key={n} className="bg-[#FAF7F2] rounded-lg p-3 border border-[#F3EFE8]">
                      <p className="text-xs font-semibold text-[#7A3B5E] mb-2">Stat #{n}</p>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div><label className="text-[10px] text-[#8E8E9F]">Value</label><input value={settings[vKey]} onChange={(e) => update(vKey)(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm bg-white" /></div>
                        <div><label className="text-[10px] text-[#8E8E9F]">Label (EN)</label><input value={settings[lKey]} onChange={(e) => update(lKey)(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm bg-white" /></div>
                        <div><label className="text-[10px] text-[#8E8E9F]">Label (AR)</label><input value={settings[laKey]} onChange={(e) => update(laKey)(e.target.value)} dir="rtl" className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm bg-white" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-[10px] text-[#8E8E9F]">Description (EN)</label><input value={settings[dKey]} onChange={(e) => update(dKey)(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm bg-white" /></div>
                        <div><label className="text-[10px] text-[#8E8E9F]">Description (AR)</label><input value={settings[daKey]} onChange={(e) => update(daKey)(e.target.value)} dir="rtl" className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm bg-white" /></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(n => {
                  const vKey = `stat${n}Value` as keyof Settings;
                  const lKey = `stat${n}LabelEn` as keyof Settings;
                  const dKey = `stat${n}DescEn` as keyof Settings;
                  return (
                    <div key={n} className="bg-[#FAF7F2] rounded-lg p-3 text-center">
                      <p className="text-xl font-bold text-[#2D2A33]">{settings[vKey]}</p>
                      <p className="text-xs font-medium text-[#4A4A5C]">{settings[lKey]}</p>
                      <p className="text-[10px] text-[#8E8E9F]">{settings[dKey]}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Cal.com */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Calendar className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
              Cal.com Integration
            </h3>
            {editing ? (
              <EditableRow icon={<Calendar className="w-4 h-4" />} label="Cal.com Username" value={settings.calUsername} onChange={update('calUsername')} />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#3B8A6E]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2D2A33]">Connected</p>
                  <p className="text-xs text-[#8E8E9F]">@{settings.calUsername}</p>
                </div>
                <a href={`https://cal.com/${settings.calUsername}`} target="_blank" className="text-xs text-[#7A3B5E] hover:underline flex items-center gap-1">
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Send className="w-4 h-4 inline-block mr-1.5 text-[#C8A97D]" />
              Email Service
            </h3>
            <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#3B8A6E]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2A33]">Resend</p>
                <p className="text-xs text-[#8E8E9F]">Sending from {settings.email}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Globe className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
              Social Media
            </h3>
            {editing ? (
              socialPlatforms.map(({ key, label, icon }) => (
                <EditableRow key={key} icon={icon} label={label} value={settings[key]} onChange={update(key)} />
              ))
            ) : (
              socialPlatforms.map(({ key, label, icon }) => (
                <DisplayRow
                  key={key}
                  icon={icon}
                  label={label}
                  value={settings[key].replace(/https?:\/\/(www\.)?/, '').split('/').slice(0, 2).join('/')}
                  link={settings[key]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

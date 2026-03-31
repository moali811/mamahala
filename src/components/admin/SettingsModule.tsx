'use client';

import {
  Building2, Phone, Mail, Clock, MapPin, Globe, Calendar,
  Instagram, Facebook, Youtube, Send, CheckCircle, ExternalLink,
} from 'lucide-react';
import { BUSINESS } from '@/config/business';

function SettingRow({ icon, label, value, link }: {
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

export default function SettingsModule() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <Building2 className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
            Business Info
          </h3>
          <SettingRow icon={<Building2 className="w-4 h-4" />} label="Business Name" value={BUSINESS.name} />
          <SettingRow icon={<Building2 className="w-4 h-4" />} label="Name (Arabic)" value={BUSINESS.nameAr} />
          <SettingRow icon={<Building2 className="w-4 h-4" />} label="Founder" value={BUSINESS.founder} />
          <SettingRow icon={<Phone className="w-4 h-4" />} label="Phone" value={BUSINESS.phone} link={`tel:${BUSINESS.phoneRaw}`} />
          <SettingRow icon={<Mail className="w-4 h-4" />} label="Email" value={BUSINESS.email} link={`mailto:${BUSINESS.email}`} />
          <SettingRow icon={<Clock className="w-4 h-4" />} label="Business Hours" value={BUSINESS.hours} />
          <SettingRow icon={<MapPin className="w-4 h-4" />} label="Location" value={BUSINESS.location} />
        </div>

        {/* Integrations */}
        <div className="space-y-6">
          {/* Cal.com */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Calendar className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
              Cal.com Integration
            </h3>
            <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#3B8A6E]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2A33]">Connected</p>
                <p className="text-xs text-[#8E8E9F]">@{BUSINESS.calUsername}</p>
              </div>
              <a href={BUSINESS.calBaseUrl} target="_blank" className="text-xs text-[#7A3B5E] hover:underline flex items-center gap-1">
                Open <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Email (Resend) */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Send className="w-4 h-4 inline-block mr-1.5 text-[#C8A97D]" />
              Email Service
            </h3>
            <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#3B8A6E]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2A33]">Resend</p>
                <p className="text-xs text-[#8E8E9F]">Sending from {BUSINESS.email}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
            <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Globe className="w-4 h-4 inline-block mr-1.5 text-[#7A3B5E]" />
              Social Media
            </h3>
            <div className="space-y-0">
              {Object.entries(BUSINESS.social).map(([platform, url]) => {
                const icons: Record<string, React.ReactNode> = {
                  instagram: <Instagram className="w-4 h-4" />,
                  facebook: <Facebook className="w-4 h-4" />,
                  youtube: <Youtube className="w-4 h-4" />,
                  tiktok: <Globe className="w-4 h-4" />,
                  snapchat: <Globe className="w-4 h-4" />,
                  telegram: <Send className="w-4 h-4" />,
                };
                return (
                  <SettingRow
                    key={platform}
                    icon={icons[platform] || <Globe className="w-4 h-4" />}
                    label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    value={url.replace(/https?:\/\/(www\.)?/, '').split('/').slice(0, 2).join('/')}
                    link={url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

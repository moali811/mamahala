'use client';

/* AdminPwaCard
 * ================================================================
 * Drop-in card surfaced in SettingsModule that exposes the iPhone PWA
 * controls: install hint, push notifications, Face ID setup.
 *
 * UX rules:
 *   - Hide entire card on desktop browsers (no value there).
 *   - Show "Add to Home Screen" hint when iOS Safari but not standalone.
 *   - Show push toggle only when standalone (iOS push requires it).
 *   - Show Face ID setup when WebAuthn supported and no vault yet.
 *   - Show "Face ID enabled" status when vault exists.
 * ================================================================ */

import { useEffect, useState } from 'react';
import { Bell, Fingerprint, Share, Smartphone, CheckCircle2, AlertCircle, Loader2, LogOut } from 'lucide-react';
import { isStandalone, isIOS, supportsPush, supportsWebAuthn } from '@/lib/admin-pwa/pwa';
import { subscribeToPush, unsubscribeFromPush, getCurrentPushSubscription } from '@/lib/admin-pwa/push-subscribe';
import { enrollPasskey } from '@/lib/admin-pwa/webauthn';
import { storeEncrypted, storeBiometricGated, readVault, clearVault, type VaultRecord } from '@/lib/admin-pwa/token-vault';

interface Props { password: string }

export default function AdminPwaCard({ password }: Props) {
  const [mounted, setMounted] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [iOSDevice, setIOSDevice] = useState(false);
  const [pushOn, setPushOn] = useState(false);
  const [pushBusy, setPushBusy] = useState(false);
  const [pushMsg, setPushMsg] = useState<string | null>(null);
  const [vault, setVault] = useState<VaultRecord | null>(null);
  const [faceIdBusy, setFaceIdBusy] = useState(false);
  const [faceIdMsg, setFaceIdMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setInstalled(isStandalone());
    setIOSDevice(isIOS());
    if (supportsPush()) {
      getCurrentPushSubscription().then((s) => setPushOn(!!s)).catch(() => null);
    }
    if (supportsWebAuthn()) {
      readVault().then(setVault).catch(() => null);
    }
  }, []);

  // Don't render during SSR (mismatch risk) and don't render on plain desktop —
  // there's nothing useful here for a non-mobile, non-iOS user.
  if (!mounted) return null;
  // Show on iOS always (even non-standalone, to surface the install hint).
  // On other devices, show only if standalone (Android PWA install) OR if
  // WebAuthn is supported (lets the user enable Face ID on Android too).
  const shouldShow = iOSDevice || installed || supportsWebAuthn();
  if (!shouldShow) return null;

  async function handlePushToggle() {
    if (pushBusy) return;
    setPushBusy(true);
    setPushMsg(null);
    try {
      if (pushOn) {
        await unsubscribeFromPush(password);
        setPushOn(false);
        setPushMsg('Notifications turned off.');
      } else {
        const result = await subscribeToPush(password);
        if (result.ok) {
          setPushOn(true);
          setPushMsg('Notifications enabled. You\'ll get a buzz when a new booking comes in.');
        } else if (result.error === 'not-installed') {
          setPushMsg('Add to Home Screen first — tap Share, then "Add to Home Screen", then open from the icon.');
        } else if (result.error === 'permission-denied') {
          setPushMsg('Notification permission was denied. Re-enable in iPhone Settings → Notifications → MCMS.');
        } else if (result.error === 'no-vapid') {
          setPushMsg('Push not configured (server missing VAPID key).');
        } else if (result.error === 'unsupported') {
          setPushMsg('This device doesn\'t support web push.');
        } else if (result.error === 'register-failed') {
          setPushMsg('Could not register with the server. Try again.');
        } else {
          setPushMsg('Could not enable notifications.');
        }
      }
    } finally {
      setPushBusy(false);
    }
  }

  async function handleFaceIdSetup() {
    if (faceIdBusy) return;
    setFaceIdBusy(true);
    setFaceIdMsg(null);
    try {
      const { credentialId, prfOutput } = await enrollPasskey();
      if (prfOutput) {
        const rec = await storeEncrypted({ credentialId, prfOutput, bearer: password });
        setVault(rec);
        setFaceIdMsg('Face ID set up. Your password is now encrypted on this device.');
      } else {
        const rec = await storeBiometricGated({ credentialId, bearer: password });
        setVault(rec);
        setFaceIdMsg('Face ID set up (iOS 17 fallback mode — biometric gates use, not encryption).');
      }
    } catch (err) {
      const msg = (err as Error).message;
      setFaceIdMsg(msg.includes('cancelled') ? 'Face ID setup cancelled.' : 'Face ID setup failed. Try again.');
    } finally {
      setFaceIdBusy(false);
    }
  }

  async function handleFaceIdRemove() {
    setFaceIdBusy(true);
    try {
      await clearVault();
      setVault(null);
      setFaceIdMsg('Face ID disabled.');
    } finally {
      setFaceIdBusy(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-[#F0ECE8] overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 border-b border-[#F0ECE8]">
        <h3 className="text-sm font-semibold text-[#2D2A33]">iPhone & PWA</h3>
        {/* Tightened to a single line at typical iPhone width to avoid the
            "Face / ID" awkward wrap. Full sentence still rendered on tablet+. */}
        <p className="text-xs text-[#8E8E9F] mt-0.5">
          <span className="sm:hidden">Install · Push · Face ID</span>
          <span className="hidden sm:inline">Install on your phone, get push alerts, unlock with Face ID</span>
        </p>
      </div>

      <div className="divide-y divide-[#F5F2EE]">
        {/* Install hint — iOS-only, hidden when already installed */}
        {iOSDevice && !installed && (
          <Row
            icon={<Share className="w-5 h-5" />}
            iconBg="bg-[#F0E0EA]"
            iconFg="text-[#7A3B5E]"
            title="Add to Home Screen"
            subtitle="Tap Safari's Share button, then 'Add to Home Screen'. Open from the icon to enable push and Face ID."
          />
        )}

        {/* Push notifications */}
        <Row
          icon={<Bell className="w-5 h-5" />}
          iconBg={pushOn ? 'bg-[#DDF1E5]' : 'bg-[#F5F0EB]'}
          iconFg={pushOn ? 'text-[#1F6B4F]' : 'text-[#8E8E9F]'}
          title="New booking alerts"
          subtitle={
            !supportsPush() ? 'Not supported on this browser'
            : !installed ? 'Install to Home Screen first (see above)'
            : pushOn ? 'On — you\'ll get notified'
            : 'Off'
          }
          right={
            <Switch
              checked={pushOn}
              disabled={pushBusy || !supportsPush() || !installed}
              onChange={handlePushToggle}
            />
          }
        />
        {pushMsg && <RowMessage text={pushMsg} kind={pushOn ? 'ok' : 'info'} />}

        {/* Face ID */}
        {supportsWebAuthn() && (
          <Row
            icon={vault ? <CheckCircle2 className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
            iconBg={vault ? 'bg-[#DDF1E5]' : 'bg-[#F0E0EA]'}
            iconFg={vault ? 'text-[#1F6B4F]' : 'text-[#7A3B5E]'}
            title={vault ? 'Face ID enabled' : 'Set up Face ID'}
            subtitle={
              vault
                ? (vault.mode === 'encrypted'
                    ? 'Password encrypted on this device. Unlock with Face ID at the login screen.'
                    : 'Biometric gate enabled (iOS 17 fallback mode).')
                : 'Replace typing your password with a Face ID tap. Per-device.'
            }
            right={
              vault ? (
                <button
                  onClick={handleFaceIdRemove}
                  disabled={faceIdBusy}
                  className="text-xs font-medium text-[#C45B5B] hover:text-[#A04949] px-3 py-1.5 rounded-lg disabled:opacity-50"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={handleFaceIdSetup}
                  disabled={faceIdBusy}
                  className="text-xs font-medium text-white bg-[#7A3B5E] hover:bg-[#5E2D48] px-3 py-1.5 rounded-lg disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {faceIdBusy && <Loader2 className="w-3 h-3 animate-spin" />}
                  {faceIdBusy ? 'Setting up' : 'Set up'}
                </button>
              )
            }
          />
        )}
        {faceIdMsg && <RowMessage text={faceIdMsg} kind={vault ? 'ok' : 'info'} />}

        {/* App version + scope */}
        <Row
          icon={<Smartphone className="w-5 h-5" />}
          iconBg="bg-[#F5F0EB]"
          iconFg="text-[#8E8E9F]"
          title="App mode"
          subtitle={
            installed ? 'Installed (running in standalone mode)'
            : iOSDevice ? 'In Safari — install to Home Screen for full app experience'
            : 'In a regular browser tab'
          }
        />

        {/* Sign out — only surfaced on mobile. Desktop has its own sign-out
            in the sidebar footer. Without this, mobile users have no way to
            clear the saved password except via browser dev tools. */}
        <button
          onClick={() => {
            try { localStorage.removeItem('mh_admin_key'); } catch { /* ignore */ }
            try { sessionStorage.removeItem('mh_admin_key'); } catch { /* ignore */ }
            window.location.href = '/admin';
          }}
          className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 lg:hidden text-left active:scale-[0.99] transition-transform"
        >
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#FBE3E3] text-[#A04949]">
            <LogOut className="w-5 h-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#A04949]">Sign out</p>
            <p className="text-xs text-[#8E8E9F] mt-0.5">Clears the saved password from this device</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function Row({
  icon, iconBg, iconFg, title, subtitle, right,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconFg: string;
  title: string;
  subtitle: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5">
      <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl ${iconBg} ${iconFg}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#2D2A33]">{title}</p>
        <p className="text-xs text-[#8E8E9F] mt-0.5 leading-relaxed">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

function RowMessage({ text, kind }: { text: string; kind: 'ok' | 'info' | 'error' }) {
  const palette = kind === 'ok'
    ? { bg: 'bg-[#F0FAF5]', fg: 'text-[#1F6B4F]', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
    : kind === 'error'
    ? { bg: 'bg-[#FBE3E3]', fg: 'text-[#A04949]', icon: <AlertCircle className="w-3.5 h-3.5" /> }
    : { bg: 'bg-[#FFF4D9]', fg: 'text-[#8A6516]', icon: <AlertCircle className="w-3.5 h-3.5" /> };
  return (
    <div className={`mx-4 sm:mx-5 mb-3 px-3 py-2 rounded-lg text-xs flex items-start gap-2 ${palette.bg} ${palette.fg}`}>
      <span className="mt-0.5 shrink-0">{palette.icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Switch({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className="relative h-7 w-12 rounded-full transition-colors disabled:opacity-50 shrink-0"
      style={{ background: checked ? '#7A3B5E' : '#E8E0D8' }}
    >
      <span
        className="absolute top-0.5 left-0.5 inline-block h-6 w-6 rounded-full bg-white shadow"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 180ms ease' }}
      />
    </button>
  );
}

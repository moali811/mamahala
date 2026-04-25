/* Capability detection for the PWA runtime. All callers should be SSR-safe —
   guard with `typeof window !== 'undefined'` before invoking. */

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(display-mode: standalone)").matches) return true;
  // iOS-specific
  return Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
}

export function supportsPush(): boolean {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

export function supportsWebAuthn(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.PublicKeyCredential);
}

export function supportsWebShareWithFiles(file?: File): boolean {
  if (typeof navigator === "undefined") return false;
  if (!("canShare" in navigator) || !("share" in navigator)) return false;
  if (!file) return true;
  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

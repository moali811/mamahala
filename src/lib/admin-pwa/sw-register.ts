/* Client-side Service Worker registration. Called once from AppProviders.
   Handles update detection and sends a postMessage when an update is ready. */

export type SWUpdateCallback = (waitingWorker: ServiceWorker) => void;

export async function registerServiceWorker(onUpdate?: SWUpdateCallback): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator)) return null;

  try {
    // Scope to /admin only — the SW is hosted at root /sw.js but we restrict
    // its scope so marketing pages aren't intercepted. Requires the
    // Service-Worker-Allowed: /admin header (set in next.config.ts).
    const reg = await navigator.serviceWorker.register("/sw.js", {
      scope: "/admin",
      updateViaCache: "none",
    });

    // If there's already a waiting worker, surface it.
    if (reg.waiting && navigator.serviceWorker.controller) {
      onUpdate?.(reg.waiting);
    }

    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          onUpdate?.(newWorker);
        }
      });
    });

    // Reload once when the new SW takes control (after skipWaiting).
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    return reg;
  } catch (err) {
    console.error("[sw] register failed:", err);
    return null;
  }
}

export function skipWaitingAndReload(worker: ServiceWorker) {
  worker.postMessage({ type: "SKIP_WAITING" });
}

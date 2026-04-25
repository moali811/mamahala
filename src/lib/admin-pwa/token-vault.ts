/* Encrypted Bearer-token vault stored in IndexedDB.
 *
 * Two modes:
 *   - "encrypted": iOS 18+ (WebAuthn PRF available). Bearer ciphertext + IV stored;
 *                  decryption requires a successful WebAuthn assertion that produces
 *                  the same PRF output, which serves as the AES-GCM key.
 *   - "biometric-gated": iOS 16.4–17 (no PRF). Bearer stored Base64'd; access still
 *                       gates on a successful WebAuthn assertion (defense by gesture,
 *                       not by encryption).
 *
 * Either way, the Bearer is NEVER written to localStorage. */

import { base64UrlEncode, base64UrlDecode, encryptString, decryptString, importAesKey } from "./crypto";

const DB_NAME = "mh-admin-vault";
const DB_VERSION = 1;
const STORE = "vault";
const KEY = "bearer";

export type VaultMode = "encrypted" | "biometric-gated";

export interface VaultRecord {
  mode: VaultMode;
  credentialIdB64: string;
  /** AES-GCM IV (12 bytes) — used in "encrypted" mode; absent in "biometric-gated". */
  ivB64?: string;
  /** Ciphertext in "encrypted" mode; Base64-encoded plaintext Bearer in "biometric-gated". */
  payloadB64: string;
  createdAt: string;
  version: 1;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve((req.result as T | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(key: string, value: unknown): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbDelete(key: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function readVault(): Promise<VaultRecord | null> {
  return idbGet<VaultRecord>(KEY);
}

export async function clearVault(): Promise<void> {
  await idbDelete(KEY);
}

export async function storeEncrypted(params: {
  credentialId: ArrayBuffer | Uint8Array;
  prfOutput: ArrayBuffer | Uint8Array;
  bearer: string;
}): Promise<VaultRecord> {
  const key = await importAesKey(params.prfOutput);
  const { iv, ciphertext } = await encryptString(key, params.bearer);
  const record: VaultRecord = {
    mode: "encrypted",
    credentialIdB64: base64UrlEncode(params.credentialId),
    ivB64: base64UrlEncode(iv),
    payloadB64: base64UrlEncode(ciphertext),
    createdAt: new Date().toISOString(),
    version: 1,
  };
  await idbPut(KEY, record);
  return record;
}

export async function storeBiometricGated(params: {
  credentialId: ArrayBuffer | Uint8Array;
  bearer: string;
}): Promise<VaultRecord> {
  const record: VaultRecord = {
    mode: "biometric-gated",
    credentialIdB64: base64UrlEncode(params.credentialId),
    payloadB64: base64UrlEncode(new TextEncoder().encode(params.bearer)),
    createdAt: new Date().toISOString(),
    version: 1,
  };
  await idbPut(KEY, record);
  return record;
}

export async function unlockEncrypted(record: VaultRecord, prfOutput: ArrayBuffer | Uint8Array): Promise<string> {
  if (record.mode !== "encrypted") throw new Error("Vault is not in encrypted mode");
  if (!record.ivB64) throw new Error("Missing IV in encrypted vault");
  const key = await importAesKey(prfOutput);
  const iv = base64UrlDecode(record.ivB64);
  const ciphertext = base64UrlDecode(record.payloadB64);
  return decryptString(key, iv, ciphertext);
}

export function unlockBiometricGated(record: VaultRecord): string {
  if (record.mode !== "biometric-gated") throw new Error("Vault is not in biometric-gated mode");
  return new TextDecoder().decode(base64UrlDecode(record.payloadB64));
}

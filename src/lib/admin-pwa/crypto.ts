/* WebCrypto helpers for the encrypted token vault.
   AES-GCM 256-bit, IV 96-bit. */

const enc = new TextEncoder();
const dec = new TextDecoder();

/** Copy any ArrayBuffer-like input into a fresh Uint8Array backed by ArrayBuffer
 *  (not SharedArrayBuffer). WebCrypto's BufferSource type doesn't accept the
 *  generic Uint8Array<ArrayBufferLike> shape that strict TS lib.dom infers. */
function toArrayBuffer(input: ArrayBuffer | Uint8Array | ArrayBufferView): ArrayBuffer {
  if (input instanceof ArrayBuffer) return input;
  const view = input as ArrayBufferView;
  const buf = new ArrayBuffer(view.byteLength);
  new Uint8Array(buf).set(new Uint8Array(view.buffer, view.byteOffset, view.byteLength));
  return buf;
}

export async function importAesKey(rawBytes: ArrayBuffer | Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", toArrayBuffer(rawBytes), "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function encryptString(key: CryptoKey, plaintext: string): Promise<{ iv: Uint8Array; ciphertext: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, key, toArrayBuffer(enc.encode(plaintext)))
  );
  return { iv, ciphertext };
}

export async function decryptString(key: CryptoKey, iv: Uint8Array, ciphertext: Uint8Array): Promise<string> {
  const buf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, key, toArrayBuffer(ciphertext));
  return dec.decode(buf);
}

export function base64UrlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (let i = 0; i < u8.length; i++) str += String.fromCharCode(u8[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

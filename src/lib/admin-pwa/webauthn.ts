/* WebAuthn helpers for Face ID / Touch ID enrollment and unlock.
 *
 * Strategy:
 *   - Enroll a platform passkey with PRF extension. If the authenticator supports PRF
 *     (iOS 18+), we get a deterministic 32-byte secret per challenge — used to derive
 *     an AES-GCM key for the token vault.
 *   - On unlock, we ask for a WebAuthn assertion with the same PRF eval input. If it
 *     succeeds and PRF returns the same secret, we decrypt the vault.
 *   - If PRF isn't supported, the assertion alone gates access (biometric-gated mode). */

import { base64UrlDecode } from "./crypto";

// A constant per-app PRF input. Doesn't need to be secret; just must be the same
// at enroll time and at every unlock so the PRF output stays stable.
const PRF_INPUT = new TextEncoder().encode("mh-admin-prf-v1-32-byte-input!!");

export interface EnrollResult {
  credentialId: ArrayBuffer;
  prfOutput: ArrayBuffer | null;
}

export interface UnlockResult {
  prfOutput: ArrayBuffer | null;
}

function rpId(): string {
  // In production this will be admin.mamahala.ca; in dev, localhost.
  return typeof window !== "undefined" ? window.location.hostname : "localhost";
}

export async function enrollPasskey(): Promise<EnrollResult> {
  if (!window.PublicKeyCredential) throw new Error("WebAuthn not supported");

  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const userId = new TextEncoder().encode("mh-admin-shared");

  const credential = (await navigator.credentials.create({
    publicKey: {
      rp: { id: rpId(), name: "Mama Hala Admin" },
      user: { id: userId, name: "admin", displayName: "Mama Hala Admin" },
      challenge,
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },   // ES256
        { type: "public-key", alg: -257 }, // RS256
      ],
      authenticatorSelection: {
        userVerification: "required",
        residentKey: "required",
        authenticatorAttachment: "platform",
      },
      timeout: 60_000,
      attestation: "none",
      extensions: { prf: { eval: { first: PRF_INPUT } } } as AuthenticationExtensionsClientInputs,
    },
  })) as PublicKeyCredential | null;

  if (!credential) throw new Error("Enrollment cancelled");

  const ext = credential.getClientExtensionResults() as { prf?: { results?: { first?: ArrayBuffer } } };
  const prfOutput = ext.prf?.results?.first ?? null;

  return { credentialId: credential.rawId, prfOutput };
}

export async function unlockPasskey(credentialIdB64: string): Promise<UnlockResult> {
  if (!window.PublicKeyCredential) throw new Error("WebAuthn not supported");

  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const credIdBytes = base64UrlDecode(credentialIdB64);
  const credIdBuf = new ArrayBuffer(credIdBytes.byteLength);
  new Uint8Array(credIdBuf).set(credIdBytes);
  const allowCredentials: PublicKeyCredentialDescriptor[] = [{
    id: credIdBuf,
    type: "public-key",
    transports: ["internal"],
  }];

  const assertion = (await navigator.credentials.get({
    publicKey: {
      rpId: rpId(),
      challenge,
      allowCredentials,
      userVerification: "required",
      timeout: 60_000,
      extensions: { prf: { eval: { first: PRF_INPUT } } } as AuthenticationExtensionsClientInputs,
    },
  })) as PublicKeyCredential | null;

  if (!assertion) throw new Error("Unlock cancelled");

  const ext = assertion.getClientExtensionResults() as { prf?: { results?: { first?: ArrayBuffer } } };
  return { prfOutput: ext.prf?.results?.first ?? null };
}

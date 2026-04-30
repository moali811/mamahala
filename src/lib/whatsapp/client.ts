/* ================================================================
   WhatsApp Cloud API — Thin HTTP wrapper
   ================================================================
   Single low-level call:
     POST /v21.0/{phone_number_id}/messages
     Authorization: Bearer {access_token}

   Returns Meta's response shape `{ messages: [{ id }] }` on success
   or `{ error: { code, message, ... } }` on failure. We do NOT
   throw on non-2xx — callers inspect `error` directly. Mirrors the
   Resend `{ data, error }` ergonomic the rest of the codebase uses.

   Kill-switch: when `WA_ENABLED !== 'true'`, every send returns
   `{ skipped: 'kill-switch' }` without contacting Meta. Lets the
   feature ship dark and be flipped on after Meta verification.
   ================================================================ */

import { TEMPLATES, TEMPLATE_PARAM_ORDER, type TemplateName, type TemplateParamMap, type WhatsappLocale } from './templates';

const GRAPH_VERSION = 'v21.0';

/** Phone number must be E.164 without the leading `+` per Meta's spec. */
function normalizeE164(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export interface SendTemplateOk {
  ok: true;
  messageId: string;
  /** Meta's wa_id for the recipient — opaque, useful for debugging. */
  waId?: string;
}

export interface SendTemplateErr {
  ok: false;
  error: {
    code?: number;
    message: string;
    type?: string;
    /** HTTP status from Meta (or 0 for transport errors). */
    httpStatus: number;
  };
  skipped?: 'kill-switch' | 'no-credentials' | 'opt-out' | 'no-opt-in' | 'no-phone';
}

export type SendTemplateResult = SendTemplateOk | SendTemplateErr;

interface CredentialEnv {
  enabled: boolean;
  phoneNumberId: string;
  accessToken: string;
}

function readEnv(): CredentialEnv | null {
  const enabled = process.env.WA_ENABLED === 'true';
  const phoneNumberId = process.env.WA_PHONE_NUMBER_ID || '';
  const accessToken = process.env.WA_ACCESS_TOKEN || '';
  if (!enabled || !phoneNumberId || !accessToken) {
    return { enabled, phoneNumberId, accessToken };
  }
  return { enabled: true, phoneNumberId, accessToken };
}

interface SendTemplateInput<T extends TemplateName> {
  template: T;
  /** Recipient phone in E.164 (with or without leading +). */
  to: string;
  vars: TemplateParamMap[T];
  /** Locale of the registered template body to pick. */
  locale: WhatsappLocale;
}

/**
 * Build Meta's `components` payload from the variable map. Order
 * follows `TEMPLATE_PARAM_ORDER`, which must match the body's
 * {{1}},{{2}},… ordering in the approved template.
 */
function buildBodyComponents<T extends TemplateName>(template: T, vars: TemplateParamMap[T]) {
  const order = TEMPLATE_PARAM_ORDER[template];
  return [
    {
      type: 'body' as const,
      parameters: order.map((key) => {
        const value = (vars as unknown as Record<string, unknown>)[key as string];
        return { type: 'text' as const, text: String(value ?? '') };
      }),
    },
  ];
}

/**
 * Low-level send. Returns `ok: false` with `skipped: 'kill-switch'`
 * or `'no-credentials'` when WA_ENABLED is off or env vars are
 * missing — so calling code can run safely in dev/preview without
 * any Meta setup.
 */
export async function sendTemplateMessage<T extends TemplateName>(
  input: SendTemplateInput<T>,
): Promise<SendTemplateResult> {
  const env = readEnv();
  if (!env || !env.enabled) {
    return {
      ok: false,
      skipped: 'kill-switch',
      error: { message: 'WA_ENABLED is not true', httpStatus: 0 },
    };
  }
  if (!env.phoneNumberId || !env.accessToken) {
    return {
      ok: false,
      skipped: 'no-credentials',
      error: { message: 'WhatsApp credentials missing', httpStatus: 0 },
    };
  }

  const def = TEMPLATES[input.template];
  if (!def) {
    return {
      ok: false,
      error: { message: `Unknown template: ${input.template}`, httpStatus: 0 },
    };
  }

  const to = normalizeE164(input.to);
  if (!to || to.length < 7) {
    return {
      ok: false,
      skipped: 'no-phone',
      error: { message: 'Recipient phone is empty or malformed', httpStatus: 0 },
    };
  }

  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: def.name,
      language: { code: input.locale === 'ar' ? 'ar' : 'en' },
      components: buildBodyComponents(input.template, input.vars),
    },
  };

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${env.phoneNumberId}/messages`;

  let httpStatus = 0;
  let json: unknown = null;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.accessToken}`,
      },
      body: JSON.stringify(body),
      // Meta has a strict 30s timeout — match it so a hung Lambda doesn't drag.
      signal: AbortSignal.timeout(20_000),
    });
    httpStatus = res.status;
    json = await res.json().catch(() => null);
  } catch (err) {
    return {
      ok: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        httpStatus: 0,
      },
    };
  }

  if (httpStatus < 200 || httpStatus >= 300) {
    const errObj = (json as { error?: { code?: number; message?: string; type?: string } } | null)?.error;
    return {
      ok: false,
      error: {
        code: errObj?.code,
        message: errObj?.message || `HTTP ${httpStatus}`,
        type: errObj?.type,
        httpStatus,
      },
    };
  }

  const ok = json as { messages?: Array<{ id?: string }>; contacts?: Array<{ wa_id?: string }> } | null;
  const messageId = ok?.messages?.[0]?.id;
  if (!messageId) {
    return {
      ok: false,
      error: { message: 'No message id in Meta response', httpStatus },
    };
  }
  return { ok: true, messageId, waId: ok?.contacts?.[0]?.wa_id };
}

/**
 * Send a free-form text reply (only valid inside the 24-hour
 * customer-service window — i.e. after a client has sent us a
 * message, like STOP). Used by the webhook to acknowledge opt-out.
 */
export async function sendFreeFormText(to: string, text: string): Promise<SendTemplateResult> {
  const env = readEnv();
  if (!env || !env.enabled || !env.phoneNumberId || !env.accessToken) {
    return {
      ok: false,
      skipped: 'kill-switch',
      error: { message: 'WhatsApp not enabled or credentials missing', httpStatus: 0 },
    };
  }

  const recipient = normalizeE164(to);
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${env.phoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipient,
    type: 'text',
    text: { preview_url: false, body: text },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.accessToken}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { messages?: Array<{ id?: string }>; error?: { code?: number; message?: string; type?: string } }
      | null;
    if (!res.ok) {
      return {
        ok: false,
        error: {
          code: json?.error?.code,
          message: json?.error?.message || `HTTP ${res.status}`,
          type: json?.error?.type,
          httpStatus: res.status,
        },
      };
    }
    const id = json?.messages?.[0]?.id || '';
    return { ok: true, messageId: id };
  } catch (err) {
    return {
      ok: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        httpStatus: 0,
      },
    };
  }
}

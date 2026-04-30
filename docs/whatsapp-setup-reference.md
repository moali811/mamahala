# WhatsApp Notifications — Setup Runbook

Status: code shipped, **not yet enabled**. The `WA_ENABLED` env var keeps it dark until Meta business verification + template approval are done.

## What's already wired

Six client-facing WhatsApp moments, opt-in only:

| Trigger | Template |
|---|---|
| Booking confirmed (after payment) | `booking_confirmation` |
| 1h before session | `session_reminder_1h` |
| Account magic link | `magic_link` |
| Invoice pre-due (3 days before) | `payment_reminder_pre_due` |
| Invoice overdue (+1 / +7 / +14 / +30) | `payment_reminder_overdue` |
| Rebook nudge (cadence-based) | `rebook_nudge_warm` / `_cadence` / `_long_gap` / `_seasonal` |

Rebook variants are picked automatically based on the client's history (1 session vs 3+, 60+ day gap, seasonal pattern).

Opt-in is an unchecked checkbox at booking. STOP keyword webhook flips a hard opt-out flag. Email continues to send to opted-out clients — only WhatsApp is suppressed.

## Setup steps for Mo (do in order)

### 1. Verify the business in Meta Business Manager

1. Go to [business.facebook.com](https://business.facebook.com).
2. Create a Business Account for **Mama Hala Consulting** if you don't have one.
3. Settings → Business Info → upload registration documents to start verification (~1–3 days for review).
4. Add a payment method (Settings → Billing → Payment Methods). Required even if you stay under the 1000 free service-conversation/month tier.

### 2. Add WhatsApp + the existing phone number (Coexistence path)

Mo chose **Coexistence** — Dr. Hala keeps replying manually on her phone via the WhatsApp Business App, AND our automated templates send under the *same* number via the Cloud API. Clients see one consistent sender.

1. Business Settings → Accounts → WhatsApp Accounts → "Add" → walk through the wizard.
2. When prompted for a phone number, pick **the existing number Dr. Hala already uses on her WhatsApp Business App**.
3. Meta will detect that the number is on the Business App and offer the **Coexistence** flow. Accept it. (If Meta's UI hides the option, search "Coexistence" in their docs — it became GA in 2024 and is available in Canada.)
4. Verify the number — Meta sends a code through the Business App itself rather than SMS.
5. After enrollment, both endpoints stay live:
   - **Inbound** messages from clients → still arrive on Dr. Hala's phone in the Business App, *AND* are mirrored to our `/api/whatsapp/webhook` (so STOP keyword still works).
   - **Outbound** template messages from this codebase → sent under the same number.
   - **Manual replies** from Dr. Hala in the Business App → unchanged, free, in-channel.

**What this means in practice:**
- Dr. Hala's existing chats and contact history are untouched.
- Clients never see a second sender — confirmations, reminders, and her personal replies all come from one number.
- If a client replies STOP to an automated message, our webhook flips their opt-out flag, *and* Dr. Hala sees the STOP in her Business App (it's mirrored). Both are correct — our system stops sending automated WhatsApp; she can still chat manually if she wants to.

**Caveats:**
- Coexistence availability is region-dependent. Canada is supported, but if Meta rejects the enrollment, we can fall back to a dedicated second number (option 1) — code doesn't care which number it sends from, only the env var changes.
- Some advanced Business App features (catalog, automated greeting message) get disabled when Coexistence is on. Confirm Dr. Hala isn't relying on those before enrolling.

### 3. Submit the 9 templates

In Meta Business Manager → WhatsApp Manager → Message Templates → "Create template". Submit each of these. Each takes ~24–48h to approve.

| Name | Category | Variables (ordered as `{{1}}`, `{{2}}`...) |
|---|---|---|
| `booking_confirmation` | UTILITY | first_name, session_date, session_time_local, meet_link, manage_url |
| `session_reminder_1h` | UTILITY | first_name, meet_link |
| `magic_link` | AUTHENTICATION | first_name, login_url |
| `payment_reminder_pre_due` | UTILITY | first_name, amount, due_date, pay_url |
| `payment_reminder_overdue` | UTILITY | first_name, amount, days_overdue, pay_url |
| `rebook_nudge_warm` | UTILITY | first_name, rebook_url |
| `rebook_nudge_cadence` | UTILITY | first_name, weeks_since, rebook_url |
| `rebook_nudge_long_gap` | UTILITY | first_name, rebook_url |
| `rebook_nudge_seasonal` | UTILITY | first_name, rebook_url |

Suggested body wording for each is in the planning doc — match exactly to keep the variable order aligned with the code (`src/lib/whatsapp/templates.ts → TEMPLATE_PARAM_ORDER`).

Submit BOTH `en` and `ar` localizations for each template.

### 4. Generate a System User access token

Permanent tokens are required — the 24h dev tokens expire and break the cron jobs.

1. Business Settings → Users → System Users → "Add" → name it "WhatsApp Bot", role: Admin.
2. With that user selected → "Generate New Token" → pick the WhatsApp Business app → permissions: `whatsapp_business_management` + `whatsapp_business_messaging` → choose "Never expires".
3. Copy the token immediately — Meta only shows it once.

### 5. Set the webhook

1. WhatsApp Manager → Configuration → Webhook → Edit.
2. Callback URL: `https://mamahala.ca/api/whatsapp/webhook`
3. Verify Token: any random string you pick (matches `WA_WEBHOOK_VERIFY_TOKEN` env var).
4. Subscribe to the `messages` field.

### 6. Set Vercel environment variables

Add to **both** Production and Preview in Vercel → Project → Settings → Environment Variables:

```
WA_ENABLED=false                    # Flip to true after sandbox passes
WA_PHONE_NUMBER_ID=<from step 2>
WA_BUSINESS_ACCOUNT_ID=<from Meta WABA settings>
WA_ACCESS_TOKEN=<from step 4 — system user permanent token>
WA_WEBHOOK_VERIFY_TOKEN=<random string, matches step 5>
WA_APP_SECRET=<App Settings → Basic → App Secret in the App that owns the WhatsApp product>
```

Store these in Apple Passwords. Never paste them into shared docs or chat.

### 7. Sandbox-test before flipping `WA_ENABLED=true`

Meta provides a free test phone number that doesn't need business verification. Use it to:

1. Send all 9 templates to your personal WhatsApp.
2. Confirm rendering, link clicks, and that the Google Meet link opens.
3. Reply STOP from your phone — confirm the webhook flips the opt-out flag and a "you're unsubscribed" reply lands.
4. Run the rebook cron with `?dryRun=1` for at least 7 days; review the candidate list before going live:

   ```
   curl https://mamahala.ca/api/cron/rebook-nudge?dryRun=1 \
     -H "Authorization: Bearer $CRON_SECRET"
   ```

### 8. Production cutover

1. Move templates off the sandbox onto the production WABA (resubmit each).
2. Set `WA_ENABLED=true` in Vercel Production.
3. Watch Vercel logs + KV for the first 24h — search for `[mark-paid] WhatsApp` and `[Reminder 1h WA]` and `[Payment Reminder WA]` and `[rebook-nudge]`.

## Cost expectation

With ~50 bookings/month, you'll fire roughly:
- 50 booking confirmations
- 50 × 2 reminders (24h + 1h)
- ~30 payment reminders
- ~10 rebook nudges

Each is ONE conversation (24h window per client per category). At Meta's Canada UTILITY rate (~$0.0085 USD/conv), that's roughly **$1.30/month**. Service conversations the client initiates (replies to a template) are free. Authentication conversations (magic_link) carry their own price band.

The 1000 free service conversations/month tier is being phased out by Meta — don't budget around it.

## When something breaks

- **Template rejected for category** — Meta tightened MARKETING vs UTILITY rules in late 2024. If a rebook nudge gets reclassified as MARKETING, reword to lean harder into "service reminder" / "in case it slipped your list" framing and resubmit.
- **WhatsApp number blocked / quality dropped** — Business Manager → WhatsApp Accounts → Phone Numbers shows a green/yellow/red dot. Yellow = warn; red = number suspended. STOP-respect + low spam score is the way to keep green.
- **Cron silent failure** — search Vercel logs for `[rebook-nudge]` and `[Payment Reminder WA]`. The cron always returns JSON with `outcomes[]` so you can see why a candidate was skipped.
- **Webhook signature failure** — `WA_APP_SECRET` mismatch. Find it under the Meta App (not the WhatsApp Account) → Settings → Basic → App Secret.

## Code references

- `src/lib/whatsapp/` — all WhatsApp logic (client, templates, send gate, cadence, tokens)
- `src/app/api/whatsapp/webhook/route.ts` — STOP keyword + Meta verification
- `src/app/api/cron/rebook-nudge/route.ts` — daily nudge cron
- `src/app/[locale]/book/rebook/[token]/page.tsx` — one-tap rebook landing
- Send-site integrations:
  - `src/app/api/admin/invoices/mark-paid/route.ts` (booking confirmation)
  - `src/app/api/cron/booking-reminders/route.ts` (1h reminder)
  - `src/app/api/account/magic-link/route.ts` (magic link)
  - `src/app/api/cron/payment-reminders/route.ts` (pre-due + overdue)

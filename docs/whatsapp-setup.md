# WhatsApp setup — short version

Six things to do, in order. Total clicking: ~30 min spread over a few days (Meta verification has waits).

> The boring details — pricing, edge cases, what each step actually does — live in [whatsapp-setup-reference.md](./whatsapp-setup-reference.md). Read that only if something doesn't work.

---

## ① Verify Mama Hala Consulting at Meta

Go to [business.facebook.com](https://business.facebook.com) → upload your business registration documents → wait 1–3 days for the green checkmark.

Add a payment method (Settings → Billing) even though monthly cost will be $1–3.

## ② Connect Dr. Hala's existing WhatsApp number (Coexistence)

WhatsApp Manager → Add Number → pick the **existing number** Dr. Hala uses on her Business App → accept the **Coexistence** option Meta offers when it sees the number is already on the Business App.

Verify via the in-app code (not SMS). Done — her phone keeps working as before; we just got a parallel API channel under the same number.

## ③ Generate a permanent access token

Business Settings → Users → System Users → Add → name it "WhatsApp Bot" → Generate New Token → tick `whatsapp_business_management` + `whatsapp_business_messaging` → "Never expires" → **copy the token now, Meta only shows it once.**

Stash it in Apple Passwords.

## ④ Run one command — submits all 9 templates

```bash
npm run whatsapp:setup
```

It'll ask for the token from step ③ and your WhatsApp Business Account ID (top-right of WhatsApp Manager). It then:
- Submits all 9 message templates (EN + AR) — saves you 18 manual form fills
- Generates a random webhook verify token for step ⑤
- Prints the exact env-var block to paste into Vercel for step ⑥

Templates take 24–48h each to approve. Watch WhatsApp Manager → Message Templates for the green ✓.

## ⑤ Point Meta at our webhook

WhatsApp Manager → Configuration → Webhook → Edit:

- **Callback URL:** `https://mamahala.ca/api/whatsapp/webhook`
- **Verify Token:** _(paste the random string the script printed in step ④)_
- **Subscribe to:** `messages`

## ⑥ Paste env vars into Vercel

Vercel → Project Settings → Environment Variables (Production + Preview). Use the block the script printed in step ④. Two values you fill in by hand:

- `WA_PHONE_NUMBER_ID` — WhatsApp Manager → Phone Numbers → click the number → ID is in the right panel
- `WA_APP_SECRET` — Meta App → Settings → Basic → App Secret → "Show"

Keep `WA_ENABLED=false` for now.

## ⑦ Flip the switch

When all 9 templates show **APPROVED** in WhatsApp Manager:

1. Vercel → change `WA_ENABLED=false` → `WA_ENABLED=true` → Redeploy
2. Send yourself a test booking, confirm WhatsApp arrives
3. Reply STOP, confirm the opt-out reply comes back

If anything goes sideways, see [whatsapp-setup-reference.md](./whatsapp-setup-reference.md) for troubleshooting.

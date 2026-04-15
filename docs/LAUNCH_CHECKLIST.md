# Launch Checklist — Mama Hala Consulting

Last updated: 2026-04-15 (commit `08d43f0`)

---

## ✅ Fixed in code / env (no action needed)

- [x] **Production emails restored.** `RESEND_FROM_EMAIL` reverted to the
      Resend sandbox (`onboarding@resend.dev`) so sends stop hitting the
      "domain not verified" error. Vercel auto-deployed the env change;
      commit `08d43f0` then adds loud `[EMAIL FAILURE]` logging so the
      next silent-failure mode is obvious in Vercel logs.
- [x] **Admin Blocked Dates panel** lists existing blocks on mount
      (commit `c43a2de`) — previously it only showed blocks added in the
      current session.
- [x] **April 15 and 16 unblocked** — today's booking calendar is open.
- [x] **Time-slot blocking** — admin can now block a specific time range
      on a specific date, not just whole days. The blocked range is
      mirrored to Dr. Hala's Google Calendar as a private "Unavailable"
      event (no client details, no Meet link). See
      [AvailabilityEditor.tsx](../src/components/admin/AvailabilityEditor.tsx).
- [x] **`PayConciergePage` runtime error** was stale HMR; the fix is
      already in commit `bb24ec9`. Current code has no `Phone`
      reference.

---

## 🔴 Manual steps you (or Dr. Hala) must do

These require credentials or DNS access I don't have. Launch-blocking
ones are flagged with **[BLOCKING]**.

### 1. **[BLOCKING]** Re-mint Google Calendar refresh token

**Symptom**: Vercel logs show `[GCal] Google token refresh failed: 400 {
"error": "invalid_grant" }` on every booking/availability fetch. The
booking picker can't see real calendar conflicts, so slots Dr. Hala is
already busy on (existing appointments, personal events) aren't blocked.

**Fix** (5 minutes):

```bash
cd "/Users/moali811/Claude/Mama Hala Consulting/mama-hala-website"
npx tsx scripts/google-calendar-auth.ts
```

1. A browser tab opens → sign in with **Dr. Hala's Google account**
   (the one whose calendar we're integrating).
2. Grant "See, edit, share, and permanently delete all calendars" access.
3. The terminal prints a new `GOOGLE_CALENDAR_REFRESH_TOKEN`.
4. Update it in Vercel:
   ```bash
   vercel env rm GOOGLE_CALENDAR_REFRESH_TOKEN production --yes
   printf 'NEW_TOKEN_VALUE' | vercel env add GOOGLE_CALENDAR_REFRESH_TOKEN production
   vercel deploy --prod  # or just wait for next push
   ```
5. Also update `.env.local` with the same value so local dev works.

**Why blocking**: Without this, any session Dr. Hala has on her
personal calendar (hospital appointment, school meeting, etc.) will
NOT block the booking picker. Clients could double-book her.

### 2. **[BLOCKING]** Verify `mamahala.ca` in Resend

**Status upgraded from "nice to have" to BLOCKING on 2026-04-15
production smoke test.**

**Symptom**: With `RESEND_FROM_EMAIL=Mama Hala Consulting <onboarding@resend.dev>`
(the Resend sandbox domain), EVERY email send now fails with
`rate_limit_exceeded — 2 requests per second`. A single isolated
request is enough to trip the limit because the account is stuck in a
cooldown from any prior burst, and the sandbox has hard daily quotas.

This was caught automatically by the new `[EMAIL FAILURE]` logging
landed in commit `08d43f0` — before that change, this failure would
have been a silent void just like the original bug.

**The sandbox is NOT production-grade.** You can NOT launch emails on
`onboarding@resend.dev`. This step is now required before launch.

**Fix** (15 minutes + up to 1h DNS propagation):

1. Go to [resend.com/domains](https://resend.com/domains) → **Add Domain**.
2. Enter `mamahala.ca` (not `www.mamahala.ca`).
3. Resend shows 3–5 DNS records to add. They typically look like:
   - **SPF** — `TXT` record at `@` (or `send` subdomain): `v=spf1 include:_spf.resend.com ~all`
   - **DKIM** — one or more `TXT` records like `resend._domainkey` with long public-key values
   - **DMARC** (optional but recommended) — `TXT` at `_dmarc`: `v=DMARC1; p=none;`
   - **MX** (sometimes) — `MX` record for the `send` subdomain pointing to `feedback-smtp.us-east-1.amazonses.com` or similar
4. Copy each record into SiteGround DNS:
   - Log into SiteGround → Websites → mamahala.ca → **Domain → DNS Zone Editor**
   - Add each record exactly as Resend shows. Match the Type (TXT/MX),
     Name/Host, and Value/Content columns.
   - **Do NOT** add a trailing dot to the host field unless Resend
     explicitly includes one.
5. Back in Resend, click **Verify Domain**. Verification usually
   completes in 5–15 minutes; max ~1 hour.
6. Once verified, switch the Vercel env var back:
   ```bash
   cd "/Users/moali811/Claude/Mama Hala Consulting/mama-hala-website"
   vercel env rm RESEND_FROM_EMAIL production --yes
   printf 'Mama Hala Consulting <admin@mamahala.ca>' | vercel env add RESEND_FROM_EMAIL production
   ```
   Vercel will auto-redeploy. From that moment, emails come from
   `admin@mamahala.ca`.

**Verification after launch**: Send a test contact form submission to
yourself and check the `from:` header — should read `admin@mamahala.ca`.

---

## 🟡 Follow-up polish (can ship after launch)

- [ ] **Migrate the remaining email routes** to check `resend.emails.send()`
      return value. Done: `sendBookingEmail`, contact, newsletter, toolkit,
      academy/enroll. Not done: events/*, gift, webhooks, quiz-share,
      account/magic-link, academy/magic-link.
- [ ] **Full Arabic translation audit** — some pages still mix EN/AR.
- [ ] **Monitor first 30 days of purchases** to validate pricing
      (Academy $41, toolkits $19).
- [ ] **Google Meet link delivery** — previously intermittent (see
      commit `fc32969` for debugging logs); confirm reliably populated
      in client confirmation emails after the first few real bookings.

---

## Smoke test sequence for today's launch

Once both blocking items above are done:

1. **Booking flow**: Submit a real booking via `/en/book` using a test
   email. Confirm you + Dr. Hala both receive the pending-approval
   notification. Click Approve. Confirm client receives approval email.
2. **Invoice flow**: Send the draft invoice from the admin dashboard.
   Confirm client gets it. Mark paid. Confirm receipt email.
3. **Time-slot block**: In admin → Availability → Blocked Dates, pick
   a date, toggle "Specific time", block 8–9 PM. Open `/en/book` for
   that date and confirm 8 PM doesn't appear in the picker. Open
   Google Calendar and confirm a private "Unavailable" event appears.
   Unblock and confirm both the slot reappears and the GCal event is
   deleted.
4. **Contact form**: Submit from `/en/contact`. Confirm admin
   notification arrives. If it doesn't, check Vercel logs for
   `[EMAIL FAILURE]` — the new logging will tell you exactly what
   Resend rejected and why.
5. **Coming Soon gate** — confirm still enabled (or disabled if
   launching publicly today).

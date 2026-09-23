# Handoff: jasonehlinger.com (Pricing Page + Booking/Payment Setup)

Paste this into a new Claude Cowork chat to continue the work. It summarizes everything done so far, the exact state of the code and accounts, and what's still open.

---

## Project context

- **Site:** jasonehlinger.com, a personal consulting/advice site for Jason Ehlinger (leadership + finance coaching). Replacing the old jasonehlinger.com.
- **Stack:** Astro 4 + `@astrojs/mdx`, deployed via **Netlify**, source on **GitHub** (build command `npm run build`, publish dir `dist`, NODE_VERSION 20 per `netlify.toml`).
- **Folder:** "Jason Ehlinger website" (the connected/working folder).
- **Design system:** gold (`--gold #C8982A`) + black, defined in `src/styles/global.css`. Reusable classes: `.btn`, `.btn-gold`, `.btn-dark`, `.btn-outline`, `.section`, `.section-gray`, `.section-dark`, `.section-label`, `.card`, `.page-hero`, `.container`. Match these when adding anything.

---

## What was built (DONE)

### 1. New pricing page: `src/pages/pricing.astro`
A full pricing page matching the site's design, individuals-only, with:

- **Free 30-minute intro call** (hero + multiple CTAs)
- **Financial Coaching:** Intake $150, Follow-up $100, 6-session package $550 (card)
- **Leadership Coaching:** Session $175, 6-session package $900 (dark card)
- A "there's a lot for free" section pointing to `/services`
- Final CTA section

**Booking wiring:** at the top of `pricing.astro` there is a single `booking` config object holding all booking/payment URLs, plus a `link()` helper that falls back to `/contact` when a URL is blank. An inline `<script>` intercepts button clicks: Calendly URLs open as a **popup** (Calendly widget assets are loaded on the page), Stripe/other URLs open in a new tab. This means any link left blank still works (routes to the contact form) so the page is never broken.

Current `booking` config values:
```js
const booking = {
  introCall:   "https://calendly.com/ceo-taikatranslations/30min",
  finIntake:   "https://calendly.com/ceo-taikatranslations/financial-coaching-intake-session",
  finFollowup: "https://calendly.com/ceo-taikatranslations/financial-coaching-follow-up-session",
  finPackage:  "",   // 6-session package $550 (NOT set yet)
  leadSession: "https://calendly.com/ceo-taikatranslations/leadership-coaching-session",
  leadPackage: "",   // 6-session package $900 (NOT set yet)
};
```

### 2. Navigation: `src/components/Header.astro` and `src/components/Footer.astro`
Added a **"Pricing"** link to the header nav (between Services and Speaking) and to the footer "Navigate" list.

### 3. Supporting docs in the folder (not part of the built site)
- `pricing-plan.md`: the pricing structure/rationale.
- `booking-and-payment-setup.md`: step-by-step account setup guide (Stripe sub-account, Calendly, where to paste links).

---

## Calendly setup (DONE via the account)

- **Account handle:** `ceo-taikatranslations` (login: ceo@taikatranslations.com, so all booking notifications go to that inbox automatically).
- **Payment processor connected:** **PayPal** (not Stripe). A PayPal **Business** account is required.
- **Event types created** (all one-on-one, Google Meet, pay-at-booking via PayPal):
  - Financial Coaching: Intake Session · 45 min · **$150** → `/financial-coaching-intake-session`
  - Financial Coaching: Follow-Up Session · 45 min · **$100** → `/financial-coaching-follow-up-session`
  - Leadership Coaching: Session · **90 min** · **$175** → `/leadership-coaching-session`
- **Free intro call:** currently the default event still named **"45 Minute Meeting"** at `/30min`. It is FREE and works, but it's 45 min (site copy says 30). Optional cleanup: rename to "Free Intro Call" and set to 30 min.

### IMPORTANT: Calendly plan requirement
Collecting payment at booking is a **paid** Calendly feature (free plan can't charge). Cheapest tier that supports Stripe/PayPal payment collection is **Standard, ~$10/seat/mo billed annually** (~$12/mo monthly); there's a 14-day free trial. **Jason said he will upgrade.** Until the account is on Standard (or in trial), the paid session links will let people book WITHOUT being charged. Do a test booking after upgrading to confirm the PayPal charge flows through.

---

## What's STILL OPEN (to-do)

1. **Push the code to GitHub → Netlify to go live.** The changes (`pricing.astro`, `Header.astro`, `Footer.astro`) are saved in the folder but NOT yet pushed. Jason has **GitHub Desktop** installed. The plan is to commit ("Add pricing page with Calendly booking links") and Push origin from there; Netlify auto-deploys. (Pushing could not be done from the Cowork sandbox: no working git remote/credentials there.)
2. **Upgrade Calendly to Standard** (Jason's action: it's a subscription purchase). Then run a test booking on a paid event.
3. **Create the two 6-session package payment links** ($550 financial, $900 leadership) and paste them into `finPackage` / `leadPackage` in `pricing.astro`. Since the account is on Calendly's paid plan, the cleanest option is Calendly's built-in **"meeting packages & payment links"** feature (keeps everything in one place) rather than separate PayPal/Stripe links.
4. **Optional:** make the free intro call a true 30-min "Free Intro Call" (rename + shorten in Calendly), so it matches the site copy.

---

## Security note
A GitHub Personal Access Token (classic `ghp_...`) was pasted into the previous chat in plaintext and should be treated as compromised. **Revoke it** in GitHub → Settings → Developer settings → Personal access tokens. Do not paste tokens into chats; GitHub Desktop handles auth without them.

---

## Suggested first step for the new chat
"Here's the current state of my jasonehlinger.com pricing/booking work (see below). I've upgraded Calendly to Standard. Help me (a) create the two 6-session package payment links and add them to `pricing.astro`, and (b) confirm the pricing page is committed and live on Netlify." Then paste this file.

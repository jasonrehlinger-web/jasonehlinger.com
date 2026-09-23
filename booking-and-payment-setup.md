# Booking & Payment Setup: jasonehlinger.com

This is your checklist to turn on real booking and payment on the `/pricing` page. The page is already wired. You just create the accounts, then paste six links into one spot in the code.

**How it works once done:**
- **Free intro call** and **single sessions** → open a **Calendly** popup. For paid sessions, the client books and pays (via Stripe) in the same step.
- **6-session packages** → open a **Stripe Payment Link** (one-time payment). After they buy, you send them a private scheduling link to book their sessions.
- Until you paste in a link, that button quietly falls back to your **/contact** form, so nothing on the site ever looks broken while you set up.

---

## Part 1: Stripe sub-account (for the packages + session payments)

You said the company is already verified in Stripe and you want a separate account for this. Stripe supports exactly that: multiple accounts under one login, each with its own payouts and reporting. There's **no fee** to create or maintain an extra account. You only pay standard transaction fees when you actually process a payment.

1. Log into your existing Stripe account at dashboard.stripe.com.
2. Click the **account name** in the top-left → **+ Create account** (the account switcher). This creates a new account under the same login, separate from Taika's main account.
3. Name it something like **"Jason Ehlinger Coaching."**
4. Complete activation: business details, bank account for payouts, identity verification. It can be the same legal entity as Taika or a separate one: your call (and worth a quick word with your accountant on which entity the coaching income should land in).
5. Make sure the new account is in **Live mode** (toggle, top of dashboard) before creating anything below. Test-mode links won't take real money.

### Create the two Payment Links (for the packages)
Still inside the new coaching account:

1. Go to **Product catalog** (or **Payments → Payment Links → + New**).
2. Create Payment Link #1:
   - Product name: **Financial Coaching: 6-Session Package**
   - Price: **$550 USD**, one-time
   - Copy the resulting link (looks like `https://buy.stripe.com/xxxxxxxx`).
3. Create Payment Link #2:
   - Product name: **Leadership Coaching: 6-Session Package**
   - Price: **$900 USD**, one-time
   - Copy the link.

Keep both links handy. They go into the code in Part 3 (`finPackage` and `leadPackage`).

### Turn on "you got paid" emails to your CEO inbox
In the coaching account: **Settings → Business → Notifications** (or **Personal settings → Notifications**) → turn on **"Successful payments"** email alerts and confirm they go to **ceo@taikatranslations.com**. That's your notification whenever a package sells.

> Note: Calendly-based session payments (Part 2) will also flow into this same Stripe account, since Calendly connects to it.

---

## Part 2: Calendly (booking + pay-at-booking for sessions)

You don't have a Calendly account yet, so start clean and create it under the right email so notifications land where you want them.

### Create the account
1. Go to **calendly.com** and sign up using **ceo@taikatranslations.com**. Because every booking confirmation goes to the account's email by default, this is the simplest way to get your "someone booked" notification at your CEO inbox, no extra config needed.
2. Set your name, timezone, and connect the calendar you actually use (Google / Outlook) so it blocks off your real availability.

### You'll need a paid Calendly plan for the paid sessions
Collecting payment at booking is a **paid Calendly feature** (their Standard tier). The **free plan is fine for the free intro call**, but the $150 / $100 / $175 sessions need the upgrade. Check current pricing on Calendly's pricing page before subscribing. Plans and prices change.

### Connect Stripe to Calendly
1. In Calendly: **Account → Integrations → Payments → Stripe → Connect.**
2. When it sends you to Stripe to authorize, **make sure you connect the new coaching sub-account** (not Taika's main account). Stripe will show an account picker. Pick the coaching one.

### Create the event types
Create these four. For each, set **duration** and, where noted, turn on payment (**event type → More options → Payment → toggle "Require payment to book this meeting" → processor: Stripe → amount**):

| Event type | Duration | Payment |
|---|---|---|
| **Free Intro Call** | 30 min | None (free) |
| **Financial: Intake Session** | 45 min | $150 |
| **Financial: Follow-Up Session** | 45 min | $100 |
| **Leadership: Session** | 45 min | $175 |

Copy each event type's public link (looks like `https://calendly.com/your-name/free-intro-call`). These four go into the code (`introCall`, `finIntake`, `finFollowup`, `leadSession`).

### Double-check notifications
Calendly emails the host (you, at ceo@taikatranslations.com) on every new booking automatically. If you ever want a second recipient, that's under **Account → Notifications**, but the default already covers your request.

---

## Part 3: Paste the six links into the site

Open `src/pages/pricing.astro`. Right at the top you'll see this block. Replace the empty `""` with your real URLs:

```js
const booking = {
  introCall:   "https://calendly.com/your-name/free-intro-call",
  finIntake:   "https://calendly.com/your-name/financial-intake",
  finFollowup: "https://calendly.com/your-name/financial-follow-up",
  finPackage:  "https://buy.stripe.com/xxxxxxxx",   // $550
  leadSession: "https://calendly.com/your-name/leadership-session",
  leadPackage: "https://buy.stripe.com/yyyyyyyy",   // $900
};
```

Then commit and push to GitHub. Netlify redeploys automatically in a minute or two, and the buttons go live. Any link you leave blank keeps falling back to `/contact`, so you can turn these on one at a time.

---

## Quick recap of what you need to create

- [ ] Stripe: create coaching **sub-account**, activate, set to Live mode
- [ ] Stripe: **Payment Link $550** (financial 6-pack)
- [ ] Stripe: **Payment Link $900** (leadership 6-pack)
- [ ] Stripe: turn on **"Successful payments"** email → ceo@taikatranslations.com
- [ ] Calendly: sign up as **ceo@taikatranslations.com**, connect calendar
- [ ] Calendly: **upgrade to a paid plan** (for pay-at-booking)
- [ ] Calendly: **connect Stripe** → the coaching sub-account
- [ ] Calendly: create **4 event types** (intro free; $150; $100; $175)
- [ ] Code: paste the **6 links** into `pricing.astro`, commit & push

When you've got the accounts made, send me the six links and I'll drop them into the code and push for you.

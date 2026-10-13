# Haki Yangu — USSD + SMS legal rights & referral service (Kenya)

Built for the Africa's Talking Women in Tech Hackathon — Legal & Policy Advocacy theme.

## What it does
- USSD menu covering 4 topics: Land & Property, GBV & Safety, Workplace Rights,
  Marriage & Inheritance — each grounded in real Kenyan legislation.
- "Send this to my phone" — pushes the full guide + referral contact via SMS,
  since USSD sessions expire and people need something to keep or forward.
- "Report an issue" — structured intake by category, returns a reference number,
  and SMS-confirms it (simulating a handoff to a partner org).
- `GET /reports` — quick way to show judges the intake data live during the demo.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Africa's Talking **sandbox**
   credentials from https://account.africastalking.com (Settings → API Key).
   Sandbox username is literally `sandbox`.
3. `npm start` — runs on port 3000 by default.
4. Expose it publicly for the AT sandbox to reach, e.g.:
   ```
   npx ngrok http 3000
   ```
5. In the AT sandbox dashboard: create a USSD channel, set the callback URL to
   `https://<your-ngrok-url>/ussd`.
6. Test using the AT sandbox USSD simulator (Launch → Simulator) with any
   sandbox test phone number.

## Demo tips for judges
- Walk one full path live: dial in → pick a topic → show the SMS actually
  arrive on the sandbox test number → show `/reports` after filing a report.
- Have the disclaimer line ready to say out loud: this delivers *general
  information*, not legal advice, and the "Report an issue" flow is a stand-in
  for a real referral partnership (FIDA-Kenya, NLAS, etc.) that a production
  version would need to formalize before launch.
- If you add the Voice/IVR stretch goal, keep it to one topic read aloud —
  better to demo one channel well than three channels half-working.

## Before any real-world use
- Numbers/content here (1195, 116, FIDA-Kenya 0800 720 050) were verified at
  time of writing but should be re-checked before deployment — these
  organizations occasionally change lines.
- Legal content should get a review pass from an actual lawyer or the partner
  org before this touches real users; it's written to be accurate at a
  general level, not to substitute for professional review.

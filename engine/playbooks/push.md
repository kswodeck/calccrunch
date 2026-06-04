# Playbook: Push Notification (OneSignal)

Goal: a single, well-timed nudge that drives a return visit. OneSignal is already wired
(`PushNotification.astro`). Send sparingly — at most ~1–2/week — or opt-outs spike.

## When to send

- A new calculator (or batch) just shipped that the segment will care about.
- A timely hook (tax season → tax calculators; New Year → budget/FIRE; summer → gas mileage).

## Copy template

- **Title** (≤40 chars): the value, not the feature. e.g. "Convert kg → lbs instantly 🔄"
- **Message** (≤120 chars): one concrete benefit + implicit CTA.
  e.g. "New free converter — no sign-up. Tap to try it."
- **Launch URL**: deep-link straight to the calculator, not the homepage.

## Rules

- One idea per push. Always deep-link. Never send two days in a row.
- Match seasonal intent. Track CTR in OneSignal and keep what works.

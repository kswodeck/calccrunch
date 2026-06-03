# Content Backlog (prioritized)

Each item is a winnable search target that funnels to a calculator. Work top-down.
Status: `todo` | `done` | `wip`. Update as you ship.

## Tier 1 — High-volume conversions (programmatic; add rows to `conversions.json`)

These are huge-volume, low-difficulty queries. Each is one row + `npm run gen:conversions`.

| Slug | Query | Status |
|---|---|---|
| kg-to-lbs / lbs-to-kg | "kg to lbs" | done |
| cm-to-inches / inches-to-cm | "cm to inches" | done |
| celsius-to-fahrenheit / fahrenheit-to-celsius | "celsius to fahrenheit" | done |
| miles-to-km / km-to-miles | "miles to km" | done |
| grams-to-ounces / ounces-to-grams | "grams to ounces" | todo |
| feet-to-meters / meters-to-feet | "feet to meters" | todo |
| ml-to-cups / cups-to-ml | "ml to cups" | todo |
| liters-to-gallons / gallons-to-liters | "liters to gallons" | todo |
| mph-to-kmh / kmh-to-mph | "mph to kmh" | todo |
| feet-to-inches / inches-to-feet | "feet to inches" | todo |

## Tier 2 — High-intent everyday calculators (bespoke; `npm run new:calc`)

| Slug | Query | Category | Status |
|---|---|---|---|
| sales-tax-calculator | "sales tax calculator" | financial | done |
| discount-calculator | "discount calculator" / "percent off" | math-conversions | done |
| salary-to-hourly-calculator | "salary to hourly" | financial | todo |
| hourly-to-salary-calculator | "hourly to salary" | financial | todo |
| hours-calculator | "hours calculator" (time card) | time-date | todo |
| overtime-calculator | "overtime pay calculator" | financial | todo |
| date-difference-calculator | "days between dates" | time-date | todo |

## Tier 3 — Math & misc (bespoke)

| Slug | Query | Category | Status |
|---|---|---|---|
| fraction-calculator | "fraction calculator" | math-conversions | todo |
| percentage-change-calculator | "percentage change" | math-conversions | todo |
| average-calculator | "average calculator" | math-conversions | todo |
| ratio-calculator | "ratio calculator" | math-conversions | todo |

## Tier 4 — Health (bespoke)

| Slug | Query | Category | Status |
|---|---|---|---|
| due-date-calculator | "due date calculator" | health-fitness | todo |
| water-intake-calculator | "water intake calculator" | health-fitness | todo |
| pace-calculator | "running pace calculator" | health-fitness | todo |

## Blog backlog (informational queries → funnel to calculators)

Each post links ≥2 calculators via `relatedCalculators`.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| kg-to-lbs-conversion-guide | "how to convert kg to lbs" | kg-to-lbs, lbs-to-kg | done |
| sales-tax-by-state-guide | "sales tax by state" | sales-tax-calculator | done |
| how-to-calculate-a-discount | "how to calculate a discount" | discount-calculator, percentage-calculator | done |
| celsius-fahrenheit-explained | "celsius to fahrenheit formula" | celsius-to-fahrenheit, fahrenheit-to-celsius | todo |
| salary-vs-hourly-pay | "salary vs hourly" | salary-to-hourly-calculator, paycheck-calculator | todo |

## Retention backlog

- [x] Backfill FAQ + HowTo schema for high-traffic calculators missing it (validator lists them).
- [ ] Enable MailerLite RSS-to-email automation off `/rss.xml`.
- [ ] OneSignal push on each new-calculator batch.
- [ ] Densify `relatedCalculators` site-wide (bidirectional links).

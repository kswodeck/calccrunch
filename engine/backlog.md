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
| grams-to-ounces / ounces-to-grams | "grams to ounces" | done |
| feet-to-meters / meters-to-feet | "feet to meters" | done |
| ml-to-cups / cups-to-ml | "ml to cups" | done |
| liters-to-gallons / gallons-to-liters | "liters to gallons" | done |
| mph-to-kmh / kmh-to-mph | "mph to kmh" | done |
| feet-to-inches / inches-to-feet | "feet to inches" | done |

## Tier 2 — High-intent everyday calculators (bespoke; `npm run new:calc`)

| Slug | Query | Category | Status |
|---|---|---|---|
| sales-tax-calculator | "sales tax calculator" | financial | done |
| discount-calculator | "discount calculator" / "percent off" | math-conversions | done |
| salary-to-hourly-calculator | "salary to hourly" | financial | done |
| hourly-to-salary-calculator | "hourly to salary" | financial | done |
| hours-calculator | "hours calculator" (time card) | time-date | done |
| overtime-calculator | "overtime pay calculator" | financial | done |
| date-difference-calculator | "days between dates" | time-date | done |

## Tier 3 — Math & misc (bespoke)

| Slug | Query | Category | Status |
|---|---|---|---|
| fraction-calculator | "fraction calculator" | math-conversions | done |
| percentage-change-calculator | "percentage change" | math-conversions | done |
| average-calculator | "average calculator" | math-conversions | done |
| ratio-calculator | "ratio calculator" | math-conversions | done |
| unit-price-calculator | "unit price calculator" / "cost per ounce calculator" | math-conversions | todo |
| gcf-lcm-calculator | "GCF and LCM calculator" | math-conversions | todo |
| aspect-ratio-calculator | "aspect ratio calculator" (16:9, 4:3) | math-conversions | todo |

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
| celsius-fahrenheit-explained | "celsius to fahrenheit formula" | celsius-to-fahrenheit, fahrenheit-to-celsius | done |
| salary-vs-hourly-pay | "salary vs hourly" | salary-to-hourly-calculator, paycheck-calculator | done |

## Blog backlog (new ideas from 2026-06-20 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| fraction-calculator-guide | "how to add fractions" / "fraction calculator" | fraction-calculator, percentage-calculator | done |
| how-to-calculate-percentage-change | "percentage change formula" | percentage-calculator, fraction-calculator | done |
| running-pace-guide | "how to calculate running pace" / "pace calculator" | pace-calculator, calories-burned-calculator | todo |
| how-much-water-should-you-drink | "how much water per day" / "water intake calculator" | water-intake-calculator, calorie-calculator | todo |
| average-vs-median | "average vs median" / "how to calculate average" | average-calculator, percentage-calculator | done |

## Blog backlog (new ideas from 2026-06-22 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| ratio-calculator-guide | "how to calculate a ratio" / "ratio simplifier" | ratio-calculator, fraction-calculator | done |
| average-calculator-guide | "how to find the average" / "mean median mode" | average-calculator, percentage-calculator | done |
| percentage-change-calculator-bespoke | Ship the actual percentage-change-calculator tool (Tier 3) | percentage-calculator, fraction-calculator | done |
| summer-road-trip-fuel-cost | "road trip fuel cost calculator" (summer seasonal) | gas-mileage-calculator, budget-calculator | done |
| back-to-school-budget-guide | "back to school budget" / "school supply costs" | budget-calculator, savings-goal-calculator | done |

## Blog backlog (new ideas from 2026-06-29 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| pace-calculator | Build pace-calculator tool first (Tier 4) then post | pace-calculator, calories-burned-calculator | todo |
| water-intake-calculator | Build water-intake-calculator tool first (Tier 4) then post | water-intake-calculator, calorie-calculator | todo |
| percentage-change-calculator | Ship percentage-change-calculator tool (Tier 3) then guide | percentage-calculator, average-calculator | done |
| ratio-calculator | Ship ratio-calculator tool (Tier 3) then guide | fraction-calculator, average-calculator | done |
| back-to-school-budget-guide | "back to school budget checklist 2026" | budget-calculator, savings-goal-calculator | done |

## Blog backlog (new ideas from 2026-07-06 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| ratio-calculator-guide | "how to simplify a ratio" / "ratio calculator" | ratio-calculator, fraction-calculator, average-calculator | done |
| running-pace-guide | "running pace calculator" / "how to calculate pace per mile" | pace-calculator, calories-burned-calculator | todo |
| how-much-water-should-you-drink | "water intake calculator" / "how much water per day" | water-intake-calculator, calorie-calculator, bmi-calculator | todo |
| due-date-calculator-guide | "pregnancy due date" / "how is due date calculated" | pregnancy-calculator, date-difference-calculator | todo |
| standard-deviation-guide | "how to calculate standard deviation" / "what is standard deviation" | average-calculator, percentage-change-calculator | todo |

## Blog backlog (new ideas from 2026-07-13 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| back-to-school-tax-free-weekend-2026 | "tax free weekend 2026" / "back to school sales tax holiday" | sales-tax-calculator, discount-calculator, budget-calculator | done |
| college-dorm-budget-guide | "college dorm essentials budget" / "how much does move-in cost" | budget-calculator, savings-goal-calculator | todo |
| unit-price-calculator-guide | "how to calculate unit price" / "better buy calculator" | unit-price-calculator, ratio-calculator | todo |

## Retention backlog

- [x] Backfill FAQ + HowTo schema for high-traffic calculators missing it (validator lists them).
- [ ] Enable MailerLite RSS-to-email automation off `/rss.xml`.
- [ ] OneSignal push on each new-calculator batch.
- [ ] Densify `relatedCalculators` site-wide (bidirectional links).

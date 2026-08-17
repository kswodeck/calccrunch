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
| unit-price-calculator | "unit price calculator" / "cost per ounce calculator" | math-conversions | done |
| gcf-lcm-calculator | "GCF and LCM calculator" | math-conversions | done |
| aspect-ratio-calculator | "aspect ratio calculator" (16:9, 4:3) | math-conversions | done — shipped 2026-08-17 run |

## Tier 4 — Health (bespoke)

| Slug | Query | Category | Status |
|---|---|---|---|
| due-date-calculator | "due date calculator" | health-fitness | todo |
| water-intake-calculator | "water intake calculator" | health-fitness | done |
| pace-calculator | "running pace calculator" | health-fitness | done |

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
| running-pace-guide | "how to calculate running pace" / "pace calculator" | pace-calculator, calories-burned-calculator | done |
| how-much-water-should-you-drink | "how much water per day" / "water intake calculator" | water-intake-calculator, calorie-calculator | done |
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
| pace-calculator | Build pace-calculator tool first (Tier 4) then post | pace-calculator, calories-burned-calculator | done |
| water-intake-calculator | Build water-intake-calculator tool first (Tier 4) then post | water-intake-calculator, calorie-calculator | done |
| percentage-change-calculator | Ship percentage-change-calculator tool (Tier 3) then guide | percentage-calculator, average-calculator | done |
| ratio-calculator | Ship ratio-calculator tool (Tier 3) then guide | fraction-calculator, average-calculator | done |
| back-to-school-budget-guide | "back to school budget checklist 2026" | budget-calculator, savings-goal-calculator | done |

## Blog backlog (new ideas from 2026-07-06 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| ratio-calculator-guide | "how to simplify a ratio" / "ratio calculator" | ratio-calculator, fraction-calculator, average-calculator | done |
| running-pace-guide | "running pace calculator" / "how to calculate pace per mile" | pace-calculator, calories-burned-calculator | done |
| how-much-water-should-you-drink | "water intake calculator" / "how much water per day" | water-intake-calculator, calorie-calculator, bmi-calculator | done |
| due-date-calculator-guide | "pregnancy due date" / "how is due date calculated" | pregnancy-calculator, date-difference-calculator | todo |
| standard-deviation-guide | "how to calculate standard deviation" / "what is standard deviation" | average-calculator, percentage-change-calculator | todo |

## Blog backlog (new ideas from 2026-07-13 research run)

| Slug | Target query | Links to | Status |
|---|---|---|---|
| back-to-school-tax-free-weekend-2026 | "tax free weekend 2026" / "back to school sales tax holiday" | sales-tax-calculator, discount-calculator, budget-calculator | done |
| college-dorm-budget-guide | "college dorm essentials budget" / "how much does move-in cost" | budget-calculator, savings-goal-calculator | done |
| unit-price-calculator-guide | "how to calculate unit price" / "better buy calculator" | unit-price-calculator, ratio-calculator | done |

## Blog backlog (new ideas from 2026-07-20 research run)

why now: unit-price-calculator (Tier 3 tool) + its guide post + the college-dorm-budget-guide post all shipped
this run — real evidence: FTC unit-pricing rule / "price per ounce" comparisons are a stable high-intent query,
and multiple 2026 sources put dorm move-in costs at $400-$900, confirming both topics as worth building now
rather than waiting.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| gcf-lcm-calculator-guide | "how to find GCF and LCM" / "greatest common factor calculator" | gcf-lcm-calculator, fraction-calculator | done — shipped 2026-08-10 run |
| aspect-ratio-guide | "aspect ratio calculator 16:9 4:3" / "how to calculate aspect ratio" | aspect-ratio-calculator, ratio-calculator | done — shipped 2026-08-17 run |
| student-loan-rate-changes-2026-2027 | "student loan interest rate 2026 2027" | student-loan-calculator, loan-amortization-calculator | done — shipped 2026-08-03 run once 2026-2027 federal rates (6.52%/8.07%/9.07%) were confirmed finalized |
| running-pace-guide | "running pace calculator" / "how to calculate pace per mile" (carried over — still blocked on pace-calculator tool, Tier 4) | pace-calculator, calories-burned-calculator | done |
| how-much-water-should-you-drink | "how much water should I drink calculator" / "water intake calculator" (carried over — still blocked on water-intake-calculator tool, Tier 4; EFSA/NAS guideline ranges confirmed current) | water-intake-calculator, calorie-calculator, bmi-calculator | done |

## Blog backlog (new ideas from 2026-07-27 research run)

why now: shipped water-intake-calculator (Tier 4 tool, previously blocking two carried-over guide entries above)
plus its "how much water should you drink" guide this run — NASEM/CDC hydration guidance is evergreen and summer
heat searches confirm current demand. Also shipped days-between-dates-guide, a net-new topic (verified no existing
post covered it) surfaced by back-to-school "days until school starts" countdown search interest in late July 2026.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| days-between-dates-guide | "days between two dates" / "how many days until school starts" (net-new topic, not previously in backlog — filled a genuine content gap) | date-difference-calculator, age-calculator, business-days-calculator | done |
| pace-calculator | "running pace calculator" (Tier 4 tool, still todo — build next so running-pace-guide can finally ship) | pace-calculator, calories-burned-calculator | done |
| labor-day-2026-money-deadlines | "Labor Day 2026 sales" / "September financial deadlines" (FAFSA correction Sept 14, Q3 estimated tax Sept 15, 2026 — confirmed real calendar dates at research time) | sales-tax-calculator, budget-calculator | done — Q3 estimated-tax angle shipped 2026-08-10 run as q3-estimated-tax-deadline-2026 (self-employment-tax-calculator, freelance-rate-calculator, budget-calculator); FAFSA-correction/Labor-Day-sales angle still open if worth a separate post |
| fsa-hsa-2026-contribution-limits | "2026 FSA limit" / "2026 HSA contribution limit" | budget-calculator, savings-goal-calculator | done — shipped 2026-08-17 run |
| gcf-lcm-calculator-guide | "how to find GCF and LCM" / "greatest common factor calculator" (carried over — still blocked on gcf-lcm-calculator tool, Tier 3) | gcf-lcm-calculator, fraction-calculator | done — shipped 2026-08-10 run |

## Blog backlog (new ideas from 2026-08-03 research run)

why now: shipped pace-calculator (Tier 4 tool, previously blocking running-pace-guide across 4 research runs)
plus its guide this run, and shipped student-loan-rate-changes-2026-2027 once the 2026-2027 federal rates
(6.52% undergrad / 8.07% grad / 9.07% PLUS, effective July 1 2026) were confirmed finalized via FSA Partners'
official announcement — no longer needs to "hold." Also confirmed 2026 FSA/HSA contribution limits are now
locked (previously held), and surfaced GPA calculation as a new evergreen back-to-school query with no existing
calculator or post on the site.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| fsa-hsa-2026-contribution-limits | "2026 FSA contribution limit" / "2026 HSA contribution limit" (no longer on hold — figures finalized) | budget-calculator, savings-goal-calculator | done — shipped 2026-08-17 run |
| gpa-calculator | "GPA calculator" / "how to calculate weighted GPA" (net-new — no existing calculator or post covers this) | math-conversions | done |
| gpa-calculator-guide | "how to calculate GPA" / "weighted vs unweighted GPA" | gpa-calculator, average-calculator | done |
| labor-day-2026-sales-tax-holidays | "Labor Day 2026 tax free weekend" (Louisiana Second Amendment holiday Sept 4-6; Florida hunting/fishing/camping exemption starts Sept 1) — more specific than the general labor-day-2026-money-deadlines idea above | sales-tax-calculator, discount-calculator | todo |
| gcf-lcm-calculator | "GCF and LCM calculator" (Tier 3 tool, carried over — build next so its guide can finally ship) | gcf-lcm-calculator, fraction-calculator | done — shipped 2026-08-10 run |

## Blog backlog (new ideas from 2026-08-10 research run)

why now: shipped gcf-lcm-calculator (Tier 3 tool, carried over across three prior research runs) plus its guide
post this run — GCF/LCM is a stable back-to-school math-homework query with no seasonal decay. Also shipped
q3-estimated-tax-deadline-2026, timed ~4 weeks ahead of the real September 15, 2026 IRS deadline (one week after
Labor Day) so it has time to rank before search volume peaks; confirmed via IRS quarterly-schedule sources that
this date has no weekend/holiday shift. Also confirmed 2026 FSA ($3,400) / HSA ($4,400 individual / $8,750 family)
limits remain finalized per Revenue Procedure 2025-32 (carried over, still todo below) and confirmed most state
sales-tax holidays cluster in late July–early August, not Labor Day — deprioritizing the Labor-Day-specific sales
tax angle in favor of the FSA/HSA and aspect-ratio topics below.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| fsa-hsa-2026-contribution-limits | "2026 FSA contribution limit" / "2026 HSA contribution limit" (carried over — figures finalized via Revenue Procedure 2025-32: FSA $3,400, HSA $4,400 individual/$8,750 family) | budget-calculator, savings-goal-calculator | done — shipped 2026-08-17 run |
| aspect-ratio-calculator + aspect-ratio-guide | "aspect ratio calculator 16:9 4:3" / "how to calculate aspect ratio" (Tier 3 tool still todo — build next) | ratio-calculator, gcf-lcm-calculator | done — shipped 2026-08-17 run |
| fall-marathon-training-plan-guide | "marathon training plan" / "when to start training for a fall marathon" — September–November is peak marathon season and most 12-20 week plans should already be starting in August; verified via race-calendar sources this run | pace-calculator, calories-burned-calculator | todo (net-new, no existing post covers training-plan timing specifically) |
| weighted-gpa-scale-changes-guide | "weighted GPA scale" / "how do AP and honors classes affect GPA" — several districts are rolling out new weighted-GPA policies for 2025-2026, a real back-to-school search driver surfaced this run | gpa-calculator, average-calculator | todo (net-new angle distinct from existing gpa-calculator-guide, which covers the basic formula) |
| q4-estimated-tax-deadline-guide | "Q4 estimated tax deadline" / "January 15 estimated tax" — natural follow-up to q3-estimated-tax-deadline-2026 shipped this run, for the January 15, 2027 deadline | self-employment-tax-calculator, freelance-rate-calculator | todo (hold until ~4-5 weeks before Jan 15, 2027, per scheduling lead time used this run) |

## Blog backlog (new ideas from 2026-08-17 research run)

why now: shipped aspect-ratio-calculator (Tier 3 tool, carried over across two prior research runs) plus its guide
this run — confirmed via WebSearch that "aspect ratio calculator 16:9 4:3" remains a stable, undated query with no
seasonal decay. Also shipped fsa-hsa-2026-contribution-limits once the Dependent Care FSA $7,500 figure (up from
$5,000, first change in 25 years via the One Big Beautiful Bill Act) was independently cross-confirmed against the
existing $3,400 Health FSA / $4,400-$8,750 HSA figures from Revenue Procedure 2025-32 — timed ~2-3 weeks ahead of
typical fall open-enrollment windows so it has time to rank. Labor Day 2026 was confirmed via this run's research
as September 7, 2026, which pushes the still-open labor-day-2026-sales-tax-holidays idea from the 2026-08-03 run
into a tighter, better-defined publish window (ship by ~Aug 24-28 to land before the holiday). Also carried forward
fall-marathon-training-plan-guide and weighted-gpa-scale-changes-guide from the 2026-08-10 run, neither selected
this run but still valid net-new angles once their linked tools/posts have bandwidth.

| Slug | Target query | Links to | Status |
|---|---|---|---|
| labor-day-2026-sales-tax-holidays | "Labor Day 2026 tax free weekend" (Labor Day confirmed Sept 7, 2026 this run — Louisiana Second Amendment holiday Sept 4-6, Florida hunting/fishing/camping exemption starts Sept 1; publish by ~Aug 24-28 to land before the holiday) | sales-tax-calculator, discount-calculator | todo (carried over from 2026-08-03 run, now time-boxed) |
| fall-marathon-training-plan-guide | "marathon training plan" / "when to start training for a fall marathon" — September-November is peak marathon season; carried over, still net-new, no existing post covers training-plan timing | pace-calculator, calories-burned-calculator | todo (carried over from 2026-08-10 run) |
| weighted-gpa-scale-changes-guide | "weighted GPA scale" / "how do AP and honors classes affect GPA" — distinct back-to-school angle from the existing gpa-calculator-guide, which only covers the basic formula | gpa-calculator, average-calculator | todo (carried over from 2026-08-10 run) |
| standard-deviation-guide | "how to calculate standard deviation" / "what is standard deviation" — evergreen math-homework query, carried over across multiple runs with no seasonal urgency | average-calculator, percentage-change-calculator | todo (carried over from 2026-07-06 run) |
| due-date-calculator-guide | "pregnancy due date" / "how is due date calculated" — still blocked on the due-date-calculator tool (Tier 4, todo above) | pregnancy-calculator, date-difference-calculator | todo (build due-date-calculator tool first) |

## Retention backlog

- [x] Backfill FAQ + HowTo schema for high-traffic calculators missing it (validator lists them).
- [ ] Enable MailerLite RSS-to-email automation off `/rss.xml`.
- [ ] OneSignal push on each new-calculator batch.
- [ ] Densify `relatedCalculators` site-wide (bidirectional links).

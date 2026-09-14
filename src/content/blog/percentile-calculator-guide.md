A percentile tells you how one value compares to the rest of a data set. If you scored in the **90th percentile** on a test, that means you scored at or above roughly 90% of everyone else who took it — regardless of your raw score. The formula for percentile rank is: **(values below your score + 0.5 × values tied with your score) ÷ total number of values × 100**. Below, we'll walk through that formula step by step, show you how to work the calculation in reverse (finding the value at a given percentile), and clear up the difference between a percentile and a percentage — two terms that get mixed up constantly.

If you just want the answer, plug your numbers into the [percentile calculator](/calculators/percentile-calculator) and skip the manual math entirely.

## Percentile Rank vs. Percentage: Don't Confuse Them

This is the single most common point of confusion, so let's clear it up first.

- **Percentage** measures how many points you earned out of the total possible — 90% means you got 90 out of 100 possible points.
- **Percentile** measures how you rank against a group — 90th percentile means you scored better than 90% of the people in that group.

These can tell very different stories. If a test is easy and everyone scores 95%+, a 95% score might only land you in the 40th percentile. If a test is brutally hard and most people score 40%, a 55% score could land you in the 90th percentile. The percentage tells you about your performance in isolation; the percentile tells you about your performance relative to everyone else.

## How to Calculate Percentile Rank (Step by Step)

To find what percentile a specific value falls at within a data set:

1. **Sort your data** from smallest to largest.
2. **Count how many values are strictly below** your target value.
3. **Count how many values are tied** with your target value.
4. **Apply the formula:**

```
Percentile rank = (values below + 0.5 × values tied) ÷ N × 100
```

The `0.5 × tied` adjustment exists so that a value tied with several others gets a fair "average" rank instead of always rounding down.

### Worked Example

Say ten students score the following on a quiz: **55, 62, 68, 70, 74, 77, 81, 84, 90, 95**. What percentile is a score of 77?

- Values below 77: 62, 68, 70, 74, 55 → **5 values**
- Values tied with 77: **1 value** (77 itself)
- N = 10

```
Percentile = (5 + 0.5 × 1) ÷ 10 × 100 = 5.5 ÷ 10 × 100 = 55th percentile
```

A score of 77 sits at the 55th percentile — right around the middle of the group, slightly above average.

## How to Find the Value at a Given Percentile

Sometimes you want to go the other direction: given a percentile, what's the actual value? This is how standardized test score charts and growth charts are built, and it's the calculation behind Excel's `PERCENTILE.INC` function and Google Sheets' `PERCENTILE` function.

1. **Sort your data** from smallest to largest.
2. **Calculate the index:** `index = (p ÷ 100) × (N − 1)`, where `p` is the percentile you want and `N` is the number of values.
3. **If the index is a whole number**, that position in the sorted list is your answer.
4. **If it's not a whole number**, interpolate between the two nearest values.

### Worked Example

Using the same ten scores (55, 62, 68, 70, 74, 77, 81, 84, 90, 95), what's the value at the 75th percentile?

```
index = (75 ÷ 100) × (10 − 1) = 0.75 × 9 = 6.75
```

The index 6.75 falls between position 6 (value 81, using 0-based indexing) and position 7 (value 84). Interpolating:

```
Value = 81 + 0.75 × (84 − 81) = 81 + 2.25 = 83.25
```

So the 75th percentile of this data set is **83.25**.

## Percentile vs. Percentage vs. Z-Score

| Measure | What it tells you | Needs a distribution assumption? | Typical use case |
|---|---|---|---|
| **Percentage** | Points earned ÷ points possible | No | Grading a single test |
| **Percentile** | Rank compared to actual observed data | No — works with raw, real data | Standardized test scores, growth charts, salary bands |
| **Z-score** | Standard deviations from the mean | Yes — assumes a normal (bell curve) distribution | Comparing values across different normal distributions, quality control |

If your data doesn't follow a normal distribution, or you'd rather not assume it does, percentile rank (calculated directly from your actual data, as shown above) is more accurate than converting to a z-score. If you already know your mean and standard deviation and are comfortable assuming normality, the [z-score calculator](/calculators/z-score-calculator) will get you a percentile estimate faster. And if you just need the mean, median, or mode of your data set first, the [average calculator](/calculators/average-calculator) handles that in one step.

## Common Situations Where Percentiles Matter

- **Standardized tests** (SAT, ACT, GRE): your percentile shows how you performed relative to other test-takers, which matters more to admissions committees than your raw score alone.
- **Growth charts**: pediatricians track a child's height/weight percentile relative to peers of the same age, not an absolute number.
- **Salary bands**: HR teams often describe compensation as "75th percentile for this role" to benchmark against market data.
- **Web performance / analytics**: p95 and p99 latency (95th and 99th percentile response times) are standard ways engineers describe how slow the *worst* requests are, since averages hide outliers.

## Frequently Asked Questions

**Is the 50th percentile the same as the median?**
Yes. The 50th percentile is, by definition, the median — the value that splits your sorted data exactly in half.

**Can two different percentile calculators give different answers for the same data?**
Yes, slightly. There are several accepted methods for interpolating between values (Excel's `PERCENTILE.INC` vs. `PERCENTILE.EXC`, or the "nearest rank" method used in some statistics textbooks). They usually land close together but can differ by small amounts, especially with small data sets. This guide and the calculator above use linear interpolation (`PERCENTILE.INC`), the most common default.

**What percentile is considered "good"?**
It depends entirely on context. In many test-score contexts, the 75th percentile or higher is considered strong. But for something like injury risk or cholesterol, a *lower* percentile is usually the goal — so always check what's actually being measured.

**Do I need a large data set for percentiles to mean anything?**
Percentiles technically work with any data set of 2 or more values, but they get noisier and less meaningful with very small samples. A single value at the "90th percentile" of a 3-item list isn't nearly as informative as it would be in a data set of 1,000.

**How is percentile different from a percentile rank on a normal curve (like IQ scores)?**
IQ scores and similar tests often report percentiles based on an assumed normal distribution of the whole population, not just your specific sample — that's a z-score-based percentile, calculated differently from the raw-data method shown here, even though both are called "percentiles."

## The Bottom Line

Percentile rank tells you where a value stands relative to real, observed data — no assumptions about the shape of the distribution required. To find the percentile of a specific value, count how many values fall below and beside it and divide by the total; to find the value at a specific percentile, sort your data and interpolate. Skip the manual math with the [percentile calculator](/calculators/percentile-calculator), which handles both directions instantly and shows the exact formula used. If your data does follow a normal distribution and you already know the mean and standard deviation, the [z-score calculator](/calculators/z-score-calculator) is a faster path to the same kind of answer — and the [average calculator](/calculators/average-calculator) is the right first stop if you need summary statistics before you start.

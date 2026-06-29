The **average (mean)** adds all your values and divides by the count. The **median** finds the middle value when everything is sorted. Most of the time they're close — but when they differ sharply, one of them is almost always telling you something important that the other one hides.

Use our free [average calculator](/calculators/average-calculator) to find both the mean and median of any set of numbers instantly.

## The Core Difference in One Example

Imagine five friends compare their annual salaries:

| Person | Salary |
|---|---|
| Alex | $42,000 |
| Jordan | $45,000 |
| Morgan | $48,000 |
| Casey | $51,000 |
| Sam | $310,000 |

**Mean:** ($42,000 + $45,000 + $48,000 + $51,000 + $310,000) ÷ 5 = **$99,200**

**Median:** Sort the values → middle value = **$48,000**

The mean says the "average" salary is nearly $100K. But four of the five friends earn less than $52,000. Sam's unusually high salary dragged the mean upward. The median — the middle value — reflects what a typical person in this group actually earns.

This is exactly why economists and government agencies report **median household income**, not mean income.

## When to Use the Mean

The mean is the right choice when:

- **Data is symmetric and has no extreme outliers.** If all your values cluster around a center point, the mean and median will be nearly identical, and the mean is more statistically powerful.
- **You need a number you can do further math with.** The mean is used in standard deviation, variance, and most advanced statistics. The median is harder to work with algebraically.
- **You're averaging physical measurements.** Temperature readings, test scores in a controlled setting, manufacturing tolerances — these tend to be normally distributed, making the mean ideal.

### Mean examples where it works well

- Average daily temperature for the month of July
- Average score across your five math tests (80, 82, 78, 85, 79 → mean 80.8, median 80 — nearly the same)
- Average time to complete a task in a UX study

## When to Use the Median

The median is the right choice when:

- **Data has outliers or is skewed.** A single very high or very low value can move the mean dramatically while barely touching the median.
- **You want to represent the "typical" case.** Median home prices, median salaries, and median rents all answer "what does a typical person pay or earn?" more honestly than the mean.
- **The data has natural floors or ceilings.** Income can't go below zero but has no ceiling. This creates right-skewed distributions where the median is more representative.

### Median examples where it works well

- Home prices in a city (a few luxury properties push the mean up)
- Household income statistics
- Time-to-hire at a company (a few unusually long hires skew the mean)
- Customer wait times (rare very-long waits inflate the mean)

## Side-by-Side Comparison

| Situation | Better Measure | Why |
|---|---|---|
| Salary data with executives | Median | Outliers skew mean upward |
| Class test scores (no outliers) | Mean | Data is symmetric |
| Home prices in a city | Median | Luxury properties skew mean |
| Average temperature | Mean | Symmetric, normally distributed |
| Customer satisfaction ratings 1–5 | Mean or Median | Depends on distribution; check both |
| Time-on-site for web users | Median | Power users inflate the mean |
| Number of siblings | Median or Mode | Discrete data, often skewed |

## Understanding "Skewed" Data

Data is **right-skewed** (positively skewed) when a few large values drag the mean above the median. Income is the textbook example: most earners cluster at lower values, but a small number of high earners pull the mean up.

Data is **left-skewed** (negatively skewed) when a few very small values drag the mean below the median. Age at death in a country with low infant mortality is often left-skewed — most people live long lives, but early deaths pull the mean down.

**Rule of thumb:** If mean > median, the data is right-skewed. If mean < median, it's left-skewed. If they're roughly equal, the data is approximately symmetric.

<div class="callout">
<strong>Quick Check:</strong> Before reporting an average, calculate both the mean and median using the <a href="/calculators/average-calculator">average calculator</a>. If they differ by more than ~10–15%, your data is skewed and the median is probably the more honest number to use.
</div>

## Mean and Median Together Tell a Story

The gap between mean and median is itself informative. A large gap signals skewness. Consider:

- If a company reports **mean salary = $95,000** and **median salary = $52,000**, the gap tells you compensation is concentrated at the top. A few highly-paid executives or engineers are pulling the mean up.
- If mean and median are both $65,000, pay is distributed more evenly across employees.

Investors and analysts use this gap to identify inequality, risk, and distribution shape — without ever drawing a chart.

## The Mode: When Frequency Matters

The **mode** is the value that appears most often. It's different from both mean and median and is most useful for:

- **Categorical data** — e.g., the most common shoe size ordered (the mode), not the average shoe size (9.3 is not a real shoe size).
- **Discrete repeated values** — e.g., the most common number of children per household.
- **Survey responses** — e.g., the most common rating in a 1–5 star review.

The [average calculator](/calculators/average-calculator) reports the mode alongside the mean and median, flagging "None" when all values are unique and showing multiple modes when data is bimodal or multimodal.

## Practical Formulas

**Mean:** Sum all values, divide by the count.
> Mean = (x₁ + x₂ + … + xₙ) ÷ n

**Median (odd count):** Sort the values. The median is the value at position (n + 1) ÷ 2.
> For [3, 7, 9, 13, 15]: median = 9 (position 3 of 5)

**Median (even count):** Sort the values. Average the two middle values.
> For [3, 7, 9, 13]: median = (7 + 9) ÷ 2 = 8

You can also use the [percentage calculator](/calculators/percentage-calculator) if you need to express the gap between mean and median as a percentage difference.

## Frequently Asked Questions

**Is the average always higher than the median?**
No — only when data is right-skewed (outliers on the high end). With left-skewed data, the mean is lower than the median. With symmetric data, they're approximately equal.

**Can the mean and median be the same number?**
Yes. In a perfectly symmetric dataset like [1, 2, 3, 4, 5], both the mean and median equal 3.

**Which is more affected by outliers?**
The mean. Adding one extreme value (e.g., $1,000,000 to a salary list) can move the mean dramatically while the median shifts by at most one position in the sorted list.

**Why does the government use median income instead of mean income?**
Because income is right-skewed. A small number of very high earners inflate the mean well above what most households earn. The median gives a better picture of the typical household's financial situation.

**When should I report both?**
Always report both when your audience might care about the distribution shape — in research, business reporting, or any analysis where outliers matter. The difference between them is a free data point.

## The Bottom Line

The mean is the familiar "add and divide" average — powerful and mathematically useful, but sensitive to outliers. The median is the middle value — robust to extreme values and often more representative of what's typical.

**When in doubt:** calculate both. Use the [average calculator](/calculators/average-calculator) to get the mean, median, mode, range, and more from any list of numbers in seconds. If the two numbers differ significantly, the median is usually the more honest answer to share.

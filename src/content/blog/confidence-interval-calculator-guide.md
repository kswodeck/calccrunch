## What Is a Confidence Interval?

A **confidence interval** is a range of values, built around a sample statistic, that likely contains the true population value. To calculate one, take your sample statistic (a mean or a proportion), then add and subtract a **margin of error**: critical value × standard error. For a 95% confidence interval on a mean, the formula is **x̄ ± t × (s ÷ √n)**, where x̄ is the sample mean, s is the sample standard deviation, and n is the sample size. Plug your numbers into the [confidence interval calculator](/calculators/confidence-interval-calculator) to get the full interval, margin of error, and critical value in seconds.

Confidence intervals show up everywhere sample data is used to estimate something about a larger group: political polling ("52% ± 3 points"), A/B testing, clinical trials, quality control, and classroom statistics homework.

## The Confidence Interval Formula, Step by Step

There are two common versions, depending on whether you're estimating a **mean** (an average) or a **proportion** (a percentage).

### For a Sample Mean

1. **Find your sample mean (x̄)** and **sample standard deviation (s)**. If you're starting from a raw list of numbers, the [standard deviation calculator](/calculators/standard-deviation-calculator) computes both instantly.
2. **Find the standard error**: SE = s ÷ √n, where n is your sample size.
3. **Look up the critical value (t)** for your confidence level and degrees of freedom (n − 1). This calculator does that lookup for you.
4. **Calculate the margin of error**: margin = t × SE.
5. **Build the interval**: x̄ − margin to x̄ + margin.

### For a Sample Proportion

1. **Find your sample proportion (p̂)** — the percentage of your sample with the trait you're measuring (e.g. 62% said "yes").
2. **Find the standard error**: SE = √(p̂(1 − p̂) ÷ n).
3. **Look up the critical value (z)** for your confidence level — 1.960 for 95%, 2.576 for 99%, etc.
4. **Calculate the margin of error**: margin = z × SE.
5. **Build the interval**: p̂ − margin to p̂ + margin.

### Worked Example: Mean

A researcher measures the resting heart rate of 25 adults. The sample mean is 72 bpm, with a sample standard deviation of 8 bpm. What's the 95% confidence interval?

- Standard error: SE = 8 ÷ √25 = 1.6
- Degrees of freedom: 25 − 1 = 24, so the t critical value for 95% confidence is **2.064**
- Margin of error: 2.064 × 1.6 = **3.30**
- 95% CI: 72 − 3.30 to 72 + 3.30 = **68.70 to 75.30 bpm**

You can be 95% confident the true average resting heart rate of the population this sample was drawn from falls between 68.70 and 75.30 bpm.

### Worked Example: Proportion

A survey of 400 shoppers finds that 62% prefer online returns over in-store returns. What's the 90% confidence interval?

- Standard error: SE = √(0.62 × 0.38 ÷ 400) = 0.0243
- Critical value for 90% confidence: z = **1.645**
- Margin of error: 1.645 × 0.0243 = **0.04** (4 percentage points)
- 90% CI: 62% − 4 to 62% + 4 = **58% to 66%**

## Comparing Confidence Levels

The confidence level you choose directly controls how wide the interval is — higher confidence means a wider, less precise range.

| Confidence Level | Critical Value (z, large n) | Relative Width vs. 95% | Typical Use |
|---|---|---|---|
| 80% | 1.282 | Narrower | Quick exploratory estimates |
| 90% | 1.645 | ~16% narrower | Business/market research |
| 95% | 1.960 | Baseline | Most scientific research, polling |
| 98% | 2.326 | ~19% wider | Higher-stakes decisions |
| 99% | 2.576 | ~31% wider | Medical/clinical, quality control |

Notice that going from 95% to 99% confidence doesn't just add a little precision — it makes the interval about 31% wider for the same data. There's no free lunch: more confidence requires either a wider interval or a bigger sample.

<div class="callout">

**Common misconception:** A "95% confidence interval" does NOT mean there's a 95% chance the true value falls inside this specific interval. It means that if you repeated the sampling process many times and built an interval each time, about 95% of those intervals would contain the true value. The interval you calculated either does or doesn't contain it — you just don't know which.

</div>

## Z-Score vs. T-Score: Which Should You Use?

This trips up a lot of students and analysts:

- **Use the t-distribution** when you only know your *sample* standard deviation (the normal case for a mean) — it's wider than the z-distribution to account for the extra uncertainty of estimating spread from a limited sample. The smaller your sample, the wider the t-distribution relative to z.
- **Use the z-distribution** when you know the true *population* standard deviation (rare in practice), or when calculating a confidence interval for a **proportion**, since the standard error formula there doesn't rely on an estimated standard deviation the same way.
- As sample size grows (roughly n ≥ 120), the t-distribution converges to the z-distribution, so the difference becomes negligible.

If you're not sure which value your data implies, the [confidence interval calculator](/calculators/confidence-interval-calculator) handles this automatically based on which mode you select.

## How to Get a Narrower Confidence Interval

A narrower interval means a more precise estimate. Three levers control the width:

1. **Increase your sample size.** The standard error shrinks with the square root of n, so quadrupling your sample size only halves your margin of error — but it's the most reliable way to tighten an interval.
2. **Reduce variability in your data.** More consistent measurement methods lower your standard deviation, which directly narrows the interval.
3. **Accept a lower confidence level.** Dropping from 99% to 90% confidence narrows the interval, but you're trading certainty for precision — decide which matters more for your use case.

## Confidence Intervals in Excel or Google Sheets

Both tools have built-in functions:

- **For a mean:** `=CONFIDENCE.T(alpha, standard_dev, size)` returns the margin of error using the t-distribution (Excel). In Sheets, `=CONFIDENCE.T()` works the same way.
- **Manual approach:** Compute the standard error with `=STDEV(range)/SQRT(COUNT(range))`, then multiply by the critical t-value from a table or `=T.INV.2T(1-confidence, degrees_of_freedom)`.
- **For a proportion:** There's no dedicated built-in function — compute SE manually with `=SQRT(p*(1-p)/n)` and multiply by the z critical value (`=NORM.S.INV(1-(1-confidence)/2)`).

## Frequently Asked Questions

**What sample size do I need for a reliable confidence interval?**
For a mean, there's no strict minimum, but the t-distribution correction matters most when n is small (under 30). For a proportion, a common rule of thumb is that both n × p̂ and n × (1 − p̂) should be at least 5 (some sources say 10) for the normal approximation to hold up well.

**What's the difference between confidence interval and margin of error?**
The margin of error is just the ± amount (critical value × standard error). The confidence interval is the full range you get after adding and subtracting that margin from your sample statistic.

**Can a confidence interval be one-sided?**
Yes — everything above assumes a standard two-sided (two-tailed) interval, which is by far the most common. One-sided intervals use a different critical value and are used when you only care about a lower or upper bound (e.g. "at least X%").

**Does a wider confidence interval mean my study is bad?**
Not necessarily. A wide interval usually just reflects a small sample size or highly variable data — it's honest about the uncertainty rather than a sign of a flawed study. A narrow interval from a biased sample can actually be more misleading.

## The Bottom Line

A confidence interval answers a precise question: given my sample, what range likely contains the true population value, at a stated confidence level? For a mean, that's x̄ ± t × (s ÷ √n); for a proportion, it's p̂ ± z × √(p̂(1 − p̂) ÷ n). Both formulas take seconds by hand once you have your sample statistics — or skip the lookup tables entirely with the [confidence interval calculator](/calculators/confidence-interval-calculator), which shows the interval, margin of error, and critical value together. If you're starting from raw data, run it through the [standard deviation calculator](/calculators/standard-deviation-calculator) first, and pair your result with the [z-score calculator](/calculators/z-score-calculator) if you also need to convert individual values to percentiles.

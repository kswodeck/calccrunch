## What Is a Z-Score?

A **z-score** (also called a standard score) tells you how many standard deviations a value sits from the mean of its data set. The formula is simple: **z = (x − μ) ÷ σ**, where x is your value, μ is the mean, and σ is the standard deviation. A z-score of 0 means the value equals the mean; +1 means it's one standard deviation above average; -1 means one standard deviation below. Once you have your mean and standard deviation, plug your numbers into the [z-score calculator](/calculators/z-score-calculator) to get the z-score, percentile, and probability instantly.

Z-scores matter because they put values from completely different scales — test scores, heights, investment returns, manufacturing tolerances — onto one standardized number line, so you can compare them directly or flag unusual outliers.

## The Z-Score Formula, Step by Step

1. **Find the mean (μ)** of your data set — add up all the values and divide by the count. If you're starting from raw data, the [average calculator](/calculators/average-calculator) does this instantly.
2. **Find the standard deviation (σ)** — a measure of how spread out the data is. Use the [standard deviation calculator](/calculators/standard-deviation-calculator) to get this in one step, including the full breakdown.
3. **Subtract the mean from your value**: x − μ.
4. **Divide by the standard deviation**: (x − μ) ÷ σ. That result is your z-score.

### Worked Example

Say a class takes a test. The class average (mean) is 75, the standard deviation is 10, and you scored 85.

z = (85 − 75) ÷ 10 = **1.0**

A z-score of 1.0 means you scored exactly one standard deviation above the class average — roughly the 84th percentile (more on converting z-scores to percentiles below).

## More Worked Examples

| Value (x) | Mean (μ) | Std. Dev. (σ) | Z-Score | Meaning |
|---|---|---|---|---|
| 85 | 75 | 10 | +1.00 | 1 SD above average |
| 65 | 75 | 10 | -1.00 | 1 SD below average |
| 75 | 75 | 10 | 0.00 | Exactly average |
| 95 | 75 | 10 | +2.00 | 2 SD above average (unusual) |
| 178 cm | 170 cm | 7 cm | +1.14 | Slightly taller than average |
| $450 | $500 | $50 | -1.00 | Below-average spend |

## Converting a Z-Score to a Percentile

Once you have a z-score, you can find what percentage of the data falls below (or above) that point using the standard normal distribution. The [z-score calculator](/calculators/z-score-calculator) does this conversion automatically, but here are the benchmarks worth memorizing:

| Z-Score | Percentile | Common Use |
|---|---|---|
| -2.00 | ~2.3rd | Well below average |
| -1.00 | ~15.9th | Below average |
| 0.00 | 50th | Exactly average |
| +1.00 | ~84.1st | Above average |
| +1.645 | 95th | One-tailed 95% confidence cutoff |
| +1.96 | 97.5th | Two-tailed 95% confidence interval bound |
| +2.00 | ~97.7th | Well above average |
| +3.00 | ~99.9th | Rare / statistical outlier |

<div class="callout">

**Rule of thumb:** In a normal distribution, about 68% of values fall within ±1 standard deviation of the mean, 95% fall within ±2, and 99.7% fall within ±3. A z-score outside ±3 is usually flagged as a statistical outlier.

</div>

## Z-Score vs. Standard Deviation: What's the Difference?

These two concepts work together but answer different questions:

- **Standard deviation** describes the spread of an *entire data set* — how tightly or loosely values cluster around the mean.
- **Z-score** describes where *one specific value* sits relative to that mean, measured in standard-deviation units.

You always need the standard deviation first before you can calculate a z-score. If you only have a raw list of numbers, start with the [standard deviation calculator](/calculators/standard-deviation-calculator) to get the mean and standard deviation, then feed those into the z-score calculator.

## Real-World Uses of Z-Scores

- **Test scores:** Standardized tests like the SAT report scores as scaled versions of z-scores so students can be compared fairly across different test administrations.
- **Investment risk:** Z-scores flag returns that are unusually good or bad relative to a fund's typical volatility.
- **Quality control:** Manufacturers use z-scores to flag parts that fall outside acceptable tolerance ranges.
- **Growth charts:** Pediatricians use z-scores (sometimes called "growth percentiles") to compare a child's height or weight to population norms.
- **A/B testing and research:** Z-scores are the basis of z-tests, used to determine whether a difference between two groups is statistically significant.

## Common Z-Score Mistakes

1. **Using the wrong standard deviation.** Sample standard deviation (dividing by n − 1) and population standard deviation (dividing by N) give slightly different results — make sure you're using the correct one for your data.
2. **Confusing z-score with percentile directly.** A z-score of 2 does *not* mean the 2nd percentile — it's actually close to the 98th. Always convert through the normal distribution, not by treating the z-score as a percentage.
3. **Applying z-scores to non-normal data.** The percentile conversion assumes a roughly normal (bell-curve) distribution. For heavily skewed data, the percentile estimate will be inaccurate even though the z-score itself is still mathematically valid.
4. **Forgetting the sign.** A z-score of -1.5 is *below* the mean, not "1.5 away" in an ambiguous direction — the sign matters for interpretation.

## How to Calculate a Z-Score in Excel or Google Sheets

Both spreadsheet tools have a built-in function that does the arithmetic for you:

- **Excel / Google Sheets:** `=STANDARDIZE(x, mean, standard_dev)` returns the z-score directly.
- **Manual formula:** `=(x - mean) / standard_dev` works identically in either tool if you'd rather see the calculation spelled out.
- **Getting the percentile:** Chain it with `=NORM.S.DIST(z, TRUE)` in Excel (or `=NORMSDIST(z)` in Sheets) to convert the z-score straight to a percentile, matching what the [z-score calculator](/calculators/z-score-calculator) shows automatically.

This is handy for standardizing an entire column of data at once — drag the formula down and every row gets its own z-score relative to the same mean and standard deviation.

## Z-Scores and Sample Size

Z-scores are most reliable when your sample is reasonably large (statisticians often use 30 as a rule-of-thumb minimum) and your underlying data is roughly normally distributed. With small samples, the sample mean and standard deviation are less stable estimates of the true population values, so the resulting z-score — and the percentile it implies — carries more uncertainty. In those cases, a t-score (which accounts for that extra uncertainty) is often the more appropriate statistic.

## Frequently Asked Questions

**What does a z-score of 0 mean?**
It means the value is exactly equal to the mean of the data set — right in the middle.

**Can a z-score be negative?**
Yes. A negative z-score simply means the value is below the mean. The size of the number (ignoring the sign) still tells you how many standard deviations away it is.

**What's a "good" z-score?**
It depends entirely on context. For a test score, a positive z-score is good. For a golf score (where lower is better), a negative z-score would be the "good" direction. Always consider what the underlying metric measures.

**How is a z-score different from a t-score?**
Z-scores assume you know the true population standard deviation and are typically used with larger samples (usually 30+). T-scores are used when the population standard deviation is unknown and estimated from a smaller sample, and they come from the t-distribution instead of the normal distribution.

## The Bottom Line

A z-score answers one question precisely: *how far is this value from the average, measured in standard deviations?* Once you know the mean and standard deviation of your data, the formula z = (x − μ) ÷ σ takes seconds to apply — or you can skip the arithmetic entirely with the [z-score calculator](/calculators/z-score-calculator), which also converts your result to a percentile automatically. If you're starting from a raw list of numbers, run them through the [standard deviation calculator](/calculators/standard-deviation-calculator) first to get your mean and standard deviation, then plug those into the z-score calculator to finish the job.

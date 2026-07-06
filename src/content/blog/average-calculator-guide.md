The "average" of a set of numbers seems like a simple concept — add them up and divide. But that calculation (the **mean**) is just one of three common measures of center. Choosing the wrong one can give you a number that's technically correct but practically misleading. This guide explains mean, median, and mode in plain terms, shows you when each one is the right tool, and lets you skip the arithmetic with our free [average calculator](/calculators/average-calculator).

## What Is the Mean (Arithmetic Average)?

The **mean** is what most people picture when they say "average." You add all the values together and divide by how many there are.

**Formula:** Mean = (Sum of all values) ÷ (Number of values)

**Example:** Test scores of 72, 85, 90, 68, 95
- Sum: 72 + 85 + 90 + 68 + 95 = 410
- Count: 5
- Mean: 410 ÷ 5 = **82**

The mean uses every value in the dataset, which makes it sensitive to outliers. One extreme value can pull it far from what's "typical."

**Example of mean distortion:** Five employees earn $40,000, $42,000, $38,000, $45,000, and $500,000. The mean salary is ($40k + $42k + $38k + $45k + $500k) ÷ 5 = $133,000. That figure doesn't represent any of the five employees well — four of them earn less than a third of the "average."

<div class="callout">
Our free <a href="/calculators/average-calculator">average calculator</a> computes mean, median, and mode simultaneously so you can compare them side by side and pick the right one for your situation.
</div>

## What Is the Median?

The **median** is the middle value when you sort all numbers from smallest to largest. It splits the dataset in half: 50% of values fall below it, 50% above.

**How to find it:**
1. Sort the values in ascending order.
2. If there's an odd count, the median is the middle value.
3. If there's an even count, the median is the mean of the two middle values.

**Example (odd count):** Scores sorted: 68, 72, 85, 90, 95 → Median = **85**

**Example (even count):** House prices: $220k, $250k, $310k, $380k → Median = (250 + 310) ÷ 2 = **$280k**

The median is resistant to outliers. In the salary example above, the median salary is $42,000 — a much more realistic picture of what most employees earn.

## What Is the Mode?

The **mode** is the value that appears most often. A dataset can have:
- **No mode** — if every value is unique
- **One mode** — the most common case
- **Multiple modes** — if two or more values tie for most frequent

**Example:** Daily high temperatures (°F) over two weeks: 88, 91, 91, 93, 88, 94, 91, 88, 89, 92, 91, 90, 88, 93

Tallying: 88 appears 4 times, 91 appears 4 times, others appear fewer times → **Bimodal: 88°F and 91°F**

The mode is most useful for categorical data (most popular product color, most common shoe size) or when you need to know the single most frequent outcome rather than a balanced center point.

## Mean vs. Median vs. Mode: When to Use Each

| Measure | Best used when | Watch out for |
|---|---|---|
| **Mean** | Data is roughly symmetric with no extreme outliers | One very high or low value will distort it |
| **Median** | Data is skewed, or outliers are present | Can hide how extreme the outliers actually are |
| **Mode** | Categorical data, or you need the most frequent value | May not exist, or may be meaningless for continuous data |

The key signal is how far the mean and median diverge. If they're close, your data is roughly symmetric and the mean is fine. If they're far apart, your data is skewed and the median is usually more representative.

**Classic skewed datasets where median beats mean:**
- Household incomes (a small number of very high earners pull the mean up)
- Home prices (luxury properties inflate city-wide averages)
- Medical costs (a handful of catastrophic cases dominate the mean)

**Datasets where mean is perfectly appropriate:**
- Average temperature over a month
- Average test scores in a class (assuming no extreme outliers)
- Average commute time in a sample

## How to Calculate Each by Hand

### Step-by-step: Mean

Dataset: 14, 18, 11, 13, 18, 16

1. Add: 14 + 18 + 11 + 13 + 18 + 16 = 90
2. Count: 6 values
3. Divide: 90 ÷ 6 = **15**

### Step-by-step: Median

Same dataset sorted: 11, 13, 14, 16, 18, 18

- Even count (6), so take the average of positions 3 and 4: (14 + 16) ÷ 2 = **15**

In this case mean and median match — the data is symmetric.

### Step-by-step: Mode

Values: 11 (×1), 13 (×1), 14 (×1), 16 (×1), 18 (×2) → Mode = **18** (appears twice)

## Weighted Average: When Not All Values Are Equal

Sometimes each value has a different weight. A classic example is a course grade where the final exam counts more than weekly quizzes.

**Formula:** Weighted Mean = Σ(value × weight) ÷ Σ(weights)

**Example:** A student's grades and their weights:
- Homework: 85 (weight: 20%)
- Midterm: 78 (weight: 30%)
- Final: 92 (weight: 50%)

Weighted Mean = (85×0.20 + 78×0.30 + 92×0.50) ÷ (0.20 + 0.30 + 0.50)
= (17 + 23.4 + 46) ÷ 1.00 = **86.4**

This is different from the simple mean of 85, 78, and 92, which is (255 ÷ 3) = 85. The final exam's larger weight pulls the result upward.

## Averages and Percentage Change

Once you have a mean or median, you often want to compare it to a previous period. That's where percentage change comes in. If last month's average transaction was $42 and this month it's $49:

Percentage change = ((49 − 42) ÷ 42) × 100 = **+16.67%**

Our [percentage change calculator](/calculators/percentage-change-calculator) handles this instantly — just enter the two averages and it shows you the increase, the absolute difference, and the multiplier.

For example, if you're tracking average daily steps and want to see how much your mean improved week over week, or comparing a class's average score before and after a study session, the percentage change calculation puts the raw number in context.

## Practical Examples by Field

| Field | What they average | Which measure |
|---|---|---|
| Economics | Household income | Median (skewed right) |
| Education | Class test scores | Mean (roughly symmetric) |
| Weather | Monthly temperature | Mean |
| Real estate | Home prices | Median (skewed right) |
| Manufacturing | Product defect rate | Mean |
| Retail | Units sold per SKU | Mode (best-seller identification) |
| Sports | Player statistics | Mean (per game) |
| Healthcare | Patient wait time | Median (skewed by emergencies) |

## Frequently Asked Questions

**What is the difference between average and mean?** In everyday language, "average" almost always refers to the arithmetic mean. In statistics, "average" is a broader term covering mean, median, and mode. When someone says "the average salary is X," they typically mean the arithmetic mean unless they specify otherwise.

**When does the mean equal the median?** When the data is perfectly symmetric — a normal (bell-curve) distribution. In perfectly symmetric data, mean, median, and mode are all identical. Real-world data is rarely perfectly symmetric, but when the two measures are very close, the distribution is roughly symmetric and either measure works.

**Can the mean be higher than all but one value in the dataset?** Yes. This happens with extreme positive outliers. In a dataset like 10, 11, 12, 12, 500, the mean is 109 — higher than four of the five values. The median (12) is far more representative.

**What is the range, and how does it relate to average?** The range (maximum − minimum) measures the spread of the data, not the center. It tells you how wide your dataset is. A low range with a low standard deviation means values cluster tightly around the mean; a high range means they're spread out and the mean may not represent any individual value well.

**How do I calculate a running average?** Add the new value to the running total and divide by the new count. Example: average of first 5 days is 20. Day 6 value is 26. New total = 20×5 + 26 = 126. New average = 126 ÷ 6 = 21.

## The Bottom Line

The mean is the right tool when your data is roughly symmetric and you want every value to count. The median is better when data is skewed or contains outliers — it's the measure that resists being pulled by extremes. The mode is most useful for categorical or count data where you care about the most common outcome.

Use our [average calculator](/calculators/average-calculator) to compute all three at once for any dataset, and our [percentage calculator](/calculators/percentage-calculator) to express relationships between them as percentages. If you want to compare two averages across time periods, our [percentage change calculator](/calculators/percentage-change-calculator) gives you the increase or decrease in a single step.

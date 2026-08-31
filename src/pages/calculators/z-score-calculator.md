---
layout: ../../layouts/CalculatorLayout.astro
calcType: zscore
title: Z-Score Calculator
description: Calculate a z-score (standard score) from a value, mean, and standard deviation, and see the percentile and probability it corresponds to on the normal distribution.
---

## How to Use This Calculator

1. **Enter your value** — the raw data point (x) you want to convert to a z-score
2. **Enter the mean and standard deviation** — of the data set or distribution the value belongs to
3. **Click Calculate** — instantly see the z-score, percentile, and probability breakdown

<div class="calculator-form" id="z-score-calculator-form">
  <div class="form-section">
    <h3>Enter Your Values</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="value-input">Value (x) <span class="required">*</span>
          <span class="tooltip" title="The raw data point you want to convert to a z-score">?</span>
        </label>
        <input type="number" id="value-input" class="form-input" step="any" placeholder="e.g. 85" />
      </div>
      <div class="form-group">
        <label for="mean-input">Mean (μ) <span class="required">*</span>
          <span class="tooltip" title="The average of the data set or distribution">?</span>
        </label>
        <input type="number" id="mean-input" class="form-input" step="any" placeholder="e.g. 75" />
      </div>
      <div class="form-group">
        <label for="stddev-input">Standard Deviation (σ) <span class="required">*</span>
          <span class="tooltip" title="The standard deviation of the data set or distribution">?</span>
        </label>
        <input type="number" id="stddev-input" class="form-input" step="any" min="0" placeholder="e.g. 10" />
      </div>
    </div>
    <small class="form-help">Don't know your mean and standard deviation yet? Get them from the <a href="/calculators/standard-deviation-calculator">standard deviation calculator</a> first.</small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate Z-Score →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="z-score-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 What Is a Z-Score?</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>A z-score (or <strong>standard score</strong>) tells you how many standard deviations a value is from the mean.</li>
    <li><strong>z = 0</strong> means the value equals the mean. <strong>Positive z</strong> means above the mean. <strong>Negative z</strong> means below the mean.</li>
    <li>Z-scores let you compare values from different scales or distributions on the same standardized footing.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🧮 Formula Reference</h4>
  <div style="margin-top: 0.75rem;">
    <strong>Z-Score Formula</strong><br>
    <code>z = (x − μ) ÷ σ</code>
  </div>
  <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-gray-dark);">
    Where <strong>x</strong> is your raw value, <strong>μ</strong> (mu) is the mean, and <strong>σ</strong> (sigma) is the standard deviation.
    The percentile is found by converting the z-score to a cumulative probability on the standard normal distribution.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Common Z-Score Benchmarks</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>z = 0</strong> → 50th percentile (the mean)</li>
    <li><strong>z = +1</strong> → ~84th percentile</li>
    <li><strong>z = +1.645</strong> → 95th percentile</li>
    <li><strong>z = +1.96</strong> → 97.5th percentile (common 95% confidence interval bound)</li>
    <li><strong>z = +2</strong> → ~97.7th percentile</li>
    <li><strong>|z| &gt; 3</strong> → often treated as a statistical outlier</li>
  </ul>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/z-score-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: confidenceinterval
title: Confidence Interval Calculator
description: Calculate a confidence interval for a sample mean or proportion, with margin of error and the z or t critical value shown.
---

## How to Use This Calculator

1. **Pick what you're estimating** — a sample mean (like an average test score or measurement) or a sample proportion (like a survey percentage)
2. **Enter your sample statistics** — mean/standard deviation and sample size, or proportion and sample size
3. **Choose a confidence level** — 90%, 95%, and 99% are the most common
4. **Click Calculate** to see the margin of error, the confidence interval, and the critical value used

<div class="calculator-form" id="confidence-interval-calculator-form">
  <div class="form-section">
    <h3>What Are You Estimating?</h3>
    <div class="form-row">
      <div class="form-group" style="width:100%">
        <label for="ci-mode">Confidence interval for a
          <span class="tooltip" title="Choose whether your data is a sample mean (e.g. average height, test score) or a sample proportion (e.g. survey percentage)">?</span>
        </label>
        <select id="ci-mode" class="form-select">
          <option value="mean" selected>Sample Mean (average)</option>
          <option value="proportion">Sample Proportion (percentage)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section" id="mean-section">
    <h3>Sample Statistics</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="mean-input">Sample Mean (x̄) <span class="required">*</span></label>
        <input type="number" id="mean-input" class="form-input" step="any" placeholder="e.g. 75" />
      </div>
      <div class="form-group">
        <label for="stddev-input">Sample Standard Deviation (s) <span class="required">*</span>
          <span class="tooltip" title="Don't know it yet? Use the standard deviation calculator first.">?</span>
        </label>
        <input type="number" id="stddev-input" class="form-input" step="any" min="0" placeholder="e.g. 10" />
      </div>
      <div class="form-group">
        <label for="mean-n-input">Sample Size (n) <span class="required">*</span></label>
        <input type="number" id="mean-n-input" class="form-input" step="1" min="2" placeholder="e.g. 30" />
      </div>
    </div>
    <small class="form-help">Don't know your mean and standard deviation yet? Get them from the <a href="/calculators/standard-deviation-calculator">standard deviation calculator</a> first.</small>
  </div>

  <div class="form-section hidden" id="proportion-section">
    <h3>Sample Statistics</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="proportion-input">Sample Proportion <span class="required">*</span>
          <span class="tooltip" title="The percentage of your sample with the trait you're measuring, e.g. 62 for 62%">?</span>
        </label>
        <div class="input-group">
          <input type="number" id="proportion-input" class="form-input" step="any" min="0" max="100" placeholder="e.g. 62" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="prop-n-input">Sample Size (n) <span class="required">*</span></label>
        <input type="number" id="prop-n-input" class="form-input" step="1" min="1" placeholder="e.g. 400" />
      </div>
    </div>
    <small class="form-help">Example: if 248 out of 400 people surveyed said yes, enter 62 (%) and 400.</small>
  </div>

  <div class="form-section">
    <h3>Confidence Level</h3>
    <div class="form-row">
      <div class="form-group" style="width:100%">
        <label for="confidence-level">Confidence Level
          <span class="tooltip" title="How confident you want to be that the true population value falls within the interval">?</span>
        </label>
        <select id="confidence-level" class="form-select">
          <option value="80">80%</option>
          <option value="90">90%</option>
          <option value="95" selected>95%</option>
          <option value="98">98%</option>
          <option value="99">99%</option>
        </select>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate Confidence Interval →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="confidence-interval-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 What Is a Confidence Interval?</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>A confidence interval is a range of values that likely contains the true population mean or proportion, built around your sample statistic.</li>
    <li>A "95% confidence interval" means that if you repeated the sampling process many times, about 95% of the intervals calculated that way would contain the true population value — it does <strong>not</strong> mean there's a 95% chance this specific interval contains it.</li>
    <li>A wider interval means more uncertainty; a narrower interval (from a bigger sample or lower confidence level) means a more precise estimate.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🧮 Formula Reference</h4>
  <div style="margin-top: 0.75rem;">
    <strong>Confidence Interval for a Mean</strong><br>
    <code>x̄ ± t × (s ÷ √n)</code>
  </div>
  <div style="margin-top: 0.75rem;">
    <strong>Confidence Interval for a Proportion</strong><br>
    <code>p̂ ± z × √(p̂(1 − p̂) ÷ n)</code>
  </div>
  <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-gray-dark);">
    The mean interval uses the <strong>t</strong> critical value (based on n − 1 degrees of freedom) since the population standard deviation is unknown and estimated from the sample.
    The proportion interval uses the <strong>z</strong> critical value from the standard normal distribution.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Common Critical Values (z, large samples)</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>80% confidence</strong> → z = 1.282</li>
    <li><strong>90% confidence</strong> → z = 1.645</li>
    <li><strong>95% confidence</strong> → z = 1.960</li>
    <li><strong>98% confidence</strong> → z = 2.326</li>
    <li><strong>99% confidence</strong> → z = 2.576</li>
  </ul>
  <p style="margin-top:0.5rem; font-size:0.9rem; color:var(--color-gray-dark);">
    For small samples (mean mode), this calculator uses the exact <strong>t</strong> critical value for your degrees of freedom instead of the z-value above, since the t-distribution is wider to account for the extra uncertainty of estimating the standard deviation from a small sample.
  </p>
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

<script src="/scripts/calculators/confidence-interval-calculator.js"></script>

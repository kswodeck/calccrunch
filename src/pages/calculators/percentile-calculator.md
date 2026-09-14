---
layout: ../../layouts/CalculatorLayout.astro
calcType: percentile
title: Percentile Calculator
description: Find the percentile rank of a value in a data set, or find the value at any percentile — using the same linear interpolation method as Excel's PERCENTILE.INC function.
---

## How to Use This Calculator

1. **Enter your data set** — paste your list of numbers separated by commas, spaces, or new lines
2. **Enter a value and/or a percentile** — find the percentile rank of a specific value, the value at a specific percentile, or both at once
3. **Click Calculate** — see your result instantly, with the exact formula used

<div class="calculator-form" id="percentile-calculator-form">
  <div class="form-section">
    <h3>Enter Your Data Set</h3>
    <div class="form-row">
      <div class="form-group" style="width:100%">
        <label for="data-input">Data Set <span class="required">*</span>
          <span class="tooltip" title="Separate numbers with commas, spaces, or new lines">?</span>
        </label>
        <textarea
          id="data-input"
          class="form-input"
          rows="4"
          placeholder="e.g. 62, 74, 68, 90, 81, 55, 77, 95, 70, 84"
          style="resize:vertical; font-size:1rem; padding:0.75rem;"
        ></textarea>
        <small class="form-help">Separate values with commas, spaces, or line breaks. Decimals and negatives are supported.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>What Do You Want to Find?</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="value-input">Find the percentile rank of this value
          <span class="tooltip" title="See what percentage of the data set falls at or below this value">?</span>
        </label>
        <input type="number" id="value-input" class="form-input" step="any" placeholder="e.g. 77" />
      </div>
      <div class="form-group">
        <label for="percentile-input">Find the value at this percentile
          <span class="tooltip" title="0-100. See what value sits at this percentile in your data set">?</span>
        </label>
        <div class="input-group">
          <input type="number" id="percentile-input" class="form-input" step="any" min="0" max="100" placeholder="e.g. 90" />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <small class="form-help">Fill in either field, or both — you'll get a result for whichever you enter.</small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="percentile-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 What Is a Percentile?</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>A percentile tells you how a value compares to the rest of a data set. If you scored in the <strong>85th percentile</strong>, you scored at or above roughly 85% of everyone else.</li>
    <li>This calculator works directly with your <strong>actual data</strong> — no assumption that it follows a normal (bell curve) distribution. If you need percentiles for a normal distribution instead (e.g. from a mean and standard deviation), use the <a href="/calculators/z-score-calculator">z-score calculator</a>.</li>
    <li>Percentiles are widely used for test scores, growth charts, salary bands, and standardized exam results (SAT, ACT, GRE).</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🧮 Formula Reference</h4>
  <div style="margin-top: 0.75rem;">
    <strong>Percentile rank of a value</strong><br>
    <code>rank = (values below + 0.5 × values equal) ÷ N × 100</code>
  </div>
  <div style="margin-top: 0.75rem;">
    <strong>Value at a percentile (linear interpolation, matches Excel's PERCENTILE.INC)</strong><br>
    <code>index = (p ÷ 100) × (N − 1)</code>, then interpolate between the two nearest sorted values
  </div>
  <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-gray-dark);">
    Where <strong>N</strong> is the number of values in your data set. This is the same interpolation method used by Excel, Google Sheets, and most statistics software.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Percentile vs. Percentage vs. Z-Score</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Percentile:</strong> Your position relative to a real group of scores — e.g. "90th percentile" means you beat 90% of the group.</li>
    <li><strong>Percentage score:</strong> How many points you earned out of the total possible — e.g. "90%" on a test. These two are easily confused but measure different things.</li>
    <li><strong>Z-score:</strong> Assumes your data follows a normal distribution and measures distance from the mean in standard deviations, rather than ranking against actual observed values.</li>
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

<script src="/scripts/calculators/percentile-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: average
title: Average Calculator
description: Calculate the mean, median, and mode of any set of numbers. Enter up to 30 values and get a full statistical summary instantly.
---

## How to Use This Calculator

1. **Enter your numbers** — Type or paste a list of numbers separated by commas, spaces, or new lines
2. **Click Calculate** — Instantly see the mean (average), median, mode, range, sum, and count
3. **Bookmark or share** — Your numbers are saved in the URL for easy sharing

<div class="calculator-form" id="average-calculator-form">
  <div class="form-section">
    <h3>Enter Numbers</h3>
    <div class="form-row">
      <div class="form-group" style="width:100%">
        <label for="numbers-input">Numbers <span class="required">*</span>
          <span class="tooltip" title="Separate numbers with commas, spaces, or new lines">?</span>
        </label>
        <textarea
          id="numbers-input"
          class="form-input"
          rows="4"
          placeholder="e.g. 10, 20, 30, 40, 50"
          style="resize:vertical; font-size:1rem; padding:0.75rem;"
        ></textarea>
        <small class="form-help">Separate values with commas, spaces, or line breaks. Decimals and negatives are supported.</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate Average →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="average-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 Mean vs. Median vs. Mode — When to Use Each</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Mean (average):</strong> Best for symmetric data without extreme outliers — e.g. averaging test scores or temperatures.</li>
    <li><strong>Median:</strong> Best when data has outliers or is skewed — e.g. household incomes, home prices. The median is not pulled by extreme values.</li>
    <li><strong>Mode:</strong> Best for categorical or discrete data — e.g. the most common shoe size sold, most frequent survey response.</li>
    <li><strong>Range:</strong> A simple spread measure — subtract the smallest value from the largest. Large range = more variability.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🧮 Quick Formula Reference</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 0.75rem;">
    <div>
      <strong>Mean</strong><br>
      <code>Sum ÷ Count</code>
    </div>
    <div>
      <strong>Median</strong><br>
      <code>Middle value (sorted list)</code>
    </div>
    <div>
      <strong>Mode</strong><br>
      <code>Most frequently occurring value</code>
    </div>
    <div>
      <strong>Range</strong><br>
      <code>Max − Min</code>
    </div>
  </div>
  <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-gray-dark);">
    For an even count of numbers, the median is the mean of the two middle values.
    If all values occur equally, there is no mode.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Real-World Examples</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>GPA:</strong> Average your weighted grade points to get a GPA — use the mean.</li>
    <li><strong>Salary data:</strong> A company median salary removes the distortion of a CEO's pay — use the median.</li>
    <li><strong>Survey results:</strong> "Most common rating" on a 1–5 scale — use the mode.</li>
    <li><strong>Weather:</strong> Average daily temperature over a month — use the mean.</li>
    <li><strong>Sports stats:</strong> A player's average points per game — mean; most common score — mode.</li>
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

<script src="/scripts/calculators/average-calculator.js"></script>

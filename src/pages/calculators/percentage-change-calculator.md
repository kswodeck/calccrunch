---
layout: ../../layouts/CalculatorLayout.astro
calcType: percentagechange
title: Percentage Change Calculator
description: Calculate the percentage change between two values — instantly see if it's an increase or decrease and by how much.
---

## How to Use This Calculator

1. **Enter the original (starting) value** — the number you're measuring from
2. **Enter the new value** — the number you're measuring to
3. Click **Calculate** to see the percentage change, absolute difference, and direction
4. Use the **reverse** section to find a new value given a starting value and a known percentage change

<div class="calculator-form" id="percentage-change-calculator-form">
  <div class="form-section">
    <h3>Find the Percentage Change</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="original-value">
          Original Value <span class="required">*</span>
          <span class="tooltip" title="The starting or old value (e.g. last month's price)">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="original-value"
            class="form-input"
            placeholder="100"
            step="any"
          />
        </div>
        <small class="form-help">The "before" or reference value</small>
      </div>
      <div class="form-group">
        <label for="new-value">
          New Value <span class="required">*</span>
          <span class="tooltip" title="The ending or current value (e.g. this month's price)">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="new-value"
            class="form-input"
            placeholder="150"
            step="any"
          />
        </div>
        <small class="form-help">The "after" or current value</small>
      </div>
    </div>
    <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
      Calculate Change →
    </button>
    <div class="form-actions">
      <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
    </div>
  </div>
</div>

<div id="percentage-change-calculator-result" class="calculator-result hidden"></div>

<div class="calculator-form" id="percentage-change-reverse-form" style="margin-top: 2rem;">
  <div class="form-section">
    <h3>Reverse: Find the New Value</h3>
    <p style="color: var(--color-gray-dark); margin-bottom: 1rem; font-size: var(--text-sm);">Know the starting value and the percentage change? Find the resulting value.</p>
    <div class="form-row">
      <div class="form-group">
        <label for="rev-original">Starting Value</label>
        <div class="input-group">
          <input type="number" id="rev-original" class="form-input" placeholder="200" step="any" />
        </div>
      </div>
      <div class="form-group">
        <label for="rev-pct">Percentage Change</label>
        <div class="input-group">
          <input type="number" id="rev-pct" class="form-input" placeholder="-15" step="any" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Use negative for a decrease</small>
      </div>
    </div>
    <button type="button" id="reverse-btn" class="btn btn-primary calculate-button">
      Find New Value →
    </button>
  </div>
</div>

<div id="percentage-change-reverse-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 The Percentage Change Formula</h4>
  <p style="margin: 8px 0;"><strong>Percentage Change = ((New − Original) ÷ |Original|) × 100</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>A <strong>positive result</strong> = percentage increase (e.g. +25%)</li>
    <li>A <strong>negative result</strong> = percentage decrease (e.g. −12.5%)</li>
    <li>The denominator uses the <strong>absolute value</strong> of the original so negative originals work correctly</li>
    <li><strong>Example:</strong> Price rises from $80 to $100 → ((100 − 80) ÷ 80) × 100 = 25% increase</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Common Percentage Change Examples</h4>
  <table style="width:100%; border-collapse: collapse; font-size: var(--text-sm);">
    <thead>
      <tr style="background: rgba(0,0,0,0.05);">
        <th style="padding: 8px; text-align: left;">Scenario</th>
        <th style="padding: 8px; text-align: right;">Original</th>
        <th style="padding: 8px; text-align: right;">New</th>
        <th style="padding: 8px; text-align: right;">Change</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-top: 1px solid #ddd;">
        <td style="padding: 8px;">Salary raise</td>
        <td style="padding: 8px; text-align: right;">$50,000</td>
        <td style="padding: 8px; text-align: right;">$55,000</td>
        <td style="padding: 8px; text-align: right; color: var(--color-success);">+10.00%</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td style="padding: 8px;">Stock price drop</td>
        <td style="padding: 8px; text-align: right;">$120</td>
        <td style="padding: 8px; text-align: right;">$90</td>
        <td style="padding: 8px; text-align: right; color: #dc2626;">−25.00%</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td style="padding: 8px;">Weight change</td>
        <td style="padding: 8px; text-align: right;">200 lbs</td>
        <td style="padding: 8px; text-align: right;">185 lbs</td>
        <td style="padding: 8px; text-align: right; color: #dc2626;">−7.50%</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td style="padding: 8px;">Monthly revenue</td>
        <td style="padding: 8px; text-align: right;">$8,400</td>
        <td style="padding: 8px; text-align: right;">$11,760</td>
        <td style="padding: 8px; text-align: right; color: var(--color-success);">+40.00%</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Percentage Change vs. Percentage Points</h4>
  <p style="margin: 8px 0;">These two terms are often confused:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Percentage change</strong>: how much something changed <em>relative to its original value</em>. If a tax rate goes from 20% to 25%, that's a <strong>25% increase</strong> in the tax rate itself.</li>
    <li><strong>Percentage points</strong>: the raw arithmetic difference. That same change is a <strong>5 percentage point increase</strong>.</li>
    <li>Media and politicians frequently mix these up — always check which one is being used.</li>
  </ul>
</div>

<script src="/scripts/calculators/percentage-change-calculator.js"></script>

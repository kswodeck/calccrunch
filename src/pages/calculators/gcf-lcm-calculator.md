---
layout: ../../layouts/CalculatorLayout.astro
calcType: gcflcm
title: GCF and LCM Calculator
description: Find the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers instantly, with step-by-step prime factorization.
---

## How to Use This Calculator

1. **Enter two or more whole numbers** separated by commas (e.g. `12, 18, 24`)
2. Click **Calculate** to see the GCF and LCM
3. Review the **prime factorization** and **step-by-step work** for each number

<div class="calculator-form" id="gcf-lcm-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group" style="flex: 1 1 100%;">
        <label for="numbers-input">
          Numbers <span class="required">*</span>
          <span class="tooltip" title="Enter 2 or more positive whole numbers, separated by commas">?</span>
        </label>
        <input
          type="text"
          id="numbers-input"
          class="form-input"
          placeholder="12, 18, 24"
          value=""
          required
        />
        <small class="form-help">Enter 2 or more positive whole numbers, separated by commas</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="gcf-lcm-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 GCF vs. LCM — Quick Reference</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>GCF (Greatest Common Factor):</strong> The largest number that divides evenly into every number in the set. Used to simplify fractions to lowest terms.</li>
    <li><strong>LCM (Least Common Multiple):</strong> The smallest number that every number in the set divides into evenly. Used to find a common denominator when adding or subtracting fractions.</li>
    <li><strong>Prime factorization method:</strong> Break each number into its prime factors. The GCF is the product of the shared primes at their lowest shared power; the LCM is the product of every prime involved at its highest power.</li>
    <li><strong>Shortcut:</strong> For two numbers, LCM(a, b) = (a × b) ÷ GCF(a, b).</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🔢 Worked Example: 12 and 18</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>12 = 2 × 2 × 3</li>
    <li>18 = 2 × 3 × 3</li>
    <li>Shared primes at lowest power: 2 × 3 = <strong>GCF = 6</strong></li>
    <li>All primes at highest power: 2 × 2 × 3 × 3 = <strong>LCM = 36</strong></li>
  </ul>
</div>

<script src="/scripts/calculators/gcf-lcm-calculator.js"></script>

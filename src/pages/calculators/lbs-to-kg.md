---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Pounds to Kilograms Converter
description: Convert pounds to kilograms instantly.
---

## How to Use This Converter

1. **Enter a value in pounds** (lbs)
2. The equivalent in **kilograms** (kg) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Pounds <span class="input-addon-text">(lbs)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter pounds"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">lbs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Reset">Clear</button>
  </div>
</div>

<div id="conversion-result" class="calculator-result">
</div>

<div class="info-box">
  <h4>📐 Pounds to Kilograms Formula</h4>
  <p>1 pound equals 0.453592 kilograms. To convert pounds to kilograms, divide by 2.20462 (or multiply by 0.453592).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Pounds to Kilograms Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Pounds (lbs)</th><th>Kilograms (kg)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 lbs</td><td>0.45 kg</td></tr>
      <tr><td>5 lbs</td><td>2.27 kg</td></tr>
      <tr><td>10 lbs</td><td>4.54 kg</td></tr>
      <tr><td>25 lbs</td><td>11.34 kg</td></tr>
      <tr><td>50 lbs</td><td>22.68 kg</td></tr>
      <tr><td>100 lbs</td><td>45.36 kg</td></tr>
      <tr><td>120 lbs</td><td>54.43 kg</td></tr>
      <tr><td>150 lbs</td><td>68.04 kg</td></tr>
      <tr><td>180 lbs</td><td>81.65 kg</td></tr>
      <tr><td>200 lbs</td><td>90.72 kg</td></tr>
    </tbody>
  </table>
</div>

<style>
  .conversion-table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
  .conversion-table th, .conversion-table td {
    padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--color-gray);
  }
  .conversion-table th { color: var(--color-primary-blue); font-weight: 700; }
  .input-addon-text { color: var(--color-gray-dark); font-weight: 400; font-size: var(--text-sm); }
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/lbs-to-kg.js"></script>

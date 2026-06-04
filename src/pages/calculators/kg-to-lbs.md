---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Kilograms to Pounds Converter
description: Convert kilograms to pounds instantly.
---

## How to Use This Converter

1. **Enter a value in kilograms** (kg)
2. The equivalent in **pounds** (lbs) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Kilograms <span class="input-addon-text">(kg)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter kilograms"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">kg</span>
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
  <h4>📐 Kilograms to Pounds Formula</h4>
  <p>1 kilogram equals 2.20462 pounds. To convert kilograms to pounds, multiply by 2.20462.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Kilograms to Pounds Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Kilograms (kg)</th><th>Pounds (lbs)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 kg</td><td>2.2 lbs</td></tr>
      <tr><td>5 kg</td><td>11.02 lbs</td></tr>
      <tr><td>10 kg</td><td>22.05 lbs</td></tr>
      <tr><td>20 kg</td><td>44.09 lbs</td></tr>
      <tr><td>50 kg</td><td>110.23 lbs</td></tr>
      <tr><td>60 kg</td><td>132.28 lbs</td></tr>
      <tr><td>70 kg</td><td>154.32 lbs</td></tr>
      <tr><td>80 kg</td><td>176.37 lbs</td></tr>
      <tr><td>90 kg</td><td>198.42 lbs</td></tr>
      <tr><td>100 kg</td><td>220.46 lbs</td></tr>
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

<script src="/scripts/calculators/kg-to-lbs.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Inches to Feet Converter
description: Convert inches to feet instantly.
---

## How to Use This Converter

1. **Enter a value in inches** (in)
2. The equivalent in **feet** (ft) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Inches <span class="input-addon-text">(in)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter inches"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">in</span>
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
  <h4>📐 Inches to Feet Formula</h4>
  <p>1 inch equals 0.08333 feet (1/12). To convert inches to feet, divide by 12.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Inches to Feet Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Inches (in)</th><th>Feet (ft)</th></tr>
    </thead>
    <tbody>
      <tr><td>6 in</td><td>0.5 ft</td></tr>
      <tr><td>12 in</td><td>1 ft</td></tr>
      <tr><td>18 in</td><td>1.5 ft</td></tr>
      <tr><td>24 in</td><td>2 ft</td></tr>
      <tr><td>36 in</td><td>3 ft</td></tr>
      <tr><td>48 in</td><td>4 ft</td></tr>
      <tr><td>60 in</td><td>5 ft</td></tr>
      <tr><td>66 in</td><td>5.5 ft</td></tr>
      <tr><td>72 in</td><td>6 ft</td></tr>
      <tr><td>84 in</td><td>7 ft</td></tr>
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

<script src="/scripts/calculators/inches-to-feet.js"></script>

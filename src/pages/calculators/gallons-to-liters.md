---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Gallons to Liters Converter
description: Convert gallons to liters instantly.
---

## How to Use This Converter

1. **Enter a value in gallons** (gal)
2. The equivalent in **liters** (L) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Gallons <span class="input-addon-text">(gal)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter gallons"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">gal</span>
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
  <h4>📐 Gallons to Liters Formula</h4>
  <p>1 US gallon equals 3.78541 liters. To convert gallons to liters, multiply by 3.78541. (Based on the US liquid gallon.)</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Gallons to Liters Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Gallons (gal)</th><th>Liters (L)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 gal</td><td>3.785 L</td></tr>
      <tr><td>2 gal</td><td>7.571 L</td></tr>
      <tr><td>3 gal</td><td>11.356 L</td></tr>
      <tr><td>5 gal</td><td>18.927 L</td></tr>
      <tr><td>10 gal</td><td>37.854 L</td></tr>
      <tr><td>12 gal</td><td>45.425 L</td></tr>
      <tr><td>15 gal</td><td>56.781 L</td></tr>
      <tr><td>20 gal</td><td>75.708 L</td></tr>
      <tr><td>25 gal</td><td>94.635 L</td></tr>
      <tr><td>50 gal</td><td>189.271 L</td></tr>
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

<script src="/scripts/calculators/gallons-to-liters.js"></script>

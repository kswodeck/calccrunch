---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Liters to Gallons Converter
description: Convert liters to gallons instantly.
---

## How to Use This Converter

1. **Enter a value in liters** (L)
2. The equivalent in **gallons** (gal) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Liters <span class="input-addon-text">(L)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter liters"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">L</span>
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
  <h4>📐 Liters to Gallons Formula</h4>
  <p>1 liter equals 0.264172 US gallons. To convert liters to gallons, divide by 3.78541. (Based on the US liquid gallon.)</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Liters to Gallons Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Liters (L)</th><th>Gallons (gal)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 L</td><td>0.264 gal</td></tr>
      <tr><td>2 L</td><td>0.528 gal</td></tr>
      <tr><td>5 L</td><td>1.321 gal</td></tr>
      <tr><td>10 L</td><td>2.642 gal</td></tr>
      <tr><td>20 L</td><td>5.283 gal</td></tr>
      <tr><td>40 L</td><td>10.567 gal</td></tr>
      <tr><td>50 L</td><td>13.209 gal</td></tr>
      <tr><td>60 L</td><td>15.85 gal</td></tr>
      <tr><td>75 L</td><td>19.813 gal</td></tr>
      <tr><td>100 L</td><td>26.417 gal</td></tr>
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

<script src="/scripts/calculators/liters-to-gallons.js"></script>

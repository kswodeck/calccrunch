---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Miles to Kilometers Converter
description: Convert miles to kilometers instantly.
---

## How to Use This Converter

1. **Enter a value in miles** (mi)
2. The equivalent in **kilometers** (km) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Miles <span class="input-addon-text">(mi)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter miles"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">mi</span>
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
  <h4>📐 Miles to Kilometers Formula</h4>
  <p>1 mile equals 1.609344 kilometers. To convert miles to kilometers, multiply by 1.60934.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Miles to Kilometers Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Miles (mi)</th><th>Kilometers (km)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 mi</td><td>1.609 km</td></tr>
      <tr><td>2 mi</td><td>3.219 km</td></tr>
      <tr><td>3 mi</td><td>4.828 km</td></tr>
      <tr><td>5 mi</td><td>8.047 km</td></tr>
      <tr><td>10 mi</td><td>16.093 km</td></tr>
      <tr><td>13.1 mi</td><td>21.082 km</td></tr>
      <tr><td>26.2 mi</td><td>42.165 km</td></tr>
      <tr><td>50 mi</td><td>80.467 km</td></tr>
      <tr><td>60 mi</td><td>96.561 km</td></tr>
      <tr><td>100 mi</td><td>160.934 km</td></tr>
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

<script src="/scripts/calculators/miles-to-km.js"></script>

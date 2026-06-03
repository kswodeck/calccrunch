---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Kilometers to Miles Converter
description: Convert kilometers to miles instantly.
---

## How to Use This Converter

1. **Enter a value in kilometers** (km)
2. The equivalent in **miles** (mi) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Kilometers <span class="input-addon-text">(km)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter kilometers"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">km</span>
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
  <h4>📐 Kilometers to Miles Formula</h4>
  <p>1 kilometer equals 0.621371 miles. To convert kilometers to miles, multiply by 0.621371 (or divide by 1.60934).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Kilometers to Miles Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Kilometers (km)</th><th>Miles (mi)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 km</td><td>0.621 mi</td></tr>
      <tr><td>2 km</td><td>1.243 mi</td></tr>
      <tr><td>5 km</td><td>3.107 mi</td></tr>
      <tr><td>10 km</td><td>6.214 mi</td></tr>
      <tr><td>21.1 km</td><td>13.111 mi</td></tr>
      <tr><td>42.2 km</td><td>26.222 mi</td></tr>
      <tr><td>50 km</td><td>31.069 mi</td></tr>
      <tr><td>80 km</td><td>49.71 mi</td></tr>
      <tr><td>100 km</td><td>62.137 mi</td></tr>
      <tr><td>200 km</td><td>124.274 mi</td></tr>
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

<script src="/scripts/calculators/km-to-miles.js"></script>

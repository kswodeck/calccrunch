---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Kilometers per Hour to Miles per Hour Converter
description: Convert kilometers per hour to miles per hour instantly.
---

## How to Use This Converter

1. **Enter a value in kilometers per hour** (km/h)
2. The equivalent in **miles per hour** (mph) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Kilometers per Hour <span class="input-addon-text">(km/h)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter kilometers per hour"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">km/h</span>
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
  <h4>📐 Kilometers per Hour to Miles per Hour Formula</h4>
  <p>1 km/h equals 0.621371 mph. To convert kilometers per hour to miles per hour, multiply by 0.621371 (or divide by 1.60934).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Kilometers per Hour to Miles per Hour Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Kilometers per Hour (km/h)</th><th>Miles per Hour (mph)</th></tr>
    </thead>
    <tbody>
      <tr><td>10 km/h</td><td>6.21 mph</td></tr>
      <tr><td>20 km/h</td><td>12.43 mph</td></tr>
      <tr><td>30 km/h</td><td>18.64 mph</td></tr>
      <tr><td>50 km/h</td><td>31.07 mph</td></tr>
      <tr><td>60 km/h</td><td>37.28 mph</td></tr>
      <tr><td>80 km/h</td><td>49.71 mph</td></tr>
      <tr><td>90 km/h</td><td>55.92 mph</td></tr>
      <tr><td>100 km/h</td><td>62.14 mph</td></tr>
      <tr><td>120 km/h</td><td>74.56 mph</td></tr>
      <tr><td>130 km/h</td><td>80.78 mph</td></tr>
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

<script src="/scripts/calculators/kmh-to-mph.js"></script>

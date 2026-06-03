---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Miles per Hour to Kilometers per Hour Converter
description: Convert miles per hour to kilometers per hour instantly.
---

## How to Use This Converter

1. **Enter a value in miles per hour** (mph)
2. The equivalent in **kilometers per hour** (km/h) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Miles per Hour <span class="input-addon-text">(mph)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter miles per hour"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">mph</span>
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
  <h4>📐 Miles per Hour to Kilometers per Hour Formula</h4>
  <p>1 mph equals 1.60934 km/h. To convert miles per hour to kilometers per hour, multiply by 1.60934.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Miles per Hour to Kilometers per Hour Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Miles per Hour (mph)</th><th>Kilometers per Hour (km/h)</th></tr>
    </thead>
    <tbody>
      <tr><td>5 mph</td><td>8.05 km/h</td></tr>
      <tr><td>10 mph</td><td>16.09 km/h</td></tr>
      <tr><td>25 mph</td><td>40.23 km/h</td></tr>
      <tr><td>30 mph</td><td>48.28 km/h</td></tr>
      <tr><td>45 mph</td><td>72.42 km/h</td></tr>
      <tr><td>55 mph</td><td>88.51 km/h</td></tr>
      <tr><td>60 mph</td><td>96.56 km/h</td></tr>
      <tr><td>65 mph</td><td>104.61 km/h</td></tr>
      <tr><td>70 mph</td><td>112.65 km/h</td></tr>
      <tr><td>80 mph</td><td>128.75 km/h</td></tr>
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

<script src="/scripts/calculators/mph-to-kmh.js"></script>

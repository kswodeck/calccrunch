---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Feet to Meters Converter
description: Convert feet to meters instantly.
---

## How to Use This Converter

1. **Enter a value in feet** (ft)
2. The equivalent in **meters** (m) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Feet <span class="input-addon-text">(ft)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter feet"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">ft</span>
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
  <h4>📐 Feet to Meters Formula</h4>
  <p>1 foot equals exactly 0.3048 meters. To convert feet to meters, multiply by 0.3048.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Feet to Meters Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Feet (ft)</th><th>Meters (m)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 ft</td><td>0.305 m</td></tr>
      <tr><td>3 ft</td><td>0.914 m</td></tr>
      <tr><td>5 ft</td><td>1.524 m</td></tr>
      <tr><td>6 ft</td><td>1.829 m</td></tr>
      <tr><td>10 ft</td><td>3.048 m</td></tr>
      <tr><td>20 ft</td><td>6.096 m</td></tr>
      <tr><td>50 ft</td><td>15.24 m</td></tr>
      <tr><td>100 ft</td><td>30.48 m</td></tr>
      <tr><td>200 ft</td><td>60.96 m</td></tr>
      <tr><td>500 ft</td><td>152.4 m</td></tr>
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

<script src="/scripts/calculators/feet-to-meters.js"></script>

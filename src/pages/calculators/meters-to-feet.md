---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Meters to Feet Converter
description: Convert meters to feet instantly.
---

## How to Use This Converter

1. **Enter a value in meters** (m)
2. The equivalent in **feet** (ft) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Meters <span class="input-addon-text">(m)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter meters"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">m</span>
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
  <h4>📐 Meters to Feet Formula</h4>
  <p>1 meter equals 3.28084 feet. To convert meters to feet, multiply by 3.28084 (or divide by 0.3048).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Meters to Feet Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Meters (m)</th><th>Feet (ft)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 m</td><td>3.281 ft</td></tr>
      <tr><td>2 m</td><td>6.562 ft</td></tr>
      <tr><td>5 m</td><td>16.404 ft</td></tr>
      <tr><td>10 m</td><td>32.808 ft</td></tr>
      <tr><td>15 m</td><td>49.213 ft</td></tr>
      <tr><td>20 m</td><td>65.617 ft</td></tr>
      <tr><td>50 m</td><td>164.042 ft</td></tr>
      <tr><td>100 m</td><td>328.084 ft</td></tr>
      <tr><td>150 m</td><td>492.126 ft</td></tr>
      <tr><td>200 m</td><td>656.168 ft</td></tr>
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

<script src="/scripts/calculators/meters-to-feet.js"></script>

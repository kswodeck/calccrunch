---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Feet to Inches Converter
description: Convert feet to inches instantly.
---

## How to Use This Converter

1. **Enter a value in feet** (ft)
2. The equivalent in **inches** (in) updates instantly
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
  <h4>📐 Feet to Inches Formula</h4>
  <p>1 foot equals exactly 12 inches. To convert feet to inches, multiply by 12.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Feet to Inches Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Feet (ft)</th><th>Inches (in)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 ft</td><td>12 in</td></tr>
      <tr><td>2 ft</td><td>24 in</td></tr>
      <tr><td>3 ft</td><td>36 in</td></tr>
      <tr><td>4 ft</td><td>48 in</td></tr>
      <tr><td>5 ft</td><td>60 in</td></tr>
      <tr><td>5.5 ft</td><td>66 in</td></tr>
      <tr><td>6 ft</td><td>72 in</td></tr>
      <tr><td>6.5 ft</td><td>78 in</td></tr>
      <tr><td>7 ft</td><td>84 in</td></tr>
      <tr><td>10 ft</td><td>120 in</td></tr>
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

<script src="/scripts/calculators/feet-to-inches.js"></script>

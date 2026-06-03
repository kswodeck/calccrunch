---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Fahrenheit to Celsius Converter
description: Convert fahrenheit to celsius instantly.
---

## How to Use This Converter

1. **Enter a value in fahrenheit** (°F)
2. The equivalent in **celsius** (°C) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Fahrenheit <span class="input-addon-text">(°F)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter fahrenheit"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">°F</span>
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
  <h4>📐 Fahrenheit to Celsius Formula</h4>
  <p>To convert Fahrenheit to Celsius, subtract 32 and multiply by 0.5556 (5/9). So °C = (°F − 32) × 5/9.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Fahrenheit to Celsius Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Fahrenheit (°F)</th><th>Celsius (°C)</th></tr>
    </thead>
    <tbody>
      <tr><td>-40 °F</td><td>-40 °C</td></tr>
      <tr><td>0 °F</td><td>-17.8 °C</td></tr>
      <tr><td>32 °F</td><td>0 °C</td></tr>
      <tr><td>50 °F</td><td>10 °C</td></tr>
      <tr><td>68 °F</td><td>20 °C</td></tr>
      <tr><td>72 °F</td><td>22.2 °C</td></tr>
      <tr><td>98.6 °F</td><td>37 °C</td></tr>
      <tr><td>100 °F</td><td>37.8 °C</td></tr>
      <tr><td>150 °F</td><td>65.6 °C</td></tr>
      <tr><td>212 °F</td><td>100 °C</td></tr>
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

<script src="/scripts/calculators/fahrenheit-to-celsius.js"></script>

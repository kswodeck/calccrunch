---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Celsius to Fahrenheit Converter
description: Convert celsius to fahrenheit instantly.
---

## How to Use This Converter

1. **Enter a value in celsius** (°C)
2. The equivalent in **fahrenheit** (°F) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Celsius <span class="input-addon-text">(°C)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter celsius"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">°C</span>
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
  <h4>📐 Celsius to Fahrenheit Formula</h4>
  <p>To convert Celsius to Fahrenheit, multiply by 1.8 (9/5) and add 32. So °F = °C × 9/5 + 32.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Celsius to Fahrenheit Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Celsius (°C)</th><th>Fahrenheit (°F)</th></tr>
    </thead>
    <tbody>
      <tr><td>-40 °C</td><td>-40 °F</td></tr>
      <tr><td>0 °C</td><td>32 °F</td></tr>
      <tr><td>10 °C</td><td>50 °F</td></tr>
      <tr><td>20 °C</td><td>68 °F</td></tr>
      <tr><td>25 °C</td><td>77 °F</td></tr>
      <tr><td>30 °C</td><td>86 °F</td></tr>
      <tr><td>37 °C</td><td>98.6 °F</td></tr>
      <tr><td>40 °C</td><td>104 °F</td></tr>
      <tr><td>50 °C</td><td>122 °F</td></tr>
      <tr><td>100 °C</td><td>212 °F</td></tr>
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

<script src="/scripts/calculators/celsius-to-fahrenheit.js"></script>

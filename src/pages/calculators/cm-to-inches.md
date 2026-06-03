---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Centimeters to Inches Converter
description: Convert centimeters to inches instantly.
---

## How to Use This Converter

1. **Enter a value in centimeters** (cm)
2. The equivalent in **inches** (in) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Centimeters <span class="input-addon-text">(cm)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter centimeters"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">cm</span>
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
  <h4>📐 Centimeters to Inches Formula</h4>
  <p>1 centimeter equals 0.393701 inches. To convert centimeters to inches, divide by 2.54 (or multiply by 0.393701).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Centimeters to Inches Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Centimeters (cm)</th><th>Inches (in)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 cm</td><td>0.394 in</td></tr>
      <tr><td>5 cm</td><td>1.969 in</td></tr>
      <tr><td>10 cm</td><td>3.937 in</td></tr>
      <tr><td>15 cm</td><td>5.906 in</td></tr>
      <tr><td>20 cm</td><td>7.874 in</td></tr>
      <tr><td>30 cm</td><td>11.811 in</td></tr>
      <tr><td>50 cm</td><td>19.685 in</td></tr>
      <tr><td>100 cm</td><td>39.37 in</td></tr>
      <tr><td>150 cm</td><td>59.055 in</td></tr>
      <tr><td>180 cm</td><td>70.866 in</td></tr>
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

<script src="/scripts/calculators/cm-to-inches.js"></script>

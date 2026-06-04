---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Grams to Ounces Converter
description: Convert grams to ounces instantly.
---

## How to Use This Converter

1. **Enter a value in grams** (g)
2. The equivalent in **ounces** (oz) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Grams <span class="input-addon-text">(g)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter grams"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">g</span>
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
  <h4>📐 Grams to Ounces Formula</h4>
  <p>1 gram equals 0.035274 ounces. To convert grams to ounces, divide by 28.3495 (or multiply by 0.035274).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Grams to Ounces Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Grams (g)</th><th>Ounces (oz)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 g</td><td>0.035 oz</td></tr>
      <tr><td>5 g</td><td>0.176 oz</td></tr>
      <tr><td>10 g</td><td>0.353 oz</td></tr>
      <tr><td>25 g</td><td>0.882 oz</td></tr>
      <tr><td>50 g</td><td>1.764 oz</td></tr>
      <tr><td>100 g</td><td>3.527 oz</td></tr>
      <tr><td>200 g</td><td>7.055 oz</td></tr>
      <tr><td>250 g</td><td>8.818 oz</td></tr>
      <tr><td>500 g</td><td>17.637 oz</td></tr>
      <tr><td>1,000 g</td><td>35.274 oz</td></tr>
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

<script src="/scripts/calculators/grams-to-ounces.js"></script>

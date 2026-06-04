---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Ounces to Grams Converter
description: Convert ounces to grams instantly.
---

## How to Use This Converter

1. **Enter a value in ounces** (oz)
2. The equivalent in **grams** (g) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Ounces <span class="input-addon-text">(oz)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter ounces"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">oz</span>
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
  <h4>📐 Ounces to Grams Formula</h4>
  <p>1 ounce equals 28.3495 grams. To convert ounces to grams, multiply by 28.3495.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Ounces to Grams Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Ounces (oz)</th><th>Grams (g)</th></tr>
    </thead>
    <tbody>
      <tr><td>1 oz</td><td>28.35 g</td></tr>
      <tr><td>2 oz</td><td>56.7 g</td></tr>
      <tr><td>4 oz</td><td>113.4 g</td></tr>
      <tr><td>6 oz</td><td>170.1 g</td></tr>
      <tr><td>8 oz</td><td>226.8 g</td></tr>
      <tr><td>12 oz</td><td>340.19 g</td></tr>
      <tr><td>16 oz</td><td>453.59 g</td></tr>
      <tr><td>24 oz</td><td>680.39 g</td></tr>
      <tr><td>32 oz</td><td>907.18 g</td></tr>
      <tr><td>48 oz</td><td>1,360.78 g</td></tr>
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

<script src="/scripts/calculators/ounces-to-grams.js"></script>

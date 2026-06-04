---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Cups to Milliliters Converter
description: Convert cups to milliliters instantly.
---

## How to Use This Converter

1. **Enter a value in cups** (cups)
2. The equivalent in **milliliters** (ml) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Cups <span class="input-addon-text">(cups)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter cups"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">cups</span>
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
  <h4>📐 Cups to Milliliters Formula</h4>
  <p>1 US cup equals 236.588 milliliters. To convert cups to milliliters, multiply by 236.588. (Based on the US customary cup.)</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Cups to Milliliters Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Cups (cups)</th><th>Milliliters (ml)</th></tr>
    </thead>
    <tbody>
      <tr><td>0.25 cups</td><td>59.1 ml</td></tr>
      <tr><td>0.5 cups</td><td>118.3 ml</td></tr>
      <tr><td>0.75 cups</td><td>177.4 ml</td></tr>
      <tr><td>1 cups</td><td>236.6 ml</td></tr>
      <tr><td>1.5 cups</td><td>354.9 ml</td></tr>
      <tr><td>2 cups</td><td>473.2 ml</td></tr>
      <tr><td>2.5 cups</td><td>591.5 ml</td></tr>
      <tr><td>3 cups</td><td>709.8 ml</td></tr>
      <tr><td>4 cups</td><td>946.4 ml</td></tr>
      <tr><td>8 cups</td><td>1,892.7 ml</td></tr>
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

<script src="/scripts/calculators/cups-to-ml.js"></script>

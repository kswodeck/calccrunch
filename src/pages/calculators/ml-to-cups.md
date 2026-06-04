---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: Milliliters to Cups Converter
description: Convert milliliters to cups instantly.
---

## How to Use This Converter

1. **Enter a value in milliliters** (ml)
2. The equivalent in **cups** (cups) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">Milliliters <span class="input-addon-text">(ml)</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter milliliters"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">ml</span>
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
  <h4>📐 Milliliters to Cups Formula</h4>
  <p>1 milliliter equals 0.004227 US cups. To convert milliliters to cups, divide by 236.588. (Based on the US customary cup.)</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 Milliliters to Cups Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>Milliliters (ml)</th><th>Cups (cups)</th></tr>
    </thead>
    <tbody>
      <tr><td>50 ml</td><td>0.211 cups</td></tr>
      <tr><td>100 ml</td><td>0.423 cups</td></tr>
      <tr><td>150 ml</td><td>0.634 cups</td></tr>
      <tr><td>200 ml</td><td>0.845 cups</td></tr>
      <tr><td>237 ml</td><td>1.002 cups</td></tr>
      <tr><td>250 ml</td><td>1.057 cups</td></tr>
      <tr><td>355 ml</td><td>1.5 cups</td></tr>
      <tr><td>473 ml</td><td>1.999 cups</td></tr>
      <tr><td>500 ml</td><td>2.113 cups</td></tr>
      <tr><td>1,000 ml</td><td>4.227 cups</td></tr>
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

<script src="/scripts/calculators/ml-to-cups.js"></script>

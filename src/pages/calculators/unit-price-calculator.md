---
layout: ../../layouts/CalculatorLayout.astro
calcType: unitprice
title: Unit Price Calculator
description: Compare prices per ounce, pound, liter, or item to find which package size is actually the better deal.
---

## How to Use This Calculator

1. **Enter Product A's price, quantity, and unit** (weight, volume, or item count)
2. **Enter Product B's price, quantity, and unit** — pick a compatible unit type
3. Click **Compare Prices** to see the true unit price for each and which one is the better buy

<div class="calculator-form" id="unit-price-calculator-form">
  <div class="form-section">
    <h3>Product A</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="a-price">
          Price <span class="required">*</span>
          <span class="tooltip" title="Total price you'd pay for this package">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="a-price" class="form-input" placeholder="8.99" min="0" step="0.01" required />
        </div>
      </div>
      <div class="form-group">
        <label for="a-quantity">Quantity <span class="required">*</span></label>
        <input type="number" id="a-quantity" class="form-input" placeholder="12" min="0" step="any" required />
      </div>
      <div class="form-group">
        <label for="a-unit">Unit</label>
        <select id="a-unit" class="form-select">
          <optgroup label="Weight">
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="floz">fl oz</option>
            <option value="cup">cup</option>
            <option value="ml">ml</option>
            <option value="l">L</option>
          </optgroup>
          <optgroup label="Count">
            <option value="item">item / count</option>
          </optgroup>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Product B</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="b-price">
          Price <span class="required">*</span>
          <span class="tooltip" title="Total price you'd pay for this package">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="b-price" class="form-input" placeholder="19.99" min="0" step="0.01" required />
        </div>
      </div>
      <div class="form-group">
        <label for="b-quantity">Quantity <span class="required">*</span></label>
        <input type="number" id="b-quantity" class="form-input" placeholder="32" min="0" step="any" required />
      </div>
      <div class="form-group">
        <label for="b-unit">Unit</label>
        <select id="b-unit" class="form-select">
          <optgroup label="Weight">
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="floz">fl oz</option>
            <option value="cup">cup</option>
            <option value="ml">ml</option>
            <option value="l">L</option>
          </optgroup>
          <optgroup label="Count">
            <option value="item">item / count</option>
          </optgroup>
        </select>
      </div>
    </div>
    <small class="form-help">Pick units from the same group (both Weight, both Volume, or both Count) so the comparison is apples-to-apples.</small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Compare Prices →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="unit-price-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🧮 The Unit Price Formula</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Unit price = Total price ÷ Quantity.</strong> A $19.99, 32 oz jar of peanut butter is $19.99 ÷ 32 = $0.625/oz.</li>
    <li>Convert both products to the <strong>same unit</strong> before comparing — you can't compare a per-pound price to a per-ounce price directly.</li>
    <li>The lower unit price is the better deal <em>on price alone</em> — but only if you'll actually use the whole package before it expires or goes stale.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🛒 Why Bigger Isn't Always Cheaper</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Studies on grocery pricing regularly find that a meaningful share of "bulk" or family-size packages actually have a <strong>higher</strong> unit price than the smaller size — manufacturers know shoppers assume bigger = cheaper.</li>
    <li>Store brands frequently beat name brands on unit price even at the same package size.</li>
    <li>U.S. retailers are required by the FTC's Unit Pricing Rule to post per-unit shelf prices — but the units used (per oz vs. per lb) often differ between two competing products on the same shelf, making mental math hard without a calculator.</li>
  </ul>
</div>

<script src="/scripts/calculators/unit-price-calculator.js"></script>

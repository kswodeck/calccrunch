---
layout: ../../layouts/CalculatorLayout.astro
calcType: discount
title: Discount Calculator
description: Calculate the sale price and how much you save for any discount percentage.
---

## How to Use This Calculator

1. **Enter the original price**
2. **Enter the discount percentage** (e.g. 25 for 25% off)
3. *(Optional)* Add a **second discount** to stack two offers, or a **sales tax** rate
4. See the final price, your savings, and the effective discount instantly

<div class="calculator-form" id="discount-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="original-price">Original Price <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="original-price" class="form-input" placeholder="80.00" value="80" min="0" step="0.01" />
        </div>
      </div>
      <div class="form-group">
        <label for="discount-1">Discount</label>
        <div class="input-group">
          <input type="number" id="discount-1" class="form-input" placeholder="25" value="25" min="0" max="100" step="0.1" />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="discount-2">Second discount (optional, stacked)</label>
        <div class="input-group">
          <input type="number" id="discount-2" class="form-input" placeholder="0" value="0" min="0" max="100" step="0.1" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Applied after the first discount</small>
      </div>
      <div class="form-group">
        <label for="tax-rate">Sales tax (optional)</label>
        <div class="input-group">
          <input type="number" id="tax-rate" class="form-input" placeholder="0" value="0" min="0" max="30" step="0.001" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Added to the discounted price</small>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Reset</button>
  </div>
</div>

<div id="discount-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>🏷️ How to Calculate a Discount</h4>
  <p><strong>Sale price = Original × (1 − Discount ÷ 100).</strong> For $80 at 25% off: $80 × 0.75 = <strong>$60.00</strong>, and you save $20.00.</p>
  <p><strong>Stacked discounts multiply, they don't add.</strong> "25% off, then an extra 20% off" is 0.75 × 0.80 = 0.60 of the original — a 40% effective discount, not 45%.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💡 Quick Mental-Math Tricks</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>10% off:</strong> move the decimal one place left ($80 → save $8).</li>
    <li><strong>20% off:</strong> take 10% and double it ($80 → save $16).</li>
    <li><strong>25% off:</strong> divide by 4 to get the savings ($80 ÷ 4 = $20).</li>
    <li><strong>50% off:</strong> just halve it.</li>
  </ul>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/discount-calculator.js"></script>

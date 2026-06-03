---
layout: ../../layouts/CalculatorLayout.astro
calcType: salestax
title: Sales Tax Calculator
description: Calculate sales tax and the total price for any amount and tax rate.
---

## How to Use This Calculator

1. **Enter the amount** — the pre-tax price (or post-tax total if removing tax)
2. **Enter the sales tax rate** — or pick your state to auto-fill the base rate
3. **Choose a mode** — *Add tax* to a price, or *Remove tax* from a total
4. Results update instantly: tax amount, total, and effective rate

<div class="calculator-form" id="sales-tax-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="amount">Amount <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="amount" class="form-input" placeholder="100.00" value="100" min="0" step="0.01" />
        </div>
        <small class="form-help">Pre-tax price, or the total if removing tax</small>
      </div>
      <div class="form-group">
        <label for="tax-rate">Sales Tax Rate</label>
        <div class="input-group">
          <input type="number" id="tax-rate" class="form-input" placeholder="7.25" value="7.25" min="0" max="30" step="0.001" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Or pick a state below</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="state-select">State base rate (optional)</label>
        <select id="state-select" class="form-select">
          <option value="">— Select a state —</option>
        </select>
        <small class="form-help">State base rate only; local/city taxes may add more</small>
      </div>
      <div class="form-group">
        <label for="mode">Mode</label>
        <select id="mode" class="form-select">
          <option value="add">Add tax to price</option>
          <option value="remove">Remove tax from total</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Reset</button>
  </div>
</div>

<div id="sales-tax-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>🧾 How Sales Tax Is Calculated</h4>
  <p><strong>Adding tax:</strong> Tax = Price × (Rate ÷ 100), and Total = Price + Tax. For a $100 item at 7.25%, tax is $7.25 and the total is $107.25.</p>
  <p><strong>Removing tax (reverse sales tax):</strong> Pre-tax price = Total ÷ (1 + Rate ÷ 100). For a $107.25 total at 7.25%, the pre-tax price is $100.00.</p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📍 State vs. Local Sales Tax</h4>
  <p>The state rate is only part of the story. Counties and cities often add their own sales tax, so the <strong>combined rate</strong> at checkout can be 1–5% higher than the state base rate. Five states — Alaska, Delaware, Montana, New Hampshire, and Oregon — have <strong>no statewide sales tax</strong> (though some Alaska localities do). Always confirm the combined rate for your exact location.</p>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/sales-tax-calculator.js"></script>

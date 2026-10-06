---
layout: ../../layouts/CalculatorLayout.astro
calcType: holidaygiftbudget
title: Holiday Gift Budget Calculator
description: Plan your 2026 holiday gift budget. split spending per recipient, add a wrapping/shipping reserve, and see the weekly savings needed to hit your target date.
---

## How to Use This Calculator

1. Set your **shopping deadline** (the date you want all gifts bought by) and, optionally, your **total gift budget** and **annual income**
2. Add a row for **each person** you're buying for and enter a planned budget
3. Enter any amount you've **already saved** toward holiday gifts
4. Adjust the **wrapping & shipping reserve** percentage if needed
5. Click **Calculate** to see your total cost, weekly savings needed, and how your plan compares to common budgeting guidelines

<div class="calculator-form" id="holiday-gift-budget-calculator-form">
  <div class="form-section">
    <h3>Your Plan</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="deadline-date">
          Shopping Deadline <span class="required">*</span>
        </label>
        <div class="input-group">
          <input
            type="date"
            id="deadline-date"
            class="form-input"
            required
          />
        </div>
        <small class="form-help">The date you want all gifts bought and wrapped by</small>
      </div>
      <div class="form-group">
        <label for="already-saved">
          Already Saved Toward Gifts
        </label>
        <div class="input-group">
          <input
            type="number"
            id="already-saved"
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount you've already set aside</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="total-budget">
          Total Gift Budget (Optional)
        </label>
        <div class="input-group">
          <input
            type="number"
            id="total-budget"
            class="form-input"
            placeholder="e.g. 700"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Leave blank to just total up your recipient list below</small>
      </div>
      <div class="form-group">
        <label for="annual-income">
          Annual Household Income (Optional)
        </label>
        <div class="input-group">
          <input
            type="number"
            id="annual-income"
            class="form-input"
            placeholder="e.g. 65000"
            min="0"
            step="1000"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Used only to show the 1-2%-of-income guideline below</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="reserve-percent">
          Wrapping &amp; Shipping Reserve
        </label>
        <div class="input-group">
          <input
            type="number"
            id="reserve-percent"
            class="form-input"
            placeholder="10"
            value="10"
            min="0"
            max="50"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Extra buffer for wrapping paper, cards, and shipping costs</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Gift Recipients</h3>
    <div id="recipient-list"></div>
    <button type="button" id="add-recipient" class="btn btn-secondary" style="margin-top: 0.5rem;">
      + Add Recipient
    </button>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Holiday Budget →
  </button>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Calculation
    </button>
  </div>
</div>

<div id="holiday-gift-budget-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🎁 How Much Do People Typically Spend on Holiday Gifts?</h4>
  <p>
    Holiday gift spending varies widely, but a common budgeting rule of thumb is to
    <strong>cap total gift spending at roughly 1-2% of your annual income</strong>.
    On a $60,000 income, that's about $600-$1,200 for the whole season across every
    recipient — a useful sanity check even if your actual number ends up different.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💡 Tips for Sticking to Your Holiday Budget</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Set the per-person amount first:</strong> Decide each recipient's budget before you start browsing</li>
    <li><strong>Build in a buffer:</strong> Wrapping paper, cards, and shipping can add 5-15% on top of gift costs</li>
    <li><strong>Save weekly, not all at once:</strong> Spreading the total over several weeks is far easier than one lump payment</li>
    <li><strong>Track as you buy:</strong> Update your saved amount here as you check names off your list</li>
    <li><strong>Use a separate account or envelope:</strong> Keeping holiday money separate prevents it from blending into everyday spending</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📅 Why a Deadline Matters</h4>
  <p>
    Shopping early — before major sales events and shipping cutoffs — gives you more time
    to compare prices and avoid rush-shipping fees. Setting a deadline here (rather than
    waiting until the last week of December) also spreads your savings over more weeks,
    which lowers the amount you need to set aside each week.
  </p>
</div>

<style>
  .recipient-row {
    display: grid;
    grid-template-columns: 1fr 140px 40px;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .recipient-row input[type="text"],
  .recipient-row input[type="number"] {
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--color-surface-table-border, #e5e7eb);
    border-radius: 8px;
    font-size: 0.95rem;
    width: 100%;
  }

  .remove-recipient {
    background: var(--color-highlight-red, #fee2e2);
    border: 1px solid #fca5a5;
    border-radius: 8px;
    color: #b91c1c;
    cursor: pointer;
    font-size: 1.1rem;
    height: 38px;
    width: 40px;
  }

  .remove-recipient:hover {
    background: #fecaca;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .gift-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .summary-card {
    padding: 1.25rem;
    background: var(--color-white);
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .summary-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .summary-card .amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-black);
  }

  .summary-card .amount.text-success { color: var(--color-success); }
  .summary-card .amount.text-primary { color: var(--color-light-blue); }
  .summary-card .amount.text-warning { color: var(--color-warning); }

  .weekly-savings-box {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 12px;
    border: 2px solid #3b82f6;
    text-align: center;
  }

  .weekly-savings-box h4 {
    margin: 0 0 0.5rem 0;
    color: var(--color-primary-blue);
  }

  .weekly-savings-box .big-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary-blue);
  }

  .weekly-savings-box .context {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }

  .budget-gap-indicator {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .budget-gap-indicator.on-track {
    background: var(--color-highlight-green);
    border: 1px solid #86efac;
  }

  .budget-gap-indicator.over {
    background: var(--color-highlight-red);
    border: 1px solid #fca5a5;
  }

  .recipient-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .recipient-breakdown table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .recipient-breakdown th,
  .recipient-breakdown td {
    padding: 0.6rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .recipient-breakdown th:last-child,
  .recipient-breakdown td:last-child {
    text-align: right;
  }

  @media (max-width: 640px) {
    .recipient-row {
      grid-template-columns: 1fr 100px 36px;
    }
  }
</style>

<script src="/scripts/calculators/holiday-gift-budget-calculator.js"></script>

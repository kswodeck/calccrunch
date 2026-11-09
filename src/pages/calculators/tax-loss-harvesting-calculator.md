---
layout: ../../layouts/CalculatorLayout.astro
calcType: taxlossharvesting
title: Tax-Loss Harvesting Calculator
description: Estimate how much a tax-loss harvest could save you in 2026 — offset capital gains, deduct up to $3,000 against ordinary income, and see your carryforward.
---

## How to Use This Calculator

1. **Enter your filing status and other taxable income** (everything except your investment gains/losses)
2. **Enter any capital gains you've already realized this year** (short-term and long-term, separately)
3. **Enter the loss you're considering harvesting** — the unrealized loss on a position you'd sell before December 31
4. Click **Calculate** to see exactly how the loss gets applied and your estimated tax savings

<div class="calculator-form" id="tax-loss-harvesting-calculator-form">
  <div class="form-section">
    <h3>Your Tax Situation</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="filing-status">
          Filing Status <span class="required">*</span>
        </label>
        <select id="filing-status" class="form-select" required>
          <option value="single" selected>Single</option>
          <option value="hoh">Head of Household</option>
          <option value="mfj">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
        </select>
      </div>
      <div class="form-group">
        <label for="other-income">
          Other Taxable Income <span class="required">*</span>
          <span class="tooltip" title="Your taxable income from wages, self-employment, interest, etc. — after deductions — not counting any capital gains below. Not sure? Check the tax bracket calculator first.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="other-income"
            class="form-input"
            placeholder="70000"
            value="70000"
            min="0"
            step="100"
            required
          />
        </div>
        <small class="form-help">Not sure? Check the <a href="/calculators/tax-bracket-calculator">tax bracket calculator</a></small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Capital Gains Already Realized This Year</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="st-gain">
          Short-Term Gains <span class="tooltip" title="Gains on assets held one year or less, taxed as ordinary income. Leave at 0 if none.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="st-gain" class="form-input" placeholder="0" value="0" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="lt-gain">
          Long-Term Gains <span class="tooltip" title="Gains on assets held more than one year, taxed at 0%/15%/20%. Leave at 0 if none.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="lt-gain" class="form-input" placeholder="0" value="0" min="0" step="100" />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Loss You're Considering Harvesting</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="loss-amount">
          Loss to Harvest <span class="required">*</span>
          <span class="tooltip" title="The unrealized loss on a position you'd sell before Dec. 31 — current value minus your cost basis, as a positive number.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="loss-amount"
            class="form-input"
            placeholder="5000"
            value="5000"
            min="0"
            step="100"
            required
          />
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Tax Savings →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="tax-loss-harvesting-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📉 How Tax-Loss Harvesting Works</h4>
  <p>
    Tax-loss harvesting means selling an investment at a loss on purpose, before December 31, to use that loss to
    offset capital gains elsewhere in your portfolio. Losses first offset gains <strong>dollar-for-dollar</strong>
    (any leftover loss can then offset up to <strong>$3,000</strong> of ordinary income — <strong>$1,500</strong>
    if you're Married Filing Separately), and any loss still left over <strong>carries forward indefinitely</strong>
    to future tax years.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ The Wash-Sale Rule (IRC §1091)</h4>
  <p>
    You can't claim the loss if you buy a "substantially identical" security within <strong>30 days before or
    after</strong> the sale — a 61-day window total. If you violate it, the loss isn't gone forever: it's added
    to the cost basis of your replacement shares, but you lose this year's tax benefit. The rule applies across
    <strong>all your accounts</strong>, including IRAs, and watch out for automatic dividend reinvestment (DRIP),
    which can trigger a wash sale without you doing anything.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📅 The December 31 Deadline</h4>
  <p>
    To count for this tax year, the <strong>trade date</strong> (not the settlement date) must fall on or before
    December 31. A sale executed on December 31 still counts for this year even if it settles in early January.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your
    calculation, or use the <strong>Share button</strong> to send it to a family member or tax preparer.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/tax-loss-harvesting-calculator.js"></script>

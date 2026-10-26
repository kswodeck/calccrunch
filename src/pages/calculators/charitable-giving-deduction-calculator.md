---
layout: ../../layouts/CalculatorLayout.astro
calcType: charitablegivingdeduction
title: Charitable Giving Deduction Calculator
description: Calculate your 2026 charitable tax deduction under the new OBBBA rules — whether you itemize or take the standard deduction.
---

## How to Use This Calculator

1. **Choose your filing status** and whether you itemize deductions or take the standard deduction
2. **Enter your AGI and tax bracket** - the 0.5% AGI floor only applies if you itemize
3. **Enter your cash and non-cash charitable donations** for the year
4. Click **Calculate** to see your deductible amount and estimated tax savings

<div class="calculator-form" id="charitable-giving-deduction-calculator-form">
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
        <label for="deduction-type">
          How Do You File? <span class="required">*</span>
          <span class="tooltip" title="Pick 'Standard deduction' if your total itemized deductions (mortgage interest, SALT, charity, etc.) are less than your standard deduction. Most filers take the standard deduction.">?</span>
        </label>
        <select id="deduction-type" class="form-select" required>
          <option value="standard" selected>Standard Deduction</option>
          <option value="itemize">Itemized Deductions (Schedule A)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Your Income</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="agi">
          Adjusted Gross Income (AGI) <span class="required">*</span>
          <span class="tooltip" title="Used only to calculate the new 0.5% AGI floor that applies if you itemize. Not used for the standard-deduction above-the-line benefit.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="agi"
            class="form-input"
            placeholder="75000"
            value="75000"
            min="0"
            step="100"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="marginal-rate">
          Your Marginal Tax Bracket <span class="required">*</span>
        </label>
        <select id="marginal-rate" class="form-select" required>
          <option value="10">10%</option>
          <option value="12" selected>12%</option>
          <option value="22">22%</option>
          <option value="24">24%</option>
          <option value="32">32%</option>
          <option value="35">35%</option>
          <option value="37">37%</option>
        </select>
        <small class="form-help">Not sure? Check the <a href="/calculators/tax-bracket-calculator">tax bracket calculator</a></small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Your 2026 Charitable Giving</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="cash-donations">
          Cash Donations to Public Charities <span class="required">*</span>
          <span class="tooltip" title="Checks, credit/debit cards, ACH, Venmo/PayPal, or payroll deduction gifts to 501(c)(3) public charities. Does not include donor-advised funds or private foundations.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="cash-donations"
            class="form-input"
            placeholder="1200"
            value="1200"
            min="0"
            step="10"
            required
          />
        </div>
      </div>
      <div class="form-group" id="noncash-group">
        <label for="noncash-donations">
          Non-Cash Donations (property, goods, stock)
          <span class="tooltip" title="Clothing, household goods, or appreciated stock given to charity. Only deductible if you itemize — the standard-deduction above-the-line benefit is cash-only.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="noncash-donations"
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="10"
          />
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Deduction →
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

<div id="charitable-giving-deduction-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🎁 New for 2026: Charitable Deductions Changed Under the OBBBA</h4>
  <p>
    The One Big Beautiful Bill Act (OBBBA) changed charitable-giving tax rules starting with the
    <strong>2026 tax year</strong>. If you take the <strong>standard deduction</strong>, you can now claim a brand-new
    above-the-line deduction for cash gifts — up to <strong>$1,000 (single/HOH/MFS)</strong> or
    <strong>$2,000 (married filing jointly)</strong> — with no itemizing required. If you <strong>itemize</strong>,
    a new rule subtracts <strong>0.5% of your AGI</strong> from your total charitable contributions before the
    remainder counts as a deduction.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Standard Deduction vs. Itemized: Quick Comparison</h4>
  <table class="profit-table" style="width: 100%;">
    <thead><tr><th>Rule</th><th>Standard Deduction</th><th>Itemized (Schedule A)</th></tr></thead>
    <tbody>
      <tr><td>Deduction cap</td><td>$1,000 single / $2,000 MFJ</td><td>No dollar cap (subject to AGI % limits)</td></tr>
      <tr><td>New 0.5% AGI floor?</td><td>No — doesn't apply</td><td>Yes, effective 2026</td></tr>
      <tr><td>Non-cash gifts eligible?</td><td>No — cash only</td><td>Yes</td></tr>
      <tr><td>Donor-advised funds eligible?</td><td>No</td><td>Yes (subject to normal limits)</td></tr>
      <tr><td>Carries forward if unused?</td><td>No</td><td>Yes, up to 5 years</td></tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Things This Calculator Doesn't Model</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Whether itemizing actually beats your standard deduction overall (compare your total Schedule A deductions — mortgage interest, SALT, etc. — to your standard deduction first)</li>
    <li>The separate 60%-of-AGI cap on cash gifts and 30%-of-AGI cap on appreciated property for itemizers (rare to hit unless you're giving a large share of your income)</li>
    <li>Qualified Charitable Distributions (QCDs) from an IRA, which have their own rules — see the <a href="/calculators/rmd-calculator">RMD calculator</a></li>
  </ul>
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

<script src="/scripts/calculators/charitable-giving-deduction-calculator.js"></script>

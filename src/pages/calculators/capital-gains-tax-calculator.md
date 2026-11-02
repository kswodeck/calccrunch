---
layout: ../../layouts/CalculatorLayout.astro
calcType: capitalgainstax
title: Capital Gains Tax Calculator
description: Estimate your 2026 federal capital gains tax on stocks, crypto, or property sales — short-term and long-term rates, plus the 3.8% NIIT.
---

## How to Use This Calculator

1. **Enter your filing status and other taxable income** (everything except this gain — your AGI minus deductions)
2. **Enter the capital gain amount** and whether you held the asset for **one year or less (short-term)** or **more than one year (long-term)**
3. Click **Calculate** to see your estimated federal tax on the gain, including the 3.8% Net Investment Income Tax (NIIT) if it applies

<div class="calculator-form" id="capital-gains-tax-calculator-form">
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
          Other Taxable Income (excluding this gain) <span class="required">*</span>
          <span class="tooltip" title="Your taxable income from wages, self-employment, interest, etc. — after deductions — not counting the capital gain below. Not sure? Check the tax bracket calculator first.">?</span>
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
    <h3>Your Capital Gain</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gain-amount">
          Capital Gain Amount <span class="required">*</span>
          <span class="tooltip" title="Sale price minus your cost basis (what you paid, plus certain fees/improvements). Enter the net gain only — this calculator doesn't model losses.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="gain-amount"
            class="form-input"
            placeholder="20000"
            value="20000"
            min="0"
            step="100"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="holding-period">
          Holding Period <span class="required">*</span>
          <span class="tooltip" title="Short-term = held one year or less, taxed as ordinary income. Long-term = held more than one year, taxed at the lower 0%/15%/20% rates.">?</span>
        </label>
        <select id="holding-period" class="form-select" required>
          <option value="long" selected>Long-term (more than 1 year)</option>
          <option value="short">Short-term (1 year or less)</option>
        </select>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Capital Gains Tax →
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

<div id="capital-gains-tax-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📈 2026 Long-Term Capital Gains Rates</h4>
  <p>
    Long-term gains (assets held <strong>more than one year</strong>) are taxed at <strong>0%, 15%, or 20%</strong>
    depending on your total taxable income, stacked on top of your other income. <strong>Short-term gains</strong>
    (held one year or less) are taxed as ordinary income at your regular marginal rate — up to 37%. High earners
    may also owe the <strong>3.8% Net Investment Income Tax (NIIT)</strong> on top of either rate.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 2026 Long-Term Rate Thresholds (Taxable Income)</h4>
  <table class="profit-table" style="width: 100%;">
    <thead><tr><th>Filing Status</th><th>0% Rate Up To</th><th>15% Rate Up To</th><th>20% Rate Above</th></tr></thead>
    <tbody>
      <tr><td>Single</td><td>$49,450</td><td>$545,500</td><td>$545,500</td></tr>
      <tr><td>Married Filing Jointly</td><td>$98,900</td><td>$613,700</td><td>$613,700</td></tr>
      <tr><td>Married Filing Separately</td><td>$49,450</td><td>$306,850</td><td>$306,850</td></tr>
      <tr><td>Head of Household</td><td>$66,200</td><td>$579,600</td><td>$579,600</td></tr>
    </tbody>
  </table>
  <p style="margin-top: 0.5rem; font-size: 0.875rem;">
    NIIT (3.8%) applies to investment income once MAGI exceeds $200,000 (single/HOH), $250,000 (MFJ), or $125,000 (MFS).
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Things This Calculator Doesn't Model</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>State capital gains taxes (most states tax gains as ordinary income — check your state's rules separately)</li>
    <li>The 28% rate on collectibles (art, coins, precious metals) or the 25% unrecaptured Section 1250 gain rate on real estate depreciation</li>
    <li>The home sale exclusion ($250,000 single / $500,000 married) for a primary residence</li>
    <li>NIIT is estimated using this gain as your only investment income — if you have other investment income (interest, dividends, rental income), your actual NIIT may be higher. See a tax professional for your full picture</li>
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

<script src="/scripts/calculators/capital-gains-tax-calculator.js"></script>

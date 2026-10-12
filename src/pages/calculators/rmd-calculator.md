---
layout: ../../layouts/CalculatorLayout.astro
calcType: rmd
title: RMD Calculator
description: Calculate your 2026 or 2027 Required Minimum Distribution (RMD) from your IRA or 401(k) using the IRS Uniform Lifetime Table.
---

## How to Use This Calculator

1. **Enter your birth year** - determines the age your RMDs must start
2. **Choose your account type** - Traditional accounts require RMDs; most Roth accounts don't
3. **Enter your account balance** as of December 31 of last year
4. **Pick the year** you're calculating the RMD for (2026 or 2027)
5. Click **Calculate RMD** to see your required withdrawal, deadline, and percentage of balance

<div class="calculator-form" id="rmd-calculator-form">
  <div class="form-section">
    <h3>Your Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="birth-year">
          Birth Year <span class="required">*</span>
          <span class="tooltip" title="Used to determine the age your RMDs are required to start">?</span>
        </label>
        <input
          type="number"
          id="birth-year"
          class="form-input"
          placeholder="1952"
          value="1952"
          min="1920"
          max="2010"
          step="1"
          required
        />
        <small class="form-help">The year you were born</small>
      </div>
      <div class="form-group">
        <label for="calc-year">
          Calculating RMD For <span class="required">*</span>
        </label>
        <select id="calc-year" class="form-select" required>
          <option value="2026" selected>2026</option>
          <option value="2027">2027</option>
        </select>
        <small class="form-help">The distribution year</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Account Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="account-type">
          Account Type <span class="required">*</span>
        </label>
        <select id="account-type" class="form-select" required>
          <option value="traditional" selected>Traditional IRA / 401(k) / 403(b)</option>
          <option value="roth-employer">Roth 401(k) / Roth 403(b)</option>
          <option value="roth-ira">Roth IRA</option>
        </select>
        <small class="form-help" id="account-type-help">Pre-tax accounts require RMDs; most Roth accounts don't</small>
      </div>
      <div class="form-group">
        <label for="account-balance">
          Account Balance (Dec 31 prior year) <span class="required">*</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="account-balance"
            class="form-input"
            placeholder="500000"
            value="500000"
            min="0"
            step="1000"
            required
          />
        </div>
        <small class="form-help">Balance on Dec 31 of the year before the one you selected above</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="checkbox-label" for="spouse-exception">
          <input type="checkbox" id="spouse-exception" />
          My sole beneficiary is my spouse and they are more than 10 years younger than me
        </label>
        <small class="form-help">This uses the IRS Joint Life Table (a smaller RMD) instead of the Uniform Lifetime Table — see note below</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate RMD →
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

<div id="rmd-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📋 What Is an RMD?</h4>
  <p>
    A Required Minimum Distribution (RMD) is the minimum amount the IRS requires you to withdraw each year
    from tax-deferred retirement accounts once you reach a certain age. Your RMD is calculated by dividing
    your account balance on December 31 of the prior year by a life-expectancy "distribution period" from the
    IRS <strong>Uniform Lifetime Table</strong> (IRS Publication 590-B, Appendix B, Table III). The table has been
    unchanged since 2022, so the same divisors apply in 2026 and 2027.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Uniform Lifetime Table (Select Ages)</h4>
  <table class="profit-table" style="width: 100%;">
    <thead><tr><th>Age</th><th>Divisor</th><th>% of Balance</th></tr></thead>
    <tbody>
      <tr><td>73</td><td>26.5</td><td>3.77%</td></tr>
      <tr><td>75</td><td>24.6</td><td>4.07%</td></tr>
      <tr><td>80</td><td>20.2</td><td>4.95%</td></tr>
      <tr><td>85</td><td>16.0</td><td>6.25%</td></tr>
      <tr><td>90</td><td>12.2</td><td>8.20%</td></tr>
      <tr><td>95</td><td>8.9</td><td>11.24%</td></tr>
      <tr><td>100</td><td>6.4</td><td>15.63%</td></tr>
    </tbody>
  </table>
  <p style="margin-top: 10px; font-size: 0.9rem;">Full table runs from age 72 (27.4) down to age 120+ (2.0).</p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Key Rules to Know</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start age:</strong> 73 if born 1951-1959; 75 if born 1960 or later (SECURE 2.0 Act)</li>
    <li><strong>Deadline:</strong> December 31 each year — except your very first RMD, which you can delay until April 1 of the following year (but then you'd take two RMDs in that tax year)</li>
    <li><strong>Penalty for missing it:</strong> 25% excise tax on the shortfall, reduced to 10% if corrected within two years (IRC §4974)</li>
    <li><strong>Multiple IRAs:</strong> calculate each one's RMD separately, then withdraw the total from any one or combination of your IRAs</li>
    <li><strong>401(k)/403(b) plans:</strong> must be calculated and withdrawn separately for each plan — they cannot be aggregated with each other or with IRAs</li>
    <li><strong>Roth 401(k)/403(b):</strong> no longer require RMDs during your lifetime, matching Roth IRA rules (effective 2024)</li>
    <li><strong>Qualified Charitable Distribution (QCD):</strong> donating directly from an IRA to charity (up to $111,000 in 2026) counts toward your RMD but isn't included in your taxable income</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>💍 Spousal Exception (Joint Life Table)</h4>
  <p>
    If your spouse is your sole primary beneficiary and more than 10 years younger than you, the IRS lets you
    use the <strong>Joint Life and Last Survivor Expectancy Table</strong> instead, which produces a larger divisor
    (and therefore a smaller RMD). That table depends on both spouses' ages, so this calculator flags when it
    applies but doesn't compute it directly — check IRS Publication 590-B, Appendix B, Table II, or talk to a tax
    advisor for the exact figure.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your
    calculation, or use the <strong>Share button</strong> to send it to a spouse or financial advisor.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-weight: 500;
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"] {
    margin-top: 0.2rem;
    flex-shrink: 0;
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

<script src="/scripts/calculators/rmd-calculator.js"></script>

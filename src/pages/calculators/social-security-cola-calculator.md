---
layout: ../../layouts/CalculatorLayout.astro
calcType: socialsecuritycola
title: Social Security COLA Calculator
description: Calculate your new Social Security benefit after the 2027 cost-of-living adjustment (COLA). Enter your current check and see your raise instantly.
---

## How to Use This Calculator

1. **Enter your current monthly benefit** - the amount on your most recent Social Security statement or deposit
2. **Pick the COLA year** - 2027's official 3.6% increase is selected by default
3. Optionally **enter an expected Medicare Part B premium increase** to see your net raise, not just the gross one
4. Click **Calculate** to see your new monthly and annual benefit

<div class="calculator-form" id="social-security-cola-calculator-form">
  <div class="form-section">
    <h3>Your Current Benefit</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-benefit">
          Current Monthly Benefit <span class="required">*</span>
          <span class="tooltip" title="The gross monthly amount before any COLA increase is applied">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="current-benefit"
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="1"
            required
          />
        </div>
        <small class="form-help">Your gross benefit before any deductions, from your SSA statement or bank deposit</small>
      </div>
      <div class="form-group">
        <label for="benefit-type">
          Benefit Type <span class="required">*</span>
        </label>
        <select id="benefit-type" class="form-select" required>
          <option value="retirement" selected>Retirement, Survivors, or Disability (SSDI)</option>
          <option value="ssi">SSI (Supplemental Security Income)</option>
        </select>
        <small class="form-help" id="benefit-type-help">Affects when the increase actually arrives</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>COLA Year</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="cola-year">
          Apply Which COLA? <span class="required">*</span>
        </label>
        <select id="cola-year" class="form-select" required>
          <option value="2027" selected>2027 — 3.6% (official)</option>
          <option value="2026">2026 — 2.8% (official)</option>
          <option value="2025">2025 — 2.5% (official)</option>
          <option value="2024">2024 — 3.2% (official)</option>
          <option value="custom">Custom percentage</option>
        </select>
        <small class="form-help">The 2027 COLA was officially announced by the SSA on October 14, 2026</small>
      </div>
      <div class="form-group" id="custom-cola-group" style="display: none;">
        <label for="custom-cola">
          Custom COLA % <span class="required">*</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="custom-cola"
            class="form-input"
            placeholder="3.6"
            value="3.6"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Optional: Net Raise After Medicare</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="part-b-increase">
          Expected Part B Premium Increase (optional)
          <span class="tooltip" title="For most retirees, Medicare Part B is deducted directly from your check. If you know your premium is rising, enter the monthly dollar increase here to see your real net raise.">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input
            type="number"
            id="part-b-increase"
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="0.01"
          />
        </div>
        <small class="form-help">2027 Part B premiums aren't finalized until November — leave at $0 if unknown</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My New Benefit →
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

<div id="social-security-cola-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📈 The 2027 COLA: 3.6%</h4>
  <p>
    On October 14, 2026, the Social Security Administration officially announced a <strong>3.6% cost-of-living
    adjustment (COLA) for 2027</strong> — the largest increase since 2023, up from 2.8% in 2026. The COLA is
    calculated by comparing the average Consumer Price Index for Urban Wage Earners and Clerical Workers (CPI-W)
    for July, August, and September of the current year against the same three months of the prior year.
    The simple formula: <strong>new benefit = current benefit × 1.036</strong>.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Recent COLA History</h4>
  <table class="profit-table" style="width: 100%;">
    <thead><tr><th>Year</th><th>COLA</th></tr></thead>
    <tbody>
      <tr><td>2023</td><td>8.7%</td></tr>
      <tr><td>2024</td><td>3.2%</td></tr>
      <tr><td>2025</td><td>2.5%</td></tr>
      <tr><td>2026</td><td>2.8%</td></tr>
      <tr><td><strong>2027</strong></td><td><strong>3.6%</strong></td></tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ When You'll Actually See the Increase</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Retirement, survivors, and disability (SSDI) benefits:</strong> the new amount starts with your <strong>January 2027</strong> payment</li>
    <li><strong>SSI payments:</strong> the increase arrives earlier, in your <strong>December 31, 2026</strong> payment</li>
    <li><strong>Your personal notice:</strong> the SSA mails COLA notices in early December, or you can view yours online by creating a "my Social Security" account by November 18, 2026</li>
    <li><strong>Medicare Part B:</strong> for most retirees, the Part B premium is deducted straight from your check before you ever see it — if that premium rises for 2027, it will offset some of your raise (CMS typically finalizes the new premium in November)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your
    calculation, or use the <strong>Share button</strong> to send it to a family member.
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

<script src="/scripts/calculators/social-security-cola-calculator.js"></script>

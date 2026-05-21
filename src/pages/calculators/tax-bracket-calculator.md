---
layout: ../../layouts/CalculatorLayout.astro
calcType: tax-bracket
---

## How to Use This Calculator

1. Select your **filing status** (Single, Married Filing Jointly, etc.)
2. Enter your **gross income** (total earnings before deductions)
3. Add any **above-the-line deductions** (401k, IRA, HSA contributions)
4. Choose **standard or itemized deductions**
5. Click **Calculate** to see your tax breakdown by bracket

<div class="calculator-form" id="tax-bracket-calculator-form">
  <div class="form-section">
    <h3>Filing Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="filing-status">
          Filing Status <span class="required">*</span>
        </label>
        <select id="filing-status" class="form-select" required>
          <option value="single">Single</option>
          <option value="mfj">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
          <option value="hoh">Head of Household</option>
        </select>
      </div>
      <div class="form-group">
        <label for="gross-income">
          Gross Income <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gross-income" 
            class="form-input"
            placeholder="85000"
            value="85000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Total income before any deductions</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Above-the-Line Deductions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="deduction-401k">401(k) Contributions</label>
        <div class="input-group">
          <input type="number" id="deduction-401k" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="deduction-ira">Traditional IRA</label>
        <div class="input-group">
          <input type="number" id="deduction-ira" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="deduction-hsa">HSA Contributions</label>
        <div class="input-group">
          <input type="number" id="deduction-hsa" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="deduction-student">Student Loan Interest</label>
        <div class="input-group">
          <input type="number" id="deduction-student" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Deduction Method</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="deduction-type">Deduction Type</label>
        <select id="deduction-type" class="form-select">
          <option value="standard">Standard Deduction</option>
          <option value="itemized">Itemized Deductions</option>
        </select>
      </div>
      <div class="form-group" id="itemized-amount-group" style="display:none;">
        <label for="itemized-amount">Itemized Deduction Amount</label>
        <div class="input-group">
          <input type="number" id="itemized-amount" class="form-input" placeholder="20000" value="20000" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Taxes →
  </button>

  <div class="form-actions">
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

<div id="tax-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📋 Understanding Tax Brackets (2026)</h4>
  <p>
    The US uses a <strong>progressive tax system</strong> — you don't pay your marginal rate on ALL your income. 
    Each bracket only applies to income within that range. Your <strong>effective rate</strong> (total tax / total income) 
    is always lower than your marginal bracket.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>💡 Marginal vs Effective Tax Rate</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Marginal Rate:</strong> The tax rate on your last dollar of income (your highest bracket)</li>
    <li><strong>Effective Rate:</strong> Your actual average tax rate (total tax ÷ total income)</li>
    <li>Example: $100k income (single) has a 22% marginal rate but ~17% effective rate</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🎯 Tax-Saving Strategies</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Max 401(k):</strong> Up to $23,500 in 2026 ($31,000 if 50+)</li>
    <li><strong>HSA contributions:</strong> Up to $4,300 individual / $8,550 family</li>
    <li><strong>Traditional IRA:</strong> Up to $7,000 ($8,000 if 50+)</li>
    <li><strong>Student loan interest:</strong> Up to $2,500 deductible</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/tax-bracket-calculator.js"></script>

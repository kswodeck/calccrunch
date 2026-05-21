---
layout: ../../layouts/CalculatorLayout.astro
calcType: paycheck
---

## How to Use This Calculator

1. Enter your **gross salary or pay amount**
2. Select your **pay frequency** (weekly, bi-weekly, monthly, etc.)
3. Choose your **filing status** and **state**
4. Add any **pre-tax deductions** (401k, health insurance, HSA)
5. Click **Calculate** to see your take-home pay breakdown

<div class="calculator-form" id="paycheck-calculator-form">
  <div class="form-section">
    <h3>Pay Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gross-pay">
          Gross Pay Amount <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gross-pay" 
            class="form-input"
            placeholder="75000"
            value="75000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="pay-frequency">
          Pay Frequency <span class="required">*</span>
        </label>
        <select id="pay-frequency" class="form-select" required>
          <option value="52">Weekly</option>
          <option value="26">Bi-Weekly</option>
          <option value="24">Semi-Monthly</option>
          <option value="12">Monthly</option>
          <option value="1" selected>Annually</option>
        </select>
        <small class="form-help">How often you receive a paycheck</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Tax Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="filing-status">Filing Status</label>
        <select id="filing-status" class="form-select">
          <option value="single">Single</option>
          <option value="mfj">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
          <option value="hoh">Head of Household</option>
        </select>
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <select id="state" class="form-select">
          <option value="0">No State Tax (AK, FL, NV, NH, SD, TN, TX, WA, WY)</option>
          <option value="3">Low Tax State (~3%)</option>
          <option value="5" selected>Average Tax State (~5%)</option>
          <option value="7">Higher Tax State (~7%)</option>
          <option value="10">High Tax State (~10% - CA, NY, NJ)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Pre-Tax Deductions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="deduction-401k">401(k) Contribution</label>
        <div class="input-group">
          <input type="number" id="deduction-401k" class="form-input" placeholder="6" value="6" min="0" max="100" step="0.5" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Percentage of gross pay</small>
      </div>
      <div class="form-group">
        <label for="health-insurance">Health Insurance (Annual)</label>
        <div class="input-group">
          <input type="number" id="health-insurance" class="form-input" placeholder="3000" value="3000" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="hsa-contribution">HSA Contribution (Annual)</label>
        <div class="input-group">
          <input type="number" id="hsa-contribution" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="other-pretax">Other Pre-Tax (Annual)</label>
        <div class="input-group">
          <input type="number" id="other-pretax" class="form-input" placeholder="0" value="0" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Take-Home Pay →
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

<div id="paycheck-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>💰 Understanding Your Paycheck</h4>
  <p>
    Your take-home pay is your gross income minus federal taxes, state taxes, FICA (Social Security + Medicare), 
    and pre-tax deductions. Understanding where every dollar goes helps you plan and budget effectively.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📋 FICA Taxes (2026)</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Social Security:</strong> 6.2% on income up to $176,100</li>
    <li><strong>Medicare:</strong> 1.45% on all income + 0.9% additional on income over $200,000</li>
    <li><strong>Total FICA:</strong> 7.65% for most workers</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/paycheck-calculator.js"></script>

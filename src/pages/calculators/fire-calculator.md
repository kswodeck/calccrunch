---
layout: ../../layouts/CalculatorLayout.astro
calcType: fire
---

## How to Use This Calculator

1. Enter your **current age** and **target retirement age**
2. Input your **current savings** and **annual income/expenses**
3. Set your **expected return rate** and **savings rate**
4. Click **Calculate** to see your path to financial independence
5. Explore **"what if" scenarios** to optimize your plan

<div class="calculator-form" id="fire-calculator-form">
  <div class="form-section">
    <h3>Personal Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-age">Current Age <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="current-age" class="form-input" placeholder="30" value="30" min="18" max="80" required />
          <span class="input-addon">years</span>
        </div>
      </div>
      <div class="form-group">
        <label for="target-age">Target Retirement Age</label>
        <div class="input-group">
          <input type="number" id="target-age" class="form-input" placeholder="45" value="45" min="25" max="90" />
          <span class="input-addon">years</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Financial Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-savings">Current Savings/Investments <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="current-savings" class="form-input" placeholder="50000" value="50000" min="0" step="1000" required />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="annual-income">Annual Income <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="annual-income" class="form-input" placeholder="80000" value="80000" min="0" step="1000" required />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-expenses">Annual Expenses <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="annual-expenses" class="form-input" placeholder="50000" value="50000" min="0" step="1000" required />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your expected annual spending in retirement</small>
      </div>
      <div class="form-group">
        <label for="monthly-savings">Monthly Savings/Investment</label>
        <div class="input-group">
          <input type="number" id="monthly-savings" class="form-input" placeholder="2500" value="2500" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Assumptions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="return-rate">Expected Investment Return</label>
        <div class="input-group">
          <input type="number" id="return-rate" class="form-input" placeholder="7" value="7" min="0" max="20" step="0.5" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="inflation-rate">Expected Inflation</label>
        <div class="input-group">
          <input type="number" id="inflation-rate" class="form-input" placeholder="3" value="3" min="0" max="10" step="0.5" />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="withdrawal-rate">Safe Withdrawal Rate</label>
        <div class="input-group">
          <input type="number" id="withdrawal-rate" class="form-input" placeholder="4" value="4" min="2" max="6" step="0.25" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">4% is the traditional rule of thumb</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate FIRE Plan →
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

<div id="fire-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🔥 What is FIRE?</h4>
  <p>
    <strong>FIRE (Financial Independence, Retire Early)</strong> is a movement focused on aggressive saving and investing 
    to accumulate enough wealth to retire much earlier than traditional age 65. The core idea: once your 
    investment portfolio can cover your annual expenses indefinitely, you've achieved financial independence.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Types of FIRE</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Lean FIRE:</strong> Annual expenses under $40,000 — minimalist lifestyle</li>
    <li><strong>Regular FIRE:</strong> Annual expenses $40,000 - $100,000 — comfortable middle-class</li>
    <li><strong>Fat FIRE:</strong> Annual expenses over $100,000 — luxurious early retirement</li>
    <li><strong>Coast FIRE:</strong> Enough saved that compound growth alone reaches your goal by traditional retirement</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📐 The 4% Rule</h4>
  <p>
    The <strong>4% rule</strong> (Trinity Study) suggests you can withdraw 4% of your portfolio in year one of retirement, 
    adjusting for inflation each year, with a high probability your money lasts 30+ years. 
    Your <strong>FIRE number = Annual Expenses ÷ 0.04</strong> (or 25× your annual expenses).
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/fire-calculator.js"></script>

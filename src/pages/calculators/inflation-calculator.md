---
layout: ../../layouts/CalculatorLayout.astro
calcType: inflation
---

## How to Use This Calculator

1. Choose a mode: **Historical** (past inflation data) or **Projection** (future estimate)
2. Enter an **amount** to adjust for inflation
3. For Historical: select **start year** and **end year**
4. For Projection: enter an **inflation rate** and **years to project**
5. Click **Calculate** to see how purchasing power changes

<div class="calculator-form" id="inflation-calculator-form">
  <div class="form-section">
    <h3>Mode</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-mode="historical">Historical (CPI Data)</button>
      <button type="button" class="unit-btn" data-mode="projection">Future Projection</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Amount</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="amount">
          Dollar Amount <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="amount" 
            class="form-input"
            placeholder="100"
            value="100"
            min="0"
            step="1"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section" id="historical-inputs">
    <h3>Time Period</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="start-year">Start Year <span class="required">*</span></label>
        <select id="start-year" class="form-select" required></select>
      </div>
      <div class="form-group">
        <label for="end-year">End Year <span class="required">*</span></label>
        <select id="end-year" class="form-select" required></select>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="projection-inputs">
    <h3>Projection Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="inflation-rate">
          Annual Inflation Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="inflation-rate" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="50"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="projection-years">
          Years to Project <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="projection-years" 
            class="form-input"
            placeholder="10"
            value="10"
            min="1"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Inflation Impact →
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

<div id="inflation-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📈 What is Inflation?</h4>
  <p>
    <strong>Inflation</strong> is the rate at which the general level of prices for goods and services rises, 
    eroding purchasing power. The CPI (Consumer Price Index) measures this by tracking price changes 
    for a basket of common goods and services over time.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 US Inflation History</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Average (1960-2026):</strong> ~3.7% per year</li>
    <li><strong>Recent (2010-2019):</strong> ~1.8% per year</li>
    <li><strong>Post-pandemic (2021-2023):</strong> ~6.5% per year</li>
    <li><strong>Fed target:</strong> 2% annual inflation</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/inflation-calculator.js"></script>

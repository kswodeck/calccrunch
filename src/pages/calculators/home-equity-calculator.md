---
layout: ../../layouts/CalculatorLayout.astro
title: Home Equity Calculator
description: Calculate your home equity based on current home value, remaining mortgage balance, and appreciation over time. Estimate borrowing power for HELOC or home equity loan.
category: home-real-estate
tags: ['home equity', 'HELOC', 'home value', 'mortgage balance']
featured: false
calcType: home-equity
seoTitle: Free Home Equity Calculator - HELOC & Equity Loan Calculator
seoDescription: Calculate your home equity and borrowing power for HELOC or home equity loans with our free calculator.
estimatedTime: 2 minutes
difficulty: Easy
---

## How to Use This Calculator

1. Enter your **current home value** (estimated market value)
2. Add your **remaining mortgage balance** (principal owed)
3. Input your **mortgage details** (rate, payment, years remaining)
4. Set **appreciation rate** for future projections
5. Add any **additional liens** (HELOC, 2nd mortgage, etc.)
6. Click **Calculate Equity** to see your home equity analysis

<div class="calculator-form" id="equity-calculator-form">
  <div class="form-section">
    <h3>🏠 Property Value</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="home-value">
          Current Home Value <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-value" 
            class="form-input"
            placeholder="450000"
            value="450000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Estimated current market value</small>
      </div>
      <div class="form-group">
        <label for="purchase-price">
          Original Purchase Price
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="purchase-price" 
            class="form-input"
            placeholder="350000"
            value="350000"
            min="0"
            step="1000"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">What you paid for the home</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="purchase-date">
          Purchase Date
        </label>
        <input 
          type="month" 
          id="purchase-date" 
          class="form-input"
          value="2020-01"
        />
        <small class="form-help">When you bought the home</small>
      </div>
      <div class="form-group">
        <label for="appreciation-rate">
          Annual Appreciation Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="appreciation-rate" 
            class="form-input"
            placeholder="3"
            value="3"
            min="-10"
            max="20"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected yearly value increase</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>💳 Primary Mortgage</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="mortgage-balance">
          Remaining Mortgage Balance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="mortgage-balance" 
            class="form-input"
            placeholder="280000"
            value="280000"
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Current principal balance owed</small>
      </div>
      <div class="form-group">
        <label for="monthly-payment">
          Monthly P&I Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-payment" 
            class="form-input"
            placeholder="1800"
            value="1800"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Principal & interest only</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="interest-rate">
          Mortgage Interest Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
            max="20"
            step="0.125"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Current annual interest rate</small>
      </div>
      <div class="form-group">
        <label for="years-remaining">
          Years Remaining
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="years-remaining" 
            class="form-input"
            placeholder="25"
            value="25"
            min="0"
            max="40"
            step="1"
          />
          <span class="input-addon">yrs</span>
        </div>
        <small class="form-help">Years left on mortgage</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🔗 Additional Liens (Optional)</h3>
    <p class="section-description">Include any additional loans secured by your home such as HELOC, second mortgage, or home equity loans.</p>
    <div class="form-row">
      <div class="form-group">
        <label for="heloc-balance">
          HELOC Balance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="heloc-balance" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Current HELOC balance</small>
      </div>
      <div class="form-group">
        <label for="other-liens">
          Other Liens/Loans
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="other-liens" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Second mortgage, judgments, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🎯 Borrowing Preferences</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="max-ltv">
          Maximum LTV for Borrowing
        </label>
        <div class="slider-group">
          <input 
            type="range" 
            id="max-ltv-slider"
            min="70"
            max="95"
            value="80"
            step="5"
            class="form-slider"
          />
          <div class="input-group slider-input">
            <input 
              type="number" 
              id="max-ltv" 
              class="form-input"
              min="70"
              max="95"
              value="80"
              step="5"
            />
            <span class="input-addon">%</span>
          </div>
        </div>
        <small class="form-help">Most lenders allow 80-90% LTV for equity borrowing</small>
      </div>
      <div class="form-group">
        <label for="heloc-rate">
          Estimated HELOC Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="heloc-rate" 
            class="form-input"
            placeholder="8.5"
            value="8.5"
            min="0"
            max="25"
            step="0.125"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">For borrowing cost estimates</small>
      </div>
    </div>
  </div>

  <div class="equity-preview">
    <div class="preview-grid">
      <div class="preview-item value-preview">
        <div class="preview-label">Home Value</div>
        <div class="preview-value" id="preview-value">$0</div>
      </div>
      <div class="preview-item debt-preview">
        <div class="preview-label">Total Debt</div>
        <div class="preview-value" id="preview-debt">$0</div>
      </div>
      <div class="preview-item equity-preview-item">
        <div class="preview-label">Home Equity</div>
        <div class="preview-value" id="preview-equity">$0</div>
      </div>
      <div class="preview-item ltv-preview">
        <div class="preview-label">LTV Ratio</div>
        <div class="preview-value" id="preview-ltv">0%</div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Equity →
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

<div id="equity-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🏦 Understanding Home Equity</h4>
  <p>
    <strong>Home equity</strong> is the difference between your home's market value and what you owe on it. 
    It represents your ownership stake in the property and can be a powerful financial tool when used wisely.
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Equity = Home Value - Total Liens</strong></li>
    <li><strong>LTV (Loan-to-Value) = Total Liens ÷ Home Value × 100</strong></li>
  </ul>
</div>

<div class="info-box" style="background: #E8F5E9; border-left-color: #4CAF50;">
  <h4>💰 Ways to Build Equity</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Pay down mortgage:</strong> Each payment reduces principal and builds equity</li>
    <li><strong>Home appreciation:</strong> Market value increases over time</li>
    <li><strong>Home improvements:</strong> Strategic renovations can boost value</li>
    <li><strong>Extra payments:</strong> Additional principal payments accelerate equity building</li>
    <li><strong>Shorter loan term:</strong> 15-year mortgages build equity faster than 30-year</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🔑 HELOC vs. Home Equity Loan</h4>
  <p><strong>HELOC (Home Equity Line of Credit):</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Revolving credit line - borrow as needed</li>
    <li>Variable interest rate (typically)</li>
    <li>Draw period (usually 10 years) + repayment period</li>
    <li>Best for: Ongoing expenses, flexibility needed</li>
  </ul>
  <p style="margin-top: 10px;"><strong>Home Equity Loan:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Lump sum disbursement</li>
    <li>Fixed interest rate and payment</li>
    <li>Set repayment term (5-30 years)</li>
    <li>Best for: One-time expenses, predictable payments</li>
  </ul>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Your home is collateral:</strong> Failure to repay can result in foreclosure</li>
    <li><strong>Closing costs:</strong> Expect 2-5% in fees for equity loans</li>
    <li><strong>Market fluctuations:</strong> Home values can decrease, reducing equity</li>
    <li><strong>Tax implications:</strong> Interest may be deductible for home improvements only</li>
    <li><strong>Future flexibility:</strong> High LTV limits refinancing options</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your equity calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to track your equity over time, 
    or use the <strong>Share button</strong> to send it to a financial advisor. All values will be restored automatically when you return.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .section-description {
    color: var(--color-gray-dark);
    font-size: var(--text-sm);
    margin-bottom: var(--space-lg);
    opacity: 0.8;
  }

  .slider-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .form-slider {
    flex: 1;
    height: 8px;
    background: var(--color-gray);
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
  }

  .form-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: var(--color-accent-orange);
    border-radius: 50%;
    cursor: pointer;
  }

  .slider-input {
    width: 100px;
  }

  .equity-preview {
    padding: var(--space-xl);
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    border: 2px solid #4CAF50;
    margin-top: var(--space-lg);
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
    text-align: center;
  }

  .preview-item {
    padding: var(--space-md);
    border-radius: var(--border-radius);
    background: white;
  }

  .preview-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .preview-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
  }

  .value-preview .preview-value {
    color: var(--color-primary-blue);
  }

  .debt-preview .preview-value {
    color: #F44336;
  }

  .equity-preview-item .preview-value {
    color: #4CAF50;
  }

  .ltv-preview .preview-value {
    color: var(--color-primary-blue);
  }

  .ltv-preview .preview-value.low {
    color: #4CAF50;
  }

  .ltv-preview .preview-value.medium {
    color: #FF9800;
  }

  .ltv-preview .preview-value.high {
    color: #F44336;
  }

  /* Results Styles */
  .equity-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
    border: 2px solid #4CAF50;
  }

  .equity-label {
    font-size: var(--text-lg);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-sm);
  }

  .equity-value {
    font-size: 4rem;
    font-weight: 800;
    font-family: var(--font-primary);
    color: #4CAF50;
    margin-bottom: var(--space-sm);
  }

  .equity-percent {
    font-size: var(--text-xl);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-md);
  }

  .equity-status {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 20px;
    font-weight: 600;
    font-size: var(--text-base);
    background: #E8F5E9;
    color: #2E7D32;
  }

  /* Summary Cards */
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }

  .summary-card {
    background: var(--color-white);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    text-align: center;
    border: 2px solid var(--color-gray);
  }

  .summary-card-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
  }

  .summary-card-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
    color: var(--color-primary-blue);
    margin-bottom: var(--space-xs);
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .summary-card-note {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    opacity: 0.8;
    margin-top: var(--space-xs);
  }

  /* LTV Meter */
  .ltv-analysis {
    background: white;
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 1px solid var(--color-gray);
  }

  .ltv-analysis h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .ltv-meter-container {
    margin: var(--space-xl) 0;
  }

  .ltv-meter {
    position: relative;
    height: 50px;
    background: linear-gradient(90deg, #4CAF50 0%, #4CAF50 60%, #FF9800 60%, #FF9800 80%, #F44336 80%, #F44336 100%);
    border-radius: 25px;
    overflow: visible;
  }

  .ltv-marker {
    position: absolute;
    top: -8px;
    transform: translateX(-50%);
    width: 4px;
    height: 66px;
    background: var(--color-primary-blue);
    border-radius: 2px;
  }

  .ltv-marker::after {
    content: attr(data-value);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-primary-blue);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: var(--text-sm);
    font-weight: 700;
    white-space: nowrap;
  }

  .ltv-labels {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-md);
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .ltv-zone-labels {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-xs);
  }

  .ltv-zone {
    text-align: center;
    font-size: var(--text-xs);
    font-weight: 600;
  }

  .ltv-zone.safe { color: #4CAF50; flex: 0.6; }
  .ltv-zone.moderate { color: #FF9800; flex: 0.2; }
  .ltv-zone.risky { color: #F44336; flex: 0.2; }

  /* Borrowing Power */
  .borrowing-section {
    background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%);
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 2px solid #2196F3;
  }

  .borrowing-section h4 {
    color: #1565C0;
    margin-bottom: var(--space-lg);
  }

  .borrowing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
  }

  .borrowing-card {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    text-align: center;
  }

  .borrowing-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-sm);
  }

  .borrowing-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .borrowing-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
    color: #1565C0;
  }

  .borrowing-note {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    margin-top: var(--space-sm);
    opacity: 0.8;
  }

  /* Equity Growth Chart */
  .growth-section {
    background: white;
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 1px solid var(--color-gray);
  }

  .growth-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .growth-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 300px;
    padding: var(--space-xl) var(--space-md) var(--space-md);
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
    gap: var(--space-sm);
    position: relative;
  }

  .growth-chart::before {
    content: '';
    position: absolute;
    left: var(--space-md);
    right: var(--space-md);
    top: var(--space-xl);
    bottom: 40px;
    border-left: 2px dashed var(--color-gray);
    border-bottom: 2px dashed var(--color-gray);
  }

  .chart-bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 120px;
    z-index: 1;
    max-height: 100%;
  }

  .chart-bars {
    display: flex;
    gap: 4px;
    align-items: flex-end;
    margin-bottom: var(--space-sm);
  }

  .chart-bar {
    width: 30px;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
    position: relative;
  }

  .chart-bar.value-bar {
    background: linear-gradient(180deg, #2196F3, #1565C0);
  }

  .chart-bar.equity-bar {
    background: linear-gradient(180deg, #4CAF50, #2E7D32);
  }

  .chart-bar.debt-bar {
    background: linear-gradient(180deg, #FF9800, #E65100);
  }

  .chart-bar-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-gray-dark);
  }

  .chart-bar-value {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    text-align: center;
    margin-top: var(--space-xs);
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    gap: var(--space-xl);
    margin-top: var(--space-lg);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--text-sm);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .legend-dot.value { background: linear-gradient(180deg, #2196F3, #1565C0); }
  .legend-dot.equity { background: linear-gradient(180deg, #4CAF50, #2E7D32); }
  .legend-dot.debt { background: linear-gradient(180deg, #FF9800, #E65100); }

  /* Projection Table */
  .projection-table-container {
    overflow-x: auto;
    margin-top: var(--space-lg);
  }

  .projection-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
  }

  .projection-table th,
  .projection-table td {
    padding: var(--space-md);
    text-align: right;
    border-bottom: 1px solid var(--color-gray);
  }

  .projection-table th:first-child,
  .projection-table td:first-child {
    text-align: left;
  }

  .projection-table th {
    background: var(--color-primary-blue);
    color: white;
    font-weight: 600;
  }

  .projection-table tr:hover {
    background: var(--color-lighter-blue);
  }

  .projection-table tr.current-row {
    background: #E8F5E9;
    font-weight: 600;
  }

  /* Appreciation Analysis */
  .appreciation-section {
    background: linear-gradient(135deg, #FFF3E0 0%, #fff 100%);
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 2px solid #FF9800;
  }

  .appreciation-section h4 {
    color: #E65100;
    margin-bottom: var(--space-lg);
  }

  .appreciation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-lg);
  }

  .appreciation-card {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    text-align: center;
  }

  .appreciation-period {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .appreciation-value {
    font-size: var(--text-xl);
    font-weight: 700;
    color: #E65100;
  }

  .appreciation-gain {
    font-size: var(--text-xs);
    color: #4CAF50;
    margin-top: var(--space-xs);
  }

  /* Insights Section */
  .insights-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .insights-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-md);
  }

  .insight-card {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-gray);
  }

  .insight-card.insight-success {
    background: #F1F8E9;
    border-color: #C5E1A5;
  }

  .insight-card.insight-warning {
    background: #FFF8E1;
    border-color: #FFE082;
  }

  .insight-card.insight-info {
    background: #E3F2FD;
    border-color: #90CAF9;
  }

  .insight-card.insight-danger {
    background: #FFEBEE;
    border-color: #EF9A9A;
  }

  .insight-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .insight-content h5 {
    margin: 0 0 var(--space-xs) 0;
    font-size: var(--text-base);
    color: var(--color-gray-dark);
  }

  .insight-content p {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }

    .equity-value {
      font-size: 2.5rem;
    }

    .preview-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .growth-chart {
      height: 250px;
    }

    .chart-bar {
      width: 20px;
    }

    .chart-legend {
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
    }

    .slider-group {
      flex-direction: column;
      align-items: stretch;
    }

    .slider-input {
      width: 100%;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/home-equity-calculator.js"></script>
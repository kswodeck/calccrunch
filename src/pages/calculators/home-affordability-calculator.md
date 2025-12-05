---
layout: ../../layouts/CalculatorLayout.astro
title: Home Affordability Calculator
description: Calculate how much house you can afford based on income, debts, down payment, and interest rates. See your maximum home price and comfortable monthly payment.
category: home-real-estate
tags: ['home affordability', 'buying power', 'mortgage', 'home price', 'debt to income']
featured: true
calcType: home-affordability
seoTitle: Free Home Affordability Calculator - How Much House Can I Afford?
seoDescription: Calculate how much house you can afford based on your income and debts. Get your maximum home price with our free calculator.
estimatedTime: 3 minutes
difficulty: Easy
---

## How to Use This Calculator

1. Enter your **annual gross income** (before taxes)
2. Add your **monthly debt payments** (car loans, credit cards, student loans)
3. Input your **down payment** amount or percentage
4. Enter the current **interest rate**
5. Select your preferred **loan term**
6. Add **property tax** and **insurance** costs
7. Adjust **DTI limits** if desired (standard is 28/36 rule)
8. Click **Calculate** to see how much house you can afford

<div class="calculator-form" id="affordability-calculator-form">
  <div class="form-section">
    <h3>Income & Debts</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-income">
          Annual Gross Income <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-income" 
            class="form-input"
            placeholder="75000"
            value="75000"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your total income before taxes</small>
      </div>
      <div class="form-group">
        <label for="monthly-debts">
          Monthly Debt Payments
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-debts" 
            class="form-input"
            placeholder="500"
            value="500"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Car loans, credit cards, student loans, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Loan Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="down-payment">
          Down Payment <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="down-payment" 
            class="form-input"
            placeholder="20000"
            value="20000"
            step="1"
            required
          />
          <span class="input-addon input-addon-toggle" id="down-payment-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="down-payment-help">Enter down payment amount (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="interest-rate">
          Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            step="0.05"
            required
          />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="loan-term">
          Loan Term <span class="required">*</span>
        </label>
        <select id="loan-term" class="form-select" required>
          <option value="15">15 years</option>
          <option value="20">20 years</option>
          <option value="25">25 years</option>
          <option value="30" selected>30 years</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Additional Costs</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="property-tax-rate">
          Property Tax
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="property-tax-rate" 
            class="form-input"
            placeholder="1.2"
            value="1.2"
            step="0.1"
          />
          <span class="input-addon input-addon-toggle" id="property-tax-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="property-tax-help">Enter property tax rate (click % to switch)</small>
      </div>
      <div class="form-group">
        <label for="home-insurance">
          Home Insurance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-insurance" 
            class="form-input"
            placeholder="1200"
            value="1200"
            step="0.1"
          />
          <span class="input-addon input-addon-toggle" id="insurance-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="insurance-help">Enter yearly insurance amount (click $ to switch)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="hoa-fees">
          HOA Fees (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="hoa-fees" 
            class="form-input"
            placeholder="0"
            value="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="pmi-rate">
          PMI Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pmi-rate" 
            class="form-input"
            placeholder="0.5"
            value="0.5"
            step="0.01"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help" id="pmi-help">Annual PMI rate (automatically disabled if down payment ≥ 20%)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Debt-to-Income (DTI) Limits</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="max-dti-housing">
          Maximum Housing DTI
        </label>
        <div class="slider-group">
          <input 
            type="range" 
            id="dti-housing-slider"
            min="10"
            max="80"
            value="28"
            step="1"
            class="form-slider"
          />
          <div class="input-group slider-input">
            <input 
              type="number" 
              id="max-dti-housing" 
              class="form-input"
              min="10"
              max="80"
              value="28"
              step="1"
            />
            <span class="input-addon">%</span>
          </div>
        </div>
        <small class="form-help">Standard is 28% of gross income for housing</small>
      </div>
      <div class="form-group">
        <label for="max-dti-total">
          Maximum Total DTI
        </label>
        <div class="slider-group">
          <input 
            type="range" 
            id="dti-total-slider"
            min="10"
            max="90"
            value="36"
            step="1"
            class="form-slider"
          />
          <div class="input-group slider-input">
            <input 
              type="number" 
              id="max-dti-total" 
              class="form-input"
              min="10"
              max="90"
              value="36"
              step="1"
            />
            <span class="input-addon">%</span>
          </div>
        </div>
        <small class="form-help">Standard is 36% of gross income for all debts</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Affordability →
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

<div id="affordability-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding Home Affordability</h4>
  <p>
    Lenders typically use the <strong>28/36 rule</strong> to determine affordability: 
    No more than <strong>28% of gross income</strong> for housing costs (principal, interest, taxes, insurance) 
    and no more than <strong>36% for total debt</strong> (including car loans, credit cards, etc.).
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🏠 Maximum vs. Comfortable Price</h4>
  <p>
    <strong>Maximum Price:</strong> The highest home price you qualify for based on lender limits. 
    <strong>Comfortable Price:</strong> A more conservative estimate (25% DTI) that leaves room for other expenses and savings.
    Many financial advisors recommend staying below your maximum to maintain financial flexibility.
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #D97706;">
  <h4>⚠️ Don't Forget These Costs</h4>
  <p>
    Remember to budget for additional homeownership costs not included in your mortgage payment:
    <strong>Maintenance (1-3% of home value annually)</strong>, <strong>Utilities</strong>, 
    <strong>Closing costs (2-5% of purchase price)</strong>, and <strong>Emergency repairs</strong>.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .btn-success {
    background: #10b981 !important;
    border-color: #10b981 !important;
  }
  
  .affordability-status {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .affordability-status.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .affordability-status.status-aggressive {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .affordability-status.status-stretched {
    background: #fef3c7;
    border-left-color: #f97316;
  }
  
  .affordability-status.status-risky {
    background: #fef2f2;
    border-left-color: #ef4444;
  }
  
  .result-card {
    text-align: center;
    position: relative;
  }
  
  .card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .result-detail {
    margin-top: 0.5rem;
  }
  
  .mini-breakdown {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .income-visualization {
    margin: 1.5rem 0;
  }
  
  .income-bar {
    display: flex;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .income-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .income-segment.housing {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .income-segment.debts {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .income-segment.remaining {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  .income-legend {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  
  .legend-color.housing {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .legend-color.debts {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .legend-color.remaining {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  .payment-bars {
    margin: 1rem 0;
  }
  
  .payment-bar-item {
    margin-bottom: 1rem;
  }
  
  .bar-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .bar-container {
    width: 100%;
    height: 32px;
    background: #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    transition: width 0.5s ease;
  }
  
  .bar-fill.principal {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  
  .bar-fill.tax {
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  }
  
  .bar-fill.insurance {
    background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .bar-fill.hoa {
    background: linear-gradient(90deg, #34d399 0%, #10b981 100%);
  }
  
  .bar-fill.pmi {
    background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
  }
  
  .payment-total {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 2px solid #d1d5db;
    font-size: 1.1rem;
  }
  
  .dti-analysis {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .dti-meters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .dti-meter {
    text-align: center;
  }
  
  .meter-container {
    position: relative;
    margin: 1rem 0;
  }
  
  .meter-bar {
    width: 100%;
    height: 40px;
    background: #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  
  .meter-fill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    transition: width 0.5s ease;
  }
  
  .meter-fill.safe {
    background: linear-gradient(90deg, #34d399 0%, #10b981 100%);
  }
  
  .meter-fill.caution {
    background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .meter-fill.danger {
    background: linear-gradient(90deg, #f87171 0%, #ef4444 100%);
  }
  
  .meter-value {
    color: white;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  .meter-markers {
    position: absolute;
    top: 45px;
    width: 100%;
    height: 20px;
  }
  
  .marker {
    position: absolute;
    font-size: 0.75rem;
    color: #6b7280;
    transform: translateX(-50%);
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .detail-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .detail-section h5 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  .table-highlight {
    background: #fef3c7;
  }
  
  .key-insights {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .insight-card {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }
  
  .insight-card.insight-warning {
    background: #fef2f2;
    border-color: #fca5a5;
  }
  
  .insight-card.insight-info {
    background: #eff6ff;
    border-color: #93c5fd;
  }
  
  .insight-card.insight-caution {
    background: #fef3c7;
    border-color: #fcd34d;
  }
  
  .insight-card.insight-success {
    background: #f0fdf4;
    border-color: #86efac;
  }
  
  .insight-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .insight-content h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  
  .insight-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  .action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .action-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .action-card:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .action-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .action-text strong {
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .action-text small {
    color: #6b7280;
  }
  
  .slider-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .form-slider {
    flex: 1;
  }
  
  .slider-input {
    width: 100px;
  }
  
  .text-success { color: #10b981; }
  .text-warning { color: #f59e0b; }
  .text-danger { color: #ef4444; }
  
  .disabled {
    opacity: 0.5;
    background-color: #f3f4f6;
  }
  
  @media (max-width: 768px) {
    .dti-meters,
    .details-grid {
      grid-template-columns: 1fr;
    }
    
    .income-legend {
      flex-direction: column;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .action-cards {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/home-affordability-calculator.js"></script>
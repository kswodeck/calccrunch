---
layout: ../../layouts/CalculatorLayout.astro
title: Car Lease vs Buy Calculator
description: Compare the total cost of leasing versus buying a car. Factor in down payment, monthly payments, equity, depreciation, and end-of-lease options.
category: financial
tags: ['car lease', 'lease vs buy', 'auto financing']
featured: false
calcType: car-lease-buy
seoTitle: Free Car Lease vs Buy Calculator - Should I Lease or Buy?
seoDescription: Compare leasing vs buying a car. Calculate total costs and equity with our free lease vs buy calculator.
estimatedTime: 5 minutes
difficulty: Medium
---

## How to Use This Calculator

1. Enter the **vehicle information** including price and expected depreciation
2. Fill in **lease details** (monthly payment, term, fees, residual value)
3. Input **purchase financing details** (down payment, interest rate, loan term)
4. Add **ongoing costs** (insurance, maintenance, fuel estimates)
5. Set your **analysis period** and investment assumptions
6. Click **Calculate** to compare total costs and see which option is better

<div class="calculator-form" id="car-lease-buy-calculator-form">
  <div class="form-section">
    <h3>Vehicle Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="vehicle-price">
          Vehicle Price (MSRP) <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="vehicle-price" 
            class="form-input"
            placeholder="35000"
            value="35000"
            min="0"
            step="500"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Manufacturer's suggested retail price</small>
      </div>
      <div class="form-group">
        <label for="negotiated-price">
          Negotiated Price
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="negotiated-price" 
            class="form-input"
            placeholder="33000"
            value="33000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your actual purchase/capitalized cost</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-depreciation">
          Annual Depreciation Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-depreciation" 
            class="form-input"
            placeholder="15"
            value="15"
            min="0"
            max="50"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Typical: 15-20% first year, 10-15% after</small>
      </div>
      <div class="form-group">
        <label for="sales-tax-rate">
          Sales Tax Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="sales-tax-rate" 
            class="form-input"
            placeholder="7.5"
            value="7.5"
            min="0"
            max="15"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Your local sales tax rate</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Lease Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-monthly-payment">
          Monthly Lease Payment <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-monthly-payment" 
            class="form-input"
            placeholder="350"
            value="350"
            min="0"
            step="10"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your quoted monthly lease payment</small>
      </div>
      <div class="form-group">
        <label for="lease-term">
          Lease Term <span class="required">*</span>
        </label>
        <select id="lease-term" class="form-select" required>
          <option value="24">24 months (2 years)</option>
          <option value="36" selected>36 months (3 years)</option>
          <option value="39">39 months</option>
          <option value="48">48 months (4 years)</option>
        </select>
        <small class="form-help">Length of lease agreement</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-down-payment">
          Lease Down Payment (Cap Reduction)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-down-payment" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Due at signing (reduces monthly payment)</small>
      </div>
      <div class="form-group">
        <label for="lease-acquisition-fee">
          Acquisition Fee
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-acquisition-fee" 
            class="form-input"
            placeholder="650"
            value="650"
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Bank/lessor fee (typically $595-$1,095)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-disposition-fee">
          Disposition Fee
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-disposition-fee" 
            class="form-input"
            placeholder="350"
            value="350"
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Fee at lease end if you return the car</small>
      </div>
      <div class="form-group">
        <label for="residual-value">
          Residual Value
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="residual-value" 
            class="form-input"
            placeholder="55"
            value="55"
            min="0"
            max="100"
            step="1"
          />
          <span class="input-addon input-addon-toggle" id="residual-value-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="residual-value-help">Vehicle value at lease end (% of MSRP)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-mileage-allowance">
          Annual Mileage Allowance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-mileage-allowance" 
            class="form-input"
            placeholder="12000"
            value="12000"
            min="0"
            step="1000"
          />
          <span class="input-addon">mi</span>
        </div>
        <small class="form-help">Miles per year included in lease</small>
      </div>
      <div class="form-group">
        <label for="excess-mileage-cost">
          Excess Mileage Cost
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="excess-mileage-cost" 
            class="form-input"
            placeholder="0.25"
            value="0.25"
            min="0"
            step="0.01"
          />
          <span class="input-addon">$/mi</span>
        </div>
        <small class="form-help">Cost per mile over allowance</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expected-annual-miles">
          Your Expected Annual Miles
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="expected-annual-miles" 
            class="form-input"
            placeholder="12000"
            value="12000"
            min="0"
            step="500"
          />
          <span class="input-addon">mi</span>
        </div>
        <small class="form-help">Estimate your actual yearly driving</small>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            id="lease-includes-tax" 
            class="form-checkbox"
          />
          Lease payment includes sales tax
        </label>
        <small class="form-help">Check if tax is already in quoted payment</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Purchase/Financing Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="buy-down-payment">
          Down Payment <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="buy-down-payment" 
            class="form-input"
            placeholder="5000"
            value="5000"
            min="0"
            step="100"
            required
          />
          <span class="input-addon input-addon-toggle" id="buy-down-payment-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="buy-down-payment-help">Enter down payment amount (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="loan-interest-rate">
          Loan Interest Rate (APR) <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="loan-interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
            max="30"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Annual percentage rate for auto loan</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="loan-term">
          Loan Term <span class="required">*</span>
        </label>
        <select id="loan-term" class="form-select" required>
          <option value="36">36 months (3 years)</option>
          <option value="48">48 months (4 years)</option>
          <option value="60" selected>60 months (5 years)</option>
          <option value="72">72 months (6 years)</option>
          <option value="84">84 months (7 years)</option>
        </select>
        <small class="form-help">Length of auto loan</small>
      </div>
      <div class="form-group">
        <label for="dealer-fees">
          Dealer/Documentation Fees
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="dealer-fees" 
            class="form-input"
            placeholder="500"
            value="500"
            min="0"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Processing, doc fees, etc.</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="registration-fees">
          Registration & Title Fees
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="registration-fees" 
            class="form-input"
            placeholder="300"
            value="300"
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">One-time registration costs</small>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            id="finance-sales-tax" 
            class="form-checkbox"
            checked
          />
          Finance sales tax in loan
        </label>
        <small class="form-help">Include sales tax in loan amount</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Ongoing Costs (Monthly Estimates)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-insurance">
          Lease Insurance (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-insurance" 
            class="form-input"
            placeholder="150"
            value="150"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Leases often require higher coverage</small>
      </div>
      <div class="form-group">
        <label for="buy-insurance">
          Purchase Insurance (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="buy-insurance" 
            class="form-input"
            placeholder="130"
            value="130"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">May be lower when you own outright</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-maintenance">
          Lease Maintenance (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="lease-maintenance" 
            class="form-input"
            placeholder="25"
            value="25"
            min="0"
            step="5"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Often covered by warranty during lease</small>
      </div>
      <div class="form-group">
        <label for="buy-maintenance">
          Purchase Maintenance (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="buy-maintenance" 
            class="form-input"
            placeholder="75"
            value="75"
            min="0"
            step="5"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Increases as vehicle ages</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-fuel-cost">
          Monthly Fuel Cost
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-fuel-cost" 
            class="form-input"
            placeholder="150"
            value="150"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Same for both options (estimated)</small>
      </div>
      <div class="form-group">
        <label for="annual-registration">
          Annual Registration Renewal
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-registration" 
            class="form-input"
            placeholder="150"
            value="150"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Yearly renewal fee</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Analysis Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="analysis-period">
          Analysis Period <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="analysis-period" 
            class="form-input"
            placeholder="6"
            value="6"
            min="1"
            max="15"
            step="1"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long to compare costs (1-15 years)</small>
      </div>
      <div class="form-group">
        <label for="investment-return">
          Investment Return Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="investment-return" 
            class="form-input"
            placeholder="7"
            value="7"
            min="0"
            max="20"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected return if money invested instead</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="lease-end-option">
          At Lease End
        </label>
        <select id="lease-end-option" class="form-select">
          <option value="return" selected>Return vehicle & lease new</option>
          <option value="buyout">Buy out the lease</option>
        </select>
        <small class="form-help">What you plan to do when lease ends</small>
      </div>
      <div class="form-group">
        <label for="buy-end-option">
          After Loan Payoff
        </label>
        <select id="buy-end-option" class="form-select">
          <option value="keep" selected>Keep driving (no payment)</option>
          <option value="sell">Sell the vehicle</option>
        </select>
        <small class="form-help">What you plan to do after owning</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Compare Lease vs Buy →
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

<div id="lease-buy-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding Lease vs Buy</h4>
  <p>
    <strong>Leasing</strong> typically offers lower monthly payments but you never own the car. 
    <strong>Buying</strong> costs more upfront and monthly, but you build equity and can sell or trade the vehicle later.
    This calculator compares total costs including opportunity cost of your down payment.
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>🚗 When Leasing Makes Sense</h4>
  <p>
    Leasing may be better if you: want a new car every 2-3 years, drive less than 12,000-15,000 miles/year, 
    prefer lower monthly payments, don't want to deal with selling a car, or can write off the lease as a business expense.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🏆 When Buying Makes Sense</h4>
  <p>
    Buying may be better if you: plan to keep the car long-term (5+ years), drive more than 15,000 miles/year, 
    want to customize your vehicle, prefer no mileage restrictions, or want to build equity to use as a trade-in.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Analysis</h4>
  <p>
    Your lease vs buy comparison is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<style>
  .comparison-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .comparison-bars {
    display: flex;
    gap: 2rem;
    margin: 1.5rem 0;
  }
  
  .comparison-bar {
    flex: 1;
    text-align: center;
  }
  
  .bar-container {
    position: relative;
    height: 200px;
    background: #e5e7eb;
    border-radius: 8px;
    margin: 1rem 0;
    display: flex;
    align-items: flex-end;
  }
  
  .bar-fill {
    width: 100%;
    border-radius: 8px 8px 0 0;
    transition: height 0.5s ease;
    position: relative;
  }
  
  .bar-fill.lease {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  }
  
  .bar-fill.buy {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .bar-value {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 1.2rem;
    white-space: nowrap;
  }
  
  .bar-label {
    font-weight: bold;
    font-size: 1.1rem;
    color: #1e40af;
    height: 40px;
  }
  
  .winner-badge {
    display: inline-block;
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: bold;
    margin-top: var(--space-xs);
  }
  
  .cost-breakdown-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .breakdown-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .breakdown-title {
    font-weight: bold;
    color: #1e40af;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .breakdown-item:last-child {
    border-bottom: none;
  }
  
  .breakdown-total {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #e5e7eb;
  }
  
  .timeline-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .chart-title {
    font-weight: bold;
    color: #1e40af;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .year-comparison-table {
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;
  }
  
  .year-comparison-table th,
  .year-comparison-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .year-comparison-table th:first-child,
  .year-comparison-table td:first-child {
    text-align: left;
  }
  
  .year-comparison-table thead {
    background: #f3f4f6;
  }
  
  .year-comparison-table tbody tr:nth-child(even) {
    background: #f9fafb;
  }
  
  .better-option {
    color: #10b981;
    font-weight: bold;
  }
  
  .worse-option {
    color: #ef4444;
  }
  
  .equity-chart {
    margin: 2rem 0;
  }
  
  .equity-bar-container {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
  }
  
  .equity-label {
    width: 80px;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .equity-bar-wrapper {
    flex: 1;
    height: 30px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .equity-bar {
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    color: white;
    font-weight: bold;
    font-size: 0.85rem;
  }
  
  .equity-bar.positive {
    background: linear-gradient(90deg, #34d399 0%, #10b981 100%);
  }
  
  .equity-bar.negative {
    background: linear-gradient(90deg, #f87171 0%, #ef4444 100%);
  }
  
  .equity-bar.zero {
    background: #9ca3af;
  }
  
  .monthly-comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .monthly-card {
    background: white;
    padding: 1.25rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .monthly-card-title {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .monthly-card-value {
    font-size: 1.75rem;
    font-weight: bold;
    color: #1e40af;
  }
  
  .monthly-card-subtitle {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }
  
  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .insight-card {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
  }
  
  .insight-card.positive {
    border-left-color: #10b981;
  }
  
  .insight-card.warning {
    border-left-color: #f59e0b;
  }
  
  .insight-card.negative {
    border-left-color: #ef4444;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: normal;
    gap: 0.5rem;
  }
  
  .form-checkbox {
    width: 18px;
    height: 18px;
  }

  .cost-over-time-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 250px;
    padding: 20px 10px 40px;
    background: #f8f9fa;
    border-radius: 8px;
    gap: 8px;
  }

  .chart-bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 80px;
  }

  .chart-bar-pair {
    display: flex;
    gap: 4px;
    align-items: flex-end;
    height: 180px;
    width: 100%;
  }

  .chart-bar {
    flex: 1;
    border-radius: 4px 4px 0 0;
    transition: height 0.3s ease;
    min-height: 2px;
  }

  .chart-bar.lease-bar {
    background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  }

  .chart-bar.buy-bar {
    background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
  }

  .chart-bar-label {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .legend-color.lease {
    background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  }

  .legend-color.buy {
    background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
  }
  
  @media (max-width: 768px) {
    .comparison-bars {
      flex-direction: column;
      gap: 1rem;
    }
    
    .cost-breakdown-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .year-comparison-table {
      font-size: 0.875rem;
    }
    
    .monthly-comparison {
      grid-template-columns: 1fr 1fr;
    }
    
    .chart-bars {
      height: 200px;
      padding: 15px 5px 35px;
    }
    
    .chart-bar-pair {
      height: 140px;
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

<script src="/scripts/calculators/car-lease-buy-calculator.js"></script>
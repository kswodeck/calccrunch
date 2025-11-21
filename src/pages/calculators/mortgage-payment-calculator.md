---
layout: ../../layouts/CalculatorLayout.astro
title: Mortgage Payment Calculator
description: Calculate your monthly mortgage payments including principal, interest, taxes, and insurance (PITI). Free, accurate, and easy to use.
category: financial
tags: ['mortgage', 'home loan', 'monthly payment', 'PITI', 'home buying']
featured: true
calcType: mortgage
seoTitle: Free Mortgage Payment Calculator with Taxes & Insurance
seoDescription: Calculate your monthly mortgage payment with our free calculator. Includes principal, interest, property taxes, and insurance.
estimatedTime: 2 minutes
difficulty: Easy
---

## How to Use This Calculator

1. Enter your **home price**
2. Add your **down payment** ($ or %)
3. Input your **interest rate** (annual)
4. Select your **loan term** (15 - 30 years)
5. Add yearly **property taxes** and **insurance**
6. PMI is automatically calculated if down payment < 20%
7. Click **Calculate** to see your monthly payment

<div class="calculator-form" id="mortgage-calculator-form">
  <div class="form-section">
    <h3>Loan Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="home-price">
          Home Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-price" 
            class="form-input"
            placeholder="300000"
            value="300000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="down-payment">
          Down Payment <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="down-payment" 
            class="form-input"
            placeholder="60000"
            value="60000"
            step="1"
            required
          />
          <span class="input-addon input-addon-toggle" id="down-payment-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="down-payment-help">Enter down payment amount (click $ to switch)</small>
      </div>
    </div>
    <div class="form-row">
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
            min="0"
            max="100"
            step="0.05"
            required
          />
          <span class="input-addon">%</span>
        </div>
      </div>
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
        <label for="property-tax">
          Property Tax (Yearly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="property-tax" 
            class="form-input"
            placeholder="3500"
            value="3500"
            min="0"
            step="0.1"
          />
          <span class="input-addon input-addon-toggle" id="property-tax-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="property-tax-help">Enter yearly property tax amount (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="insurance">
          Home Insurance (Yearly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="insurance" 
            class="form-input"
            placeholder="1200"
            value="1200"
            min="0"
            step="0.1"
          />
          <span class="input-addon input-addon-toggle" id="insurance-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="insurance-help">Enter yearly home insurance amount (click $ to switch)</small>
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
            min="0"
            step="1"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Optional: Monthly HOA or condo fees</small>
      </div>
      <div class="form-group">
        <label for="pmi">
          PMI (Private Mortgage Insurance)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pmi" 
            class="form-input"
            placeholder="0.5"
            value="0.5"
            step="0.01"
          />
          <span class="input-addon input-addon-toggle" id="pmi-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="pmi-help">Enter annual PMI rate (automatically disabled if down payment ≥ 20%)</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Payment →
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

<div id="mortgage-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding Your Mortgage Payment</h4>
  <p>
    Your total monthly mortgage payment typically includes: 
    <strong>Principal</strong> (loan repayment), <strong>Interest</strong> (lending cost), 
    <strong>Property Taxes</strong>, <strong>Insurance</strong>, and <strong>PMI</strong> (if down payment is less than 20%).
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🏠 What is PMI?</h4>
  <p>
    Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. 
    It protects the lender and typically costs 0.3% to 1.5% of the loan amount annually. 
    <strong>Good news:</strong> PMI can be removed once you reach 20% equity!
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>📊 The 28/36 Rule</h4>
  <p>
    Lenders typically follow the <strong>28/36 rule</strong> for mortgage approval:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>28%:</strong> Maximum of gross monthly income for housing costs (PITI)</li>
    <li><strong>36%:</strong> Maximum of gross monthly income for all debt payments</li>
  </ul>
  <p style="margin-top: 10px;">
    Use our calculator to ensure your mortgage payment fits within these guidelines for a sustainable financial plan.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your mortgage details are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
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
  
  .payment-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .payment-chart {
    margin: 1rem 0;
  }
  
  .payment-bar {
    display: flex;
    width: 100%;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .payment-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .payment-segment:hover {
    opacity: 0.8;
  }
  
  .payment-segment.principal {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .payment-segment.tax {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .payment-segment.insurance {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .payment-segment.pmi {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  }
  
  .payment-segment.hoa {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .payment-legend {
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
  
  .legend-color.principal {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .legend-color.tax {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .legend-color.insurance {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .legend-color.pmi {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  }
  
  .legend-color.hoa {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .affordability-note {
    background: #f0f9ff;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    border-left: 3px solid #3b82f6;
  }
  
  .affordability-note h4 {
    margin-top: 0;
    color: #1e40af;
  }
  
  .text-success { 
    color: #10b981; 
  }
  
  .disabled {
    opacity: 0.5;
    background-color: #f3f4f6;
  }
  
  .table-divider {
    border-top: 2px solid #e5e7eb;
  }
  
  .table-total {
    background: #f8f9fa;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .payment-legend {
      flex-direction: column;
    }
    
    .form-actions {
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

<script src="/scripts/calculators/mortgage-calculator.js"></script>
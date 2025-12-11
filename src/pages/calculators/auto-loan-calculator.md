---
layout: ../../layouts/CalculatorLayout.astro
calcType: auto-loan
---

## How to Use This Calculator

1. Enter the **vehicle price** (before taxes and fees)
2. Input your **down payment** amount or percentage
3. Add **trade-in value** and amount owed (if applicable)
4. Select your **credit score** range for rate suggestions
5. Enter the **interest rate** (APR)
6. Choose your **loan term** in months
7. Add **sales tax**, **dealer fees**, and optional warranty
8. Click **Calculate** to see your monthly payment and total costs

<div class="calculator-form" id="auto-loan-calculator-form">
  <div class="form-section">
    <h3>Vehicle Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="vehicle-price">
          Vehicle Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="vehicle-price" 
            class="form-input"
            placeholder="35000"
            value="35000"
            step="500"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Negotiated price before taxes and fees</small>
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
            placeholder="5000"
            value="5000"
            step="1"
            required
          />
          <span class="input-addon input-addon-toggle" id="down-payment-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="down-payment-help">Enter down payment amount (click $ to switch)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Trade-In (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="trade-in-value">
          Trade-In Value
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="trade-in-value" 
            class="form-input"
            placeholder="0"
            value="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Agreed trade-in value for your current vehicle</small>
      </div>
      <div class="form-group">
        <label for="trade-in-owed">
          Amount Owed on Trade-In
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="trade-in-owed" 
            class="form-input"
            placeholder="0"
            value="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help" id="trade-in-owed-help">Amount still owed on trade-in vehicle</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Loan Terms</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="credit-score">
          Credit Score Range
        </label>
        <select id="credit-score" class="form-select">
          <option value="excellent">Excellent (750+)</option>
          <option value="good" selected>Good (700-749)</option>
          <option value="fair">Fair (650-699)</option>
          <option value="poor">Poor (Below 650)</option>
        </select>
        <small class="form-help" id="credit-score-help">Good credit (700-749): Standard rates</small>
      </div>
      <div class="form-group">
        <label for="interest-rate">
          Interest Rate (APR) <span class="required">*</span>
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
        <small class="form-help">Annual percentage rate from lender</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="loan-term">
          Loan Term <span class="required">*</span>
        </label>
        <select id="loan-term" class="form-select" required>
          <option value="24">24 months (2 years)</option>
          <option value="36">36 months (3 years)</option>
          <option value="48">48 months (4 years)</option>
          <option value="60" selected>60 months (5 years)</option>
          <option value="72">72 months (6 years)</option>
          <option value="84">84 months (7 years)</option>
        </select>
        <small class="form-help">Shorter terms = less interest paid</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Taxes & Fees</h3>
    <div class="form-row">
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
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Your local sales tax rate</small>
      </div>
      <div class="form-group">
        <label for="dealer-fees">
          Dealer Fees
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="dealer-fees" 
            class="form-input"
            placeholder="500"
            value="500"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Documentation, processing, etc.</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="extended-warranty">
          Extended Warranty (Optional)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="extended-warranty" 
            class="form-input"
            placeholder="0"
            value="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            id="include-tax-upfront" 
            class="form-checkbox"
          />
          Pay sales tax upfront (not financed)
        </label>
        <small class="form-help">Check to exclude tax from loan amount</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Payment →
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

<div id="loan-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding Auto Loans</h4>
  <p>
    Your monthly car payment depends on the <strong>amount financed</strong> (vehicle price - down payment - trade equity + taxes/fees), 
    the <strong>interest rate</strong>, and the <strong>loan term</strong>. Longer terms mean lower monthly payments but more total interest paid.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🚗 Smart Car Buying Tips</h4>
  <p>
    <strong>20/4/10 Rule:</strong> Put down at least 20%, finance for no more than 4 years, 
    and keep total monthly vehicle expenses under 10% of gross income. This helps avoid being "upside down" on your loan.
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #D97706;">
  <h4>⚠️ Watch Out For</h4>
  <p>
    <strong>Negative Equity:</strong> If you owe more on your trade-in than it's worth, that amount gets added to your new loan.
    <strong>Long Terms:</strong> 72+ month loans may seem affordable but cost thousands more in interest.
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
  
  .loan-quality {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .loan-quality.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .loan-quality.status-good {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .loan-quality.status-stretched {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .loan-quality.status-expensive {
    background: #fef3c7;
    border-left-color: #f97316;
  }
  
  .loan-quality.status-risky {
    background: #fef2f2;
    border-left-color: #ef4444;
  }
  
  .payment-structure {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .payment-breakdown-bar {
    display: flex;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 1rem 0;
  }
  
  .breakdown-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .breakdown-segment.vehicle {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .breakdown-segment.interest {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .breakdown-segment.fees {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .breakdown-segment.tax {
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
  
  .legend-color.vehicle {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .legend-color.interest {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .legend-color.fees {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .legend-color.tax {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .cost-breakdown {
    margin: 2rem 0;
  }
  
  .breakdown-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .breakdown-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .breakdown-section h5 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  .loan-terms-summary {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }
  
  .terms-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .term-item {
    text-align: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .term-label {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .term-value {
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    color: #111827;
  }
  
  .amortization-preview {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e5e7eb;
  }
  
  .amortization-table {
    margin-top: 1rem;
  }
  
  .amortization-table thead {
    background: #f8f9fa;
  }
  
  .amortization-table th,
  .amortization-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .amortization-table th:first-child,
  .amortization-table td:first-child {
    text-align: left;
  }
  
  .loan-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #f59e0b;
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
  
  .comparison-note {
    margin-top: 1rem;
    padding: 1rem;
    background: #eff6ff;
    border-left: 3px solid #3b82f6;
    border-radius: 4px;
  }
  
  .affordability-check {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .guideline-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .guideline-card {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .guideline-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .guideline-content h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #111827;
  }
  
  .guideline-content p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  .guideline-content small {
    color: #6b7280;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: normal;
  }
  
  .form-checkbox {
    margin-right: 0.5rem;
  }
  
  .text-muted {
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    .breakdown-grid,
    .terms-grid {
      grid-template-columns: 1fr;
    }
    
    .terms-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .payment-legend {
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
    
    #term-comparison.hidden {
      display: block !important;
    }
  }
</style>

<script src="/scripts/calculators/auto-loan-calculator.js"></script>
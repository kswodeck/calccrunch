---
layout: ../../layouts/CalculatorLayout.astro
title: Loan Amortization Calculator
description: View a complete loan payoff schedule with detailed breakdown of principal and interest payments. Visualize how your loan balance decreases over time.
category: financial
tags: ['loan', 'amortization', 'payment schedule', 'interest', 'principal']
featured: false
calcType: loan-amortization
seoTitle: Free Loan Amortization Calculator with Payment Schedule
seoDescription: Calculate your loan amortization schedule with our free calculator. See detailed monthly payments, principal, interest, and remaining balance.
estimatedTime: 3 minutes
difficulty: Easy
---

## How to Use This Calculator

1. Enter your **loan amount**
2. Input your **interest rate** (annual)
3. Select your **loan term** (years or months)
4. Optionally add **extra payments** to see how much you can save
5. Click **Calculate** to view your complete amortization schedule

<div class="calculator-form" id="loan-calculator-form">
  <div class="form-section">
    <h3>Loan Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="loan-amount">
          Loan Amount <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="loan-amount" 
            class="form-input"
            placeholder="200000"
            value="200000"
            min="1000"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="interest-rate">
          Interest Rate (Annual) <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
            max="30"
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
        <div class="input-group">
          <input 
            type="number" 
            id="loan-term" 
            class="form-input"
            placeholder="30"
            value="30"
            min="1"
            max="50"
            required
          />
          <span class="input-addon">years</span>
        </div>
      </div>
      <div class="form-group">
        <label for="start-date">
          Start Date
        </label>
        <input 
          type="month" 
          id="start-date" 
          class="form-input"
        />
        <small class="form-help">Optional: Set loan start date</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Extra Payments (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="extra-payment">
          Extra Monthly Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="extra-payment" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Additional amount paid each month</small>
      </div>
      <div class="form-group">
        <label for="extra-yearly">
          Extra Yearly Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="extra-yearly" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">One-time annual payment (e.g., bonus)</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Generate Amortization Schedule →
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
  <h4>💡 Understanding Loan Amortization</h4>
  <p>
    <strong>Amortization</strong> is the process of paying off a loan through regular payments over time. 
    Each payment covers both interest and principal, but early payments are mostly interest while later 
    payments are mostly principal. This calculator shows you exactly how your loan is paid down.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Schedule</h4>
  <p>
    Your loan details are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. You can also <strong>export to CSV</strong> for use in spreadsheets.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>💰 Save Money with Extra Payments</h4>
  <p>
    Making extra payments can significantly reduce your total interest paid and help you pay off your loan 
    faster. Even small extra monthly payments of $50-$100 can save thousands in interest over the life of 
    the loan. Use this calculator to see the impact!
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📊 How to Read Your Schedule</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Payment Number:</strong> The sequential payment (1, 2, 3, etc.)</li>
    <li><strong>Principal:</strong> Amount that reduces your loan balance</li>
    <li><strong>Interest:</strong> Cost of borrowing (decreases over time)</li>
    <li><strong>Balance:</strong> Remaining amount owed after each payment</li>
  </ul>
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
  
  .savings-highlight {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .savings-highlight.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .savings-highlight.status-great {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .savings-highlight.status-good {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .savings-highlight.status-standard {
    background: #f8f9fa;
    border-left-color: #9ca3af;
  }
  
  .savings-text {
    color: #10b981;
    font-weight: bold;
  }
  
  .payment-breakdown-visual {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .composition-chart {
    margin: 1.5rem 0;
  }
  
  .composition-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 200px;
    padding: 0 1rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .composition-bar {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 0 2px;
    position: relative;
  }
  
  .bar-segment {
    width: 100%;
    transition: all 0.3s ease;
  }
  
  .bar-segment.principal {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  }
  
  .bar-segment.interest {
    background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);
  }
  
  .bar-segment.extra {
    background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
  }
  
  .bar-label {
    position: absolute;
    bottom: -20px;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .composition-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
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
  
  .legend-color.interest {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .legend-color.extra {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .comparison-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .comparison-card {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .comparison-card.highlighted {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border: 2px solid #10b981;
  }
  
  .comparison-card h5 {
    margin: 0 0 1rem 0;
    color: #374151;
  }
  
  .comparison-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .comparison-item:last-child {
    border-bottom: none;
  }
  
  .schedule-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .schedule-controls {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .schedule-table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }
  
  .amortization-table {
    width: 100%;
    border-collapse: collapse;
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
  
  .amortization-table .year-end {
    background: #fef3c7;
    font-weight: bold;
  }
  
  .amortization-table .has-extra {
    background: #f0fdf4;
  }
  
  .amount-cell {
    font-weight: bold;
  }
  
  .extra-cell {
    color: #10b981;
    font-weight: bold;
  }
  
  .balance-cell {
    color: #6366f1;
  }
  
  .loan-insights {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
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
  
  .insight-card.insight-info {
    background: #eff6ff;
    border-color: #93c5fd;
  }
  
  .insight-card.insight-success {
    background: #f0fdf4;
    border-color: #86efac;
  }
  
  .insight-card.insight-warning {
    background: #fef3c7;
    border-color: #fcd34d;
  }
  
  .insight-card.insight-neutral {
    background: #f8f9fa;
    border-color: #d1d5db;
  }
  
  .insight-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .insight-content h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #111827;
  }
  
  .insight-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  .text-success { color: #10b981; }
  
  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
    }
    
    .composition-bars {
      height: 150px;
    }
    
    .bar-label {
      font-size: 0.625rem;
    }
    
    .schedule-controls {
      flex-direction: column;
    }
    
    .amortization-table {
      font-size: 0.875rem;
    }
    
    .amortization-table th,
    .amortization-table td {
      padding: 0.5rem;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .action-cards {
      display: none;
    }
    
    .schedule-table-container {
      overflow: visible;
    }
    
    .amortization-table {
      font-size: 0.75rem;
    }
  }
</style>

<script src="/scripts/calculators/loan-amortization-calculator.js"></script>
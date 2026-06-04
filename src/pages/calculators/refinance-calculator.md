---
layout: ../../layouts/CalculatorLayout.astro
calcType: refinance
---

## How to Use This Calculator

1. Enter your **current loan details** (balance, rate, remaining term, payment)
2. Input the **new loan terms** (rate, term, closing costs, points)
3. Click **Calculate** to compare your current and new loan
4. Review the **break-even analysis** to see when refinancing pays off
5. Examine the **amortization comparison** for total cost analysis

<div class="calculator-form" id="refinance-form">
  <div class="form-section">
    <h3>Current Loan Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-balance">
          Remaining Balance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-balance" 
            class="form-input"
            placeholder="250000"
            value="250000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Outstanding loan balance</small>
      </div>
      <div class="form-group">
        <label for="current-rate">
          Current Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
            max="30"
            step="0.125"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Your current annual interest rate</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="current-term">
          Remaining Term <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-term" 
            class="form-input"
            placeholder="25"
            value="25"
            min="1"
            max="40"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Years left on your current loan</small>
      </div>
      <div class="form-group">
        <label for="current-payment">
          Current Monthly Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-payment" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="1"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Leave 0 to auto-calculate</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>New Loan Terms</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="new-rate">
          New Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="new-rate" 
            class="form-input"
            placeholder="5.0"
            value="5.0"
            min="0"
            max="30"
            step="0.125"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Offered interest rate on new loan</small>
      </div>
      <div class="form-group">
        <label for="new-term">
          New Loan Term <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="new-term" 
            class="form-input"
            placeholder="30"
            value="30"
            min="1"
            max="40"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Term of the new loan</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="closing-costs">
          Closing Costs
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="closing-costs" 
            class="form-input"
            placeholder="5000"
            value="5000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Fees, appraisal, title insurance, etc.</small>
      </div>
      <div class="form-group">
        <label for="points">
          Discount Points
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="points" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            max="5"
            step="0.125"
          />
          <span class="input-addon">pts</span>
        </div>
        <small class="form-help">Each point = 1% of loan amount</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Compare Loans →
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

<div id="refinance-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🏠 When Does Refinancing Make Sense?</h4>
  <p>
    Refinancing typically makes sense when you can lower your interest rate by at least <strong>0.5-1%</strong>, 
    plan to stay in your home longer than the break-even period, and the total cost savings outweigh the 
    closing costs. Use this calculator to determine your specific break-even point.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💰 Common Reasons to Refinance</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Lower monthly payment:</strong> Reduce your rate or extend term</li>
    <li><strong>Shorten loan term:</strong> Pay off faster with a 15 or 20 year loan</li>
    <li><strong>Switch loan type:</strong> Convert ARM to fixed rate for stability</li>
    <li><strong>Remove PMI:</strong> If your home has appreciated above 80% LTV</li>
    <li><strong>Cash-out equity:</strong> Access home equity for major expenses</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📋 Refinancing Costs to Consider</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Application fee:</strong> $250-$500</li>
    <li><strong>Appraisal:</strong> $300-$600</li>
    <li><strong>Title search & insurance:</strong> $700-$1,500</li>
    <li><strong>Origination fee:</strong> 0.5-1.5% of loan</li>
    <li><strong>Discount points:</strong> 1% of loan per point (optional, lowers rate)</li>
    <li><strong>Total typical costs:</strong> 2-5% of loan amount</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>⚠️ Watch Out For</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Extending your loan term resets the clock on interest</li>
    <li>Prepayment penalties on your current loan</li>
    <li>Rolling closing costs into the new loan increases total cost</li>
    <li>Your credit score affects the rate you qualify for</li>
    <li>Home value must support the new loan amount</li>
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
    background: var(--color-success) !important;
    border-color: var(--color-success) !important;
  }

  .refinance-verdict {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    gap: 1rem;
  }

  .refinance-verdict.verdict-yes {
    background: var(--color-highlight-green);
    border: 2px solid #10b981;
  }

  .refinance-verdict.verdict-maybe {
    background: var(--color-highlight-yellow);
    border: 2px solid #f59e0b;
  }

  .refinance-verdict.verdict-no {
    background: var(--color-highlight-red);
    border: 2px solid #ef4444;
  }

  .verdict-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .verdict-content h4 {
    margin: 0 0 0.25rem 0;
  }

  .verdict-content p {
    margin: 0;
    color: var(--color-gray-dark);
  }

  .comparison-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .loan-card {
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
  }

  .loan-card.current-loan {
    border-color: var(--color-gray);
    background: var(--color-surface-neutral);
  }

  .loan-card.new-loan {
    border-color: var(--color-light-blue);
    background: var(--color-highlight-blue);
  }

  .loan-card h4 {
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .loan-card .loan-detail {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .loan-card .loan-detail:last-child {
    border-bottom: none;
  }

  .loan-card .loan-detail .label {
    color: var(--color-gray-dark);
    font-size: 0.875rem;
  }

  .loan-card .loan-detail .value {
    font-weight: 600;
    color: var(--color-black);
  }

  .savings-highlight {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 12px;
    border: 1px solid #86efac;
  }

  .savings-highlight .highlight-item {
    text-align: center;
  }

  .savings-highlight .highlight-item h5 {
    margin: 0 0 0.25rem 0;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
  }

  .savings-highlight .highlight-item .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-success);
  }

  .breakeven-visual {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-surface-neutral);
    border-radius: 12px;
  }

  .breakeven-bar {
    position: relative;
    width: 100%;
    height: 30px;
    background: #fecaca;
    border-radius: 15px;
    margin: 1.5rem 0 0.5rem;
    overflow: hidden;
  }

  .breakeven-fill {
    height: 100%;
    background: linear-gradient(90deg, #fecaca 0%, #86efac 100%);
    border-radius: 15px;
    position: relative;
  }

  .breakeven-marker {
    position: absolute;
    top: -8px;
    width: 3px;
    height: 46px;
    background: #1d4ed8;
    border-radius: 2px;
  }

  .breakeven-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }

  .amortization-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .comparison-table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }

  .comparison-table thead {
    background: var(--color-surface-neutral);
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.6rem 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.875rem;
  }

  .comparison-table th:first-child,
  .comparison-table td:first-child {
    text-align: left;
  }

  .comparison-table .highlight-row {
    background: var(--color-highlight-yellow);
    font-weight: 600;
  }

  .total-cost-analysis {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .cost-comparison-bar {
    margin: 1rem 0;
  }

  .cost-bar-item {
    margin: 0.75rem 0;
  }

  .cost-bar-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .cost-bar-track {
    height: 24px;
    background: var(--color-gray);
    border-radius: 12px;
    overflow: hidden;
  }

  .cost-bar-fill {
    height: 100%;
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 0.75rem;
    color: white;
    font-weight: 600;
  }

  .cost-bar-fill.current {
    background: linear-gradient(90deg, #9ca3af, #6b7280);
  }

  .cost-bar-fill.new-loan {
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }

  .cost-bar-fill.new-with-costs {
    background: linear-gradient(90deg, #8b5cf6, #6d28d9);
  }

  .text-success { color: var(--color-success); }
  .text-danger { color: var(--color-error); }

  @media (max-width: 768px) {
    .comparison-cards {
      grid-template-columns: 1fr;
    }

    .savings-highlight {
      grid-template-columns: 1fr 1fr;
    }

    .comparison-table {
      font-size: 0.8rem;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 0.4rem 0.5rem;
    }
  }
</style>

<script src="/scripts/calculators/refinance-calculator.js"></script>

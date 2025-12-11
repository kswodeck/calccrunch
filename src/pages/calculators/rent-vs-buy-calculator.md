---
layout: ../../layouts/CalculatorLayout.astro
calcType: rent-vs-buy
---

## How to Use This Calculator

1. Enter your current **monthly rent** and expected annual increase
2. Input the **home purchase price** and down payment
3. Add **mortgage details** (rate and term)
4. Include **homeownership costs** (property tax, insurance, HOA, maintenance)
5. Set your **investment return rate** for opportunity cost calculations
6. Choose your **time horizon** (how long you plan to stay)
7. Click **Calculate** to see the financial comparison

<div class="calculator-form" id="rent-vs-buy-calculator-form">
  <div class="form-section">
    <h3>Rental Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-rent">
          Monthly Rent <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-rent" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="10"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="rent-increase">
          Annual Rent Increase <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="rent-increase" 
            class="form-input"
            placeholder="3"
            value="3"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Average yearly rent increase percentage</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="renters-insurance">
          Renter's Insurance (Monthly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="renters-insurance" 
            class="form-input"
            placeholder="20"
            value="20"
            min="0"
            step="5"
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="security-deposit">
          Security Deposit
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="security-deposit" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Typically 1-2 months rent (returned at end)</small>
      </div>
    </div>
  </div>
  
  <div class="form-section">
    <h3>Purchase Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="home-price">
          Home Purchase Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-price" 
            class="form-input"
            placeholder="400000"
            value="400000"
            min="0"
            step="500"
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
            placeholder="80000"
            value="80000"
            min="0"
            step="0.5"
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
          Mortgage Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
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
            placeholder="12000"
            value="12000"
            min="0"
            step="500"
          />
          <span class="input-addon input-addon-toggle" id="closing-costs-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="closing-costs-help">Typically 2-5% of purchase price</small>
      </div>
      <div class="form-group">
        <label for="home-appreciation">
          Annual Home Appreciation
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-appreciation" 
            class="form-input"
            placeholder="3"
            value="3"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected yearly home value increase</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Homeownership Costs</h3>
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
            placeholder="4800"
            value="4800"
            min="0"
            step="0.05"
          />
          <span class="input-addon input-addon-toggle" id="property-tax-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="property-tax-help">Enter yearly property tax amount (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="home-insurance">
          Home Insurance (Yearly)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="home-insurance" 
            class="form-input"
            placeholder="1500"
            value="1600"
            min="0"
            step="0.05"
          />
          <span class="input-addon input-addon-toggle" id="home-insurance-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="home-insurance-help">Enter yearly home insurance amount (click $ to switch)</small>
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
      </div>
      <div class="form-group">
        <label for="maintenance">
          Maintenance & Repairs
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="maintenance" 
            class="form-input"
            placeholder="1"
            value="0.5"
            min="0"
            step="0.05"
          />
          <span class="input-addon input-addon-toggle" id="maintenance-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="maintenance-help">Enter amount for upkeep (click $ to switch)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="pmi">
          PMI Rate (if down payment < 20%)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pmi" 
            class="form-input"
            placeholder="0.5"
            value="0.5"
            min="0"
            step="0.05"
          />
          <span class="input-addon input-addon-toggle" id="pmi-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="pmi-help">Annual PMI rate (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="utilities-difference">
          Additional Monthly Utilities
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="utilities-difference" 
            class="form-input"
            placeholder="100"
            value="100"
            min="0"
            step="5"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Extra utility costs when owning vs renting</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Financial Assumptions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="investment-return">
          Investment Return Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="investment-return" 
            class="form-input"
            placeholder="9"
            value="9"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected annual return if down payment invested instead</small>
      </div>
      <div class="form-group">
        <label for="marginal-tax-rate">
          Marginal Tax Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="marginal-tax-rate" 
            class="form-input"
            placeholder="24"
            value="24"
            min="0"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">For mortgage interest deduction calculation</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="time-horizon">
          Time Horizon <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="time-horizon" 
            class="form-input"
            placeholder="10"
            value="10"
            min="1"
            max="100"
            step="1"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long you plan to stay (1-30 years)</small>
      </div>
      <div class="form-group">
        <label for="selling-costs">
          Home Selling Costs
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="selling-costs" 
            class="form-input"
            placeholder="6"
            value="6"
            min="0"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Realtor fees and closing costs when selling</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Rent vs Buy →
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

<div id="rent-vs-buy-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding Rent vs Buy Analysis</h4>
  <p>
    This calculator compares the <strong>total net cost</strong> of renting versus buying over your specified time period. 
    It factors in all costs including mortgage interest, property taxes, maintenance, opportunity costs, and potential appreciation. 
    The analysis helps you make an informed decision based on your specific financial situation.
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>💰 The 5% Rule of Thumb</h4>
  <p>
    A common guideline suggests that if annual rent exceeds 5% of the home's purchase price, buying may be better financially. 
    However, this calculator provides a much more detailed analysis by considering:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Opportunity cost</strong> of your down payment</li>
    <li><strong>Tax benefits</strong> from mortgage interest deduction</li>
    <li><strong>All ownership costs</strong> including maintenance and HOA</li>
    <li><strong>Expected appreciation</strong> and selling costs</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🏠 Non-Financial Factors to Consider</h4>
  <p>
    While this calculator focuses on financial comparison, remember to consider non-financial factors in your decision:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Stability:</strong> Owning provides housing security and no surprise rent increases</li>
    <li><strong>Flexibility:</strong> Renting makes it easier to relocate for opportunities</li>
    <li><strong>Control:</strong> Homeowners can renovate and customize their space</li>
    <li><strong>Responsibility:</strong> Renters don't worry about maintenance or repairs</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Analysis</h4>
  <p>
    Your rent vs buy comparison is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<style>
  .result-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-md);
    margin: 0;
    gap: 0;
  }

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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px 8px 0 0;
    transition: height 0.5s ease;
    position: relative;
  }
  
  .bar-fill.rent {
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
  }
  
  .year-comparison-table th,
  .year-comparison-table td {
    padding: 0.75rem;
    text-align: right;
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
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .disabled {
    opacity: 0.5;
    background-color: #f3f4f6;
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

<script src="/scripts/calculators/rent-vs-buy-calculator.js"></script>
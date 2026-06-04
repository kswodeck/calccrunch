---
layout: ../../layouts/CalculatorLayout.astro
calcType: rental-property
---

## How to Use This Calculator

1. Enter the **purchase price** and financing details (down payment, loan rate, term)
2. Add **acquisition costs** (closing costs, renovation/repairs)
3. Input your expected **monthly rental income**
4. Set the **vacancy rate** for your market (typically 5-10%)
5. Enter all **operating expenses** (taxes, insurance, HOA, maintenance, management)
6. Optionally set **growth assumptions** (appreciation and rent increases)
7. Click **Calculate** to see cash flow, ROI, cap rate, and projections

<div class="calculator-form" id="rental-property-calculator-form">
  <div class="form-section">
    <h3>Purchase & Financing</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="purchase-price">
          Purchase Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="purchase-price" 
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
            placeholder="25"
            value="25"
            min="0"
            step="0.5"
            required
          />
          <span class="input-addon input-addon-toggle" id="down-payment-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="down-payment-help">Enter down payment as % of purchase price (click % to switch)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="interest-rate">
          Loan Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="7.0"
            value="7.0"
            min="0"
            max="30"
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
            placeholder="9000"
            value="9000"
            min="0"
            step="500"
          />
          <span class="input-addon input-addon-toggle" id="closing-costs-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="closing-costs-help">Typically 2-5% of purchase price (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="renovation-costs">
          Renovation / Repair Costs
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="renovation-costs" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Initial repairs or upgrades before renting</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Rental Income</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-rent">
          Monthly Rental Income <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-rent" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="25"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="vacancy-rate">
          Vacancy Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="vacancy-rate" 
            class="form-input"
            placeholder="8"
            value="8"
            min="0"
            max="100"
            step="1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Typical: 5-10% depending on market</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Operating Expenses</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="property-tax">
          Property Tax (Annual)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="property-tax" 
            class="form-input"
            placeholder="3600"
            value="3600"
            min="0"
            step="100"
          />
          <span class="input-addon input-addon-toggle" id="property-tax-unit" title="Click to switch between $ and %">$</span>
        </div>
        <small class="form-help" id="property-tax-help">Annual property tax amount (click $ to switch)</small>
      </div>
      <div class="form-group">
        <label for="insurance">
          Insurance (Annual)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="insurance" 
            class="form-input"
            placeholder="1500"
            value="1500"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Landlord / rental dwelling policy</small>
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
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="maintenance-reserve">
          Maintenance Reserve
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="maintenance-reserve" 
            class="form-input"
            placeholder="10"
            value="10"
            min="0"
            step="1"
          />
          <span class="input-addon input-addon-toggle" id="maintenance-reserve-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="maintenance-reserve-help">% of monthly rent for repairs/capex (click % to switch)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="management-fee">
          Property Management Fee
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="management-fee" 
            class="form-input"
            placeholder="10"
            value="10"
            min="0"
            step="1"
          />
          <span class="input-addon input-addon-toggle" id="management-fee-unit" title="Click to switch between $ and %">%</span>
        </div>
        <small class="form-help" id="management-fee-help">% of collected rent (click % to switch)</small>
      </div>
      <div class="form-group">
        <label for="other-expenses">
          Other Monthly Expenses
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="other-expenses" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Utilities, lawn care, pest control, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Growth Assumptions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-appreciation">
          Expected Annual Appreciation
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-appreciation" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="20"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Historical average: 3-5% per year</small>
      </div>
      <div class="form-group">
        <label for="annual-rent-increase">
          Expected Annual Rent Increase
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-rent-increase" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="20"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Typical: 2-5% per year</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Analyze Investment Property →
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

<div id="rental-property-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>Understanding Cap Rate</h4>
  <p>
    <strong>Capitalization Rate (Cap Rate)</strong> measures the rate of return on a property based on the income it generates, 
    independent of financing. It is calculated as Net Operating Income (NOI) divided by the purchase price. 
    A higher cap rate indicates higher potential returns but often comes with higher risk. 
    Typical cap rates range from 4-10% depending on location and property type.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Cash-on-Cash Return vs. Total ROI</h4>
  <p>
    <strong>Cash-on-Cash Return</strong> measures the annual pre-tax cash flow relative to the total cash you invested 
    (down payment + closing costs + repairs). It tells you how hard your actual cash is working. 
    <strong>Total ROI</strong> is broader and includes equity buildup through mortgage paydown and property appreciation. 
    Both metrics matter: cash-on-cash shows your immediate returns, while total ROI shows long-term wealth building.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Common Investor Rules of Thumb</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>1% Rule:</strong> Monthly rent should be at least 1% of purchase price (e.g., $3,000/mo on a $300,000 property)</li>
    <li><strong>50% Rule:</strong> Expect about 50% of gross rent to go to operating expenses (excluding mortgage)</li>
    <li><strong>DSCR > 1.25:</strong> Net Operating Income should cover at least 125% of your debt service for a healthy margin</li>
    <li><strong>GRM < 15:</strong> A Gross Rent Multiplier under 15 generally indicates good value</li>
  </ul>
  <p>
    These are starting points for screening deals, not definitive pass/fail criteria. Always analyze each property individually.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Save & Share Your Analysis</h4>
  <p>
    Your rental property analysis is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<style>
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .metric-card {
    background: var(--color-white);
    padding: 1.25rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
  }

  .metric-card.positive {
    border-color: #10b981;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  }

  .metric-card.negative {
    border-color: #ef4444;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  }

  .metric-card.neutral {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }

  .metric-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .metric-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
  }

  .metric-card.positive .metric-value {
    color: #059669;
  }

  .metric-card.negative .metric-value {
    color: #dc2626;
  }

  .metric-card.neutral .metric-value {
    color: #2563eb;
  }

  .cash-flow-indicator {
    text-align: center;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
  }

  .cash-flow-indicator.positive {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    color: white;
  }

  .cash-flow-indicator.negative {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    color: white;
  }

  .cash-flow-amount {
    font-size: 2rem;
    font-weight: bold;
  }

  .cash-flow-label {
    font-size: 1rem;
    opacity: 0.9;
    margin-top: 0.25rem;
  }

  .expense-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }

  .expense-bar {
    display: flex;
    align-items: center;
    margin: 0.75rem 0;
    gap: 0.75rem;
  }

  .expense-bar-label {
    min-width: 140px;
    font-size: 0.875rem;
    color: #374151;
  }

  .expense-bar-track {
    flex: 1;
    height: 24px;
    background: #f3f4f6;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .expense-bar-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease;
  }

  .expense-bar-value {
    min-width: 80px;
    text-align: right;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
  }

  .deal-quality {
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
    border: 2px solid;
  }

  .deal-quality.excellent {
    background: #ecfdf5;
    border-color: #059669;
  }

  .deal-quality.good {
    background: #eff6ff;
    border-color: #2563eb;
  }

  .deal-quality.fair {
    background: #fffbeb;
    border-color: #d97706;
  }

  .deal-quality.poor {
    background: #fef2f2;
    border-color: #dc2626;
  }

  .deal-quality-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  .deal-quality-checks {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .deal-quality-checks li {
    padding: 0.4rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .check-pass {
    color: #059669;
    font-weight: 600;
  }

  .check-fail {
    color: #dc2626;
    font-weight: 600;
  }

  .projection-table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }

  .projection-table th,
  .projection-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.875rem;
  }

  .projection-table th {
    background: var(--color-surface-neutral);
    font-weight: 600;
    text-align: right;
  }

  .projection-table th:first-child,
  .projection-table td:first-child {
    text-align: left;
  }

  .projection-table tbody tr:hover {
    background: #f9fafb;
  }

  .section-title {
    font-weight: bold;
    color: var(--color-primary-blue);
    font-size: 1.1rem;
    margin: 2rem 0 1rem;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .summary-section {
    background: var(--color-white);
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }

  .summary-section h4 {
    margin: 0 0 0.75rem;
    color: var(--color-primary-blue);
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .summary-item:last-child {
    border-bottom: none;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }

    .expense-bar-label {
      min-width: 100px;
      font-size: 0.75rem;
    }

    .form-actions {
      flex-direction: column;
    }

    .projection-table {
      font-size: 0.75rem;
    }

    .projection-table th,
    .projection-table td {
      padding: 0.5rem 0.25rem;
    }
  }

  @media print {
    .btn, button {
      display: none !important;
    }
  }
</style>

<script src="/scripts/calculators/rental-property-calculator.js"></script>

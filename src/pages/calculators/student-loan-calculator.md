---
layout: ../../layouts/CalculatorLayout.astro
calcType: student-loan
---

## How to Use This Calculator

1. **Add your loans** - Click "Add Loan" to enter each student loan with its balance, interest rate, and type
2. **Enter your income** - Required for income-driven repayment plan calculations
3. **Choose a repayment plan** - Compare Standard, Graduated, Extended, and Income-Driven options
4. **Add extra payments** - See how additional payments accelerate payoff
5. Click **Calculate** to see payment schedules, total costs, and forgiveness estimates

<div class="calculator-form" id="student-loan-calculator-form">
  <div class="form-section">
    <h3>🎓 Your Student Loans</h3>
    <p class="section-description">Add all your federal and private student loans to get a complete picture.</p>
    <div id="loans-container">
      <!-- Loan rows will be added here dynamically -->
    </div>
    <button type="button" id="add-loan-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Loan
    </button>
    <div class="loan-summary-preview">
      <div class="summary-item">
        <span>Total Balance:</span>
        <strong id="total-balance-display">$0</strong>
      </div>
      <div class="summary-item">
        <span>Weighted Avg Rate:</span>
        <strong id="avg-rate-display">0%</strong>
      </div>
      <div class="summary-item">
        <span>Number of Loans:</span>
        <strong id="loan-count-display">0</strong>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>💰 Your Income (For IDR Plans)</h3>
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
            placeholder="55000"
            value="55000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your total yearly income before taxes</small>
      </div>
      <div class="form-group">
        <label for="family-size">
          Family Size <span class="required">*</span>
        </label>
        <select id="family-size" class="form-select" required>
          <option value="1" selected>1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5 people</option>
          <option value="6">6 people</option>
          <option value="7">7 people</option>
          <option value="8">8+ people</option>
        </select>
        <small class="form-help">Used for income-driven plan calculations</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="state">
          State of Residence
        </label>
        <select id="state" class="form-select">
          <option value="continental" selected>Continental US</option>
          <option value="alaska">Alaska</option>
          <option value="hawaii">Hawaii</option>
        </select>
        <small class="form-help">Affects poverty guideline calculations</small>
      </div>
      <div class="form-group">
        <label for="income-growth">
          Expected Annual Income Growth
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="income-growth" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="20"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Projected yearly salary increase</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>📋 Repayment Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="repayment-plan">
          Repayment Plan <span class="required">*</span>
        </label>
        <select id="repayment-plan" class="form-select" required>
          <option value="standard" selected>Standard (10-year)</option>
          <option value="graduated">Graduated (10-year)</option>
          <option value="extended-fixed">Extended Fixed (25-year)</option>
          <option value="extended-graduated">Extended Graduated (25-year)</option>
          <option value="ibr">Income-Based (IBR)</option>
          <option value="paye">Pay As You Earn (PAYE)</option>
          <option value="save">SAVE Plan</option>
          <option value="icr">Income-Contingent (ICR)</option>
        </select>
        <small class="form-help" id="plan-description">Fixed payments over 10 years</small>
      </div>
      <div class="form-group">
        <label for="pslf-eligible">
          <input 
            type="checkbox" 
            id="pslf-eligible" 
            class="form-checkbox"
          />
          Pursuing Public Service Loan Forgiveness (PSLF)
        </label>
        <small class="form-help">Work for government or qualifying non-profit</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>💸 Extra Payments (Optional)</h3>
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
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Additional amount paid each month</small>
      </div>
      <div class="form-group">
        <label for="extra-yearly">
          Extra Annual Payment
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
        <small class="form-help">One-time yearly payment (tax refund, bonus)</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Repayment Plan →
  </button>
  
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
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

<div id="student-loan-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🎓 Understanding Student Loan Repayment Plans</h4>
  <p>
    Federal student loans offer multiple repayment options to fit different financial situations. 
    <strong>Standard</strong> plans have fixed payments over 10 years, while <strong>income-driven</strong> plans 
    base payments on your income and family size, with potential forgiveness after 20-25 years.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 Repayment Plans at a Glance</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Standard:</strong> Fixed payments, 10 years, pay least interest overall</li>
    <li><strong>Graduated:</strong> Payments start low, increase every 2 years, 10 years</li>
    <li><strong>Extended:</strong> Lower payments over 25 years (requires $30K+ in loans)</li>
    <li><strong>IBR:</strong> 10-15% of discretionary income, forgiveness after 20-25 years</li>
    <li><strong>PAYE:</strong> 10% of discretionary income, forgiveness after 20 years</li>
    <li><strong>SAVE:</strong> Newest plan, 5-10% of discretionary income, interest benefits</li>
    <li><strong>ICR:</strong> 20% of discretionary income or 12-year fixed, forgiveness after 25 years</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>🏛️ Public Service Loan Forgiveness (PSLF)</h4>
  <p>
    If you work for a government agency or qualifying non-profit organization, you may qualify for 
    <strong>PSLF</strong> after making 120 qualifying payments (10 years) while on an income-driven plan. 
    The remaining balance is forgiven tax-free!
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Student Loan Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Avalanche Method:</strong> Pay minimums on all loans, extra toward highest interest rate</li>
    <li><strong>Snowball Method:</strong> Pay off smallest balances first for psychological wins</li>
    <li><strong>Autopay Discount:</strong> Most servicers offer 0.25% rate reduction for autopay</li>
    <li><strong>Tax Deduction:</strong> Deduct up to $2,500 in student loan interest annually</li>
    <li><strong>Employer Benefits:</strong> Check if your employer offers student loan repayment assistance</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Forgiveness Taxability:</strong> IDR forgiveness may be taxable income (except PSLF)</li>
    <li><strong>Private Loans:</strong> Not eligible for federal income-driven plans or forgiveness</li>
    <li><strong>Refinancing Trade-offs:</strong> Lower rates but lose federal protections and forgiveness options</li>
    <li><strong>Income Recertification:</strong> IDR plans require annual income recertification</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Plan</h4>
  <p>
    Your loan details and repayment plan are automatically saved in the URL. You can <strong>bookmark this page</strong> 
    to save your calculation, or use the <strong>Share button</strong> to send it to a financial advisor or family member.
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

  .loan-row {
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    margin-bottom: var(--space-md);
    position: relative;
    transition: all var(--transition-fast);
  }

  .loan-row:hover {
    border-color: var(--color-light-blue);
  }

  .loan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
  }

  .loan-number {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
  }

  .remove-loan-btn {
    background: transparent;
    border: none;
    color: var(--color-error);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: var(--text-sm);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .remove-loan-btn:hover {
    color: #c62828;
    background: #ffebee;
    border-radius: 4px;
  }

  .add-item-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: var(--space-md);
  }

  .loan-summary-preview {
    display: flex;
    justify-content: space-around;
    margin-top: var(--space-lg);
    padding: var(--space-md);
    background: var(--color-lighter-blue);
    border-radius: var(--border-radius);
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .summary-item {
    text-align: center;
  }

  .summary-item span {
    display: block;
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .summary-item strong {
    font-size: var(--text-xl);
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .form-checkbox {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  /* Result Styles */
  .result-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
  }

  .result-hero.status-good {
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border: 2px solid var(--color-success);
  }

  .result-hero.status-warning {
    background: linear-gradient(135deg, #FFF8E1 0%, #fff 100%);
    border: 2px solid var(--color-warning);
  }

  .result-hero.status-info {
    background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%);
    border: 2px solid var(--color-light-blue);
  }

  .monthly-payment-display {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
    margin: var(--space-md) 0;
  }

  .payment-label {
    font-size: var(--text-lg);
    color: var(--color-gray-dark);
  }

  .payment-sublabel {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    opacity: 0.8;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
    font-size: 1.75rem;
    margin-bottom: var(--space-sm);
  }

  .summary-card-value {
    font-size: var(--text-xl);
    font-weight: 700;
    font-family: var(--font-primary);
    color: var(--color-primary-blue);
    margin-bottom: var(--space-xs);
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .plan-comparison-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .plan-comparison-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: var(--space-md);
  }

  .comparison-table th,
  .comparison-table td {
    padding: var(--space-md);
    text-align: right;
    border-bottom: 1px solid var(--color-gray);
  }

  .comparison-table th:first-child,
  .comparison-table td:first-child {
    text-align: left;
  }

  .comparison-table thead {
    background: var(--color-gray-light);
  }

  .comparison-table .current-plan {
    background: #E3F2FD;
    font-weight: 700;
  }

  .comparison-table .best-value {
    color: var(--color-success);
    font-weight: 700;
  }

  .forgiveness-section {
    background: linear-gradient(135deg, #FFF8E1 0%, #fff 100%);
    border: 2px solid #FFB900;
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .forgiveness-section h4 {
    color: #B8860B;
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .forgiveness-amount {
    font-size: var(--text-3xl);
    font-weight: 800;
    color: var(--color-success);
    text-align: center;
    margin: var(--space-lg) 0;
  }

  .forgiveness-note {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    text-align: center;
    padding: var(--space-md);
    background: rgba(255,255,255,0.5);
    border-radius: var(--border-radius);
  }

  .payoff-chart {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .payoff-chart h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .balance-chart {
    height: 200px;
    display: flex;
    align-items: flex-end;
    gap: 4px;
    padding: var(--space-md) 0;
    border-bottom: 2px solid var(--color-gray);
  }

  .chart-bar {
    flex: 1;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px 4px 0 0;
    transition: height 0.3s ease;
    position: relative;
    min-width: 8px;
    max-width: 40px;
  }

  .chart-bar:hover {
    opacity: 0.8;
  }

  .chart-bar-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-gray-dark);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .chart-bar:hover .chart-bar-tooltip {
    opacity: 1;
  }

  .chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-sm);
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }

  .loan-breakdown-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .loan-breakdown-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .loan-breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-lg);
  }

  .loan-breakdown-card {
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    border-left: 4px solid var(--color-primary-blue);
  }

  .loan-breakdown-card h5 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-md);
    font-size: var(--text-base);
  }

  .loan-breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: var(--space-xs) 0;
    font-size: var(--text-sm);
  }

  .loan-breakdown-item span:first-child {
    color: var(--color-gray-dark);
  }

  .loan-breakdown-item span:last-child {
    font-weight: 600;
    color: var(--color-primary-blue);
  }

  .insights-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .insights-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
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

  .insight-card.insight-tip {
    background: #F3E5F5;
    border-color: #CE93D8;
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

  .schedule-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-top: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .schedule-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
  }

  .schedule-controls {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    flex-wrap: wrap;
  }

  .schedule-table-container {
    overflow-x: auto;
  }

  .amortization-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  .amortization-table thead {
    background: var(--color-gray-light);
  }

  .amortization-table th,
  .amortization-table td {
    padding: var(--space-sm) var(--space-md);
    text-align: right;
    border-bottom: 1px solid var(--color-gray);
    font-size: var(--text-sm);
  }

  .amortization-table th:first-child,
  .amortization-table td:first-child {
    text-align: left;
  }

  .amortization-table .year-row {
    background: #FFF8E1;
    font-weight: 700;
  }

  .text-success { color: var(--color-success); }
  .text-warning { color: var(--color-warning); }
  .text-danger { color: var(--color-error); }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }

    .loan-row {
      padding: var(--space-md);
    }

    .monthly-payment-display {
      font-size: 2.5rem;
    }

    .loan-summary-preview {
      flex-direction: column;
    }

    .comparison-table {
      font-size: var(--text-sm);
    }

    .comparison-table th,
    .comparison-table td {
      padding: var(--space-sm);
    }

    .schedule-controls {
      flex-direction: column;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }

    .remove-loan-btn {
      display: none;
    }

    .add-item-btn {
      display: none;
    }

    .schedule-controls {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/student-loan-calculator.js"></script>
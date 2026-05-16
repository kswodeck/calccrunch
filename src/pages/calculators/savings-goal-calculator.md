---
layout: ../../layouts/CalculatorLayout.astro
calcType: savings-goal
---

## How to Use This Calculator

1. Enter your **target savings amount** (your financial goal)
2. Input your **current savings** balance
3. Set your **monthly contribution** amount
4. Adjust the **expected annual return rate**
5. Choose your **timeline** in years
6. Click **Calculate** to see your savings plan and projections

<div class="calculator-form" id="savings-goal-form">
  <div class="form-section">
    <h3>Your Savings Goal</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="target-amount">
          Target Savings Amount <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="target-amount" 
            class="form-input"
            placeholder="50000"
            value="50000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your financial goal amount</small>
      </div>
      <div class="form-group">
        <label for="current-savings">
          Current Savings
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-savings" 
            class="form-input"
            placeholder="5000"
            value="5000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount you already have saved</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-contribution">
          Monthly Contribution
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-contribution" 
            class="form-input"
            placeholder="500"
            value="500"
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount you plan to save each month</small>
      </div>
      <div class="form-group">
        <label for="annual-return">
          Expected Annual Return <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-return" 
            class="form-input"
            placeholder="6"
            value="6"
            min="0"
            max="30"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected yearly investment return</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="time-years">
          Timeline (Years) <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="time-years" 
            class="form-input"
            placeholder="10"
            value="10"
            min="1"
            max="50"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long you plan to save</small>
      </div>
      <div class="form-group">
        <label for="time-months">
          Additional Months
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="time-months" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            max="11"
          />
          <span class="input-addon">months</span>
        </div>
        <small class="form-help">Additional months beyond full years</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Savings Plan →
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

<div id="savings-goal-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🎯 Setting Effective Savings Goals</h4>
  <p>
    The most successful savers use the <strong>SMART framework</strong> for their goals: 
    Specific, Measurable, Achievable, Relevant, and Time-bound. This calculator helps you 
    determine exactly how much you need to save each month to reach your target.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💡 Tips for Reaching Your Goal Faster</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Automate transfers:</strong> Set up automatic monthly deposits</li>
    <li><strong>Increase gradually:</strong> Boost contributions by 1% each quarter</li>
    <li><strong>Use windfalls:</strong> Direct bonuses and tax refunds to savings</li>
    <li><strong>Cut one expense:</strong> Redirect a subscription or habit cost</li>
    <li><strong>Track progress:</strong> Review monthly to stay motivated</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Understanding Investment Returns</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>High-yield savings (1-5%):</strong> Safe, FDIC insured, best for short-term goals</li>
    <li><strong>Bond funds (3-6%):</strong> Moderate risk, good for 3-5 year goals</li>
    <li><strong>Balanced funds (5-8%):</strong> Mix of stocks and bonds for medium-term goals</li>
    <li><strong>Stock index funds (7-10%):</strong> Higher risk, best for long-term goals (10+ years)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Investment returns are not guaranteed and will fluctuate</li>
    <li>Past performance does not predict future results</li>
    <li>Consider inflation when setting long-term goals</li>
    <li>Maintain an emergency fund before aggressive saving</li>
    <li>Taxes may apply to investment gains</li>
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

  .progress-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-surface-neutral);
    border-radius: 12px;
  }

  .progress-bar-container {
    position: relative;
    width: 100%;
    height: 40px;
    background: var(--color-gray);
    border-radius: 20px;
    overflow: visible;
    margin: 1.5rem 0;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    transition: width 0.8s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
    min-width: 50px;
  }

  .progress-bar-fill.over-target {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  }

  .milestone-markers {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    padding: 0 2px;
  }

  .milestone {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-gray-dark);
  }

  .milestone.reached {
    color: var(--color-success);
    font-weight: bold;
  }

  .milestone-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-gray);
    margin-bottom: 4px;
  }

  .milestone.reached .milestone-dot {
    background: #10b981;
  }

  .savings-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .summary-card {
    padding: 1.25rem;
    background: var(--color-white);
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .summary-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .summary-card .amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-black);
  }

  .summary-card .amount.text-success {
    color: var(--color-success);
  }

  .summary-card .amount.text-primary {
    color: var(--color-light-blue);
  }

  .summary-card .amount.text-warning {
    color: var(--color-warning);
  }

  .summary-card .detail {
    font-size: 0.8rem;
    color: var(--color-gray);
    margin-top: 0.25rem;
  }

  .scenario-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .scenario-card {
    padding: 1.25rem;
    border-radius: 10px;
    border: 2px solid #e5e7eb;
  }

  .scenario-card.conservative {
    border-color: #93c5fd;
    background: var(--color-highlight-blue);
  }

  .scenario-card.moderate {
    border-color: #86efac;
    background: var(--color-highlight-green);
  }

  .scenario-card.aggressive {
    border-color: #fbbf24;
    background: var(--color-highlight-yellow);
  }

  .scenario-card h5 {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
  }

  .scenario-card .scenario-detail {
    font-size: 0.875rem;
    color: var(--color-gray-dark);
    margin: 0.25rem 0;
  }

  .scenario-card .scenario-amount {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .yearly-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .breakdown-table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }

  .breakdown-table {
    width: 100%;
    border-collapse: collapse;
  }

  .breakdown-table thead {
    background: var(--color-surface-neutral);
  }

  .breakdown-table th,
  .breakdown-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }

  .breakdown-table th:first-child,
  .breakdown-table td:first-child {
    text-align: left;
  }

  .breakdown-table .milestone-year {
    background: var(--color-highlight-yellow);
  }

  .needed-monthly {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 12px;
    border: 2px solid #3b82f6;
    text-align: center;
  }

  .needed-monthly h4 {
    margin: 0 0 0.5rem 0;
    color: var(--color-primary-blue);
  }

  .needed-monthly .big-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary-blue);
  }

  .needed-monthly .context {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }

  .gap-indicator {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .gap-indicator.on-track {
    background: var(--color-highlight-green);
    border: 1px solid #86efac;
  }

  .gap-indicator.behind {
    background: var(--color-highlight-red);
    border: 1px solid #fca5a5;
  }

  .gap-indicator.ahead {
    background: var(--color-highlight-blue);
    border: 1px solid #93c5fd;
  }

  .gap-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .savings-summary {
      grid-template-columns: 1fr 1fr;
    }

    .scenario-grid {
      grid-template-columns: 1fr;
    }

    .breakdown-table {
      font-size: 0.875rem;
    }

    .breakdown-table th,
    .breakdown-table td {
      padding: 0.5rem;
    }
  }
</style>

<script src="/scripts/calculators/savings-goal-calculator.js"></script>

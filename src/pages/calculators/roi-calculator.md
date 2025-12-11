---
layout: ../../layouts/CalculatorLayout.astro
title: ROI Calculator
description: Calculate return on investment (ROI) for business investments, marketing campaigns, or projects. See percentage return and payback period.
category: business-sales
tags: ['ROI', 'return on investment', 'investment return']
featured: false
calcType: roi
seoTitle: Free ROI Calculator - Return on Investment Calculator
seoDescription: Calculate ROI for investments and projects. Measure investment returns with our free calculator.
estimatedTime: 2 minutes
difficulty: Easy
---

## How to Use This Calculator

1. **Choose your calculation mode** - Simple for basic ROI, Advanced for detailed analysis
2. **Select your ROI type** - Investment, Marketing Campaign, or Business Project
3. **Enter your costs and returns** - Initial investment, ongoing costs, and expected gains
4. **Set the time period** - For annualized returns and payback analysis
5. Click **Calculate** to see comprehensive ROI metrics and insights

<div class="calculator-form" id="roi-calculator-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="simple">Simple</button>
      <button type="button" class="mode-btn" data-mode="advanced">Advanced</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Simple mode calculates basic ROI. Advanced mode includes annualized returns, payback period, risk analysis, and scenario comparison.
    </small>
  </div>

  <div class="form-section">
    <h3>ROI Type</h3>
    <div class="roi-type-selector">
      <button type="button" class="roi-type-btn active" data-type="investment">
        <span class="roi-type-icon">📈</span>
        <span class="roi-type-label">Investment</span>
        <span class="roi-type-desc">Stocks, bonds, assets</span>
      </button>
      <button type="button" class="roi-type-btn" data-type="marketing">
        <span class="roi-type-icon">📣</span>
        <span class="roi-type-label">Marketing</span>
        <span class="roi-type-desc">Campaigns, ads</span>
      </button>
      <button type="button" class="roi-type-btn" data-type="project">
        <span class="roi-type-icon">🏗️</span>
        <span class="roi-type-label">Project</span>
        <span class="roi-type-desc">Business projects</span>
      </button>
      <button type="button" class="roi-type-btn" data-type="realestate">
        <span class="roi-type-icon">🏠</span>
        <span class="roi-type-label">Real Estate</span>
        <span class="roi-type-desc">Property investment</span>
      </button>
    </div>
  </div>

  <div class="form-section">
    <h3>Investment Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="investment-name">
          Investment/Project Name
          <span class="tooltip" title="Name or description of your investment">?</span>
        </label>
        <input 
          type="text" 
          id="investment-name" 
          class="form-input"
          placeholder="e.g., Stock Portfolio, Q4 Campaign"
          value=""
        />
        <small class="form-help">Optional identifier</small>
      </div>
      <div class="form-group">
        <label for="time-period">
          Time Period <span class="required">*</span>
          <span class="tooltip" title="Duration of the investment">?</span>
        </label>
        <div class="time-period-inputs">
          <input 
            type="number" 
            id="time-period-value" 
            class="form-input"
            placeholder="1"
            value="1"
            min="1"
            max="100"
            step="1"
          />
          <select id="time-period-unit" class="form-select">
            <option value="months">Months</option>
            <option value="years" selected>Years</option>
          </select>
        </div>
        <small class="form-help">Investment duration</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Costs & Investment</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="initial-investment">
          Initial Investment <span class="required">*</span>
          <span class="tooltip" title="Upfront cost or capital invested">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="initial-investment" 
            class="form-input"
            placeholder="10000"
            value=""
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Upfront cost or purchase price</small>
      </div>
      <div class="form-group">
        <label for="additional-costs">
          Additional Costs
          <span class="tooltip" title="Ongoing or one-time additional expenses">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="additional-costs" 
            class="form-input"
            placeholder="0"
            value=""
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Fees, maintenance, operating costs</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Returns & Gains</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="final-value">
          <span id="return-label">Final Value / Revenue</span> <span class="required">*</span>
          <span class="tooltip" title="Total value or revenue at end of period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="final-value" 
            class="form-input"
            placeholder="15000"
            value=""
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help" id="return-help">Final value or total revenue generated</small>
      </div>
      <div class="form-group">
        <label for="recurring-income">
          Recurring Income (Optional)
          <span class="tooltip" title="Regular income like dividends or rent">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="recurring-income" 
            class="form-input"
            placeholder="0"
            value=""
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <div class="recurring-frequency">
          <select id="recurring-frequency" class="form-select">
            <option value="monthly">per month</option>
            <option value="quarterly">per quarter</option>
            <option value="annually" selected>per year</option>
          </select>
        </div>
        <small class="form-help">Dividends, rent, or periodic returns</small>
      </div>
    </div>
  </div>

  <!-- Marketing-specific fields -->
  <div class="form-section marketing-section hidden">
    <h3>Campaign Metrics</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="leads-generated">
          Leads/Conversions Generated
          <span class="tooltip" title="Number of leads or conversions from campaign">?</span>
        </label>
        <input 
          type="number" 
          id="leads-generated" 
          class="form-input"
          placeholder="100"
          value=""
          min="0"
          step="1"
        />
        <small class="form-help">Total leads or conversions</small>
      </div>
      <div class="form-group">
        <label for="conversion-rate">
          Conversion Rate
          <span class="tooltip" title="Percentage of leads that convert to customers">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="conversion-rate" 
            class="form-input"
            placeholder="5"
            value=""
            min="0"
            max="100"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Lead to customer conversion</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="customer-ltv">
          Customer Lifetime Value
          <span class="tooltip" title="Average revenue per customer over their lifetime">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="customer-ltv" 
            class="form-input"
            placeholder="500"
            value=""
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Average LTV per customer</small>
      </div>
      <div class="form-group">
        <label for="cost-per-lead">
          Cost Per Lead/Acquisition
          <span class="tooltip" title="Marketing spend divided by leads">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="cost-per-lead" 
            class="form-input"
            placeholder="50"
            value=""
            min="0"
            step="1"
            disabled
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Auto-calculated from inputs</small>
      </div>
    </div>
  </div>

  <!-- Real Estate-specific fields -->
  <div class="form-section realestate-section hidden">
    <h3>Property Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-rent">
          Monthly Rental Income
          <span class="tooltip" title="Expected monthly rent">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-rent" 
            class="form-input"
            placeholder="1500"
            value=""
            min="0"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Gross monthly rent</small>
      </div>
      <div class="form-group">
        <label for="vacancy-rate">
          Vacancy Rate
          <span class="tooltip" title="Expected vacancy percentage">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="vacancy-rate" 
            class="form-input"
            placeholder="5"
            value="5"
            min="0"
            max="100"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Average vacancy rate</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-expenses">
          Annual Operating Expenses
          <span class="tooltip" title="Property taxes, insurance, maintenance, etc.">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-expenses" 
            class="form-input"
            placeholder="5000"
            value=""
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Taxes, insurance, maintenance</small>
      </div>
      <div class="form-group">
        <label for="appreciation-rate">
          Expected Appreciation
          <span class="tooltip" title="Annual property value increase">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="appreciation-rate" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="50"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Annual appreciation rate</small>
      </div>
    </div>
  </div>

  <!-- Advanced: Risk & Comparison -->
  <div class="form-section advanced-section hidden">
    <h3>Risk & Comparison Analysis</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="risk-free-rate">
          Risk-Free Rate
          <span class="tooltip" title="Benchmark return (e.g., Treasury bonds)">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="risk-free-rate" 
            class="form-input"
            placeholder="4.5"
            value="4.5"
            min="0"
            max="20"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">For excess return calculation</small>
      </div>
      <div class="form-group">
        <label for="inflation-rate">
          Expected Inflation
          <span class="tooltip" title="Annual inflation rate for real return">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="inflation-rate" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            max="20"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">For inflation-adjusted returns</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="alternative-investment">
          Alternative Investment Return
          <span class="tooltip" title="Return from alternative investment option">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="alternative-investment" 
            class="form-input"
            placeholder="7"
            value=""
            min="0"
            max="100"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Compare to S&P 500 avg (10%)</small>
      </div>
      <div class="form-group">
        <label for="target-roi">
          Target ROI
          <span class="tooltip" title="Your minimum acceptable return">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="target-roi" 
            class="form-input"
            placeholder="15"
            value=""
            min="0"
            max="1000"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Minimum acceptable ROI</small>
      </div>
    </div>
  </div>

  <!-- Advanced: Scenario Analysis -->
  <div class="form-section advanced-section hidden">
    <h3>Scenario Analysis (Optional)</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Model best, expected, and worst case scenarios</p>
    <div class="scenario-grid">
      <div class="scenario-column">
        <h4 style="color: #ef4444;">🔻 Worst Case</h4>
        <div class="form-group">
          <label for="worst-return">Final Value</label>
          <div class="input-group">
            <input type="number" id="worst-return" class="form-input" placeholder="8000" value="" min="0" step="100" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="worst-probability">Probability</label>
          <div class="input-group">
            <input type="number" id="worst-probability" class="form-input" placeholder="20" value="" min="0" max="100" step="5" />
            <span class="input-addon">%</span>
          </div>
        </div>
      </div>
      <div class="scenario-column expected">
        <h4 style="color: #3b82f6;">📊 Expected</h4>
        <div class="form-group">
          <label for="expected-return">Final Value</label>
          <div class="input-group">
            <input type="number" id="expected-return" class="form-input" placeholder="15000" value="" min="0" step="100" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="expected-probability">Probability</label>
          <div class="input-group">
            <input type="number" id="expected-probability" class="form-input" placeholder="60" value="" min="0" max="100" step="5" />
            <span class="input-addon">%</span>
          </div>
        </div>
      </div>
      <div class="scenario-column">
        <h4 style="color: #10b981;">🔺 Best Case</h4>
        <div class="form-group">
          <label for="best-return">Final Value</label>
          <div class="input-group">
            <input type="number" id="best-return" class="form-input" placeholder="25000" value="" min="0" step="100" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="best-probability">Probability</label>
          <div class="input-group">
            <input type="number" id="best-probability" class="form-input" placeholder="20" value="" min="0" max="100" step="5" />
            <span class="input-addon">%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Entry / Comparison -->
  <div class="form-section">
    <h3>Compare Multiple Investments</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Add additional investments to compare ROI side-by-side</p>
    <div id="comparison-container">
      <!-- Comparison rows will be added here dynamically -->
    </div>
    <button type="button" id="add-comparison-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Investment to Compare
    </button>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate ROI →
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
    <button type="button" id="reset-form" class="btn btn-secondary" title="Reset to defaults">
      ↺ Reset
    </button>
  </div>
</div>

<div id="roi-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 What Is ROI (Return on Investment)?</h4>
  <p>
    <strong>Return on Investment (ROI)</strong> measures the profitability of an investment relative to its cost. 
    It's expressed as a percentage and helps compare the efficiency of different investments.
    The basic formula is: <strong>ROI = (Gain - Cost) / Cost × 100</strong>
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>💰 ROI Formulas Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Basic ROI:</strong> (Final Value - Initial Cost) / Initial Cost × 100</li>
    <li><strong>Annualized ROI:</strong> ((1 + ROI)^(1/years) - 1) × 100 - Shows yearly equivalent return</li>
    <li><strong>CAGR:</strong> (Final/Initial)^(1/years) - 1 - Compound Annual Growth Rate</li>
    <li><strong>Real ROI:</strong> Nominal ROI adjusted for inflation</li>
    <li><strong>Cash-on-Cash:</strong> Annual Cash Flow / Total Cash Invested (for real estate)</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📈 Understanding Your Results</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Total ROI:</strong> Your overall return as a percentage of investment</li>
    <li><strong>Annualized ROI:</strong> Yearly return rate for comparison across time periods</li>
    <li><strong>Payback Period:</strong> Time needed to recover your initial investment</li>
    <li><strong>Net Gain:</strong> Total profit in dollars after all costs</li>
    <li><strong>Risk-Adjusted Return:</strong> Return compared to risk-free alternatives</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 ROI Benchmarks by Investment Type</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Stock Market (S&P 500):</strong> ~10% average annual return (7% after inflation)</li>
    <li><strong>Real Estate:</strong> 8-12% including appreciation and rental income</li>
    <li><strong>Bonds:</strong> 4-6% for investment-grade bonds</li>
    <li><strong>Marketing Campaigns:</strong> 5:1 revenue-to-cost ratio is considered good (400% ROI)</li>
    <li><strong>Business Projects:</strong> 15-25% ROI typically required for approval</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Time Value of Money:</strong> $100 today is worth more than $100 in 5 years</li>
    <li><strong>Risk vs Return:</strong> Higher returns usually mean higher risk</li>
    <li><strong>Hidden Costs:</strong> Include all fees, taxes, and opportunity costs</li>
    <li><strong>Liquidity:</strong> Some investments are harder to sell quickly</li>
    <li><strong>Past Performance:</strong> Doesn't guarantee future results</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your ROI analysis, 
    or use the <strong>Share button</strong> to send it to colleagues or advisors. All values will be restored automatically.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .mode-toggle {
    display: flex;
    gap: 0;
    background: var(--color-gray);
    padding: 4px;
    border-radius: var(--border-radius);
    max-width: 400px;
    margin: 0 auto;
  }

  .mode-btn {
    flex: 1;
    padding: var(--space-md) var(--space-lg);
    border: none;
    background: transparent;
    color: var(--color-gray-dark);
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .mode-btn:hover {
    background: var(--color-white);
    color: var(--color-primary-blue);
  }

  .mode-btn.active {
    background: var(--color-accent-orange);
    color: var(--color-white);
    box-shadow: var(--shadow-sm);
  }

  .roi-type-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .roi-type-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem 1rem;
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .roi-type-btn:hover {
    border-color: var(--color-accent-orange);
    transform: translateY(-2px);
  }

  .roi-type-btn.active {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #fff8f5 0%, #fff 100%);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
  }

  .roi-type-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .roi-type-label {
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: 0.95rem;
  }

  .roi-type-desc {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }

  .time-period-inputs {
    display: flex;
    gap: 0.5rem;
  }

  .time-period-inputs .form-input {
    flex: 1;
  }

  .time-period-inputs .form-select {
    flex: 1;
  }

  .recurring-frequency {
    margin-top: 0.5rem;
  }

  .recurring-frequency .form-select {
    width: 100%;
  }

  .advanced-section,
  .marketing-section,
  .realestate-section {
    transition: all 0.3s ease;
  }

  .advanced-section.hidden,
  .marketing-section.hidden,
  .realestate-section.hidden {
    display: none;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .scenario-column {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: var(--border-radius);
    border: 2px solid #e5e7eb;
  }

  .scenario-column.expected {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .scenario-column h4 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .comparison-row {
    background: #f8f9fa;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    position: relative;
  }

  .comparison-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .comparison-number {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
  }

  .remove-comparison-btn {
    background: transparent;
    border: none;
    color: var(--color-error);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .remove-comparison-btn:hover {
    color: #c62828;
    background: #ffebee;
    border-radius: 4px;
  }

  #add-comparison-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  /* Result Styles */
  .roi-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .roi-card {
    background: white;
    border-radius: 12px;
    padding: 1.25rem;
    text-align: center;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
  }

  .roi-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .roi-card.highlight {
    background: linear-gradient(135deg, #fff8dc 0%, #fffef0 100%);
    border-color: var(--color-accent-orange);
  }

  .roi-card.positive {
    border-color: #86efac;
    background: linear-gradient(135deg, #f0fdf4 0%, #fff 100%);
  }

  .roi-card.negative {
    border-color: #fca5a5;
    background: linear-gradient(135deg, #fef2f2 0%, #fff 100%);
  }

  .roi-card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .roi-card-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .roi-card-value.positive {
    color: var(--color-success);
  }

  .roi-card-value.negative {
    color: var(--color-error);
  }

  .roi-card-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ROI Gauge */
  .roi-gauge-container {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .roi-gauge {
    position: relative;
    width: 200px;
    height: 100px;
    margin: 0 auto;
    overflow: hidden;
  }

  .roi-gauge-bg {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      #ef4444 0deg 60deg,
      #f59e0b 60deg 120deg,
      #10b981 120deg 180deg
    );
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  }

  .roi-gauge-center {
    position: absolute;
    width: 140px;
    height: 140px;
    background: white;
    border-radius: 50%;
    top: 30px;
    left: 30px;
  }

  .roi-gauge-value {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-primary-blue);
  }

  .roi-gauge-needle {
    position: absolute;
    width: 4px;
    height: 70px;
    background: var(--color-gray-dark);
    bottom: 0;
    left: 50%;
    transform-origin: bottom center;
    transform: translateX(-50%) rotate(0deg);
    border-radius: 2px;
    transition: transform 0.5s ease;
  }

  /* Timeline Chart */
  .timeline-chart {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #e5e7eb;
  }

  .timeline-bars {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 2px solid #e5e7eb;
  }

  .timeline-bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .timeline-bar {
    width: 100%;
    max-width: 60px;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0.5rem;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .timeline-bar.investment {
    background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
  }

  .timeline-bar.return {
    background: linear-gradient(180deg, #10b981 0%, #059669 100%);
  }

  .timeline-label {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }

  /* Comparison Table */
  .comparison-table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
  }

  .comparison-table thead {
    background: #374151;
    color: white;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 1rem;
    text-align: right;
  }

  .comparison-table th:first-child,
  .comparison-table td:first-child {
    text-align: left;
  }

  .comparison-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-table tbody tr:hover {
    background: #f9fafb;
  }

  .comparison-table .best-value {
    background: #f0fdf4;
    font-weight: 700;
    color: #10b981;
  }

  /* Scenario Analysis Results */
  .scenario-results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .scenario-result-card {
    padding: 1.25rem;
    border-radius: 12px;
    text-align: center;
  }

  .scenario-result-card.worst {
    background: linear-gradient(135deg, #fef2f2 0%, #fff 100%);
    border: 2px solid #fca5a5;
  }

  .scenario-result-card.expected {
    background: linear-gradient(135deg, #eff6ff 0%, #fff 100%);
    border: 2px solid #93c5fd;
  }

  .scenario-result-card.best {
    background: linear-gradient(135deg, #f0fdf4 0%, #fff 100%);
    border: 2px solid #86efac;
  }

  .scenario-label {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .scenario-roi {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .scenario-value {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
  }

  /* Insights */
  .roi-insights {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

  .insight-card.insight-success {
    background: #f0fdf4;
    border-color: #86efac;
  }

  .insight-card.insight-info {
    background: #eff6ff;
    border-color: #93c5fd;
  }

  .insight-card.insight-warning {
    background: #fef3c7;
    border-color: #fcd34d;
  }

  .insight-card.insight-danger {
    background: #fef2f2;
    border-color: #fca5a5;
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

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }

    .roi-type-selector {
      grid-template-columns: repeat(2, 1fr);
    }

    .scenario-grid {
      grid-template-columns: 1fr;
    }

    .scenario-results {
      grid-template-columns: 1fr;
    }

    .roi-summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .mode-toggle {
      max-width: 100%;
    }

    .comparison-row {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .roi-summary-cards {
      grid-template-columns: 1fr;
    }

    .roi-type-selector {
      grid-template-columns: 1fr;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }

    .remove-comparison-btn {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/roi-calculator.js"></script>
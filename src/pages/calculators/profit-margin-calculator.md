---
layout: ../../layouts/CalculatorLayout.astro
calcType: profit-margin
---

## How to Use This Calculator

1. Choose your **calculation mode** (simple or advanced)
2. Enter your **revenue** or **selling price**
3. Input your **cost of goods sold (COGS)**
4. Add **operating expenses** for net profit calculations (optional)
5. Include **taxes** for after-tax profit analysis (optional)
6. Click **Calculate** to see your profit margins and insights

<div class="calculator-form" id="profit-margin-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="simple">Simple</button>
      <button type="button" class="mode-btn" data-mode="advanced">Advanced</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Simple mode calculates basic margins. Advanced mode includes operating expenses, taxes, and more detailed analysis.
    </small>
  </div>

  <div class="form-section">
    <h3>Revenue & Cost</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="revenue">
          Revenue / Selling Price <span class="required">*</span>
          <span class="tooltip" title="Total income from sales before any deductions">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="revenue" 
            class="form-input"
            placeholder="100000"
            value="100000"
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Total sales income or selling price per unit</small>
      </div>
      <div class="form-group">
        <label for="revenue-frequency">
          Revenue Frequency <span class="required">*</span>
          <span class="tooltip" title="Time period for revenue and cost amounts">?</span>
        </label>
        <select id="revenue-frequency" class="form-select" required>
          <option value="365">Daily</option>
          <option value="52">Weekly</option>
          <option value="26">Bi-Weekly</option>
          <option value="12" selected>Monthly</option>
          <option value="4">Quarterly</option>
          <option value="1">Annually</option>
        </select>
        <small class="form-help">Applies to Revenue, COGS, and Other Income</small>
      </div>
      <div class="form-group">
        <label for="units-sold">
          Units (Optional)
          <span class="tooltip" title="Number of units for per-unit calculations">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="units-sold" 
            class="form-input"
            placeholder="1000"
            value=""
            min="1"
            step="1"
          />
        <span class="input-addon">units</span>
      </div>
      <small class="form-help">For per-unit profit calculations</small>
    </div>
      <div class="form-group">
        <label for="cogs">
          Cost of Goods Sold (COGS) <span class="required">*</span>
          <span class="tooltip" title="Direct costs to produce goods/services sold">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="cogs" 
            class="form-input"
            placeholder="60000"
            value="60000"
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Direct production costs (materials, labor, etc.)</small>
      </div>
      <div class="form-group">
        <label for="other-income">
          Other Income
          <span class="tooltip" title="Non-operating income like interest, investments">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="other-income" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Interest income, investment gains, etc.</small>
      </div>
  </div>

  <div class="form-section advanced-section hidden" style="padding: var(--space-xl) 0;">
    <h3>Operating Expenses</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="operating-expenses">
          Operating Expenses
          <span class="tooltip" title="Indirect business costs like rent, utilities, salaries">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="operating-expenses" 
            class="form-input"
            placeholder="15000"
            value="15000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Rent, utilities, salaries, marketing, etc.</small>
      </div>
      <div class="form-group">
        <label for="expenses-frequency">
          Expenses Frequency
          <span class="tooltip" title="Time period for operating expenses">?</span>
        </label>
        <select id="expenses-frequency" class="form-select">
          <option value="365">Daily</option>
          <option value="52">Weekly</option>
          <option value="26">Bi-Weekly</option>
          <option value="12" selected>Monthly</option>
          <option value="4">Quarterly</option>
          <option value="1">Annually</option>
        </select>
        <small class="form-help">Applies to Operating Expenses only</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="interest-expense">
          Interest Expense
          <span class="tooltip" title="Cost of debt and loan interest payments">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-expense" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Loan interest, credit costs (same frequency as expenses)</small>
      </div>
      <div class="form-group">
        <label for="depreciation">
          Depreciation & Amortization
          <span class="tooltip" title="Non-cash expense for asset value reduction">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="depreciation" 
            class="form-input"
            placeholder="3000"
            value="3000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Equipment, software depreciation (same frequency as expenses)</small>
      </div>
    </div>
  </div>

  <div class="form-section advanced-section hidden"  style="padding: var(--space-xl) 0;">
    <h3>Taxes</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="tax-rate">
          Tax Rate
          <span class="tooltip" title="Corporate or business income tax rate">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="tax-rate" 
            class="form-input"
            placeholder="21"
            value="21"
            min="0"
            max="100"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Federal + state corporate tax rate</small>
      </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Quick Scenarios (Optional)</h3>
    <div class="scenario-buttons">
      <button type="button" class="scenario-btn" data-scenario="retail">🛒 Retail</button>
      <button type="button" class="scenario-btn" data-scenario="software">💻 SaaS/Software</button>
      <button type="button" class="scenario-btn" data-scenario="manufacturing">🏭 Manufacturing</button>
      <button type="button" class="scenario-btn" data-scenario="service">🔧 Service Business</button>
      <button type="button" class="scenario-btn" data-scenario="restaurant">🍽️ Restaurant</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Load industry-typical values to compare against benchmarks
    </small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Profit Margins →
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

<div id="profit-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 Understanding Profit Margin</h4>
  <p>
    <strong>Profit margin</strong> measures how much of each dollar of revenue a business keeps as profit. 
    It's one of the most important metrics for evaluating business health and comparing companies within the same industry.
    Higher margins typically indicate better cost control and pricing power.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>💰 Key Profitability Metrics Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Gross Profit Margin:</strong> (Revenue - COGS) ÷ Revenue × 100. Shows profitability after direct costs.</li>
    <li><strong>Operating Margin:</strong> Operating Income ÷ Revenue × 100. Shows profitability from core operations.</li>
    <li><strong>Net Profit Margin:</strong> Net Income ÷ Revenue × 100. The "bottom line" after all expenses and taxes.</li>
    <li><strong>Markup:</strong> (Selling Price - Cost) ÷ Cost × 100. The percentage added to cost to get selling price.</li>
    <li><strong>EBITDA Margin:</strong> Earnings Before Interest, Taxes, Depreciation & Amortization ÷ Revenue × 100.</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚖️ Margin vs Markup: Key Difference</h4>
  <p>
    <strong>Margin</strong> is based on revenue (selling price), while <strong>Markup</strong> is based on cost.
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Example:</strong> Buy for $60, sell for $100</li>
    <li><strong>Margin:</strong> $40 ÷ $100 = 40% margin</li>
    <li><strong>Markup:</strong> $40 ÷ $60 = 66.67% markup</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Pro Tip:</strong> A 50% margin equals a 100% markup. A 33% margin equals a 50% markup.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>📈 Industry Benchmark Profit Margins</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Software/SaaS:</strong> 70-85% gross, 15-25% net</li>
    <li><strong>Retail:</strong> 25-50% gross, 2-5% net</li>
    <li><strong>Manufacturing:</strong> 25-35% gross, 5-10% net</li>
    <li><strong>Restaurants:</strong> 60-70% gross, 3-9% net</li>
    <li><strong>Professional Services:</strong> 50-70% gross, 10-20% net</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Note:</strong> Benchmarks vary significantly by sub-industry and business model.
  </p>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>High revenue with low margins may still be less profitable than low revenue with high margins</li>
    <li>Margins should be compared within the same industry - cross-industry comparisons are misleading</li>
    <li>Seasonal businesses may have varying margins throughout the year</li>
    <li>One-time expenses or income can distort margin calculations</li>
    <li>Gross margin doesn't account for overhead - always consider net margin too</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to partners, accountants, or team members. All values will be restored automatically.
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
  
  .time-period-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  
  .time-period-tab {
    padding: 0.5rem 1rem;
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .time-period-tab:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }
  
  .time-period-tab.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: white;
  }
  
  .frequency-badge {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    margin-left: 0.5rem;
    vertical-align: middle;
  }
  
  .frequency-note-inline {
    font-size: 0.75rem;
    color: #6b7280;
    font-style: italic;
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
  
  .advanced-section {
    transition: all 0.3s ease;
  }
  
  .advanced-section.hidden {
    display: none;
  }
  
  .scenario-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-content: center;
  }
  
  .scenario-btn {
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    color: var(--color-gray-dark);
    font-size: var(--text-sm);
    font-weight: 600;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .scenario-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
    transform: translateY(-2px);
  }
  
  .scenario-btn.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: var(--color-white);
  }
  
  /* Results Styling */
  .profit-status {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .profit-status.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .profit-status.status-good {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .profit-status.status-moderate {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .profit-status.status-poor {
    background: #fef2f2;
    border-left-color: #ef4444;
  }
  
  .profit-status.status-loss {
    background: #fef2f2;
    border-left-color: #dc2626;
  }
  
  .margin-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .margin-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #e5e7eb;
    transition: all 0.3s ease;
  }
  
  .margin-card:hover {
    border-color: var(--color-accent-orange);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .margin-card.highlight {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%);
  }
  
  .margin-card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .margin-card-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }
  
  .margin-card-value.positive {
    color: #10b981;
  }
  
  .margin-card-value.negative {
    color: #ef4444;
  }
  
  .margin-card-label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
  
  .margin-card-amount {
    font-size: 0.875rem;
    color: #374151;
    font-weight: 600;
    margin-top: 0.25rem;
  }
  
  /* Waterfall Chart */
  .waterfall-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .waterfall-bar-container {
    margin: 1.5rem 0;
  }
  
  .waterfall-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  
  .waterfall-label {
    width: 140px;
    font-weight: 600;
    font-size: 0.875rem;
    color: #374151;
    flex-shrink: 0;
  }
  
  .waterfall-bar-wrapper {
    flex: 1;
    height: 36px;
    background: #e5e7eb;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  
  .waterfall-bar {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.75rem;
    transition: width 0.5s ease;
  }
  
  .waterfall-bar.revenue {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  }
  
  .waterfall-bar.cogs {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
  
  .waterfall-bar.gross {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  
  .waterfall-bar.opex {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
  
  .waterfall-bar.operating {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  }
  
  .waterfall-bar.net {
    background: linear-gradient(135deg, #10b981 0%, #047857 100%);
  }
  
  .waterfall-bar.loss {
    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  }
  
  .waterfall-value {
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  /* Margin Comparison */
  .margin-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .comparison-bars {
    margin-top: 1rem;
  }
  
  .comparison-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  
  .comparison-label {
    width: 120px;
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
  
  .comparison-bar-wrapper {
    flex: 1;
    height: 28px;
    background: #f3f4f6;
    border-radius: 14px;
    overflow: hidden;
  }
  
  .comparison-bar {
    height: 100%;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    transition: width 0.5s ease;
  }
  
  .comparison-bar.gross-bar {
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  }
  
  .comparison-bar.operating-bar {
    background: linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%);
  }
  
  .comparison-bar.net-bar {
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }
  
  .comparison-bar.negative-bar {
    background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
  }
  
  .comparison-percent {
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  /* Breakdown Table */
  .profit-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .breakdown-table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }
  
  .profit-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .profit-table thead {
    background: #374151;
    color: white;
  }
  
  .profit-table th,
  .profit-table td {
    padding: 0.75rem 1rem;
    text-align: right;
  }
  
  .profit-table th:first-child,
  .profit-table td:first-child {
    text-align: left;
  }
  
  .profit-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }
  
  .profit-table tbody tr:hover {
    background: #f9fafb;
  }
  
  .profit-table .total-row {
    background: #f0fdf4;
    font-weight: 700;
  }
  
  .profit-table .subtotal-row {
    background: #f8f9fa;
    font-weight: 600;
  }
  
  .profit-table .expense-row td:first-child {
    padding-left: 2rem;
  }
  
  /* Insights */
  .profit-insights {
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
  
  /* Pricing Scenarios */
  .pricing-scenarios {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .scenarios-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .scenarios-table thead {
    background: #374151;
    color: white;
  }
  
  .scenarios-table th,
  .scenarios-table td {
    padding: 0.75rem;
    text-align: right;
  }
  
  .scenarios-table th:first-child,
  .scenarios-table td:first-child {
    text-align: left;
  }
  
  .scenarios-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }
  
  .scenarios-table .current-row {
    background: #fef3c7;
    font-weight: 600;
  }
  
  .scenarios-table .improvement-positive {
    color: #10b981;
  }
  
  .scenarios-table .improvement-negative {
    color: #ef4444;
  }
  
  /* Utility Classes */
  .text-success { color: #10b981; }
  .text-danger { color: #ef4444; }
  .text-muted { color: #6b7280; }
  .font-bold { font-weight: bold; }
  
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: #f59e0b;
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
  
  .badge-success {
    background: #10b981;
  }
  
  .badge-danger {
    background: #ef4444;
  }
  
  @media (max-width: 768px) {
    .margin-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .margin-card {
      padding: 1rem;
    }
    
    .margin-card-value {
      font-size: 1.5rem;
    }
    
    .waterfall-label,
    .comparison-label {
      width: 100px;
      font-size: 0.75rem;
    }
    
    .scenario-buttons {
      gap: var(--space-xs);
    }
    
    .scenario-btn {
      padding: var(--space-xs) var(--space-sm);
      font-size: var(--text-xs);
    }
    
    .mode-toggle {
      max-width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .margin-cards {
      grid-template-columns: 1fr;
    }
    
    .waterfall-row,
    .comparison-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .waterfall-label,
    .comparison-label {
      width: 100%;
    }
    
    .waterfall-bar-wrapper,
    .comparison-bar-wrapper {
      width: 100%;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
    
    .scenario-buttons {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/profit-margin-calculator.js"></script>
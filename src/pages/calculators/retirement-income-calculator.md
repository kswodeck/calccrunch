---
layout: ../../layouts/CalculatorLayout.astro
title: Retirement Income Calculator
description: Plan your retirement income and see how long your savings will last. Calculate sustainable withdrawal rates, account for inflation, and visualize your retirement portfolio over time.
category: financial
tags: ['retirement', 'income', 'withdrawal', '4% rule', 'retirement planning']
featured: true
calcType: retirement-income
seoTitle: Free Retirement Income Calculator - Withdrawal & Drawdown Planner
seoDescription: Calculate how long your retirement savings will last. Plan sustainable withdrawals with our free retirement income calculator.
estimatedTime: 4 minutes
difficulty: Medium
---

## How to Use This Calculator

1. Enter your **current retirement savings**
2. Set your **desired annual withdrawal** amount
3. Input your **expected investment return rate**
4. Add **inflation rate** for realistic planning
5. Choose your **retirement timeline** (years)
6. Click **Calculate** to see if your money will last

<div class="calculator-form" id="retirement-calculator-form">
  <div class="form-section">
    <h3>Your Retirement Savings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="retirement-savings">
          Current Retirement Balance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="retirement-savings" 
            class="form-input"
            placeholder="1000000"
            value="1000000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Total savings available for retirement</small>
      </div>
      <div class="form-group">
        <label for="current-age">
          Current Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-age" 
            class="form-input"
            placeholder="65"
            value="65"
            min="50"
            max="90"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Your age at retirement start</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Income & Withdrawal Strategy</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="withdrawal-strategy">
          Withdrawal Strategy <span class="required">*</span>
        </label>
        <select id="withdrawal-strategy" class="form-select" required>
          <option value="fixed-dollar" selected>Fixed Dollar Amount</option>
          <option value="percentage">Percentage of Balance</option>
          <option value="inflation-adjusted">Inflation-Adjusted (4% Rule)</option>
        </select>
        <small class="form-help">How to calculate withdrawals</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-withdrawal">
          Annual Withdrawal <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-withdrawal" 
            class="form-input"
            placeholder="40000"
            value="40000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon" id="withdrawal-unit">$</span>
        </div>
        <small class="form-help" id="withdrawal-help">Amount withdrawn each year</small>
      </div>
      <div class="form-group">
        <label for="additional-income">
          Additional Annual Income
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="additional-income" 
            class="form-input"
            placeholder="24000"
            value="0"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Social Security, pension, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Investment & Economic Assumptions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="return-rate">
          Expected Annual Return <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="return-rate" 
            class="form-input"
            placeholder="9"
            value="9"
            min="0"
            max="1000"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Average annual portfolio return</small>
      </div>
      <div class="form-group">
        <label for="inflation-rate">
          Expected Inflation Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="inflation-rate" 
            class="form-input"
            placeholder="3"
            value="3"
            max="100"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Annual cost of living increase</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="retirement-years">
          Years in Retirement <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="retirement-years" 
            class="form-input"
            placeholder="30"
            value="30"
            min="5"
            max="50"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long to plan for</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Retirement Income →
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

<div id="retirement-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🏖️ Understanding Retirement Income Planning</h4>
  <p>
    Retirement income planning helps you determine if your savings will last throughout retirement. 
    The key is balancing withdrawals (spending) with investment growth, while accounting for inflation 
    that erodes purchasing power over time.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 The 4% Rule Explained</h4>
  <p>
    The <strong>4% Rule</strong> is a popular retirement withdrawal strategy:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Withdraw 4% of your starting balance in year 1</li>
    <li>Increase the dollar amount by inflation each subsequent year</li>
    <li>Historically has a 95% success rate over 30 years</li>
    <li>Based on a 50/50 stock/bond portfolio</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Example:</strong> With $1M saved, you'd withdraw $40,000 in year 1, 
    $41,200 in year 2 (adjusted for 3% inflation), and so on.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚖️ Withdrawal Strategies Compared</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Fixed Dollar:</strong> Same amount every year (no inflation adjustment) - simplest but loses purchasing power</li>
    <li><strong>Percentage of Balance:</strong> Withdraw X% each year based on current balance - adapts to market changes</li>
    <li><strong>Inflation-Adjusted (4% Rule):</strong> Start at 4%, increase by inflation - maintains purchasing power</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Retirement Income Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start conservative:</strong> It's easier to spend more later than to recover from overspending</li>
    <li><strong>Consider all income sources:</strong> Social Security, pensions, part-time work</li>
    <li><strong>Adjust as you go:</strong> Review annually and adjust withdrawals based on performance</li>
    <li><strong>Keep some stocks:</strong> Need growth to combat inflation over 20-30 years</li>
    <li><strong>Have a buffer:</strong> Emergency fund separate from investment portfolio</li>
    <li><strong>Delay Social Security:</strong> Every year you wait increases benefits by ~8%</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>This calculator assumes consistent returns - real markets fluctuate</li>
    <li>Sequence of returns risk: Poor returns early in retirement are most damaging</li>
    <li>Healthcare costs often increase faster than general inflation</li>
    <li>Required Minimum Distributions (RMDs) start at age 73 for traditional IRAs</li>
    <li>Taxes can significantly impact withdrawal amounts</li>
    <li>Long-term care expenses not included in typical budgets</li>
    <li>Consider working with a financial advisor for personalized planning</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Retirement Plan</h4>
  <p>
    Your retirement plan is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to your spouse or financial advisor. All values will be restored automatically.
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
  
  .retirement-status {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .retirement-status.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .retirement-status.status-conservative {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .retirement-status.status-moderate {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .retirement-status.status-risky {
    background: #fef3c7;
    border-left-color: #f97316;
  }
  
  .retirement-status.status-poor {
    background: #fef2f2;
    border-left-color: #ef4444;
  }
  
  .balance-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .balance-chart {
    margin: 1.5rem 0;
    position: relative;
  }
  
  .chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .legend-line {
    width: 30px;
    height: 3px;
    background: #6366f1;
  }
  
  .legend-line.dashed {
    background: repeating-linear-gradient(
      to right,
      #9ca3af,
      #9ca3af 5px,
      transparent 5px,
      transparent 10px
    );
  }
  
  .income-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .income-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .income-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .income-section h5 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  .projection-table {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .table-controls {
    margin: 1rem 0;
  }
  
  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }
  
  table.projection-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table.projection-table thead {
    background: #f8f9fa;
  }
  
  table.projection-table th,
  table.projection-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }
  
  table.projection-table th:first-child,
  table.projection-table td:first-child {
    text-align: left;
  }
  
  table.projection-table .milestone-year {
    background: #fef3c7;
  }
  
  table.projection-table .depleted-year {
    background: #fef2f2;
  }
  
  .retirement-insights {
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
  
  .result-card-warning {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
    border: 2px solid #f59e0b;
  }
  
  .text-danger { color: #ef4444; }
  .text-muted { color: #6b7280; }
  .font-bold { font-weight: bold; }
  
  @media (max-width: 768px) {
    .income-grid {
      grid-template-columns: 1fr;
    }
    
    .chart-legend {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    table.projection-table {
      font-size: 0.875rem;
    }
    
    table.projection-table th,
    table.projection-table td {
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
    
    .table-controls {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/retirement-income-calculator.js"></script>
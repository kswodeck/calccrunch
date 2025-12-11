---
layout: ../../layouts/CalculatorLayout.astro
calcType: retirement-planning
---

## How to Use This Calculator

### 📈 Investment Phase
1. Enter your **current age** and **planned retirement age**
2. Input your **initial investment** amount
3. Add your **monthly contribution** to retirement savings
4. Set your expected **annual return** during accumulation
5. Choose **compounding frequency** (monthly recommended)

### 🏖️ Retirement Phase
6. Select your **withdrawal strategy** (4% rule, fixed dollar, or percentage)
7. Enter any **additional retirement income** (Social Security, pension, etc.)
8. Input expected **retirement portfolio returns** (typically lower than accumulation)
9. Set your **inflation rate** estimate
10. Enter your **life expectancy** for planning purposes

Click **Calculate** to see your complete retirement journey!

<div class="calculator-form" id="retirement-planning-form">
  <div class="form-section">
    <h3>📅 Timeline & Age Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-age">
          Current Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-age" 
            class="form-input"
            placeholder="35"
            value="35"
            min="18"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Your age today</small>
      </div>
      <div class="form-group">
        <label for="retirement-age">
          Retirement Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="retirement-age" 
            class="form-input"
            placeholder="65"
            value="65"
            min="50"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">When you plan to retire</small>
      </div>
      <div class="form-group">
        <label for="life-expectancy">
          Life Expectancy <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="life-expectancy" 
            class="form-input"
            placeholder="90"
            value="90"
            min="70"
            max="120"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Plan conservatively</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>💰 Investment Growth Phase</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="principal">
          Current Investments <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="principal" 
            class="form-input"
            placeholder="10000"
            value="10000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount invested today</small>
      </div>
      <div class="form-group">
        <label for="monthly-contribution">
          Monthly Contribution <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-contribution" 
            class="form-input"
            placeholder="500"
            value="500"
            min="0"
            step="50"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount to save monthly</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="interest-rate">
          Annual Growth Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="9"
            value="9"
            min="0"
            max="100"
            step="0.5"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected investment returns</small>
      </div>
      <div class="form-group">
        <label for="compound-frequency">
          Compounding Frequency <span class="required">*</span>
        </label>
        <select id="compound-frequency" class="form-select" required>
          <option value="365">Daily</option>
          <option value="52">Weekly</option>
          <option value="26">Bi-Weekly</option>
          <option value="12">Monthly</option>
          <option value="4">Quarterly</option>
          <option value="1">Annually</option>
        </select>
        <small class="form-help">How often returns compound</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>🏖️ Retirement Income Phase</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="withdrawal-strategy">
          Withdrawal Strategy <span class="required">*</span>
        </label>
        <select id="withdrawal-strategy" class="form-select" required>
          <option value="inflation-adjusted" selected>4% Rule (Inflation-Adjusted)</option>
          <option value="percentage">Fixed Percentage</option>
          <option value="fixed-dollar">Fixed Dollar Amount</option>
        </select>
        <small class="form-help">How to withdraw in retirement</small>
      </div>
      <div class="form-group">
        <label for="withdrawal-rate">
          Withdrawal Rate/Amount <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="withdrawal-rate" 
            class="form-input"
            placeholder="4"
            value="4"
            min="0"
            step="0.5"
            required
          />
          <span class="input-addon" id="withdrawal-unit">%</span>
        </div>
        <small class="form-help" id="withdrawal-help">Initial withdrawal rate (4% rule)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="additional-income">
          Additional Monthly Income
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="additional-income" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Social Security, pension, etc.</small>
      </div>
      <div class="form-group">
        <label for="retirement-return-rate">
          Retirement Portfolio Returns <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="retirement-return-rate" 
            class="form-input"
            placeholder="9"
            value="9"
            min="0"
            max="20"
            step="0.5"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Conservative retirement returns</small>
      </div>
    </div>
    <div class="form-row">
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
            min="0"
            max="10"
            step="0.5"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Historical average: 3%</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Retirement Plan →
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
    <button type="button" id="print-results" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print Results
    </button>
  </div>
</div>

<div id="retirement-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🎯 Complete Retirement Planning Overview</h4>
  <p>
    This comprehensive calculator combines <strong>investment growth</strong> during your working years with 
    <strong>retirement income planning</strong> to give you a complete picture of your financial future. 
    It answers two critical questions:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>How much will I have?</strong> - Projects your retirement savings at retirement age</li>
    <li><strong>Will it be enough?</strong> - Shows if your money will last throughout retirement</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>💹 The Power of Time & Compound Interest</h4>
  <p>
    <strong>Example:</strong> Starting at age 30 with $10,000 and saving $500/month:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>By age 65:</strong> You'll have ~$950,000 (7% annual return)</li>
    <li><strong>Total contributions:</strong> Only $220,000</li>
    <li><strong>Interest earned:</strong> $730,000 (3.3x your contributions!)</li>
    <li><strong>Monthly retirement income:</strong> ~$3,800 using the 4% rule</li>
  </ul>
  <p style="margin-top: 10px;">
    Start 10 years earlier, and you could have <strong>$1.8 million</strong> instead!
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📊 Understanding Withdrawal Strategies</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>4% Rule (Recommended):</strong> Withdraw 4% in year one, adjust for inflation annually. Historically sustainable for 30+ years.</li>
    <li><strong>Fixed Percentage:</strong> Withdraw same percentage each year. Balance fluctuates but never depletes.</li>
    <li><strong>Fixed Dollar:</strong> Same amount yearly. Simple but doesn't adjust for inflation.</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Pro Tip:</strong> The 4% rule has a 95% historical success rate for 30-year retirements with a 60/40 stock/bond portfolio.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Retirement Planning Best Practices</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start early:</strong> Time is your greatest asset - even small amounts compound significantly</li>
    <li><strong>Increase gradually:</strong> Boost contributions with raises and bonuses</li>
    <li><strong>Use tax-advantaged accounts:</strong> 401(k), IRA, and Roth accounts provide tax benefits</li>
    <li><strong>Diversify income sources:</strong> Social Security, pensions, and part-time work reduce portfolio stress</li>
    <li><strong>Plan conservatively:</strong> Use lower return estimates and longer life expectancy</li>
    <li><strong>Review annually:</strong> Adjust your plan as circumstances change</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Returns are estimates based on historical averages - actual returns will vary</li>
    <li>Inflation reduces purchasing power over time</li>
    <li>Healthcare costs often increase in retirement</li>
    <li>Tax implications vary by account type and income level</li>
    <li>Market volatility can significantly impact retirement outcomes</li>
    <li>Consider working with a financial advisor for personalized planning</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF3E0; border-left-color: #FF6B35;">
  <h4>🎓 Key Retirement Planning Concepts</h4>
  <div style="margin: 10px 0;">
    <p><strong>Sequence of Returns Risk:</strong> Poor returns early in retirement can devastate a portfolio. Consider a bond tent or cash cushion for the first 5 years.</p>
    <p style="margin-top: 10px;"><strong>Social Security Optimization:</strong> Delaying benefits from 62 to 70 increases monthly payments by 76%.</p>
    <p style="margin-top: 10px;"><strong>Tax Diversification:</strong> Having traditional (pre-tax), Roth (tax-free), and taxable accounts provides flexibility in retirement.</p>
    <p style="margin-top: 10px;"><strong>Healthcare Bridge:</strong> Plan for health insurance between retirement and Medicare eligibility at 65.</p>
  </div>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Plan</h4>
  <p>
    Your retirement plan is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to your spouse, financial advisor, or save it for later. 
    All values will be restored when you return or share the link.
  </p>
</div>

<style>
  /* Retirement Planning Calculator Specific Styles */
  .retirement-readiness-score {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .retirement-readiness-score.excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .retirement-readiness-score.moderate {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .retirement-readiness-score.warning {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .retirement-readiness-score.critical {
    background: #fee2e2;
    border-left-color: #ef4444;
  }
  
  .readiness-icon {
    font-size: 3rem;
    margin-right: 1.5rem;
  }
  
  .readiness-content {
    flex: 1;
  }
  
  .readiness-content h4 {
    margin: 0 0 0.5rem 0;
    color: #111827;
    font-size: 1.5rem;
  }
  
  .readiness-content p {
    margin: 0;
    font-size: 1.1rem;
    color: #4b5563;
  }
  
  .readiness-bar {
    width: 100%;
    height: 10px;
    background: #e5e7eb;
    border-radius: 5px;
    margin-top: 1rem;
    overflow: hidden;
  }
  
  .readiness-progress {
    height: 100%;
    background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
    border-radius: 5px;
    transition: width 1s ease;
  }
  
  .results-summary {
    margin: 2rem 0;
  }
  
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .summary-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  .summary-card h4 {
    margin: 0 0 1rem 0;
    color: #2C5F8D;
    font-size: 1.25rem;
  }
  
  .summary-detail {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .summary-detail:last-child {
    border-bottom: none;
  }
  
  .summary-detail.highlight {
    background: #f8f9fa;
    margin: 0.5rem -0.5rem 0;
    padding: 0.75rem 0.5rem;
    border-radius: 8px;
    border: none;
  }
  
  .phase-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;

    .chart-label {
      font-size: 0.3rem;
    }
  }
  
  .phase-chart {
    width: 100%;
    height: auto;
    margin: 1rem 0;
    overflow: visible;
  }
  
  .chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .chart-label-center {
    text-align: center;
    font-weight: bold;
  }
  
  .chart-label {
    font-size: 10px;
    fill: #6b7280;
  }
  
  .accumulation-breakdown,
  .retirement-projection {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .retirement-projection {
    display: none;
  }
  
  .growth-visualization {
    margin: 1.5rem 0;
  }
  
  .growth-bar {
    display: flex;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    overflow: visible;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 1rem 0;
  }
  
  .growth-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    color: white;
    font-weight: bold;
  }
  
  .growth-segment.principal {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .growth-segment.contributions {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .growth-segment.interest {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .segment-label {
    font-size: 0.875rem;
  }
  
  .growth-legend {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 1.5rem;
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
  
  .legend-color.contributions {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .legend-color.interest {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  
  .projection-chart,
  .balance-chart {
    margin: 1.5rem 0;
  }
  
  .table-container {
    margin-top: 1rem;
    overflow-x: auto;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .data-table thead {
    background: #f8f9fa;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .data-table th:first-child,
  .data-table td:first-child {
    text-align: left;
  }
  
  .data-table .depleted-year {
    background: #fee2e2;
  }
  
  .amount-positive {
    color: #10b981;
    font-weight: bold;
  }
  
  .optimization-insights {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
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
    background: white;
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
  
  .insight-card.insight-excellent {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-color: #4ade80;
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
  
  .scenario-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .comparison-table thead {
    background: #f8f9fa;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .comparison-table th:not(:first-child),
  .comparison-table td:not(:first-child) {
    text-align: right;
  }
  
  .current-selection {
    background: #f0f9ff;
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
  
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .text-success { color: #10b981; }
  .text-warning { color: #f59e0b; }
  .text-danger { color: #ef4444; }
  .text-muted { color: #6b7280; }
  .font-bold { font-weight: bold; }
  
  @media (max-width: 768px) {
    .summary-grid {
      grid-template-columns: 1fr;
    }
    
    .insights-grid {
      grid-template-columns: 1fr;
    }
    
    .growth-segment .segment-label {
      font-size: 0.75rem;
    }
    
    .readiness-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }
    
    .table-container {
      font-size: 0.875rem;
    }
    
    .data-table th,
    .data-table td {
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
    
    .calculator-form {
      display: none;
    }
  }

  /* Income Breakdown Styles */
.income-breakdown {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.income-visualization {
  margin: 1.5rem 0;
}

.income-bar {
  display: flex;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 1rem 0;
}

.income-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.income-segment.withdrawals {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.income-segment.additional {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.income-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.legend-color.withdrawals {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.legend-color.additional {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.income-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

.stat-value.highlight {
  color: #2C5F8D;
}

/* Enhanced Summary Styles */
.summary-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.summary-tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  color: #6b7280;
}

.summary-tab.active {
  color: #2C5F8D;
  border-bottom-color: #FF6B35;
}

.summary-content {
  animation: fadeIn 0.3s ease;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.summary-stat {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

/* Lifetime Projection Styles */
.lifetime-projection {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.projection-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.projection-table .retirement-year {
  background: #fef3c7;
  font-weight: bold;
}

.phase-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.phase-badge.accumulation {
  background: #dcfce7;
  color: #166534;
}

.phase-badge.retirement {
  background: #dbeafe;
  color: #1e40af;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script src="/scripts/calculators/retirement-planning-calculator.js"></script>
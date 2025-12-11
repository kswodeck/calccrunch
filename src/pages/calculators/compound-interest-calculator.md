---
layout: ../../layouts/CalculatorLayout.astro
calcType: compound-interest
---

## How to Use This Calculator

1. Enter your **initial investment** (principal amount)
2. Add your **monthly contribution** (optional)
3. Input your **annual interest rate**
4. Select **compounding frequency** (daily, monthly, quarterly, yearly)
5. Choose your **investment timeline** in years
6. Click **Calculate** to see your investment growth

<div class="calculator-form" id="compound-calculator-form">
  <div class="form-section">
    <h3>Investment Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="principal">
          Initial Investment <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="principal" 
            class="form-input"
            placeholder="10000"
            value="10000"
            min="0"
            step="100"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Starting amount to invest</small>
      </div>
      <div class="form-group">
        <label for="monthly-contribution">
          Monthly Contribution
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="monthly-contribution" 
            class="form-input"
            placeholder="200"
            value="200"
            min="0"
            step="10"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Amount added each month</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="interest-rate">
          Annual Interest Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="interest-rate" 
            class="form-input"
            placeholder="7"
            value="7"
            min="0"
            max="10000"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected annual return rate</small>
      </div>
      <div class="form-group">
        <label for="time-years">
          Investment Period <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="time-years" 
            class="form-input"
            placeholder="20"
            value="20"
            min="1"
            max="50"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long to invest</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="compound-frequency">
          Compounding Frequency <span class="required">*</span>
        </label>
        <select id="compound-frequency" class="form-select" required>
          <option value="365">Daily</option>
          <option value="52">Weekly</option>
          <option value="27">Bi-Weekly</option>
          <option value="12" selected>Monthly</option>
          <option value="4">Quarterly</option>
          <option value="1">Annually</option>
        </select>
        <small class="form-help">How often interest compounds</small>
      </div>
      <div class="form-group">
        <label for="contribution-frequency">
          Contribution Frequency
        </label>
        <select id="contribution-frequency" class="form-select">
          <option value="365">Daily</option>
          <option value="52">Weekly</option>
          <option value="27">Bi-Weekly</option>
          <option value="12" selected>Monthly</option>
          <option value="4">Quarterly</option>
          <option value="1">Annually</option>
        </select>
        <small class="form-help">When to add contributions</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Investment Growth →
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

<div id="compound-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💹 What is Compound Interest?</h4>
  <p>
    <strong>Compound interest</strong> is when you earn interest on both your initial investment (principal) 
    and the interest that has already been added to it. Albert Einstein allegedly called it 
    "the eighth wonder of the world" - and for good reason. Over time, compound interest creates 
    exponential growth, which is why starting early makes such a big difference.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>🎯 The Power of Compounding</h4>
  <p>
    <strong>Example:</strong> If you invest $10,000 at 7% annual interest:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>After 10 years:</strong> $19,672 (nearly doubled!)</li>
    <li><strong>After 20 years:</strong> $38,697 (almost 4x your money)</li>
    <li><strong>After 30 years:</strong> $76,123 (over 7x your investment)</li>
  </ul>
  <p style="margin-top: 10px;">
    Add $200/month, and after 30 years you'd have <strong>$244,692</strong>! 
    That's the magic of compound interest combined with consistent contributions.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📈 Understanding Compounding Frequency</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Daily (365x/year):</strong> Best for savings accounts, highest growth</li>
    <li><strong>Monthly (12x/year):</strong> Common for investment accounts</li>
    <li><strong>Quarterly (4x/year):</strong> Typical for some bonds and CDs</li>
    <li><strong>Annually (1x/year):</strong> Simplest but slowest growth</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Pro Tip:</strong> More frequent compounding = more growth. A 7% annual rate 
    compounded daily grows slightly more than the same rate compounded annually.
  </p>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Investment Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start early:</strong> Time is your biggest advantage with compound interest</li>
    <li><strong>Be consistent:</strong> Regular contributions accelerate growth significantly</li>
    <li><strong>Reinvest dividends:</strong> Let your earnings compound for maximum effect</li>
    <li><strong>Stay invested:</strong> Don't withdraw early - let compounding work its magic</li>
    <li><strong>Increase contributions:</strong> Even small increases make a big difference over time</li>
    <li><strong>Consider tax-advantaged accounts:</strong> IRAs and 401(k)s compound tax-free</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Returns shown are estimates and not guaranteed</li>
    <li>Actual investment returns fluctuate - markets go up and down</li>
    <li>Inflation reduces the real value of future dollars</li>
    <li>Taxes and fees can significantly impact returns</li>
    <li>Past performance doesn't guarantee future results</li>
    <li>Diversify your investments to manage risk</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
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
  
  .investment-quality {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    border-left: 4px solid #10b981;
  }
  
  .investment-quality.status-excellent {
    background: #f0fdf4;
    border-left-color: #10b981;
  }
  
  .investment-quality.status-good {
    background: #eff6ff;
    border-left-color: #3b82f6;
  }
  
  .investment-quality.status-moderate {
    background: #fef3c7;
    border-left-color: #f59e0b;
  }
  
  .growth-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
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
  
  .growth-legend {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
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
  
  .yearly-breakdown {
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
  
  .breakdown-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .breakdown-table thead {
    background: #f8f9fa;
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
  
  .breakdown-table .year-0 {
    background: #f8f9fa;
    font-weight: bold;
  }
  
  .breakdown-table .milestone-year {
    background: #fef3c7;
  }
  
  .amount-cell {
    font-weight: bold;
    color: #059669;
  }
  
  .interest-cell {
    color: #f59e0b;
  }
  
  .growth-cell {
    color: #3b82f6;
  }
  
  .compound-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .comparison-note {
    margin: 1rem 0;
    color: #6b7280;
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
  
  .investment-insights {
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
  
  .text-success { color: #10b981; }
  .text-danger { color: #ef4444; }
  
  @media (max-width: 768px) {
    .growth-legend {
      flex-direction: column;
    }
    
    .breakdown-table {
      font-size: 0.875rem;
    }
    
    .breakdown-table th,
    .breakdown-table td {
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
  }
</style>

<script src="/scripts/calculators/compound-interest-calculator.js"></script>
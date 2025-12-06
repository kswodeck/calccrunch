---
layout: ../../layouts/CalculatorLayout.astro
title: Budget Calculator
description: Create a comprehensive monthly budget with income, expenses, savings, and debt payments. Track spending by category and see where your money goes with the 50/30/20 rule.
category: financial
tags: ['budget', 'expenses', 'income', 'savings', '50/30/20']
featured: true
calcType: budget
seoTitle: Free Budget Calculator - Monthly Budget Planner
seoDescription: Create a monthly budget with our free calculator. Track income, expenses, and savings using the 50/30/20 rule.
estimatedTime: 5 minutes
difficulty: Easy
---

## How to Use This Calculator

1. **Add your income sources** - Salary, freelance, investments, rental income, etc.
2. **Enter your expenses** - Categorized as Needs (essentials), Wants (lifestyle), and Savings/Debt
3. **Review your budget analysis** - See the 50/30/20 breakdown, cash flow, and insights
4. Click **Calculate Budget** to see your complete financial picture

<div class="calculator-form" id="budget-calculator-form">
  <div class="form-section income-section">
    <h3>💵 Income Sources</h3>
    <p class="section-description">Include all sources of monthly income: salary, side hustles, investments, rental income, etc.</p>
    <div id="income-container">
      <!-- Income rows will be added here dynamically -->
    </div>
    <button type="button" id="add-income-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Income Source
    </button>
    <div class="section-total income-total">
      <span>Total Monthly Income:</span>
      <strong id="total-income-display">$0</strong>
    </div>
  </div>

  <div class="form-section needs-section">
    <h3>🏠 Needs (Essential Expenses)</h3>
    <p class="section-description">Fixed expenses you must pay: housing, utilities, groceries, insurance, minimum debt payments, transportation.</p>
    <div id="needs-container">
      <!-- Needs rows will be added here dynamically -->
    </div>
    <button type="button" id="add-needs-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Essential Expense
    </button>
    <div class="section-total needs-total">
      <span>Total Needs:</span>
      <strong id="total-needs-display">$0</strong>
    </div>
  </div>

  <div class="form-section wants-section">
    <h3>🎯 Wants (Lifestyle Expenses)</h3>
    <p class="section-description">Non-essential spending: dining out, entertainment, subscriptions, hobbies, shopping, travel.</p>
    <div id="wants-container">
      <!-- Wants rows will be added here dynamically -->
    </div>
    <button type="button" id="add-wants-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Lifestyle Expense
    </button>
    <div class="section-total wants-total">
      <span>Total Wants:</span>
      <strong id="total-wants-display">$0</strong>
    </div>
  </div>

  <div class="form-section savings-section">
    <h3>💰 Savings & Debt Payments</h3>
    <p class="section-description">Savings contributions, investments, and extra debt payments beyond minimums.</p>
    <div id="savings-container">
      <!-- Savings rows will be added here dynamically -->
    </div>
    <button type="button" id="add-savings-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Savings/Investment
    </button>
    <div class="section-total savings-total">
      <span>Total Savings & Debt:</span>
      <strong id="total-savings-display">$0</strong>
    </div>
  </div>

  <div class="budget-preview">
    <div class="preview-grid">
      <div class="preview-item income-preview">
        <div class="preview-label">Income</div>
        <div class="preview-value" id="preview-income">$0</div>
      </div>
      <div class="preview-item spending-preview">
        <div class="preview-label">Spending</div>
        <div class="preview-value" id="preview-spending">$0</div>
      </div>
      <div class="preview-item savings-preview">
        <div class="preview-label">Savings</div>
        <div class="preview-value" id="preview-savings">$0</div>
      </div>
      <div class="preview-item balance-preview">
        <div class="preview-label">Unallocated</div>
        <div class="preview-value" id="preview-balance">$0</div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Budget →
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
      Share Budget
    </button>
  </div>
</div>

<div id="budget-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 What Is the 50/30/20 Budget Rule?</h4>
  <p>
    The <strong>50/30/20 rule</strong> is a simple budgeting framework that divides your after-tax income into three categories:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>50% Needs:</strong> Essential expenses like housing, utilities, groceries, insurance, and minimum debt payments</li>
    <li><strong>30% Wants:</strong> Lifestyle expenses like dining out, entertainment, hobbies, and non-essential shopping</li>
    <li><strong>20% Savings:</strong> Savings, investments, and extra debt payments beyond minimums</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>💵 Income Categories Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Salary/Wages:</strong> Regular employment income (use after-tax amount)</li>
    <li><strong>Freelance/Side Hustle:</strong> Contract work, gig economy income</li>
    <li><strong>Investments:</strong> Dividends, interest, capital gains distributions</li>
    <li><strong>Rental Income:</strong> Property rental income (net of expenses)</li>
    <li><strong>Business Income:</strong> Self-employment or business profits</li>
    <li><strong>Other Income:</strong> Alimony, child support, government benefits, etc.</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>🏠 Needs vs Wants - Know the Difference</h4>
  <p><strong>Needs are essential for survival and basic functioning:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Housing (rent/mortgage), utilities, basic groceries</li>
    <li>Health insurance, car insurance, minimum debt payments</li>
    <li>Transportation to work, childcare, essential medications</li>
  </ul>
  <p style="margin-top: 10px;"><strong>Wants enhance your life but aren't essential:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Dining out, streaming services, gym memberships</li>
    <li>New clothes (beyond basics), vacations, hobbies</li>
    <li>Upgraded phone plans, premium subscriptions</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Budgeting Best Practices</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Track everything:</strong> Even small purchases add up over a month</li>
    <li><strong>Use after-tax income:</strong> Budget with what actually hits your bank account</li>
    <li><strong>Build an emergency fund first:</strong> 3-6 months of expenses before aggressive investing</li>
    <li><strong>Pay yourself first:</strong> Automate savings before spending on wants</li>
    <li><strong>Review monthly:</strong> Adjust your budget as circumstances change</li>
    <li><strong>Be realistic:</strong> An overly restrictive budget is hard to maintain</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Common Budgeting Mistakes</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Forgetting irregular expenses:</strong> Car repairs, annual subscriptions, holidays</li>
    <li><strong>Not accounting for inflation:</strong> Costs increase over time</li>
    <li><strong>Ignoring small purchases:</strong> Coffee, snacks, and impulse buys add up</li>
    <li><strong>No emergency fund:</strong> Unexpected expenses derail budgets</li>
    <li><strong>Being too restrictive:</strong> Burnout leads to budget abandonment</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Budget</h4>
  <p>
    Your budget is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your budget, 
    or use the <strong>Share button</strong> to save the link. All values including all income sources and expenses will be 
    restored automatically when you return.
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

  .income-section {
    border-left: 4px solid #4CAF50;
  }

  .needs-section {
    border-left: 4px solid #2196F3;
  }

  .wants-section {
    border-left: 4px solid #FF9800;
  }

  .savings-section {
    border-left: 4px solid #9C27B0;
  }

  .item-row {
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    margin-bottom: var(--space-md);
    position: relative;
    transition: all var(--transition-fast);
  }

  .item-row:hover {
    border-color: var(--color-light-blue);
  }

  .item-row.income-row:hover {
    border-color: #4CAF50;
  }

  .item-row.needs-row:hover {
    border-color: #2196F3;
  }

  .item-row.wants-row:hover {
    border-color: #FF9800;
  }

  .item-row.savings-row:hover {
    border-color: #9C27B0;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
  }

  .item-number {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
  }

  .income-row .item-number {
    background: #E8F5E9;
    color: #2E7D32;
  }

  .needs-row .item-number {
    background: #E3F2FD;
    color: #1565C0;
  }

  .wants-row .item-number {
    background: #FFF3E0;
    color: #E65100;
  }

  .savings-row .item-number {
    background: #F3E5F5;
    color: #7B1FA2;
  }

  .remove-item-btn {
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

  .remove-item-btn:hover {
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

  .section-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--space-lg);
    padding: var(--space-md) var(--space-lg);
    background: #E8F5E9;
    border-radius: var(--border-radius);
    border-left: 4px solid #4CAF50;
  }

  .section-total span {
    font-weight: 600;
    color: var(--color-gray-dark);
  }

  .section-total strong {
    font-size: var(--text-xl);
    color: #4CAF50;
    font-family: var(--font-primary);
  }

  .income-total {
    background: #E8F5E9;
    border-left-color: #4CAF50;
  }

  .income-total strong {
    color: #4CAF50;
  }

  .needs-total {
    background: #E3F2FD;
    border-left-color: #2196F3;
  }

  .needs-total strong {
    color: #2196F3;
  }

  .wants-total {
    background: #FFF3E0;
    border-left-color: #FF9800;
  }

  .wants-total strong {
    color: #E65100;
  }

  .savings-total {
    background: #F3E5F5;
    border-left-color: #9C27B0;
  }

  .savings-total strong {
    color: #9C27B0;
  }

  .budget-preview {
    padding: var(--space-xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    border: 2px solid var(--color-light-blue);
    margin-top: var(--space-lg);
  }

  .preview-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
    text-align: center;
  }

  .preview-item {
    padding: var(--space-md);
    border-radius: var(--border-radius);
    background: white;
  }

  .preview-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .preview-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
  }

  .income-preview .preview-value {
    color: #4CAF50;
  }

  .spending-preview .preview-value {
    color: #F44336;
  }

  .savings-preview .preview-value {
    color: #9C27B0;
  }

  .balance-preview .preview-value {
    color: var(--color-primary-blue);
  }

  .balance-preview .preview-value.positive {
    color: #4CAF50;
  }

  .balance-preview .preview-value.negative {
    color: #F44336;
  }

  .input-with-addon {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-with-addon .input-addon {
    position: absolute;
    left: 12px;
    color: var(--color-gray-dark);
    font-weight: 600;
    pointer-events: none;
    z-index: 1;
  }

  .input-with-addon .form-input {
    padding-left: 28px;
  }

  /* Results Styles */
  .budget-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
  }

  .budget-hero.surplus {
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border: 2px solid #4CAF50;
  }

  .budget-hero.deficit {
    background: linear-gradient(135deg, #FFEBEE 0%, #fff 100%);
    border: 2px solid #F44336;
  }

  .budget-hero.balanced {
    background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%);
    border: 2px solid #2196F3;
  }

  .budget-label {
    font-size: var(--text-xl);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-md);
  }

  .budget-value {
    font-size: 4rem;
    font-weight: 800;
    font-family: var(--font-primary);
    margin-bottom: var(--space-md);
  }

  .budget-value.surplus {
    color: #4CAF50;
  }

  .budget-value.deficit {
    color: #F44336;
  }

  .budget-value.balanced {
    color: #2196F3;
  }

  .budget-status {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 20px;
    font-weight: 600;
    font-size: var(--text-base);
  }

  .budget-status.excellent {
    background: #C8E6C9;
    color: #2E7D32;
  }

  .budget-status.good {
    background: #DCEDC8;
    color: #558B2F;
  }

  .budget-status.fair {
    background: #FFF9C4;
    color: #F9A825;
  }

  .budget-status.poor {
    background: #FFECB3;
    color: #FF8F00;
  }

  .budget-status.deficit {
    background: #FFCDD2;
    color: #C62828;
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

  .summary-card.income-card {
    border-color: #4CAF50;
    border-left-width: 4px;
  }

  .summary-card.needs-card {
    border-color: #2196F3;
    border-left-width: 4px;
  }

  .summary-card.wants-card {
    border-color: #FF9800;
    border-left-width: 4px;
  }

  .summary-card.savings-card {
    border-color: #9C27B0;
    border-left-width: 4px;
  }

  .summary-card-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
  }

  .summary-card-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
    margin-bottom: var(--space-xs);
  }

  .summary-card.income-card .summary-card-value {
    color: #4CAF50;
  }

  .summary-card.needs-card .summary-card-value {
    color: #2196F3;
  }

  .summary-card.wants-card .summary-card-value {
    color: #FF9800;
  }

  .summary-card.savings-card .summary-card-value {
    color: #9C27B0;
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .summary-card-percent {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    margin-top: var(--space-xs);
  }

  .breakdown-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
  }

  .breakdown-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 2px solid var(--color-gray);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* 50/30/20 Visual Bar */
  .rule-comparison {
    margin: var(--space-xl) 0;
  }

  .rule-bar-container {
    margin-bottom: var(--space-lg);
  }

  .rule-bar-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-sm);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .rule-bar {
    display: flex;
    height: 40px;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .rule-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    transition: all var(--transition-base);
  }

  .rule-segment.needs {
    background: linear-gradient(135deg, #1976D2, #2196F3);
  }

  .rule-segment.wants {
    background: linear-gradient(135deg, #E65100, #FF9800);
  }

  .rule-segment.savings {
    background: linear-gradient(135deg, #7B1FA2, #9C27B0);
  }

  .rule-segment.unallocated {
    background: linear-gradient(135deg, #4CAF50, #66BB6A);
  }

  .rule-segment.over {
    background: linear-gradient(135deg, #C62828, #EF5350);
  }

  .rule-legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-lg);
    margin-top: var(--space-md);
    justify-content: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--text-sm);
  }

  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .legend-color.needs { background: #2196F3; }
  .legend-color.wants { background: #FF9800; }
  .legend-color.savings { background: #9C27B0; }
  .legend-color.unallocated { background: #4CAF50; }

  /* Category Breakdown */
  .category-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-lg);
  }

  .category-card {
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
  }

  .category-card h5 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-md);
    font-size: var(--text-base);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .category-item {
    display: flex;
    justify-content: space-between;
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-gray);
    font-size: var(--text-sm);
  }

  .category-item:last-child {
    border-bottom: none;
  }

  .category-item-name {
    color: var(--color-gray-dark);
  }

  .category-item-value {
    font-weight: 600;
    color: var(--color-primary-blue);
  }

  .category-total {
    display: flex;
    justify-content: space-between;
    padding-top: var(--space-md);
    margin-top: var(--space-sm);
    border-top: 2px solid var(--color-gray);
    font-weight: 700;
  }

  /* Insights Section */
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

  .insight-card.insight-danger {
    background: #FFEBEE;
    border-color: #EF9A9A;
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

  /* Cash Flow Chart */
  .cashflow-chart {
    margin: var(--space-xl) 0;
  }

  .cashflow-bar-container {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-md);
    gap: var(--space-md);
  }

  .cashflow-label {
    width: 80px;
    font-size: var(--text-sm);
    font-weight: 600;
    text-align: right;
    flex-shrink: 0;
  }

  .cashflow-track {
    flex: 1;
    height: 30px;
    background: var(--color-gray-light);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .cashflow-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: var(--space-sm);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
  }

  .cashflow-fill.income {
    background: linear-gradient(90deg, #43A047, #66BB6A);
  }

  .cashflow-fill.expenses {
    background: linear-gradient(90deg, #EF5350, #E53935);
  }

  .cashflow-fill.savings {
    background: linear-gradient(90deg, #7B1FA2, #9C27B0);
  }

  .cashflow-value {
    width: 100px;
    font-size: var(--text-sm);
    font-weight: 600;
    text-align: left;
    flex-shrink: 0;
  }

  /* Planning Section */
  .planning-section {
    background: linear-gradient(135deg, #F3E5F5 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-top: var(--space-xl);
    border: 2px solid #9C27B0;
  }

  .planning-section h4 {
    color: #7B1FA2;
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .planning-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
  }

  .planning-card {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    text-align: center;
  }

  .planning-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-sm);
  }

  .planning-title {
    font-weight: 600;
    color: var(--color-primary-blue);
    margin-bottom: var(--space-sm);
  }

  .planning-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: #7B1FA2;
    margin-bottom: var(--space-xs);
  }

  .planning-note {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }

    .item-row {
      padding: var(--space-md);
    }

    .budget-value {
      font-size: 2.5rem;
    }

    .preview-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .rule-segment {
      font-size: var(--text-xs);
    }

    .rule-legend {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }

    .remove-item-btn {
      display: none;
    }

    .add-item-btn {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/budget-calculator.js"></script>
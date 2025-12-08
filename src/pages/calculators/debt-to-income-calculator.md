---
layout: ../../layouts/CalculatorLayout.astro
title: Debt-to-Income Ratio Calculator
description: Calculate your debt-to-income (DTI) ratio for mortgage qualification. Include all monthly debt payments and gross income to see if you meet lender requirements.
category: financial
tags: ['DTI', 'debt-to-income', 'mortgage qualification', 'lending']
featured: false
calcType: debt-to-income
seoTitle: Free Debt-to-Income Calculator - DTI Ratio for Mortgage
seoDescription: Calculate your debt-to-income ratio for mortgage approval. See if you meet lender requirements with our free DTI calculator.
estimatedTime: 3 minutes
difficulty: Easy
---

## How to Use This Calculator

1. **Add your income sources** - Salary, freelance, investments, rental income, etc.
2. **Enter your monthly debts** - Housing costs, car loans, credit cards, student loans, etc.
3. **Add assets (optional)** - For net worth analysis and planning insights
4. **Review your DTI analysis** - See front-end and back-end ratios with lender guidelines
5. Click **Calculate DTI** to see your complete debt-to-income analysis

<div class="calculator-form" id="dti-calculator-form">
  <div class="form-section income-section">
    <h3>💵 Income Sources</h3>
    <p class="section-description">Include all sources of monthly gross income (before taxes). Lenders typically use gross income for DTI calculations.</p>
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
      <span>Total Monthly Gross Income:</span>
      <strong id="total-income-display">$0</strong>
    </div>
  </div>

  <div class="form-section housing-section">
    <h3>🏠 Housing Costs (Front-End DTI)</h3>
    <p class="section-description">Your monthly housing payment including mortgage/rent, property tax, insurance, HOA, and PMI. These determine your front-end DTI ratio.</p>
    <div id="housing-container">
      <!-- Housing rows will be added here dynamically -->
    </div>
    <button type="button" id="add-housing-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Housing Cost
    </button>
    <div class="section-total housing-total">
      <span>Total Housing Costs:</span>
      <strong id="total-housing-display">$0</strong>
    </div>
  </div>

  <div class="form-section debt-section">
    <h3>💳 Other Monthly Debts (Back-End DTI)</h3>
    <p class="section-description">Include all recurring debt payments: car loans, student loans, credit cards (minimum payment), personal loans, child support, etc.</p>
    <div id="debt-container">
      <!-- Debt rows will be added here dynamically -->
    </div>
    <button type="button" id="add-debt-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Debt Payment
    </button>
    <div class="section-total debt-total">
      <span>Total Other Debts:</span>
      <strong id="total-debt-display">$0</strong>
    </div>
  </div>

  <details class="form-section assets-section collapsible-section">
    <summary class="collapsible-header">
      <h3>📈 Assets & Investments (Optional)</h3>
      <span class="collapse-icon">▼</span>
    </summary>
    <div class="collapsible-content">
      <p class="section-description">Adding assets helps calculate your debt-to-asset ratio and provides planning insights. This doesn't affect your DTI calculation.</p>
      <div id="assets-container">
        <!-- Asset rows will be added here dynamically -->
      </div>
      <button type="button" id="add-assets-btn" class="btn btn-secondary add-item-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Asset
      </button>
      <div class="section-total assets-total">
        <span>Total Assets:</span>
        <strong id="total-assets-display">$0</strong>
      </div>
    </div>
  </details>

  <details class="form-section planning-section collapsible-section">
    <summary class="collapsible-header">
      <h3>🎯 Planning: Proposed New Debt (Optional)</h3>
      <span class="collapse-icon">▼</span>
    </summary>
    <div class="collapsible-content">
      <p class="section-description">Planning to take on new debt? Add proposed payments to see how they would affect your DTI ratio before applying.</p>
      <div id="proposed-container">
        <!-- Proposed debt rows will be added here dynamically -->
      </div>
      <button type="button" id="add-proposed-btn" class="btn btn-secondary add-item-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Proposed Debt
      </button>
      <div class="section-total proposed-total">
        <span>Total Proposed Debt:</span>
        <strong id="total-proposed-display">$0</strong>
      </div>
    </div>
  </details>

  <div class="dti-preview">
    <div class="preview-grid">
      <div class="preview-item income-preview">
        <div class="preview-label">Monthly Income</div>
        <div class="preview-value" id="preview-income">$0</div>
      </div>
      <div class="preview-item housing-preview">
        <div class="preview-label">Housing Costs</div>
        <div class="preview-value" id="preview-housing">$0</div>
      </div>
      <div class="preview-item debt-preview">
        <div class="preview-label">Total Debts</div>
        <div class="preview-value" id="preview-total-debt">$0</div>
      </div>
      <div class="preview-item dti-preview-ratio">
        <div class="preview-label">Back-End DTI</div>
        <div class="preview-value" id="preview-dti">0%</div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate DTI →
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

<div id="dti-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 Understanding Debt-to-Income Ratio</h4>
  <p>
    Your <strong>debt-to-income (DTI) ratio</strong> compares your monthly debt payments to your gross monthly income. 
    Lenders use this to assess your ability to manage monthly payments and repay debts.
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Front-End DTI:</strong> Housing costs ÷ Gross Income (recommended ≤ 28%)</li>
    <li><strong>Back-End DTI:</strong> All debts ÷ Gross Income (recommended ≤ 36%)</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F5E9; border-left-color: #4CAF50;">
  <h4>✅ DTI Guidelines by Loan Type</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Conventional Loans:</strong> 28% front-end / 36% back-end (ideal), up to 43-50% with compensating factors</li>
    <li><strong>FHA Loans:</strong> 31% front-end / 43% back-end (standard), up to 50% with strong credit</li>
    <li><strong>VA Loans:</strong> No front-end limit / 41% back-end preferred</li>
    <li><strong>USDA Loans:</strong> 29% front-end / 41% back-end</li>
    <li><strong>Jumbo Loans:</strong> 36-43% back-end (stricter requirements)</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>💡 What Counts as Debt?</h4>
  <p><strong>Include in your DTI calculation:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Mortgage or rent payments</li>
    <li>Car loans and leases</li>
    <li>Student loan payments</li>
    <li>Credit card minimum payments</li>
    <li>Personal loans</li>
    <li>Child support/alimony</li>
    <li>Other recurring debt obligations</li>
  </ul>
  <p style="margin-top: 10px;"><strong>NOT typically included:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Utilities and phone bills</li>
    <li>Health insurance premiums</li>
    <li>Groceries and living expenses</li>
    <li>Income taxes (already deducted from gross)</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>📈 Tips to Improve Your DTI</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Pay down existing debt:</strong> Focus on high-interest credit cards first</li>
    <li><strong>Increase income:</strong> Side hustles, raises, or additional employment</li>
    <li><strong>Avoid new debt:</strong> Don't open new credit accounts before applying for loans</li>
    <li><strong>Lower housing costs:</strong> Consider a smaller home or larger down payment</li>
    <li><strong>Refinance existing loans:</strong> Lower rates can reduce monthly payments</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your DTI Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your DTI analysis, 
    or use the <strong>Share button</strong> to copy the link. All income and debt values will be restored when you return.
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

  .housing-section {
    border-left: 4px solid #2196F3;
  }

  .debt-section {
    border-left: 4px solid #F44336;
  }

  .assets-section {
    border-left: 4px solid #9C27B0;
  }

  .planning-section {
    border-left: 4px solid #FF9800;
  }

  .collapsible-section {
    cursor: pointer;
  }

  .collapsible-section[open] .collapse-icon {
    transform: rotate(180deg);
  }

  .collapsible-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
  }

  .collapsible-header::-webkit-details-marker {
    display: none;
  }

  .collapsible-header h3 {
    margin: 0;
    border: none;
    padding: 0;
  }

  .collapse-icon {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    transition: transform var(--transition-fast);
  }

  .collapsible-content {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 2px solid var(--color-gray);
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

  .item-row.housing-row:hover {
    border-color: #2196F3;
  }

  .item-row.debt-row:hover {
    border-color: #F44336;
  }

  .item-row.assets-row:hover {
    border-color: #9C27B0;
  }

  .item-row.proposed-row:hover {
    border-color: #FF9800;
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

  .housing-row .item-number {
    background: #E3F2FD;
    color: #1565C0;
  }

  .debt-row .item-number {
    background: #FFEBEE;
    color: #C62828;
  }

  .assets-row .item-number {
    background: #F3E5F5;
    color: #7B1FA2;
  }

  .proposed-row .item-number {
    background: #FFF3E0;
    color: #E65100;
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

  .housing-total {
    background: #E3F2FD;
    border-left-color: #2196F3;
  }

  .housing-total strong {
    color: #1565C0;
  }

  .debt-total {
    background: #FFEBEE;
    border-left-color: #F44336;
  }

  .debt-total strong {
    color: #C62828;
  }

  .assets-total {
    background: #F3E5F5;
    border-left-color: #9C27B0;
  }

  .assets-total strong {
    color: #7B1FA2;
  }

  .proposed-total {
    background: #FFF3E0;
    border-left-color: #FF9800;
  }

  .proposed-total strong {
    color: #E65100;
  }

  .dti-preview {
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

  .housing-preview .preview-value {
    color: #2196F3;
  }

  .debt-preview .preview-value {
    color: #F44336;
  }

  .dti-preview-ratio .preview-value {
    color: var(--color-primary-blue);
  }

  .dti-preview-ratio .preview-value.excellent {
    color: #4CAF50;
  }

  .dti-preview-ratio .preview-value.good {
    color: #8BC34A;
  }

  .dti-preview-ratio .preview-value.fair {
    color: #FFC107;
  }

  .dti-preview-ratio .preview-value.poor {
    color: #FF9800;
  }

  .dti-preview-ratio .preview-value.danger {
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
  .dti-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
  }

  .dti-hero.excellent {
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border: 2px solid #4CAF50;
  }

  .dti-hero.good {
    background: linear-gradient(135deg, #F1F8E9 0%, #fff 100%);
    border: 2px solid #8BC34A;
  }

  .dti-hero.fair {
    background: linear-gradient(135deg, #FFFDE7 0%, #fff 100%);
    border: 2px solid #FFC107;
  }

  .dti-hero.poor {
    background: linear-gradient(135deg, #FFF3E0 0%, #fff 100%);
    border: 2px solid #FF9800;
  }

  .dti-hero.danger {
    background: linear-gradient(135deg, #FFEBEE 0%, #fff 100%);
    border: 2px solid #F44336;
  }

  .dti-label {
    font-size: var(--text-lg);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-sm);
  }

  .dti-value {
    font-size: 4rem;
    font-weight: 800;
    font-family: var(--font-primary);
    margin-bottom: var(--space-sm);
  }

  .dti-value.excellent { color: #4CAF50; }
  .dti-value.good { color: #8BC34A; }
  .dti-value.fair { color: #FFC107; }
  .dti-value.poor { color: #FF9800; }
  .dti-value.danger { color: #F44336; }

  .dti-status {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 20px;
    font-weight: 600;
    font-size: var(--text-base);
  }

  .dti-status.excellent {
    background: #E8F5E9;
    color: #2E7D32;
  }

  .dti-status.good {
    background: #F1F8E9;
    color: #558B2F;
  }

  .dti-status.fair {
    background: #FFFDE7;
    color: #F9A825;
  }

  .dti-status.poor {
    background: #FFF3E0;
    color: #E65100;
  }

  .dti-status.danger {
    background: #FFEBEE;
    color: #C62828;
  }

  /* Summary Cards */
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
    font-size: 2rem;
    margin-bottom: var(--space-sm);
  }

  .summary-card-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
    color: var(--color-primary-blue);
    margin-bottom: var(--space-xs);
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .summary-card-percent {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    opacity: 0.8;
    margin-top: var(--space-xs);
  }

  .summary-card.income-card {
    border-color: #4CAF50;
  }

  .summary-card.income-card .summary-card-value {
    color: #4CAF50;
  }

  .summary-card.housing-card {
    border-color: #2196F3;
  }

  .summary-card.housing-card .summary-card-value {
    color: #1565C0;
  }

  .summary-card.debt-card {
    border-color: #F44336;
  }

  .summary-card.debt-card .summary-card-value {
    color: #C62828;
  }

  .summary-card.total-card {
    border-color: #9C27B0;
  }

  .summary-card.total-card .summary-card-value {
    color: #7B1FA2;
  }

  /* DTI Meters */
  .dti-analysis {
    background: white;
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 1px solid var(--color-gray);
  }

  .dti-analysis h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .dti-meters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
  }

  .dti-meter {
    text-align: center;
  }

  .dti-meter h5 {
    margin: 0 0 var(--space-md) 0;
    color: var(--color-gray-dark);
    font-size: var(--text-base);
  }

  .meter-container {
    position: relative;
    margin: var(--space-lg) 0;
  }

  .meter-bar {
    width: 100%;
    height: 40px;
    background: #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .meter-fill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: var(--space-md);
    transition: width 0.5s ease;
    min-width: 50px;
  }

  .meter-fill.excellent {
    background: linear-gradient(90deg, #43A047, #66BB6A);
  }

  .meter-fill.good {
    background: linear-gradient(90deg, #7CB342, #9CCC65);
  }

  .meter-fill.fair {
    background: linear-gradient(90deg, #FDD835, #FFEB3B);
  }

  .meter-fill.poor {
    background: linear-gradient(90deg, #FB8C00, #FFA726);
  }

  .meter-fill.danger {
    background: linear-gradient(90deg, #E53935, #EF5350);
  }

  .meter-value {
    color: white;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    font-size: var(--text-base);
  }

  .meter-markers {
    display: flex;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-sm);
    margin-top: var(--space-xs);
  }

  .marker {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }

  .meter-status {
    font-size: var(--text-sm);
    margin-top: var(--space-sm);
    font-weight: 600;
  }

  .meter-status.text-success { color: #4CAF50; }
  .meter-status.text-warning { color: #FF9800; }
  .meter-status.text-danger { color: #F44336; }

  /* Payment Breakdown */
  .breakdown-section {
    background: white;
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    margin: var(--space-2xl) 0;
    border: 1px solid var(--color-gray);
  }

  .breakdown-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .breakdown-bar {
    margin-bottom: var(--space-lg);
  }

  .breakdown-bar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-sm);
    font-size: var(--text-sm);
  }

  .breakdown-bar-track {
    width: 100%;
    height: 32px;
    background: var(--color-gray-light);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
  }

  .breakdown-bar-segment {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xs);
    font-weight: 600;
    color: white;
    transition: width 0.5s ease;
    min-width: 0;
    overflow: hidden;
  }

  .breakdown-bar-segment.housing {
    background: linear-gradient(90deg, #1565C0, #42A5F5);
  }

  .breakdown-bar-segment.debts {
    background: linear-gradient(90deg, #C62828, #EF5350);
  }

  .breakdown-bar-segment.remaining {
    background: linear-gradient(90deg, #388E3C, #66BB6A);
  }

  .breakdown-bar-segment.proposed {
    background: linear-gradient(90deg, #E65100, #FF9800);
  }

  .breakdown-legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-lg);
    justify-content: center;
    margin-top: var(--space-md);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--text-sm);
  }

  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .legend-color.housing {
    background: linear-gradient(135deg, #1565C0, #42A5F5);
  }

  .legend-color.debts {
    background: linear-gradient(135deg, #C62828, #EF5350);
  }

  .legend-color.remaining {
    background: linear-gradient(135deg, #388E3C, #66BB6A);
  }

  .legend-color.proposed {
    background: linear-gradient(135deg, #E65100, #FF9800);
  }

  /* Category Breakdown */
  .category-breakdown {
    margin-top: var(--space-xl);
  }

  .category-group {
    margin-bottom: var(--space-lg);
  }

  .category-group h5 {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-sm);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .category-items {
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
    padding: var(--space-md);
  }

  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-xs) 0;
    font-size: var(--text-sm);
  }

  .category-item:not(:last-child) {
    border-bottom: 1px solid var(--color-gray);
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

  /* Planning Section */
  .planning-results {
    background: linear-gradient(135deg, #FFF3E0 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-top: var(--space-xl);
    border: 2px solid #FF9800;
  }

  .planning-results h4 {
    color: #E65100;
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .planning-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-lg);
    align-items: center;
  }

  .planning-card {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    text-align: center;
  }

  .planning-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .planning-card-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
  }

  .planning-arrow {
    font-size: var(--text-2xl);
    color: #FF9800;
  }

  /* Net Worth Section */
  .networth-section {
    background: linear-gradient(135deg, #F3E5F5 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-top: var(--space-xl);
    border: 2px solid #9C27B0;
  }

  .networth-section h4 {
    color: #7B1FA2;
    margin-bottom: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .networth-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-lg);
  }

  .networth-card {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    text-align: center;
  }

  .networth-icon {
    font-size: 2rem;
    margin-bottom: var(--space-sm);
  }

  .networth-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-xs);
  }

  .networth-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    font-family: var(--font-primary);
    color: #7B1FA2;
  }

  .networth-value.positive {
    color: #4CAF50;
  }

  .networth-value.negative {
    color: #F44336;
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

    .dti-value {
      font-size: 2.5rem;
    }

    .preview-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .dti-meters {
      grid-template-columns: 1fr;
    }

    .planning-comparison {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .planning-arrow {
      transform: rotate(90deg);
    }

    .breakdown-legend {
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

    .collapsible-section {
      display: block;
    }
  }
</style>

<script src="/scripts/calculators/debt-to-income-calculator.js"></script>
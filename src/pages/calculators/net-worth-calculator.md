---
layout: ../../layouts/CalculatorLayout.astro
calcType: net-worth
---

## How to Use This Calculator

1. **Add your assets** - Click "Add Asset" to enter cash, investments, real estate, vehicles, and other valuables
2. **Add your liabilities** - Click "Add Liability" to enter mortgages, loans, credit cards, and other debts
3. **Organize by category** - Select the appropriate category for each item
4. Click **Calculate Net Worth** to see your complete financial picture

<div class="calculator-form" id="net-worth-calculator-form">
  <div class="form-section assets-section">
    <h3>💰 Assets (What You Own)</h3>
    <p class="section-description">Include all items of value: bank accounts, investments, property, vehicles, and other valuables.</p>
    <div id="assets-container">
      <!-- Asset rows will be added here dynamically -->
    </div> 
    <button type="button" id="add-asset-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Asset
    </button>
    <div class="section-total">
      <span>Total Assets:</span>
      <strong id="total-assets-display">$0</strong>
    </div>
  </div>
  <div class="form-section liabilities-section">
    <h3>💳 Liabilities (What You Owe)</h3>
    <p class="section-description">Include all debts: mortgages, car loans, student loans, credit cards, and other obligations.</p>
    <div id="liabilities-container">
      <!-- Liability rows will be added here dynamically -->
    </div>
    <button type="button" id="add-liability-btn" class="btn btn-secondary add-item-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Liability
    </button>
    <div class="section-total liability-total">
      <span>Total Liabilities:</span>
      <strong id="total-liabilities-display">$0</strong>
    </div>
  </div>

  <div class="net-worth-preview">
    <div class="preview-label">Estimated Net Worth</div>
    <div class="preview-value" id="net-worth-preview">$0</div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Net Worth →
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

<div id="net-worth-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💎 What Is Net Worth?</h4>
  <p>
    <strong>Net worth</strong> is the total value of everything you own (assets) minus everything you owe (liabilities). 
    It's a snapshot of your financial health at a specific point in time. A positive net worth means you own more than 
    you owe, while a negative net worth indicates your debts exceed your assets.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 Asset Categories Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Cash & Bank Accounts:</strong> Checking, savings, money market accounts, CDs</li>
    <li><strong>Investments:</strong> Stocks, bonds, mutual funds, ETFs, 401(k), IRA, brokerage accounts</li>
    <li><strong>Real Estate:</strong> Primary home, rental properties, vacation homes, land</li>
    <li><strong>Vehicles:</strong> Cars, trucks, motorcycles, boats, RVs (use current market value)</li>
    <li><strong>Personal Property:</strong> Jewelry, art, collectibles, electronics, furniture</li>
    <li><strong>Business Interests:</strong> Business ownership, partnerships, equity stakes</li>
    <li><strong>Other Assets:</strong> Life insurance cash value, HSA, cryptocurrency, precious metals</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>💳 Liability Categories Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Mortgage:</strong> Primary home mortgage, home equity loans, HELOCs</li>
    <li><strong>Auto Loans:</strong> Car loans, motorcycle loans, boat loans</li>
    <li><strong>Student Loans:</strong> Federal and private student loans</li>
    <li><strong>Credit Cards:</strong> All credit card balances</li>
    <li><strong>Personal Loans:</strong> Bank loans, 401(k) loans, family loans</li>
    <li><strong>Medical Debt:</strong> Outstanding medical bills, payment plans</li>
    <li><strong>Other Debt:</strong> Tax liens, judgments, back taxes owed</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Tips for Accurate Calculation</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Use current values:</strong> For real estate and vehicles, use current market value, not purchase price</li>
    <li><strong>Check all accounts:</strong> Don't forget old 401(k)s, HSAs, or small bank accounts</li>
    <li><strong>Include all debts:</strong> Even small debts like medical bills or personal loans add up</li>
    <li><strong>Be honest:</strong> Overestimating assets or underestimating debts defeats the purpose</li>
    <li><strong>Update regularly:</strong> Calculate your net worth monthly or quarterly to track progress</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ What NOT to Include</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Future income:</strong> Don't count expected salary, inheritance, or future earnings</li>
    <li><strong>Social Security:</strong> While valuable, it's not a liquid asset you own today</li>
    <li><strong>Pension value:</strong> Unless you can calculate the present value, leave it out</li>
    <li><strong>Personal items of low value:</strong> Clothes, basic furniture, and everyday items</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Net Worth</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your net worth snapshot, 
    or use the <strong>Share button</strong> to save the link. All values including all assets and liabilities will be 
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

  .assets-section {
    border-left: 4px solid var(--color-success);
  }

  .liabilities-section {
    border-left: 4px solid var(--color-error);
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

  .item-row.asset-row:hover {
    border-color: var(--color-success);
  }

  .item-row.liability-row:hover {
    border-color: var(--color-error);
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

  .asset-row .item-number {
    background: #E8F5E9;
    color: #2E7D32;
  }

  .liability-row .item-number {
    background: #FFEBEE;
    color: #C62828;
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
    border-left: 4px solid var(--color-success);
  }

  .section-total span {
    font-weight: 600;
    color: var(--color-gray-dark);
  }

  .section-total strong {
    font-size: var(--text-xl);
    color: var(--color-success);
    font-family: var(--font-primary);
  }

  .liability-total {
    background: #FFEBEE;
    border-left-color: var(--color-error);
  }

  .liability-total strong {
    color: var(--color-error);
  }

  .net-worth-preview {
    text-align: center;
    padding: var(--space-xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    border: 2px solid var(--color-light-blue);
    margin-top: var(--space-lg);
  }

  .preview-label {
    font-size: var(--text-lg);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-sm);
  }

  .preview-value {
    font-size: var(--text-4xl);
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .preview-value.positive {
    color: var(--color-success);
  }

  .preview-value.negative {
    color: var(--color-error);
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
  .net-worth-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
  }

  .net-worth-hero.positive {
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border: 2px solid var(--color-success);
  }

  .net-worth-hero.negative {
    background: linear-gradient(135deg, #FFEBEE 0%, #fff 100%);
    border: 2px solid var(--color-error);
  }

  .net-worth-label {
    font-size: var(--text-xl);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-md);
  }

  .net-worth-value {
    font-size: 4rem;
    font-weight: 800;
    font-family: var(--font-primary);
    margin-bottom: var(--space-md);
  }

  .net-worth-value.positive {
    color: var(--color-success);
  }

  .net-worth-value.negative {
    color: var(--color-error);
  }

  .net-worth-status {
    display: inline-block;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 20px;
    font-weight: 600;
    font-size: var(--text-base);
  }

  .net-worth-status.excellent {
    background: #C8E6C9;
    color: #2E7D32;
  }

  .net-worth-status.good {
    background: #DCEDC8;
    color: #558B2F;
  }

  .net-worth-status.fair {
    background: #FFF9C4;
    color: #F9A825;
  }

  .net-worth-status.poor {
    background: #FFECB3;
    color: #FF8F00;
  }

  .net-worth-status.negative {
    background: #FFCDD2;
    color: #C62828;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

  .summary-card.assets-card {
    border-color: var(--color-success);
    border-left-width: 4px;
  }

  .summary-card.liabilities-card {
    border-color: var(--color-error);
    border-left-width: 4px;
  }

  .summary-card.ratio-card {
    border-color: var(--color-light-blue);
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

  .summary-card.assets-card .summary-card-value {
    color: var(--color-success);
  }

  .summary-card.liabilities-card .summary-card-value {
    color: var(--color-error);
  }

  .summary-card.ratio-card .summary-card-value {
    color: var(--color-primary-blue);
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
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

  .chart-container {
    display: flex;
    gap: var(--space-2xl);
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: var(--space-xl) 0;
  }

  .pie-chart-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
  }

  .pie-chart-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .pie-chart-center-label {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }

  .pie-chart-center-value {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-primary-blue);
  }

  .chart-legend {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
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
    flex-shrink: 0;
  }

  .legend-label {
    color: var(--color-gray-dark);
  }

  .legend-value {
    font-weight: 600;
    color: var(--color-primary-blue);
    margin-left: auto;
  }

  .bar-chart {
    margin: var(--space-xl) 0;
  }

  .bar-chart-row {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-md);
    gap: var(--space-md);
  }

  .bar-chart-label {
    width: 100px;
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    text-align: right;
    flex-shrink: 0;
  }

  .bar-chart-track {
    flex: 1;
    height: 24px;
    background: var(--color-gray-light);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .bar-chart-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .bar-chart-fill.assets {
    background: linear-gradient(90deg, #66BB6A, #43A047);
  }

  .bar-chart-fill.liabilities {
    background: linear-gradient(90deg, #EF5350, #E53935);
  }

  .bar-chart-value {
    width: 100px;
    font-size: var(--text-sm);
    font-weight: 600;
    text-align: left;
    flex-shrink: 0;
  }

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

    .net-worth-value {
      font-size: 2.5rem;
    }

    .bar-chart-label,
    .bar-chart-value {
      width: 70px;
      font-size: var(--text-xs);
    }

    .chart-container {
      flex-direction: column;
    }

    .pie-chart-wrapper {
      width: 180px;
      height: 180px;
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

<script src="/scripts/calculators/net-worth-calculator.js"></script>
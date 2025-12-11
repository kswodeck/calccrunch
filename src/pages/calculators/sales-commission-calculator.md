---
layout: ../../layouts/CalculatorLayout.astro
calcType: sales-commission
---

## How to Use This Calculator

1. **Choose your calculation mode** - Simple for basic commission, Advanced for quotas and bonuses
2. **Select your commission structure** - Flat rate, percentage, or tiered commission
3. **Enter your sales data** - Add individual sales with amounts and product info
4. **Set your quota and bonuses** (Advanced mode) - Track progress toward targets
5. Click **Calculate** to see comprehensive earnings breakdown and analytics

<div class="calculator-form" id="sales-commission-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="simple">Simple</button>
      <button type="button" class="mode-btn" data-mode="advanced">Advanced</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Simple mode calculates basic commissions. Advanced mode includes quotas, bonuses, tiered rates, and goal tracking.
    </small>
  </div>

  <div class="form-section">
    <h3>Commission Structure</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="commission-type">
          Commission Type <span class="required">*</span>
          <span class="tooltip" title="How your commission is calculated">?</span>
        </label>
        <select id="commission-type" class="form-select" required>
          <option value="percentage">Percentage of Sale</option>
          <option value="flat">Flat Rate per Sale</option>
          <option value="tiered">Tiered Commission</option>
        </select>
        <small class="form-help">Select how your commission is structured</small>
      </div>
      <div class="form-group" id="base-rate-group">
        <label for="base-commission-rate">
          Base Commission Rate <span class="required">*</span>
          <span class="tooltip" title="Your standard commission percentage or flat amount">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="base-commission-rate" 
            class="form-input"
            placeholder="10"
            value="10"
            min="0"
            max="100"
            step="0.1"
            required
          />
          <span class="input-addon" id="rate-addon">%</span>
        </div>
        <small class="form-help" id="rate-help">Percentage of sale value</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="time-period">
          Time Period <span class="required">*</span>
          <span class="tooltip" title="Period for quota and goal tracking">?</span>
        </label>
        <select id="time-period" class="form-select" required>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly" selected>Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annual">Annual</option>
        </select>
        <small class="form-help">Select your commission/reporting period</small>
      </div>
      <div class="form-group">
        <label for="base-salary">
          Base Salary (Optional)
          <span class="tooltip" title="Your fixed salary before commission">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="base-salary" 
            class="form-input"
            placeholder="0"
            value=""
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Fixed pay per period (if applicable)</small>
      </div>
    </div>
  </div>

  <!-- Tiered Commission Section -->
  <div class="form-section tiered-section hidden">
    <h3>Commission Tiers</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Define commission rates that increase as you hit sales thresholds</p>
    <div id="tiers-container">
      <!-- Tiers will be added here dynamically -->
    </div>
    <button type="button" id="add-tier-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Tier
    </button>
  </div>

  <!-- Advanced: Quota Section -->
  <div class="form-section advanced-section hidden">
    <h3>Sales Quota & Goals</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="sales-quota">
          Sales Quota
          <span class="tooltip" title="Your target sales amount for the period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="sales-quota" 
            class="form-input"
            placeholder="50000"
            value=""
            min="0"
            step="1000"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Target sales for your period</small>
      </div>
      <div class="form-group">
        <label for="quota-bonus">
          Quota Achievement Bonus
          <span class="tooltip" title="Extra bonus for hitting or exceeding quota">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="quota-bonus" 
            class="form-input"
            placeholder="500"
            value=""
            min="0"
            step="50"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Bonus for hitting 100% of quota</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="accelerator-rate">
          Accelerator Rate (Above Quota)
          <span class="tooltip" title="Higher commission rate for sales above quota">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="accelerator-rate" 
            class="form-input"
            placeholder="15"
            value=""
            min="0"
            max="100"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Commission rate on sales exceeding quota</small>
      </div>
      <div class="form-group">
        <label for="income-goal">
          Income Goal
          <span class="tooltip" title="Your target total earnings for the period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="income-goal" 
            class="form-input"
            placeholder="8000"
            value=""
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your target total compensation</small>
      </div>
    </div>
  </div>

  <!-- Advanced: Bonuses Section -->
  <div class="form-section advanced-section hidden">
    <h3>Additional Bonuses (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="spiff-bonus">
          SPIFF/Contest Bonus
          <span class="tooltip" title="Special incentive bonuses or contest winnings">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="spiff-bonus" 
            class="form-input"
            placeholder="0"
            value=""
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">One-time bonuses or SPIFFs earned</small>
      </div>
      <div class="form-group">
        <label for="referral-bonus">
          Referral/Other Bonuses
          <span class="tooltip" title="Referral bonuses or other additional compensation">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="referral-bonus" 
            class="form-input"
            placeholder="0"
            value=""
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Referral or miscellaneous bonuses</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Sales Entries</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Add individual sales or deals. You can add multiple entries for different products or customers.</p>
    <div id="sales-container">
      <!-- Sales rows will be added here dynamically -->
    </div>
    <button type="button" id="add-sale-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Sale
    </button>
    <div class="sales-summary" id="sales-summary" style="display: none;">
      <div class="summary-row">
        <span>Total Sales:</span>
        <strong id="total-sales-preview">$0</strong>
      </div>
      <div class="summary-row">
        <span>Number of Deals:</span>
        <strong id="deal-count-preview">0</strong>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Quick Entry Mode</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Alternatively, enter your total sales directly if you don't need to track individual deals.</p>
    <div class="form-row">
      <div class="form-group">
        <label for="quick-total-sales">
          Total Sales Amount
          <span class="tooltip" title="Enter your total sales for the period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="quick-total-sales" 
            class="form-input"
            placeholder="25000"
            value=""
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Total sales (overrides individual entries if filled)</small>
      </div>
      <div class="form-group">
        <label for="quick-deal-count">
          Number of Deals
          <span class="tooltip" title="Total number of closed deals">?</span>
        </label>
        <input 
          type="number" 
          id="quick-deal-count" 
          class="form-input"
          placeholder="10"
          value=""
          min="0"
          step="1"
        />
        <small class="form-help">Total deals closed (for flat rate)</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Commission →
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

<div id="commission-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💼 What Is Sales Commission?</h4>
  <p>
    <strong>Sales commission</strong> is a performance-based payment made to salespeople based on the sales they generate.
    Commission structures vary widely - from simple percentages to complex tiered systems with quotas and accelerators.
    This calculator helps you understand your earnings potential and track progress toward your sales goals.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 Commission Structures Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Percentage:</strong> Earn a fixed percentage of each sale (e.g., 10% of $5,000 = $500)</li>
    <li><strong>Flat Rate:</strong> Earn a set amount per deal regardless of size (e.g., $200 per closed deal)</li>
    <li><strong>Tiered:</strong> Earn higher rates as you sell more (e.g., 5% up to $10K, 8% on $10K-$25K, 12% above $25K)</li>
    <li><strong>Accelerators:</strong> Higher commission rates kick in after hitting quota</li>
    <li><strong>Quota Bonus:</strong> One-time bonus for achieving your sales target</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>🎯 Understanding Your Results</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Base Commission:</strong> Standard earnings from your sales</li>
    <li><strong>Accelerator Commission:</strong> Extra earnings from sales above quota</li>
    <li><strong>Quota Achievement:</strong> Percentage of your sales target reached</li>
    <li><strong>Effective Rate:</strong> Your actual commission percentage (total commission ÷ total sales)</li>
    <li><strong>Average Deal Size:</strong> Your total sales divided by number of deals</li>
    <li><strong>Earnings Per Deal:</strong> Average commission earned per closed deal</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Tips for Maximizing Commission</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Know Your Tiers:</strong> Understand where tier breaks are and push to reach the next level</li>
    <li><strong>Track Progress:</strong> Regularly monitor quota attainment throughout the period</li>
    <li><strong>Focus on High-Value Deals:</strong> Larger deals often have better ROI on your time</li>
    <li><strong>Time Your Closes:</strong> If near a tier break, push to close deals in the same period</li>
    <li><strong>Stack SPIFFs:</strong> Take advantage of promotional bonuses when available</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to track your progress over time,
    or use the <strong>Share button</strong> to discuss your compensation with managers or colleagues. All values including individual sales entries will be restored automatically.
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

  .advanced-section,
  .tiered-section {
    transition: all 0.3s ease;
  }

  .advanced-section.hidden,
  .tiered-section.hidden {
    display: none;
  }

  .sales-row,
  .tier-row {
    background: #f8f9fa;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    position: relative;
  }

  .sales-header,
  .tier-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .sale-number,
  .tier-number {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
  }

  .remove-sale-btn,
  .remove-tier-btn {
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

  .remove-sale-btn:hover,
  .remove-tier-btn:hover {
    color: #c62828;
    background: #ffebee;
    border-radius: 4px;
  }

  #add-sale-btn,
  #add-tier-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .sales-summary {
    margin-top: 1.5rem;
    padding: 1rem;
    background: var(--color-lighter-blue);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-accent-orange);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .summary-row span {
    color: var(--color-gray-dark);
  }

  .summary-row strong {
    color: var(--color-primary-blue);
    font-size: 1.1rem;
  }

  /* Result Styles */
  .commission-summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .summary-card {
    background: white;
    border-radius: 12px;
    padding: 1.25rem;
    text-align: center;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
  }

  .summary-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .summary-card.highlight {
    background: linear-gradient(135deg, #fff8dc 0%, #fffef0 100%);
    border-color: var(--color-accent-orange);
  }

  .summary-card-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .summary-card-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .summary-card-value.positive {
    color: var(--color-success);
  }

  .summary-card-value.negative {
    color: var(--color-error);
  }

  .summary-card-value.highlight {
    color: var(--color-accent-orange);
  }

  .summary-card-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Progress Bar */
  .quota-progress-container {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #e5e7eb;
  }

  .quota-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .quota-progress-header h4 {
    margin: 0;
    color: var(--color-primary-blue);
  }

  .quota-percentage {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
  }

  .progress-bar-wrapper {
    background: #e5e7eb;
    border-radius: 10px;
    height: 24px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5rem;
    min-width: 40px;
  }

  .progress-bar-fill.under-quota {
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  }

  .progress-bar-fill.at-quota {
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }

  .progress-bar-fill.over-quota {
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
  }

  .progress-bar-text {
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .progress-milestones {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }

  .milestone {
    text-align: center;
  }

  .milestone.achieved {
    color: var(--color-success);
    font-weight: 600;
  }

  /* Breakdown Table */
  .commission-breakdown {
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

  .commission-table {
    width: 100%;
    border-collapse: collapse;
  }

  .commission-table thead {
    background: #374151;
    color: white;
  }

  .commission-table th,
  .commission-table td {
    padding: 0.75rem 1rem;
    text-align: right;
  }

  .commission-table th:first-child,
  .commission-table td:first-child {
    text-align: left;
  }

  .commission-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }

  .commission-table tbody tr:hover {
    background: #f9fafb;
  }

  .commission-table .total-row {
    background: #f0fdf4;
    font-weight: 700;
  }

  .commission-table .subtotal-row {
    background: #f8f9fa;
    font-weight: 600;
  }

  /* Tier Breakdown Visual */
  .tier-visual {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .tier-bar {
    display: flex;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;
  }

  .tier-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    transition: all 0.3s;
    min-width: 60px;
  }

  .tier-segment:nth-child(1) { background: #3b82f6; }
  .tier-segment:nth-child(2) { background: #8b5cf6; }
  .tier-segment:nth-child(3) { background: #f59e0b; }
  .tier-segment:nth-child(4) { background: #10b981; }
  .tier-segment:nth-child(5) { background: #ef4444; }

  .tier-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }

  .tier-legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .tier-legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  /* Earnings Breakdown Chart */
  .earnings-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .earnings-bar-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .earnings-bar-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .earnings-bar-label {
    min-width: 140px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-gray-dark);
  }

  .earnings-bar-wrapper {
    flex: 1;
    background: #e5e7eb;
    border-radius: 6px;
    height: 28px;
    overflow: hidden;
  }

  .earnings-bar {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    min-width: 60px;
    transition: width 0.5s ease;
  }

  .earnings-bar.base-salary {
    background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
  }

  .earnings-bar.base-commission {
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  }

  .earnings-bar.accelerator {
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
  }

  .earnings-bar.bonus {
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }

  .earnings-bar-amount {
    color: white;
    font-weight: 700;
    font-size: 0.85rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  /* Insights */
  .commission-insights {
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

  /* Goal Progress */
  .goal-progress {
    background: linear-gradient(135deg, #E8F4F8 0%, #fff 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 2px solid var(--color-light-blue);
  }

  .goal-progress h4 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .goal-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .goal-stat {
    text-align: center;
  }

  .goal-stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
  }

  .goal-stat-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }

    .sales-row,
    .tier-row {
      padding: 1rem;
    }

    .commission-summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .summary-card-value {
      font-size: 1.2rem;
    }

    .earnings-bar-label {
      min-width: 100px;
      font-size: 0.8rem;
    }

    .mode-toggle {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .commission-summary-cards {
      grid-template-columns: 1fr;
    }

    .earnings-bar-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .earnings-bar-wrapper {
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

    .remove-sale-btn,
    .remove-tier-btn {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/sales-commission-calculator.js"></script>
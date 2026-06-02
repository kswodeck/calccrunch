---
layout: ../../layouts/CalculatorLayout.astro
calcType: college-savings
---

## How to Use This Calculator

1. Enter your **child's current age**
2. Set the **expected college start age** (default 18)
3. Select the **college type** (in-state public, out-of-state, or private)
4. Input your **current 529 plan balance**
5. Set your **monthly contribution** amount
6. Adjust **return rate** and **inflation rate** as needed
7. Click **Calculate** to see your college savings projection

<div class="calculator-form" id="college-savings-form">
  <div class="form-section">
    <h3>Child Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="child-age">
          Child's Current Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="child-age" 
            class="form-input"
            placeholder="5"
            value="5"
            min="0"
            max="17"
            step="1"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Your child's age today</small>
      </div>
      <div class="form-group">
        <label for="college-start-age">
          College Start Age
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="college-start-age" 
            class="form-input"
            placeholder="18"
            value="18"
            min="16"
            max="22"
            step="1"
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Age when college begins</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>College Cost Estimates</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="college-type">
          College Type <span class="required">*</span>
        </label>
        <select id="college-type" class="form-select" required>
          <option value="in-state">In-State Public ($23,250/yr)</option>
          <option value="out-of-state">Out-of-State Public ($40,550/yr)</option>
          <option value="private" selected>Private University ($56,190/yr)</option>
          <option value="custom">Custom Amount</option>
        </select>
        <small class="form-help">Total annual cost (tuition + room & board)</small>
      </div>
      <div class="form-group">
        <label for="custom-annual-cost">
          Custom Annual Cost
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="custom-annual-cost" 
            class="form-input"
            placeholder="40000"
            value="40000"
            min="0"
            step="1000"
            disabled
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Enter if using custom college type</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="college-years">
          Years of College
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="college-years" 
            class="form-input"
            placeholder="4"
            value="4"
            min="1"
            max="8"
            step="1"
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Expected duration of degree</small>
      </div>
      <div class="form-group">
        <label for="cost-inflation">
          College Cost Inflation
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="cost-inflation" 
            class="form-input"
            placeholder="5"
            value="5"
            min="0"
            max="15"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Annual college cost increase (avg 5%)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Savings Plan</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-529-balance">
          Current 529 Balance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-529-balance" 
            class="form-input"
            placeholder="10000"
            value="10000"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Current savings for college</small>
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
            placeholder="300"
            value="300"
            min="0"
            step="25"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Monthly amount to save</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expected-return">
          Expected Annual Return
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="expected-return" 
            class="form-input"
            placeholder="7"
            value="7"
            min="0"
            max="20"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected investment return rate</small>
      </div>
      <div class="form-group">
        <label for="state-tax-rate">
          State Tax Deduction Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="state-tax-rate" 
            class="form-input"
            placeholder="5"
            value="5"
            min="0"
            max="15"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">State income tax rate for 529 deduction (0 if none)</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate College Savings →
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

<div id="college-savings-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🎓 Why Start Saving Early for College?</h4>
  <p>
    College costs have been rising at approximately <strong>5% per year</strong>, outpacing general inflation. 
    A child born today could face college costs 2-3x higher than current prices. Starting early gives 
    compound interest time to work, potentially covering a significant portion of costs through 
    investment growth alone.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💰 529 Plan Benefits</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Tax-free growth:</strong> Investment gains are never taxed when used for education</li>
    <li><strong>State tax deduction:</strong> Many states offer income tax deductions for contributions</li>
    <li><strong>High contribution limits:</strong> Up to $18,000/year per beneficiary (gift tax free)</li>
    <li><strong>Superfunding:</strong> Contribute up to $90,000 at once (5-year gift tax averaging)</li>
    <li><strong>Flexible use:</strong> Can be used for K-12, trade schools, and graduate programs</li>
    <li><strong>Transferable:</strong> Change beneficiary to another family member if unused</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Current College Cost Averages (2025-2026)</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>In-state public:</strong> ~$23,250/year (tuition + room & board)</li>
    <li><strong>Out-of-state public:</strong> ~$40,550/year</li>
    <li><strong>Private university:</strong> ~$56,190/year</li>
    <li><strong>4-year total (private):</strong> ~$224,760</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Note:</strong> These are averages. Elite private universities can exceed $80,000/year.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>💡 Strategies to Maximize Savings</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start at birth:</strong> Even $100/month from birth can grow significantly</li>
    <li><strong>Gift contributions:</strong> Ask family for 529 contributions for birthdays/holidays</li>
    <li><strong>Age-based allocation:</strong> Use aggressive funds early, shift conservative near college</li>
    <li><strong>Multiple funding sources:</strong> Don't try to cover 100% - combine with scholarships, financial aid</li>
    <li><strong>Automatic increases:</strong> Raise contributions annually with salary increases</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>⚠️ Important Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>529 plans may impact financial aid eligibility (typically minor impact)</li>
    <li>Non-qualified withdrawals incur taxes + 10% penalty on earnings</li>
    <li>Investment returns are not guaranteed</li>
    <li>College costs may rise faster or slower than projected</li>
    <li>Scholarships and grants can significantly reduce out-of-pocket costs</li>
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

  .funding-status {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    gap: 1rem;
  }

  .funding-status.status-funded {
    background: var(--color-highlight-green);
    border: 2px solid #10b981;
  }

  .funding-status.status-partial {
    background: var(--color-highlight-yellow);
    border: 2px solid #f59e0b;
  }

  .funding-status.status-gap {
    background: var(--color-highlight-red);
    border: 2px solid #ef4444;
  }

  .status-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .status-content h4 {
    margin: 0 0 0.25rem 0;
  }

  .status-content p {
    margin: 0;
    color: var(--color-gray-dark);
  }

  .college-summary {
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

  .summary-card h5 {
    margin: 0 0 0.5rem 0;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .summary-card .amount {
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--color-black);
  }

  .summary-card .amount.text-success {
    color: var(--color-success);
  }

  .summary-card .amount.text-danger {
    color: var(--color-error);
  }

  .summary-card .amount.text-primary {
    color: var(--color-light-blue);
  }

  .summary-card .detail {
    font-size: 0.8rem;
    color: var(--color-gray);
    margin-top: 0.25rem;
  }

  .funding-progress {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-surface-neutral);
    border-radius: 12px;
  }

  .funding-bar-container {
    position: relative;
    width: 100%;
    height: 35px;
    background: var(--color-gray);
    border-radius: 17px;
    overflow: hidden;
    margin: 1rem 0;
  }

  .funding-bar-fill {
    height: 100%;
    border-radius: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
    transition: width 0.8s ease;
  }

  .funding-bar-fill.funded {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  .funding-bar-fill.partial {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }

  .funding-bar-fill.low {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }

  .yearly-growth {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .growth-table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }

  .growth-table {
    width: 100%;
    border-collapse: collapse;
  }

  .growth-table thead {
    background: var(--color-surface-neutral);
  }

  .growth-table th,
  .growth-table td {
    padding: 0.6rem 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.875rem;
  }

  .growth-table th:first-child,
  .growth-table td:first-child {
    text-align: left;
  }

  .growth-table .college-year {
    background: var(--color-highlight-yellow);
    font-weight: 600;
  }

  .what-if-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .what-if-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .what-if-card {
    padding: 1.25rem;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: var(--color-surface-neutral);
  }

  .what-if-card h5 {
    margin: 0 0 0.75rem 0;
    color: var(--color-gray-dark);
  }

  .what-if-card .scenario-result {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .what-if-card .scenario-result.positive {
    color: var(--color-success);
  }

  .what-if-card .scenario-result.negative {
    color: var(--color-error);
  }

  .what-if-card .scenario-detail {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }

  .tax-savings-box {
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 12px;
    border: 1px solid #93c5fd;
  }

  .tax-savings-box h4 {
    margin: 0 0 1rem 0;
    color: var(--color-primary-blue);
  }

  .tax-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .tax-item {
    text-align: center;
  }

  .tax-item .tax-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.25rem;
  }

  .tax-item .tax-value {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-primary-blue);
  }

  .needed-contribution {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%);
    border-radius: 12px;
    border: 2px solid #c084fc;
    text-align: center;
  }

  .needed-contribution h4 {
    margin: 0 0 0.5rem 0;
    color: var(--color-primary-blue);
  }

  .needed-contribution .big-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary-blue);
  }

  .needed-contribution .context {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }

  .text-success { color: var(--color-success); }
  .text-danger { color: var(--color-error); }

  @media (max-width: 768px) {
    .college-summary {
      grid-template-columns: 1fr 1fr;
    }

    .what-if-grid {
      grid-template-columns: 1fr;
    }

    .tax-grid {
      grid-template-columns: 1fr 1fr;
    }

    .growth-table {
      font-size: 0.8rem;
    }

    .growth-table th,
    .growth-table td {
      padding: 0.4rem 0.5rem;
    }
  }
</style>

<script src="/scripts/calculators/college-savings-calculator.js"></script>

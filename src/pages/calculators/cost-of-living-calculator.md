---
layout: ../../layouts/CalculatorLayout.astro
calcType: cost-of-living
---

## How to Use This Calculator

1. Select your **current city** from the dropdown
2. Select the **target city** you're considering moving to
3. Enter your **current annual salary**
4. Choose your **filing status** for tax comparison
5. Select your **housing status** (renter or homeowner)
6. Enter your **household size** and whether you have children
7. Click **Compare Cost of Living** to see the full analysis

<div class="calculator-form" id="cost-of-living-calculator-form">
  <div class="form-section">
    <h3>Location Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-city">
          Current City <span class="required">*</span>
        </label>
        <select id="current-city" class="form-select" required>
          <option value="">Select your current city</option>
          <option value="new-york">New York, NY</option>
          <option value="san-francisco">San Francisco, CA</option>
          <option value="honolulu">Honolulu, HI</option>
          <option value="los-angeles">Los Angeles, CA</option>
          <option value="boston">Boston, MA</option>
          <option value="washington-dc">Washington, DC</option>
          <option value="seattle">Seattle, WA</option>
          <option value="san-diego">San Diego, CA</option>
          <option value="miami">Miami, FL</option>
          <option value="sacramento">Sacramento, CA</option>
          <option value="portland">Portland, OR</option>
          <option value="denver">Denver, CO</option>
          <option value="anchorage">Anchorage, AK</option>
          <option value="austin">Austin, TX</option>
          <option value="philadelphia">Philadelphia, PA</option>
          <option value="chicago">Chicago, IL</option>
          <option value="hartford">Hartford, CT</option>
          <option value="burlington">Burlington, VT</option>
          <option value="baltimore">Baltimore, MD</option>
          <option value="minneapolis">Minneapolis, MN</option>
          <option value="charleston">Charleston, SC</option>
          <option value="atlanta">Atlanta, GA</option>
          <option value="salt-lake-city">Salt Lake City, UT</option>
          <option value="nashville">Nashville, TN</option>
          <option value="las-vegas">Las Vegas, NV</option>
          <option value="dallas">Dallas, TX</option>
          <option value="boise">Boise, ID</option>
          <option value="phoenix">Phoenix, AZ</option>
          <option value="orlando">Orlando, FL</option>
          <option value="tampa">Tampa, FL</option>
          <option value="raleigh">Raleigh, NC</option>
          <option value="houston">Houston, TX</option>
          <option value="richmond">Richmond, VA</option>
          <option value="new-orleans">New Orleans, LA</option>
          <option value="charlotte">Charlotte, NC</option>
          <option value="savannah">Savannah, GA</option>
          <option value="jacksonville">Jacksonville, FL</option>
          <option value="tucson">Tucson, AZ</option>
          <option value="milwaukee">Milwaukee, WI</option>
          <option value="albuquerque">Albuquerque, NM</option>
          <option value="columbus">Columbus, OH</option>
          <option value="pittsburgh">Pittsburgh, PA</option>
          <option value="san-antonio">San Antonio, TX</option>
          <option value="kansas-city">Kansas City, MO</option>
          <option value="cincinnati">Cincinnati, OH</option>
          <option value="louisville">Louisville, KY</option>
          <option value="indianapolis">Indianapolis, IN</option>
          <option value="omaha">Omaha, NE</option>
          <option value="des-moines">Des Moines, IA</option>
          <option value="st-louis">St. Louis, MO</option>
          <option value="cleveland">Cleveland, OH</option>
          <option value="detroit">Detroit, MI</option>
          <option value="oklahoma-city">Oklahoma City, OK</option>
          <option value="little-rock">Little Rock, AR</option>
          <option value="memphis">Memphis, TN</option>
        </select>
      </div>
      <div class="form-group">
        <label for="target-city">
          Target City <span class="required">*</span>
        </label>
        <select id="target-city" class="form-select" required>
          <option value="">Select your target city</option>
          <option value="new-york">New York, NY</option>
          <option value="san-francisco">San Francisco, CA</option>
          <option value="honolulu">Honolulu, HI</option>
          <option value="los-angeles">Los Angeles, CA</option>
          <option value="boston">Boston, MA</option>
          <option value="washington-dc">Washington, DC</option>
          <option value="seattle">Seattle, WA</option>
          <option value="san-diego">San Diego, CA</option>
          <option value="miami">Miami, FL</option>
          <option value="sacramento">Sacramento, CA</option>
          <option value="portland">Portland, OR</option>
          <option value="denver">Denver, CO</option>
          <option value="anchorage">Anchorage, AK</option>
          <option value="austin">Austin, TX</option>
          <option value="philadelphia">Philadelphia, PA</option>
          <option value="chicago">Chicago, IL</option>
          <option value="hartford">Hartford, CT</option>
          <option value="burlington">Burlington, VT</option>
          <option value="baltimore">Baltimore, MD</option>
          <option value="minneapolis">Minneapolis, MN</option>
          <option value="charleston">Charleston, SC</option>
          <option value="atlanta">Atlanta, GA</option>
          <option value="salt-lake-city">Salt Lake City, UT</option>
          <option value="nashville">Nashville, TN</option>
          <option value="las-vegas">Las Vegas, NV</option>
          <option value="dallas">Dallas, TX</option>
          <option value="boise">Boise, ID</option>
          <option value="phoenix">Phoenix, AZ</option>
          <option value="orlando">Orlando, FL</option>
          <option value="tampa">Tampa, FL</option>
          <option value="raleigh">Raleigh, NC</option>
          <option value="houston">Houston, TX</option>
          <option value="richmond">Richmond, VA</option>
          <option value="new-orleans">New Orleans, LA</option>
          <option value="charlotte">Charlotte, NC</option>
          <option value="savannah">Savannah, GA</option>
          <option value="jacksonville">Jacksonville, FL</option>
          <option value="tucson">Tucson, AZ</option>
          <option value="milwaukee">Milwaukee, WI</option>
          <option value="albuquerque">Albuquerque, NM</option>
          <option value="columbus">Columbus, OH</option>
          <option value="pittsburgh">Pittsburgh, PA</option>
          <option value="san-antonio">San Antonio, TX</option>
          <option value="kansas-city">Kansas City, MO</option>
          <option value="cincinnati">Cincinnati, OH</option>
          <option value="louisville">Louisville, KY</option>
          <option value="indianapolis">Indianapolis, IN</option>
          <option value="omaha">Omaha, NE</option>
          <option value="des-moines">Des Moines, IA</option>
          <option value="st-louis">St. Louis, MO</option>
          <option value="cleveland">Cleveland, OH</option>
          <option value="detroit">Detroit, MI</option>
          <option value="oklahoma-city">Oklahoma City, OK</option>
          <option value="little-rock">Little Rock, AR</option>
          <option value="memphis">Memphis, TN</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Income & Tax Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-salary">
          Current Annual Salary <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-salary" 
            class="form-input"
            placeholder="75000"
            value="75000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Your gross annual income before taxes</small>
      </div>
      <div class="form-group">
        <label for="filing-status">
          Filing Status <span class="required">*</span>
        </label>
        <select id="filing-status" class="form-select" required>
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head-of-household">Head of Household</option>
        </select>
        <small class="form-help">Used for tax comparison estimates</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Household Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="housing-status">
          Housing Status <span class="required">*</span>
        </label>
        <select id="housing-status" class="form-select" required>
          <option value="renter">Renter</option>
          <option value="homeowner">Homeowner</option>
        </select>
        <small class="form-help">Affects housing cost estimates</small>
      </div>
      <div class="form-group">
        <label for="household-size">
          Household Size <span class="required">*</span>
        </label>
        <select id="household-size" class="form-select" required>
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4+ people</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="has-children">
          Do You Have Children?
        </label>
        <select id="has-children" class="form-select">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <small class="form-help">Includes childcare cost comparison</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Compare Cost of Living →
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

<div id="cost-of-living-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>Understanding Cost of Living Indices</h4>
  <p>
    Cost of living indices compare how expensive it is to live in one city versus another, using the <strong>national average as a baseline of 100</strong>. 
    A city with an index of 150 is 50% more expensive than average, while a city at 85 is 15% cheaper than average. 
    The biggest differentiator between cities is typically <strong>housing costs</strong>, which can vary dramatically.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Key Cost of Living Factors</h4>
  <p>
    When comparing cities, these categories have the biggest impact on your budget:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Housing:</strong> Typically 30-40% of your budget; varies most between cities</li>
    <li><strong>Taxes:</strong> State income tax ranges from 0% to over 13%; sales tax and property tax also vary</li>
    <li><strong>Transportation:</strong> Car-dependent cities vs. public transit cities have very different costs</li>
    <li><strong>Healthcare:</strong> Insurance premiums and out-of-pocket costs vary by region</li>
    <li><strong>Groceries:</strong> Food costs can differ 20-40% between expensive and affordable cities</li>
    <li><strong>Childcare:</strong> Ranges from $800/month in some cities to $2,500+ in others</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>What to Consider When Relocating</h4>
  <p>
    Beyond the numbers, consider these factors when evaluating a move:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Career growth:</strong> Higher-cost cities often have more job opportunities and higher salaries</li>
    <li><strong>Quality of life:</strong> Climate, culture, outdoor activities, and social scene</li>
    <li><strong>Remote work:</strong> If you can keep a high-cost-city salary while living somewhere cheaper, your purchasing power increases dramatically</li>
    <li><strong>Moving costs:</strong> Factor in the one-time expense of relocating (typically $5,000-$15,000)</li>
    <li><strong>Social network:</strong> Being near family and friends has real value that's hard to quantify</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Save & Share Your Comparison</h4>
  <p>
    Your cost of living comparison is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<style>
  .result-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-md);
    margin: 0;
    gap: 0;
  }

  .equivalent-salary {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .equivalent-salary .big-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    margin: 0.5rem 0;
  }

  .equivalent-salary .context {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
  }

  .percentage-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }

  .percentage-badge.higher {
    background: #fee2e2;
    color: #dc2626;
  }

  .percentage-badge.lower {
    background: #dcfce7;
    color: #16a34a;
  }

  .category-comparison {
    margin: 2rem 0;
  }

  .category-comparison h3 {
    margin-bottom: 1rem;
  }

  .category-bar {
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    background: var(--color-surface-neutral);
    border-radius: 8px;
  }

  .category-bar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .category-bar-visual {
    display: flex;
    gap: 4px;
    height: 24px;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-current {
    background: #3b82f6;
    border-radius: 4px 0 0 4px;
    transition: width 0.5s ease;
  }

  .bar-target {
    background: #10b981;
    border-radius: 0 4px 4px 0;
    transition: width 0.5s ease;
  }

  .category-bar-legend {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }

  .budget-comparison {
    margin: 2rem 0;
  }

  .budget-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .budget-table th,
  .budget-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }

  .budget-table th:first-child,
  .budget-table td:first-child {
    text-align: left;
  }

  .budget-table thead {
    background: var(--color-surface-neutral);
  }

  .budget-table .total-row {
    font-weight: bold;
    border-top: 2px solid #374151;
  }

  .budget-table .difference-positive {
    color: #16a34a;
  }

  .budget-table .difference-negative {
    color: #dc2626;
  }

  .tax-comparison {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-surface-neutral);
    border-radius: 12px;
  }

  .tax-comparison h3 {
    margin-bottom: 1rem;
  }

  .tax-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .tax-card {
    background: var(--color-white);
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .tax-card h4 {
    margin-bottom: 0.75rem;
    color: var(--color-primary-blue);
  }

  .tax-item {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    font-size: 0.9rem;
  }

  .tax-item-label {
    color: var(--color-text-secondary);
  }

  .purchasing-power {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .purchasing-power h3 {
    margin-bottom: 1rem;
  }

  .power-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .power-card {
    text-align: center;
    padding: 1.25rem;
    background: var(--color-surface-neutral);
    border-radius: 8px;
  }

  .power-card .city-name {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .power-card .power-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
  }

  .power-card .power-label {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .quality-notes {
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    border-left: 4px solid var(--color-primary-blue);
  }

  .quality-notes h3 {
    margin-bottom: 0.75rem;
  }

  .quality-notes ul {
    padding-left: 1.25rem;
  }

  .quality-notes li {
    margin: 0.4rem 0;
    line-height: 1.5;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .equivalent-salary .big-number {
      font-size: 1.8rem;
    }

    .tax-grid {
      grid-template-columns: 1fr;
    }

    .power-comparison {
      grid-template-columns: 1fr;
    }

    .budget-table {
      font-size: 0.85rem;
    }

    .budget-table th,
    .budget-table td {
      padding: 0.5rem;
    }

    .form-actions {
      flex-direction: column;
    }
  }

  @media print {
    .btn, button {
      display: none !important;
    }
  }
</style>

<script src="/scripts/calculators/cost-of-living-calculator.js"></script>

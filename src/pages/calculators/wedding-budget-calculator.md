---
layout: ../../layouts/CalculatorLayout.astro
calcType: wedding-budget
---

## How to Use This Calculator

1. **Enter your total wedding budget** - The maximum you want to spend on your entire wedding
2. **Set your guest count** - This impacts venue, catering, and per-person costs
3. **Select your region** - Location significantly affects vendor pricing
4. **Choose your style and preferences** - Season, style, and ceremony type adjust allocations
5. **Toggle categories** - Include or exclude vendors to customize your budget breakdown
6. Click **Calculate Budget** to see your personalized allocation with vendor ranges and tips

<div class="calculator-form" id="wedding-budget-calculator-form">
  <div class="form-section">
    <h3>Budget & Guest Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="total-budget">
          Total Wedding Budget <span class="required">*</span>
          <span class="tooltip" title="Your maximum total wedding spend including all vendors and extras">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="total-budget" 
            class="form-input"
            placeholder="30000"
            value="30000"
            min="1000"
            max="1000000"
            step="500"
            required
          />
        </div>
        <small class="form-help">Average US wedding cost is ~$33,000 (2024)</small>
      </div>
      <div class="form-group">
        <label for="guest-count">
          Guest Count <span class="required">*</span>
          <span class="tooltip" title="Total number of guests expected at your wedding">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="guest-count" 
            class="form-input"
            placeholder="120"
            value="120"
            min="2"
            max="1000"
            step="1"
            required
          />
          <span class="input-addon">guests</span>
        </div>
        <small class="form-help">Impacts per-person costs for catering, favors, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Location & Timing</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="region">
          Region / Location
          <span class="tooltip" title="Wedding vendor pricing varies significantly by region">?</span>
        </label>
        <select id="region" class="form-select">
          <option value="1.7">NYC / San Francisco / Los Angeles</option>
          <option value="1.4">Boston / DC / Chicago / Miami</option>
          <option value="1.2">Denver / Seattle / Austin</option>
          <option value="1.0" selected>National Average</option>
          <option value="0.8">South / Midwest Smaller Cities</option>
          <option value="0.6">Rural Areas</option>
        </select>
        <small class="form-help">Adjusts vendor pricing based on local market rates</small>
      </div>
      <div class="form-group">
        <label for="season">
          Wedding Season
          <span class="tooltip" title="Peak season (June-October) typically costs 10-20% more">?</span>
        </label>
        <select id="season" class="form-select">
          <option value="peak" selected>Peak Season (June - October)</option>
          <option value="off-peak">Off-Peak (November - May)</option>
        </select>
        <small class="form-help">Off-peak can save 10-20% on many vendors</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Wedding Style & Ceremony</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="wedding-style">
          Wedding Style
          <span class="tooltip" title="Style affects quality level and allocation priorities">?</span>
        </label>
        <select id="wedding-style" class="form-select">
          <option value="budget">Budget-Friendly</option>
          <option value="average" selected>Average</option>
          <option value="upscale">Upscale</option>
          <option value="luxury">Luxury</option>
        </select>
        <small class="form-help">Affects vendor tier recommendations and priority allocations</small>
      </div>
      <div class="form-group">
        <label for="ceremony-type">
          Ceremony Type
          <span class="tooltip" title="Ceremony style can affect venue and coordination costs">?</span>
        </label>
        <select id="ceremony-type" class="form-select">
          <option value="religious">Religious Venue</option>
          <option value="outdoor" selected>Outdoor</option>
          <option value="destination">Destination</option>
          <option value="courthouse">Courthouse + Reception</option>
        </select>
        <small class="form-help">Different ceremony types have different cost structures</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Optional: Wedding Date (for Savings Plan)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="wedding-date">
          Wedding Date
          <span class="tooltip" title="Enter your wedding date to see a monthly savings plan">?</span>
        </label>
        <input 
          type="date" 
          id="wedding-date" 
          class="form-input"
        />
        <small class="form-help">Optional - used to calculate monthly savings plan</small>
      </div>
      <div class="form-group">
        <label for="amount-saved">
          Amount Already Saved
          <span class="tooltip" title="How much you've already saved toward your wedding">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="amount-saved" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            max="1000000"
            step="100"
          />
        </div>
        <small class="form-help">Enter what you've already set aside</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Categories to Include</h3>
    <p class="section-description">Toggle categories on/off to customize your budget. Excluded categories will redistribute funds to included ones.</p>
    <div class="category-toggles" id="category-toggles">
      <label class="toggle-item">
        <input type="checkbox" id="cat-venue" checked />
        <span class="toggle-label">Venue & Catering <small>(40-50%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-photo" checked />
        <span class="toggle-label">Photography & Videography <small>(10-12%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-music" checked />
        <span class="toggle-label">Music / DJ / Band <small>(6-8%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-flowers" checked />
        <span class="toggle-label">Flowers & Decorations <small>(8-10%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-attire" checked />
        <span class="toggle-label">Wedding Attire <small>(5-8%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-beauty" checked />
        <span class="toggle-label">Hair & Makeup <small>(2-3%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-stationery" checked />
        <span class="toggle-label">Invitations & Stationery <small>(2-3%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-cake" checked />
        <span class="toggle-label">Wedding Cake / Desserts <small>(2-3%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-transport" checked />
        <span class="toggle-label">Transportation <small>(2-3%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-officiant" checked />
        <span class="toggle-label">Officiant <small>(1%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-planner" checked />
        <span class="toggle-label">Wedding Planner / Coordinator <small>(5-8%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-favors" checked />
        <span class="toggle-label">Favors & Gifts <small>(2%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-rehearsal" checked />
        <span class="toggle-label">Rehearsal Dinner <small>(5-8%)</small></span>
      </label>
      <label class="toggle-item">
        <input type="checkbox" id="cat-honeymoon" checked />
        <span class="toggle-label">Honeymoon Fund Allocation <small>(5-10%)</small></span>
      </label>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Budget Breakdown
  </button>
  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Budget Plan
    </button>
  </div>
</div>

<div id="wedding-budget-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>Understanding Wedding Budget Allocation</h4>
  <p>
    The largest portion of any wedding budget goes to the <strong>venue and catering</strong>, typically consuming 40-50% of total spend.
    This is because per-guest food and beverage costs add up quickly. The remaining budget is distributed among photography,
    entertainment, florals, and other vendors. Your allocation should reflect what matters most to you as a couple.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Hidden Costs Most Couples Forget</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Gratuities:</strong> 15-20% tips for vendors (catering staff, DJ, drivers, hair/makeup)</li>
    <li><strong>Sales tax:</strong> 5-10% on venue, catering, rentals, and other taxable services</li>
    <li><strong>Overtime fees:</strong> $500-$2,000+ if your reception runs long</li>
    <li><strong>Dress alterations:</strong> $200-$800 on top of the dress cost</li>
    <li><strong>Marriage license:</strong> $30-$100 depending on state</li>
    <li><strong>Vendor meals:</strong> Photographer, DJ, and planner need to eat too</li>
    <li><strong>Setup/breakdown fees:</strong> Extra charges for early access or late cleanup</li>
    <li><strong>Cake cutting fee:</strong> Some venues charge $1-$3 per slice to serve cake</li>
    <li><strong>Corkage fees:</strong> $15-$40 per bottle if you bring your own alcohol</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>Money-Saving Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Off-peak timing:</strong> Friday or Sunday weddings save 20-30% vs Saturday</li>
    <li><strong>Shoulder season:</strong> November, January-March offer significant discounts</li>
    <li><strong>Guest list control:</strong> Every guest cut saves $100-$300+ in catering alone</li>
    <li><strong>All-inclusive venues:</strong> Often cheaper than renting separately + coordinating</li>
    <li><strong>Digital invitations:</strong> Save $500-$2,000 on printing and postage</li>
    <li><strong>Seasonal flowers:</strong> In-season blooms cost 30-50% less than imported</li>
    <li><strong>Brunch/lunch reception:</strong> Save 30-40% vs dinner service</li>
    <li><strong>Book early:</strong> Many vendors offer discounts for 12+ month advance booking</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Payment Timeline Guide</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>12+ months out:</strong> Book venue (deposit 25-50%), photographer, band/DJ</li>
    <li><strong>9-12 months:</strong> Book florist, videographer, planner, caterer</li>
    <li><strong>6-9 months:</strong> Order invitations, book officiant, transportation, cake</li>
    <li><strong>3-6 months:</strong> Order attire, book hair/makeup, finalize rentals</li>
    <li><strong>1-3 months:</strong> Final headcount, last payments, confirm all vendors</li>
    <li><strong>Final week:</strong> Final balances due, vendor tips prepared, timeline confirmed</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Save & Share Your Budget Plan</h4>
  <p>
    Your budget plan is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your wedding budget plan,
    or use the <strong>Share button</strong> to copy the link. All settings and category preferences will be
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

  .category-toggles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-md);
  }

  .toggle-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--color-white);
  }

  .toggle-item:hover {
    border-color: var(--color-light-blue);
    background: var(--color-lighter-blue);
  }

  .toggle-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--color-primary-blue);
  }

  .toggle-item input[type="checkbox"]:checked + .toggle-label {
    color: var(--color-primary-blue);
    font-weight: 600;
  }

  .toggle-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .toggle-label small {
    color: var(--color-gray-dark);
    opacity: 0.7;
    font-weight: 400;
  }

  /* Results Styles */
  .budget-hero {
    text-align: center;
    padding: var(--space-2xl);
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--space-2xl);
    border: 2px solid var(--color-light-blue);
  }

  .budget-hero-label {
    font-size: var(--text-xl);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-sm);
  }

  .budget-hero-value {
    font-size: 3rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
    margin-bottom: var(--space-sm);
  }

  .budget-hero-sub {
    font-size: var(--text-base);
    color: var(--color-gray-dark);
  }

  .budget-hero-sub strong {
    color: var(--color-primary-blue);
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
    font-size: var(--text-xl);
    font-weight: 700;
    font-family: var(--font-primary);
    margin-bottom: var(--space-xs);
    color: var(--color-primary-blue);
  }

  .summary-card-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  /* Donut chart */
  .chart-section {
    margin-bottom: var(--space-2xl);
  }

  .donut-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xl);
    flex-wrap: wrap;
  }

  .donut-chart {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .donut-center {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--color-white);
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
  }

  .donut-center-label {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }

  .donut-center-value {
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
    width: 14px;
    height: 14px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .legend-text {
    color: var(--color-gray-dark);
  }

  .legend-value {
    font-weight: 600;
    margin-left: auto;
    padding-left: var(--space-md);
  }

  /* Category cards */
  .category-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }

  .category-card {
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    transition: all var(--transition-fast);
  }

  .category-card:hover {
    border-color: var(--color-light-blue);
    box-shadow: var(--shadow-sm);
  }

  .category-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
  }

  .category-card-name {
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: var(--text-base);
  }

  .category-card-amount {
    font-weight: 700;
    font-size: var(--text-lg);
    color: var(--color-primary-blue);
    font-family: var(--font-primary);
  }

  .category-card-pct {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-bottom: var(--space-md);
  }

  .category-card-range {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    background: var(--color-gray-light);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius);
  }

  .category-card-range strong {
    color: var(--color-primary-blue);
  }

  /* Priority section */
  .priority-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-2xl);
    border: 1px solid var(--color-gray);
  }

  .priority-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 2px solid var(--color-gray);
  }

  .priority-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .priority-list h5 {
    margin-bottom: var(--space-md);
    font-size: var(--text-base);
  }

  .priority-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .priority-list li {
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-gray);
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .priority-list li:last-child {
    border-bottom: none;
  }

  /* Hidden costs */
  .hidden-costs-section {
    background: var(--color-highlight-yellow);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-2xl);
    border: 2px solid var(--color-warning);
  }

  .hidden-costs-section h4 {
    color: var(--color-warning);
    margin-bottom: var(--space-lg);
  }

  .hidden-costs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
  }

  .hidden-cost-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
  }

  .hidden-cost-item span:last-child {
    font-weight: 600;
    color: var(--color-warning);
  }

  /* Payment timeline */
  .timeline-section {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-2xl);
    border: 1px solid var(--color-gray);
  }

  .timeline-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 2px solid var(--color-gray);
  }

  .timeline-item {
    display: flex;
    gap: var(--space-lg);
    padding: var(--space-md) 0;
    border-bottom: 1px solid var(--color-gray);
  }

  .timeline-item:last-child {
    border-bottom: none;
  }

  .timeline-period {
    min-width: 140px;
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: var(--text-sm);
  }

  .timeline-details {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .timeline-amount {
    font-weight: 600;
    color: var(--color-primary-blue);
    display: block;
    margin-top: var(--space-xs);
  }

  /* Savings plan */
  .savings-plan-section {
    background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-2xl);
    border: 2px solid var(--color-success);
  }

  .savings-plan-section h4 {
    color: var(--color-success);
    margin-bottom: var(--space-lg);
  }

  .savings-plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-lg);
    text-align: center;
  }

  .savings-plan-card {
    background: var(--color-white);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
  }

  .savings-plan-value {
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-success);
    font-family: var(--font-primary);
  }

  .savings-plan-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    margin-top: var(--space-xs);
  }

  /* Tips section */
  .tips-section {
    background: var(--color-highlight-green);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 2px solid var(--color-success);
  }

  .tips-section h4 {
    color: var(--color-success);
    margin-bottom: var(--space-lg);
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-md);
  }

  .tip-item {
    background: var(--color-white);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .tip-item strong {
    color: var(--color-success);
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }

    .category-toggles {
      grid-template-columns: 1fr;
    }

    .budget-hero-value {
      font-size: 2.2rem;
    }

    .donut-container {
      flex-direction: column;
    }

    .priority-grid {
      grid-template-columns: 1fr;
    }

    .summary-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media print {
    .btn, button {
      display: none !important;
    }

    .form-actions {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/wedding-budget-calculator.js"></script>

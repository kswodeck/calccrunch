---
layout: ../../layouts/CalculatorLayout.astro
calcType: ev-vs-gas
---

## How to Use This Calculator

1. Enter the **EV details** including purchase price, tax credits, battery specs, and charging costs
2. Enter the **gas car details** including purchase price, fuel efficiency, and gas price
3. Fill in **shared assumptions** like annual miles, ownership period, and cost increases
4. Add **insurance and maintenance** estimates for each vehicle
5. Configure **financing details** for both vehicles (optional)
6. Click **Calculate** to see the total cost of ownership comparison

<div class="calculator-form" id="ev-vs-gas-calculator-form">
  <div class="form-section">
    <h3>Electric Vehicle (EV)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-purchase-price">
          Vehicle Purchase Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-purchase-price" 
            class="form-input"
            placeholder="45000"
            value="45000"
            min="0"
            step="500"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="ev-federal-credit">
          Federal Tax Credit
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-federal-credit" 
            class="form-input"
            placeholder="7500"
            value="7500"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Up to $7,500 for qualifying EVs</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-state-incentive">
          State/Local Incentive
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-state-incentive" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">State rebates or additional credits</small>
      </div>
      <div class="form-group">
        <label for="ev-battery-size">
          Battery Size
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-battery-size" 
            class="form-input"
            placeholder="75"
            value="75"
            min="10"
            step="1"
          />
          <span class="input-addon">kWh</span>
        </div>
        <small class="form-help">Total battery capacity</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-efficiency">
          Efficiency <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-efficiency" 
            class="form-input"
            placeholder="3.5"
            value="3.5"
            min="1"
            step="0.1"
            required
          />
          <span class="input-addon">mi/kWh</span>
        </div>
        <small class="form-help">Miles per kWh (typically 3-4 for most EVs)</small>
      </div>
      <div class="form-group">
        <label for="ev-home-electric-rate">
          Home Electricity Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-home-electric-rate" 
            class="form-input"
            placeholder="0.14"
            value="0.14"
            min="0"
            step="0.01"
            required
          />
          <span class="input-addon">$/kWh</span>
        </div>
        <small class="form-help">Average residential electricity cost</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-home-charging-pct">
          Home Charging Percentage
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-home-charging-pct" 
            class="form-input"
            placeholder="80"
            value="80"
            min="0"
            max="100"
            step="5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Percentage of charging done at home</small>
      </div>
      <div class="form-group">
        <label for="ev-public-charging-rate">
          Public Charging Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-public-charging-rate" 
            class="form-input"
            placeholder="0.35"
            value="0.35"
            min="0"
            step="0.01"
          />
          <span class="input-addon">$/kWh</span>
        </div>
        <small class="form-help">Average DC fast charging cost</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Gas-Powered Car</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gas-purchase-price">
          Vehicle Purchase Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-purchase-price" 
            class="form-input"
            placeholder="35000"
            value="35000"
            min="0"
            step="500"
            required
          />
          <span class="input-addon">$</span>
        </div>
      </div>
      <div class="form-group">
        <label for="gas-mpg">
          Fuel Efficiency <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-mpg" 
            class="form-input"
            placeholder="30"
            value="30"
            min="1"
            step="1"
            required
          />
          <span class="input-addon">MPG</span>
        </div>
        <small class="form-help">Combined city/highway miles per gallon</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="gas-price">
          Current Gas Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-price" 
            class="form-input"
            placeholder="3.50"
            value="3.50"
            min="0"
            step="0.01"
            required
          />
          <span class="input-addon">$/gal</span>
        </div>
        <small class="form-help">Current price per gallon in your area</small>
      </div>
      <div class="form-group">
        <label for="gas-price-increase">
          Annual Gas Price Increase
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-price-increase" 
            class="form-input"
            placeholder="3"
            value="3"
            min="0"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected yearly increase in gas prices</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Driving & Ownership</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-miles">
          Annual Miles Driven <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-miles" 
            class="form-input"
            placeholder="12000"
            value="12000"
            min="1000"
            step="500"
            required
          />
          <span class="input-addon">mi/yr</span>
        </div>
        <small class="form-help">Average American drives ~12,000 miles/year</small>
      </div>
      <div class="form-group">
        <label for="ownership-years">
          Ownership Period <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ownership-years" 
            class="form-input"
            placeholder="7"
            value="7"
            min="1"
            max="20"
            step="1"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">How long you plan to keep the vehicle</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="electricity-rate-increase">
          Annual Electricity Rate Increase
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="electricity-rate-increase" 
            class="form-input"
            placeholder="2"
            value="2"
            min="0"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Expected yearly increase in electricity rates</small>
      </div>
      <div class="form-group">
        <!-- spacer for alignment -->
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Insurance & Maintenance</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-insurance">
          EV Annual Insurance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-insurance" 
            class="form-input"
            placeholder="1800"
            value="1800"
            min="0"
            step="50"
          />
          <span class="input-addon">$/yr</span>
        </div>
        <small class="form-help">EV insurance tends to be slightly higher</small>
      </div>
      <div class="form-group">
        <label for="gas-insurance">
          Gas Car Annual Insurance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-insurance" 
            class="form-input"
            placeholder="1500"
            value="1500"
            min="0"
            step="50"
          />
          <span class="input-addon">$/yr</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-maintenance">
          EV Annual Maintenance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-maintenance" 
            class="form-input"
            placeholder="500"
            value="500"
            min="0"
            step="50"
          />
          <span class="input-addon">$/yr</span>
        </div>
        <small class="form-help">EVs have fewer moving parts, lower maintenance</small>
      </div>
      <div class="form-group">
        <label for="gas-maintenance">
          Gas Car Annual Maintenance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-maintenance" 
            class="form-input"
            placeholder="1200"
            value="1200"
            min="0"
            step="50"
          />
          <span class="input-addon">$/yr</span>
        </div>
        <small class="form-help">Oil changes, brakes, exhaust, etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Depreciation</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-depreciation">
          EV Annual Depreciation Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-depreciation" 
            class="form-input"
            placeholder="15"
            value="15"
            min="0"
            max="50"
            step="1"
          />
          <span class="input-addon">%/yr</span>
        </div>
        <small class="form-help">Percentage of remaining value lost per year</small>
      </div>
      <div class="form-group">
        <label for="gas-depreciation">
          Gas Car Annual Depreciation Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-depreciation" 
            class="form-input"
            placeholder="15"
            value="15"
            min="0"
            max="50"
            step="1"
          />
          <span class="input-addon">%/yr</span>
        </div>
        <small class="form-help">Percentage of remaining value lost per year</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Financing (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-down-payment">
          EV Down Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-down-payment" 
            class="form-input"
            placeholder="20"
            value="20"
            min="0"
            max="100"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="gas-down-payment">
          Gas Car Down Payment
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-down-payment" 
            class="form-input"
            placeholder="20"
            value="20"
            min="0"
            max="100"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-loan-term">
          EV Loan Term
        </label>
        <select id="ev-loan-term" class="form-select">
          <option value="36">36 months</option>
          <option value="48">48 months</option>
          <option value="60" selected>60 months</option>
          <option value="72">72 months</option>
          <option value="84">84 months</option>
        </select>
      </div>
      <div class="form-group">
        <label for="gas-loan-term">
          Gas Car Loan Term
        </label>
        <select id="gas-loan-term" class="form-select">
          <option value="36">36 months</option>
          <option value="48">48 months</option>
          <option value="60" selected>60 months</option>
          <option value="72">72 months</option>
          <option value="84">84 months</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ev-interest-rate">
          EV Loan Interest Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="ev-interest-rate" 
            class="form-input"
            placeholder="5.5"
            value="5.5"
            min="0"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">EVs may qualify for lower rates</small>
      </div>
      <div class="form-group">
        <label for="gas-interest-rate">
          Gas Car Loan Interest Rate
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gas-interest-rate" 
            class="form-input"
            placeholder="6.5"
            value="6.5"
            min="0"
            step="0.1"
          />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate EV vs Gas Costs →
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

<div id="ev-vs-gas-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>Understanding EV Total Cost of Ownership</h4>
  <p>
    While electric vehicles often have a higher sticker price, they can be significantly cheaper to own over time.
    EVs benefit from <strong>lower fuel costs</strong> (electricity vs gasoline), <strong>reduced maintenance</strong> 
    (no oil changes, fewer brake replacements due to regenerative braking), and <strong>federal/state incentives</strong> 
    that can reduce the effective purchase price by $7,500 or more.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Charging Cost Factors</h4>
  <p>
    Your actual EV charging costs depend on several factors:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Time-of-use rates:</strong> Charging overnight can be 50% cheaper than peak hours</li>
    <li><strong>Home vs public charging:</strong> Home charging is typically 2-3x cheaper than DC fast charging</li>
    <li><strong>Free charging networks:</strong> Some manufacturers include free Supercharging or charging credits</li>
    <li><strong>Solar panels:</strong> If you have home solar, your effective charging cost could be near zero</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Environmental Impact</h4>
  <p>
    Beyond cost savings, EVs produce <strong>zero direct tailpipe emissions</strong>. Even accounting for electricity 
    generation, EVs typically produce 50-70% fewer lifecycle CO2 emissions than comparable gas vehicles. 
    The environmental advantage continues to grow as the electrical grid becomes cleaner with more renewable energy sources.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Save & Share Your Analysis</h4>
  <p>
    Your EV vs Gas comparison is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
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

  .comparison-visualization {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-surface-neutral);
    border-radius: 12px;
  }
  
  .comparison-bars {
    display: flex;
    gap: 2rem;
    margin: 1.5rem 0;
  }
  
  .comparison-bar {
    flex: 1;
    text-align: center;
  }
  
  .bar-container {
    position: relative;
    height: 200px;
    background: var(--color-gray);
    border-radius: 8px;
    margin: 1rem 0;
    display: flex;
    align-items: flex-end;
  }
  
  .bar-fill {
    width: 100%;
    border-radius: 8px 8px 0 0;
    transition: height 0.5s ease;
    position: relative;
  }
  
  .bar-fill.ev {
    background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  }
  
  .bar-fill.gas {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }
  
  .bar-value {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 1.2rem;
    white-space: nowrap;
  }
  
  .bar-label {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--color-primary-blue);
    height: 40px;
  }
  
  .winner-badge {
    display: inline-block;
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: bold;
    margin-top: var(--space-xs);
  }
  
  .cost-breakdown-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .breakdown-section {
    background: var(--color-white);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .breakdown-title {
    font-weight: bold;
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .breakdown-item:last-child {
    border-bottom: none;
  }
  
  .breakdown-total {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #e5e7eb;
  }
  
  .timeline-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .chart-title {
    font-weight: bold;
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .year-comparison-table {
    width: 100%;
    margin: 1rem 0;
  }
  
  .year-comparison-table th,
  .year-comparison-table td {
    padding: 0.75rem;
    text-align: right;
  }
  
  .year-comparison-table th:first-child,
  .year-comparison-table td:first-child {
    text-align: left;
  }
  
  .year-comparison-table thead {
    background: var(--color-surface-neutral);
  }
  
  .year-comparison-table tbody tr:nth-child(even) {
    background: var(--color-surface-neutral);
  }
  
  .better-option {
    color: var(--color-success);
    font-weight: bold;
  }
  
  .worse-option {
    color: var(--color-error);
  }

  .cumulative-chart {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 200px;
    padding: 1rem 0;
    border-bottom: 2px solid #e5e7eb;
  }

  .chart-bar-group {
    flex: 1;
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 100%;
  }

  .chart-bar {
    flex: 1;
    border-radius: 4px 4px 0 0;
    min-width: 8px;
    transition: height 0.3s ease;
  }

  .chart-bar.ev-bar {
    background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
  }

  .chart-bar.gas-bar {
    background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
  }

  .chart-labels {
    display: flex;
    gap: 4px;
    margin-top: 0.5rem;
  }

  .chart-label {
    flex: 1;
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  .chart-legend {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .legend-swatch {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .legend-swatch.ev {
    background: #10b981;
  }

  .legend-swatch.gas {
    background: #ea580c;
  }

  .monthly-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .monthly-card {
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
  }

  .monthly-card.ev-card {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border: 1px solid #a7f3d0;
  }

  .monthly-card.gas-card {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    border: 1px solid #fed7aa;
  }

  .monthly-amount {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .monthly-card.ev-card .monthly-amount {
    color: #059669;
  }

  .monthly-card.gas-card .monthly-amount {
    color: #ea580c;
  }

  .monthly-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .environmental-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
    border-radius: 12px;
    border: 1px solid #bbf7d0;
  }

  .emissions-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .emissions-item {
    text-align: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
  }

  .emissions-value {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .comparison-bars {
      flex-direction: column;
      gap: 1rem;
    }
    
    .cost-breakdown-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .monthly-comparison {
      grid-template-columns: 1fr;
    }

    .emissions-comparison {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .year-comparison-table {
      font-size: 0.875rem;
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

<script src="/scripts/calculators/ev-vs-gas-calculator.js"></script>

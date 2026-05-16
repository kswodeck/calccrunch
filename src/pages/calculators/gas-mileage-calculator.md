---
layout: ../../layouts/CalculatorLayout.astro
calcType: gas-mileage
---

## How to Use This Calculator

1. **Choose your calculation mode** - Basic MPG, Trip Planner, or Vehicle Comparison
2. **Enter odometer readings or miles driven** - Input your start/end readings or total distance
3. **Input fuel usage** - Gallons or liters used during the trip
4. **Add gas price** - Current price per gallon/liter for cost calculations
5. Click **Calculate** to see your fuel efficiency, costs, and environmental impact

<div class="calculator-form" id="gas-mileage-calculator-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="basic">MPG Calculator</button>
      <button type="button" class="mode-btn" data-mode="trip">Trip Planner</button>
      <button type="button" class="mode-btn" data-mode="compare">Compare Vehicles</button>
    </div>
  </div>

  <!-- Basic MPG Calculator -->
  <div class="form-section mode-section basic-section">
    <h3>Distance Traveled</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="distance-method">Input Method</label>
        <select id="distance-method" class="form-select">
          <option value="total">Total Miles/Km</option>
          <option value="odometer">Odometer Readings</option>
        </select>
      </div>
      <div class="form-group">
        <label for="unit-system">Units</label>
        <select id="unit-system" class="form-select">
          <option value="us">US (Miles / Gallons)</option>
          <option value="metric-l100">Metric (L/100km)</option>
          <option value="metric-kml">Metric (km/L)</option>
        </select>
      </div>
    </div>
    <div class="form-row" id="total-distance-row">
      <div class="form-group">
        <label for="total-distance">
          Total Distance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="total-distance" 
            class="form-input"
            placeholder="300"
            value=""
            min="0"
            max="999999"
            step="0.1"
            required
          />
          <span class="input-addon" id="distance-addon">miles</span>
        </div>
      </div>
    </div>
    <div class="form-row" id="odometer-row" style="display: none;">
      <div class="form-group">
        <label for="odometer-start">
          Odometer Start <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="odometer-start" 
            class="form-input"
            placeholder="50000"
            value=""
            min="0"
            max="9999999"
            step="0.1"
          />
          <span class="input-addon" id="odo-start-addon">miles</span>
        </div>
      </div>
      <div class="form-group">
        <label for="odometer-end">
          Odometer End <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="odometer-end" 
            class="form-input"
            placeholder="50300"
            value=""
            min="0"
            max="9999999"
            step="0.1"
          />
          <span class="input-addon" id="odo-end-addon">miles</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section mode-section basic-section">
    <h3>Fuel Used</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="fuel-used">
          Fuel Used <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="fuel-used" 
            class="form-input"
            placeholder="12"
            value=""
            min="0"
            max="9999"
            step="0.01"
            required
          />
          <span class="input-addon" id="fuel-addon">gallons</span>
        </div>
        <small class="form-help">Amount of fuel consumed</small>
      </div>
      <div class="form-group">
        <label for="gas-price">
          Fuel Price
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="gas-price" 
            class="form-input"
            placeholder="3.50"
            value=""
            min="0"
            max="100"
            step="0.01"
          />
          <span class="input-addon" id="price-addon">/gal</span>
        </div>
        <small class="form-help">Current price per gallon/liter</small>
      </div>
    </div>
  </div>

  <div class="form-section mode-section basic-section">
    <h3>Annual Driving (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="annual-miles">
          Annual Driving Distance
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-miles" 
            class="form-input"
            placeholder="12000"
            value="12000"
            min="0"
            max="999999"
            step="100"
          />
          <span class="input-addon" id="annual-addon">miles/yr</span>
        </div>
        <small class="form-help">For annual cost and CO2 estimates</small>
      </div>
    </div>
  </div>

  <!-- Trip Planner Section -->
  <div class="form-section mode-section trip-section" style="display: none;">
    <h3>Trip Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="trip-distance">
          Trip Distance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="trip-distance" 
            class="form-input"
            placeholder="500"
            value=""
            min="0"
            max="999999"
            step="1"
            required
          />
          <span class="input-addon" id="trip-distance-addon">miles</span>
        </div>
        <small class="form-help">One-way distance</small>
      </div>
      <div class="form-group">
        <label for="trip-roundtrip">Round Trip?</label>
        <select id="trip-roundtrip" class="form-select">
          <option value="no">One Way</option>
          <option value="yes">Round Trip</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="trip-mpg">
          Vehicle MPG <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="trip-mpg" 
            class="form-input"
            placeholder="28"
            value=""
            min="1"
            max="200"
            step="0.1"
            required
          />
          <span class="input-addon" id="trip-mpg-addon">MPG</span>
        </div>
        <small class="form-help">Your vehicle's fuel efficiency</small>
      </div>
      <div class="form-group">
        <label for="trip-gas-price">
          Fuel Price <span class="required">*</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="trip-gas-price" 
            class="form-input"
            placeholder="3.50"
            value=""
            min="0"
            max="100"
            step="0.01"
            required
          />
          <span class="input-addon" id="trip-price-addon">/gal</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Vehicle Comparison Section -->
  <div class="form-section mode-section compare-section" style="display: none;">
    <h3>Vehicle Comparison</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Compare fuel costs between multiple vehicles for the same driving habits.</p>
    <div class="form-row">
      <div class="form-group">
        <label for="compare-distance">Annual Distance</label>
        <div class="input-group">
          <input 
            type="number" 
            id="compare-distance" 
            class="form-input"
            placeholder="12000"
            value="12000"
            min="0"
            max="999999"
            step="100"
          />
          <span class="input-addon" id="compare-distance-addon">miles/yr</span>
        </div>
      </div>
      <div class="form-group">
        <label for="compare-gas-price">Fuel Price</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="compare-gas-price" 
            class="form-input"
            placeholder="3.50"
            value="3.50"
            min="0"
            max="100"
            step="0.01"
          />
          <span class="input-addon">/gal</span>
        </div>
      </div>
    </div>
    <div id="vehicle-list">
    </div>
    <button type="button" id="add-vehicle-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Vehicle
    </button>
  </div>

  <!-- Fuel Log Section -->
  <div class="form-section mode-section basic-section">
    <h3>Fuel Log (Optional)</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Track multiple fill-ups to calculate your average fuel economy over time.</p>
    <div id="fuel-log-container">
    </div>
    <button type="button" id="add-fillup-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Fill-Up
    </button>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="gas-mileage-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>⛽ Understanding Fuel Economy</h4>
  <p><strong>Fuel economy</strong> measures how efficiently your vehicle uses fuel. It can be expressed as:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>MPG (Miles Per Gallon):</strong> Higher is better. Used in the US.</li>
    <li><strong>L/100km (Liters per 100 kilometers):</strong> Lower is better. Used in Europe, Canada, Australia.</li>
    <li><strong>km/L (Kilometers per Liter):</strong> Higher is better. Used in some Asian countries.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🌱 Tips for Improving Fuel Economy</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Maintain proper tire pressure:</strong> Under-inflated tires can reduce MPG by 0.2% per 1 PSI drop</li>
    <li><strong>Drive steadily:</strong> Aggressive acceleration and braking wastes fuel</li>
    <li><strong>Remove excess weight:</strong> Every 100 lbs reduces MPG by about 1%</li>
    <li><strong>Use cruise control:</strong> Maintaining steady speed on highways saves fuel</li>
    <li><strong>Avoid excessive idling:</strong> Idling gets 0 MPG</li>
    <li><strong>Keep engine tuned:</strong> A properly tuned engine improves MPG by 4%</li>
    <li><strong>Use recommended motor oil:</strong> Correct grade can improve MPG by 1-2%</li>
    <li><strong>Plan routes:</strong> Combine errands and avoid heavy traffic when possible</li>
    <li><strong>Slow down:</strong> Every 5 mph over 50 mph costs roughly $0.20/gallon more</li>
    <li><strong>Keep windows closed at highway speeds:</strong> Open windows increase drag</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🌍 CO2 Emissions Facts</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Each gallon of gasoline produces approximately <strong>19.6 lbs (8.89 kg)</strong> of CO2</li>
    <li>Each gallon of diesel produces approximately <strong>22.4 lbs (10.16 kg)</strong> of CO2</li>
    <li>The average US passenger vehicle emits about <strong>4.6 metric tons</strong> of CO2 per year</li>
    <li>Improving fuel economy by just 5 MPG can save over <strong>1,000 lbs of CO2</strong> annually</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share</h4>
  <p>
    Your calculation is saved in the URL. <strong>Bookmark this page</strong> or use the <strong>Share button</strong> to send it to others.
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
    background: var(--color-gray-light);
    padding: 4px;
    border-radius: var(--border-radius);
    max-width: 500px;
    margin: 0 auto;
  }

  .mode-btn {
    flex: 1;
    padding: var(--space-md) var(--space-lg);
    border: 2px solid transparent;
    background: transparent;
    color: var(--color-gray-dark);
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    white-space: nowrap;
  }

  .mode-btn:hover {
    background: var(--color-white);
    color: var(--color-primary-blue);
  }

  .mode-btn.active {
    background: var(--color-accent-orange);
    color: #FFFFFF;
    border-color: var(--color-accent-orange);
    box-shadow: var(--shadow-sm);
  }

  .vehicle-entry {
    display: grid;
    grid-template-columns: 1fr 120px auto;
    gap: 1rem;
    align-items: end;
    padding: 1rem;
    background: var(--color-white);
    border-radius: 8px;
    border: 1px solid var(--color-gray);
    margin-bottom: 0.75rem;
  }

  .vehicle-entry .form-group {
    margin: 0;
  }

  .fuel-log-entry {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 1rem;
    align-items: end;
    padding: 1rem;
    background: var(--color-white);
    border-radius: 8px;
    border: 1px solid var(--color-gray);
    margin-bottom: 0.75rem;
  }

  .fuel-log-entry .form-group {
    margin: 0;
  }

  .remove-entry-btn {
    padding: 0.5rem;
    background: var(--color-highlight-red);
    color: var(--color-error);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
  }

  .remove-entry-btn:hover {
    background: #dc2626;
    color: white;
  }

  @media (max-width: 768px) {
    .mode-toggle {
      flex-direction: column;
      max-width: 100%;
    }

    .mode-btn {
      padding: var(--space-sm) var(--space-md);
    }

    .vehicle-entry {
      grid-template-columns: 1fr;
    }

    .fuel-log-entry {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/gas-mileage-calculator.js"></script>

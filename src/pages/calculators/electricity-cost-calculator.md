---
layout: ../../layouts/CalculatorLayout.astro
calcType: electricity-cost
---

## How to Use This Calculator

1. Enter your **electricity rate** (check your utility bill — US average is ~$0.16/kWh)
2. **Add appliances** from the preset library or enter custom wattages
3. Set **hours of daily use** for each appliance
4. Click **Calculate** to see per-appliance and total costs
5. Try the **EV Charging** tab to compare EV charging costs vs gasoline

<div class="calculator-form" id="electricity-calculator-form">
  <div class="form-section">
    <h3>Your Electricity Rate</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="electricity-rate">Rate per kWh <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="electricity-rate" class="form-input" placeholder="0.16" value="0.16" min="0.01" max="1" step="0.01" required />
          <span class="input-addon">/kWh</span>
        </div>
        <small class="form-help">US average: $0.16/kWh. Check your utility bill for exact rate.</small>
      </div>
      <div class="form-group">
        <label for="billing-period">Billing Period</label>
        <select id="billing-period" class="form-select">
          <option value="monthly" selected>Monthly (30 days)</option>
          <option value="annual">Annual (365 days)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Add Appliances</h3>
    <div class="form-row">
      <div class="form-group" style="flex: 2;">
        <label for="appliance-preset">Quick Add from Presets</label>
        <select id="appliance-preset" class="form-select">
          <option value="">— Select an appliance —</option>
          <optgroup label="Kitchen">
            <option value="Refrigerator|150|24">Refrigerator (150W, 24h)</option>
            <option value="Microwave|1200|0.5">Microwave (1200W, 0.5h)</option>
            <option value="Dishwasher|1800|1">Dishwasher (1800W, 1h)</option>
            <option value="Oven/Stove|2500|1">Oven/Stove (2500W, 1h)</option>
            <option value="Coffee Maker|1000|0.25">Coffee Maker (1000W, 15min)</option>
            <option value="Toaster|850|0.1">Toaster (850W, 6min)</option>
          </optgroup>
          <optgroup label="Climate Control">
            <option value="Central AC|3500|8">Central AC (3500W, 8h)</option>
            <option value="Window AC Unit|1400|8">Window AC Unit (1400W, 8h)</option>
            <option value="Space Heater|1500|6">Space Heater (1500W, 6h)</option>
            <option value="Ceiling Fan|75|8">Ceiling Fan (75W, 8h)</option>
            <option value="Portable Fan|50|8">Portable Fan (50W, 8h)</option>
          </optgroup>
          <optgroup label="Laundry">
            <option value="Washing Machine|500|1">Washing Machine (500W, 1h)</option>
            <option value="Dryer|3000|1">Clothes Dryer (3000W, 1h)</option>
          </optgroup>
          <optgroup label="Electronics">
            <option value="Desktop Computer|200|8">Desktop Computer (200W, 8h)</option>
            <option value="Laptop|65|8">Laptop (65W, 8h)</option>
            <option value="Gaming PC|500|4">Gaming PC (500W, 4h)</option>
            <option value="TV (55 inch)|100|5">TV 55" (100W, 5h)</option>
            <option value="TV (65 inch)|120|5">TV 65" (120W, 5h)</option>
            <option value="Gaming Console|150|3">Gaming Console (150W, 3h)</option>
            <option value="Monitor|30|8">Monitor (30W, 8h)</option>
            <option value="WiFi Router|12|24">WiFi Router (12W, 24h)</option>
          </optgroup>
          <optgroup label="Lighting">
            <option value="LED Bulb (10W)|10|8">LED Bulb (10W, 8h)</option>
            <option value="CFL Bulb (15W)|15|8">CFL Bulb (15W, 8h)</option>
            <option value="Incandescent (60W)|60|8">Incandescent Bulb (60W, 8h)</option>
          </optgroup>
          <optgroup label="Water Heating">
            <option value="Electric Water Heater|4500|3">Electric Water Heater (4500W, 3h)</option>
            <option value="Tankless Water Heater|7000|1">Tankless Water Heater (7000W, 1h)</option>
          </optgroup>
          <optgroup label="EV Charging">
            <option value="EV Charger (Level 1)|1400|8">EV Charger Level 1 (1400W, 8h)</option>
            <option value="EV Charger (Level 2)|7200|4">EV Charger Level 2 (7200W, 4h)</option>
          </optgroup>
          <optgroup label="Other">
            <option value="Pool Pump|1500|6">Pool Pump (1500W, 6h)</option>
            <option value="Dehumidifier|300|12">Dehumidifier (300W, 12h)</option>
            <option value="Hair Dryer|1500|0.25">Hair Dryer (1500W, 15min)</option>
            <option value="Iron|1200|0.5">Iron (1200W, 30min)</option>
            <option value="Vacuum Cleaner|1400|0.5">Vacuum Cleaner (1400W, 30min)</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group" style="flex: 0 0 auto; display: flex; align-items: flex-end;">
        <button type="button" id="add-preset-btn" class="btn btn-secondary">+ Add</button>
      </div>
    </div>
    <div class="form-row" style="margin-top: 1rem;">
      <div class="form-group">
        <label>Or add a custom appliance:</label>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="custom-name">Appliance Name</label>
        <input type="text" id="custom-name" class="form-input" placeholder="e.g., Aquarium" />
      </div>
      <div class="form-group">
        <label for="custom-watts">Wattage</label>
        <div class="input-group">
          <input type="number" id="custom-watts" class="form-input" placeholder="100" min="1" max="20000" />
          <span class="input-addon">W</span>
        </div>
      </div>
      <div class="form-group">
        <label for="custom-hours">Daily Use</label>
        <div class="input-group">
          <input type="number" id="custom-hours" class="form-input" placeholder="8" min="0.1" max="24" step="0.5" />
          <span class="input-addon">hrs</span>
        </div>
      </div>
      <div class="form-group" style="flex: 0 0 auto; display: flex; align-items: flex-end;">
        <button type="button" id="add-custom-btn" class="btn btn-secondary">+ Add</button>
      </div>
    </div>
  </div>

  <div class="form-section" id="appliance-list-section" style="display:none;">
    <h3>Your Appliances <span id="appliance-count" style="font-size: 0.85rem; color: var(--color-gray-dark);">(0)</span></h3>
    <div id="appliance-list" class="appliance-list">
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Electricity Costs →
  </button>

  <div class="form-actions">
    <button type="button" id="clear-all-btn" class="btn btn-secondary" title="Clear all appliances">
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

<div id="electricity-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>⚡ Understanding Your Electricity Bill</h4>
  <p>
    Electricity is measured in <strong>kilowatt-hours (kWh)</strong>. One kWh = using 1,000 watts for 1 hour. 
    Your bill = total kWh used × rate per kWh. The US average residential rate is approximately <strong>$0.16/kWh</strong>, 
    but rates vary widely by state ($0.10 in Louisiana to $0.36+ in Hawaii).
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💡 Top Energy-Saving Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Switch to LED bulbs:</strong> Uses 75% less energy than incandescent</li>
    <li><strong>Use smart power strips:</strong> Eliminates phantom/standby power draw</li>
    <li><strong>Set AC to 78°F (summer):</strong> Each degree lower adds ~3% to cooling costs</li>
    <li><strong>Run full loads:</strong> Full dishwasher/washer loads are far more efficient per item</li>
    <li><strong>Air-dry clothes:</strong> Dryers are one of the biggest energy hogs at home</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🔌 EV Charging vs Gasoline</h4>
  <p>
    At the US average electricity rate of $0.16/kWh, charging a typical EV (60 kWh battery, 3.5 mi/kWh efficiency) costs about 
    <strong>$0.046/mile</strong> — compared to <strong>$0.12-0.16/mile</strong> for a gasoline car at $3.50/gallon. 
    That's roughly <strong>60-70% savings</strong> on fuel costs alone.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/electricity-cost-calculator.js"></script>

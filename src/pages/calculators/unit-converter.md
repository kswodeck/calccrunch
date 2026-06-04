---
layout: ../../layouts/CalculatorLayout.astro
calcType: unit-converter
---

## How to Use This Converter

1. Select a **category** (Length, Weight, Temperature, etc.)
2. Enter a **value** to convert
3. Choose your **from** and **to** units
4. Results update **instantly** as you type
5. Use the **swap button** to reverse the conversion

<div class="calculator-form" id="unit-converter-form">
  <div class="form-section">
    <h3>Category</h3>
    <div class="unit-toggle" id="category-toggle">
      <button type="button" class="unit-btn active" data-category="length">Length</button>
      <button type="button" class="unit-btn" data-category="weight">Weight</button>
      <button type="button" class="unit-btn" data-category="temperature">Temp</button>
      <button type="button" class="unit-btn" data-category="volume">Volume</button>
      <button type="button" class="unit-btn" data-category="area">Area</button>
      <button type="button" class="unit-btn" data-category="speed">Speed</button>
      <button type="button" class="unit-btn" data-category="digital">Digital</button>
      <button type="button" class="unit-btn" data-category="time">Time</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Convert</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="convert-value">
          Value <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="convert-value" 
            class="form-input"
            placeholder="1"
            value="1"
            step="any"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="from-unit">
          From
        </label>
        <select id="from-unit" class="form-select">
        </select>
      </div>
      <div class="form-group" style="display: flex; align-items: center; justify-content: center; padding-top: 1.5rem;">
        <button type="button" id="swap-units" class="btn btn-secondary" style="padding: 0.5rem 1rem; min-width: auto;" title="Swap units">
          ⇄
        </button>
      </div>
      <div class="form-group">
        <label for="to-unit">
          To
        </label>
        <select id="to-unit" class="form-select">
        </select>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Convert →
  </button>

  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this conversion">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Conversion
    </button>
  </div>
</div>

<div id="unit-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📏 About Unit Conversion</h4>
  <p>
    Unit conversion is the process of changing a measurement from one unit to another within the same 
    measurement type. This converter supports 8 categories with dozens of units, covering everything 
    from everyday measurements to scientific and digital units.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🌍 Metric vs Imperial</h4>
  <p>
    The <strong>metric system</strong> (SI) is used by most countries and is based on powers of 10. 
    The <strong>imperial system</strong> is primarily used in the United States for everyday measurements. 
    This converter makes it easy to switch between the two.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📐 Common Quick References</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>1 inch</strong> = 2.54 cm</li>
    <li><strong>1 mile</strong> = 1.609 km</li>
    <li><strong>1 pound</strong> = 0.454 kg</li>
    <li><strong>1 gallon</strong> = 3.785 liters</li>
    <li><strong>°F to °C:</strong> (°F - 32) × 5/9</li>
    <li><strong>1 GB</strong> = 1,024 MB</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Conversion</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your conversion, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/unit-converter.js"></script>

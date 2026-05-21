---
layout: ../../layouts/CalculatorLayout.astro
calcType: percentage
---

## How to Use This Calculator

1. Select a **calculation mode** using the tabs below
2. Enter the required **values** for your chosen mode
3. Results update **instantly** as you type
4. Click **Calculate** or press Enter for full results
5. **Share or bookmark** your results - the URL saves your inputs!

<div class="calculator-form" id="percentage-calculator-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-mode="percent-of">What is X% of Y?</button>
      <button type="button" class="unit-btn" data-mode="is-what-percent">X is what % of Y?</button>
      <button type="button" class="unit-btn" data-mode="percent-change">% Change</button>
      <button type="button" class="unit-btn" data-mode="increase-decrease">Increase/Decrease</button>
    </div>
  </div>

  <div class="form-section" id="mode-percent-of">
    <h3>What is X% of Y?</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="pct-of-percent">
          Percentage <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pct-of-percent" 
            class="form-input"
            placeholder="15"
            value="15"
            step="any"
            required
          />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="pct-of-number">
          of Number <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pct-of-number" 
            class="form-input"
            placeholder="200"
            value="200"
            step="any"
            required
          />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="mode-is-what-percent">
    <h3>X is what % of Y?</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="iwp-number">
          Number <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="iwp-number" 
            class="form-input"
            placeholder="30"
            value="30"
            step="any"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="iwp-total">
          is what % of <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="iwp-total" 
            class="form-input"
            placeholder="200"
            value="200"
            step="any"
            required
          />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="mode-percent-change">
    <h3>Percentage Change from X to Y</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="pc-from">
          From Value <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pc-from" 
            class="form-input"
            placeholder="100"
            value="100"
            step="any"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="pc-to">
          To Value <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="pc-to" 
            class="form-input"
            placeholder="150"
            value="150"
            step="any"
            required
          />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="mode-increase-decrease">
    <h3>Increase or Decrease by Percentage</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="id-number">
          Starting Number <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="id-number" 
            class="form-input"
            placeholder="100"
            value="100"
            step="any"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="id-direction">
          Direction
        </label>
        <select id="id-direction" class="form-select">
          <option value="increase">Increase by</option>
          <option value="decrease">Decrease by</option>
        </select>
      </div>
      <div class="form-group">
        <label for="id-percent">
          Percentage <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="id-percent" 
            class="form-input"
            placeholder="20"
            value="20"
            step="any"
            required
          />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate →
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

<div id="percentage-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📊 Understanding Percentages</h4>
  <p>
    A <strong>percentage</strong> is a number expressed as a fraction of 100. The word comes from Latin 
    "per centum" meaning "by the hundred." Percentages are used everywhere: discounts, taxes, tips, 
    grades, statistics, and financial calculations.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🧮 Common Percentage Formulas</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>X% of Y:</strong> (X / 100) × Y</li>
    <li><strong>X is what % of Y:</strong> (X / Y) × 100</li>
    <li><strong>% Change:</strong> ((New - Old) / Old) × 100</li>
    <li><strong>Increase by X%:</strong> Value × (1 + X/100)</li>
    <li><strong>Decrease by X%:</strong> Value × (1 - X/100)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💡 Quick Mental Math Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>10% of anything:</strong> Move the decimal one place left (10% of 250 = 25)</li>
    <li><strong>5%:</strong> Find 10% then divide by 2</li>
    <li><strong>15%:</strong> Find 10% then add half of it (good for tips!)</li>
    <li><strong>20%:</strong> Find 10% then double it</li>
    <li><strong>25%:</strong> Divide by 4</li>
    <li><strong>50%:</strong> Divide by 2</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/percentage-calculator.js"></script>

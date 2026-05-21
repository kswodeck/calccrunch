---
layout: ../../layouts/CalculatorLayout.astro
calcType: break-even
---

## How to Use This Calculator

1. Enter your **fixed costs** (monthly rent, salaries, insurance, etc.)
2. Enter the **variable cost per unit** (materials, shipping, etc.)
3. Enter the **selling price per unit**
4. Optionally add **expected monthly units** and **target profit**
5. Click **Calculate** to see your break-even point

<div class="calculator-form" id="break-even-calculator-form">
  <div class="form-section">
    <h3>Cost & Revenue</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="fixed-costs">
          Monthly Fixed Costs <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="fixed-costs" class="form-input" placeholder="10000" value="10000" min="0" step="100" required />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Rent, salaries, insurance, etc.</small>
      </div>
      <div class="form-group">
        <label for="variable-cost">
          Variable Cost Per Unit <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="variable-cost" class="form-input" placeholder="25" value="25" min="0" step="0.01" required />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Materials, shipping per item</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="selling-price">
          Selling Price Per Unit <span class="required">*</span>
        </label>
        <div class="input-group">
          <input type="number" id="selling-price" class="form-input" placeholder="75" value="75" min="0" step="0.01" required />
          <span class="input-addon">$</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Optional Targets</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="expected-units">Expected Monthly Units Sold</label>
        <div class="input-group">
          <input type="number" id="expected-units" class="form-input" placeholder="300" value="300" min="0" step="1" />
          <span class="input-addon">units</span>
        </div>
        <small class="form-help">To see projected profit/loss</small>
      </div>
      <div class="form-group">
        <label for="target-profit">Target Monthly Profit</label>
        <div class="input-group">
          <input type="number" id="target-profit" class="form-input" placeholder="5000" value="5000" min="0" step="100" />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Units needed to hit this profit</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Break-Even →
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

<div id="break-even-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>⚖️ What is Break-Even Analysis?</h4>
  <p>
    <strong>Break-even analysis</strong> determines the point where total revenue equals total costs — 
    you're neither making nor losing money. It's essential for pricing decisions, business planning, 
    and understanding your minimum viable sales volume.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📐 The Break-Even Formula</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Break-Even Units:</strong> Fixed Costs ÷ (Selling Price - Variable Cost)</li>
    <li><strong>Contribution Margin:</strong> Selling Price - Variable Cost Per Unit</li>
    <li><strong>Contribution Margin Ratio:</strong> Contribution Margin ÷ Selling Price</li>
    <li><strong>Break-Even Revenue:</strong> Fixed Costs ÷ Contribution Margin Ratio</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/break-even-calculator.js"></script>

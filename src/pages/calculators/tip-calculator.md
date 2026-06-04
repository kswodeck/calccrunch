---
layout: ../../layouts/CalculatorLayout.astro
calcType: tip
---

## How to Use This Calculator

1. **Enter your bill amount** - Input the total bill before tip
2. **Choose a tip percentage** - Use presets or set a custom percentage
3. **Rate the service quality** - Get a suggested tip based on service level
4. **Set the number of people** - Split the bill evenly among your party
5. Click **Calculate Tip** to see the breakdown, comparisons, and tipping guide

<div class="calculator-form" id="tip-calculator-form">
  <div class="form-section">
    <h3>Bill Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="bill-amount">
          Bill Amount <span class="required">*</span>
          <span class="tooltip" title="Enter the total bill before tip">?</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="bill-amount" 
            class="form-input"
            placeholder="50.00"
            value=""
            min="0"
            max="100000"
            step="0.01"
            required
          />
        </div>
        <small class="form-help">Total before tip</small>
      </div>
      <div class="form-group">
        <label for="num-people">
          Number of People
          <span class="tooltip" title="Split the total evenly among this many people">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="num-people" 
            class="form-input"
            placeholder="1"
            value="1"
            min="1"
            max="100"
            step="1"
          />
          <span class="input-addon">people</span>
        </div>
        <small class="form-help">Split bill evenly</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Tip Percentage</h3>
    <div class="tip-presets">
      <button type="button" class="tip-preset-btn" data-tip="10">10%</button>
      <button type="button" class="tip-preset-btn" data-tip="15">15%</button>
      <button type="button" class="tip-preset-btn active" data-tip="18">18%</button>
      <button type="button" class="tip-preset-btn" data-tip="20">20%</button>
      <button type="button" class="tip-preset-btn" data-tip="25">25%</button>
      <button type="button" class="tip-preset-btn" data-tip="custom">Custom</button>
    </div>
    <div class="form-row" style="margin-top: 1rem;">
      <div class="form-group">
        <label for="tip-percentage">Tip Percentage</label>
        <div class="input-group">
          <input 
            type="range" 
            id="tip-slider" 
            class="tip-slider"
            min="0"
            max="50"
            step="1"
            value="18"
          />
          <div class="input-group" style="width: 100px; margin-left: 1rem;">
            <input 
              type="number" 
              id="tip-percentage" 
              class="form-input"
              value="18"
              min="0"
              max="100"
              step="1"
            />
            <span class="input-addon">%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Service Quality</h3>
    <div class="service-rating">
      <button type="button" class="service-btn" data-quality="poor" data-suggest="10">
        <span class="service-emoji">😟</span>
        <span class="service-label">Poor</span>
        <span class="service-suggest">~10%</span>
      </button>
      <button type="button" class="service-btn" data-quality="fair" data-suggest="13">
        <span class="service-emoji">😐</span>
        <span class="service-label">Fair</span>
        <span class="service-suggest">~13%</span>
      </button>
      <button type="button" class="service-btn" data-quality="good" data-suggest="15">
        <span class="service-emoji">🙂</span>
        <span class="service-label">Good</span>
        <span class="service-suggest">~15%</span>
      </button>
      <button type="button" class="service-btn active" data-quality="great" data-suggest="18">
        <span class="service-emoji">😊</span>
        <span class="service-label">Great</span>
        <span class="service-suggest">~18%</span>
      </button>
      <button type="button" class="service-btn" data-quality="excellent" data-suggest="22">
        <span class="service-emoji">🤩</span>
        <span class="service-label">Excellent</span>
        <span class="service-suggest">~22%</span>
      </button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Click a rating to auto-set the tip percentage
    </small>
  </div>

  <div class="form-section">
    <h3>Rounding Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="round-option">Round Up Total</label>
        <select id="round-option" class="form-select">
          <option value="none">No rounding</option>
          <option value="dollar">Nearest dollar</option>
          <option value="five">Nearest $5</option>
          <option value="ten">Nearest $10</option>
        </select>
        <small class="form-help">Round the total bill up for convenience</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Tip →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="tip-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>💡 Tipping Etiquette by Service Type</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Restaurant (sit-down):</strong> 15-20% of pre-tax bill</li>
    <li><strong>Buffet:</strong> 10% of total bill</li>
    <li><strong>Bar/Bartender:</strong> $1-2 per drink or 15-20% of tab</li>
    <li><strong>Food delivery:</strong> 15-20% (minimum $3-5)</li>
    <li><strong>Coffee shop:</strong> $1-2 or 15-20% for specialty drinks</li>
    <li><strong>Hair salon/Barber:</strong> 15-20% of service cost</li>
    <li><strong>Spa services:</strong> 15-20% of service cost</li>
    <li><strong>Taxi/Rideshare:</strong> 15-20% of fare</li>
    <li><strong>Hotel housekeeping:</strong> $2-5 per night</li>
    <li><strong>Valet parking:</strong> $2-5 when car is returned</li>
    <li><strong>Movers:</strong> $20-50 per person or 10-15% of total bill</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🌍 International Tipping Customs</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>United States/Canada:</strong> 15-20% is standard for restaurants</li>
    <li><strong>United Kingdom:</strong> 10-15% if service charge not included</li>
    <li><strong>Europe (France, Italy, Spain):</strong> Round up or 5-10%; service often included</li>
    <li><strong>Germany/Austria:</strong> Round up to nearest euro or 5-10%</li>
    <li><strong>Japan:</strong> No tipping; considered rude</li>
    <li><strong>China:</strong> Not expected; may be refused</li>
    <li><strong>Australia/New Zealand:</strong> Not expected but 10% appreciated for great service</li>
    <li><strong>Middle East:</strong> 10-15% if not included in bill</li>
    <li><strong>Mexico/Latin America:</strong> 10-15% is standard</li>
    <li><strong>Southeast Asia:</strong> Not expected but appreciated (round up)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Quick Tip Math Tricks</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>10% tip:</strong> Move the decimal one place left ($50 bill = $5 tip)</li>
    <li><strong>15% tip:</strong> Calculate 10%, then add half of that ($50 = $5 + $2.50 = $7.50)</li>
    <li><strong>20% tip:</strong> Calculate 10% and double it ($50 = $5 x 2 = $10)</li>
    <li><strong>25% tip:</strong> Calculate 20% and add 5% ($50 = $10 + $2.50 = $12.50)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .tip-presets {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tip-preset-btn {
    padding: var(--space-md) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    min-width: 60px;
  }

  .tip-preset-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
  }

  .tip-preset-btn.active {
    border-color: var(--color-accent-orange);
    background: var(--color-accent-orange);
    color: white;
  }

  .tip-slider {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(to right, var(--color-gray) 0%, var(--color-accent-orange) 100%);
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  .tip-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--color-accent-orange);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  .tip-slider::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--color-accent-orange);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  .service-rating {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .service-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    min-width: 80px;
  }

  .service-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
    transform: translateY(-2px);
  }

  .service-btn.active {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #fff8f5, #ffe8d6);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
  }

  .service-emoji {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .service-label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-gray-dark);
  }

  .service-suggest {
    font-size: var(--text-xs);
    color: var(--color-accent-orange);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .tip-presets {
      justify-content: center;
    }

    .service-rating {
      gap: 0.25rem;
    }

    .service-btn {
      min-width: 60px;
      padding: var(--space-sm) var(--space-md);
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/tip-calculator.js"></script>

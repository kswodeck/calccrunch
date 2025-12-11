---
layout: ../../layouts/CalculatorLayout.astro
calcType: rng
---

## How to Use This Generator

1. **Set your range** by entering minimum and maximum values
2. **Choose how many numbers** to generate (1-1000)
3. **Select number type** - any, odd, even, prime, or other options
4. **Configure options** like duplicates, sorting, and decimal places
5. Click **Generate Numbers** to create your random numbers
6. **Copy** results or **share** your settings via URL

<div class="calculator-form" id="rng-form">
  <div class="form-section">
    <h3>Number Range</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="min-value">Minimum Value <span class="required">*</span></label>
        <input 
          type="number" 
          id="min-value" 
          class="form-input"
          value="1"
          step="any"
        />
      </div>
      <div class="form-group">
        <label for="max-value">Maximum Value <span class="required">*</span></label>
        <input 
          type="number" 
          id="max-value" 
          class="form-input"
          value="100"
          step="any"
        />
      </div>
    </div>
    <div class="range-presets">
      <span class="preset-label">Quick ranges:</span>
      <button type="button" class="preset-btn" data-min="1" data-max="10">1-10</button>
      <button type="button" class="preset-btn" data-min="1" data-max="100">1-100</button>
      <button type="button" class="preset-btn" data-min="1" data-max="1000">1-1000</button>
      <button type="button" class="preset-btn" data-min="0" data-max="1">0-1</button>
      <button type="button" class="preset-btn" data-min="1" data-max="6">Dice (1-6)</button>
      <button type="button" class="preset-btn" data-min="1" data-max="52">Cards (1-52)</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Generation Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="count">How Many Numbers</label>
        <div class="count-control">
          <button type="button" class="count-btn minus" id="count-minus">−</button>
          <input 
            type="number" 
            id="count" 
            class="form-input count-input"
            value="1"
            min="1"
            max="1000"
          />
          <button type="button" class="count-btn plus" id="count-plus">+</button>
        </div>
        <small class="form-help">Generate 1 to 1000 numbers at once</small>
      </div>
      <div class="form-group">
        <label for="number-type">Number Type</label>
        <select id="number-type" class="form-select">
          <option value="any">Any Number</option>
          <option value="integer">Integers Only</option>
          <option value="odd">Odd Numbers Only</option>
          <option value="even">Even Numbers Only</option>
          <option value="prime">Prime Numbers Only</option>
          <option value="square">Perfect Squares</option>
          <option value="cube">Perfect Cubes</option>
          <option value="fibonacci">Fibonacci Numbers</option>
          <option value="divisible">Divisible By...</option>
        </select>
      </div>
    </div>
    <div class="form-row divisible-row hidden" id="divisible-row">
      <div class="form-group">
        <label for="divisible-by">Divisible By</label>
        <input 
          type="number" 
          id="divisible-by" 
          class="form-input"
          value="5"
          min="1"
        />
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Options</h3>
    <div class="options-grid">
      <label class="option-card">
        <input type="checkbox" id="allow-duplicates" checked />
        <span class="option-content">
          <span class="option-icon">🔄</span>
          <span class="option-label">Allow Duplicates</span>
          <span class="option-desc">Same number can appear multiple times</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="sort-results" />
        <span class="option-content">
          <span class="option-icon">📊</span>
          <span class="option-label">Sort Results</span>
          <span class="option-desc">Arrange numbers in order</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="sort-descending" />
        <span class="option-content">
          <span class="option-icon">⬇️</span>
          <span class="option-label">Descending Order</span>
          <span class="option-desc">Largest to smallest</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="show-stats" checked />
        <span class="option-content">
          <span class="option-icon">📈</span>
          <span class="option-label">Show Statistics</span>
          <span class="option-desc">Display analysis of results</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Advanced Options</h3>
    <div class="advanced-toggle">
      <button type="button" class="toggle-advanced-btn" id="toggle-advanced">
        <span class="toggle-icon">▶</span>
        <span class="toggle-text">Show Advanced Options</span>
      </button>
    </div>
    <div class="advanced-options hidden" id="advanced-options">
      <div class="option-group">
        <h4>Decimal Places</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="decimal-places">Number of Decimal Places</label>
            <select id="decimal-places" class="form-select">
              <option value="0" selected>0 (Whole numbers)</option>
              <option value="1">1 decimal place</option>
              <option value="2">2 decimal places</option>
              <option value="3">3 decimal places</option>
              <option value="4">4 decimal places</option>
              <option value="5">5 decimal places</option>
            </select>
            <small class="form-help">Only applies to "Any Number" type</small>
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>Exclusions</h4>
        <div class="form-group">
          <label for="exclude-numbers">Numbers to Exclude</label>
          <input 
            type="text" 
            id="exclude-numbers" 
            class="form-input"
            placeholder="e.g., 13, 7, 42"
          />
          <small class="form-help">Comma-separated list of numbers to exclude</small>
        </div>
      </div>
      <div class="option-group">
        <h4>Custom Step</h4>
        <div class="form-row">
          <div class="form-group">
            <label class="checkbox-item">
              <input type="checkbox" id="use-step" />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <strong>Use Custom Step</strong>
                <small>Generate numbers at specific intervals</small>
              </span>
            </label>
          </div>
          <div class="form-group step-input-group hidden" id="step-group">
            <label for="step-value">Step Value</label>
            <input 
              type="number" 
              id="step-value" 
              class="form-input"
              value="1"
              min="0.001"
              step="any"
            />
            <small class="form-help">e.g., Step of 5 gives 5, 10, 15, 20...</small>
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>Output Format</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="separator">Number Separator</label>
            <select id="separator" class="form-select">
              <option value="comma">Comma (1, 2, 3)</option>
              <option value="space">Space (1 2 3)</option>
              <option value="newline">New Line</option>
              <option value="tab">Tab</option>
              <option value="pipe">Pipe (1 | 2 | 3)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="prefix">Number Prefix</label>
            <input 
              type="text" 
              id="prefix" 
              class="form-input"
              placeholder="e.g., #, $, Item-"
              maxlength="10"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      🎲 Generate Numbers →
    </button>
  </div>

  <div class="secondary-actions">
    <button type="button" id="share-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      Share Settings
    </button>
    <button type="button" id="reset-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      Reset to Defaults
    </button>
  </div>
</div>

<div id="rng-result" class="calculator-result hidden">
  <!-- Results will be inserted here by JavaScript -->
</div>

<div class="info-box">
  <h4>🎲 What is Random Number Generation?</h4>
  <p>
    Random number generation (RNG) creates numbers that lack any predictable pattern. Our generator uses 
    cryptographically secure methods to ensure true randomness. This is essential 
    for fair games, unbiased sampling, and secure applications.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚡ Number Types Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Prime Numbers:</strong> Only divisible by 1 and themselves (2, 3, 5, 7, 11...)</li>
    <li><strong>Perfect Squares:</strong> Result of integer × itself (1, 4, 9, 16, 25...)</li>
    <li><strong>Perfect Cubes:</strong> Result of integer × itself × itself (1, 8, 27, 64...)</li>
    <li><strong>Fibonacci:</strong> Each number is the sum of the two preceding (1, 1, 2, 3, 5, 8...)</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🎯 Common Use Cases</h4>
  <p>
    <strong>Lottery & Raffles:</strong> Generate unique winning numbers. 
    <strong>Games:</strong> Simulate dice rolls or card draws. 
    <strong>Research:</strong> Create random samples for studies. 
    <strong>Decision Making:</strong> Let chance decide between options.
    <strong>Education:</strong> Generate practice problems or random quiz questions.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Settings</h4>
  <p>
    Your preferences are automatically saved in the URL. You can <strong>bookmark this page</strong> 
    to save your favorite settings, or use the <strong>Share button</strong> to send your configuration to others. 
    Generated numbers are never stored or transmitted.
  </p>
</div>

<style>
  /* Random Number Generator Specific Styles */
  
  /* Range Presets */
  .range-presets {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-gray);
  }
  
  .preset-label {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    font-weight: 600;
  }
  
  .preset-btn {
    padding: 0.4rem 0.75rem;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .preset-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }
  
  .preset-btn.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: var(--color-white);
  }
  
  /* Count Control */
  .count-control {
    display: flex;
    align-items: stretch;
  }
  
  .count-btn {
    width: 48px;
    background: var(--color-primary-blue);
    color: white;
    border: none;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .count-btn.minus {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  
  .count-btn.plus {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }
  
  .count-btn:hover {
    background: var(--color-primary-dark);
  }
  
  .count-btn:active {
    transform: scale(0.95);
  }
  
  .count-input {
    border-radius: 0;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
    width: 100px;
    -moz-appearance: textfield;
  }
  
  .count-input::-webkit-outer-spin-button,
  .count-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Options Grid */
  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .option-card {
    cursor: pointer;
  }
  
  .option-card input {
    display: none;
  }
  
  .option-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    text-align: center;
    min-height: 120px;
    justify-content: center;
  }
  
  .option-card input:checked + .option-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .option-card:hover .option-content {
    border-color: var(--color-light-blue);
  }
  
  .option-icon {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
  
  .option-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  .option-desc {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
    margin-top: 0.25rem;
  }
  
  /* Advanced Options Toggle */
  .advanced-toggle {
    margin-bottom: 1rem;
  }
  
  .toggle-advanced-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    color: var(--color-primary-blue);
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    width: 100%;
    justify-content: center;
  }
  
  .toggle-advanced-btn:hover {
    border-color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
  }
  
  .toggle-advanced-btn.active {
    background: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: var(--color-white);
  }
  
  .toggle-icon {
    transition: transform var(--transition-fast);
    font-size: 0.75rem;
  }
  
  .toggle-advanced-btn.active .toggle-icon {
    transform: rotate(90deg);
  }
  
  /* Advanced Options Panel */
  .advanced-options {
    background: var(--color-white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 1rem;
    border: 1px solid var(--color-gray);
  }
  
  .option-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-gray);
  }
  
  .option-group:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .option-group h4 {
    font-size: 1rem;
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  /* Checkbox List */
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    transition: background var(--transition-fast);
  }
  
  .checkbox-item:hover {
    background: var(--color-gray-light);
  }
  
  .checkbox-item input {
    display: none;
  }
  
  .checkmark {
    width: 22px;
    height: 22px;
    border: 2px solid var(--color-gray);
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    margin-top: 2px;
  }
  
  .checkbox-item input:checked + .checkmark {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
  }
  
  .checkbox-item input:checked + .checkmark::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  .checkbox-text {
    display: flex;
    flex-direction: column;
  }
  
  .checkbox-text strong {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  .checkbox-text small {
    color: var(--color-gray-dark);
    opacity: 0.7;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  /* Secondary Actions */
  .secondary-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .form-actions {
    margin-top: 1rem;
  }
  
  /* Results Display */
  .numbers-display-container {
    margin-bottom: 2rem;
  }
  
  .numbers-display {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .numbers-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;
  }
  
  .number-bubble {
    background: linear-gradient(135deg, var(--color-accent-orange) 0%, #ff8a5c 100%);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 50px;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    animation: popIn 0.3s ease-out;
    cursor: pointer;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  }
  
  .number-bubble:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
  
  @keyframes popIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .single-number-display {
    text-align: center;
  }
  
  .single-number {
    font-family: var(--font-mono);
    font-size: 5rem;
    font-weight: 800;
    color: #00ff88;
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
    animation: countUp 0.5s ease-out;
  }
  
  @keyframes countUp {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .numbers-text {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    color: #00ff88;
    word-break: break-all;
    line-height: 2;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
  
  .result-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  
  .action-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-body);
  }
  
  .copy-btn {
    background: var(--color-accent-orange);
    color: white;
  }
  
  .copy-btn:hover {
    background: var(--color-accent-orange-dark);
    transform: translateY(-2px);
  }
  
  .copy-btn.copied {
    background: var(--color-success);
  }
  
  .regenerate-btn {
    background: var(--color-primary-blue);
    color: white;
  }
  
  .regenerate-btn:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }
  
  /* Statistics Section */
  .stats-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .stats-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .stat-card {
    background: var(--color-gray-light);
    padding: 1rem;
    border-radius: var(--border-radius);
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-mono);
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    font-weight: 600;
    margin-top: 0.25rem;
    text-transform: uppercase;
  }
  
  /* Distribution Chart */
  .distribution-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .distribution-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .distribution-chart {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 150px;
    padding: 1rem 0;
    overflow-x: auto;
  }
  
  .chart-bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 30px;
    flex: 1;
  }
  
  .chart-bar {
    width: 100%;
    background: linear-gradient(180deg, var(--color-accent-orange) 0%, #ff8a5c 100%);
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
    min-height: 4px;
  }
  
  .chart-bar-label {
    font-size: 0.65rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    font-weight: 600;
  }
  
  .chart-bar-count {
    font-size: 0.6rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }
  
  /* Number Type Badge */
  .type-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  /* Odd/Even Visual */
  .odd-even-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .odd-even-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .odd-even-bar {
    display: flex;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .odd-segment {
    background: linear-gradient(90deg, #3B82F6, #60A5FA);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    transition: flex 0.5s ease;
  }
  
  .even-segment {
    background: linear-gradient(90deg, #8B5CF6, #A78BFA);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    transition: flex 0.5s ease;
  }
  
  .odd-even-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .legend-dot.odd {
    background: #3B82F6;
  }
  
  .legend-dot.even {
    background: #8B5CF6;
  }
  
  /* Range Visual */
  .range-visual {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .range-visual h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .range-line {
    position: relative;
    height: 8px;
    background: var(--color-gray);
    border-radius: 4px;
    margin: 2rem 0 1rem;
  }
  
  .range-fill {
    position: absolute;
    height: 100%;
    background: linear-gradient(90deg, var(--color-accent-orange), #ff8a5c);
    border-radius: 4px;
    transition: all 0.5s ease;
  }
  
  .range-marker {
    position: absolute;
    top: -30px;
    transform: translateX(-50%);
    background: var(--color-primary-blue);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .range-marker::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--color-primary-blue);
  }
  
  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    font-weight: 600;
  }
  
  /* Sum/Product Display */
  .calculations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .calc-card {
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, white 100%);
    padding: 1.25rem;
    border-radius: var(--border-radius);
    text-align: center;
    border: 1px solid var(--color-light-blue);
  }
  
  .calc-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  
  .calc-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    font-family: var(--font-mono);
    word-break: break-all;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .options-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .single-number {
      font-size: 3.5rem;
    }
    
    .numbers-grid {
      max-height: 300px;
    }
    
    .number-bubble {
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .count-control {
      flex-wrap: nowrap;
    }
    
    .count-input {
      width: 80px;
    }
  }
  
  @media (max-width: 480px) {
    .range-presets {
      justify-content: center;
    }
    
    .preset-label {
      width: 100%;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    
    .options-grid {
      grid-template-columns: 1fr;
    }
    
    .single-number {
      font-size: 2.5rem;
    }
    
    .stat-value {
      font-size: 1.25rem;
    }
    
    .result-actions {
      flex-direction: column;
    }
    
    .action-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>

<script src="/scripts/calculators/random-number-generator.js"></script>
---
layout: ../../layouts/CalculatorLayout.astro
calcType: password
---

## How to Use This Generator

1. **Set your password length** using the slider (8-128 characters)
2. **Choose character types** - uppercase, lowercase, numbers, and/or symbols
3. **Enable advanced options** for extra security rules if needed
4. **Generate multiple passwords** at once to find the perfect one
5. Click **Generate Password** to create secure passwords instantly
6. **Copy** your password or **share** your settings via URL

<div class="calculator-form" id="password-generator-form">
  <div class="form-section">
    <h3>Password Length</h3>
    <div class="length-control">
      <div class="length-display">
        <span class="length-value" id="length-display">16</span>
        <span class="length-label">characters</span>
      </div>
      <div class="length-slider-container">
        <input 
          type="range" 
          id="password-length" 
          class="range-slider length-slider"
          min="4"
          max="128"
          value="16"
        />
        <div class="length-markers">
          <span>4</span>
          <span>32</span>
          <span>64</span>
          <span>128</span>
        </div>
      </div>
      <div class="length-presets">
        <button type="button" class="preset-btn" data-length="8">8</button>
        <button type="button" class="preset-btn" data-length="12">12</button>
        <button type="button" class="preset-btn active" data-length="16">16</button>
        <button type="button" class="preset-btn" data-length="24">24</button>
        <button type="button" class="preset-btn" data-length="32">32</button>
        <button type="button" class="preset-btn" data-length="64">64</button>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Character Types</h3>
    <div class="character-options">
      <label class="checkbox-card">
        <input type="checkbox" id="include-uppercase" checked />
        <span class="checkbox-content">
          <span class="checkbox-icon">ABC</span>
          <span class="checkbox-label">Uppercase</span>
          <span class="checkbox-example">A-Z</span>
        </span>
      </label>
      <label class="checkbox-card">
        <input type="checkbox" id="include-lowercase" checked />
        <span class="checkbox-content">
          <span class="checkbox-icon">abc</span>
          <span class="checkbox-label">Lowercase</span>
          <span class="checkbox-example">a-z</span>
        </span>
      </label>
      <label class="checkbox-card">
        <input type="checkbox" id="include-numbers" checked />
        <span class="checkbox-content">
          <span class="checkbox-icon">123</span>
          <span class="checkbox-label">Numbers</span>
          <span class="checkbox-example">0-9</span>
        </span>
      </label>
      <label class="checkbox-card">
        <input type="checkbox" id="include-symbols" checked />
        <span class="checkbox-content">
          <span class="checkbox-icon">@#$</span>
          <span class="checkbox-label">Symbols</span>
          <span class="checkbox-example">!@#$%^&*</span>
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
        <h4>Exclusions</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="exclude-ambiguous" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Exclude ambiguous characters</strong>
              <small>0, O, l, 1, I (easier to read)</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="exclude-similar" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Exclude similar characters</strong>
              <small>i, l, 1, L, o, 0, O</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="exclude-brackets" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Exclude brackets</strong>
              <small>( ) { } [ ] &lt; &gt;</small>
            </span>
          </label>
        </div>
        <div class="form-group" style="margin-top: 1rem;">
          <label for="custom-exclude">Custom characters to exclude</label>
          <input 
            type="text" 
            id="custom-exclude" 
            class="form-input"
            placeholder="e.g., @#$"
            maxlength="50"
          />
          <small class="form-help">Enter specific characters to exclude from passwords</small>
        </div>
      </div>
      <div class="option-group">
        <h4>Requirements</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="start-with-letter" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Start with a letter</strong>
              <small>Password must begin with A-Z or a-z</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="no-sequential" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>No sequential characters</strong>
              <small>Avoid abc, 123, etc.</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="no-repeated" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>No repeated characters</strong>
              <small>Each character appears only once</small>
            </span>
          </label>
        </div>
      </div>
      <div class="option-group">
        <h4>Minimum Character Requirements</h4>
        <div class="min-requirements">
          <div class="min-req-item">
            <label for="min-uppercase">Min uppercase</label>
            <input type="number" id="min-uppercase" class="form-input mini-input" value="0" min="0" max="10" />
          </div>
          <div class="min-req-item">
            <label for="min-lowercase">Min lowercase</label>
            <input type="number" id="min-lowercase" class="form-input mini-input" value="0" min="0" max="10" />
          </div>
          <div class="min-req-item">
            <label for="min-numbers">Min numbers</label>
            <input type="number" id="min-numbers" class="form-input mini-input" value="0" min="0" max="10" />
          </div>
          <div class="min-req-item">
            <label for="min-symbols">Min symbols</label>
            <input type="number" id="min-symbols" class="form-input mini-input" value="0" min="0" max="10" />
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>Generation Options</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="password-count">Number of passwords to generate</label>
            <select id="password-count" class="form-select">
              <option value="1">1 password</option>
              <option value="3">3 passwords</option>
              <option value="5" selected>5 passwords</option>
              <option value="10">10 passwords</option>
              <option value="20">20 passwords</option>
            </select>
          </div>
          <div class="form-group">
            <label for="custom-symbols">Custom symbol set</label>
            <input 
              type="text" 
              id="custom-symbols" 
              class="form-input"
              placeholder="Default: !@#$%^&*()_+-=[]{}|;:,.<>?"
              maxlength="50"
            />
            <small class="form-help">Leave empty to use default symbols</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      🔐 Generate Password →
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

<div id="password-result" class="calculator-result hidden">
  <!-- Results will be inserted here by JavaScript -->
</div>

<div class="info-box">
  <h4>🔐 What Makes a Strong Password?</h4>
  <p>
    A strong password should be at least 12-16 characters long and include a mix of uppercase letters, 
    lowercase letters, numbers, and special symbols. Avoid using personal information, common words, 
    or predictable patterns like "123456" or "password".
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚡ Password Strength Levels</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Weak:</strong> Less than 8 characters or limited character types</li>
    <li><strong>Fair:</strong> 8-11 characters with some variety</li>
    <li><strong>Good:</strong> 12-15 characters with multiple character types</li>
    <li><strong>Strong:</strong> 16+ characters with all character types</li>
    <li><strong>Very Strong:</strong> 20+ characters with maximum entropy</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🛡️ Password Security Tips</h4>
  <p>
    Never reuse passwords across multiple accounts. Consider using a password manager to store your 
    passwords securely. Enable two-factor authentication (2FA) wherever possible for an extra layer 
    of security. Change passwords immediately if you suspect a breach.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Settings</h4>
  <p>
    Your password preferences are automatically saved in the URL. You can <strong>bookmark this page</strong> 
    to save your favorite settings, or use the <strong>Share button</strong> to send your configuration to others. 
    Note: Generated passwords are never stored or transmitted.
  </p>
</div>

<style>
  /* Password Generator Specific Styles */
  
  .length-control {
    text-align: center;
  }
  
  .length-display {
    margin-bottom: 1.5rem;
  }
  
  .length-value {
    font-size: 4rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-primary);
    line-height: 1;
  }
  
  .length-label {
    display: block;
    font-size: 1rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }
  
  .length-slider-container {
    max-width: 100%;
    margin: 0 auto 1.5rem;
  }
  
  .length-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(to right, 
      #EF5350 0%, 
      #FFA726 25%, 
      #FFEE58 50%, 
      #66BB6A 75%, 
      #4CAF50 100%
    );
  }
  
  .length-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
    background: var(--color-white);
    border: 3px solid var(--color-accent-orange);
    box-shadow: var(--shadow-md);
  }
  
  .length-slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
    background: var(--color-white);
    border: 3px solid var(--color-accent-orange);
    box-shadow: var(--shadow-md);
  }
  
  .length-markers {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--color-gray-dark);
  }
  
  .length-presets {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .preset-btn {
    padding: 0.5rem 1rem;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.9rem;
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
  
  /* Character Type Cards */
  .character-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }
  
  .checkbox-card {
    cursor: pointer;
  }
  
  .checkbox-card input {
    display: none;
  }
  
  .checkbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    text-align: center;
  }
  
  .checkbox-card input:checked + .checkbox-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .checkbox-card:hover .checkbox-content {
    border-color: var(--color-light-blue);
  }
  
  .checkbox-icon {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
  }
  
  .checkbox-card input:checked + .checkbox-content .checkbox-icon {
    color: var(--color-accent-orange);
  }
  
  .checkbox-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  .checkbox-example {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
    font-family: var(--font-mono);
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
  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
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
  
  /* Minimum Requirements */
  .min-requirements {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .min-req-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .min-req-item label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  .mini-input {
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
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
  
  /* Password Display */
  .password-display-container {
    margin-bottom: 2rem;
  }
  
  .password-display {
    background: #1a1a2e;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .password-text {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    color: #00ff88;
    word-break: break-all;
    line-height: 1.6;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
  
  .password-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .copy-btn, .regenerate-btn {
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
  
  /* Strength Meter */
  .strength-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .strength-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .strength-header h4 {
    margin: 0;
    color: var(--color-primary-blue);
  }
  
  .strength-label {
    font-weight: 700;
    font-size: 1.1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
  }
  
  .strength-label.weak { background: #FEE2E2; color: #DC2626; }
  .strength-label.fair { background: #FEF3C7; color: #D97706; }
  .strength-label.good { background: #FEF9C3; color: #CA8A04; }
  .strength-label.strong { background: #D1FAE5; color: #059669; }
  .strength-label.very-strong { background: #DCFCE7; color: #16A34A; }
  
  .strength-bar-container {
    height: 12px;
    background: var(--color-gray-light);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .strength-bar {
    height: 100%;
    border-radius: 6px;
    transition: all 0.5s ease;
  }
  
  .strength-bar.weak { width: 20%; background: linear-gradient(90deg, #EF4444, #F87171); }
  .strength-bar.fair { width: 40%; background: linear-gradient(90deg, #F59E0B, #FBBF24); }
  .strength-bar.good { width: 60%; background: linear-gradient(90deg, #EAB308, #FACC15); }
  .strength-bar.strong { width: 80%; background: linear-gradient(90deg, #22C55E, #4ADE80); }
  .strength-bar.very-strong { width: 100%; background: linear-gradient(90deg, #16A34A, #22C55E); }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .stat-item {
    text-align: center;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    display: block;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    display: block;
  }
  
  /* Character Breakdown */
  .breakdown-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .breakdown-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .breakdown-bars {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .breakdown-item {
    display: grid;
    grid-template-columns: 100px 1fr 60px;
    align-items: center;
    gap: 1rem;
  }
  
  .breakdown-label {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-gray-dark);
  }
  
  .breakdown-bar-bg {
    height: 24px;
    background: var(--color-gray-light);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .breakdown-bar-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5rem;
    min-width: fit-content;
  }
  
  .breakdown-bar-fill.uppercase { background: linear-gradient(90deg, #3B82F6, #60A5FA); }
  .breakdown-bar-fill.lowercase { background: linear-gradient(90deg, #8B5CF6, #A78BFA); }
  .breakdown-bar-fill.numbers { background: linear-gradient(90deg, #F59E0B, #FBBF24); }
  .breakdown-bar-fill.symbols { background: linear-gradient(90deg, #EF4444, #F87171); }
  
  .breakdown-count {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    text-align: right;
  }
  
  /* Time to Crack */
  .crack-time-section {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    color: white;
    text-align: center;
  }
  
  .crack-time-section h4 {
    color: #94A3B8;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .crack-time-value {
    font-size: 2rem;
    font-weight: 800;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
    margin-bottom: 0.5rem;
  }
  
  .crack-time-note {
    font-size: 0.8rem;
    color: #94A3B8;
  }
  
  /* Multiple Passwords List */
  .passwords-list {
    margin-top: 2rem;
  }
  
  .passwords-list h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .password-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #1a1a2e;
    border-radius: var(--border-radius);
    margin-bottom: 0.75rem;
  }
  
  .password-item-text {
    flex: 1;
    font-family: var(--font-mono);
    color: #00ff88;
    word-break: break-all;
    font-size: 0.95rem;
  }
  
  .password-item-copy {
    padding: 0.5rem 1rem;
    background: var(--color-accent-orange);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    transition: all var(--transition-fast);
    white-space: nowrap;
    font-family: var(--font-body);
  }
  
  .password-item-copy:hover {
    background: var(--color-accent-orange-dark);
  }
  
  .password-item-copy.copied {
    background: var(--color-success);
  }
  
  /* Entropy Visualization */
  .entropy-visual {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--color-gray);
    margin-bottom: 1.5rem;
  }
  
  .entropy-visual h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .entropy-meter {
    display: flex;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .entropy-segment {
    transition: flex 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  
  .entropy-segment.uppercase { background: #3B82F6; }
  .entropy-segment.lowercase { background: #8B5CF6; }
  .entropy-segment.numbers { background: #F59E0B; }
  .entropy-segment.symbols { background: #EF4444; }
  
  .entropy-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
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
  
  .legend-dot.uppercase { background: #3B82F6; }
  .legend-dot.lowercase { background: #8B5CF6; }
  .legend-dot.numbers { background: #F59E0B; }
  .legend-dot.symbols { background: #EF4444; }
  
  /* Responsive */
  @media (max-width: 768px) {
    .length-value {
      font-size: 3rem;
    }
    
    .character-options {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .password-text {
      font-size: 1.1rem;
    }
    
    .breakdown-item {
      grid-template-columns: 80px 1fr 50px;
    }
    
    .crack-time-value {
      font-size: 1.5rem;
    }
    
    .password-item {
      flex-direction: column;
      align-items: stretch;
    }
    
    .password-item-copy {
      width: 100%;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .length-value {
      font-size: 2.5rem;
    }
    
    .preset-btn {
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .breakdown-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .breakdown-label {
      text-align: center;
    }
    
    .breakdown-count {
      text-align: center;
    }
  }
</style>

<script src="/scripts/calculators/password-generator.js"></script>
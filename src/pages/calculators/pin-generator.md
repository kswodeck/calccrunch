---
layout: ../../layouts/CalculatorLayout.astro
calcType: pin
---

## How to Use This Generator

1. **Choose PIN length** - 4, 6, 8 digits, or set a custom length (3-12)
2. **Set how many PINs** to generate (1-20)
3. **Enable security options** to avoid weak patterns like sequential or repeated digits
4. Click **Generate PINs** to create secure random PIN codes
5. **Copy** individual PINs with one click
6. Review the **strength analysis** to understand your PIN's security

<div class="calculator-form" id="pin-generator-form">
  <div class="form-section">
    <h3>PIN Length</h3>
    <div class="pin-length-options">
      <button type="button" class="pin-length-btn active" data-length="4">4 digits</button>
      <button type="button" class="pin-length-btn" data-length="6">6 digits</button>
      <button type="button" class="pin-length-btn" data-length="8">8 digits</button>
      <button type="button" class="pin-length-btn custom-btn" data-length="custom">Custom</button>
    </div>
    <div class="custom-length-input hidden" id="custom-length-group">
      <div class="form-group">
        <label for="custom-pin-length">Custom Length (3-12 digits)</label>
        <input 
          type="number" 
          id="custom-pin-length" 
          class="form-input"
          min="3"
          max="12"
          value="5"
        />
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Number of PINs</h3>
    <div class="pin-count-control">
      <button type="button" class="count-adjust" id="count-minus">-</button>
      <span class="count-display" id="pin-count-display">1</span>
      <button type="button" class="count-adjust" id="count-plus">+</button>
    </div>
    <div class="count-presets">
      <button type="button" class="count-preset" data-count="1">1</button>
      <button type="button" class="count-preset" data-count="5">5</button>
      <button type="button" class="count-preset" data-count="10">10</button>
      <button type="button" class="count-preset" data-count="20">20</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Security Options</h3>
    <div class="security-options">
      <label class="checkbox-item">
        <input type="checkbox" id="avoid-sequential" checked />
        <span class="checkmark"></span>
        <span class="checkbox-text">
          <strong>Avoid sequential digits</strong>
          <small>Blocks patterns like 1234, 4321, 5678</small>
        </span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" id="avoid-repeated" checked />
        <span class="checkmark"></span>
        <span class="checkbox-text">
          <strong>Avoid repeated digits</strong>
          <small>Blocks patterns like 1111, 0000, 8888</small>
        </span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" id="avoid-common" checked />
        <span class="checkmark"></span>
        <span class="checkbox-text">
          <strong>Avoid common PINs</strong>
          <small>Blocks the top 50 most commonly used PINs</small>
        </span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" id="avoid-birthyear" />
        <span class="checkmark"></span>
        <span class="checkbox-text">
          <strong>Avoid birth year patterns</strong>
          <small>Blocks patterns matching 19xx or 20xx</small>
        </span>
      </label>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate PINs
    </button>
  </div>
</div>

<div id="pin-generator-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>PIN Security Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Never use your birth date, anniversary, or address numbers as a PIN</li>
    <li>Use different PINs for different accounts and cards</li>
    <li>Longer PINs (6-8 digits) are exponentially more secure than 4-digit PINs</li>
    <li>Cover the keypad when entering your PIN in public places</li>
    <li>Change your PIN immediately if you suspect it has been compromised</li>
    <li>Never write your PIN on your card or keep it in your wallet</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: #EF4444;">
  <h4>Most Common PINs to Avoid</h4>
  <p>These are the most frequently used PINs and are the first ones attackers try:</p>
  <div class="common-pins-grid">
    <span class="common-pin">1234</span>
    <span class="common-pin">1111</span>
    <span class="common-pin">0000</span>
    <span class="common-pin">1212</span>
    <span class="common-pin">7777</span>
    <span class="common-pin">1004</span>
    <span class="common-pin">2000</span>
    <span class="common-pin">4444</span>
    <span class="common-pin">2222</span>
    <span class="common-pin">6969</span>
    <span class="common-pin">9999</span>
    <span class="common-pin">3333</span>
    <span class="common-pin">5555</span>
    <span class="common-pin">6666</span>
    <span class="common-pin">1122</span>
    <span class="common-pin">1313</span>
    <span class="common-pin">8888</span>
    <span class="common-pin">4321</span>
    <span class="common-pin">2001</span>
    <span class="common-pin">1010</span>
  </div>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>PIN Strength by Length</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>4 digits:</strong> 10,000 possible combinations - standard for bank cards</li>
    <li><strong>5 digits:</strong> 100,000 possible combinations</li>
    <li><strong>6 digits:</strong> 1,000,000 possible combinations - recommended for phones</li>
    <li><strong>8 digits:</strong> 100,000,000 possible combinations - high security</li>
    <li><strong>10+ digits:</strong> 10 billion+ combinations - maximum security</li>
  </ul>
</div>

<style>
  .pin-length-options {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .pin-length-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .pin-length-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }

  .pin-length-btn.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: #FFFFFF;
  }

  .custom-length-input {
    margin-top: 1rem;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-length-input .form-input {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
  }

  /* PIN Count Control */
  .pin-count-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .count-adjust {
    width: 44px;
    height: 44px;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
  }

  .count-adjust:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }

  .count-display {
    font-size: 3rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-primary);
    min-width: 60px;
    text-align: center;
  }

  .count-presets {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .count-preset {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .count-preset:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }

  /* Security Options */
  .security-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    transition: background var(--transition-fast);
    border: 1px solid transparent;
  }

  .checkbox-item:hover {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
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
    content: '\2713';
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

  /* PIN Display */
  .pin-terminal {
    background: #1a1a2e;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .pin-terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .terminal-dot.red { background: #ff5f56; }
  .terminal-dot.yellow { background: #ffbd2e; }
  .terminal-dot.green { background: #27c93f; }

  .terminal-title {
    color: var(--color-gray);
    font-size: 0.8rem;
    margin-left: 0.5rem;
    font-family: var(--font-mono);
  }

  .pin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .pin-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: rgba(255,255,255,0.03);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    transition: all var(--transition-fast);
  }

  .pin-item:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(0, 255, 136, 0.2);
  }

  .pin-item-text {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    font-weight: 700;
    color: #00ff88;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  .pin-item-copy {
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--color-gray);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    font-family: var(--font-body);
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .pin-item-copy:hover {
    border-color: #00ff88;
    color: #00ff88;
  }

  .pin-item-copy.copied {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.15);
    color: #00ff88;
  }

  /* Strength Indicator */
  .pin-strength {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--color-gray);
    margin-bottom: 1.5rem;
  }

  .pin-strength h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }

  .strength-meter {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .strength-bar-bg {
    flex: 1;
    height: 12px;
    background: var(--color-gray-light);
    border-radius: 6px;
    overflow: hidden;
  }

  .strength-bar-fill {
    height: 100%;
    border-radius: 6px;
    transition: all 0.5s ease;
  }

  .strength-text {
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .strength-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .strength-detail-item {
    text-align: center;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }

  .strength-detail-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    display: block;
  }

  .strength-detail-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    display: block;
  }

  /* Common PINs Grid */
  .common-pins-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .common-pin {
    font-family: var(--font-mono);
    font-weight: 700;
    padding: 0.35rem 0.75rem;
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #991B1B;
  }

  .form-actions {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .pin-length-options {
      gap: 0.5rem;
    }

    .pin-length-btn {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }

    .pin-grid {
      grid-template-columns: 1fr;
    }

    .pin-item-text {
      font-size: 1.5rem;
    }

    .count-display {
      font-size: 2.5rem;
    }

    .strength-details {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .pin-length-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .strength-details {
      grid-template-columns: 1fr;
    }
  }
</style>

<script src="/scripts/calculators/pin-generator.js"></script>

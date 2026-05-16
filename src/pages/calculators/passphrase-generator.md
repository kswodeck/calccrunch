---
layout: ../../layouts/CalculatorLayout.astro
calcType: passphrase
---

## How to Use This Generator

1. **Set the number of words** using the slider (3-8 words)
2. **Choose a word list style** - common English, extended, nature, or tech themed
3. **Pick a separator** - space, hyphen, period, underscore, none, or custom
4. **Customize capitalization** and optionally add numbers or symbols
5. Click **Generate Passphrase** to create memorable secure passphrases
6. **Copy** your passphrase and review the strength analysis

<div class="calculator-form" id="passphrase-generator-form">
  <div class="form-section">
    <h3>Number of Words</h3>
    <div class="word-count-control">
      <div class="word-count-display">
        <span class="word-count-value" id="word-count-display">4</span>
        <span class="word-count-label">words</span>
      </div>
      <div class="word-slider-container">
        <input 
          type="range" 
          id="word-count-slider" 
          class="range-slider word-slider"
          min="3"
          max="8"
          value="4"
        />
        <div class="word-markers">
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Word List Style</h3>
    <div class="wordlist-options">
      <label class="radio-card">
        <input type="radio" name="wordlist" value="common" checked />
        <span class="radio-content">
          <span class="radio-icon">Aa</span>
          <span class="radio-label">Common English</span>
          <span class="radio-desc">Everyday familiar words</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="wordlist" value="extended" />
        <span class="radio-content">
          <span class="radio-icon">Ab</span>
          <span class="radio-label">Extended English</span>
          <span class="radio-desc">Larger vocabulary set</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="wordlist" value="nature" />
        <span class="radio-content">
          <span class="radio-icon">🌿</span>
          <span class="radio-label">Nature Words</span>
          <span class="radio-desc">Animals, plants, elements</span>
        </span>
      </label>
      <label class="radio-card">
        <input type="radio" name="wordlist" value="tech" />
        <span class="radio-content">
          <span class="radio-icon">&lt;/&gt;</span>
          <span class="radio-label">Tech Words</span>
          <span class="radio-desc">Technology and computing</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Separator</h3>
    <div class="separator-options">
      <button type="button" class="sep-btn" data-sep=" ">Space</button>
      <button type="button" class="sep-btn active" data-sep="-">Hyphen</button>
      <button type="button" class="sep-btn" data-sep=".">Period</button>
      <button type="button" class="sep-btn" data-sep="_">Underscore</button>
      <button type="button" class="sep-btn" data-sep="">None</button>
      <button type="button" class="sep-btn" data-sep="custom">Custom</button>
    </div>
    <div class="custom-separator-input hidden" id="custom-sep-group">
      <div class="form-group">
        <input 
          type="text" 
          id="custom-separator" 
          class="form-input"
          placeholder="Enter custom separator"
          maxlength="5"
        />
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="capitalize-option">Capitalization</label>
        <select id="capitalize-option" class="form-select">
          <option value="none">no capitalization</option>
          <option value="first" selected>First Letter of Each Word</option>
          <option value="random">Random Word Capitalized</option>
          <option value="all">ALL CAPS</option>
        </select>
      </div>
      <div class="form-group">
        <label for="word-length-filter">Word Length</label>
        <select id="word-length-filter" class="form-select">
          <option value="any">Any Length</option>
          <option value="short">Short (3-5 letters)</option>
          <option value="medium" selected>Medium (4-7 letters)</option>
          <option value="long">Long (6-10 letters)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="add-number">Add Number</label>
        <select id="add-number" class="form-select">
          <option value="none">No Number</option>
          <option value="end">At End</option>
          <option value="between">Between Words</option>
          <option value="random">Random Position</option>
        </select>
      </div>
      <div class="form-group">
        <label for="add-symbol">Add Symbol</label>
        <select id="add-symbol" class="form-select">
          <option value="none">No Symbol</option>
          <option value="end">At End</option>
          <option value="between">Between Words</option>
          <option value="random">Random Position</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="passphrase-count">Number of Passphrases</label>
      <select id="passphrase-count" class="form-select">
        <option value="1" selected>1 passphrase</option>
        <option value="3">3 passphrases</option>
        <option value="5">5 passphrases</option>
        <option value="10">10 passphrases</option>
      </select>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate Passphrase
    </button>
  </div>
</div>

<div id="passphrase-generator-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>Why Use a Passphrase?</h4>
  <p>
    Passphrases are typically longer than passwords but much easier to remember. A 4-word passphrase like 
    "correct-horse-battery-staple" provides approximately 44 bits of entropy from a standard word list, 
    equivalent to a random 8-character password but far more memorable. Adding numbers and symbols 
    increases security even further.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>Passphrase vs Password Comparison</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Memorability:</strong> "Sunset-Mountain-River-42" is far easier to remember than "xK#9mP$2qL"</li>
    <li><strong>Typing speed:</strong> Common words are faster to type than random characters</li>
    <li><strong>Entropy per character:</strong> Passwords win, but passphrases win on total entropy</li>
    <li><strong>Error rate:</strong> Fewer typos with familiar words vs random symbols</li>
    <li><strong>Recommendation:</strong> Use 4+ word passphrases for accounts that don't accept password managers</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Tips for Strong Passphrases</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Use at least 4 random words - never use famous quotes or song lyrics</li>
    <li>Add a number or symbol to defeat dictionary-based attacks</li>
    <li>The words should be truly random, not a meaningful phrase you made up</li>
    <li>Longer word lists provide more security per word</li>
    <li>Consider capitalizing one or more words for added complexity</li>
  </ul>
</div>

<style>
  .word-count-control {
    text-align: center;
  }

  .word-count-display {
    margin-bottom: 1.5rem;
  }

  .word-count-value {
    font-size: 4rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-primary);
    line-height: 1;
  }

  .word-count-label {
    display: block;
    font-size: 1rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
  }

  .word-slider-container {
    max-width: 100%;
    margin: 0 auto;
  }

  .word-slider {
    width: 100%;
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(to right, #FFA726 0%, #66BB6A 50%, #4CAF50 100%);
  }

  .word-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
    background: var(--color-white);
    border: 3px solid var(--color-accent-orange);
    box-shadow: var(--shadow-md);
  }

  .word-slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
    background: var(--color-white);
    border: 3px solid var(--color-accent-orange);
    box-shadow: var(--shadow-md);
  }

  .word-markers {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    padding: 0 0.5rem;
  }

  /* Wordlist Options */
  .wordlist-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
  }

  .radio-card {
    cursor: pointer;
    display: block;
  }

  .radio-card input {
    display: none;
  }

  .radio-content {
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

  .radio-card input:checked + .radio-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  .radio-card:hover .radio-content {
    border-color: var(--color-light-blue);
  }

  .radio-icon {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
  }

  .radio-card input:checked + .radio-content .radio-icon {
    color: var(--color-accent-orange);
  }

  .radio-label {
    font-weight: 700;
    color: var(--color-gray-dark);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .radio-desc {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }

  /* Separator Options */
  .separator-options {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sep-btn {
    padding: 0.6rem 1.25rem;
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .sep-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }

  .sep-btn.active {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: #FFFFFF;
  }

  .custom-separator-input {
    margin-top: 1rem;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-separator-input .form-input {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
  }

  /* Passphrase Display */
  .passphrase-terminal {
    background: #1a1a2e;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .passphrase-primary {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    color: #00ff88;
    word-break: break-word;
    line-height: 1.6;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    margin-bottom: 1.5rem;
    padding: 1rem;
  }

  .passphrase-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .passphrase-action-btn {
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

  .passphrase-action-btn.copy {
    background: var(--color-accent-orange);
    color: white;
  }

  .passphrase-action-btn.copy:hover {
    background: var(--color-accent-orange-dark);
    transform: translateY(-2px);
  }

  .passphrase-action-btn.copy.copied {
    background: var(--color-success);
  }

  .passphrase-action-btn.regenerate {
    background: #16213e;
    color: var(--color-gray);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .passphrase-action-btn.regenerate:hover {
    color: white;
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-2px);
  }

  /* Strength Section */
  .passphrase-strength {
    background: var(--color-white);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--color-gray);
    margin-bottom: 1.5rem;
  }

  .passphrase-strength h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }

  .entropy-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .entropy-bar-bg {
    flex: 1;
    height: 12px;
    background: var(--color-gray-light);
    border-radius: 6px;
    overflow: hidden;
  }

  .entropy-bar-fill {
    height: 100%;
    border-radius: 6px;
    transition: all 0.5s ease;
  }

  .entropy-label {
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .strength-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .strength-stat {
    text-align: center;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }

  .strength-stat-value {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    display: block;
  }

  .strength-stat-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    display: block;
  }

  /* Comparison */
  .comparison-section {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    color: white;
  }

  .comparison-section h4 {
    color: var(--color-gray);
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: center;
  }

  .comparison-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .comparison-item {
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    background: rgba(255,255,255,0.05);
  }

  .comparison-item-label {
    font-size: 0.75rem;
    color: var(--color-gray);
    margin-bottom: 0.5rem;
    display: block;
  }

  .comparison-item-value {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: #00ff88;
    word-break: break-all;
    display: block;
    margin-bottom: 0.5rem;
  }

  .comparison-item-entropy {
    font-size: 0.7rem;
    color: #64748B;
  }

  /* Multiple Passphrases */
  .passphrase-list {
    margin-top: 1.5rem;
  }

  .passphrase-list h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }

  .passphrase-list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #1a1a2e;
    border-radius: var(--border-radius);
    margin-bottom: 0.75rem;
  }

  .passphrase-list-text {
    flex: 1;
    font-family: var(--font-mono);
    color: #00ff88;
    word-break: break-all;
    font-size: 0.95rem;
  }

  .passphrase-list-copy {
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

  .passphrase-list-copy:hover {
    background: var(--color-accent-orange-dark);
  }

  .passphrase-list-copy.copied {
    background: var(--color-success);
  }

  /* Crack Time Display */
  .crack-time-display {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: white;
  }

  .crack-time-display h4 {
    color: var(--color-gray);
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
    color: var(--color-gray);
  }

  .form-actions {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .word-count-value {
      font-size: 3rem;
    }

    .wordlist-options {
      grid-template-columns: repeat(2, 1fr);
    }

    .passphrase-primary {
      font-size: 1.25rem;
    }

    .comparison-items {
      grid-template-columns: 1fr;
    }

    .passphrase-list-item {
      flex-direction: column;
      align-items: stretch;
    }

    .passphrase-list-copy {
      width: 100%;
      text-align: center;
    }

    .strength-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .word-count-value {
      font-size: 2.5rem;
    }

    .wordlist-options {
      grid-template-columns: 1fr;
    }

    .separator-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .strength-stats {
      grid-template-columns: 1fr;
    }
  }
</style>

<script src="/scripts/calculators/passphrase-generator.js"></script>

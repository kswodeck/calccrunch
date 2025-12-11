---
layout: ../../layouts/CalculatorLayout.astro
calcType: lorem
---

## How to Use This Generator

1. **Choose your text style** - Classic Lorem Ipsum, Hipster, Corporate, Tech, or more
2. **Select output type** - paragraphs, sentences, words, or list items
3. **Set the amount** - how many units you need
4. **Configure options** - HTML wrapping, starting phrase, text case, etc.
5. Click **Generate Text** to create your placeholder content
6. **Copy** results or **share** your settings via URL

<div class="calculator-form" id="lorem-form">
  <div class="form-section">
    <h3>Text Style</h3>
    <p class="section-desc">Choose the flavor of placeholder text you need</p>
    <div class="style-options">
      <label class="style-card">
        <input type="radio" name="textStyle" value="classic" id="style-classic" checked />
        <span class="style-content">
          <span class="style-icon">📜</span>
          <span class="style-label">Classic Lorem</span>
          <span class="style-desc">Traditional Latin placeholder text</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="hipster" id="style-hipster" />
        <span class="style-content">
          <span class="style-icon">🧔</span>
          <span class="style-label">Hipster Ipsum</span>
          <span class="style-desc">Artisanal, small-batch vocabulary</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="corporate" id="style-corporate" />
        <span class="style-content">
          <span class="style-icon">💼</span>
          <span class="style-label">Corporate Ipsum</span>
          <span class="style-desc">Business buzzwords & jargon</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="tech" id="style-tech" />
        <span class="style-content">
          <span class="style-icon">💻</span>
          <span class="style-label">Tech Ipsum</span>
          <span class="style-desc">Startup & technology terms</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="pirate" id="style-pirate" />
        <span class="style-content">
          <span class="style-icon">🏴‍☠️</span>
          <span class="style-label">Pirate Ipsum</span>
          <span class="style-desc">Arr! Nautical themed text</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="legal" id="style-legal" />
        <span class="style-content">
          <span class="style-icon">⚖️</span>
          <span class="style-label">Legal Ipsum</span>
          <span class="style-desc">Legal terminology & phrases</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="medical" id="style-medical" />
        <span class="style-content">
          <span class="style-icon">🏥</span>
          <span class="style-label">Medical Ipsum</span>
          <span class="style-desc">Healthcare vocabulary</span>
        </span>
      </label>
      <label class="style-card">
        <input type="radio" name="textStyle" value="space" id="style-space" />
        <span class="style-content">
          <span class="style-icon">🚀</span>
          <span class="style-label">Space Ipsum</span>
          <span class="style-desc">Cosmic & astronomical terms</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Output Type & Amount</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="output-type">Output Type</label>
        <select id="output-type" class="form-select">
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="list">List Items</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <div class="count-control">
          <button type="button" class="count-btn minus" id="amount-minus">−</button>
          <input 
            type="number" 
            id="amount" 
            class="form-input count-input"
            value="3"
            min="1"
            max="100"
          />
          <button type="button" class="count-btn plus" id="amount-plus">+</button>
        </div>
        <small class="form-help" id="amount-help">Generate 1 to 100 paragraphs</small>
      </div>
    </div>
    <div class="amount-presets">
      <span class="preset-label">Quick amounts:</span>
      <button type="button" class="preset-btn" data-amount="1">1</button>
      <button type="button" class="preset-btn" data-amount="3">3</button>
      <button type="button" class="preset-btn" data-amount="5">5</button>
      <button type="button" class="preset-btn" data-amount="10">10</button>
      <button type="button" class="preset-btn" data-amount="25">25</button>
      <button type="button" class="preset-btn" data-amount="50">50</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Options</h3>
    <div class="options-grid">
      <label class="option-card">
        <input type="checkbox" id="start-lorem" checked />
        <span class="option-content">
          <span class="option-icon">📝</span>
          <span class="option-label">Start with "Lorem ipsum"</span>
          <span class="option-desc">Begin text with traditional opening</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="include-html" />
        <span class="option-content">
          <span class="option-icon">🏷️</span>
          <span class="option-label">Include HTML Tags</span>
          <span class="option-desc">Wrap output in &lt;p&gt; or &lt;li&gt; tags</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="random-bold" />
        <span class="option-content">
          <span class="option-icon">🅱️</span>
          <span class="option-label">Random Bold Words</span>
          <span class="option-desc">Emphasize random words with &lt;strong&gt;</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="random-italic" />
        <span class="option-content">
          <span class="option-icon">𝐼</span>
          <span class="option-label">Random Italic Words</span>
          <span class="option-desc">Style random words with &lt;em&gt;</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="random-links" />
        <span class="option-content">
          <span class="option-icon">🔗</span>
          <span class="option-label">Random Links</span>
          <span class="option-desc">Add placeholder &lt;a href="#"&gt; tags</span>
        </span>
      </label>
      <label class="option-card">
        <input type="checkbox" id="show-stats" checked />
        <span class="option-content">
          <span class="option-icon">📊</span>
          <span class="option-label">Show Statistics</span>
          <span class="option-desc">Display text analytics</span>
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
        <h4>Text Formatting</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="text-case">Text Case</label>
            <select id="text-case" class="form-select">
              <option value="normal">Normal (Sentence case)</option>
              <option value="lowercase">lowercase</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="titlecase">Title Case</option>
            </select>
          </div>
          <div class="form-group">
            <label for="custom-tag">Custom HTML Wrapper</label>
            <input 
              type="text" 
              id="custom-tag" 
              class="form-input"
              placeholder="e.g., div, span, section"
              maxlength="20"
            />
            <small class="form-help">Override default p/li tags</small>
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>Paragraph Settings</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="sentences-per-para">Sentences per Paragraph</label>
            <select id="sentences-per-para" class="form-select">
              <option value="random">Random (3-8)</option>
              <option value="3">3 sentences</option>
              <option value="4">4 sentences</option>
              <option value="5">5 sentences</option>
              <option value="6">6 sentences</option>
              <option value="7">7 sentences</option>
              <option value="8">8 sentences</option>
            </select>
          </div>
          <div class="form-group">
            <label for="words-per-sentence">Words per Sentence</label>
            <select id="words-per-sentence" class="form-select">
              <option value="random">Random (5-15)</option>
              <option value="short">Short (5-8)</option>
              <option value="medium">Medium (8-12)</option>
              <option value="long">Long (12-18)</option>
            </select>
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>List Options</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="list-type">List Type</label>
            <select id="list-type" class="form-select">
              <option value="ul">Unordered (bullets)</option>
              <option value="ol">Ordered (numbers)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="checkbox-item">
              <input type="checkbox" id="include-list-wrapper" checked />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <strong>Include List Wrapper</strong>
                <small>Wrap items in &lt;ul&gt; or &lt;ol&gt; tags</small>
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="option-group">
        <h4>Custom Class/ID</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="custom-class">CSS Class</label>
            <input 
              type="text" 
              id="custom-class" 
              class="form-input"
              placeholder="e.g., my-text, lorem-content"
              maxlength="50"
            />
          </div>
          <div class="form-group">
            <label for="custom-id">Element ID</label>
            <input 
              type="text" 
              id="custom-id" 
              class="form-input"
              placeholder="e.g., intro-text"
              maxlength="50"
            />
            <small class="form-help">Applied to first element only</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      📝 Generate Text →
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

<div id="lorem-result" class="calculator-result hidden">
  <!-- Results will be inserted here by JavaScript -->
</div>

<div class="info-box">
  <h4>📝 What is Lorem Ipsum?</h4>
  <p>
    Lorem Ipsum is placeholder text used in the design and publishing industries. It originated from 
    a scrambled section of "De Finibus Bonorum et Malorum" by Cicero (45 BC). Using Lorem Ipsum 
    allows designers to focus on visual elements without being distracted by readable content.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚡ Text Styles Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Classic Lorem:</strong> Traditional Latin pseudo-text used for centuries</li>
    <li><strong>Hipster Ipsum:</strong> Trendy, artisanal words for modern mockups</li>
    <li><strong>Corporate Ipsum:</strong> Business jargon and buzzwords</li>
    <li><strong>Tech Ipsum:</strong> Startup and technology terminology</li>
    <li><strong>Pirate Ipsum:</strong> Nautical and pirate-themed vocabulary</li>
    <li><strong>Legal Ipsum:</strong> Legal terminology and court language</li>
    <li><strong>Medical Ipsum:</strong> Healthcare and medical vocabulary</li>
    <li><strong>Space Ipsum:</strong> Astronomy and space exploration terms</li>
  </ul>
</div>

<div class="info-box" style="background: #F0FFF4; border-left-color: #48BB78;">
  <h4>💡 Pro Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Use <strong>HTML tags</strong> option when copying directly into your code</li>
    <li>Add <strong>random bold/italic</strong> to test your typography styles</li>
    <li>Generate <strong>list items</strong> to test navigation or menu designs</li>
    <li>Share your settings via URL for consistent team mockups</li>
    <li>The statistics panel helps estimate content length requirements</li>
  </ul>
</div>

---

## Why Use a Lorem Ipsum Generator?

Lorem Ipsum text serves several important purposes in design and development workflows. It provides realistic-looking content that helps clients and stakeholders visualize the final product without getting distracted by the actual copy. This allows teams to focus on layout, typography, spacing, and visual hierarchy during the design phase.

## Common Use Cases

**Web Design Mockups:** When creating website layouts, placeholder text helps demonstrate how content will flow and wrap within different containers and responsive breakpoints.

**Print Design:** Brochures, magazines, and other print materials often use Lorem Ipsum during the layout phase before final copy is available.

**App Prototyping:** Mobile and desktop application interfaces benefit from realistic text to test UI components and user flows.

**Typography Testing:** Lorem Ipsum helps designers evaluate font choices, line heights, letter spacing, and overall readability.

## History of Lorem Ipsum

The standard Lorem Ipsum passage has been used since the 1500s when an unknown printer scrambled a Latin text to create a type specimen book. It survived five centuries of typesetting and has remained the industry standard for placeholder text. The passage comes from sections 1.10.32 and 1.10.33 of "De Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.

<style>
  /* Style Selection Cards */
  .style-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
  }
  
  .style-card {
    cursor: pointer;
    display: block;
  }
  
  .style-card input {
    display: none;
  }
  
  .style-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-lg);
    background: white;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
  }
  
  .style-card:hover .style-content {
    border-color: var(--color-light-blue);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .style-card input:checked + .style-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, white 100%);
    box-shadow: var(--shadow-md);
  }
  
  .style-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-sm);
  }
  
  .style-label {
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: var(--text-base);
    margin-bottom: var(--space-xs);
  }
  
  .style-desc {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    opacity: 0.8;
  }
  
  /* Section Description */
  .section-desc {
    color: var(--color-gray-dark);
    margin-bottom: var(--space-lg);
    font-size: var(--text-sm);
  }
  
  /* Amount Presets */
  .amount-presets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
    margin-top: var(--space-md);
  }
  
  .preset-label {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
    font-weight: 600;
  }
  
  .preset-btn {
    padding: var(--space-xs) var(--space-md);
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: 50px;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    color: var(--color-gray-dark);
  }
  
  .preset-btn:hover {
    border-color: var(--color-light-blue);
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
  }
  
  .preset-btn.active {
    border-color: var(--color-accent-orange);
    background: var(--color-accent-orange);
    color: white;
  }
  
  /* Count Control */
  .count-control {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .count-btn {
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: var(--border-radius);
    font-size: var(--text-xl);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-dark);
    font-family: var(--font-body);
  }
  
  .count-btn:hover {
    border-color: var(--color-accent-orange);
    color: var(--color-accent-orange);
  }
  
  .count-btn:active {
    transform: scale(0.95);
  }
  
  .count-input {
    width: 80px;
    text-align: center;
    font-weight: 600;
    font-size: var(--text-lg);
  }
  
  /* Options Grid */
  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-md);
  }
  
  .option-card {
    cursor: pointer;
    display: block;
  }
  
  .option-card input {
    display: none;
  }
  
  .option-content {
    display: flex;
    flex-direction: column;
    padding: var(--space-md);
    background: white;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
  }
  
  .option-card:hover .option-content {
    border-color: var(--color-light-blue);
  }
  
  .option-card input:checked + .option-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, white 100%);
  }
  
  .option-icon {
    font-size: 1.5rem;
    margin-bottom: var(--space-xs);
  }
  
  .option-label {
    font-weight: 600;
    color: var(--color-primary-blue);
    font-size: var(--text-sm);
  }
  
  .option-desc {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    opacity: 0.7;
    margin-top: var(--space-xs);
  }
  
  /* Advanced Toggle */
  .advanced-toggle {
    margin-bottom: var(--space-md);
  }
  
  .toggle-advanced-btn {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: white;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-family: var(--font-body);
    font-weight: 600;
    color: var(--color-gray-dark);
    transition: all var(--transition-fast);
    width: 100%;
    justify-content: center;
  }
  
  .toggle-advanced-btn:hover {
    border-color: var(--color-light-blue);
    color: var(--color-primary-blue);
  }
  
  .toggle-icon {
    transition: transform var(--transition-fast);
  }
  
  .toggle-advanced-btn.active .toggle-icon {
    transform: rotate(90deg);
  }
  
  .advanced-options {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 2px dashed var(--color-gray);
  }
  
  .option-group {
    margin-bottom: var(--space-xl);
  }
  
  .option-group:last-child {
    margin-bottom: 0;
  }
  
  .option-group h4 {
    color: var(--color-primary-blue);
    font-size: var(--text-base);
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--color-gray);
  }
  
  /* Checkbox Item */
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    cursor: pointer;
    padding: var(--space-md);
    background: white;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
  }
  
  .checkbox-item:hover {
    border-color: var(--color-light-blue);
  }
  
  .checkbox-item input:checked ~ .checkbox-text {
    color: var(--color-primary-blue);
  }
  
  .checkbox-text {
    display: flex;
    flex-direction: column;
  }
  
  .checkbox-text strong {
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }
  
  .checkbox-text small {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    opacity: 0.7;
  }
  
  /* Secondary Actions */
  .secondary-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    margin-top: var(--space-lg);
    flex-wrap: wrap;
  }
  
  /* Result Styles */
  .result-header {
    text-align: center;
    margin-bottom: var(--space-xl);
  }
  
  .result-header h3 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-sm);
  }
  
  .style-badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
    border-radius: 50px;
    font-size: var(--text-sm);
    font-weight: 600;
    margin-bottom: var(--space-md);
  }
  
  /* Generated Text Display */
  .generated-text-container {
    background: white;
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
    position: relative;
  }
  
  .generated-text {
    font-family: var(--font-body);
    line-height: 1.8;
    color: var(--color-gray-dark);
    max-height: 500px;
    overflow-y: auto;
    padding-right: var(--space-md);
  }
  
  .generated-text p {
    margin-bottom: var(--space-lg);
  }
  
  .generated-text p:last-child {
    margin-bottom: 0;
  }
  
  .generated-text ul,
  .generated-text ol {
    margin-bottom: var(--space-lg);
    padding-left: var(--space-xl);
  }
  
  .generated-text li {
    margin-bottom: var(--space-sm);
  }
  
  .text-view-toggle {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    justify-content: center;
  }
  
  .view-toggle-btn {
    padding: var(--space-sm) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    font-size: var(--text-sm);
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    color: var(--color-gray-dark);
  }
  
  .view-toggle-btn:hover {
    border-color: var(--color-light-blue);
    color: var(--color-primary-blue);
  }
  
  .view-toggle-btn.active {
    background: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: white;
  }
  
  .raw-html-view {
    background: #1a1a2e;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    max-height: 500px;
    overflow: auto;
  }
  
  .raw-html-view pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: #00ff88;
    line-height: 1.6;
  }
  
  /* Result Actions */
  .result-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--space-xl);
  }
  
  .action-btn {
    padding: var(--space-md) var(--space-xl);
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
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
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl);
    margin-bottom: var(--space-xl);
    border: 1px solid var(--color-gray);
  }
  
  .stats-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-lg);
    text-align: center;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
  }
  
  .stat-card {
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, white 100%);
    padding: var(--space-lg);
    border-radius: var(--border-radius);
    text-align: center;
    border: 1px solid var(--color-light-blue);
  }
  
  .stat-value {
    font-size: var(--text-2xl);
    font-weight: 800;
    color: var(--color-accent-orange);
    font-family: var(--font-mono);
    margin-bottom: var(--space-xs);
  }
  
  .stat-label {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    font-weight: 600;
    text-transform: uppercase;
  }
  
  /* Word Length Distribution */
  .distribution-section {
    background: white;
    border-radius: var(--border-radius);
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
    border: 1px solid var(--color-gray);
  }
  
  .distribution-section h5 {
    color: var(--color-primary-blue);
    margin-bottom: var(--space-md);
    text-align: center;
    font-size: var(--text-base);
  }
  
  .distribution-chart {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: var(--space-sm);
    height: 120px;
    padding: var(--space-md) 0;
  }
  
  .chart-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    flex: 1;
    max-width: 60px;
  }
  
  .chart-bar-fill {
    width: 100%;
    background: linear-gradient(180deg, var(--color-accent-orange) 0%, #ff8a5c 100%);
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
    min-height: 4px;
  }
  
  .chart-bar-label {
    font-size: 0.65rem;
    color: var(--color-gray-dark);
    font-weight: 600;
  }
  
  .chart-bar-count {
    font-size: 0.6rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }
  
  /* Character Frequency */
  .char-frequency {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    justify-content: center;
    margin-top: var(--space-md);
  }
  
  .char-bubble {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: var(--text-sm);
    color: white;
    position: relative;
    cursor: default;
  }
  
  .char-bubble .freq {
    position: absolute;
    bottom: -18px;
    font-size: 0.6rem;
    color: var(--color-gray-dark);
    font-weight: 600;
  }
  
  /* Reading Time */
  .reading-info {
    display: flex;
    justify-content: center;
    gap: var(--space-xl);
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-gray);
  }
  
  .reading-item {
    text-align: center;
  }
  
  .reading-icon {
    font-size: 1.5rem;
    margin-bottom: var(--space-xs);
  }
  
  .reading-value {
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: var(--text-lg);
  }
  
  .reading-label {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .style-options {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .options-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .reading-info {
      flex-direction: column;
      gap: var(--space-md);
    }
    
    .count-control {
      flex-wrap: nowrap;
    }
    
    .count-input {
      width: 70px;
    }
  }
  
  @media (max-width: 480px) {
    .style-options {
      grid-template-columns: 1fr;
    }
    
    .amount-presets {
      justify-content: center;
    }
    
    .preset-label {
      width: 100%;
      text-align: center;
      margin-bottom: var(--space-xs);
    }
    
    .result-actions {
      flex-direction: column;
    }
    
    .action-btn {
      width: 100%;
      justify-content: center;
    }
    
    .text-view-toggle {
      flex-direction: column;
    }
    
    .view-toggle-btn {
      width: 100%;
    }
    
    .stat-value {
      font-size: var(--text-xl);
    }
  }
</style>

<script src="/scripts/calculators/lorem-ipsum-generator.js"></script>
---
layout: ../../layouts/CalculatorLayout.astro
title: Baby Name Generator
description: Find the perfect baby name with our comprehensive name generator. Filter by gender, origin, meaning, popularity, and more. Get first and middle name suggestions that flow beautifully with your last name. Explore thousands of unique names with detailed meanings and origins.
category: generators
tags: ['baby name', 'name generator', 'baby names', 'first name', 'middle name', 'name meaning']
featured: true
calcType: babyname
seoTitle: Free Baby Name Generator - Find Perfect Names with Meanings & Origins
seoDescription: Discover the perfect baby name with our free generator. Filter by gender, origin, meaning, length, and popularity. Get first and middle name combos that flow beautifully.
estimatedTime: 2 minutes
difficulty: Easy
---

## How to Use This Generator

1. **Select gender preference** - boy, girl, or gender-neutral names
2. **Choose name origins** - filter by cultural background (optional)
3. **Set your preferences** - starting letter, length, syllables, popularity
4. **Enter your last name** to get names that flow well together
5. **Add first or middle name** if you already have one picked
6. Click **Generate Names** to discover your perfect baby name
7. **Save favorites** and **share** your settings via URL

<div class="calculator-form" id="baby-name-form">
  <div class="form-section">
    <h3>Your Name Inputs</h3>
    <p class="section-desc">Enter any names you've already chosen, and we'll help fill in the rest.</p>
    <div class="form-row">
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input 
          type="text" 
          id="first-name" 
          class="form-input"
          placeholder="Leave blank to generate"
          maxlength="30"
        />
        <small class="form-help">Already have a first name? Enter it here.</small>
      </div>
      <div class="form-group">
        <label for="middle-name">Middle Name</label>
        <input 
          type="text" 
          id="middle-name" 
          class="form-input"
          placeholder="Leave blank to generate"
          maxlength="30"
        />
        <small class="form-help">Already have a middle name? Enter it here.</small>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input 
          type="text" 
          id="last-name" 
          class="form-input"
          placeholder="Enter for flow analysis"
          maxlength="30"
        />
        <small class="form-help">For name flow and compatibility scoring.</small>
      </div>
    </div>
    <div class="generate-options">
      <span class="generate-label">Generate:</span>
      <label class="pill-option">
        <input type="checkbox" id="gen-first" checked />
        <span class="pill-content">First Names</span>
      </label>
      <label class="pill-option">
        <input type="checkbox" id="gen-middle" />
        <span class="pill-content">Middle Names</span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Gender</h3>
    <div class="gender-options">
      <label class="gender-card">
        <input type="radio" name="gender" value="girl" id="gender-girl" />
        <span class="gender-content">
          <span class="gender-icon">👧</span>
          <span class="gender-label">Girl</span>
        </span>
      </label>
      <label class="gender-card">
        <input type="radio" name="gender" value="boy" id="gender-boy" />
        <span class="gender-content">
          <span class="gender-icon">👦</span>
          <span class="gender-label">Boy</span>
        </span>
      </label>
      <label class="gender-card">
        <input type="radio" name="gender" value="neutral" id="gender-neutral" />
        <span class="gender-content">
          <span class="gender-icon">👶</span>
          <span class="gender-label">Neutral</span>
        </span>
      </label>
      <label class="gender-card">
        <input type="radio" name="gender" value="any" id="gender-any" checked />
        <span class="gender-content">
          <span class="gender-icon">✨</span>
          <span class="gender-label">Any</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Name Origins</h3>
    <p class="section-desc">Select one or more cultural origins (leave all unchecked for any origin)</p>
    <div class="origins-grid">
      <label class="origin-chip">
        <input type="checkbox" value="english" class="origin-checkbox" />
        <span class="chip-content">🇬🇧 English</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="hebrew" class="origin-checkbox" />
        <span class="chip-content">✡️ Hebrew</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="greek" class="origin-checkbox" />
        <span class="chip-content">🇬🇷 Greek</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="latin" class="origin-checkbox" />
        <span class="chip-content">🏛️ Latin</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="irish" class="origin-checkbox" />
        <span class="chip-content">🇮🇪 Irish</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="spanish" class="origin-checkbox" />
        <span class="chip-content">🇪🇸 Spanish</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="french" class="origin-checkbox" />
        <span class="chip-content">🇫🇷 French</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="italian" class="origin-checkbox" />
        <span class="chip-content">🇮🇹 Italian</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="german" class="origin-checkbox" />
        <span class="chip-content">🇩🇪 German</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="arabic" class="origin-checkbox" />
        <span class="chip-content">🌙 Arabic</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="indian" class="origin-checkbox" />
        <span class="chip-content">🇮🇳 Indian</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="african" class="origin-checkbox" />
        <span class="chip-content">🌍 African</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="japanese" class="origin-checkbox" />
        <span class="chip-content">🇯🇵 Japanese</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="chinese" class="origin-checkbox" />
        <span class="chip-content">🇨🇳 Chinese</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="korean" class="origin-checkbox" />
        <span class="chip-content">🇰🇷 Korean</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="scandinavian" class="origin-checkbox" />
        <span class="chip-content">🇸🇪 Scandinavian</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="slavic" class="origin-checkbox" />
        <span class="chip-content">🏔️ Slavic</span>
      </label>
      <label class="origin-chip">
        <input type="checkbox" value="hawaiian" class="origin-checkbox" />
        <span class="chip-content">🌺 Hawaiian</span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Name Preferences</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="starts-with">Starts With</label>
        <input 
          type="text" 
          id="starts-with" 
          class="form-input"
          placeholder="e.g., A, Ch, Ma"
          maxlength="3"
        />
        <small class="form-help">Letter(s) the name should start with</small>
      </div>
      <div class="form-group">
        <label for="ends-with">Ends With</label>
        <input 
          type="text" 
          id="ends-with" 
          class="form-input"
          placeholder="e.g., a, n, ie"
          maxlength="3"
        />
        <small class="form-help">Letter(s) the name should end with</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="min-length">Minimum Length</label>
        <select id="min-length" class="form-select">
          <option value="0">Any</option>
          <option value="2">2 letters</option>
          <option value="3">3 letters</option>
          <option value="4">4 letters</option>
          <option value="5">5 letters</option>
          <option value="6">6 letters</option>
          <option value="7">7 letters</option>
        </select>
      </div>
      <div class="form-group">
        <label for="max-length">Maximum Length</label>
        <select id="max-length" class="form-select">
          <option value="0">Any</option>
          <option value="4">4 letters</option>
          <option value="5">5 letters</option>
          <option value="6">6 letters</option>
          <option value="7">7 letters</option>
          <option value="8">8 letters</option>
          <option value="10">10 letters</option>
          <option value="12">12 letters</option>
        </select>
      </div>
      <div class="form-group">
        <label for="syllables">Syllables</label>
        <select id="syllables" class="form-select">
          <option value="0">Any</option>
          <option value="1">1 syllable</option>
          <option value="2">2 syllables</option>
          <option value="3">3 syllables</option>
          <option value="4">4+ syllables</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Popularity & Style</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="popularity">Popularity Level</label>
        <select id="popularity" class="form-select">
          <option value="any">Any Popularity</option>
          <option value="top100">Top 100 (Very Popular)</option>
          <option value="top500">Top 500 (Popular)</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare & Unique</option>
        </select>
      </div>
      <div class="form-group">
        <label for="style">Name Style</label>
        <select id="style" class="form-select">
          <option value="any">Any Style</option>
          <option value="classic">Classic & Timeless</option>
          <option value="modern">Modern & Trendy</option>
          <option value="vintage">Vintage & Old-Fashioned</option>
          <option value="nature">Nature-Inspired</option>
          <option value="royal">Royal & Elegant</option>
          <option value="strong">Strong & Powerful</option>
          <option value="gentle">Gentle & Soft</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Generation Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="count">Number of Names to Generate</label>
        <div class="count-control">
          <button type="button" class="count-btn minus" id="count-minus">−</button>
          <input 
            type="number" 
            id="count" 
            class="form-input count-input"
            value="10"
            min="1"
            max="50"
          />
          <button type="button" class="count-btn plus" id="count-plus">+</button>
        </div>
        <small class="form-help">Generate 1 to 50 names at once</small>
      </div>
      <div class="form-group">
        <label for="sort-by">Sort Results By</label>
        <select id="sort-by" class="form-select">
          <option value="random">Random Order</option>
          <option value="alpha">Alphabetical</option>
          <option value="popularity">Popularity</option>
          <option value="length">Name Length</option>
          <option value="flow">Flow Score</option>
        </select>
      </div>
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
        <h4>Name Matching</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="alliteration" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Alliteration</strong>
              <small>First and last name start with same letter</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="avoid-rhyme" checked />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Avoid Rhyming</strong>
              <small>Avoid names that rhyme with last name</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="unique-initials" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Unique Initials</strong>
              <small>First and middle initials should differ</small>
            </span>
          </label>
        </div>
      </div>
      <div class="option-group">
        <h4>Sibling Names</h4>
        <div class="form-group">
          <label for="sibling-names">Existing Sibling Names</label>
          <input 
            type="text" 
            id="sibling-names" 
            class="form-input"
            placeholder="e.g., Emma, Liam, Olivia"
          />
          <small class="form-help">Comma-separated. We'll suggest names that match in style.</small>
        </div>
      </div>
      <div class="option-group">
        <h4>Exclude Names</h4>
        <div class="form-group">
          <label for="exclude-names">Names to Exclude</label>
          <input 
            type="text" 
            id="exclude-names" 
            class="form-input"
            placeholder="e.g., John, Mary, Michael"
          />
          <small class="form-help">Comma-separated list of names to exclude from results.</small>
        </div>
      </div>
      <div class="option-group">
        <h4>Display Options</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="show-meanings" checked />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Show Meanings</strong>
              <small>Display name meanings and origins</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="show-stats" checked />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Show Statistics</strong>
              <small>Display analytics about generated names</small>
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      👶 Generate Names →
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

<div id="baby-name-result" class="calculator-result hidden">
  <!-- Results will be inserted here by JavaScript -->
</div>

<div class="info-box">
  <h4>👶 Choosing the Perfect Baby Name</h4>
  <p>
    Selecting a name for your baby is one of the most important decisions you'll make as a parent. 
    Consider how the name sounds with your last name, what nicknames might arise, and the name's 
    meaning and cultural significance. Our generator helps you explore thousands of options with 
    personalized filtering.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>💡 Tips for Name Selection</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Say it out loud:</strong> Test how first, middle, and last names sound together</li>
    <li><strong>Check initials:</strong> Make sure initials don't spell something unintended</li>
    <li><strong>Consider nicknames:</strong> Think about what nicknames might develop</li>
    <li><strong>Look up meanings:</strong> Many names carry beautiful or significant meanings</li>
    <li><strong>Think long-term:</strong> Choose a name that ages well from baby to adult</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🌍 Name Origins Matter</h4>
  <p>
    Names from different cultures carry unique histories and meanings. Hebrew names often have 
    biblical significance, Greek names frequently relate to virtues or nature, while Celtic names 
    might connect to mythology. Exploring origins can help you find a name with personal or 
    cultural significance to your family.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Favorites</h4>
  <p>
    Your preferences are automatically saved in the URL. You can <strong>bookmark this page</strong> 
    to save your search criteria, or use the <strong>Share button</strong> to send your settings to 
    your partner or family members. Save your favorite names to compare them later!
  </p>
</div>

<style>
  /* Baby Name Generator Specific Styles */
  
  .section-desc {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
  
  /* Generate Options Pills */
  .generate-options {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-gray);
    flex-wrap: wrap;
  }
  
  .generate-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  .pill-option {
    cursor: pointer;
  }
  
  .pill-option input {
    display: none;
  }
  
  .pill-content {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all var(--transition-fast);
  }
  
  .pill-option input:checked + .pill-content {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
    color: white;
  }
  
  .pill-option:hover .pill-content {
    border-color: var(--color-accent-orange);
  }
  
  /* Gender Cards */
  .gender-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  
  .gender-card {
    cursor: pointer;
  }
  
  .gender-card input {
    display: none;
  }
  
  .gender-content {
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
  
  .gender-card input:checked + .gender-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .gender-card:hover .gender-content {
    border-color: var(--color-light-blue);
  }
  
  .gender-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .gender-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  /* Origins Grid */
  .origins-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .origin-chip {
    cursor: pointer;
  }
  
  .origin-chip input {
    display: none;
  }
  
  .chip-content {
    display: inline-block;
    padding: 0.5rem 0.75rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: 50px;
    font-size: 0.85rem;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }
  
  .origin-chip input:checked + .chip-content {
    background: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: white;
  }
  
  .origin-chip:hover .chip-content {
    border-color: var(--color-primary-blue);
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
  
  .count-input {
    border-radius: 0;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
    width: 80px;
    -moz-appearance: textfield;
  }
  
  .count-input::-webkit-outer-spin-button,
  .count-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Advanced Options */
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
  
  /* Results Styles */
  .result-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .result-header h3 {
    margin-bottom: 0.5rem;
  }
  
  .result-subtitle {
    color: var(--color-gray-dark);
    font-size: 0.95rem;
  }
  
  /* Name Cards */
  .names-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .name-card {
    background: white;
    border-radius: var(--border-radius-lg);
    padding: 1.25rem;
    border: 2px solid var(--color-gray);
    transition: all var(--transition-fast);
    position: relative;
    cursor: pointer;
  }
  
  .name-card:hover {
    border-color: var(--color-accent-orange);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .name-card.favorited {
    border-color: var(--color-warning);
    background: linear-gradient(135deg, #FFFBEB 0%, white 100%);
  }
  
  .name-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }
  
  .name-display {
    flex: 1;
  }
  
  .full-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    margin-bottom: 0.25rem;
  }
  
  .full-name .generated {
    color: var(--color-accent-orange);
  }
  
  .name-origin {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }
  
  .favorite-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: transform var(--transition-fast);
    opacity: 0.4;
  }
  
  .favorite-btn:hover {
    transform: scale(1.2);
    opacity: 1;
  }
  
  .name-card.favorited .favorite-btn {
    opacity: 1;
  }
  
  .name-meaning {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.75rem;
    font-style: italic;
  }
  
  .name-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .meta-badge {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: var(--color-gray-light);
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  .meta-badge.flow-score {
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
  }
  
  .meta-badge.flow-excellent {
    background: #D1FAE5;
    color: #065F46;
  }
  
  .meta-badge.flow-good {
    background: #DBEAFE;
    color: #1E40AF;
  }
  
  .meta-badge.flow-fair {
    background: #FEF3C7;
    color: #92400E;
  }
  
  /* Stats Section */
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
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
    font-family: var(--font-primary);
  }
  
  .stat-label {
    font-size: 0.7rem;
    color: var(--color-gray-dark);
    font-weight: 600;
    margin-top: 0.25rem;
    text-transform: uppercase;
  }
  
  /* Origin Distribution Chart */
  .origin-chart-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .origin-chart-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .origin-bars {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .origin-bar-row {
    display: grid;
    grid-template-columns: 100px 1fr 50px;
    align-items: center;
    gap: 0.75rem;
  }
  
  .origin-bar-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-gray-dark);
    text-align: right;
  }
  
  .origin-bar-track {
    height: 24px;
    background: var(--color-gray-light);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .origin-bar-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 0.5s ease;
  }
  
  .origin-bar-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  /* Letter Distribution */
  .letter-chart-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .letter-chart-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .letter-bubbles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .letter-bubble {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
    position: relative;
  }
  
  .letter-bubble .count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--color-primary-blue);
    color: white;
    font-size: 0.6rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Favorites Section */
  .favorites-section {
    background: linear-gradient(135deg, #FFFBEB 0%, white 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 2px solid var(--color-warning);
  }
  
  .favorites-section h4 {
    color: var(--color-gray-dark);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .favorites-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .favorite-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid var(--color-warning);
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .favorite-tag button {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--transition-fast);
  }
  
  .favorite-tag button:hover {
    opacity: 1;
  }
  
  /* Action Buttons */
  .result-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
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
  
  .regenerate-btn {
    background: var(--color-primary-blue);
    color: white;
  }
  
  .regenerate-btn:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
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
  
  /* Initials Preview */
  .initials-preview {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .initials-preview h4 {
    color: #94A3B8;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }
  
  .initials-display {
    font-size: 3rem;
    font-weight: 800;
    color: #00ff88;
    font-family: var(--font-mono);
    letter-spacing: 0.5rem;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  
  .initials-warning {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background: rgba(239, 68, 68, 0.2);
    border-radius: var(--border-radius);
    color: #FCA5A5;
    font-size: 0.8rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .gender-options {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .names-grid {
      grid-template-columns: 1fr;
    }
    
    .origin-bar-row {
      grid-template-columns: 80px 1fr 40px;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .letter-bubble {
      width: 35px;
      height: 35px;
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .generate-options {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .gender-options {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .full-name {
      font-size: 1.1rem;
    }
    
    .result-actions {
      flex-direction: column;
    }
    
    .action-btn {
      width: 100%;
      justify-content: center;
    }
    
    .initials-display {
      font-size: 2rem;
    }
  }
</style>

<script src="/scripts/calculators/baby-name-generator.js"></script>
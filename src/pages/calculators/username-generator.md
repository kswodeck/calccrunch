---
layout: ../../layouts/CalculatorLayout.astro
calcType: username
---

## How to Use This Generator

1. **Enter a base word** (optional) - a name or word to build usernames from
2. **Choose a style** - cool, funny, professional, aesthetic, gamer, edgy, or cute
3. **Set platform** - pick a preset for character limits (Instagram, Twitter, etc.)
4. **Configure options** - numbers, special characters, max length
5. Click **Generate Usernames** to get creative suggestions
6. **Copy** any username with one click or **save favorites**

<div class="calculator-form" id="username-generator-form">
  <div class="form-section">
    <h3>Username Preferences</h3>
    <p class="section-desc">Customize how your usernames are generated.</p>
    <div class="form-row">
      <div class="form-group" style="flex: 2;">
        <label for="base-word">Base Word (optional)</label>
        <input 
          type="text" 
          id="base-word" 
          class="form-input"
          placeholder="e.g., shadow, alex, pixel"
          maxlength="30"
        />
        <small class="form-help">Leave blank for fully random usernames</small>
      </div>
      <div class="form-group">
        <label for="style">Style</label>
        <select id="style" class="form-select">
          <option value="cool">Cool</option>
          <option value="funny">Funny</option>
          <option value="professional">Professional</option>
          <option value="aesthetic">Aesthetic</option>
          <option value="gamer">Gamer</option>
          <option value="edgy">Dark / Edgy</option>
          <option value="cute">Cute</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Platform & Length</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="platform">Platform Preset</label>
        <select id="platform" class="form-select">
          <option value="any">Any Platform</option>
          <option value="instagram">Instagram (30 chars)</option>
          <option value="twitter">Twitter/X (15 chars)</option>
          <option value="tiktok">TikTok (24 chars)</option>
          <option value="gaming">Gaming (16 chars)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="max-length">Max Length</label>
        <input 
          type="number" 
          id="max-length" 
          class="form-input"
          value="20"
          min="4"
          max="30"
        />
        <small class="form-help">Maximum characters allowed</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Options</h3>
    <div class="options-grid">
      <label class="option-toggle">
        <input type="checkbox" id="include-numbers" checked />
        <span class="toggle-label">Include Numbers</span>
      </label>
      <label class="option-toggle">
        <input type="checkbox" id="include-specials" />
        <span class="toggle-label">Include Underscores/Periods</span>
      </label>
    </div>
    <div class="form-row" style="margin-top: 1rem;">
      <div class="form-group">
        <label for="number-position">Number Position</label>
        <select id="number-position" class="form-select">
          <option value="end">At End</option>
          <option value="middle">In Middle</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div class="form-group">
        <label for="count">Number of Suggestions</label>
        <select id="count" class="form-select">
          <option value="10">10 usernames</option>
          <option value="20">20 usernames</option>
          <option value="30">30 usernames</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate Usernames
    </button>
  </div>

  <div class="secondary-actions">
    <button type="button" id="share-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      Share Settings
    </button>
    <button type="button" id="reset-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      Reset
    </button>
  </div>
</div>

<div id="username-generator-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>Creating the Perfect Username</h4>
  <p>
    A great username is memorable, easy to type, and reflects your personality. Our generator 
    combines adjectives, nouns, and modifiers based on your chosen style to create unique 
    usernames that stand out on any platform.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Username Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Consistency:</strong> Use the same username across platforms for brand recognition</li>
    <li><strong>Avoid numbers that look like letters:</strong> They can be confusing (0 vs O, 1 vs l)</li>
    <li><strong>Keep it pronounceable:</strong> Makes it easier for others to remember and share</li>
    <li><strong>Check availability:</strong> Search your desired username across multiple platforms</li>
    <li><strong>Think long-term:</strong> Avoid references that may become dated quickly</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Platform Character Limits</h4>
  <p>
    Each platform has different rules: Instagram allows up to 30 characters with letters, numbers, 
    periods, and underscores. Twitter/X limits you to 15 characters. TikTok allows 24 characters. 
    Gaming platforms typically allow 16 characters with some special characters.
  </p>
</div>

<style>
  .section-desc {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

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

  .options-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .option-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .option-toggle input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .toggle-label {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-gray-dark);
  }

  /* Results */
  .results-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .results-header h3 {
    margin-bottom: 0.5rem;
    color: var(--color-primary-blue);
  }

  .results-subtitle {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }

  .usernames-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .username-card {
    background: var(--color-white);
    border-radius: var(--border-radius);
    padding: 1rem 1.25rem;
    border: 2px solid var(--color-gray);
    transition: all var(--transition-fast);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .username-card:hover {
    border-color: var(--color-accent-orange);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .username-card.favorited {
    border-color: var(--color-warning);
    background: linear-gradient(135deg, #FFFBEB 0%, white 100%);
  }

  .username-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .username-text {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    font-family: var(--font-mono);
  }

  .username-meta {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }

  .username-actions {
    display: flex;
    gap: 0.25rem;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 1rem;
    opacity: 0.5;
    transition: all var(--transition-fast);
  }

  .icon-btn:hover {
    opacity: 1;
    background: var(--color-gray-light);
  }

  .icon-btn.active {
    opacity: 1;
  }

  .icon-btn.copied {
    opacity: 1;
    color: var(--color-success);
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
    background: var(--color-white);
    border: 2px solid var(--color-warning);
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.85rem;
    font-family: var(--font-mono);
  }

  .favorite-tag button {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    font-size: 1rem;
  }

  .favorite-tag button:hover {
    opacity: 1;
  }

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

  @media (max-width: 768px) {
    .usernames-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script src="/scripts/calculators/username-generator.js"></script>

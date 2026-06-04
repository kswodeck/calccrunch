---
layout: ../../layouts/CalculatorLayout.astro
calcType: business-name
---

## How to Use This Generator

1. **Enter keywords** - describe your business idea with comma-separated words
2. **Select your industry** - choose the niche that fits your business
3. **Pick a naming style** - modern, classic, playful, professional, or abstract
4. **Set length preference** - short punchy names or longer descriptive ones
5. **Add exclusions** - words you don't want in the name (optional)
6. Click **Generate Names** to discover your perfect business name
7. **Save favorites** and **copy** names you love

<div class="calculator-form" id="business-name-form">
  <div class="form-section">
    <h3>Business Details</h3>
    <p class="section-desc">Tell us about your business idea and we'll generate creative names.</p>
    <div class="form-row">
      <div class="form-group" style="flex: 2;">
        <label for="keywords">Keywords</label>
        <input 
          type="text" 
          id="keywords" 
          class="form-input"
          placeholder="e.g., cloud, speed, creative, green"
          maxlength="200"
        />
        <small class="form-help">Comma-separated words that describe your business</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="industry">Industry / Niche</label>
        <select id="industry" class="form-select">
          <option value="any">Any Industry</option>
          <option value="tech">Technology</option>
          <option value="food">Food & Beverage</option>
          <option value="fashion">Fashion & Beauty</option>
          <option value="health">Health & Wellness</option>
          <option value="finance">Finance & Fintech</option>
          <option value="creative">Creative & Design</option>
          <option value="education">Education</option>
          <option value="retail">Retail & E-commerce</option>
          <option value="services">Professional Services</option>
        </select>
      </div>
      <div class="form-group">
        <label for="style">Naming Style</label>
        <select id="style" class="form-select">
          <option value="any">Any Style</option>
          <option value="modern">Modern & Trendy</option>
          <option value="classic">Classic & Traditional</option>
          <option value="playful">Playful & Fun</option>
          <option value="professional">Professional & Corporate</option>
          <option value="abstract">Abstract & Unique</option>
          <option value="compound">Compound Words</option>
          <option value="acronym">Acronym / Initials</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Name Preferences</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="name-length">Name Length</label>
        <select id="name-length" class="form-select">
          <option value="any">Any Length</option>
          <option value="short">Short (1-2 words)</option>
          <option value="medium">Medium (2-3 words)</option>
          <option value="long">Long (3+ words)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="count">Number of Suggestions</label>
        <select id="count" class="form-select">
          <option value="10">10 names</option>
          <option value="20">20 names</option>
          <option value="30">30 names</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="include-words">Include Words (optional)</label>
        <input 
          type="text" 
          id="include-words" 
          class="form-input"
          placeholder="e.g., tech, lab"
          maxlength="100"
        />
        <small class="form-help">Words to try to include in generated names</small>
      </div>
      <div class="form-group">
        <label for="exclude-words">Exclude Words (optional)</label>
        <input 
          type="text" 
          id="exclude-words" 
          class="form-input"
          placeholder="e.g., corp, global"
          maxlength="100"
        />
        <small class="form-help">Words to avoid in generated names</small>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate Business Names
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

<div id="business-name-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>How We Generate Business Names</h4>
  <p>
    Our algorithm combines your keywords with industry-specific prefixes, suffixes, and power words 
    to create unique, memorable business names. Each suggestion includes a potential .com domain 
    format so you can quickly check availability.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Tips for Choosing a Business Name</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Keep it simple:</strong> Easy to spell, pronounce, and remember</li>
    <li><strong>Think about branding:</strong> Will it look good on a logo?</li>
    <li><strong>Check availability:</strong> Domain name and social media handles</li>
    <li><strong>Avoid trends:</strong> Choose something that will age well</li>
    <li><strong>Get feedback:</strong> Ask friends and potential customers what they think</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Domain & Trademark Considerations</h4>
  <p>
    Before committing to a business name, search the USPTO trademark database and check domain 
    registrars for availability. Consider alternate TLDs (.io, .co, .app) if .com is taken. 
    Also check that no similar names exist in your industry to avoid confusion.
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

  /* Results Styles */
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

  .names-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .name-card {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: 1.25rem;
    border: 2px solid var(--color-gray);
    transition: all var(--transition-fast);
    position: relative;
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
    margin-bottom: 0.5rem;
  }

  .business-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-primary-blue);
  }

  .name-card-actions {
    display: flex;
    gap: 0.25rem;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 1.1rem;
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

  .name-domain {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.5rem;
    font-family: var(--font-mono);
    opacity: 0.7;
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

  .meta-badge.style-tag {
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
  }

  .meta-badge.industry-tag {
    background: var(--color-highlight-green);
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
    font-size: 0.9rem;
  }

  .favorite-tag button {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--transition-fast);
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
    .names-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script src="/scripts/calculators/business-name-generator.js"></script>

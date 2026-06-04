---
layout: ../../layouts/CalculatorLayout.astro
calcType: pet-name
---

## How to Use This Generator

1. **Select pet type** - dog, cat, bird, fish, hamster, rabbit, reptile, or horse
2. **Choose gender** - male, female, or either
3. **Pick a personality** - playful, regal, fierce, cute, lazy, smart, or adventurous
4. **Select a theme** - food names, human names, nature, mythology, pop culture, and more
5. **Set preferences** - name length, starting letter filter
6. Click **Generate Names** to discover the perfect name for your pet
7. **Save favorites** to compare your top picks

<div class="calculator-form" id="pet-name-form">
  <div class="form-section">
    <h3>Pet Type</h3>
    <div class="pet-type-grid">
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="dog" checked />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F436;</span>
          <span class="pet-label">Dog</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="cat" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F431;</span>
          <span class="pet-label">Cat</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="bird" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F426;</span>
          <span class="pet-label">Bird</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="fish" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F41F;</span>
          <span class="pet-label">Fish</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="hamster" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F439;</span>
          <span class="pet-label">Hamster</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="rabbit" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F430;</span>
          <span class="pet-label">Rabbit</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="reptile" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F98E;</span>
          <span class="pet-label">Reptile</span>
        </span>
      </label>
      <label class="pet-type-card">
        <input type="radio" name="pet-type" value="horse" />
        <span class="pet-type-content">
          <span class="pet-icon">&#x1F434;</span>
          <span class="pet-label">Horse</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Gender & Personality</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" class="form-select">
          <option value="either">Either</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="personality">Personality</label>
        <select id="personality" class="form-select">
          <option value="any">Any Personality</option>
          <option value="playful">Playful & Energetic</option>
          <option value="regal">Regal & Dignified</option>
          <option value="fierce">Fierce & Strong</option>
          <option value="cute">Cute & Sweet</option>
          <option value="lazy">Lazy & Chill</option>
          <option value="smart">Smart & Clever</option>
          <option value="adventurous">Adventurous & Bold</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Name Theme & Preferences</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="theme">Theme</label>
        <select id="theme" class="form-select">
          <option value="any">Any Theme</option>
          <option value="food">Food Names</option>
          <option value="human">Human Names</option>
          <option value="nature">Nature</option>
          <option value="mythology">Mythology</option>
          <option value="popculture">Pop Culture</option>
          <option value="colors">Colors</option>
          <option value="classic">Classic Pet Names</option>
        </select>
      </div>
      <div class="form-group">
        <label for="name-length">Name Length</label>
        <select id="name-length" class="form-select">
          <option value="any">Any Length</option>
          <option value="short">Short (1 syllable)</option>
          <option value="medium">Medium (2 syllables)</option>
          <option value="long">Long (3+ syllables)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="starts-with">Starting Letter (optional)</label>
        <input 
          type="text" 
          id="starts-with" 
          class="form-input"
          placeholder="e.g., B, M, S"
          maxlength="1"
        />
        <small class="form-help">Filter names by first letter</small>
      </div>
      <div class="form-group">
        <label for="count">Number of Suggestions</label>
        <select id="count" class="form-select">
          <option value="10">10 names</option>
          <option value="20">20 names</option>
          <option value="50">50 names</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate Pet Names
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

<div id="pet-name-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>Naming Your New Pet</h4>
  <p>
    The best pet names are short, distinct, and easy to call out. Dogs respond best to 
    one or two syllable names with hard consonants. Cats prefer names ending in an "ee" sound.
    Our generator takes your pet's species, personality, and your style preferences into 
    account to suggest the perfect name.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Tips for Choosing a Pet Name</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Test it out loud:</strong> Call the name across a room - does it feel natural?</li>
    <li><strong>Avoid command confusion:</strong> Don't pick names that sound like "sit," "stay," or "no"</li>
    <li><strong>Consider nicknames:</strong> Long names often get shortened naturally</li>
    <li><strong>Match personality:</strong> Wait a day or two to see your pet's true character</li>
    <li><strong>Keep it positive:</strong> Choose names with happy associations</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Popular Naming Trends</h4>
  <p>
    Human names for pets are more popular than ever! Food-inspired names (Biscuit, Mochi, Pepper) 
    are trending, along with nature names (Willow, Storm, Sage) and pop culture references. 
    Classic names like Max, Buddy, Luna, and Bella remain perennial favorites.
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

  /* Pet Type Grid */
  .pet-type-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .pet-type-card {
    cursor: pointer;
  }

  .pet-type-card input {
    display: none;
  }

  .pet-type-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.5rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    text-align: center;
  }

  .pet-type-card input:checked + .pet-type-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, var(--color-highlight-orange-alt) 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  .pet-type-card:hover .pet-type-content {
    border-color: var(--color-light-blue);
  }

  .pet-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .pet-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.85rem;
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

  .names-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
    background: linear-gradient(135deg, var(--color-highlight-yellow) 0%, var(--color-white) 100%);
  }

  .name-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .pet-name-display {
    font-size: 1.4rem;
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

  .name-meaning {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .name-perfect-for {
    font-size: 0.8rem;
    color: var(--color-accent-orange);
    font-weight: 600;
    margin-bottom: 0.5rem;
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

  .meta-badge.personality-tag {
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
  }

  .meta-badge.theme-tag {
    background: var(--color-highlight-green);
    color: var(--color-success);
  }

  /* Favorites Section */
  .favorites-section {
    background: linear-gradient(135deg, var(--color-highlight-yellow) 0%, var(--color-white) 100%);
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
    color: var(--color-gray-dark);
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
    .pet-type-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .names-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .pet-type-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<script src="/scripts/calculators/pet-name-generator.js"></script>

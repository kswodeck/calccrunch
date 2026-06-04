---
layout: ../../layouts/CalculatorLayout.astro
calcType: fantasy-name
---

## How to Use This Generator

1. **Select a race or genre** - Elven, Dwarven, Orcish, Dragon, Sci-Fi, and more
2. **Choose gender** - male, female, or neutral
3. **Pick name parts** - first name only, surname only, or full name
4. **Set complexity** - simple, moderate, or complex syllable structures
5. **Choose quantity** - generate 10, 20, or 30 names at once
6. Click **Generate Names** to create unique fantasy names
7. **Save favorites** and **copy** names for your stories, games, or characters

<div class="calculator-form" id="fantasy-name-form">
  <div class="form-section">
    <h3>Race / Genre</h3>
    <p class="section-desc">Choose a fantasy race or genre to generate names in that style.</p>
    <div class="race-grid">
      <label class="race-card">
        <input type="radio" name="race" value="elven" checked />
        <span class="race-content">
          <span class="race-icon">&#x1F9DD;</span>
          <span class="race-label">Elven</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="dwarven" />
        <span class="race-content">
          <span class="race-icon">&#x26CF;</span>
          <span class="race-label">Dwarven</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="orcish" />
        <span class="race-content">
          <span class="race-icon">&#x1F479;</span>
          <span class="race-label">Orcish</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="human" />
        <span class="race-content">
          <span class="race-icon">&#x2694;</span>
          <span class="race-label">Medieval</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="dragon" />
        <span class="race-content">
          <span class="race-icon">&#x1F409;</span>
          <span class="race-label">Dragon</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="fairy" />
        <span class="race-content">
          <span class="race-icon">&#x1F9DA;</span>
          <span class="race-label">Fairy</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="demon" />
        <span class="race-content">
          <span class="race-icon">&#x1F608;</span>
          <span class="race-label">Demon</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="scifi" />
        <span class="race-content">
          <span class="race-icon">&#x1F680;</span>
          <span class="race-label">Sci-Fi</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="steampunk" />
        <span class="race-content">
          <span class="race-icon">&#x2699;</span>
          <span class="race-label">Steampunk</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="pirate" />
        <span class="race-content">
          <span class="race-icon">&#x1F3F4;</span>
          <span class="race-label">Pirate</span>
        </span>
      </label>
      <label class="race-card">
        <input type="radio" name="race" value="viking" />
        <span class="race-content">
          <span class="race-icon">&#x1FA93;</span>
          <span class="race-label">Viking</span>
        </span>
      </label>
    </div>
  </div>

  <div class="form-section">
    <h3>Name Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" class="form-select">
          <option value="neutral">Neutral</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="name-parts">Name Parts</label>
        <select id="name-parts" class="form-select">
          <option value="full">Full Name</option>
          <option value="first">First Name Only</option>
          <option value="surname">Surname Only</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="complexity">Complexity</label>
        <select id="complexity" class="form-select">
          <option value="simple">Simple (2-3 syllables)</option>
          <option value="moderate" selected>Moderate (3-5 syllables)</option>
          <option value="complex">Complex (5+ syllables)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="count">Number of Names</label>
        <select id="count" class="form-select">
          <option value="10">10 names</option>
          <option value="20">20 names</option>
          <option value="30">30 names</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      Generate Fantasy Names
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

<div id="fantasy-name-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>How Fantasy Names Are Generated</h4>
  <p>
    Our generator uses race-specific phoneme tables to create authentic-sounding names. Elven names 
    use flowing syllables with soft consonants, while Dwarven names feature hard sounds and short 
    vowels. Each race has unique linguistic patterns that make the generated names feel genuine 
    to that fantasy world.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Using Fantasy Names</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Tabletop RPGs:</strong> Perfect for D&D, Pathfinder, and other TTRPG characters</li>
    <li><strong>Creative Writing:</strong> Use for novels, short stories, and worldbuilding</li>
    <li><strong>Video Games:</strong> Create unique character names for MMOs and RPGs</li>
    <li><strong>Worldbuilding:</strong> Generate consistent naming conventions for fictional cultures</li>
    <li><strong>Pronunciation:</strong> Each name includes a phonetic guide to help you say it right</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Linguistic Roots</h4>
  <p>
    Fantasy naming conventions are often inspired by real languages. Elven names draw from Welsh and 
    Finnish. Dwarven names echo Old Norse and Germanic roots. Orcish takes from Mongolian and 
    Turkic languages. Understanding these roots can help you create your own names that feel 
    consistent with a given race or culture.
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

  /* Race Grid */
  .race-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .race-card {
    cursor: pointer;
  }

  .race-card input {
    display: none;
  }

  .race-content {
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

  .race-card input:checked + .race-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  .race-card:hover .race-content {
    border-color: var(--color-light-blue);
  }

  .race-icon {
    font-size: 1.75rem;
    margin-bottom: 0.4rem;
  }

  .race-label {
    font-weight: 600;
    color: var(--color-gray-dark);
    font-size: 0.8rem;
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

  .fantasy-name-display {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    font-family: 'Georgia', serif;
    letter-spacing: 0.5px;
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

  .name-pronunciation {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    font-style: italic;
    margin-bottom: 0.5rem;
    opacity: 0.8;
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

  .meta-badge.race-tag {
    background: var(--color-lighter-blue);
    color: var(--color-primary-blue);
  }

  .meta-badge.gender-tag {
    background: #F3E8FF;
    color: #6B21A8;
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
    .race-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .names-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .race-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<script src="/scripts/calculators/fantasy-name-generator.js"></script>

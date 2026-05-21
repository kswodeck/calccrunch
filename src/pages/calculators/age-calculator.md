---
layout: ../../layouts/CalculatorLayout.astro
calcType: age
---

## How to Use This Calculator

1. Enter your **date of birth** using the date picker
2. Optionally change the **"as of" date** (defaults to today)
3. Click **Calculate** to see your exact age and fun facts
4. **Share or bookmark** your results - the URL automatically saves your inputs!

<div class="calculator-form" id="age-calculator-form">
  <div class="form-section">
    <h3>Your Birthday</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="birth-date">
          Date of Birth <span class="required">*</span>
        </label>
        <input 
          type="date" 
          id="birth-date" 
          class="form-input"
          required
        />
        <small class="form-help">Select your birthday</small>
      </div>
      <div class="form-group">
        <label for="as-of-date">
          Calculate Age As Of
        </label>
        <input 
          type="date" 
          id="as-of-date" 
          class="form-input"
        />
        <small class="form-help">Defaults to today if left blank</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Age →
  </button>

  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Calculation
    </button>
  </div>
</div>

<div id="age-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🎂 About Age Calculation</h4>
  <p>
    This calculator determines your exact age in years, months, and days. It accounts for 
    varying month lengths and leap years to give you a precise result. You can also calculate 
    age as of any past or future date.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>📅 Fun Facts About Birthdays</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>The average person's heart beats about <strong>100,000 times per day</strong></li>
    <li>You take approximately <strong>23,000 breaths per day</strong></li>
    <li>The most common birthday in the US is <strong>September 9th</strong></li>
    <li>About <strong>385,000 babies</strong> are born worldwide every day</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🌟 Generation Guide</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Gen Alpha:</strong> 2013 - present</li>
    <li><strong>Gen Z:</strong> 1997 - 2012</li>
    <li><strong>Millennials:</strong> 1981 - 1996</li>
    <li><strong>Gen X:</strong> 1965 - 1980</li>
    <li><strong>Baby Boomers:</strong> 1946 - 1964</li>
    <li><strong>Silent Generation:</strong> 1928 - 1945</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/age-calculator.js"></script>

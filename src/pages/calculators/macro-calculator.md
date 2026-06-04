---
layout: ../../layouts/CalculatorLayout.astro
calcType: macro
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **body stats** (weight, height, age, gender)
3. Choose your **activity level** and **goal**
4. Click **Calculate** to get your personalized macro targets
5. **Share or bookmark** your results - the URL saves your inputs!

<div class="calculator-form" id="macro-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lb, ft/in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg, cm)</button>
    </div>
  </div>

  <div class="form-section" id="imperial-inputs">
    <h3>Your Body Stats</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="weight-lbs">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-lbs" 
            class="form-input"
            placeholder="170"
            value="170"
            min="50"
            max="500"
            required
          />
          <span class="input-addon">lbs</span>
        </div>
      </div>
      <div class="form-group">
        <label for="height-feet">
          Height <span class="required">*</span>
        </label>
        <div class="height-input-group">
          <div class="input-group">
            <input 
              type="number" 
              id="height-feet" 
              class="form-input"
              placeholder="5"
              value="5"
              min="3"
              max="8"
              required
            />
            <span class="input-addon">ft</span>
          </div>
          <div class="input-group">
            <input 
              type="number" 
              id="height-inches" 
              class="form-input"
              placeholder="10"
              value="10"
              min="0"
              max="11"
            />
            <span class="input-addon">in</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="metric-inputs">
    <h3>Your Body Stats</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="weight-kg">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-kg" 
            class="form-input"
            placeholder="77"
            value="77"
            min="30"
            max="250"
            required
          />
          <span class="input-addon">kg</span>
        </div>
      </div>
      <div class="form-group">
        <label for="height-cm">
          Height <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="height-cm" 
            class="form-input"
            placeholder="178"
            value="178"
            min="100"
            max="250"
            required
          />
          <span class="input-addon">cm</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Personal Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="age">
          Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="age" 
            class="form-input"
            placeholder="30"
            value="30"
            min="15"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
      </div>
      <div class="form-group">
        <label for="gender">
          Gender <span class="required">*</span>
        </label>
        <select id="gender" class="form-select" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Activity & Goals</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="activity-level">
          Activity Level <span class="required">*</span>
        </label>
        <select id="activity-level" class="form-select" required>
          <option value="1.2">Sedentary (office job, little exercise)</option>
          <option value="1.375">Lightly Active (exercise 1-3 days/week)</option>
          <option value="1.55" selected>Moderately Active (exercise 3-5 days/week)</option>
          <option value="1.725">Very Active (exercise 6-7 days/week)</option>
          <option value="1.9">Extra Active (athlete, physical job + training)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="goal">
          Goal <span class="required">*</span>
        </label>
        <select id="goal" class="form-select" required>
          <option value="lose">Lose Fat</option>
          <option value="maintain" selected>Maintain Weight</option>
          <option value="gain">Build Muscle / Bulk</option>
        </select>
      </div>
      <div class="form-group">
        <label for="intensity">
          Goal Intensity
        </label>
        <select id="intensity" class="form-select">
          <option value="moderate" selected>Moderate</option>
          <option value="aggressive">Aggressive</option>
        </select>
        <small class="form-help">Moderate is recommended for sustainability</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="meals-per-day">
          Meals Per Day (Optional)
        </label>
        <select id="meals-per-day" class="form-select">
          <option value="0">Don't split into meals</option>
          <option value="3" selected>3 meals</option>
          <option value="4">4 meals</option>
          <option value="5">5 meals</option>
          <option value="6">6 meals</option>
        </select>
        <small class="form-help">Show per-meal macro targets</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Macros →
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

<div id="macro-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🍗 What Are Macronutrients?</h4>
  <p>
    <strong>Macronutrients</strong> (macros) are the three main nutrients your body needs in large amounts: 
    <strong>protein</strong>, <strong>carbohydrates</strong>, and <strong>fat</strong>. Each plays a vital role 
    in your health, energy, and body composition goals.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💪 Macro Roles</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Protein (4 cal/g):</strong> Builds and repairs muscle, supports immune function, keeps you full</li>
    <li><strong>Carbohydrates (4 cal/g):</strong> Primary energy source, fuels brain and muscles, supports exercise performance</li>
    <li><strong>Fat (9 cal/g):</strong> Hormone production, nutrient absorption, brain health, sustained energy</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🎯 Macro Split Guidelines</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Fat Loss:</strong> High protein (1-1.2g/lb), moderate fat (25%), remaining carbs</li>
    <li><strong>Maintenance:</strong> Balanced (0.8-1g/lb protein, 30% fat, rest carbs)</li>
    <li><strong>Muscle Gain:</strong> High protein (1-1.2g/lb), moderate fat (25-30%), high carbs</li>
    <li><strong>Keto/Low Carb:</strong> High fat (70%), moderate protein, very low carbs (5-10%)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/macro-calculator.js"></script>

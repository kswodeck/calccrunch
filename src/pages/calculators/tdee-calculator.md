---
layout: ../../layouts/CalculatorLayout.astro
calcType: tdee
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **body stats** (weight, height, age, gender)
3. Choose your **activity level**
4. Optionally enter your **body fat percentage** for a more accurate formula
5. Click **Calculate** to see your TDEE and calorie targets

<div class="calculator-form" id="tdee-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lb, ft/in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg, cm)</button>
    </div>
  </div>

  <div class="form-section" id="imperial-inputs">
    <h3>Your Measurements</h3>
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
    <h3>Your Measurements</h3>
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
      <div class="form-group">
        <label for="body-fat">
          Body Fat % (Optional)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="body-fat" 
            class="form-input"
            placeholder="20"
            min="3"
            max="60"
            step="0.5"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Enables the Katch-McArdle formula for better accuracy</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My TDEE →
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

<div id="tdee-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🔥 What is TDEE?</h4>
  <p>
    <strong>Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories your body burns 
    in a day. It includes your Basal Metabolic Rate (BMR) plus calories burned through activity, exercise, 
    and digesting food. Knowing your TDEE is the foundation of any nutrition plan.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 TDEE Components</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>BMR (60-70%):</strong> Calories burned just being alive (breathing, circulation, cell repair)</li>
    <li><strong>Activity (15-30%):</strong> Exercise and daily movement (NEAT)</li>
    <li><strong>TEF (10%):</strong> Thermic Effect of Food - energy used to digest meals</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚖️ Using TDEE for Goals</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Lose weight:</strong> Eat 300-500 calories below TDEE (moderate deficit)</li>
    <li><strong>Lose weight faster:</strong> Eat 500-1000 below TDEE (aggressive - not below BMR!)</li>
    <li><strong>Maintain weight:</strong> Eat at your TDEE</li>
    <li><strong>Gain muscle:</strong> Eat 200-500 calories above TDEE (lean bulk)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>🔬 Formulas Used</h4>
  <p><strong>Mifflin-St Jeor (default):</strong> Most accurate for most people</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</li>
    <li>Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</li>
  </ul>
  <p><strong>Katch-McArdle (when body fat % is provided):</strong> Better for lean/athletic individuals</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>BMR = 370 + (21.6 × lean body mass in kg)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/tdee-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: calorie
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **age**, **gender**, and **activity level**
3. Input your **height** and **weight**
4. Choose your **fitness goal** (lose, maintain, or gain weight)
5. Click **Calculate** to see your daily calorie needs
6. **Share or bookmark** your results - the URL automatically saves all your inputs!

<div class="calculator-form" id="calorie-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lb, ft, in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg, cm)</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Personal Information</h3>
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
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section" id="imperial-inputs">
    <h3>Your Measurements</h3>
    <div class="form-row">
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
              required
            />
            <span class="input-addon">in</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="weight-lbs">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-lbs" 
            class="form-input"
            placeholder="180"
            value="180"
            min="50"
            max="700"
            required
          />
          <span class="input-addon">lbs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="metric-inputs">
    <h3>Your Measurements</h3>
    <div class="form-row">
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
      <div class="form-group">
        <label for="weight-kg">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-kg" 
            class="form-input"
            placeholder="82"
            value="82"
            min="20"
            max="300"
            required
          />
          <span class="input-addon">kg</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Activity Level</h3>
    <div class="form-group">
      <label for="activity-level">
        Daily Activity Level <span class="required">*</span>
      </label>
      <select id="activity-level" class="form-select" required>
        <option value="">Select activity level</option>
        <option value="1.2">Sedentary (little or no exercise)</option>
        <option value="1.375">Lightly Active (exercise 1-3 days/week)</option>
        <option value="1.55" selected>Moderately Active (exercise 3-5 days/week)</option>
        <option value="1.725">Very Active (exercise 6-7 days/week)</option>
        <option value="1.9">Extremely Active (physical job or training twice/day)</option>
      </select>
      <small class="form-help">Consider your daily routine and exercise habits</small>
    </div>
  </div>

  <div class="form-section">
    <h3>Your Goal</h3>
    <div class="form-group">
      <label for="goal">
        Fitness Goal <span class="required">*</span>
      </label>
      <select id="goal" class="form-select" required>
        <option value="lose-aggressive">Lose Weight (Aggressive - 2 lbs/week)</option>
        <option value="lose-moderate" selected>Lose Weight (Moderate - 1 lb/week)</option>
        <option value="lose-conservative">Lose Weight (Conservative - 0.5 lbs/week)</option>
        <option value="maintain">Maintain Weight</option>
        <option value="gain-conservative">Gain Weight (Conservative - 0.5 lbs/week)</option>
        <option value="gain-moderate">Gain Weight (Moderate - 1 lb/week)</option>
      </select>
      <small class="form-help">Choose a sustainable goal for best results</small>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Calories →
  </button>
</div>

<div id="calorie-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🔥 Understanding TDEE</h4>
  <p>
    <strong>TDEE (Total Daily Energy Expenditure)</strong> is the total number of calories you burn each day, 
    including your Basal Metabolic Rate (BMR) and activity level. Knowing your TDEE helps you set accurate 
    calorie targets for your fitness goals.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 How It Works</h4>
  <p>
    We use the <strong>Mifflin-St Jeor equation</strong>, the most accurate formula for calculating BMR. 
    Your BMR is then multiplied by your activity level to get your TDEE. From there, we adjust calories 
    based on your goal (deficit for weight loss, surplus for weight gain).
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>💡 Pro Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Start conservative:</strong> It's easier to lower calories than to increase them</li>
    <li><strong>Track consistently:</strong> Monitor your weight weekly and adjust as needed</li>
    <li><strong>Focus on protein:</strong> Aim for 0.7-1g per pound of body weight</li>
    <li><strong>Be patient:</strong> Sustainable changes take time, typically 1-2 lbs per week</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/calorie-calculator.js"></script>
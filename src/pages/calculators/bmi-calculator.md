---
layout: ../../layouts/CalculatorLayout.astro
title: BMI Calculator
description: Calculate your Body Mass Index (BMI) and find your ideal weight range. Free, accurate, and easy to use with detailed health insights. Share and save your results with URL parameters.
category: health-fitness
tags: ['BMI', 'body mass index', 'weight', 'health', 'fitness']
featured: true
calcType: bmi
seoTitle: Free BMI Calculator - Body Mass Index & Ideal Weight | Save & Share Results
seoDescription: Calculate your BMI instantly with our free calculator. Get your ideal weight range and health insights. Save and share your calculations with automatic URL parameters.
estimatedTime: 1 minute
difficulty: Easy
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **height** (feet/inches or centimeters)
3. Enter your **weight** (pounds or kilograms)
4. Optionally enter your **age** and **gender** for more accurate insights
5. Click **Calculate** to see your BMI and health category
6. **Share or bookmark** your results - the URL automatically saves your inputs!

### 🔗 Save & Share Feature
Your input values are automatically saved in the URL as you type. This means you can:
- **Bookmark** your BMI calculation for future reference
- **Share** your calculation with healthcare providers or fitness coaches
- **Return** to your calculation anytime with all values preserved
- **Compare** different BMI scenarios by saving multiple URLs

<div class="calculator-form" id="bmi-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lb, ft, in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg, cm)</button>
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
              min="1"
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
            placeholder="170"
            value="170"
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
            placeholder="77"
            value="77"
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
    <h3>Additional Information (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="age">Age</label>
        <div class="input-group">
          <input 
            type="number" 
            id="age" 
            class="form-input"
            placeholder="30"
            value="30"
            min="2"
            max="120"
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">For more accurate health insights</small>
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" class="form-select">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <small class="form-help">For personalized recommendations</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My BMI →
  </button>
</div>

<div id="bmi-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💡 Understanding BMI</h4>
  <p>
    Body Mass Index (BMI) is a measure of body fat based on height and weight. 
    While BMI is a useful screening tool, it doesn't directly measure body fat and 
    may not be accurate for athletes, pregnant women, or elderly individuals.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>⚕️ BMI Categories</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Underweight:</strong> BMI less than 18.5</li>
    <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
    <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
    <li><strong>Obese:</strong> BMI 30 or greater</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>📊 BMI Limitations</h4>
  <p>
    BMI doesn't distinguish between muscle and fat mass. Athletes with high muscle mass 
    may have a high BMI but low body fat. For a complete health assessment, consult with 
    a healthcare professional who can consider additional factors like body composition, 
    lifestyle, and family history.
  </p>
</div>

<script src="/scripts/calculators/bmi-calculator.js"></script>
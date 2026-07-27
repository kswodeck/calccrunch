---
layout: ../../layouts/CalculatorLayout.astro
calcType: waterintake
title: Water Intake Calculator
description: Calculate how many ounces, cups, or liters of water you should drink daily based on your weight, exercise minutes, and climate.
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **body weight**
3. Enter how many **minutes you exercise** on a typical day (0 if none)
4. Select whether you're in a **hot or humid climate**
5. Click **Calculate** to see your recommended daily water intake in ounces, cups, and liters

<div class="calculator-form" id="water-intake-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lbs)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg)</button>
    </div>
  </div>

  <div class="form-section" id="imperial-inputs">
    <h3>Your Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="weight-lbs">
          Weight <span class="required">*</span>
          <span class="tooltip" title="Your current body weight">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="weight-lbs"
            class="form-input"
            placeholder="154"
            value="154"
            min="40"
            max="700"
            step="1"
            required
          />
          <span class="input-addon">lbs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="metric-inputs">
    <h3>Your Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="weight-kg">
          Weight <span class="required">*</span>
          <span class="tooltip" title="Your current body weight">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="weight-kg"
            class="form-input"
            placeholder="70"
            value="70"
            min="18"
            max="320"
            step="1"
            required
          />
          <span class="input-addon">kg</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Activity &amp; Climate</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="exercise-minutes">
          Daily Exercise
          <span class="tooltip" title="Minutes of moderate-to-vigorous exercise on a typical day">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="exercise-minutes"
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            max="300"
            step="5"
          />
          <span class="input-addon">min/day</span>
        </div>
        <small class="form-help">Sweat losses add roughly 12 ml of fluid needs per minute</small>
      </div>
      <div class="form-group">
        <label for="climate">Climate / Season</label>
        <select id="climate" class="form-select">
          <option value="normal" selected>Normal / mild</option>
          <option value="hot">Hot, humid, or high altitude</option>
        </select>
        <small class="form-help">Hot or humid conditions increase fluid loss through sweat</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Water Intake →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="water-intake-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>💧 How This Is Calculated</h4>
  <p>
    We use a common weight-based hydration formula: <strong>35 ml of water per kg of body weight</strong> as a
    baseline, then add roughly <strong>12 ml per minute of exercise</strong> to cover sweat losses, plus an
    extra <strong>500 ml</strong> if you selected a hot, humid, or high-altitude climate. This mirrors the
    approach used by dietitians and lands in the general range recommended by the U.S. National Academies of
    Sciences, Engineering, and Medicine (about 2.7 liters/day for women and 3.7 liters/day for men from all
    beverages and food combined, before activity or climate adjustments).
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🌡️ Signs You Need More Water</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Dark yellow urine</strong> instead of pale yellow</li>
    <li><strong>Infrequent urination</strong> (less than every 3-4 hours)</li>
    <li><strong>Headache, fatigue, or dizziness</strong> without another obvious cause</li>
    <li><strong>Dry mouth or unusual thirst</strong></li>
  </ul>
  <p style="margin-top: 10px;">
    Don't wait until you're thirsty — thirst is a delayed signal, and your body is often already mildly
    dehydrated by the time it kicks in.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ More Isn't Always Better</h4>
  <p>
    Drinking far beyond your needs (especially very large volumes in a short time) can cause a dangerous
    drop in blood sodium called hyponatremia. This tool provides a general estimate for healthy adults —
    people with kidney disease, heart failure, or a fluid restriction from a doctor should follow their
    clinician's guidance instead.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save &amp; Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your
    calculation, or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<style>
  .unit-toggle {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .unit-btn {
    padding: var(--space-md) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .unit-btn:hover {
    border-color: var(--color-light-blue);
    background: var(--color-highlight-blue);
  }

  .unit-btn.active {
    border-color: var(--color-light-blue);
    background: var(--color-light-blue);
    color: white;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/water-intake-calculator.js"></script>

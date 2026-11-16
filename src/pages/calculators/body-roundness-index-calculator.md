---
layout: ../../layouts/CalculatorLayout.astro
calcType: bodyroundnessindex
title: Body Roundness Index (BRI) Calculator
description: Calculate your Body Roundness Index (BRI) from height and waist circumference — a research-backed, waist-based alternative to BMI for estimating body shape and health risk.
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **height**
3. Enter your **waist circumference**, measured at the navel while standing relaxed
4. Click **Calculate** to see your BRI score and risk category
5. **Share or bookmark** your results — the URL automatically saves your inputs!

<div class="calculator-form" id="body-roundness-index-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (cm)</button>
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
        <label for="waist-in">
          Waist Circumference <span class="required">*</span>
          <span class="tooltip" title="Measure around your natural waist, at the level of your belly button, while standing relaxed (not flexed).">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="waist-in"
            class="form-input"
            placeholder="34"
            min="10"
            max="100"
            step="0.1"
            required
          />
          <span class="input-addon">in</span>
        </div>
        <small class="form-help">Measured at the navel</small>
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
        <label for="waist-cm">
          Waist Circumference <span class="required">*</span>
          <span class="tooltip" title="Measure around your natural waist, at the level of your belly button, while standing relaxed (not flexed).">?</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="waist-cm"
            class="form-input"
            placeholder="86"
            min="25"
            max="250"
            step="0.1"
            required
          />
          <span class="input-addon">cm</span>
        </div>
        <small class="form-help">Measured at the navel</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My BRI →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="body-roundness-index-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>💡 What Is the Body Roundness Index?</h4>
  <p>
    BRI is a geometry-based body shape measurement introduced by mathematician Diana Thomas in 2013.
    Instead of weight (like BMI), it models your body as an ellipse using just your <strong>height</strong>
    and <strong>waist circumference</strong>, which lets it estimate visceral (belly) fat and body shape more
    directly than weight-based measures.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 BRI Ranges (Based on a 2024 US Cohort Study)</h4>
  <p style="margin-bottom: 10px;">
    A 2024 <em>JAMA Network Open</em> study of US adults found a U-shaped relationship between BRI and mortality
    risk, with the lowest risk in the middle range and higher risk at both extremes:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Below 3.4:</strong> Low BRI — associated with somewhat higher mortality risk in the study, often reflects a lean body type</li>
    <li><strong>3.4 – 4.5:</strong> Below the reference range</li>
    <li><strong>4.5 – 5.5:</strong> Reference range — lowest mortality risk in the study population</li>
    <li><strong>5.5 – 6.9:</strong> Elevated — associated with higher mortality risk</li>
    <li><strong>6.9 and above:</strong> High — associated with up to 49% higher all-cause mortality risk in the study</li>
  </ul>
  <p style="margin-top: 10px; font-size: var(--text-sm);">
    These bands come from quintile cutoffs in one large cohort, not a universal clinical diagnostic standard —
    use BRI alongside other measures, not as a standalone diagnosis.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>⚖️ BRI vs. BMI</h4>
  <p>
    BMI can't tell the difference between muscle and fat, or where fat is stored. Because BRI incorporates waist
    circumference, it captures <strong>abdominal fat distribution</strong> — which several studies have linked more
    closely to cardiometabolic risk than total body weight alone. BRI can also catch "normal weight obesity": people
    with a healthy BMI but a high waist-to-height ratio. Most clinicians recommend using BRI, BMI, and waist
    circumference together rather than relying on any single number.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation,
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/body-roundness-index-calculator.js"></script>

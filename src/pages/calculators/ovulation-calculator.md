---
layout: ../../layouts/CalculatorLayout.astro
calcType: ovulation
title: Ovulation Calculator
description: Estimate your fertile window and most likely ovulation day using the calendar method, based on your last period and average cycle length.
---

## How to Use This Calculator

1. Enter the **first day of your last period**
2. Enter your **average cycle length** (default 28 days)
3. Optionally adjust your **luteal phase length** (default 14 days)
4. Click **Calculate Fertile Window** to see your estimated ovulation day, fertile window, and next predicted periods
5. **Share or bookmark** your results — the URL automatically saves your inputs!

<div class="calculator-form" id="ovulation-calculator-form">
  <div class="form-section">
    <h3>Cycle Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="lmp-date">First day of last period <span class="required">*</span></label>
        <div class="input-group">
          <input type="date" id="lmp-date" class="form-input" required />
        </div>
        <small class="form-help">The first day of your most recent period</small>
      </div>
      <div class="form-group">
        <label for="cycle-length">Average cycle length</label>
        <div class="input-group">
          <input type="number" id="cycle-length" class="form-input" placeholder="28" value="28" min="20" max="45" />
          <span class="input-addon">days</span>
        </div>
        <small class="form-help">Count from the first day of one period to the first day of the next (typical range 21-35)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="luteal-length">Luteal phase length</label>
        <div class="input-group">
          <input type="number" id="luteal-length" class="form-input" placeholder="14" value="14" min="10" max="17" />
          <span class="input-addon">days</span>
        </div>
        <small class="form-help">Days from ovulation to your next period — most people don't need to change this (default 14)</small>
      </div>
      <div class="form-group">
        <label for="cycles-ahead">Cycles to predict</label>
        <select id="cycles-ahead" class="form-select">
          <option value="3" selected>Next 3 cycles</option>
          <option value="6">Next 6 cycles</option>
          <option value="1">Next cycle only</option>
        </select>
        <small class="form-help">How many future fertile windows to show</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Fertile Window →
  </button>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
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

<div id="ovulation-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🥚 How This Calculator Works</h4>
  <p>
    This tool uses the <strong>calendar method</strong>: ovulation is estimated to occur <strong>14 days before your next period</strong> (the luteal phase), not 14 days after your last one. Your <strong>fertile window</strong> spans about 6 days — the 5 days leading up to ovulation plus ovulation day itself — because sperm can survive up to 5 days while the egg is viable for about 24 hours after release.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Important Limitations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>The calendar method is an <strong>estimate</strong>, most accurate for people with regular cycles</li>
    <li>Stress, illness, travel, and hormonal changes can shift ovulation earlier or later</li>
    <li>For higher accuracy, combine with <strong>ovulation predictor kits (OPKs)</strong>, basal body temperature tracking, or cervical mucus observation</li>
    <li>This tool is for general planning only and is not a form of contraception or a medical diagnostic device</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/ovulation-calculator.js"></script>

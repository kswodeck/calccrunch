---
layout: ../../layouts/CalculatorLayout.astro
calcType: hours
title: Hours Calculator
description: Calculate hours worked between a start and end time, minus breaks. A free time card calculator with decimal and HH:MM totals.
---

## How to Use This Calculator

1. **Enter your start and end time** (supports overnight shifts)
2. **Enter your break** in minutes (optional)
3. *(Optional)* Add an **hourly rate** to see your pay
4. See your hours worked in both **decimal** and **hours:minutes** format

<div class="calculator-form" id="hours-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="start-time">Start Time <span class="required">*</span></label>
        <div class="input-group">
          <input type="time" id="start-time" class="form-input" value="09:00" />
        </div>
      </div>
      <div class="form-group">
        <label for="end-time">End Time <span class="required">*</span></label>
        <div class="input-group">
          <input type="time" id="end-time" class="form-input" value="17:00" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="break-minutes">Break (minutes)</label>
        <div class="input-group">
          <input type="number" id="break-minutes" class="form-input" placeholder="30" value="30" min="0" step="1" />
          <span class="input-addon">min</span>
        </div>
      </div>
      <div class="form-group">
        <label for="hourly-rate">Hourly Rate (optional)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="hourly-rate" class="form-input" placeholder="0" value="0" min="0" step="any" />
          <span class="input-addon">/hr</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Reset</button>
  </div>
</div>

<div id="hours-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>⏱️ How to Calculate Hours Worked</h4>
  <p><strong>Hours worked = (End time − Start time) − break.</strong> From 9:00 AM to 5:00 PM with a 30-minute break: 8 hours − 0.5 = <strong>7.5 hours</strong>.</p>
  <p><strong>Decimal vs. hours:minutes.</strong> Payroll uses decimal hours, so 7 hours 30 minutes = 7.5. To convert minutes to decimal, divide by 60 (e.g. 15 min ÷ 60 = 0.25).</p>
  <p><strong>Overnight shifts</strong> are handled automatically — if the end time is earlier than the start time, the calculator counts past midnight.</p>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/hours-calculator.js"></script>

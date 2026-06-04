---
layout: ../../layouts/CalculatorLayout.astro
calcType: salarytohourly
title: Salary to Hourly Calculator
description: Convert an annual salary into an hourly wage. See your hourly, daily, weekly, and monthly pay based on your work hours.
---

## How to Use This Calculator

1. **Enter your annual salary** (gross, before taxes)
2. **Set your hours per week** (40 is full-time)
3. **Set your paid weeks per year** (52, or fewer if you take unpaid time off)
4. See your equivalent **hourly, daily, weekly, biweekly, and monthly pay** instantly

<div class="calculator-form" id="salary-to-hourly-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="annual-salary">Annual Salary <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="annual-salary" class="form-input" placeholder="60000" value="60000" min="0" step="any" />
        </div>
      </div>
      <div class="form-group">
        <label for="hours-per-week">Hours per Week</label>
        <div class="input-group">
          <input type="number" id="hours-per-week" class="form-input" placeholder="40" value="40" min="1" max="168" step="any" />
          <span class="input-addon">hrs</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="weeks-per-year">Weeks per Year</label>
        <div class="input-group">
          <input type="number" id="weeks-per-year" class="form-input" placeholder="52" value="52" min="1" max="52" step="any" />
          <span class="input-addon">weeks</span>
        </div>
        <small class="form-help">Use fewer than 52 if you take unpaid weeks off</small>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Reset</button>
  </div>
</div>

<div id="salary-to-hourly-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>💵 How to Convert Salary to Hourly</h4>
  <p><strong>Hourly rate = Annual salary ÷ (hours per week × weeks per year).</strong> For a $60,000 salary at 40 hours/week and 52 weeks: $60,000 ÷ 2,080 = <strong>$28.85/hour</strong>.</p>
  <p>A quick estimate: divide your salary by 2,000 to get a rough hourly rate. $60,000 ÷ 2,000 ≈ $30/hour — close, because full-time is about 2,080 hours a year.</p>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/salary-to-hourly-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: hourlytosalary
title: Hourly to Salary Calculator
description: Convert an hourly wage into an annual salary. See your weekly, monthly, and yearly income based on your hours.
---

## How to Use This Calculator

1. **Enter your hourly wage**
2. **Set your hours per week** (40 is full-time)
3. **Set your paid weeks per year** (52, or fewer if you take unpaid time off)
4. See your equivalent **annual salary** plus weekly, biweekly, and monthly pay

<div class="calculator-form" id="hourly-to-salary-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="hourly-rate">Hourly Wage <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="hourly-rate" class="form-input" placeholder="25" value="25" min="0" step="any" />
          <span class="input-addon">/hr</span>
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

<div id="hourly-to-salary-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>💵 How to Convert Hourly to Salary</h4>
  <p><strong>Annual salary = Hourly rate × hours per week × weeks per year.</strong> At $25/hour, 40 hours/week, 52 weeks: $25 × 40 × 52 = <strong>$52,000/year</strong>.</p>
  <p>Quick estimate: double your hourly rate and add three zeros. $25/hour → about $50,000/year. It works because full-time is roughly 2,000 hours a year.</p>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/hourly-to-salary-calculator.js"></script>

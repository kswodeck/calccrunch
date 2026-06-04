---
layout: ../../layouts/CalculatorLayout.astro
calcType: overtime
title: Overtime Calculator
description: Calculate overtime pay and total earnings from regular hours, overtime hours, and your hourly rate and multiplier.
---

## How to Use This Calculator

1. **Enter your hourly rate**
2. **Enter your regular hours** (typically up to 40 per week)
3. **Enter your overtime hours**
4. **Set the overtime multiplier** (1.5 for "time and a half", 2 for "double time")
5. See your **regular pay, overtime pay, and total** instantly

<div class="calculator-form" id="overtime-calculator-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="hourly-rate">Hourly Rate <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="hourly-rate" class="form-input" placeholder="20" value="20" min="0" step="any" />
          <span class="input-addon">/hr</span>
        </div>
      </div>
      <div class="form-group">
        <label for="regular-hours">Regular Hours</label>
        <div class="input-group">
          <input type="number" id="regular-hours" class="form-input" placeholder="40" value="40" min="0" step="any" />
          <span class="input-addon">hrs</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="overtime-hours">Overtime Hours</label>
        <div class="input-group">
          <input type="number" id="overtime-hours" class="form-input" placeholder="5" value="5" min="0" step="any" />
          <span class="input-addon">hrs</span>
        </div>
      </div>
      <div class="form-group">
        <label for="ot-multiplier">Overtime Multiplier</label>
        <select id="ot-multiplier" class="form-select">
          <option value="1.5" selected>1.5× — Time and a half</option>
          <option value="2">2× — Double time</option>
          <option value="1.25">1.25×</option>
          <option value="3">3× — Triple time</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Reset</button>
  </div>
</div>

<div id="overtime-calculator-result" class="calculator-result"></div>

<div class="info-box">
  <h4>⏰ How Overtime Pay Is Calculated</h4>
  <p><strong>Overtime rate = Hourly rate × multiplier.</strong> Overtime pay = OT hours × OT rate, and total pay = regular pay + overtime pay.</p>
  <p>Example: $20/hour, 40 regular hours, 5 overtime hours at 1.5×. Regular pay = $800. OT rate = $30, so OT pay = $150. <strong>Total = $950.</strong></p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📋 Overtime Rules (US)</h4>
  <p>Under the federal Fair Labor Standards Act (FLSA), non-exempt employees earn at least 1.5× their regular rate for hours worked over 40 in a workweek. Some states (like California) add daily overtime and double-time rules. Always check your state's labor laws for the exact thresholds that apply to you.</p>
</div>

<style>
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/overtime-calculator.js"></script>

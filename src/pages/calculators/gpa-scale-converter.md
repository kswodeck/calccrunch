---
layout: ../../layouts/CalculatorLayout.astro
calcType: gpascaleconverter
title: GPA Scale Converter
description: Convert your GPA between 4.0, 5.0, 7.0, 10.0, percentage, and other common grading scales instantly, using the standard proportional conversion formula.
---

## How to Use This Calculator

1. **Enter your GPA** — the grade point average you want to convert
2. **Select your current scale** — e.g. a 4.0 unweighted scale or a 5.0 weighted scale (choose Custom for any other maximum)
3. **Select the scale you want to convert to**
4. Click **Convert GPA** to see your converted score instantly

<div class="calculator-form" id="gpa-scale-converter-form">
  <div class="form-section">
    <h3>Your GPA</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gpa-input">Current GPA <span class="required">*</span>
          <span class="tooltip" title="The GPA you want to convert, on your 'From' scale">?</span>
        </label>
        <input type="number" id="gpa-input" class="form-input" step="any" min="0" placeholder="e.g. 3.5" required />
        <small class="form-help">Enter the GPA on your current scale</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Convert Between Scales</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="from-scale">From Scale <span class="required">*</span></label>
        <select id="from-scale" class="form-select">
          <option value="4.0" selected>4.0 (Standard Unweighted)</option>
          <option value="4.3">4.3 (A+ Included)</option>
          <option value="5.0">5.0 (Weighted)</option>
          <option value="6.0">6.0 (Weighted)</option>
          <option value="7.0">7.0</option>
          <option value="10.0">10.0</option>
          <option value="100">100 (Percentage)</option>
          <option value="custom">Custom Scale</option>
        </select>
        <div id="from-custom-wrap" class="form-group hidden" style="margin-top:0.75rem;">
          <label for="from-custom">Custom "From" Scale Maximum</label>
          <input type="number" id="from-custom" class="form-input" step="any" min="0.1" placeholder="e.g. 12" />
        </div>
      </div>
      <div class="form-group">
        <label for="to-scale">To Scale <span class="required">*</span></label>
        <select id="to-scale" class="form-select">
          <option value="4.0">4.0 (Standard Unweighted)</option>
          <option value="4.3">4.3 (A+ Included)</option>
          <option value="5.0" selected>5.0 (Weighted)</option>
          <option value="6.0">6.0 (Weighted)</option>
          <option value="7.0">7.0</option>
          <option value="10.0">10.0</option>
          <option value="100">100 (Percentage)</option>
          <option value="custom">Custom Scale</option>
        </select>
        <div id="to-custom-wrap" class="form-group hidden" style="margin-top:0.75rem;">
          <label for="to-custom">Custom "To" Scale Maximum</label>
          <input type="number" id="to-custom" class="form-input" step="any" min="0.1" placeholder="e.g. 12" />
        </div>
      </div>
    </div>
    <small class="form-help">"Custom" lets you enter any scale maximum, e.g. a school-specific 6.1 weighted scale.</small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Convert GPA →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="gpa-scale-converter-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🧮 The Conversion Formula</h4>
  <p style="margin-top:0.5rem;">
    Every scale converter — including this one — uses the same <strong>proportional method</strong>:
  </p>
  <div style="margin-top: 0.75rem;">
    <code>Converted GPA = (Your GPA ÷ Your Scale Max) × Target Scale Max</code>
  </div>
  <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-gray-dark);">
    Example: a 3.5 GPA on a 4.0 scale converts to (3.5 ÷ 4.0) × 5.0 = <strong>4.375</strong> on a 5.0 scale.
    This is the same method used by World Education Services (WES) and most college admissions offices for scale comparisons.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📊 Common GPA Scales</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>4.0 scale:</strong> The most common U.S. unweighted scale — A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0</li>
    <li><strong>4.3 scale:</strong> Adds an A+ = 4.3, used by some colleges and universities</li>
    <li><strong>5.0 / 6.0 scales:</strong> Weighted scales that give extra points for Honors, AP, IB, or Dual Credit courses</li>
    <li><strong>7.0 / 10.0 scales:</strong> Common outside the U.S. (e.g. New Zealand, parts of Europe and Latin America)</li>
    <li><strong>100-point / percentage scale:</strong> Used by many high schools and international transcripts</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Important Caveat</h4>
  <p style="margin-top:0.5rem;">
    Scale conversion is a <strong>mathematical approximation</strong>, not an official recalculation. Schools and
    colleges often have their own conversion policies (or recompute your GPA directly from your transcript using
    their own weighting rules), especially for weighted GPAs that count Honors/AP courses differently. Always
    confirm with the admissions office or registrar if a converted GPA will be used for an application, scholarship,
    or transfer decision.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/gpa-scale-converter.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: aspectratio
title: Aspect Ratio Calculator
description: Calculate aspect ratio from width and height, simplify to standard ratios like 16:9 or 4:3, and find matching dimensions for any target width or height.
---

## How to Use This Calculator

1. **Choose a mode** — Find Ratio (from dimensions) or Find Dimension (scale to a target size)
2. **Enter your values** — any positive numbers work (pixels, inches, cm, etc.)
3. Click **Calculate** to see the simplified ratio, decimal value, and closest standard ratio

<div class="calculator-form" id="aspect-ratio-calculator-form">
  <div class="form-section">
    <h3>Mode</h3>
    <div class="operation-selector">
      <button type="button" class="op-btn active" data-mode="ratio">Find Ratio</button>
      <button type="button" class="op-btn" data-mode="dimension">Find Dimension</button>
    </div>
  </div>

  <div class="form-section mode-section" data-mode-section="ratio">
    <h3>Find the Aspect Ratio</h3>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="r-width">Width <span class="required">*</span></label>
        <input type="number" id="r-width" class="form-input" placeholder="1920" step="any" min="0" />
      </div>
      <div class="ratio-colon">×</div>
      <div class="form-group">
        <label for="r-height">Height <span class="required">*</span></label>
        <input type="number" id="r-height" class="form-input" placeholder="1080" step="any" min="0" />
      </div>
    </div>
  </div>

  <div class="form-section mode-section hidden" data-mode-section="dimension">
    <h3>Find a Matching Dimension</h3>
    <p class="form-help" style="margin-top:-0.25rem;">Enter your original width and height, then enter <strong>only one</strong> target value — the calculator finds the other so the ratio stays the same.</p>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="d-width">Original Width <span class="required">*</span></label>
        <input type="number" id="d-width" class="form-input" placeholder="1920" step="any" min="0" />
      </div>
      <div class="ratio-colon">×</div>
      <div class="form-group">
        <label for="d-height">Original Height <span class="required">*</span></label>
        <input type="number" id="d-height" class="form-input" placeholder="1080" step="any" min="0" />
      </div>
    </div>
    <div class="ratio-inputs" style="margin-top: 0.75rem;">
      <div class="form-group">
        <label for="d-target-width">Target Width</label>
        <input type="number" id="d-target-width" class="form-input" placeholder="e.g. 1280" step="any" min="0" />
      </div>
      <div class="ratio-colon">or</div>
      <div class="form-group">
        <label for="d-target-height">Target Height</label>
        <input type="number" id="d-target-height" class="form-input" placeholder="e.g. 720" step="any" min="0" />
      </div>
    </div>
    <small class="form-help">Tip: fill in exactly one of Target Width or Target Height, not both.</small>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="aspect-ratio-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 How to Calculate Aspect Ratio</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Find the GCD:</strong> Find the greatest common divisor of the width and height. For 1920×1080, the GCD is 120.</li>
    <li><strong>Divide both sides:</strong> 1920 ÷ 120 : 1080 ÷ 120 = <strong>16:9</strong>.</li>
    <li><strong>Decimal form:</strong> Width ÷ height = 1920 ÷ 1080 = 1.7778 — useful for comparing ratios or matching cinema formats like 2.39:1.</li>
    <li><strong>Scaling to a new size:</strong> Multiply both sides by the same scale factor. To go from 1920×1080 to a 1280-wide image: 1280 ÷ 1920 = 0.667, so height = 1080 × 0.667 = <strong>720</strong>.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🖼️ Common Aspect Ratios</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr)); gap: 0.5rem; margin-top: 0.75rem;">
    <div><strong>16:9</strong> = 1.78:1 (HD/4K TV, YouTube)</div>
    <div><strong>4:3</strong> = 1.33:1 (classic TV, iPad)</div>
    <div><strong>21:9</strong> = 2.33:1 (ultrawide monitor)</div>
    <div><strong>1:1</strong> = 1.00:1 (square, Instagram)</div>
    <div><strong>3:2</strong> = 1.50:1 (DSLR photos)</div>
    <div><strong>9:16</strong> = 0.56:1 (vertical/Reels)</div>
    <div><strong>2.39:1</strong> = cinemascope (film)</div>
    <div><strong>5:4</strong> = 1.25:1 (older monitors)</div>
  </div>
</div>

<style>
  .operation-selector {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .op-btn {
    padding: var(--space-md) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    min-width: 130px;
    text-align: center;
  }

  .op-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
  }

  .op-btn.active {
    border-color: var(--color-accent-orange);
    background: var(--color-accent-orange);
    color: white;
  }

  .ratio-inputs {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .ratio-inputs .form-group {
    min-width: 110px;
    max-width: 160px;
  }

  .ratio-colon {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-gray-dark);
    margin-bottom: 0.75rem;
    line-height: 1;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .operation-selector {
      justify-content: center;
    }
    .ratio-inputs {
      gap: 0.5rem;
    }
    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/aspect-ratio-calculator.js"></script>

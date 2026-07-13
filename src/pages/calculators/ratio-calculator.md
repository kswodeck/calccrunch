---
layout: ../../layouts/CalculatorLayout.astro
calcType: ratio
title: Ratio Calculator
description: Simplify ratios, scale them up or down, solve for a missing value in a proportion, and compare two ratios instantly.
---

## How to Use This Calculator

1. **Choose a mode** — Simplify, Scale, Solve for X, or Compare
2. **Enter your values** — whole numbers or decimals both work
3. Click **Calculate** to see the simplified ratio, decimal, percentage, and step-by-step math

<div class="calculator-form" id="ratio-calculator-form">
  <div class="form-section">
    <h3>Mode</h3>
    <div class="operation-selector">
      <button type="button" class="op-btn active" data-mode="simplify">Simplify</button>
      <button type="button" class="op-btn" data-mode="scale">Scale</button>
      <button type="button" class="op-btn" data-mode="solve">Solve for X</button>
      <button type="button" class="op-btn" data-mode="compare">Compare</button>
    </div>
  </div>

  <div class="form-section mode-section" data-mode-section="simplify">
    <h3>Simplify a Ratio</h3>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="s-a">A <span class="required">*</span></label>
        <input type="number" id="s-a" class="form-input" placeholder="4" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="s-b">B <span class="required">*</span></label>
        <input type="number" id="s-b" class="form-input" placeholder="8" step="any" />
      </div>
    </div>
  </div>

  <div class="form-section mode-section hidden" data-mode-section="scale">
    <h3>Scale a Ratio</h3>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="sc-a">A <span class="required">*</span></label>
        <input type="number" id="sc-a" class="form-input" placeholder="2" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="sc-b">B <span class="required">*</span></label>
        <input type="number" id="sc-b" class="form-input" placeholder="3" step="any" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="sc-factor">Scale factor <span class="required">*</span>
          <span class="tooltip" title="Multiply both sides of the ratio by this number">?</span>
        </label>
        <input type="number" id="sc-factor" class="form-input" placeholder="5" step="any" />
      </div>
    </div>
  </div>

  <div class="form-section mode-section hidden" data-mode-section="solve">
    <h3>Solve for the Missing Value</h3>
    <p class="form-help" style="margin-top:-0.25rem;">Enter three of the four values in <strong>A : B = C : X</strong> — leave the value you want solved blank.</p>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="sv-a">A <span class="required">*</span></label>
        <input type="number" id="sv-a" class="form-input" placeholder="4" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="sv-b">B <span class="required">*</span></label>
        <input type="number" id="sv-b" class="form-input" placeholder="8" step="any" />
      </div>
      <div class="ratio-equals">=</div>
      <div class="form-group">
        <label for="sv-c">C <span class="required">*</span></label>
        <input type="number" id="sv-c" class="form-input" placeholder="6" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="sv-x">X</label>
        <input type="number" id="sv-x" class="form-input" placeholder="?" step="any" />
      </div>
    </div>
    <small class="form-help">Tip: leave exactly one field blank — the calculator solves for it.</small>
  </div>

  <div class="form-section mode-section hidden" data-mode-section="compare">
    <h3>Compare Two Ratios</h3>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="cmp-a">A <span class="required">*</span></label>
        <input type="number" id="cmp-a" class="form-input" placeholder="3" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="cmp-b">B <span class="required">*</span></label>
        <input type="number" id="cmp-b" class="form-input" placeholder="4" step="any" />
      </div>
    </div>
    <div class="ratio-vs">vs</div>
    <div class="ratio-inputs">
      <div class="form-group">
        <label for="cmp-c">C <span class="required">*</span></label>
        <input type="number" id="cmp-c" class="form-input" placeholder="6" step="any" />
      </div>
      <div class="ratio-colon">:</div>
      <div class="form-group">
        <label for="cmp-d">D <span class="required">*</span></label>
        <input type="number" id="cmp-d" class="form-input" placeholder="8" step="any" />
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="ratio-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 How to Simplify a Ratio</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Find the GCF:</strong> Find the greatest common factor of both numbers. For 8:12, the GCF of 8 and 12 is 4.</li>
    <li><strong>Divide both sides:</strong> Divide A and B by the GCF. 8 ÷ 4 : 12 ÷ 4 = <strong>2:3</strong>.</li>
    <li><strong>Solving proportions (A:B = C:X):</strong> Cross-multiply: X = (B × C) ÷ A. For 4:8 = 6:X, X = (8 × 6) ÷ 4 = 12.</li>
    <li><strong>Comparing ratios:</strong> Convert each to a decimal (A ÷ B) and compare — 3:4 = 0.75 and 6:8 = 0.75, so they're equivalent.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🔢 Common Ratio Simplifications</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.5rem; margin-top: 0.75rem;">
    <div><strong>2:4</strong> = 1:2</div>
    <div><strong>3:9</strong> = 1:3</div>
    <div><strong>4:6</strong> = 2:3</div>
    <div><strong>6:8</strong> = 3:4</div>
    <div><strong>10:15</strong> = 2:3</div>
    <div><strong>12:16</strong> = 3:4</div>
    <div><strong>16:9</strong> = 16:9</div>
    <div><strong>9:16</strong> = 9:16</div>
    <div><strong>2:3</strong> = 66.7%</div>
    <div><strong>3:4</strong> = 75%</div>
    <div><strong>1:4</strong> = 25%</div>
    <div><strong>1:1</strong> = 100%</div>
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
    min-width: 110px;
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
    min-width: 90px;
    max-width: 140px;
  }

  .ratio-colon,
  .ratio-equals {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-gray-dark);
    margin-bottom: 0.75rem;
    line-height: 1;
  }

  .ratio-vs {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-gray-dark);
    margin: 0.75rem 0;
    text-transform: uppercase;
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

<script src="/scripts/calculators/ratio-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: fraction
title: Fraction Calculator
description: Add, subtract, multiply, and divide fractions instantly. Supports mixed numbers and improper fractions with step-by-step results.
---

## How to Use This Calculator

1. **Choose an operation** — Addition, Subtraction, Multiplication, or Division
2. **Enter the first fraction** — Whole number (optional for mixed numbers), numerator, and denominator
3. **Enter the second fraction** — Same format as the first
4. Click **Calculate** to see the simplified result and step-by-step solution

<div class="calculator-form" id="fraction-calculator-form">
  <div class="form-section">
    <h3>Operation</h3>
    <div class="operation-selector">
      <button type="button" class="op-btn active" data-op="add">+ Add</button>
      <button type="button" class="op-btn" data-op="subtract">− Subtract</button>
      <button type="button" class="op-btn" data-op="multiply">× Multiply</button>
      <button type="button" class="op-btn" data-op="divide">÷ Divide</button>
    </div>
  </div>

  <div class="form-section">
    <h3>First Fraction</h3>
    <div class="fraction-inputs">
      <div class="form-group whole-group">
        <label for="whole1">Whole Number</label>
        <input type="number" id="whole1" class="form-input" placeholder="0" min="0" step="1" />
        <small class="form-help">Optional</small>
      </div>
      <div class="fraction-divider-inputs">
        <div class="form-group">
          <label for="num1">Numerator <span class="required">*</span></label>
          <input type="number" id="num1" class="form-input" placeholder="1" step="1" required />
        </div>
        <div class="fraction-bar">—</div>
        <div class="form-group">
          <label for="den1">Denominator <span class="required">*</span></label>
          <input type="number" id="den1" class="form-input" placeholder="2" min="1" step="1" required />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Second Fraction</h3>
    <div class="fraction-inputs">
      <div class="form-group whole-group">
        <label for="whole2">Whole Number</label>
        <input type="number" id="whole2" class="form-input" placeholder="0" min="0" step="1" />
        <small class="form-help">Optional</small>
      </div>
      <div class="fraction-divider-inputs">
        <div class="form-group">
          <label for="num2">Numerator <span class="required">*</span></label>
          <input type="number" id="num2" class="form-input" placeholder="1" step="1" required />
        </div>
        <div class="fraction-bar">—</div>
        <div class="form-group">
          <label for="den2">Denominator <span class="required">*</span></label>
          <input type="number" id="den2" class="form-input" placeholder="3" min="1" step="1" required />
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="fraction-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📐 Fraction Operations — Quick Reference</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Addition/Subtraction:</strong> Find a common denominator, then add or subtract numerators. Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6</li>
    <li><strong>Multiplication:</strong> Multiply numerators together and denominators together. Example: 2/3 × 3/4 = 6/12 = 1/2</li>
    <li><strong>Division:</strong> Multiply by the reciprocal of the divisor. Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</li>
    <li><strong>Simplification:</strong> Divide both numerator and denominator by their Greatest Common Factor (GCF)</li>
    <li><strong>Mixed numbers:</strong> Convert to an improper fraction first: 2¾ → (2×4 + 3)/4 = 11/4</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🔢 Common Fraction Equivalents</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.5rem; margin-top: 0.75rem;">
    <div><strong>1/2</strong> = 0.5 = 50%</div>
    <div><strong>1/3</strong> = 0.333… = 33.3%</div>
    <div><strong>1/4</strong> = 0.25 = 25%</div>
    <div><strong>3/4</strong> = 0.75 = 75%</div>
    <div><strong>1/5</strong> = 0.2 = 20%</div>
    <div><strong>2/5</strong> = 0.4 = 40%</div>
    <div><strong>3/5</strong> = 0.6 = 60%</div>
    <div><strong>4/5</strong> = 0.8 = 80%</div>
    <div><strong>1/8</strong> = 0.125 = 12.5%</div>
    <div><strong>3/8</strong> = 0.375 = 37.5%</div>
    <div><strong>5/8</strong> = 0.625 = 62.5%</div>
    <div><strong>7/8</strong> = 0.875 = 87.5%</div>
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

  .fraction-inputs {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .whole-group {
    min-width: 100px;
    max-width: 120px;
  }

  .fraction-divider-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .fraction-bar {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-gray-dark);
    margin-top: 1.5rem;
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
    .fraction-inputs {
      flex-direction: column;
      gap: 1rem;
    }
    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/fraction-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: grade
---

## How to Use This Calculator

1. Choose a mode: **Weighted Grade** or **Final Grade Needed**
2. For Weighted Grade: add assignments with scores and weights
3. For Final Grade: enter current grade, desired grade, and final exam weight
4. Click **Calculate** to see your results
5. See what scores you need for each letter grade

<div class="calculator-form" id="grade-calculator-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-mode="weighted">Weighted Grade Calculator</button>
      <button type="button" class="unit-btn" data-mode="final">Final Grade Needed</button>
    </div>
  </div>

  <div class="form-section" id="mode-weighted">
    <h3>Assignments</h3>
    <div id="assignments-container">
      <div class="assignment-row form-row">
        <div class="form-group" style="flex: 2;">
          <label>Assignment Name</label>
          <input type="text" class="form-input assignment-name" placeholder="Midterm Exam" value="Midterm Exam" />
        </div>
        <div class="form-group">
          <label>Score (%)</label>
          <div class="input-group">
            <input type="number" class="form-input assignment-score" placeholder="85" value="85" min="0" max="200" step="0.1" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group">
          <label>Weight (%)</label>
          <div class="input-group">
            <input type="number" class="form-input assignment-weight" placeholder="30" value="30" min="0" max="100" step="0.5" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group" style="flex: 0; padding-top: 1.75rem;">
          <button type="button" class="btn btn-secondary remove-assignment" style="padding: 0.4rem 0.8rem; color: #ef4444;">✕</button>
        </div>
      </div>
      <div class="assignment-row form-row">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-input assignment-name" placeholder="Homework" value="Homework" />
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="number" class="form-input assignment-score" placeholder="92" value="92" min="0" max="200" step="0.1" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="number" class="form-input assignment-weight" placeholder="20" value="20" min="0" max="100" step="0.5" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group" style="flex: 0; padding-top: 0;">
          <button type="button" class="btn btn-secondary remove-assignment" style="padding: 0.4rem 0.8rem; color: #ef4444;">✕</button>
        </div>
      </div>
      <div class="assignment-row form-row">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-input assignment-name" placeholder="Quiz Average" value="Quiz Average" />
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="number" class="form-input assignment-score" placeholder="78" value="78" min="0" max="200" step="0.1" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="number" class="form-input assignment-weight" placeholder="15" value="15" min="0" max="100" step="0.5" />
            <span class="input-addon">%</span>
          </div>
        </div>
        <div class="form-group" style="flex: 0; padding-top: 0;">
          <button type="button" class="btn btn-secondary remove-assignment" style="padding: 0.4rem 0.8rem; color: #ef4444;">✕</button>
        </div>
      </div>
    </div>
    <button type="button" id="add-assignment" class="btn btn-secondary" style="margin-top: 0.5rem;">
      + Add Assignment
    </button>
  </div>

  <div class="form-section hidden" id="mode-final">
    <h3>Current Standing</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-grade">Current Grade <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="current-grade" class="form-input" placeholder="82" value="82" min="0" max="100" step="0.1" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="current-weight">Weight Completed So Far <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="current-weight" class="form-input" placeholder="70" value="70" min="0" max="100" step="1" />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="desired-grade">Desired Final Grade <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="desired-grade" class="form-input" placeholder="85" value="85" min="0" max="100" step="0.1" />
          <span class="input-addon">%</span>
        </div>
      </div>
      <div class="form-group">
        <label for="final-weight">Final Exam Weight <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="final-weight" class="form-input" placeholder="30" value="30" min="0" max="100" step="1" />
          <span class="input-addon">%</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Grade →
  </button>

  <div class="form-actions">
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

<div id="grade-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📚 Understanding Weighted Grades</h4>
  <p>
    <strong>Weighted grades</strong> give different assignments different levels of importance. A final exam 
    worth 30% of your grade has more impact than a homework assignment worth 5%. This calculator handles 
    both weighted average calculations and "what do I need on my final" scenarios.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Standard Letter Grade Scale</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>A:</strong> 90 - 100%</li>
    <li><strong>B:</strong> 80 - 89%</li>
    <li><strong>C:</strong> 70 - 79%</li>
    <li><strong>D:</strong> 60 - 69%</li>
    <li><strong>F:</strong> Below 60%</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/grade-calculator.js"></script>

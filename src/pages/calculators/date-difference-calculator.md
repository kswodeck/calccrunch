---
layout: ../../layouts/CalculatorLayout.astro
calcType: datedifference
title: Date Difference Calculator
description: Calculate the exact number of days, weeks, months, and years between any two dates. Free, instant, and accurate.
---

## How to Use This Calculator

1. **Enter the start date** — type or use the date picker for the earlier date
2. **Enter the end date** — type or use the date picker for the later date
3. **Include today** — toggle to count today itself in the range if needed
4. Click **Calculate Difference** to see days, weeks, months, and years between the dates

<div class="calculator-form" id="date-difference-calculator-form">
  <div class="form-section">
    <h3>Date Range</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="start-date">
          Start Date <span class="required">*</span>
          <span class="tooltip" title="The earlier of the two dates">?</span>
        </label>
        <div class="input-group">
          <input
            type="date"
            id="start-date"
            class="form-input"
          />
        </div>
        <small class="form-help">The earlier date</small>
      </div>
      <div class="form-group">
        <label for="end-date">
          End Date <span class="required">*</span>
          <span class="tooltip" title="The later of the two dates">?</span>
        </label>
        <div class="input-group">
          <input
            type="date"
            id="end-date"
            class="form-input"
          />
        </div>
        <small class="form-help">The later date</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="include-end-day">Count end date as a day?</label>
        <select id="include-end-day" class="form-select">
          <option value="no">No — count days between (exclusive)</option>
          <option value="yes">Yes — include end date in count</option>
        </select>
        <small class="form-help">e.g. Jan 1 to Jan 3 = 2 days (exclusive) or 3 days (inclusive)</small>
      </div>
    </div>

    <div class="form-row date-shortcut-row">
      <div class="form-group">
        <label>Quick shortcuts</label>
        <div class="shortcut-buttons">
          <button type="button" class="shortcut-btn" data-action="today-plus-30">Today + 30 days</button>
          <button type="button" class="shortcut-btn" data-action="today-plus-90">Today + 90 days</button>
          <button type="button" class="shortcut-btn" data-action="year-start">Since Jan 1</button>
          <button type="button" class="shortcut-btn" data-action="year-end">Until Dec 31</button>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Difference →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="date-difference-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>📅 Common Date Difference Uses</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Project deadlines:</strong> Count how many days until a due date</li>
    <li><strong>Age calculation:</strong> Find exact days since a birthday</li>
    <li><strong>Event countdowns:</strong> Days until a wedding, vacation, or holiday</li>
    <li><strong>Contract durations:</strong> Verify exact term length in days or months</li>
    <li><strong>Loan periods:</strong> Days between disbursement and payoff date</li>
    <li><strong>Business planning:</strong> Weeks until end of quarter or fiscal year</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🗓️ How Date Difference Is Calculated</h4>
  <p style="margin: 10px 0;">
    The calculator subtracts the start date from the end date using UTC midnight timestamps to avoid daylight-saving errors. Results:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Days:</strong> Total calendar days between the two dates</li>
    <li><strong>Weeks:</strong> Whole weeks (days ÷ 7, floored) with remainder days</li>
    <li><strong>Months:</strong> Calendar months — accounts for different month lengths</li>
    <li><strong>Years:</strong> Full years elapsed, with remaining months and days</li>
  </ul>
  <p style="margin: 10px 0;">
    <em>Inclusive vs exclusive:</em> "Days between" is exclusive (Jan 1 → Jan 3 = 2 days). Toggle "include end date" to count the end day itself (= 3 days), useful when counting event nights or contract days.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .shortcut-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .shortcut-btn {
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .shortcut-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
  }

  input[type="date"].form-input {
    width: 100%;
    padding: var(--space-md);
    font-family: var(--font-body);
    font-size: var(--text-base);
  }

  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
    }
    .form-actions button {
      width: 100%;
    }
    .shortcut-buttons {
      gap: 0.375rem;
    }
  }
</style>

<script src="/scripts/calculators/date-difference-calculator.js"></script>

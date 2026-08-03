---
layout: ../../layouts/CalculatorLayout.astro
calcType: pace
title: Pace Calculator
description: Calculate your running or walking pace, finish time, or target distance. Enter any two of pace, time, and distance to instantly find the third, plus race-time predictions for 5K, 10K, half, and full marathon.
---

## How to Use This Calculator

1. **Choose what to solve for** - pace, time, or distance
2. **Enter the other two values** - distance and time, or pace and distance, etc.
3. Click **Calculate** to see your result plus predicted finish times for common race distances
4. Switch between **miles and kilometers** at any time

<div class="calculator-form" id="pace-calculator-form">
  <div class="form-section">
    <h3>What Do You Want to Find?</h3>
    <div class="pace-mode-group">
      <button type="button" class="pace-mode-btn active" data-mode="pace">Pace</button>
      <button type="button" class="pace-mode-btn" data-mode="time">Time</button>
      <button type="button" class="pace-mode-btn" data-mode="distance">Distance</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      Pick the value you want the calculator to figure out - the other two fields stay active
    </small>
  </div>

  <div class="form-section">
    <h3>Distance</h3>
    <div class="form-row">
      <div class="form-group" id="distance-group">
        <label for="pace-distance">
          Distance <span class="required">*</span>
        </label>
        <div class="input-group">
          <input
            type="number"
            id="pace-distance"
            class="form-input"
            placeholder="5"
            value="5"
            min="0.01"
            max="1000"
            step="any"
          />
          <select id="distance-unit" class="input-addon" style="border: none; background: var(--color-surface-neutral); padding: 0 8px;">
            <option value="mi">miles</option>
            <option value="km">km</option>
          </select>
        </div>
        <small class="form-help">Race or run distance</small>
      </div>
      <div class="form-group">
        <label>Quick Distances</label>
        <div class="pace-quick-distances">
          <button type="button" class="pace-quick-btn" data-distance="5" data-unit="km">5K</button>
          <button type="button" class="pace-quick-btn" data-distance="10" data-unit="km">10K</button>
          <button type="button" class="pace-quick-btn" data-distance="13.1094" data-unit="mi">Half</button>
          <button type="button" class="pace-quick-btn" data-distance="26.2188" data-unit="mi">Marathon</button>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Time</h3>
    <div class="form-row">
      <div class="form-group" id="time-group">
        <label for="pace-hours">
          Finish Time <span class="required">*</span>
          <span class="tooltip" title="Total time to complete the distance">?</span>
        </label>
        <div class="pace-time-inputs">
          <div class="pace-time-field">
            <input type="number" id="pace-hours" class="form-input" placeholder="0" value="0" min="0" max="99" step="1" />
            <span class="pace-time-label">hr</span>
          </div>
          <div class="pace-time-field">
            <input type="number" id="pace-minutes" class="form-input" placeholder="25" value="25" min="0" max="59" step="1" />
            <span class="pace-time-label">min</span>
          </div>
          <div class="pace-time-field">
            <input type="number" id="pace-seconds" class="form-input" placeholder="0" value="0" min="0" max="59" step="1" />
            <span class="pace-time-label">sec</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Pace</h3>
    <div class="form-row">
      <div class="form-group" id="pace-group">
        <label for="pace-min">
          Pace per Unit
          <span class="tooltip" title="Minutes and seconds per mile or km">?</span>
        </label>
        <div class="pace-time-inputs">
          <div class="pace-time-field">
            <input type="number" id="pace-min" class="form-input" placeholder="8" value="8" min="0" max="59" step="1" />
            <span class="pace-time-label">min</span>
          </div>
          <div class="pace-time-field">
            <input type="number" id="pace-sec" class="form-input" placeholder="2" value="2" min="0" max="59" step="1" />
            <span class="pace-time-label">sec</span>
          </div>
          <div class="pace-time-field">
            <span class="pace-time-label" id="pace-unit-label">per mile</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      Clear
    </button>
    <button type="button" id="share-btn" class="btn btn-secondary" title="Share this calculation">
      Share
    </button>
  </div>
</div>

<div id="pace-calculator-result" class="calculator-result hidden"></div>

<div class="info-box">
  <h4>🏃 The Pace Formula</h4>
  <p>
    <strong>Pace = Time ÷ Distance.</strong> If you run 5 miles in 40 minutes, your pace is
    40 ÷ 5 = <strong>8:00 per mile</strong>. Once you know your pace, you can rearrange the
    formula to find <strong>Time = Pace × Distance</strong> or <strong>Distance = Time ÷ Pace</strong> -
    which is exactly what the mode buttons above do.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>⏱️ Pace vs. Speed</h4>
  <p>
    Pace (minutes per mile or km) tells you how long it takes to cover a distance - lower is
    faster. Speed (mph or km/h) tells you how far you go per hour - higher is faster. To convert
    pace to speed, divide 60 by your pace in minutes: a 10:00/mile pace is 60 ÷ 10 = 6.0 mph.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🎯 Using Pace to Predict Race Times</h4>
  <p>
    Once your pace is set, the results below show projected finish times for a 5K, 10K, half
    marathon, and full marathon at that same steady pace. Real race times usually run a bit
    slower than training pace over longer distances - use these as a starting target, not a guarantee.
  </p>
</div>

<style>
  .pace-mode-group {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .pace-mode-btn {
    padding: var(--space-md) var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    min-width: 100px;
  }

  .pace-mode-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
  }

  .pace-mode-btn.active {
    border-color: var(--color-accent-orange);
    background: var(--color-accent-orange);
    color: white;
  }

  .pace-quick-distances {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .pace-quick-btn {
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

  .pace-quick-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
  }

  .pace-time-inputs {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .pace-time-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  .pace-time-field .form-input {
    text-align: center;
  }

  .pace-time-label {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
    white-space: nowrap;
  }

  .form-group.field-disabled {
    opacity: 0.45;
    pointer-events: none;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .pace-mode-group {
      justify-content: center;
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/pace-calculator.js"></script>

---
layout: ../../layouts/CalculatorLayout.astro
calcType: sleep
---

## How to Use This Calculator

1. Choose your **mode**: "I need to wake up at..." or "I'm going to bed at..."
2. Set your **target time** (wake time or bedtime)
3. Optionally adjust **fall asleep time** (default 15 minutes)
4. Click **Calculate** to see optimal sleep/wake times based on 90-minute cycles
5. Explore the **nap calculator** and **sleep needs by age** tabs

<div class="calculator-form" id="sleep-calculator-form">
  <div class="form-section">
    <h3>Sleep Mode</h3>
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label>I want to...</label>
        <div class="toggle-group" id="mode-toggle">
          <button type="button" class="toggle-btn active" data-mode="wake">Wake up at a specific time</button>
          <button type="button" class="toggle-btn" data-mode="sleep">Go to bed at a specific time</button>
          <button type="button" class="toggle-btn" data-mode="nap">Take a nap</button>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section" id="wake-mode-section">
    <h3>Wake-Up Time</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="wake-time">I need to wake up at <span class="required">*</span></label>
        <div class="input-group">
          <input type="time" id="wake-time" class="form-input" value="07:00" required />
        </div>
      </div>
      <div class="form-group">
        <label for="fall-asleep-time">Time to fall asleep</label>
        <div class="input-group">
          <input type="number" id="fall-asleep-time" class="form-input" placeholder="15" value="15" min="0" max="60" step="5" />
          <span class="input-addon">min</span>
        </div>
        <small class="form-help">Average is 10-20 minutes</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="sleep-mode-section">
    <h3>Bedtime</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="bed-time">I'm going to bed at <span class="required">*</span></label>
        <div class="input-group">
          <input type="time" id="bed-time" class="form-input" value="23:00" required />
        </div>
      </div>
      <div class="form-group">
        <label for="fall-asleep-time-2">Time to fall asleep</label>
        <div class="input-group">
          <input type="number" id="fall-asleep-time-2" class="form-input" placeholder="15" value="15" min="0" max="60" step="5" />
          <span class="input-addon">min</span>
        </div>
        <small class="form-help">Average is 10-20 minutes</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="nap-mode-section">
    <h3>Nap Planner</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="nap-start-time">I'm starting my nap at</label>
        <div class="input-group">
          <input type="time" id="nap-start-time" class="form-input" value="14:00" />
        </div>
      </div>
      <div class="form-group">
        <label for="nap-fall-asleep">Time to fall asleep</label>
        <div class="input-group">
          <input type="number" id="nap-fall-asleep" class="form-input" placeholder="10" value="10" min="0" max="30" step="5" />
          <span class="input-addon">min</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Your Age (for recommendations)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="user-age">Age</label>
        <div class="input-group">
          <select id="user-age" class="form-select">
            <option value="newborn">Newborn (0-3 months)</option>
            <option value="infant">Infant (4-11 months)</option>
            <option value="toddler">Toddler (1-2 years)</option>
            <option value="preschool">Preschool (3-5 years)</option>
            <option value="school">School Age (6-12 years)</option>
            <option value="teen">Teenager (13-17 years)</option>
            <option value="young-adult">Young Adult (18-25 years)</option>
            <option value="adult" selected>Adult (26-64 years)</option>
            <option value="senior">Senior (65+ years)</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Sleep Times →
  </button>

  <div class="form-actions">
    <button type="button" id="use-current-time" class="btn btn-secondary" title="Use current time">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      Use Current Time
    </button>
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

<div id="sleep-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🌙 How Sleep Cycles Work</h4>
  <p>
    Sleep occurs in <strong>90-minute cycles</strong>, each containing light sleep, deep sleep, and REM (dream) stages. 
    Waking at the end of a complete cycle — rather than in the middle of one — helps you feel refreshed and alert. 
    Most adults need <strong>4-6 complete cycles</strong> (6-9 hours) per night.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>⏰ Recommended Sleep by Age (CDC/NIH)</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Newborns (0-3 mo):</strong> 14-17 hours</li>
    <li><strong>Infants (4-11 mo):</strong> 12-15 hours</li>
    <li><strong>Toddlers (1-2 yr):</strong> 11-14 hours</li>
    <li><strong>Preschool (3-5 yr):</strong> 10-13 hours</li>
    <li><strong>School Age (6-12 yr):</strong> 9-12 hours</li>
    <li><strong>Teens (13-17 yr):</strong> 8-10 hours</li>
    <li><strong>Adults (18-64 yr):</strong> 7-9 hours</li>
    <li><strong>Seniors (65+ yr):</strong> 7-8 hours</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>💤 Nap Best Practices</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Power Nap (20 min):</strong> Light sleep only — boosts alertness without grogginess</li>
    <li><strong>Short Nap (30 min):</strong> May cause sleep inertia (grogginess upon waking)</li>
    <li><strong>Full Cycle (90 min):</strong> Complete cycle — wake refreshed with memory benefits</li>
    <li><strong>Best time to nap:</strong> Between 1:00 PM and 3:00 PM</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/sleep-calculator.js"></script>

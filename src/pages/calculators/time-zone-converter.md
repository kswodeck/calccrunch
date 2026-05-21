---
layout: ../../layouts/CalculatorLayout.astro
calcType: timezone
---

## How to Use This Converter

1. Select a **source time zone** (or use "Current Time" button)
2. Enter the **date and time** you want to convert
3. Choose one or more **target time zones**
4. Click **Convert** to see the time in all selected zones
5. Use the **Meeting Planner** to find overlapping business hours

<div class="calculator-form" id="timezone-converter-form">
  <div class="form-section">
    <h3>Source Time</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="source-timezone">
          From Time Zone <span class="required">*</span>
        </label>
        <select id="source-timezone" class="form-select" required>
          <optgroup label="Americas">
            <option value="-5" data-name="Eastern (EST/EDT)">Eastern Time (ET)</option>
            <option value="-6" data-name="Central (CST/CDT)">Central Time (CT)</option>
            <option value="-7" data-name="Mountain (MST/MDT)">Mountain Time (MT)</option>
            <option value="-8" data-name="Pacific (PST/PDT)">Pacific Time (PT)</option>
            <option value="-9" data-name="Alaska (AKST)">Alaska (AKT)</option>
            <option value="-10" data-name="Hawaii (HST)">Hawaii (HST)</option>
            <option value="-3" data-name="Brazil (BRT)">Brasilia (BRT)</option>
            <option value="-5" data-name="Colombia (COT)">Colombia (COT)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="0" data-name="London (GMT/BST)">London (GMT/BST)</option>
            <option value="1" data-name="Paris (CET/CEST)">Paris / Berlin (CET)</option>
            <option value="2" data-name="Athens (EET/EEST)">Athens / Helsinki (EET)</option>
            <option value="3" data-name="Moscow (MSK)">Moscow (MSK)</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="5.5" data-name="India (IST)">India (IST)</option>
            <option value="7" data-name="Bangkok (ICT)">Bangkok (ICT)</option>
            <option value="8" data-name="China/Singapore (CST/SGT)">China / Singapore (CST)</option>
            <option value="9" data-name="Japan/Korea (JST/KST)">Japan / Korea (JST)</option>
            <option value="4" data-name="Dubai (GST)">Dubai (GST)</option>
          </optgroup>
          <optgroup label="Oceania">
            <option value="10" data-name="Sydney (AEST/AEDT)">Sydney (AEST)</option>
            <option value="12" data-name="Auckland (NZST/NZDT)">Auckland (NZST)</option>
          </optgroup>
          <optgroup label="Africa">
            <option value="1" data-name="Lagos (WAT)">Lagos (WAT)</option>
            <option value="2" data-name="Cairo (EET)">Cairo (EET)</option>
            <option value="3" data-name="Nairobi (EAT)">Nairobi (EAT)</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label>&nbsp;</label>
        <button type="button" id="use-current-time" class="btn btn-secondary" style="width: 100%;">
          Use Current Time
        </button>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="convert-date">
          Date <span class="required">*</span>
        </label>
        <input 
          type="date" 
          id="convert-date" 
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="convert-hour">
          Time <span class="required">*</span>
        </label>
        <div class="height-input-group">
          <div class="input-group">
            <select id="convert-hour" class="form-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9" selected>9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div class="input-group">
            <select id="convert-minute" class="form-select">
              <option value="0">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
          </div>
          <div class="input-group">
            <select id="convert-ampm" class="form-select">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Target Time Zones</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="target-timezone-1">
          Target Zone 1 <span class="required">*</span>
        </label>
        <select id="target-timezone-1" class="form-select target-tz" required>
          <optgroup label="Americas">
            <option value="-5" data-name="Eastern (ET)">Eastern Time (ET)</option>
            <option value="-6" data-name="Central (CT)">Central Time (CT)</option>
            <option value="-7" data-name="Mountain (MT)">Mountain Time (MT)</option>
            <option value="-8" data-name="Pacific (PT)">Pacific Time (PT)</option>
            <option value="-9" data-name="Alaska (AKT)">Alaska (AKT)</option>
            <option value="-10" data-name="Hawaii (HST)">Hawaii (HST)</option>
            <option value="-3" data-name="Brazil (BRT)">Brasilia (BRT)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="0" data-name="London (GMT)" selected>London (GMT/BST)</option>
            <option value="1" data-name="Paris (CET)">Paris / Berlin (CET)</option>
            <option value="2" data-name="Athens (EET)">Athens / Helsinki (EET)</option>
            <option value="3" data-name="Moscow (MSK)">Moscow (MSK)</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="5.5" data-name="India (IST)">India (IST)</option>
            <option value="7" data-name="Bangkok (ICT)">Bangkok (ICT)</option>
            <option value="8" data-name="China (CST)">China / Singapore (CST)</option>
            <option value="9" data-name="Japan (JST)">Japan / Korea (JST)</option>
            <option value="4" data-name="Dubai (GST)">Dubai (GST)</option>
          </optgroup>
          <optgroup label="Oceania">
            <option value="10" data-name="Sydney (AEST)">Sydney (AEST)</option>
            <option value="12" data-name="Auckland (NZST)">Auckland (NZST)</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label for="target-timezone-2">
          Target Zone 2 (Optional)
        </label>
        <select id="target-timezone-2" class="form-select target-tz">
          <option value="">-- None --</option>
          <optgroup label="Americas">
            <option value="-5" data-name="Eastern (ET)">Eastern Time (ET)</option>
            <option value="-6" data-name="Central (CT)">Central Time (CT)</option>
            <option value="-7" data-name="Mountain (MT)">Mountain Time (MT)</option>
            <option value="-8" data-name="Pacific (PT)">Pacific Time (PT)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="0" data-name="London (GMT)">London (GMT/BST)</option>
            <option value="1" data-name="Paris (CET)">Paris / Berlin (CET)</option>
            <option value="2" data-name="Athens (EET)">Athens / Helsinki (EET)</option>
            <option value="3" data-name="Moscow (MSK)">Moscow (MSK)</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="5.5" data-name="India (IST)">India (IST)</option>
            <option value="8" data-name="China (CST)">China / Singapore (CST)</option>
            <option value="9" data-name="Japan (JST)">Japan / Korea (JST)</option>
          </optgroup>
          <optgroup label="Oceania">
            <option value="10" data-name="Sydney (AEST)">Sydney (AEST)</option>
            <option value="12" data-name="Auckland (NZST)">Auckland (NZST)</option>
          </optgroup>
        </select>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Convert Time →
  </button>

  <div class="form-actions">
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this conversion">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Conversion
    </button>
  </div>
</div>

<div id="timezone-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🌍 About Time Zones</h4>
  <p>
    The world is divided into <strong>24 time zones</strong>, roughly 15 degrees of longitude apart. 
    Time zones are measured relative to <strong>UTC (Coordinated Universal Time)</strong>, formerly known as GMT. 
    Some zones use half-hour or quarter-hour offsets (like India at UTC+5:30).
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>☀️ Daylight Saving Time</h4>
  <p>
    Many regions observe <strong>Daylight Saving Time (DST)</strong>, shifting clocks forward by one hour 
    in spring and back in fall. Not all countries observe DST, and dates vary by region. This converter 
    uses standard offsets — add 1 hour during DST periods where applicable.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Conversion</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your conversion, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/time-zone-converter.js"></script>

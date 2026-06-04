---
layout: ../../layouts/CalculatorLayout.astro
calcType: pregnancy
---

## How to Use This Calculator

1. Select your **calculation method** (Last Menstrual Period, Conception Date, IVF Transfer, or Ultrasound)
2. Enter the **relevant date** based on your chosen method
3. Adjust **cycle length** if using the LMP method (default is 28 days)
4. Optionally provide **BMI category**, pregnancy history, and multiples information
5. Click **Calculate Due Date** to see your estimated delivery date, milestones, and timeline
6. **Share or bookmark** your results - the URL automatically saves your inputs!

<div class="calculator-form" id="pregnancy-calculator-form">
  <div class="form-section">
    <h3>Calculation Method</h3>
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label>How would you like to calculate?</label>
        <div class="toggle-group" id="method-toggle">
          <button type="button" class="toggle-btn active" data-method="lmp">Last Menstrual Period</button>
          <button type="button" class="toggle-btn" data-method="conception">Conception Date</button>
          <button type="button" class="toggle-btn" data-method="ivf">IVF Transfer</button>
          <button type="button" class="toggle-btn" data-method="ultrasound">Ultrasound</button>
        </div>
        <small class="form-help">LMP is the most common method used by healthcare providers</small>
      </div>
    </div>
  </div>

  <div class="form-section" id="lmp-section">
    <h3>Last Menstrual Period</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="lmp-date">First day of last period <span class="required">*</span></label>
        <div class="input-group">
          <input type="date" id="lmp-date" class="form-input" required />
        </div>
        <small class="form-help">The first day of your most recent menstrual period</small>
      </div>
      <div class="form-group">
        <label for="cycle-length">Average cycle length</label>
        <div class="input-group">
          <input type="number" id="cycle-length" class="form-input" placeholder="28" value="28" min="20" max="45" />
          <span class="input-addon">days</span>
        </div>
        <small class="form-help">Typical range is 21-35 days (default 28)</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="conception-section">
    <h3>Conception Date</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="conception-date">Date of conception <span class="required">*</span></label>
        <div class="input-group">
          <input type="date" id="conception-date" class="form-input" required />
        </div>
        <small class="form-help">The known or estimated date of conception</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="ivf-section">
    <h3>IVF Transfer</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ivf-date">Transfer date <span class="required">*</span></label>
        <div class="input-group">
          <input type="date" id="ivf-date" class="form-input" required />
        </div>
        <small class="form-help">The date of embryo transfer</small>
      </div>
      <div class="form-group">
        <label for="ivf-day">Embryo transfer day</label>
        <select id="ivf-day" class="form-select">
          <option value="5" selected>Day 5 (Blastocyst)</option>
          <option value="3">Day 3 (Cleavage stage)</option>
        </select>
        <small class="form-help">Most transfers are Day 5 blastocysts</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="ultrasound-section">
    <h3>Ultrasound Dating</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="ultrasound-date">Ultrasound date <span class="required">*</span></label>
        <div class="input-group">
          <input type="date" id="ultrasound-date" class="form-input" required />
        </div>
        <small class="form-help">The date the ultrasound was performed</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="us-weeks">Gestational age at ultrasound</label>
        <div class="input-group">
          <input type="number" id="us-weeks" class="form-input" placeholder="8" value="8" min="4" max="40" />
          <span class="input-addon">weeks</span>
        </div>
      </div>
      <div class="form-group">
        <label for="us-days">Plus days</label>
        <div class="input-group">
          <input type="number" id="us-days" class="form-input" placeholder="0" value="0" min="0" max="6" />
          <span class="input-addon">days</span>
        </div>
        <small class="form-help">Gestational age measured at the scan</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Additional Information (Optional)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="bmi-category">Pre-pregnancy BMI category</label>
        <select id="bmi-category" class="form-select">
          <option value="normal" selected>Normal (18.5-24.9)</option>
          <option value="underweight">Underweight (below 18.5)</option>
          <option value="overweight">Overweight (25-29.9)</option>
          <option value="obese">Obese (30+)</option>
        </select>
        <small class="form-help">For weight gain guidance</small>
      </div>
      <div class="form-group">
        <label for="first-pregnancy">First pregnancy?</label>
        <select id="first-pregnancy" class="form-select">
          <option value="yes" selected>Yes</option>
          <option value="no">No</option>
        </select>
        <small class="form-help">May affect some timelines</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="multiples">Number of babies</label>
        <select id="multiples" class="form-select">
          <option value="singleton" selected>Singleton (one baby)</option>
          <option value="twins">Twins</option>
          <option value="triplets">Triplets</option>
        </select>
        <small class="form-help">Multiples may have earlier delivery targets</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Due Date →
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

<div id="pregnancy-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📅 About Due Date Calculations</h4>
  <p>
    Your <strong>Estimated Date of Delivery (EDD)</strong> is calculated as 280 days (40 weeks) from the first day of your last menstrual period. 
    Only about <strong>5% of babies</strong> arrive on their exact due date. Most babies are born within a window of 37-42 weeks, 
    with the majority arriving between 39-41 weeks.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🤰 Pregnancy Milestones</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Week 12:</strong> End of first trimester, risk of miscarriage drops significantly</li>
    <li><strong>Weeks 16-20:</strong> Gender may be revealed; you may feel first movements</li>
    <li><strong>Weeks 18-22:</strong> Anatomy scan (detailed ultrasound)</li>
    <li><strong>Week 24:</strong> Viability milestone</li>
    <li><strong>Week 28:</strong> Third trimester begins</li>
    <li><strong>Week 37:</strong> Pregnancy is considered full term</li>
    <li><strong>Week 40:</strong> Estimated due date</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚕️ Prenatal Care Schedule</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Weeks 4-28:</strong> Monthly appointments</li>
    <li><strong>Weeks 28-36:</strong> Every 2 weeks</li>
    <li><strong>Weeks 36-40:</strong> Weekly appointments</li>
    <li><strong>First ultrasound:</strong> Usually weeks 8-12 (dating scan)</li>
    <li><strong>Anatomy scan:</strong> Usually weeks 18-22</li>
    <li><strong>Glucose screening:</strong> Usually weeks 24-28</li>
    <li><strong>Group B strep test:</strong> Usually weeks 36-37</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/pregnancy-calculator.js"></script>

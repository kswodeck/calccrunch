---
layout: ../../layouts/CalculatorLayout.astro
calcType: pto
---

## How to Use This Calculator

1. **Choose your calculation mode** - Calculate future balance, time to accrue, or PTO value
2. **Enter your accrual settings** - Select how PTO is earned and at what rate
3. **Input your current PTO balance** - Include your starting hours
4. **Add planned time off** (optional) - Account for upcoming PTO usage
5. Click **Calculate** to see comprehensive PTO projections and analytics

<div class="calculator-form" id="pto-calculator-form">
  <div class="form-section">
    <h3>Calculation Mode</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="future-balance">Future Balance</button>
      <button type="button" class="mode-btn" data-mode="time-to-accrue">Time to Accrue</button>
      <button type="button" class="mode-btn" data-mode="pto-value">PTO Value</button>
    </div>
    <small class="form-help" style="text-align: center; display: block; margin-top: 0.5rem;">
      <span id="mode-description">Calculate your PTO balance on a specific future date</span>
    </small>
  </div>

  <div class="form-section">
    <h3>Accrual Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="accrual-type">
          Accrual Type <span class="required">*</span>
          <span class="tooltip" title="How your company distributes PTO">?</span>
        </label>
        <select id="accrual-type" class="form-select" required>
          <option value="per-pay-period">Per Pay Period</option>
          <option value="monthly">Monthly</option>
          <option value="annually-frontloaded">Annually (Frontloaded)</option>
          <option value="hourly">Per Hours Worked</option>
          <option value="custom">Custom Rate</option>
        </select>
        <small class="form-help">How your PTO is earned/distributed</small>
      </div>
      <div class="form-group">
        <label for="pay-period-frequency">
          Pay Period Frequency <span class="required">*</span>
          <span class="tooltip" title="How often you get paid">?</span>
        </label>
        <select id="pay-period-frequency" class="form-select" required>
          <option value="weekly">Weekly (52/year)</option>
          <option value="biweekly" selected>Bi-Weekly (26/year)</option>
          <option value="semi-monthly">Semi-Monthly (24/year)</option>
          <option value="monthly">Monthly (12/year)</option>
        </select>
        <small class="form-help">How often you receive a paycheck</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" id="accrual-rate-group">
        <label for="accrual-rate">
          Accrual Rate <span class="required">*</span>
          <span class="tooltip" title="Hours of PTO earned per period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="accrual-rate" 
            class="form-input"
            placeholder="4.62"
            value="4.62"
            min="0"
            max="500"
            step="0.01"
            required
          />
          <span class="input-addon" id="accrual-rate-addon">hrs/period</span>
        </div>
        <small class="form-help" id="accrual-rate-help">Hours earned per pay period</small>
      </div>
      <div class="form-group" id="annual-pto-group">
        <label for="annual-pto-hours">
          Annual PTO Hours
          <span class="tooltip" title="Total hours of PTO you receive per year">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="annual-pto-hours" 
            class="form-input"
            placeholder="120"
            value="120"
            min="0"
            max="2000"
            step="1"
          />
          <span class="input-addon">hrs/year</span>
        </div>
        <small class="form-help">Total PTO hours received annually</small>
      </div>
    </div>
    <div class="form-row" id="hourly-accrual-row" style="display: none;">
      <div class="form-group">
        <label for="hours-per-pto">
          Hours Worked per 1 PTO Hour
          <span class="tooltip" title="How many hours you must work to earn 1 hour of PTO">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="hours-per-pto" 
            class="form-input"
            placeholder="30"
            value="30"
            min="1"
            max="1000"
            step="1"
          />
          <span class="input-addon">hrs worked</span>
        </div>
        <small class="form-help">e.g., 30 means you earn 1 PTO hour for every 30 worked</small>
      </div>
      <div class="form-group">
        <label for="hours-worked-per-period">
          Hours Worked per Pay Period
          <span class="tooltip" title="Average hours you work each pay period">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="hours-worked-per-period" 
            class="form-input"
            placeholder="80"
            value="80"
            min="0"
            max="400"
            step="1"
          />
          <span class="input-addon">hrs</span>
        </div>
        <small class="form-help">Typical hours worked each period</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Current PTO Status</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-balance">
          Current PTO Balance <span class="required">*</span>
          <span class="tooltip" title="Your current available PTO hours">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-balance" 
            class="form-input"
            placeholder="40"
            value=""
            min="0"
            max="2000"
            step="0.5"
            required
          />
          <span class="input-addon">hours</span>
        </div>
        <small class="form-help">Hours you currently have available</small>
      </div>
      <div class="form-group">
        <label for="as-of-date">
          Balance As Of Date <span class="required">*</span>
          <span class="tooltip" title="Date when this balance was recorded">?</span>
        </label>
        <input 
          type="date" 
          id="as-of-date" 
          class="form-input"
          required
        />
        <small class="form-help">When this balance was current</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="max-balance">
          Maximum Balance Cap
          <span class="tooltip" title="Maximum PTO hours you can accumulate (leave blank for no cap)">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="max-balance" 
            class="form-input"
            placeholder="No limit"
            value=""
            min="0"
            max="5000"
            step="1"
          />
          <span class="input-addon">hours</span>
        </div>
        <small class="form-help">Leave blank if no maximum cap</small>
      </div>
      <div class="form-group">
        <label for="max-carryover">
          Annual Carryover Limit
          <span class="tooltip" title="Maximum hours that can carry over to next year">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="max-carryover" 
            class="form-input"
            placeholder="No limit"
            value=""
            min="0"
            max="5000"
            step="1"
          />
          <span class="input-addon">hours</span>
        </div>
        <small class="form-help">Leave blank if unlimited carryover</small>
      </div>
    </div>
  </div>

  <!-- Future Balance Mode Fields -->
  <div class="form-section mode-section future-balance-section">
    <h3>Target Date</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="target-date">
          Calculate Balance On <span class="required">*</span>
          <span class="tooltip" title="The future date to calculate your balance">?</span>
        </label>
        <input 
          type="date" 
          id="target-date" 
          class="form-input"
          required
        />
        <small class="form-help">What date do you want to know your balance?</small>
      </div>
      <div class="form-group">
        <label>&nbsp;</label>
        <div class="quick-date-buttons">
          <button type="button" class="quick-date-btn" data-days="30">30 Days</button>
          <button type="button" class="quick-date-btn" data-days="90">90 Days</button>
          <button type="button" class="quick-date-btn" data-days="180">6 Months</button>
          <button type="button" class="quick-date-btn" data-days="365">1 Year</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Time to Accrue Mode Fields -->
  <div class="form-section mode-section time-to-accrue-section" style="display: none;">
    <h3>Target PTO Amount</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="target-hours">
          Target PTO Hours <span class="required">*</span>
          <span class="tooltip" title="How many total PTO hours you want to have">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="target-hours" 
            class="form-input"
            placeholder="80"
            value=""
            min="0"
            max="2000"
            step="0.5"
          />
          <span class="input-addon">hours</span>
        </div>
        <small class="form-help">Total hours you want to accumulate</small>
      </div>
      <div class="form-group">
        <label>&nbsp;</label>
        <div class="quick-hours-buttons">
          <button type="button" class="quick-hours-btn" data-hours="40">1 Week</button>
          <button type="button" class="quick-hours-btn" data-hours="80">2 Weeks</button>
          <button type="button" class="quick-hours-btn" data-hours="120">3 Weeks</button>
          <button type="button" class="quick-hours-btn" data-hours="160">4 Weeks</button>
        </div>
      </div>
    </div>
  </div>

  <!-- PTO Value Mode Fields -->
  <div class="form-section mode-section pto-value-section" style="display: none;">
    <h3>Compensation Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="compensation-type">
          Compensation Type <span class="required">*</span>
        </label>
        <select id="compensation-type" class="form-select" required>
          <option value="hourly">Hourly Rate</option>
          <option value="salary">Annual Salary</option>
        </select>
        <small class="form-help">How you are compensated</small>
      </div>
      <div class="form-group" id="hourly-rate-group">
        <label for="hourly-rate">
          Hourly Rate <span class="required">*</span>
        </label>
        <div class="input-group">
          <span class="input-addon-left">$</span>
          <input 
            type="number" 
            id="hourly-rate" 
            class="form-input"
            placeholder="25.00"
            value=""
            min="0"
            max="10000"
            step="0.01"
          />
          <span class="input-addon">/hr</span>
        </div>
        <small class="form-help">Your hourly pay rate</small>
      </div>
      <div class="form-group" id="salary-group" style="display: none;">
        <label for="annual-salary">
          Annual Salary <span class="required">*</span>
        </label>
        <div class="input-group">
          <span class="input-addon-left">$</span>
          <input 
            type="number" 
            id="annual-salary" 
            class="form-input"
            placeholder="52000"
            value=""
            min="0"
            max="10000000"
            step="1000"
          />
          <span class="input-addon">/year</span>
        </div>
        <small class="form-help">Your annual salary</small>
      </div>
    </div>
  </div>

  <!-- Planned PTO Usage -->
  <div class="form-section">
    <h3>Planned Time Off (Optional)</h3>
    <p class="form-help" style="margin-bottom: 1rem;">Add any scheduled PTO you plan to take. These will be deducted from your projected balance.</p>
    <div id="planned-pto-container">
      <!-- Planned PTO entries will be added here -->
    </div>
    <button type="button" id="add-planned-pto-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Planned Time Off
    </button>
    <div class="planned-pto-summary" id="planned-pto-summary" style="display: none;">
      <div class="summary-row">
        <span>Total Planned PTO:</span>
        <strong id="total-planned-preview">0 hours</strong>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate PTO →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all entries">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
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

<div id="pto-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🏖️ What is PTO?</h4>
  <p>
    <strong>Paid Time Off (PTO)</strong> is employer-provided compensation for time away from work. Unlike traditional systems that separate vacation, sick days, and personal days, many employers now combine these into a single PTO bank. Understanding how your PTO accrues helps you plan vacations, manage work-life balance, and avoid losing earned time.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>🎯 Key Features</h4>
  <p><strong>This calculator includes:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Multiple Calculation Modes:</strong> Future balance, time to accrue, or PTO value</li>
    <li><strong>Flexible Accrual Types:</strong> Per pay period, monthly, annually, hourly-based, or custom</li>
    <li><strong>Planned PTO Tracking:</strong> Account for scheduled time off in projections</li>
    <li><strong>Balance Caps:</strong> Handles maximum balance and carryover limits</li>
    <li><strong>PTO Valuation:</strong> Calculate the monetary value of your PTO balance</li>
    <li><strong>Visual Timeline:</strong> See your PTO balance projected over time</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📊 Understanding PTO Accrual</h4>
  <p><strong>Common accrual methods:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Per Pay Period:</strong> PTO accrues each paycheck (e.g., 4.62 hrs every 2 weeks = 120 hrs/year)</li>
    <li><strong>Monthly:</strong> Fixed hours added each month (e.g., 10 hrs/month = 120 hrs/year)</li>
    <li><strong>Annually Frontloaded:</strong> Full year's PTO given at start of year or hire date anniversary</li>
    <li><strong>Per Hours Worked:</strong> Earn PTO based on hours worked (e.g., 1 hour PTO per 30 worked)</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 PTO Planning Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Know Your Cap:</strong> Many companies cap how much PTO you can bank - use it before you lose it</li>
    <li><strong>Plan Ahead:</strong> For longer vacations, calculate when you'll have enough hours</li>
    <li><strong>Year-End Strategy:</strong> Check carryover limits to avoid forfeiting earned time</li>
    <li><strong>PTO Value:</strong> Remember that unused PTO often has cash value if paid out at separation</li>
    <li><strong>Blackout Dates:</strong> Some employers restrict PTO during busy periods - plan accordingly</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Notes</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>PTO policies vary widely by employer - verify your specific policy details</li>
    <li>Some states require PTO payout upon termination - check your local laws</li>
    <li>Accrual rates may increase with tenure at many companies</li>
    <li>This calculator provides estimates - always verify with your HR department</li>
    <li>Some companies have separate sick leave not included in PTO calculations</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically, including planned PTO entries.
  </p>
</div>

<style>
  .chart-bars {
    flex-direction: row;
  }
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .mode-toggle {
    display: flex;
    background: var(--color-gray-light);
    padding: 4px;
    border-radius: var(--border-radius);
    max-width: 500px;
    margin: 0 auto;
  }
  
  .mode-btn {
    flex: 1;
    padding: var(--space-md) var(--space-lg);
    border: 2px solid transparent;
    background: transparent;
    color: var(--color-gray-dark);
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    white-space: nowrap;
  }
  
  .mode-btn:hover {
    background: var(--color-white);
    color: var(--color-primary-blue);
  }
  
  .mode-btn.active {
    background: var(--color-accent-orange);
    color: var(--color-white);
    border-color: var(--color-accent-orange);
    box-shadow: var(--shadow-sm);
  }
  
  .quick-date-buttons,
  .quick-hours-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .quick-date-btn,
  .quick-hours-btn {
    padding: var(--space-md);
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .quick-date-btn:hover,
  .quick-hours-btn:hover {
    border-color: var(--color-accent-orange);
    background: #fff8f5;
  }
  
  .quick-date-btn.active,
  .quick-hours-btn.active {
    border-color: var(--color-accent-orange);
    background: var(--color-accent-orange);
    color: white;
  }
  
  .input-addon-left {
    display: flex;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-gray-light);
    border: 2px solid var(--color-gray);
    border-right: none;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  .input-addon-left + .form-input {
    border-radius: 0;
  }
  
  .planned-pto-entry {
    display: grid;
    grid-template-columns: 1fr 1fr 120px auto;
    gap: 1rem;
    align-items: end;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--color-gray);
    margin-bottom: 0.75rem;
  }
  
  .planned-pto-entry .form-group {
    margin: 0;
  }
  
  .planned-pto-entry .form-group label {
    font-size: var(--text-xs);
  }
  
  .remove-planned-btn {
    padding: 0.5rem;
    background: #fee2e2;
    color: #dc2626;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
  }
  
  .remove-planned-btn:hover {
    background: #dc2626;
    color: white;
  }
  
  .planned-pto-summary {
    margin-top: 1rem;
    padding: 1rem;
    background: #f0f9ff;
    border-radius: 8px;
    border: 1px solid #93c5fd;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .summary-row span {
    color: var(--color-gray-dark);
  }
  
  .summary-row strong {
    color: var(--color-primary-blue);
    font-size: var(--text-lg);
  }
  
  @media (max-width: 768px) {
    .mode-toggle {
      flex-direction: column;
      max-width: 100%;
    }
    
    .mode-btn {
      padding: var(--space-sm) var(--space-md);
    }
    
    .quick-date-buttons,
    .quick-hours-buttons {
      justify-content: center;
    }
    
    .planned-pto-entry {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/pto-calculator.js"></script>
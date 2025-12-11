---
layout: ../../layouts/CalculatorLayout.astro
calcType: business-days
---

## How to Use This Calculator

1. **Choose calculation type** - Count days between dates or add/subtract days
2. **Enter your start date** using the date picker
3. **Enter end date** (for counting) or number of days (for adding/subtracting)
4. **Select your country** for holiday calculations
5. **Toggle holidays** - Uncheck any holidays you want to include as business days
6. Click **Calculate** to see results with visual calendar and holiday list

<div class="calculator-form" id="business-days-calculator-form">
  <div class="form-section">
    <h3>Calculation Type</h3>
    <div class="form-row">
      <div class="form-group">
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="calc-type" value="between" checked>
            <span>Count business days between two dates</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="calc-type" value="add">
            <span>Add business days to a date</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="calc-type" value="subtract">
            <span>Subtract business days from a date</span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Date Selection</h3>
    <div class="form-row" id="between-dates-row">
      <div class="form-group">
        <label for="start-date">
          Start Date <span class="required">*</span>
        </label>
        <input 
          type="date" 
          id="start-date" 
          class="form-input"
          required
        />
        <small class="form-help">First date in your range</small>
      </div>
      <div class="form-group">
        <label for="end-date">
          End Date <span class="required">*</span>
        </label>
        <input 
          type="date" 
          id="end-date" 
          class="form-input"
          required
        />
        <small class="form-help">Last date in your range</small>
      </div>
    </div>
    <div class="form-row" id="add-subtract-row" style="display: none;">
      <div class="form-group">
        <label for="base-date">
          Starting Date <span class="required">*</span>
        </label>
        <input 
          type="date" 
          id="base-date" 
          class="form-input"
        />
        <small class="form-help">Date to add/subtract from</small>
      </div>
      <div class="form-group">
        <label for="business-days-count">
          Business Days <span class="required">*</span>
        </label>
        <input 
          type="number" 
          id="business-days-count" 
          class="form-input"
          min="1"
          max="9999"
          placeholder="10"
        />
        <small class="form-help">Number of business days</small>
      </div>
    </div>
  </div>
  <div class="form-section">
    <h3>Holiday Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="country-select">
          Country/Region <span class="required">*</span>
        </label>
        <select id="country-select" class="form-select" required>
          <option value="US" selected>United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="custom">Custom (Define your own)</option>
        </select>
        <small class="form-help">Holidays vary by country</small>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="exclude-holidays" checked>
          <span>Exclude public holidays from business days</span>
        </label>
      </div>
    </div>
    <!-- Holiday toggles will be dynamically added here by JavaScript -->
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Business Days →
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

<div id="business-days-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>📅 What Are Business Days?</h4>
  <p>
    <strong>Business days</strong> (also called working days or weekdays) are the days when most businesses and government offices are open. 
    Typically, this means Monday through Friday, excluding public holidays. Business days are crucial for project planning, shipping estimates, 
    legal deadlines, and financial transactions.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>🎯 Key Features</h4>
  <p><strong>This calculator includes:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Visual Calendar:</strong> Color-coded calendar showing business days, weekends, and holidays</li>
    <li><strong>Holiday Toggles:</strong> Individually select which holidays to exclude from business days</li>
    <li><strong>Holiday List:</strong> See exactly which holidays fall within your date range</li>
    <li><strong>Smart Calculations:</strong> Handles holidays that fall on weekends correctly</li>
    <li><strong>URL Sharing:</strong> All settings including holiday toggles are saved in the URL</li>
  </ul>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📊 Understanding the Results</h4>
  <p><strong>The calculator provides:</strong></p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Business Days Count:</strong> Total working days in your range</li>
    <li><strong>Visual Calendar:</strong> Month-by-month view with color coding:
      <ul style="margin: 5px 0 5px 20px;">
        <li>🟢 Green = Business days</li>
        <li>🔘 Gray = Weekends</li>
        <li>🟡 Yellow = Holidays</li>
        <li>⚪ Light gray = Out of range</li>
      </ul>
    </li>
    <li><strong>Holiday List:</strong> All excluded holidays with dates</li>
    <li><strong>Statistics:</strong> Average work week, efficiency rate, and more</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 Using Holiday Toggles</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Automatic Display:</strong> When you select a country, all its holidays appear below</li>
    <li><strong>Individual Control:</strong> Toggle each holiday on/off as needed</li>
    <li><strong>Default State:</strong> All holidays are excluded by default (checked)</li>
    <li><strong>Custom Scenarios:</strong> Uncheck holidays your organization observes differently</li>
    <li><strong>Real-time Updates:</strong> Calculations update instantly when you toggle holidays</li>
  </ul>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Notes</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Holiday dates may vary by state/province within countries</li>
    <li>Some holidays are observed on different dates when falling on weekends</li>
    <li>Banking holidays may differ from federal holidays</li>
    <li>Always verify critical deadlines with the relevant organization</li>
    <li>The calculator uses local dates to avoid timezone conversion issues</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your calculation is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
    <strong>Holiday toggle states are also saved</strong>, so your custom holiday selections persist when sharing or bookmarking.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background: #f8f9fa;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .radio-label:hover {
    border-color: #FF6B35;
    background: #fff8f5;
  }
  
  .radio-label input[type="radio"] {
    margin-right: 0.75rem;
  }
  
  .radio-label input[type="radio"]:checked + span {
    font-weight: 600;
    color: #2C5F8D;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .radio-group {
      gap: 0.5rem;
    }
    
    .radio-label {
      padding: 0.5rem;
      font-size: 0.9rem;
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

<script src="/scripts/calculators/business-days-calculator.js"></script>
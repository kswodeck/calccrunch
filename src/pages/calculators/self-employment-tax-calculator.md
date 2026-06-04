---
layout: ../../layouts/CalculatorLayout.astro
calcType: self-employment-tax
---

## How to Use This Calculator

1. Enter your **annual self-employment income** (gross revenue from freelancing/gig work)
2. Enter your **business expenses** (deductible costs of doing business)
3. Select your **filing status** and **state**
4. Add any **other income** from W-2 jobs or other sources
5. Enter **retirement contributions** and **health insurance premiums** if applicable
6. Choose whether your quarterly expenses are **even or custom** per quarter
7. Click **Calculate** to see your estimated quarterly tax payments

<div class="calculator-form" id="self-employment-tax-calculator-form">
  <div class="form-section">
    <h3>Self-Employment Income</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="gross-income">
          Annual Gross Income <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="gross-income" 
            class="form-input"
            placeholder="100000"
            value="100000"
            min="0"
            step="1000"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Total revenue from self-employment before expenses</small>
      </div>
      <div class="form-group">
        <label for="business-expenses">
          Business Expenses <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="business-expenses" 
            class="form-input"
            placeholder="20000"
            value="20000"
            min="0"
            step="500"
            required
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Deductible business costs (supplies, software, travel, etc.)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Filing Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="filing-status">
          Filing Status <span class="required">*</span>
        </label>
        <select id="filing-status" class="form-select" required>
          <option value="single">Single</option>
          <option value="mfj">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
          <option value="hoh">Head of Household</option>
        </select>
      </div>
      <div class="form-group">
        <label for="state">
          State <span class="required">*</span>
        </label>
        <select id="state" class="form-select" required>
          <option value="AL">Alabama (5.0%)</option>
          <option value="AK">Alaska (No income tax)</option>
          <option value="AZ">Arizona (2.5%)</option>
          <option value="AR">Arkansas (4.4%)</option>
          <option value="CA">California (9.3%)</option>
          <option value="CO">Colorado (4.4%)</option>
          <option value="CT">Connecticut (5.0%)</option>
          <option value="DE">Delaware (6.6%)</option>
          <option value="FL">Florida (No income tax)</option>
          <option value="GA">Georgia (5.49%)</option>
          <option value="HI">Hawaii (7.2%)</option>
          <option value="ID">Idaho (5.8%)</option>
          <option value="IL">Illinois (4.95%)</option>
          <option value="IN">Indiana (3.05%)</option>
          <option value="IA">Iowa (5.7%)</option>
          <option value="KS">Kansas (5.7%)</option>
          <option value="KY">Kentucky (4.0%)</option>
          <option value="LA">Louisiana (4.25%)</option>
          <option value="ME">Maine (7.15%)</option>
          <option value="MD">Maryland (5.75%)</option>
          <option value="MA">Massachusetts (5.0%)</option>
          <option value="MI">Michigan (4.25%)</option>
          <option value="MN">Minnesota (7.85%)</option>
          <option value="MS">Mississippi (5.0%)</option>
          <option value="MO">Missouri (4.95%)</option>
          <option value="MT">Montana (6.75%)</option>
          <option value="NE">Nebraska (6.64%)</option>
          <option value="NV">Nevada (No income tax)</option>
          <option value="NH">New Hampshire (No income tax)</option>
          <option value="NJ">New Jersey (6.37%)</option>
          <option value="NM">New Mexico (4.9%)</option>
          <option value="NY">New York (6.85%)</option>
          <option value="NC">North Carolina (4.5%)</option>
          <option value="ND">North Dakota (1.95%)</option>
          <option value="OH">Ohio (3.5%)</option>
          <option value="OK">Oklahoma (4.75%)</option>
          <option value="OR">Oregon (8.75%)</option>
          <option value="PA">Pennsylvania (3.07%)</option>
          <option value="RI">Rhode Island (5.99%)</option>
          <option value="SC">South Carolina (6.4%)</option>
          <option value="SD">South Dakota (No income tax)</option>
          <option value="TN">Tennessee (No income tax)</option>
          <option value="TX">Texas (No income tax)</option>
          <option value="UT">Utah (4.65%)</option>
          <option value="VT">Vermont (6.6%)</option>
          <option value="VA">Virginia (5.75%)</option>
          <option value="WA">Washington (No income tax)</option>
          <option value="WV">West Virginia (5.12%)</option>
          <option value="WI">Wisconsin (5.3%)</option>
          <option value="WY">Wyoming (No income tax)</option>
          <option value="DC">District of Columbia (6.5%)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Other Income & Deductions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="other-income">Other Income (W-2, investments, etc.)</label>
        <div class="input-group">
          <input 
            type="number" 
            id="other-income" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="1000"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Income from W-2 jobs or other sources</small>
      </div>
      <div class="form-group">
        <label for="w2-withholding">Taxes Already Withheld (W-2)</label>
        <div class="input-group">
          <input 
            type="number" 
            id="w2-withholding" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Federal taxes already withheld from other jobs</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Retirement Contributions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="retirement-type">Retirement Account Type</label>
        <select id="retirement-type" class="form-select">
          <option value="none">None</option>
          <option value="solo401k">Solo 401(k)</option>
          <option value="sep">SEP IRA</option>
          <option value="traditional">Traditional IRA</option>
        </select>
      </div>
      <div class="form-group">
        <label for="retirement-amount">Annual Contribution</label>
        <div class="input-group">
          <input 
            type="number" 
            id="retirement-amount" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Solo 401(k): up to $23,000 employee + 25% profit; SEP: up to 25% net; IRA: up to $7,000</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Health Insurance</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="health-insurance">Annual Health Insurance Premiums</label>
        <div class="input-group">
          <input 
            type="number" 
            id="health-insurance" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="100"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Self-employed health insurance deduction (you, spouse, dependents)</small>
      </div>
      <div class="form-group">
        <label for="prior-year-tax">Prior Year Total Tax (for safe harbor)</label>
        <div class="input-group">
          <input 
            type="number" 
            id="prior-year-tax" 
            class="form-input"
            placeholder="0"
            value="0"
            min="0"
            step="500"
          />
          <span class="input-addon">$</span>
        </div>
        <small class="form-help">Last year's total tax liability (from Form 1040, line 24)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Quarterly Income Distribution</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="quarterly-method">Income Distribution</label>
        <select id="quarterly-method" class="form-select">
          <option value="even">Even (same each quarter)</option>
          <option value="custom">Custom (different each quarter)</option>
        </select>
        <small class="form-help">Choose how income is spread across quarters</small>
      </div>
    </div>
    <div id="custom-quarters" style="display: none;">
      <div class="form-row">
        <div class="form-group">
          <label for="q1-income">Q1 Income (Jan-Mar)</label>
          <div class="input-group">
            <input type="number" id="q1-income" class="form-input" placeholder="25000" value="25000" min="0" step="500" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="q2-income">Q2 Income (Apr-Jun)</label>
          <div class="input-group">
            <input type="number" id="q2-income" class="form-input" placeholder="25000" value="25000" min="0" step="500" />
            <span class="input-addon">$</span>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="q3-income">Q3 Income (Jul-Sep)</label>
          <div class="input-group">
            <input type="number" id="q3-income" class="form-input" placeholder="25000" value="25000" min="0" step="500" />
            <span class="input-addon">$</span>
          </div>
        </div>
        <div class="form-group">
          <label for="q4-income">Q4 Income (Oct-Dec)</label>
          <div class="input-group">
            <input type="number" id="q4-income" class="form-input" placeholder="25000" value="25000" min="0" step="500" />
            <span class="input-addon">$</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Quarterly Taxes →
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

<div id="self-employment-tax-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>📋 Understanding Self-Employment Tax</h4>
  <p>
    Self-employment tax consists of <strong>Social Security (12.4%)</strong> and <strong>Medicare (2.9%)</strong> taxes, 
    totaling <strong>15.3%</strong>. As a self-employed individual, you pay both the employer and employee portions. 
    The tax is calculated on <strong>92.35%</strong> of your net self-employment income (this accounts for the 
    employer-equivalent portion). The Social Security portion applies only up to the wage base of <strong>$168,600</strong> for 2024.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>💡 Quarterly Estimated Tax Due Dates (2024)</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Q1:</strong> April 15, 2024 (for income earned Jan 1 - Mar 31)</li>
    <li><strong>Q2:</strong> June 17, 2024 (for income earned Apr 1 - May 31)</li>
    <li><strong>Q3:</strong> September 16, 2024 (for income earned Jun 1 - Aug 31)</li>
    <li><strong>Q4:</strong> January 15, 2025 (for income earned Sep 1 - Dec 31)</li>
  </ul>
  <p style="margin-top: 10px; font-size: 0.875rem;">
    Missing a quarterly payment may result in an <strong>underpayment penalty</strong> even if you pay the full amount at tax time.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🎯 Tax-Saving Strategies for Self-Employed</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Solo 401(k):</strong> Contribute up to $23,000 as employee + 25% of net profit as employer (max $69,000 total)</li>
    <li><strong>SEP IRA:</strong> Contribute up to 25% of net self-employment income (max $69,000)</li>
    <li><strong>Health Insurance Deduction:</strong> Deduct 100% of premiums for you, spouse, and dependents</li>
    <li><strong>Home Office Deduction:</strong> Deduct a portion of rent/mortgage, utilities, and internet</li>
    <li><strong>QBI Deduction:</strong> Many self-employed qualify for a 20% deduction on qualified business income</li>
    <li><strong>Track All Expenses:</strong> Every legitimate business expense reduces both income tax and SE tax</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Safe Harbor Rule</h4>
  <p>
    To avoid underpayment penalties, you must pay either <strong>90% of your current year tax</strong> or 
    <strong>100% of your prior year tax</strong> (110% if AGI exceeds $150,000). This calculator shows both 
    safe harbor amounts so you can choose the lower quarterly payment. You can <strong>bookmark this page</strong> 
    to save your calculation or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/self-employment-tax-calculator.js"></script>

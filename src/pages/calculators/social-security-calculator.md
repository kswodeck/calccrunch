---
layout: ../../layouts/CalculatorLayout.astro
calcType: social-security
---

## How to Use This Calculator

### 1. Enter Your Information
1. Enter your **current age** and **birth year**
2. Input your **average annual earnings** (or current salary as a proxy)
3. Enter the number of **years worked** that count toward Social Security
4. Set your **expected retirement age** (when you'll stop working)

### 2. Choose Your Claiming Strategy
5. Select your **planned claiming age** (between 62 and 70)
6. Choose your **marital status** for spousal benefit calculations
7. If married, enter your **spouse's benefit** and claiming age

### 3. Fine-Tune Your Estimate
8. Adjust the expected annual **COLA** (cost-of-living adjustment)
9. Set your **life expectancy** estimate for breakeven analysis
10. Indicate if you'll **continue working** while claiming benefits

Click **Calculate** to see your optimized Social Security strategy!

<div class="calculator-form" id="social-security-calculator-form">
  <div class="form-section">
    <h3>Personal Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="current-age">
          Current Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="current-age" 
            class="form-input"
            placeholder="55"
            value="55"
            min="22"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Your age today</small>
      </div>
      <div class="form-group">
        <label for="birth-year">
          Birth Year <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="birth-year" 
            class="form-input"
            placeholder="1970"
            value="1970"
            min="1930"
            max="2010"
            required
          />
          <span class="input-addon">year</span>
        </div>
        <small class="form-help">Used to determine your Full Retirement Age</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="average-earnings">
          Average Annual Earnings <span class="required">*</span>
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="average-earnings" 
            class="form-input"
            placeholder="75000"
            value="75000"
            min="0"
            step="1000"
            required
          />
        </div>
        <small class="form-help">Your average annual salary (or current salary as proxy)</small>
      </div>
      <div class="form-group">
        <label for="years-worked">
          Years Worked <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="years-worked" 
            class="form-input"
            placeholder="30"
            value="30"
            min="0"
            max="50"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Years of Social Security-covered employment</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Claiming Strategy</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="expected-retirement-age">
          Expected Retirement Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="expected-retirement-age" 
            class="form-input"
            placeholder="65"
            value="65"
            min="55"
            max="75"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">When you plan to stop working</small>
      </div>
      <div class="form-group">
        <label for="claiming-age">
          Planned Claiming Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="claiming-age" 
            class="form-input"
            placeholder="67"
            value="67"
            min="62"
            max="70"
            step="1"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">Age you plan to start benefits (62-70)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Marital & Spousal Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="marital-status">
          Marital Status <span class="required">*</span>
        </label>
        <select id="marital-status" class="form-select" required>
          <option value="single" selected>Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced (10+ years)</option>
          <option value="widowed">Widowed</option>
        </select>
        <small class="form-help">Affects spousal benefit eligibility</small>
      </div>
    </div>
    <div class="form-row" id="spouse-fields" style="display: none;">
      <div class="form-group">
        <label for="spouse-benefit">
          Spouse's Monthly Benefit at FRA
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="spouse-benefit" 
            class="form-input"
            placeholder="2000"
            value="2000"
            min="0"
            step="50"
          />
        </div>
        <small class="form-help">Spouse's benefit amount at their Full Retirement Age</small>
      </div>
      <div class="form-group">
        <label for="spouse-claiming-age">
          Spouse's Claiming Age
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="spouse-claiming-age" 
            class="form-input"
            placeholder="67"
            value="67"
            min="62"
            max="70"
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">When your spouse plans to claim (62-70)</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Adjustments & Assumptions</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="cola-rate">
          Expected Annual COLA <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="cola-rate" 
            class="form-input"
            placeholder="2.5"
            value="2.5"
            min="0"
            max="10"
            step="0.1"
            required
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Cost-of-living adjustment (historical avg ~2.5%)</small>
      </div>
      <div class="form-group">
        <label for="life-expectancy">
          Life Expectancy <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="life-expectancy" 
            class="form-input"
            placeholder="85"
            value="85"
            min="62"
            max="110"
            required
          />
          <span class="input-addon">years</span>
        </div>
        <small class="form-help">For breakeven analysis (avg male 76, female 81)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="working-while-claiming">
          Will You Work While Claiming?
        </label>
        <select id="working-while-claiming" class="form-select">
          <option value="no" selected>No</option>
          <option value="yes">Yes</option>
        </select>
        <small class="form-help">Earnings test applies if claiming before FRA</small>
      </div>
      <div class="form-group" id="earnings-field" style="display: none;">
        <label for="earnings-while-claiming">
          Annual Earnings While Claiming
        </label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input 
            type="number" 
            id="earnings-while-claiming" 
            class="form-input"
            placeholder="30000"
            value="30000"
            min="0"
            step="1000"
          />
        </div>
        <small class="form-help">Your expected earnings if working while claiming</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Social Security Benefits
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

<div id="social-security-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>Understanding Social Security Benefits</h4>
  <p>
    Social Security retirement benefits are based on your <strong>35 highest-earning years</strong>. 
    The Social Security Administration calculates your Average Indexed Monthly Earnings (AIME) and applies 
    a formula to determine your Primary Insurance Amount (PIA) - the benefit you receive at your Full Retirement Age (FRA).
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Minimum claiming age:</strong> 62 (with reduced benefits)</li>
    <li><strong>Full Retirement Age:</strong> 66-67 depending on birth year</li>
    <li><strong>Maximum delayed credits:</strong> Age 70 (no benefit to waiting past 70)</li>
    <li><strong>You need 40 credits (10 years)</strong> of work to qualify for benefits</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>Claiming Age Strategy</h4>
  <p>
    Your claiming age dramatically affects your monthly benefit:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Claim at 62:</strong> Permanently reduced by up to 30% from FRA benefit</li>
    <li><strong>Claim at FRA (66-67):</strong> Receive 100% of your calculated PIA</li>
    <li><strong>Claim at 70:</strong> Receive 124-132% of your PIA (8% per year of delay past FRA)</li>
    <li><strong>Breakeven point:</strong> Typically around age 78-82 when comparing early vs. delayed claiming</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Key insight:</strong> Waiting from 62 to 70 increases your monthly benefit by approximately 76%.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>Spousal Benefits</h4>
  <p>
    If you're married, divorced (after 10+ years), or widowed, you may be eligible for spousal benefits:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Spousal benefit:</strong> Up to 50% of your spouse's PIA at your FRA</li>
    <li><strong>Reduced if claimed early:</strong> Spousal benefits are reduced if you claim before your FRA</li>
    <li><strong>Ex-spouse benefits:</strong> Available if married 10+ years and currently unmarried</li>
    <li><strong>Survivor benefits:</strong> Up to 100% of deceased spouse's benefit</li>
    <li><strong>You receive the higher of</strong> your own benefit or your spousal benefit (not both)</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-primary-blue);">
  <h4>Earnings Test (Working While Claiming)</h4>
  <p>
    If you claim benefits before your Full Retirement Age and continue working:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Before FRA year:</strong> $1 withheld for every $2 earned above $22,320 (2024 limit)</li>
    <li><strong>Year you reach FRA:</strong> $1 withheld for every $3 earned above $59,520 (2024 limit)</li>
    <li><strong>After reaching FRA:</strong> No earnings test - earn as much as you want with no reduction</li>
    <li><strong>Important:</strong> Withheld benefits are not lost - they increase your benefit amount after FRA</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>Important Disclaimers</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>This calculator provides <strong>estimates only</strong> and should not replace your official SSA statement</li>
    <li>Actual benefits depend on your complete earnings history indexed for inflation</li>
    <li>Bend points and earnings limits are updated annually</li>
    <li>Social Security rules are complex - consider consulting a financial advisor</li>
    <li>The Social Security trust fund faces long-term funding challenges that may affect future benefits</li>
    <li>Create a <strong>my Social Security</strong> account at ssa.gov for your official benefit estimate</li>
  </ul>
</div>

<style>
  /* Social Security Calculator Specific Styles */
  .ss-benefit-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .ss-benefit-card {
    background: var(--color-white);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  .ss-benefit-card.highlight {
    border-color: var(--color-primary-blue);
    background: var(--color-highlight-blue);
  }

  .ss-benefit-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ss-benefit-card .amount {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary-blue);
    margin: 0.5rem 0;
  }

  .ss-benefit-card .detail {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }

  .ss-comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .ss-comparison-table thead {
    background: var(--color-surface-neutral);
  }

  .ss-comparison-table th,
  .ss-comparison-table td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
  }

  .ss-comparison-table th:first-child,
  .ss-comparison-table td:first-child {
    text-align: left;
  }

  .ss-comparison-table .selected-row {
    background: var(--color-highlight-blue);
    font-weight: bold;
  }

  .ss-comparison-table .optimal-row {
    background: var(--color-highlight-green);
  }

  .breakeven-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .breakeven-chart {
    width: 100%;
    height: 300px;
    margin: 1rem 0;
  }

  .cola-projection-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .cola-projection-table thead {
    background: var(--color-surface-neutral);
  }

  .cola-projection-table th,
  .cola-projection-table td {
    padding: 0.6rem 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.9rem;
  }

  .cola-projection-table th:first-child,
  .cola-projection-table td:first-child {
    text-align: left;
  }

  .recommendation-box {
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid var(--color-primary-blue);
    background: var(--color-highlight-blue);
  }

  .recommendation-box h4 {
    margin: 0 0 0.75rem 0;
    color: var(--color-primary-blue);
  }

  .recommendation-box p {
    margin: 0.5rem 0;
    color: var(--color-gray-dark);
  }

  .earnings-test-result {
    margin: 1.5rem 0;
    padding: 1.25rem;
    background: var(--color-highlight-yellow);
    border-radius: 8px;
    border-left: 4px solid var(--color-warning);
  }

  .spousal-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .cumulative-chart {
    width: 100%;
    overflow-x: auto;
  }

  .cumulative-chart svg {
    width: 100%;
    height: auto;
    min-height: 250px;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .legend-swatch {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }

  .table-container {
    overflow-x: auto;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    .ss-benefit-summary {
      grid-template-columns: 1fr;
    }

    .ss-benefit-card .amount {
      font-size: 1.5rem;
    }

    .ss-comparison-table th,
    .ss-comparison-table td {
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }

  @media print {
    .btn, button {
      display: none !important;
    }
    
    .form-actions {
      display: none;
    }
    
    .calculator-form {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/social-security-calculator.js"></script>

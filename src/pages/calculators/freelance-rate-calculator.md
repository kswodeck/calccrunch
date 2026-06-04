---
layout: ../../layouts/CalculatorLayout.astro
calcType: freelance-rate
title: Freelance Rate Calculator
description: Calculate your ideal freelance hourly rate to meet income goals after accounting for taxes, benefits, expenses, and non-billable time.
---

## How to Use This Calculator

1. **Enter your desired annual take-home income** (what you want in your pocket after taxes)
2. **Select your tax region and filing status** for estimated tax calculations
3. **Add business expenses** — software, equipment, office, marketing, insurance, etc.
4. **Set your benefits** — health insurance premiums and retirement savings goals
5. **Configure your schedule** — vacation, sick days, holidays, and hours per week
6. **Set your billable utilization rate** — the percentage of working hours you actually bill clients
7. Click **Calculate My Rate** to see your minimum hourly rate plus a full rate card

<div class="calculator-form" id="freelance-rate-calculator-form">
  <div class="form-section">
    <h3>Income Goal</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="desired-income">Desired Annual Take-Home Income <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="desired-income" class="form-input" placeholder="75000" value="75000" min="0" step="1000" required />
        </div>
        <small class="form-help">What you want to actually keep after taxes and expenses</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Tax Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="tax-region">Country / Tax Region</label>
        <select id="tax-region" class="form-select">
          <option value="us" selected>United States</option>
          <option value="us-ca">United States (California)</option>
          <option value="us-ny">United States (New York)</option>
          <option value="us-tx">United States (Texas - no state tax)</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="other">Other (manual rate)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="filing-status">Filing Status</label>
        <select id="filing-status" class="form-select">
          <option value="single" selected>Single</option>
          <option value="mfj">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
          <option value="hoh">Head of Household</option>
        </select>
      </div>
    </div>
    <div class="form-row" id="manual-tax-row" style="display:none;">
      <div class="form-group">
        <label for="manual-tax-rate">Estimated Total Tax Rate</label>
        <div class="input-group">
          <input type="number" id="manual-tax-rate" class="form-input" placeholder="30" value="30" min="0" max="60" step="1" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Combined income tax + self-employment tax rate</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Business Expenses (Annual)</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="expense-software">Software & Subscriptions</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-software" class="form-input" placeholder="2400" value="2400" min="0" step="100" />
        </div>
        <small class="form-help">Design tools, project management, cloud services</small>
      </div>
      <div class="form-group">
        <label for="expense-equipment">Equipment & Tools</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-equipment" class="form-input" placeholder="2000" value="2000" min="0" step="100" />
        </div>
        <small class="form-help">Computer, peripherals, specialized gear</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expense-office">Office / Coworking Space</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-office" class="form-input" placeholder="3600" value="3600" min="0" step="100" />
        </div>
        <small class="form-help">Rent, coworking membership, or home office costs</small>
      </div>
      <div class="form-group">
        <label for="expense-marketing">Marketing & Advertising</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-marketing" class="form-input" placeholder="1200" value="1200" min="0" step="100" />
        </div>
        <small class="form-help">Website, ads, portfolio hosting, networking</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expense-development">Professional Development</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-development" class="form-input" placeholder="1500" value="1500" min="0" step="100" />
        </div>
        <small class="form-help">Courses, conferences, books, certifications</small>
      </div>
      <div class="form-group">
        <label for="expense-insurance">Business Insurance</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-insurance" class="form-input" placeholder="1200" value="1200" min="0" step="100" />
        </div>
        <small class="form-help">Liability, errors & omissions (E&O)</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expense-other">Other Business Expenses</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="expense-other" class="form-input" placeholder="1000" value="1000" min="0" step="100" />
        </div>
        <small class="form-help">Legal, accounting, travel, miscellaneous</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Benefits</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="health-insurance">Health Insurance (Monthly Premium)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="health-insurance" class="form-input" placeholder="500" value="500" min="0" step="25" />
          <span class="input-addon">/mo</span>
        </div>
        <small class="form-help">Individual marketplace or private plan cost</small>
      </div>
      <div class="form-group">
        <label for="retirement-pct">Retirement Savings Goal</label>
        <div class="input-group">
          <input type="number" id="retirement-pct" class="form-input" placeholder="15" value="15" min="0" max="50" step="1" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Percentage of gross income for SEP-IRA, Solo 401(k), etc.</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Schedule & Time Off</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="vacation-days">Vacation Days per Year</label>
        <div class="input-group">
          <input type="number" id="vacation-days" class="form-input" placeholder="15" value="15" min="0" max="60" step="1" />
          <span class="input-addon">days</span>
        </div>
      </div>
      <div class="form-group">
        <label for="sick-days">Sick / Personal Days per Year</label>
        <div class="input-group">
          <input type="number" id="sick-days" class="form-input" placeholder="5" value="5" min="0" max="30" step="1" />
          <span class="input-addon">days</span>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="holidays">Holidays Observed</label>
        <div class="input-group">
          <input type="number" id="holidays" class="form-input" placeholder="10" value="10" min="0" max="20" step="1" />
          <span class="input-addon">days</span>
        </div>
      </div>
      <div class="form-group">
        <label for="hours-per-week">Hours Worked per Week</label>
        <div class="input-group">
          <input type="number" id="hours-per-week" class="form-input" placeholder="40" value="40" min="10" max="80" step="1" />
          <span class="input-addon">hrs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Billable Utilization</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="utilization-rate">Billable Utilization Rate</label>
        <div class="input-group">
          <input type="number" id="utilization-rate" class="form-input" placeholder="65" value="65" min="20" max="95" step="5" />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">Percentage of working hours spent on billable client work. Most freelancers achieve 60-70%.</small>
      </div>
    </div>
    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--color-gray-dark);">
      <strong>Non-billable hours breakdown (typical):</strong> Admin &amp; invoicing (~10%), Marketing &amp; sales (~10%), Learning &amp; skill development (~10%), Bookkeeping &amp; finances (~5%)
    </p>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate My Rate →
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

<div id="freelance-rate-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>💡 Freelance Pricing Strategies</h4>
  <p>
    <strong>Hourly billing</strong> is straightforward but caps your income. As you gain experience, consider 
    <strong>value-based pricing</strong> — charging based on the value you deliver to clients rather than time spent. 
    A logo that takes 4 hours but generates millions in brand value is worth more than 4× your hourly rate.
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Hourly:</strong> Best for ongoing/maintenance work with unclear scope</li>
    <li><strong>Project-based:</strong> Best when scope is clear and you work efficiently</li>
    <li><strong>Retainer:</strong> Best for stable monthly income with recurring clients</li>
    <li><strong>Value-based:</strong> Best for high-impact projects where ROI is measurable</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Common Freelance Pricing Mistakes</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Forgetting taxes:</strong> Self-employment tax alone is 15.3% — plus income tax on top</li>
    <li><strong>Ignoring non-billable time:</strong> You can't bill for admin, invoicing, marketing, and sales</li>
    <li><strong>No benefits buffer:</strong> Health insurance + retirement can add $15,000-$25,000/year</li>
    <li><strong>Comparing to employee salaries:</strong> A $75/hr freelance rate ≠ $150K salary after accounting for benefits, paid time off, and employer tax contributions</li>
    <li><strong>Racing to the bottom:</strong> Competing on price attracts bad clients and leads to burnout</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🤝 Rate Negotiation Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Never give a rate immediately</strong> — ask about the project scope, timeline, and budget first</li>
    <li><strong>Quote a range:</strong> "For this type of work, my rates are typically $X-$Y/hour depending on complexity"</li>
    <li><strong>Offer rate tiers:</strong> Economy (basic deliverables), Standard (full service), Premium (priority + extras)</li>
    <li><strong>Anchor high:</strong> Start with your premium rate so negotiations land closer to your standard rate</li>
    <li><strong>Raise rates 10-15% annually</strong> — existing clients expect incremental increases</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/freelance-rate-calculator.js"></script>

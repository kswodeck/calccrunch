---
layout: ../../layouts/CalculatorLayout.astro
calcType: startup-cost
---

## How to Use This Calculator

1. Select your **business type** to auto-fill typical cost ranges
2. Enter your **one-time startup costs** (legal, equipment, buildout, etc.)
3. Enter your **monthly recurring costs** (rent, payroll, marketing, etc.)
4. Add **revenue projections** for months 1, 6, and 12
5. Set your **available funding** and desired runway
6. Click **Calculate** to see total costs, runway, and cash flow projections

<div class="calculator-form" id="startup-cost-calculator-form">
  <div class="form-section">
    <h3>Business Type</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="business-type">Type of Business <span class="required">*</span></label>
        <select id="business-type" class="form-select">
          <option value="saas">Online / SaaS Business</option>
          <option value="service">Service-Based Business</option>
          <option value="retail">Retail / Brick-and-Mortar</option>
          <option value="restaurant">Food / Restaurant</option>
          <option value="ecommerce">E-commerce (Physical Products)</option>
          <option value="freelance">Freelance / Consulting</option>
          <option value="app">Mobile App</option>
        </select>
        <small class="form-help">Selecting a type will pre-fill suggested costs</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>One-Time Startup Costs</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="cost-legal">Legal Formation (LLC/Corp Filing)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-legal" class="form-input" placeholder="500" value="500" min="0" step="50" />
        </div>
        <small class="form-help">$100-$1,500 depending on structure</small>
      </div>
      <div class="form-group">
        <label for="cost-licenses">Licenses & Permits</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-licenses" class="form-input" placeholder="300" value="300" min="0" step="50" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="cost-branding">Branding & Logo Design</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-branding" class="form-input" placeholder="1000" value="1000" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="cost-website">Website Development</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-website" class="form-input" placeholder="3000" value="3000" min="0" step="100" />
        </div>
      </div>
    </div>
    <div class="form-row" id="row-inventory">
      <div class="form-group">
        <label for="cost-inventory">Initial Inventory / Stock</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-inventory" class="form-input" placeholder="5000" value="0" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="cost-equipment">Equipment & Furniture</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-equipment" class="form-input" placeholder="5000" value="2000" min="0" step="100" />
        </div>
      </div>
    </div>
    <div class="form-row" id="row-lease-deposit">
      <div class="form-group">
        <label for="cost-lease-deposit">Lease Deposit (First/Last + Security)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-lease-deposit" class="form-input" placeholder="6000" value="0" min="0" step="100" />
        </div>
        <small class="form-help">Typically 2-3 months rent</small>
      </div>
      <div class="form-group" id="group-renovations">
        <label for="cost-renovations">Renovations / Buildout</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-renovations" class="form-input" placeholder="15000" value="0" min="0" step="500" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="cost-marketing-launch">Initial Marketing Launch</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-marketing-launch" class="form-input" placeholder="2000" value="2000" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="cost-professional">Professional Services (Lawyer, Accountant)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-professional" class="form-input" placeholder="2000" value="1500" min="0" step="100" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="cost-technology">Technology Setup (Computers, Software)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-technology" class="form-input" placeholder="3000" value="2000" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="cost-insurance-annual">Insurance (First Year Premium)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="cost-insurance-annual" class="form-input" placeholder="2000" value="1200" min="0" step="100" />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Monthly Recurring Costs</h3>
    <div class="form-row" id="row-rent">
      <div class="form-group">
        <label for="monthly-rent">Rent / Lease</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-rent" class="form-input" placeholder="2000" value="0" min="0" step="100" />
        </div>
      </div>
      <div class="form-group" id="group-utilities">
        <label for="monthly-utilities">Utilities</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-utilities" class="form-input" placeholder="300" value="0" min="0" step="50" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="num-employees">Number of Employees</label>
        <div class="input-group">
          <input type="number" id="num-employees" class="form-input" placeholder="0" value="0" min="0" step="1" />
          <span class="input-addon">people</span>
        </div>
      </div>
      <div class="form-group">
        <label for="avg-salary">Average Monthly Salary</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="avg-salary" class="form-input" placeholder="4000" value="4000" min="0" step="100" />
        </div>
        <small class="form-help">Payroll = employees x salary</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-contractors">Contractor / Freelancer Costs</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-contractors" class="form-input" placeholder="1000" value="0" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="monthly-software">Software Subscriptions</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-software" class="form-input" placeholder="200" value="200" min="0" step="50" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-marketing">Marketing / Advertising</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-marketing" class="form-input" placeholder="1000" value="500" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="monthly-insurance">Insurance (Monthly)</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-insurance" class="form-input" placeholder="200" value="100" min="0" step="50" />
        </div>
      </div>
    </div>
    <div class="form-row" id="row-supplies">
      <div class="form-group">
        <label for="monthly-supplies">Supplies / Materials</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-supplies" class="form-input" placeholder="500" value="0" min="0" step="50" />
        </div>
      </div>
      <div class="form-group">
        <label for="monthly-phone">Phone / Internet</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-phone" class="form-input" placeholder="150" value="100" min="0" step="25" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-accounting">Accounting / Bookkeeping</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-accounting" class="form-input" placeholder="300" value="200" min="0" step="50" />
        </div>
      </div>
      <div class="form-group">
        <label for="monthly-loans">Loan Payments</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-loans" class="form-input" placeholder="0" value="0" min="0" step="100" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="monthly-owner-salary">Owner's Salary / Draw</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-owner-salary" class="form-input" placeholder="4000" value="3000" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="monthly-misc">Miscellaneous / Buffer</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="monthly-misc" class="form-input" placeholder="500" value="500" min="0" step="50" />
        </div>
        <small class="form-help">10-20% buffer recommended</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Revenue Projections</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="revenue-month1">Expected Revenue at Month 1</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="revenue-month1" class="form-input" placeholder="0" value="0" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="revenue-month6">Expected Revenue at Month 6</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="revenue-month6" class="form-input" placeholder="3000" value="3000" min="0" step="100" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="revenue-month12">Expected Revenue at Month 12</label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="revenue-month12" class="form-input" placeholder="8000" value="8000" min="0" step="100" />
        </div>
      </div>
      <div class="form-group">
        <label for="revenue-growth">Revenue Growth Model</label>
        <select id="revenue-growth" class="form-select">
          <option value="linear">Linear Growth</option>
          <option value="exponential">Exponential Growth</option>
        </select>
        <small class="form-help">How revenue scales between projections</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Runway Planning</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="available-funding">Available Funding / Savings <span class="required">*</span></label>
        <div class="input-group">
          <span class="input-addon">$</span>
          <input type="number" id="available-funding" class="form-input" placeholder="50000" value="50000" min="0" step="1000" required />
        </div>
        <small class="form-help">Total cash available to start the business</small>
      </div>
      <div class="form-group">
        <label for="desired-runway">Desired Runway</label>
        <div class="input-group">
          <input type="number" id="desired-runway" class="form-input" placeholder="12" value="12" min="3" max="36" step="1" />
          <span class="input-addon">months</span>
        </div>
        <small class="form-help">12-18 months recommended</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Startup Costs →
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

<div id="startup-cost-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>💰 Startup Funding Basics</h4>
  <p>
    <strong>Total startup funding</strong> should cover all one-time costs plus enough monthly operating capital 
    to sustain the business until it becomes profitable. Most experts recommend having 12-18 months of runway 
    before needing additional funding or reaching profitability.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>📊 Runway Planning Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Gross Burn Rate:</strong> Total monthly spending before any revenue</li>
    <li><strong>Net Burn Rate:</strong> Monthly spending minus monthly revenue</li>
    <li><strong>Runway:</strong> Available cash divided by net burn rate</li>
    <li><strong>Rule of thumb:</strong> Double your estimated costs and halve your projected revenue</li>
    <li><strong>Seed stage:</strong> Plan for 18-24 months runway minimum</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>⚠️ Common Cost Mistakes</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Underestimating timeline:</strong> Revenue almost always takes longer than expected</li>
    <li><strong>Forgetting hidden costs:</strong> Taxes, benefits, maintenance, transaction fees</li>
    <li><strong>No buffer:</strong> Unexpected expenses always arise — add 15-25% contingency</li>
    <li><strong>Ignoring opportunity cost:</strong> Your salary/draw is a real business expense</li>
    <li><strong>Over-spending on launch:</strong> Start lean, validate, then scale spending</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others.
  </p>
</div>

<script src="/scripts/calculators/startup-cost-calculator.js"></script>

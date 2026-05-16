---
layout: ../../layouts/CalculatorLayout.astro
calcType: home-improvement
---

## How to Use This Calculator

1. **Select your project type** - Choose from kitchen, bathroom, flooring, roofing, and more
2. **Enter room/area dimensions** - Provide square footage or room size
3. **Choose quality level** - Budget, mid-range, or high-end materials and finishes
4. **Set your region** - Adjust for local cost of living differences
5. Click **Estimate Cost** to see itemized breakdown, DIY savings, ROI, and timeline

<div class="calculator-form" id="home-improvement-calculator-form">
  <div class="form-section">
    <h3>Project Type</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="project-type">
          Project Type <span class="required">*</span>
          <span class="tooltip" title="Select the type of home improvement project">?</span>
        </label>
        <select id="project-type" class="form-select" required>
          <option value="">-- Select Project --</option>
          <option value="kitchen">Kitchen Remodel</option>
          <option value="bathroom">Bathroom Remodel</option>
          <option value="flooring">Flooring</option>
          <option value="roofing">Roofing</option>
          <option value="painting">Interior/Exterior Painting</option>
          <option value="deck">Deck / Patio</option>
          <option value="windows">Windows Replacement</option>
          <option value="hvac">HVAC System</option>
          <option value="landscaping">Landscaping</option>
        </select>
        <small class="form-help">Different projects have different cost structures</small>
      </div>
    </div>
  </div>

  <div class="form-section" id="sub-options-section" style="display: none;">
    <h3>Project Details</h3>
    <div id="sub-options-container">
      <!-- Dynamic sub-options loaded based on project type -->
    </div>
  </div>

  <div class="form-section">
    <h3>Area / Size</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="square-footage">
          Square Footage <span class="required">*</span>
          <span class="tooltip" title="Total area of the project in square feet">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="square-footage" 
            class="form-input"
            placeholder="200"
            value=""
            min="1"
            max="100000"
            step="1"
            required
          />
          <span class="input-addon">sq ft</span>
        </div>
        <small class="form-help" id="sqft-help">Total project area</small>
      </div>
      <div class="form-group" id="room-count-group" style="display: none;">
        <label for="room-count">
          Number of Rooms/Units
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="room-count" 
            class="form-input"
            placeholder="1"
            value="1"
            min="1"
            max="50"
            step="1"
          />
          <span class="input-addon" id="room-addon">rooms</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Quality & Budget Level</h3>
    <div class="quality-selector">
      <button type="button" class="quality-btn" data-quality="budget">
        <span class="quality-icon">💲</span>
        <span class="quality-label">Budget</span>
        <span class="quality-desc">Basic materials, functional</span>
      </button>
      <button type="button" class="quality-btn active" data-quality="mid-range">
        <span class="quality-icon">💲💲</span>
        <span class="quality-label">Mid-Range</span>
        <span class="quality-desc">Standard materials, nice finishes</span>
      </button>
      <button type="button" class="quality-btn" data-quality="high-end">
        <span class="quality-icon">💲💲💲</span>
        <span class="quality-label">High-End</span>
        <span class="quality-desc">Premium materials, luxury finishes</span>
      </button>
    </div>
  </div>

  <div class="form-section">
    <h3>Location & Labor</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="region-multiplier">
          Region / Cost of Living
          <span class="tooltip" title="Adjusts costs based on local market rates">?</span>
        </label>
        <select id="region-multiplier" class="form-select">
          <option value="0.80">Low COL (Rural / Small Town)</option>
          <option value="0.90">Below Average COL</option>
          <option value="1.00" selected>Average COL (National Average)</option>
          <option value="1.15">Above Average COL</option>
          <option value="1.30">High COL (Major Metro)</option>
          <option value="1.50">Very High COL (NYC, SF, etc.)</option>
        </select>
        <small class="form-help">Adjusts both materials and labor costs</small>
      </div>
      <div class="form-group">
        <label for="diy-toggle">
          DIY vs Professional
          <span class="tooltip" title="Choose whether you'll do the work yourself or hire professionals">?</span>
        </label>
        <select id="diy-toggle" class="form-select">
          <option value="professional">Hire Professionals</option>
          <option value="diy">DIY (Do It Yourself)</option>
          <option value="hybrid">Hybrid (DIY + Some Pro Help)</option>
        </select>
        <small class="form-help">DIY saves on labor but takes more time</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Additional Options</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="contingency-pct">
          Contingency Budget
          <span class="tooltip" title="Extra budget for unexpected costs (recommended 10-20%)">?</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="contingency-pct" 
            class="form-input"
            placeholder="15"
            value="15"
            min="0"
            max="50"
            step="1"
          />
          <span class="input-addon">%</span>
        </div>
        <small class="form-help">10-20% recommended for unexpected costs</small>
      </div>
      <div class="form-group">
        <label for="permit-needed">
          Permits Required?
        </label>
        <select id="permit-needed" class="form-select">
          <option value="yes">Yes - Include permit costs</option>
          <option value="no">No permits needed</option>
          <option value="unsure">Unsure</option>
        </select>
        <small class="form-help">Most structural/electrical work needs permits</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Estimate Cost →
  </button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
  </div>
</div>

<div id="home-improvement-result" class="calculator-result hidden">
</div>

<div class="info-box">
  <h4>🏠 Home Improvement Cost Factors</h4>
  <p>Home improvement costs vary significantly based on several factors:</p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Location:</strong> Labor and material costs vary by 30-60% between regions</li>
    <li><strong>Scope:</strong> Full remodels cost more per sq ft than cosmetic updates</li>
    <li><strong>Quality:</strong> High-end materials can be 3-5x the cost of budget options</li>
    <li><strong>Timing:</strong> Peak season (spring/summer) may cost 10-15% more</li>
    <li><strong>Existing conditions:</strong> Older homes may have hidden issues that add cost</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>💰 Best ROI Home Improvements</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Garage door replacement:</strong> ~95% ROI</li>
    <li><strong>Manufactured stone veneer:</strong> ~92% ROI</li>
    <li><strong>Minor kitchen remodel:</strong> ~72% ROI</li>
    <li><strong>Siding replacement (fiber cement):</strong> ~69% ROI</li>
    <li><strong>Window replacement (vinyl):</strong> ~68% ROI</li>
    <li><strong>Deck addition (wood):</strong> ~65% ROI</li>
    <li><strong>Bathroom remodel (midrange):</strong> ~60% ROI</li>
    <li><strong>Roofing replacement:</strong> ~60% ROI</li>
    <li><strong>Major kitchen remodel:</strong> ~54% ROI</li>
    <li><strong>Master suite addition:</strong> ~48% ROI</li>
  </ul>
  <p style="font-size: 0.85rem; color: var(--color-gray-dark); margin-top: 0.5rem;">Source: Remodeling Magazine Cost vs. Value Report</p>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>🔨 DIY vs. Professional Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Good for DIY:</strong> Painting, simple flooring, landscaping, minor plumbing fixtures</li>
    <li><strong>Consider Pro:</strong> Electrical work, plumbing beyond fixtures, structural changes</li>
    <li><strong>Always hire a Pro:</strong> Gas lines, load-bearing walls, roofing, HVAC, asbestos/lead</li>
    <li><strong>Time factor:</strong> DIY projects typically take 3-5x longer than professional work</li>
    <li><strong>Permits:</strong> Some jurisdictions require licensed contractors for permitted work</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-red); border-left-color: var(--color-error);">
  <h4>⚠️ Important Disclaimers</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>These are estimates only - actual costs may vary significantly</li>
    <li>Always get 3+ quotes from licensed contractors before starting work</li>
    <li>Hidden issues (mold, structural damage, asbestos) can dramatically increase costs</li>
    <li>Permit costs and requirements vary by municipality</li>
    <li>Supply chain disruptions can affect material availability and pricing</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>🔗 Save & Share</h4>
  <p>
    Your estimate is saved in the URL. <strong>Bookmark this page</strong> or use the <strong>Share button</strong> to revisit or share your project estimate.
  </p>
</div>

<style>
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }

  .quality-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .quality-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-lg);
    border: 2px solid var(--color-gray);
    background: var(--color-white);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }

  .quality-btn:hover {
    border-color: var(--color-accent-orange);
    background: var(--color-highlight-orange-alt);
    transform: translateY(-2px);
  }

  .quality-btn.active {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #fff8f5, #ffe8d6);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
  }

  .quality-icon {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .quality-label {
    font-weight: 700;
    font-size: var(--text-sm);
    color: var(--color-gray-dark);
  }

  .quality-desc {
    font-size: var(--text-xs);
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
  }

  .sub-option-row {
    margin-bottom: 1rem;
  }

  .sub-option-row label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: var(--text-sm);
  }

  @media (max-width: 768px) {
    .quality-selector {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions button {
      width: 100%;
    }
  }
</style>

<script src="/scripts/calculators/home-improvement-cost-calculator.js"></script>

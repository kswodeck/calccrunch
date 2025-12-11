---
layout: ../../layouts/CalculatorLayout.astro
calcType: body-fat
---

## How to Use This Calculator

1. Select your **measurement system** (Imperial or Metric)
2. Enter your **age**, **gender**, **height**, and **weight**
3. Choose your **calculation method** (Navy, 3-site, or 7-site)
4. Input required **body measurements** based on selected method
5. Click **Calculate** to see your body fat percentage and composition
6. **Share or bookmark** your results - the URL automatically saves all inputs!

<div class="calculator-form" id="body-fat-calculator-form">
  <div class="form-section">
    <h3>Measurement System</h3>
    <div class="unit-toggle">
      <button type="button" class="unit-btn active" data-system="imperial">Imperial (lb, in)</button>
      <button type="button" class="unit-btn" data-system="metric">Metric (kg, cm)</button>
    </div>
  </div>

  <div class="form-section">
    <h3>Basic Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="age">
          Age <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="age" 
            class="form-input"
            placeholder="30"
            value="30"
            min="15"
            max="100"
            required
          />
          <span class="input-addon">years</span>
        </div>
      </div>
      <div class="form-group">
        <label for="gender">
          Gender <span class="required">*</span>
        </label>
        <select id="gender" class="form-select" required>
          <option value="">Select gender</option>
          <option value="male" selected>Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section" id="imperial-inputs">
    <h3>Height & Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="height-feet">
          Height <span class="required">*</span>
        </label>
        <div class="height-input-group">
          <div class="input-group">
            <input 
              type="number" 
              id="height-feet" 
              class="form-input"
              placeholder="5"
              value="5"
              min="3"
              max="8"
              required
            />
            <span class="input-addon">ft</span>
          </div>
          <div class="input-group">
            <input 
              type="number" 
              id="height-inches" 
              class="form-input"
              placeholder="10"
              value="10"
              min="0"
              max="11"
              required
            />
            <span class="input-addon">in</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="weight-lbs">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-lbs" 
            class="form-input"
            placeholder="180"
            value="180"
            min="1"
            max="1000"
            step="0.5"
            required
          />
          <span class="input-addon">lbs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="metric-inputs">
    <h3>Height & Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="height-cm">
          Height <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="height-cm" 
            class="form-input"
            placeholder="178"
            value="178"
            min="100"
            max="250"
            required
          />
          <span class="input-addon">cm</span>
        </div>
      </div>
      <div class="form-group">
        <label for="weight-kg">
          Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="weight-kg" 
            class="form-input"
            placeholder="82"
            value="82"
            min="1"
            max="1000"
            step="0.1"
            required
          />
          <span class="input-addon">kg</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Calculation Method</h3>
    <div class="form-group">
      <label for="method">
        Select Method <span class="required">*</span>
      </label>
      <select id="method" class="form-select" required>
        <option value="navy" selected>U.S. Navy Method (Most Common)</option>
        <option value="3site">3-Site Skinfold Method</option>
        <option value="7site">7-Site Skinfold Method (Most Accurate)</option>
      </select>
      <small class="form-help" id="method-help">Navy method uses body measurements, skinfold methods require calipers</small>
    </div>
  </div>

  <div class="form-section" id="navy-measurements">
    <h3>Body Measurements</h3>
    <div class="info-box" style="margin-bottom: 1rem;">
      <strong>How to measure:</strong>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li><strong>Neck:</strong> Measure below the larynx, sloping slightly downward</li>
        <li><strong>Waist:</strong> Measure at the narrowest point (men: at navel, women: natural waist)</li>
        <li><strong>Hips (women):</strong> Measure at the widest point</li>
      </ul>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="neck-imperial">
          Neck Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="neck-imperial" 
            class="form-input"
            placeholder="16"
            value="16"
            min="1"
            max="50"
            step="0.25"
            required
          />
          <span class="input-addon">in</span>
        </div>
      </div>
      <div class="form-group">
        <label for="waist-imperial">
          Waist Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="waist-imperial" 
            class="form-input"
            placeholder="34"
            value="34"
            min="1"
            max="100"
            step="0.25"
            required
          />
          <span class="input-addon">in</span>
        </div>
      </div>
    </div>
    <div class="form-row" id="hip-row" style="display: none;">
      <div class="form-group">
        <label for="hip-imperial">
          Hip Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="hip-imperial" 
            class="form-input"
            placeholder="40"
            value="40"
            min="1"
            max="100"
            step="0.25"
          />
          <span class="input-addon">in</span>
        </div>
        <small class="form-help">Required for women only</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="navy-measurements-metric">
    <h3>Body Measurements</h3>
    <div class="info-box" style="margin-bottom: 1rem;">
      <strong>How to measure:</strong>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li><strong>Neck:</strong> Measure below the larynx, sloping slightly downward</li>
        <li><strong>Waist:</strong> Measure at the narrowest point (men: at navel, women: natural waist)</li>
        <li><strong>Hips (women):</strong> Measure at the widest point</li>
      </ul>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="neck-metric">
          Neck Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="neck-metric" 
            class="form-input"
            placeholder="40"
            value="40"
            min="1"
            max="100"
            step="0.5"
            required
          />
          <span class="input-addon">cm</span>
        </div>
      </div>
      <div class="form-group">
        <label for="waist-metric">
          Waist Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="waist-metric" 
            class="form-input"
            placeholder="86"
            value="86"
            min="1"
            max="1000"
            step="0.5"
            required
          />
          <span class="input-addon">cm</span>
        </div>
      </div>
    </div>
    <div class="form-row" id="hip-row-metric" style="display: none;">
      <div class="form-group">
        <label for="hip-metric">
          Hip Circumference <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="hip-metric" 
            class="form-input"
            placeholder="102"
            value="102"
            min="1"
            max="1000"
            step="0.5"
          />
          <span class="input-addon">cm</span>
        </div>
        <small class="form-help">Required for women only</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="skinfold-3site">
    <h3>3-Site Skinfold Measurements</h3>
    <div class="info-box" style="margin-bottom: 1rem;">
      <strong>Measurement sites:</strong>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li><strong>Men:</strong> Chest, Abdomen, Thigh</li>
        <li><strong>Women:</strong> Tricep, Suprailiac, Thigh</li>
      </ul>
    </div>
    <div class="form-row" id="male-3site">
      <div class="form-group">
        <label for="chest-fold">Chest (mm)</label>
        <input type="number" id="chest-fold" class="form-input" placeholder="12" value="12" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="abdomen-fold">Abdomen (mm)</label>
        <input type="number" id="abdomen-fold" class="form-input" placeholder="20" value="20" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="thigh-fold-male">Thigh (mm)</label>
        <input type="number" id="thigh-fold-male" class="form-input" placeholder="15" value="15" min="1" max="100" step="0.5"/>
      </div>
    </div>
    <div class="form-row hidden" id="female-3site">
      <div class="form-group">
        <label for="tricep-fold">Tricep (mm)</label>
        <input type="number" id="tricep-fold" class="form-input" placeholder="18" value="18" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="suprailiac-fold">Suprailiac (mm)</label>
        <input type="number" id="suprailiac-fold" class="form-input" placeholder="15" value="15" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="thigh-fold-female">Thigh (mm)</label>
        <input type="number" id="thigh-fold-female" class="form-input" placeholder="20" value="20" min="1" max="100" step="0.5"/>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="skinfold-7site">
    <h3>7-Site Skinfold Measurements</h3>
    <div class="info-box" style="margin-bottom: 1rem;">
      <strong>All measurements in millimeters (mm)</strong><br>
      <small>Take measurements on the right side of the body</small>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="chest-7">Chest</label>
        <input type="number" id="chest-7" class="form-input" placeholder="12" value="12" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="midaxillary">Midaxillary</label>
        <input type="number" id="midaxillary" class="form-input" placeholder="14" value="14" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="tricep-7">Tricep</label>
        <input type="number" id="tricep-7" class="form-input" placeholder="15" value="15" min="1" max="100" step="0.5"/>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="subscapular">Subscapular</label>
        <input type="number" id="subscapular" class="form-input" placeholder="13" value="13" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="abdomen-7">Abdomen</label>
        <input type="number" id="abdomen-7" class="form-input" placeholder="20" value="20" min="1" max="100" step="0.5"/>
      </div>
      <div class="form-group">
        <label for="suprailiac-7">Suprailiac</label>
        <input type="number" id="suprailiac-7" class="form-input" placeholder="15" value="15" min="1" max="100" step="0.5"/>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="thigh-7">Thigh</label>
        <input type="number" id="thigh-7" class="form-input" placeholder="18" value="18" min="1" max="100" step="0.5"/>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Body Fat →
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

<div id="body-fat-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>💪 Understanding Body Fat Percentage</h4>
  <p>
    Body fat percentage is the proportion of fat tissue in your body compared to total body mass. 
    It's a better indicator of fitness and health than weight alone, as it accounts for muscle mass 
    and body composition.
  </p>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>📊 Body Fat Categories</h4>
  <table style="width: 100%; margin: 10px 0;">
    <thead>
      <tr style="background: #FDE68A;">
        <th style="padding: 8px; text-align: left;">Category</th>
        <th style="padding: 8px;">Men</th>
        <th style="padding: 8px;">Women</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px;"><strong>Essential</strong></td>
        <td style="padding: 8px; text-align: center;">2-5%</td>
        <td style="padding: 8px; text-align: center;">10-13%</td>
      </tr>
      <tr style="background: #FEF8E2;">
        <td style="padding: 8px;"><strong>Athletes</strong></td>
        <td style="padding: 8px; text-align: center;">6-13%</td>
        <td style="padding: 8px; text-align: center;">14-20%</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Fitness</strong></td>
        <td style="padding: 8px; text-align: center;">14-17%</td>
        <td style="padding: 8px; text-align: center;">21-24%</td>
      </tr>
      <tr style="background: #FEF8E2;">
        <td style="padding: 8px;"><strong>Average</strong></td>
        <td style="padding: 8px; text-align: center;">18-24%</td>
        <td style="padding: 8px; text-align: center;">25-31%</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Obese</strong></td>
        <td style="padding: 8px; text-align: center;">25%+</td>
        <td style="padding: 8px; text-align: center;">32%+</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🎯 Which Method to Use?</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Navy Method:</strong> Good for home use, no special equipment needed, accurate within 3-4%</li>
    <li><strong>3-Site Skinfold:</strong> More accurate than Navy, requires calipers, good for tracking changes</li>
    <li><strong>7-Site Skinfold:</strong> Most accurate method available here, professional standard, requires experience</li>
  </ul>
  <p style="margin-top: 10px;">
    For best results, take measurements at the same time of day and have the same person take them each time.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your body composition data is automatically saved in the URL. You can <strong>bookmark this page</strong> to track progress over time, 
    or use the <strong>Share button</strong> to send it to your trainer or friends. All values are restored when you return!
  </p>
</div>

<style>
  .unit-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .unit-btn {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid var(--color-gray);
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: var(--border-radius);
    font-weight: 600;
  }
  
  .unit-btn.active {
    background: var(--color-primary-blue);
    color: white;
    border-color: var(--color-primary-blue);
  }
  
  .unit-btn:hover:not(.active) {
    border-color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
  }
  
  .height-input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .body-composition-visual {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .composition-bars {
    display: flex;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .fat-bar {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    transition: all 0.5s ease;
  }
  
  .lean-bar {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    transition: all 0.5s ease;
  }
  
  .category-indicator {
    margin: 2rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .category-scale {
    position: relative;
    height: 40px;
    background: linear-gradient(to right, 
      #ef4444 0%, 
      #f59e0b 25%, 
      #eab308 50%, 
      #84cc16 75%, 
      #10b981 100%);
    border-radius: 20px;
    margin: 1rem 0;
  }
  
  .category-marker {
    position: absolute;
    top: -10px;
    width: 4px;
    height: 60px;
    background: #1e40af;
    border-radius: 2px;
    transition: left 0.5s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  
  .category-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .stat-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid #e5e7eb;
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary-blue);
  }
  
  .stat-label {
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .height-input-group {
      flex-direction: column;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .category-labels {
      font-size: 0.75rem;
    }
  }
  
  @media print {
    .btn, button {
      display: none !important;
    }
    
    .action-cards {
      display: none;
    }
  }
</style>

<script src="/scripts/calculators/body-fat-calculator.js"></script>
---
layout: ../../layouts/CalculatorLayout.astro
title: International Size Converter
description: Convert clothing and shoe sizes between US, UK, EU, and international sizing systems. Find your size when shopping from different countries.
category: math-conversions
tags: ['size conversion', 'clothing size', 'shoe size', 'international sizes']
featured: false
calcType: size-converter
seoTitle: Free Size Converter - International Clothing & Shoe Sizes
seoDescription: Convert clothing and shoe sizes between US, UK, EU, and other countries. Shop internationally with our free size converter.
estimatedTime: 1 minute
difficulty: Easy
---

## How to Use This Calculator

1. **Choose your method**: Convert a known size OR find your size by body measurements
2. **Select clothing category**: Women's, Men's, Kids', Shoes, Rings, or Bras
3. **Enter your size or measurements** based on chosen method
4. Click **Convert Size** to see results across all international sizing systems
5. **Share or bookmark** your results - the URL automatically saves all inputs!

<div class="calculator-form" id="size-converter-form">
  
  <div class="form-section">
    <h3>📐 How Would You Like to Find Your Size?</h3>
    <div class="mode-toggle">
      <button type="button" class="mode-btn active" data-mode="convert">🔄 Convert Known Size</button>
      <button type="button" class="mode-btn" data-mode="measure">📏 Find Size by Measurements</button>
    </div>
    <p class="form-help" id="mode-help">Already know your size in one system? Convert it to other international sizing systems.</p>
  </div>

  <div class="form-section">
    <h3>👕 What Are You Shopping For?</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="category">
          Clothing/Item Type <span class="required">*</span>
        </label>
        <select id="category" class="form-select" required>
          <optgroup label="Women's Clothing">
            <option value="womensClothingTops" selected>Women's Tops & Shirts</option>
            <option value="womensDresses">Women's Dresses</option>
            <option value="womensPants">Women's Pants & Jeans</option>
          </optgroup>
          <optgroup label="Men's Clothing">
            <option value="mensShirts">Men's Shirts</option>
            <option value="mensPants">Men's Pants & Jeans</option>
            <option value="mensSuits">Men's Suits & Jackets</option>
          </optgroup>
          <optgroup label="Footwear">
            <option value="womensShoes">Women's Shoes</option>
            <option value="mensShoes">Men's Shoes</option>
            <option value="kidsShoes">Kids' Shoes</option>
          </optgroup>
          <optgroup label="Kids">
            <option value="kidsClothing">Kids' Clothing</option>
          </optgroup>
          <optgroup label="Accessories">
            <option value="rings">Ring Sizes</option>
            <option value="bras">Bra Sizes</option>
          </optgroup>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section" id="convert-section">
    <h3>🔄 Select Your Known Size</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="source-system">
          Sizing System <span class="required">*</span>
        </label>
        <select id="source-system" class="form-select" required>
          <option value="US" selected>US</option>
          <option value="UK">UK</option>
          <option value="EU">EU</option>
        </select>
        <small class="form-help">Select the sizing system you know</small>
      </div>
      <div class="form-group">
        <label for="source-size">
          Your Size <span class="required">*</span>
        </label>
        <select id="source-size" class="form-select" required>
          <option value="">Select Size</option>
        </select>
        <small class="form-help">Select your size in this system</small>
      </div>
    </div>
  </div>

  <div class="form-section hidden" id="measure-section">
    <h3>📏 Enter Your Measurements</h3>
    <div id="measurement-inputs">
      <!-- Measurement inputs will be dynamically inserted here -->
    </div>
    <div class="measurement-guide-box">
      <h4>📖 How to Measure</h4>
      <div id="measurement-guide">
        <!-- Measurement guide will be dynamically inserted here -->
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Convert Size →
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

<div id="size-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🌍 Understanding International Sizing</h4>
  <p>
    Clothing sizes vary significantly between countries. A US size 8 might be a UK 12 or EU 40. 
    This calculator helps you convert between <strong>US, UK, EU, Australian, Japanese, Italian</strong>, and other sizing systems 
    so you can shop confidently from international retailers.
  </p>
</div>

<div class="info-box" style="background: #E8F8E8; border-left-color: #4CAF50;">
  <h4>📊 Quick Reference: Women's Clothing</h4>
  <table style="width: 100%; margin: 10px 0; font-size: 0.9rem;">
    <thead>
      <tr style="background: #C8E6C9;">
        <th style="padding: 8px;">US</th>
        <th style="padding: 8px;">UK</th>
        <th style="padding: 8px;">EU</th>
        <th style="padding: 8px;">AU</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 6px; text-align: center;">XS (2)</td><td style="padding: 6px; text-align: center;">6</td><td style="padding: 6px; text-align: center;">34</td><td style="padding: 6px; text-align: center;">6</td></tr>
      <tr style="background: #F1F8E9;"><td style="padding: 6px; text-align: center;">S (4-6)</td><td style="padding: 6px; text-align: center;">8-10</td><td style="padding: 6px; text-align: center;">36-38</td><td style="padding: 6px; text-align: center;">8-10</td></tr>
      <tr><td style="padding: 6px; text-align: center;">M (8-10)</td><td style="padding: 6px; text-align: center;">12-14</td><td style="padding: 6px; text-align: center;">40-42</td><td style="padding: 6px; text-align: center;">12-14</td></tr>
      <tr style="background: #F1F8E9;"><td style="padding: 6px; text-align: center;">L (12-14)</td><td style="padding: 6px; text-align: center;">16-18</td><td style="padding: 6px; text-align: center;">44-46</td><td style="padding: 6px; text-align: center;">16-18</td></tr>
      <tr><td style="padding: 6px; text-align: center;">XL (16-18)</td><td style="padding: 6px; text-align: center;">20-22</td><td style="padding: 6px; text-align: center;">48-50</td><td style="padding: 6px; text-align: center;">20-22</td></tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: #E3F2FD; border-left-color: #2196F3;">
  <h4>👟 Quick Reference: Shoe Sizes</h4>
  <table style="width: 100%; margin: 10px 0; font-size: 0.9rem;">
    <thead>
      <tr style="background: #BBDEFB;">
        <th style="padding: 8px;">US Women</th>
        <th style="padding: 8px;">US Men</th>
        <th style="padding: 8px;">UK</th>
        <th style="padding: 8px;">EU</th>
        <th style="padding: 8px;">cm</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 6px; text-align: center;">6</td><td style="padding: 6px; text-align: center;">-</td><td style="padding: 6px; text-align: center;">3.5</td><td style="padding: 6px; text-align: center;">36</td><td style="padding: 6px; text-align: center;">22.5</td></tr>
      <tr style="background: #E3F2FD;"><td style="padding: 6px; text-align: center;">7</td><td style="padding: 6px; text-align: center;">-</td><td style="padding: 6px; text-align: center;">4.5</td><td style="padding: 6px; text-align: center;">37.5</td><td style="padding: 6px; text-align: center;">23.5</td></tr>
      <tr><td style="padding: 6px; text-align: center;">8</td><td style="padding: 6px; text-align: center;">6.5</td><td style="padding: 6px; text-align: center;">5.5</td><td style="padding: 6px; text-align: center;">38.5</td><td style="padding: 6px; text-align: center;">24.5</td></tr>
      <tr style="background: #E3F2FD;"><td style="padding: 6px; text-align: center;">9</td><td style="padding: 6px; text-align: center;">7.5</td><td style="padding: 6px; text-align: center;">6.5</td><td style="padding: 6px; text-align: center;">40</td><td style="padding: 6px; text-align: center;">25.5</td></tr>
      <tr><td style="padding: 6px; text-align: center;">-</td><td style="padding: 6px; text-align: center;">9</td><td style="padding: 6px; text-align: center;">8.5</td><td style="padding: 6px; text-align: center;">42.5</td><td style="padding: 6px; text-align: center;">27</td></tr>
      <tr style="background: #E3F2FD;"><td style="padding: 6px; text-align: center;">-</td><td style="padding: 6px; text-align: center;">10</td><td style="padding: 6px; text-align: center;">9.5</td><td style="padding: 6px; text-align: center;">44</td><td style="padding: 6px; text-align: center;">28</td></tr>
    </tbody>
  </table>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>📏 How to Take Accurate Measurements</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Bust/Chest:</strong> Measure around the fullest part, keeping tape parallel to floor</li>
    <li><strong>Waist:</strong> Measure at your natural waistline (narrowest point)</li>
    <li><strong>Hips:</strong> Measure around the fullest part, typically 7-9 inches below waist</li>
    <li><strong>Foot Length:</strong> Stand on paper, trace foot, measure heel to longest toe in cm</li>
    <li><strong>Ring Size:</strong> Wrap string around finger, mark overlap, measure in mm</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Pro Tip:</strong> Measure at the end of the day when feet are largest, and always measure both feet/hands and use the larger measurement.
  </p>
</div>

<div class="info-box" style="background: #F3E5F5; border-left-color: #9C27B0;">
  <h4>👙 Understanding Bra Sizing</h4>
  <p>
    Bra sizes combine a <strong>band size</strong> (the number) with a <strong>cup size</strong> (the letter).
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Band:</strong> Measure snugly around your ribcage, directly under your bust</li>
    <li><strong>Bust:</strong> Measure around the fullest part of your bust</li>
    <li><strong>Cup:</strong> The difference between bust and band determines cup size (1"=A, 2"=B, 3"=C, etc.)</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Sister Sizes:</strong> 32D, 34C, and 36B all have the same cup volume but different band fits!
  </p>
</div>

<div class="info-box" style="background: #FFE5E5; border-left-color: #EF5350;">
  <h4>⚠️ Important Size Considerations</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Sizes vary between brands, even within the same country</li>
    <li>Asian sizing typically runs 1-2 sizes smaller than Western sizing</li>
    <li>Vintage clothing often runs smaller than modern sizes</li>
    <li>Always check the specific brand's size chart when available</li>
    <li>Consider fabric stretch - fitted items may need sizing adjustments</li>
    <li>When between sizes, consider the garment style (fitted vs. loose)</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>💡 International Shopping Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Check origin:</strong> European brands use EU sizing even when sold in the US</li>
    <li><strong>Read reviews:</strong> Other customers often mention if items run large/small</li>
    <li><strong>Know return policies:</strong> International returns can be expensive</li>
    <li><strong>Order multiple sizes:</strong> When unsure, order 2-3 sizes if returns are easy</li>
    <li><strong>Save your measurements:</strong> Bookmark this calculator with your data in the URL</li>
  </ul>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your size data is automatically saved in the URL. You can <strong>bookmark this page</strong> to quickly convert sizes later, 
    or use the <strong>Share button</strong> to send your size info to friends or save for reference. All values are restored when you return!
  </p>
</div>

<style>
  .mode-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    background: white;
    padding: 4px;
    border-radius: var(--border-radius);
    border: 2px solid var(--color-gray);
  }
  
  .mode-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid transparent;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.95rem;
  }
  
  .mode-btn.active {
    background: var(--color-accent-orange);
    color: white;
    border-color: var(--color-accent-orange);
  }
  
  .mode-btn:hover:not(.active) {
    background: var(--color-gray-light);
    color: var(--color-primary-blue);
  }
  
  .measurement-guide-box {
    margin-top: 1.5rem;
    padding: 1rem;
    background: var(--color-lighter-blue);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary-blue);
  }
  
  .measurement-guide-box h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
  }
  
  #measurement-guide {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .guide-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    background: white;
    border-radius: var(--border-radius);
  }
  
  .guide-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .guide-text {
    font-size: 0.875rem;
    color: var(--color-gray-dark);
  }
  
  .guide-text strong {
    color: var(--color-primary-blue);
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
  }
  
  /* Result Styles */
  .conversion-hero {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, white 100%);
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
  
  .source-size-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .size-system {
    font-size: 1rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .size-value {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    line-height: 1;
  }
  
  .size-label {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
  }
  
  .conversions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
    margin: 1.5rem 0;
  }
  
  .conversion-card {
    background: white;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    padding: 1rem;
    text-align: center;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .conversion-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: var(--color-accent-orange);
  }
  
  .conversion-card.source,
  .conversion-card.recommended {
    background: linear-gradient(135deg, #FFE5CC 0%, #fff 100%);
    border-color: var(--color-accent-orange);
  }
  
  .conversion-system {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.25rem;
  }
  
  .conversion-size {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
  }
  
  .source-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--color-accent-orange);
    color: white;
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: 600;
  }
  
  .input-summary {
    background: var(--color-gray-light);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
  }
  
  .input-summary h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
  
  .input-measurements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.5rem;
  }
  
  .input-measurement-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
  }
  
  .input-measurement-item.highlight {
    background: linear-gradient(135deg, #E8F8E8 0%, #fff 100%);
    border: 1px solid var(--color-success);
  }
  
  .measurement-icon {
    font-size: 1rem;
  }
  
  .measurement-label {
    color: var(--color-gray-dark);
  }
  
  .measurement-value {
    font-weight: 700;
    color: var(--color-primary-blue);
    margin-left: auto;
  }
  
  .fit-analysis {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .fit-analysis h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
  }
  
  .fit-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .fit-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: white;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-gray);
    font-size: 0.875rem;
  }
  
  .fit-item.fit-snug,
  .fit-item.fit-relaxed {
    border-left-color: var(--color-success);
  }
  
  .fit-item.fit-tight,
  .fit-item.fit-loose {
    border-left-color: var(--color-warning);
  }
  
  .fit-label {
    font-weight: 600;
    color: var(--color-primary-blue);
  }
  
  .fit-status {
    margin-left: auto;
    color: var(--color-gray-dark);
  }
  
  .alternative-sizes {
    margin: 1.5rem 0;
  }
  
  .alternative-sizes h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
  }
  
  .alternatives-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }
  
  .alternative-card {
    padding: 1rem;
    border-radius: var(--border-radius);
    border: 2px solid var(--color-gray);
  }
  
  .alternative-card.size-down {
    background: linear-gradient(135deg, #FFF3E0 0%, #fff 100%);
    border-color: #FFB74D;
  }
  
  .alternative-card.size-up {
    background: linear-gradient(135deg, #E3F2FD 0%, #fff 100%);
    border-color: #64B5F6;
  }
  
  .alternative-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.5rem;
  }
  
  .alternative-sizes-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .alt-size {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-primary-blue);
    background: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
  }
  
  .size-comparison-chart {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .size-comparison-chart h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .comparison-bars-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .comparison-bar-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .bar-system {
    width: 40px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  .bar-container {
    flex: 1;
    height: 32px;
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .bar-fill-comparison {
    height: 100%;
    background: linear-gradient(90deg, var(--color-light-blue) 0%, var(--color-primary-blue) 100%);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.75rem;
    transition: width 0.5s ease;
  }
  
  .bar-fill-comparison.source {
    background: linear-gradient(90deg, var(--color-accent-orange) 0%, #FF8F5C 100%);
  }
  
  .bar-size {
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  .chart-note {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    text-align: center;
    margin-top: 0.75rem;
    opacity: 0.7;
  }
  
  .size-range-chart {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .size-range-chart h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .range-bars {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .range-bar-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .range-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-primary-blue);
  }
  
  .range-bar-track {
    position: relative;
    height: 20px;
    background: white;
    border-radius: 10px;
    overflow: visible;
  }
  
  .range-bar-ideal {
    position: absolute;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #81C784 0%, #4CAF50 100%);
    border-radius: 10px;
  }
  
  .range-bar-marker {
    position: absolute;
    top: -4px;
    width: 4px;
    height: 28px;
    background: var(--color-accent-orange);
    border-radius: 2px;
    transform: translateX(-50%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .range-bar-marker::before {
    content: '▼';
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-accent-orange);
    font-size: 10px;
  }
  
  .range-bar-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--color-gray-dark);
    margin-top: 0.25rem;
  }
  
  .range-legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
    font-size: 0.75rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-gray-dark);
  }
  
  .legend-color {
    width: 14px;
    height: 14px;
    border-radius: 3px;
  }
  
  .legend-color.ideal {
    background: #4CAF50;
  }
  
  .legend-color.marker {
    background: var(--color-accent-orange);
  }
  
  .measurements-reference {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .measurements-reference h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
  }
  
  .measurements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }
  
  .measurement-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
  }
  
  .full-size-table-section {
    margin: 1.5rem 0;
  }
  
  .full-size-table-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.75rem;
  }
  
  .table-wrapper {
    overflow-x: auto;
    border-radius: var(--border-radius);
  }
  
  .size-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 0.875rem;
  }
  
  .size-table th,
  .size-table td {
    padding: 0.6rem 0.75rem;
    text-align: center;
    border-bottom: 1px solid var(--color-gray);
  }
  
  .size-table th {
    background: var(--color-primary-blue);
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .size-table tr:hover {
    background: var(--color-lighter-blue);
  }
  
  .size-table tr.highlighted {
    background: linear-gradient(135deg, #FFE5CC 0%, #FFF8F0 100%);
    font-weight: 600;
  }
  
  .size-table tr.highlighted td {
    border-bottom-color: var(--color-accent-orange);
  }
  
  .bra-size-display,
  .ring-size-display {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, var(--color-lighter-blue) 0%, white 100%);
    border-radius: 12px;
    margin: 1.5rem 0;
  }
  
  .bra-size-hero,
  .ring-size-hero {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.25rem;
  }
  
  .bra-band {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-primary-blue);
    line-height: 1;
  }
  
  .bra-cup {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    line-height: 1;
  }
  
  .ring-size-value {
    font-size: 4rem;
    font-weight: 800;
    color: var(--color-accent-orange);
    line-height: 1;
  }
  
  .bra-size-label,
  .ring-size-label {
    font-size: 0.9rem;
    color: var(--color-gray-dark);
    margin-top: 0.5rem;
    display: block;
  }
  
  .sister-sizes-section {
    margin: 1.5rem 0;
    padding: 1rem;
    background: linear-gradient(135deg, #F3E5F5 0%, #fff 100%);
    border-radius: var(--border-radius);
    border-left: 4px solid #9C27B0;
  }
  
  .sister-sizes-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 0.25rem;
  }
  
  .sister-sizes-explanation {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-bottom: 1rem;
  }
  
  .sister-sizes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5rem;
  }
  
  .sister-size-card {
    background: white;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    text-align: center;
  }
  
  .sister-type {
    font-size: 0.7rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.25rem;
  }
  
  .sister-size {
    font-size: 1.25rem;
    font-weight: 700;
    color: #9C27B0;
  }
  
  .ring-details {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1rem 0;
    flex-wrap: wrap;
  }
  
  .ring-detail-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .detail-label {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }
  
  .detail-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary-blue);
  }
  
  .tips-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid var(--color-gray);
  }
  
  .tips-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }
  
  .tip-card {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--color-gray-light);
    border-radius: var(--border-radius);
  }
  
  .tip-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .tip-content strong {
    display: block;
    color: var(--color-primary-blue);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }
  
  .tip-content p {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin: 0;
    line-height: 1.4;
  }
  
  @media (max-width: 768px) {
    .mode-toggle {
      flex-direction: column;
    }
    
    .size-value,
    .bra-band,
    .bra-cup,
    .ring-size-value {
      font-size: 2.5rem;
    }
    
    .conversions-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .form-actions button {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .conversions-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .input-measurements-grid {
      grid-template-columns: 1fr;
    }
    
    .size-value,
    .bra-band,
    .bra-cup,
    .ring-size-value {
      font-size: 2rem;
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

<script src="/scripts/calculators/size-converter.js"></script>
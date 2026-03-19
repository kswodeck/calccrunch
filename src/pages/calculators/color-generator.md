---
layout: ../../layouts/CalculatorLayout.astro
title: Color Generator
description: Generate random colors with HEX, RGB, and HSL values. Create color palettes, find complementary colors, and check accessibility contrast ratios. Perfect for designers, developers, and artists looking for color inspiration. Copy color codes instantly for use in your projects.
category: generators
tags: ['color generator', 'random color', 'hex color', 'RGB color', 'color palette', 'color picker']
featured: false
calcType: color
seoTitle: Free Color Generator - HEX, RGB & HSL Color Codes
seoDescription: Generate random colors with HEX, RGB, and HSL codes. Create color palettes and check contrast ratios. Free color generator for designers and developers.
estimatedTime: 1 minute
difficulty: Easy
---

## How to Use This Generator

1. **Choose a generation mode** - Random, specific hue range, or color harmony
2. **Set color constraints** - Adjust saturation, lightness, and hue ranges
3. **Select palette type** - Complementary, analogous, triadic, and more
4. **Generate colors** - Click to create your perfect color palette
5. **Copy color codes** - HEX, RGB, or HSL formats ready to use

<div class="calculator-form" id="color-generator-form">
  <div class="form-section">
    <h3>Generation Mode</h3>
    <div class="mode-selector">
      <button type="button" class="mode-btn active" data-mode="random">
        <span class="mode-icon">🎲</span>
        <span class="mode-label">Random</span>
        <span class="mode-desc">Completely random colors</span>
      </button>
      <button type="button" class="mode-btn" data-mode="harmony">
        <span class="mode-icon">🎨</span>
        <span class="mode-label">Harmony</span>
        <span class="mode-desc">Color theory based</span>
      </button>
      <button type="button" class="mode-btn" data-mode="preset">
        <span class="mode-icon">✨</span>
        <span class="mode-label">Preset</span>
        <span class="mode-desc">Curated color styles</span>
      </button>
      <button type="button" class="mode-btn" data-mode="custom">
        <span class="mode-icon">🎯</span>
        <span class="mode-label">Custom</span>
        <span class="mode-desc">Define exact ranges</span>
      </button>
    </div>
  </div>

  <!-- Harmony Options -->
  <div class="form-section harmony-options hidden" id="harmony-options">
    <h3>Color Harmony Type</h3>
    <div class="harmony-selector">
      <label class="harmony-card">
        <input type="radio" name="harmony" value="complementary" checked />
        <span class="harmony-content">
          <span class="harmony-preview complementary"></span>
          <span class="harmony-name">Complementary</span>
          <span class="harmony-desc">Opposite on wheel</span>
        </span>
      </label>
      <label class="harmony-card">
        <input type="radio" name="harmony" value="analogous" />
        <span class="harmony-content">
          <span class="harmony-preview analogous"></span>
          <span class="harmony-name">Analogous</span>
          <span class="harmony-desc">Adjacent colors</span>
        </span>
      </label>
      <label class="harmony-card">
        <input type="radio" name="harmony" value="triadic" />
        <span class="harmony-content">
          <span class="harmony-preview triadic"></span>
          <span class="harmony-name">Triadic</span>
          <span class="harmony-desc">Three equal spacing</span>
        </span>
      </label>
      <label class="harmony-card">
        <input type="radio" name="harmony" value="tetradic" />
        <span class="harmony-content">
          <span class="harmony-preview tetradic"></span>
          <span class="harmony-name">Tetradic</span>
          <span class="harmony-desc">Four colors rectangle</span>
        </span>
      </label>
      <label class="harmony-card">
        <input type="radio" name="harmony" value="split-complementary" />
        <span class="harmony-content">
          <span class="harmony-preview split-complementary"></span>
          <span class="harmony-name">Split-Comp</span>
          <span class="harmony-desc">Base + 2 adjacent to complement</span>
        </span>
      </label>
      <label class="harmony-card">
        <input type="radio" name="harmony" value="monochromatic" />
        <span class="harmony-content">
          <span class="harmony-preview monochromatic"></span>
          <span class="harmony-name">Monochromatic</span>
          <span class="harmony-desc">Single hue variations</span>
        </span>
      </label>
    </div>
  </div>

  <!-- Preset Options -->
  <div class="form-section preset-options hidden" id="preset-options">
    <h3>Color Style Preset</h3>
    <div class="preset-selector">
      <label class="preset-card">
        <input type="radio" name="preset" value="vibrant" checked />
        <span class="preset-content">
          <span class="preset-preview vibrant"></span>
          <span class="preset-name">Vibrant</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="pastel" />
        <span class="preset-content">
          <span class="preset-preview pastel"></span>
          <span class="preset-name">Pastel</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="muted" />
        <span class="preset-content">
          <span class="preset-preview muted"></span>
          <span class="preset-name">Muted</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="warm" />
        <span class="preset-content">
          <span class="preset-preview warm"></span>
          <span class="preset-name">Warm</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="cool" />
        <span class="preset-content">
          <span class="preset-preview cool"></span>
          <span class="preset-name">Cool</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="dark" />
        <span class="preset-content">
          <span class="preset-preview dark"></span>
          <span class="preset-name">Dark</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="light" />
        <span class="preset-content">
          <span class="preset-preview light"></span>
          <span class="preset-name">Light</span>
        </span>
      </label>
      <label class="preset-card">
        <input type="radio" name="preset" value="neon" />
        <span class="preset-content">
          <span class="preset-preview neon"></span>
          <span class="preset-name">Neon</span>
        </span>
      </label>
    </div>
  </div>

  <!-- Custom Range Options -->
  <div class="form-section custom-options hidden" id="custom-options">
    <h3>Custom Color Ranges (HSL)</h3>
    <div class="range-controls">
      <div class="range-group">
        <label>
          <span class="range-label">Hue Range</span>
          <span class="range-values"><span id="hue-min-val">0</span>° - <span id="hue-max-val">360</span>°</span>
        </label>
        <div class="dual-range" id="hue-range">
          <div class="range-track hue-track"></div>
          <input type="range" id="hue-min" class="range-min" min="0" max="360" value="0" />
          <input type="range" id="hue-max" class="range-max" min="0" max="360" value="360" />
        </div>
        <div class="hue-spectrum"></div>
      </div>
      <div class="range-group">
        <label>
          <span class="range-label">Saturation Range</span>
          <span class="range-values"><span id="sat-min-val">0</span>% - <span id="sat-max-val">100</span>%</span>
        </label>
        <div class="dual-range" id="sat-range">
          <div class="range-track sat-track"></div>
          <input type="range" id="sat-min" class="range-min" min="0" max="100" value="0" />
          <input type="range" id="sat-max" class="range-max" min="0" max="100" value="100" />
        </div>
      </div>
      <div class="range-group">
        <label>
          <span class="range-label">Lightness Range</span>
          <span class="range-values"><span id="light-min-val">0</span>% - <span id="light-max-val">100</span>%</span>
        </label>
        <div class="dual-range" id="light-range">
          <div class="range-track light-track"></div>
          <input type="range" id="light-min" class="range-min" min="0" max="100" value="0" />
          <input type="range" id="light-max" class="range-max" min="0" max="100" value="100" />
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Generation Settings</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="color-count">Number of Colors</label>
        <select id="color-count" class="form-select">
          <option value="1">1 color</option>
          <option value="3">3 colors</option>
          <option value="5" selected>5 colors</option>
          <option value="7">7 colors</option>
          <option value="10">10 colors</option>
        </select>
      </div>
      <div class="form-group">
        <label for="output-format">Default Output Format</label>
        <select id="output-format" class="form-select">
          <option value="hex" selected>HEX (#RRGGBB)</option>
          <option value="rgb">RGB (r, g, b)</option>
          <option value="hsl">HSL (h, s%, l%)</option>
          <option value="all">All formats</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Advanced Options</h3>
    <div class="advanced-toggle">
      <button type="button" class="toggle-advanced-btn" id="toggle-advanced">
        <span class="toggle-icon">▶</span>
        <span class="toggle-text">Show Advanced Options</span>
      </button>
    </div>
    <div class="advanced-options hidden" id="advanced-options">
      <div class="option-group">
        <h4>Accessibility</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="ensure-contrast" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Ensure readable contrast</strong>
              <small>Colors will have minimum 4.5:1 contrast ratio with white or black</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="colorblind-safe" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Colorblind-friendly palette</strong>
              <small>Avoid problematic color combinations</small>
            </span>
          </label>
        </div>
      </div>
      <div class="option-group">
        <h4>Exclusions</h4>
        <div class="checkbox-list">
          <label class="checkbox-item">
            <input type="checkbox" id="exclude-gray" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Exclude grayscale</strong>
              <small>No black, white, or gray colors</small>
            </span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="exclude-similar" />
            <span class="checkmark"></span>
            <span class="checkbox-text">
              <strong>Avoid similar colors</strong>
              <small>Ensure visual distinction between colors</small>
            </span>
          </label>
        </div>
      </div>
      <div class="option-group">
        <h4>Base Color (Optional)</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="base-color">Start from a specific color</label>
            <div class="color-input-group">
              <input type="color" id="base-color-picker" value="#3B82F6" />
              <input type="text" id="base-color" class="form-input" placeholder="#3B82F6" maxlength="7" />
            </div>
            <small class="form-help">Leave empty for fully random generation</small>
          </div>
          <div class="form-group">
            <label>&nbsp;</label>
            <label class="checkbox-item" style="margin-top: 0.5rem;">
              <input type="checkbox" id="use-base-color" />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                <strong>Use base color</strong>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="generate-btn" class="btn btn-primary calculate-button">
      🎨 Generate Colors →
    </button>
  </div>

  <div class="secondary-actions">
    <button type="button" id="share-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      Share Palette
    </button>
    <button type="button" id="reset-btn" class="btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      Reset
    </button>
  </div>
</div>

<div id="color-result" class="calculator-result hidden">
  <!-- Results will be inserted here by JavaScript -->
</div>

<div class="info-box">
  <h4>🎨 Understanding Color Models</h4>
  <p>
    <strong>HEX</strong> uses hexadecimal values (#RRGGBB) commonly used in web design. 
    <strong>RGB</strong> defines colors by Red, Green, and Blue intensity (0-255). 
    <strong>HSL</strong> uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%) - 
    often more intuitive for adjusting colors.
  </p>
</div>

<div class="info-box" style="background: #FFF8DC; border-left-color: #FFB900;">
  <h4>🔄 Color Harmonies Explained</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Complementary:</strong> Colors opposite on the color wheel - high contrast</li>
    <li><strong>Analogous:</strong> Adjacent colors - harmonious and pleasing</li>
    <li><strong>Triadic:</strong> Three colors equally spaced - vibrant yet balanced</li>
    <li><strong>Tetradic:</strong> Four colors forming a rectangle - rich color schemes</li>
    <li><strong>Monochromatic:</strong> Single hue with varying saturation/lightness</li>
  </ul>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>♿ Accessibility Tips</h4>
  <p>
    For readable text, aim for a contrast ratio of at least <strong>4.5:1</strong> for normal text 
    and <strong>3:1</strong> for large text (WCAG AA). Use our contrast checker to ensure your 
    color combinations are accessible to users with visual impairments.
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Palette</h4>
  <p>
    Your color settings are automatically saved in the URL. You can <strong>bookmark this page</strong> 
    to save your palette, or use the <strong>Share button</strong> to send it to others. 
    Export your colors as CSS, SCSS, or JSON for easy integration into your projects.
  </p>
</div>

<style>
  /* Color Generator Specific Styles */
  
  /* Mode Selector */
  .mode-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }
  
  .mode-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: center;
    font-family: var(--font-body);
  }
  
  .mode-btn:hover {
    border-color: var(--color-light-blue);
    background: var(--color-lighter-blue);
  }
  
  .mode-btn.active {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .mode-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .mode-label {
    font-weight: 700;
    color: var(--color-primary-blue);
    font-size: 1rem;
  }
  
  .mode-desc {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
    margin-top: 0.25rem;
  }
  
  /* Harmony Selector */
  .harmony-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.75rem;
  }
  
  .harmony-card {
    cursor: pointer;
  }
  
  .harmony-card input {
    display: none;
  }
  
  .harmony-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    text-align: center;
  }
  
  .harmony-card input:checked + .harmony-content {
    border-color: var(--color-accent-orange);
    background: linear-gradient(135deg, #FFF5F0 0%, var(--color-white) 100%);
  }
  
  .harmony-preview {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    position: relative;
    overflow: hidden;
  }
  
  .harmony-preview.complementary {
    background: conic-gradient(#FF6B6B 0deg 180deg, #6BCBFF 180deg 360deg);
  }
  
  .harmony-preview.analogous {
    background: conic-gradient(#FF6B6B 0deg, #FFB86B 120deg, #FFE66B 240deg, #FF6B6B 360deg);
  }
  
  .harmony-preview.triadic {
    background: conic-gradient(#FF6B6B 0deg 120deg, #6BFF6B 120deg 240deg, #6B6BFF 240deg 360deg);
  }
  
  .harmony-preview.tetradic {
    background: conic-gradient(#FF6B6B 0deg 90deg, #FFE66B 90deg 180deg, #6BCBFF 180deg 270deg, #CB6BFF 270deg 360deg);
  }
  
  .harmony-preview.split-complementary {
    background: conic-gradient(#FF6B6B 0deg 120deg, #6BFFC8 120deg 240deg, #6BC8FF 240deg 360deg);
  }
  
  .harmony-preview.monochromatic {
    background: linear-gradient(135deg, #1E3A5F 0%, #3B82F6 50%, #93C5FD 100%);
  }
  
  .harmony-name {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }
  
  .harmony-desc {
    font-size: 0.7rem;
    color: var(--color-gray-dark);
    opacity: 0.6;
    margin-top: 0.25rem;
  }
  
  /* Preset Selector */
  .preset-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  .preset-card {
    cursor: pointer;
  }
  
  .preset-card input {
    display: none;
  }
  
  .preset-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
  }
  
  .preset-card input:checked + .preset-content {
    border-color: var(--color-accent-orange);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .preset-preview {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .preset-preview.vibrant { background: linear-gradient(90deg, #FF006E, #FB5607, #FFBE0B, #3A86FF, #8338EC); }
  .preset-preview.pastel { background: linear-gradient(90deg, #FFB5BA, #FFDDB5, #FFFCB5, #B5FFD9, #B5D4FF); }
  .preset-preview.muted { background: linear-gradient(90deg, #8B7355, #6B8E7B, #7B8E9B, #9B7B8E, #8E8B7B); }
  .preset-preview.warm { background: linear-gradient(90deg, #FF4500, #FF6B35, #FF8C00, #FFA500, #FFD700); }
  .preset-preview.cool { background: linear-gradient(90deg, #00CED1, #4169E1, #6A5ACD, #9370DB, #00BFFF); }
  .preset-preview.dark { background: linear-gradient(90deg, #1a1a2e, #16213e, #0f3460, #2c3e50, #1c2833); }
  .preset-preview.light { background: linear-gradient(90deg, #F8F9FA, #E9ECEF, #DEE2E6, #F1F3F5, #F8F9FA); }
  .preset-preview.neon { background: linear-gradient(90deg, #FF00FF, #00FF00, #00FFFF, #FF00AA, #AAFF00); }
  
  .preset-name {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
  }
  
  /* Range Controls */
  .range-controls {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .range-group label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .range-label {
    font-weight: 600;
    color: var(--color-gray-dark);
  }
  
  .range-values {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--color-primary-blue);
    font-weight: 600;
  }
  
  .dual-range {
    position: relative;
    height: 30px;
  }
  
  .range-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 8px;
    border-radius: 4px;
  }
  
  .hue-track {
    background: linear-gradient(90deg, 
      hsl(0, 100%, 50%), 
      hsl(60, 100%, 50%), 
      hsl(120, 100%, 50%), 
      hsl(180, 100%, 50%), 
      hsl(240, 100%, 50%), 
      hsl(300, 100%, 50%), 
      hsl(360, 100%, 50%)
    );
  }
  
  .sat-track {
    background: linear-gradient(90deg, #808080, #FF6B6B);
  }
  
  .light-track {
    background: linear-gradient(90deg, #000000, #808080, #FFFFFF);
  }
  
  .dual-range input[type="range"] {
    position: absolute;
    width: 100%;
    height: 30px;
    background: transparent;
    pointer-events: none;
    -webkit-appearance: none;
    margin: 0;
  }
  
  .dual-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: auto;
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid var(--color-accent-orange);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-md);
  }
  
  .dual-range input[type="range"]::-moz-range-thumb {
    pointer-events: auto;
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid var(--color-accent-orange);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-md);
  }
  
  .hue-spectrum {
    height: 4px;
    margin-top: 0.5rem;
    border-radius: 2px;
    background: linear-gradient(90deg, 
      hsl(0, 100%, 50%), 
      hsl(60, 100%, 50%), 
      hsl(120, 100%, 50%), 
      hsl(180, 100%, 50%), 
      hsl(240, 100%, 50%), 
      hsl(300, 100%, 50%), 
      hsl(360, 100%, 50%)
    );
  }
  
  /* Color Input Group */
  .color-input-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .color-input-group input[type="color"] {
    width: 50px;
    height: 42px;
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    padding: 2px;
  }
  
  .color-input-group .form-input {
    flex: 1;
    font-family: var(--font-mono);
    text-transform: uppercase;
  }
  
  /* Advanced Toggle & Options */
  .advanced-toggle {
    margin-bottom: 1rem;
  }
  
  .toggle-advanced-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-white);
    border: 2px solid var(--color-gray);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    color: var(--color-primary-blue);
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    width: 100%;
    justify-content: center;
  }
  
  .toggle-advanced-btn:hover {
    border-color: var(--color-primary-blue);
    background: var(--color-lighter-blue);
  }
  
  .toggle-advanced-btn.active {
    background: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: var(--color-white);
  }
  
  .toggle-icon {
    transition: transform var(--transition-fast);
    font-size: 0.75rem;
  }
  
  .toggle-advanced-btn.active .toggle-icon {
    transform: rotate(90deg);
  }
  
  .advanced-options {
    background: var(--color-white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 1rem;
    border: 1px solid var(--color-gray);
  }
  
  .option-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-gray);
  }
  
  .option-group:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .option-group h4 {
    font-size: 1rem;
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    transition: background var(--transition-fast);
  }
  
  .checkbox-item:hover {
    background: var(--color-gray-light);
  }
  
  .checkbox-item input {
    display: none;
  }
  
  .checkmark {
    width: 22px;
    height: 22px;
    border: 2px solid var(--color-gray);
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    margin-top: 2px;
  }
  
  .checkbox-item input:checked + .checkmark {
    background: var(--color-accent-orange);
    border-color: var(--color-accent-orange);
  }
  
  .checkbox-item input:checked + .checkmark::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  .checkbox-text {
    display: flex;
    flex-direction: column;
  }
  
  .checkbox-text strong {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
  
  .checkbox-text small {
    color: var(--color-gray-dark);
    opacity: 0.7;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  /* Secondary Actions */
  .secondary-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .form-actions {
    margin-top: 1rem;
  }
  
  /* Results Styles */
  .color-palette-display {
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-lg);
    min-height: 200px;
  }
  
  .palette-color {
    flex: 1;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    cursor: pointer;
    transition: transform var(--transition-fast);
    position: relative;
  }
  
  .palette-color:hover {
    transform: scaleY(1.05);
    transform-origin: bottom;
    z-index: 1;
  }
  
  .palette-color-info {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    padding: 0.75rem;
    backdrop-filter: blur(4px);
  }
  
  .palette-color-hex {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: var(--color-gray-dark);
    margin-bottom: 0.25rem;
  }
  
  .palette-color-name {
    font-size: 0.75rem;
    color: var(--color-gray-dark);
    opacity: 0.7;
  }
  
  /* Color Details Cards */
  .color-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .color-detail-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--color-gray);
  }
  
  .color-detail-preview {
    height: 80px;
    position: relative;
  }
  
  .color-detail-body {
    padding: 1rem;
  }
  
  .color-formats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .color-format-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: var(--color-gray-light);
    border-radius: 4px;
  }
  
  .format-label {
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
  }
  
  .format-value {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-primary-blue);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background var(--transition-fast);
  }
  
  .format-value:hover {
    background: var(--color-lighter-blue);
  }
  
  .color-detail-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .copy-color-btn {
    flex: 1;
    padding: 0.5rem;
    background: var(--color-accent-orange);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    font-size: 0.85rem;
  }
  
  .copy-color-btn:hover {
    background: var(--color-accent-orange-dark);
  }
  
  .copy-color-btn.copied {
    background: var(--color-success);
  }
  
  /* Color Wheel Visualization */
  .color-wheel-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
    text-align: center;
  }
  
  .color-wheel-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .color-wheel-container {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
  
  .color-wheel {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      hsl(0, 100%, 50%),
      hsl(30, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(150, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(210, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(330, 100%, 50%),
      hsl(360, 100%, 50%)
    );
    position: relative;
  }
  
  .color-wheel::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    background: white;
    border-radius: 50%;
  }
  
  .wheel-marker {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 3px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    z-index: 1;
  }
  
  /* Contrast Checker */
  .contrast-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .contrast-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .contrast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .contrast-item {
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  
  .contrast-ratio {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }
  
  .contrast-label {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }
  
  .contrast-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
  }
  
  .contrast-badge.pass { background: #D1FAE5; color: #059669; }
  .contrast-badge.fail { background: #FEE2E2; color: #DC2626; }
  
  /* Export Section */
  .export-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-gray);
  }
  
  .export-section h4 {
    color: var(--color-primary-blue);
    margin-bottom: 1rem;
  }
  
  .export-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  
  .export-tab {
    padding: 0.5rem 1rem;
    border: 2px solid var(--color-gray);
    background: white;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .export-tab:hover {
    border-color: var(--color-light-blue);
  }
  
  .export-tab.active {
    background: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    color: white;
  }
  
  .export-code {
    background: #1a1a2e;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
  }
  
  .export-code pre {
    margin: 0;
    color: #00ff88;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  
  .export-copy-btn {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: var(--color-accent-orange);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  
  .export-copy-btn:hover {
    background: var(--color-accent-orange-dark);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .mode-selector {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .harmony-selector {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .preset-selector {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .color-palette-display {
      flex-direction: column;
      min-height: auto;
    }
    
    .palette-color {
      min-height: 80px;
    }
    
    .palette-color:hover {
      transform: scaleX(1.02);
      transform-origin: center;
    }
    
    .color-wheel-container {
      width: 200px;
      height: 200px;
    }
  }
  
  @media (max-width: 480px) {
    .mode-selector {
      grid-template-columns: 1fr;
    }
    
    .harmony-selector {
      grid-template-columns: 1fr 1fr;
    }
    
    .preset-selector {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .export-tabs {
      flex-direction: column;
    }
    
    .export-tab {
      text-align: center;
    }
  }
</style>

<script src="/scripts/calculators/color-generator.js"></script>
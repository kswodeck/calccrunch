---
layout: ../../layouts/CalculatorLayout.astro
calcType: recipe-scaler
---

## How to Use This Calculator

1. Enter the **original recipe servings** (how many it makes)
2. Enter your **desired servings** (how many you want)
3. **Add ingredients** with their amounts and units
4. The calculator will **automatically scale** all ingredients
5. Use the **measurement converter** for unit conversions
6. **Save or share** your scaled recipe with the URL

<div class="calculator-form" id="recipe-scaler-form">
  <div class="form-section">
    <h3>Recipe Scaling</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="original-servings">
          Original Recipe Servings <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="original-servings" 
            class="form-input"
            placeholder="4"
            value="4"
            min="0.5"
            max="10000"
            step="0.5"
            required
          />
          <span class="input-addon">servings</span>
        </div>
        <small class="form-help">How many servings the original recipe makes</small>
      </div>
      <div class="form-group">
        <label for="desired-servings">
          Desired Servings <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="desired-servings" 
            class="form-input"
            placeholder="8"
            value="8"
            min="0.5"
            max="10000"
            step="0.5"
            required
          />
          <span class="input-addon">servings</span>
        </div>
        <small class="form-help">How many servings you want to make</small>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <div class="scale-factor-display">
          <span>Scale Factor:</span>
          <span class="scale-factor" id="scale-factor">2x</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Recipe Ingredients</h3>
    <div class="ingredient-header">
      <span>Amount</span>
      <span>Unit</span>
      <span>Ingredient</span>
      <span>Scaled Amount</span>
      <span></span>
    </div>
    <div id="ingredient-list" class="ingredient-list">
      <!-- Ingredients will be added dynamically -->
    </div>
    <button type="button" id="add-ingredient" class="btn btn-secondary">
      + Add Ingredient
    </button>
  </div>

  <div class="form-section">
    <h3>Quick Measurement Converter</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="convert-amount">Amount to Convert</label>
        <input 
          type="number" 
          id="convert-amount" 
          class="form-input"
          placeholder="1"
          value="1"
          min="0"
          step="0.125"
        />
      </div>
      <div class="form-group">
        <label for="convert-from">From</label>
        <select id="convert-from" class="form-select">
          <optgroup label="Volume (US)">
            <option value="tsp">Teaspoon (tsp)</option>
            <option value="tbsp" selected>Tablespoon (tbsp)</option>
            <option value="fl-oz">Fluid Ounce (fl oz)</option>
            <option value="cup">Cup</option>
            <option value="pint">Pint</option>
            <option value="quart">Quart</option>
            <option value="gallon">Gallon</option>
          </optgroup>
          <optgroup label="Volume (Metric)">
            <option value="ml">Milliliter (ml)</option>
            <option value="l">Liter (l)</option>
          </optgroup>
          <optgroup label="Weight (US)">
            <option value="oz">Ounce (oz)</option>
            <option value="lb">Pound (lb)</option>
          </optgroup>
          <optgroup label="Weight (Metric)">
            <option value="g">Gram (g)</option>
            <option value="kg">Kilogram (kg)</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label for="convert-to">To</label>
        <select id="convert-to" class="form-select">
          <optgroup label="Volume (US)">
            <option value="tsp">Teaspoon (tsp)</option>
            <option value="tbsp">Tablespoon (tbsp)</option>
            <option value="fl-oz">Fluid Ounce (fl oz)</option>
            <option value="cup" selected>Cup</option>
            <option value="pint">Pint</option>
            <option value="quart">Quart</option>
            <option value="gallon">Gallon</option>
          </optgroup>
          <optgroup label="Volume (Metric)">
            <option value="ml">Milliliter (ml)</option>
            <option value="l">Liter (l)</option>
          </optgroup>
          <optgroup label="Weight (US)">
            <option value="oz">Ounce (oz)</option>
            <option value="lb">Pound (lb)</option>
          </optgroup>
          <optgroup label="Weight (Metric)">
            <option value="g">Gram (g)</option>
            <option value="kg">Kilogram (kg)</option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="conversion-result" id="conversion-result">
      <span class="conversion-value">1 tbsp = 0.0625 cups</span>
    </div>
  </div>

  <div class="form-section">
    <h3>Temperature Converter</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="temp-fahrenheit">
          Fahrenheit (°F)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="temp-fahrenheit" 
            class="form-input"
            placeholder="350"
            value="350"
            step="1"
          />
          <span class="input-addon">°F</span>
        </div>
      </div>
      <div class="temp-equals">=</div>
      <div class="form-group">
        <label for="temp-celsius">
          Celsius (°C)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="temp-celsius" 
            class="form-input"
            placeholder="177"
            value="177"
            step="1"
          />
          <span class="input-addon">°C</span>
        </div>
      </div>
    </div>
    <div class="common-temps">
      <h4>Common Oven Temperatures:</h4>
      <div class="temp-grid">
        <div class="temp-item" style="flex-direction: column; align-items: center;">
          <span class="temp-label">Slow:</span>
          <span>275-325°F / 135-163°C</span>
        </div>
        <div class="temp-item" style="flex-direction: column; align-items: center;">
          <span class="temp-label">Moderate:</span>
          <span>350-375°F / 177-190°C</span>
        </div>
        <div class="temp-item" style="flex-direction: column; align-items: center;">
          <span class="temp-label">Hot:</span>
          <span>400-450°F / 204-232°C</span>
        </div>
        <div class="temp-item" style="flex-direction: column; align-items: center;">
          <span class="temp-label">Very Hot:</span>
          <span>475-500°F / 246-260°C</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Scale Recipe →
  </button>
  
  <div class="form-actions">
    <button type="button" id="print-recipe" class="btn btn-secondary" title="Print scaled recipe">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9V2h12v7"/>
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print Recipe
    </button>
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all ingredients">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Clear All
    </button>
    <button type="button" id="share-calculation" class="btn btn-secondary" title="Share this recipe">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share Recipe
    </button>
  </div>
</div>

<div id="recipe-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>👨‍🍳 Recipe Scaling Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Spices & Seasonings:</strong> Scale conservatively - start with less and taste as you go</li>
    <li><strong>Baking Soda/Powder:</strong> Don't always scale linearly for large batches</li>
    <li><strong>Cooking Time:</strong> May need adjustment when scaling up or down significantly</li>
    <li><strong>Pan Size:</strong> Consider if you need different cookware for scaled recipes</li>
  </ul>
</div>

<div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
  <h4>📏 Common Measurement Conversions</h4>
  <div class="conversion-table">
    <table style="width: 100%;">
      <tr>
        <td><strong>3 tsp</strong> = 1 tbsp</td>
        <td><strong>16 tbsp</strong> = 1 cup</td>
      </tr>
      <tr>
        <td><strong>1 cup</strong> = 8 fl oz</td>
        <td><strong>2 cups</strong> = 1 pint</td>
      </tr>
      <tr>
        <td><strong>4 cups</strong> = 1 quart</td>
        <td><strong>4 quarts</strong> = 1 gallon</td>
      </tr>
      <tr>
        <td><strong>1 oz</strong> = 28.35 g</td>
        <td><strong>1 lb</strong> = 453.59 g</td>
      </tr>
    </table>
  </div>
</div>

<div class="info-box" style="background: #E8F4F8; border-left-color: #2C5F8D;">
  <h4>🍰 Baking vs Cooking</h4>
  <p>
    <strong>Baking</strong> requires more precision than cooking. When scaling baking recipes:
  </p>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li>Be exact with measurements - use weight when possible</li>
    <li>Chemical leaveners (baking soda/powder) may not scale linearly</li>
    <li>Eggs can be tricky - consider using egg weights for accuracy</li>
    <li>Test smaller batches first when scaling significantly</li>
  </ul>
  <p style="margin-top: 10px;">
    <strong>Cooking</strong> is more forgiving - you can adjust seasonings and ingredients to taste!
  </p>
</div>

<div class="info-box" style="background: #F0F9FF; border-left-color: #3B82F6;">
  <h4>🔗 Save & Share Your Recipe</h4>
  <p>
    Your scaled recipe is automatically saved in the URL. You can <strong>bookmark this page</strong> to save your recipe, 
    or use the <strong>Share button</strong> to send it to others. Perfect for sharing family recipes or meal prep planning!
  </p>
</div>

<style>
  .scale-factor-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    justify-content: center;
  }
  
  .scale-factor {
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  }
  
  .ingredient-header {
    display: grid;
    grid-template-columns: 1fr 1.5fr 2fr 1.5fr 50px;
    gap: 1rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #4b5563;
  }
  
  .ingredient-list {
    margin-bottom: 1rem;
  }
  
  .ingredient-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 2fr 1.5fr 50px;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  
  .ingredient-amount,
  .ingredient-unit,
  .ingredient-name {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .ingredient-amount:focus,
  .ingredient-unit:focus,
  .ingredient-name:focus {
    border-color: #FF6B35;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .scaled-amount {
    padding: 0.5rem 0.75rem;
    background: #E8F4F8;
    border-radius: 6px;
    font-weight: 600;
    color: #2C5F8D;
    text-align: center;
  }
  
  .remove-ingredient {
    width: 40px;
    height: 40px;
    border: 2px solid #ef4444;
    background: white;
    color: #ef4444;
    border-radius: 6px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .remove-ingredient:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.05);
  }
  
  .conversion-result {
    padding: 1rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 8px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1rem;
  }
  
  .temp-equals {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #6b7280;
    padding-top: 1.5rem;
  }
  
  .common-temps {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
  }
  
  .common-temps h4 {
    margin-bottom: 0.75rem;
    color: #374151;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .temp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }
  
  .temp-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: white;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .temp-label {
    font-weight: 600;
    color: #2C5F8D;
  }
  
  .conversion-table table {
    border-collapse: collapse;
  }
  
  .conversion-table td {
    padding: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .conversion-table tr:last-child td {
    border-bottom: none;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .ingredient-header,
    .ingredient-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .ingredient-header span:not(:first-child) {
      display: none;
    }
    
    .scaled-amount {
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #E8F4F8 0%, #D1E7F0 100%);
    }
    
    .temp-equals {
      display: none;
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
    
    .info-box {
      break-inside: avoid;
    }
  }
</style>

<script src="/scripts/calculators/recipe-scaler-converter.js"></script>
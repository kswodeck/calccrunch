---
layout: ../../layouts/CalculatorLayout.astro
calcType: dog-food
---

## How to Use This Calculator

1. Enter your **dog's current weight** and select your unit preference (lbs or kg)
2. Choose your dog's **life stage**, **breed size**, and **activity level**
3. Indicate if your dog is **spayed/neutered** (affects metabolism)
4. Enter your food's **caloric density** (kcal per cup or can) or use our estimates
5. Select how many **meals per day** you feed
6. Note any **special conditions** (pregnant, nursing, recovering)
7. Click **Calculate** to see daily feeding recommendations
8. **Share or bookmark** your results - the URL automatically saves all your inputs!

<div class="calculator-form" id="dog-food-calculator-form">
  <div class="form-section">
    <h3>Dog's Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="dog-weight">
          Current Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="dog-weight" 
            class="form-input"
            placeholder="50"
            value=""
            min="1"
            max="300"
            step="0.1"
            required
          />
          <select id="weight-unit" class="input-addon" style="border: none; background: var(--color-surface-neutral); padding: 0 8px;">
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="target-weight">
          Target/Ideal Weight (if different)
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="target-weight" 
            class="form-input"
            placeholder="Same as current"
            value=""
            min="1"
            max="300"
            step="0.1"
          />
          <span class="input-addon" id="target-weight-unit">lbs</span>
        </div>
        <small class="form-help">Leave blank if your dog is at ideal weight</small>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Weight Goal</h3>
    <div class="form-group">
      <label for="weight-goal">
        Weight Management Goal <span class="required">*</span>
      </label>
      <select id="weight-goal" class="form-select" required>
        <option value="maintain" selected>Maintain current weight</option>
        <option value="lose">Lose weight (reduce to target)</option>
        <option value="gain">Gain weight (increase to target)</option>
      </select>
      <small class="form-help">Safe weight loss is 1-2% of body weight per week</small>
    </div>
  </div>

  <div class="form-section">
    <h3>Life Stage & Breed</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="life-stage">
          Life Stage <span class="required">*</span>
        </label>
        <select id="life-stage" class="form-select" required>
          <option value="">Select life stage</option>
          <option value="puppy-young">Puppy (under 4 months)</option>
          <option value="puppy-older">Puppy (4-12 months)</option>
          <option value="adult">Adult (1-7 years)</option>
          <option value="senior">Senior (7+ years)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="breed-size">
          Breed Size Category <span class="required">*</span>
        </label>
        <select id="breed-size" class="form-select" required>
          <option value="">Select breed size</option>
          <option value="toy">Toy (under 10 lbs)</option>
          <option value="small">Small (10-25 lbs)</option>
          <option value="medium">Medium (25-50 lbs)</option>
          <option value="large">Large (50-100 lbs)</option>
          <option value="giant">Giant (100+ lbs)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Activity Level</h3>
    <div class="form-group">
      <label for="activity-level">
        Daily Activity Level <span class="required">*</span>
      </label>
      <select id="activity-level" class="form-select" required>
        <option value="">Select activity level</option>
        <option value="sedentary">Sedentary/Indoor (little exercise)</option>
        <option value="light">Lightly active (1-2 short walks/day)</option>
        <option value="moderate">Moderately active (1+ hour exercise/day)</option>
        <option value="high">Highly active (2+ hours exercise/day)</option>
        <option value="working">Working/Performance dog</option>
      </select>
      <small class="form-help">Consider your dog's total daily movement including play time</small>
    </div>
  </div>

  <div class="form-section">
    <h3>Health Details</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="spayed-neutered">
          Spayed/Neutered? <span class="required">*</span>
        </label>
        <select id="spayed-neutered" class="form-select" required>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No (intact)</option>
        </select>
        <small class="form-help">Spayed/neutered dogs have ~25% lower metabolic rate</small>
      </div>
      <div class="form-group">
        <label for="special-condition">
          Special Conditions
        </label>
        <select id="special-condition" class="form-select">
          <option value="none">None</option>
          <option value="pregnant">Pregnant (last 3 weeks)</option>
          <option value="nursing">Nursing</option>
          <option value="recovering">Recently ill/recovering</option>
        </select>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Food Information</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="food-type">
          Food Type <span class="required">*</span>
        </label>
        <select id="food-type" class="form-select" required>
          <option value="dry">Dry Kibble (avg 350-450 kcal/cup)</option>
          <option value="wet">Wet/Canned Food (avg 250-350 kcal/can)</option>
          <option value="raw">Raw Diet (varies)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="food-calories">
          Food Caloric Density <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="food-calories" 
            class="form-input"
            placeholder="380"
            value=""
            min="50"
            max="800"
            step="1"
          />
          <span class="input-addon" id="calorie-unit-label">kcal/cup</span>
        </div>
        <small class="form-help">Check your food bag or manufacturer's website. Leave blank for estimates.</small>
      </div>
    </div>
    <div class="form-group">
      <label for="food-quality">
        Food Quality (if kcal unknown)
      </label>
      <select id="food-quality" class="form-select">
        <option value="">I entered kcal above</option>
        <option value="economy">Economy brand (300-350 kcal/cup)</option>
        <option value="standard">Standard brand (350-400 kcal/cup)</option>
        <option value="premium">Premium brand (400-450 kcal/cup)</option>
        <option value="high-protein">High-protein/performance (425-500 kcal/cup)</option>
      </select>
      <small class="form-help">If your food bag doesn't list kcal/cup, check the manufacturer's website or call them</small>
    </div>
  </div>

  <div class="form-section">
    <h3>Feeding Schedule</h3>
    <div class="form-group">
      <label for="meals-per-day">
        Meals Per Day <span class="required">*</span>
      </label>
      <select id="meals-per-day" class="form-select" required>
        <option value="1">1 meal per day</option>
        <option value="2" selected>2 meals per day</option>
        <option value="3">3 meals per day</option>
      </select>
      <small class="form-help">Puppies benefit from 3 meals; adults typically eat 2 meals per day</small>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Feeding Amount →
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

<div id="dog-food-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box">
  <h4>🐕 Understanding Your Dog's Calorie Needs</h4>
  <p>
    Your dog's daily calorie needs are calculated using the <strong>Resting Energy Requirement (RER)</strong> formula 
    used by veterinarians: RER = 70 x (body weight in kg)^0.75. This is then adjusted by activity, life stage, 
    and other factors to determine the <strong>Maintenance Energy Requirement (MER)</strong>.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>📏 Feeding Guidelines by Life Stage</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Puppies (under 4 months):</strong> Need about 3x the adult calorie requirement per pound. Feed 3 times daily.</li>
    <li><strong>Puppies (4-12 months):</strong> Need about 2x adult calories. Transition to 2 meals daily around 6 months.</li>
    <li><strong>Adults (1-7 years):</strong> Feed based on activity level and body condition. 2 meals daily is standard.</li>
    <li><strong>Seniors (7+ years):</strong> Typically need 20-30% fewer calories due to reduced activity and metabolism.</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚖️ Weight Management Tips</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Safe weight loss:</strong> No more than 1-2% of body weight per week</li>
    <li><strong>Body condition scoring:</strong> You should feel ribs easily but not see them prominently</li>
    <li><strong>Treat budget:</strong> Treats should never exceed 10% of daily calorie intake</li>
    <li><strong>Weigh regularly:</strong> Weekly weigh-ins at the same time help track progress</li>
    <li><strong>Never calorie-restrict puppies</strong> without veterinary guidance</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>💧 Water & General Health</h4>
  <p>
    Dogs generally need about <strong>1 ounce of water per pound of body weight</strong> per day. Active dogs, 
    nursing mothers, and dogs eating dry kibble may need more. Always ensure fresh water is available. 
    Seasonal changes, age milestones, and health changes may require feeding adjustments — consult your vet 
    if you notice unexpected weight changes.
  </p>
</div>

<div class="info-box">
  <h4>🔗 Save & Share Your Calculation</h4>
  <p>
    Your inputs are automatically saved in the URL. You can <strong>bookmark this page</strong> to save your calculation, 
    or use the <strong>Share button</strong> to send it to others. When you return or share the link, all values will be restored automatically.
  </p>
</div>

<script src="/scripts/calculators/dog-food-calculator.js"></script>

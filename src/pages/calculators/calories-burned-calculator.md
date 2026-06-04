---
layout: ../../layouts/CalculatorLayout.astro
calcType: calories-burned
---

## How to Use This Calculator

1. Enter your **body weight** and select lbs or kg
2. Choose an **activity** from the categorized dropdown (150+ activities available)
3. Enter the **duration** in minutes
4. Select the **intensity level** (light, moderate, or vigorous)
5. Click **Calculate** to see your estimated calories burned
6. View **food equivalents**, activity comparisons, and weekly/monthly projections
7. **Share or bookmark** your results - the URL automatically saves all your inputs!

<div class="calculator-form" id="calories-burned-calculator-form">
  <div class="form-section">
    <h3>Your Weight</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="body-weight">
          Body Weight <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="body-weight" 
            class="form-input"
            placeholder="160"
            value="160"
            min="50"
            max="700"
            step="0.1"
            required
          />
          <select id="weight-unit" class="input-addon" style="border: none; background: var(--color-surface-neutral); padding: 0 8px;">
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Activity</h3>
    <div class="form-group">
      <label for="activity-select">
        Select Activity <span class="required">*</span>
      </label>
      <select id="activity-select" class="form-select" required>
        <option value="">-- Choose an activity --</option>
        <optgroup label="Running">
          <option value="jogging">Jogging (general)</option>
          <option value="running-5mph">Running 5 mph (12 min/mile)</option>
          <option value="running-6mph">Running 6 mph (10 min/mile)</option>
          <option value="running-7mph">Running 7 mph (8.5 min/mile)</option>
          <option value="running-8mph">Running 8 mph (7.5 min/mile)</option>
          <option value="running-9mph">Running 9 mph (6.5 min/mile)</option>
          <option value="running-10mph">Running 10 mph (6 min/mile)</option>
          <option value="trail-running">Trail Running</option>
          <option value="sprints-intervals">Sprints / Intervals</option>
        </optgroup>
        <optgroup label="Walking">
          <option value="walking-casual">Walking, casual (2 mph)</option>
          <option value="walking-moderate">Walking, moderate (3 mph)</option>
          <option value="walking-brisk">Walking, brisk (3.5 mph)</option>
          <option value="power-walking">Power Walking (4 mph)</option>
          <option value="hiking">Hiking</option>
          <option value="hiking-with-pack">Hiking with Pack</option>
          <option value="walking-upstairs">Walking Upstairs</option>
          <option value="walking-dog">Walking the Dog</option>
        </optgroup>
        <optgroup label="Cycling">
          <option value="cycling-leisure">Cycling, leisure (&lt;10 mph)</option>
          <option value="cycling-moderate">Cycling, moderate (12-14 mph)</option>
          <option value="cycling-vigorous">Cycling, vigorous (14-16 mph)</option>
          <option value="cycling-racing">Cycling, racing (&gt;20 mph)</option>
          <option value="mountain-biking">Mountain Biking</option>
          <option value="spinning-class">Spinning Class</option>
          <option value="stationary-moderate">Stationary Bike, moderate</option>
          <option value="stationary-vigorous">Stationary Bike, vigorous</option>
        </optgroup>
        <optgroup label="Swimming">
          <option value="swimming-leisure">Swimming, leisure</option>
          <option value="swimming-laps-moderate">Swimming Laps, moderate</option>
          <option value="swimming-laps-vigorous">Swimming Laps, vigorous</option>
          <option value="backstroke">Backstroke</option>
          <option value="breaststroke">Breaststroke</option>
          <option value="butterfly">Butterfly</option>
          <option value="treading-water">Treading Water</option>
          <option value="water-aerobics">Water Aerobics</option>
        </optgroup>
        <optgroup label="Sports">
          <option value="basketball-game">Basketball (game)</option>
          <option value="basketball-shooting">Basketball (shooting around)</option>
          <option value="soccer">Soccer</option>
          <option value="tennis-singles">Tennis (singles)</option>
          <option value="tennis-doubles">Tennis (doubles)</option>
          <option value="volleyball">Volleyball (recreational)</option>
          <option value="volleyball-competitive">Volleyball (competitive)</option>
          <option value="golf-walking">Golf (walking)</option>
          <option value="golf-cart">Golf (with cart)</option>
          <option value="baseball">Baseball / Softball</option>
          <option value="football">Football</option>
          <option value="hockey">Hockey (ice or field)</option>
          <option value="racquetball">Racquetball</option>
          <option value="badminton">Badminton</option>
          <option value="table-tennis">Table Tennis</option>
          <option value="martial-arts">Martial Arts</option>
          <option value="boxing-sparring">Boxing (sparring)</option>
          <option value="wrestling">Wrestling</option>
          <option value="skateboarding">Skateboarding</option>
          <option value="rock-climbing">Rock Climbing</option>
          <option value="skiing-downhill">Skiing (downhill)</option>
          <option value="skiing-cross-country">Skiing (cross-country)</option>
          <option value="snowboarding">Snowboarding</option>
          <option value="ice-skating">Ice Skating</option>
          <option value="roller-skating">Roller Skating / Blading</option>
          <option value="surfing">Surfing</option>
          <option value="kayaking">Kayaking</option>
          <option value="rowing-moderate">Rowing, moderate</option>
          <option value="rowing-vigorous">Rowing, vigorous</option>
        </optgroup>
        <optgroup label="Gym / Weights">
          <option value="weight-lifting-light">Weight Lifting, light</option>
          <option value="weight-lifting-vigorous">Weight Lifting, vigorous</option>
          <option value="circuit-training">Circuit Training</option>
          <option value="crossfit">CrossFit</option>
          <option value="hiit">HIIT</option>
          <option value="yoga">Yoga</option>
          <option value="hot-yoga">Hot Yoga</option>
          <option value="pilates">Pilates</option>
          <option value="elliptical-moderate">Elliptical, moderate</option>
          <option value="elliptical-vigorous">Elliptical, vigorous</option>
          <option value="stair-machine">Stair Machine</option>
          <option value="jump-rope-moderate">Jump Rope, moderate</option>
          <option value="jump-rope-vigorous">Jump Rope, vigorous</option>
          <option value="stretching">Stretching</option>
          <option value="calisthenics-moderate">Calisthenics, moderate</option>
          <option value="calisthenics-vigorous">Calisthenics, vigorous</option>
          <option value="kettlebells">Kettlebells</option>
        </optgroup>
        <optgroup label="Home / Daily Activities">
          <option value="cleaning-house">Cleaning House</option>
          <option value="vacuuming">Vacuuming</option>
          <option value="mopping">Mopping</option>
          <option value="cooking">Cooking</option>
          <option value="gardening">Gardening</option>
          <option value="mowing-lawn-push">Mowing Lawn (push mower)</option>
          <option value="mowing-lawn-riding">Mowing Lawn (riding mower)</option>
          <option value="raking-leaves">Raking Leaves</option>
          <option value="shoveling-snow">Shoveling Snow</option>
          <option value="moving-furniture">Moving Furniture</option>
          <option value="playing-with-kids">Playing with Kids (active)</option>
          <option value="sex-moderate">Sexual Activity (moderate)</option>
          <option value="dancing-social">Dancing (social)</option>
          <option value="dancing-vigorous">Dancing (vigorous)</option>
        </optgroup>
        <optgroup label="Outdoor / Recreation">
          <option value="frisbee">Frisbee</option>
          <option value="horseback-riding">Horseback Riding</option>
          <option value="fishing">Fishing</option>
          <option value="hunting">Hunting</option>
          <option value="archery">Archery</option>
          <option value="bowling">Bowling</option>
          <option value="billiards">Billiards / Pool</option>
          <option value="darts">Darts</option>
          <option value="juggling">Juggling</option>
          <option value="trampolining">Trampolining</option>
          <option value="paddleboarding">Paddleboarding (SUP)</option>
          <option value="snorkeling">Snorkeling</option>
          <option value="scuba-diving">Scuba Diving</option>
          <option value="canoeing">Canoeing</option>
        </optgroup>
      </select>
    </div>
  </div>

  <div class="form-section">
    <h3>Duration &amp; Intensity</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="duration">
          Duration <span class="required">*</span>
        </label>
        <div class="input-group">
          <input 
            type="number" 
            id="duration" 
            class="form-input"
            placeholder="30"
            value="30"
            min="1"
            max="600"
            step="1"
            required
          />
          <span class="input-addon">minutes</span>
        </div>
      </div>
      <div class="form-group">
        <label for="intensity">
          Intensity Level <span class="required">*</span>
        </label>
        <select id="intensity" class="form-select" required>
          <option value="light">Light (-15% MET)</option>
          <option value="moderate" selected>Moderate (standard MET)</option>
          <option value="vigorous">Vigorous (+15% MET)</option>
        </select>
        <small class="form-help">Adjusts MET value based on your effort level</small>
      </div>
    </div>
  </div>

  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">
    Calculate Calories Burned →
  </button>

  <div class="form-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
    <button type="button" id="share-btn" class="btn btn-secondary" title="Share this calculation">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      Share
    </button>
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Clear all inputs">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
      Clear
    </button>
  </div>
</div>

<div id="calories-burned-result" class="calculator-result hidden">
  <!-- Results will be inserted here -->
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 How MET Values Work</h4>
  <p>
    <strong>MET (Metabolic Equivalent of Task)</strong> measures the energy cost of physical activities. 
    A MET of 1.0 represents the energy you burn at rest. An activity with a MET of 5.0 burns 5 times as 
    many calories as resting. The formula is: <strong>Calories = MET x Weight (kg) x Duration (hours)</strong>. 
    For example, running at 6 mph (MET 9.8) for a 70 kg person for 30 minutes burns approximately 
    9.8 x 70 x 0.5 = 343 calories.
  </p>
</div>

<div class="info-box" style="background: var(--color-highlight-green); border-left-color: var(--color-success);">
  <h4>🔥 Tips for Maximizing Calorie Burn</h4>
  <ul style="margin: 10px 0; padding-left: 20px;">
    <li><strong>Add intervals:</strong> Alternating high and low intensity burns more calories than steady-state</li>
    <li><strong>Build muscle:</strong> More muscle mass increases your resting metabolic rate</li>
    <li><strong>Stay consistent:</strong> Regular exercise creates a cumulative calorie deficit over time</li>
    <li><strong>Mix it up:</strong> Varying activities prevents adaptation and plateau</li>
    <li><strong>Increase duration gradually:</strong> Adding 5-10 minutes per week helps avoid injury</li>
    <li><strong>Exercise after meals:</strong> Post-meal activity can boost calorie burn by 10-30%</li>
  </ul>
</div>

<div class="info-box" style="background: var(--color-highlight-yellow); border-left-color: var(--color-warning);">
  <h4>⚠️ Important Notes About Accuracy</h4>
  <p>
    Calorie estimates are approximations based on published MET research data. Actual calories burned vary 
    based on individual factors including: <strong>age, fitness level, body composition, genetics, 
    environmental conditions</strong> (heat, altitude, humidity), and exercise form/efficiency. 
    These values can differ by 15-20% from person to person. For the most accurate tracking, consider 
    using a heart rate monitor. Always consult a healthcare provider before starting a new exercise program.
  </p>
</div>

<script src="/scripts/calculators/calories-burned-calculator.js"></script>

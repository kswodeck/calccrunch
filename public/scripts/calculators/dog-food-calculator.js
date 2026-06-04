// Dog Food Calculator Logic with URL Query String Support

// Store last calculation results
let lastCalculationResults = null;

// URL parameter management
const URLParams = {
  getAll() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  update(values) {
    const params = new URLSearchParams();
    Object.keys(values).forEach(key => {
      if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
        params.set(key, values[key]);
      }
    });
    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  },

  clear() {
    window.history.replaceState({}, '', window.location.pathname);
  }
};

function initDogFoodCalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDiv = document.getElementById('dog-food-result');
  const shareBtn = document.getElementById('share-calculation');

  if (!calculateBtn || !resultDiv) {
    return;
  }

  // Initialize dynamic UI behaviors
  initFoodTypeToggle();
  initWeightUnitSync();

  // Load values from URL on page load
  loadFromURL();

  // Add input change listeners to update URL
  addInputListeners();

  // Calculate on button click
  calculateBtn.addEventListener('click', () => {
    calculateResults();
    document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Share button
  if (shareBtn) {
    shareBtn.addEventListener('click', shareResults);
  }

  // Calculate on Enter key
  const inputs = document.querySelectorAll('#dog-food-calculator-form input, #dog-food-calculator-form select');
  inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculateResults();
      }
    });
  });

  // Auto-calculate if we have URL parameters
  const urlParams = URLParams.getAll();
  if (Object.keys(urlParams).length > 0) {
    setTimeout(() => {
      calculateResults();
    }, 100);
  }
}

function initFoodTypeToggle() {
  const foodTypeSelect = document.getElementById('food-type');
  const calorieLabel = document.getElementById('calorie-unit-label');

  if (foodTypeSelect && calorieLabel) {
    foodTypeSelect.addEventListener('change', () => {
      const type = foodTypeSelect.value;
      if (type === 'wet') {
        calorieLabel.textContent = 'kcal/can';
      } else {
        calorieLabel.textContent = 'kcal/cup';
      }
    });
  }
}

function initWeightUnitSync() {
  const weightUnitSelect = document.getElementById('weight-unit');
  const targetUnitSpan = document.getElementById('target-weight-unit');

  if (weightUnitSelect && targetUnitSpan) {
    weightUnitSelect.addEventListener('change', () => {
      targetUnitSpan.textContent = weightUnitSelect.value;
    });
  }
}

function loadFromURL() {
  const params = URLParams.getAll();

  if (Object.keys(params).length === 0) {
    return;
  }

  const fieldMap = {
    'weight': 'dog-weight',
    'unit': 'weight-unit',
    'target': 'target-weight',
    'goal': 'weight-goal',
    'stage': 'life-stage',
    'breed': 'breed-size',
    'activity': 'activity-level',
    'fixed': 'spayed-neutered',
    'condition': 'special-condition',
    'foodtype': 'food-type',
    'kcal': 'food-calories',
    'quality': 'food-quality',
    'meals': 'meals-per-day'
  };

  Object.keys(fieldMap).forEach(paramKey => {
    if (params[paramKey]) {
      const el = document.getElementById(fieldMap[paramKey]);
      if (el) {
        el.value = params[paramKey];
      }
    }
  });

  // Sync unit display
  const weightUnitSelect = document.getElementById('weight-unit');
  const targetUnitSpan = document.getElementById('target-weight-unit');
  if (weightUnitSelect && targetUnitSpan) {
    targetUnitSpan.textContent = weightUnitSelect.value;
  }

  // Sync calorie label
  const foodTypeSelect = document.getElementById('food-type');
  const calorieLabel = document.getElementById('calorie-unit-label');
  if (foodTypeSelect && calorieLabel) {
    calorieLabel.textContent = foodTypeSelect.value === 'wet' ? 'kcal/can' : 'kcal/cup';
  }
}

function saveToURL() {
  const values = {};

  const fieldMap = {
    'weight': 'dog-weight',
    'unit': 'weight-unit',
    'target': 'target-weight',
    'goal': 'weight-goal',
    'stage': 'life-stage',
    'breed': 'breed-size',
    'activity': 'activity-level',
    'fixed': 'spayed-neutered',
    'condition': 'special-condition',
    'foodtype': 'food-type',
    'kcal': 'food-calories',
    'quality': 'food-quality',
    'meals': 'meals-per-day'
  };

  Object.keys(fieldMap).forEach(paramKey => {
    const el = document.getElementById(fieldMap[paramKey]);
    if (el && el.value) {
      values[paramKey] = el.value;
    }
  });

  URLParams.update(values);
}

function addInputListeners() {
  const inputs = ['dog-weight', 'target-weight', 'food-calories'];

  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      let timeout;
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          saveToURL();
        }, 500);
      });
    }
  });

  const selects = [
    'weight-unit', 'weight-goal', 'life-stage', 'breed-size',
    'activity-level', 'spayed-neutered', 'special-condition',
    'food-type', 'food-quality', 'meals-per-day'
  ];

  selects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', () => {
        saveToURL();
      });
    }
  });
}

function calculateResults() {
  // Gather inputs
  const weightValue = parseFloat(document.getElementById('dog-weight').value);
  const weightUnit = document.getElementById('weight-unit').value;
  const targetWeightValue = parseFloat(document.getElementById('target-weight').value);
  const weightGoal = document.getElementById('weight-goal').value;
  const lifeStage = document.getElementById('life-stage').value;
  const breedSize = document.getElementById('breed-size').value;
  const activityLevel = document.getElementById('activity-level').value;
  const spayedNeutered = document.getElementById('spayed-neutered').value;
  const specialCondition = document.getElementById('special-condition').value;
  const foodType = document.getElementById('food-type').value;
  const foodCaloriesInput = parseFloat(document.getElementById('food-calories').value);
  const foodQuality = document.getElementById('food-quality').value;
  const mealsPerDay = parseInt(document.getElementById('meals-per-day').value);

  // Validate required inputs
  if (!weightValue || !lifeStage || !breedSize || !activityLevel || !spayedNeutered) {
    showError('Please fill in all required fields (dog weight, life stage, breed size, activity level, and spayed/neutered status).');
    return;
  }

  if (weightValue <= 0) {
    showError('Please enter a valid weight greater than 0.');
    return;
  }

  // Convert weight to kg
  let weightKg = weightUnit === 'kg' ? weightValue : weightValue * 0.453592;
  let targetWeightKg = null;

  if (targetWeightValue && !isNaN(targetWeightValue) && targetWeightValue > 0) {
    targetWeightKg = weightUnit === 'kg' ? targetWeightValue : targetWeightValue * 0.453592;
  }

  // Determine food calories (kcal per cup or can)
  let foodCalories = foodCaloriesInput;
  if (!foodCalories || isNaN(foodCalories)) {
    // Use estimate based on food quality or food type
    if (foodQuality) {
      const qualityEstimates = {
        'economy': 325,
        'standard': 375,
        'premium': 425,
        'high-protein': 462
      };
      foodCalories = qualityEstimates[foodQuality] || 375;
    } else {
      // Default by food type
      const typeEstimates = {
        'dry': 380,
        'wet': 300,
        'raw': 400
      };
      foodCalories = typeEstimates[foodType] || 380;
    }
  }

  // Calculate RER (Resting Energy Requirement)
  // RER = 70 x (body weight in kg)^0.75
  const calcWeightKg = (weightGoal === 'lose' && targetWeightKg) ? targetWeightKg :
                        (weightGoal === 'gain' && targetWeightKg) ? targetWeightKg : weightKg;

  const rer = 70 * Math.pow(calcWeightKg, 0.75);

  // Calculate MER (Maintenance Energy Requirement) with multipliers
  let merMultiplier = 1.6; // Default neutered adult
  let multiplierReason = '';

  // Life stage base multiplier
  if (lifeStage === 'puppy-young') {
    merMultiplier = 3.0;
    multiplierReason = 'Young puppy (high growth needs)';
  } else if (lifeStage === 'puppy-older') {
    merMultiplier = 2.0;
    multiplierReason = 'Older puppy (continued growth)';
  } else if (lifeStage === 'senior') {
    merMultiplier = 1.4;
    multiplierReason = 'Senior dog (reduced metabolism)';
  } else {
    // Adult - base on spay/neuter status
    if (spayedNeutered === 'yes') {
      merMultiplier = 1.6;
      multiplierReason = 'Neutered/spayed adult';
    } else {
      merMultiplier = 1.8;
      multiplierReason = 'Intact adult';
    }
  }

  // Activity level adjustment for adults/seniors
  if (lifeStage === 'adult' || lifeStage === 'senior') {
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.6,
      'moderate': 2.0,
      'high': 3.5,
      'working': 5.0
    };

    const activityMult = activityMultipliers[activityLevel] || 1.6;

    // Use the higher of activity or base multiplier for active dogs
    if (activityMult > merMultiplier) {
      merMultiplier = activityMult;
      const activityNames = {
        'sedentary': 'Sedentary/indoor',
        'light': 'Lightly active',
        'moderate': 'Moderately active',
        'high': 'Highly active',
        'working': 'Working/performance'
      };
      multiplierReason = activityNames[activityLevel] + ' dog';
    }

    // Senior reduction
    if (lifeStage === 'senior') {
      merMultiplier = Math.min(merMultiplier, 1.4);
      if (activityLevel === 'moderate' || activityLevel === 'high' || activityLevel === 'working') {
        merMultiplier = activityMultipliers[activityLevel] * 0.8; // 20% reduction for seniors
        multiplierReason += ' (senior adjustment)';
      }
    }
  }

  // Weight goal adjustments
  if (weightGoal === 'lose') {
    merMultiplier = 1.0; // RER of ideal weight for weight loss
    multiplierReason = 'Weight loss program (RER of target weight)';
  } else if (weightGoal === 'gain') {
    merMultiplier = 1.7;
    multiplierReason = 'Weight gain program';
  }

  // Special condition overrides
  if (specialCondition === 'pregnant') {
    merMultiplier = Math.max(merMultiplier, 2.0);
    multiplierReason = 'Pregnant (last 3 weeks)';
  } else if (specialCondition === 'nursing') {
    merMultiplier = Math.max(merMultiplier, 4.0);
    multiplierReason = 'Nursing mother';
  } else if (specialCondition === 'recovering') {
    merMultiplier = Math.max(merMultiplier, 1.5);
    multiplierReason = 'Recovering from illness';
  }

  // Calculate MER
  const mer = rer * merMultiplier;

  // Calculate daily food amount
  const dailyAmount = mer / foodCalories;
  const perMealAmount = dailyAmount / mealsPerDay;

  // Calculate treat budget (10% of daily calories)
  const treatBudget = mer * 0.10;

  // Calculate water intake (1 oz per lb body weight)
  const weightLbs = weightUnit === 'lbs' ? weightValue : weightValue * 2.20462;
  const waterOz = weightLbs;
  const waterCups = waterOz / 8;

  // Weight management plan
  let weightPlan = null;
  if (weightGoal === 'lose' && targetWeightKg && targetWeightKg < weightKg) {
    const weightToLose = weightKg - targetWeightKg;
    const weeklyLoss = weightKg * 0.015; // 1.5% per week (middle of 1-2%)
    const weeksToGoal = Math.ceil(weightToLose / weeklyLoss);
    weightPlan = {
      type: 'lose',
      current: weightKg,
      target: targetWeightKg,
      difference: weightToLose,
      weeklyRate: weeklyLoss,
      weeksToGoal: weeksToGoal
    };
  } else if (weightGoal === 'gain' && targetWeightKg && targetWeightKg > weightKg) {
    const weightToGain = targetWeightKg - weightKg;
    const weeklyGain = weightKg * 0.01; // ~1% per week
    const weeksToGoal = Math.ceil(weightToGain / weeklyGain);
    weightPlan = {
      type: 'gain',
      current: weightKg,
      target: targetWeightKg,
      difference: weightToGain,
      weeklyRate: weeklyGain,
      weeksToGoal: weeksToGoal
    };
  }

  // Activity comparison chart data
  const activityComparison = calculateActivityComparison(calcWeightKg, spayedNeutered, lifeStage, foodCalories);

  // Store results
  lastCalculationResults = {
    weightKg,
    weightLbs,
    weightUnit,
    targetWeightKg,
    weightGoal,
    lifeStage,
    breedSize,
    activityLevel,
    spayedNeutered,
    specialCondition,
    foodType,
    foodCalories,
    mealsPerDay,
    rer,
    mer,
    merMultiplier,
    multiplierReason,
    dailyAmount,
    perMealAmount,
    treatBudget,
    waterOz,
    waterCups,
    weightPlan,
    activityComparison
  };

  // Save to URL
  saveToURL();

  // Display results
  displayResults();

  // Track calculation
  trackCalculation('dog-food', mer);
}

function calculateActivityComparison(weightKg, spayedNeutered, lifeStage, foodCalories) {
  const rer = 70 * Math.pow(weightKg, 0.75);
  const activities = [
    { name: 'Sedentary', multiplier: 1.2 },
    { name: 'Light', multiplier: 1.6 },
    { name: 'Moderate', multiplier: 2.0 },
    { name: 'High', multiplier: 3.5 },
    { name: 'Working', multiplier: 5.0 }
  ];

  return activities.map(a => {
    const calories = Math.round(rer * a.multiplier);
    const cups = (calories / foodCalories).toFixed(1);
    return { name: a.name, calories, cups };
  });
}

function displayResults() {
  const resultDiv = document.getElementById('dog-food-result');
  const data = lastCalculationResults;

  const foodUnitLabel = data.foodType === 'wet' ? 'cans' : 'cups';
  const foodUnitSingular = data.foodType === 'wet' ? 'can' : 'cup';

  // Format weight display
  const weightDisplay = data.weightUnit === 'kg'
    ? `${data.weightKg.toFixed(1)} kg`
    : `${data.weightLbs.toFixed(1)} lbs`;

  // Food bowl visual (simple text-based portion indicator)
  const portionLevel = Math.min(data.dailyAmount / 4, 1); // Normalize to max 4 cups
  const bowlFill = Math.round(portionLevel * 5);

  // Weight plan HTML
  let weightPlanHTML = '';
  if (data.weightPlan) {
    const planType = data.weightPlan.type;
    const diffDisplay = data.weightUnit === 'kg'
      ? `${data.weightPlan.difference.toFixed(1)} kg`
      : `${(data.weightPlan.difference * 2.20462).toFixed(1)} lbs`;
    const weeklyDisplay = data.weightUnit === 'kg'
      ? `${data.weightPlan.weeklyRate.toFixed(2)} kg`
      : `${(data.weightPlan.weeklyRate * 2.20462).toFixed(2)} lbs`;
    const targetDisplay = data.weightUnit === 'kg'
      ? `${data.weightPlan.target.toFixed(1)} kg`
      : `${(data.weightPlan.target * 2.20462).toFixed(1)} lbs`;

    weightPlanHTML = `
      <div class="weight-plan" style="margin-top: 1.5rem; padding: 1.5rem; background: var(--color-highlight-yellow); border-radius: var(--border-radius-lg); border-left: 4px solid var(--color-warning);">
        <h4 style="margin: 0 0 1rem 0;">📋 Weight ${planType === 'lose' ? 'Loss' : 'Gain'} Plan</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div>
            <strong>Target weight:</strong> ${targetDisplay}
          </div>
          <div>
            <strong>${planType === 'lose' ? 'To lose' : 'To gain'}:</strong> ${diffDisplay}
          </div>
          <div>
            <strong>Safe weekly ${planType === 'lose' ? 'loss' : 'gain'}:</strong> ${weeklyDisplay}
          </div>
          <div>
            <strong>Estimated timeline:</strong> ${data.weightPlan.weeksToGoal} weeks
          </div>
        </div>
        <ul style="margin: 1rem 0 0 0; padding-left: 20px; font-size: 0.9rem;">
          <li>Weigh your dog weekly at the same time of day</li>
          <li>Adjust food by 10% if progress stalls after 2 weeks</li>
          <li>Consult your vet if you notice any health changes</li>
          ${planType === 'lose' ? '<li>Increase exercise gradually alongside diet changes</li>' : '<li>Ensure weight gain is gradual and healthy</li>'}
        </ul>
      </div>
    `;
  }

  // Activity comparison chart
  let comparisonHTML = '';
  if (data.activityComparison) {
    const rows = data.activityComparison.map(a => {
      const isActive = a.name.toLowerCase() === data.activityLevel ||
        (data.activityLevel === 'light' && a.name === 'Light') ||
        (data.activityLevel === 'sedentary' && a.name === 'Sedentary') ||
        (data.activityLevel === 'moderate' && a.name === 'Moderate') ||
        (data.activityLevel === 'high' && a.name === 'High') ||
        (data.activityLevel === 'working' && a.name === 'Working');
      const highlight = isActive ? 'style="background: var(--color-highlight-blue); font-weight: bold;"' : '';
      return `<tr ${highlight}>
        <td>${a.name}${isActive ? ' (your dog)' : ''}</td>
        <td>${formatNumber(a.calories)} kcal</td>
        <td>${a.cups} ${foodUnitLabel}</td>
      </tr>`;
    }).join('');

    comparisonHTML = `
      <div style="margin-top: 1.5rem;">
        <h4>📊 Feeding Amounts by Activity Level</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem;">
          <thead>
            <tr style="background: var(--color-surface-neutral);">
              <th style="padding: 8px 12px; text-align: left;">Activity Level</th>
              <th style="padding: 8px 12px; text-align: left;">Daily Calories</th>
              <th style="padding: 8px 12px; text-align: left;">Daily ${foodUnitLabel}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  resultDiv.innerHTML = `
    <div class="result-card">
      <div class="result-header-actions" style="justify-content: center;">
        <h3>Feeding Recommendations for Your Dog</h3>
      </div>
      <div class="result-actions" style="justify-content: center;">
        <button type="button" onclick="shareResults()" class="btn-action" title="Share Results">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
        <button type="button" onclick="resetCalculator()" class="btn-action" title="Reset Calculator">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          Reset
        </button>
      </div>

      <div class="result-summary" style="display: block;">
        <div class="result-main" style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 0.9rem; color: var(--color-gray-dark); margin-bottom: 0.5rem;">
            Dog weight: ${weightDisplay} | ${getLifeStageLabel(data.lifeStage)} | ${getActivityLabel(data.activityLevel)}
          </div>
          <div style="font-weight: bold; font-size: 2rem; color: var(--color-chart-blue-dark);">
            ${formatNumber(Math.round(data.mer))} kcal/day
          </div>
          <div style="font-size: 0.9rem; color: var(--color-gray-dark);">Daily Calorie Needs (MER)</div>
        </div>

        <div class="calorie-breakdown" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
          <div style="text-align: center; padding: 1rem; background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);">
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary-blue);">
              ${data.dailyAmount.toFixed(1)}
            </div>
            <div style="font-size: 0.85rem; color: var(--color-gray-dark);">${foodUnitLabel} per day</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);">
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary-blue);">
              ${data.perMealAmount.toFixed(2)}
            </div>
            <div style="font-size: 0.85rem; color: var(--color-gray-dark);">${foodUnitLabel} per meal (${data.mealsPerDay}x daily)</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);">
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary-blue);">
              ${Math.round(data.treatBudget)}
            </div>
            <div style="font-size: 0.85rem; color: var(--color-gray-dark);">kcal treat budget (10%)</div>
          </div>
        </div>

        <!-- Food Bowl Visual -->
        <div style="text-align: center; margin: 1.5rem 0; padding: 1rem; background: var(--color-surface-neutral); border-radius: var(--border-radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🥣</div>
          <div style="font-size: 1.1rem; font-weight: bold;">
            ${data.perMealAmount.toFixed(2)} ${foodUnitLabel} per meal
          </div>
          <div style="font-size: 0.85rem; color: var(--color-gray-dark);">
            Feed ${data.mealsPerDay === 1 ? 'once' : data.mealsPerDay === 2 ? 'twice' : '3 times'} daily | ${data.foodCalories} kcal/${foodUnitSingular}
          </div>
          <div style="margin-top: 0.75rem; display: flex; justify-content: center; gap: 4px;">
            ${generatePortionDots(data.perMealAmount)}
          </div>
        </div>

        <!-- Feeding Schedule -->
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 1rem 0;">🕐 Recommended Feeding Schedule</h4>
          ${generateFeedingSchedule(data.mealsPerDay, data.perMealAmount, foodUnitLabel, data.lifeStage)}
        </div>

        <!-- Water Intake -->
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-highlight-blue); border-radius: var(--border-radius-lg);">
          <h4 style="margin: 0 0 0.5rem 0;">💧 Daily Water Recommendation</h4>
          <p style="margin: 0;">
            <strong>${Math.round(data.waterOz)} oz (${data.waterCups.toFixed(1)} cups)</strong> of fresh water per day.
            ${data.foodType === 'dry' ? ' Dogs eating dry kibble may need slightly more water.' : ''}
            ${data.activityLevel === 'high' || data.activityLevel === 'working' ? ' Active dogs should have water available at all times during exercise.' : ''}
          </p>
        </div>

        ${weightPlanHTML}

        ${comparisonHTML}

        <!-- Calculation Details -->
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-surface-neutral); border-radius: var(--border-radius-lg); font-size: 0.85rem;">
          <h4 style="margin: 0 0 0.75rem 0;">📐 Calculation Details</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div><strong>RER:</strong> ${Math.round(data.rer)} kcal (70 x ${data.weightKg.toFixed(1)}kg^0.75)</div>
            <div><strong>Multiplier:</strong> ${data.merMultiplier.toFixed(1)}x (${data.multiplierReason})</div>
            <div><strong>MER:</strong> ${Math.round(data.mer)} kcal/day</div>
            <div><strong>Food density:</strong> ${data.foodCalories} kcal/${foodUnitSingular}</div>
          </div>
        </div>

        <!-- Warning Signs -->
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: var(--color-highlight-yellow); border-radius: var(--border-radius-lg); border-left: 4px solid var(--color-warning);">
          <h4 style="margin: 0 0 0.75rem 0;">⚠️ Signs to Watch For</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem;">
            <div>
              <strong>Overfeeding signs:</strong>
              <ul style="margin: 0.25rem 0 0 0; padding-left: 18px;">
                <li>Visible weight gain</li>
                <li>Difficulty feeling ribs</li>
                <li>Lethargy or reduced stamina</li>
                <li>Loose stools</li>
              </ul>
            </div>
            <div>
              <strong>Underfeeding signs:</strong>
              <ul style="margin: 0.25rem 0 0 0; padding-left: 18px;">
                <li>Prominent ribs/hip bones</li>
                <li>Dull, dry coat</li>
                <li>Low energy or irritability</li>
                <li>Eating non-food items</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- When to Adjust -->
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border); font-size: 0.9rem;">
          <h4 style="margin: 0 0 0.75rem 0;">🔄 When to Adjust Feeding Amounts</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Seasonal changes:</strong> Dogs may need 10-20% more calories in cold weather</li>
            <li><strong>Age milestones:</strong> Transition puppy food to adult around 12 months (18-24 months for giant breeds)</li>
            <li><strong>Activity changes:</strong> Adjust if exercise routine changes significantly</li>
            <li><strong>After spay/neuter:</strong> Reduce calories by 25-30% post-surgery</li>
            <li><strong>Every 2-4 weeks:</strong> Reassess body condition and adjust as needed</li>
          </ul>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--color-surface-neutral); border-radius: var(--border-radius-lg); font-size: 0.85rem; text-align: center; color: var(--color-gray-dark);">
          <strong>Disclaimer:</strong> This calculator provides estimates based on veterinary formulas.
          Individual dogs may vary. Always consult your veterinarian for specific dietary advice,
          especially for puppies, dogs with health conditions, or significant weight management needs.
        </div>
      </div>
    </div>
  `;

  resultDiv.classList.remove('hidden');
}

function generatePortionDots(cupsPerMeal) {
  // Generate a visual representation of portion size
  const fullDots = Math.floor(cupsPerMeal);
  const partial = cupsPerMeal - fullDots;
  let dots = '';

  const maxDots = Math.min(fullDots + (partial > 0 ? 1 : 0), 8);

  for (let i = 0; i < Math.min(fullDots, 8); i++) {
    dots += '<span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary-blue); margin: 0 2px;"></span>';
  }
  if (partial > 0 && fullDots < 8) {
    dots += `<span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(to right, var(--color-primary-blue) ${Math.round(partial * 100)}%, var(--color-border) ${Math.round(partial * 100)}%); margin: 0 2px;"></span>`;
  }

  if (dots === '') {
    dots = '<span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(to right, var(--color-primary-blue) ' + Math.round(cupsPerMeal * 100) + '%, var(--color-border) ' + Math.round(cupsPerMeal * 100) + '%); margin: 0 2px;"></span>';
  }

  return dots + '<span style="font-size: 0.75rem; margin-left: 8px; color: var(--color-gray-dark);">(each dot = 1 ' + (lastCalculationResults.foodType === 'wet' ? 'can' : 'cup') + ')</span>';
}

function generateFeedingSchedule(mealsPerDay, perMealAmount, unitLabel, lifeStage) {
  let schedule = '';

  if (mealsPerDay === 1) {
    schedule = `
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0;">
        <span style="font-weight: bold; min-width: 100px;">Evening (6 PM)</span>
        <span>${perMealAmount.toFixed(2)} ${unitLabel}</span>
      </div>
    `;
  } else if (mealsPerDay === 2) {
    const half = perMealAmount;
    schedule = `
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border);">
        <span style="font-weight: bold; min-width: 100px;">Morning (7 AM)</span>
        <span>${half.toFixed(2)} ${unitLabel}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0;">
        <span style="font-weight: bold; min-width: 100px;">Evening (6 PM)</span>
        <span>${half.toFixed(2)} ${unitLabel}</span>
      </div>
    `;
  } else {
    const portion = perMealAmount;
    schedule = `
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border);">
        <span style="font-weight: bold; min-width: 100px;">Morning (7 AM)</span>
        <span>${portion.toFixed(2)} ${unitLabel}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border);">
        <span style="font-weight: bold; min-width: 100px;">Midday (12 PM)</span>
        <span>${portion.toFixed(2)} ${unitLabel}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0;">
        <span style="font-weight: bold; min-width: 100px;">Evening (6 PM)</span>
        <span>${portion.toFixed(2)} ${unitLabel}</span>
      </div>
    `;
  }

  let tip = '';
  if (lifeStage === 'puppy-young' || lifeStage === 'puppy-older') {
    tip = '<p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-gray-dark);">Tip: Puppies benefit from consistent meal times to support digestion and house training.</p>';
  } else {
    tip = '<p style="margin: 0.75rem 0 0 0; font-size: 0.85rem; color: var(--color-gray-dark);">Tip: Feed at consistent times each day. Remove uneaten food after 15-20 minutes.</p>';
  }

  return schedule + tip;
}

function getLifeStageLabel(stage) {
  const labels = {
    'puppy-young': 'Puppy (<4 mo)',
    'puppy-older': 'Puppy (4-12 mo)',
    'adult': 'Adult',
    'senior': 'Senior'
  };
  return labels[stage] || stage;
}

function getActivityLabel(level) {
  const labels = {
    'sedentary': 'Sedentary',
    'light': 'Lightly active',
    'moderate': 'Moderately active',
    'high': 'Highly active',
    'working': 'Working dog'
  };
  return labels[level] || level;
}

function shareResults() {
  saveToURL();
  const shareURL = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: 'Dog Food Calculator - CalcCrunch',
      text: `My dog's feeding plan: ${Math.round(lastCalculationResults.mer)} kcal/day (${lastCalculationResults.dailyAmount.toFixed(1)} ${lastCalculationResults.foodType === 'wet' ? 'cans' : 'cups'}/day)`,
      url: shareURL
    }).catch(() => {
      copyToClipboard(shareURL);
    });
  } else {
    copyToClipboard(shareURL);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess();
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopySuccess();
  } catch (err) {
    alert('Copy this URL to share: ' + text);
  }
  document.body.removeChild(textarea);
}

function showCopySuccess() {
  const shareBtn = document.getElementById('share-calculation');
  if (shareBtn) {
    const originalText = shareBtn.innerHTML;
    shareBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Link Copied!';
    setTimeout(() => {
      shareBtn.innerHTML = originalText;
    }, 2000);
  }
}

function resetCalculator() {
  const inputs = ['dog-weight', 'target-weight', 'food-calories'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });

  const selects = {
    'weight-unit': 'lbs',
    'weight-goal': 'maintain',
    'life-stage': '',
    'breed-size': '',
    'activity-level': '',
    'spayed-neutered': '',
    'special-condition': 'none',
    'food-type': 'dry',
    'food-quality': '',
    'meals-per-day': '2'
  };

  Object.keys(selects).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = selects[id];
  });

  // Reset unit labels
  const targetUnitSpan = document.getElementById('target-weight-unit');
  if (targetUnitSpan) targetUnitSpan.textContent = 'lbs';
  const calorieLabel = document.getElementById('calorie-unit-label');
  if (calorieLabel) calorieLabel.textContent = 'kcal/cup';

  URLParams.clear();

  const resultDiv = document.getElementById('dog-food-result');
  if (resultDiv) resultDiv.classList.add('hidden');

  lastCalculationResults = null;
}

function showError(message) {
  const resultDiv = document.getElementById('dog-food-result');
  resultDiv.innerHTML = `
    <div class="error-message">
      <strong>⚠️ Error:</strong> ${message}
    </div>
  `;
  resultDiv.classList.remove('hidden');
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function trackCalculation(type, result) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_use', {
      calculator_type: type,
      result_value: result
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDogFoodCalculator);

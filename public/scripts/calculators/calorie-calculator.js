// Daily Calorie Calculator Logic (TDEE Calculator) with URL Query String Support

// Track current measurement system
let currentSystem = 'imperial';

// Store last calculation results for printing
let lastCalculationResults = null;

// URL parameter management
const URLParams = {
  // Get all parameters from URL
  getAll() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },
  
  // Update URL with current form values
  update(values) {
    const params = new URLSearchParams();
    
    // Only add non-empty values
    Object.keys(values).forEach(key => {
      if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
        params.set(key, values[key]);
      }
    });
    
    // Update URL without page reload
    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  },
  
  // Clear all URL parameters
  clear() {
    window.history.replaceState({}, '', window.location.pathname);
  }
};

function initCalorieCalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDiv = document.getElementById('calorie-result');
  
  if (!calculateBtn || !resultDiv) {
    console.error('Calorie Calculator: Required elements not found');
    return;
  }
  
  console.log('Calorie Calculator initialized');
  
  // Initialize unit system toggle
  initUnitToggle();
  
  // Load values from URL on page load
  loadFromURL();
  
  // Add input change listeners to update URL
  addInputListeners();
  
  // Calculate on button click
  calculateBtn.addEventListener('click', () => {
      calculateResults();
      document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  
  // Calculate on Enter key
  const inputs = document.querySelectorAll('#calorie-calculator-form input, #calorie-calculator-form select');
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
    // Small delay to ensure everything is loaded
    setTimeout(() => {
      calculateResults();
    }, 100);
  }
}

function initUnitToggle() {
  const unitButtons = document.querySelectorAll('.unit-btn');
  const imperialSection = document.getElementById('imperial-inputs');
  const metricSection = document.getElementById('metric-inputs');
  
  if (!unitButtons.length || !imperialSection || !metricSection) {
    console.error('Unit toggle elements not found');
    return;
  }
  
  console.log('Unit toggle initialized');
  
  unitButtons.forEach(button => {
    button.addEventListener('click', function() {
      const system = this.getAttribute('data-system');
      console.log('Switching to:', system);
      
      // Update active state
      unitButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Toggle input sections
      if (system === 'imperial') {
        currentSystem = 'imperial';
        imperialSection.classList.remove('hidden');
        metricSection.classList.add('hidden');
      } else {
        currentSystem = 'metric';
        imperialSection.classList.add('hidden');
        metricSection.classList.remove('hidden');
      }
      
      // Update URL with new system
      saveToURL();
      
      // Clear results when switching
      const resultDiv = document.getElementById('calorie-result');
      if (resultDiv) {
        resultDiv.classList.add('hidden');
      }
    });
  });
}

function loadFromURL() {
  const params = URLParams.getAll();
  
  if (Object.keys(params).length === 0) {
    return;
  }
  
  console.log('Loading values from URL:', params);
  
  // Load measurement system first
  if (params.system) {
    const systemButton = document.querySelector(`.unit-btn[data-system="${params.system}"]`);
    if (systemButton) {
      systemButton.click();
    }
  }
  
  // Load values with a small delay to ensure system is set
  setTimeout(() => {
    // Personal information
    if (params.age) {
      const ageInput = document.getElementById('age');
      if (ageInput) ageInput.value = params.age;
    }
    
    if (params.gender) {
      const genderSelect = document.getElementById('gender');
      if (genderSelect) genderSelect.value = params.gender;
    }
    
    if (params.activity) {
      const activitySelect = document.getElementById('activity-level');
      if (activitySelect) activitySelect.value = params.activity;
    }
    
    if (params.goal) {
      const goalSelect = document.getElementById('goal');
      if (goalSelect) goalSelect.value = params.goal;
    }
    
    // Imperial measurements
    if (params.ft) {
      const feetInput = document.getElementById('height-feet');
      if (feetInput) feetInput.value = params.ft;
    }
    
    if (params.in) {
      const inchesInput = document.getElementById('height-inches');
      if (inchesInput) inchesInput.value = params.in;
    }
    
    if (params.lbs) {
      const lbsInput = document.getElementById('weight-lbs');
      if (lbsInput) lbsInput.value = params.lbs;
    }
    
    // Metric measurements
    if (params.cm) {
      const cmInput = document.getElementById('height-cm');
      if (cmInput) cmInput.value = params.cm;
    }
    
    if (params.kg) {
      const kgInput = document.getElementById('weight-kg');
      if (kgInput) kgInput.value = params.kg;
    }
  }, 50);
}

function saveToURL() {
  const values = {
    system: currentSystem
  };
  
  // Get personal information
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const activity = document.getElementById('activity-level').value;
  const goal = document.getElementById('goal').value;
  
  if (age) values.age = age;
  if (gender) values.gender = gender;
  if (activity) values.activity = activity;
  if (goal) values.goal = goal;
  
  // Get values based on current system
  if (currentSystem === 'imperial') {
    const feet = document.getElementById('height-feet').value;
    const inches = document.getElementById('height-inches').value;
    const lbs = document.getElementById('weight-lbs').value;
    
    if (feet) values.ft = feet;
    if (inches) values.in = inches;
    if (lbs) values.lbs = lbs;
  } else {
    const cm = document.getElementById('height-cm').value;
    const kg = document.getElementById('weight-kg').value;
    
    if (cm) values.cm = cm;
    if (kg) values.kg = kg;
  }
  
  // Update URL
  URLParams.update(values);
}

function addInputListeners() {
  // Get all relevant inputs
  const inputs = [
    'age',
    'height-feet',
    'height-inches',
    'weight-lbs',
    'height-cm',
    'weight-kg'
  ];
  
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      // Update URL when value changes (with debouncing)
      let timeout;
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          saveToURL();
        }, 500);
      });
    }
  });
  
  // Handle select elements separately
  const selects = [
    'gender',
    'activity-level',
    'goal'
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
  console.log('Calculating calories for system:', currentSystem);
  
  // Get personal information
  const age = parseInt(document.getElementById('age').value) || 0;
  const gender = document.getElementById('gender').value;
  const activityLevel = parseFloat(document.getElementById('activity-level').value) || 0;
  const goal = document.getElementById('goal').value;
  
  // Validate basic inputs
  if (!age || !gender || !activityLevel || !goal) {
    showError('Please fill in all required fields.');
    return;
  }
  
  let heightInCm = 0;
  let weightInKg = 0;
  
  // Get measurements based on current system
  if (currentSystem === 'imperial') {
    const feet = parseFloat(document.getElementById('height-feet').value) || 0;
    const inches = parseFloat(document.getElementById('height-inches').value) || 0;
    const weightLbs = parseFloat(document.getElementById('weight-lbs').value) || 0;
    
    console.log('Imperial inputs:', { feet, inches, weightLbs });
    
    // Validate inputs
    if (feet <= 0 || weightLbs <= 0) {
      showError('Please enter valid height and weight values.');
      return;
    }
    
    // Convert to metric
    const totalInches = (feet * 12) + inches;
    heightInCm = totalInches * 2.54;
    weightInKg = weightLbs * 0.453592;
    
  } else {
    heightInCm = parseFloat(document.getElementById('height-cm').value) || 0;
    weightInKg = parseFloat(document.getElementById('weight-kg').value) || 0;
    
    console.log('Metric inputs:', { heightInCm, weightInKg });
    
    // Validate inputs
    if (heightInCm <= 0 || weightInKg <= 0) {
      showError('Please enter valid height and weight values.');
      return;
    }
  }
  
  console.log('Converted values:', { heightInCm, weightInKg, age, gender, activityLevel });
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
  }
  
  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityLevel;
  
  // Calculate goal calories based on selected goal
  const goalCalories = calculateGoalCalories(tdee, goal);
  
  // Calculate macros
  const macros = calculateMacros(goalCalories.calories, weightInKg, goal);
  
  console.log('Calculated values:', { bmr, tdee, goalCalories, macros });
  
  // Store results for printing
  lastCalculationResults = {
    bmr: bmr,
    tdee: tdee,
    goalCalories: goalCalories,
    macros: macros,
    age: age,
    gender: gender,
    heightInCm: heightInCm,
    weightInKg: weightInKg,
    activityLevel: activityLevel,
    goal: goal,
    system: currentSystem
  };
  
  // Save current values to URL
  saveToURL();
  
  // Display results
  displayResult(bmr, tdee, goalCalories, macros, age, gender);
  
  // Track calculation
  trackCalculation('calorie', tdee);
}

function calculateGoalCalories(tdee, goal) {
  const goalData = {
    'lose-aggressive': {
      name: 'Aggressive Weight Loss',
      deficit: -1000,
      description: 'Lose approximately 2 lbs per week',
      pace: '2 lbs/week'
    },
    'lose-moderate': {
      name: 'Moderate Weight Loss',
      deficit: -500,
      description: 'Lose approximately 1 lb per week',
      pace: '1 lb/week'
    },
    'lose-conservative': {
      name: 'Conservative Weight Loss',
      deficit: -250,
      description: 'Lose approximately 0.5 lbs per week',
      pace: '0.5 lbs/week'
    },
    'maintain': {
      name: 'Maintain Weight',
      deficit: 0,
      description: 'Maintain your current weight',
      pace: 'Maintain'
    },
    'gain-conservative': {
      name: 'Conservative Weight Gain',
      deficit: 250,
      description: 'Gain approximately 0.5 lbs per week',
      pace: '0.5 lbs/week'
    },
    'gain-moderate': {
      name: 'Moderate Weight Gain',
      deficit: 500,
      description: 'Gain approximately 1 lb per week',
      pace: '1 lb/week'
    }
  };
  
  const selected = goalData[goal];
  const calories = Math.round(tdee + selected.deficit);
  
  return {
    calories: calories,
    name: selected.name,
    description: selected.description,
    pace: selected.pace,
    deficit: selected.deficit
  };
}

function calculateMacros(calories, weightInKg, goal) {
  // Protein: 0.8-1g per lb of body weight (higher for weight loss, moderate for maintenance/gain)
  let proteinPerKg = 1.8; // g per kg (about 0.8g per lb)
  if (goal.includes('lose')) {
    proteinPerKg = 2.2; // Higher protein for weight loss (1g per lb)
  } else if (goal.includes('gain')) {
    proteinPerKg = 2.0; // Moderate protein for muscle gain
  }
  
  const proteinGrams = Math.round(weightInKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;
  
  // Fat: 25-30% of total calories
  const fatPercentage = 0.27;
  const fatCalories = Math.round(calories * fatPercentage);
  const fatGrams = Math.round(fatCalories / 9);
  
  // Carbs: Remaining calories
  const carbCalories = calories - proteinCalories - fatCalories;
  const carbGrams = Math.round(carbCalories / 4);
  
  return {
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentage: Math.round((proteinCalories / calories) * 100)
    },
    carbs: {
      grams: carbGrams,
      calories: carbCalories,
      percentage: Math.round((carbCalories / calories) * 100)
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      percentage: Math.round((fatCalories / calories) * 100)
    }
  };
}

function displayResult(bmr, tdee, goalCalories, macros, age, gender) {
  const resultDiv = document.getElementById('calorie-result');
  
  // Get the current URL for sharing
  const shareURL = window.location.href;
  
  // Determine if it's weight loss or gain
  const isWeightLoss = goalCalories.deficit < 0;
  const isWeightGain = goalCalories.deficit > 0;
  
  resultDiv.innerHTML = `
    <div class="result-card">
      <div class="result-header-actions" style="justify-content: center;">
        <h3>Your Daily Calorie Plan</h3>
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
          <button type="button" onclick="printResults()" class="btn-action" title="Print Results">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
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
        <div class="result-main">
          <div class="calorie-display">
            <div class="calorie-value" style="font-weight: bold; font-size: 1.5rem; color: var(--color-chart-blue-dark);">${formatNumber(goalCalories.calories)}</div>
            <div class="calorie-label">calories per day</div>
          </div>
          <div class="goal-badge" style="font-weight: bold; background: ${isWeightLoss ? '#FFB900' : isWeightGain ? '#5A9FD4' : '#4CAF50'};">
            <span class="goal-name">${goalCalories.name}</span>
            <span class="goal-pace">${goalCalories.pace}</span>
          </div>
        </div>
        
        <div class="calorie-breakdown">
          <div class="breakdown-item" style="flex-direction: column; background-color: var(--color-white); border-radius: var(--border-radius-lg);">
            <span class="breakdown-label" style="color: var(--color-primary-blue); font-weight: bold;">BMR (Basal Metabolic Rate)</span>
            <span class="breakdown-value">${formatNumber(Math.round(bmr))} cal</span>
          </div>
          <div class="breakdown-item" style="flex-direction: column; background-color: var(--color-white); border-radius: var(--border-radius-lg);">
            <span class="breakdown-label" style="color: var(--color-primary-blue); font-weight: bold;">TDEE (Maintenance)</span>
            <span class="breakdown-value">${formatNumber(Math.round(tdee))} cal</span>
          </div>
          <div class="breakdown-item highlight" style="background-color: var(--color-chart-blue); flex-direction: column; border-radius: var(--border-radius-lg);">
            <span class="breakdown-label" style="color: white; font-weight: bold;">Daily Goal</span>
            <span class="breakdown-value" style="color: white;">${formatNumber(goalCalories.calories)} cal</span>
          </div>
        </div>
      </div>
      
      <div class="macro-distribution">
        <h4>📊 Recommended Macronutrient Distribution</h4>
        <div class="macro-grid">
          <div class="macro-card">
            <div class="macro-icon">🍗</div>
            <div class="macro-content">
              <div class="macro-name">Protein</div>
              <div class="macro-amount">${macros.protein.grams}g</div>
              <div class="macro-details">
                ${formatNumber(macros.protein.calories)} cal (${macros.protein.percentage}%)
              </div>
            </div>
          </div>
          
          <div class="macro-card">
            <div class="macro-icon">🍞</div>
            <div class="macro-content">
              <div class="macro-name">Carbs</div>
              <div class="macro-amount">${macros.carbs.grams}g</div>
              <div class="macro-details">
                ${formatNumber(macros.carbs.calories)} cal (${macros.carbs.percentage}%)
              </div>
            </div>
          </div>
          
          <div class="macro-card">
            <div class="macro-icon">🥑</div>
            <div class="macro-content">
              <div class="macro-name">Fat</div>
              <div class="macro-amount">${macros.fat.grams}g</div>
              <div class="macro-details">
                ${formatNumber(macros.fat.calories)} cal (${macros.fat.percentage}%)
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="meal-breakdown">
        <h4>🍽️ Sample Meal Distribution</h4>
        <div class="meals-grid">
          <div class="meal-item">
            <span class="meal-name">Breakfast (25%)</span>
            <span class="meal-calories">${Math.round(goalCalories.calories * 0.25)} cal</span>
          </div>
          <div class="meal-item">
            <span class="meal-name">Lunch (35%)</span>
            <span class="meal-calories">${Math.round(goalCalories.calories * 0.35)} cal</span>
          </div>
          <div class="meal-item">
            <span class="meal-name">Dinner (30%)</span>
            <span class="meal-calories">${Math.round(goalCalories.calories * 0.30)} cal</span>
          </div>
          <div class="meal-item">
            <span class="meal-name">Snacks (10%)</span>
            <span class="meal-calories">${Math.round(goalCalories.calories * 0.10)} cal</span>
          </div>
        </div>
      </div>
      
      ${age && gender ? `
      <div class="personalized-tips" style="margin-top: 2rem;">
        <h4>💡 Personalized Tips for You</h4>
        <div class="tips-grid">
          ${getPersonalizedTips(goalCalories, isWeightLoss, isWeightGain).map(tip => `
            <div class="tip-card">
              <div class="tip-icon">${tip.icon}</div>
              <div class="tip-content">
                <strong>${tip.title}</strong>
                <p>${tip.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      <div class="progress-tracker" style="margin-top: 2rem;">
        <h4>📈 Track Your Progress</h4>
        <p>
          For best results, weigh yourself weekly at the same time of day. 
          ${isWeightLoss ? 'Aim for 1-2 lbs of weight loss per week.' : 
            isWeightGain ? 'Aim for 0.5-1 lb of weight gain per week.' : 
            'Monitor your weight to ensure you\'re maintaining successfully.'}
        </p>
        <p>
          Adjust your calories by 100-200 if you're not seeing expected results after 2 weeks.
        </p>
      </div>
    </div>
  `;
  
  resultDiv.classList.remove('hidden');
}

function getPersonalizedTips(goalCalories, isWeightLoss, isWeightGain) {
  const tips = [];
  
  if (isWeightLoss) {
    tips.push(
      {
        icon: '🥤',
        title: 'Stay Hydrated',
        description: 'Drink water before meals to help control appetite and boost metabolism.'
      },
      {
        icon: '⚖️',
        title: 'Track Everything',
        description: 'Use a food diary or app to log all meals and snacks for accountability.'
      },
      {
        icon: '💪',
        title: 'Add Resistance Training',
        description: 'Preserve muscle mass during weight loss with 2-3 strength sessions per week.'
      }
    );
  } else if (isWeightGain) {
    tips.push(
      {
        icon: '🥜',
        title: 'Calorie-Dense Foods',
        description: 'Include nuts, dried fruits, and healthy oils to increase calories without excess volume.'
      },
      {
        icon: '🏋️',
        title: 'Progressive Overload',
        description: 'Gradually increase weights in your training to stimulate muscle growth.'
      },
      {
        icon: '😴',
        title: 'Prioritize Recovery',
        description: 'Get 7-9 hours of sleep for optimal muscle recovery and growth.'
      }
    );
  } else {
    tips.push(
      {
        icon: '⚖️',
        title: 'Monitor Weekly',
        description: 'Weigh yourself weekly to ensure you\'re maintaining successfully.'
      },
      {
        icon: '🎯',
        title: 'Focus on Quality',
        description: 'Prioritize whole foods and balanced meals over processed options.'
      },
      {
        icon: '🏃',
        title: 'Stay Active',
        description: 'Maintain regular exercise for health benefits beyond weight management.'
      }
    );
  }
  
  return tips;
}

function getActivityLevelDescription(level) {
  const levels = {
    '1.2': 'Sedentary',
    '1.375': 'Lightly Active',
    '1.55': 'Moderately Active',
    '1.725': 'Very Active',
    '1.9': 'Extremely Active'
  };
  return levels[level] || 'Unknown';
}

function shareResults() {
  const shareURL = window.location.href;
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'My Calorie Plan - CalcCrunch',
      text: `Check out my daily calorie plan: ${lastCalculationResults.goalCalories.calories} calories per day (${lastCalculationResults.goalCalories.name})`,
      url: shareURL
    }).catch(err => {
      // Fallback to copying URL if share fails
      copyShareURL();
    });
  } else {
    // Fallback to copying URL
    copyShareURL();
  }
}

function copyShareURL() {
  const shareInput = document.getElementById('share-url');
  if (shareInput) {
    shareInput.select();
    shareInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
      document.execCommand('copy');
      
      // Show success message
      const copyBtn = document.querySelector('.btn-copy');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = '#4CAF50';
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  }
}

function resetCalculator() {
  // Clear all inputs
  const inputs = [
    'age',
    'height-feet',
    'height-inches',
    'weight-lbs',
    'height-cm',
    'weight-kg'
  ];
  
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
    }
  });
  
  // Clear select elements
  const selects = [
    'gender',
    'activity-level',
    'goal'
  ];
  
  selects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      // Reset to default or first option
      if (id === 'activity-level') {
        select.value = '1.55'; // Moderately Active default
      } else if (id === 'goal') {
        select.value = 'lose-moderate'; // Moderate weight loss default
      } else {
        select.value = '';
      }
    }
  });
  
  // Clear URL parameters
  URLParams.clear();
  
  // Hide results
  const resultDiv = document.getElementById('calorie-result');
  if (resultDiv) {
    resultDiv.classList.add('hidden');
  }
  
  // Reset to default values if provided in HTML
  document.getElementById('age').value = '30';
  document.getElementById('height-feet').value = '5';
  document.getElementById('height-inches').value = '10';
  document.getElementById('weight-lbs').value = '180';
  document.getElementById('height-cm').value = '178';
  document.getElementById('weight-kg').value = '82';
}

function printResults() {
  if (!lastCalculationResults) {
    alert('Please calculate your calories first before printing.');
    return;
  }
  
  const printWindow = window.open('', '_blank');
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const data = lastCalculationResults;
  const isWeightLoss = data.goalCalories.deficit < 0;
  const isWeightGain = data.goalCalories.deficit > 0;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Calorie Plan - CalcCrunch.com</title>
      <style>
        body { 
          font-family: 'Segoe UI', Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          color: #333;
          line-height: 1.6;
        }
        .header { 
          text-align: center; 
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2C5F8D;
        }
        .header h1 { 
          color: #2C5F8D; 
          margin: 0 0 10px 0;
          font-size: 32px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
        }
        .main-result {
          text-align: center;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
          margin-bottom: 30px;
        }
        .main-result .calories { 
          font-size: 64px; 
          color: #FF6B35; 
          font-weight: bold;
          margin: 20px 0;
        }
        .main-result .goal {
          font-size: 24px;
          color: #2C5F8D;
          font-weight: bold;
        }
        .section { 
          margin: 30px 0; 
          page-break-inside: avoid;
        }
        .section h2 { 
          color: #2C5F8D; 
          font-size: 22px;
          margin-bottom: 15px;
          border-bottom: 2px solid #E8F4F8;
          padding-bottom: 10px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td { 
          padding: 12px; 
          text-align: left; 
          border-bottom: 1px solid #ddd;
        }
        th { 
          background: #f5f5f5;
          font-weight: bold;
          color: #2C5F8D;
        }
        .macros {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 20px 0;
        }
        .macro {
          text-align: center;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        .macro-name {
          font-weight: bold;
          color: #2C5F8D;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .macro-value {
          font-size: 32px;
          font-weight: bold;
          color: #FF6B35;
          margin: 10px 0;
        }
        .tips {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 20px 0;
        }
        .tip {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 8px;
          border-left: 3px solid #4CAF50;
        }
        .tip strong {
          display: block;
          color: #2C5F8D;
          margin-bottom: 5px;
        }
        .footer { 
          margin-top: 40px; 
          padding-top: 20px;
          border-top: 2px solid #ddd;
          text-align: center; 
          font-size: 12px; 
          color: #666;
        }
        .disclaimer {
          margin-top: 30px;
          padding: 15px;
          background: #FFF8DC;
          border-left: 4px solid #FFB900;
          font-size: 12px;
          line-height: 1.5;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Your Daily Calorie Plan</h1>
        <div class="subtitle">Generated on ${currentDate} • CalcCrunch.com</div>
      </div>
      
      <div class="main-result">
        <div class="calories">${formatNumber(data.goalCalories.calories)} cal/day</div>
        <div class="goal">${data.goalCalories.name}</div>
        <p style="margin-top: 15px; color: #666;">${data.goalCalories.description}</p>
      </div>
      
      <div class="section">
        <h2>Your Profile</h2>
        <table>
          <tr>
            <td><strong>Age</strong></td>
            <td>${data.age} years</td>
          </tr>
          <tr>
            <td><strong>Gender</strong></td>
            <td>${data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}</td>
          </tr>
          <tr>
            <td><strong>Height</strong></td>
            <td>${data.system === 'imperial' 
              ? Math.floor(data.heightInCm / 2.54 / 12) + "' " + Math.round((data.heightInCm / 2.54) % 12) + '"'
              : data.heightInCm.toFixed(0) + ' cm'
            }</td>
          </tr>
          <tr>
            <td><strong>Weight</strong></td>
            <td>${data.system === 'imperial' 
              ? (data.weightInKg * 2.20462).toFixed(0) + ' lbs'
              : data.weightInKg.toFixed(0) + ' kg'
            }</td>
          </tr>
          <tr>
            <td><strong>Activity Level</strong></td>
            <td>${getActivityLevelDescription(data.activityLevel)}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h2>Calorie Breakdown</h2>
        <table>
          <tr>
            <td><strong>BMR (Basal Metabolic Rate)</strong></td>
            <td>${formatNumber(Math.round(data.bmr))} calories</td>
          </tr>
          <tr>
            <td><strong>TDEE (Maintenance Calories)</strong></td>
            <td>${formatNumber(Math.round(data.tdee))} calories</td>
          </tr>
          <tr>
            <td><strong>Daily Calorie Adjustment</strong></td>
            <td>${data.goalCalories.deficit > 0 ? '+' : ''}${data.goalCalories.deficit} calories (${data.goalCalories.pace})</td>
          </tr>
          <tr style="background: #f5f5f5; font-weight: bold; font-size: 16px;">
            <td><strong>Your Daily Goal</strong></td>
            <td>${formatNumber(data.goalCalories.calories)} calories</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h2>Recommended Macros</h2>
        <div class="macros">
          <div class="macro">
            <div class="macro-name">🍗 Protein</div>
            <div class="macro-value">${data.macros.protein.grams}g</div>
            <div>${formatNumber(data.macros.protein.calories)} cal (${data.macros.protein.percentage}%)</div>
          </div>
          <div class="macro">
            <div class="macro-name">🍞 Carbs</div>
            <div class="macro-value">${data.macros.carbs.grams}g</div>
            <div>${formatNumber(data.macros.carbs.calories)} cal (${data.macros.carbs.percentage}%)</div>
          </div>
          <div class="macro">
            <div class="macro-name">🥑 Fat</div>
            <div class="macro-value">${data.macros.fat.grams}g</div>
            <div>${formatNumber(data.macros.fat.calories)} cal (${data.macros.fat.percentage}%)</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Success Tips</h2>
        <div class="tips">
          ${getPersonalizedTips(data.goalCalories, isWeightLoss, isWeightGain).map(tip => `
            <div class="tip">
              <strong>${tip.icon} ${tip.title}</strong>
              <p>${tip.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="disclaimer">
        <strong>⚕️ Health Disclaimer:</strong> This calculator provides estimates based on scientific formulas. 
        Individual calorie needs may vary based on metabolism, genetics, and medical conditions. Consult with 
        a healthcare provider or registered dietitian before starting any diet or weight loss program.
      </div>
      
      <div class="footer">
        <p><strong>CalcCrunch.com</strong> - Free Online Calculator Tools</p>
        <p>Generated on ${currentDate}</p>
        <p style="margin-top: 10px;">This plan is for informational purposes only and does not constitute medical or nutritional advice.</p>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  
  printWindow.document.close();
}

function showError(message) {
  const resultDiv = document.getElementById('calorie-result');
  resultDiv.innerHTML = `
    <div class="error-message">
      <strong>⚠️ Error:</strong> ${message}
    </div>
  `;
  resultDiv.classList.remove('hidden');
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function trackCalculation(type, result) {
  // Google Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_use', {
      calculator_type: type,
      result_value: result
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalorieCalculator);
} else {
  initCalorieCalculator();
}
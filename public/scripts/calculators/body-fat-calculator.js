(() => {
  // State management
  let calculatorState = {
    system: 'imperial',
    age: 30,
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weightLbs: 180,
    weightKg: 82,
    method: 'navy',
    // Navy method measurements
    neckImperial: 16,
    waistImperial: 34,
    hipImperial: 40,
    neckMetric: 40,
    waistMetric: 86,
    hipMetric: 102,
    // 3-site skinfold
    chestFold: 12,
    abdomenFold: 20,
    thighFoldMale: 15,
    tricepFold: 18,
    suprailiacFold: 15,
    thighFoldFemale: 20,
    // 7-site skinfold
    chest7: 12,
    midaxillary: 14,
    tricep7: 15,
    subscapular: 13,
    abdomen7: 20,
    suprailiac7: 15,
    thigh7: 18
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    loadStateFromURL();
    attachEventListeners();
    updateVisibility();
    
    // Check if we have valid state from URL
    if (hasValidInputs()) {
      calculateResults();
    }
  }

  function attachEventListeners() {
    // Unit system toggle
    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        updateState('system', e.target.dataset.system);
        updateVisibility();
      });
    });

    // Basic inputs
    document.getElementById('age').addEventListener('input', (e) => updateState('age', parseInt(e.target.value) || 0));
    document.getElementById('gender').addEventListener('change', (e) => {
      updateState('gender', e.target.value);
      updateVisibility();
    });
    
    // Imperial measurements
    document.getElementById('height-feet').addEventListener('input', (e) => updateState('heightFeet', parseInt(e.target.value) || 0));
    document.getElementById('height-inches').addEventListener('input', (e) => updateState('heightInches', parseInt(e.target.value) || 0));
    document.getElementById('weight-lbs').addEventListener('input', (e) => updateState('weightLbs', parseFloat(e.target.value) || 0));
    
    // Metric measurements
    document.getElementById('height-cm').addEventListener('input', (e) => updateState('heightCm', parseInt(e.target.value) || 0));
    document.getElementById('weight-kg').addEventListener('input', (e) => updateState('weightKg', parseFloat(e.target.value) || 0));
    
    // Method selection
    document.getElementById('method').addEventListener('change', (e) => {
      updateState('method', e.target.value);
      updateVisibility();
    });
    
    // Navy method measurements
    document.getElementById('neck-imperial').addEventListener('input', (e) => updateState('neckImperial', parseFloat(e.target.value) || 0));
    document.getElementById('waist-imperial').addEventListener('input', (e) => updateState('waistImperial', parseFloat(e.target.value) || 0));
    document.getElementById('hip-imperial').addEventListener('input', (e) => updateState('hipImperial', parseFloat(e.target.value) || 0));
    document.getElementById('neck-metric').addEventListener('input', (e) => updateState('neckMetric', parseFloat(e.target.value) || 0));
    document.getElementById('waist-metric').addEventListener('input', (e) => updateState('waistMetric', parseFloat(e.target.value) || 0));
    document.getElementById('hip-metric').addEventListener('input', (e) => updateState('hipMetric', parseFloat(e.target.value) || 0));
    
    // 3-site skinfold
    document.getElementById('chest-fold').addEventListener('input', (e) => updateState('chestFold', parseFloat(e.target.value) || 0));
    document.getElementById('abdomen-fold').addEventListener('input', (e) => updateState('abdomenFold', parseFloat(e.target.value) || 0));
    document.getElementById('thigh-fold-male').addEventListener('input', (e) => updateState('thighFoldMale', parseFloat(e.target.value) || 0));
    document.getElementById('tricep-fold').addEventListener('input', (e) => updateState('tricepFold', parseFloat(e.target.value) || 0));
    document.getElementById('suprailiac-fold').addEventListener('input', (e) => updateState('suprailiacFold', parseFloat(e.target.value) || 0));
    document.getElementById('thigh-fold-female').addEventListener('input', (e) => updateState('thighFoldFemale', parseFloat(e.target.value) || 0));
    
    // 7-site skinfold
    document.getElementById('chest-7').addEventListener('input', (e) => updateState('chest7', parseFloat(e.target.value) || 0));
    document.getElementById('midaxillary').addEventListener('input', (e) => updateState('midaxillary', parseFloat(e.target.value) || 0));
    document.getElementById('tricep-7').addEventListener('input', (e) => updateState('tricep7', parseFloat(e.target.value) || 0));
    document.getElementById('subscapular').addEventListener('input', (e) => updateState('subscapular', parseFloat(e.target.value) || 0));
    document.getElementById('abdomen-7').addEventListener('input', (e) => updateState('abdomen7', parseFloat(e.target.value) || 0));
    document.getElementById('suprailiac-7').addEventListener('input', (e) => updateState('suprailiac7', parseFloat(e.target.value) || 0));
    document.getElementById('thigh-7').addEventListener('input', (e) => updateState('thigh7', parseFloat(e.target.value) || 0));
    
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    
    // Share button
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);
    
    // Auto-calculate on input with debouncing
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', debounce(() => {
        if (hasValidInputs()) {
          calculateResults();
        }
      }, 500));
    });
  }

  function updateVisibility() {
    const { system, gender, method } = calculatorState;
    
    // Show/hide measurement system sections
    document.getElementById('imperial-inputs').classList.toggle('hidden', system !== 'imperial');
    document.getElementById('metric-inputs').classList.toggle('hidden', system !== 'metric');
    
    // Show/hide Navy method sections
    const showNavy = method === 'navy';
    document.getElementById('navy-measurements').classList.toggle('hidden', !showNavy || system !== 'imperial');
    document.getElementById('navy-measurements-metric').classList.toggle('hidden', !showNavy || system !== 'metric');
    
    // Show/hide hip measurement for women
    if (document.getElementById('hip-row')) {
      document.getElementById('hip-row').style.display = gender === 'female' ? 'block' : 'none';
    }
    if (document.getElementById('hip-row-metric')) {
      document.getElementById('hip-row-metric').style.display = gender === 'female' ? 'block' : 'none';
    }
    
    // Show/hide skinfold sections
    document.getElementById('skinfold-3site').classList.toggle('hidden', method !== '3site');
    document.getElementById('skinfold-7site').classList.toggle('hidden', method !== '7site');
    
    // Show/hide gender-specific 3-site measurements
    if (method === '3site') {
      document.getElementById('male-3site').classList.toggle('hidden', gender !== 'male');
      document.getElementById('female-3site').classList.toggle('hidden', gender !== 'female');
    }
    
    // Update method help text
    const methodHelp = document.getElementById('method-help');
    if (method === 'navy') {
      methodHelp.textContent = 'Navy method uses body measurements, no special equipment needed';
    } else if (method === '3site') {
      methodHelp.textContent = 'Requires skinfold calipers, more accurate than Navy method';
    } else if (method === '7site') {
      methodHelp.textContent = 'Most accurate method, requires calipers and experience';
    }
  }

  function updateState(key, value) {
    calculatorState[key] = value;
    saveStateToURL();
  }

  function hasValidInputs() {
    const { age, gender, method, system } = calculatorState;
    
    if (!age || !gender) return false;
    
    if (system === 'imperial') {
      if (!calculatorState.weightLbs || !calculatorState.heightFeet) return false;
      
      if (method === 'navy') {
        if (!calculatorState.neckImperial || !calculatorState.waistImperial) return false;
        if (gender === 'female' && !calculatorState.hipImperial) return false;
      }
    } else {
      if (!calculatorState.weightKg || !calculatorState.heightCm) return false;
      
      if (method === 'navy') {
        if (!calculatorState.neckMetric || !calculatorState.waistMetric) return false;
        if (gender === 'female' && !calculatorState.hipMetric) return false;
      }
    }
    
    return true;
  }

  function calculateResults() {
    if (!hasValidInputs()) {
      alert('Please fill in all required fields');
      return;
    }

    const results = performCalculations();
    displayResults(results);
  }

  function performCalculations() {
    const { age, gender, method, system } = calculatorState;
    
    // Get weight and height in standard units
    let weight, height;
    if (system === 'imperial') {
      weight = calculatorState.weightLbs * 0.453592; // Convert to kg
      height = (calculatorState.heightFeet * 12 + calculatorState.heightInches) * 2.54; // Convert to cm
    } else {
      weight = calculatorState.weightKg;
      height = calculatorState.heightCm;
    }
    
    let bodyFatPercentage = 0;
    
    if (method === 'navy') {
      bodyFatPercentage = calculateNavyMethod();
    } else if (method === '3site') {
      bodyFatPercentage = calculate3SiteMethod();
    } else if (method === '7site') {
      bodyFatPercentage = calculate7SiteMethod();
    }
    
    // Calculate derived values
    const fatMass = weight * (bodyFatPercentage / 100);
    const leanMass = weight - fatMass;
    
    // Calculate BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    
    // Calculate ideal body fat range
    let idealMin, idealMax;
    if (gender === 'male') {
      idealMin = 10;
      idealMax = 20;
    } else {
      idealMin = 18;
      idealMax = 28;
    }
    
    // Calculate fat-free mass index (FFMI)
    const ffmi = leanMass / (heightM * heightM) + 6.1 * (1.8 - heightM);
    
    // Determine category
    let category;
    if (gender === 'male') {
      if (bodyFatPercentage < 6) category = 'Essential';
      else if (bodyFatPercentage < 14) category = 'Athletes';
      else if (bodyFatPercentage < 18) category = 'Fitness';
      else if (bodyFatPercentage < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFatPercentage < 14) category = 'Essential';
      else if (bodyFatPercentage < 21) category = 'Athletes';
      else if (bodyFatPercentage < 25) category = 'Fitness';
      else if (bodyFatPercentage < 32) category = 'Average';
      else category = 'Obese';
    }
    
    // Calculate calories to lose 1% body fat
    const caloriesToLose1Percent = (weight * 0.01) * 7700; // 1kg fat = 7700 calories
    
    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
      bmi,
      ffmi,
      category,
      idealMin,
      idealMax,
      caloriesToLose1Percent,
      weight,
      height,
      method
    };
  }

  function calculateNavyMethod() {
    const { gender, system } = calculatorState;
    
    let neck, waist, hip, height;
    
    if (system === 'imperial') {
      neck = calculatorState.neckImperial;
      waist = calculatorState.waistImperial;
      hip = calculatorState.hipImperial;
      height = calculatorState.heightFeet * 12 + calculatorState.heightInches;
    } else {
      // Convert cm to inches for Navy formula
      neck = calculatorState.neckMetric / 2.54;
      waist = calculatorState.waistMetric / 2.54;
      hip = calculatorState.hipMetric / 2.54;
      height = calculatorState.heightCm / 2.54;
    }
    
    let bodyFat;
    
    if (gender === 'male') {
      // Men: 86.010 × log10(abdomen - neck) - 70.041 × log10(height) + 36.76
      bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      // Women: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
      bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
    
    return Math.max(0, Math.min(60, bodyFat)); // Clamp between 0 and 60
  }

  function calculate3SiteMethod() {
    const { age, gender } = calculatorState;
    
    let sum;
    if (gender === 'male') {
      sum = calculatorState.chestFold + calculatorState.abdomenFold + calculatorState.thighFoldMale;
    } else {
      sum = calculatorState.tricepFold + calculatorState.suprailiacFold + calculatorState.thighFoldFemale;
    }
    
    // Jackson-Pollock 3-site formula
    let bodyDensity;
    if (gender === 'male') {
      bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
    } else {
      bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
    }
    
    // Siri equation to convert body density to body fat %
    const bodyFat = (495 / bodyDensity) - 450;
    
    return Math.max(0, Math.min(60, bodyFat));
  }

  function calculate7SiteMethod() {
    const { age, gender } = calculatorState;
    
    const sum = calculatorState.chest7 + calculatorState.midaxillary + calculatorState.tricep7 + 
                calculatorState.subscapular + calculatorState.abdomen7 + calculatorState.suprailiac7 + 
                calculatorState.thigh7;
    
    // Jackson-Pollock 7-site formula
    let bodyDensity;
    if (gender === 'male') {
      bodyDensity = 1.112 - (0.00043499 * sum) + (0.00000055 * sum * sum) - (0.00028826 * age);
    } else {
      bodyDensity = 1.097 - (0.00046971 * sum) + (0.00000056 * sum * sum) - (0.00012828 * age);
    }
    
    // Siri equation
    const bodyFat = (495 / bodyDensity) - 450;
    
    return Math.max(0, Math.min(60, bodyFat));
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('body-fat-result');
    const { system, gender } = calculatorState;
    
    // Format weights based on system
    const weightDisplay = system === 'imperial' 
      ? `${calculatorState.weightLbs.toFixed(1)} lbs`
      : `${calculatorState.weightKg.toFixed(1)} kg`;
    
    const fatMassDisplay = system === 'imperial'
      ? `${(results.fatMass * 2.20462).toFixed(1)} lbs`
      : `${results.fatMass.toFixed(1)} kg`;
    
    const leanMassDisplay = system === 'imperial'
      ? `${(results.leanMass * 2.20462).toFixed(1)} lbs`
      : `${results.leanMass.toFixed(1)} kg`;
    
    // Determine color based on category
    let categoryColor = '#10b981'; // green
    if (results.category === 'Essential') categoryColor = '#ef4444';
    else if (results.category === 'Athletes') categoryColor = '#10b981';
    else if (results.category === 'Fitness') categoryColor = '#84cc16';
    else if (results.category === 'Average') categoryColor = '#f59e0b';
    else if (results.category === 'Obese') categoryColor = '#ef4444';
    
    // Calculate position on scale (0-100%)
    let scalePosition;
    if (gender === 'male') {
      scalePosition = Math.min(100, Math.max(0, (results.bodyFatPercentage / 35) * 100));
    } else {
      scalePosition = Math.min(100, Math.max(0, ((results.bodyFatPercentage - 10) / 35) * 100));
    }
    
    resultDiv.innerHTML = `
      <div class="result-container">
        <div class="result-summary" style="background: linear-gradient(135deg, ${categoryColor}22 0%, ${categoryColor}11 100%); border-left: 4px solid ${categoryColor}; display: block;">
          <h2 class="result-title">
            Your Body Fat: ${results.bodyFatPercentage.toFixed(1)}%
          </h2>
          <p class="result-subtitle" style="margin-top: 1rem;">
            Category: <strong>${results.category}</strong> | 
            Method: <strong>${results.method === 'navy' ? 'U.S. Navy' : results.method === '3site' ? '3-Site Skinfold' : '7-Site Skinfold'}</strong>
          </p>
        </div>

        <div class="body-composition-visual">
          <h3 style="text-align: center; margin-bottom: 1rem;">Body Composition</h3>
          <div class="composition-bars">
            <div class="fat-bar" style="width: ${results.bodyFatPercentage}%;">
              <span style="font-size: 0.875rem;">Fat ${results.bodyFatPercentage.toFixed(1)}%</span>
            </div>
            <div class="lean-bar" style="width: ${100 - results.bodyFatPercentage}%;">
              <span style="font-size: 0.875rem;">Lean ${(100 - results.bodyFatPercentage).toFixed(1)}%</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
            <small>Fat Mass: ${fatMassDisplay}</small>
            <small>Lean Mass: ${leanMassDisplay}</small>
          </div>
        </div>

        <div class="category-indicator">
          <h4 style="text-align: center; margin-bottom: 1rem;">Your Position on Health Scale</h4>
          <div class="category-scale">
            <div class="category-marker" style="left: ${scalePosition}%;"></div>
          </div>
          <div class="category-labels">
            <small>Essential</small>
            <small>Athletes</small>
            <small>Fitness</small>
            <small>Average</small>
            <small>Obese</small>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${results.bodyFatPercentage.toFixed(1)}%</div>
            <div class="stat-label">Body Fat</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${fatMassDisplay}</div>
            <div class="stat-label">Fat Mass</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${leanMassDisplay}</div>
            <div class="stat-label">Lean Mass</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${results.bmi.toFixed(1)}</div>
            <div class="stat-label">BMI</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${results.ffmi.toFixed(1)}</div>
            <div class="stat-label">FFMI</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${results.idealMin}-${results.idealMax}%</div>
            <div class="stat-label">Ideal Range</div>
          </div>
        </div>

        <div class="info-box" style="margin-top: 2rem;">
          <h4>📊 Your Analysis</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Your body fat percentage is <strong>${results.bodyFatPercentage.toFixed(1)}%</strong> (${results.category} category)</li>
            <li>You have <strong>${fatMassDisplay}</strong> of fat mass and <strong>${leanMassDisplay}</strong> of lean mass</li>
            <li>Your BMI is <strong>${results.bmi.toFixed(1)}</strong> and FFMI is <strong>${results.ffmi.toFixed(1)}</strong></li>
            <li>Ideal body fat range for ${gender === 'male' ? 'men' : 'women'}: <strong>${results.idealMin}-${results.idealMax}%</strong></li>
            ${results.bodyFatPercentage > results.idealMax ? 
              `<li>To reach ${results.idealMax}% body fat, you'd need to lose approximately <strong>${((results.bodyFatPercentage - results.idealMax) * results.weight / 100 * 2.20462).toFixed(1)} lbs</strong> of fat</li>` :
              results.bodyFatPercentage < results.idealMin ?
              `<li>To reach ${results.idealMin}% body fat, you'd need to gain approximately <strong>${((results.idealMin - results.bodyFatPercentage) * results.weight / 100 * 2.20462).toFixed(1)} lbs</strong></li>` :
              '<li>You are within the ideal body fat range!</li>'
            }
          </ul>
        </div>

        <div class="info-box" style="margin-top: 1rem; background: #FEF3C7; border-left-color: #F59E0B;">
          <h4>💡 Tips for ${results.bodyFatPercentage > results.idealMax ? 'Reducing' : results.bodyFatPercentage < results.idealMin ? 'Increasing' : 'Maintaining'} Body Fat</h4>
          ${results.bodyFatPercentage > results.idealMax ? `
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Create a moderate calorie deficit (300-500 calories/day)</li>
              <li>Prioritize protein intake (0.8-1g per lb of body weight)</li>
              <li>Include strength training to preserve muscle mass</li>
              <li>Add cardio 3-5 times per week</li>
              <li>Track progress weekly using the same measurement method</li>
            </ul>
          ` : results.bodyFatPercentage < results.idealMin ? `
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Increase caloric intake gradually (200-300 calories/day)</li>
              <li>Focus on nutrient-dense foods</li>
              <li>Ensure adequate protein for muscle growth</li>
              <li>Include resistance training for healthy weight gain</li>
              <li>Consider consulting a nutritionist if underweight</li>
            </ul>
          ` : `
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Continue your current nutrition and exercise routine</li>
              <li>Monitor body composition monthly</li>
              <li>Focus on performance goals rather than aesthetic ones</li>
              <li>Ensure adequate protein intake for muscle maintenance</li>
              <li>Stay consistent with your healthy habits</li>
            </ul>
          `}
        </div>

        <div class="action-cards" style="margin-top: 2rem;">
          <button onclick="window.print()" class="btn btn-secondary">
            📄 Print Report
          </button>
          <button onclick="location.reload()" class="btn btn-secondary">
            🔄 Reset Calculator
          </button>
        </div>
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
  }

  function saveStateToURL() {
    const params = new URLSearchParams();
    
    Object.keys(calculatorState).forEach(key => {
      if (calculatorState[key] !== null && calculatorState[key] !== '') {
        params.set(key, calculatorState[key]);
      }
    });
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    params.forEach((value, key) => {
      if (key in calculatorState) {
        // Parse the value based on the expected type
        if (key === 'system' || key === 'gender' || key === 'method') {
          calculatorState[key] = value;
        } else {
          const numValue = parseFloat(value);
          calculatorState[key] = isNaN(numValue) ? value : numValue;
        }
      }
    });
    
    // Update form inputs
    Object.keys(calculatorState).forEach(key => {
      const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
      if (element) {
        element.value = calculatorState[key];
      }
    });
    
    // Special handling for compound IDs
    document.getElementById('height-feet').value = calculatorState.heightFeet;
    document.getElementById('height-inches').value = calculatorState.heightInches;
    document.getElementById('height-cm').value = calculatorState.heightCm;
    document.getElementById('weight-lbs').value = calculatorState.weightLbs;
    document.getElementById('weight-kg').value = calculatorState.weightKg;
    document.getElementById('gender').value = calculatorState.gender;
    document.getElementById('method').value = calculatorState.method;
    
    // Navy measurements
    document.getElementById('neck-imperial').value = calculatorState.neckImperial;
    document.getElementById('waist-imperial').value = calculatorState.waistImperial;
    document.getElementById('hip-imperial').value = calculatorState.hipImperial;
    document.getElementById('neck-metric').value = calculatorState.neckMetric;
    document.getElementById('waist-metric').value = calculatorState.waistMetric;
    document.getElementById('hip-metric').value = calculatorState.hipMetric;
    
    // Skinfold measurements
    document.getElementById('chest-fold').value = calculatorState.chestFold;
    document.getElementById('abdomen-fold').value = calculatorState.abdomenFold;
    document.getElementById('thigh-fold-male').value = calculatorState.thighFoldMale;
    document.getElementById('tricep-fold').value = calculatorState.tricepFold;
    document.getElementById('suprailiac-fold').value = calculatorState.suprailiacFold;
    document.getElementById('thigh-fold-female').value = calculatorState.thighFoldFemale;
    
    // 7-site measurements
    document.getElementById('chest-7').value = calculatorState.chest7;
    document.getElementById('midaxillary').value = calculatorState.midaxillary;
    document.getElementById('tricep-7').value = calculatorState.tricep7;
    document.getElementById('subscapular').value = calculatorState.subscapular;
    document.getElementById('abdomen-7').value = calculatorState.abdomen7;
    document.getElementById('suprailiac-7').value = calculatorState.suprailiac7;
    document.getElementById('thigh-7').value = calculatorState.thigh7;
    
    // Update unit buttons
    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.system === calculatorState.system);
    });
  }

  async function shareCalculation() {
    const shareData = {
      title: 'Body Fat Calculation',
      text: `My body fat percentage: ${calculatorState.bodyFatPercentage?.toFixed(1) || 'Calculate to see'}%`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        
        // Show success message
        const button = document.getElementById('share-calculation');
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Link Copied!';
        button.style.background = '#10b981';
        button.style.color = 'white';
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.background = '';
          button.style.color = '';
        }, 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
})();
// BMI Calculator Logic with URL Query String Support

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

function initBMICalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDiv = document.getElementById('bmi-result');
  
  if (!calculateBtn || !resultDiv) {
    console.error('BMI Calculator: Required elements not found');
    return;
  }
  
  console.log('BMI Calculator initialized');
  
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
  const inputs = document.querySelectorAll('#bmi-calculator-form input, #bmi-calculator-form select');
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
      const resultDiv = document.getElementById('bmi-result');
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
    // Imperial values
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
    
    // Metric values
    if (params.cm) {
      const cmInput = document.getElementById('height-cm');
      if (cmInput) cmInput.value = params.cm;
    }
    
    if (params.kg) {
      const kgInput = document.getElementById('weight-kg');
      if (kgInput) kgInput.value = params.kg;
    }
    
    // Optional values (same for both systems)
    if (params.age) {
      const ageInput = document.getElementById('age');
      if (ageInput) ageInput.value = params.age;
    }
    
    if (params.gender) {
      const genderSelect = document.getElementById('gender');
      if (genderSelect) genderSelect.value = params.gender;
    }
  }, 50);
}

function saveToURL() {
  const values = {
    system: currentSystem
  };
  
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
  
  // Get optional values
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  
  if (age) values.age = age;
  if (gender) values.gender = gender;
  
  // Update URL
  URLParams.update(values);
}

function addInputListeners() {
  // Get all relevant inputs
  const inputs = [
    'height-feet',
    'height-inches',
    'weight-lbs',
    'height-cm',
    'weight-kg',
    'age'
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
  
  // Handle gender select separately
  const genderSelect = document.getElementById('gender');
  if (genderSelect) {
    genderSelect.addEventListener('change', () => {
      saveToURL();
    });
  }
}

function calculateResults() {
  console.log('Calculating BMI for system:', currentSystem);
  
  let heightInMeters = 0;
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
    heightInMeters = totalInches * 0.0254;
    weightInKg = weightLbs * 0.453592;
    
  } else {
    const heightCm = parseFloat(document.getElementById('height-cm').value) || 0;
    const weightKg = parseFloat(document.getElementById('weight-kg').value) || 0;
    
    console.log('Metric inputs:', { heightCm, weightKg });
    
    // Validate inputs
    if (heightCm <= 0 || weightKg <= 0) {
      showError('Please enter valid height and weight values.');
      return;
    }
    
    heightInMeters = heightCm / 100;
    weightInKg = weightKg;
  }
  
  console.log('Converted values:', { heightInMeters, weightInKg });
  
  // Get optional fields
  const age = parseInt(document.getElementById('age').value) || null;
  const gender = document.getElementById('gender').value || null;
  
  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  console.log('Calculated BMI:', bmi);
  
  // Determine BMI category
  const category = getBMICategory(bmi);
  
  // Calculate ideal weight range
  const idealWeightRange = getIdealWeightRange(heightInMeters, currentSystem);
  
  // Calculate weight to lose/gain
  const weightDifference = getWeightDifference(weightInKg, heightInMeters, currentSystem);
  
  // Store results for printing
  lastCalculationResults = {
    bmi: bmi,
    category: category,
    heightInMeters: heightInMeters,
    weightInKg: weightInKg,
    age: age,
    gender: gender,
    system: currentSystem,
    idealWeightRange: idealWeightRange,
    weightDifference: weightDifference
  };
  
  // Save current values to URL
  saveToURL();
  
  // Display results
  displayResult(bmi, category, idealWeightRange, weightDifference, age, gender);
  
  // Track calculation
  trackCalculation('bmi', bmi);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return {
      name: 'Underweight',
      color: '#5A9FD4',
      description: 'You may be underweight. Consider consulting a healthcare provider.',
      icon: '⚠️'
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      name: 'Normal Weight',
      color: '#4CAF50',
      description: 'You have a healthy weight. Keep up the good work!',
      icon: '✓'
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      name: 'Overweight',
      color: '#FFB900',
      description: 'You may be overweight. Consider a balanced diet and regular exercise.',
      icon: '⚠️'
    };
  } else {
    return {
      name: 'Obese',
      color: '#EF5350',
      description: 'You may be obese. We recommend consulting a healthcare provider.',
      icon: '⚠️'
    };
  }
}

function getIdealWeightRange(heightInMeters, system) {
  // Using BMI range of 18.5 to 24.9 for ideal weight
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24.9 * (heightInMeters * heightInMeters);
  
  if (system === 'imperial') {
    return {
      min: Math.round(minWeight * 2.20462),
      max: Math.round(maxWeight * 2.20462),
      unit: 'lbs'
    };
  } else {
    return {
      min: Math.round(minWeight),
      max: Math.round(maxWeight),
      unit: 'kg'
    };
  }
}

function getWeightDifference(currentWeightKg, heightInMeters, system) {
  const idealMinWeight = 18.5 * (heightInMeters * heightInMeters);
  const idealMaxWeight = 24.9 * (heightInMeters * heightInMeters);
  const idealMidWeight = (idealMinWeight + idealMaxWeight) / 2;
  
  const differenceKg = currentWeightKg - idealMidWeight;
  
  if (system === 'imperial') {
    return {
      value: Math.abs(Math.round(differenceKg * 2.20462)),
      unit: 'lbs',
      direction: differenceKg > 0 ? 'lose' : 'gain'
    };
  } else {
    return {
      value: Math.abs(Math.round(differenceKg)),
      unit: 'kg',
      direction: differenceKg > 0 ? 'lose' : 'gain'
    };
  }
}

function displayResult(bmi, category, idealWeightRange, weightDifference, age, gender) {
  const resultDiv = document.getElementById('bmi-result');
  
  // Get the current URL for sharing
  const shareURL = window.location.href;
  
  // Determine if weight is in ideal range
  const isIdealWeight = category.name === 'Normal Weight';
  
  resultDiv.innerHTML = `
    <div class="result-card">
      <div class="result-header-actions">
        <h3>Your BMI Results</h3>
        <div class="result-actions">
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
      </div>
      
      <div class="result-summary">
        <div class="result-main">
          <div class="bmi-display">
            <div class="bmi-value">${bmi.toFixed(1)}</div>
            <div class="bmi-label">Body Mass Index</div>
          </div>
          <div class="bmi-category" style="background: ${category.color};">
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">${category.name}</span>
          </div>
        </div>
        
        <div class="bmi-visual">
          <div class="bmi-scale">
            <div class="scale-bar">
              <div class="scale-segment underweight" style="background: #5A9FD4;"></div>
              <div class="scale-segment normal" style="background: #4CAF50;"></div>
              <div class="scale-segment overweight" style="background: #FFB900;"></div>
              <div class="scale-segment obese" style="background: #EF5350;"></div>
            </div>
            <div class="scale-pointer" style="left: ${getScalePosition(bmi)}%;">
              <div class="pointer-line"></div>
              <div class="pointer-value">${bmi.toFixed(1)}</div>
            </div>
            <div class="scale-labels">
              <span style="left: 0;">16</span>
              <span style="left: 12.5%;">18.5</span>
              <span style="left: 37.5%;">25</span>
              <span style="left: 62.5%;">30</span>
              <span style="left: 100%;">40</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="result-details">
        <div class="detail-card">
          <h4>📊 Your Results</h4>
          <div class="detail-item">
            <span class="detail-label">BMI Score:</span>
            <span class="detail-value">${bmi.toFixed(1)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Category:</span>
            <span class="detail-value">${category.name}</span>
          </div>
          <p class="health-message">${category.description}</p>
        </div>
        
        <div class="detail-card">
          <h4>🎯 Ideal Weight Range</h4>
          <div class="detail-item">
            <span class="detail-label">Your ideal range:</span>
            <span class="detail-value">${idealWeightRange.min} - ${idealWeightRange.max} ${idealWeightRange.unit}</span>
          </div>
          ${!isIdealWeight ? `
            <div class="detail-item">
              <span class="detail-label">To reach ideal:</span>
              <span class="detail-value">
                ${weightDifference.direction === 'lose' ? 'Lose' : 'Gain'} 
                ${weightDifference.value} ${weightDifference.unit}
              </span>
            </div>
          ` : `
            <div class="success-message">
              ✓ You're within your ideal weight range!
            </div>
          `}
        </div>
        
        ${age && gender ? `
        <div class="detail-card">
          <h4>👤 Personalized Insight</h4>
          <p>${getPersonalizedInsight(bmi, age, gender)}</p>
        </div>
        ` : ''}
      </div>
      
      <div class="health-tips">
        <h4>💡 Health Recommendations</h4>
        <div class="tips-grid">
          ${getHealthTips(category.name).map(tip => `
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
    </div>
  `;
  
  resultDiv.classList.remove('hidden');
}

function getScalePosition(bmi) {
  // Map BMI to percentage position on scale (16-40 range)
  const minBMI = 16;
  const maxBMI = 40;
  const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
  return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
}

function getPersonalizedInsight(bmi, age, gender) {
  let insight = '';
  
  if (age < 20) {
    insight = 'For children and teens, BMI is age and sex-specific. Please consult a pediatrician for accurate assessment.';
  } else if (age >= 65) {
    insight = 'For older adults, a slightly higher BMI (23-30) may be protective. Muscle mass and bone density are important factors.';
  } else if (gender === 'female' && bmi < 18.5) {
    insight = 'Being underweight can affect hormonal balance and bone health. Consider consulting a healthcare provider.';
  } else if (gender === 'male' && bmi > 25 && bmi < 30) {
    insight = 'If you have high muscle mass from regular exercise, your BMI might not accurately reflect your health status.';
  } else {
    insight = `At ${age} years old, maintaining a healthy BMI through balanced nutrition and regular exercise is important for long-term health.`;
  }
  
  return insight;
}

function getHealthTips(category) {
  const tips = {
    'Underweight': [
      {
        icon: '🍎',
        title: 'Nutrition',
        description: 'Focus on nutrient-dense foods with healthy fats, proteins, and complex carbohydrates.'
      },
      {
        icon: '💪',
        title: 'Exercise',
        description: 'Include strength training to build muscle mass along with moderate cardio.'
      },
      {
        icon: '🩺',
        title: 'Health Check',
        description: 'Consult a doctor to rule out underlying health conditions affecting weight.'
      }
    ],
    'Normal Weight': [
      {
        icon: '🥗',
        title: 'Maintain Balance',
        description: 'Continue with your balanced diet and regular meal patterns.'
      },
      {
        icon: '🏃',
        title: 'Stay Active',
        description: 'Aim for 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly.'
      },
      {
        icon: '💤',
        title: 'Healthy Habits',
        description: 'Prioritize good sleep, stress management, and regular health check-ups.'
      }
    ],
    'Overweight': [
      {
        icon: '🥦',
        title: 'Nutrition',
        description: 'Create a moderate calorie deficit with whole foods, vegetables, and lean proteins.'
      },
      {
        icon: '🚶',
        title: 'Physical Activity',
        description: 'Start with 30 minutes of daily walking and gradually increase intensity.'
      },
      {
        icon: '📊',
        title: 'Track Progress',
        description: 'Monitor your food intake and activity levels to identify improvement areas.'
      }
    ],
    'Obese': [
      {
        icon: '🩺',
        title: 'Medical Support',
        description: 'Consider working with healthcare providers for a comprehensive weight loss plan.'
      },
      {
        icon: '🍽️',
        title: 'Portion Control',
        description: 'Focus on portion sizes and eat slowly to recognize fullness cues.'
      },
      {
        icon: '👥',
        title: 'Support System',
        description: 'Join a support group or work with a dietitian for sustainable lifestyle changes.'
      }
    ]
  };
  
  return tips[category] || tips['Normal Weight'];
}

function shareResults() {
  const shareURL = window.location.href;
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'My BMI Results - CalcCrunch',
      text: `Check out my BMI calculation: ${lastCalculationResults.bmi.toFixed(1)} (${lastCalculationResults.category.name})`,
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
    'height-feet',
    'height-inches',
    'weight-lbs',
    'height-cm',
    'weight-kg',
    'age'
  ];
  
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
    }
  });
  
  // Clear gender select
  const genderSelect = document.getElementById('gender');
  if (genderSelect) {
    genderSelect.value = '';
  }
  
  // Clear URL parameters
  URLParams.clear();
  
  // Hide results
  const resultDiv = document.getElementById('bmi-result');
  if (resultDiv) {
    resultDiv.classList.add('hidden');
  }
  
  // Reset to default values if provided in HTML
  document.getElementById('height-feet').value = '5';
  document.getElementById('height-inches').value = '10';
  document.getElementById('weight-lbs').value = '170';
  document.getElementById('height-cm').value = '178';
  document.getElementById('weight-kg').value = '77';
  document.getElementById('age').value = '30';
}

function printResults() {
  if (!lastCalculationResults) {
    alert('Please calculate your BMI first before printing.');
    return;
  }
  
  const printWindow = window.open('', '_blank');
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const data = lastCalculationResults;
  const category = data.category;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BMI Results - CalcCrunch.com</title>
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
        .main-result .label {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .main-result .bmi-score { 
          font-size: 64px; 
          color: ${category.color}; 
          font-weight: bold;
          margin: 20px 0;
        }
        .main-result .category {
          display: inline-block;
          padding: 10px 30px;
          background: ${category.color};
          color: white;
          border-radius: 25px;
          font-size: 24px;
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
        .health-message {
          padding: 20px;
          background: ${category.color}15;
          border-left: 4px solid ${category.color};
          margin: 20px 0;
          border-radius: 5px;
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
        <h1>BMI Results Report</h1>
        <div class="subtitle">Generated on ${currentDate} • CalcCrunch.com</div>
      </div>
      
      <div class="main-result">
        <div class="label">Your Body Mass Index</div>
        <div class="bmi-score">${data.bmi.toFixed(1)}</div>
        <div class="category">${category.icon} ${category.name}</div>
      </div>
      
      <div class="health-message">
        <strong>Health Assessment:</strong> ${category.description}
      </div>
      
      <div class="section">
        <h2>Your Measurements</h2>
        <table>
          <tr>
            <td><strong>Height</strong></td>
            <td>${data.system === 'imperial' 
              ? Math.floor(data.heightInMeters * 39.3701 / 12) + "' " + Math.round((data.heightInMeters * 39.3701) % 12) + '"'
              : (data.heightInMeters * 100).toFixed(0) + ' cm'
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
            <td><strong>BMI</strong></td>
            <td>${data.bmi.toFixed(1)}</td>
          </tr>
          <tr>
            <td><strong>Category</strong></td>
            <td>${category.name}</td>
          </tr>
          ${data.age ? `
          <tr>
            <td><strong>Age</strong></td>
            <td>${data.age} years</td>
          </tr>
          ` : ''}
          ${data.gender ? `
          <tr>
            <td><strong>Gender</strong></td>
            <td>${data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div class="section">
        <h2>Ideal Weight Range</h2>
        <table>
          <tr>
            <td><strong>Your Ideal Weight Range</strong></td>
            <td>${data.idealWeightRange.min} - ${data.idealWeightRange.max} ${data.idealWeightRange.unit}</td>
          </tr>
          ${category.name !== 'Normal Weight' ? `
          <tr>
            <td><strong>To Reach Ideal Weight</strong></td>
            <td>${data.weightDifference.direction === 'lose' ? 'Lose' : 'Gain'} ${data.weightDifference.value} ${data.weightDifference.unit}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      ${data.age && data.gender ? `
      <div class="section">
        <h2>Personalized Insight</h2>
        <p style="padding: 15px; background: #f9f9f9; border-radius: 8px;">
          ${getPersonalizedInsight(data.bmi, data.age, data.gender)}
        </p>
      </div>
      ` : ''}
      
      <div class="section">
        <h2>Health Tips</h2>
        <div class="tips">
          ${getHealthTips(category.name).map(tip => `
            <div class="tip">
              <strong>${tip.icon} ${tip.title}</strong>
              <p>${tip.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="section">
        <h2>BMI Categories Reference</h2>
        <table>
          <tr>
            <th>Category</th>
            <th>BMI Range</th>
          </tr>
          <tr>
            <td>Underweight</td>
            <td>Less than 18.5</td>
          </tr>
          <tr>
            <td>Normal Weight</td>
            <td>18.5 - 24.9</td>
          </tr>
          <tr>
            <td>Overweight</td>
            <td>25.0 - 29.9</td>
          </tr>
          <tr>
            <td>Obese</td>
            <td>30.0 or greater</td>
          </tr>
        </table>
      </div>
      
      <div class="disclaimer">
        <strong>⚕️ Medical Disclaimer:</strong> This BMI calculator is for informational purposes only and 
        should not replace professional medical advice. BMI is a screening tool and may not accurately reflect 
        body composition in athletes, pregnant women, elderly individuals, or those with certain medical conditions. 
        Please consult with a healthcare provider for personalized health advice.
      </div>
      
      <div class="footer">
        <p><strong>CalcCrunch.com</strong> - Free Online Calculator Tools</p>
        <p>Generated on ${currentDate}</p>
        <p style="margin-top: 10px;">This report is for informational purposes only and does not constitute medical advice.</p>
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
  const resultDiv = document.getElementById('bmi-result');
  resultDiv.innerHTML = `
    <div class="error-message">
      <strong>⚠️ Error:</strong> ${message}
    </div>
  `;
  resultDiv.classList.remove('hidden');
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
  document.addEventListener('DOMContentLoaded', initBMICalculator);
} else {
  initBMICalculator();
}
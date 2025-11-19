(() => {
  // State management
  let calculatorState = {
    originalServings: 4,
    desiredServings: 8,
    ingredients: [],
    convertAmount: 1,
    convertFrom: 'tbsp',
    convertTo: 'cup',
    tempFahrenheit: 350,
    tempCelsius: 177
  };

  // Conversion factors to base units (ml for volume, g for weight)
  const conversions = {
    // Volume - base unit: ml
    'tsp': { value: 4.92892, type: 'volume', display: 'tsp' },
    'tbsp': { value: 14.7868, type: 'volume', display: 'tbsp' },
    'fl-oz': { value: 29.5735, type: 'volume', display: 'fl oz' },
    'cup': { value: 236.588, type: 'volume', display: 'cup' },
    'pint': { value: 473.176, type: 'volume', display: 'pint' },
    'quart': { value: 946.353, type: 'volume', display: 'quart' },
    'gallon': { value: 3785.41, type: 'volume', display: 'gallon' },
    'ml': { value: 1, type: 'volume', display: 'ml' },
    'l': { value: 1000, type: 'volume', display: 'L' },
    
    // Weight - base unit: g
    'oz': { value: 28.3495, type: 'weight', display: 'oz' },
    'lb': { value: 453.592, type: 'weight', display: 'lb' },
    'g': { value: 1, type: 'weight', display: 'g' },
    'kg': { value: 1000, type: 'weight', display: 'kg' }
  };

  // Common fractions for display
  const fractions = {
    0.125: '⅛',
    0.25: '¼',
    0.333: '⅓',
    0.375: '⅜',
    0.5: '½',
    0.625: '⅝',
    0.666: '⅔',
    0.75: '¾',
    0.875: '⅞'
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    loadStateFromURL();
    attachEventListeners();
    updateScaleFactor();
    
    // Add default ingredients if none exist
    if (calculatorState.ingredients.length === 0) {
      addDefaultIngredients();
    } else {
      renderIngredients();
    }
    
    updateConversion();
    updateTemperatures();
  }

  function attachEventListeners() {
    // Scaling inputs
    document.getElementById('original-servings').addEventListener('input', (e) => {
      updateState('originalServings', parseFloat(e.target.value) || 1);
      updateScaleFactor();
      updateAllScaledAmounts();
    });
    
    document.getElementById('desired-servings').addEventListener('input', (e) => {
      updateState('desiredServings', parseFloat(e.target.value) || 1);
      updateScaleFactor();
      updateAllScaledAmounts();
    });
    
    // Add ingredient button
    document.getElementById('add-ingredient').addEventListener('click', addIngredient);
    
    // Measurement converter
    document.getElementById('convert-amount').addEventListener('input', (e) => {
      updateState('convertAmount', parseFloat(e.target.value) || 0);
      updateConversion();
    });
    
    document.getElementById('convert-from').addEventListener('change', (e) => {
      updateState('convertFrom', e.target.value);
      updateConversion();
    });
    
    document.getElementById('convert-to').addEventListener('change', (e) => {
      updateState('convertTo', e.target.value);
      updateConversion();
    });
    
    // Temperature converter
    document.getElementById('temp-fahrenheit').addEventListener('input', (e) => {
      const fahrenheit = parseFloat(e.target.value) || 0;
      updateState('tempFahrenheit', fahrenheit);
      const celsius = (fahrenheit - 32) * 5 / 9;
      updateState('tempCelsius', Math.round(celsius));
      document.getElementById('temp-celsius').value = Math.round(celsius);
    });
    
    document.getElementById('temp-celsius').addEventListener('input', (e) => {
      const celsius = parseFloat(e.target.value) || 0;
      updateState('tempCelsius', celsius);
      const fahrenheit = (celsius * 9 / 5) + 32;
      updateState('tempFahrenheit', Math.round(fahrenheit));
      document.getElementById('temp-fahrenheit').value = Math.round(fahrenheit);
    });
    
    // Action buttons
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    document.getElementById('print-recipe').addEventListener('click', () => window.print());
    document.getElementById('clear-btn').addEventListener('click', clearAll);
    document.getElementById('share-calculation').addEventListener('click', shareRecipe);
  }

  function addDefaultIngredients() {
    calculatorState.ingredients = [
      { amount: 2, unit: 'cup', name: 'All-purpose flour' },
      { amount: 1, unit: 'tsp', name: 'Baking powder' },
      { amount: 0.5, unit: 'tsp', name: 'Salt' },
      { amount: 0.5, unit: 'cup', name: 'Butter, softened' },
      { amount: 1, unit: 'cup', name: 'Sugar' }
    ];
    renderIngredients();
  }

  function addIngredient() {
    const ingredient = {
      amount: 1,
      unit: 'cup',
      name: ''
    };
    calculatorState.ingredients.push(ingredient);
    renderIngredients();
    
    // Focus on the new ingredient name field
    setTimeout(() => {
      const lastRow = document.querySelector('.ingredient-row:last-child .ingredient-name');
      if (lastRow) lastRow.focus();
    }, 100);
  }

  function removeIngredient(index) {
    calculatorState.ingredients.splice(index, 1);
    renderIngredients();
    saveStateToURL();
  }

  function renderIngredients() {
    const container = document.getElementById('ingredient-list');
    container.innerHTML = '';
    
    calculatorState.ingredients.forEach((ingredient, index) => {
      const row = document.createElement('div');
      row.className = 'ingredient-row';
      
      const scaledAmount = calculateScaledAmount(ingredient.amount);
      
      row.innerHTML = `
        <input 
          type="number" 
          class="ingredient-amount" 
          value="${ingredient.amount}"
          min="0"
          step="0.125"
          data-index="${index}"
          placeholder="1"
        />
        <select class="ingredient-unit" data-index="${index}">
          <optgroup label="Volume">
            <option value="tsp" ${ingredient.unit === 'tsp' ? 'selected' : ''}>tsp</option>
            <option value="tbsp" ${ingredient.unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
            <option value="fl-oz" ${ingredient.unit === 'fl-oz' ? 'selected' : ''}>fl oz</option>
            <option value="cup" ${ingredient.unit === 'cup' ? 'selected' : ''}>cup</option>
            <option value="pint" ${ingredient.unit === 'pint' ? 'selected' : ''}>pint</option>
            <option value="quart" ${ingredient.unit === 'quart' ? 'selected' : ''}>quart</option>
            <option value="ml" ${ingredient.unit === 'ml' ? 'selected' : ''}>ml</option>
            <option value="l" ${ingredient.unit === 'l' ? 'selected' : ''}>L</option>
          </optgroup>
          <optgroup label="Weight">
            <option value="oz" ${ingredient.unit === 'oz' ? 'selected' : ''}>oz</option>
            <option value="lb" ${ingredient.unit === 'lb' ? 'selected' : ''}>lb</option>
            <option value="g" ${ingredient.unit === 'g' ? 'selected' : ''}>g</option>
            <option value="kg" ${ingredient.unit === 'kg' ? 'selected' : ''}>kg</option>
          </optgroup>
          <optgroup label="Other">
            <option value="pinch" ${ingredient.unit === 'pinch' ? 'selected' : ''}>pinch</option>
            <option value="dash" ${ingredient.unit === 'dash' ? 'selected' : ''}>dash</option>
            <option value="item" ${ingredient.unit === 'item' ? 'selected' : ''}>item</option>
          </optgroup>
        </select>
        <input 
          type="text" 
          class="ingredient-name" 
          value="${ingredient.name}"
          data-index="${index}"
          placeholder="Ingredient name"
        />
        <div class="scaled-amount">${formatAmount(scaledAmount)} ${ingredient.unit}</div>
        <button class="remove-ingredient" onclick="(() => { 
          const index = ${index};
          window.recipeScaler.removeIngredient(index);
        })()">×</button>
      `;
      
      container.appendChild(row);
    });
    
    // Attach event listeners to new elements
    document.querySelectorAll('.ingredient-amount').forEach(input => {
      input.addEventListener('input', (e) => {
        const index = parseInt(e.target.dataset.index);
        calculatorState.ingredients[index].amount = parseFloat(e.target.value) || 0;
        updateScaledAmount(index);
        saveStateToURL();
      });
    });
    
    document.querySelectorAll('.ingredient-unit').forEach(select => {
      select.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index);
        calculatorState.ingredients[index].unit = e.target.value;
        updateScaledAmount(index);
        saveStateToURL();
      });
    });
    
    document.querySelectorAll('.ingredient-name').forEach(input => {
      input.addEventListener('input', (e) => {
        const index = parseInt(e.target.dataset.index);
        calculatorState.ingredients[index].name = e.target.value;
        saveStateToURL();
      });
    });
  }

  function calculateScaledAmount(amount) {
    const scaleFactor = calculatorState.desiredServings / calculatorState.originalServings;
    return amount * scaleFactor;
  }

  function updateScaledAmount(index) {
    const row = document.querySelectorAll('.ingredient-row')[index];
    if (!row) return;
    
    const scaledAmountDiv = row.querySelector('.scaled-amount');
    const ingredient = calculatorState.ingredients[index];
    const scaledAmount = calculateScaledAmount(ingredient.amount);
    scaledAmountDiv.textContent = `${formatAmount(scaledAmount)} ${ingredient.unit}`;
  }

  function updateAllScaledAmounts() {
    calculatorState.ingredients.forEach((_, index) => {
      updateScaledAmount(index);
    });
  }

  function formatAmount(amount) {
    // Handle zero
    if (amount === 0) return '0';
    
    // Round to 3 decimal places
    amount = Math.round(amount * 1000) / 1000;
    
    // Check if it's close to a common fraction
    const wholePart = Math.floor(amount);
    const decimalPart = amount - wholePart;
    
    // Check for common fractions
    for (const [decimal, fraction] of Object.entries(fractions)) {
      if (Math.abs(decimalPart - parseFloat(decimal)) < 0.01) {
        return wholePart === 0 ? fraction : `${wholePart} ${fraction}`;
      }
    }
    
    // If not a common fraction, return as decimal
    if (amount === Math.floor(amount)) {
      return amount.toString();
    } else {
      return amount.toFixed(3).replace(/\.?0+$/, '');
    }
  }

  function updateScaleFactor() {
    const scaleFactor = calculatorState.desiredServings / calculatorState.originalServings;
    const scaleFactorElement = document.getElementById('scale-factor');
    
    if (scaleFactor === 1) {
      scaleFactorElement.textContent = '1x (No Change)';
    } else if (scaleFactor < 1) {
      scaleFactorElement.textContent = `${formatAmount(scaleFactor)}x (Reduced)`;
    } else {
      scaleFactorElement.textContent = `${formatAmount(scaleFactor)}x (Increased)`;
    }
    
    // Update color based on scale
    const scaleDisplay = document.querySelector('.scale-factor-display');
    if (scaleFactor === 1) {
      scaleDisplay.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    } else if (scaleFactor < 1) {
      scaleDisplay.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    } else {
      scaleDisplay.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%);';
    }
  }

  function updateConversion() {
    const { convertAmount, convertFrom, convertTo } = calculatorState;
    
    const fromUnit = conversions[convertFrom];
    const toUnit = conversions[convertTo];
    
    if (!fromUnit || !toUnit) {
      document.getElementById('conversion-result').innerHTML = 
        '<span class="conversion-value">Select valid units</span>';
      return;
    }
    
    if (fromUnit.type !== toUnit.type) {
      document.getElementById('conversion-result').innerHTML = 
        '<span class="conversion-value" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">Cannot convert between volume and weight</span>';
      return;
    }
    
    // Convert to base unit, then to target unit
    const baseValue = convertAmount * fromUnit.value;
    const result = baseValue / toUnit.value;
    
    document.getElementById('conversion-result').innerHTML = 
      `<span class="conversion-value">${formatAmount(convertAmount)} ${fromUnit.display} = ${formatAmount(result)} ${toUnit.display}</span>`;
  }

  function updateTemperatures() {
    document.getElementById('temp-fahrenheit').value = calculatorState.tempFahrenheit;
    document.getElementById('temp-celsius').value = calculatorState.tempCelsius;
  }

  function calculateResults() {
    const resultDiv = document.getElementById('recipe-result');
    const scaleFactor = calculatorState.desiredServings / calculatorState.originalServings;
    
    // Filter out empty ingredients
    const validIngredients = calculatorState.ingredients.filter(ing => ing.name && ing.amount > 0);
    
    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }
    
    let scaledRecipeHTML = `
      <div class="result-container">
        <div class="result-summary" style="display: block; background: linear-gradient(135deg, #FF6B3522 0%, #E55A2811 100%); border-left: 4px solid #FF6B35;">
          <h2 class="result-title">
            Scaled Recipe (${calculatorState.desiredServings} servings)
          </h2>
          <p class="result-subtitle" style="margin-top: 1rem;">
            Scaled from ${calculatorState.originalServings} to ${calculatorState.desiredServings} servings (${formatAmount(scaleFactor)}x)
          </p>
        </div>

        <div class="scaled-recipe" style="margin-top: 2rem;">
          <h3 style="margin-bottom: 1rem; color: #2C5F8D;">📝 Ingredients List</h3>
          <ul class="recipe-list" style="list-style: none; padding: 0;">
            ${validIngredients.map(ing => {
              const scaledAmount = calculateScaledAmount(ing.amount);
              return `
                <li style="padding: 0.75rem; background: #f9fafb; margin-bottom: 0.5rem; border-radius: 6px; display: flex; justify-content: space-between;">
                  <span><strong>${formatAmount(scaledAmount)} ${ing.unit}</strong> ${ing.name}</span>
                  ${scaleFactor !== 1 ? `<span style="color: #6b7280; font-size: 0.875rem;">(was ${formatAmount(ing.amount)} ${ing.unit})</span>` : ''}
                </li>
              `;
            }).join('')}
          </ul>
        </div>

        <div class="shopping-list" style="margin-top: 2rem; padding: 1.5rem; background: #E8F4F8; border-radius: 8px;">
          <h3 style="margin-bottom: 1rem; color: #2C5F8D;">🛒 Shopping List</h3>
          <div style="padding: 1rem; background: white; border-radius: 6px; font-family: monospace;">
            ${validIngredients.map(ing => {
              const scaledAmount = calculateScaledAmount(ing.amount);
              return `☐ ${formatAmount(scaledAmount)} ${ing.unit} - ${ing.name}`;
            }).join('<br>')}
          </div>
        </div>

        <div class="tips-section" style="margin-top: 2rem;">
          <h3 style="margin-bottom: 1rem; color: #2C5F8D;">👨‍🍳 Scaling Tips</h3>
          ${scaleFactor > 2 ? `
            <div class="info-box" style="background: #FEF3C7; border-left-color: #F59E0B;">
              <strong>Large Batch Alert!</strong> You're making ${formatAmount(scaleFactor)}x the original recipe:
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Check that your cookware is large enough</li>
                <li>Cooking time may increase by 25-50%</li>
                <li>Consider making in multiple batches</li>
                <li>Taste and adjust seasonings as you go</li>
              </ul>
            </div>
          ` : ''}
          ${scaleFactor < 0.5 ? `
            <div class="info-box" style="background: #E0E7FF; border-left-color: #3B82F6;">
              <strong>Small Batch Note:</strong> You're making ${formatAmount(scaleFactor)}x the original recipe:
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Use smaller cookware for best results</li>
                <li>Reduce cooking time by 10-25%</li>
                <li>Check for doneness earlier than usual</li>
                <li>Some ingredients may not scale perfectly (like eggs)</li>
              </ul>
            </div>
          ` : ''}
          ${scaleFactor === 1 ? `
            <div class="info-box" style="background: #D1FAE5; border-left-color: #10B981;">
              <strong>No scaling needed!</strong> You're making the original recipe as-is.
            </div>
          ` : ''}
        </div>

        <div class="action-cards" style="margin-top: 2rem;">
          <button onclick="window.print()" class="btn btn-secondary">
            📄 Print Recipe
          </button>
          <button onclick="(() => {
            const text = document.querySelector('.recipe-list').innerText;
            navigator.clipboard.writeText(text);
            alert('Recipe copied to clipboard!');
          })()" class="btn btn-secondary">
            📋 Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    
    resultDiv.innerHTML = scaledRecipeHTML;
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clearAll() {
    if (confirm('Clear all ingredients? This cannot be undone.')) {
      calculatorState.ingredients = [];
      renderIngredients();
      saveStateToURL();
    }
  }

  function updateState(key, value) {
    calculatorState[key] = value;
    saveStateToURL();
  }

  function saveStateToURL() {
    const params = new URLSearchParams();
    
    // Save simple values
    params.set('originalServings', calculatorState.originalServings);
    params.set('desiredServings', calculatorState.desiredServings);
    params.set('convertAmount', calculatorState.convertAmount);
    params.set('convertFrom', calculatorState.convertFrom);
    params.set('convertTo', calculatorState.convertTo);
    params.set('tempFahrenheit', calculatorState.tempFahrenheit);
    params.set('tempCelsius', calculatorState.tempCelsius);
    
    // Save ingredients as JSON
    if (calculatorState.ingredients.length > 0) {
      params.set('ingredients', JSON.stringify(calculatorState.ingredients));
    }
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load simple values
    if (params.has('originalServings')) {
      calculatorState.originalServings = parseFloat(params.get('originalServings'));
      document.getElementById('original-servings').value = calculatorState.originalServings;
    }
    if (params.has('desiredServings')) {
      calculatorState.desiredServings = parseFloat(params.get('desiredServings'));
      document.getElementById('desired-servings').value = calculatorState.desiredServings;
    }
    if (params.has('convertAmount')) {
      calculatorState.convertAmount = parseFloat(params.get('convertAmount'));
      document.getElementById('convert-amount').value = calculatorState.convertAmount;
    }
    if (params.has('convertFrom')) {
      calculatorState.convertFrom = params.get('convertFrom');
      document.getElementById('convert-from').value = calculatorState.convertFrom;
    }
    if (params.has('convertTo')) {
      calculatorState.convertTo = params.get('convertTo');
      document.getElementById('convert-to').value = calculatorState.convertTo;
    }
    if (params.has('tempFahrenheit')) {
      calculatorState.tempFahrenheit = parseFloat(params.get('tempFahrenheit'));
    }
    if (params.has('tempCelsius')) {
      calculatorState.tempCelsius = parseFloat(params.get('tempCelsius'));
    }
    
    // Load ingredients
    if (params.has('ingredients')) {
      try {
        calculatorState.ingredients = JSON.parse(params.get('ingredients'));
      } catch (e) {
        console.error('Error parsing ingredients from URL:', e);
        calculatorState.ingredients = [];
      }
    }
  }

  async function shareRecipe() {
    const shareData = {
      title: `Scaled Recipe (${calculatorState.desiredServings} servings)`,
      text: `Check out my scaled recipe from ${calculatorState.originalServings} to ${calculatorState.desiredServings} servings!`,
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

  // Export functions for global access
  window.recipeScaler = {
    removeIngredient
  };
})();
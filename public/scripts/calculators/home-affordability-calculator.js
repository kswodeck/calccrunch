// Home Affordability Calculator
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    annualIncome: 75000,
    monthlyDebts: 500,
    downPayment: 20000,
    downPaymentPercent: 10,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    homeInsurance: 1200,
    hoaFees: 0,
    pmiRate: 0.5,
    maxDtiHousing: 28,
    maxDtiTotal: 36
  };

  // State
  let state = {
    downPaymentMode: '$', // '$' or '%'
    propertyTaxMode: '%', // '$' or '%'
    insuranceMode: '$', // '$' or '%'
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updateDownPaymentValue();
    updatePropertyTaxValue();
    updateInsuranceValue();
  });

  function initializeForm() {
    // Set default values
    setValue('annual-income', DEFAULT_VALUES.annualIncome);
    setValue('monthly-debts', DEFAULT_VALUES.monthlyDebts);
    setValue('down-payment', DEFAULT_VALUES.downPayment);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('loan-term', DEFAULT_VALUES.loanTerm);
    setValue('property-tax-rate', DEFAULT_VALUES.propertyTaxRate);
    setValue('home-insurance', DEFAULT_VALUES.homeInsurance);
    setValue('hoa-fees', DEFAULT_VALUES.hoaFees);
    setValue('pmi-rate', DEFAULT_VALUES.pmiRate);
    setValue('max-dti-housing', DEFAULT_VALUES.maxDtiHousing);
    setValue('max-dti-total', DEFAULT_VALUES.maxDtiTotal);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      'annual-income', 'monthly-debts', 'down-payment', 'interest-rate', 
      'loan-term', 'property-tax-rate', 'home-insurance', 'hoa-fees', 
      'pmi-rate', 'max-dti-housing', 'max-dti-total'
    ];
    
    fields.forEach(field => {
      const paramName = field.replace(/-/g, '_');
      if (params.has(paramName)) {
        const value = parseFloat(params.get(paramName));
        if (!isNaN(value)) {
          setValue(field, value);
        }
      }
    });
    
    // Load down payment mode
    if (params.has('down_payment_mode')) {
      state.downPaymentMode = params.get('down_payment_mode') === '%' ? '%' : '$';
      updateDownPaymentMode();
    }
    
    // Load property tax mode
    if (params.has('property_tax_mode')) {
      state.propertyTaxMode = params.get('property_tax_mode') === '%' ? '%' : '$';
      updatePropertyTaxMode();
    }
    
    // Load insurance mode
    if (params.has('insurance_mode')) {
      state.insuranceMode = params.get('insurance_mode') === '%' ? '%' : '$';
      updateInsuranceMode();
    }
    
    // Update sliders if values were loaded
    const dtiHousingSlider = document.getElementById('dti-housing-slider');
    const dtiTotalSlider = document.getElementById('dti-total-slider');
    if (dtiHousingSlider) {
      dtiHousingSlider.value = getValue('max-dti-housing');
    }
    if (dtiTotalSlider) {
      dtiTotalSlider.value = getValue('max-dti-total');
    }
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        checkPMIRequired();
        calculateAffordability();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save numeric values
    const fields = [
      { id: 'annual-income', param: 'annual_income' },
      { id: 'monthly-debts', param: 'monthly_debts' },
      { id: 'down-payment', param: 'down_payment' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'loan-term', param: 'loan_term' },
      { id: 'property-tax-rate', param: 'property_tax_rate' },
      { id: 'home-insurance', param: 'home_insurance' },
      { id: 'hoa-fees', param: 'hoa_fees' },
      { id: 'pmi-rate', param: 'pmi_rate' },
      { id: 'max-dti-housing', param: 'max_dti_housing' },
      { id: 'max-dti-total', param: 'max_dti_total' }
    ];
    
    fields.forEach(field => {
      const value = getValue(field.id);
      if (value !== 0 || field.id === 'monthly-debts' || field.id === 'hoa-fees') {
        params.set(field.param, value);
      }
    });
    
    // Save modes
    params.set('down_payment_mode', state.downPaymentMode);
    params.set('property_tax_mode', state.propertyTaxMode);
    params.set('insurance_mode', state.insuranceMode);
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function updateDownPaymentMode() {
    const unit = document.getElementById('down-payment-unit');
    const input = document.getElementById('down-payment');
    const help = document.getElementById('down-payment-help');
    
    if (!unit || !input || !help) return;
    
    unit.textContent = state.downPaymentMode;
    
    if (state.downPaymentMode === '%') {
      help.textContent = 'Enter down payment percentage (click % to switch)';
      input.step = '1';
      input.max = '100';
    } else {
      help.textContent = 'Enter down payment amount (click $ to switch)';
      input.step = '500';
      input.max = '';
    }
  }

  function updatePropertyTaxMode() {
    const unit = document.getElementById('property-tax-unit');
    const input = document.getElementById('property-tax-rate');
    const help = document.getElementById('property-tax-help');
    
    if (!unit || !input || !help) return;
    
    unit.textContent = state.propertyTaxMode;
    
    if (state.propertyTaxMode === '%') {
      help.textContent = 'Enter property tax rate (click % to switch)';
      input.step = '0.1';
      input.max = '10';
    } else {
      help.textContent = 'Enter yearly property tax amount (click $ to switch)';
      input.step = '50';
      input.max = '';
    }
  }

  function updateInsuranceMode() {
    const unit = document.getElementById('insurance-unit');
    const input = document.getElementById('home-insurance');
    const help = document.getElementById('insurance-help');
    
    if (!unit || !input || !help) return;
    
    unit.textContent = state.insuranceMode;
    
    if (state.insuranceMode === '%') {
      help.textContent = 'Enter insurance rate (click % to switch)';
      input.step = '0.05';
      input.max = '5';
    } else {
      help.textContent = 'Enter yearly insurance amount (click $ to switch)';
      input.step = '50';
      input.max = '';
    }
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateAffordability);
    }

    // Toggle units for down payment
    const downPaymentUnit = document.getElementById('down-payment-unit');
    if (downPaymentUnit) {
      downPaymentUnit.addEventListener('click', toggleDownPaymentUnit);
    }

    // Toggle units for property tax
    const propertyTaxUnit = document.getElementById('property-tax-unit');
    if (propertyTaxUnit) {
      propertyTaxUnit.addEventListener('click', togglePropertyTaxUnit);
    }

    // Toggle units for insurance
    const insuranceUnit = document.getElementById('insurance-unit');
    if (insuranceUnit) {
      insuranceUnit.addEventListener('click', toggleInsuranceUnit);
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Auto-calculate on enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calculateAffordability();
        }
      });
      
      // Save to URL on change
      input.addEventListener('change', function() {
        saveToURL();
      });
      
      // Also save on input for real-time updates
      if (input.type === 'number' || input.type === 'text') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
          }, 500); // Debounce to avoid too many URL updates
        });
      }
    });

    // Check PMI when down payment changes
    const downPaymentInput = document.getElementById('down-payment');
    if (downPaymentInput) {
      downPaymentInput.addEventListener('input', checkPMIRequired);
    }

    // DTI slider synchronization
    const dtiHousingSlider = document.getElementById('dti-housing-slider');
    const dtiTotalSlider = document.getElementById('dti-total-slider');
    const dtiHousingInput = document.getElementById('max-dti-housing');
    const dtiTotalInput = document.getElementById('max-dti-total');

    if (dtiHousingSlider && dtiHousingInput) {
      dtiHousingSlider.addEventListener('input', function() {
        dtiHousingInput.value = this.value;
        saveToURL();
        calculateAffordability();
      });
      dtiHousingInput.addEventListener('input', function() {
        dtiHousingSlider.value = this.value;
        saveToURL();
      });
    }

    if (dtiTotalSlider && dtiTotalInput) {
      dtiTotalSlider.addEventListener('input', function() {
        dtiTotalInput.value = this.value;
        saveToURL();
        calculateAffordability();
      });
      dtiTotalInput.addEventListener('input', function() {
        dtiTotalSlider.value = this.value;
        saveToURL();
      });
    }

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }

    // Print button
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
  }

  function toggleDownPaymentUnit() {
    const input = document.getElementById('down-payment');
    const currentValue = getValue('down-payment');
    
    state.downPaymentMode = state.downPaymentMode === '$' ? '%' : '$';
    
    // Convert value between modes (estimate home price for conversion)
    const income = getValue('annual-income');
    const estimatedHomePrice = income * 4; // Rough estimate: 4x annual income
    
    if (state.downPaymentMode === '%') {
      // Converting from $ to %
      const percentage = estimatedHomePrice > 0 ? (currentValue / estimatedHomePrice) * 100 : 20;
      input.value = Math.min(100, Math.round(percentage));
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * estimatedHomePrice;
      input.value = Math.round(amount / 100) * 100; // Round to nearest $100
    }
    
    updateDownPaymentMode();
    checkPMIRequired();
    saveToURL();
  }

  function checkPMIRequired() {
    const downPaymentInput = document.getElementById('down-payment');
    const pmiInput = document.getElementById('pmi-rate');
    const pmiHelp = document.getElementById('pmi-help');
    
    if (!downPaymentInput || !pmiInput) return;
    
    const downPaymentValue = parseFloat(downPaymentInput.value) || 0;
    let requiresPMI = true;
    
    if (state.downPaymentMode === '%') {
      requiresPMI = downPaymentValue < 20;
    }
    
    if (requiresPMI) {
      pmiInput.disabled = false;
      pmiInput.classList.remove('disabled');
      if (pmiHelp) {
        pmiHelp.textContent = 'Annual PMI rate (required - down payment < 20%)';
        pmiHelp.classList.remove('text-success');
      }
    } else {
      pmiInput.disabled = true;
      pmiInput.classList.add('disabled');
      pmiInput.value = '0';
      if (pmiHelp) {
        pmiHelp.textContent = '✓ PMI not required (down payment ≥ 20%)';
        pmiHelp.classList.add('text-success');
      }
    }
  }

  function togglePropertyTaxUnit() {
    const input = document.getElementById('property-tax-rate');
    const currentValue = getValue('property-tax-rate');
    
    state.propertyTaxMode = state.propertyTaxMode === '$' ? '%' : '$';
    
    // Convert value between modes (estimate home price for conversion)
    const income = getValue('annual-income');
    const estimatedHomePrice = income * 4; // Rough estimate: 4x annual income
    
    if (state.propertyTaxMode === '%') {
      // Converting from $ to %
      const percentage = estimatedHomePrice > 0 ? (currentValue / estimatedHomePrice) * 100 : 1.2;
      input.value = Math.min(10, percentage.toFixed(1));
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * estimatedHomePrice;
      input.value = Math.round(amount / 50) * 50; // Round to nearest $50
    }
    
    updatePropertyTaxMode();
    saveToURL();
  }

  function toggleInsuranceUnit() {
    const input = document.getElementById('home-insurance');
    const currentValue = getValue('home-insurance');
    
    state.insuranceMode = state.insuranceMode === '$' ? '%' : '$';
    
    // Convert value between modes (estimate home price for conversion)
    const income = getValue('annual-income');
    const estimatedHomePrice = income * 4; // Rough estimate: 4x annual income
    
    if (state.insuranceMode === '%') {
      // Converting from $ to %
      const percentage = estimatedHomePrice > 0 ? (currentValue / estimatedHomePrice) * 100 : 0.4;
      input.value = Math.min(5, percentage.toFixed(2));
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * estimatedHomePrice;
      input.value = Math.round(amount / 50) * 50; // Round to nearest $50
    }
    
    updateInsuranceMode();
    saveToURL();
  }

  function updateDownPaymentValue() {
    const input = document.getElementById('down-payment');
    if (state.downPaymentMode === '%') {
      input.max = 100;
    } else {
      input.max = '';
    }
  }

  function updatePropertyTaxValue() {
    const input = document.getElementById('property-tax-rate');
    if (state.propertyTaxMode === '%') {
      input.max = 10;
    } else {
      input.max = '';
    }
  }

  function updateInsuranceValue() {
    const input = document.getElementById('home-insurance');
    if (state.insuranceMode === '%') {
      input.max = 5;
    } else {
      input.max = '';
    }
  }

  function calculateAffordability() {
    // Get input values
    const annualIncome = getValue('annual-income');
    const monthlyDebts = getValue('monthly-debts');
    const downPaymentValue = getValue('down-payment');
    const interestRate = getValue('interest-rate');
    const loanTerm = getValue('loan-term');
    const propertyTaxValue = getValue('property-tax-rate');
    const insuranceValue = getValue('home-insurance');
    const hoaFees = getValue('hoa-fees');
    const pmiRate = getValue('pmi-rate');
    const maxDtiHousing = getValue('max-dti-housing');
    const maxDtiTotal = getValue('max-dti-total');

    // Validate inputs
    if (!validateInputs(annualIncome, monthlyDebts, downPaymentValue, interestRate, loanTerm)) {
      return;
    }

    // Save current state to URL
    saveToURL();

    // Calculate monthly income
    const monthlyIncome = annualIncome / 12;

    // Calculate maximum monthly housing payment based on DTI ratios
    const maxHousingPayment = monthlyIncome * (maxDtiHousing / 100);
    const maxTotalDebt = monthlyIncome * (maxDtiTotal / 100);
    const maxHousingAfterDebts = maxTotalDebt - monthlyDebts;
    
    // Use the lower of the two limits
    const maxMonthlyPayment = Math.min(maxHousingPayment, maxHousingAfterDebts);

    // Calculate maximum home price based on payment
    const maxHomePrice = calculateMaxHomePrice(
      maxMonthlyPayment, 
      downPaymentValue, 
      interestRate, 
      loanTerm, 
      propertyTaxValue, 
      insuranceValue, 
      hoaFees, 
      pmiRate
    );

    // Calculate comfortable home price (using 25% DTI instead of 28%)
    const comfortableHousingPayment = monthlyIncome * 0.25;
    const comfortableHousingAfterDebts = Math.min(comfortableHousingPayment, maxTotalDebt - monthlyDebts);
    const comfortableHomePrice = calculateMaxHomePrice(
      comfortableHousingAfterDebts, 
      downPaymentValue, 
      interestRate, 
      loanTerm, 
      propertyTaxValue, 
      insuranceValue, 
      hoaFees, 
      pmiRate
    );

    // Display results
    displayResults({
      monthlyIncome,
      monthlyDebts,
      maxMonthlyPayment,
      maxHomePrice,
      comfortableHomePrice,
      downPayment: getDownPaymentAmount(maxHomePrice, downPaymentValue),
      loanAmount: maxHomePrice - getDownPaymentAmount(maxHomePrice, downPaymentValue),
      interestRate,
      loanTerm,
      propertyTax: getPropertyTaxAmount(maxHomePrice, propertyTaxValue),
      insurance: getInsuranceAmount(maxHomePrice, insuranceValue),
      hoaFees,
      pmiAmount: calculatePMI(maxHomePrice, downPaymentValue, pmiRate),
      currentDtiHousing: (maxMonthlyPayment / monthlyIncome) * 100,
      currentDtiTotal: ((maxMonthlyPayment + monthlyDebts) / monthlyIncome) * 100
    });
  }

  function calculateMaxHomePrice(maxPayment, downPaymentValue, rate, term, propertyTax, insurance, hoa, pmiRate) {
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    
    // Start with an initial guess
    let homePrice = maxPayment * 100;
    let iterations = 0;
    const maxIterations = 100;
    const tolerance = 1;

    while (iterations < maxIterations) {
      const downPayment = getDownPaymentAmount(homePrice, downPaymentValue);
      const loanAmount = homePrice - downPayment;
      
      // Calculate monthly principal and interest
      const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      // Calculate other monthly costs
      const monthlyPropertyTax = getPropertyTaxAmount(homePrice, propertyTax) / 12;
      const monthlyInsurance = getInsuranceAmount(homePrice, insurance) / 12;
      const monthlyHOA = hoa;
      
      // Calculate PMI if down payment is less than 20%
      let monthlyPMI = 0;
      const downPaymentPercent = (downPayment / homePrice) * 100;
      if (downPaymentPercent < 20) {
        monthlyPMI = (loanAmount * (pmiRate / 100)) / 12;
      }
      
      // Total monthly payment
      const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyPMI;
      
      // Adjust home price
      const difference = maxPayment - totalMonthly;
      if (Math.abs(difference) < tolerance) {
        break;
      }
      
      // Adjust home price proportionally
      homePrice = homePrice * (maxPayment / totalMonthly);
      iterations++;
    }
    
    return Math.max(0, Math.round(homePrice));
  }

  function getDownPaymentAmount(homePrice, downPaymentValue) {
    if (state.downPaymentMode === '%') {
      return homePrice * (downPaymentValue / 100);
    }
    return downPaymentValue;
  }

  function getPropertyTaxAmount(homePrice, propertyTaxValue) {
    if (state.propertyTaxMode === '%') {
      return homePrice * (propertyTaxValue / 100);
    }
    return propertyTaxValue;
  }

  function getInsuranceAmount(homePrice, insuranceValue) {
    if (state.insuranceMode === '%') {
      return homePrice * (insuranceValue / 100);
    }
    return insuranceValue;
  }

  function calculatePMI(homePrice, downPaymentValue, pmiRate) {
    const downPayment = getDownPaymentAmount(homePrice, downPaymentValue);
    const downPaymentPercent = (downPayment / homePrice) * 100;
    
    if (downPaymentPercent >= 20) {
      return 0;
    }
    
    const loanAmount = homePrice - downPayment;
    return (loanAmount * (pmiRate / 100)) / 12;
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('affordability-result');
    if (!resultDiv) return;

    // Calculate monthly payment breakdown for max home price
    const monthlyRate = results.interestRate / 100 / 12;
    const numPayments = results.loanTerm * 12;
    const monthlyPI = results.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const monthlyPropertyTax = results.propertyTax / 12;
    const monthlyInsurance = results.insurance / 12;
    const monthlyPMI = results.pmiAmount;
    const monthlyHOA = results.hoaFees;
    
    const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    // Calculate percentages for visual bars
    const housingPercent = (results.maxMonthlyPayment / results.monthlyIncome) * 100;
    const debtsPercent = (results.monthlyDebts / results.monthlyIncome) * 100;
    const remainingPercent = 100 - housingPercent - debtsPercent;

    // Determine affordability status
    let affordabilityStatus = 'excellent';
    let statusMessage = 'You\'re well within recommended limits';
    let statusClass = 'status-excellent';
    
    if (results.currentDtiTotal > 43) {
      affordabilityStatus = 'risky';
      statusMessage = 'You may have difficulty qualifying for a loan';
      statusClass = 'status-risky';
    } else if (results.currentDtiTotal > 36) {
      affordabilityStatus = 'stretched';
      statusMessage = 'You\'re above the recommended 36% total DTI';
      statusClass = 'status-stretched';
    } else if (results.currentDtiHousing > 28) {
      affordabilityStatus = 'aggressive';
      statusMessage = 'Housing costs exceed the recommended 28%';
      statusClass = 'status-aggressive';
    }

    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Your Home Affordability Analysis</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Results
        </button>
      </div>

      <div class="affordability-status ${statusClass}">
        <div class="status-icon">
          ${affordabilityStatus === 'excellent' ? '✓' : affordabilityStatus === 'risky' ? '⚠' : '!'}
        </div>
        <div class="status-content">
          <h4>Affordability Status: ${affordabilityStatus.charAt(0).toUpperCase() + affordabilityStatus.slice(1)}</h4>
          <p>${statusMessage}</p>
        </div>
      </div>

      <div class="result-summary">
        <div class="result-card result-card-primary">
          <div class="card-icon">🏠</div>
          <h4>Maximum Home Price</h4>
          <div class="result-amount">${formatCurrency(results.maxHomePrice)}</div>
          <div class="result-detail">
            <small>Based on ${results.currentDtiHousing.toFixed(1)}% housing DTI</small>
            <div class="mini-breakdown">
              <span>Loan: ${formatCurrency(results.loanAmount)}</span>
              <span>Down: ${formatCurrency(results.downPayment)}</span>
            </div>
          </div>
        </div>
        
        <div class="result-card result-card-success">
          <div class="card-icon">💚</div>
          <h4>Comfortable Price</h4>
          <div class="result-amount">${formatCurrency(results.comfortableHomePrice)}</div>
          <div class="result-detail">
            <small>Based on 25% housing DTI</small>
            <div class="mini-breakdown">
              <span>Lower stress</span>
              <span>More savings</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💰</div>
          <h4>Monthly Payment</h4>
          <div class="result-amount">${formatCurrency(totalMonthly)}</div>
          <div class="result-detail">
            <small>Total PITI${results.hoaFees > 0 ? ' + HOA' : ''}${monthlyPMI > 0 ? ' + PMI' : ''}</small>
            <div class="mini-breakdown">
              <span>P&I: ${formatCurrency(monthlyPI)}</span>
              <span>Other: ${formatCurrency(totalMonthly - monthlyPI)}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="visualization-section">
        <h4>Income Allocation Breakdown</h4>
        <div class="income-visualization">
          <div class="income-bar">
            <div class="income-segment housing" style="width: ${housingPercent}%">
              <span class="segment-label">Housing<br/>${housingPercent.toFixed(0)}%</span>
            </div>
            <div class="income-segment debts" style="width: ${debtsPercent}%">
              <span class="segment-label">Debts<br/>${debtsPercent.toFixed(0)}%</span>
            </div>
            <div class="income-segment remaining" style="width: ${remainingPercent}%">
              <span class="segment-label">Available<br/>${remainingPercent.toFixed(0)}%</span>
            </div>
          </div>
          <div class="income-legend">
            <div class="legend-item">
              <span class="legend-color housing"></span>
              <span>Housing: ${formatCurrency(results.maxMonthlyPayment)}/mo</span>
            </div>
            <div class="legend-item">
              <span class="legend-color debts"></span>
              <span>Other Debts: ${formatCurrency(results.monthlyDebts)}/mo</span>
            </div>
            <div class="legend-item">
              <span class="legend-color remaining"></span>
              <span>Remaining: ${formatCurrency(results.monthlyIncome - results.maxMonthlyPayment - results.monthlyDebts)}/mo</span>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-breakdown-visual">
        <h4>Monthly Payment Components</h4>
        <div class="payment-bars">
          <div class="payment-bar-item">
            <div class="bar-label">
              <span>Principal & Interest</span>
              <span>${formatCurrency(monthlyPI)}</span>
            </div>
            <div class="bar-container">
              <div class="bar-fill principal" style="width: ${(monthlyPI / totalMonthly) * 100}%"></div>
            </div>
          </div>
          <div class="payment-bar-item">
            <div class="bar-label">
              <span>Property Tax</span>
              <span>${formatCurrency(monthlyPropertyTax)}</span>
            </div>
            <div class="bar-container">
              <div class="bar-fill tax" style="width: ${(monthlyPropertyTax / totalMonthly) * 100}%"></div>
            </div>
          </div>
          <div class="payment-bar-item">
            <div class="bar-label">
              <span>Home Insurance</span>
              <span>${formatCurrency(monthlyInsurance)}</span>
            </div>
            <div class="bar-container">
              <div class="bar-fill insurance" style="width: ${(monthlyInsurance / totalMonthly) * 100}%"></div>
            </div>
          </div>
          ${monthlyHOA > 0 ? `
          <div class="payment-bar-item">
            <div class="bar-label">
              <span>HOA Fees</span>
              <span>${formatCurrency(monthlyHOA)}</span>
            </div>
            <div class="bar-container">
              <div class="bar-fill hoa" style="width: ${(monthlyHOA / totalMonthly) * 100}%"></div>
            </div>
          </div>
          ` : ''}
          ${monthlyPMI > 0 ? `
          <div class="payment-bar-item">
            <div class="bar-label">
              <span>PMI</span>
              <span>${formatCurrency(monthlyPMI)}</span>
            </div>
            <div class="bar-container">
              <div class="bar-fill pmi" style="width: ${(monthlyPMI / totalMonthly) * 100}%"></div>
            </div>
          </div>
          ` : ''}
        </div>
        <div class="payment-total">
          <strong>Total Monthly Payment</strong>
          <strong>${formatCurrency(totalMonthly)}</strong>
        </div>
      </div>

      <div class="dti-analysis">
        <h4>Debt-to-Income Analysis</h4>
        <div class="dti-meters">
          <div class="dti-meter">
            <h5>Housing DTI</h5>
            <div class="meter-container">
              <div class="meter-bar">
                <div class="meter-fill ${results.currentDtiHousing <= 28 ? 'safe' : results.currentDtiHousing <= 33 ? 'caution' : 'danger'}" 
                     style="width: ${Math.min(results.currentDtiHousing, 50)}%">
                  <span class="meter-value">${results.currentDtiHousing.toFixed(1)}%</span>
                </div>
              </div>
              <div class="meter-markers">
                <span class="marker" style="left: 28%">28%</span>
              </div>
            </div>
            <small class="${results.currentDtiHousing <= 28 ? 'text-success' : 'text-warning'}">
              ${results.currentDtiHousing <= 28 ? '✓ Within recommended limit' : '⚠ Above recommended 28%'}
            </small>
          </div>
          
          <div class="dti-meter">
            <h5>Total DTI</h5>
            <div class="meter-container">
              <div class="meter-bar">
                <div class="meter-fill ${results.currentDtiTotal <= 36 ? 'safe' : results.currentDtiTotal <= 43 ? 'caution' : 'danger'}" 
                     style="width: ${Math.min(results.currentDtiTotal, 60)}%">
                  <span class="meter-value">${results.currentDtiTotal.toFixed(1)}%</span>
                </div>
              </div>
              <div class="meter-markers">
                <span class="marker" style="left: 36%">36%</span>
                <span class="marker" style="left: 43%">43%</span>
              </div>
            </div>
            <small class="${results.currentDtiTotal <= 36 ? 'text-success' : results.currentDtiTotal <= 43 ? 'text-warning' : 'text-danger'}">
              ${results.currentDtiTotal <= 36 ? '✓ Within recommended limit' : results.currentDtiTotal <= 43 ? '⚠ Above recommended 36%' : '⚠ May not qualify for most loans'}
            </small>
          </div>
        </div>
      </div>

      <div class="result-details">
        <h4>Detailed Financial Breakdown</h4>
        <div class="details-grid">
          <div class="detail-section">
            <h5>Income & Debt Summary</h5>
            <table class="result-table">
              <tr>
                <td>Annual Gross Income</td>
                <td class="text-right">${formatCurrency(results.monthlyIncome * 12)}</td>
              </tr>
              <tr>
                <td>Monthly Gross Income</td>
                <td class="text-right">${formatCurrency(results.monthlyIncome)}</td>
              </tr>
              <tr>
                <td>Monthly Debt Payments</td>
                <td class="text-right">${formatCurrency(results.monthlyDebts)}</td>
              </tr>
              <tr class="table-highlight">
                <td><strong>Available for Housing</strong></td>
                <td class="text-right"><strong>${formatCurrency(results.maxMonthlyPayment)}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="detail-section">
            <h5>Loan Information</h5>
            <table class="result-table">
              <tr>
                <td>Home Price</td>
                <td class="text-right">${formatCurrency(results.maxHomePrice)}</td>
              </tr>
              <tr>
                <td>Down Payment</td>
                <td class="text-right">${formatCurrency(results.downPayment)} (${((results.downPayment / results.maxHomePrice) * 100).toFixed(1)}%)</td>
              </tr>
              <tr>
                <td>Loan Amount</td>
                <td class="text-right">${formatCurrency(results.loanAmount)}</td>
              </tr>
              <tr>
                <td>Interest Rate</td>
                <td class="text-right">${results.interestRate.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Loan Term</td>
                <td class="text-right">${results.loanTerm} years</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="key-insights">
        <h4>📊 Key Insights & Recommendations</h4>
        <div class="insights-grid">
          ${results.currentDtiHousing > 28 ? `
          <div class="insight-card insight-warning">
            <div class="insight-icon">⚠️</div>
            <div class="insight-content">
              <h5>High Housing Costs</h5>
              <p>Your housing DTI of ${results.currentDtiHousing.toFixed(1)}% exceeds the recommended 28%. Consider a lower price range or larger down payment.</p>
            </div>
          </div>
          ` : ''}
          
          ${monthlyPMI > 0 ? `
          <div class="insight-card insight-info">
            <div class="insight-icon">💡</div>
            <div class="insight-content">
              <h5>PMI Required</h5>
              <p>You're paying ${formatCurrency(monthlyPMI)}/month in PMI. Reach 20% down payment to eliminate this cost and save ${formatCurrency(monthlyPMI * 12)}/year.</p>
            </div>
          </div>
          ` : ''}
          
          ${results.maxHomePrice > results.comfortableHomePrice * 1.2 ? `
          <div class="insight-card insight-caution">
            <div class="insight-icon">📉</div>
            <div class="insight-content">
              <h5>Consider Lower Price</h5>
              <p>There's a ${formatCurrency(results.maxHomePrice - results.comfortableHomePrice)} gap between your max and comfortable price. The lower price provides more financial flexibility.</p>
            </div>
          </div>
          ` : ''}
          
          <div class="insight-card insight-success">
            <div class="insight-icon">✓</div>
            <div class="insight-content">
              <h5>Monthly Budget Impact</h5>
              <p>After housing and debts, you'll have ${formatCurrency(results.monthlyIncome - results.maxMonthlyPayment - results.monthlyDebts)} monthly for savings, utilities, and other expenses.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <h4>Next Steps</h4>
        <div class="action-cards">
          <button onclick="location.href='/calculators/mortgage-payment-calculator'" class="action-card">
            <span class="action-icon">🧮</span>
            <span class="action-text">
              <strong>Calculate Exact Payment</strong>
              <small>Get detailed payment breakdown for a specific home</small>
            </span>
          </button>
          <button onclick="location.href='/calculators/debt-to-income-calculator'" class="action-card">
            <span class="action-icon">📊</span>
            <span class="action-text">
              <strong>Check DTI Ratio</strong>
              <small>Analyze your debt-to-income in detail</small>
            </span>
          </button>
          <button onclick="location.href='/calculators/rent-vs-buy-calculator'" class="action-card">
            <span class="action-icon">🏠</span>
            <span class="action-text">
              <strong>Rent vs Buy</strong>
              <small>Compare renting versus buying costs</small>
            </span>
          </button>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
    
    // Re-attach print button listener
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
  }

  function validateInputs(income, debts, downPayment, rate, term) {
    if (income <= 0) {
      showError('Please enter a valid annual income');
      return false;
    }
    if (debts < 0) {
      showError('Monthly debts cannot be negative');
      return false;
    }
    if (downPayment < 0) {
      showError('Down payment cannot be negative');
      return false;
    }
    if (state.downPaymentMode === '%' && downPayment > 100) {
      showError('Down payment cannot exceed 100%');
      return false;
    }
    if (rate <= 0 || rate > 30) {
      showError('Please enter a valid interest rate (0.1% - 30%)');
      return false;
    }
    if (term <= 0 || term > 40) {
      showError('Please enter a valid loan term (1-40 years)');
      return false;
    }
    return true;
  }

  function printResults() {
    window.print();
  }

  function shareCalculation() {
    const url = window.location.href;
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'Home Affordability Calculation',
        text: 'Check out my home affordability calculation',
        url: url
      }).catch(err => {
        // Fallback to clipboard
        copyToClipboard(url);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      // Show success message
      const shareBtn = document.getElementById('share-calculation');
      if (shareBtn) {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        shareBtn.classList.add('btn-success');
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.classList.remove('btn-success');
        }, 2000);
      }
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
  }

  function showError(message) {
    const resultDiv = document.getElementById('affordability-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  // Helper functions
  function getValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

})();
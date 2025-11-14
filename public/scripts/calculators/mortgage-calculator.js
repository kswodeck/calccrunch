// Mortgage Payment Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    homePrice: 300000,
    downPayment: 60000,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTax: 3500,
    insurance: 1200,
    pmi: 0.5,
    hoaFees: 0
  };

  // State
  let state = {
    downPaymentMode: '$', // '$' or '%'
    propertyTaxMode: '$', // '$' or '%'
    insuranceMode: '$', // '$' or '%'
    pmiMode: '%', // '$' or '%'
    lastCalculationResults: null
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    checkPMIStatus();
  });

  function initializeForm() {
    // Set default values
    setValue('home-price', DEFAULT_VALUES.homePrice);
    setValue('down-payment', DEFAULT_VALUES.downPayment);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('loan-term', DEFAULT_VALUES.loanTerm);
    setValue('property-tax', DEFAULT_VALUES.propertyTax);
    setValue('insurance', DEFAULT_VALUES.insurance);
    setValue('pmi', DEFAULT_VALUES.pmi);
    setValue('hoa-fees', DEFAULT_VALUES.hoaFees);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      { id: 'home-price', param: 'home_price' },
      { id: 'down-payment', param: 'down_payment' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'loan-term', param: 'loan_term' },
      { id: 'property-tax', param: 'property_tax' },
      { id: 'insurance', param: 'insurance' },
      { id: 'pmi', param: 'pmi' },
      { id: 'hoa-fees', param: 'hoa_fees' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });
    
    // Load modes
    if (params.has('down_payment_mode')) {
      state.downPaymentMode = params.get('down_payment_mode') === '%' ? '%' : '$';
      updateDownPaymentMode();
    }
    
    if (params.has('property_tax_mode')) {
      state.propertyTaxMode = params.get('property_tax_mode') === '%' ? '%' : '$';
      updatePropertyTaxMode();
    }
    
    if (params.has('insurance_mode')) {
      state.insuranceMode = params.get('insurance_mode') === '%' ? '%' : '$';
      updateInsuranceMode();
    }
    
    if (params.has('pmi_mode')) {
      state.pmiMode = params.get('pmi_mode') === '$' ? '$' : '%';
      updatePMIMode();
    }
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        checkPMIStatus();
        calculateMortgage();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save numeric values
    params.set('home_price', getValue('home-price'));
    params.set('down_payment', getValue('down-payment'));
    params.set('interest_rate', getValue('interest-rate'));
    params.set('loan_term', getValue('loan-term'));
    params.set('property_tax', getValue('property-tax'));
    params.set('insurance', getValue('insurance'));
    params.set('pmi', getValue('pmi'));
    
    // Save HOA if not zero
    const hoaFees = getValue('hoa-fees');
    if (hoaFees > 0) {
      params.set('hoa_fees', hoaFees);
    }
    
    // Save modes
    params.set('down_payment_mode', state.downPaymentMode);
    params.set('property_tax_mode', state.propertyTaxMode);
    params.set('insurance_mode', state.insuranceMode);
    params.set('pmi_mode', state.pmiMode);
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateMortgage);
    }

    // Toggle units
    const downPaymentUnit = document.getElementById('down-payment-unit');
    if (downPaymentUnit) {
      downPaymentUnit.addEventListener('click', toggleDownPaymentUnit);
    }
    
    const propertyTaxUnit = document.getElementById('property-tax-unit');
    if (propertyTaxUnit) {
      propertyTaxUnit.addEventListener('click', togglePropertyTaxUnit);
    }
    
    const insuranceUnit = document.getElementById('insurance-unit');
    if (insuranceUnit) {
      insuranceUnit.addEventListener('click', toggleInsuranceUnit);
    }
    
    const pmiUnit = document.getElementById('pmi-unit');
    if (pmiUnit) {
      pmiUnit.addEventListener('click', togglePMIUnit);
    }

    // Add input listeners for PMI check
    const homePriceInput = document.getElementById('home-price');
    const downPaymentInput = document.getElementById('down-payment');
    if (homePriceInput && downPaymentInput) {
      homePriceInput.addEventListener('input', checkPMIStatus);
      downPaymentInput.addEventListener('input', checkPMIStatus);
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Calculate on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateMortgage();
        }
      });
      
      // Save to URL on change
      input.addEventListener('change', function() {
        saveToURL();
      });
      
      // Also save on input for real-time updates
      if (input.type === 'number') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
          }, 500); // Debounce to avoid too many URL updates
        });
      }
    });

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }

    // Print button will be attached after results render
  }

  function updateDownPaymentMode() {
    const unit = document.getElementById('down-payment-unit');
    const input = document.getElementById('down-payment');
    const help = document.getElementById('down-payment-help');
    
    if (!unit || !input) return;
    
    unit.textContent = state.downPaymentMode;
    
    if (state.downPaymentMode === '%') {
      help.textContent = 'Enter down payment percentage (click % to switch)';
      input.step = '0.5';
      input.max = '100';
    } else {
      help.textContent = 'Enter down payment amount (click $ to switch)';
      input.step = '500';
      input.max = '';
    }
  }

  function updatePropertyTaxMode() {
    const unit = document.getElementById('property-tax-unit');
    const input = document.getElementById('property-tax');
    const help = document.getElementById('property-tax-help');
    
    if (!unit || !input) return;
    
    unit.textContent = state.propertyTaxMode;
    
    if (state.propertyTaxMode === '%') {
      help.textContent = 'Enter property tax rate (click % to switch)';
      input.step = '0.1';
    } else {
      help.textContent = 'Enter yearly property tax amount (click $ to switch)';
      input.step = '50';
    }
  }

  function updateInsuranceMode() {
    const unit = document.getElementById('insurance-unit');
    const input = document.getElementById('insurance');
    const help = document.getElementById('insurance-help');
    
    if (!unit || !input) return;
    
    unit.textContent = state.insuranceMode;
    
    if (state.insuranceMode === '%') {
      help.textContent = 'Enter insurance rate (click % to switch)';
      input.step = '0.05';
    } else {
      help.textContent = 'Enter yearly insurance amount (click $ to switch)';
      input.step = '50';
    }
  }

  function updatePMIMode() {
    const unit = document.getElementById('pmi-unit');
    const input = document.getElementById('pmi');
    const help = document.getElementById('pmi-help');
    
    if (!unit || !input) return;
    
    unit.textContent = state.pmiMode;
    
    if (state.pmiMode === '%') {
      help.textContent = 'Enter annual PMI rate (automatically disabled if down payment ≥ 20%)';
      input.step = '0.01';
    } else {
      help.textContent = 'Enter monthly PMI amount (automatically disabled if down payment ≥ 20%)';
      input.step = '10';
    }
  }

  function toggleDownPaymentUnit() {
    const input = document.getElementById('down-payment');
    const homePrice = getValue('home-price');
    const currentValue = getValue('down-payment');
    
    state.downPaymentMode = state.downPaymentMode === '$' ? '%' : '$';
    
    if (state.downPaymentMode === '%') {
      // Converting from $ to %
      const percentage = homePrice > 0 ? (currentValue / homePrice) * 100 : 20;
      input.value = Math.min(100, percentage.toFixed(1));
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * homePrice;
      input.value = Math.round(amount);
    }
    
    updateDownPaymentMode();
    checkPMIStatus();
    saveToURL();
  }

  function togglePropertyTaxUnit() {
    const input = document.getElementById('property-tax');
    const homePrice = getValue('home-price');
    const currentValue = getValue('property-tax');
    
    state.propertyTaxMode = state.propertyTaxMode === '$' ? '%' : '$';
    
    if (state.propertyTaxMode === '%') {
      // Converting from $ to %
      const percentage = homePrice > 0 ? (currentValue / homePrice) * 100 : 1.2;
      input.value = percentage.toFixed(2);
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * homePrice;
      input.value = Math.round(amount);
    }
    
    updatePropertyTaxMode();
    saveToURL();
  }

  function toggleInsuranceUnit() {
    const input = document.getElementById('insurance');
    const homePrice = getValue('home-price');
    const currentValue = getValue('insurance');
    
    state.insuranceMode = state.insuranceMode === '$' ? '%' : '$';
    
    if (state.insuranceMode === '%') {
      // Converting from $ to %
      const percentage = homePrice > 0 ? (currentValue / homePrice) * 100 : 0.4;
      input.value = percentage.toFixed(2);
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * homePrice;
      input.value = Math.round(amount);
    }
    
    updateInsuranceMode();
    saveToURL();
  }

  function togglePMIUnit() {
    const input = document.getElementById('pmi');
    const homePrice = getValue('home-price');
    const downPayment = getDownPaymentAmount();
    const loanAmount = homePrice - downPayment;
    const currentValue = getValue('pmi');
    
    state.pmiMode = state.pmiMode === '%' ? '$' : '%';
    
    if (state.pmiMode === '$') {
      // Converting from % to $ (monthly)
      const monthlyAmount = (currentValue / 100) * loanAmount / 12;
      input.value = Math.round(monthlyAmount);
    } else {
      // Converting from $ to % (annual)
      const annualRate = (currentValue * 12 / loanAmount) * 100;
      input.value = annualRate.toFixed(2);
    }
    
    updatePMIMode();
    saveToURL();
  }

  function checkPMIStatus() {
    const homePrice = getValue('home-price');
    const downPayment = getDownPaymentAmount();
    const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    
    const pmiInput = document.getElementById('pmi');
    const pmiHelp = document.getElementById('pmi-help');
    
    if (!pmiInput) return;
    
    if (downPaymentPercent >= 20) {
      pmiInput.disabled = true;
      pmiInput.value = '0';
      pmiInput.classList.add('disabled');
      if (pmiHelp) {
        pmiHelp.textContent = '✓ PMI not required (down payment ≥ 20%)';
        pmiHelp.classList.add('text-success');
      }
    } else {
      pmiInput.disabled = false;
      pmiInput.classList.remove('disabled');
      if (pmiHelp) {
        if (state.pmiMode === '%') {
          pmiHelp.textContent = 'Enter annual PMI rate (required - down payment < 20%)';
        } else {
          pmiHelp.textContent = 'Enter monthly PMI amount (required - down payment < 20%)';
        }
        pmiHelp.classList.remove('text-success');
      }
      // Set default PMI if field is empty or zero
      if (getValue('pmi') === 0) {
        pmiInput.value = state.pmiMode === '%' ? '0.5' : '100';
      }
    }
  }

  function getDownPaymentAmount() {
    const homePrice = getValue('home-price');
    const downPaymentValue = getValue('down-payment');
    
    if (state.downPaymentMode === '%') {
      return (downPaymentValue / 100) * homePrice;
    }
    return downPaymentValue;
  }

  function getPropertyTaxAmount() {
    const homePrice = getValue('home-price');
    const propertyTaxValue = getValue('property-tax');
    
    if (state.propertyTaxMode === '%') {
      return (propertyTaxValue / 100) * homePrice;
    }
    return propertyTaxValue;
  }

  function getInsuranceAmount() {
    const homePrice = getValue('home-price');
    const insuranceValue = getValue('insurance');
    
    if (state.insuranceMode === '%') {
      return (insuranceValue / 100) * homePrice;
    }
    return insuranceValue;
  }

  function getPMIAmount() {
    const homePrice = getValue('home-price');
    const downPayment = getDownPaymentAmount();
    const loanAmount = homePrice - downPayment;
    const pmiValue = getValue('pmi');
    
    // Check if PMI is required
    const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    if (downPaymentPercent >= 20) {
      return 0;
    }
    
    if (state.pmiMode === '%') {
      // Annual percentage rate, convert to monthly
      return (pmiValue / 100) * loanAmount / 12;
    }
    // Already monthly amount
    return pmiValue;
  }

  function calculateMortgage() {
    // Get values
    const homePrice = getValue('home-price');
    const downPayment = getDownPaymentAmount();
    const interestRate = getValue('interest-rate');
    const loanTerm = getValue('loan-term');
    const propertyTax = getPropertyTaxAmount();
    const insurance = getInsuranceAmount();
    const pmi = getPMIAmount();
    const hoaFees = getValue('hoa-fees');
    
    // Validate
    if (!validateInputs(homePrice, downPayment, interestRate, loanTerm)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // Calculate loan amount
    const loanAmount = homePrice - downPayment;
    
    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0) {
      monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                  (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPrincipalInterest = loanAmount / numPayments;
    }
    
    // Calculate monthly costs
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmi;
    const monthlyHOA = hoaFees;
    
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + 
                                monthlyInsurance + monthlyPMI + monthlyHOA;
    
    // Calculate totals
    const totalPaid = monthlyPrincipalInterest * numPayments;
    const totalInterest = totalPaid - loanAmount;
    
    // Store results
    state.lastCalculationResults = {
      homePrice,
      downPayment,
      downPaymentPercent: (downPayment / homePrice) * 100,
      loanAmount,
      interestRate,
      loanTerm,
      monthlyPrincipalInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      totalMonthlyPayment,
      totalInterest,
      totalPaid,
      propertyTax,
      insurance
    };
    
    // Display results
    displayResults(state.lastCalculationResults);
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('mortgage-result');
    if (!resultDiv) return;
    
    // Determine affordability message
    const monthlyIncome = results.totalMonthlyPayment / 0.28; // 28% rule
    const recommendedIncome = Math.round(monthlyIncome * 12);
    
    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Your Mortgage Payment Breakdown</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Results
        </button>
      </div>
      
      <div class="result-summary">
        <div class="result-card result-card-primary">
          <div class="card-icon">🏠</div>
          <h4>Total Monthly Payment</h4>
          <div class="result-amount">${formatCurrency(results.totalMonthlyPayment)}</div>
          <div class="result-detail">
            <small>Principal + Interest + Taxes + Insurance${results.monthlyPMI > 0 ? ' + PMI' : ''}${results.monthlyHOA > 0 ? ' + HOA' : ''}</small>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💰</div>
          <h4>Principal & Interest</h4>
          <div class="result-amount">${formatCurrency(results.monthlyPrincipalInterest)}</div>
          <div class="result-detail">
            <small>${((results.monthlyPrincipalInterest / results.totalMonthlyPayment) * 100).toFixed(1)}% of payment</small>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">📊</div>
          <h4>Total Interest</h4>
          <div class="result-amount">${formatCurrency(results.totalInterest)}</div>
          <div class="result-detail">
            <small>Over ${results.loanTerm} years</small>
          </div>
        </div>
      </div>
      
      <div class="payment-visualization">
        <h4>Monthly Payment Breakdown</h4>
        <div class="payment-chart">
          ${generatePaymentChart(results)}
        </div>
        <div class="payment-legend">
          <div class="legend-item">
            <span class="legend-color principal"></span>
            <span>P&I: ${formatCurrency(results.monthlyPrincipalInterest)}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color tax"></span>
            <span>Tax: ${formatCurrency(results.monthlyPropertyTax)}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color insurance"></span>
            <span>Insurance: ${formatCurrency(results.monthlyInsurance)}</span>
          </div>
          ${results.monthlyPMI > 0 ? `
            <div class="legend-item">
              <span class="legend-color pmi"></span>
              <span>PMI: ${formatCurrency(results.monthlyPMI)}</span>
            </div>
          ` : ''}
          ${results.monthlyHOA > 0 ? `
            <div class="legend-item">
              <span class="legend-color hoa"></span>
              <span>HOA: ${formatCurrency(results.monthlyHOA)}</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="result-details">
        <h4>Loan Details</h4>
        <table class="result-table">
          <tr>
            <td>Home Price</td>
            <td class="text-right">${formatCurrency(results.homePrice)}</td>
          </tr>
          <tr>
            <td>Down Payment</td>
            <td class="text-right">${formatCurrency(results.downPayment)} (${results.downPaymentPercent.toFixed(1)}%)</td>
          </tr>
          <tr class="table-divider">
            <td><strong>Loan Amount</strong></td>
            <td class="text-right"><strong>${formatCurrency(results.loanAmount)}</strong></td>
          </tr>
          <tr>
            <td>Interest Rate</td>
            <td class="text-right">${results.interestRate.toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Loan Term</td>
            <td class="text-right">${results.loanTerm} years</td>
          </tr>
          <tr>
            <td>Total of Payments</td>
            <td class="text-right">${formatCurrency(results.totalPaid)}</td>
          </tr>
          <tr>
            <td>Total Interest Paid</td>
            <td class="text-right">${formatCurrency(results.totalInterest)}</td>
          </tr>
        </table>
      </div>
      
      <div class="result-details">
        <h4>Monthly Cost Breakdown</h4>
        <table class="result-table">
          <tr>
            <td>Principal & Interest</td>
            <td class="text-right">${formatCurrency(results.monthlyPrincipalInterest)}</td>
          </tr>
          <tr>
            <td>Property Tax</td>
            <td class="text-right">${formatCurrency(results.monthlyPropertyTax)}</td>
          </tr>
          <tr>
            <td>Home Insurance</td>
            <td class="text-right">${formatCurrency(results.monthlyInsurance)}</td>
          </tr>
          ${results.monthlyPMI > 0 ? `
            <tr>
              <td>PMI</td>
              <td class="text-right">${formatCurrency(results.monthlyPMI)}</td>
            </tr>
          ` : ''}
          ${results.monthlyHOA > 0 ? `
            <tr>
              <td>HOA Fees</td>
              <td class="text-right">${formatCurrency(results.monthlyHOA)}</td>
            </tr>
          ` : ''}
          <tr class="table-divider table-total">
            <td><strong>Total Monthly Payment</strong></td>
            <td class="text-right"><strong>${formatCurrency(results.totalMonthlyPayment)}</strong></td>
          </tr>
        </table>
      </div>
      
      <div class="affordability-note">
        <h4>💡 Affordability Guideline</h4>
        <p>
          Based on the 28% rule (housing costs should not exceed 28% of gross income), 
          you would need an annual income of approximately <strong>${formatCurrency(recommendedIncome)}</strong> 
          to comfortably afford this monthly payment of ${formatCurrency(results.totalMonthlyPayment)}.
        </p>
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Attach print button listener
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
  }

  function generatePaymentChart(results) {
    const total = results.totalMonthlyPayment;
    const piPercent = (results.monthlyPrincipalInterest / total) * 100;
    const taxPercent = (results.monthlyPropertyTax / total) * 100;
    const insurancePercent = (results.monthlyInsurance / total) * 100;
    const pmiPercent = (results.monthlyPMI / total) * 100;
    const hoaPercent = (results.monthlyHOA / total) * 100;
    
    return `
      <div class="payment-bar">
        <div class="payment-segment principal" style="width: ${piPercent}%" title="Principal & Interest: ${piPercent.toFixed(1)}%"></div>
        <div class="payment-segment tax" style="width: ${taxPercent}%" title="Property Tax: ${taxPercent.toFixed(1)}%"></div>
        <div class="payment-segment insurance" style="width: ${insurancePercent}%" title="Insurance: ${insurancePercent.toFixed(1)}%"></div>
        ${pmiPercent > 0 ? `<div class="payment-segment pmi" style="width: ${pmiPercent}%" title="PMI: ${pmiPercent.toFixed(1)}%"></div>` : ''}
        ${hoaPercent > 0 ? `<div class="payment-segment hoa" style="width: ${hoaPercent}%" title="HOA: ${hoaPercent.toFixed(1)}%"></div>` : ''}
      </div>
    `;
  }

  function validateInputs(homePrice, downPayment, rate, term) {
    if (homePrice <= 0) {
      showError('Please enter a valid home price');
      return false;
    }
    if (downPayment < 0 || downPayment >= homePrice) {
      showError('Down payment must be less than home price');
      return false;
    }
    if (rate < 0 || rate > 30) {
      showError('Please enter a valid interest rate (0-30%)');
      return false;
    }
    if (term <= 0 || term > 50) {
      showError('Please enter a valid loan term (1-50 years)');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('mortgage-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  function printResults() {
    window.print();
  }

  function shareCalculation() {
    const url = window.location.href;
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'Mortgage Payment Calculation',
        text: 'Check out my mortgage payment calculation',
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
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
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
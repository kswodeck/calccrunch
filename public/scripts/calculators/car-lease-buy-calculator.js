// Car Lease vs Buy Calculator
(function() {
  'use strict';

  // Default calculator state
  let state = {
    // Vehicle info
    vehiclePrice: 35000,
    negotiatedPrice: 33000,
    annualDepreciation: 15,
    salesTaxRate: 7.5,
    
    // Lease details
    leaseMonthlyPayment: 350,
    leaseTerm: 36,
    leaseDownPayment: 2000,
    leaseAcquisitionFee: 650,
    leaseDispositionFee: 350,
    residualValue: 55,
    residualValueUnit: '%',
    annualMileageAllowance: 12000,
    excessMileageCost: 0.25,
    expectedAnnualMiles: 12000,
    leaseIncludesTax: false,
    
    // Buy details
    buyDownPayment: 5000,
    buyDownPaymentUnit: '$',
    loanInterestRate: 6.5,
    loanTerm: 60,
    dealerFees: 500,
    registrationFees: 300,
    financeSalesTax: true,
    
    // Ongoing costs
    leaseInsurance: 150,
    buyInsurance: 130,
    leaseMaintenance: 25,
    buyMaintenance: 75,
    monthlyFuelCost: 150,
    annualRegistration: 150,
    
    // Analysis settings
    analysisPeriod: 6,
    investmentReturn: 7,
    leaseEndOption: 'return',
    buyEndOption: 'keep'
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    loadStateFromURL();
    attachEventListeners();
    updateUnitDisplays();
    
    // Auto-calculate if URL has parameters
    if (window.location.search) {
      calculateResults();
    }
  });

  function attachEventListeners() {
    // All input fields - save to URL on change
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-checkbox');
    
    inputs.forEach(input => {
      const eventType = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(eventType, function() {
        updateStateFromInputs();
        saveStateToURL();
      });
      
      // Calculate on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calculateResults();
          document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Calculate button
    document.getElementById('calculate-btn')?.addEventListener('click', function() {
      calculateResults();
      document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Share button
    document.getElementById('share-calculation')?.addEventListener('click', shareCalculation);

    // Unit toggle buttons
    document.getElementById('residual-value-unit')?.addEventListener('click', () => toggleUnit('residualValue'));
    document.getElementById('buy-down-payment-unit')?.addEventListener('click', () => toggleUnit('buyDownPayment'));
  }

  function updateStateFromInputs() {
    // Vehicle info
    state.vehiclePrice = getNumericValue('vehicle-price');
    state.negotiatedPrice = getNumericValue('negotiated-price');
    state.annualDepreciation = getNumericValue('annual-depreciation');
    state.salesTaxRate = getNumericValue('sales-tax-rate');
    
    // Lease details
    state.leaseMonthlyPayment = getNumericValue('lease-monthly-payment');
    state.leaseTerm = parseInt(document.getElementById('lease-term')?.value) || 36;
    state.leaseDownPayment = getNumericValue('lease-down-payment');
    state.leaseAcquisitionFee = getNumericValue('lease-acquisition-fee');
    state.leaseDispositionFee = getNumericValue('lease-disposition-fee');
    state.residualValue = getNumericValue('residual-value');
    state.annualMileageAllowance = getNumericValue('annual-mileage-allowance');
    state.excessMileageCost = getNumericValue('excess-mileage-cost');
    state.expectedAnnualMiles = getNumericValue('expected-annual-miles');
    state.leaseIncludesTax = document.getElementById('lease-includes-tax')?.checked || false;
    
    // Buy details
    state.buyDownPayment = getNumericValue('buy-down-payment');
    state.loanInterestRate = getNumericValue('loan-interest-rate');
    state.loanTerm = parseInt(document.getElementById('loan-term')?.value) || 60;
    state.dealerFees = getNumericValue('dealer-fees');
    state.registrationFees = getNumericValue('registration-fees');
    state.financeSalesTax = document.getElementById('finance-sales-tax')?.checked || false;
    
    // Ongoing costs
    state.leaseInsurance = getNumericValue('lease-insurance');
    state.buyInsurance = getNumericValue('buy-insurance');
    state.leaseMaintenance = getNumericValue('lease-maintenance');
    state.buyMaintenance = getNumericValue('buy-maintenance');
    state.monthlyFuelCost = getNumericValue('monthly-fuel-cost');
    state.annualRegistration = getNumericValue('annual-registration');
    
    // Analysis settings
    state.analysisPeriod = getNumericValue('analysis-period');
    state.investmentReturn = getNumericValue('investment-return');
    state.leaseEndOption = document.getElementById('lease-end-option')?.value || 'return';
    state.buyEndOption = document.getElementById('buy-end-option')?.value || 'keep';
  }

  function getNumericValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
  }

  function toggleUnit(field) {
    const unitKey = field + 'Unit';
    state[unitKey] = state[unitKey] === '$' ? '%' : '$';
    updateUnitDisplay(field);
    saveStateToURL();
  }

  function updateUnitDisplay(field) {
    const unitKey = field + 'Unit';
    const inputId = field.replace(/([A-Z])/g, '-$1').toLowerCase();
    const unitElement = document.getElementById(inputId + '-unit');
    const helpElement = document.getElementById(inputId + '-help');
    const inputElement = document.getElementById(inputId);
    
    if (unitElement) {
      unitElement.textContent = state[unitKey];
    }
    
    if (helpElement) {
      if (field === 'residualValue') {
        helpElement.textContent = state[unitKey] === '%' 
          ? 'Vehicle value at lease end (% of MSRP)'
          : 'Vehicle value at lease end (dollar amount)';
      } else if (field === 'buyDownPayment') {
        helpElement.textContent = state[unitKey] === '%'
          ? 'Enter down payment percentage (click % to switch)'
          : 'Enter down payment amount (click $ to switch)';
      }
    }
  }

  function updateUnitDisplays() {
    updateUnitDisplay('residualValue');
    updateUnitDisplay('buyDownPayment');
  }

  function saveStateToURL() {
    const params = new URLSearchParams();
    
    // Save all state values
    Object.keys(state).forEach(key => {
      if (state[key] !== null && state[key] !== undefined && state[key] !== '') {
        params.set(key, state[key]);
      }
    });
    
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    params.forEach((value, key) => {
      if (key in state) {
        if (typeof state[key] === 'boolean') {
          state[key] = value === 'true';
        } else if (typeof state[key] === 'number') {
          state[key] = parseFloat(value) || state[key];
        } else {
          state[key] = value;
        }
      }
    });
    
    // Update form inputs with loaded state
    populateFormFromState();
  }

  function populateFormFromState() {
    // Vehicle info
    setInputValue('vehicle-price', state.vehiclePrice);
    setInputValue('negotiated-price', state.negotiatedPrice);
    setInputValue('annual-depreciation', state.annualDepreciation);
    setInputValue('sales-tax-rate', state.salesTaxRate);
    
    // Lease details
    setInputValue('lease-monthly-payment', state.leaseMonthlyPayment);
    setSelectValue('lease-term', state.leaseTerm);
    setInputValue('lease-down-payment', state.leaseDownPayment);
    setInputValue('lease-acquisition-fee', state.leaseAcquisitionFee);
    setInputValue('lease-disposition-fee', state.leaseDispositionFee);
    setInputValue('residual-value', state.residualValue);
    setInputValue('annual-mileage-allowance', state.annualMileageAllowance);
    setInputValue('excess-mileage-cost', state.excessMileageCost);
    setInputValue('expected-annual-miles', state.expectedAnnualMiles);
    setCheckboxValue('lease-includes-tax', state.leaseIncludesTax);
    
    // Buy details
    setInputValue('buy-down-payment', state.buyDownPayment);
    setInputValue('loan-interest-rate', state.loanInterestRate);
    setSelectValue('loan-term', state.loanTerm);
    setInputValue('dealer-fees', state.dealerFees);
    setInputValue('registration-fees', state.registrationFees);
    setCheckboxValue('finance-sales-tax', state.financeSalesTax);
    
    // Ongoing costs
    setInputValue('lease-insurance', state.leaseInsurance);
    setInputValue('buy-insurance', state.buyInsurance);
    setInputValue('lease-maintenance', state.leaseMaintenance);
    setInputValue('buy-maintenance', state.buyMaintenance);
    setInputValue('monthly-fuel-cost', state.monthlyFuelCost);
    setInputValue('annual-registration', state.annualRegistration);
    
    // Analysis settings
    setInputValue('analysis-period', state.analysisPeriod);
    setInputValue('investment-return', state.investmentReturn);
    setSelectValue('lease-end-option', state.leaseEndOption);
    setSelectValue('buy-end-option', state.buyEndOption);
  }

  function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
  }

  function setSelectValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
  }

  function setCheckboxValue(id, checked) {
    const element = document.getElementById(id);
    if (element) element.checked = checked;
  }

  function validateInputs() {
    if (state.vehiclePrice <= 0) {
      showError('Please enter a valid vehicle price');
      return false;
    }
    if (state.leaseMonthlyPayment <= 0) {
      showError('Please enter a valid lease monthly payment');
      return false;
    }
    if (state.analysisPeriod < 1 || state.analysisPeriod > 15) {
      showError('Analysis period must be between 1 and 15 years');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('lease-buy-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error" style="background: #fef2f2; border: 1px solid #ef4444; padding: 1rem; border-radius: 8px; color: #dc2626;">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  function calculateResults() {
    updateStateFromInputs();
    
    if (!validateInputs()) return;
    
    saveStateToURL();
    
    const results = performCalculations();
    displayResults(results);
  }

  function performCalculations() {
    const analysisPeriodMonths = state.analysisPeriod * 12;
    const leaseTermMonths = state.leaseTerm;
    const loanTermMonths = state.loanTerm;
    
    // Calculate actual values
    const actualResidual = state.residualValueUnit === '%' 
      ? state.vehiclePrice * (state.residualValue / 100)
      : state.residualValue;
    
    const actualBuyDownPayment = state.buyDownPaymentUnit === '%'
      ? state.negotiatedPrice * (state.buyDownPayment / 100)
      : state.buyDownPayment;
    
    // Calculate sales tax
    const purchaseSalesTax = state.negotiatedPrice * (state.salesTaxRate / 100);
    
    // LEASE CALCULATIONS
    const leaseResults = calculateLeaseCosts(analysisPeriodMonths, leaseTermMonths, actualResidual, purchaseSalesTax);
    
    // BUY CALCULATIONS
    const buyResults = calculateBuyCosts(analysisPeriodMonths, loanTermMonths, actualBuyDownPayment, purchaseSalesTax);
    
    // Calculate opportunity cost
    const leaseOpportunityCost = calculateOpportunityCost(state.leaseDownPayment + state.leaseAcquisitionFee);
    const buyOpportunityCost = calculateOpportunityCost(actualBuyDownPayment + state.dealerFees + state.registrationFees + (state.financeSalesTax ? 0 : purchaseSalesTax));
    
    // Total costs
    const leaseTotalCost = leaseResults.totalCost + leaseOpportunityCost;
    const buyTotalCost = buyResults.totalCost + buyOpportunityCost - buyResults.finalEquity;
    
    // Net costs (what you actually "spent" considering equity)
    const leaseNetCost = leaseTotalCost;
    const buyNetCost = buyTotalCost;
    
    // Monthly equivalent
    const leaseMonthlyEquivalent = leaseTotalCost / analysisPeriodMonths;
    const buyMonthlyEquivalent = buyTotalCost / analysisPeriodMonths;
    
    // Determine winner
    const betterOption = leaseNetCost < buyNetCost ? 'lease' : 'buy';
    const savings = Math.abs(leaseNetCost - buyNetCost);
    const monthlySavings = Math.abs(leaseMonthlyEquivalent - buyMonthlyEquivalent);
    
    // Calculate year-by-year data
    const yearlyData = calculateYearlyData(leaseResults, buyResults, actualBuyDownPayment, purchaseSalesTax);
    
    // Find breakeven point
    let breakevenYear = null;
    for (let i = 0; i < yearlyData.length - 1; i++) {
      const currentDiff = yearlyData[i].leaseCumulative - yearlyData[i].buyCumulative;
      const nextDiff = yearlyData[i + 1].leaseCumulative - yearlyData[i + 1].buyCumulative;
      if ((currentDiff > 0 && nextDiff <= 0) || (currentDiff < 0 && nextDiff >= 0)) {
        breakevenYear = yearlyData[i + 1].year;
        break;
      }
    }
    
    return {
      // Lease totals
      leaseTotalCost,
      leaseNetCost,
      leaseMonthlyEquivalent,
      leaseOpportunityCost,
      leasePaymentTotal: leaseResults.paymentTotal,
      leaseUpfrontTotal: leaseResults.upfrontTotal,
      leaseOngoingTotal: leaseResults.ongoingTotal,
      leaseTaxTotal: leaseResults.taxTotal,
      leaseExcessMileage: leaseResults.excessMileageCost,
      leaseDispositionTotal: leaseResults.dispositionTotal,
      numberOfLeases: leaseResults.numberOfLeases,
      
      // Buy totals
      buyTotalCost,
      buyNetCost,
      buyMonthlyEquivalent,
      buyOpportunityCost,
      buyPaymentTotal: buyResults.paymentTotal,
      buyUpfrontTotal: buyResults.upfrontTotal,
      buyOngoingTotal: buyResults.ongoingTotal,
      buyTaxTotal: buyResults.taxTotal,
      buyInterestTotal: buyResults.interestTotal,
      buyFinalEquity: buyResults.finalEquity,
      buyMonthlyPayment: buyResults.monthlyPayment,
      
      // Comparison
      betterOption,
      savings,
      monthlySavings,
      breakevenYear,
      
      // Data for charts
      yearlyData,
      
      // Additional info
      analysisPeriod: state.analysisPeriod,
      actualBuyDownPayment,
      actualResidual,
      vehiclePrice: state.vehiclePrice,
      negotiatedPrice: state.negotiatedPrice
    };
  }

  function calculateLeaseCosts(analysisPeriodMonths, leaseTermMonths, actualResidual, purchaseSalesTax) {
    let totalPayments = 0;
    let totalUpfront = 0;
    let totalOngoing = 0;
    let totalTax = 0;
    let totalExcessMileage = 0;
    let totalDisposition = 0;
    let numberOfLeases = 0;
    
    // Calculate lease tax (if not included in payment)
    const monthlyLeaseTax = state.leaseIncludesTax ? 0 : state.leaseMonthlyPayment * (state.salesTaxRate / 100);
    
    // Calculate excess mileage per lease term
    const excessMilesPerLease = Math.max(0, (state.expectedAnnualMiles - state.annualMileageAllowance) * (leaseTermMonths / 12));
    const excessMileageCostPerLease = excessMilesPerLease * state.excessMileageCost;
    
    let monthsRemaining = analysisPeriodMonths;
    
    while (monthsRemaining > 0) {
      numberOfLeases++;
      const currentLeaseMonths = Math.min(leaseTermMonths, monthsRemaining);
      
      // Upfront costs (first lease gets acquisition fee, subsequent leases may too)
      if (numberOfLeases === 1) {
        totalUpfront += state.leaseDownPayment + state.leaseAcquisitionFee;
      } else {
        // For subsequent leases, assume new down payment and acquisition fee
        totalUpfront += state.leaseDownPayment + state.leaseAcquisitionFee;
      }
      
      // Monthly payments
      totalPayments += state.leaseMonthlyPayment * currentLeaseMonths;
      totalTax += monthlyLeaseTax * currentLeaseMonths;
      
      // Ongoing costs
      totalOngoing += (state.leaseInsurance + state.leaseMaintenance + state.monthlyFuelCost) * currentLeaseMonths;
      totalOngoing += (state.annualRegistration / 12) * currentLeaseMonths;
      
      // End of lease costs (only if completing full lease)
      if (currentLeaseMonths >= leaseTermMonths) {
        totalDisposition += state.leaseDispositionFee;
        totalExcessMileage += excessMileageCostPerLease;
      }
      
      monthsRemaining -= currentLeaseMonths;
    }
    
    return {
      paymentTotal: totalPayments,
      upfrontTotal: totalUpfront,
      ongoingTotal: totalOngoing,
      taxTotal: totalTax,
      excessMileageCost: totalExcessMileage,
      dispositionTotal: totalDisposition,
      numberOfLeases,
      totalCost: totalPayments + totalUpfront + totalOngoing + totalTax + totalExcessMileage + totalDisposition
    };
  }

  function calculateBuyCosts(analysisPeriodMonths, loanTermMonths, actualDownPayment, purchaseSalesTax) {
    // Loan amount
    let loanAmount = state.negotiatedPrice + state.dealerFees - actualDownPayment;
    if (state.financeSalesTax) {
      loanAmount += purchaseSalesTax;
    }
    
    // Monthly loan payment
    const monthlyRate = state.loanInterestRate / 100 / 12;
    let monthlyPayment = 0;
    let totalInterest = 0;
    
    if (monthlyRate > 0 && loanTermMonths > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
                       (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
      totalInterest = (monthlyPayment * Math.min(loanTermMonths, analysisPeriodMonths)) - 
                      calculatePrincipalPaid(loanAmount, monthlyRate, loanTermMonths, Math.min(loanTermMonths, analysisPeriodMonths));
    } else {
      monthlyPayment = loanAmount / loanTermMonths;
    }
    
    // Calculate payments and interest
    let totalPayments = 0;
    let interestPaid = 0;
    let principalPaid = 0;
    let remainingBalance = loanAmount;
    
    const paymentMonths = Math.min(loanTermMonths, analysisPeriodMonths);
    
    for (let month = 1; month <= paymentMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      interestPaid += interestPayment;
      principalPaid += principalPayment;
      remainingBalance -= principalPayment;
      totalPayments += monthlyPayment;
    }
    
    // Upfront costs
    const upfrontTotal = actualDownPayment + state.dealerFees + state.registrationFees + 
                        (state.financeSalesTax ? 0 : purchaseSalesTax);
    
    // Ongoing costs
    const ongoingMonths = analysisPeriodMonths;
    const ongoingTotal = (state.buyInsurance + state.buyMaintenance + state.monthlyFuelCost) * ongoingMonths +
                        (state.annualRegistration / 12) * ongoingMonths;
    
    // Calculate final vehicle value (depreciation)
    const yearsOwned = analysisPeriodMonths / 12;
    let vehicleValue = state.negotiatedPrice;
    
    // Apply depreciation year by year
    for (let year = 1; year <= yearsOwned; year++) {
      if (year === 1) {
        vehicleValue *= (1 - state.annualDepreciation / 100);
      } else {
        // Slightly lower depreciation after first year
        vehicleValue *= (1 - (state.annualDepreciation * 0.7) / 100);
      }
    }
    
    // Calculate remaining loan balance
    let finalLoanBalance = loanAmount;
    if (analysisPeriodMonths < loanTermMonths) {
      finalLoanBalance = remainingBalance;
    } else {
      finalLoanBalance = 0;
    }
    
    // Final equity
    const finalEquity = vehicleValue - finalLoanBalance;
    
    return {
      monthlyPayment,
      paymentTotal: totalPayments,
      upfrontTotal,
      ongoingTotal,
      taxTotal: state.financeSalesTax ? 0 : purchaseSalesTax,
      interestTotal: interestPaid,
      finalEquity,
      finalVehicleValue: vehicleValue,
      finalLoanBalance,
      totalCost: totalPayments + upfrontTotal + ongoingTotal + (state.financeSalesTax ? 0 : purchaseSalesTax)
    };
  }

  function calculatePrincipalPaid(principal, monthlyRate, totalPayments, paymentsMade) {
    if (monthlyRate === 0) return principal * (paymentsMade / totalPayments);
    
    let balance = principal;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                   (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    for (let i = 0; i < paymentsMade; i++) {
      const interest = balance * monthlyRate;
      const principalPayment = payment - interest;
      balance -= principalPayment;
    }
    
    return principal - balance;
  }

  function calculateOpportunityCost(initialAmount) {
    const annualReturn = state.investmentReturn / 100;
    const years = state.analysisPeriod;
    
    // What the money would have grown to if invested
    const futureValue = initialAmount * Math.pow(1 + annualReturn, years);
    
    // Opportunity cost is the growth we missed out on
    return futureValue - initialAmount;
  }

  function calculateYearlyData(leaseResults, buyResults, actualBuyDownPayment, purchaseSalesTax) {
    const yearlyData = [];
    
    // Initialize tracking variables
    let leaseCumulative = state.leaseDownPayment + state.leaseAcquisitionFee;
    let buyCumulative = actualBuyDownPayment + state.dealerFees + state.registrationFees + 
                       (state.financeSalesTax ? 0 : purchaseSalesTax);
    
    // Buy loan details
    let loanAmount = state.negotiatedPrice + state.dealerFees - actualBuyDownPayment;
    if (state.financeSalesTax) loanAmount += purchaseSalesTax;
    
    const monthlyRate = state.loanInterestRate / 100 / 12;
    let buyMonthlyPayment = 0;
    if (monthlyRate > 0 && state.loanTerm > 0) {
      buyMonthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, state.loanTerm)) / 
                         (Math.pow(1 + monthlyRate, state.loanTerm) - 1);
    } else {
      buyMonthlyPayment = loanAmount / state.loanTerm;
    }
    
    let remainingLoanBalance = loanAmount;
    let vehicleValue = state.negotiatedPrice;
    
    const monthlyLeaseTax = state.leaseIncludesTax ? 0 : state.leaseMonthlyPayment * (state.salesTaxRate / 100);
    let leaseMonthsInCurrentTerm = 0;
    
    for (let year = 1; year <= state.analysisPeriod; year++) {
      // Yearly lease costs
      let yearlyLeaseCost = 0;
      
      for (let month = 1; month <= 12; month++) {
        leaseMonthsInCurrentTerm++;
        yearlyLeaseCost += state.leaseMonthlyPayment + monthlyLeaseTax;
        yearlyLeaseCost += state.leaseInsurance + state.leaseMaintenance + state.monthlyFuelCost;
        yearlyLeaseCost += state.annualRegistration / 12;
        
        // Check if lease term ended this month
        if (leaseMonthsInCurrentTerm >= state.leaseTerm) {
          // Add disposition fee and excess mileage
          const excessMiles = Math.max(0, (state.expectedAnnualMiles - state.annualMileageAllowance) * (state.leaseTerm / 12));
          yearlyLeaseCost += state.leaseDispositionFee + (excessMiles * state.excessMileageCost);
          
          // New lease starts (add upfront costs)
          yearlyLeaseCost += state.leaseDownPayment + state.leaseAcquisitionFee;
          leaseMonthsInCurrentTerm = 0;
        }
      }
      
      leaseCumulative += yearlyLeaseCost;
      
      // Yearly buy costs
      let yearlyBuyCost = 0;
      
      for (let month = 1; month <= 12; month++) {
        const totalMonths = (year - 1) * 12 + month;
        
        // Loan payment (if still paying)
        if (totalMonths <= state.loanTerm) {
          const interestPayment = remainingLoanBalance * monthlyRate;
          const principalPayment = buyMonthlyPayment - interestPayment;
          yearlyBuyCost += buyMonthlyPayment;
          remainingLoanBalance -= principalPayment;
          if (remainingLoanBalance < 0) remainingLoanBalance = 0;
        }
        
        // Ongoing costs
        yearlyBuyCost += state.buyInsurance + state.buyMaintenance + state.monthlyFuelCost;
        yearlyBuyCost += state.annualRegistration / 12;
      }
      
      buyCumulative += yearlyBuyCost;
      
      // Calculate depreciation for this year
      if (year === 1) {
        vehicleValue *= (1 - state.annualDepreciation / 100);
      } else {
        vehicleValue *= (1 - (state.annualDepreciation * 0.7) / 100);
      }
      
      // Calculate equity
      const equity = vehicleValue - remainingLoanBalance;
      
      // Net cost (cumulative cost - equity for buy)
      const buyNetCost = buyCumulative - equity;
      
      yearlyData.push({
        year,
        leaseCumulative,
        buyCumulative,
        buyEquity: equity,
        buyNetCost,
        vehicleValue,
        loanBalance: remainingLoanBalance,
        difference: leaseCumulative - buyNetCost
      });
    }
    
    return yearlyData;
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('lease-buy-result');
    if (!resultDiv) return;
    
    const winnerIcon = results.betterOption === 'lease' ? '🚗' : '🏆';
    const winnerText = results.betterOption === 'lease' ? 'Leasing' : 'Buying';
    const winnerClass = results.betterOption === 'lease' ? 'lease' : 'buy';
    
    // Calculate percentages for bar chart
    const maxCost = Math.max(results.leaseNetCost, results.buyNetCost);
    const leaseBarHeight = (results.leaseNetCost / maxCost) * 100;
    const buyBarHeight = (results.buyNetCost / maxCost) * 100;
    
    resultDiv.innerHTML = `
      <div class="result-content">
        <div class="result-header">
          <h3>Your Lease vs Buy Analysis</h3>
        </div>
        
        <div class="advantage-banner" style="background: ${results.betterOption === 'lease' ? '#eff6ff' : '#ecfdf5'}; padding: 1.5rem; border-radius: 12px; text-align: center; margin-bottom: 2rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">${winnerIcon}</div>
          <h2 style="color: ${results.betterOption === 'lease' ? '#1e40af' : '#047857'}; margin: 0;">
            ${winnerText} Saves You ${formatCurrency(results.savings)}
          </h2>
          <p style="color: #6b7280; margin-top: 0.5rem;">
            Over ${results.analysisPeriod} years (${formatCurrency(results.monthlySavings)}/month on average)
          </p>
          ${results.breakevenYear ? `<p style="color: #f59e0b; font-size: 0.9rem; margin-top: 0.5rem;">⚡ Breakeven point: Year ${results.breakevenYear}</p>` : ''}
        </div>
        
        <div class="monthly-comparison">
          <div class="monthly-card">
            <div class="monthly-card-title">Lease Monthly Payment</div>
            <div class="monthly-card-value" style="color: #3b82f6;">${formatCurrency(state.leaseMonthlyPayment)}</div>
            <div class="monthly-card-subtitle">+ ${formatCurrency(state.leaseInsurance + state.leaseMaintenance)} other costs</div>
          </div>
          <div class="monthly-card">
            <div class="monthly-card-title">Buy Monthly Payment</div>
            <div class="monthly-card-value" style="color: #10b981;">${formatCurrency(results.buyMonthlyPayment)}</div>
            <div class="monthly-card-subtitle">+ ${formatCurrency(state.buyInsurance + state.buyMaintenance)} other costs</div>
          </div>
          <div class="monthly-card">
            <div class="monthly-card-title">Lease Avg Monthly Cost</div>
            <div class="monthly-card-value" style="color: #3b82f6;">${formatCurrency(results.leaseMonthlyEquivalent)}</div>
            <div class="monthly-card-subtitle">All costs over ${results.analysisPeriod} years</div>
          </div>
          <div class="monthly-card">
            <div class="monthly-card-title">Buy Avg Monthly Cost</div>
            <div class="monthly-card-value" style="color: #10b981;">${formatCurrency(results.buyMonthlyEquivalent)}</div>
            <div class="monthly-card-subtitle">Minus equity at end</div>
          </div>
        </div>

        <div class="comparison-visualization">
          <h4 style="text-align: center; margin-bottom: 1rem;">Total Net Cost Comparison</h4>
          <div class="comparison-bars">
            <div class="comparison-bar">
              <div class="bar-label">Lease</div>
              <div class="bar-container">
                <div class="bar-fill lease" style="height: ${leaseBarHeight}%;">
                  <span class="bar-value">${formatCurrency(results.leaseNetCost)}</span>
                </div>
              </div>
              ${results.betterOption === 'lease' ? '<span class="winner-badge">✓ Better Value</span>' : ''}
            </div>
            <div class="comparison-bar">
              <div class="bar-label">Buy</div>
              <div class="bar-container">
                <div class="bar-fill buy" style="height: ${buyBarHeight}%;">
                  <span class="bar-value">${formatCurrency(results.buyNetCost)}</span>
                </div>
              </div>
              ${results.betterOption === 'buy' ? '<span class="winner-badge">✓ Better Value</span>' : ''}
            </div>
          </div>
        </div>

        <div class="cost-breakdown-grid">
          <div class="breakdown-section">
            <div class="breakdown-title">🔵 Lease Costs (${results.numberOfLeases} lease${results.numberOfLeases > 1 ? 's' : ''})</div>
            <div class="breakdown-item">
              <span>Upfront (Down + Fees):</span>
              <span>${formatCurrency(results.leaseUpfrontTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Monthly Payments:</span>
              <span>${formatCurrency(results.leasePaymentTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Sales Tax on Payments:</span>
              <span>${formatCurrency(results.leaseTaxTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Insurance & Maintenance:</span>
              <span>${formatCurrency(results.leaseOngoingTotal)}</span>
            </div>
            ${results.leaseExcessMileage > 0 ? `
            <div class="breakdown-item">
              <span>Excess Mileage Fees:</span>
              <span style="color: #ef4444;">${formatCurrency(results.leaseExcessMileage)}</span>
            </div>
            ` : ''}
            <div class="breakdown-item">
              <span>Disposition Fees:</span>
              <span>${formatCurrency(results.leaseDispositionTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Opportunity Cost:</span>
              <span style="color: #f59e0b;">${formatCurrency(results.leaseOpportunityCost)}</span>
            </div>
            <div class="breakdown-item breakdown-total">
              <span><strong>Total Lease Cost:</strong></span>
              <span><strong>${formatCurrency(results.leaseNetCost)}</strong></span>
            </div>
            <div style="margin-top: 0.75rem; padding: 0.5rem; background: #eff6ff; border-radius: 6px; font-size: 0.85rem;">
              <span style="color: #6b7280;">Final equity:</span>
              <strong style="color: #3b82f6;">$0</strong>
              <span style="color: #9ca3af;">(you don't own the car)</span>
            </div>
          </div>
          
          <div class="breakdown-section">
            <div class="breakdown-title">🟢 Purchase Costs</div>
            <div class="breakdown-item">
              <span>Upfront (Down + Fees + Tax):</span>
              <span>${formatCurrency(results.buyUpfrontTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Loan Payments:</span>
              <span>${formatCurrency(results.buyPaymentTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Interest Paid:</span>
              <span style="color: #ef4444;">${formatCurrency(results.buyInterestTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Insurance & Maintenance:</span>
              <span>${formatCurrency(results.buyOngoingTotal)}</span>
            </div>
            <div class="breakdown-item">
              <span>Opportunity Cost:</span>
              <span style="color: #f59e0b;">${formatCurrency(results.buyOpportunityCost)}</span>
            </div>
            <div class="breakdown-item" style="color: #10b981;">
              <span>Less: Final Vehicle Equity:</span>
              <span>-${formatCurrency(results.buyFinalEquity)}</span>
            </div>
            <div class="breakdown-item breakdown-total">
              <span><strong>Net Purchase Cost:</strong></span>
              <span><strong>${formatCurrency(results.buyNetCost)}</strong></span>
            </div>
            <div style="margin-top: 0.75rem; padding: 0.5rem; background: #ecfdf5; border-radius: 6px; font-size: 0.85rem;">
              <span style="color: #6b7280;">Final equity:</span>
              <strong style="color: #047857;">${formatCurrency(results.buyFinalEquity)}</strong>
              <span style="color: #9ca3af;">(you own the car)</span>
            </div>
          </div>
        </div>

        <div class="cost-over-time-chart">
          <div class="chart-title">📊 Cumulative Cost Over Time</div>
          <div class="chart-bars" style="flex-direction: row;">
            ${results.yearlyData.map(data => {
              const maxValue = Math.max(...results.yearlyData.map(d => Math.max(d.leaseCumulative, d.buyNetCost)));
              const leaseHeight = (data.leaseCumulative / maxValue) * 100;
              const buyHeight = (data.buyNetCost / maxValue) * 100;
              return `
                <div class="chart-bar-group">
                  <div class="chart-bar-pair">
                    <div class="chart-bar lease-bar" style="height: ${leaseHeight}%;" title="Lease: ${formatCurrency(data.leaseCumulative)}"></div>
                    <div class="chart-bar buy-bar" style="height: ${buyHeight}%;" title="Buy: ${formatCurrency(data.buyNetCost)}"></div>
                  </div>
                  <div class="chart-bar-label">Year ${data.year}</div>
                </div>
              `;
            }).join('')}
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color lease"></div>
              <span>Lease Cost</span>
            </div>
            <div class="legend-item">
              <div class="legend-color buy"></div>
              <span>Buy Net Cost</span>
            </div>
          </div>
        </div>

        <div class="equity-chart">
          <div class="chart-title">💰 Equity Position at End of ${results.analysisPeriod} Years</div>
          <div class="equity-bar-container">
            <span class="equity-label">Lease</span>
            <div class="equity-bar-wrapper">
              <div class="equity-bar zero" style="width: 5%;">$0</div>
            </div>
          </div>
          <div class="equity-bar-container">
            <span class="equity-label">Buy</span>
            <div class="equity-bar-wrapper">
              <div class="equity-bar ${results.buyFinalEquity >= 0 ? 'positive' : 'negative'}" 
                   style="width: ${Math.min(100, Math.abs(results.buyFinalEquity) / results.vehiclePrice * 100)}%;">
                ${formatCurrency(results.buyFinalEquity)}
              </div>
            </div>
          </div>
        </div>

        <div class="timeline-chart">
          <div class="chart-title">📅 Year-by-Year Comparison</div>
          <div class="scrollable-container" style="overflow-x: auto;">
            <table class="year-comparison-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Lease Total</th>
                  <th>Buy Total</th>
                  <th>Buy Equity</th>
                  <th>Buy Net Cost</th>
                  <th>Better Option</th>
                </tr>
              </thead>
              <tbody>
                ${results.yearlyData.map(data => `
                  <tr>
                    <td><strong>Year ${data.year}</strong></td>
                    <td>${formatCurrency(data.leaseCumulative)}</td>
                    <td>${formatCurrency(data.buyCumulative)}</td>
                    <td style="color: #10b981;">${formatCurrency(data.buyEquity)}</td>
                    <td>${formatCurrency(data.buyNetCost)}</td>
                    <td>
                      <span class="${data.leaseCumulative < data.buyNetCost ? 'better-option' : 'worse-option'}">
                        ${data.leaseCumulative < data.buyNetCost ? '🔵 Lease' : '🟢 Buy'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="info-box" style="margin-top: 2rem;">
          <h4>📈 Key Insights</h4>
          <div class="insights-grid">
            <div class="insight-card ${results.betterOption === 'lease' ? 'positive' : ''}">
              <strong>Lease Analysis</strong>
              <p>You'll complete ${results.numberOfLeases} lease(s) over ${results.analysisPeriod} years with an average monthly cost of ${formatCurrency(results.leaseMonthlyEquivalent)}.</p>
            </div>
            <div class="insight-card ${results.betterOption === 'buy' ? 'positive' : ''}">
              <strong>Buy Analysis</strong>
              <p>After ${results.analysisPeriod} years, your vehicle will be worth approximately ${formatCurrency(results.buyFinalEquity)} in equity.</p>
            </div>
            ${state.expectedAnnualMiles > state.annualMileageAllowance ? `
            <div class="insight-card warning">
              <strong>Mileage Warning</strong>
              <p>You expect to drive ${(state.expectedAnnualMiles - state.annualMileageAllowance).toLocaleString()} miles/year over the lease allowance, costing ${formatCurrency(results.leaseExcessMileage)} extra.</p>
            </div>
            ` : ''}
            ${results.buyInterestTotal > results.savings ? `
            <div class="insight-card warning">
              <strong>Interest Cost</strong>
              <p>You'll pay ${formatCurrency(results.buyInterestTotal)} in loan interest when buying.</p>
            </div>
            ` : ''}
            ${results.breakevenYear ? `
            <div class="insight-card">
              <strong>Breakeven Point</strong>
              <p>The financial advantage switches from ${results.betterOption === 'lease' ? 'buy to lease' : 'lease to buy'} around year ${results.breakevenYear}.</p>
            </div>
            ` : ''}
          </div>
        </div>

        <div class="action-cards" style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
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

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  async function shareCalculation() {
    const url = window.location.href;
    
    const shareData = {
      title: 'Car Lease vs Buy Calculation',
      text: 'Check out my car lease vs buy analysis',
      url: url
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        
        const button = document.getElementById('share-calculation');
        if (button) {
          const originalHTML = button.innerHTML;
          button.innerHTML = '✓ Link Copied!';
          button.style.background = '#10b981';
          button.style.color = 'white';
          
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.color = '';
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

})();
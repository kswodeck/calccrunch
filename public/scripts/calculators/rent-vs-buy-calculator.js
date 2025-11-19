(() => {
  // State management
  let calculatorState = {
    // Rental inputs
    monthlyRent: 2000,
    rentIncrease: 3,
    rentersInsurance: 20,
    securityDeposit: 2000,
    
    // Purchase inputs
    homePrice: 400000,
    downPayment: 80000,
    downPaymentUnit: '$',
    interestRate: 6.5,
    loanTerm: 30,
    closingCosts: 12000,
    closingCostsUnit: '$',
    homeAppreciation: 3,
    
    // Ownership costs
    propertyTax: 4800,
    propertyTaxUnit: '$',
    homeInsurance: 1600,
    homeInsuranceUnit: '$',
    hoaFees: 0,
    maintenance: 1,
    maintenanceUnit: '%',
    pmi: 0.5,
    pmiUnit: '%',
    utilitiesDifference: 100,
    
    // Financial assumptions
    investmentReturn: 7,
    marginalTaxRate: 24,
    timeHorizon: 10,
    sellingCosts: 6
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    loadStateFromURL();
    attachEventListeners();
    updateUnitDisplays();
    
    // Check if we have valid state from URL
    if (hasValidInputs()) {
      calculateResults();
    }
  }

  function attachEventListeners() {
    // Input fields
    document.getElementById('monthly-rent').addEventListener('input', (e) => updateState('monthlyRent', parseFloat(e.target.value) || 0));
    document.getElementById('rent-increase').addEventListener('input', (e) => updateState('rentIncrease', parseFloat(e.target.value) || 0));
    document.getElementById('renters-insurance').addEventListener('input', (e) => updateState('rentersInsurance', parseFloat(e.target.value) || 0));
    document.getElementById('security-deposit').addEventListener('input', (e) => updateState('securityDeposit', parseFloat(e.target.value) || 0));
    
    document.getElementById('home-price').addEventListener('input', (e) => updateState('homePrice', parseFloat(e.target.value) || 0));
    document.getElementById('down-payment').addEventListener('input', (e) => updateState('downPayment', parseFloat(e.target.value) || 0));
    document.getElementById('interest-rate').addEventListener('input', (e) => updateState('interestRate', parseFloat(e.target.value) || 0));
    document.getElementById('loan-term').addEventListener('change', (e) => updateState('loanTerm', parseInt(e.target.value)));
    document.getElementById('closing-costs').addEventListener('input', (e) => updateState('closingCosts', parseFloat(e.target.value) || 0));
    document.getElementById('home-appreciation').addEventListener('input', (e) => updateState('homeAppreciation', parseFloat(e.target.value) || 0));
    
    document.getElementById('property-tax').addEventListener('input', (e) => updateState('propertyTax', parseFloat(e.target.value) || 0));
    document.getElementById('home-insurance').addEventListener('input', (e) => updateState('homeInsurance', parseFloat(e.target.value) || 0));
    document.getElementById('hoa-fees').addEventListener('input', (e) => updateState('hoaFees', parseFloat(e.target.value) || 0));
    document.getElementById('maintenance').addEventListener('input', (e) => updateState('maintenance', parseFloat(e.target.value) || 0));
    document.getElementById('pmi').addEventListener('input', (e) => updateState('pmi', parseFloat(e.target.value) || 0));
    document.getElementById('utilities-difference').addEventListener('input', (e) => updateState('utilitiesDifference', parseFloat(e.target.value) || 0));
    
    document.getElementById('investment-return').addEventListener('input', (e) => updateState('investmentReturn', parseFloat(e.target.value) || 0));
    document.getElementById('marginal-tax-rate').addEventListener('input', (e) => updateState('marginalTaxRate', parseFloat(e.target.value) || 0));
    document.getElementById('time-horizon').addEventListener('input', (e) => updateState('timeHorizon', parseInt(e.target.value) || 10));
    document.getElementById('selling-costs').addEventListener('input', (e) => updateState('sellingCosts', parseFloat(e.target.value) || 0));

    // Unit toggles
    document.getElementById('down-payment-unit').addEventListener('click', () => toggleUnit('downPayment'));
    document.getElementById('property-tax-unit').addEventListener('click', () => toggleUnit('propertyTax'));
    document.getElementById('home-insurance-unit').addEventListener('click', () => toggleUnit('homeInsurance'));
    document.getElementById('closing-costs-unit').addEventListener('click', () => toggleUnit('closingCosts'));
    document.getElementById('maintenance-unit').addEventListener('click', () => toggleUnit('maintenance'));
    document.getElementById('pmi-unit').addEventListener('click', () => toggleUnit('pmi'));

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

  function toggleUnit(field) {
    const unitField = field + 'Unit';
    calculatorState[unitField] = calculatorState[unitField] === '$' ? '%' : '$';
    updateUnitDisplay(field);
    saveStateToURL();
  }

  function updateUnitDisplay(field, init = false) {
    const unitField = field + 'Unit';
    const unitInput = document.getElementById(`${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    const unitElement = document.getElementById(`${field.replace(/([A-Z])/g, '-$1').toLowerCase()}-unit`);
    const helpElement = document.getElementById(`${field.replace(/([A-Z])/g, '-$1').toLowerCase()}-help`);
    
    if (unitElement) {
      const homePriceInput = document.getElementById('home-price') || 0;
      unitElement.textContent = calculatorState[unitField];
      
      if (helpElement) {
        if (calculatorState[unitField] === '%') {
          if (field === 'downPayment') {
            helpElement.textContent = 'Enter down payment as % of home price';
          } else if (field === 'propertyTax') {
            helpElement.textContent = 'Enter property tax as % of home value';
          } else if (field === 'homeInsurance') {
            helpElement.textContent = 'Enter insurance as % of home value';
          } else if (field === 'closingCosts') {
            helpElement.textContent = 'Enter closing costs as % of purchase price';
          } else if (field === 'maintenance') {
            helpElement.textContent = 'Enter maintenance costs as % of purchase price (click % to switch)';
          } else if (field === 'pmi') {
            helpElement.textContent = 'Enter pmi costs as % of purchase price (click % to switch)';
          }
          if (homePriceInput && !init) unitInput.value = Number((unitInput.value / homePriceInput.value * 100).toFixed(2));
        } else {
          if (field === 'downPayment') {
            helpElement.textContent = 'Enter down payment amount (click $ to switch)';
          } else if (field === 'propertyTax') {
            helpElement.textContent = 'Enter yearly property tax amount (click $ to switch)';
          } else if (field === 'homeInsurance') {
            helpElement.textContent = 'Enter yearly home insurance amount (click $ to switch)';
          } else if (field === 'closingCosts') {
            helpElement.textContent = 'Typically 2-5% of purchase price (click $ to switch)';
          } else if (field === 'maintenance') {
            helpElement.textContent = 'Enter yearly maintenance costs amount (click $ to switch)';
          } else if (field === 'pmi') {
            helpElement.textContent = 'Enter yearly private morgage insurance (PMI) costs';
          }
          if (homePriceInput && !init) unitInput.value = Math.round((homePriceInput.value * (unitInput.value / 100))).toFixed(0);
        }
      }
    }
  }

  function updateUnitDisplays(init = true) {
    updateUnitDisplay('downPayment', init);
    updateUnitDisplay('propertyTax', init);
    updateUnitDisplay('homeInsurance', init);
    updateUnitDisplay('closingCosts', init);
  }

  function updateState(key, value) {
    calculatorState[key] = value;
    saveStateToURL();
  }

  function hasValidInputs() {
    return calculatorState.monthlyRent > 0 && 
           calculatorState.homePrice > 0 && 
           calculatorState.downPayment > 0 &&
           calculatorState.interestRate > 0 &&
           calculatorState.timeHorizon > 0;
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
    const { 
      monthlyRent, rentIncrease, rentersInsurance, securityDeposit,
      homePrice, downPayment, downPaymentUnit, interestRate, loanTerm,
      closingCosts, closingCostsUnit, homeAppreciation,
      propertyTax, propertyTaxUnit, homeInsurance, homeInsuranceUnit,
      hoaFees, maintenance, maintenanceUnit, pmi, pmiUnit, utilitiesDifference,
      investmentReturn, marginalTaxRate, timeHorizon, sellingCosts
    } = calculatorState;

    // Convert percentages to actual amounts
    const actualDownPayment = downPaymentUnit === '%' ? (homePrice * downPayment / 100) : downPayment;
    const actualClosingCosts = closingCostsUnit === '%' ? (homePrice * closingCosts / 100) : closingCosts;
    const actualPropertyTax = propertyTaxUnit === '%' ? (homePrice * propertyTax / 100) : propertyTax;
    const actualHomeInsurance = homeInsuranceUnit === '%' ? (homePrice * homeInsurance / 100) : homeInsurance;
    const actualPmi = pmiUnit === '%' ? (homePrice * pmi / 100) : pmi;
    const actualMaintenance = maintenanceUnit === '%' ? (homePrice * maintenance / 100) : maintenance;
    
    // Calculate loan details
    const loanAmount = homePrice - actualDownPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Check if PMI is needed
    const downPaymentPercent = (actualDownPayment / homePrice) * 100;
    const needsPMI = downPaymentPercent < 20;
    const monthlyPMI = needsPMI ? (loanAmount * pmi / 100 / 12) : 0;
    
    // Monthly ownership costs
    const monthlyPropertyTax = actualPropertyTax / 12;
    const monthlyHomeInsurance = actualHomeInsurance / 12;
    const monthlyMaintenance = (homePrice * maintenance / 100) / 12;
    const totalMonthlyOwnership = monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance + 
                                   hoaFees + monthlyMaintenance + monthlyPMI + utilitiesDifference;
    
    // Initialize year-by-year arrays
    const yearlyData = [];
    let cumulativeRentCost = 0;
    let cumulativeRentersInsurance = 0;
    let cumulativeBuyCost = actualDownPayment + actualClosingCosts;
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;
    let remainingLoanBalance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let totalPropertyTaxPaid = 0;
    let totalHomeInsurancePaid = 0;
    let totalMaintenancePaid = 0;
    let totalPMIPaid = 0;
    let pmiDroppedYear = null;
    let investedDownPayment = actualDownPayment + actualClosingCosts;
    
    // Calculate year by year
    for (let year = 1; year <= timeHorizon; year++) {
      // Renting costs for the year
      let yearlyRentCost = 0;
      let yearlyRentersInsurance = 0;

      for (let month = 0; month < 12; month++) {
        yearlyRentCost += currentRent;
        yearlyRentersInsurance += rentersInsurance;
      }
      cumulativeRentCost += yearlyRentCost;
      cumulativeRentersInsurance += yearlyRentersInsurance;
      
      // Apply rent increase for next year
      currentRent *= (1 + rentIncrease / 100);
      
      // Home appreciation (do this FIRST, before calculating costs)
      if (year > 1) {
        currentHomeValue *= (1 + homeAppreciation / 100);
      }

      // Calculate CURRENT YEAR's property tax and insurance based on CURRENT home value
      const currentYearPropertyTax = propertyTaxUnit === '%' 
        ? (currentHomeValue * propertyTax / 100)
        : actualPropertyTax * Math.pow(1 + homeAppreciation / 100, year - 1); // If fixed amount, increase with appreciation

      const currentYearHomeInsurance = homeInsuranceUnit === '%'
        ? (currentHomeValue * homeInsurance / 100)
        : actualHomeInsurance * Math.pow(1 + homeAppreciation / 100, year - 1); // If fixed amount, increase with appreciation

      // Calculate maintenance based on current home value
      const currentYearMaintenance = (currentHomeValue * maintenance / 100);

      // Check if PMI should still be applied (remove when LTV <= 80%)
      const currentLTV = remainingLoanBalance / currentHomeValue;
      const stillNeedsPMI = currentLTV > 0.80 && needsPMI;
      const currentYearPMI = stillNeedsPMI ? (loanAmount * pmi / 100) : 0; // PMI based on original loan

      // Track when PMI drops off
      if (!stillNeedsPMI && pmiDroppedYear === null && needsPMI) {
        pmiDroppedYear = year;
      }

      // Buying costs for the year
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 0; month < 12; month++) {
        const interestPayment = remainingLoanBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingLoanBalance -= principalPayment;

        if (remainingLoanBalance < 0) remainingLoanBalance = 0;
      }

      // Tax deduction benefit
      const taxSavings = yearlyInterest * (marginalTaxRate / 100);

      // Other yearly ownership costs (using CURRENT year values)
      const yearlyOwnershipCosts = currentYearPropertyTax + currentYearHomeInsurance + 
                                (hoaFees * 12) + currentYearMaintenance + 
                                currentYearPMI + (utilitiesDifference * 12);
      
      const yearlyBuyCost = yearlyPrincipal + yearlyInterest + yearlyOwnershipCosts - taxSavings;
      cumulativeBuyCost += yearlyBuyCost;
      
      
      // Calculate opportunity cost - what the down payment would have grown to
      investedDownPayment *= (1 + investmentReturn / 100);
      
      // Calculate net position at this year
      const homeEquity = currentHomeValue - remainingLoanBalance;
      const sellingCostAmount = currentHomeValue * (sellingCosts / 100);
      const netProceedsIfSold = homeEquity - sellingCostAmount;
      
      // Total cost comparison
      const rentTotalCost = cumulativeRentCost + cumulativeRentersInsurance - (investedDownPayment - actualDownPayment - actualClosingCosts)
      const buyTotalCost = cumulativeBuyCost - netProceedsIfSold;

      const homeValueForYear = homePrice * Math.pow(1 + homeAppreciation / 100, year - 1);
      totalInterestPaid += yearlyInterest;
      totalPrincipalPaid += yearlyPrincipal;
      totalMaintenancePaid += currentYearMaintenance;
      totalPMIPaid += currentYearPMI;
      totalPropertyTaxPaid += propertyTaxUnit === '%' 
        ? (homeValueForYear * propertyTax / 100)
        : actualPropertyTax * Math.pow(1 + homeAppreciation / 100, year - 1);
      totalHomeInsurancePaid += homeInsuranceUnit === '%'
        ? (homeValueForYear * homeInsurance / 100)
        : actualHomeInsurance * Math.pow(1 + homeAppreciation / 100, year - 1);
      
      yearlyData.push({
        year,
        rentCost: rentTotalCost,
        buyCost: buyTotalCost,
        difference: buyTotalCost - rentTotalCost,
        homeValue: currentHomeValue,
        loanBalance: remainingLoanBalance,
        equity: homeEquity,
        monthlyRent: currentRent,
        investmentValue: investedDownPayment,
        mortgagePayment: monthlyPayment + (currentYearPropertyTax/12) + (currentYearHomeInsurance/12) + (currentYearPMI/12),
      });
    }
    
    // Final calculations
    const firstYear = yearlyData[0];
    const finalYear = yearlyData[timeHorizon - 1];
    const rentTotalNet = finalYear.rentCost;
    const buyTotalNet = finalYear.buyCost;
    const betterOption = rentTotalNet < buyTotalNet ? 'rent' : 'buy';
    const savings = Math.abs(rentTotalNet - buyTotalNet);
    
    // Calculate breakeven point
    let breakevenYear = null;
    for (let i = 0; i < yearlyData.length - 1; i++) {
      if (yearlyData[i].difference > 0 && yearlyData[i + 1].difference <= 0) {
        breakevenYear = yearlyData[i + 1].year;
        break;
      } else if (yearlyData[i].difference < 0 && yearlyData[i + 1].difference >= 0) {
        breakevenYear = yearlyData[i + 1].year;
        break;
      }
    }
    
    return {
      betterOption,
      savings,
      rentTotalNet,
      buyTotalNet,
      finalHomeValue: finalYear.homeValue,
      finalEquity: finalYear.equity,
      finalInvestmentValue: finalYear.investmentValue,
      totalRentPaid: cumulativeRentCost,
      totalRentersInsurance: cumulativeRentersInsurance,
      totalInterestPaid,
      totalPrincipalPaid,
      totalPropertyTaxPaid,
      totalHomeInsurancePaid,
      totalMaintenancePaid,
      totalPMIPaid,
      pmiDroppedYear,
      monthlyOwnershipCost: totalMonthlyOwnership,
      initialMonthlyRent: monthlyRent,
      finalMonthlyRent: finalYear.monthlyRent,
      finalMortgagePayment: finalYear.mortgagePayment,
      firstMortgagePayment: firstYear.mortgagePayment,
      breakevenYear,
      yearlyData,
      downPaymentPercent,
      needsPMI,
      monthlyPMI,
      actualDownPayment,
      actualClosingCosts,
      actualPropertyTax,
      actualHomeInsurance,
      monthlyPayment,
      totalBuyingCosts: cumulativeBuyCost,
      finalLoanBalance: remainingLoanBalance,
      netProceedsFromSale: finalYear.equity - (finalYear.homeValue * sellingCosts / 100),
    };
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('rent-vs-buy-result');
    
    const winnerColor = results.betterOption === 'rent' ? '#3b82f6' : '#10b981';
    const winnerText = results.betterOption === 'rent' ? 'Renting' : 'Buying';
    
    let breakevenText = '';
    if (results.breakevenYear) {
      breakevenText = `<p style="margin-top: 1rem; font-size: 1.1rem;">
        <strong>Breakeven Point:</strong> Year ${results.breakevenYear}
      </p>`;
    }
    
    resultDiv.innerHTML = `
      <div class="result-container">
        <div class="result-summary" style="background: linear-gradient(135deg, ${winnerColor}22 0%, ${winnerColor}11 100%); border-left: 4px solid ${winnerColor};">
          <h2 class="result-title">
            ${winnerText} is Better by ${formatCurrency(results.savings)}
          </h2>
          <p class="result-subtitle" style="margin-top: 1rem;">
            Over ${calculatorState.timeHorizon} years, ${winnerText.toLowerCase()} saves you ${formatCurrency(results.savings)} compared to ${results.betterOption === 'rent' ? 'buying' : 'renting'}.
          </p>
          ${breakevenText}
        </div>

        <div class="comparison-visualization">
          <h3 style="text-align: center; margin-bottom: 1.5rem;">Total Net Cost Comparison</h3>
          <div class="comparison-bars rent-vs-buy-bars">
            <div class="comparison-bar rent-vs-buy-bar">
              <div class="bar-label">Renting</div>
              <div class="bar-container">
                <div class="bar-fill rent" style="height: ${results.rentTotalNet > results.buyTotalNet ? '100%' : (results.rentTotalNet / results.buyTotalNet * 100) + '%'}">
                  <div class="bar-value">${formatCurrency(results.rentTotalNet)}</div>
                </div>
              </div>
              ${results.betterOption === 'rent' ? '<div class="winner-badge">Better Option</div>' : ''}
            </div>
            <div class="comparison-bar rent-vs-buy-bar">
              <div class="bar-label">Buying</div>
              <div class="bar-container">
                <div class="bar-fill buy" style="height: ${results.buyTotalNet > results.rentTotalNet ? '100%' : (results.buyTotalNet / results.rentTotalNet * 100) + '%'}">
                  <div class="bar-value">${formatCurrency(results.buyTotalNet)}</div>
                </div>
              </div>
              ${results.betterOption === 'buy' ? '<div class="winner-badge">Better Option</div>' : ''}
            </div>
          </div>
        </div>

        <div class="cost-breakdown-grid">
          <div class="breakdown-section">
            <div class="breakdown-title">🏠 Renting Analysis</div>

            <div class="breakdown-item">
              <span>Total Rent Paid:</span>
              <span>${formatCurrency(results.totalRentPaid)}</span>
            </div>
            <div class="breakdown-item">
              <span>Renter's Insurance:</span>
              <span>${formatCurrency(results.totalRentersInsurance)}</span>
            </div>
            <div class="breakdown-item" style="border-top: 1px solid #e5e7eb; padding-top: 0.5rem; margin-top: 0.5rem;">
              <span><strong>Total Housing Costs:</strong></span>
              <span><strong>${formatCurrency(results.totalRentPaid + results.totalRentersInsurance)}</strong></span>
            </div>

            <div style="background: #f0f9ff; padding: 0.75rem; border-radius: 6px; margin: 1rem 0;">
              <div style="margin-bottom: 0.5rem;"><strong>Investment Opportunity:</strong></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Final value (at ${calculatorState.investmentReturn}% return):</span>
                <span>${formatCurrency(results.finalInvestmentValue)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Initial amount (down payment + closing):</span>
                <span>-${formatCurrency(results.actualDownPayment + results.actualClosingCosts)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>Investment gain:</span>
                <span style="color: #10b981;">+${formatCurrency(results.finalInvestmentValue - results.actualDownPayment - results.actualClosingCosts)}</span>
              </div>
            </div>
            <div class="breakdown-item">
              <span>Less: Investment gains:</span>
              <span style="color: #10b981;">-${formatCurrency(results.finalInvestmentValue - results.actualDownPayment - results.actualClosingCosts)}</span>
            </div>
            <div class="breakdown-total breakdown-item">
              <span>Net Cost:</span>
              <span>${formatCurrency(results.rentTotalNet)}</span>
            </div>

            <div style="margin-top: 1rem; padding: 0.75rem; background: #f0f9ff; border-radius: 6px;">
              <small>Monthly rent: ${formatCurrency(calculatorState.monthlyRent)} → ${formatCurrency(results.finalMonthlyRent)}</small><br>
              <small>Security deposit: ${formatCurrency(calculatorState.securityDeposit)} (returned at end)</small>
            </div>
          </div>
          
          <div class="breakdown-section">
            <div class="breakdown-title">🔑 Buying Analysis</div>
            <div class="breakdown-item">
              <span>Down Payment:</span>
              <span>${formatCurrency(results.actualDownPayment)}</span>
            </div>
            <div class="breakdown-item">
              <span>Closing Costs:</span>
              <span>${formatCurrency(results.actualClosingCosts)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Principal Paid:</span>
              <span>${formatCurrency(results.totalPrincipalPaid)}</span>
            </div>
            <div class="breakdown-item">
              <span>Total Interest Paid:</span>
              <span>${formatCurrency(results.totalInterestPaid)}</span>
            </div>
            <div class="breakdown-item">
              <span>Tax Savings (Est. Interest Deduction):</span>
              <span style="color: #10b981;">-${formatCurrency(results.totalInterestPaid * calculatorState.marginalTaxRate / 100)}</span>
            </div>
            <div class="breakdown-item">
              <span>Property Tax & Insurance:</span>
              <span>${formatCurrency(results.totalPropertyTaxPaid + results.totalHomeInsurancePaid)}</span>
            </div>
            ${results.needsPMI ? `
            <div class="breakdown-item">
              <span>PMI (Private Mortgage Insurance):</span>
              <span>${formatCurrency(results.totalPMIPaid)}</span>
            </div>
            ${results.pmiDroppedYear ? `
              <div style="margin-left: 1rem; font-size: 0.875rem; color: #10b981;">
                ↳ PMI removed in year ${results.pmiDroppedYear} (reached 20% equity)
              </div>
              ` : ''}
            ` : ''}
            ${calculatorState.hoaFees > 0 ? `
            <div class="breakdown-item">
              <span>HOA Fees:</span>
              <span>${formatCurrency(calculatorState.hoaFees * 12 * calculatorState.timeHorizon)}</span>
            </div>
            ` : ''}
            ${calculatorState.maintenance > 0 ? `
              <div class="breakdown-item">
                <span>Maintenance & Repairs:</span>
                <span>${formatCurrency(results.totalMaintenancePaid)}</span>
              </div>
            ` : ''}
            ${calculatorState.utilitiesDifference > 0 ? `
            <div class="breakdown-item">
              <span>Additional Utilities:</span>
              <span>${formatCurrency(calculatorState.utilitiesDifference * 12 * calculatorState.timeHorizon)}</span>
            </div>
            ` : ''}
            <div class="breakdown-item" style="border-top: 1px solid #e5e7eb; padding-top: 0.5rem; margin-top: 0.5rem;">
              <span><strong>Total Costs:</strong></span>
              <span><strong style="color: #ef4444;">${formatCurrency(results.totalBuyingCosts)}</strong></span>
            </div>
            <div class="breakdown-item">
              <span>Home Value at Sale:</span>
              <span>${formatCurrency(results.finalHomeValue)}</span>
            </div>
            <div class="breakdown-item">
              <span>Less: Remaining Mortgage:</span>
              <span style="color: #ef4444;">-${formatCurrency(results.finalLoanBalance)}</span>
            </div>
            <div class="breakdown-item">
              <span>Less: Selling Costs (${calculatorState.sellingCosts}%):</span>
              <span style="color: #ef4444;">-${formatCurrency(results.finalHomeValue * calculatorState.sellingCosts / 100)}</span>
            </div>
            <div class="breakdown-item">
              <span><strong>Net Proceeds from Sale:</strong></span>
              <span><strong style="color: #10b981;">+${formatCurrency(results.netProceedsFromSale)}</strong></span>
            </div>
            <div class="breakdown-total breakdown-item">
              <span>Net Cost:</span>
              <span>${formatCurrency(results.buyTotalNet)}</span>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem; background: #f0fdf4; border-radius: 6px;">
              <small>Home value: ${formatCurrency(calculatorState.homePrice)} → ${formatCurrency(results.finalHomeValue)}</small><br>
              <small>Mortgage Payment Range (PITI): ${formatCurrency(results.firstMortgagePayment)} → ${formatCurrency(results.finalMortgagePayment)}</small><br>
              ${results.needsPMI ? `
                <small>+ PMI included: ${formatCurrency(results.monthlyPMI)}/month 
                ${results.pmiDroppedYear ? `(until year ${results.pmiDroppedYear})` : ''}</small>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="timeline-chart">
          <div class="chart-title">📊 Cost Comparison Over Time</div>
          <div class="scrollable-container" style="overflow-x: auto;">
            <table class="year-comparison-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Rent Net Cost</th>
                  <th>Buy Net Cost</th>
                  <th>Difference</th>
                  <th>Better Option</th>
                </tr>
              </thead>
              <tbody>
                ${results.yearlyData.filter((_, i) => i % Math.ceil(calculatorState.timeHorizon / 10) === 0 || i === results.yearlyData.length - 1)
                  .map(data => `
                    <tr>
                      <td><strong>Year ${data.year}</strong></td>
                      <td class="${data.rentCost < data.buyCost ? 'better-option' : ''}">${formatCurrency(data.rentCost)}</td>
                      <td class="${data.buyCost < data.rentCost ? 'better-option' : ''}">${formatCurrency(data.buyCost)}</td>
                      <td>${formatCurrency(Math.abs(data.difference))}</td>
                      <td><span class="${data.rentCost < data.buyCost ? 'better-option' : 'worse-option'}">${data.rentCost < data.buyCost ? 'Rent' : 'Buy'}</span></td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="info-box" style="margin-top: 2rem;">
          <h4>📈 Key Insights</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Your effective monthly housing cost when buying: <strong>${formatCurrency(results.monthlyOwnershipCost)}</strong></li>
            <li>Down payment as percentage: <strong>${results.downPaymentPercent.toFixed(1)}%</strong>   ${results.needsPMI ? `(PMI required${results.pmiDroppedYear ? ` - removed in year ${results.pmiDroppedYear}` : ''})` : '(No PMI needed)'}</li>
            <li>Total interest over ${calculatorState.loanTerm} years: <strong>${formatCurrency(results.totalInterestPaid)}</strong></li>
            <li>If invested, your down payment would grow to: <strong>${formatCurrency(results.finalInvestmentValue)}</strong></li>
            ${results.breakevenYear ? `<li>The financial advantage switches at year <strong>${results.breakevenYear}</strong></li>` : ''}
          </ul>
        </div>

        <div class="action-cards">
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
        if (key === 'loanTerm' || key === 'timeHorizon') {
          calculatorState[key] = parseInt(value) || calculatorState[key];
        } else if (key.includes('Unit')) {
          calculatorState[key] = value;
        } else {
          calculatorState[key] = parseFloat(value) || calculatorState[key];
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
  }

  async function shareCalculation() {
    const shareData = {
      title: 'Rent vs Buy Calculation',
      text: `Check out my rent vs buy analysis: ${calculatorState.betterOption === 'rent' ? 'Renting' : 'Buying'} saves ${formatCurrency(Math.abs(calculatorState.savings))} over ${calculatorState.timeHorizon} years.`,
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
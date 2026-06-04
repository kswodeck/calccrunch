(() => {
  'use strict';

  // State management
  let state = {
    purchasePrice: 300000,
    downPayment: 25,
    downPaymentUnit: '%',
    interestRate: 7.0,
    loanTerm: 30,
    closingCosts: 9000,
    closingCostsUnit: '$',
    renovationCosts: 0,
    monthlyRent: 2000,
    vacancyRate: 8,
    propertyTax: 3600,
    propertyTaxUnit: '$',
    insurance: 1500,
    hoaFees: 0,
    maintenanceReserve: 10,
    maintenanceReserveUnit: '%',
    managementFee: 10,
    managementFeeUnit: '%',
    otherExpenses: 0,
    annualAppreciation: 3,
    annualRentIncrease: 3
  };

  document.addEventListener('DOMContentLoaded', initializeCalculator);

  function initializeCalculator() {
    loadStateFromURL();
    attachEventListeners();
    updateUnitDisplays();

    if (hasValidInputs()) {
      calculateResults();
    }
  }

  function attachEventListeners() {
    // Input fields
    const inputMap = {
      'purchase-price': { key: 'purchasePrice', parse: parseFloat },
      'down-payment': { key: 'downPayment', parse: parseFloat },
      'interest-rate': { key: 'interestRate', parse: parseFloat },
      'loan-term': { key: 'loanTerm', parse: parseInt },
      'closing-costs': { key: 'closingCosts', parse: parseFloat },
      'renovation-costs': { key: 'renovationCosts', parse: parseFloat },
      'monthly-rent': { key: 'monthlyRent', parse: parseFloat },
      'vacancy-rate': { key: 'vacancyRate', parse: parseFloat },
      'property-tax': { key: 'propertyTax', parse: parseFloat },
      'insurance': { key: 'insurance', parse: parseFloat },
      'hoa-fees': { key: 'hoaFees', parse: parseFloat },
      'maintenance-reserve': { key: 'maintenanceReserve', parse: parseFloat },
      'management-fee': { key: 'managementFee', parse: parseFloat },
      'other-expenses': { key: 'otherExpenses', parse: parseFloat },
      'annual-appreciation': { key: 'annualAppreciation', parse: parseFloat },
      'annual-rent-increase': { key: 'annualRentIncrease', parse: parseFloat }
    };

    Object.entries(inputMap).forEach(([id, config]) => {
      const el = document.getElementById(id);
      if (el) {
        const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(eventType, (e) => {
          state[config.key] = config.parse(e.target.value) || 0;
          saveStateToURL();
        });
      }
    });

    // Unit toggles
    const toggles = [
      { id: 'down-payment-unit', field: 'downPayment' },
      { id: 'closing-costs-unit', field: 'closingCosts' },
      { id: 'property-tax-unit', field: 'propertyTax' },
      { id: 'maintenance-reserve-unit', field: 'maintenanceReserve' },
      { id: 'management-fee-unit', field: 'managementFee' }
    ];

    toggles.forEach(({ id, field }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => toggleUnit(field));
      }
    });

    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', () => {
      calculateResults();
      const resultEl = document.querySelector('.calculator-result');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Share button
    document.getElementById('share-calculation').addEventListener('click', shareCalculation);

    // Auto-calculate with debounce
    const inputs = document.querySelectorAll('#rental-property-calculator-form .form-input, #rental-property-calculator-form .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', debounce(() => {
        if (hasValidInputs()) {
          calculateResults();
        }
      }, 500));
    });
  }

  function toggleUnit(field) {
    const unitKey = field + 'Unit';
    const currentUnit = state[unitKey];
    const newUnit = currentUnit === '$' ? '%' : '$';
    const inputEl = document.getElementById(field.replace(/([A-Z])/g, '-$1').toLowerCase());
    const currentValue = parseFloat(inputEl.value) || 0;

    // Convert value
    if (field === 'downPayment') {
      if (newUnit === '$') {
        inputEl.value = Math.round(state.purchasePrice * currentValue / 100);
      } else {
        inputEl.value = state.purchasePrice > 0 ? (currentValue / state.purchasePrice * 100).toFixed(1) : 0;
      }
    } else if (field === 'closingCosts') {
      if (newUnit === '$') {
        inputEl.value = Math.round(state.purchasePrice * currentValue / 100);
      } else {
        inputEl.value = state.purchasePrice > 0 ? (currentValue / state.purchasePrice * 100).toFixed(1) : 0;
      }
    } else if (field === 'propertyTax') {
      if (newUnit === '$') {
        inputEl.value = Math.round(state.purchasePrice * currentValue / 100);
      } else {
        inputEl.value = state.purchasePrice > 0 ? (currentValue / state.purchasePrice * 100).toFixed(2) : 0;
      }
    } else if (field === 'maintenanceReserve') {
      if (newUnit === '$') {
        inputEl.value = Math.round(state.monthlyRent * currentValue / 100);
      } else {
        inputEl.value = state.monthlyRent > 0 ? (currentValue / state.monthlyRent * 100).toFixed(0) : 0;
      }
    } else if (field === 'managementFee') {
      if (newUnit === '$') {
        inputEl.value = Math.round(state.monthlyRent * currentValue / 100);
      } else {
        inputEl.value = state.monthlyRent > 0 ? (currentValue / state.monthlyRent * 100).toFixed(0) : 0;
      }
    }

    state[unitKey] = newUnit;
    state[field] = parseFloat(inputEl.value) || 0;
    updateUnitDisplay(field);
    saveStateToURL();
  }

  function updateUnitDisplay(field) {
    const unitKey = field + 'Unit';
    const unitEl = document.getElementById(field.replace(/([A-Z])/g, '-$1').toLowerCase() + '-unit');
    const helpEl = document.getElementById(field.replace(/([A-Z])/g, '-$1').toLowerCase() + '-help');

    if (unitEl) {
      unitEl.textContent = state[unitKey];
    }

    if (helpEl) {
      const isPercent = state[unitKey] === '%';
      const helpTexts = {
        downPayment: isPercent
          ? 'Enter down payment as % of purchase price (click % to switch)'
          : 'Enter down payment amount (click $ to switch)',
        closingCosts: isPercent
          ? 'Enter closing costs as % of purchase price (click % to switch)'
          : 'Typically 2-5% of purchase price (click $ to switch)',
        propertyTax: isPercent
          ? 'Enter property tax as % of property value (click % to switch)'
          : 'Annual property tax amount (click $ to switch)',
        maintenanceReserve: isPercent
          ? '% of monthly rent for repairs/capex (click % to switch)'
          : 'Monthly flat amount for repairs/capex (click $ to switch)',
        managementFee: isPercent
          ? '% of collected rent (click % to switch)'
          : 'Monthly flat management fee (click $ to switch)'
      };
      if (helpTexts[field]) {
        helpEl.textContent = helpTexts[field];
      }
    }
  }

  function updateUnitDisplays() {
    ['downPayment', 'closingCosts', 'propertyTax', 'maintenanceReserve', 'managementFee'].forEach(field => {
      updateUnitDisplay(field);
    });
  }

  function hasValidInputs() {
    return state.purchasePrice > 0 &&
           state.downPayment > 0 &&
           state.interestRate > 0 &&
           state.monthlyRent > 0;
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
    // Resolve unit-dependent values
    const actualDownPayment = state.downPaymentUnit === '%'
      ? state.purchasePrice * state.downPayment / 100
      : state.downPayment;
    const actualClosingCosts = state.closingCostsUnit === '%'
      ? state.purchasePrice * state.closingCosts / 100
      : state.closingCosts;
    const actualPropertyTaxAnnual = state.propertyTaxUnit === '%'
      ? state.purchasePrice * state.propertyTax / 100
      : state.propertyTax;
    const actualMaintenanceMonthly = state.maintenanceReserveUnit === '%'
      ? state.monthlyRent * state.maintenanceReserve / 100
      : state.maintenanceReserve;
    const actualManagementMonthly = state.managementFeeUnit === '%'
      ? state.monthlyRent * state.managementFee / 100
      : state.managementFee;

    // Loan calculations
    const loanAmount = state.purchasePrice - actualDownPayment;
    const monthlyRate = state.interestRate / 100 / 12;
    const numPayments = state.loanTerm * 12;
    let monthlyMortgage = 0;
    if (monthlyRate > 0) {
      monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyMortgage = loanAmount / numPayments;
    }

    // Monthly income (effective)
    const grossMonthlyRent = state.monthlyRent;
    const vacancyLoss = grossMonthlyRent * (state.vacancyRate / 100);
    const effectiveMonthlyRent = grossMonthlyRent - vacancyLoss;

    // Monthly expenses
    const monthlyPropertyTax = actualPropertyTaxAnnual / 12;
    const monthlyInsurance = state.insurance / 12;
    const monthlyHOA = state.hoaFees;
    const monthlyMaintenance = actualMaintenanceMonthly;
    const monthlyManagement = actualManagementMonthly;
    const monthlyOther = state.otherExpenses;

    const totalMonthlyOperatingExpenses = monthlyPropertyTax + monthlyInsurance + monthlyHOA +
      monthlyMaintenance + monthlyManagement + monthlyOther;
    const totalMonthlyExpenses = totalMonthlyOperatingExpenses + monthlyMortgage;

    // Cash flow
    const monthlyCashFlow = effectiveMonthlyRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;

    // NOI (Net Operating Income) - before debt service
    const annualGrossRent = grossMonthlyRent * 12;
    const annualEffectiveRent = effectiveMonthlyRent * 12;
    const annualOperatingExpenses = totalMonthlyOperatingExpenses * 12;
    const noi = annualEffectiveRent - annualOperatingExpenses;

    // Cap Rate
    const capRate = (noi / state.purchasePrice) * 100;

    // Total cash invested
    const totalCashInvested = actualDownPayment + actualClosingCosts + state.renovationCosts;

    // Cash-on-Cash Return
    const cashOnCash = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

    // DSCR (Debt Service Coverage Ratio)
    const annualDebtService = monthlyMortgage * 12;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : Infinity;

    // GRM (Gross Rent Multiplier)
    const grm = annualGrossRent > 0 ? state.purchasePrice / annualGrossRent : 0;

    // Break-even occupancy rate
    const breakEvenOccupancy = grossMonthlyRent > 0
      ? ((totalMonthlyExpenses + totalMonthlyOperatingExpenses - totalMonthlyOperatingExpenses) / grossMonthlyRent) * 100
      : 0;
    // More accurate: occupancy needed so that rent covers all expenses
    const breakEvenOccupancyRate = grossMonthlyRent > 0
      ? (totalMonthlyExpenses / grossMonthlyRent) * 100
      : 100;

    // 1% rule check
    const onePercentRule = (grossMonthlyRent / state.purchasePrice) * 100;

    // 50% rule check (operating expenses as % of gross rent)
    const fiftyPercentRule = grossMonthlyRent > 0
      ? (totalMonthlyOperatingExpenses / grossMonthlyRent) * 100
      : 0;

    // Year-by-year projections
    const projections = [];
    let currentPropertyValue = state.purchasePrice;
    let currentMonthlyRent = grossMonthlyRent;
    let currentLoanBalance = loanAmount;
    let cumulativeCashFlow = 0;
    let cumulativeAppreciation = 0;
    let cumulativeEquityBuildup = 0;

    for (let year = 1; year <= 10; year++) {
      // Appreciation
      currentPropertyValue *= (1 + state.annualAppreciation / 100);
      const appreciationGain = currentPropertyValue - state.purchasePrice;

      // Rent increase (applied at start of year for simplicity)
      if (year > 1) {
        currentMonthlyRent *= (1 + state.annualRentIncrease / 100);
      }

      // Recalculate expenses based on current rent (for % based)
      const yearMaintenanceMonthly = state.maintenanceReserveUnit === '%'
        ? currentMonthlyRent * state.maintenanceReserve / 100
        : state.maintenanceReserve;
      const yearManagementMonthly = state.managementFeeUnit === '%'
        ? currentMonthlyRent * state.managementFee / 100
        : state.managementFee;
      const yearVacancyLoss = currentMonthlyRent * (state.vacancyRate / 100);
      const yearEffectiveRent = currentMonthlyRent - yearVacancyLoss;
      const yearOperatingExpenses = monthlyPropertyTax + monthlyInsurance + monthlyHOA +
        yearMaintenanceMonthly + yearManagementMonthly + monthlyOther;
      const yearMonthlyCashFlow = yearEffectiveRent - yearOperatingExpenses - monthlyMortgage;
      const yearAnnualCashFlow = yearMonthlyCashFlow * 12;

      cumulativeCashFlow += yearAnnualCashFlow;

      // Principal paid this year
      let principalPaidThisYear = 0;
      let tempBalance = currentLoanBalance;
      for (let m = 0; m < 12; m++) {
        const interestPayment = tempBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        principalPaidThisYear += principalPayment;
        tempBalance -= principalPayment;
        if (tempBalance < 0) tempBalance = 0;
      }
      currentLoanBalance = tempBalance;
      cumulativeEquityBuildup += principalPaidThisYear;

      // Equity = property value - remaining loan
      const equity = currentPropertyValue - currentLoanBalance;

      // Total return = cash flow + equity buildup + appreciation - initial investment
      const totalReturn = cumulativeCashFlow + (currentPropertyValue - state.purchasePrice) + cumulativeEquityBuildup;
      const totalROI = totalCashInvested > 0 ? (totalReturn / totalCashInvested) * 100 : 0;

      projections.push({
        year,
        propertyValue: currentPropertyValue,
        monthlyRent: currentMonthlyRent,
        annualCashFlow: yearAnnualCashFlow,
        cumulativeCashFlow,
        loanBalance: currentLoanBalance,
        equity,
        equityBuildup: cumulativeEquityBuildup,
        appreciationGain: currentPropertyValue - state.purchasePrice,
        totalReturn,
        totalROI
      });
    }

    return {
      // Core metrics
      monthlyMortgage,
      totalMonthlyOperatingExpenses,
      totalMonthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCash,
      noi,
      dscr,
      grm,
      totalCashInvested,
      breakEvenOccupancyRate,
      onePercentRule,
      fiftyPercentRule,

      // Income
      grossMonthlyRent,
      vacancyLoss,
      effectiveMonthlyRent,

      // Expenses breakdown
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyHOA,
      monthlyMaintenance,
      monthlyManagement,
      monthlyOther,

      // Loan info
      loanAmount,
      actualDownPayment,
      actualClosingCosts,

      // Projections
      projections
    };
  }

  function displayResults(r) {
    const resultDiv = document.getElementById('rental-property-result');

    // Determine cash flow status
    const cfClass = r.monthlyCashFlow >= 0 ? 'positive' : 'negative';
    const cfSign = r.monthlyCashFlow >= 0 ? '+' : '';

    // Determine deal quality
    const dealChecks = {
      onePercent: r.onePercentRule >= 1,
      fiftyPercent: r.fiftyPercentRule <= 50,
      dscrHealthy: r.dscr >= 1.25,
      grmGood: r.grm <= 15,
      positiveCashFlow: r.monthlyCashFlow > 0
    };
    const passCount = Object.values(dealChecks).filter(Boolean).length;
    let dealRating, dealClass;
    if (passCount >= 5) { dealRating = 'Excellent Deal'; dealClass = 'excellent'; }
    else if (passCount >= 4) { dealRating = 'Good Deal'; dealClass = 'good'; }
    else if (passCount >= 3) { dealRating = 'Fair Deal'; dealClass = 'fair'; }
    else { dealRating = 'Below Average'; dealClass = 'poor'; }

    // Metric card classes
    const capRateClass = r.capRate >= 6 ? 'positive' : r.capRate >= 4 ? 'neutral' : 'negative';
    const cocClass = r.cashOnCash >= 8 ? 'positive' : r.cashOnCash >= 4 ? 'neutral' : 'negative';
    const dscrClass = r.dscr >= 1.25 ? 'positive' : r.dscr >= 1.0 ? 'neutral' : 'negative';

    // Expense colors for bar chart
    const expenseItems = [
      { label: 'Mortgage (P&I)', value: r.monthlyMortgage, color: '#3b82f6' },
      { label: 'Property Tax', value: r.monthlyPropertyTax, color: '#8b5cf6' },
      { label: 'Insurance', value: r.monthlyInsurance, color: '#06b6d4' },
      { label: 'HOA', value: r.monthlyHOA, color: '#f59e0b' },
      { label: 'Maintenance', value: r.monthlyMaintenance, color: '#10b981' },
      { label: 'Management', value: r.monthlyManagement, color: '#ef4444' },
      { label: 'Other', value: r.monthlyOther, color: '#6b7280' }
    ].filter(item => item.value > 0);

    const maxExpense = Math.max(...expenseItems.map(i => i.value));

    resultDiv.innerHTML = `
      <div class="result-container">
        <!-- Cash Flow Indicator -->
        <div class="cash-flow-indicator ${cfClass}">
          <div class="cash-flow-amount">${cfSign}${formatCurrency(r.monthlyCashFlow)}/mo</div>
          <div class="cash-flow-label">Monthly Cash Flow (${cfSign}${formatCurrency(r.annualCashFlow)}/year)</div>
        </div>

        <!-- Key Metrics -->
        <div class="metrics-grid">
          <div class="metric-card ${capRateClass}">
            <div class="metric-label">Cap Rate</div>
            <div class="metric-value">${r.capRate.toFixed(2)}%</div>
          </div>
          <div class="metric-card ${cocClass}">
            <div class="metric-label">Cash-on-Cash</div>
            <div class="metric-value">${r.cashOnCash.toFixed(2)}%</div>
          </div>
          <div class="metric-card ${cfClass}">
            <div class="metric-label">Monthly Cash Flow</div>
            <div class="metric-value">${cfSign}${formatCurrency(r.monthlyCashFlow)}</div>
          </div>
          <div class="metric-card ${dscrClass}">
            <div class="metric-label">DSCR</div>
            <div class="metric-value">${r.dscr === Infinity ? 'N/A' : r.dscr.toFixed(2)}</div>
          </div>
        </div>

        <!-- Deal Quality Rating -->
        <div class="deal-quality ${dealClass}">
          <div class="deal-quality-title">${dealRating}</div>
          <ul class="deal-quality-checks">
            <li class="${dealChecks.onePercent ? 'check-pass' : 'check-fail'}">
              ${dealChecks.onePercent ? '&#10003;' : '&#10007;'} 1% Rule: Rent is ${r.onePercentRule.toFixed(2)}% of purchase price ${dealChecks.onePercent ? '(passes)' : '(below 1%)'}
            </li>
            <li class="${dealChecks.fiftyPercent ? 'check-pass' : 'check-fail'}">
              ${dealChecks.fiftyPercent ? '&#10003;' : '&#10007;'} 50% Rule: Operating expenses are ${r.fiftyPercentRule.toFixed(0)}% of gross rent ${dealChecks.fiftyPercent ? '(passes)' : '(exceeds 50%)'}
            </li>
            <li class="${dealChecks.dscrHealthy ? 'check-pass' : 'check-fail'}">
              ${dealChecks.dscrHealthy ? '&#10003;' : '&#10007;'} DSCR >= 1.25: Current DSCR is ${r.dscr === Infinity ? 'N/A (no debt)' : r.dscr.toFixed(2)} ${dealChecks.dscrHealthy ? '(healthy margin)' : '(tight or negative)'}
            </li>
            <li class="${dealChecks.grmGood ? 'check-pass' : 'check-fail'}">
              ${dealChecks.grmGood ? '&#10003;' : '&#10007;'} GRM < 15: Current GRM is ${r.grm.toFixed(1)} ${dealChecks.grmGood ? '(good value)' : '(may be overpriced)'}
            </li>
            <li class="${dealChecks.positiveCashFlow ? 'check-pass' : 'check-fail'}">
              ${dealChecks.positiveCashFlow ? '&#10003;' : '&#10007;'} Positive Cash Flow: ${dealChecks.positiveCashFlow ? formatCurrency(r.monthlyCashFlow) + '/mo' : 'Negative ' + formatCurrency(Math.abs(r.monthlyCashFlow)) + '/mo'}
            </li>
          </ul>
        </div>

        <!-- Summary Grid -->
        <div class="summary-grid">
          <div class="summary-section">
            <h4>Income Summary</h4>
            <div class="summary-item">
              <span>Gross Monthly Rent:</span>
              <span>${formatCurrency(r.grossMonthlyRent)}</span>
            </div>
            <div class="summary-item">
              <span>Vacancy Loss (${state.vacancyRate}%):</span>
              <span style="color: #dc2626;">-${formatCurrency(r.vacancyLoss)}</span>
            </div>
            <div class="summary-item" style="font-weight:bold; border-top: 2px solid #e5e7eb; padding-top: 0.5rem;">
              <span>Effective Monthly Rent:</span>
              <span>${formatCurrency(r.effectiveMonthlyRent)}</span>
            </div>
            <div class="summary-item">
              <span>Annual NOI:</span>
              <span style="font-weight:bold;">${formatCurrency(r.noi)}</span>
            </div>
          </div>
          <div class="summary-section">
            <h4>Cash to Close</h4>
            <div class="summary-item">
              <span>Down Payment:</span>
              <span>${formatCurrency(r.actualDownPayment)}</span>
            </div>
            <div class="summary-item">
              <span>Closing Costs:</span>
              <span>${formatCurrency(r.actualClosingCosts)}</span>
            </div>
            <div class="summary-item">
              <span>Renovation Costs:</span>
              <span>${formatCurrency(state.renovationCosts)}</span>
            </div>
            <div class="summary-item" style="font-weight:bold; border-top: 2px solid #e5e7eb; padding-top: 0.5rem;">
              <span>Total Cash Needed:</span>
              <span>${formatCurrency(r.totalCashInvested)}</span>
            </div>
            <div class="summary-item">
              <span>Loan Amount:</span>
              <span>${formatCurrency(r.loanAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Additional Metrics -->
        <div class="summary-grid">
          <div class="summary-section">
            <h4>Key Ratios</h4>
            <div class="summary-item">
              <span>Gross Rent Multiplier (GRM):</span>
              <span>${r.grm.toFixed(1)}</span>
            </div>
            <div class="summary-item">
              <span>Break-Even Occupancy:</span>
              <span>${r.breakEvenOccupancyRate.toFixed(1)}%</span>
            </div>
            <div class="summary-item">
              <span>Operating Expense Ratio:</span>
              <span>${r.fiftyPercentRule.toFixed(1)}%</span>
            </div>
            <div class="summary-item">
              <span>Rent-to-Price Ratio:</span>
              <span>${r.onePercentRule.toFixed(3)}%</span>
            </div>
          </div>
          <div class="summary-section">
            <h4>Annual Returns</h4>
            <div class="summary-item">
              <span>Annual Cash Flow:</span>
              <span style="color: ${r.annualCashFlow >= 0 ? '#059669' : '#dc2626'}; font-weight:bold;">${r.annualCashFlow >= 0 ? '+' : ''}${formatCurrency(r.annualCashFlow)}</span>
            </div>
            <div class="summary-item">
              <span>Cash-on-Cash Return:</span>
              <span>${r.cashOnCash.toFixed(2)}%</span>
            </div>
            <div class="summary-item">
              <span>Cap Rate:</span>
              <span>${r.capRate.toFixed(2)}%</span>
            </div>
            <div class="summary-item">
              <span>Year 1 Total ROI:</span>
              <span>${r.projections[0] ? r.projections[0].totalROI.toFixed(1) + '%' : 'N/A'}</span>
            </div>
          </div>
        </div>

        <!-- Expense Breakdown -->
        <div class="expense-breakdown">
          <div class="section-title">Monthly Expense Breakdown</div>
          ${expenseItems.map(item => `
            <div class="expense-bar">
              <span class="expense-bar-label">${item.label}</span>
              <div class="expense-bar-track">
                <div class="expense-bar-fill" style="width: ${(item.value / maxExpense * 100).toFixed(1)}%; background: ${item.color};"></div>
              </div>
              <span class="expense-bar-value">${formatCurrency(item.value)}</span>
            </div>
          `).join('')}
          <div class="expense-bar" style="border-top: 2px solid #e5e7eb; padding-top: 0.75rem; margin-top: 0.75rem;">
            <span class="expense-bar-label" style="font-weight:bold;">Total Expenses</span>
            <div class="expense-bar-track">
              <div class="expense-bar-fill" style="width: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ef4444);"></div>
            </div>
            <span class="expense-bar-value" style="font-weight:bold;">${formatCurrency(r.totalMonthlyExpenses)}</span>
          </div>
          <div style="margin-top: 0.75rem; padding: 0.75rem; background: ${r.monthlyCashFlow >= 0 ? '#ecfdf5' : '#fef2f2'}; border-radius: 6px;">
            <span>Effective Income: ${formatCurrency(r.effectiveMonthlyRent)} - Total Expenses: ${formatCurrency(r.totalMonthlyExpenses)} = <strong style="color: ${r.monthlyCashFlow >= 0 ? '#059669' : '#dc2626'};">${r.monthlyCashFlow >= 0 ? '+' : ''}${formatCurrency(r.monthlyCashFlow)}/mo</strong></span>
          </div>
        </div>

        <!-- Year-by-Year Projections -->
        <div class="section-title">10-Year Investment Projections</div>
        <div style="overflow-x: auto;">
          <table class="projection-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Property Value</th>
                <th>Monthly Rent</th>
                <th>Annual Cash Flow</th>
                <th>Loan Balance</th>
                <th>Equity</th>
                <th>Total ROI</th>
              </tr>
            </thead>
            <tbody>
              ${r.projections.map(p => `
                <tr>
                  <td><strong>Year ${p.year}</strong></td>
                  <td>${formatCurrency(p.propertyValue)}</td>
                  <td>${formatCurrency(p.monthlyRent)}</td>
                  <td style="color: ${p.annualCashFlow >= 0 ? '#059669' : '#dc2626'};">${p.annualCashFlow >= 0 ? '+' : ''}${formatCurrency(p.annualCashFlow)}</td>
                  <td>${formatCurrency(p.loanBalance)}</td>
                  <td>${formatCurrency(p.equity)}</td>
                  <td style="font-weight:bold;">${p.totalROI.toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Projection Highlights -->
        <div class="summary-grid" style="margin-top: 1.5rem;">
          <div class="summary-section">
            <h4>5-Year Summary</h4>
            ${r.projections[4] ? `
            <div class="summary-item">
              <span>Property Value:</span>
              <span>${formatCurrency(r.projections[4].propertyValue)}</span>
            </div>
            <div class="summary-item">
              <span>Appreciation Gain:</span>
              <span style="color:#059669;">+${formatCurrency(r.projections[4].appreciationGain)}</span>
            </div>
            <div class="summary-item">
              <span>Cumulative Cash Flow:</span>
              <span style="color: ${r.projections[4].cumulativeCashFlow >= 0 ? '#059669' : '#dc2626'};">${r.projections[4].cumulativeCashFlow >= 0 ? '+' : ''}${formatCurrency(r.projections[4].cumulativeCashFlow)}</span>
            </div>
            <div class="summary-item">
              <span>Equity Built:</span>
              <span>${formatCurrency(r.projections[4].equity)}</span>
            </div>
            <div class="summary-item" style="font-weight:bold;">
              <span>Total ROI:</span>
              <span>${r.projections[4].totalROI.toFixed(1)}%</span>
            </div>
            ` : '<p>N/A</p>'}
          </div>
          <div class="summary-section">
            <h4>10-Year Summary</h4>
            ${r.projections[9] ? `
            <div class="summary-item">
              <span>Property Value:</span>
              <span>${formatCurrency(r.projections[9].propertyValue)}</span>
            </div>
            <div class="summary-item">
              <span>Appreciation Gain:</span>
              <span style="color:#059669;">+${formatCurrency(r.projections[9].appreciationGain)}</span>
            </div>
            <div class="summary-item">
              <span>Cumulative Cash Flow:</span>
              <span style="color: ${r.projections[9].cumulativeCashFlow >= 0 ? '#059669' : '#dc2626'};">${r.projections[9].cumulativeCashFlow >= 0 ? '+' : ''}${formatCurrency(r.projections[9].cumulativeCashFlow)}</span>
            </div>
            <div class="summary-item">
              <span>Equity Built:</span>
              <span>${formatCurrency(r.projections[9].equity)}</span>
            </div>
            <div class="summary-item" style="font-weight:bold;">
              <span>Total ROI:</span>
              <span>${r.projections[9].totalROI.toFixed(1)}%</span>
            </div>
            ` : '<p>N/A</p>'}
          </div>
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
    Object.keys(state).forEach(key => {
      if (state[key] !== null && state[key] !== '') {
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
        if (key === 'loanTerm') {
          state[key] = parseInt(value) || state[key];
        } else if (key.includes('Unit')) {
          state[key] = value;
        } else {
          state[key] = parseFloat(value) || state[key];
        }
      }
    });

    // Update form inputs from state
    const fieldToId = {
      purchasePrice: 'purchase-price',
      downPayment: 'down-payment',
      interestRate: 'interest-rate',
      loanTerm: 'loan-term',
      closingCosts: 'closing-costs',
      renovationCosts: 'renovation-costs',
      monthlyRent: 'monthly-rent',
      vacancyRate: 'vacancy-rate',
      propertyTax: 'property-tax',
      insurance: 'insurance',
      hoaFees: 'hoa-fees',
      maintenanceReserve: 'maintenance-reserve',
      managementFee: 'management-fee',
      otherExpenses: 'other-expenses',
      annualAppreciation: 'annual-appreciation',
      annualRentIncrease: 'annual-rent-increase'
    };

    Object.entries(fieldToId).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = state[key];
      }
    });
  }

  async function shareCalculation() {
    saveStateToURL();

    const shareData = {
      title: 'Rental Property Investment Analysis',
      text: `Rental property analysis: ${formatCurrency(state.purchasePrice)} property with ${formatCurrency(state.monthlyRent)}/mo rent. Cash flow: ${formatCurrency(performCalculations().monthlyCashFlow)}/mo`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        const button = document.getElementById('share-calculation');
        const originalText = button.innerHTML;
        button.innerHTML = '&#10003; Link Copied!';
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

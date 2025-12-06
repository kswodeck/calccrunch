// Student Loan Calculator with Multiple Repayment Plans
(function() {
  'use strict';

  // 2024 Federal Poverty Guidelines (for 48 contiguous states)
  const POVERTY_GUIDELINES = {
    continental: {
      base: 15060,
      perPerson: 5380
    },
    alaska: {
      base: 18810,
      perPerson: 6730
    },
    hawaii: {
      base: 17310,
      perPerson: 6190
    }
  };

  // Loan Types
  const LOAN_TYPES = [
    { value: 'federal-subsidized', label: 'Federal Subsidized', icon: '🏛️' },
    { value: 'federal-unsubsidized', label: 'Federal Unsubsidized', icon: '🏛️' },
    { value: 'federal-plus', label: 'Federal PLUS', icon: '🏛️' },
    { value: 'federal-grad-plus', label: 'Graduate PLUS', icon: '🎓' },
    { value: 'federal-perkins', label: 'Federal Perkins', icon: '🏛️' },
    { value: 'private', label: 'Private Loan', icon: '🏦' }
  ];

  // Repayment Plan Details
  const PLAN_INFO = {
    'standard': {
      name: 'Standard Repayment',
      term: 120, // 10 years
      description: 'Fixed payments over 10 years',
      forgiveness: false
    },
    'graduated': {
      name: 'Graduated Repayment',
      term: 120,
      description: 'Payments start low, increase every 2 years',
      forgiveness: false
    },
    'extended-fixed': {
      name: 'Extended Fixed',
      term: 300, // 25 years
      description: 'Fixed payments over 25 years (requires $30K+)',
      forgiveness: false,
      minBalance: 30000
    },
    'extended-graduated': {
      name: 'Extended Graduated',
      term: 300,
      description: 'Graduated payments over 25 years (requires $30K+)',
      forgiveness: false,
      minBalance: 30000
    },
    'ibr': {
      name: 'Income-Based Repayment (IBR)',
      description: '10-15% of discretionary income',
      pctIncome: 0.15, // 15% for old borrowers, 10% for new
      forgivenessYears: 25, // 20 for new borrowers
      pslf: true
    },
    'paye': {
      name: 'Pay As You Earn (PAYE)',
      description: '10% of discretionary income',
      pctIncome: 0.10,
      forgivenessYears: 20,
      pslf: true
    },
    'save': {
      name: 'SAVE Plan',
      description: '5-10% of discretionary income, interest benefits',
      pctIncome: 0.10, // 5% for undergrad only
      forgivenessYears: 20, // 10 for balances under $12K
      pslf: true
    },
    'icr': {
      name: 'Income-Contingent (ICR)',
      description: '20% of discretionary income',
      pctIncome: 0.20,
      forgivenessYears: 25,
      pslf: true
    }
  };

  // State
  let loans = [];
  let loanCounter = 0;

  // DOM Elements
  const loansContainer = document.getElementById('loans-container');
  const addLoanBtn = document.getElementById('add-loan-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const shareBtn = document.getElementById('share-calculation');
  const resultDiv = document.getElementById('student-loan-result');
  const totalBalanceDisplay = document.getElementById('total-balance-display');
  const avgRateDisplay = document.getElementById('avg-rate-display');
  const loanCountDisplay = document.getElementById('loan-count-display');
  const repaymentPlanSelect = document.getElementById('repayment-plan');
  const planDescription = document.getElementById('plan-description');

  // Initialize
  init();

  function init() {
    loadFromURL();

    if (loans.length === 0) {
      addLoan();
    }

    // Event listeners
    addLoanBtn.addEventListener('click', () => addLoan());
    calculateBtn.addEventListener('click', () => {
      calculateResults();
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    clearBtn.addEventListener('click', clearForm);
    shareBtn.addEventListener('click', shareCalculation);

    // Repayment plan change
    repaymentPlanSelect.addEventListener('change', updatePlanDescription);

    // Add change listeners for URL saving
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-checkbox');
    inputs.forEach(input => {
      input.addEventListener('change', debounce(saveToURL, 500));
      if (input.type === 'number') {
        input.addEventListener('input', debounce(saveToURL, 500));
      }
    });

    updatePlanDescription();
    updateSummary();
  }

  function addLoan(data = null) {
    loanCounter++;
    const loanId = data?.id || `loan-${loanCounter}`;

    const loan = {
      id: loanId,
      name: data?.name || '',
      type: data?.type || 'federal-unsubsidized',
      balance: data?.balance || '',
      rate: data?.rate || ''
    };

    loans.push(loan);

    const loanRow = document.createElement('div');
    loanRow.className = 'loan-row';
    loanRow.dataset.loanId = loanId;

    loanRow.innerHTML = `
      <div class="loan-header">
        <span class="loan-number">Loan #${loans.length}</span>
        <button type="button" class="remove-loan-btn" data-loan-id="${loanId}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${loanId}-name">
            Loan Name
          </label>
          <input 
            type="text" 
            id="${loanId}-name" 
            class="form-input loan-name"
            placeholder="e.g., Stafford Loan 2020"
            value="${loan.name}"
            data-loan-id="${loanId}"
          />
          <small class="form-help">Optional: Name to identify this loan</small>
        </div>
        <div class="form-group">
          <label for="${loanId}-type">
            Loan Type <span class="required">*</span>
          </label>
          <select id="${loanId}-type" class="form-select loan-type" data-loan-id="${loanId}">
            ${LOAN_TYPES.map(type => `
              <option value="${type.value}" ${loan.type === type.value ? 'selected' : ''}>
                ${type.icon} ${type.label}
              </option>
            `).join('')}
          </select>
          <small class="form-help">Federal loans eligible for IDR plans</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="${loanId}-balance">
            Current Balance <span class="required">*</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${loanId}-balance" 
              class="form-input loan-balance"
              placeholder="25000"
              min="0"
              step="100"
              value="${loan.balance}"
              data-loan-id="${loanId}"
              required
            />
            <span class="input-addon">$</span>
          </div>
          <small class="form-help">Outstanding principal + interest</small>
        </div>
        <div class="form-group">
          <label for="${loanId}-rate">
            Interest Rate <span class="required">*</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              id="${loanId}-rate" 
              class="form-input loan-rate"
              placeholder="5.5"
              min="0"
              max="30"
              step="0.01"
              value="${loan.rate}"
              data-loan-id="${loanId}"
              required
            />
            <span class="input-addon">%</span>
          </div>
          <small class="form-help">Annual interest rate</small>
        </div>
      </div>
    `;

    loansContainer.appendChild(loanRow);

    // Add event listeners
    const nameInput = loanRow.querySelector('.loan-name');
    const typeSelect = loanRow.querySelector('.loan-type');
    const balanceInput = loanRow.querySelector('.loan-balance');
    const rateInput = loanRow.querySelector('.loan-rate');
    const removeBtn = loanRow.querySelector('.remove-loan-btn');

    nameInput.addEventListener('input', debounce(() => {
      updateLoanData(loanId);
      saveToURL();
    }, 500));

    typeSelect.addEventListener('change', () => {
      updateLoanData(loanId);
      saveToURL();
    });

    balanceInput.addEventListener('input', debounce(() => {
      updateLoanData(loanId);
      updateSummary();
      saveToURL();
    }, 300));

    rateInput.addEventListener('input', debounce(() => {
      updateLoanData(loanId);
      updateSummary();
      saveToURL();
    }, 300));

    removeBtn.addEventListener('click', () => removeLoan(loanId));

    updateLoanNumbers();
    updateSummary();
  }

  function updateLoanData(loanId) {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    loan.name = document.querySelector(`#${loanId}-name`)?.value || '';
    loan.type = document.querySelector(`#${loanId}-type`)?.value || 'federal-unsubsidized';
    loan.balance = document.querySelector(`#${loanId}-balance`)?.value || '';
    loan.rate = document.querySelector(`#${loanId}-rate`)?.value || '';
  }

  function removeLoan(loanId) {
    loans = loans.filter(l => l.id !== loanId);
    if (loans.length === 0) {
      addLoan();
    }

    const row = document.querySelector(`[data-loan-id="${loanId}"]`);
    if (row) row.remove();

    updateLoanNumbers();
    updateSummary();
    saveToURL();
  }

  function updateLoanNumbers() {
    const rows = loansContainer.querySelectorAll('.loan-row');
    rows.forEach((row, index) => {
      const numberSpan = row.querySelector('.loan-number');
      if (numberSpan) {
        numberSpan.textContent = `Loan #${index + 1}`;
      }
    });
  }

  function updateSummary() {
    let totalBalance = 0;
    let weightedRateSum = 0;
    let validLoans = 0;

    loans.forEach(loan => {
      const balance = parseFloat(document.querySelector(`#${loan.id}-balance`)?.value) || 0;
      const rate = parseFloat(document.querySelector(`#${loan.id}-rate`)?.value) || 0;

      if (balance > 0) {
        totalBalance += balance;
        weightedRateSum += balance * rate;
        validLoans++;
      }
    });

    const avgRate = totalBalance > 0 ? weightedRateSum / totalBalance : 0;

    totalBalanceDisplay.textContent = formatCurrency(totalBalance);
    avgRateDisplay.textContent = avgRate.toFixed(2) + '%';
    loanCountDisplay.textContent = validLoans;
  }

  function updatePlanDescription() {
    const plan = repaymentPlanSelect.value;
    const info = PLAN_INFO[plan];
    if (info && planDescription) {
      planDescription.textContent = info.description;
    }
  }

  function calculateResults() {
    // Gather loan data
    const loanData = loans.map(loan => ({
      id: loan.id,
      name: document.querySelector(`#${loan.id}-name`)?.value || `Loan ${loan.id}`,
      type: document.querySelector(`#${loan.id}-type`)?.value || 'federal-unsubsidized',
      balance: parseFloat(document.querySelector(`#${loan.id}-balance`)?.value) || 0,
      rate: parseFloat(document.querySelector(`#${loan.id}-rate`)?.value) || 0
    })).filter(l => l.balance > 0);

    if (loanData.length === 0) {
      showError('Please enter at least one loan with a balance.');
      return;
    }

    // Get other inputs
    const annualIncome = parseFloat(document.getElementById('annual-income').value) || 0;
    const familySize = parseInt(document.getElementById('family-size').value) || 1;
    const state = document.getElementById('state').value;
    const incomeGrowth = (parseFloat(document.getElementById('income-growth').value) || 0) / 100;
    const repaymentPlan = document.getElementById('repayment-plan').value;
    const pslfEligible = document.getElementById('pslf-eligible').checked;
    const extraMonthly = parseFloat(document.getElementById('extra-payment').value) || 0;
    const extraYearly = parseFloat(document.getElementById('extra-yearly').value) || 0;

    // Calculate totals
    const totalBalance = loanData.reduce((sum, l) => sum + l.balance, 0);
    const weightedRate = loanData.reduce((sum, l) => sum + l.balance * l.rate, 0) / totalBalance;

    // Separate federal and private loans
    const federalLoans = loanData.filter(l => !l.type.includes('private'));
    const privateLoans = loanData.filter(l => l.type.includes('private'));
    const federalBalance = federalLoans.reduce((sum, l) => sum + l.balance, 0);
    const privateBalance = privateLoans.reduce((sum, l) => sum + l.balance, 0);

    // Calculate poverty line
    const guidelines = POVERTY_GUIDELINES[state];
    const povertyLine = guidelines.base + (familySize - 1) * guidelines.perPerson;
    const discretionaryIncome = Math.max(0, annualIncome - (povertyLine * 1.5));

    // Calculate for selected plan
    const selectedPlanResult = calculateRepaymentPlan(
      repaymentPlan, totalBalance, weightedRate, annualIncome, discretionaryIncome,
      incomeGrowth, familySize, pslfEligible, extraMonthly, extraYearly, federalBalance
    );

    // Calculate comparison plans
    const comparisonPlans = calculateAllPlans(
      totalBalance, weightedRate, annualIncome, discretionaryIncome,
      incomeGrowth, familySize, federalBalance
    );

    // Save to URL
    saveToURL();

    // Render results
    renderResults({
      loanData,
      totalBalance,
      weightedRate,
      federalBalance,
      privateBalance,
      annualIncome,
      discretionaryIncome,
      povertyLine,
      repaymentPlan,
      selectedPlanResult,
      comparisonPlans,
      pslfEligible,
      extraMonthly,
      extraYearly
    });
  }

  function calculateRepaymentPlan(plan, balance, rate, income, discretionaryIncome, incomeGrowth, familySize, pslf, extraMonthly, extraYearly, federalBalance) {
    const monthlyRate = rate / 100 / 12;
    const planInfo = PLAN_INFO[plan];

    let result = {
      plan: plan,
      planName: planInfo.name,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
      months: 0,
      forgiveness: 0,
      schedule: []
    };

    // Standard 10-year plan
    if (plan === 'standard') {
      const term = 120;
      const payment = calculateMonthlyPayment(balance, monthlyRate, term);
      result = generateAmortization(balance, monthlyRate, payment, term, extraMonthly, extraYearly);
      result.monthlyPayment = payment + extraMonthly;
    }
    // Graduated plan
    else if (plan === 'graduated') {
      result = calculateGraduatedPlan(balance, monthlyRate, 120, extraMonthly, extraYearly);
    }
    // Extended plans
    else if (plan === 'extended-fixed') {
      const term = 300;
      const payment = calculateMonthlyPayment(balance, monthlyRate, term);
      result = generateAmortization(balance, monthlyRate, payment, term, extraMonthly, extraYearly);
      result.monthlyPayment = payment + extraMonthly;
    }
    else if (plan === 'extended-graduated') {
      result = calculateGraduatedPlan(balance, monthlyRate, 300, extraMonthly, extraYearly);
    }
    // Income-driven plans
    else if (['ibr', 'paye', 'save', 'icr'].includes(plan)) {
      result = calculateIDRPlan(plan, balance, monthlyRate, income, discretionaryIncome, incomeGrowth, pslf, extraMonthly, extraYearly);
    }

    result.plan = plan;
    result.planName = planInfo.name;

    return result;
  }

  function calculateMonthlyPayment(principal, monthlyRate, months) {
    if (monthlyRate === 0) return principal / months;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
  }

  function generateAmortization(balance, monthlyRate, payment, maxMonths, extraMonthly, extraYearly) {
    let remaining = balance;
    let totalPaid = 0;
    let totalInterest = 0;
    const schedule = [];
    let month = 0;

    while (remaining > 0.01 && month < maxMonths) {
      month++;
      const interestPayment = remaining * monthlyRate;
      let principalPayment = payment - interestPayment;
      let extra = extraMonthly;

      // Add yearly extra payment in December
      if (month % 12 === 0 && extraYearly > 0) {
        extra += extraYearly;
      }

      // Don't overpay
      if (principalPayment + extra > remaining) {
        extra = Math.max(0, remaining - principalPayment);
        principalPayment = remaining - extra;
      }

      remaining -= (principalPayment + extra);
      if (remaining < 0) remaining = 0;

      totalPaid += payment + extra;
      totalInterest += interestPayment;

      schedule.push({
        month,
        payment: payment + extra,
        principal: principalPayment + extra,
        interest: interestPayment,
        balance: remaining
      });
    }

    return {
      monthlyPayment: payment,
      totalPaid,
      totalInterest,
      months: month,
      forgiveness: 0,
      schedule
    };
  }

  function calculateGraduatedPlan(balance, monthlyRate, totalMonths, extraMonthly, extraYearly) {
    let remaining = balance;
    let totalPaid = 0;
    let totalInterest = 0;
    const schedule = [];
    let month = 0;

    // Graduated: payments increase every 24 months
    const periods = Math.ceil(totalMonths / 24);
    const interestOnlyPayment = balance * monthlyRate;
    const startPayment = Math.max(interestOnlyPayment, calculateMonthlyPayment(balance, monthlyRate, totalMonths) * 0.5);
    const growthRate = Math.pow(2, 1 / periods); // Double over the term

    while (remaining > 0.01 && month < totalMonths) {
      month++;
      const periodIndex = Math.floor((month - 1) / 24);
      let payment = startPayment * Math.pow(growthRate, periodIndex);
      payment = Math.min(payment, remaining * (1 + monthlyRate)); // Cap payment

      const interestPayment = remaining * monthlyRate;
      let principalPayment = payment - interestPayment;
      let extra = extraMonthly;

      if (month % 12 === 0 && extraYearly > 0) {
        extra += extraYearly;
      }

      if (principalPayment + extra > remaining) {
        extra = Math.max(0, remaining - principalPayment);
        principalPayment = remaining;
      }

      remaining -= (principalPayment + extra);
      if (remaining < 0) remaining = 0;

      totalPaid += payment + extra;
      totalInterest += interestPayment;

      schedule.push({
        month,
        payment: payment + extra,
        principal: principalPayment + extra,
        interest: interestPayment,
        balance: remaining
      });
    }

    return {
      monthlyPayment: startPayment,
      totalPaid,
      totalInterest,
      months: month,
      forgiveness: 0,
      schedule
    };
  }

  function calculateIDRPlan(plan, balance, monthlyRate, income, discretionaryIncome, incomeGrowth, pslf, extraMonthly, extraYearly) {
    const planInfo = PLAN_INFO[plan];
    const pctIncome = planInfo.pctIncome;
    const forgivenessMonths = pslf ? 120 : planInfo.forgivenessYears * 12;

    let remaining = balance;
    let totalPaid = 0;
    let totalInterest = 0;
    const schedule = [];
    let month = 0;
    let currentIncome = income;
    let currentDiscretionary = discretionaryIncome;

    // Calculate 10-year standard payment cap
    const standardPayment = calculateMonthlyPayment(balance, monthlyRate, 120);

    // Calculate initial IDR payment (before any income growth)
    let initialIDRPayment = (discretionaryIncome * pctIncome) / 12;
    
    // Cap at standard payment for IBR/PAYE - this is the KEY fix
    if (['ibr', 'paye'].includes(plan)) {
      initialIDRPayment = Math.min(initialIDRPayment, standardPayment);
    }

    while (remaining > 0.01 && month < forgivenessMonths) {
      month++;

      // Recalculate income annually
      if (month > 1 && month % 12 === 1) {
        currentIncome *= (1 + incomeGrowth);
        // Recalculate discretionary income properly
        // Use the same poverty line calculation as initial
        const povertyLineAmount = (income - discretionaryIncome / 1.5) * 1.5; // Back-calculate poverty threshold
        currentDiscretionary = Math.max(0, currentIncome - povertyLineAmount);
      }

      // IDR payment calculation
      let idrPayment = (currentDiscretionary * pctIncome) / 12;

      // Cap at standard payment for IBR/PAYE
      if (['ibr', 'paye'].includes(plan)) {
        idrPayment = Math.min(idrPayment, standardPayment);
      }

      let interestPayment = remaining * monthlyRate;
      let payment = Math.max(0, idrPayment);
      let principalPayment = payment - interestPayment;
      let extra = extraMonthly;

      if (month % 12 === 0 && extraYearly > 0) {
        extra += extraYearly;
      }

      // Handle negative amortization
      if (principalPayment < 0) {
        // For SAVE plan, unpaid interest doesn't capitalize
        if (plan === 'save') {
          interestPayment = payment; // Only count what's paid
          principalPayment = 0;
        } else {
          // Other IDR plans: interest may capitalize (simplified)
          remaining += Math.abs(principalPayment) * 0.5;
          principalPayment = 0;
        }
      }

      remaining -= (principalPayment + extra);
      if (remaining < 0) remaining = 0;

      totalPaid += payment + extra;
      totalInterest += interestPayment;

      schedule.push({
        month,
        payment: payment + extra,
        principal: principalPayment + extra,
        interest: interestPayment,
        balance: remaining
      });

      if (remaining <= 0) break;
    }

    const forgiveness = remaining;

    return {
      monthlyPayment: initialIDRPayment, // Now correctly returns the capped payment
      totalPaid,
      totalInterest,
      months: month,
      forgiveness,
      schedule,
      forgivenessMonths
    };
  }

  function calculateAllPlans(balance, rate, income, discretionaryIncome, incomeGrowth, familySize, federalBalance) {
    const plans = ['standard', 'graduated', 'ibr', 'paye', 'save'];
    const results = [];

    plans.forEach(plan => {
      try {
        const result = calculateRepaymentPlan(
          plan, balance, rate, income, discretionaryIncome,
          incomeGrowth, familySize, false, 0, 0, federalBalance
        );
        results.push({
          plan,
          name: PLAN_INFO[plan].name,
          monthlyPayment: result.monthlyPayment,
          totalPaid: result.totalPaid,
          totalInterest: result.totalInterest,
          months: result.months,
          forgiveness: result.forgiveness
        });
      } catch (e) {
        console.error(`Error calculating ${plan}:`, e);
      }
    });

    return results;
  }

  function renderResults(data) {
    const {
      loanData,
      totalBalance,
      weightedRate,
      federalBalance,
      privateBalance,
      annualIncome,
      discretionaryIncome,
      repaymentPlan,
      selectedPlanResult,
      comparisonPlans,
      pslfEligible,
      extraMonthly,
      extraYearly
    } = data;

    const hasExtras = extraMonthly > 0 || extraYearly > 0;
    const planInfo = PLAN_INFO[repaymentPlan];
    const isIDR = ['ibr', 'paye', 'save', 'icr'].includes(repaymentPlan);
    const payoffYears = (selectedPlanResult.months / 12).toFixed(1);

    // Determine status
    let statusClass = 'status-info';
    if (selectedPlanResult.forgiveness > 0) {
      statusClass = 'status-warning';
    } else if (selectedPlanResult.months <= 120) {
      statusClass = 'status-good';
    }

    const html = `
      <div class="result-header-actions">
        <h3>🎓 Your Student Loan Repayment Plan</h3>
        <div class="result-actions">
          <button type="button" id="print-results" class="btn-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9V2h12v7"/>
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
          <button type="button" id="export-csv" class="btn-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <!-- Monthly Payment Hero -->
      <div class="result-hero ${statusClass}">
        <div class="payment-label">${planInfo.name}</div>
        <div class="monthly-payment-display">${formatCurrency(selectedPlanResult.monthlyPayment)}/mo</div>
        <div class="payment-sublabel">
          ${isIDR ? 'Initial payment (may change with income)' : 'Fixed monthly payment'}
          ${hasExtras ? ` + ${formatCurrency(extraMonthly)} extra` : ''}
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-card-icon">💰</div>
          <div class="summary-card-value">${formatCurrency(totalBalance)}</div>
          <div class="summary-card-label">Total Balance</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📊</div>
          <div class="summary-card-value">${weightedRate.toFixed(2)}%</div>
          <div class="summary-card-label">Weighted Avg Rate</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">💵</div>
          <div class="summary-card-value">${formatCurrency(selectedPlanResult.totalPaid)}</div>
          <div class="summary-card-label">Total to Pay</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📈</div>
          <div class="summary-card-value">${formatCurrency(selectedPlanResult.totalInterest)}</div>
          <div class="summary-card-label">Total Interest</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📅</div>
          <div class="summary-card-value">${payoffYears} years</div>
          <div class="summary-card-label">Time to Payoff</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">${selectedPlanResult.forgiveness > 0 ? '🎁' : '✅'}</div>
          <div class="summary-card-value">${selectedPlanResult.forgiveness > 0 ? formatCurrency(selectedPlanResult.forgiveness) : 'N/A'}</div>
          <div class="summary-card-label">Est. Forgiveness</div>
        </div>
      </div>

      ${selectedPlanResult.forgiveness > 0 ? `
        <!-- Forgiveness Section -->
        <div class="forgiveness-section">
          <h4>🎁 Loan Forgiveness Estimate</h4>
          <div class="forgiveness-amount">${formatCurrency(selectedPlanResult.forgiveness)} Forgiven</div>
          <div class="forgiveness-note">
            ${pslfEligible ? 
              `<strong>PSLF:</strong> After 120 qualifying payments (10 years) working for government/non-profit, remaining balance forgiven tax-free.` :
              `<strong>IDR Forgiveness:</strong> After ${PLAN_INFO[repaymentPlan].forgivenessYears} years of payments, remaining balance forgiven. 
               Note: This forgiveness may be taxable as income.`
            }
          </div>
        </div>
      ` : ''}

      <!-- Balance Payoff Chart -->
      <div class="payoff-chart">
        <h4>📉 Balance Over Time</h4>
        <div class="balance-chart">
          ${generateBalanceChart(selectedPlanResult.schedule)}
        </div>
        <div class="chart-labels">
          <span>Year 1</span>
          <span>Year ${Math.ceil(selectedPlanResult.months / 12)}</span>
        </div>
      </div>

      <!-- Plan Comparison -->
      <div class="plan-comparison-section">
        <h4>📋 Compare Repayment Plans</h4>
        <div class="schedule-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Monthly Payment</th>
                <th>Total Paid</th>
                <th>Total Interest</th>
                <th>Time</th>
                <th>Forgiveness</th>
              </tr>
            </thead>
            <tbody>
              ${comparisonPlans.map(p => `
                <tr class="${p.plan === repaymentPlan ? 'current-plan' : ''}">
                  <td>${p.name} ${p.plan === repaymentPlan ? '<span class="badge" style="background: var(--color-accent-orange); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Selected</span>' : ''}</td>
                  <td>${formatCurrency(p.monthlyPayment)}</td>
                  <td>${formatCurrency(p.totalPaid)}</td>
                  <td class="${p.totalInterest === Math.min(...comparisonPlans.map(x => x.totalInterest)) ? 'best-value' : ''}">${formatCurrency(p.totalInterest)}</td>
                  <td>${(p.months / 12).toFixed(1)} yrs</td>
                  <td>${p.forgiveness > 0 ? formatCurrency(p.forgiveness) : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Individual Loan Breakdown -->
      ${loanData.length > 1 ? `
        <div class="loan-breakdown-section">
          <h4>📝 Individual Loan Details</h4>
          <div class="loan-breakdown-grid">
            ${loanData.map(loan => `
              <div class="loan-breakdown-card">
                <h5>${loan.name || 'Student Loan'}</h5>
                <div class="loan-breakdown-item">
                  <span>Type:</span>
                  <span>${LOAN_TYPES.find(t => t.value === loan.type)?.label || loan.type}</span>
                </div>
                <div class="loan-breakdown-item">
                  <span>Balance:</span>
                  <span>${formatCurrency(loan.balance)}</span>
                </div>
                <div class="loan-breakdown-item">
                  <span>Interest Rate:</span>
                  <span>${loan.rate}%</span>
                </div>
                <div class="loan-breakdown-item">
                  <span>% of Total:</span>
                  <span>${((loan.balance / totalBalance) * 100).toFixed(1)}%</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Insights -->
      <div class="insights-section">
        <h4>💡 Personalized Insights</h4>
        <div class="insights-grid">
          ${generateInsights(data)}
        </div>
      </div>

      <!-- Amortization Schedule -->
      <div class="schedule-section">
        <h4>📅 Payment Schedule</h4>
        <div class="schedule-controls">
          <button type="button" id="toggle-schedule" class="btn btn-secondary">Show Full Schedule</button>
        </div>
        <div class="schedule-table-container">
          <table class="amortization-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody id="schedule-body">
              ${generateScheduleRows(selectedPlanResult.schedule, false)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');

    // Attach event listeners
    document.getElementById('print-results')?.addEventListener('click', () => window.print());
    document.getElementById('export-csv')?.addEventListener('click', () => exportToCSV(selectedPlanResult));

    const toggleBtn = document.getElementById('toggle-schedule');
    let showFull = false;
    toggleBtn?.addEventListener('click', () => {
      showFull = !showFull;
      document.getElementById('schedule-body').innerHTML = generateScheduleRows(selectedPlanResult.schedule, showFull);
      toggleBtn.textContent = showFull ? 'Show First Year' : 'Show Full Schedule';
    });
  }

  function generateBalanceChart(schedule) {
    if (!schedule || schedule.length === 0) return '';

    // Sample every N months for display
    const maxBars = 30;
    const step = Math.max(1, Math.floor(schedule.length / maxBars));
    const samples = schedule.filter((_, i) => i % step === 0 || i === schedule.length - 1);
    const maxBalance = schedule[0]?.balance || 1;

    return samples.map((s, i) => {
      const height = Math.max(2, (s.balance / maxBalance) * 100);
      return `
        <div class="chart-bar" style="height: ${height}%">
          <div class="chart-bar-tooltip">
            Month ${s.month}: ${formatCurrency(s.balance)}
          </div>
        </div>
      `;
    }).join('');
  }

  function generateScheduleRows(schedule, showFull) {
    const rows = showFull ? schedule : schedule.slice(0, 12);

    return rows.map((s, i) => {
      const isYearEnd = s.month % 12 === 0;
      return `
        <tr class="${isYearEnd ? 'year-row' : ''}">
          <td>${s.month}</td>
          <td>${formatCurrency(s.payment)}</td>
          <td>${formatCurrency(s.principal)}</td>
          <td>${formatCurrency(s.interest)}</td>
          <td>${formatCurrency(s.balance)}</td>
        </tr>
      `;
    }).join('');
  }

  function generateInsights(data) {
    const { totalBalance, weightedRate, selectedPlanResult, annualIncome, discretionaryIncome, repaymentPlan, pslfEligible, federalBalance, privateBalance, extraMonthly } = data;
    const insights = [];

    // Debt-to-income ratio
    const dti = totalBalance / annualIncome;
    if (dti > 2) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'High Debt-to-Income Ratio',
        text: `Your student debt is ${dti.toFixed(1)}x your annual income. Income-driven plans may provide relief.`
      });
    } else if (dti < 0.5) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Manageable Debt Level',
        text: `Your debt-to-income ratio of ${dti.toFixed(1)}x is very manageable. Consider aggressive payoff!`
      });
    }

    // Interest rate insight
    if (weightedRate > 6) {
      insights.push({
        type: 'tip',
        icon: '💡',
        title: 'Consider Refinancing',
        text: `Your average rate of ${weightedRate.toFixed(2)}% is relatively high. Refinancing could save money, but you'd lose federal benefits.`
      });
    }

    // PSLF opportunity
    if (pslfEligible && federalBalance > 20000) {
      insights.push({
        type: 'success',
        icon: '🏛️',
        title: 'PSLF Could Save Big',
        text: `With PSLF eligibility, you could have ${formatCurrency(selectedPlanResult.forgiveness)} forgiven tax-free after 10 years.`
      });
    }

    // Private loan warning
    if (privateBalance > 0) {
      insights.push({
        type: 'warning',
        icon: '🏦',
        title: 'Private Loans Excluded',
        text: `${formatCurrency(privateBalance)} in private loans aren't eligible for federal repayment plans or forgiveness.`
      });
    }

    // Extra payment impact
    if (extraMonthly > 0) {
      const standardResult = calculateRepaymentPlan('standard', totalBalance, weightedRate, annualIncome, discretionaryIncome, 0, 1, false, 0, 0, federalBalance);
      const monthsSaved = standardResult.months - selectedPlanResult.months;
      if (monthsSaved > 0) {
        insights.push({
          type: 'success',
          icon: '🚀',
          title: 'Extra Payments Working!',
          text: `Your extra ${formatCurrency(extraMonthly)}/month saves ${monthsSaved} months and reduces interest paid.`
        });
      }
    } else {
      insights.push({
        type: 'tip',
        icon: '💸',
        title: 'Consider Extra Payments',
        text: `Even $50-100 extra per month can save thousands in interest and years off your loan.`
      });
    }

    // Tax deduction
    const estimatedDeduction = Math.min(2500, selectedPlanResult.totalInterest / (selectedPlanResult.months / 12));
    insights.push({
      type: 'info',
      icon: '📋',
      title: 'Student Loan Interest Deduction',
      text: `You may deduct up to $2,500 in student loan interest annually. Estimated first-year deduction: ~${formatCurrency(estimatedDeduction)}.`
    });

    return insights.map(i => `
      <div class="insight-card insight-${i.type}">
        <div class="insight-icon">${i.icon}</div>
        <div class="insight-content">
          <h5>${i.title}</h5>
          <p>${i.text}</p>
        </div>
      </div>
    `).join('');
  }

  function exportToCSV(result) {
    let csv = 'Month,Payment,Principal,Interest,Balance\n';

    result.schedule.forEach(s => {
      csv += `${s.month},${s.payment.toFixed(2)},${s.principal.toFixed(2)},${s.interest.toFixed(2)},${s.balance.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-loan-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function saveToURL() {
    const params = new URLSearchParams();

    // Save loans
    const loanData = loans.map(loan => ({
      id: loan.id,
      name: document.querySelector(`#${loan.id}-name`)?.value || '',
      type: document.querySelector(`#${loan.id}-type`)?.value || 'federal-unsubsidized',
      balance: document.querySelector(`#${loan.id}-balance`)?.value || '',
      rate: document.querySelector(`#${loan.id}-rate`)?.value || ''
    })).filter(l => l.balance || l.name);

    if (loanData.length > 0) {
      params.set('loans', JSON.stringify(loanData));
    }

    // Save other fields
    const fields = [
      { id: 'annual-income', param: 'income' },
      { id: 'family-size', param: 'family' },
      { id: 'state', param: 'state' },
      { id: 'income-growth', param: 'growth' },
      { id: 'repayment-plan', param: 'plan' },
      { id: 'extra-payment', param: 'extra' },
      { id: 'extra-yearly', param: 'extraYearly' }
    ];

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      if (el && el.value) {
        params.set(f.param, el.value);
      }
    });

    // Save PSLF checkbox
    const pslf = document.getElementById('pslf-eligible');
    if (pslf?.checked) {
      params.set('pslf', 'true');
    }

    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load loans
    if (params.has('loans')) {
      try {
        const loanData = JSON.parse(params.get('loans'));
        loanData.forEach(data => addLoan(data));
      } catch (e) {
        console.error('Error loading loans:', e);
      }
    }

    // Load other fields
    const fields = [
      { id: 'annual-income', param: 'income' },
      { id: 'family-size', param: 'family' },
      { id: 'state', param: 'state' },
      { id: 'income-growth', param: 'growth' },
      { id: 'repayment-plan', param: 'plan' },
      { id: 'extra-payment', param: 'extra' },
      { id: 'extra-yearly', param: 'extraYearly' }
    ];

    fields.forEach(f => {
      if (params.has(f.param)) {
        const el = document.getElementById(f.id);
        if (el) el.value = params.get(f.param);
      }
    });

    // Load PSLF checkbox
    if (params.has('pslf')) {
      const pslf = document.getElementById('pslf-eligible');
      if (pslf) pslf.checked = params.get('pslf') === 'true';
    }

    // Auto-calculate if data loaded
    if (params.toString()) {
      setTimeout(() => {
        updateSummary();
        updatePlanDescription();
      }, 100);
    }
  }

  function clearForm() {
    if (!confirm('Clear all loans and settings? This cannot be undone.')) return;

    loans = [];
    loanCounter = 0;
    loansContainer.innerHTML = '';

    // Reset form fields
    document.getElementById('annual-income').value = '55000';
    document.getElementById('family-size').value = '1';
    document.getElementById('state').value = 'continental';
    document.getElementById('income-growth').value = '3';
    document.getElementById('repayment-plan').value = 'standard';
    document.getElementById('pslf-eligible').checked = false;
    document.getElementById('extra-payment').value = '0';
    document.getElementById('extra-yearly').value = '0';

    addLoan();
    updateSummary();
    updatePlanDescription();
    resultDiv.classList.add('hidden');
    window.history.replaceState({}, '', window.location.pathname);
  }

  async function shareCalculation() {
    const url = window.location.href;

    const shareData = {
      title: 'Student Loan Calculator',
      text: 'Check out my student loan repayment plan',
      url: url
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        showNotification('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        fallbackCopyToClipboard(url);
      }
    }
  }

  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      showNotification('Link copied to clipboard!');
    } catch (err) {
      alert('Unable to copy link. Please copy the URL manually.');
    }

    document.body.removeChild(textArea);
  }

  function showNotification(message) {
    const existing = document.querySelector('.copy-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-success, #4CAF50);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  function showError(message) {
    resultDiv.innerHTML = `
      <div class="alert alert-error" style="background: #FFEBEE; border: 1px solid #EF5350; padding: 1rem; border-radius: 8px; color: #C62828;">
        <strong>Error:</strong> ${message}
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
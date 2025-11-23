// Retirement Planning Calculator with URL State Management
// Combines compound interest growth with retirement income planning
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    // Investment Phase
    currentAge: 35,
    retirementAge: 65,
    principal: 10000,
    monthlyContribution: 500,
    interestRate: 7,
    compoundFrequency: 12,
    
    // Retirement Phase
    withdrawalStrategy: 'inflation-adjusted',
    withdrawalRate: 4,
    additionalIncome: 1500,
    retirementReturnRate: 5,
    inflationRate: 3,
    lifeExpectancy: 90
  };

  // State
  let state = {
    lastCalculationResults: null,
    withdrawalUnit: '%'
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updateWithdrawalStrategy();
  });

  function initializeForm() {
    // Set default values
    setValue('current-age', DEFAULT_VALUES.currentAge);
    setValue('retirement-age', DEFAULT_VALUES.retirementAge);
    setValue('principal', DEFAULT_VALUES.principal);
    setValue('monthly-contribution', DEFAULT_VALUES.monthlyContribution);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('compound-frequency', DEFAULT_VALUES.compoundFrequency);
    setValue('withdrawal-strategy', DEFAULT_VALUES.withdrawalStrategy);
    setValue('withdrawal-rate', DEFAULT_VALUES.withdrawalRate);
    setValue('additional-income', DEFAULT_VALUES.additionalIncome);
    setValue('retirement-return-rate', DEFAULT_VALUES.retirementReturnRate);
    setValue('inflation-rate', DEFAULT_VALUES.inflationRate);
    setValue('life-expectancy', DEFAULT_VALUES.lifeExpectancy);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      { id: 'current-age', param: 'current_age' },
      { id: 'retirement-age', param: 'retirement_age' },
      { id: 'principal', param: 'principal' },
      { id: 'monthly-contribution', param: 'monthly_contribution' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'compound-frequency', param: 'compound_frequency' },
      { id: 'withdrawal-rate', param: 'withdrawal_rate' },
      { id: 'additional-income', param: 'additional_income' },
      { id: 'retirement-return-rate', param: 'retirement_return_rate' },
      { id: 'inflation-rate', param: 'inflation_rate' },
      { id: 'life-expectancy', param: 'life_expectancy' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });
    
    // Load withdrawal strategy
    if (params.has('withdrawal_strategy')) {
      const strategy = params.get('withdrawal_strategy');
      const strategySelect = document.getElementById('withdrawal-strategy');
      if (strategySelect) {
        strategySelect.value = strategy;
        updateWithdrawalStrategy();
      }
    }
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        calculateResults();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save all values
    params.set('current_age', getValue('current-age'));
    params.set('retirement_age', getValue('retirement-age'));
    params.set('principal', getValue('principal'));
    params.set('monthly_contribution', getValue('monthly-contribution'));
    params.set('interest_rate', getValue('interest-rate'));
    params.set('compound_frequency', getValue('compound-frequency'));
    params.set('withdrawal_strategy', document.getElementById('withdrawal-strategy').value);
    params.set('withdrawal_rate', getValue('withdrawal-rate'));
    params.set('retirement_return_rate', getValue('retirement-return-rate'));
    params.set('inflation_rate', getValue('inflation-rate'));
    params.set('life_expectancy', getValue('life-expectancy'));
    
    // Save additional income if not zero
    const additionalIncome = getValue('additional-income');
    if (additionalIncome > 0) {
      params.set('additional_income', additionalIncome);
    }
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector(".calculator-result")?.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }

    // Withdrawal strategy change
    const strategySelect = document.getElementById('withdrawal-strategy');
    if (strategySelect) {
      strategySelect.addEventListener('change', function() {
        updateWithdrawalStrategy();
        saveToURL();
      });
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Calculate on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
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
  }

  function updateWithdrawalStrategy() {
    const strategy = document.getElementById('withdrawal-strategy').value;
    const withdrawalInput = document.getElementById('withdrawal-rate');
    const withdrawalUnit = document.getElementById('withdrawal-unit');
    const withdrawalHelp = document.getElementById('withdrawal-help');
    
    if (!withdrawalInput || !withdrawalUnit || !withdrawalHelp) return;
    
    switch(strategy) {
      case 'percentage':
        state.withdrawalUnit = '%';
        withdrawalUnit.textContent = '%';
        withdrawalHelp.textContent = 'Percentage of balance withdrawn annually';
        withdrawalInput.placeholder = '4';
        withdrawalInput.max = '20';
        withdrawalInput.step = '0.1';
        if (getValue('withdrawal-rate') > 20) {
          withdrawalInput.value = '4';
        }
        break;
      case 'inflation-adjusted':
        state.withdrawalUnit = '%';
        withdrawalUnit.textContent = '%';
        withdrawalHelp.textContent = 'Initial withdrawal rate (4% rule)';
        withdrawalInput.placeholder = '4';
        withdrawalInput.max = '10';
        withdrawalInput.step = '0.1';
        if (getValue('withdrawal-rate') > 10) {
          withdrawalInput.value = '4';
        }
        break;
      default: // fixed-dollar
        state.withdrawalUnit = '$';
        withdrawalUnit.textContent = '$/year';
        withdrawalHelp.textContent = 'Fixed amount withdrawn each year';
        withdrawalInput.placeholder = '40000';
        withdrawalInput.max = '';
        withdrawalInput.step = '1000';
        if (getValue('withdrawal-rate') < 100) {
          withdrawalInput.value = '40000';
        }
        break;
    }
  }

  function calculateResults() {
    // Get input values
    const currentAge = getValue('current-age');
    const retirementAge = getValue('retirement-age');
    const principal = getValue('principal');
    const monthlyContribution = getValue('monthly-contribution');
    const annualRate = getValue('interest-rate');
    const compoundFrequency = getValue('compound-frequency');
    const withdrawalStrategy = document.getElementById('withdrawal-strategy').value;
    const withdrawalRate = getValue('withdrawal-rate');
    const additionalIncome = getValue('additional-income');
    const retirementReturnRate = getValue('retirement-return-rate');
    const inflationRate = getValue('inflation-rate');
    const lifeExpectancy = getValue('life-expectancy');
    
    // Calculate years until retirement and retirement duration
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;
    
    // Validate inputs
    if (!validateInputs(currentAge, retirementAge, lifeExpectancy, principal, annualRate, withdrawalRate, retirementReturnRate, inflationRate)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // PHASE 1: Calculate compound interest growth until retirement
    const accumulationPhase = calculateAccumulationPhase(
      principal,
      monthlyContribution,
      annualRate / 100,
      yearsToRetirement,
      compoundFrequency
    );
    
    // PHASE 2: Calculate retirement income projections
    const retirementBalance = accumulationPhase.futureValue;
    const retirementPhase = calculateRetirementPhase(
      retirementBalance,
      withdrawalStrategy,
      withdrawalRate,
      additionalIncome,
      retirementReturnRate / 100,
      inflationRate / 100,
      retirementYears
    );
    
    // Analyze combined results
    const analysis = analyzeResults(
      accumulationPhase,
      retirementPhase,
      currentAge,
      retirementAge,
      lifeExpectancy,
      monthlyContribution,
      additionalIncome
    );
    
    // Store results
    state.lastCalculationResults = {
      inputs: {
        currentAge,
        retirementAge,
        lifeExpectancy,
        principal,
        monthlyContribution,
        annualRate,
        compoundFrequency,
        withdrawalStrategy,
        withdrawalRate,
        additionalIncome,
        retirementReturnRate,
        inflationRate
      },
      accumulationPhase,
      retirementPhase,
      analysis
    };
    
    // Display results
    displayResults(state.lastCalculationResults);
  }

  function calculateAccumulationPhase(principal, monthlyContribution, rate, years, compoundFrequency) {
    // Calculate future value of principal
    const futureValuePrincipal = principal * Math.pow((1 + rate/compoundFrequency), compoundFrequency * years);
    
    // Calculate future value of regular contributions
    let futureValueContributions = 0;
    if (monthlyContribution > 0) {
      const periodicContribution = monthlyContribution * 12;
      
      if (rate > 0) {
        futureValueContributions = (monthlyContribution * 
          ((Math.pow((1 + rate/compoundFrequency), compoundFrequency * years) - 1) / 
           (Math.pow((1 + rate/compoundFrequency), compoundFrequency/12) - 1)));
      } else {
        futureValueContributions = monthlyContribution * 12 * years;
      }
    }
    
    // Total future value
    const futureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * 12 * years);
    const totalInterest = futureValue - totalContributions;
    
    // Generate year-by-year breakdown
    const yearlyData = generateAccumulationBreakdown(
      principal, monthlyContribution, rate, years, compoundFrequency
    );
    
    return {
      futureValue,
      totalContributions,
      totalInterest,
      yearlyData,
      years,
      monthlyContribution
    };
  }

  function generateAccumulationBreakdown(principal, monthlyContribution, rate, years, compoundFreq) {
    const yearlyData = [];
    let currentBalance = principal;
    let totalContributed = principal;
    
    for (let year = 1; year <= years; year++) {
      // Add contributions for the year
      const yearlyContribution = monthlyContribution * 12;
      totalContributed += yearlyContribution;
      
      // Calculate compound interest for the year
      let yearStartBalance = currentBalance;
      
      // Simple approximation for yearly calculation
      currentBalance += yearlyContribution;
      const yearlyInterest = currentBalance * rate;
      currentBalance += yearlyInterest;
      
      const totalInterest = currentBalance - totalContributed;
      
      yearlyData.push({
        year,
        balance: currentBalance,
        contributions: totalContributed,
        interest: totalInterest,
        yearlyContribution,
        yearlyInterest
      });
    }
    
    return yearlyData;
  }

  function calculateRetirementPhase(retirementBalance, strategy, withdrawalInput, additionalIncome, returnRate, inflationRate, years) {
    const projection = [];
    let balance = retirementBalance;
    let annualWithdrawal = 0;
    
    // Determine initial withdrawal amount based on strategy
    if (strategy === 'fixed-dollar') {
      annualWithdrawal = withdrawalInput;
    } else {
      annualWithdrawal = retirementBalance * (withdrawalInput / 100);
    }
    
    let currentWithdrawal = annualWithdrawal;
    let depletionYear = null;
    
    for (let year = 1; year <= years; year++) {
      // Calculate this year's withdrawal based on strategy
      if (strategy === 'percentage') {
        currentWithdrawal = balance * (withdrawalInput / 100);
      } else if (strategy === 'inflation-adjusted' && year > 1) {
        currentWithdrawal *= (1 + inflationRate);
      }
      
      // Calculate returns on remaining balance
      const returns = balance * returnRate;
      
      // Calculate total income for the year
      const totalIncome = currentWithdrawal + additionalIncome;
      
      // Calculate inflation impact
      const inflationFactor = Math.pow(1 + inflationRate, year - 1);
      const realTotalIncome = totalIncome / inflationFactor;
      
      // Update balance
      balance += returns;
      balance -= currentWithdrawal;
      
      // Check for depletion
      if (balance <= 0 && !depletionYear) {
        depletionYear = year;
        balance = 0;
        currentWithdrawal = 0;
      }
      
      projection.push({
        year,
        balance: Math.max(0, balance),
        withdrawal: currentWithdrawal,
        additionalIncome,
        totalIncome,
        realTotalIncome,
        inflationFactor,
        returns
      });
      
      if (balance <= 0) {
        break;
      }
    }
    
    return {
      projection,
      depletionYear,
      initialWithdrawal: annualWithdrawal,
      finalBalance: balance
    };
  }

  function analyzeResults(accumulationPhase, retirementPhase, currentAge, retirementAge, lifeExpectancy, monthlyContribution, additionalIncome) {
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;
    
    // Calculate key metrics
    const totalLifetimeContributions = accumulationPhase.totalContributions;
    const totalRetirementIncome = retirementPhase.projection.reduce((sum, year) => sum + year.totalIncome, 0);
    const averageAnnualRetirementIncome = totalRetirementIncome / retirementPhase.projection.length;
    
    // Calculate withdrawal rate as percentage of retirement balance
    const effectiveWithdrawalRate = (retirementPhase.initialWithdrawal / accumulationPhase.futureValue) * 100;
    
    // Determine retirement readiness
    let readinessScore = 0;
    let readinessStatus = '';
    let readinessMessage = '';
    
    if (retirementPhase.depletionYear) {
      readinessScore = (retirementPhase.depletionYear / retirementYears) * 100;
      if (readinessScore < 50) {
        readinessStatus = 'critical';
        readinessMessage = `Money runs out ${retirementYears - retirementPhase.depletionYear} years before life expectancy.`;
      } else if (readinessScore < 80) {
        readinessStatus = 'warning';
        readinessMessage = `Money may run out ${retirementYears - retirementPhase.depletionYear} years early.`;
      } else {
        readinessStatus = 'moderate';
        readinessMessage = `Money lasts until age ${retirementAge + retirementPhase.depletionYear}.`;
      }
    } else {
      readinessScore = 100;
      readinessStatus = 'excellent';
      readinessMessage = `Retirement fully funded with ${formatCurrency(retirementPhase.finalBalance)} remaining!`;
    }
    
    // Calculate monthly retirement income equivalent
    const monthlyRetirementIncome = averageAnnualRetirementIncome / 12;
    const replacementRatio = (monthlyRetirementIncome / monthlyContribution) * 100;
    
    return {
      readinessScore,
      readinessStatus,
      readinessMessage,
      effectiveWithdrawalRate,
      totalLifetimeContributions,
      totalRetirementIncome,
      averageAnnualRetirementIncome,
      monthlyRetirementIncome,
      replacementRatio,
      yearsToRetirement,
      retirementYears,
      retirementBalance: accumulationPhase.futureValue,
      finalBalance: retirementPhase.finalBalance,
      depletionYear: retirementPhase.depletionYear
    };
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('retirement-result');
    if (!resultDiv) return;
    
    const { inputs, accumulationPhase, retirementPhase, analysis } = results;
    
    resultDiv.innerHTML = `
      <div class="results-header">
        <h3>📊 Your Complete Retirement Plan</h3>
      </div>
      
      <div class="retirement-readiness-score ${analysis.readinessStatus}">
        <div class="readiness-icon">${getReadinessIcon(analysis.readinessStatus)}</div>
        <div class="readiness-content">
          <h4>Retirement Readiness: ${getReadinessLabel(analysis.readinessStatus)}</h4>
          <p>${analysis.readinessMessage}</p>
          ${analysis.readinessScore < 100 ? `
            <div class="readiness-bar">
              <div class="readiness-progress" style="width: ${analysis.readinessScore}%"></div>
            </div>
          ` : ''}
        </div>
      </div>
      <div class="result-summary">
        <div class="result-card ${analysis.depletionYear ? 'result-card-warning' : 'result-card-success'}">
          <div class="card-icon">⏱️</div>
          <h4>Money Lasts</h4>
          <div class="result-amount">${analysis.depletionYear ? analysis.depletionYear + ' years' : analysis.retirementYears + '+ years'}</div>
          <div class="result-detail">
            <small>${analysis.depletionYear ? 'Depletes at age ' + (inputs.retirementAge + analysis.depletionYear) : 'Covers full retirement'}</small>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💵</div>
          <h4>Annual Income</h4>
          <div class="result-amount">${formatCurrency(retirementPhase.initialWithdrawal + inputs.additionalIncome * 12)}</div>
          <div class="result-detail">
            <small>First year total income</small>
            <div class="mini-breakdown">
              <span>${formatCurrency(retirementPhase.initialWithdrawal)} from savings</span>
              ${inputs.additionalIncome > 0 ? `<span>${formatCurrency(inputs.additionalIncome * 12)} additional</span>` : ''}
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💰</div>
          <h4>Final Balance</h4>
          <div class="result-amount">${formatCurrency(analysis.finalBalance)}</div>
          <div class="result-detail">
            <small>After ${analysis.retirementYears} years</small>
            <div class="mini-breakdown">
              <span>${((analysis.finalBalance / analysis.retirementBalance) * 100).toFixed(0)}% of starting</span>
            </div>
          </div>
        </div>
      </div>
      <div class="results-summary">
          <div class="summary-tabs">
          <div class="summary-tab active" data-tab="overview">Overview</div>
          <div class="summary-tab" data-tab="accumulation">Accumulation</div>
          <div class="summary-tab" data-tab="retirement">Retirement</div>
        </div>
        
        <div class="summary-content" id="overview-content">
          <div class="summary-grid">
            <div class="summary-stat">
              <span class="stat-label">Years to Retirement</span>
              <span class="stat-value">${analysis.yearsToRetirement}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Years in Retirement</span>
              <span class="stat-value">${analysis.retirementYears}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Total Lifetime Contributions</span>
              <span class="stat-value">${formatCurrency(analysis.totalLifetimeContributions)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Retirement Balance</span>
              <span class="stat-value highlight">${formatCurrency(analysis.retirementBalance)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Monthly Retirement Income</span>
              <span class="stat-value highlight">${formatCurrency(analysis.monthlyRetirementIncome)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Money Lasts Until</span>
              <span class="stat-value ${analysis.depletionYear ? 'text-warning' : 'text-success'}">
                ${analysis.depletionYear ? `Age ${inputs.retirementAge + analysis.depletionYear}` : 'Lifetime'}
              </span>
            </div>
          </div>
        </div>
        
        <div class="summary-content hidden" id="accumulation-content">
          <div class="summary-grid">
            <div class="summary-stat">
              <span class="stat-label">Starting Amount</span>
              <span class="stat-value">${formatCurrency(inputs.principal)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Monthly Contribution</span>
              <span class="stat-value">${formatCurrency(inputs.monthlyContribution)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Total Contributions</span>
              <span class="stat-value">${formatCurrency(accumulationPhase.totalContributions)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Interest Earned</span>
              <span class="stat-value text-success">${formatCurrency(accumulationPhase.totalInterest)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Final Balance</span>
              <span class="stat-value highlight">${formatCurrency(accumulationPhase.futureValue)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Total Return</span>
              <span class="stat-value">${((accumulationPhase.futureValue / accumulationPhase.totalContributions - 1) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div class="summary-content hidden" id="retirement-content">
          <div class="summary-grid">
            <div class="summary-stat">
              <span class="stat-label">Starting Balance</span>
              <span class="stat-value">${formatCurrency(analysis.retirementBalance)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Withdrawal Strategy</span>
              <span class="stat-value">${inputs.withdrawalStrategy.replace('-', ' ')}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Initial Withdrawal</span>
              <span class="stat-value">${formatCurrency(retirementPhase.initialWithdrawal)}</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Effective Rate</span>
              <span class="stat-value">${analysis.effectiveWithdrawalRate.toFixed(1)}%</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Additional Income</span>
              <span class="stat-value">${formatCurrency(inputs.additionalIncome * 12)}/year</span>
            </div>
            <div class="summary-stat">
              <span class="stat-label">Ending Balance</span>
              <span class="stat-value ${analysis.finalBalance > 0 ? 'text-success' : 'text-danger'}">${formatCurrency(analysis.finalBalance)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="phase-visualization">
        <h4>💹 Investment Growth Journey</h4>
        ${generateDualPhaseChart(accumulationPhase, retirementPhase, inputs.currentAge, inputs.retirementAge)}
      </div>
      
      <div class="accumulation-breakdown">
        <h4>📈 Accumulation Phase Details</h4>
        <div class="growth-visualization">
          <div class="growth-bar">
            <div class="growth-segment principal" style="width: ${(inputs.principal / accumulationPhase.futureValue) * 100}%">
              <span class="segment-label" style="top: -15px;">${formatCurrency(inputs.principal)}</span>
            </div>
            <div class="growth-segment contributions" style="width: ${((accumulationPhase.totalContributions - inputs.principal) / accumulationPhase.futureValue) * 100}%">
              <span class="segment-label">${formatCurrency(accumulationPhase.totalContributions - inputs.principal)}</span>
            </div>
            <div class="growth-segment interest" style="width: ${(accumulationPhase.totalInterest / accumulationPhase.futureValue) * 100}%">
              <span class="segment-label" style="top: 15px;">${formatCurrency(accumulationPhase.totalInterest)}</span>
            </div>
          </div>
          <div class="growth-legend">
            <div class="legend-item">
              <div class="legend-color principal"></div>
              <span>Initial Investment</span>
            </div>
            <div class="legend-item">
              <div class="legend-color contributions"></div>
              <span>Contributions</span>
            </div>
            <div class="legend-item">
              <div class="legend-color interest"></div>
              <span>Interest Earned</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="retirement-projection">
        <h4>🏖️ Retirement Income Projection</h4>
        
        <div class="projection-chart">
          ${generateRetirementBalanceChart(retirementPhase.projection)}
        </div>
        
        <button type="button" id="toggle-retirement" class="btn btn-secondary btn-sm">Show First 10 Years</button>
        <div id="retirement-table-container" class="table-container hidden">
          <table class="data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Age</th>
                <th>Balance</th>
                <th>Withdrawal</th>
                <th>Other Income</th>
                <th>Total Income</th>
                <th>Real Value</th>
              </tr>
            </thead>
            <tbody>
              ${generateRetirementRows(retirementPhase.projection, inputs.retirementAge, 10)}
            </tbody>
          </table>
        </div>
      </div>

            <div class="income-breakdown">
        <h4>💵 Retirement Income Breakdown</h4>
        <div class="income-visualization">
          <div class="income-bar">
            <div class="income-segment withdrawals" style="width: ${(retirementPhase.initialWithdrawal / (retirementPhase.initialWithdrawal + inputs.additionalIncome * 12)) * 100}%">
              <span class="segment-label" style="top: -10px;">${formatCurrency(retirementPhase.initialWithdrawal)}</span>
            </div>
            <div class="income-segment additional" style="width: ${(inputs.additionalIncome * 12 / (retirementPhase.initialWithdrawal + inputs.additionalIncome * 12)) * 100}%">
              <span class="segment-label" style="top: 10px;">${formatCurrency(inputs.additionalIncome * 12)}</span>
            </div>
          </div>
          <div class="income-legend">
            <div class="legend-item">
              <div class="legend-color withdrawals"></div>
              <span>Portfolio Withdrawals</span>
            </div>
            <div class="legend-item">
              <div class="legend-color additional"></div>
              <span>Additional Income</span>
            </div>
          </div>
        </div>
               <div class="income-stats">
          <div class="stat-card">
            <span class="stat-label">Annual Portfolio Withdrawal</span>
            <span class="stat-value">${formatCurrency(retirementPhase.initialWithdrawal)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Annual Additional Income</span>
            <span class="stat-value">${formatCurrency(inputs.additionalIncome * 12)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Annual Income (Year 1)</span>
            <span class="stat-value highlight">${formatCurrency(retirementPhase.initialWithdrawal + inputs.additionalIncome * 12)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Monthly Income (Year 1)</span>
            <span class="stat-value highlight">${formatCurrency((retirementPhase.initialWithdrawal + inputs.additionalIncome * 12) / 12)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Annual Income (Final Year)</span>
            <span class="stat-value highlight">${formatCurrency(retirementPhase.projection[retirementPhase.projection.length - 1].totalIncome)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Monthly Income (Final Year)</span>
            <span class="stat-value highlight">${formatCurrency(retirementPhase.projection[retirementPhase.projection.length - 1].totalIncome / 12)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average Annual Income</span>
            <span class="stat-value highlight">${formatCurrency(analysis.averageAnnualRetirementIncome)}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average Monthly Income</span>
            <span class="stat-value highlight">${formatCurrency(analysis.monthlyRetirementIncome)}</span>
          </div>
        </div>

            <div class="lifetime-projection">
        <h4>📅 Complete Lifetime Financial Projection</h4>
        
        <div class="projection-controls">
          <button type="button" id="toggle-projection" class="btn btn-secondary btn-sm">Show Full Projection</button>
          <button type="button" id="export-projection" class="btn btn-secondary btn-sm">Export to CSV</button>
        </div>
        
        <div id="projection-table-container" class="table-container">
          <table class="data-table projection-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Age</th>
                <th>Phase</th>
                <th>Balance</th>
                <th>Contributions</th>
                <th>Withdrawals</th>
                <th>Returns</th>
                <th>Total Income</th>
              </tr>
            </thead>
            <tbody>
              ${generateLifetimeProjectionRows(accumulationPhase, retirementPhase, inputs, 10)}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="optimization-insights">
        <h4>💡 Optimization Opportunities</h4>
        <div class="insights-grid">
          ${generateOptimizationInsights(results)}
        </div>
      </div>
      
      <div class="scenario-comparison">
        <h4>🔄 Alternative Scenarios</h4>
        ${generateScenarioComparisons(results)}
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    attachResultEventListeners(results);
  }

  function generateDualPhaseChart(accumulation, retirement, currentAge, retirementAge) {
    const totalYears = accumulation.years + retirement.projection.length;
    const maxBalance = Math.max(
      accumulation.futureValue,
      ...retirement.projection.map(y => y.balance)
    );
    
    // Create combined data points
    const accumulationPoints = accumulation.yearlyData.map(year => ({
      age: currentAge + year.year,
      balance: year.balance
    }));
    
    const retirementPoints = retirement.projection.map(year => ({
      age: retirementAge + year.year,
      balance: year.balance
    }));
    
    // Generate SVG path
    const width = 100;
    const height = 50;
    
    const scaleX = (age) => ((age - currentAge) / totalYears) * width;
    const scaleY = (balance) => height - (balance / maxBalance) * height;
    
    const accumulationPath = accumulationPoints.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${scaleX(point.age)} ${scaleY(point.balance)}`
    ).join(' ');
    
    const retirementPath = retirementPoints.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${scaleX(point.age)} ${scaleY(point.balance)}`
    ).join(' ');
    
    return `
      <svg viewBox="0 0 100 60" class="phase-chart">
        <defs>
          <linearGradient id="accumulation-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.1" />
          </linearGradient>
          <linearGradient id="retirement-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        
        <!-- Grid lines -->
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" stroke-width="0.5"/>
        <line x1="${scaleX(retirementAge)}" y1="0" x2="${scaleX(retirementAge)}" y2="60" stroke="#ef4444" stroke-width="0.5" stroke-dasharray="2,2"/>
        
        <!-- Accumulation phase -->
        <path d="${accumulationPath}" fill="none" stroke="#10b981" stroke-width="1.5"/>
        <path d="${accumulationPath} L ${scaleX(retirementAge)} 50 L 0 50 Z" fill="url(#accumulation-gradient)"/>
        
        <!-- Retirement phase -->
        <path d="${retirementPath}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="${retirementPath} L ${scaleX(retirementAge + retirement.projection.length)} 50 L ${scaleX(retirementAge)} 50 Z" fill="url(#retirement-gradient)"/>
        
        <!-- Labels -->
        <text x="${scaleX((currentAge + retirementAge) / 2)}" y="58" text-anchor="middle" class="chart-label">Accumulation</text>
        <text x="${scaleX(retirementAge + retirement.projection.length / 2)}" y="58" text-anchor="middle" class="chart-label">Retirement</text>
      </svg>
      
      <div class="chart-labels">
        <div class="chart-label-left">Age ${currentAge}</div>
        <div class="chart-label-center" style="color: #ef4444;">Retire at ${retirementAge}</div>
        <div class="chart-label-right">Age ${retirementAge + retirement.projection.length}</div>
      </div>
    `;
  }

  function generateRetirementBalanceChart(projection) {
    const maxBalance = Math.max(...projection.map(y => y.balance));
    const chartPoints = projection.map((year, i) => {
      const x = (i / (projection.length - 1)) * 100;
      const y = 50 - (year.balance / maxBalance) * 40;
      return `${x},${y}`;
    }).join(' ');
    
    return `
      <svg viewBox="0 0 100 60" class="balance-chart">
        <defs>
          <linearGradient id="balance-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
          </linearGradient>
        </defs>
        
        <polyline points="${chartPoints}" fill="none" stroke="#6366f1" stroke-width="2"/>
        <polygon points="0,50 ${chartPoints} 100,50" fill="url(#balance-gradient)"/>
        
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" stroke-width="0.5"/>
      </svg>
      
      <div class="chart-labels">
        <div class="chart-label-left">Year 1</div>
        <div class="chart-label-right">Year ${projection.length}</div>
      </div>
    `;
  }

  function generateRetirementRows(projection, startAge, count) {
    return projection.slice(0, count).map(year => {
      const age = startAge + year.year;
      const isDepletedYear = year.balance === 0 && year.year > 1;
      
      return `
        <tr class="${isDepletedYear ? 'depleted-year' : ''}">
          <td>${year.year}</td>
          <td>${age}</td>
          <td class="${year.balance === 0 ? 'text-danger' : ''}">${formatCurrency(year.balance)}</td>
          <td>${formatCurrency(year.withdrawal)}</td>
          <td>${formatCurrency(year.additionalIncome)}</td>
          <td class="font-bold">${formatCurrency(year.totalIncome)}</td>
          <td class="text-muted">${formatCurrency(year.realTotalIncome)}</td>
        </tr>
      `;
    }).join('');
  }

  function generateOptimizationInsights(results) {
    const insights = [];
    const { inputs, analysis, accumulationPhase } = results;
    
    // Contribution increase impact
    const increasedContribution = inputs.monthlyContribution * 1.25;
    const additionalSavings = (increasedContribution - inputs.monthlyContribution) * 12 * analysis.yearsToRetirement;
    const compoundedAdditional = additionalSavings * Math.pow(1 + inputs.annualRate/100, analysis.yearsToRetirement);
    
    insights.push(`
      <div class="insight-card insight-info">
        <div class="insight-icon">📈</div>
        <div class="insight-content">
          <h5>Increase Contributions</h5>
          <p>Adding just ${formatCurrency(increasedContribution - inputs.monthlyContribution)}/month could add ${formatCurrency(compoundedAdditional)} to retirement!</p>
        </div>
      </div>
    `);
    
    // Early retirement impact
    if (inputs.currentAge < 30) {
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">⏰</div>
          <div class="insight-content">
            <h5>Time Advantage</h5>
            <p>Starting at ${inputs.currentAge} gives you ${analysis.yearsToRetirement} years of compound growth - a huge advantage!</p>
          </div>
        </div>
      `);
    }
    
    // Withdrawal rate assessment
    if (analysis.effectiveWithdrawalRate > 4) {
      insights.push(`
        <div class="insight-card insight-warning">
          <div class="insight-icon">⚠️</div>
          <div class="insight-content">
            <h5>Withdrawal Rate High</h5>
            <p>Consider reducing from ${analysis.effectiveWithdrawalRate.toFixed(1)}% to 4% for better sustainability.</p>
          </div>
        </div>
      `);
    } else if (analysis.effectiveWithdrawalRate < 3) {
      insights.push(`
        <div class="insight-card insight-excellent">
          <div class="insight-icon">🛡️</div>
          <div class="insight-content">
            <h5>Conservative Strategy</h5>
            <p>Your ${analysis.effectiveWithdrawalRate.toFixed(1)}% withdrawal rate provides excellent safety margin!</p>
          </div>
        </div>
      `);
    }
    
    // Additional income benefit
    if (inputs.additionalIncome > 0) {
      const coveragePercent = (inputs.additionalIncome * 12 / (analysis.averageAnnualRetirementIncome)) * 100;
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">💪</div>
          <div class="insight-content">
            <h5>Income Diversification</h5>
            <p>Additional income covers ${coveragePercent.toFixed(0)}% of retirement needs, reducing portfolio stress.</p>
          </div>
        </div>
      `);
    }
    
    // Interest vs contributions
    if (accumulationPhase.totalInterest > accumulationPhase.totalContributions) {
      insights.push(`
        <div class="insight-card insight-excellent">
          <div class="insight-icon">🚀</div>
          <div class="insight-content">
            <h5>Compound Power</h5>
            <p>Your interest earnings exceed total contributions - compound interest at work!</p>
          </div>
        </div>
      `);
    }
    
    // Retirement duration
    if (!results.retirementPhase.depletionYear) {
      insights.push(`
        <div class="insight-card insight-excellent">
          <div class="insight-icon">🎯</div>
          <div class="insight-content">
            <h5>Legacy Planning</h5>
            <p>Plan leaves ${formatCurrency(analysis.finalBalance)} for heirs or charity!</p>
          </div>
        </div>
      `);
    }
    
    return insights.join('');
  }

  function generateScenarioComparisons(results) {
    const { inputs, accumulationPhase } = results;
    
    // Calculate alternative scenarios
    const scenarios = [
      {
        name: 'Current Plan',
        monthlyContribution: inputs.monthlyContribution,
        retirementAge: inputs.retirementAge,
        balance: accumulationPhase.futureValue,
        isCurrent: true
      },
      {
        name: 'Work 5 More Years',
        monthlyContribution: inputs.monthlyContribution,
        retirementAge: inputs.retirementAge + 5,
        balance: calculateScenarioBalance(inputs.principal, inputs.monthlyContribution, inputs.annualRate/100, inputs.retirementAge - inputs.currentAge + 5, inputs.compoundFrequency)
      },
      {
        name: '+25% Contributions',
        monthlyContribution: inputs.monthlyContribution * 1.25,
        retirementAge: inputs.retirementAge,
        balance: calculateScenarioBalance(inputs.principal, inputs.monthlyContribution * 1.25, inputs.annualRate/100, inputs.retirementAge - inputs.currentAge, inputs.compoundFrequency)
      },
      {
        name: 'Both Changes',
        monthlyContribution: inputs.monthlyContribution * 1.25,
        retirementAge: inputs.retirementAge + 5,
        balance: calculateScenarioBalance(inputs.principal, inputs.monthlyContribution * 1.25, inputs.annualRate/100, inputs.retirementAge - inputs.currentAge + 5, inputs.compoundFrequency)
      }
    ];
    
    return `
      <div class="table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Monthly Contribution</th>
              <th>Retirement Age</th>
              <th>Retirement Balance</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            ${scenarios.map(scenario => `
              <tr class="${scenario.isCurrent ? 'current-selection' : ''}">
                <td>${scenario.name} ${scenario.isCurrent ? '<span class="badge">Current</span>' : ''}</td>
                <td>${formatCurrency(scenario.monthlyContribution)}</td>
                <td>${scenario.retirementAge}</td>
                <td class="amount-positive">${formatCurrency(scenario.balance)}</td>
                <td class="${scenario.balance > accumulationPhase.futureValue ? 'text-success' : ''}">
                  ${scenario.isCurrent ? '-' : '+' + formatCurrency(scenario.balance - accumulationPhase.futureValue)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function generateLifetimeProjectionRows(accumulation, retirement, inputs, rowsToShow = null) {
  const rows = [];
  const currentAge = inputs.currentAge;
  
  // Accumulation phase rows
  accumulation.yearlyData.forEach((year, index) => {
    const age = currentAge + year.year;
    const isRetirementYear = age === inputs.retirementAge;
    
    rows.push(`
      <tr class="${isRetirementYear ? 'retirement-year' : ''}">
        <td>${year.year}</td>
        <td>${age}</td>
        <td><span class="phase-badge accumulation">Saving</span></td>
        <td class="amount-positive">${formatCurrency(year.balance)}</td>
        <td>${formatCurrency(year.yearlyContribution)}</td>
        <td>-</td>
        <td class="text-success">+${formatCurrency(year.yearlyInterest)}</td>
        <td>-</td>
      </tr>
    `);
  });
  
  // Retirement phase rows
  retirement.projection.forEach((year, index) => {
    const age = inputs.retirementAge + year.year;
    const isDepletedYear = year.balance === 0 && year.year > 1;
    
    rows.push(`
      <tr class="${isDepletedYear ? 'depleted-year' : ''}">
        <td>${accumulation.years + year.year}</td>
        <td>${age}</td>
        <td><span class="phase-badge retirement">Retired</span></td>
        <td class="${year.balance === 0 ? 'text-danger' : ''}">${formatCurrency(year.balance)}</td>
        <td>-</td>
        <td class="text-danger">-${formatCurrency(year.withdrawal)}</td>
        <td class="text-success">+${formatCurrency(year.returns)}</td>
        <td class="font-bold">${formatCurrency(year.totalIncome)}</td>
      </tr>
    `);
  });
  
  return rowsToShow ? rows.slice(0, rowsToShow).join('') : rows.join('');
}

  function calculateScenarioBalance(principal, monthlyContribution, rate, years, compoundFreq) {
    const futureValuePrincipal = principal * Math.pow((1 + rate/compoundFreq), compoundFreq * years);
    let futureValueContributions = 0;
    
    if (monthlyContribution > 0 && rate > 0) {
      futureValueContributions = monthlyContribution * 
        ((Math.pow((1 + rate/compoundFreq), compoundFreq * years) - 1) / 
         (Math.pow((1 + rate/compoundFreq), compoundFreq/12) - 1));
    } else {
      futureValueContributions = monthlyContribution * 12 * years;
    }
    
    return futureValuePrincipal + futureValueContributions;
  }

  function getReadinessIcon(status) {
    switch(status) {
      case 'excellent': return '🎯';
      case 'moderate': return '📊';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '📈';
    }
  }

  function getReadinessLabel(status) {
    switch(status) {
      case 'excellent': return 'Fully Funded';
      case 'moderate': return 'On Track';
      case 'warning': return 'Needs Attention';
      case 'critical': return 'Significant Shortfall';
      default: return 'Review Needed';
    }
  }

  function attachResultEventListeners(results) {
  // Print button
  const printBtn = document.getElementById('print-results');
  if (printBtn) {
    printBtn.addEventListener('click', printResults);
  }
  
  // Summary tabs
  const summaryTabs = document.querySelectorAll('.summary-tab');
  summaryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      summaryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Hide all content
      document.querySelectorAll('.summary-content').forEach(content => {
        content.classList.add('hidden');
      });
      
      // Show selected content
      const tabName = this.dataset.tab;
      document.getElementById(`${tabName}-content`).classList.remove('hidden');
    });
  });
  
  // Toggle full projection table
  const toggleProjection = document.getElementById('toggle-projection');
  if (toggleProjection) {
    let showingAll = false;
    toggleProjection.addEventListener('click', function() {
      const tbody = document.querySelector('.projection-table tbody');
      
      if (!showingAll) {
        tbody.innerHTML = generateLifetimeProjectionRows(
          results.accumulationPhase,
          results.retirementPhase,
          results.inputs
        );
        this.textContent = 'Show First 10 Years';
        showingAll = true;
      } else {
        tbody.innerHTML = generateLifetimeProjectionRows(
          results.accumulationPhase,
          results.retirementPhase,
          results.inputs,
          10
        );
        this.textContent = 'Show Full Projection';
        showingAll = false;
      }
    });
  }
  
  // Export projection
  const exportBtn = document.getElementById('export-projection');
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      exportProjectionToCSV(results);
    });
  }
}

  function validateInputs(currentAge, retirementAge, lifeExpectancy, principal, interestRate, withdrawalRate, returnRate, inflationRate) {
    if (currentAge < 18 || currentAge > 100) {
      showError('Please enter a valid current age (18-100)');
      return false;
    }
    if (retirementAge <= currentAge) {
      showError('Retirement age must be greater than current age');
      return false;
    }
    if (retirementAge > 100) {
      showError('Please enter a valid retirement age');
      return false;
    }
    if (lifeExpectancy <= retirementAge) {
      showError('Life expectancy must be greater than retirement age');
      return false;
    }
    if (lifeExpectancy > 120) {
      showError('Please enter a realistic life expectancy');
      return false;
    }
    if (principal < 0) {
      showError('Initial investment cannot be negative');
      return false;
    }
    if (interestRate < 0 || interestRate > 50) {
      showError('Please enter a valid growth rate (0-50%)');
      return false;
    }
    if (withdrawalRate <= 0) {
      showError('Please enter a valid withdrawal rate/amount');
      return false;
    }
    if (returnRate < 0 || returnRate > 20) {
      showError('Please enter a realistic retirement return rate (0-20%)');
      return false;
    }
    if (inflationRate < 0 || inflationRate > 10) {
      showError('Please enter a realistic inflation rate (0-10%)');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('retirement-result');
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
      navigator.share({
        title: 'Complete Retirement Planning Calculation',
        text: 'Check out my retirement planning analysis',
        url: url
      }).catch(err => {
        copyToClipboard(url);
      });
    } else {
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

  function exportProjectionToCSV(results) {
  const { accumulationPhase, retirementPhase, inputs } = results;
  let csv = 'Year,Age,Phase,Balance,Contributions,Withdrawals,Returns,Total Income\n';
  
  // Accumulation phase
  accumulationPhase.yearlyData.forEach(year => {
    const age = inputs.currentAge + year.year;
    csv += `${year.year},${age},Saving,${year.balance.toFixed(2)},${year.yearlyContribution.toFixed(2)},0,${year.yearlyInterest.toFixed(2)},0\n`;
  });
  
  // Retirement phase
  retirementPhase.projection.forEach(year => {
    const age = inputs.retirementAge + year.year;
    csv += `${accumulationPhase.years + year.year},${age},Retired,${year.balance.toFixed(2)},0,${year.withdrawal.toFixed(2)},${year.returns.toFixed(2)},${year.totalIncome.toFixed(2)}\n`;
  });
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'retirement-projection.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

})();
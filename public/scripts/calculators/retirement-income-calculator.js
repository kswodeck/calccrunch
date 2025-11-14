// Retirement Income Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    retirementSavings: 1000000,
    currentAge: 65,
    withdrawalStrategy: 'fixed-dollar',
    annualWithdrawal: 40000,
    additionalIncome: 0,
    returnRate: 7,
    inflationRate: 3,
    retirementYears: 30
  };

  // State
  let state = {
    lastCalculationResults: null,
    withdrawalUnit: '$'
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
    setValue('retirement-savings', DEFAULT_VALUES.retirementSavings);
    setValue('current-age', DEFAULT_VALUES.currentAge);
    setValue('withdrawal-strategy', DEFAULT_VALUES.withdrawalStrategy);
    setValue('annual-withdrawal', DEFAULT_VALUES.annualWithdrawal);
    setValue('additional-income', DEFAULT_VALUES.additionalIncome);
    setValue('return-rate', DEFAULT_VALUES.returnRate);
    setValue('inflation-rate', DEFAULT_VALUES.inflationRate);
    setValue('retirement-years', DEFAULT_VALUES.retirementYears);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      { id: 'retirement-savings', param: 'retirement_savings' },
      { id: 'current-age', param: 'current_age' },
      { id: 'annual-withdrawal', param: 'annual_withdrawal' },
      { id: 'additional-income', param: 'additional_income' },
      { id: 'return-rate', param: 'return_rate' },
      { id: 'inflation-rate', param: 'inflation_rate' },
      { id: 'retirement-years', param: 'retirement_years' }
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
        calculateRetirementIncome();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save all values
    params.set('retirement_savings', getValue('retirement-savings'));
    params.set('current_age', getValue('current-age'));
    params.set('withdrawal_strategy', document.getElementById('withdrawal-strategy').value);
    params.set('annual_withdrawal', getValue('annual-withdrawal'));
    params.set('return_rate', getValue('return-rate'));
    params.set('inflation_rate', getValue('inflation-rate'));
    params.set('retirement_years', getValue('retirement-years'));
    
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
      calculateBtn.addEventListener('click', calculateRetirementIncome);
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
          calculateRetirementIncome();
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
    const withdrawalInput = document.getElementById('annual-withdrawal');
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
        if (getValue('annual-withdrawal') > 20) {
          withdrawalInput.value = '4';
        }
        break;
      case 'inflation-adjusted':
        state.withdrawalUnit = '%';
        withdrawalUnit.textContent = '%';
        withdrawalHelp.textContent = 'Initial withdrawal rate (typically 4%)';
        withdrawalInput.placeholder = '4';
        withdrawalInput.max = '10';
        withdrawalInput.step = '0.1';
        if (getValue('annual-withdrawal') > 10) {
          withdrawalInput.value = '4';
        }
        break;
      default: // fixed-dollar
        state.withdrawalUnit = '$';
        withdrawalUnit.textContent = '$';
        withdrawalHelp.textContent = 'Fixed amount withdrawn each year';
        withdrawalInput.placeholder = '40000';
        withdrawalInput.max = '';
        withdrawalInput.step = '1000';
        if (getValue('annual-withdrawal') < 100) {
          withdrawalInput.value = '40000';
        }
        break;
    }
  }

  function calculateRetirementIncome() {
    // Get input values
    const retirementSavings = getValue('retirement-savings');
    const currentAge = getValue('current-age');
    const withdrawalStrategy = document.getElementById('withdrawal-strategy').value;
    const withdrawalInput = getValue('annual-withdrawal');
    const additionalIncome = getValue('additional-income');
    const returnRate = getValue('return-rate') / 100;
    const inflationRate = getValue('inflation-rate') / 100;
    const retirementYears = getValue('retirement-years');
    
    // Validate inputs
    if (!validateInputs(retirementSavings, withdrawalInput, returnRate, inflationRate, retirementYears)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // Calculate year-by-year projection
    const projection = calculateProjection(
      retirementSavings,
      withdrawalStrategy,
      withdrawalInput,
      additionalIncome,
      returnRate,
      inflationRate,
      retirementYears
    );
    
    // Analyze results
    const analysis = analyzeProjection(projection, retirementSavings, retirementYears);
    
    // Store results
    state.lastCalculationResults = {
      retirementSavings,
      currentAge,
      withdrawalStrategy,
      withdrawalInput,
      additionalIncome,
      returnRate: returnRate * 100,
      inflationRate: inflationRate * 100,
      retirementYears,
      projection,
      analysis
    };
    
    // Display results
    displayResults(state.lastCalculationResults);
  }

  function calculateProjection(startingBalance, strategy, withdrawalInput, additionalIncome, returnRate, inflationRate, years) {
    const projection = [];
    let balance = startingBalance;
    let annualWithdrawal;
    
    // Set initial withdrawal based on strategy
    if (strategy === 'percentage') {
      annualWithdrawal = startingBalance * (withdrawalInput / 100);
    } else if (strategy === 'inflation-adjusted') {
      annualWithdrawal = startingBalance * (withdrawalInput / 100);
    } else {
      annualWithdrawal = withdrawalInput;
    }
    
    let cumulativeInflation = 1;
    let totalWithdrawn = 0;
    let totalAdditionalIncome = 0;
    let lastPositiveYear = 0;
    
    for (let year = 1; year <= years; year++) {
      // Calculate this year's withdrawal
      let thisYearWithdrawal;
      if (strategy === 'percentage') {
        thisYearWithdrawal = balance * (withdrawalInput / 100);
      } else if (strategy === 'inflation-adjusted') {
        thisYearWithdrawal = annualWithdrawal * cumulativeInflation;
      } else {
        thisYearWithdrawal = annualWithdrawal;
      }
      
      // Don't withdraw more than available
      thisYearWithdrawal = Math.min(thisYearWithdrawal, balance);
      
      // Calculate additional income (adjusted for inflation)
      const thisYearAdditionalIncome = additionalIncome * cumulativeInflation;
      
      // Calculate total income
      const totalIncome = thisYearWithdrawal + thisYearAdditionalIncome;
      
      // Update balance
      balance -= thisYearWithdrawal;
      
      // Apply investment return
      if (balance > 0) {
        balance *= (1 + returnRate);
        lastPositiveYear = year;
      }
      
      // Update cumulative values
      totalWithdrawn += thisYearWithdrawal;
      totalAdditionalIncome += thisYearAdditionalIncome;
      cumulativeInflation *= (1 + inflationRate);
      
      // Calculate purchasing power
      const realWithdrawal = thisYearWithdrawal / cumulativeInflation;
      const realTotalIncome = totalIncome / cumulativeInflation;
      
      projection.push({
        year,
        balance: Math.max(0, balance),
        withdrawal: thisYearWithdrawal,
        additionalIncome: thisYearAdditionalIncome,
        totalIncome,
        realWithdrawal,
        realTotalIncome,
        inflationFactor: cumulativeInflation,
        totalWithdrawn,
        totalAdditionalIncome
      });
      
      // Stop if balance depleted
      if (balance <= 0) break;
    }
    
    return projection;
  }

  function analyzeProjection(projection, startingBalance, plannedYears) {
    const lastYear = projection[projection.length - 1];
    const moneyLastsYears = lastYear.balance > 0 ? plannedYears : projection.findIndex(p => p.balance === 0) + 1;
    const finalBalance = lastYear.balance;
    const totalWithdrawn = lastYear.totalWithdrawn;
    const totalAdditionalIncome = lastYear.totalAdditionalIncome;
    
    // Calculate average withdrawal and income
    const avgWithdrawal = totalWithdrawn / projection.length;
    const avgTotalIncome = (totalWithdrawn + totalAdditionalIncome) / projection.length;
    
    // Calculate real (inflation-adjusted) averages
    const avgRealWithdrawal = projection.reduce((sum, p) => sum + p.realWithdrawal, 0) / projection.length;
    const avgRealIncome = projection.reduce((sum, p) => sum + p.realTotalIncome, 0) / projection.length;
    
    // Determine success and quality
    let success = moneyLastsYears >= plannedYears;
    let quality = 'excellent';
    let message = '';
    
    if (finalBalance <= 0) {
      quality = 'poor';
      message = `Money runs out after ${moneyLastsYears} years - consider reducing withdrawals`;
    } else if (finalBalance < startingBalance * 0.25) {
      quality = 'risky';
      message = 'Very low final balance - vulnerable to market downturns';
    } else if (finalBalance < startingBalance * 0.5) {
      quality = 'moderate';
      message = 'Moderate final balance - some cushion for unexpected expenses';
    } else if (finalBalance > startingBalance * 2) {
      quality = 'conservative';
      message = 'Very high final balance - could potentially spend more';
    } else {
      quality = 'excellent';
      message = 'Well-balanced withdrawal strategy with good safety margin';
    }
    
    return {
      success,
      quality,
      message,
      moneyLastsYears,
      finalBalance,
      totalWithdrawn,
      totalAdditionalIncome,
      avgWithdrawal,
      avgTotalIncome,
      avgRealWithdrawal,
      avgRealIncome,
      withdrawalRate: (projection[0].withdrawal / startingBalance) * 100,
      finalWithdrawalRate: finalBalance > 0 ? (lastYear.withdrawal / lastYear.balance) * 100 : 0
    };
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('retirement-result');
    if (!resultDiv) return;
    
    const { analysis, projection } = results;
    
    // Determine status styling
    let statusClass = 'status-excellent';
    let statusIcon = '✓';
    if (analysis.quality === 'poor') {
      statusClass = 'status-poor';
      statusIcon = '⚠';
    } else if (analysis.quality === 'risky') {
      statusClass = 'status-risky';
      statusIcon = '!';
    } else if (analysis.quality === 'moderate') {
      statusClass = 'status-moderate';
      statusIcon = '!';
    } else if (analysis.quality === 'conservative') {
      statusClass = 'status-conservative';
      statusIcon = '💰';
    }
    
    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Your Retirement Income Analysis</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Analysis
        </button>
      </div>
      
      <div class="retirement-status ${statusClass}">
        <div class="status-icon">${statusIcon}</div>
        <div class="status-content">
          <h4>Retirement Outlook: ${analysis.quality.charAt(0).toUpperCase() + analysis.quality.slice(1)}</h4>
          <p>${analysis.message}</p>
        </div>
      </div>
      
      <div class="result-summary">
        <div class="result-card ${analysis.success ? 'result-card-success' : 'result-card-warning'}">
          <div class="card-icon">⏱️</div>
          <h4>Money Lasts</h4>
          <div class="result-amount">${analysis.moneyLastsYears}+ years</div>
          <div class="result-detail">
            <small>${analysis.success ? 'Covers full retirement' : 'Falls short of goal'}</small>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💵</div>
          <h4>Annual Income</h4>
          <div class="result-amount">${formatCurrency(projection[0].totalIncome)}</div>
          <div class="result-detail">
            <small>First year total income</small>
            <div class="mini-breakdown">
              <span>${formatCurrency(projection[0].withdrawal)} from savings</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💰</div>
          <h4>Final Balance</h4>
          <div class="result-amount">${formatCurrency(analysis.finalBalance)}</div>
          <div class="result-detail">
            <small>After ${results.retirementYears} years</small>
            <div class="mini-breakdown">
              <span>${((analysis.finalBalance / results.retirementSavings) * 100).toFixed(0)}% of starting</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="balance-visualization">
        <h4>Portfolio Balance Over Time</h4>
        <div class="balance-chart">
          ${generateBalanceChart(projection, results.retirementSavings)}
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-line solid"></span>
            <span>Portfolio Balance</span>
          </div>
          <div class="legend-item">
            <span class="legend-line dashed"></span>
            <span>Starting Balance</span>
          </div>
        </div>
      </div>
      
      <div class="income-breakdown">
        <h4>Income Analysis</h4>
        <div class="income-grid">
          <div class="income-section">
            <h5>Nominal Values (Not Adjusted)</h5>
            <table class="result-table">
              <tr>
                <td>Average Annual Withdrawal</td>
                <td class="text-right">${formatCurrency(analysis.avgWithdrawal)}</td>
              </tr>
              <tr>
                <td>Average Total Income</td>
                <td class="text-right">${formatCurrency(analysis.avgTotalIncome)}</td>
              </tr>
              <tr>
                <td>Total Withdrawn</td>
                <td class="text-right">${formatCurrency(analysis.totalWithdrawn)}</td>
              </tr>
              <tr>
                <td>Total Additional Income</td>
                <td class="text-right">${formatCurrency(analysis.totalAdditionalIncome)}</td>
              </tr>
            </table>
          </div>
          
          <div class="income-section">
            <h5>Real Values (Inflation-Adjusted)</h5>
            <table class="result-table">
              <tr>
                <td>Average Real Withdrawal</td>
                <td class="text-right">${formatCurrency(analysis.avgRealWithdrawal)}</td>
              </tr>
              <tr>
                <td>Average Real Income</td>
                <td class="text-right">${formatCurrency(analysis.avgRealIncome)}</td>
              </tr>
              <tr>
                <td>Initial Withdrawal Rate</td>
                <td class="text-right">${analysis.withdrawalRate.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Inflation Impact</td>
                <td class="text-right">${((projection[projection.length - 1].inflationFactor - 1) * 100).toFixed(0)}%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      
      <div class="projection-table">
        <h4>Year-by-Year Projection</h4>
        <div class="table-controls">
          <button id="toggle-projection" class="btn btn-secondary">
            ${projection.length > 10 ? 'Show First 10 Years' : 'Show All Years'}
          </button>
        </div>
        <div class="table-container">
          <table class="projection-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Age</th>
                <th>Balance</th>
                <th>Withdrawal</th>
                <th>Additional</th>
                <th>Total Income</th>
                <th>Real Income</th>
              </tr>
            </thead>
            <tbody>
              ${generateProjectionRows(projection, results.currentAge, projection.length > 10 ? 10 : projection.length)}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="retirement-insights">
        <h4>💡 Key Insights</h4>
        <div class="insights-grid">
          ${generateInsights(results, analysis)}
        </div>
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Attach event listeners
    attachResultEventListeners(projection, results);
  }

  function generateBalanceChart(projection, startingBalance) {
    const maxBalance = Math.max(...projection.map(p => p.balance), startingBalance);
    const chartHeight = 200;
    
    // Sample points for visualization
    const samples = [];
    const sampleInterval = Math.ceil(projection.length / 20);
    for (let i = 0; i < projection.length; i += sampleInterval) {
      samples.push(projection[i]);
    }
    if (samples[samples.length - 1] !== projection[projection.length - 1]) {
      samples.push(projection[projection.length - 1]);
    }
    
    // Create SVG path
    const points = samples.map((p, i) => {
      const x = (i / (samples.length - 1)) * 100;
      const y = 100 - (p.balance / maxBalance) * 90;
      return `${x},${y}`;
    }).join(' ');
    
    return `
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width: 100%; height: ${chartHeight}px;">
        <!-- Grid lines -->
        <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" stroke-width="0.5"/>
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" stroke-width="0.5"/>
        <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" stroke-width="0.5"/>
        
        <!-- Starting balance line -->
        <line x1="0" y1="${100 - (startingBalance / maxBalance) * 90}" 
              x2="100" y2="${100 - (startingBalance / maxBalance) * 90}" 
              stroke="#9ca3af" stroke-width="0.5" stroke-dasharray="2,2"/>
        
        <!-- Balance line -->
        <polyline points="${points}" 
                  fill="none" 
                  stroke="#6366f1" 
                  stroke-width="2"/>
        
        <!-- Area under curve -->
        <polygon points="0,100 ${points} 100,100" 
                 fill="url(#balanceGradient)" 
                 opacity="0.3"/>
        
        <defs>
          <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
          </linearGradient>
        </defs>
      </svg>
      
      <div class="chart-labels">
        <div class="chart-label-left">Year 1</div>
        <div class="chart-label-right">Year ${projection.length}</div>
      </div>
    `;
  }

  function generateProjectionRows(projection, startingAge, rowsToShow) {
    return projection.slice(0, rowsToShow).map(year => {
      const age = startingAge + year.year - 1;
      const isDepletedYear = year.balance === 0 && year.year > 1;
      const isMilestone = year.year % 5 === 0;
      
      return `
        <tr class="${isDepletedYear ? 'depleted-year' : ''} ${isMilestone ? 'milestone-year' : ''}">
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

  function generateInsights(results, analysis) {
    const insights = [];
    
    // Withdrawal rate insight
    if (analysis.withdrawalRate <= 3) {
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">🛡️</div>
          <div class="insight-content">
            <h5>Conservative Withdrawal</h5>
            <p>Your ${analysis.withdrawalRate.toFixed(1)}% initial withdrawal rate is very conservative and should weather market downturns well.</p>
          </div>
        </div>
      `);
    } else if (analysis.withdrawalRate > 5) {
      insights.push(`
        <div class="insight-card insight-warning">
          <div class="insight-icon">⚠️</div>
          <div class="insight-content">
            <h5>High Withdrawal Rate</h5>
            <p>Your ${analysis.withdrawalRate.toFixed(1)}% withdrawal rate exceeds the traditional 4% rule. Consider reducing spending or working longer.</p>
          </div>
        </div>
      `);
    }
    
    // Inflation impact
    const inflationImpact = results.projection[results.projection.length - 1].inflationFactor;
    insights.push(`
      <div class="insight-card insight-info">
        <div class="insight-icon">📈</div>
        <div class="insight-content">
          <h5>Inflation Impact</h5>
          <p>After ${results.retirementYears} years, $1 will only buy what ${(1/inflationImpact).toFixed(2)} cents buys today - plan accordingly!</p>
        </div>
      </div>
    `);
    
    // Additional income benefit
    if (results.additionalIncome > 0) {
      const additionalPercent = (results.additionalIncome / (results.projection[0].totalIncome)) * 100;
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">💪</div>
          <div class="insight-content">
            <h5>Additional Income Helps</h5>
            <p>Your additional income covers ${additionalPercent.toFixed(0)}% of retirement expenses, significantly reducing portfolio strain.</p>
          </div>
        </div>
      `);
    }
    
    // Legacy planning
    if (analysis.finalBalance > results.retirementSavings) {
      insights.push(`
        <div class="insight-card insight-info">
          <div class="insight-icon">🎁</div>
          <div class="insight-content">
            <h5>Legacy Potential</h5>
            <p>Your portfolio grows to ${formatCurrency(analysis.finalBalance)}, leaving a substantial legacy for heirs or charity.</p>
          </div>
        </div>
      `);
    }
    
    return insights.join('');
  }

  function attachResultEventListeners(projection, results) {
    // Print button
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
    
    // Toggle projection table
    const toggleBtn = document.getElementById('toggle-projection');
    if (toggleBtn) {
      let showingAll = false;
      toggleBtn.addEventListener('click', function() {
        showingAll = !showingAll;
        const tbody = document.querySelector('.projection-table tbody');
        if (tbody) {
          tbody.innerHTML = generateProjectionRows(
            projection, 
            results.currentAge, 
            showingAll ? projection.length : 10
          );
        }
        this.textContent = showingAll ? 'Show First 10 Years' : 'Show All Years';
      });
    }
  }

  function validateInputs(savings, withdrawal, returnRate, inflationRate, years) {
    if (savings < 10000) {
      showError('Retirement savings must be at least $10,000');
      return false;
    }
    if (withdrawal <= 0) {
      showError('Please enter a valid withdrawal amount');
      return false;
    }
    if (returnRate < 0 || returnRate > 0.20) {
      showError('Please enter a realistic return rate (0-20%)');
      return false;
    }
    if (inflationRate < 0 || inflationRate > 0.10) {
      showError('Please enter a realistic inflation rate (0-10%)');
      return false;
    }
    if (years < 5 || years > 50) {
      showError('Please enter a retirement period between 5-50 years');
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
      // Use Web Share API if available
      navigator.share({
        title: 'Retirement Income Calculation',
        text: 'Check out my retirement income analysis',
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
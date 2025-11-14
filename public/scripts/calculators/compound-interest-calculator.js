// Compound Interest Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    principal: 10000,
    monthlyContribution: 200,
    interestRate: 7,
    timeYears: 20,
    compoundFrequency: 12,
    contributionFrequency: 12
  };

  // State
  let state = {
    lastCalculationResults: null
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
  });

  function initializeForm() {
    // Set default values
    setValue('principal', DEFAULT_VALUES.principal);
    setValue('monthly-contribution', DEFAULT_VALUES.monthlyContribution);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('time-years', DEFAULT_VALUES.timeYears);
    setValue('compound-frequency', DEFAULT_VALUES.compoundFrequency);
    setValue('contribution-frequency', DEFAULT_VALUES.contributionFrequency);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      { id: 'principal', param: 'principal' },
      { id: 'monthly-contribution', param: 'monthly_contribution' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'time-years', param: 'time_years' },
      { id: 'compound-frequency', param: 'compound_frequency' },
      { id: 'contribution-frequency', param: 'contribution_frequency' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        calculateCompoundInterest();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save values
    params.set('principal', getValue('principal'));
    params.set('monthly_contribution', getValue('monthly-contribution'));
    params.set('interest_rate', getValue('interest-rate'));
    params.set('time_years', getValue('time-years'));
    params.set('compound_frequency', getValue('compound-frequency'));
    params.set('contribution_frequency', getValue('contribution-frequency'));
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateCompoundInterest);
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Calculate on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateCompoundInterest();
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

  function calculateCompoundInterest() {
    // Get input values
    const principal = getValue('principal');
    const monthlyContribution = getValue('monthly-contribution');
    const annualRate = getValue('interest-rate');
    const years = getValue('time-years');
    const compoundFrequency = getValue('compound-frequency');
    const contributionFrequency = getValue('contribution-frequency');
    
    // Validate inputs
    if (!validateInputs(principal, annualRate, years)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // Calculate compound interest
    const rate = annualRate / 100;
    const n = compoundFrequency; // Times per year interest compounds
    const t = years;
    
    // Calculate future value of principal
    const futureValuePrincipal = principal * Math.pow((1 + rate/n), n*t);
    
    // Calculate future value of regular contributions
    let futureValueContributions = 0;
    if (monthlyContribution > 0) {
      // Convert monthly contribution to match contribution frequency
      const periodicContribution = monthlyContribution * (12 / contributionFrequency);
      const periodsPerYear = contributionFrequency;
      const totalPeriods = periodsPerYear * t;
      
      // Future value of annuity formula adjusted for compound frequency
      const ratePerPeriod = rate / periodsPerYear;
      const compoundPeriodsPerContribution = n / periodsPerYear;
      
      if (ratePerPeriod > 0) {
        futureValueContributions = periodicContribution * 
          ((Math.pow((1 + rate/n), n*t) - 1) / (Math.pow((1 + rate/n), n/periodsPerYear) - 1));
      } else {
        futureValueContributions = periodicContribution * totalPeriods;
      }
    }
    
    // Total future value
    const futureValue = futureValuePrincipal + futureValueContributions;
    
    // Total contributions
    const totalContributions = principal + (monthlyContribution * 12 * years);
    
    // Total interest earned
    const totalInterest = futureValue - totalContributions;
    
    // Generate year-by-year breakdown
    const yearlyData = generateYearlyBreakdown(
      principal, monthlyContribution, rate, years, 
      compoundFrequency, contributionFrequency
    );
    
    // Store results for printing
    state.lastCalculationResults = {
      principal,
      monthlyContribution,
      annualRate,
      years,
      compoundFrequency,
      contributionFrequency,
      futureValue,
      totalContributions,
      totalInterest,
      yearlyData
    };
    
    // Display results
    displayResults(state.lastCalculationResults);
  }

  function generateYearlyBreakdown(principal, monthlyContribution, rate, years, compoundFreq, contribFreq) {
    const yearlyData = [];
    let currentBalance = principal;
    let totalContributed = principal;
    
    for (let year = 1; year <= years; year++) {
      // Add contributions for the year
      const yearlyContribution = monthlyContribution * 12;
      
      // Calculate interest for the year with contributions
      let yearStartBalance = currentBalance;
      
      // Add contributions throughout the year and compound
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution if applicable
        if (monthlyContribution > 0 && (12 / contribFreq) * (month - 1) % (12 / contribFreq) === 0) {
          currentBalance += monthlyContribution * (12 / contribFreq);
        }
        
        // Compound interest if applicable
        if (compoundFreq >= 12 && month % (12 / compoundFreq) === 0) {
          const periodRate = rate / compoundFreq;
          const interest = currentBalance * periodRate;
          currentBalance += interest;
        }
      }
      
      // If annual compounding, add interest at year end
      if (compoundFreq === 1) {
        const interest = currentBalance * rate;
        currentBalance += interest;
      } else if (compoundFreq === 4) {
        // Quarterly compounding - ensure we compound 4 times
        for (let q = 0; q < 4; q++) {
          const periodRate = rate / 4;
          const quarterBalance = yearStartBalance + (yearlyContribution * (q + 1) / 4);
          const interest = quarterBalance * periodRate;
          currentBalance = yearStartBalance + yearlyContribution + 
                         (yearStartBalance * Math.pow(1 + rate/4, 4) - yearStartBalance) +
                         (yearlyContribution * ((Math.pow(1 + rate/4, 4) - 1) / (rate/4)) - yearlyContribution);
        }
      }
      
      totalContributed += yearlyContribution;
      const interestEarned = currentBalance - totalContributed;
      
      yearlyData.push({
        year,
        balance: currentBalance,
        contributions: totalContributed,
        interest: interestEarned,
        yearlyContribution: yearlyContribution
      });
    }
    
    return yearlyData;
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('compound-result');
    if (!resultDiv) return;
    
    // Format numbers for display
    const formatCurrency = (num) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(num);
    };
    
    const formatPercent = (num) => {
      return (num * 100).toFixed(1) + '%';
    };
    
    // Calculate effective return
    const effectiveReturn = Math.pow(results.futureValue / results.totalContributions, 1/results.years) - 1;
    
    // Calculate percentage breakdown
    const principalPercent = (results.principal / results.futureValue) * 100;
    const contributionsPercent = ((results.totalContributions - results.principal) / results.futureValue) * 100;
    const interestPercent = (results.totalInterest / results.futureValue) * 100;
    
    // Determine investment quality message
    let qualityMessage = '';
    let qualityClass = '';
    if (results.totalInterest > results.totalContributions) {
      qualityMessage = 'Excellent! Your interest exceeds your total contributions.';
      qualityClass = 'status-excellent';
    } else if (results.totalInterest > results.totalContributions * 0.5) {
      qualityMessage = 'Good growth! Compound interest is working well for you.';
      qualityClass = 'status-good';
    } else {
      qualityMessage = 'Steady growth. Consider longer investment period for better compounding.';
      qualityClass = 'status-moderate';
    }
    
    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Investment Growth Analysis</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Results
        </button>
      </div>
      
      <div class="investment-quality ${qualityClass}">
        <div class="status-icon">📈</div>
        <div class="status-content">
          <h4>Investment Performance</h4>
          <p>${qualityMessage}</p>
        </div>
      </div>
      
      <div class="result-summary">
        <div class="result-card result-card-primary">
          <div class="card-icon">💰</div>
          <h4>Future Value</h4>
          <div class="result-amount">${formatCurrency(results.futureValue)}</div>
          <div class="result-detail">
            <small>After ${results.years} years</small>
            <div class="mini-breakdown">
              <span>${formatPercent(effectiveReturn)} annual return</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">📊</div>
          <h4>Total Interest</h4>
          <div class="result-amount">${formatCurrency(results.totalInterest)}</div>
          <div class="result-detail">
            <small>${interestPercent.toFixed(1)}% of final value</small>
            <div class="mini-breakdown">
              <span>${(results.totalInterest / results.totalContributions).toFixed(1)}x growth</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">💸</div>
          <h4>Total Contributed</h4>
          <div class="result-amount">${formatCurrency(results.totalContributions)}</div>
          <div class="result-detail">
            <small>Principal + contributions</small>
            <div class="mini-breakdown">
              <span>${formatCurrency(results.monthlyContribution)}/month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="growth-visualization">
        <h4>Investment Growth Breakdown</h4>
        <div class="growth-bar">
          <div class="growth-segment principal" style="width: ${principalPercent}%">
            <span class="segment-label">Principal<br/>${principalPercent.toFixed(0)}%</span>
          </div>
          <div class="growth-segment contributions" style="width: ${contributionsPercent}%">
            <span class="segment-label">Contributions<br/>${contributionsPercent.toFixed(0)}%</span>
          </div>
          <div class="growth-segment interest" style="width: ${interestPercent}%">
            <span class="segment-label">Interest<br/>${interestPercent.toFixed(0)}%</span>
          </div>
        </div>
        <div class="growth-legend">
          <div class="legend-item">
            <span class="legend-color principal"></span>
            <span>Initial: ${formatCurrency(results.principal)}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color contributions"></span>
            <span>Added: ${formatCurrency(results.totalContributions - results.principal)}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color interest"></span>
            <span>Interest: ${formatCurrency(results.totalInterest)}</span>
          </div>
        </div>
      </div>
      
      <div class="yearly-breakdown">
        <h4>Year-by-Year Growth</h4>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Balance</th>
                <th>Yearly Addition</th>
                <th>Total Contributed</th>
                <th>Total Interest</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr class="year-0">
                <td>Start</td>
                <td>${formatCurrency(results.principal)}</td>
                <td>-</td>
                <td>${formatCurrency(results.principal)}</td>
                <td>${formatCurrency(0)}</td>
                <td>-</td>
              </tr>
              ${results.yearlyData.map(year => `
                <tr class="${year.year % 5 === 0 ? 'milestone-year' : ''}">
                  <td>${year.year}</td>
                  <td class="amount-cell">${formatCurrency(year.balance)}</td>
                  <td>${formatCurrency(year.yearlyContribution)}</td>
                  <td>${formatCurrency(year.contributions)}</td>
                  <td class="interest-cell">${formatCurrency(year.interest)}</td>
                  <td class="growth-cell">${((year.balance / year.contributions - 1) * 100).toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compound-comparison">
        <h4>Compounding Frequency Impact</h4>
        <div class="comparison-note">
          See how different compounding frequencies affect your investment:
        </div>
        ${generateCompoundingComparison(results)}
      </div>
      
      <div class="investment-insights">
        <h4>💡 Key Insights</h4>
        <div class="insights-grid">
          ${generateInsights(results)}
        </div>
      </div>
      
      <div class="result-actions">
        <h4>Explore More</h4>
        <div class="action-cards">
          <button onclick="location.href='/calculators/retirement-calculator'" class="action-card">
            <span class="action-icon">🏖️</span>
            <span class="action-text">
              <strong>Retirement Planning</strong>
              <small>Plan your retirement savings</small>
            </span>
          </button>
          <button onclick="location.href='/calculators/investment-return-calculator'" class="action-card">
            <span class="action-icon">📈</span>
            <span class="action-text">
              <strong>Investment Returns</strong>
              <small>Compare investment options</small>
            </span>
          </button>
          <button onclick="location.href='/calculators/inflation-calculator'" class="action-card">
            <span class="action-icon">💵</span>
            <span class="action-text">
              <strong>Inflation Impact</strong>
              <small>Adjust for inflation</small>
            </span>
          </button>
        </div>
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

  function generateCompoundingComparison(results) {
    const frequencies = [
      { name: 'Annual', value: 1 },
      { name: 'Quarterly', value: 4 },
      { name: 'Monthly', value: 12 },
      { name: 'Daily', value: 365 }
    ];
    
    const comparisons = frequencies.map(freq => {
      const futureValue = results.principal * Math.pow((1 + results.annualRate/100/freq.value), freq.value * results.years) +
                          (results.monthlyContribution * 12 * 
                           ((Math.pow((1 + results.annualRate/100/freq.value), freq.value * results.years) - 1) / 
                            (Math.pow((1 + results.annualRate/100/freq.value), freq.value/12) - 1)));
      
      return {
        name: freq.name,
        value: futureValue,
        difference: futureValue - results.futureValue,
        isCurrent: freq.value === results.compoundFrequency
      };
    });
    
    return `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Frequency</th>
            <th>Future Value</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          ${comparisons.map(comp => `
            <tr class="${comp.isCurrent ? 'current-selection' : ''}">
              <td>${comp.name} ${comp.isCurrent ? '<span class="badge">Current</span>' : ''}</td>
              <td>${formatCurrency(comp.value)}</td>
              <td class="${comp.difference > 0 ? 'text-success' : comp.difference < 0 ? 'text-danger' : ''}">
                ${comp.difference === 0 ? '-' : 
                  comp.difference > 0 ? '+' + formatCurrency(comp.difference) : 
                  formatCurrency(comp.difference)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function generateInsights(results) {
    const insights = [];
    
    // Time to double
    const doublingTime = Math.log(2) / Math.log(1 + results.annualRate/100);
    insights.push(`
      <div class="insight-card insight-info">
        <div class="insight-icon">⏱️</div>
        <div class="insight-content">
          <h5>Doubling Time</h5>
          <p>At ${results.annualRate}% interest, your money doubles every ${doublingTime.toFixed(1)} years (Rule of 72).</p>
        </div>
      </div>
    `);
    
    // Monthly contribution impact
    if (results.monthlyContribution > 0) {
      const withoutContributions = results.principal * Math.pow((1 + results.annualRate/100/results.compoundFrequency), 
                                                               results.compoundFrequency * results.years);
      const contributionImpact = results.futureValue - withoutContributions;
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">🎯</div>
          <div class="insight-content">
            <h5>Contribution Impact</h5>
            <p>Your ${formatCurrency(results.monthlyContribution)} monthly contributions add ${formatCurrency(contributionImpact)} to your final value!</p>
          </div>
        </div>
      `);
    }
    
    // Early investment advantage
    const tenYearsLater = results.principal * Math.pow((1 + results.annualRate/100/results.compoundFrequency), 
                                                       results.compoundFrequency * (results.years - 10));
    if (results.years > 10) {
      insights.push(`
        <div class="insight-card insight-warning">
          <div class="insight-icon">📅</div>
          <div class="insight-content">
            <h5>Time Advantage</h5>
            <p>Starting 10 years earlier gives you ${formatCurrency(results.futureValue - tenYearsLater)} more. Time is your best asset!</p>
          </div>
        </div>
      `);
    }
    
    // Interest vs contributions
    if (results.totalInterest > results.totalContributions) {
      insights.push(`
        <div class="insight-card insight-excellent">
          <div class="insight-icon">🚀</div>
          <div class="insight-content">
            <h5>Compound Power</h5>
            <p>Amazing! Your interest (${formatCurrency(results.totalInterest)}) exceeds your total contributions!</p>
          </div>
        </div>
      `);
    }
    
    return insights.join('');
  }

  function validateInputs(principal, rate, years) {
    if (principal < 0) {
      showError('Principal amount cannot be negative');
      return false;
    }
    if (rate < 0 || rate > 50) {
      showError('Please enter a valid interest rate (0-50%)');
      return false;
    }
    if (years < 1 || years > 50) {
      showError('Please enter a valid time period (1-50 years)');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('compound-result');
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
        title: 'Compound Interest Calculation',
        text: 'Check out my investment growth calculation',
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
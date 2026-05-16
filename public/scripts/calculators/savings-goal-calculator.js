// Savings Goal Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    targetAmount: 50000,
    currentSavings: 5000,
    monthlyContribution: 500,
    annualReturn: 6,
    timeYears: 10,
    timeMonths: 0
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
    setValue('target-amount', DEFAULT_VALUES.targetAmount);
    setValue('current-savings', DEFAULT_VALUES.currentSavings);
    setValue('monthly-contribution', DEFAULT_VALUES.monthlyContribution);
    setValue('annual-return', DEFAULT_VALUES.annualReturn);
    setValue('time-years', DEFAULT_VALUES.timeYears);
    setValue('time-months', DEFAULT_VALUES.timeMonths);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const fields = [
      { id: 'target-amount', param: 'target_amount' },
      { id: 'current-savings', param: 'current_savings' },
      { id: 'monthly-contribution', param: 'monthly_contribution' },
      { id: 'annual-return', param: 'annual_return' },
      { id: 'time-years', param: 'time_years' },
      { id: 'time-months', param: 'time_months' }
    ];

    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });

    if (params.toString()) {
      setTimeout(() => {
        calculateResults();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    params.set('target_amount', getValue('target-amount'));
    params.set('current_savings', getValue('current-savings'));
    params.set('monthly_contribution', getValue('monthly-contribution'));
    params.set('annual_return', getValue('annual-return'));
    params.set('time_years', getValue('time-years'));
    params.set('time_months', getValue('time-months'));

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        calculateResults();
        document.querySelector(".calculator-result")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });

      input.addEventListener('change', function() {
        saveToURL();
      });

      if (input.type === 'number') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
          }, 500);
        });
      }
    });

    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function calculateResults() {
    const targetAmount = getValue('target-amount');
    const currentSavings = getValue('current-savings');
    const monthlyContribution = getValue('monthly-contribution');
    const annualReturn = getValue('annual-return');
    const timeYears = getValue('time-years');
    const timeMonths = getValue('time-months');

    if (!validateInputs(targetAmount, annualReturn, timeYears)) {
      return;
    }

    saveToURL();

    const totalMonths = (timeYears * 12) + timeMonths;
    const monthlyRate = (annualReturn / 100) / 12;

    // Calculate projected savings at end of timeline
    let projectedSavings = currentSavings;
    const yearlyData = [];
    let runningBalance = currentSavings;
    let totalContributions = currentSavings;

    for (let month = 1; month <= totalMonths; month++) {
      // Add interest
      runningBalance = runningBalance * (1 + monthlyRate);
      // Add contribution
      runningBalance += monthlyContribution;
      totalContributions += monthlyContribution;

      // Record yearly data
      if (month % 12 === 0 || month === totalMonths) {
        const year = Math.ceil(month / 12);
        yearlyData.push({
          year: year,
          month: month,
          balance: runningBalance,
          contributions: totalContributions,
          interest: runningBalance - totalContributions
        });
      }
    }

    projectedSavings = runningBalance;
    const totalInterest = projectedSavings - totalContributions;
    const gap = targetAmount - projectedSavings;

    // Calculate monthly needed to reach goal exactly
    let monthlyNeeded = 0;
    if (totalMonths > 0) {
      if (monthlyRate > 0) {
        const fvCurrent = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
        const remaining = targetAmount - fvCurrent;
        if (remaining > 0) {
          monthlyNeeded = remaining / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        }
      } else {
        monthlyNeeded = Math.max(0, (targetAmount - currentSavings) / totalMonths);
      }
    }

    // Calculate scenarios
    const scenarios = calculateScenarios(currentSavings, targetAmount, totalMonths, annualReturn);

    state.lastCalculationResults = {
      targetAmount,
      currentSavings,
      monthlyContribution,
      annualReturn,
      timeYears,
      timeMonths,
      totalMonths,
      projectedSavings,
      totalContributions,
      totalInterest,
      gap,
      monthlyNeeded,
      yearlyData,
      scenarios
    };

    displayResults(state.lastCalculationResults);
  }

  function calculateScenarios(currentSavings, targetAmount, totalMonths, annualReturn) {
    const scenarios = [];

    // Conservative: 4% return
    const conservativeRate = 0.04 / 12;
    const conservativeMonthly = calculateNeededMonthly(currentSavings, targetAmount, totalMonths, conservativeRate);

    // Moderate: 7% return
    const moderateRate = 0.07 / 12;
    const moderateMonthly = calculateNeededMonthly(currentSavings, targetAmount, totalMonths, moderateRate);

    // Aggressive: 10% return
    const aggressiveRate = 0.10 / 12;
    const aggressiveMonthly = calculateNeededMonthly(currentSavings, targetAmount, totalMonths, aggressiveRate);

    scenarios.push({
      name: 'Conservative',
      returnRate: 4,
      monthlyNeeded: conservativeMonthly,
      description: 'Bonds & savings accounts',
      className: 'conservative'
    });

    scenarios.push({
      name: 'Moderate',
      returnRate: 7,
      monthlyNeeded: moderateMonthly,
      description: 'Balanced portfolio (stocks + bonds)',
      className: 'moderate'
    });

    scenarios.push({
      name: 'Aggressive',
      returnRate: 10,
      monthlyNeeded: aggressiveMonthly,
      description: 'Stock-heavy portfolio',
      className: 'aggressive'
    });

    return scenarios;
  }

  function calculateNeededMonthly(currentSavings, target, months, monthlyRate) {
    if (months <= 0) return 0;
    if (monthlyRate > 0) {
      const fvCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
      const remaining = target - fvCurrent;
      if (remaining <= 0) return 0;
      return remaining / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }
    return Math.max(0, (target - currentSavings) / months);
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('savings-goal-result');
    if (!resultDiv) return;

    const progressPercent = Math.min((results.projectedSavings / results.targetAmount) * 100, 150);
    const displayPercent = Math.min(progressPercent, 100);
    const isOnTrack = results.projectedSavings >= results.targetAmount;
    const isAhead = results.projectedSavings > results.targetAmount * 1.1;

    // Determine milestones reached
    const milestones = [25, 50, 75, 100];
    const milestonesReached = milestones.filter(m => progressPercent >= m);

    // Determine status
    let statusClass, statusIcon, statusTitle, statusMessage;
    if (isAhead) {
      statusClass = 'ahead';
      statusIcon = '🚀';
      statusTitle = 'Ahead of Schedule!';
      statusMessage = `At this rate, you'll exceed your goal by ${formatCurrency(results.projectedSavings - results.targetAmount)}.`;
    } else if (isOnTrack) {
      statusClass = 'on-track';
      statusIcon = '✅';
      statusTitle = 'On Track!';
      statusMessage = `Your current savings plan will meet your ${formatCurrency(results.targetAmount)} goal.`;
    } else {
      statusClass = 'behind';
      statusIcon = '📊';
      statusTitle = 'Savings Gap';
      statusMessage = `You need an additional ${formatCurrency(Math.abs(results.gap))} to reach your goal. Consider increasing contributions.`;
    }

    resultDiv.innerHTML = `
      <h3>Your Savings Plan Analysis</h3>

      <div class="gap-indicator ${statusClass}">
        <div class="gap-icon">${statusIcon}</div>
        <div>
          <strong>${statusTitle}</strong>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">${statusMessage}</p>
        </div>
      </div>

      <div class="savings-summary">
        <div class="summary-card">
          <h4>Target Goal</h4>
          <div class="amount">${formatCurrency(results.targetAmount)}</div>
          <div class="detail">Your savings target</div>
        </div>
        <div class="summary-card">
          <h4>Projected Savings</h4>
          <div class="amount ${isOnTrack ? 'text-success' : 'text-warning'}">${formatCurrency(results.projectedSavings)}</div>
          <div class="detail">After ${results.timeYears}yr ${results.timeMonths}mo</div>
        </div>
        <div class="summary-card">
          <h4>Total Contributions</h4>
          <div class="amount text-primary">${formatCurrency(results.totalContributions)}</div>
          <div class="detail">${formatCurrency(results.monthlyContribution)}/month</div>
        </div>
        <div class="summary-card">
          <h4>Interest Earned</h4>
          <div class="amount text-success">${formatCurrency(results.totalInterest)}</div>
          <div class="detail">${results.annualReturn}% annual return</div>
        </div>
      </div>

      <div class="needed-monthly">
        <h4>Monthly Savings Needed to Reach Goal</h4>
        <div class="big-number">${formatCurrency(results.monthlyNeeded)}</div>
        <div class="context">
          ${results.monthlyNeeded <= results.monthlyContribution
            ? 'You are saving enough! Your current ' + formatCurrency(results.monthlyContribution) + '/month exceeds this.'
            : 'You need ' + formatCurrency(results.monthlyNeeded - results.monthlyContribution) + '/month more than your current contribution.'}
        </div>
      </div>

      <div class="progress-section">
        <h4>Progress Toward Goal</h4>
        <div class="progress-bar-container">
          <div class="progress-bar-fill ${progressPercent > 100 ? 'over-target' : ''}" style="width: ${displayPercent}%">
            ${displayPercent.toFixed(0)}%
          </div>
        </div>
        <div class="milestone-markers">
          ${milestones.map(m => `
            <div class="milestone ${milestonesReached.includes(m) ? 'reached' : ''}">
              <div class="milestone-dot"></div>
              <span>${m}%</span>
              <span>${formatCurrency(results.targetAmount * m / 100)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="scenario-comparison">
        <h4>Savings Scenarios Comparison</h4>
        <p style="color: var(--color-gray-dark); margin: 0.5rem 0 1rem;">Monthly savings needed to reach ${formatCurrency(results.targetAmount)} in ${results.timeYears} years:</p>
        <div class="scenario-grid">
          ${results.scenarios.map(s => `
            <div class="scenario-card ${s.className}">
              <h5>${s.name} (${s.returnRate}% return)</h5>
              <div class="scenario-detail">${s.description}</div>
              <div class="scenario-amount" style="color: ${s.monthlyNeeded <= 0 ? '#059669' : '#111827'}">
                ${s.monthlyNeeded <= 0 ? 'Already funded!' : formatCurrency(s.monthlyNeeded) + '/month'}
              </div>
              <div class="scenario-detail">
                Total contributions: ${formatCurrency(results.currentSavings + (s.monthlyNeeded * results.totalMonths))}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="yearly-breakdown">
        <h4>Year-by-Year Growth Projection</h4>
        <div class="breakdown-table-container">
          <table class="breakdown-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Balance</th>
                <th>Contributions</th>
                <th>Interest Earned</th>
                <th>% of Goal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Start</td>
                <td>${formatCurrency(results.currentSavings)}</td>
                <td>${formatCurrency(results.currentSavings)}</td>
                <td>${formatCurrency(0)}</td>
                <td>${((results.currentSavings / results.targetAmount) * 100).toFixed(1)}%</td>
              </tr>
              ${results.yearlyData.map(year => {
                const pctOfGoal = (year.balance / results.targetAmount) * 100;
                const isMilestone = pctOfGoal >= 25 && pctOfGoal < 26 ||
                                   pctOfGoal >= 50 && pctOfGoal < 51 ||
                                   pctOfGoal >= 75 && pctOfGoal < 76 ||
                                   pctOfGoal >= 100 && pctOfGoal < 101;
                return `
                  <tr class="${pctOfGoal >= 100 ? 'milestone-year' : ''}">
                    <td>Year ${year.year}</td>
                    <td><strong>${formatCurrency(year.balance)}</strong></td>
                    <td>${formatCurrency(year.contributions)}</td>
                    <td style="color: var(--color-success);">${formatCurrency(year.interest)}</td>
                    <td>${pctOfGoal.toFixed(1)}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function validateInputs(targetAmount, annualReturn, timeYears) {
    if (targetAmount <= 0) {
      showError('Please enter a target savings amount greater than zero.');
      return false;
    }
    if (annualReturn < 0 || annualReturn > 30) {
      showError('Please enter a valid annual return rate (0-30%).');
      return false;
    }
    if (timeYears < 1 || timeYears > 50) {
      showError('Please enter a valid time period (1-50 years).');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('savings-goal-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
      resultDiv.classList.remove('hidden');
    }
  }

  function shareCalculation() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Savings Goal Calculation',
        text: 'Check out my savings goal plan',
        url: url
      }).catch(() => {
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

})();

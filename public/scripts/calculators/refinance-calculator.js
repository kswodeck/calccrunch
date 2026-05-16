// Refinance Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    currentBalance: 250000,
    currentRate: 6.5,
    currentTerm: 25,
    currentPayment: 0,
    newRate: 5.0,
    newTerm: 30,
    closingCosts: 5000,
    points: 0
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
    setValue('current-balance', DEFAULT_VALUES.currentBalance);
    setValue('current-rate', DEFAULT_VALUES.currentRate);
    setValue('current-term', DEFAULT_VALUES.currentTerm);
    setValue('current-payment', DEFAULT_VALUES.currentPayment);
    setValue('new-rate', DEFAULT_VALUES.newRate);
    setValue('new-term', DEFAULT_VALUES.newTerm);
    setValue('closing-costs', DEFAULT_VALUES.closingCosts);
    setValue('points', DEFAULT_VALUES.points);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    const fields = [
      { id: 'current-balance', param: 'current_balance' },
      { id: 'current-rate', param: 'current_rate' },
      { id: 'current-term', param: 'current_term' },
      { id: 'current-payment', param: 'current_payment' },
      { id: 'new-rate', param: 'new_rate' },
      { id: 'new-term', param: 'new_term' },
      { id: 'closing-costs', param: 'closing_costs' },
      { id: 'points', param: 'points' }
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
    params.set('current_balance', getValue('current-balance'));
    params.set('current_rate', getValue('current-rate'));
    params.set('current_term', getValue('current-term'));
    params.set('current_payment', getValue('current-payment'));
    params.set('new_rate', getValue('new-rate'));
    params.set('new_term', getValue('new-term'));
    params.set('closing_costs', getValue('closing-costs'));
    params.set('points', getValue('points'));

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

  function calculateMonthlyPayment(principal, annualRate, termYears) {
    const monthlyRate = (annualRate / 100) / 12;
    const numPayments = termYears * 12;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  function calculateTotalInterest(principal, monthlyPayment, termYears) {
    return (monthlyPayment * termYears * 12) - principal;
  }

  function generateAmortization(principal, annualRate, termYears) {
    const monthlyRate = (annualRate / 100) / 12;
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termYears);
    const schedule = [];
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let year = 1; year <= termYears; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        balance -= principalPayment;
      }

      totalInterest += yearInterest;
      totalPrincipal += yearPrincipal;

      schedule.push({
        year,
        balance: Math.max(0, balance),
        yearInterest,
        yearPrincipal,
        totalInterest,
        totalPrincipal
      });
    }

    return schedule;
  }

  function calculateResults() {
    const currentBalance = getValue('current-balance');
    const currentRate = getValue('current-rate');
    const currentTerm = getValue('current-term');
    let currentPayment = getValue('current-payment');
    const newRate = getValue('new-rate');
    const newTerm = getValue('new-term');
    const closingCosts = getValue('closing-costs');
    const points = getValue('points');

    if (!validateInputs(currentBalance, currentRate, currentTerm, newRate, newTerm)) {
      return;
    }

    saveToURL();

    // Calculate point costs
    const pointCost = (points / 100) * currentBalance;
    const totalClosingCosts = closingCosts + pointCost;

    // Calculate current monthly payment if not provided
    if (currentPayment <= 0) {
      currentPayment = calculateMonthlyPayment(currentBalance, currentRate, currentTerm);
    }

    // Calculate new monthly payment
    const newMonthlyPayment = calculateMonthlyPayment(currentBalance, newRate, newTerm);

    // Monthly savings
    const monthlySavings = currentPayment - newMonthlyPayment;

    // Total interest on current loan
    const currentTotalInterest = calculateTotalInterest(currentBalance, currentPayment, currentTerm);

    // Total interest on new loan
    const newTotalInterest = calculateTotalInterest(currentBalance, newMonthlyPayment, newTerm);

    // Total interest savings
    const interestSavings = currentTotalInterest - newTotalInterest;

    // Break-even month
    let breakEvenMonth = 0;
    if (monthlySavings > 0) {
      breakEvenMonth = Math.ceil(totalClosingCosts / monthlySavings);
    }

    // Net savings (interest savings minus closing costs)
    const netSavings = interestSavings - totalClosingCosts;

    // Total cost of current loan (remaining)
    const currentTotalCost = currentPayment * currentTerm * 12;

    // Total cost of new loan
    const newTotalCost = (newMonthlyPayment * newTerm * 12) + totalClosingCosts;

    // Generate amortization schedules
    const currentAmortization = generateAmortization(currentBalance, currentRate, currentTerm);
    const newAmortization = generateAmortization(currentBalance, newRate, newTerm);

    state.lastCalculationResults = {
      currentBalance,
      currentRate,
      currentTerm,
      currentPayment,
      newRate,
      newTerm,
      closingCosts,
      points,
      pointCost,
      totalClosingCosts,
      newMonthlyPayment,
      monthlySavings,
      currentTotalInterest,
      newTotalInterest,
      interestSavings,
      breakEvenMonth,
      netSavings,
      currentTotalCost,
      newTotalCost,
      currentAmortization,
      newAmortization
    };

    displayResults(state.lastCalculationResults);
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('refinance-result');
    if (!resultDiv) return;

    // Determine verdict
    let verdictClass, verdictIcon, verdictTitle, verdictMessage;
    if (results.netSavings > 10000 && results.breakEvenMonth <= 24) {
      verdictClass = 'verdict-yes';
      verdictIcon = '✅';
      verdictTitle = 'Refinancing Recommended';
      verdictMessage = `You'll save ${formatCurrency(results.netSavings)} over the life of the loan and break even in just ${results.breakEvenMonth} months.`;
    } else if (results.netSavings > 0 && results.breakEvenMonth <= 48) {
      verdictClass = 'verdict-maybe';
      verdictIcon = '🤔';
      verdictTitle = 'Refinancing May Be Worth It';
      verdictMessage = `You'll save ${formatCurrency(results.netSavings)} overall, but it takes ${results.breakEvenMonth} months to break even. Make sure you'll stay that long.`;
    } else if (results.monthlySavings <= 0) {
      verdictClass = 'verdict-no';
      verdictIcon = '❌';
      verdictTitle = 'Refinancing Not Recommended';
      verdictMessage = `The new loan would cost you more per month. The new rate or term doesn't improve your situation.`;
    } else {
      verdictClass = 'verdict-no';
      verdictIcon = '⚠️';
      verdictTitle = 'Carefully Consider';
      verdictMessage = `Break-even takes ${results.breakEvenMonth} months (${(results.breakEvenMonth / 12).toFixed(1)} years). Ensure you'll keep this loan long enough.`;
    }

    // Determine max cost for bar width
    const maxCost = Math.max(results.currentTotalCost, results.newTotalCost);

    // Build comparison years (show first 10 years or max of both terms)
    const maxYears = Math.min(Math.max(results.currentTerm, results.newTerm), 15);
    const comparisonRows = [];
    for (let y = 1; y <= maxYears; y++) {
      const currentData = results.currentAmortization[y - 1] || null;
      const newData = results.newAmortization[y - 1] || null;
      if (currentData || newData) {
        comparisonRows.push({
          year: y,
          currentBalance: currentData ? currentData.balance : 0,
          currentInterest: currentData ? currentData.totalInterest : results.currentTotalInterest,
          newBalance: newData ? newData.balance : 0,
          newInterest: newData ? newData.totalInterest : results.newTotalInterest,
          isBreakEven: y === Math.ceil(results.breakEvenMonth / 12)
        });
      }
    }

    resultDiv.innerHTML = `
      <h3>Refinance Analysis</h3>

      <div class="refinance-verdict ${verdictClass}">
        <div class="verdict-icon">${verdictIcon}</div>
        <div class="verdict-content">
          <h4>${verdictTitle}</h4>
          <p>${verdictMessage}</p>
        </div>
      </div>

      <div class="savings-highlight">
        <div class="highlight-item">
          <h5>Monthly Savings</h5>
          <div class="value">${results.monthlySavings > 0 ? formatCurrency(results.monthlySavings) : '-' + formatCurrency(Math.abs(results.monthlySavings))}</div>
        </div>
        <div class="highlight-item">
          <h5>Total Interest Savings</h5>
          <div class="value">${results.interestSavings > 0 ? formatCurrency(results.interestSavings) : '-' + formatCurrency(Math.abs(results.interestSavings))}</div>
        </div>
        <div class="highlight-item">
          <h5>Break-Even Point</h5>
          <div class="value">${results.breakEvenMonth > 0 ? results.breakEvenMonth + ' months' : 'N/A'}</div>
        </div>
        <div class="highlight-item">
          <h5>Net Savings</h5>
          <div class="value">${results.netSavings > 0 ? formatCurrency(results.netSavings) : '-' + formatCurrency(Math.abs(results.netSavings))}</div>
        </div>
      </div>

      <div class="comparison-cards">
        <div class="loan-card current-loan">
          <h4>📋 Current Loan</h4>
          <div class="loan-detail">
            <span class="label">Monthly Payment</span>
            <span class="value">${formatCurrency(results.currentPayment)}</span>
          </div>
          <div class="loan-detail">
            <span class="label">Interest Rate</span>
            <span class="value">${results.currentRate}%</span>
          </div>
          <div class="loan-detail">
            <span class="label">Remaining Term</span>
            <span class="value">${results.currentTerm} years</span>
          </div>
          <div class="loan-detail">
            <span class="label">Total Interest</span>
            <span class="value">${formatCurrency(results.currentTotalInterest)}</span>
          </div>
          <div class="loan-detail">
            <span class="label">Total Cost</span>
            <span class="value">${formatCurrency(results.currentTotalCost)}</span>
          </div>
        </div>

        <div class="loan-card new-loan">
          <h4>✨ New Loan</h4>
          <div class="loan-detail">
            <span class="label">Monthly Payment</span>
            <span class="value">${formatCurrency(results.newMonthlyPayment)}</span>
          </div>
          <div class="loan-detail">
            <span class="label">Interest Rate</span>
            <span class="value">${results.newRate}%</span>
          </div>
          <div class="loan-detail">
            <span class="label">New Term</span>
            <span class="value">${results.newTerm} years</span>
          </div>
          <div class="loan-detail">
            <span class="label">Total Interest</span>
            <span class="value">${formatCurrency(results.newTotalInterest)}</span>
          </div>
          <div class="loan-detail">
            <span class="label">Total Cost (w/ fees)</span>
            <span class="value">${formatCurrency(results.newTotalCost)}</span>
          </div>
        </div>
      </div>

      ${results.breakEvenMonth > 0 ? `
      <div class="breakeven-visual">
        <h4>Break-Even Timeline</h4>
        <p style="color: var(--color-gray-dark); font-size: 0.9rem;">
          After <strong>${results.breakEvenMonth} months</strong> (${(results.breakEvenMonth / 12).toFixed(1)} years), your monthly savings will have covered the closing costs of ${formatCurrency(results.totalClosingCosts)}.
        </p>
        <div class="breakeven-bar">
          <div class="breakeven-fill" style="width: 100%">
            <div class="breakeven-marker" style="left: ${Math.min((results.breakEvenMonth / (results.newTerm * 12)) * 100, 95)}%"></div>
          </div>
        </div>
        <div class="breakeven-labels">
          <span>Month 0</span>
          <span style="position: relative; left: ${Math.min((results.breakEvenMonth / (results.newTerm * 12)) * 100, 95) - 50}%">Break-even: Month ${results.breakEvenMonth}</span>
          <span>Month ${results.newTerm * 12}</span>
        </div>
      </div>
      ` : ''}

      <div class="total-cost-analysis">
        <h4>Total Cost Comparison</h4>
        <div class="cost-comparison-bar">
          <div class="cost-bar-item">
            <div class="cost-bar-label">
              <span>Current Loan (remaining)</span>
              <span>${formatCurrency(results.currentTotalCost)}</span>
            </div>
            <div class="cost-bar-track">
              <div class="cost-bar-fill current" style="width: ${(results.currentTotalCost / maxCost) * 100}%"></div>
            </div>
          </div>
          <div class="cost-bar-item">
            <div class="cost-bar-label">
              <span>New Loan (principal + interest)</span>
              <span>${formatCurrency(results.newMonthlyPayment * results.newTerm * 12)}</span>
            </div>
            <div class="cost-bar-track">
              <div class="cost-bar-fill new-loan" style="width: ${((results.newMonthlyPayment * results.newTerm * 12) / maxCost) * 100}%"></div>
            </div>
          </div>
          <div class="cost-bar-item">
            <div class="cost-bar-label">
              <span>New Loan + Closing Costs</span>
              <span>${formatCurrency(results.newTotalCost)}</span>
            </div>
            <div class="cost-bar-track">
              <div class="cost-bar-fill new-with-costs" style="width: ${(results.newTotalCost / maxCost) * 100}%"></div>
            </div>
          </div>
        </div>
        ${results.totalClosingCosts > 0 ? `
        <p style="font-size: 0.875rem; color: var(--color-gray-dark); margin-top: 1rem;">
          Closing costs breakdown: Fees ${formatCurrency(results.closingCosts)}${results.pointCost > 0 ? ' + Points ' + formatCurrency(results.pointCost) : ''} = <strong>${formatCurrency(results.totalClosingCosts)}</strong>
        </p>
        ` : ''}
      </div>

      <div class="amortization-comparison">
        <h4>Amortization Comparison (Year by Year)</h4>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Current Balance</th>
                <th>Current Interest Paid</th>
                <th>New Balance</th>
                <th>New Interest Paid</th>
                <th>Cumulative Savings</th>
              </tr>
            </thead>
            <tbody>
              ${comparisonRows.map(row => {
                const cumulativeSavings = row.currentInterest - row.newInterest - results.totalClosingCosts;
                return `
                  <tr class="${row.isBreakEven ? 'highlight-row' : ''}">
                    <td>${row.year}${row.isBreakEven ? ' (BE)' : ''}</td>
                    <td>${formatCurrency(row.currentBalance)}</td>
                    <td>${formatCurrency(row.currentInterest)}</td>
                    <td>${formatCurrency(row.newBalance)}</td>
                    <td>${formatCurrency(row.newInterest)}</td>
                    <td class="${cumulativeSavings >= 0 ? 'text-success' : 'text-danger'}">
                      ${cumulativeSavings >= 0 ? '+' : ''}${formatCurrency(cumulativeSavings)}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <p style="font-size: 0.8rem; color: var(--color-gray); margin-top: 0.5rem;">BE = Break-even year</p>
      </div>
    `;

    resultDiv.classList.remove('hidden');
  }

  function validateInputs(balance, currentRate, currentTerm, newRate, newTerm) {
    if (balance <= 0) {
      showError('Please enter a remaining balance greater than zero.');
      return false;
    }
    if (currentRate <= 0 || currentRate > 30) {
      showError('Please enter a valid current interest rate (0.1-30%).');
      return false;
    }
    if (currentTerm < 1 || currentTerm > 40) {
      showError('Please enter a valid remaining term (1-40 years).');
      return false;
    }
    if (newRate <= 0 || newRate > 30) {
      showError('Please enter a valid new interest rate (0.1-30%).');
      return false;
    }
    if (newTerm < 1 || newTerm > 40) {
      showError('Please enter a valid new loan term (1-40 years).');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('refinance-result');
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
        title: 'Refinance Calculation',
        text: 'Check out my refinance comparison',
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

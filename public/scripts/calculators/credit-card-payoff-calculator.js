// Credit Card Payoff Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    balance: 5000,
    interestRate: 18.99,
    paymentType: 'fixed',
    fixedPayment: 200,
    minimumPercent: 2,
    minimumFloor: 25,
    payoffMonths: 24,
    extraPayment: 0,
    extraPaymentMonth: 1
  };

  // State
  let state = {
    lastCalculationResults: null,
    showFullSchedule: false,
    currentPaymentType: 'fixed'
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updatePaymentSections();
    updateSuggestedPayments();
  });

  function initializeForm() {
    // Set default values
    setValue('card-balance', DEFAULT_VALUES.balance);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('payment-type', DEFAULT_VALUES.paymentType);
    setValue('fixed-payment', DEFAULT_VALUES.fixedPayment);
    setValue('minimum-percent', DEFAULT_VALUES.minimumPercent);
    setValue('minimum-floor', DEFAULT_VALUES.minimumFloor);
    setValue('payoff-months', DEFAULT_VALUES.payoffMonths);
    setValue('extra-payment', DEFAULT_VALUES.extraPayment);
    setValue('extra-payment-month', DEFAULT_VALUES.extraPaymentMonth);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load all parameters
    const fields = [
      { id: 'card-balance', param: 'balance', type: 'float' },
      { id: 'interest-rate', param: 'apr', type: 'float' },
      { id: 'payment-type', param: 'payment_type', type: 'string' },
      { id: 'fixed-payment', param: 'fixed_payment', type: 'float' },
      { id: 'minimum-percent', param: 'min_percent', type: 'float' },
      { id: 'minimum-floor', param: 'min_floor', type: 'float' },
      { id: 'payoff-months', param: 'payoff_months', type: 'int' },
      { id: 'extra-payment', param: 'extra_payment', type: 'float' },
      { id: 'extra-payment-month', param: 'extra_month', type: 'int' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = params.get(field.param);
        if (field.type === 'float') {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            setValue(field.id, numValue);
          }
        } else if (field.type === 'int') {
          const numValue = parseInt(value);
          if (!isNaN(numValue)) {
            setValue(field.id, numValue);
          }
        } else {
          setValue(field.id, value);
        }
      }
    });
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        updatePaymentSections();
        calculate();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save all values
    params.set('balance', getValue('card-balance'));
    params.set('apr', getValue('interest-rate'));
    params.set('payment_type', document.getElementById('payment-type').value);
    
    const paymentType = document.getElementById('payment-type').value;
    if (paymentType === 'fixed') {
      params.set('fixed_payment', getValue('fixed-payment'));
    } else if (paymentType === 'minimum') {
      params.set('min_percent', getValue('minimum-percent'));
      params.set('min_floor', getValue('minimum-floor'));
    } else if (paymentType === 'payoff-goal') {
      params.set('payoff_months', getValue('payoff-months'));
    }
    
    // Save extra payment if not zero
    const extraPayment = getValue('extra-payment');
    if (extraPayment > 0) {
      params.set('extra_payment', extraPayment);
      params.set('extra_month', document.getElementById('extra-payment-month').value);
    }
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculate);
    }

    // Clear button
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearForm);
    }

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }

    // Payment type selector
    const paymentType = document.getElementById('payment-type');
    if (paymentType) {
      paymentType.addEventListener('change', function() {
        updatePaymentSections();
        saveToURL();
      });
    }

    // Suggestion buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('suggestion-btn')) {
        const months = parseInt(e.target.dataset.months);
        calculateFixedPayment(months);
      }
    });

    // Add debounced input listeners for real-time updates
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Calculate on Enter key
      if (input.type === 'number' || input.type === 'text') {
        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
          }
        });
      }
      
      // Save to URL on change
      input.addEventListener('change', function() {
        saveToURL();
        
        // Update suggestions when balance or interest changes
        if (input.id === 'card-balance' || input.id === 'interest-rate') {
          updateSuggestedPayments();
        }
        
        // Update required payment for payoff goal
        if (input.id === 'payoff-months') {
          updateRequiredPayment();
        }
      });
      
      // Debounced save for real-time updates
      if (input.type === 'number') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
            
            if (input.id === 'card-balance' || input.id === 'interest-rate') {
              updateSuggestedPayments();
            }
            
            if (input.id === 'payoff-months') {
              updateRequiredPayment();
            }
          }, 500);
        });
      }
    });
  }

  function updatePaymentSections() {
    const paymentType = document.getElementById('payment-type').value;
    
    // Hide all sections
    document.getElementById('minimum-payment-section').classList.add('hidden');
    document.getElementById('fixed-payment-section').classList.add('hidden');
    document.getElementById('payoff-goal-section').classList.add('hidden');
    
    // Show selected section
    if (paymentType === 'minimum') {
      document.getElementById('minimum-payment-section').classList.remove('hidden');
    } else if (paymentType === 'fixed') {
      document.getElementById('fixed-payment-section').classList.remove('hidden');
    } else if (paymentType === 'payoff-goal') {
      document.getElementById('payoff-goal-section').classList.remove('hidden');
      updateRequiredPayment();
    }
    
    state.currentPaymentType = paymentType;
  }

  function updateSuggestedPayments() {
    const balance = getValue('card-balance');
    const suggestionBox = document.getElementById('payment-suggestion');
    
    if (balance > 0) {
      suggestionBox.classList.remove('hidden');
      
      // Update suggestion buttons with calculated amounts
      const buttons = document.querySelectorAll('.suggestion-btn');
      buttons.forEach(button => {
        const months = parseInt(button.dataset.months);
        const payment = Math.ceil(balance / months);
        button.textContent = `$${payment}/mo (${months} mo)`;
      });
    } else {
      suggestionBox.classList.add('hidden');
    }
  }

  function calculateFixedPayment(months) {
    const balance = getValue('card-balance');
    const interestRate = getValue('interest-rate');
    
    if (balance > 0 && interestRate > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const payment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                      (Math.pow(1 + monthlyRate, months) - 1);
      setValue('fixed-payment', Math.ceil(payment));
      saveToURL();
    } else if (balance > 0) {
      // No interest case
      setValue('fixed-payment', Math.ceil(balance / months));
      saveToURL();
    }
  }

  function updateRequiredPayment() {
    const balance = getValue('card-balance');
    const interestRate = getValue('interest-rate');
    const months = getValue('payoff-months');
    
    const requiredDiv = document.getElementById('required-payment');
    const requiredAmount = document.getElementById('required-amount');
    
    if (balance > 0 && months > 0) {
      if (interestRate > 0) {
        const monthlyRate = interestRate / 100 / 12;
        const payment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
        requiredAmount.textContent = formatCurrency(payment);
      } else {
        const payment = balance / months;
        requiredAmount.textContent = formatCurrency(payment);
      }
      requiredDiv.classList.remove('hidden');
    } else {
      requiredDiv.classList.add('hidden');
    }
  }

  function calculate() {
    // Get input values
    const balance = getValue('card-balance');
    const apr = getValue('interest-rate');
    const paymentType = document.getElementById('payment-type').value;
    const extraPayment = getValue('extra-payment');
    const extraPaymentMonth = parseInt(document.getElementById('extra-payment-month').value);
    
    // Validate inputs
    if (!validateInputs()) {
      return;
    }
    
    // Determine monthly payment based on payment type
    let monthlyPayment = 0;
    let isMinimumPayment = false;
    
    if (paymentType === 'minimum') {
      const minPercent = getValue('minimum-percent');
      const minFloor = getValue('minimum-floor');
      monthlyPayment = Math.max(balance * minPercent / 100, minFloor);
      isMinimumPayment = true;
    } else if (paymentType === 'fixed') {
      monthlyPayment = getValue('fixed-payment');
    } else if (paymentType === 'payoff-goal') {
      const months = getValue('payoff-months');
      if (apr > 0) {
        const monthlyRate = apr / 100 / 12;
        monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        monthlyPayment = balance / months;
      }
    }
    
    // Calculate payoff schedule
    const results = calculatePayoffSchedule(
      balance, 
      apr, 
      monthlyPayment, 
      isMinimumPayment,
      getValue('minimum-percent'),
      getValue('minimum-floor'),
      extraPayment,
      extraPaymentMonth
    );
    
    // Calculate minimum payment comparison
    const minimumResults = calculatePayoffSchedule(
      balance,
      apr,
      Math.max(balance * DEFAULT_VALUES.minimumPercent / 100, DEFAULT_VALUES.minimumFloor),
      true,
      DEFAULT_VALUES.minimumPercent,
      DEFAULT_VALUES.minimumFloor,
      0,
      1
    );
    
    // Store results
    state.lastCalculationResults = {
      current: results,
      minimum: minimumResults,
      inputs: {
        balance,
        apr,
        monthlyPayment,
        paymentType,
        extraPayment,
        extraPaymentMonth
      }
    };
    
    // Display results
    displayResults(results, minimumResults);
    
    // Save to URL
    saveToURL();
  }

  function calculatePayoffSchedule(balance, apr, monthlyPayment, isMinimum, minPercent, minFloor, extraPayment, extraMonth) {
    const monthlyRate = apr / 100 / 12;
    const schedule = [];
    let currentBalance = balance;
    let totalInterest = 0;
    let totalPaid = 0;
    let month = 0;
    
    // Validate minimum payment
    if (monthlyPayment < currentBalance * monthlyRate && !isMinimum) {
      // Payment doesn't cover interest
      return {
        error: true,
        message: 'Payment must be at least ' + formatCurrency(currentBalance * monthlyRate) + 
                 ' to cover monthly interest charges.'
      };
    }
    
    while (currentBalance > 0.01 && month < 600) { // Max 50 years
      month++;
      
      // Calculate interest for this month
      const interestCharge = currentBalance * monthlyRate;
      
      // Adjust payment if minimum payment
      let payment = monthlyPayment;
      if (isMinimum) {
        payment = Math.max(currentBalance * minPercent / 100, minFloor);
      }
      
      // Add extra payment if applicable
      if (month === extraMonth && extraPayment > 0) {
        payment += extraPayment;
      }
      
      // Don't pay more than balance + interest
      payment = Math.min(payment, currentBalance + interestCharge);
      
      // Calculate principal payment
      const principalPayment = payment - interestCharge;
      
      // Update balance
      currentBalance = Math.max(0, currentBalance - principalPayment);
      
      // Track totals
      totalInterest += interestCharge;
      totalPaid += payment;
      
      // Add to schedule
      schedule.push({
        month: month,
        payment: payment,
        principal: principalPayment,
        interest: interestCharge,
        balance: currentBalance,
        hasExtra: month === extraMonth && extraPayment > 0
      });
      
      // Check if payment doesn't cover interest (for minimum payments)
      if (principalPayment <= 0 && currentBalance > 0) {
        return {
          error: true,
          message: 'Minimum payment is too low to cover interest charges. Debt will never be paid off.'
        };
      }
    }
    
    return {
      schedule: schedule,
      totalMonths: month,
      totalYears: Math.ceil(month / 12),
      totalInterest: totalInterest,
      totalPaid: totalPaid,
      lastPaymentDate: getPaymentDate(month),
      averageMonthlyPayment: totalPaid / month
    };
  }

  function displayResults(current, minimum) {
    const resultDiv = document.getElementById('credit-card-result');
    
    if (current.error) {
      resultDiv.innerHTML = `
        <div class="error-message">
          <h3>⚠️ Calculation Error</h3>
          <p>${current.message}</p>
        </div>
      `;
      resultDiv.classList.remove('hidden');
      return;
    }
    
    const savings = minimum.totalInterest - current.totalInterest;
    const timeSaved = minimum.totalMonths - current.totalMonths;
    
    let html = `
      <h2 class="result-title">Your Credit Card Payoff Plan</h2>
      
      <div class="result-summary">
        <div class="stat-card highlight">
          <div class="stat-label">Payoff Time</div>
          <div class="stat-value">${formatPayoffTime(current.totalMonths)}</div>
          <div class="stat-sublabel">Debt-free by ${current.lastPaymentDate}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Interest</div>
          <div class="stat-value">${formatCurrency(current.totalInterest)}</div>
          <div class="stat-sublabel">${((current.totalInterest / state.lastCalculationResults.inputs.balance) * 100).toFixed(1)}% of original balance</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Amount Paid</div>
          <div class="stat-value">${formatCurrency(current.totalPaid)}</div>
          <div class="stat-sublabel">${formatCurrency(current.averageMonthlyPayment)}/month avg</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Monthly Payment</div>
          <div class="stat-value">${formatCurrency(state.lastCalculationResults.inputs.monthlyPayment)}</div>
          <div class="stat-sublabel">${state.lastCalculationResults.inputs.paymentType === 'minimum' ? 'Minimum payment' : 'Fixed payment'}</div>
        </div>
      </div>
    `;
    
    // Show comparison if not already using minimum payments
    if (state.lastCalculationResults.inputs.paymentType !== 'minimum' && !minimum.error) {
      html += `
        <div class="payoff-comparison">
          <div class="comparison-card current-plan">
            <h4>💚 Your Plan</h4>
            <div class="comparison-stat">
              <span class="label">Payoff Time:</span>
              <span class="value">${formatPayoffTime(current.totalMonths)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Total Interest:</span>
              <span class="value">${formatCurrency(current.totalInterest)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Total Paid:</span>
              <span class="value">${formatCurrency(current.totalPaid)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Monthly Payment:</span>
              <span class="value">${formatCurrency(state.lastCalculationResults.inputs.monthlyPayment)}</span>
            </div>
          </div>
          
          <div class="comparison-card minimum-plan">
            <h4>⚠️ Minimum Payments Only</h4>
            <div class="comparison-stat">
              <span class="label">Payoff Time:</span>
              <span class="value">${formatPayoffTime(minimum.totalMonths)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Total Interest:</span>
              <span class="value" style="color: #ef5350;">${formatCurrency(minimum.totalInterest)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Total Paid:</span>
              <span class="value">${formatCurrency(minimum.totalPaid)}</span>
            </div>
            <div class="comparison-stat">
              <span class="label">Starting Payment:</span>
              <span class="value">${formatCurrency(Math.max(state.lastCalculationResults.inputs.balance * DEFAULT_VALUES.minimumPercent / 100, DEFAULT_VALUES.minimumFloor))}</span>
            </div>
          </div>
        </div>
        
        ${savings > 0 ? `
          <div class="savings-highlight">
            <h4>🎉 You're Saving</h4>
            <div class="savings-amount">${formatCurrency(savings)} in interest</div>
            <p>And paying off your debt ${timeSaved} months faster than with minimum payments!</p>
          </div>
        ` : ''}
      `;
    }
    
    // Add balance chart
    html += `
      <div class="balance-chart">
        <h3>Balance Over Time</h3>
        <div class="balance-chart-container">
          ${generateBalanceChart(current.schedule)}
        </div>
      </div>
    `;
    
    // Add payment schedule
    html += `
      <div class="schedule-section">
        <div class="schedule-header">
          <h3>Payment Schedule</h3>
          <div class="schedule-controls">
            <button type="button" class="btn btn-secondary btn-sm" id="toggle-schedule">
              ${state.showFullSchedule ? 'Show Summary' : 'Show Full Schedule'}
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="export-csv">
              Export to CSV
            </button>
          </div>
        </div>
        <div class="schedule-table-container">
          ${generateScheduleTable(current.schedule, state.showFullSchedule)}
        </div>
      </div>
    `;
    
    // Add insights
    html += generateInsights(current, minimum);
    
    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Attach schedule controls
    attachScheduleControls(current.schedule);
  }

  function generateScheduleTable(schedule, showFull = false) {
    const displaySchedule = showFull ? schedule : schedule.filter((row, index) => 
      index === 0 || 
      index === schedule.length - 1 || 
      index % 12 === 11 || 
      row.hasExtra
    );
    
    let html = `
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
        <tbody>
    `;
    
    displaySchedule.forEach(row => {
      const isYearEnd = row.month % 12 === 0;
      const rowClass = row.hasExtra ? 'has-extra' : (isYearEnd ? 'year-marker' : '');
      
      html += `
        <tr class="${rowClass}">
          <td>${row.month}${isYearEnd ? ' (Year ' + Math.floor(row.month/12) + ')' : ''}</td>
          <td>${formatCurrency(row.payment)}${row.hasExtra ? ' 💰' : ''}</td>
          <td>${formatCurrency(row.principal)}</td>
          <td>${formatCurrency(row.interest)}</td>
          <td>${formatCurrency(row.balance)}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    `;
    
    return html;
  }

  function generateInsights(current, minimum) {
    const balance = state.lastCalculationResults.inputs.balance;
    const apr = state.lastCalculationResults.inputs.apr;
    const monthlyPayment = state.lastCalculationResults.inputs.monthlyPayment;
    
    let insights = [];
    
    // Interest rate insight
    if (apr > 20) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'High Interest Rate',
        text: `Your ${apr.toFixed(2)}% APR is above average. Consider negotiating with your card issuer or transferring to a lower-rate card.`
      });
    } else if (apr < 15) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Good Interest Rate',
        text: `Your ${apr.toFixed(2)}% APR is below average. Keep making consistent payments to eliminate this debt.`
      });
    }
    
    // Payment strategy insight
    if (monthlyPayment > balance * 0.05) {
      insights.push({
        type: 'success',
        icon: '🚀',
        title: 'Aggressive Payoff',
        text: `You're paying ${((monthlyPayment / balance) * 100).toFixed(1)}% of your balance monthly. Great strategy for fast debt elimination!`
      });
    } else if (monthlyPayment < balance * 0.03) {
      insights.push({
        type: 'warning',
        icon: '🐌',
        title: 'Slow Payoff',
        text: `Your payment is only ${((monthlyPayment / balance) * 100).toFixed(1)}% of the balance. Consider increasing payments to save on interest.`
      });
    }
    
    // Total cost insight
    const interestRatio = current.totalInterest / balance;
    if (interestRatio > 0.5) {
      insights.push({
        type: 'info',
        icon: '💸',
        title: 'High Interest Cost',
        text: `You'll pay ${(interestRatio * 100).toFixed(0)}% of your original balance in interest. Increasing payments could save significantly.`
      });
    } else if (interestRatio < 0.2) {
      insights.push({
        type: 'success',
        icon: '💰',
        title: 'Low Interest Cost',
        text: `You'll only pay ${(interestRatio * 100).toFixed(0)}% extra in interest. Excellent payment strategy!`
      });
    }
    
    // Extra payment insight
    if (state.lastCalculationResults.inputs.extraPayment > 0) {
      const withoutExtra = calculatePayoffSchedule(
        balance,
        apr,
        monthlyPayment,
        false,
        0,
        0,
        0,
        1
      );
      
      const extraSavings = withoutExtra.totalInterest - current.totalInterest;
      const extraMonthsSaved = withoutExtra.totalMonths - current.totalMonths;
      
      insights.push({
        type: 'success',
        icon: '🎁',
        title: 'Extra Payment Impact',
        text: `Your ${formatCurrency(state.lastCalculationResults.inputs.extraPayment)} extra payment saves ${formatCurrency(extraSavings)} in interest and ${extraMonthsSaved} months!`
      });
    }
    
    let html = '<div class="loan-insights"><h3>Insights & Recommendations</h3><div class="insights-grid">';
    
    insights.forEach(insight => {
      html += `
        <div class="insight-card insight-${insight.type}">
          <span class="insight-icon">${insight.icon}</span>
          <div class="insight-content">
            <h5>${insight.title}</h5>
            <p>${insight.text}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  function generateBalanceChart(schedule) {
    if (!schedule || schedule.length === 0) return '';
    
    // Sample data points for chart (max 24 bars to keep it manageable)
    let dataPoints = [];
    const maxBars = 24;
    const totalMonths = schedule.length;
    
    if (totalMonths <= maxBars) {
      // Show all months if 24 or fewer
      dataPoints = schedule;
    } else {
      // Sample evenly across the timeline
      const interval = Math.floor(totalMonths / (maxBars - 1));
      for (let i = 0; i < totalMonths; i += interval) {
        dataPoints.push(schedule[i]);
      }
      // Always include the last month
      if (dataPoints[dataPoints.length - 1] !== schedule[schedule.length - 1]) {
        dataPoints.push(schedule[schedule.length - 1]);
      }
    }
    
    const maxBalance = schedule[0].balance + schedule[0].interest;
    
    let html = `
      <div class="balance-visualization">
        <div class="chart-y-axis">
          <div class="y-axis-labels">
            <span>${formatCurrency(maxBalance, 0)}</span>
            <span>${formatCurrency(maxBalance * 0.75, 0)}</span>
            <span>${formatCurrency(maxBalance * 0.5, 0)}</span>
            <span>${formatCurrency(maxBalance * 0.25, 0)}</span>
            <span>$0</span>
          </div>
          <div class="y-axis-title">Balance</div>
        </div>
        <div class="chart-main">
          <div class="chart-bars-container">
    `;
    
    dataPoints.forEach((point, index) => {
      const heightPercent = (point.balance / maxBalance) * 100;
      const isFirstYear = point.month <= 12;
      const isLastBar = index === dataPoints.length - 1;
      
      html += `
        <div class="balance-bar-wrapper">
          <div class="balance-bar ${isLastBar ? 'final' : ''}" 
               style="height: ${Math.max(heightPercent, 2)}%"
               title="Month ${point.month}: ${formatCurrency(point.balance)}">
            <span class="bar-value">${point.balance < 1000 ? formatCurrency(point.balance, 0) : ''}</span>
          </div>
          <span class="bar-month">${point.month <= 12 || point.month % 6 === 0 || isLastBar ? point.month : ''}</span>
        </div>
      `;
    });
    
    html += `
          </div>
          <div class="chart-x-axis">
            <span>Months</span>
          </div>
        </div>
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <div class="legend-color" style="background: linear-gradient(to top, #FF6B35, #FF8C57);"></div>
          <span>Remaining Balance</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #10b981;"></div>
          <span>Paid Off</span>
        </div>
      </div>
    `;
    
    return html;
  }

  function attachScheduleControls(schedule) {
    // Toggle schedule view
    const toggleBtn = document.getElementById('toggle-schedule');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        state.showFullSchedule = !state.showFullSchedule;
        const tableContainer = document.querySelector('.schedule-table-container');
        tableContainer.innerHTML = generateScheduleTable(schedule, state.showFullSchedule);
        toggleBtn.textContent = state.showFullSchedule ? 'Show Summary' : 'Show Full Schedule';
      });
    }
    
    // Export to CSV
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        exportToCSV(schedule);
      });
    }
  }

  function exportToCSV(schedule) {
    let csv = 'Month,Payment,Principal,Interest,Balance\n';
    
    schedule.forEach(row => {
      csv += `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit-card-payoff-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function clearForm() {
    if (confirm('Clear all values and start over?')) {
      // Reset to defaults
      initializeForm();
      
      // Clear URL parameters
      window.history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
      
      // Hide results
      document.getElementById('credit-card-result').classList.add('hidden');
      
      // Reset state
      state.lastCalculationResults = null;
      state.showFullSchedule = false;
      
      // Update UI
      updatePaymentSections();
      updateSuggestedPayments();
    }
  }

  function shareCalculation() {
    const url = window.location.href;
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'Credit Card Payoff Calculator',
        text: `Check out my credit card payoff plan: ${formatPayoffTime(state.lastCalculationResults.current.totalMonths)} to be debt-free!`,
        url: url
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          copyToClipboard(url);
        }
      });
    } else {
      // Fall back to copying to clipboard
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showToast('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      showToast('Failed to copy link');
    }
    
    document.body.removeChild(textarea);
  }

  function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Utility functions
  function getValue(id) {
    const element = document.getElementById(id);
    if (element) {
      const value = parseFloat(element.value) || 0;
      return value;
    }
    return 0;
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  function formatCurrency(amount, decimals = 2) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(amount);
  }

  function formatPayoffTime(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }

  function getPaymentDate(monthsFromNow) {
    const date = new Date();
    date.setMonth(date.getMonth() + monthsFromNow);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  function validateInputs() {
    const balance = getValue('card-balance');
    const apr = getValue('interest-rate');
    const paymentType = document.getElementById('payment-type').value;
    
    if (balance <= 0) {
      alert('Please enter a valid credit card balance.');
      return false;
    }
    
    if (apr < 0 || apr > 50) {
      alert('Please enter a valid APR between 0% and 50%.');
      return false;
    }
    
    if (paymentType === 'fixed') {
      const payment = getValue('fixed-payment');
      if (payment <= 0) {
        alert('Please enter a valid monthly payment amount.');
        return false;
      }
      
      // Check if payment covers interest
      const monthlyInterest = balance * (apr / 100 / 12);
      if (payment < monthlyInterest) {
        alert(`Your payment must be at least ${formatCurrency(monthlyInterest)} to cover monthly interest charges.`);
        return false;
      }
    } else if (paymentType === 'payoff-goal') {
      const months = getValue('payoff-months');
      if (months <= 0) {
        alert('Please enter a valid payoff timeline.');
        return false;
      }
    }
    
    return true;
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideDown {
      from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(-50%) translateY(20px);
        opacity: 0;
      }
    }
    
    .toast {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    .error-message {
      background: #fee;
      border: 2px solid #fcc;
      border-radius: 8px;
      padding: 1.5rem;
      color: #c00;
    }
    
    .error-message h3 {
      margin: 0 0 0.5rem 0;
      color: #c00;
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  `;
  document.head.appendChild(style);

})();
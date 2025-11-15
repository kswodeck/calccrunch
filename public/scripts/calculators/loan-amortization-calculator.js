// Loan Amortization Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    loanAmount: 200000,
    interestRate: 6.5,
    loanTerm: 30,
    extraPayment: 0,
    extraYearly: 0
  };

  // State
  let state = {
    lastCalculationResults: null,
    showFullSchedule: false
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
  });

  function initializeForm() {
    // Set default values
    setValue('loan-amount', DEFAULT_VALUES.loanAmount);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('loan-term', DEFAULT_VALUES.loanTerm);
    setValue('extra-payment', DEFAULT_VALUES.extraPayment);
    setValue('extra-yearly', DEFAULT_VALUES.extraYearly);
    
    // Set default start date to current month
    const startDateInput = document.getElementById('start-date');
    if (startDateInput && !startDateInput.value) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      startDateInput.value = `${year}-${month}`;
    }
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      { id: 'loan-amount', param: 'loan_amount' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'loan-term', param: 'loan_term' },
      { id: 'extra-payment', param: 'extra_payment' },
      { id: 'extra-yearly', param: 'extra_yearly' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = parseFloat(params.get(field.param));
        if (!isNaN(value)) {
          setValue(field.id, value);
        }
      }
    });
    
    // Load start date
    if (params.has('start_date')) {
      const startDate = params.get('start_date');
      const startDateInput = document.getElementById('start-date');
      if (startDateInput) {
        startDateInput.value = startDate;
      }
    }
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        calculateLoan();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    // Save numeric values
    params.set('loan_amount', getValue('loan-amount'));
    params.set('interest_rate', getValue('interest-rate'));
    params.set('loan_term', getValue('loan-term'));
    
    // Save extra payments if not zero
    const extraPayment = getValue('extra-payment');
    const extraYearly = getValue('extra-yearly');
    if (extraPayment > 0) {
      params.set('extra_payment', extraPayment);
    }
    if (extraYearly > 0) {
      params.set('extra_yearly', extraYearly);
    }
    
    // Save start date
    const startDate = document.getElementById('start-date');
    if (startDate && startDate.value) {
      params.set('start_date', startDate.value);
    }
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateLoan);
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      // Calculate on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateLoan();
        }
      });
      
      // Save to URL on change
      input.addEventListener('change', function() {
        saveToURL();
      });
      
      // Also save on input for real-time updates (except date inputs)
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

  function calculateLoan() {
    // Get input values
    const loanAmount = getValue('loan-amount');
    const annualRate = getValue('interest-rate');
    const loanTermYears = getValue('loan-term');
    const extraMonthly = getValue('extra-payment');
    const extraYearly = getValue('extra-yearly');
    const startDate = document.getElementById('start-date').value;
    
    // Validate inputs
    if (!validateInputs(loanAmount, annualRate, loanTermYears)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // Calculate loan details
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    
    // Calculate standard monthly payment (without extra)
    let standardMonthlyPayment = 0;
    if (monthlyRate > 0) {
      standardMonthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                               (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      standardMonthlyPayment = loanAmount / totalPayments;
    }
    
    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(
      loanAmount, monthlyRate, totalPayments, 
      standardMonthlyPayment, extraMonthly, extraYearly, startDate
    );
    
    // Calculate totals
    const withoutExtra = {
      totalPaid: standardMonthlyPayment * totalPayments,
      totalInterest: (standardMonthlyPayment * totalPayments) - loanAmount,
      months: totalPayments
    };
    
    const withExtra = {
      totalPaid: schedule.reduce((sum, payment) => sum + payment.totalPayment, 0),
      totalInterest: schedule.reduce((sum, payment) => sum + payment.interestPayment, 0),
      months: schedule.length
    };
    
    const savings = {
      interest: withoutExtra.totalInterest - withExtra.totalInterest,
      time: withoutExtra.months - withExtra.months,
      totalAmount: withoutExtra.totalPaid - withExtra.totalPaid
    };
    
    // Store results
    state.lastCalculationResults = {
      loanAmount,
      annualRate,
      loanTermYears,
      standardMonthlyPayment,
      extraMonthly,
      extraYearly,
      withoutExtra,
      withExtra,
      savings,
      schedule,
      startDate
    };
    
    // Display results
    displayResults(state.lastCalculationResults);
  }

  function generateAmortizationSchedule(principal, monthlyRate, totalPayments, basePayment, extraMonthly, extraYearly, startDate) {
    const schedule = [];
    let remainingBalance = principal;
    let paymentNumber = 0;
    
    // Parse start date
    let currentDate = startDate ? new Date(startDate + '-01') : new Date();
    
    while (remainingBalance > 0.01 && paymentNumber < totalPayments * 2) { // Safety limit
      paymentNumber++;
      
      // Calculate interest for this period
      const interestPayment = remainingBalance * monthlyRate;
      
      // Calculate principal payment
      let principalPayment = basePayment - interestPayment;
      
      // Add extra monthly payment
      principalPayment += extraMonthly;
      
      // Add extra yearly payment (typically in December or month 12)
      let yearlyExtra = 0;
      if (extraYearly > 0 && paymentNumber % 12 === 0) {
        yearlyExtra = extraYearly;
        principalPayment += yearlyExtra;
      }
      
      // Don't overpay
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance;
      }
      
      // Calculate new balance
      remainingBalance -= principalPayment;
      if (remainingBalance < 0) remainingBalance = 0;
      
      // Calculate total payment
      const totalPayment = principalPayment + interestPayment;
      
      // Format payment date
      const paymentDate = new Date(currentDate);
      const monthName = paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      schedule.push({
        paymentNumber,
        paymentDate: monthName,
        totalPayment,
        principalPayment,
        interestPayment,
        extraPayment: extraMonthly + yearlyExtra,
        remainingBalance,
        cumulativePrincipal: principal - remainingBalance,
        cumulativeInterest: schedule.reduce((sum, p) => sum + p.interestPayment, 0) + interestPayment
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
      
      // Stop if loan is paid off
      if (remainingBalance <= 0.01) break;
    }
    
    return schedule;
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('loan-result');
    if (!resultDiv) return;
    
    // Calculate some additional metrics
    const monthsSaved = results.savings.time;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonths = monthsSaved % 12;
    
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + results.withExtra.months);
    
    const originalPayoffDate = new Date();
    originalPayoffDate.setMonth(originalPayoffDate.getMonth() + results.withoutExtra.months);
    
    // Determine savings quality
    let savingsQuality = '';
    let savingsClass = '';
    if (results.savings.interest > results.loanAmount * 0.3) {
      savingsQuality = 'Excellent savings! Extra payments cut your interest by over 30% of the loan amount.';
      savingsClass = 'status-excellent';
    } else if (results.savings.time >= 60) {
      savingsQuality = 'Great strategy! You\'re saving 5+ years of payments.';
      savingsClass = 'status-great';
    } else if (results.savings.interest > 0) {
      savingsQuality = 'Good approach! Every extra dollar reduces your total interest.';
      savingsClass = 'status-good';
    } else {
      savingsQuality = 'Standard loan repayment schedule.';
      savingsClass = 'status-standard';
    }
    
    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Loan Amortization Schedule</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Schedule
        </button>
      </div>
      
      ${results.extraMonthly > 0 || results.extraYearly > 0 ? `
        <div class="savings-highlight ${savingsClass}">
          <div class="status-icon">💰</div>
          <div class="status-content">
            <h4>Extra Payment Impact</h4>
            <p>${savingsQuality}</p>
          </div>
        </div>
      ` : ''}
      
      <div class="result-summary">
        <div class="result-card result-card-primary">
          <div class="card-icon">📅</div>
          <h4>Monthly Payment</h4>
          <div class="result-amount">${formatCurrency(results.standardMonthlyPayment)}</div>
          <div class="result-detail">
            <small>Standard payment</small>
            ${results.extraMonthly > 0 ? `
              <div class="mini-breakdown">
                <span>+${formatCurrency(results.extraMonthly)} extra</span>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="result-card ${results.savings.interest > 0 ? 'result-card-success' : ''}">
          <div class="card-icon">💵</div>
          <h4>Total Interest</h4>
          <div class="result-amount">${formatCurrency(results.withExtra.totalInterest)}</div>
          <div class="result-detail">
            <small>${((results.withExtra.totalInterest / results.loanAmount) * 100).toFixed(1)}% of loan</small>
            ${results.savings.interest > 0 ? `
              <div class="mini-breakdown savings-text">
                <span>Save ${formatCurrency(results.savings.interest)}</span>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">⏰</div>
          <h4>Payoff Time</h4>
          <div class="result-amount">${results.withExtra.months} months</div>
          <div class="result-detail">
            <small>${Math.floor(results.withExtra.months / 12)} years, ${results.withExtra.months % 12} months</small>
            ${monthsSaved > 0 ? `
              <div class="mini-breakdown savings-text">
                <span>Save ${yearsSaved > 0 ? yearsSaved + ' years' : ''} ${remainingMonths > 0 ? remainingMonths + ' months' : ''}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      
      <div class="payment-breakdown-visual">
        <h4>Payment Composition Over Time</h4>
        <div class="composition-chart">
          ${generateCompositionChart(results.schedule)}
        </div>
        <div class="composition-legend">
          <div class="legend-item">
            <span class="legend-color principal"></span>
            <span>Principal Payment</span>
          </div>
          <div class="legend-item">
            <span class="legend-color interest"></span>
            <span>Interest Payment</span>
          </div>
          ${results.extraMonthly > 0 || results.extraYearly > 0 ? `
            <div class="legend-item">
              <span class="legend-color extra"></span>
              <span>Extra Payment</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      ${results.savings.interest > 0 ? `
        <div class="comparison-section">
          <h4>With vs Without Extra Payments</h4>
          <div class="comparison-grid">
            <div class="comparison-card">
              <h5>Standard Repayment</h5>
              <div class="comparison-item">
                <span>Total Interest:</span>
                <span>${formatCurrency(results.withoutExtra.totalInterest)}</span>
              </div>
              <div class="comparison-item">
                <span>Total Paid:</span>
                <span>${formatCurrency(results.withoutExtra.totalPaid)}</span>
              </div>
              <div class="comparison-item">
                <span>Payoff Time:</span>
                <span>${results.withoutExtra.months} months</span>
              </div>
              <div class="comparison-item">
                <span>Payoff Date:</span>
                <span>${originalPayoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            
            <div class="comparison-card highlighted">
              <h5>With Extra Payments</h5>
              <div class="comparison-item">
                <span>Total Interest:</span>
                <span class="text-success">${formatCurrency(results.withExtra.totalInterest)}</span>
              </div>
              <div class="comparison-item">
                <span>Total Paid:</span>
                <span class="text-success">${formatCurrency(results.withExtra.totalPaid)}</span>
              </div>
              <div class="comparison-item">
                <span>Payoff Time:</span>
                <span class="text-success">${results.withExtra.months} months</span>
              </div>
              <div class="comparison-item">
                <span>Payoff Date:</span>
                <span class="text-success">${payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
      
      <div class="schedule-section">
        <h4>Amortization Schedule</h4>
        <div class="schedule-controls">
          <button id="toggle-schedule" class="btn btn-secondary">
            ${state.showFullSchedule ? 'Show First Year Only' : 'Show Full Schedule'}
          </button>
          <button id="export-schedule" class="btn btn-secondary">
            Export to CSV
          </button>
        </div>
        
        <div class="schedule-table-container">
          <table class="amortization-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                ${results.extraMonthly > 0 || results.extraYearly > 0 ? '<th>Extra</th>' : ''}
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${generateScheduleRows(results.schedule, state.showFullSchedule)}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="loan-insights">
        <h4>💡 Key Insights</h4>
        <div class="insights-grid">
          ${generateInsights(results)}
        </div>
      </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Attach event listeners
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
    
    const toggleBtn = document.getElementById('toggle-schedule');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        state.showFullSchedule = !state.showFullSchedule;
        displayResults(results); // Re-render
      });
    }
    
    const exportBtn = document.getElementById('export-schedule');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        exportToCSV(results);
      });
    }
  }

  function generateCompositionChart(schedule) {
    // Take samples from the schedule for visualization
    const samples = [];
    const sampleCount = Math.min(12, schedule.length); // Show up to 12 bars
    const interval = Math.floor(schedule.length / sampleCount);
    
    for (let i = 0; i < schedule.length; i += interval) {
      samples.push(schedule[i]);
    }
    
    return `
      <div class="composition-bars">
        ${samples.map(payment => {
          const principalPercent = (payment.principalPayment / payment.totalPayment) * 100;
          const interestPercent = (payment.interestPayment / payment.totalPayment) * 100;
          const extraPercent = payment.extraPayment > 0 ? (payment.extraPayment / payment.totalPayment) * 100 : 0;
          
          return `
            <div class="composition-bar" title="Payment #${payment.paymentNumber}">
              <div class="bar-segment principal" style="height: ${principalPercent}%"></div>
              <div class="bar-segment interest" style="height: ${interestPercent}%"></div>
              ${extraPercent > 0 ? `<div class="bar-segment extra" style="height: ${extraPercent}%"></div>` : ''}
              <span class="bar-label">${payment.paymentNumber}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function generateScheduleRows(schedule, showFull) {
    const rowsToShow = showFull ? schedule : schedule.slice(0, 12);
    
    return rowsToShow.map((payment, index) => {
      const isYearEnd = payment.paymentNumber % 12 === 0;
      const hasExtra = payment.extraPayment > 0;
      
      return `
        <tr class="${isYearEnd ? 'year-end' : ''} ${hasExtra ? 'has-extra' : ''}">
          <td>${payment.paymentNumber}</td>
          <td>${payment.paymentDate}</td>
          <td class="amount-cell">${formatCurrency(payment.totalPayment)}</td>
          <td>${formatCurrency(payment.principalPayment)}</td>
          <td>${formatCurrency(payment.interestPayment)}</td>
          ${state.lastCalculationResults.extraMonthly > 0 || state.lastCalculationResults.extraYearly > 0 ? 
            `<td class="extra-cell">${payment.extraPayment > 0 ? formatCurrency(payment.extraPayment) : '-'}</td>` : ''}
          <td class="balance-cell">${formatCurrency(payment.remainingBalance)}</td>
        </tr>
      `;
    }).join('');
  }

  function generateInsights(results) {
    const insights = [];
    
    // Interest vs Principal insight
    const interestRatio = results.withExtra.totalInterest / results.loanAmount;
    insights.push(`
      <div class="insight-card insight-info">
        <div class="insight-icon">📊</div>
        <div class="insight-content">
          <h5>Interest Cost</h5>
          <p>You'll pay ${(interestRatio * 100).toFixed(1)}% of your loan amount in interest. 
             That's ${formatCurrency(results.withExtra.totalInterest)} on your ${formatCurrency(results.loanAmount)} loan.</p>
        </div>
      </div>
    `);
    
    // Front-loaded interest
    const firstYearInterest = results.schedule.slice(0, 12).reduce((sum, p) => sum + p.interestPayment, 0);
    const firstYearPrincipal = results.schedule.slice(0, 12).reduce((sum, p) => sum + p.principalPayment, 0);
    insights.push(`
      <div class="insight-card insight-warning">
        <div class="insight-icon">📈</div>
        <div class="insight-content">
          <h5>Front-Loaded Interest</h5>
          <p>In year 1, ${((firstYearInterest / (firstYearInterest + firstYearPrincipal)) * 100).toFixed(0)}% of your payments go to interest. 
             This is why extra payments early on save so much!</p>
        </div>
      </div>
    `);
    
    // Extra payment impact
    if (results.savings.interest > 0) {
      const roiPercent = (results.savings.interest / ((results.extraMonthly * 12 + results.extraYearly) * results.withExtra.months / 12)) * 100;
      insights.push(`
        <div class="insight-card insight-success">
          <div class="insight-icon">🎯</div>
          <div class="insight-content">
            <h5>Extra Payment ROI</h5>
            <p>Your extra payments save ${formatCurrency(results.savings.interest)} in interest - 
               that's a ${roiPercent.toFixed(0)}% return on your extra payment investment!</p>
          </div>
        </div>
      `);
    }
    
    // Halfway point
    const halfwayPayment = Math.floor(results.schedule.length / 2);
    if (halfwayPayment < results.schedule.length) {
      const halfwayBalance = results.schedule[halfwayPayment].remainingBalance;
      const percentPaidOff = ((results.loanAmount - halfwayBalance) / results.loanAmount) * 100;
      insights.push(`
        <div class="insight-card insight-neutral">
          <div class="insight-icon">⏱️</div>
          <div class="insight-content">
            <h5>Halfway Point</h5>
            <p>At the halfway point (payment #${halfwayPayment}), you'll have paid off 
               ${percentPaidOff.toFixed(1)}% of your loan principal.</p>
          </div>
        </div>
      `);
    }
    
    return insights.join('');
  }

  function exportToCSV(results) {
    let csv = 'Payment #,Date,Payment,Principal,Interest,';
    if (results.extraMonthly > 0 || results.extraYearly > 0) {
      csv += 'Extra,';
    }
    csv += 'Balance,Cumulative Principal,Cumulative Interest\n';
    
    results.schedule.forEach(payment => {
      csv += `${payment.paymentNumber},${payment.paymentDate},${payment.totalPayment.toFixed(2)},`;
      csv += `${payment.principalPayment.toFixed(2)},${payment.interestPayment.toFixed(2)},`;
      if (results.extraMonthly > 0 || results.extraYearly > 0) {
        csv += `${payment.extraPayment.toFixed(2)},`;
      }
      csv += `${payment.remainingBalance.toFixed(2)},`;
      csv += `${payment.cumulativePrincipal.toFixed(2)},${payment.cumulativeInterest.toFixed(2)}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan-amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function validateInputs(amount, rate, term) {
    if (amount < 1000) {
      showError('Loan amount must be at least $1,000');
      return false;
    }
    if (rate < 0 || rate > 30) {
      showError('Please enter a valid interest rate (0-30%)');
      return false;
    }
    if (term < 1 || term > 50) {
      showError('Please enter a valid loan term (1-50 years)');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('loan-result');
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
        title: 'Loan Amortization Schedule',
        text: 'Check out my loan amortization schedule',
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
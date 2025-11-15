// Auto Loan Calculator
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    vehiclePrice: 35000,
    downPayment: 5000,
    tradeInValue: 0,
    tradeInOwed: 0,
    interestRate: 6.5,
    loanTerm: 60,
    salesTaxRate: 7.5,
    dealerFees: 500,
    extendedWarranty: 0,
    creditScore: 'good'
  };

  // State
  let state = {
    downPaymentMode: '$', // '$' or '%'
    includeUpfrontTaxes: false,
    amortizationSchedule: []
  };

  // Credit score APR adjustments
  const CREDIT_SCORE_RATES = {
    excellent: -1.5,  // 750+
    good: 0,          // 700-749
    fair: 2.5,        // 650-699
    poor: 5.0         // Below 650
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updateCreditScoreInfo(true);
  });

  function initializeForm() {
    // Set default values
    setValue('vehicle-price', DEFAULT_VALUES.vehiclePrice);
    setValue('down-payment', DEFAULT_VALUES.downPayment);
    setValue('trade-in-value', DEFAULT_VALUES.tradeInValue);
    setValue('trade-in-owed', DEFAULT_VALUES.tradeInOwed);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('loan-term', DEFAULT_VALUES.loanTerm);
    setValue('sales-tax-rate', DEFAULT_VALUES.salesTaxRate);
    setValue('dealer-fees', DEFAULT_VALUES.dealerFees);
    setValue('extended-warranty', DEFAULT_VALUES.extendedWarranty);
    
    // Set credit score
    const creditScoreSelect = document.getElementById('credit-score');
    if (creditScoreSelect) {
      creditScoreSelect.value = DEFAULT_VALUES.creditScore;
    }
    
    // Set tax checkbox
    const taxCheckbox = document.getElementById('include-tax-upfront');
    if (taxCheckbox) {
      taxCheckbox.checked = state.includeUpfrontTaxes;
    }
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Load numeric values
    const fields = [
      'vehicle-price', 'down-payment', 'trade-in-value', 'trade-in-owed',
      'interest-rate', 'loan-term', 'sales-tax-rate', 'dealer-fees', 'extended-warranty'
    ];
    
    // Load down payment mode
    if (params.has('down_payment_mode')) {
      state.downPaymentMode = params.get('down_payment_mode') === '%' ? '%' : '$';
      updateDownPaymentMode();
    }
    
    // Load credit score
    if (params.has('credit_score')) {
      const creditScore = params.get('credit_score');
      const creditScoreSelect = document.getElementById('credit-score');
      if (creditScoreSelect && ['excellent', 'good', 'fair', 'poor'].includes(creditScore)) {
        creditScoreSelect.value = creditScore;
        updateCreditScoreInfo();
      }
    }
    
    // Load tax checkbox
    if (params.has('tax_upfront')) {
      state.includeUpfrontTaxes = params.get('tax_upfront') === 'true';
      const taxCheckbox = document.getElementById('include-tax-upfront');
      if (taxCheckbox) {
        taxCheckbox.checked = state.includeUpfrontTaxes;
      }
    }

    fields?.forEach(field => {
      const paramName = field.replace(/-/g, '_');
      if (params.has(paramName)) {
        const value = parseFloat(params.get(paramName));
        if (!isNaN(value)) {
          setValue(field, value);
        }
      }
    });
    
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
    const fields = [
      { id: 'vehicle-price', param: 'vehicle_price' },
      { id: 'down-payment', param: 'down_payment' },
      { id: 'trade-in-value', param: 'trade_in_value' },
      { id: 'trade-in-owed', param: 'trade_in_owed' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'loan-term', param: 'loan_term' },
      { id: 'sales-tax-rate', param: 'sales_tax_rate' },
      { id: 'dealer-fees', param: 'dealer_fees' },
      { id: 'extended-warranty', param: 'extended_warranty' }
    ];
    
    fields.forEach(field => {
      const value = getValue(field.id);
      if (value !== 0 || field.id === 'trade-in-value' || field.id === 'trade-in-owed' || field.id === 'extended-warranty') {
        params.set(field.param, value);
      }
    });
    
    // Save down payment mode
    params.set('down_payment_mode', state.downPaymentMode);
    
    // Save credit score
    const creditScore = document.getElementById('credit-score');
    if (creditScore) {
      params.set('credit_score', creditScore.value);
    }
    
    // Save tax checkbox
    params.set('tax_upfront', state.includeUpfrontTaxes);
    
    // Update URL without reloading
    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({ path: newURL }, '', newURL);
  }

  function updateDownPaymentMode() {
    const unit = document.getElementById('down-payment-unit');
    const input = document.getElementById('down-payment');
    const help = document.getElementById('down-payment-help');
    
    if (!unit || !input || !help) return;
    
    unit.textContent = state.downPaymentMode;
    
    if (state.downPaymentMode === '%') {
      help.textContent = 'Enter down payment percentage (click % to switch)';
      input.step = '1';
      input.max = '100';
    } else {
      help.textContent = 'Enter down payment amount (click $ to switch)';
      input.step = '100';
      input.max = '';
    }
  }

  function attachEventListeners() {
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateLoan);
    }

    // Toggle down payment unit
    const downPaymentUnit = document.getElementById('down-payment-unit');
    if (downPaymentUnit) {
      downPaymentUnit.addEventListener('click', toggleDownPaymentUnit);
    }

    // Credit score change
    const creditScoreSelect = document.getElementById('credit-score');
    if (creditScoreSelect) {
      creditScoreSelect.addEventListener('change', function() {
        updateCreditScoreInfo();
        saveToURL();
      });
    }

    // Tax checkbox
    const taxCheckbox = document.getElementById('include-tax-upfront');
    if (taxCheckbox) {
      taxCheckbox.addEventListener('change', function() {
        state.includeUpfrontTaxes = this.checked;
        saveToURL();
      });
    }

    // Add change listeners to all inputs to save to URL
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      // Auto-calculate on enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calculateLoan();
        }
      });
      
      // Save to URL on change
      input.addEventListener('change', function() {
        saveToURL();
      });
      
      // Also save on input for real-time updates
      if (input.type === 'number' || input.type === 'text') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveToURL();
          }, 500); // Debounce to avoid too many URL updates
        });
      }
    });

    // Trade-in value change to check if owed amount is valid
    const tradeInValue = document.getElementById('trade-in-value');
    const tradeInOwed = document.getElementById('trade-in-owed');
    if (tradeInValue && tradeInOwed) {
      tradeInValue.addEventListener('input', checkTradeInOwed);
      tradeInOwed.addEventListener('input', checkTradeInOwed);
    }

    // Add share button functionality
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }

    // Print button (will be attached after results render)
    // Compare terms button (will be attached after results render)
  }

  function toggleDownPaymentUnit() {
    const input = document.getElementById('down-payment');
    const currentValue = getValue('down-payment');
    
    state.downPaymentMode = state.downPaymentMode === '$' ? '%' : '$';
    
    // Convert value between modes
    const vehiclePrice = getValue('vehicle-price');
    if (state.downPaymentMode === '%') {
      // Converting from $ to %
      const percentage = vehiclePrice > 0 ? (currentValue / vehiclePrice) * 100 : 20;
      input.value = Math.min(100, Math.round(percentage));
    } else {
      // Converting from % to $
      const amount = (currentValue / 100) * vehiclePrice;
      input.value = Math.round(amount);
    }
    
    updateDownPaymentMode();
    saveToURL();
  }

  function updateCreditScoreInfo(init = false) {
    const creditScore = document.getElementById('credit-score').value;
    const interestRateInput = document.getElementById('interest-rate');
    const creditHelp = document.getElementById('credit-score-help');
    
    const adjustment = CREDIT_SCORE_RATES[creditScore];
    const baseRate = DEFAULT_VALUES.interestRate;
    const suggestedRate = Math.max(0.1, baseRate + adjustment);
    
    if (creditHelp) {
      let message = '';
      switch(creditScore) {
        case 'excellent':
          message = '✓ Excellent credit (750+): Best rates available';
          break;
        case 'good':
          message = 'Good credit (700-749): Standard rates';
          break;
        case 'fair':
          message = 'Fair credit (650-699): Higher rates expected';
          break;
        case 'poor':
          message = 'Poor credit (Below 650): Highest rates';
          break;
      }
      creditHelp.textContent = message;
      creditHelp.className = 'form-help ' + (creditScore === 'excellent' ? 'text-success' : creditScore === 'poor' ? 'text-warning' : '');
    }
    
    // Update suggested rate
    if (interestRateInput && !init) {
      interestRateInput.value = suggestedRate.toFixed(2);
    }
  }

  function checkTradeInOwed() {
    const tradeInValue = getValue('trade-in-value');
    const tradeInOwed = getValue('trade-in-owed');
    const owedHelp = document.getElementById('trade-in-owed-help');
    
    if (owedHelp) {
      if (tradeInOwed > tradeInValue && tradeInValue > 0) {
        owedHelp.textContent = '⚠ You owe more than the trade-in value (negative equity)';
        owedHelp.className = 'form-help text-warning';
      } else if (tradeInOwed > 0 && tradeInOwed <= tradeInValue) {
        const equity = tradeInValue - tradeInOwed;
        owedHelp.textContent = `✓ Positive equity: ${formatCurrency(equity)}`;
        owedHelp.className = 'form-help text-success';
      } else {
        owedHelp.textContent = 'Amount still owed on trade-in vehicle';
        owedHelp.className = 'form-help';
      }
    }
  }

  function calculateLoan() {
    // Get input values
    const vehiclePrice = getValue('vehicle-price');
    const downPaymentValue = getValue('down-payment');
    const tradeInValue = getValue('trade-in-value');
    const tradeInOwed = getValue('trade-in-owed');
    const interestRate = getValue('interest-rate');
    const loanTerm = getValue('loan-term');
    const salesTaxRate = getValue('sales-tax-rate');
    const dealerFees = getValue('dealer-fees');
    const extendedWarranty = getValue('extended-warranty');

    // Validate inputs
    if (!validateInputs(vehiclePrice, downPaymentValue, interestRate, loanTerm)) {
      return;
    }

    // Save current state to URL
    saveToURL();

    // Calculate down payment amount
    let downPaymentAmount = downPaymentValue;
    if (state.downPaymentMode === '%') {
      downPaymentAmount = vehiclePrice * (downPaymentValue / 100);
    }

    // Calculate trade-in equity
    const tradeInEquity = tradeInValue - tradeInOwed;

    // Calculate sales tax
    const taxableAmount = vehiclePrice - tradeInValue; // Tax on the difference
    const salesTax = taxableAmount * (salesTaxRate / 100);

    // Calculate total vehicle cost
    const totalVehicleCost = vehiclePrice + dealerFees + extendedWarranty;

    // Calculate amount to finance
    let amountToFinance = totalVehicleCost - downPaymentAmount - tradeInEquity;
    
    // Add sales tax to loan if not paying upfront
    if (!state.includeUpfrontTaxes) {
      amountToFinance += salesTax;
    }

    // Ensure we're not financing a negative amount
    amountToFinance = Math.max(0, amountToFinance);

    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    let monthlyPayment = 0;
    let totalInterest = 0;
    
    if (monthlyRate > 0) {
      monthlyPayment = amountToFinance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
      totalInterest = (monthlyPayment * numPayments) - amountToFinance;
    } else {
      // 0% interest
      monthlyPayment = amountToFinance / numPayments;
      totalInterest = 0;
    }

    const totalPaid = amountToFinance + totalInterest;

    // Calculate upfront costs
    const upfrontCosts = downPaymentAmount + dealerFees + (state.includeUpfrontTaxes ? salesTax : 0);

    // Generate amortization schedule
    generateAmortizationSchedule(amountToFinance, monthlyRate, numPayments, monthlyPayment);

    // Display results
    displayResults({
      vehiclePrice,
      downPaymentAmount,
      downPaymentPercent: (downPaymentAmount / vehiclePrice) * 100,
      tradeInValue,
      tradeInOwed,
      tradeInEquity,
      salesTax,
      dealerFees,
      extendedWarranty,
      totalVehicleCost,
      amountToFinance,
      monthlyPayment,
      loanTerm,
      interestRate,
      totalInterest,
      totalPaid,
      upfrontCosts,
      salesTaxRate,
      taxIncludedInLoan: !state.includeUpfrontTaxes
    });
  }

  function generateAmortizationSchedule(principal, monthlyRate, numPayments, monthlyPayment) {
    state.amortizationSchedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= Math.min(numPayments, 12); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      state.amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
  }

  function displayResults(results) {
    const resultDiv = document.getElementById('loan-result');
    if (!resultDiv) return;

    // Determine loan quality
    let loanQuality = 'good';
    let qualityMessage = 'Reasonable loan terms';
    let qualityClass = 'status-good';
    
    const paymentToPrice = (results.monthlyPayment / results.vehiclePrice) * 100;
    const interestToLoan = (results.totalInterest / results.amountToFinance) * 100;
    
    if (results.loanTerm > 72) {
      loanQuality = 'risky';
      qualityMessage = 'Very long loan term increases total interest';
      qualityClass = 'status-risky';
    } else if (interestToLoan > 30) {
      loanQuality = 'expensive';
      qualityMessage = 'High interest costs - consider a larger down payment';
      qualityClass = 'status-expensive';
    } else if (results.downPaymentPercent < 10) {
      loanQuality = 'stretched';
      qualityMessage = 'Low down payment - higher monthly payments';
      qualityClass = 'status-stretched';
    } else if (results.downPaymentPercent >= 20 && results.loanTerm <= 48) {
      loanQuality = 'excellent';
      qualityMessage = 'Great loan structure with low total interest';
      qualityClass = 'status-excellent';
    }

    // Calculate affordability recommendation (10-15% of monthly income)
    const recommendedIncome = results.monthlyPayment / 0.15;

    resultDiv.innerHTML = `
      <div class="result-header">
        <h3>Your Auto Loan Analysis</h3>
        <button id="print-results" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Results
        </button>
      </div>

      <div class="loan-quality ${qualityClass}">
        <div class="status-icon">
          ${loanQuality === 'excellent' ? '✓' : loanQuality === 'risky' ? '⚠' : '!'}
        </div>
        <div class="status-content">
          <h4>Loan Assessment: ${loanQuality.charAt(0).toUpperCase() + loanQuality.slice(1)}</h4>
          <p>${qualityMessage}</p>
        </div>
      </div>

      <div class="result-summary">
        <div class="result-card result-card-primary">
          <div class="card-icon">💰</div>
          <h4>Monthly Payment</h4>
          <div class="result-amount">${formatCurrency(results.monthlyPayment)}</div>
          <div class="result-detail">
            <small>For ${results.loanTerm} months</small>
            <div class="mini-breakdown">
              <span>${formatCurrency(results.monthlyPayment * 12)}/year</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">🚗</div>
          <h4>Amount Financed</h4>
          <div class="result-amount">${formatCurrency(results.amountToFinance)}</div>
          <div class="result-detail">
            <small>${results.taxIncludedInLoan ? 'Includes sales tax' : 'Excludes sales tax'}</small>
            <div class="mini-breakdown">
              <span>Vehicle: ${formatCurrency(results.vehiclePrice)}</span>
            </div>
          </div>
        </div>
        
        <div class="result-card">
          <div class="card-icon">📊</div>
          <h4>Total Interest</h4>
          <div class="result-amount">${formatCurrency(results.totalInterest)}</div>
          <div class="result-detail">
            <small>${interestToLoan.toFixed(1)}% of loan amount</small>
            <div class="mini-breakdown">
              <span>Total paid: ${formatCurrency(results.totalPaid)}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-structure">
        <h4>Payment Structure Visualization</h4>
        <div class="payment-breakdown-bar">
          <div class="breakdown-segment vehicle" style="width: ${(results.vehiclePrice / results.totalPaid) * 100}%">
          </div>
          <div class="breakdown-segment interest" style="width: ${(results.totalInterest / results.totalPaid) * 100}%">
          </div>
          ${results.dealerFees > 0 || results.extendedWarranty > 0 ? `
          <div class="breakdown-segment fees" style="width: ${((results.dealerFees + results.extendedWarranty) / results.totalPaid) * 100}%">
          </div>
          ` : ''}
          ${!results.taxIncludedInLoan ? '' : `
          <div class="breakdown-segment tax" style="width: ${(results.salesTax / results.totalPaid) * 100}%">
          </div>
          `}
        </div>
        <div class="payment-legend">
          <div class="legend-item">
            <span class="legend-color vehicle"></span>
            <span>Vehicle Price: ${formatCurrency(results.vehiclePrice)}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color interest"></span>
            <span>Total Interest: ${formatCurrency(results.totalInterest)}</span>
          </div>
          ${results.dealerFees > 0 || results.extendedWarranty > 0 ? `
          <div class="legend-item">
            <span class="legend-color fees"></span>
            <span>Fees & Warranty: ${formatCurrency(results.dealerFees + results.extendedWarranty)}</span>
          </div>
          ` : ''}
          ${!results.taxIncludedInLoan ? '' : `
          <div class="legend-item">
            <span class="legend-color tax"></span>
            <span>Sales Tax: ${formatCurrency(results.salesTax)}</span>
          </div>
          `}
        </div>
      </div>

      <div class="cost-breakdown">
        <h4>Complete Cost Breakdown</h4>
        <div class="breakdown-grid">
          <div class="breakdown-section">
            <h5>Vehicle Costs</h5>
            <table class="result-table">
              <tr>
                <td>Vehicle Price</td>
                <td class="text-right">${formatCurrency(results.vehiclePrice)}</td>
              </tr>
              <tr>
                <td>Dealer Fees</td>
                <td class="text-right">${formatCurrency(results.dealerFees)}</td>
              </tr>
              ${results.extendedWarranty > 0 ? `
              <tr>
                <td>Extended Warranty</td>
                <td class="text-right">${formatCurrency(results.extendedWarranty)}</td>
              </tr>
              ` : ''}
              <tr>
                <td>Sales Tax (${results.salesTaxRate}%)</td>
                <td class="text-right">${formatCurrency(results.salesTax)}</td>
              </tr>
              <tr class="table-divider table-total">
                <td><strong>Total Vehicle Cost</strong></td>
                <td class="text-right"><strong>${formatCurrency(results.totalVehicleCost + results.salesTax)}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="breakdown-section">
            <h5>Down Payment & Trade-In</h5>
            <table class="result-table">
              <tr>
                <td>Down Payment</td>
                <td class="text-right">${formatCurrency(results.downPaymentAmount)} (${results.downPaymentPercent.toFixed(1)}%)</td>
              </tr>
              ${results.tradeInValue > 0 ? `
              <tr>
                <td>Trade-In Value</td>
                <td class="text-right">${formatCurrency(results.tradeInValue)}</td>
              </tr>
              ` : ''}
              ${results.tradeInOwed > 0 ? `
              <tr>
                <td>Amount Owed on Trade</td>
                <td class="text-right text-danger">-${formatCurrency(results.tradeInOwed)}</td>
              </tr>
              ` : ''}
              ${results.tradeInValue > 0 ? `
              <tr class="table-divider">
                <td><strong>Trade-In Equity</strong></td>
                <td class="text-right ${results.tradeInEquity >= 0 ? 'text-success' : 'text-danger'}">
                  <strong>${formatCurrency(results.tradeInEquity)}</strong>
                </td>
              </tr>
              ` : ''}
              <tr class="table-total">
                <td><strong>Upfront Costs</strong></td>
                <td class="text-right"><strong>${formatCurrency(results.upfrontCosts)}</strong></td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="loan-terms-summary">
        <h4>Loan Terms Summary</h4>
        <div class="terms-grid">
          <div class="term-item">
            <span class="term-label">Amount Financed</span>
            <span class="term-value">${formatCurrency(results.amountToFinance)}</span>
          </div>
          <div class="term-item">
            <span class="term-label">Interest Rate</span>
            <span class="term-value">${results.interestRate.toFixed(2)}%</span>
          </div>
          <div class="term-item">
            <span class="term-label">Loan Term</span>
            <span class="term-value">${results.loanTerm} months</span>
          </div>
          <div class="term-item">
            <span class="term-label">Monthly Payment</span>
            <span class="term-value">${formatCurrency(results.monthlyPayment)}</span>
          </div>
          <div class="term-item">
            <span class="term-label">Total of Payments</span>
            <span class="term-value">${formatCurrency(results.totalPaid)}</span>
          </div>
          <div class="term-item">
            <span class="term-label">Total Interest</span>
            <span class="term-value">${formatCurrency(results.totalInterest)}</span>
          </div>
        </div>
      </div>

      <div class="amortization-preview">
        <h4>First Year Payment Schedule</h4>
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
            ${state.amortizationSchedule.map(row => `
              <tr>
                <td>${row.month}</td>
                <td>${formatCurrency(row.payment)}</td>
                <td>${formatCurrency(row.principal)}</td>
                <td>${formatCurrency(row.interest)}</td>
                <td>${formatCurrency(row.balance)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <small class="text-muted">Showing first 12 months of ${results.loanTerm} month loan</small>
      </div>

      <div class="loan-comparison">
        <h4>Compare Different Loan Terms</h4>
        <button id="compare-terms" class="btn btn-primary">Show Term Comparison</button>
        <div id="term-comparison" class="hidden">
          ${generateTermComparison(results)}
        </div>
      </div>

      <div class="affordability-check">
        <h4>💡 Affordability Guidelines</h4>
        <div class="guideline-cards">
          <div class="guideline-card">
            <div class="guideline-icon">📊</div>
            <div class="guideline-content">
              <h5>15% Rule</h5>
              <p>Car payment should not exceed 15% of gross monthly income</p>
              <small>Suggested minimum income: <strong>${formatCurrency(recommendedIncome)}/month</strong></small>
            </div>
          </div>
          <div class="guideline-card">
            <div class="guideline-icon">⏱</div>
            <div class="guideline-content">
              <h5>48-Month Rule</h5>
              <p>Shorter loans (48 months or less) save thousands in interest</p>
              <small>Your term: <strong>${results.loanTerm} months</strong></small>
            </div>
          </div>
          <div class="guideline-card">
            <div class="guideline-icon">💰</div>
            <div class="guideline-content">
              <h5>20% Down</h5>
              <p>20% down payment helps avoid being underwater on the loan</p>
              <small>Your down: <strong>${results.downPaymentPercent.toFixed(1)}%</strong></small>
            </div>
          </div>
        </div>
      </div>
    `;

    resultDiv.classList.remove('hidden');
    
    // Re-attach event listeners
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
    
    const compareBtn = document.getElementById('compare-terms');
    if (compareBtn) {
      compareBtn.addEventListener('click', function() {
        const comparison = document.getElementById('term-comparison');
        if (comparison) {
          comparison.classList.toggle('hidden');
          this.textContent = comparison.classList.contains('hidden') ? 
            'Show Term Comparison' : 'Hide Term Comparison';
        }
      });
    }
  }

  function generateTermComparison(currentResults) {
    const terms = [36, 48, 60, 72, 84];
    const comparisons = [];
    
    const amountToFinance = currentResults.amountToFinance;
    const rate = currentResults.interestRate / 100 / 12;
    
    terms.forEach(term => {
      let monthlyPayment, totalInterest;
      
      if (rate > 0) {
        monthlyPayment = amountToFinance * (rate * Math.pow(1 + rate, term)) / 
                         (Math.pow(1 + rate, term) - 1);
        totalInterest = (monthlyPayment * term) - amountToFinance;
      } else {
        monthlyPayment = amountToFinance / term;
        totalInterest = 0;
      }
      
      comparisons.push({
        term,
        monthlyPayment,
        totalInterest,
        totalPaid: amountToFinance + totalInterest,
        isCurrent: term === currentResults.loanTerm
      });
    });
    
    return `
    <div class="table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Loan Term</th>
            <th>Monthly Payment</th>
            <th>Total Interest</th>
            <th>Total Paid</th>
            <th>Interest Savings</th>
          </tr>
        </thead>
        <tbody>
          ${comparisons.map(comp => `
            <tr class="${comp.isCurrent ? 'current-term' : ''}">
              <td>${comp.term} months ${comp.isCurrent ? '<span class="badge">Current</span>' : ''}</td>
              <td>${formatCurrency(comp.monthlyPayment)}</td>
              <td>${formatCurrency(comp.totalInterest)}</td>
              <td>${formatCurrency(comp.totalPaid)}</td>
              <td class="${comp.totalInterest < currentResults.totalInterest ? 'text-success' : comp.totalInterest > currentResults.totalInterest ? 'text-danger' : ''}">
                ${comp.isCurrent ? '-' : 
                  comp.totalInterest < currentResults.totalInterest ? 
                    'Save ' + formatCurrency(currentResults.totalInterest - comp.totalInterest) :
                    '+' + formatCurrency(comp.totalInterest - currentResults.totalInterest)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      <p class="comparison-note">
        <strong>Note:</strong> Shorter terms have higher monthly payments but save significantly on interest. 
        The 48-month term saves ${formatCurrency(currentResults.totalInterest - comparisons[1].totalInterest)} 
        compared to your current ${currentResults.loanTerm}-month term.
      </p>
    `;
  }

  function validateInputs(price, downPayment, rate, term) {
    if (price <= 0) {
      showError('Please enter a valid vehicle price');
      return false;
    }
    if (downPayment < 0) {
      showError('Down payment cannot be negative');
      return false;
    }
    if (state.downPaymentMode === '%' && downPayment > 100) {
      showError('Down payment cannot exceed 100%');
      return false;
    }
    if (state.downPaymentMode === '$' && downPayment > price) {
      showError('Down payment cannot exceed vehicle price');
      return false;
    }
    if (rate < 0 || rate > 30) {
      showError('Please enter a valid interest rate (0% - 30%)');
      return false;
    }
    if (term <= 0 || term > 96) {
      showError('Please enter a valid loan term (1-96 months)');
      return false;
    }
    return true;
  }

  function printResults() {
    window.print();
  }

  function shareCalculation() {
    const url = window.location.href;
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'Auto Loan Calculation',
        text: 'Check out my auto loan calculation',
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
// Home Equity Calculator with URL State Management
(function() {
  'use strict';

  // Constants
  const DEFAULT_VALUES = {
    homeValue: 450000,
    purchasePrice: 350000,
    purchaseDate: '2020-01',
    appreciationRate: 3,
    mortgageBalance: 280000,
    monthlyPayment: 1800,
    interestRate: 6.5,
    yearsRemaining: 25,
    helocBalance: 0,
    otherLiens: 0,
    maxLtv: 80,
    helocRate: 8.5
  };

  // Initialize calculator
  document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadFromURL();
    attachEventListeners();
    updatePreview();
  });

  function initializeForm() {
    setValue('home-value', DEFAULT_VALUES.homeValue);
    setValue('purchase-price', DEFAULT_VALUES.purchasePrice);
    setValue('purchase-date', DEFAULT_VALUES.purchaseDate);
    setValue('appreciation-rate', DEFAULT_VALUES.appreciationRate);
    setValue('mortgage-balance', DEFAULT_VALUES.mortgageBalance);
    setValue('monthly-payment', DEFAULT_VALUES.monthlyPayment);
    setValue('interest-rate', DEFAULT_VALUES.interestRate);
    setValue('years-remaining', DEFAULT_VALUES.yearsRemaining);
    setValue('heloc-balance', DEFAULT_VALUES.helocBalance);
    setValue('other-liens', DEFAULT_VALUES.otherLiens);
    setValue('max-ltv', DEFAULT_VALUES.maxLtv);
    setValue('max-ltv-slider', DEFAULT_VALUES.maxLtv);
    setValue('heloc-rate', DEFAULT_VALUES.helocRate);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    const fields = [
      { id: 'home-value', param: 'home_value' },
      { id: 'purchase-price', param: 'purchase_price' },
      { id: 'purchase-date', param: 'purchase_date' },
      { id: 'appreciation-rate', param: 'appreciation_rate' },
      { id: 'mortgage-balance', param: 'mortgage_balance' },
      { id: 'monthly-payment', param: 'monthly_payment' },
      { id: 'interest-rate', param: 'interest_rate' },
      { id: 'years-remaining', param: 'years_remaining' },
      { id: 'heloc-balance', param: 'heloc_balance' },
      { id: 'other-liens', param: 'other_liens' },
      { id: 'max-ltv', param: 'max_ltv' },
      { id: 'heloc-rate', param: 'heloc_rate' }
    ];
    
    fields.forEach(field => {
      if (params.has(field.param)) {
        const value = field.id === 'purchase-date' ? params.get(field.param) : parseFloat(params.get(field.param));
        if (field.id === 'purchase-date' || !isNaN(value)) {
          setValue(field.id, value);
          if (field.id === 'max-ltv') {
            setValue('max-ltv-slider', value);
          }
        }
      }
    });
    
    // Auto-calculate if we loaded values
    if (params.toString()) {
      setTimeout(() => {
        updatePreview();
        calculateResults();
      }, 100);
    }
  }

  function saveToURL() {
    const params = new URLSearchParams();
    
    params.set('home_value', getValue('home-value'));
    params.set('purchase_price', getValue('purchase-price'));
    
    const purchaseDate = document.getElementById('purchase-date')?.value;
    if (purchaseDate) {
      params.set('purchase_date', purchaseDate);
    }
    
    params.set('appreciation_rate', getValue('appreciation-rate'));
    params.set('mortgage_balance', getValue('mortgage-balance'));
    params.set('monthly_payment', getValue('monthly-payment'));
    params.set('interest_rate', getValue('interest-rate'));
    params.set('years_remaining', getValue('years-remaining'));
    params.set('heloc_balance', getValue('heloc-balance'));
    params.set('other_liens', getValue('other-liens'));
    params.set('max_ltv', getValue('max-ltv'));
    params.set('heloc_rate', getValue('heloc-rate'));
    
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

    // LTV Slider synchronization
    const ltvSlider = document.getElementById('max-ltv-slider');
    const ltvInput = document.getElementById('max-ltv');
    
    if (ltvSlider && ltvInput) {
      ltvSlider.addEventListener('input', function() {
        ltvInput.value = this.value;
        saveToURL();
      });
      ltvInput.addEventListener('input', function() {
        ltvSlider.value = this.value;
        saveToURL();
      });
    }

    // Add change listeners to all inputs
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateResults();
        }
      });
      
      input.addEventListener('change', function() {
        updatePreview();
        saveToURL();
      });
      
      if (input.type === 'number' || input.type === 'month') {
        let saveTimeout;
        input.addEventListener('input', function() {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            updatePreview();
            saveToURL();
          }, 300);
        });
      }
    });

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }
  }

  function updatePreview() {
    const homeValue = getValue('home-value');
    const mortgageBalance = getValue('mortgage-balance');
    const helocBalance = getValue('heloc-balance');
    const otherLiens = getValue('other-liens');
    
    const totalDebt = mortgageBalance + helocBalance + otherLiens;
    const equity = homeValue - totalDebt;
    const ltv = homeValue > 0 ? (totalDebt / homeValue) * 100 : 0;
    
    document.getElementById('preview-value').textContent = formatCurrency(homeValue);
    document.getElementById('preview-debt').textContent = formatCurrency(totalDebt);
    document.getElementById('preview-equity').textContent = formatCurrency(equity);
    
    const ltvElement = document.getElementById('preview-ltv');
    ltvElement.textContent = ltv.toFixed(1) + '%';
    ltvElement.classList.remove('low', 'medium', 'high');
    if (ltv <= 60) {
      ltvElement.classList.add('low');
    } else if (ltv <= 80) {
      ltvElement.classList.add('medium');
    } else {
      ltvElement.classList.add('high');
    }
  }

  function calculateResults() {
    // Get all input values
    const homeValue = getValue('home-value');
    const purchasePrice = getValue('purchase-price');
    const appreciationRate = getValue('appreciation-rate');
    const mortgageBalance = getValue('mortgage-balance');
    const monthlyPayment = getValue('monthly-payment');
    const interestRate = getValue('interest-rate');
    const yearsRemaining = getValue('years-remaining');
    const helocBalance = getValue('heloc-balance');
    const otherLiens = getValue('other-liens');
    const maxLtv = getValue('max-ltv');
    const helocRate = getValue('heloc-rate');
    
    // Validate inputs
    if (!validateInputs(homeValue, mortgageBalance)) {
      return;
    }
    
    // Save to URL
    saveToURL();
    
    // Calculate current position
    const totalDebt = mortgageBalance + helocBalance + otherLiens;
    const currentEquity = homeValue - totalDebt;
    const equityPercent = homeValue > 0 ? (currentEquity / homeValue) * 100 : 0;
    const currentLtv = homeValue > 0 ? (totalDebt / homeValue) * 100 : 0;
    
    // Calculate appreciation since purchase
    const purchaseDate = document.getElementById('purchase-date')?.value;
    let yearsOwned = 0;
    let appreciationGain = 0;
    if (purchasePrice > 0 && purchaseDate) {
      const purchaseYear = parseInt(purchaseDate.split('-')[0]);
      const purchaseMonth = parseInt(purchaseDate.split('-')[1]);
      const now = new Date();
      yearsOwned = (now.getFullYear() - purchaseYear) + (now.getMonth() + 1 - purchaseMonth) / 12;
      appreciationGain = homeValue - purchasePrice;
    }
    
    // Calculate borrowing power
    const maxBorrowableValue = homeValue * (maxLtv / 100);
    const availableEquity = Math.max(0, maxBorrowableValue - totalDebt);
    
    // Conservative borrowing (75% LTV)
    const conservativeBorrowable = Math.max(0, (homeValue * 0.75) - totalDebt);
    
    // Aggressive borrowing (90% LTV)
    const aggressiveBorrowable = Math.max(0, (homeValue * 0.90) - totalDebt);
    
    // Calculate monthly interest cost if borrowing
    const monthlyInterestCost = (availableEquity * (helocRate / 100)) / 12;
    
    // Generate future projections
    const projections = calculateProjections(
      homeValue, 
      mortgageBalance, 
      monthlyPayment, 
      interestRate, 
      appreciationRate,
      helocBalance,
      otherLiens
    );
    
    // Generate insights
    const insights = generateInsights({
      equity: currentEquity,
      equityPercent,
      ltv: currentLtv,
      availableEquity,
      appreciationRate,
      yearsRemaining,
      homeValue,
      totalDebt
    });
    
    // Render results
    renderResults({
      homeValue,
      purchasePrice,
      totalDebt,
      mortgageBalance,
      helocBalance,
      otherLiens,
      currentEquity,
      equityPercent,
      currentLtv,
      maxLtv,
      availableEquity,
      conservativeBorrowable,
      aggressiveBorrowable,
      monthlyInterestCost,
      helocRate,
      appreciationRate,
      appreciationGain,
      yearsOwned,
      projections,
      insights
    });
  }

  function calculateProjections(homeValue, mortgageBalance, monthlyPayment, interestRate, appreciationRate, helocBalance, otherLiens) {
    const projections = [];
    const monthlyRate = interestRate / 100 / 12;
    
    let currentHomeValue = homeValue;
    let currentMortgage = mortgageBalance;
    let currentHeloc = helocBalance;
    let currentOther = otherLiens;
    
    // Current year (Year 0)
    projections.push({
      year: 0,
      label: 'Now',
      homeValue: currentHomeValue,
      mortgageBalance: currentMortgage,
      totalDebt: currentMortgage + currentHeloc + currentOther,
      equity: currentHomeValue - (currentMortgage + currentHeloc + currentOther),
      ltv: ((currentMortgage + currentHeloc + currentOther) / currentHomeValue) * 100
    });
    
    // Project years 1-30
    for (let year = 1; year <= 30; year++) {
      // Appreciate home value
      currentHomeValue = currentHomeValue * (1 + appreciationRate / 100);
      
      // Calculate mortgage paydown for the year (12 months)
      for (let month = 0; month < 12; month++) {
        if (currentMortgage > 0 && monthlyPayment > 0) {
          const interestPayment = currentMortgage * monthlyRate;
          const principalPayment = Math.min(monthlyPayment - interestPayment, currentMortgage);
          currentMortgage = Math.max(0, currentMortgage - principalPayment);
        }
      }
      
      // Assume HELOC and other liens stay constant (simplified)
      const totalDebt = currentMortgage + currentHeloc + currentOther;
      const equity = currentHomeValue - totalDebt;
      const ltv = totalDebt > 0 ? (totalDebt / currentHomeValue) * 100 : 0;
      
      projections.push({
        year,
        label: `Year ${year}`,
        homeValue: currentHomeValue,
        mortgageBalance: currentMortgage,
        totalDebt,
        equity,
        ltv
      });
    }
    
    return projections;
  }

  function generateInsights(data) {
    const insights = [];
    const { equity, equityPercent, ltv, availableEquity, appreciationRate, yearsRemaining, homeValue, totalDebt } = data;
    
    // Equity position insight
    if (equityPercent >= 50) {
      insights.push({
        type: 'insight-success',
        icon: '🏆',
        title: 'Strong Equity Position',
        message: `You own ${equityPercent.toFixed(0)}% of your home outright. This gives you excellent financial flexibility and borrowing power.`
      });
    } else if (equityPercent >= 20) {
      insights.push({
        type: 'insight-success',
        icon: '✅',
        title: 'Good Equity Position',
        message: `With ${equityPercent.toFixed(0)}% equity, you've built a solid ownership stake and have eliminated PMI territory.`
      });
    } else if (equityPercent >= 10) {
      insights.push({
        type: 'insight-info',
        icon: '📊',
        title: 'Building Equity',
        message: `You have ${equityPercent.toFixed(0)}% equity. Continue making payments to reach 20% and unlock better borrowing options.`
      });
    } else {
      insights.push({
        type: 'insight-warning',
        icon: '⚠️',
        title: 'Limited Equity',
        message: `With only ${equityPercent.toFixed(0)}% equity, focus on building your stake before considering additional borrowing.`
      });
    }
    
    // LTV insight
    if (ltv > 80) {
      insights.push({
        type: 'insight-warning',
        icon: '📉',
        title: 'High LTV Ratio',
        message: `Your ${ltv.toFixed(1)}% LTV is above the 80% threshold. Most equity borrowing options require lower LTV.`
      });
    } else if (ltv > 60) {
      insights.push({
        type: 'insight-info',
        icon: '💡',
        title: 'Moderate LTV',
        message: `Your ${ltv.toFixed(1)}% LTV gives you access to equity borrowing. You could borrow up to ${formatCurrency(availableEquity)} at 80% LTV.`
      });
    } else {
      insights.push({
        type: 'insight-success',
        icon: '🎯',
        title: 'Excellent LTV',
        message: `Your low ${ltv.toFixed(1)}% LTV means significant borrowing power and the best rates for equity products.`
      });
    }
    
    // Appreciation insight
    if (appreciationRate > 0) {
      const fiveYearGain = homeValue * Math.pow(1 + appreciationRate / 100, 5) - homeValue;
      insights.push({
        type: 'insight-info',
        icon: '📈',
        title: 'Projected Growth',
        message: `At ${appreciationRate}% annual appreciation, your home could gain ${formatCurrency(fiveYearGain)} in value over the next 5 years.`
      });
    }
    
    // Borrowing recommendation
    if (availableEquity > 50000) {
      insights.push({
        type: 'insight-info',
        icon: '🏦',
        title: 'Borrowing Potential',
        message: `You have ${formatCurrency(availableEquity)} available to borrow. Consider a HELOC for flexibility or a home equity loan for fixed payments.`
      });
    }
    
    // Payoff insight
    if (yearsRemaining > 0 && totalDebt > 0) {
      insights.push({
        type: 'insight-info',
        icon: '🗓️',
        title: 'Payoff Timeline',
        message: `With ${yearsRemaining} years remaining on your mortgage, you'll build significant equity through both appreciation and principal payments.`
      });
    }
    
    return insights;
  }

  function renderResults(results) {
    const resultDiv = document.getElementById('equity-result');
    if (!resultDiv) return;
    
    const { 
      homeValue, totalDebt, currentEquity, equityPercent, currentLtv,
      maxLtv, availableEquity, conservativeBorrowable, aggressiveBorrowable,
      monthlyInterestCost, helocRate, appreciationRate, appreciationGain,
      yearsOwned, projections, insights
    } = results;
    
    // Get key projection years
    const year5 = projections.find(p => p.year === 5);
    const year10 = projections.find(p => p.year === 10);
    const year15 = projections.find(p => p.year === 15);
    const year20 = projections.find(p => p.year === 20);
    
    const html = `
      <div class="result-header-actions">
        <h3>🏠 Your Home Equity Analysis</h3>
        <div class="result-actions">
          <button type="button" id="print-results" class="btn-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9V2h12v7"/>
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
        </div>
      </div>

      <!-- Equity Hero -->
      <div class="equity-hero">
        <div class="equity-label">Your Current Home Equity</div>
        <div class="equity-value">${formatCurrency(currentEquity)}</div>
        <div class="equity-percent">${equityPercent.toFixed(1)}% ownership • ${(100 - equityPercent).toFixed(1)}% financed</div>
        <div class="equity-status">${getEquityStatus(equityPercent)}</div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-card-icon">🏠</div>
          <div class="summary-card-value">${formatCurrency(homeValue)}</div>
          <div class="summary-card-label">Home Value</div>
          ${appreciationGain > 0 ? `<div class="summary-card-note" style="color: #4CAF50;">+${formatCurrency(appreciationGain)} since purchase</div>` : ''}
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">💳</div>
          <div class="summary-card-value" style="color: #F44336;">${formatCurrency(totalDebt)}</div>
          <div class="summary-card-label">Total Debt</div>
          <div class="summary-card-note">All liens combined</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">📊</div>
          <div class="summary-card-value" style="color: ${currentLtv <= 60 ? '#4CAF50' : currentLtv <= 80 ? '#FF9800' : '#F44336'};">${currentLtv.toFixed(1)}%</div>
          <div class="summary-card-label">Loan-to-Value</div>
          <div class="summary-card-note">${getLtvStatus(currentLtv)}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-icon">💰</div>
          <div class="summary-card-value" style="color: #4CAF50;">${formatCurrency(currentEquity)}</div>
          <div class="summary-card-label">Home Equity</div>
          <div class="summary-card-note">${equityPercent.toFixed(1)}% of home value</div>
        </div>
      </div>

      <!-- LTV Analysis -->
      <div class="ltv-analysis">
        <h4>📊 Loan-to-Value Analysis</h4>
        <div class="ltv-meter-container">
          <div class="ltv-meter">
            <div class="ltv-marker" style="left: ${Math.min(currentLtv, 100)}%;" data-value="${currentLtv.toFixed(1)}%"></div>
          </div>
          <div class="ltv-labels">
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
          <div class="ltv-zone-labels">
            <div class="ltv-zone safe">Low Risk (0-60%)</div>
            <div class="ltv-zone moderate">Moderate (60-80%)</div>
            <div class="ltv-zone risky">High (80%+)</div>
          </div>
        </div>
      </div>

      <!-- Borrowing Power -->
      <div class="borrowing-section">
        <h4>🏦 Your Borrowing Power</h4>
        <div class="borrowing-grid">
          <div class="borrowing-card">
            <div class="borrowing-icon">🛡️</div>
            <div class="borrowing-label">Conservative (75% LTV)</div>
            <div class="borrowing-value">${formatCurrency(conservativeBorrowable)}</div>
            <div class="borrowing-note">Lower risk, best rates</div>
          </div>
          <div class="borrowing-card">
            <div class="borrowing-icon">⚖️</div>
            <div class="borrowing-label">Standard (${maxLtv}% LTV)</div>
            <div class="borrowing-value">${formatCurrency(availableEquity)}</div>
            <div class="borrowing-note">~${formatCurrency(monthlyInterestCost)}/mo at ${helocRate}%</div>
          </div>
          <div class="borrowing-card">
            <div class="borrowing-icon">🚀</div>
            <div class="borrowing-label">Maximum (90% LTV)</div>
            <div class="borrowing-value">${formatCurrency(aggressiveBorrowable)}</div>
            <div class="borrowing-note">Higher rates, stricter requirements</div>
          </div>
        </div>
      </div>

      <!-- Equity Growth Projections -->
      <div class="growth-section d-none">
        <h4>📈 Equity Growth Projections (${appreciationRate}% Annual Appreciation)</h4>
        ${generateGrowthChart(projections)}
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot value"></span>
            <span>Home Value</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot equity"></span>
            <span>Equity</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot debt"></span>
            <span>Remaining Debt</span>
          </div>
        </div>
        
        <!-- Projection Table -->
        <div class="projection-table-container">
          <table class="projection-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Home Value</th>
                <th>Mortgage</th>
                <th>Equity</th>
                <th>LTV</th>
              </tr>
            </thead>
            <tbody>
              <tr class="current-row">
                <td>Now</td>
                <td>${formatCurrency(projections[0].homeValue)}</td>
                <td>${formatCurrency(projections[0].mortgageBalance)}</td>
                <td>${formatCurrency(projections[0].equity)}</td>
                <td>${projections[0].ltv.toFixed(1)}%</td>
              </tr>
              ${[5, 10, 15, 20, 25, 30].map(year => {
                const p = projections.find(proj => proj.year === year);
                if (!p) return '';
                return `
                  <tr>
                    <td>Year ${year}</td>
                    <td>${formatCurrency(p.homeValue)}</td>
                    <td>${formatCurrency(p.mortgageBalance)}</td>
                    <td>${formatCurrency(p.equity)}</td>
                    <td>${p.ltv.toFixed(1)}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Appreciation Milestones -->
      <div class="appreciation-section">
        <h4>📅 Equity Milestones</h4>
        <div class="appreciation-grid">
          <div class="appreciation-card">
            <div class="appreciation-period">5 Years</div>
            <div class="appreciation-value">${formatCurrency(year5?.equity || 0)}</div>
            <div class="appreciation-gain">+${formatCurrency((year5?.equity || 0) - currentEquity)}</div>
          </div>
          <div class="appreciation-card">
            <div class="appreciation-period">10 Years</div>
            <div class="appreciation-value">${formatCurrency(year10?.equity || 0)}</div>
            <div class="appreciation-gain">+${formatCurrency((year10?.equity || 0) - currentEquity)}</div>
          </div>
          <div class="appreciation-card">
            <div class="appreciation-period">15 Years</div>
            <div class="appreciation-value">${formatCurrency(year15?.equity || 0)}</div>
            <div class="appreciation-gain">+${formatCurrency((year15?.equity || 0) - currentEquity)}</div>
          </div>
          <div class="appreciation-card">
            <div class="appreciation-period">20 Years</div>
            <div class="appreciation-value">${formatCurrency(year20?.equity || 0)}</div>
            <div class="appreciation-gain">+${formatCurrency((year20?.equity || 0) - currentEquity)}</div>
          </div>
        </div>
      </div>

      <!-- Insights Section -->
      <div class="insights-section">
        <h4>💡 Key Insights & Recommendations</h4>
        <div class="insights-grid">
          ${insights.map(insight => `
            <div class="insight-card ${insight.type}">
              <div class="insight-icon">${insight.icon}</div>
              <div class="insight-content">
                <h5>${insight.title}</h5>
                <p>${insight.message}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    
    // Attach print button listener
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
      printBtn.addEventListener('click', printResults);
    }
  }

  function generateGrowthChart(projections) {
    // Get key years for display
    const displayYears = [0, 5, 10, 15, 20, 25, 30];
    const displayData = displayYears.map(year => projections.find(p => p.year === year)).filter(Boolean);
    
    // Find max value for scaling
    const maxValue = Math.max(...displayData.map(p => p.homeValue));
    const chartHeight = 220; // pixels
    
    return `
      <div class="growth-chart">
        ${displayData.map(p => {
          const valueHeight = (p.homeValue / maxValue) * chartHeight;
          const equityHeight = (p.equity / maxValue) * chartHeight;
          const debtHeight = (p.totalDebt / maxValue) * chartHeight;
          
          return `
            <div class="chart-bar-group">
              <div class="chart-bars">
                <div class="chart-bar value-bar" style="height: ${valueHeight}px;" title="Home Value: ${formatCurrency(p.homeValue)}"></div>
                <div class="chart-bar equity-bar" style="height: ${equityHeight}px;" title="Equity: ${formatCurrency(p.equity)}"></div>
                <div class="chart-bar debt-bar" style="height: ${Math.max(debtHeight, 0)}px;" title="Debt: ${formatCurrency(p.totalDebt)}"></div>
              </div>
              <div class="chart-bar-label">${p.label}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function getEquityStatus(percent) {
    if (percent >= 50) return '🏆 Excellent - More than half owned';
    if (percent >= 30) return '✅ Strong - Solid equity position';
    if (percent >= 20) return '👍 Good - PMI-free zone';
    if (percent >= 10) return '📊 Building - Keep growing';
    return '🔄 Starting - Focus on building equity';
  }

  function getLtvStatus(ltv) {
    if (ltv <= 50) return 'Excellent';
    if (ltv <= 60) return 'Very Good';
    if (ltv <= 70) return 'Good';
    if (ltv <= 80) return 'Acceptable';
    return 'High';
  }

  function validateInputs(homeValue, mortgageBalance) {
    if (homeValue <= 0) {
      showError('Please enter a valid home value');
      return false;
    }
    if (mortgageBalance < 0) {
      showError('Mortgage balance cannot be negative');
      return false;
    }
    return true;
  }

  function showError(message) {
    const resultDiv = document.getElementById('equity-result');
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-error" style="background: #FFEBEE; border: 1px solid #EF5350; padding: 1rem; border-radius: 8px; color: #C62828;">
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
        title: 'Home Equity Calculation',
        text: 'Check out my home equity analysis',
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
        shareBtn.style.background = '#4CAF50';
        shareBtn.style.borderColor = '#4CAF50';
        shareBtn.style.color = 'white';
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.style.background = '';
          shareBtn.style.borderColor = '';
          shareBtn.style.color = '';
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